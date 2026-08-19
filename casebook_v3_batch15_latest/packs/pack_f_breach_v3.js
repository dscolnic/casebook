// Casebook V3 — three informants, three readings, one clue per correct answer.
module.exports = { PACK: {
  "schemaVersion": 3,
  "mode": "three_informants_three_readings",
  "id": "f_breach",
  "title": "The Halcyon Data Breach",
  "discipline": "Computer Security & Information Systems",
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
  "teaser": "Ninety million records leave Halcyon through systems reported fully patched. Did a foreign intrusion crew compromise a trusted software path, did a known vulnerability remain open behind muted alarms, or did an internal service failure merely make intact records appear stolen?",
  "overclaimTag": "an external supply-chain intrusion",
  "truthTag": "a genuine foreign compromise of a trusted update path",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A signed software update entering database servers through a hidden command channel\"><rect x=\"65\" y=\"30\" width=\"155\" height=\"80\" rx=\"6\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><path d=\"M85 52 h115 M85 70 h115 M85 88 h70\" stroke=\"#e2e2d8\" stroke-width=\"2\"/><path d=\"M300 38 h80 v64 h-80z\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2\"/><path d=\"M325 62 l12 12 22-30\" fill=\"none\" stroke=\"#326891\" stroke-width=\"3\"/><path d=\"M380 70 h85\" stroke=\"#B3261E\" stroke-width=\"3\"/><path d=\"M440 58 l14 12-14 12\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"3\"/><rect x=\"465\" y=\"28\" width=\"125\" height=\"84\" rx=\"6\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/></svg>",
  "overclaimTease": "An extraordinary intrusion is not proved by scale alone. It must leave a new trust failure, an external command path, and evidence that ordinary patch and alert controls were not the open door.",
  "DAYS_TOTAL": 3,
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "hacker",
      "items": [
        {
          "id": "vendor",
          "label": "The enterprise-software vendor"
        },
        {
          "id": "hacker",
          "label": "The Ardent Jackal foreign intrusion crew"
        },
        {
          "id": "cto",
          "label": "Dane Ferro — Halcyon security chief"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "servers",
      "items": [
        {
          "id": "servers",
          "label": "The Customer Database Servers"
        },
        {
          "id": "office",
          "label": "The Security Chief’s Office"
        },
        {
          "id": "soc",
          "label": "The Security Operations Centre"
        }
      ]
    },
    "what": {
      "title": "What happened",
      "truth": "mastermind",
      "items": [
        {
          "id": "unpatched",
          "label": "A known unpatched flaw and muted alert enabled ordinary intrusion"
        },
        {
          "id": "zeroday",
          "label": "A storage failure made intact records appear externally stolen"
        },
        {
          "id": "mastermind",
          "label": "A foreign crew compromised a trusted signed-update path"
        }
      ]
    }
  },
  "READING_ORDER": [
    "analyst",
    "admin",
    "clerk"
  ],
  "CHARACTERS": {
    "analyst": {
      "name": "The SOC Analyst",
      "role": "Security-operations analyst",
      "face": "🖥️",
      "badge": "A",
      "legend": "the detection console",
      "hint": "Routine vulnerability alerts were open and resolved; the first anomalous process carried a valid vendor signature.",
      "reading": "denning"
    },
    "admin": {
      "name": "Sysadmin Rao",
      "role": "Systems administrator",
      "face": "🔧",
      "badge": "S",
      "legend": "the database cluster",
      "hint": "The affected hosts were current on published patches, yet a trusted updater created an unlisted privileged service.",
      "reading": "thompson"
    },
    "clerk": {
      "name": "The Incident Records Clerk",
      "role": "Forensic logs and vendor liaison",
      "face": "🗂",
      "badge": "C",
      "legend": "the evidence archive",
      "hint": "Command traffic, staging times, and reused infrastructure match a foreign campaign rather than an internal outage.",
      "reading": "stoll"
    }
  },
  "TOPICS": {
    "denning": {
      "sci": "Dorothy Denning (b. 1945)",
      "topic": "Intrusion detection",
      "lede": "Denning taught defenders to recognize misuse from behaviour, especially when a trusted control lets the first step through.",
      "no": 1,
      "profile": "Dorothy Denning is an American computer scientist whose 1980s research helped establish intrusion detection as a field. Her central observation was that security controls cannot prevent every misuse, so systems also need methods for recognizing behaviour that departs from legitimate activity. She proposed analysing audit records for patterns associated with users, programs, and resources, then flagging statistical anomalies and known forms of abuse.\n\nIntrusion detection has since divided into several overlapping approaches. Signature systems look for previously identified indicators, while anomaly systems model expected behaviour and highlight deviations. Host sensors can see processes, privileges, and file changes; network sensors can see connections and data flows. Detection quality depends on context. A rare administrator action may be legitimate, and a patient attacker may imitate ordinary traffic. Investigators therefore correlate many weak signals rather than treating one alert as a verdict.\n\nDenning’s framework also distinguishes prevention failure from detection failure. If a published vulnerability remains open and an alert is muted, the chain should contain scanner findings and repeated warnings before exploitation. A novel trusted-path compromise may begin differently: a signed process launches, behaves normally at first, then creates new privileges or contacts infrastructure not present in any rule set.\n\nHalcyon’s routine critical findings were patched and closed before the breach window. The earliest anomaly is a validly signed updater spawning an undocumented service, followed by encrypted outbound sessions to newly registered domains. Denning’s method does not make a sophisticated attacker mythical. It shows why this case begins with a fresh behavioural deviation rather than the known alert history the internal-negligence theory requires.",
      "frame": "The analyst sorts closed vulnerabilities from the first unexplained process. “Known noise has a history. This began with something our rules had never seen.”",
      "q": [
        {
          "q": "What problem was Denning’s intrusion-detection model designed to address?",
          "o": [
            {
              "t": "Recognizing misuse from audit behaviour even when preventive controls do not block it.",
              "v": "expert",
              "fb": "Intrusion detection examines activity that preventive barriers may allow or miss."
            },
            {
              "t": "Guaranteeing that nearly every authorized program is harmless once it carries a signature.",
              "v": "partial",
              "fb": "A signature authenticates provenance, not the future behaviour of every signed component."
            },
            {
              "t": "Replacing all access controls with one statistical score for each employee.",
              "v": "wrong",
              "fb": "Detection complements rather than replaces access control."
            },
            {
              "t": "Determining an attacker’s nationality from the volume of stolen records alone.",
              "v": "danger",
              "fb": "Attribution requires infrastructure and operational evidence, not breach size."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "Denning’s chronology begins with a newly abnormal signed process, while the ordinary patch and alert findings were already closed before entry."
          }
        },
        {
          "q": "Why are several weak indicators often stronger than one dramatic alert?",
          "o": [
            {
              "t": "A single alert is rarely useful unless at least ten different products repeat it.",
              "v": "partial",
              "fb": "One high-quality alert may matter; the issue is corroboration, not an arbitrary count."
            },
            {
              "t": "Correlated process, privilege, and network changes can form a coherent intrusion sequence.",
              "v": "expert",
              "fb": "Correlation across layers reduces the ambiguity of any one unusual event."
            },
            {
              "t": "Statistical anomalies automatically prove malicious intent without contextual review on the hosts.",
              "v": "wrong",
              "fb": "Anomalies require interpretation because legitimate work can also be unusual."
            },
            {
              "t": "Multiple indicators matter mainly when they are all generated by the same sensor.",
              "v": "danger",
              "fb": "Independent sensors often strengthen rather than weaken the chain."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The correlated sequence—signed updater, privileged service, staging process, and egress—converges on the protected storage tier rather than the security office."
          }
        },
        {
          "q": "Which record would best support a muted-known-alert explanation?",
          "o": [
            {
              "t": "A fully patched host starting a new signed service after a vendor update.",
              "v": "partial",
              "fb": "That sequence instead suggests compromise of a trusted update mechanism."
            },
            {
              "t": "A command domain registered shortly before data staging begins on the hosts.",
              "v": "wrong",
              "fb": "New infrastructure supports an external operation rather than an old muted alert."
            },
            {
              "t": "A repeated scanner finding left unresolved before the same flaw is exploited.",
              "v": "expert",
              "fb": "An unresolved matching finding would establish the ordinary preventable path."
            },
            {
              "t": "An unfamiliar process appearing first on systems with one software supplier on the hosts.",
              "v": "danger",
              "fb": "Supplier concentration points toward the update channel, not a generic patch lapse."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The SOC analyst’s closed-ticket record excludes the security chief’s deferred-patch theory and shifts attention toward whoever controlled the external command infrastructure."
          }
        }
      ]
    },
    "thompson": {
      "sci": "Ken Thompson (b. 1943)",
      "topic": "Trusting trust & software supply chains",
      "lede": "Thompson showed that clean source can inherit a hidden betrayal from the tool that builds it.",
      "no": 2,
      "profile": "Ken Thompson helped create Unix at Bell Labs and later delivered one of computer security’s most unsettling arguments. In his 1984 Turing Award lecture, “Reflections on Trusting Trust,” he described how a compiler could be modified to insert a hidden backdoor when compiling a login program—and to reproduce the malicious compiler behaviour when compiling itself. The source code of both programs could then appear clean.\n\nThe thought experiment showed that inspection stops somewhere. Software depends on compilers, libraries, build systems, signing keys, update servers, and hardware. If an earlier trusted layer is compromised, later verification may faithfully approve malicious output. Thompson did not argue that trust is hopeless. He showed that security claims must include the provenance and diversity of the tools that produced the artifact.\n\nModern software signing has the same boundary. A valid signature proves that a package was signed by a particular key; it does not prove the build environment was honest or that the signer intended every included component. Reproducible builds, isolated signing, independent review, and multiple verification paths can narrow the trusted base.\n\nHalcyon’s updater bore the vendor’s valid signature and passed ordinary allow-listing. Binary comparison later found a loader absent from the public source and previous release. The compromised component installed a privileged service only on selected customer environments. Thompson’s lesson explains how a real external operation could cross a “trusted” boundary without an unpatched Halcyon server. The question becomes which build or signing layer changed, and who used the resulting access—not whether the familiar green check mark existed.",
      "frame": "Rao compares a signed binary with the public source. “The signature is valid. The extra loader is also real. Tell me how both can be true.”",
      "q": [
        {
          "q": "What did Thompson’s “trusting trust” example demonstrate?",
          "o": [
            {
              "t": "Source review generally detects a backdoor before any program can be distributed.",
              "v": "partial",
              "fb": "Thompson’s point was precisely that source inspection can stop too late."
            },
            {
              "t": "A strong password prevents malicious code from entering through the build system.",
              "v": "wrong",
              "fb": "Authentication does not protect a compromised compiler or signing pipeline."
            },
            {
              "t": "Mainly hardware defects can survive repeated recompilation of a program.",
              "v": "danger",
              "fb": "The mechanism is software-based and can reproduce itself through compilation."
            },
            {
              "t": "A compromised compiler can insert hidden behaviour while apparently clean source remains.",
              "v": "expert",
              "fb": "The attack persists through the toolchain rather than appearing in inspected source."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "The valid signature cannot rescue the benign-update story because the delivered binary contains a loader absent from the reviewed source and earlier builds."
          }
        },
        {
          "q": "What does a valid software signature establish most directly?",
          "o": [
            {
              "t": "That the package was signed with the corresponding key and was not altered afterward.",
              "v": "expert",
              "fb": "A signature authenticates origin and integrity after signing, not semantic safety."
            },
            {
              "t": "That nearly every line in the package is safe and matches the public source repository.",
              "v": "partial",
              "fb": "A compromised build can produce a signed binary that differs from reviewed source."
            },
            {
              "t": "That the vendor’s build environment could not have been accessed by an attacker.",
              "v": "wrong",
              "fb": "Signing says nothing by itself about the security of the build environment."
            },
            {
              "t": "That the receiving server no longer needs behavioural monitoring or least privilege.",
              "v": "danger",
              "fb": "Trusted software still requires constrained privilege and monitoring."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "Binary provenance links the implanted service to the signed updater installed on the database cluster, placing the operative breach at the servers."
          }
        },
        {
          "q": "Which control most directly reduces dependence on one hidden build chain?",
          "o": [
            {
              "t": "A longer end-user password printed on the software installation guide.",
              "v": "partial",
              "fb": "User passwords do not validate compiler or package provenance."
            },
            {
              "t": "Independently reproducible builds compared across separate trusted environments.",
              "v": "expert",
              "fb": "Independent reproduction can expose output that one compromised toolchain alone creates."
            },
            {
              "t": "Disabling all update checks so the installed version rarely changes.",
              "v": "wrong",
              "fb": "Refusing updates preserves known flaws and is not a sound supply-chain defense."
            },
            {
              "t": "Keeping the compiler name confidential from customers and researchers.",
              "v": "danger",
              "fb": "Secrecy of tool names does not provide independent verification."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The malicious loader appears in the vendor-signed artifact but activates through foreign command servers; that combination separates the software vendor’s compromised path from the crew directing the operation."
          }
        }
      ]
    },
    "stoll": {
      "sci": "Cliff Stoll (b. 1950)",
      "topic": "Tracking an intruder through the logs",
      "lede": "Stoll followed a few cents of discrepancy through months of logs until a remote operation acquired a shape.",
      "no": 3,
      "profile": "Cliff Stoll was an astronomer working as a systems manager at Lawrence Berkeley Laboratory when a tiny accounting discrepancy led him into a year-long intrusion investigation. In the mid-1980s he traced unauthorized activity through university and military networks, documenting login times, commands, files sought, and connections relayed across multiple systems. The case became widely known through his book The Cuckoo’s Egg.\n\nStoll’s achievement was patient correlation. Attackers can erase or alter local evidence, but complex operations leave traces at many boundaries: authentication logs, modem records, network gateways, telephone systems, account changes, and target selection. Time zones and work schedules can suggest location, while repeated infrastructure and tradecraft can link incidents. Such clues support attribution gradually; one Internet address or one foreign-language command is not enough.\n\nHe also used controlled observation, allowing the intruder to continue under surveillance so investigators could understand objectives and coordinate with other organizations. That strategy carries risk and requires authorization, but it showed the value of reconstructing an operation rather than stopping at the first compromised account.\n\nHalcyon’s command domains, staging intervals, and collection priorities overlap with a documented Ardent Jackal campaign against similar firms. The same certificate pattern and operator work hours recur, while the data leave through external relays rather than disappearing in a storage fault. Stoll’s method ties the trusted-path compromise to an active crew. It also disciplines the sensational claim: attribution rests on repeated infrastructure and behaviour, not on calling a large breach “nation-state” because the phrase sounds proportionate to the damage.",
      "frame": "The clerk strings domains, certificates, and login times across the wall. “Attribution is not a flag on a screen. It is repetition. Find it.”",
      "q": [
        {
          "q": "What made Stoll’s intrusion investigation persuasive?",
          "o": [
            {
              "t": "He identified the attacker from one suspicious login address on the first night.",
              "v": "partial",
              "fb": "One address can be relayed or shared and is rarely sufficient attribution."
            },
            {
              "t": "He assumed that any search for military files proved a specific government sponsor.",
              "v": "wrong",
              "fb": "Target interest alone does not establish who directs the attacker."
            },
            {
              "t": "He correlated commands, times, accounts, and network paths across many systems.",
              "v": "expert",
              "fb": "The multi-source chronology transformed scattered traces into an operational pattern."
            },
            {
              "t": "He erased all compromised logs so the intruder would not know he was being watched.",
              "v": "danger",
              "fb": "Preserving evidence was central to following the intrusion."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "Stoll-style correlation links the command domains, certificates, work hours, and target choices to the Ardent Jackal crew rather than a Halcyon employee."
          }
        },
        {
          "q": "Why is data egress important when testing a “storage failure” explanation?",
          "o": [
            {
              "t": "Any database outage automatically creates identical copies on foreign servers.",
              "v": "partial",
              "fb": "An outage does not inherently transmit data elsewhere."
            },
            {
              "t": "Storage faults generally use command domains registered just before the event.",
              "v": "wrong",
              "fb": "Fresh command infrastructure is operational evidence, not a storage-fault symptom."
            },
            {
              "t": "Egress volume strongly suggests the legal identity of the person operating the remote system.",
              "v": "danger",
              "fb": "Traffic supports attribution but does not by itself name a person."
            },
            {
              "t": "External relays receiving staged archives show records were transferred, not merely unavailable.",
              "v": "expert",
              "fb": "Observed transfer paths distinguish exfiltration from a local availability problem."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "Staged archives crossed external relays under interactive command, ruling out the benign claim that an internal storage fault only made records appear missing."
          }
        },
        {
          "q": "Which attribution claim is strongest?",
          "o": [
            {
              "t": "The operation reuses infrastructure and tradecraft documented across several related intrusions.",
              "v": "expert",
              "fb": "Repeated campaign infrastructure and behaviour provide cumulative attribution evidence."
            },
            {
              "t": "The breach is very large, so mainly one particular government could have caused it.",
              "v": "partial",
              "fb": "Scale does not uniquely identify an actor."
            },
            {
              "t": "A command was typed during nighttime in Halcyon’s local time zone on the hosts.",
              "v": "wrong",
              "fb": "Local nighttime is daytime in many regions and remains weak evidence."
            },
            {
              "t": "The attacker used encryption, which distinguishes foreign crews from ordinary criminals.",
              "v": "danger",
              "fb": "Encryption is common across many legitimate and malicious operations."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The final outbound sessions and staged archives are preserved on the database-server forensic images, where the intrusion’s collection objective becomes explicit."
          }
        }
      ]
    }
  },
  "story": [
    "<b>Halcyon’s dashboards show green patches and valid signatures while customer archives stream toward unfamiliar relays.</b>",
    "The SOC Analyst can separate old findings from the first anomaly. Sysadmin Rao has the signed updater and binary comparison. The Incident Records Clerk holds the campaign correlation.",
    "A neglected known flaw, a harmless storage failure, and a genuine foreign operation all remain possible until trust provenance and egress are reconstructed.",
    "The file must prove not merely that records left, but who directed the transfer and how a trusted path became the entry point."
  ],
  "endings": {
    "overclaimWhat": "unpatched",
    "dismissalWhat": "zeroday",
    "win": {
      "expertTitle": "The Trusted Path Was the Breach",
      "expert": [
        "You connect the Ardent Jackal foreign intrusion crew, the Customer Database Servers, and a foreign compromise of a trusted signed-update path. The full clue chain links the initiating condition, the physical mechanism, and the decisive record without relying on candidate order.",
        "The two alternative explanations each fit part of the scene, but neither survives the combined timing, material, and documentary evidence."
      ],
      "soundTitle": "The External Operation",
      "sound": [
        "Your accusation identifies the Ardent Jackal foreign intrusion crew, the Customer Database Servers, and a foreign compromise of a trusted signed-update path.",
        "A few missed clues leave gaps in the reconstruction, yet the evidence you recovered is sufficient to distinguish the true sequence from both traps."
      ],
      "namedTitle": "Correct Crew, Thin Attribution",
      "named": [
        "You reach the correct three-part verdict with a thin evidentiary file.",
        "The result is right, although the unrecovered clues would be needed to defend the causal chain under sustained challenge."
      ]
    },
    "overclaim": {
      "title": "The Deferred-Patch Story Fails",
      "body": [
        "Halcyon’s matching critical findings were patched and closed before the breach window.",
        "The first access came through a new signed component, not an old exposed service or muted recurring alert."
      ]
    },
    "dismissal": {
      "title": "The Records Were Taken, Not Lost",
      "body": [
        "A storage failure cannot account for staged archives, external relays, and interactive command traffic.",
        "The records were not merely unavailable; they were selected and transferred through a campaign infrastructure."
      ]
    },
    "wrongNames": {
      "title": "Right Mechanism, Wrong Attribution",
      "body": [
        "You recognize the governing mechanism but assign it to the wrong actor or move its decisive evidence away from the location where the records and physical traces converge."
      ]
    }
  }
}
};
