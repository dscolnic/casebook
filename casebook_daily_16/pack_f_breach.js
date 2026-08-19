module.exports = { PACK: {
  "id": "f_breach",
  "title": "The Halcyon Data Breach",
  "discipline": "Computer Security & Information Systems",
  "teaser": "Ninety million records walked out the door overnight. A nation-state mastermind? An unstoppable zero-day? Or a patch that was never applied and an alarm that was switched off?",
  "overclaimTag": "a nation-state mastermind",
  "truthTag": "a known-unpatched flaw and a silenced alarm",
  "venue": "the Halcyon breach inquiry",
  "agent": {
    "name": "Investigator Nora Vance",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Computer-Security Pioneers",
  "dossierName": "COMPUTER-SECURITY PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Halcyon breach inquiry",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before the inquiry closes. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The WHERE you test determines the dossier, and the conversation costs one day.",
  "overclaimTease": "Famous adversaries attract attention; attribution should follow the logs, not precede them.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "cto",
      "items": [
        {
          "id": "hacker",
          "label": "A foreign intrusion crew"
        },
        {
          "id": "cto",
          "label": "Dane Ferro — the firm's security chief"
        },
        {
          "id": "vendor",
          "label": "The software vendor"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "office",
      "items": [
        {
          "id": "servers",
          "label": "The Customer Database Servers"
        },
        {
          "id": "soc",
          "label": "The Security Operations Centre"
        },
        {
          "id": "office",
          "label": "The Security Chief's Office"
        }
      ]
    },
    "what": {
      "title": "What is happening",
      "truth": "unpatched",
      "items": [
        {
          "id": "mastermind",
          "label": "A genius nation-state hacker breached us"
        },
        {
          "id": "zeroday",
          "label": "An unavoidable zero-day — no one could have stopped it"
        },
        {
          "id": "unpatched",
          "label": "A known-unpatched system and an alert switched off"
        }
      ]
    }
  },
  "PLACES": {
    "servers": {
      "name": "The Customer Database Servers",
      "xy": [
        140,
        90
      ]
    },
    "soc": {
      "name": "The Security Operations Centre",
      "xy": [
        330,
        240
      ]
    },
    "office": {
      "name": "The Security Chief's Office",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "servers",
      "soc"
    ],
    [
      "soc",
      "office"
    ]
  ],
  "CHARACTERS": {
    "analyst": {
      "name": "The SOC Analyst",
      "role": "Security-operations analyst",
      "face": "🖥",
      "badge": "A",
      "legend": "the operations centre",
      "hint": "Watched the alert fire for weeks; it was acknowledged, then muted."
    },
    "admin": {
      "name": "Sysadmin Rao",
      "role": "Systems administrator",
      "face": "🔧",
      "badge": "S",
      "legend": "the server room",
      "hint": "Ran the scanners; the critical patch sat in the queue, signed off as 'deferred'."
    },
    "clerk": {
      "name": "The Clerk",
      "role": "Records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the office",
      "hint": "Keeps the risk register — and the memo that accepted the risk and moved on."
    }
  },
  "TOPICMAP": {
    "servers": {
      "analyst": [
        "b_threatmon"
      ],
      "admin": [
        "b_kernel"
      ],
      "clerk": [
        "b_leastpriv"
      ]
    },
    "soc": {
      "analyst": [
        "b_bella"
      ],
      "admin": [
        "b_biba"
      ],
      "clerk": [
        "b_worm"
      ]
    },
    "office": {
      "analyst": [
        "b_trust"
      ],
      "admin": [
        "b_ware"
      ],
      "clerk": [
        "b_cuckoo"
      ]
    }
  },
  "TOPICS": {
    "b_threatmon": {
      "sci": "James P. Anderson (1930-2007)",
      "topic": "Computer-security threat monitoring",
      "lede": "James P. Anderson made computer-security threat monitoring part of a defensible chain from prevention to response.",
      "no": 1,
      "profile": "Today’s security-operations brief follows James P. Anderson into computer-security threat monitoring. James P. Anderson's early security studies analyzed penetration, reference monitors, and the need for systematic monitoring of threats in shared computer systems. Computer defense is a chain of prevention, detection, response, and recovery. Anderson’s work shows why the chain must be designed around realistic adversaries and ordinary administrative error. A patched server with excessive privilege remains exposed; a strong alerting system that nobody is permitted to escalate is only decorative.\n\nThe practical procedure is to define trusted boundaries, record security-relevant events, look for violations of expected behavior, and investigate anomalies with preserved evidence. Defenders should inventory assets, identify trusted boundaries, patch by risk and exposure, preserve logs, test alerts, restrict authority, and rehearse containment. Exceptions need an owner and deadline because deferred remediation easily becomes the permanent architecture.\n\nPublic accounts of breaches often center on sophisticated attackers or unknown vulnerabilities. Those events occur, but many large compromises use published flaws, stolen credentials, reachable services, and alarms normalized through repetition. The attacker may be skilled while the preventable condition remains the decisive engineering fact.\n\nThe security lesson is monitoring works only when alerts correspond to meaningful threats and someone retains authority to act on them. Defense works when known weaknesses are closed and warning signals retain a path to action. Risk acceptance should record the system owner, affected data, compensating control, and date for reconsideration. Incident recovery should verify that persistence and exposed credentials are removed before services return to normal traffic.",
      "frame": "Reopens a muted alert. \"At The Customer Database Servers, acknowledgment is not containment. Explain computer-security threat monitoring.\"",
      "q": [
        {
          "q": "Which security account best captures James P. Anderson’s contribution to computer-security threat monitoring?",
          "o": [
            {
              "t": "James P. Anderson's early security studies analyzed penetration, reference monitors, and the need for systematic monitoring of threats in shared computer systems. The breach timeline keeps assumptions explicit.",
              "v": "expert",
              "fb": "Correct: computer defense requires prevention, meaningful detection, escalation, and verified recovery."
            },
            {
              "t": "James P. Anderson contributed to computer-security threat monitoring, but the account records suspicious activity without assigning remediation or closing the exposed path. Remediation remains unowned.",
              "v": "partial",
              "fb": "Detection without assigned remediation can document exposure while allowing it to continue."
            },
            {
              "t": "James P. Anderson is portrayed as proving that a capable attacker makes known vulnerabilities, excessive privilege, and missed patches irrelevant. Under the breach timeline, direct comparison fails.",
              "v": "wrong",
              "fb": "Attacker skill does not erase the significance of a known flaw, excessive privilege, or missing patch."
            },
            {
              "t": "James P. Anderson is used to mute repeated warnings because their volume has become inconvenient for the operations team. Convenience silences detection. Under the breach timeline, warning is postponed.",
              "v": "danger",
              "fb": "Repeated warnings should trigger tuning and investigation, not removal of the channel reporting danger."
            }
          ]
        },
        {
          "q": "What defensive sequence matches the security profile?",
          "o": [
            {
              "t": "During defensive review, carry out this practice: define trusted boundaries, record security-relevant events, look for violations of expected behavior, and investigate anomalies with preserved evidence.",
              "v": "expert",
              "fb": "Correct: computer defense requires prevention, meaningful detection, escalation, and verified recovery."
            },
            {
              "t": "Acknowledge the alert and open a ticket, but leave the vulnerable service reachable and the remediation deadline unowned. The risky service stays reachable. The breach timeline leaves one test open.",
              "v": "partial",
              "fb": "Detection without assigned remediation can document exposure while allowing it to continue."
            },
            {
              "t": "Attribute the incident to attacker sophistication before checking the patch queue, privilege paths, detection history, or risk register. The patch record contradicts that. The alert history points elsewhere.",
              "v": "wrong",
              "fb": "Attacker skill does not erase the significance of a known flaw, excessive privilege, or missing patch."
            },
            {
              "t": "Silence the noisy rule, defer the published fix again, and restore normal service before persistence and stolen credentials are tested. Within the breach timeline, assumption replaces verification.",
              "v": "danger",
              "fb": "Repeated warnings should trigger tuning and investigation, not removal of the channel reporting danger."
            }
          ]
        },
        {
          "q": "Which incident conclusion is most responsible?",
          "o": [
            {
              "t": "The incident lesson is that monitoring works only when alerts correspond to meaningful threats and someone retains authority to act on them. Exposure can be verified closed.",
              "v": "expert",
              "fb": "Correct: computer defense requires prevention, meaningful detection, escalation, and verified recovery."
            },
            {
              "t": "Detection and documentation provide sufficient control even when the same alert recurs and the responsible system remains exposed. The breach timeline leaves one test open.",
              "v": "partial",
              "fb": "Detection without assigned remediation can document exposure while allowing it to continue."
            },
            {
              "t": "A large breach establishes use of an unknown zero-day, so earlier patch notices and muted alarms does not be causally important. The breach timeline defeats that inference.",
              "v": "wrong",
              "fb": "Attacker skill does not erase the significance of a known flaw, excessive privilege, or missing patch."
            },
            {
              "t": "The attacker is treated as a nation-state mastermind or the event was unavoidable, excluding a known weakness left open by choice. Inside the breach timeline, drama displaces testing.",
              "v": "danger",
              "fb": "Repeated warnings should trigger tuning and investigation, not removal of the channel reporting danger."
            }
          ]
        }
      ]
    },
    "b_kernel": {
      "sci": "Roger Schell (b. 1939)",
      "topic": "The security kernel & trusted systems",
      "lede": "Roger Schell treated the security kernel and trusted systems as a system property rather than a product label.",
      "no": 2,
      "profile": "Today’s security-operations brief follows Roger Schell into the security kernel and trusted systems. Roger Schell championed high-assurance secure systems and security kernels built around a small, verifiable mechanism enforcing access policy. Computer defense is a chain of prevention, detection, response, and recovery. Schell’s work shows why the chain must be designed around realistic adversaries and ordinary administrative error. A patched server with excessive privilege remains exposed; a strong alerting system that nobody is permitted to escalate is only decorative.\n\nThe practical procedure is to minimize the trusted computing base, mediate every access, isolate privileged functions, and subject the enforcement mechanism to rigorous evaluation. Defenders should inventory assets, identify trusted boundaries, patch by risk and exposure, preserve logs, test alerts, restrict authority, and rehearse containment. Exceptions need an owner and deadline because deferred remediation easily becomes the permanent architecture.\n\nPublic accounts of breaches often center on sophisticated attackers or unknown vulnerabilities. Those events occur, but many large compromises use published flaws, stolen credentials, reachable services, and alarms normalized through repetition. The attacker may be skilled while the preventable condition remains the decisive engineering fact.\n\nThe security lesson is security claims are stronger when the component that must be trusted is small enough to inspect and difficult to bypass. Defense works when known weaknesses are closed and warning signals retain a path to action. An acknowledged alert is not a resolved alert unless the underlying behavior has been explained or contained. Risk acceptance should record the system owner, affected data, compensating control, and date for reconsideration.",
      "frame": "Exports the logs before rotation. \"Before the trail disappears, tell me how the security kernel and trusted systems should be investigated.\"",
      "q": [
        {
          "q": "Which security account best captures Roger Schell’s contribution to the security kernel and trusted systems?",
          "o": [
            {
              "t": "Roger Schell championed high-assurance secure systems and security kernels built around a small, verifiable mechanism enforcing access policy. The response path stays actionable.",
              "v": "expert",
              "fb": "Correct: computer defense requires prevention, meaningful detection, escalation, and verified recovery."
            },
            {
              "t": "Roger Schell contributed to the security kernel and trusted systems, but the account records suspicious activity without assigning remediation or closing the exposed path.",
              "v": "partial",
              "fb": "Detection without assigned remediation can document exposure while allowing it to continue."
            },
            {
              "t": "Roger Schell is portrayed as proving that a capable attacker makes known vulnerabilities, excessive privilege, and missed patches irrelevant. The patch record contradicts that.",
              "v": "wrong",
              "fb": "Attacker skill does not erase the significance of a known flaw, excessive privilege, or missing patch."
            },
            {
              "t": "Roger Schell is used to mute repeated warnings because their volume has become inconvenient for the operations team. Inside the breach timeline, the claim outruns checks.",
              "v": "danger",
              "fb": "Repeated warnings should trigger tuning and investigation, not removal of the channel reporting danger."
            }
          ]
        },
        {
          "q": "What defensive sequence matches the security profile?",
          "o": [
            {
              "t": "During defensive review, carry out this practice: minimize the trusted computing base, mediate every access, isolate privileged functions, and subject the enforcement mechanism to rigorous evaluation.",
              "v": "expert",
              "fb": "Correct: computer defense requires prevention, meaningful detection, escalation, and verified recovery."
            },
            {
              "t": "Acknowledge the alert and open a ticket, but leave the vulnerable service reachable and the remediation deadline unowned. The risky service stays reachable. The breach timeline leaves one test open.",
              "v": "partial",
              "fb": "Detection without assigned remediation can document exposure while allowing it to continue."
            },
            {
              "t": "Attribute the incident to attacker sophistication before checking the patch queue, privilege paths, detection history, or risk register. The patch record contradicts that. The alert history points elsewhere.",
              "v": "wrong",
              "fb": "Attacker skill does not erase the significance of a known flaw, excessive privilege, or missing patch."
            },
            {
              "t": "Silence the noisy rule, defer the published fix again, and restore normal service before persistence and stolen credentials are tested. Within the breach timeline, assumption replaces verification.",
              "v": "danger",
              "fb": "Repeated warnings should trigger tuning and investigation, not removal of the channel reporting danger."
            }
          ]
        },
        {
          "q": "Which incident conclusion is most responsible?",
          "o": [
            {
              "t": "The incident lesson is that security claims are stronger when the component that must be trusted is small enough to inspect and difficult to bypass. Exposure can be verified closed.",
              "v": "expert",
              "fb": "Correct: computer defense requires prevention, meaningful detection, escalation, and verified recovery."
            },
            {
              "t": "Detection and documentation provide sufficient control even when the same alert recurs and the responsible system remains exposed. Support across the breach timeline stays partial.",
              "v": "partial",
              "fb": "Detection without assigned remediation can document exposure while allowing it to continue."
            },
            {
              "t": "A large breach establishes use of an unknown zero-day, so earlier patch notices and muted alarms does not be causally important. Under the breach timeline, direct comparison fails.",
              "v": "wrong",
              "fb": "Attacker skill does not erase the significance of a known flaw, excessive privilege, or missing patch."
            },
            {
              "t": "The attacker is treated as a nation-state mastermind or the event was unavoidable, excluding a known weakness left open by choice. Within the breach timeline, assumption replaces verification.",
              "v": "danger",
              "fb": "Repeated warnings should trigger tuning and investigation, not removal of the channel reporting danger."
            }
          ]
        }
      ]
    },
    "b_leastpriv": {
      "sci": "Jerome Saltzer (b. 1939)",
      "topic": "Protection & least privilege",
      "lede": "Logs, privilege, and trusted boundaries anchor Jerome Saltzer’s work on protection and least privilege.",
      "no": 3,
      "profile": "Today’s security-operations brief follows Jerome Saltzer into protection and least privilege. Jerome Saltzer helped articulate least privilege and other protection principles for information systems. Computer defense is a chain of prevention, detection, response, and recovery. Saltzer’s work shows why the chain must be designed around realistic adversaries and ordinary administrative error. A patched server with excessive privilege remains exposed; a strong alerting system that nobody is permitted to escalate is only decorative.\n\nThe practical procedure is to give each user and process only the authority needed for the current task, separate duties, and remove privileges when the task ends. Defenders should inventory assets, identify trusted boundaries, patch by risk and exposure, preserve logs, test alerts, restrict authority, and rehearse containment. Exceptions need an owner and deadline because deferred remediation easily becomes the permanent architecture.\n\nPublic accounts of breaches often center on sophisticated attackers or unknown vulnerabilities. Those events occur, but many large compromises use published flaws, stolen credentials, reachable services, and alarms normalized through repetition. The attacker may be skilled while the preventable condition remains the decisive engineering fact.\n\nThe security lesson is a compromised component causes less damage when unnecessary authority was never available to it. Defense works when known weaknesses are closed and warning signals retain a path to action. Incident recovery should verify that persistence and exposed credentials are removed before services return to normal traffic. An acknowledged alert is not a resolved alert unless the underlying behavior has been explained or contained. Risk acceptance should record the system owner, affected data, compensating control, and date for reconsideration.",
      "frame": "Sets the patch notice beside the exposure scan. \"The flaw had a name and a fix. Show me what protection and least privilege demands.\"",
      "q": [
        {
          "q": "Which security account best captures Jerome Saltzer’s contribution to protection and least privilege?",
          "o": [
            {
              "t": "Jerome Saltzer helped articulate least privilege and other protection principles for information systems. The breach timeline keeps assumptions explicit. The breach timeline keeps verification visible.",
              "v": "expert",
              "fb": "Correct: computer defense requires prevention, meaningful detection, escalation, and verified recovery."
            },
            {
              "t": "Jerome Saltzer contributed to protection and least privilege, but the account records suspicious activity without assigning remediation or closing the exposed path. Remediation remains unowned.",
              "v": "partial",
              "fb": "Detection without assigned remediation can document exposure while allowing it to continue."
            },
            {
              "t": "Jerome Saltzer is portrayed as proving that a capable attacker makes known vulnerabilities, excessive privilege, and missed patches irrelevant. Under the breach timeline, direct comparison fails.",
              "v": "wrong",
              "fb": "Attacker skill does not erase the significance of a known flaw, excessive privilege, or missing patch."
            },
            {
              "t": "Jerome Saltzer is used to mute repeated warnings because their volume has become inconvenient for the operations team. Convenience silences detection. Under the breach timeline, warning is postponed.",
              "v": "danger",
              "fb": "Repeated warnings should trigger tuning and investigation, not removal of the channel reporting danger."
            }
          ]
        },
        {
          "q": "What defensive sequence matches the security profile?",
          "o": [
            {
              "t": "During defensive review, carry out this practice: give each user and process only the authority needed for the current task, separate duties, and remove privileges when the task ends.",
              "v": "expert",
              "fb": "Correct: computer defense requires prevention, meaningful detection, escalation, and verified recovery."
            },
            {
              "t": "Acknowledge the alert and open a ticket, but leave the vulnerable service reachable and the remediation deadline unowned. Across the breach timeline, comparison remains incomplete.",
              "v": "partial",
              "fb": "Detection without assigned remediation can document exposure while allowing it to continue."
            },
            {
              "t": "Attribute the incident to attacker sophistication before checking the patch queue, privilege paths, detection history, or risk register. Under the breach timeline, direct comparison fails.",
              "v": "wrong",
              "fb": "Attacker skill does not erase the significance of a known flaw, excessive privilege, or missing patch."
            },
            {
              "t": "Silence the noisy rule, defer the published fix again, and restore normal service before persistence and stolen credentials are tested. Under the breach timeline, warning is postponed.",
              "v": "danger",
              "fb": "Repeated warnings should trigger tuning and investigation, not removal of the channel reporting danger."
            }
          ]
        },
        {
          "q": "Which incident conclusion is most responsible?",
          "o": [
            {
              "t": "The incident lesson is that a compromised component causes less damage when unnecessary authority was never available to it. The breach timeline keeps assumptions explicit.",
              "v": "expert",
              "fb": "Correct: computer defense requires prevention, meaningful detection, escalation, and verified recovery."
            },
            {
              "t": "Detection and documentation provide sufficient control even when the same alert recurs and the responsible system remains exposed. The risky service stays reachable in the case file.",
              "v": "partial",
              "fb": "Detection without assigned remediation can document exposure while allowing it to continue."
            },
            {
              "t": "A large breach establishes use of an unknown zero-day, so earlier patch notices and muted alarms does not be causally important. The breach timeline defeats that inference.",
              "v": "wrong",
              "fb": "Attacker skill does not erase the significance of a known flaw, excessive privilege, or missing patch."
            },
            {
              "t": "The attacker is treated as a nation-state mastermind or the event was unavoidable, excluding a known weakness left open by choice. Under the breach timeline, warning is postponed.",
              "v": "danger",
              "fb": "Repeated warnings should trigger tuning and investigation, not removal of the channel reporting danger."
            }
          ]
        }
      ]
    },
    "b_bella": {
      "sci": "David Elliott Bell (security-model pioneer)",
      "topic": "The Bell-LaPadula confidentiality model",
      "lede": "David Elliott Bell made the Bell-LaPadula confidentiality model part of a defensible chain from prevention to response.",
      "no": 4,
      "profile": "Today’s security-operations brief follows David Elliott Bell into the Bell-LaPadula confidentiality model. David Elliott Bell co-developed the Bell–LaPadula model, formalizing mandatory confidentiality rules for systems handling multiple classification levels. Computer defense is a chain of prevention, detection, response, and recovery. Bell’s work shows why the chain must be designed around realistic adversaries and ordinary administrative error. A patched server with excessive privilege remains exposed; a strong alerting system that nobody is permitted to escalate is only decorative.\n\nThe practical procedure is to label subjects and objects, restrict reading upward and writing downward according to policy, and preserve state transitions that maintain confidentiality. Defenders should inventory assets, identify trusted boundaries, patch by risk and exposure, preserve logs, test alerts, restrict authority, and rehearse containment. Exceptions need an owner and deadline because deferred remediation easily becomes the permanent architecture.\n\nPublic accounts of breaches often center on sophisticated attackers or unknown vulnerabilities. Those events occur, but many large compromises use published flaws, stolen credentials, reachable services, and alarms normalized through repetition. The attacker may be skilled while the preventable condition remains the decisive engineering fact.\n\nThe security lesson is a formal model can prove a property only within its assumptions and says little about integrity, usability, or misconfigured labels. Defense works when known weaknesses are closed and warning signals retain a path to action. Risk acceptance should record the system owner, affected data, compensating control, and date for reconsideration. Incident recovery should verify that persistence and exposed credentials are removed before services return to normal traffic.",
      "frame": "Reopens a muted alert. \"At The Security Operations Centre, acknowledgment is not containment. Explain the Bell-LaPadula confidentiality model.\"",
      "q": [
        {
          "q": "Which security account best captures David Elliott Bell’s contribution to the Bell-LaPadula confidentiality model?",
          "o": [
            {
              "t": "David Elliott Bell co-developed the Bell–LaPadula model, formalizing mandatory confidentiality rules for systems handling multiple classification levels. Exposure can be verified closed.",
              "v": "expert",
              "fb": "Correct: computer defense requires prevention, meaningful detection, escalation, and verified recovery."
            },
            {
              "t": "David Elliott Bell contributed to the Bell-LaPadula confidentiality model, but the account records suspicious activity without assigning remediation or closing the exposed path.",
              "v": "partial",
              "fb": "Detection without assigned remediation can document exposure while allowing it to continue."
            },
            {
              "t": "David Elliott Bell is portrayed as proving that a capable attacker makes known vulnerabilities, excessive privilege, and missed patches irrelevant. The patch record contradicts that.",
              "v": "wrong",
              "fb": "Attacker skill does not erase the significance of a known flaw, excessive privilege, or missing patch."
            },
            {
              "t": "David Elliott Bell is used to mute repeated warnings because their volume has become inconvenient for the operations team. Inside the breach timeline, drama displaces testing.",
              "v": "danger",
              "fb": "Repeated warnings should trigger tuning and investigation, not removal of the channel reporting danger."
            }
          ]
        },
        {
          "q": "What defensive sequence matches the security profile?",
          "o": [
            {
              "t": "During defensive review, carry out this practice: label subjects and objects, restrict reading upward and writing downward according to policy, and preserve state transitions that maintain confidentiality.",
              "v": "expert",
              "fb": "Correct: computer defense requires prevention, meaningful detection, escalation, and verified recovery."
            },
            {
              "t": "Acknowledge the alert and open a ticket, but leave the vulnerable service reachable and the remediation deadline unowned. Remediation remains unowned. Support across the breach timeline stays partial.",
              "v": "partial",
              "fb": "Detection without assigned remediation can document exposure while allowing it to continue."
            },
            {
              "t": "Attribute the incident to attacker sophistication before checking the patch queue, privilege paths, detection history, or risk register. The patch record contradicts that. The alert history points elsewhere.",
              "v": "wrong",
              "fb": "Attacker skill does not erase the significance of a known flaw, excessive privilege, or missing patch."
            },
            {
              "t": "Silence the noisy rule, defer the published fix again, and restore normal service before persistence and stolen credentials are tested. Within the breach timeline, assumption replaces verification.",
              "v": "danger",
              "fb": "Repeated warnings should trigger tuning and investigation, not removal of the channel reporting danger."
            }
          ]
        },
        {
          "q": "Which incident conclusion is most responsible?",
          "o": [
            {
              "t": "The incident lesson is that a formal model can prove a property only within its assumptions and says little about integrity, usability, or misconfigured labels. Exposure can be verified closed in the case file.",
              "v": "expert",
              "fb": "Correct: computer defense requires prevention, meaningful detection, escalation, and verified recovery."
            },
            {
              "t": "Detection and documentation provide sufficient control even when the same alert recurs and the responsible system remains exposed. Remediation remains unowned. The risky service stays reachable in the case file.",
              "v": "partial",
              "fb": "Detection without assigned remediation can document exposure while allowing it to continue."
            },
            {
              "t": "A large breach establishes use of an unknown zero-day, so earlier patch notices and muted alarms does not be causally important. The patch record contradicts that. The alert history points elsewhere.",
              "v": "wrong",
              "fb": "Attacker skill does not erase the significance of a known flaw, excessive privilege, or missing patch."
            },
            {
              "t": "The attacker is treated as a nation-state mastermind or the event was unavoidable, excluding a known weakness left open by choice. Convenience silences detection. Under the breach timeline, warning is postponed.",
              "v": "danger",
              "fb": "Repeated warnings should trigger tuning and investigation, not removal of the channel reporting danger."
            }
          ]
        }
      ]
    },
    "b_biba": {
      "sci": "Kenneth Biba (integrity-model pioneer)",
      "topic": "The integrity model",
      "lede": "Kenneth Biba treated the integrity model as a system property rather than a product label.",
      "no": 5,
      "profile": "Today’s security-operations brief follows Kenneth Biba into the integrity model. Kenneth Biba proposed an integrity model that restricts information flow to prevent less trustworthy data from contaminating more trusted processes or records. Computer defense is a chain of prevention, detection, response, and recovery. Biba’s work shows why the chain must be designed around realistic adversaries and ordinary administrative error. A patched server with excessive privilege remains exposed; a strong alerting system that nobody is permitted to escalate is only decorative.\n\nThe practical procedure is to assign integrity levels, limit reads from lower-trust sources and writes into higher-trust objects, and control invocation between domains. Defenders should inventory assets, identify trusted boundaries, patch by risk and exposure, preserve logs, test alerts, restrict authority, and rehearse containment. Exceptions need an owner and deadline because deferred remediation easily becomes the permanent architecture.\n\nPublic accounts of breaches often center on sophisticated attackers or unknown vulnerabilities. Those events occur, but many large compromises use published flaws, stolen credentials, reachable services, and alarms normalized through repetition. The attacker may be skilled while the preventable condition remains the decisive engineering fact.\n\nThe security lesson is confidentiality and integrity move information in different directions, so protecting one does not automatically protect the other. Defense works when known weaknesses are closed and warning signals retain a path to action. An acknowledged alert is not a resolved alert unless the underlying behavior has been explained or contained. Risk acceptance should record the system owner, affected data, compensating control, and date for reconsideration.",
      "frame": "Exports the logs before rotation. \"Before the trail disappears, tell me how the integrity model should be investigated.\"",
      "q": [
        {
          "q": "Which security account best captures Kenneth Biba’s contribution to the integrity model?",
          "o": [
            {
              "t": "Kenneth Biba proposed an integrity model that restricts information flow to prevent less trustworthy data from contaminating more trusted processes or records. Exposure can be verified closed.",
              "v": "expert",
              "fb": "Correct: computer defense requires prevention, meaningful detection, escalation, and verified recovery."
            },
            {
              "t": "Kenneth Biba contributed to the integrity model, but the account records suspicious activity without assigning remediation or closing the exposed path. Remediation remains unowned.",
              "v": "partial",
              "fb": "Detection without assigned remediation can document exposure while allowing it to continue."
            },
            {
              "t": "Kenneth Biba is portrayed as proving that a capable attacker makes known vulnerabilities, excessive privilege, and missed patches irrelevant. The breach timeline defeats that inference.",
              "v": "wrong",
              "fb": "Attacker skill does not erase the significance of a known flaw, excessive privilege, or missing patch."
            },
            {
              "t": "Kenneth Biba is used to mute repeated warnings because their volume has become inconvenient for the operations team. Noise becomes permission to ignore. Convenience silences detection.",
              "v": "danger",
              "fb": "Repeated warnings should trigger tuning and investigation, not removal of the channel reporting danger."
            }
          ]
        },
        {
          "q": "What defensive sequence matches the security profile?",
          "o": [
            {
              "t": "During defensive review, carry out this practice: assign integrity levels, limit reads from lower-trust sources and writes into higher-trust objects, and control invocation between domains. Exposure can be verified closed.",
              "v": "expert",
              "fb": "Correct: computer defense requires prevention, meaningful detection, escalation, and verified recovery."
            },
            {
              "t": "Acknowledge the alert and open a ticket, but leave the vulnerable service reachable and the remediation deadline unowned. The breach timeline leaves one test open. The breach timeline leaves an assumption unresolved.",
              "v": "partial",
              "fb": "Detection without assigned remediation can document exposure while allowing it to continue."
            },
            {
              "t": "Attribute the incident to attacker sophistication before checking the patch queue, privilege paths, detection history, or risk register. The patch record contradicts that. Under the breach timeline, direct comparison fails.",
              "v": "wrong",
              "fb": "Attacker skill does not erase the significance of a known flaw, excessive privilege, or missing patch."
            },
            {
              "t": "Silence the noisy rule, defer the published fix again, and restore normal service before persistence and stolen credentials are tested. Convenience silences detection. Under the breach timeline, warning is postponed.",
              "v": "danger",
              "fb": "Repeated warnings should trigger tuning and investigation, not removal of the channel reporting danger."
            }
          ]
        },
        {
          "q": "Which incident conclusion is most responsible?",
          "o": [
            {
              "t": "The incident lesson is that confidentiality and integrity move information in different directions, so protecting one does not automatically protect the other. The response path stays actionable in the case file.",
              "v": "expert",
              "fb": "Correct: computer defense requires prevention, meaningful detection, escalation, and verified recovery."
            },
            {
              "t": "Detection and documentation provide sufficient control even when the same alert recurs and the responsible system remains exposed. Remediation remains unowned. The risky service stays reachable in the case file.",
              "v": "partial",
              "fb": "Detection without assigned remediation can document exposure while allowing it to continue."
            },
            {
              "t": "A large breach establishes use of an unknown zero-day, so earlier patch notices and muted alarms does not be causally important. The patch record contradicts that. The alert history points elsewhere in the case file.",
              "v": "wrong",
              "fb": "Attacker skill does not erase the significance of a known flaw, excessive privilege, or missing patch."
            },
            {
              "t": "The attacker is treated as a nation-state mastermind or the event was unavoidable, excluding a known weakness left open by choice. Convenience silences detection. Under the breach timeline, warning is postponed.",
              "v": "danger",
              "fb": "Repeated warnings should trigger tuning and investigation, not removal of the channel reporting danger."
            }
          ]
        }
      ]
    },
    "b_worm": {
      "sci": "Eugene Spafford (b. 1956)",
      "topic": "Worms, malware & incident analysis",
      "lede": "Logs, privilege, and trusted boundaries anchor Eugene Spafford’s work on worms, malware and incident analysis.",
      "no": 6,
      "profile": "Today’s security-operations brief follows Eugene Spafford into worms, malware and incident analysis. Eugene Spafford conducted a detailed analysis of the 1988 Morris worm, explaining how software flaws and operational choices enabled rapid Internet-wide spread. Computer defense is a chain of prevention, detection, response, and recovery. Spafford’s work shows why the chain must be designed around realistic adversaries and ordinary administrative error. A patched server with excessive privilege remains exposed; a strong alerting system that nobody is permitted to escalate is only decorative.\n\nThe practical procedure is to reconstruct the code path, affected services, propagation strategy, logs, and timeline to identify both exploit and containment failures. Defenders should inventory assets, identify trusted boundaries, patch by risk and exposure, preserve logs, test alerts, restrict authority, and rehearse containment. Exceptions need an owner and deadline because deferred remediation easily becomes the permanent architecture.\n\nPublic accounts of breaches often center on sophisticated attackers or unknown vulnerabilities. Those events occur, but many large compromises use published flaws, stolen credentials, reachable services, and alarms normalized through repetition. The attacker may be skilled while the preventable condition remains the decisive engineering fact.\n\nThe security lesson is incident analysis should produce durable defensive changes rather than treating recovery as proof that the underlying weakness is gone. Defense works when known weaknesses are closed and warning signals retain a path to action. Incident recovery should verify that persistence and exposed credentials are removed before services return to normal traffic. An acknowledged alert is not a resolved alert unless the underlying behavior has been explained or contained.",
      "frame": "Sets the patch notice beside the exposure scan. \"The flaw had a name and a fix. Show me what worms, malware and incident analysis demands.\"",
      "q": [
        {
          "q": "Which security account best captures Eugene Spafford’s contribution to worms, malware and incident analysis?",
          "o": [
            {
              "t": "Eugene Spafford conducted a detailed analysis of the 1988 Morris worm, explaining how software flaws and operational choices enabled rapid Internet-wide spread. The breach timeline keeps assumptions explicit.",
              "v": "expert",
              "fb": "Correct: computer defense requires prevention, meaningful detection, escalation, and verified recovery."
            },
            {
              "t": "Eugene Spafford contributed to worms, malware and incident analysis, but the account records suspicious activity without assigning remediation or closing the exposed path. Remediation remains unowned.",
              "v": "partial",
              "fb": "Detection without assigned remediation can document exposure while allowing it to continue."
            },
            {
              "t": "Eugene Spafford is portrayed as proving that a capable attacker makes known vulnerabilities, excessive privilege, and missed patches irrelevant. Under the breach timeline, direct comparison fails.",
              "v": "wrong",
              "fb": "Attacker skill does not erase the significance of a known flaw, excessive privilege, or missing patch."
            },
            {
              "t": "Eugene Spafford is used to mute repeated warnings because their volume has become inconvenient for the operations team. Convenience silences detection. Under the breach timeline, warning is postponed.",
              "v": "danger",
              "fb": "Repeated warnings should trigger tuning and investigation, not removal of the channel reporting danger."
            }
          ]
        },
        {
          "q": "What defensive sequence matches the security profile?",
          "o": [
            {
              "t": "During defensive review, carry out this practice: reconstruct the code path, affected services, propagation strategy, logs, and timeline to identify both exploit and containment failures.",
              "v": "expert",
              "fb": "Correct: computer defense requires prevention, meaningful detection, escalation, and verified recovery."
            },
            {
              "t": "Acknowledge the alert and open a ticket, but leave the vulnerable service reachable and the remediation deadline unowned. Across the breach timeline, comparison remains incomplete.",
              "v": "partial",
              "fb": "Detection without assigned remediation can document exposure while allowing it to continue."
            },
            {
              "t": "Attribute the incident to attacker sophistication before checking the patch queue, privilege paths, detection history, or risk register. Under the breach timeline, direct comparison fails.",
              "v": "wrong",
              "fb": "Attacker skill does not erase the significance of a known flaw, excessive privilege, or missing patch."
            },
            {
              "t": "Silence the noisy rule, defer the published fix again, and restore normal service before persistence and stolen credentials are tested. Under the breach timeline, warning is postponed.",
              "v": "danger",
              "fb": "Repeated warnings should trigger tuning and investigation, not removal of the channel reporting danger."
            }
          ]
        },
        {
          "q": "Which incident conclusion is most responsible?",
          "o": [
            {
              "t": "The incident lesson is that incident analysis should produce durable defensive changes rather than treating recovery as proof that the underlying weakness is gone in the case file.",
              "v": "expert",
              "fb": "Correct: computer defense requires prevention, meaningful detection, escalation, and verified recovery."
            },
            {
              "t": "Detection and documentation provide sufficient control even when the same alert recurs and the responsible system remains exposed. The risky service stays reachable in the case file.",
              "v": "partial",
              "fb": "Detection without assigned remediation can document exposure while allowing it to continue."
            },
            {
              "t": "A large breach establishes use of an unknown zero-day, so earlier patch notices and muted alarms does not be causally important. The alert history points elsewhere in the case file.",
              "v": "wrong",
              "fb": "Attacker skill does not erase the significance of a known flaw, excessive privilege, or missing patch."
            },
            {
              "t": "The attacker is treated as a nation-state mastermind or the event was unavoidable, excluding a known weakness left open by choice. Under the breach timeline, warning is postponed.",
              "v": "danger",
              "fb": "Repeated warnings should trigger tuning and investigation, not removal of the channel reporting danger."
            }
          ]
        }
      ]
    },
    "b_trust": {
      "sci": "Ken Thompson (b. 1943)",
      "topic": "Trusting trust & Unix security",
      "lede": "Ken Thompson made trusting trust and Unix security part of a defensible chain from prevention to response.",
      "no": 7,
      "profile": "Today’s security-operations brief follows Ken Thompson into trusting trust and Unix security. Ken Thompson's Turing Award lecture described a compiler that could insert a backdoor while hiding the malicious source from later inspection. Computer defense is a chain of prevention, detection, response, and recovery. Thompson’s work shows why the chain must be designed around realistic adversaries and ordinary administrative error. A patched server with excessive privilege remains exposed; a strong alerting system that nobody is permitted to escalate is only decorative.\n\nThe practical procedure is to trace trust through compilers, build tools, dependencies, and reproducible binaries rather than reviewing only the final application's source. Defenders should inventory assets, identify trusted boundaries, patch by risk and exposure, preserve logs, test alerts, restrict authority, and rehearse containment. Exceptions need an owner and deadline because deferred remediation easily becomes the permanent architecture.\n\nPublic accounts of breaches often center on sophisticated attackers or unknown vulnerabilities. Those events occur, but many large compromises use published flaws, stolen credentials, reachable services, and alarms normalized through repetition. The attacker may be skilled while the preventable condition remains the decisive engineering fact.\n\nThe security lesson is every verification process inherits assumptions about the tools performing the verification. Defense works when known weaknesses are closed and warning signals retain a path to action. Risk acceptance should record the system owner, affected data, compensating control, and date for reconsideration. Incident recovery should verify that persistence and exposed credentials are removed before services return to normal traffic. An acknowledged alert is not a resolved alert unless the underlying behavior has been explained or contained.",
      "frame": "Reopens a muted alert. \"At The Security Chief's Office, acknowledgment is not containment. Explain trusting trust and Unix security.\"",
      "q": [
        {
          "q": "Which security account best captures Ken Thompson’s contribution to trusting trust and Unix security?",
          "o": [
            {
              "t": "Ken Thompson's Turing Award lecture described a compiler that could insert a backdoor while hiding the malicious source from later inspection. The breach timeline lets later reviewers reconstruct events.",
              "v": "expert",
              "fb": "Correct: computer defense requires prevention, meaningful detection, escalation, and verified recovery."
            },
            {
              "t": "Ken Thompson contributed to trusting trust and Unix security, but the account records suspicious activity without assigning remediation or closing the exposed path. Remediation remains unowned.",
              "v": "partial",
              "fb": "Detection without assigned remediation can document exposure while allowing it to continue."
            },
            {
              "t": "Ken Thompson is portrayed as proving that a capable attacker makes known vulnerabilities, excessive privilege, and missed patches irrelevant. Under the breach timeline, direct comparison fails.",
              "v": "wrong",
              "fb": "Attacker skill does not erase the significance of a known flaw, excessive privilege, or missing patch."
            },
            {
              "t": "Ken Thompson is used to mute repeated warnings because their volume has become inconvenient for the operations team. Convenience silences detection. Under the breach timeline, warning is postponed.",
              "v": "danger",
              "fb": "Repeated warnings should trigger tuning and investigation, not removal of the channel reporting danger."
            }
          ]
        },
        {
          "q": "What defensive sequence matches the security profile?",
          "o": [
            {
              "t": "During defensive review, carry out this practice: trace trust through compilers, build tools, dependencies, and reproducible binaries rather than reviewing only the final application's source. Exposure can be verified closed.",
              "v": "expert",
              "fb": "Correct: computer defense requires prevention, meaningful detection, escalation, and verified recovery."
            },
            {
              "t": "Acknowledge the alert and open a ticket, but leave the vulnerable service reachable and the remediation deadline unowned. The breach timeline leaves one test open. Across the breach timeline, comparison remains incomplete.",
              "v": "partial",
              "fb": "Detection without assigned remediation can document exposure while allowing it to continue."
            },
            {
              "t": "Attribute the incident to attacker sophistication before checking the patch queue, privilege paths, detection history, or risk register. The breach timeline defeats that inference. The breach timeline points to another result.",
              "v": "wrong",
              "fb": "Attacker skill does not erase the significance of a known flaw, excessive privilege, or missing patch."
            },
            {
              "t": "Silence the noisy rule, defer the published fix again, and restore normal service before persistence and stolen credentials are tested. Convenience silences detection. Inside the breach timeline, the claim outruns checks.",
              "v": "danger",
              "fb": "Repeated warnings should trigger tuning and investigation, not removal of the channel reporting danger."
            }
          ]
        },
        {
          "q": "Which incident conclusion is most responsible?",
          "o": [
            {
              "t": "The incident lesson is that every verification process inherits assumptions about the tools performing the verification. The breach timeline keeps assumptions explicit in the case file.",
              "v": "expert",
              "fb": "Correct: computer defense requires prevention, meaningful detection, escalation, and verified recovery."
            },
            {
              "t": "Detection and documentation provide sufficient control even when the same alert recurs and the responsible system remains exposed. The risky service stays reachable in the case file.",
              "v": "partial",
              "fb": "Detection without assigned remediation can document exposure while allowing it to continue."
            },
            {
              "t": "A large breach establishes use of an unknown zero-day, so earlier patch notices and muted alarms does not be causally important. The alert history points elsewhere in the case file.",
              "v": "wrong",
              "fb": "Attacker skill does not erase the significance of a known flaw, excessive privilege, or missing patch."
            },
            {
              "t": "The attacker is treated as a nation-state mastermind or the event was unavoidable, excluding a known weakness left open by choice. Under the breach timeline, warning is postponed.",
              "v": "danger",
              "fb": "Repeated warnings should trigger tuning and investigation, not removal of the channel reporting danger."
            }
          ]
        }
      ]
    },
    "b_ware": {
      "sci": "Willis Ware (1920-2013)",
      "topic": "Computer security & privacy safeguards",
      "lede": "Willis Ware treated computer security and privacy safeguards as a system property rather than a product label.",
      "no": 8,
      "profile": "Today’s security-operations brief follows Willis Ware into computer security and privacy safeguards. Willis Ware chaired the study that produced the 1970 report Security Controls for Computer Systems, addressing technical, physical, personnel, and administrative safeguards. Computer defense is a chain of prevention, detection, response, and recovery. Ware’s work shows why the chain must be designed around realistic adversaries and ordinary administrative error. A patched server with excessive privilege remains exposed; a strong alerting system that nobody is permitted to escalate is only decorative.\n\nThe practical procedure is to treat security as a system of controls covering access, operations, maintenance, auditing, people, and contingency planning. Defenders should inventory assets, identify trusted boundaries, patch by risk and exposure, preserve logs, test alerts, restrict authority, and rehearse containment. Exceptions need an owner and deadline because deferred remediation easily becomes the permanent architecture.\n\nPublic accounts of breaches often center on sophisticated attackers or unknown vulnerabilities. Those events occur, but many large compromises use published flaws, stolen credentials, reachable services, and alarms normalized through repetition. The attacker may be skilled while the preventable condition remains the decisive engineering fact.\n\nThe security lesson is technical protection fails when governance permits known risks to remain unassigned, undocumented, or indefinitely deferred. Defense works when known weaknesses are closed and warning signals retain a path to action. An acknowledged alert is not a resolved alert unless the underlying behavior has been explained or contained. Risk acceptance should record the system owner, affected data, compensating control, and date for reconsideration. Incident recovery should verify that persistence and exposed credentials are removed before services return to normal traffic.",
      "frame": "Exports the logs before rotation. \"Before the trail disappears, tell me how computer security and privacy safeguards should be investigated.\"",
      "q": [
        {
          "q": "Which security account best captures Willis Ware’s contribution to computer security and privacy safeguards?",
          "o": [
            {
              "t": "Willis Ware chaired the study that produced the 1970 report Security Controls for Computer Systems, addressing technical, physical, personnel, and administrative safeguards. The breach timeline keeps assumptions explicit.",
              "v": "expert",
              "fb": "Correct: computer defense requires prevention, meaningful detection, escalation, and verified recovery."
            },
            {
              "t": "Willis Ware contributed to computer security and privacy safeguards, but the account records suspicious activity without assigning remediation or closing the exposed path. The breach timeline leaves one test open.",
              "v": "partial",
              "fb": "Detection without assigned remediation can document exposure while allowing it to continue."
            },
            {
              "t": "Willis Ware is portrayed as proving that a capable attacker makes known vulnerabilities, excessive privilege, and missed patches irrelevant. The patch record contradicts that. The alert history points elsewhere.",
              "v": "wrong",
              "fb": "Attacker skill does not erase the significance of a known flaw, excessive privilege, or missing patch."
            },
            {
              "t": "Willis Ware is used to mute repeated warnings because their volume has become inconvenient for the operations team. Convenience silences detection. Within the breach timeline, assumption replaces verification.",
              "v": "danger",
              "fb": "Repeated warnings should trigger tuning and investigation, not removal of the channel reporting danger."
            }
          ]
        },
        {
          "q": "What defensive sequence matches the security profile?",
          "o": [
            {
              "t": "During defensive review, carry out this practice: treat security as a system of controls covering access, operations, maintenance, auditing, people, and contingency planning.",
              "v": "expert",
              "fb": "Correct: computer defense requires prevention, meaningful detection, escalation, and verified recovery."
            },
            {
              "t": "Acknowledge the alert and open a ticket, but leave the vulnerable service reachable and the remediation deadline unowned. Support across the breach timeline stays partial.",
              "v": "partial",
              "fb": "Detection without assigned remediation can document exposure while allowing it to continue."
            },
            {
              "t": "Attribute the incident to attacker sophistication before checking the patch queue, privilege paths, detection history, or risk register. The breach timeline defeats that inference.",
              "v": "wrong",
              "fb": "Attacker skill does not erase the significance of a known flaw, excessive privilege, or missing patch."
            },
            {
              "t": "Silence the noisy rule, defer the published fix again, and restore normal service before persistence and stolen credentials are tested. Noise becomes permission to ignore.",
              "v": "danger",
              "fb": "Repeated warnings should trigger tuning and investigation, not removal of the channel reporting danger."
            }
          ]
        },
        {
          "q": "Which incident conclusion is most responsible?",
          "o": [
            {
              "t": "The incident lesson is that technical protection fails when governance permits known risks to remain unassigned, undocumented, or indefinitely deferred. Exposure can be verified closed.",
              "v": "expert",
              "fb": "Correct: computer defense requires prevention, meaningful detection, escalation, and verified recovery."
            },
            {
              "t": "Detection and documentation provide sufficient control even when the same alert recurs and the responsible system remains exposed. Support across the breach timeline stays partial.",
              "v": "partial",
              "fb": "Detection without assigned remediation can document exposure while allowing it to continue."
            },
            {
              "t": "A large breach establishes use of an unknown zero-day, so earlier patch notices and muted alarms does not be causally important. Under the breach timeline, direct comparison fails.",
              "v": "wrong",
              "fb": "Attacker skill does not erase the significance of a known flaw, excessive privilege, or missing patch."
            },
            {
              "t": "The attacker is treated as a nation-state mastermind or the event was unavoidable, excluding a known weakness left open by choice. Within the breach timeline, assumption replaces verification.",
              "v": "danger",
              "fb": "Repeated warnings should trigger tuning and investigation, not removal of the channel reporting danger."
            }
          ]
        }
      ]
    },
    "b_cuckoo": {
      "sci": "Cliff Stoll (b. 1950)",
      "topic": "Tracking the intruder through the logs",
      "lede": "Logs, privilege, and trusted boundaries anchor Cliff Stoll’s work on tracking the intruder through the logs.",
      "no": 9,
      "profile": "Today’s security-operations brief follows Cliff Stoll into tracking the intruder through the logs. Cliff Stoll tracked an intruder through university and military networks by following a small accounting discrepancy and correlating logs across systems. Computer defense is a chain of prevention, detection, response, and recovery. Stoll’s work shows why the chain must be designed around realistic adversaries and ordinary administrative error. A patched server with excessive privilege remains exposed; a strong alerting system that nobody is permitted to escalate is only decorative.\n\nThe practical procedure is to preserve timestamps, compare authentication and network records, maintain a timeline, and coordinate without alerting the intruder prematurely. Defenders should inventory assets, identify trusted boundaries, patch by risk and exposure, preserve logs, test alerts, restrict authority, and rehearse containment. Exceptions need an owner and deadline because deferred remediation easily becomes the permanent architecture.\n\nPublic accounts of breaches often center on sophisticated attackers or unknown vulnerabilities. Those events occur, but many large compromises use published flaws, stolen credentials, reachable services, and alarms normalized through repetition. The attacker may be skilled while the preventable condition remains the decisive engineering fact.\n\nThe security lesson is ordinary operational records become powerful evidence when they are retained, synchronized, and examined with persistence. Defense works when known weaknesses are closed and warning signals retain a path to action. Incident recovery should verify that persistence and exposed credentials are removed before services return to normal traffic. An acknowledged alert is not a resolved alert unless the underlying behavior has been explained or contained.",
      "frame": "Sets the patch notice beside the exposure scan. \"The flaw had a name and a fix. Show me what tracking the intruder through the logs demands.\"",
      "q": [
        {
          "q": "Which security account best captures Cliff Stoll’s contribution to tracking the intruder through the logs?",
          "o": [
            {
              "t": "Cliff Stoll tracked an intruder through university and military networks by following a small accounting discrepancy and correlating logs across systems. The breach timeline keeps assumptions explicit.",
              "v": "expert",
              "fb": "Correct: computer defense requires prevention, meaningful detection, escalation, and verified recovery."
            },
            {
              "t": "Cliff Stoll contributed to tracking the intruder through the logs, but the account records suspicious activity without assigning remediation or closing the exposed path. Remediation remains unowned.",
              "v": "partial",
              "fb": "Detection without assigned remediation can document exposure while allowing it to continue."
            },
            {
              "t": "Cliff Stoll is portrayed as proving that a capable attacker makes known vulnerabilities, excessive privilege, and missed patches irrelevant. Under the breach timeline, direct comparison fails.",
              "v": "wrong",
              "fb": "Attacker skill does not erase the significance of a known flaw, excessive privilege, or missing patch."
            },
            {
              "t": "Cliff Stoll is used to mute repeated warnings because their volume has become inconvenient for the operations team. Convenience silences detection. Under the breach timeline, warning is postponed.",
              "v": "danger",
              "fb": "Repeated warnings should trigger tuning and investigation, not removal of the channel reporting danger."
            }
          ]
        },
        {
          "q": "What defensive sequence matches the security profile?",
          "o": [
            {
              "t": "During defensive review, carry out this practice: preserve timestamps, compare authentication and network records, maintain a timeline, and coordinate without alerting the intruder prematurely. Exposure can be verified closed.",
              "v": "expert",
              "fb": "Correct: computer defense requires prevention, meaningful detection, escalation, and verified recovery."
            },
            {
              "t": "Acknowledge the alert and open a ticket, but leave the vulnerable service reachable and the remediation deadline unowned. The breach timeline leaves one test open. Across the breach timeline, comparison remains incomplete.",
              "v": "partial",
              "fb": "Detection without assigned remediation can document exposure while allowing it to continue."
            },
            {
              "t": "Attribute the incident to attacker sophistication before checking the patch queue, privilege paths, detection history, or risk register. The breach timeline defeats that inference. Within the breach timeline, no support appears.",
              "v": "wrong",
              "fb": "Attacker skill does not erase the significance of a known flaw, excessive privilege, or missing patch."
            },
            {
              "t": "Silence the noisy rule, defer the published fix again, and restore normal service before persistence and stolen credentials are tested. Noise becomes permission to ignore. Inside the breach timeline, drama displaces testing.",
              "v": "danger",
              "fb": "Repeated warnings should trigger tuning and investigation, not removal of the channel reporting danger."
            }
          ]
        },
        {
          "q": "Which incident conclusion is most responsible?",
          "o": [
            {
              "t": "The incident lesson is that ordinary operational records become powerful evidence when they are retained, synchronized, and examined with persistence. Exposure can be verified closed.",
              "v": "expert",
              "fb": "Correct: computer defense requires prevention, meaningful detection, escalation, and verified recovery."
            },
            {
              "t": "Detection and documentation provide sufficient control even when the same alert recurs and the responsible system remains exposed. Support across the breach timeline stays partial.",
              "v": "partial",
              "fb": "Detection without assigned remediation can document exposure while allowing it to continue."
            },
            {
              "t": "A large breach establishes use of an unknown zero-day, so earlier patch notices and muted alarms does not be causally important. Under the breach timeline, direct comparison fails.",
              "v": "wrong",
              "fb": "Attacker skill does not erase the significance of a known flaw, excessive privilege, or missing patch."
            },
            {
              "t": "The attacker is treated as a nation-state mastermind or the event was unavoidable, excluding a known weakness left open by choice. Within the breach timeline, assumption replaces verification.",
              "v": "danger",
              "fb": "Repeated warnings should trigger tuning and investigation, not removal of the channel reporting danger."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "analyst": {
      "servers": "The SOC Analyst waits inside the customer database servers while preserved logs scroll past a muted rule. \"Watched the alert fire for weeks; it was acknowledged, then muted. The attacker entered once, but the warning and the missing patch appear again and again.\"",
      "soc": "The SOC Analyst waits inside the security operations centre while preserved logs scroll past a muted rule. \"Watched the alert fire for weeks; it was acknowledged, then muted. The attacker entered once, but the warning and the missing patch appear again and again.\"",
      "office": "The SOC Analyst waits inside the security chief's office while preserved logs scroll past a muted rule. \"Watched the alert fire for weeks; it was acknowledged, then muted. The attacker entered once, but the warning and the missing patch appear again and again.\""
    },
    "admin": {
      "servers": "Sysadmin Rao waits inside the customer database servers while preserved logs scroll past a muted rule. \"Ran the scanners; the critical patch sat in the queue, signed off as 'deferred'. The attacker entered once, but the warning and the missing patch appear again and again.\"",
      "soc": "Sysadmin Rao waits inside the security operations centre while preserved logs scroll past a muted rule. \"Ran the scanners; the critical patch sat in the queue, signed off as 'deferred'. The attacker entered once, but the warning and the missing patch appear again and again.\"",
      "office": "Sysadmin Rao waits inside the security chief's office while preserved logs scroll past a muted rule. \"Ran the scanners; the critical patch sat in the queue, signed off as 'deferred'. The attacker entered once, but the warning and the missing patch appear again and again.\""
    },
    "clerk": {
      "servers": "The Clerk waits inside the customer database servers while preserved logs scroll past a muted rule. \"Keeps the risk register — and the memo that accepted the risk and moved on. The attacker entered once, but the warning and the missing patch appear again and again.\"",
      "soc": "The Clerk waits inside the security operations centre while preserved logs scroll past a muted rule. \"Keeps the risk register — and the memo that accepted the risk and moved on. The attacker entered once, but the warning and the missing patch appear again and again.\"",
      "office": "The Clerk waits inside the security chief's office while preserved logs scroll past a muted rule. \"Keeps the risk register — and the memo that accepted the risk and moved on. The attacker entered once, but the warning and the missing patch appear again and again.\""
    }
  },
  "story": [
    "<b>The Halcyon Data Breach</b> opens inside the Halcyon breach inquiry, where the public explanation has hardened faster than the evidence.",
    "<b>The SOC Analyst</b>, <b>Sysadmin Rao</b>, and <b>The Clerk</b> hold different parts of the record, and every conversation begins with one real figure whose work teaches you how to read it.",
    "The case keeps pulling investigators toward <b>A genius nation-state hacker breached us</b> or <b>An unavoidable zero-day — no one could have stopped it</b>. Both are plausible enough to survive a headline; neither should survive the full dossier untested.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and decide the <b>WHAT</b> for yourself."
  ],
  "endings": {
    "overclaimWhat": "mastermind",
    "dismissalWhat": "zeroday",
    "win": {
      "expertTitle": "The Known Door Was Left Open",
      "expert": [
        "The controlling decision in <b>The Security Chief's Office</b> ties <b>Dane Ferro — the firm's security chief</b> directly to <b>A known-unpatched system and an alert switched off</b>. Not a genius nation-state hacker breached us. Not an unavoidable zero-day — no one could have stopped it.",
        "The vulnerable system was known, the patch was deferred, and repeated detection was muted. The attacker may have been capable, but the route was neither a mysterious zero-day nor an unavoidable triumph; it was a recorded exposure whose warning channel had been disabled."
      ],
      "soundTitle": "The Preventable Breach",
      "sound": [
        "Your accusation correctly joins <b>Dane Ferro — the firm's security chief</b>, <b>The Security Chief's Office</b>, and <b>A known-unpatched system and an alert switched off</b>. Scanner, alert, and risk-register evidence support the finding.",
        "The complete exfiltration sequence still requires analysis, but the organization’s own records establish preventable access and failed escalation."
      ],
      "namedTitle": "The Deferred Patch",
      "named": [
        "You name the correct answer: <b>Dane Ferro — the firm's security chief</b>, <b>The Security Chief's Office</b>, and <b>A known-unpatched system and an alert switched off</b>.",
        "The finding needs a fuller timeline, yet it identifies the patch decision, muted rule, and authority required to reconstruct and remediate the event."
      ]
    },
    "overclaim": {
      "title": "A Mastermind Larger Than the Logs",
      "body": [
        "You declare <b>A genius nation-state hacker breached us</b>, treating the scale of the loss as proof of a state operation beyond ordinary defense.",
        "The attribution outruns the evidence and distracts from the open service the records can prove. When the grand claim weakens, management portrays the entire inquiry as guesswork."
      ]
    },
    "dismissal": {
      "title": "A Zero-Day With a Patch Notice",
      "body": [
        "You accept <b>An unavoidable zero-day — no one could have stopped it</b>, ignoring that the vulnerability and remediation were documented before the intrusion.",
        "That conclusion converts a deferred decision into fate and leaves the alerting culture unchanged. The next known flaw can remain open until another attacker finds it."
      ]
    },
    "wrongNames": {
      "title": "The Exposure Found, the Chief Missed",
      "body": [
        "You recognize <b>A known-unpatched system and an alert switched off</b>, but place responsibility with the vendor or outside the security chief’s office. The risk acceptance and alert directive lead instead to"
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"Servers with an unpatched vulnerability and muted alert\"><rect x=\"52\" y=\"28\" width=\"210\" height=\"84\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M72 48 L242 48 M72 70 L242 70 M72 92 L242 92\" stroke=\"#121212\" stroke-width=\"1.2\"/><circle cx=\"224\" cy=\"48\" r=\"4\" fill=\"#326891\"/><circle cx=\"224\" cy=\"70\" r=\"4\" fill=\"#326891\"/><circle cx=\"224\" cy=\"92\" r=\"4\" fill=\"#B3261E\"/><path d=\"M262 70 L390 70\" stroke=\"#B3261E\" stroke-width=\"2.3\" stroke-dasharray=\"5 4\"/><path d=\"M426 42 L486 42 L486 98 L426 98 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M510 56 Q540 34 570 56 L570 88 Q540 110 510 88 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M514 48 L568 94\" stroke=\"#B3261E\" stroke-width=\"2\"/></svg>"
}};
