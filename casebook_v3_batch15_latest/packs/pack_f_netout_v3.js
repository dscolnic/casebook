// Casebook V3 — three informants, three readings, one clue per correct answer.
module.exports = { PACK: {
  "schemaVersion": 3,
  "mode": "three_informants_three_readings",
  "id": "f_netout",
  "title": "The Great Grey-Out",
  "discipline": "Computer Networks & the Internet",
  "venue": "the network-outage inquiry",
  "agent": {
    "name": "Investigator Tay Brennan",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Networking Pioneers",
  "dossierName": "NETWORKING & INTERNET PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the network-outage inquiry",
  "teaser": "Half the web becomes unreachable after one routing announcement spreads across peers. Was it a coordinated attack, an ordinary traffic surge, or a filter-bypassing configuration pushed by the on-call engineer?",
  "overclaimTag": "a coordinated attack on global routing",
  "truthTag": "a frontline route leak after a safeguard was bypassed",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A bad route announcement spreading from one core router through peers\"><g fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"><circle cx=\"100\" cy=\"70\" r=\"22\"/><circle cx=\"260\" cy=\"35\" r=\"22\"/><circle cx=\"260\" cy=\"105\" r=\"22\"/><circle cx=\"450\" cy=\"35\" r=\"22\"/><circle cx=\"450\" cy=\"105\" r=\"22\"/><circle cx=\"580\" cy=\"70\" r=\"22\"/></g><g stroke=\"#e2e2d8\" stroke-width=\"2\"><path d=\"M122 64 L238 41 M122 76 L238 99 M282 35 H428 M282 105 H428 M472 41 L558 64 M472 99 L558 76\"/></g><path d=\"M100 70 L580 70\" stroke=\"#B3261E\" stroke-width=\"4\" stroke-dasharray=\"8 6\"/><path d=\"M360 58 l14 12-14 12\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"3\"/></svg>",
  "overclaimTease": "A global-looking failure can still begin with one ordinary configuration. Follow the route origin, the propagation rules, and the congestion signature before deciding whether an adversary was needed.",
  "DAYS_TOTAL": 3,
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "netops",
      "items": [
        {
          "id": "attackers",
          "label": "An outside routing-attack crew"
        },
        {
          "id": "registry",
          "label": "The regional routing registry"
        },
        {
          "id": "netops",
          "label": "Mara Quill — the on-call network engineer"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "routers",
      "items": [
        {
          "id": "office",
          "label": "The Operations Manager’s Office"
        },
        {
          "id": "noc",
          "label": "The Network Operations Centre"
        },
        {
          "id": "routers",
          "label": "The Core Routers & Peering Edge"
        }
      ]
    },
    "what": {
      "title": "What happened",
      "truth": "misconfig",
      "items": [
        {
          "id": "misconfig",
          "label": "A local route leak spread after an outbound filter was bypassed"
        },
        {
          "id": "attack",
          "label": "A coordinated adversary injected false routes across the network"
        },
        {
          "id": "surge",
          "label": "An ordinary traffic surge exhausted otherwise correct paths"
        }
      ]
    }
  },
  "READING_ORDER": [
    "engineer",
    "peering",
    "clerk"
  ],
  "CHARACTERS": {
    "engineer": {
      "name": "The Network Engineer",
      "role": "On-call network engineer",
      "face": "🌐",
      "badge": "N",
      "legend": "the change console",
      "hint": "One emergency command disabled export validation and originated a more-specific route from the wrong edge.",
      "reading": "rekhter"
    },
    "peering": {
      "name": "The Peering Coordinator",
      "role": "Peering and routing coordinator",
      "face": "🔀",
      "badge": "P",
      "legend": "the peering edge",
      "hint": "Peers accepted the announcement according to policy; the route’s origin and path begin inside the provider.",
      "reading": "perlman"
    },
    "clerk": {
      "name": "The Change Records Clerk",
      "role": "Configuration and incident clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the operations archive",
      "hint": "Traffic collapsed after reachability changed, while link utilization remained below congestion thresholds.",
      "reading": "jacobson"
    }
  },
  "TOPICS": {
    "rekhter": {
      "sci": "Yakov Rekhter (Internet-routing pioneer)",
      "topic": "The Border Gateway Protocol",
      "lede": "Rekhter helped define the policy-driven routing system that can turn one mistaken announcement into a global detour.",
      "no": 1,
      "profile": "Yakov Rekhter is one of the principal architects of the Border Gateway Protocol, or BGP, the system through which independently operated networks exchange reachability on the Internet. BGP does not calculate one globally shortest path. Each autonomous system advertises which address prefixes it can reach, attaches a path of network numbers, and applies local policy to choose and export routes.\n\nThat design permits commercial and operational independence, but it also means trust is distributed. A network can accidentally announce prefixes it does not own, export routes learned from one provider to another, or advertise a path more specific than the legitimate route. Because routers generally prefer a more-specific prefix, one bad announcement can attract traffic rapidly. Filters, prefix limits, route registries, and cryptographic origin validation reduce the risk, but only if configured on the relevant session.\n\nBGP evidence is unusually chronological. The origin autonomous system, prefix, path changes, peer acceptance, and withdrawal times are recorded by route collectors. A coordinated attack might inject from external systems or manipulate several origins. A local leak begins at one authenticated router or automation process and then spreads through normal policy.\n\nIn the Grey-Out, collectors first see the affected prefixes originate from the provider’s own core edge immediately after an emergency change. Neighbouring networks accept the announcement because the export filter on that session has been bypassed. Rekhter’s protocol explains how one frontline command can create a global effect without a global attacker. The network’s scale amplifies the mistake; it does not identify the cause.",
      "frame": "The engineer freezes the first route-collector frame. “The world repeated this line, but someone had to speak it first. Find the origin.”",
      "q": [
        {
          "q": "What does BGP primarily exchange between autonomous systems?",
          "o": [
            {
              "t": "Individual web pages and the application data requested by each user in BGP data.",
              "v": "partial",
              "fb": "Applications use routes but their content is not carried in BGP updates."
            },
            {
              "t": "Reachable address prefixes, path information, and policy-selected advertisements.",
              "v": "expert",
              "fb": "BGP distributes reachability and path attributes between independently managed networks."
            },
            {
              "t": "A universal map of the physically shortest fibre route for nearly every packet in BGP data.",
              "v": "wrong",
              "fb": "Policy, not only physical distance, determines BGP path selection."
            },
            {
              "t": "The processor load and memory state of all routers on the Internet in BGP data.",
              "v": "danger",
              "fb": "Router resource telemetry is managed by other protocols and tools."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "Rekhter’s route collectors show one local more-specific announcement spreading through normal BGP policy after an export safeguard was removed."
          }
        },
        {
          "q": "Why can a more-specific prefix attract traffic away from a legitimate route?",
          "o": [
            {
              "t": "BGP generally trusts whichever announcement contains the largest autonomous-system number.",
              "v": "partial",
              "fb": "Autonomous-system numbers do not confer priority by size."
            },
            {
              "t": "A more-specific route physically increases the bandwidth of nearly every connected link.",
              "v": "wrong",
              "fb": "Route specificity changes selection, not link capacity."
            },
            {
              "t": "Routers generally prefer the longest matching prefix when forwarding packets.",
              "v": "expert",
              "fb": "Longest-prefix matching makes the narrower route win during forwarding."
            },
            {
              "t": "DNS converts longer prefix text into a higher routing priority automatically.",
              "v": "danger",
              "fb": "DNS naming and IP forwarding preferences are separate mechanisms."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The decisive origin is the provider’s own peering-edge router, where the more-specific routes first enter the global table."
          }
        },
        {
          "q": "Which observation best distinguishes a local leak from coordinated external injection?",
          "o": [
            {
              "t": "Many distant users report failures within the same twenty-minute period at the peering edge.",
              "v": "partial",
              "fb": "Widespread impact follows naturally once a route leak propagates."
            },
            {
              "t": "Several peers propagate the route after accepting it under their normal policy at the peering edge.",
              "v": "wrong",
              "fb": "Normal peer propagation describes amplification, not an external origin."
            },
            {
              "t": "News sites describe the outage as unusually widespread and simultaneous at the peering edge.",
              "v": "danger",
              "fb": "Public descriptions provide scale but not routing provenance."
            },
            {
              "t": "The first authenticated origin is one internal router immediately after a recorded change.",
              "v": "expert",
              "fb": "Internal origin plus change timing identifies the initiating configuration."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The authenticated change session and first BGP origin belong to the on-call engineer’s console, before any outside autonomous system advertises the prefixes."
          }
        }
      ]
    },
    "perlman": {
      "sci": "Radia Perlman (b. 1951)",
      "topic": "The spanning-tree protocol",
      "lede": "Perlman made redundant networks stable by ensuring that useful alternate paths could not reinforce a loop.",
      "no": 2,
      "profile": "Radia Perlman designed the spanning-tree protocol while working at Digital Equipment Corporation. Ethernet bridges can connect local-network segments redundantly, which improves resilience, but a loop allows frames to circulate indefinitely. Because basic Ethernet frames carry no hop limit, broadcast traffic can multiply into a storm and make the network unusable.\n\nPerlman’s protocol lets bridges elect a root and choose a loop-free set of forwarding links while leaving redundant links blocked but available. The network continuously exchanges control messages and can reconverge when topology changes. The deeper design lesson is that redundancy needs a rule preventing parallel paths from reinforcing an error. Safety mechanisms are not ornamental; they make a richly connected system stable.\n\nAlthough BGP operates at a different layer and scale, the analogy is useful. Peering diversity improves reachability, yet export policy and origin validation must constrain what each neighbour can propagate. Removing a filter can turn normal cooperation into amplification. The peers are not necessarily malfunctioning when they spread the route; they are following the information and policy they were given.\n\nThe Grey-Out path records show no fabricated peer sessions and no mysterious second origin. Each neighbouring network accepts a route that the provider itself authenticated and exported. A registry entry remains correct, but the router policy fails to enforce it. Perlman’s work separates the safety net from the underlying topology: the global mesh behaved normally after one local barrier was bypassed. The person who issued that change cannot disappear into the complexity of the Internet simply because thousands of remote routers repeated it.",
      "frame": "The peering coordinator draws a mesh and circles one missing filter. “Redundancy did not betray us. It obeyed the bad instruction we exported.”",
      "q": [
        {
          "q": "What problem does spanning tree solve in a bridged Ethernet network?",
          "o": [
            {
              "t": "It prevents forwarding loops while preserving redundant links for later use.",
              "v": "expert",
              "fb": "Spanning tree creates a loop-free forwarding topology from redundant physical links."
            },
            {
              "t": "It encrypts nearly every frame so neighbouring switches does not read its destination.",
              "v": "partial",
              "fb": "Frame encryption is not the protocol’s function."
            },
            {
              "t": "It assigns public Internet addresses to all devices connected to a bridge.",
              "v": "wrong",
              "fb": "Address assignment is handled separately from loop prevention."
            },
            {
              "t": "It increases bandwidth by sending nearly every frame around all loops simultaneously.",
              "v": "danger",
              "fb": "Uncontrolled replication around loops creates storms rather than useful capacity."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "Perlman’s stability lesson fits the incident: normal redundancy amplified one bad route only after the local export barrier was deliberately bypassed."
          }
        },
        {
          "q": "Why are remote peers not automatically the cause when they propagate a bad route?",
          "o": [
            {
              "t": "Peers have no ability to filter routes under any Internet-routing standard in BGP data.",
              "v": "partial",
              "fb": "Peers can and do apply filters, limits, and validation policies."
            },
            {
              "t": "They may be following normal policy for an authenticated advertisement received from inside.",
              "v": "expert",
              "fb": "Propagation can be normal amplification of a locally originated mistake."
            },
            {
              "t": "nearly every propagated route is legally owned by the first network that receives it.",
              "v": "wrong",
              "fb": "Reception does not transfer ownership of an address prefix."
            },
            {
              "t": "BGP propagation strongly suggests that all participating networks coordinated the original error.",
              "v": "danger",
              "fb": "Shared propagation does not imply shared intent or origin."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "Peer logs show ordinary acceptance of an internal announcement; the registry and external networks did not create the route that the engineer exported."
          }
        },
        {
          "q": "What is the relevant lesson of a blocked redundant path?",
          "o": [
            {
              "t": "Redundancy is harmful and should be removed from all reliable network designs at the peering edge.",
              "v": "partial",
              "fb": "Resilience depends on redundancy managed by appropriate constraints."
            },
            {
              "t": "Blocked links serve no purpose once the first forwarding path becomes active at the peering edge.",
              "v": "wrong",
              "fb": "Blocked links can become active after failures and remain operationally valuable."
            },
            {
              "t": "A safety rule can preserve redundancy without allowing multiple paths to reinforce an error at the peering edge.",
              "v": "expert",
              "fb": "Controlled redundancy supplies resilience while containing loops or leaks."
            },
            {
              "t": "The safest network is one in which nearly every router advertises nearly every route to nearly every neighbour.",
              "v": "danger",
              "fb": "Unrestricted export is exactly what permits local errors to spread."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The missing constraint is found in the export policy on the core peering edge, not in the registry database or the operations manager’s office."
          }
        }
      ]
    },
    "jacobson": {
      "sci": "Van Jacobson (b. 1950)",
      "topic": "TCP congestion control",
      "lede": "Jacobson taught the Internet to back away from overload, leaving signatures that separate congestion from lost reachability.",
      "no": 3,
      "profile": "Van Jacobson is a computer scientist whose work in the late 1980s rescued the growing Internet from congestion collapse. As networks filled, senders continued injecting packets faster than routers could deliver them. Queues overflowed, packets were retransmitted, and those retransmissions created still more load. Useful throughput could fall even while links looked desperately busy.\n\nJacobson introduced algorithms that made TCP adapt its sending rate to the network. Slow start probes capacity cautiously; congestion avoidance increases the window gradually; packet loss or other signals cause senders to reduce the rate. The result is a feedback system that distinguishes available capacity from overload. Later work refined the signals, but the central lesson remains: congestion has measurable queue, loss, delay, and utilization signatures.\n\nA routing outage can resemble congestion to users because both make services slow or unreachable. The network evidence differs. Congestion develops as demand approaches capacity and produces rising queues, loss, and latency on the constrained paths. A route leak abruptly changes reachability, sending traffic to the wrong destination or into a black hole even when physical links are below capacity.\n\nDuring the Grey-Out, utilization on major links remains moderate and queues do not build before reachability collapses. The decisive timestamp is the route announcement, not a traffic spike. Jacobson’s framework rules out the do-nothing explanation that the Internet simply became busy. It also sharpens responsibility: after the engineer withdraws the leaked route and restores the filter, reachability returns without adding capacity or suppressing an external attack. The controlled rollback makes the difference between lost capacity and lost reachability especially direct.",
      "frame": "The clerk lays flat utilization graphs beneath a cliff in reachability. “If traffic crushed us, where are the queues? If not, what changed?”",
      "q": [
        {
          "q": "What is congestion collapse?",
          "o": [
            {
              "t": "A routing table instantly loses all prefixes after one administrative login.",
              "v": "partial",
              "fb": "That describes a control or routing failure rather than congestion."
            },
            {
              "t": "A physical fibre breaks and prevents any packets from crossing that path.",
              "v": "wrong",
              "fb": "A fibre break is a topology fault, not the queueing phenomenon Jacobson addressed."
            },
            {
              "t": "DNS returns an incorrect name while packet delivery remains otherwise normal.",
              "v": "danger",
              "fb": "Name-resolution error is distinct from transport congestion."
            },
            {
              "t": "Useful throughput falls as excess traffic and retransmissions consume network capacity.",
              "v": "expert",
              "fb": "Congestion collapse is a feedback failure in which offered load crowds out useful delivery."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "Jacobson’s expected congestion signatures—rising utilization, queues, and loss—are absent before reachability fails, ruling out a mere traffic surge."
          }
        },
        {
          "q": "Which timeline most strongly supports a route leak?",
          "o": [
            {
              "t": "Reachability changes at the announcement time while link utilization remains below capacity.",
              "v": "expert",
              "fb": "Abrupt routing change without prior saturation is the expected leak signature."
            },
            {
              "t": "Latency rises gradually as demand fills nearly every major link during a popular event.",
              "v": "partial",
              "fb": "That pattern is consistent with ordinary congestion."
            },
            {
              "t": "Packet loss increases with queue depth before any routing update appears in BGP data.",
              "v": "wrong",
              "fb": "Queue growth preceding route change points toward load rather than reachability."
            },
            {
              "t": "Performance improves mainly after new physical capacity is added to the network.",
              "v": "danger",
              "fb": "Capacity relief would support a congestion diagnosis."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The outage begins and ends with configuration changes on the core routers, while the operations centre merely observes the resulting loss of reachability."
          }
        },
        {
          "q": "What result most directly tests the engineer’s causal role?",
          "o": [
            {
              "t": "Waiting until overnight demand falls while leaving nearly every route unchanged.",
              "v": "partial",
              "fb": "Falling demand would test congestion but not the leaked route itself."
            },
            {
              "t": "Withdrawing the route and restoring the filter returns service without changing traffic demand.",
              "v": "expert",
              "fb": "The controlled reversal removes the suspected configuration and restores reachability."
            },
            {
              "t": "Publishing a statement that no attacker has claimed responsibility at the peering edge.",
              "v": "wrong",
              "fb": "Absence of a claim is weak evidence about technical cause."
            },
            {
              "t": "Replacing a registry contact record after the network is already stable at the peering edge.",
              "v": "danger",
              "fb": "A contact update does not alter forwarding or export policy."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The same engineer account that bypassed the filter withdraws the leaked route; service returns immediately, completing the frontline attribution."
          }
        }
      ]
    }
  },
  "story": [
    "<b>The Great Grey-Out looks coordinated because the same wrong route reaches thousands of networks within minutes.</b>",
    "The Network Engineer has the authenticated origin. The Peering Coordinator can explain why neighbours propagated it. The Change Records Clerk holds the utilization and rollback timeline.",
    "An outside attack, an ordinary demand surge, and one local safety bypass each produce widespread symptoms but leave different routing evidence.",
    "The case asks who spoke the first false route, where it entered the global table, and why normal peers amplified it."
  ],
  "endings": {
    "overclaimWhat": "attack",
    "dismissalWhat": "surge",
    "win": {
      "expertTitle": "The First False Route",
      "expert": [
        "You connect Mara Quill — the on-call network engineer, the Core Routers & Peering Edge, and a local route leak after an outbound filter was bypassed. The full clue chain links the initiating condition, the physical mechanism, and the decisive record without relying on candidate order.",
        "The two alternative explanations each fit part of the scene, but neither survives the combined timing, material, and documentary evidence."
      ],
      "soundTitle": "The Leak and Rollback",
      "sound": [
        "Your accusation identifies Mara Quill — the on-call network engineer, the Core Routers & Peering Edge, and a local route leak after an outbound filter was bypassed.",
        "A few missed clues leave gaps in the reconstruction, yet the evidence you recovered is sufficient to distinguish the true sequence from both traps."
      ],
      "namedTitle": "Correct Route, Incomplete Chain",
      "named": [
        "You reach the correct three-part verdict with a thin evidentiary file.",
        "The result is right, although the unrecovered clues would be needed to defend the causal chain under sustained challenge."
      ]
    },
    "overclaim": {
      "title": "Global Impact, Local Origin",
      "body": [
        "No external autonomous system originates the affected prefixes before the provider does.",
        "Remote peers propagate the internally authenticated announcement under normal policy rather than coordinating an attack."
      ]
    },
    "dismissal": {
      "title": "The Network Was Not Simply Busy",
      "body": [
        "Links remain below capacity and queues do not rise before reachability collapses.",
        "Service returns through route withdrawal and filter restoration, not through reduced demand or added bandwidth."
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
