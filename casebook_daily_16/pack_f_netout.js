module.exports = { PACK: {
  "id": "f_netout",
  "title": "The Great Grey-Out",
  "discipline": "Computer Networks & the Internet",
  "teaser": "Half the web went dark in twenty minutes. A coordinated cyber-attack? An unlucky traffic surge? Or one bad config and a safety net someone removed?",
  "overclaimTag": "a coordinated cyber-attack",
  "truthTag": "a misconfiguration and a removed safeguard",
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
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before the inquiry closes. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The WHERE you test determines the dossier, and the conversation costs one day.",
  "overclaimTease": "Global darkness feels coordinated; scale alone cannot identify its cause.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "netops",
      "items": [
        {
          "id": "attackers",
          "label": "An outside attack crew"
        },
        {
          "id": "netops",
          "label": "Cory Idris — the network operations lead"
        },
        {
          "id": "registry",
          "label": "The routing registry"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "office",
      "items": [
        {
          "id": "routers",
          "label": "The Core Routers & Peering"
        },
        {
          "id": "noc",
          "label": "The Network Operations Centre"
        },
        {
          "id": "office",
          "label": "The Operations Manager's Office"
        }
      ]
    },
    "what": {
      "title": "What is happening",
      "truth": "misconfig",
      "items": [
        {
          "id": "attack",
          "label": "A coordinated attack knocked the network down"
        },
        {
          "id": "surge",
          "label": "An unlucky traffic surge — the internet is just fragile"
        },
        {
          "id": "misconfig",
          "label": "A routing misconfiguration and a removed safeguard cascaded"
        }
      ]
    }
  },
  "PLACES": {
    "routers": {
      "name": "The Core Routers & Peering",
      "xy": [
        140,
        90
      ]
    },
    "noc": {
      "name": "The Network Operations Centre",
      "xy": [
        330,
        240
      ]
    },
    "office": {
      "name": "The Operations Manager's Office",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "routers",
      "noc"
    ],
    [
      "noc",
      "office"
    ]
  ],
  "CHARACTERS": {
    "engineer": {
      "name": "The Network Engineer",
      "role": "On-call network engineer",
      "face": "🌐",
      "badge": "N",
      "legend": "the operations centre",
      "hint": "Pushed the change on orders; the route filter had been switched off to save time."
    },
    "peering": {
      "name": "The Peering Coordinator",
      "role": "Peering & routing coordinator",
      "face": "🔀",
      "badge": "P",
      "legend": "the router hall",
      "hint": "Watches the routes; saw one bad announcement leak everywhere at once."
    },
    "clerk": {
      "name": "The Clerk",
      "role": "Change-records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the office",
      "hint": "Keeps the change tickets — and the sign-off that removed the safety filter."
    }
  },
  "TOPICMAP": {
    "routers": {
      "engineer": [
        "n_vision"
      ],
      "peering": [
        "n_packetname"
      ],
      "clerk": [
        "n_arpanet"
      ]
    },
    "noc": {
      "engineer": [
        "n_internetwork"
      ],
      "peering": [
        "n_dnsdesign"
      ],
      "clerk": [
        "n_spanning"
      ]
    },
    "office": {
      "engineer": [
        "n_aqm"
      ],
      "peering": [
        "n_datagram"
      ],
      "clerk": [
        "n_bgp"
      ]
    }
  },
  "TOPICS": {
    "n_vision": {
      "sci": "J.C.R. Licklider (1915-1990)",
      "topic": "The vision of networked computing",
      "lede": "J.C.R. Licklider helped make the vision of networked computing scale across networks no single operator controlled.",
      "no": 1,
      "profile": "The network-operations lesson today centers on J.C.R. Licklider and the vision of networked computing. J. C. R. Licklider imagined interactive computers linked into a broad network of information and communication while directing early computing research at ARPA. The Internet is not one machine but a federation of independently operated links, routers, naming systems, and endpoint protocols. Licklider’s work shows how a small set of shared rules lets that federation scale—and how one incorrect announcement can cross organizational boundaries faster than a human review.\n\nThe network discipline is to treat remote computing resources as parts of one collaborative environment and design interaction around people rather than batch processing. Operators must separate forwarding from control, validate changes before export, limit blast radius, retain a known-good configuration, and monitor what peers actually receive. Capacity, convergence, caching, and failure recovery should be tested under burst and partial outage rather than only at steady state.\n\nDistributed design removes many single points of physical failure, yet it creates dependencies on trust and configuration. A router can be functioning exactly as programmed while propagating a route that should never have been accepted. Safeguards such as filters, staged rollout, and independent validation therefore protect the network from authorized mistakes as much as from hostile traffic.\n\nThe architectural lesson is networks become infrastructure when users depend on shared services, making resilience and governance as important as raw connectivity. Resilience requires local autonomy bounded by interfaces that reject implausible state before it spreads. Redundancy without loop prevention or policy control can amplify a fault instead of containing it.",
      "frame": "Pins a route update beside the outage clock. \"At The Core Routers & Peering, one line crossed a thousand boundaries. Explain the vision of networked computing.\"",
      "q": [
        {
          "q": "Which networking account best captures J.C.R. Licklider’s contribution to the vision of networked computing?",
          "o": [
            {
              "t": "J. C. R. Licklider imagined interactive computers linked into a broad network of information and communication while directing early computing research at ARPA. Propagation stays bounded. Rollback remains reachable in the case file.",
              "v": "expert",
              "fb": "Correct: network resilience depends on distributed protocols bounded by validation and recovery controls."
            },
            {
              "t": "J.C.R. Licklider advanced the vision of networked computing, but the account watches user traffic while leaving route policy, propagation, and rollback assumptions vague. The routing trace leaves one test open in the case file in the case file.",
              "v": "partial",
              "fb": "Traffic monitoring may reveal symptoms while missing the control-plane state that created them."
            },
            {
              "t": "J.C.R. Licklider is portrayed as relying on routers to recognize an implausible announcement even when configured policy explicitly accepts it. The route record disagrees. Protocol compliance is treated as sufficient policy justification.",
              "v": "wrong",
              "fb": "Routers follow configured policy; they do not infer whether an authorized announcement is sensible."
            },
            {
              "t": "J.C.R. Licklider is invoked to disable validation because a rapid global change is considered more valuable than a bounded rollout. Speed replaces validation. Under the routing trace, warning is postponed in the dated record in the case file.",
              "v": "danger",
              "fb": "Faster change cannot justify removing the mechanism that contains an authorized mistake."
            }
          ]
        },
        {
          "q": "Which operations practice best implements the profile?",
          "o": [
            {
              "t": "Across the routing system, perform this operation: treat remote computing resources as parts of one collaborative environment and design interaction around people rather than batch processing.",
              "v": "expert",
              "fb": "Correct: network resilience depends on distributed protocols bounded by validation and recovery controls."
            },
            {
              "t": "Confirm that local routers remain reachable, but do not inspect what prefixes peers receive or whether the safety filter is active. Peer behavior is still unknown. The routing trace leaves one test open.",
              "v": "partial",
              "fb": "Traffic monitoring may reveal symptoms while missing the control-plane state that created them."
            },
            {
              "t": "Treat syntactically valid control messages as operationally correct and infer global reachability from one successful local session. The route record disagrees. The routing trace points to another result.",
              "v": "wrong",
              "fb": "Routers follow configured policy; they do not infer whether an authorized announcement is sensible."
            },
            {
              "t": "Push the urgent configuration everywhere at once, postpone rollback preparation, and describe any cascade as ordinary Internet fragility. Within the routing trace, assumption replaces verification.",
              "v": "danger",
              "fb": "Faster change cannot justify removing the mechanism that contains an authorized mistake."
            }
          ]
        },
        {
          "q": "Which architectural conclusion is most responsible?",
          "o": [
            {
              "t": "The architectural lesson is that networks become infrastructure when users depend on shared services, making resilience and governance as important as raw connectivity in the case file.",
              "v": "expert",
              "fb": "Correct: network resilience depends on distributed protocols bounded by validation and recovery controls."
            },
            {
              "t": "Distributed operation improves resilience enough that local policy mistakes can be left for neighboring networks to identify and contain. Peer behavior is still unknown in the case file.",
              "v": "partial",
              "fb": "Traffic monitoring may reveal symptoms while missing the control-plane state that created them."
            },
            {
              "t": "Working links and routers guarantee correct reachability even when the control plane has converged on an invalid or leaked route. Protocol compliance is treated as sufficient policy justification.",
              "v": "wrong",
              "fb": "Routers follow configured policy; they do not infer whether an authorized announcement is sensible."
            },
            {
              "t": "A large outage is treated as either a coordinated cyber-attack or an unlucky traffic surge, excluding an authorized configuration failure. Under the routing trace, warning is postponed.",
              "v": "danger",
              "fb": "Faster change cannot justify removing the mechanism that contains an authorized mistake."
            }
          ]
        }
      ]
    },
    "n_packetname": {
      "sci": "Donald Davies (1924-2000)",
      "topic": "Packet switching, named",
      "lede": "Donald Davies treated packet switching, named as a distributed agreement that had to survive failure.",
      "no": 2,
      "profile": "The network-operations lesson today centers on Donald Davies and packet switching, named. Donald Davies independently developed packet switching at Britain's National Physical Laboratory and coined the word packet for the small units sharing a network. The Internet is not one machine but a federation of independently operated links, routers, naming systems, and endpoint protocols. Davies’s work shows how a small set of shared rules lets that federation scale—and how one incorrect announcement can cross organizational boundaries faster than a human review.\n\nThe network discipline is to divide messages into labeled packets that statistically share links, queue at switches, and are reassembled at the destination. Operators must separate forwarding from control, validate changes before export, limit blast radius, retain a known-good configuration, and monitor what peers actually receive. Capacity, convergence, caching, and failure recovery should be tested under burst and partial outage rather than only at steady state.\n\nDistributed design removes many single points of physical failure, yet it creates dependencies on trust and configuration. A router can be functioning exactly as programmed while propagating a route that should never have been accepted. Safeguards such as filters, staged rollout, and independent validation therefore protect the network from authorized mistakes as much as from hostile traffic.\n\nThe architectural lesson is shared links are efficient because bursts interleave, but congestion and queueing must be controlled when many senders peak together. Resilience requires local autonomy bounded by interfaces that reject implausible state before it spreads. A rollback plan is valuable only when operators can still reach the equipment after the failed change takes effect.",
      "frame": "Opens the rollback ticket. \"Before I show you who signed it, tell me what packet switching, named assumes.\"",
      "q": [
        {
          "q": "Which networking account best captures Donald Davies’s contribution to packet switching, named?",
          "o": [
            {
              "t": "Donald Davies independently developed packet switching at Britain's National Physical Laboratory and coined the word packet for the small units sharing a network. Rollback remains reachable.",
              "v": "expert",
              "fb": "Correct: network resilience depends on distributed protocols bounded by validation and recovery controls."
            },
            {
              "t": "Donald Davies advanced packet switching, named, but the account watches user traffic while leaving route policy, propagation, and rollback assumptions vague. Peer behavior is still unknown.",
              "v": "partial",
              "fb": "Traffic monitoring may reveal symptoms while missing the control-plane state that created them."
            },
            {
              "t": "Donald Davies is portrayed as relying on routers to recognize an implausible announcement even when configured policy explicitly accepts it. The routing trace points to another result.",
              "v": "wrong",
              "fb": "Routers follow configured policy; they do not infer whether an authorized announcement is sensible."
            },
            {
              "t": "Donald Davies is invoked to disable validation because a rapid global change is considered more valuable than a bounded rollout. Speed replaces validation. One change gains global reach.",
              "v": "danger",
              "fb": "Faster change cannot justify removing the mechanism that contains an authorized mistake."
            }
          ]
        },
        {
          "q": "Which operations practice best implements the profile?",
          "o": [
            {
              "t": "Across the routing system, perform this operation: divide messages into labeled packets that statistically share links, queue at switches, and are reassembled at the destination. Propagation stays bounded.",
              "v": "expert",
              "fb": "Correct: network resilience depends on distributed protocols bounded by validation and recovery controls."
            },
            {
              "t": "Confirm that local routers remain reachable, but do not inspect what prefixes peers receive or whether the safety filter is active. Peer behavior is still unknown. The routing trace leaves one test open.",
              "v": "partial",
              "fb": "Traffic monitoring may reveal symptoms while missing the control-plane state that created them."
            },
            {
              "t": "Treat syntactically valid control messages as operationally correct and infer global reachability from one successful local session. The route record disagrees. Within the routing trace, no support appears.",
              "v": "wrong",
              "fb": "Routers follow configured policy; they do not infer whether an authorized announcement is sensible."
            },
            {
              "t": "Push the urgent configuration everywhere at once, postpone rollback preparation, and describe any cascade as ordinary Internet fragility. Within the routing trace, assumption replaces verification.",
              "v": "danger",
              "fb": "Faster change cannot justify removing the mechanism that contains an authorized mistake."
            }
          ]
        },
        {
          "q": "Which architectural conclusion is most responsible?",
          "o": [
            {
              "t": "The architectural lesson is that shared links are efficient because bursts interleave, but congestion and queueing must be controlled when many senders peak together. Rollback remains reachable in the case file in the case file.",
              "v": "expert",
              "fb": "Correct: network resilience depends on distributed protocols bounded by validation and recovery controls."
            },
            {
              "t": "Distributed operation improves resilience enough that local policy mistakes can be left for neighboring networks to identify and contain. Across the routing trace, comparison remains incomplete in the case file in the case file.",
              "v": "partial",
              "fb": "Traffic monitoring may reveal symptoms while missing the control-plane state that created them."
            },
            {
              "t": "Working links and routers guarantee correct reachability even when the control plane has converged on an invalid or leaked route. The route record disagrees. Protocol compliance is treated as sufficient policy justification.",
              "v": "wrong",
              "fb": "Routers follow configured policy; they do not infer whether an authorized announcement is sensible."
            },
            {
              "t": "A large outage is treated as either a coordinated cyber-attack or an unlucky traffic surge, excluding an authorized configuration failure. Speed replaces validation. Under the routing trace, warning is postponed in the case file.",
              "v": "danger",
              "fb": "Faster change cannot justify removing the mechanism that contains an authorized mistake."
            }
          ]
        }
      ]
    },
    "n_arpanet": {
      "sci": "Lawrence Roberts (1937-2018)",
      "topic": "Building the ARPANET",
      "lede": "The Internet’s quiet machinery carries Lawrence Roberts’s thinking about building the ARPANET.",
      "no": 3,
      "profile": "The network-operations lesson today centers on Lawrence Roberts and building the ARPANET. Lawrence Roberts directed the ARPANET program, turning packet-switching ideas into a working network connecting research computers through interface message processors. The Internet is not one machine but a federation of independently operated links, routers, naming systems, and endpoint protocols. Roberts’s work shows how a small set of shared rules lets that federation scale—and how one incorrect announcement can cross organizational boundaries faster than a human review.\n\nThe network discipline is to standardize host connections, build switching nodes, test traffic across multiple sites, and revise protocols from operational evidence. Operators must separate forwarding from control, validate changes before export, limit blast radius, retain a known-good configuration, and monitor what peers actually receive. Capacity, convergence, caching, and failure recovery should be tested under burst and partial outage rather than only at steady state.\n\nDistributed design removes many single points of physical failure, yet it creates dependencies on trust and configuration. A router can be functioning exactly as programmed while propagating a route that should never have been accepted. Safeguards such as filters, staged rollout, and independent validation therefore protect the network from authorized mistakes as much as from hostile traffic.\n\nThe architectural lesson is interoperability depends on agreed interfaces because individually functioning machines do not automatically form a functioning network. Resilience requires local autonomy bounded by interfaces that reject implausible state before it spreads. An incident timeline should distinguish the first bad state, its propagation, and the later symptoms seen by users.",
      "frame": "Watches the topology reconverge. \"Working routers can still agree on the wrong path. Show me building the ARPANET.\"",
      "q": [
        {
          "q": "Which networking account best captures Lawrence Roberts’s contribution to building the ARPANET?",
          "o": [
            {
              "t": "Lawrence Roberts directed the ARPANET program, turning packet-switching ideas into a working network connecting research computers through interface message processors. Propagation stays bounded in the case file.",
              "v": "expert",
              "fb": "Correct: network resilience depends on distributed protocols bounded by validation and recovery controls."
            },
            {
              "t": "Lawrence Roberts advanced building the ARPANET, but the account watches user traffic while leaving route policy, propagation, and rollback assumptions vague. Peer behavior is still unknown in the case file.",
              "v": "partial",
              "fb": "Traffic monitoring may reveal symptoms while missing the control-plane state that created them."
            },
            {
              "t": "Lawrence Roberts is portrayed as relying on routers to recognize an implausible announcement even when configured policy explicitly accepts it. Protocol compliance is treated as sufficient policy justification.",
              "v": "wrong",
              "fb": "Routers follow configured policy; they do not infer whether an authorized announcement is sensible."
            },
            {
              "t": "Lawrence Roberts is invoked to disable validation because a rapid global change is considered more valuable than a bounded rollout. Inside the routing trace, the claim outruns checks in the case file.",
              "v": "danger",
              "fb": "Faster change cannot justify removing the mechanism that contains an authorized mistake."
            }
          ]
        },
        {
          "q": "Which operations practice best implements the profile?",
          "o": [
            {
              "t": "Across the routing system, perform this operation: standardize host connections, build switching nodes, test traffic across multiple sites, and revise protocols from operational evidence. Propagation stays bounded.",
              "v": "expert",
              "fb": "Correct: network resilience depends on distributed protocols bounded by validation and recovery controls."
            },
            {
              "t": "Confirm that local routers remain reachable, but do not inspect what prefixes peers receive or whether the safety filter is active. Peer behavior is still unknown. Support across the routing trace stays partial.",
              "v": "partial",
              "fb": "Traffic monitoring may reveal symptoms while missing the control-plane state that created them."
            },
            {
              "t": "Treat syntactically valid control messages as operationally correct and infer global reachability from one successful local session. Protocol validity is not policy validity. The routing trace defeats that inference.",
              "v": "wrong",
              "fb": "Routers follow configured policy; they do not infer whether an authorized announcement is sensible."
            },
            {
              "t": "Push the urgent configuration everywhere at once, postpone rollback preparation, and describe any cascade as ordinary Internet fragility. Speed replaces validation. Under the routing trace, warning is postponed.",
              "v": "danger",
              "fb": "Faster change cannot justify removing the mechanism that contains an authorized mistake."
            }
          ]
        },
        {
          "q": "Which architectural conclusion is most responsible?",
          "o": [
            {
              "t": "The architectural lesson is that interoperability depends on agreed interfaces because individually functioning machines do not automatically form a functioning network in the case file.",
              "v": "expert",
              "fb": "Correct: network resilience depends on distributed protocols bounded by validation and recovery controls."
            },
            {
              "t": "Distributed operation improves resilience enough that local policy mistakes can be left for neighboring networks to identify and contain. Peer behavior is still unknown in the case file.",
              "v": "partial",
              "fb": "Traffic monitoring may reveal symptoms while missing the control-plane state that created them."
            },
            {
              "t": "Working links and routers guarantee correct reachability even when the control plane has converged on an invalid or leaked route. Protocol compliance is treated as sufficient policy justification.",
              "v": "wrong",
              "fb": "Routers follow configured policy; they do not infer whether an authorized announcement is sensible."
            },
            {
              "t": "A large outage is treated as either a coordinated cyber-attack or an unlucky traffic surge, excluding an authorized configuration failure. Under the routing trace, warning is postponed.",
              "v": "danger",
              "fb": "Faster change cannot justify removing the mechanism that contains an authorized mistake."
            }
          ]
        }
      ]
    },
    "n_internetwork": {
      "sci": "Bob Kahn (b. 1938)",
      "topic": "TCP/IP & internetworking",
      "lede": "Bob Kahn helped make TCP/IP and internetworking scale across networks no single operator controlled.",
      "no": 4,
      "profile": "The network-operations lesson today centers on Bob Kahn and TCP/IP and internetworking. Bob Kahn proposed open-architecture networking and co-created TCP/IP so independently managed networks could communicate without surrendering their internal designs. The Internet is not one machine but a federation of independently operated links, routers, naming systems, and endpoint protocols. Kahn’s work shows how a small set of shared rules lets that federation scale—and how one incorrect announcement can cross organizational boundaries faster than a human review.\n\nThe network discipline is to encapsulate packets across network boundaries, use gateways without application-specific state, and recover from loss at the endpoints. Operators must separate forwarding from control, validate changes before export, limit blast radius, retain a known-good configuration, and monitor what peers actually receive. Capacity, convergence, caching, and failure recovery should be tested under burst and partial outage rather than only at steady state.\n\nDistributed design removes many single points of physical failure, yet it creates dependencies on trust and configuration. A router can be functioning exactly as programmed while propagating a route that should never have been accepted. Safeguards such as filters, staged rollout, and independent validation therefore protect the network from authorized mistakes as much as from hostile traffic.\n\nThe architectural lesson is internetworking succeeds when local networks share a minimal common protocol rather than one operator controlling every component. Resilience requires local autonomy bounded by interfaces that reject implausible state before it spreads. Redundancy without loop prevention or policy control can amplify a fault instead of containing it. The lesson remains current.",
      "frame": "Pins a route update beside the outage clock. \"At The Network Operations Centre, one line crossed a thousand boundaries. Explain TCP/IP and internetworking.\"",
      "q": [
        {
          "q": "Which networking account best captures Bob Kahn’s contribution to TCP/IP and internetworking?",
          "o": [
            {
              "t": "Bob Kahn proposed open-architecture networking and co-created TCP/IP so independently managed networks could communicate without surrendering their internal designs.",
              "v": "expert",
              "fb": "Correct: network resilience depends on distributed protocols bounded by validation and recovery controls."
            },
            {
              "t": "Bob Kahn advanced TCP/IP and internetworking, but the account watches user traffic while leaving route policy, propagation, and rollback assumptions vague.",
              "v": "partial",
              "fb": "Traffic monitoring may reveal symptoms while missing the control-plane state that created them."
            },
            {
              "t": "Bob Kahn is portrayed as relying on routers to recognize an implausible announcement even when configured policy explicitly accepts it. The route record disagrees.",
              "v": "wrong",
              "fb": "Routers follow configured policy; they do not infer whether an authorized announcement is sensible."
            },
            {
              "t": "Bob Kahn is invoked to disable validation because a rapid global change is considered more valuable than a bounded rollout. One change gains global reach.",
              "v": "danger",
              "fb": "Faster change cannot justify removing the mechanism that contains an authorized mistake."
            }
          ]
        },
        {
          "q": "Which operations practice best implements the profile?",
          "o": [
            {
              "t": "Across the routing system, perform this operation: encapsulate packets across network boundaries, use gateways without application-specific state, and recover from loss at the endpoints. Propagation stays bounded.",
              "v": "expert",
              "fb": "Correct: network resilience depends on distributed protocols bounded by validation and recovery controls."
            },
            {
              "t": "Confirm that local routers remain reachable, but do not inspect what prefixes peers receive or whether the safety filter is active. Peer behavior is still unknown. Support across the routing trace stays partial.",
              "v": "partial",
              "fb": "Traffic monitoring may reveal symptoms while missing the control-plane state that created them."
            },
            {
              "t": "Treat syntactically valid control messages as operationally correct and infer global reachability from one successful local session. Protocol validity is not policy validity. The routing trace defeats that inference.",
              "v": "wrong",
              "fb": "Routers follow configured policy; they do not infer whether an authorized announcement is sensible."
            },
            {
              "t": "Push the urgent configuration everywhere at once, postpone rollback preparation, and describe any cascade as ordinary Internet fragility. Speed replaces validation. Under the routing trace, warning is postponed.",
              "v": "danger",
              "fb": "Faster change cannot justify removing the mechanism that contains an authorized mistake."
            }
          ]
        },
        {
          "q": "Which architectural conclusion is most responsible?",
          "o": [
            {
              "t": "The architectural lesson is that internetworking succeeds when local networks share a minimal common protocol rather than one operator controlling every component. The routing trace keeps assumptions explicit.",
              "v": "expert",
              "fb": "Correct: network resilience depends on distributed protocols bounded by validation and recovery controls."
            },
            {
              "t": "Distributed operation improves resilience enough that local policy mistakes can be left for neighboring networks to identify and contain. Peer behavior is still unknown. The routing trace leaves one test open.",
              "v": "partial",
              "fb": "Traffic monitoring may reveal symptoms while missing the control-plane state that created them."
            },
            {
              "t": "Working links and routers guarantee correct reachability even when the control plane has converged on an invalid or leaked route. The route record disagrees. Within the routing trace, no support appears in the case file.",
              "v": "wrong",
              "fb": "Routers follow configured policy; they do not infer whether an authorized announcement is sensible."
            },
            {
              "t": "A large outage is treated as either a coordinated cyber-attack or an unlucky traffic surge, excluding an authorized configuration failure. Speed replaces validation. Inside the routing trace, drama displaces testing.",
              "v": "danger",
              "fb": "Faster change cannot justify removing the mechanism that contains an authorized mistake."
            }
          ]
        }
      ]
    },
    "n_dnsdesign": {
      "sci": "Paul Mockapetris (b. 1948)",
      "topic": "The Domain Name System",
      "lede": "Paul Mockapetris treated the Domain Name System as a distributed agreement that had to survive failure.",
      "no": 5,
      "profile": "The network-operations lesson today centers on Paul Mockapetris and the Domain Name System. Paul Mockapetris designed the Domain Name System, replacing a centrally copied host file with a hierarchical, distributed, and cached naming service. The Internet is not one machine but a federation of independently operated links, routers, naming systems, and endpoint protocols. Mockapetris’s work shows how a small set of shared rules lets that federation scale—and how one incorrect announcement can cross organizational boundaries faster than a human review.\n\nThe network discipline is to delegate zones to authoritative servers, resolve names through referrals, cache answers for limited times, and preserve clear authority boundaries. Operators must separate forwarding from control, validate changes before export, limit blast radius, retain a known-good configuration, and monitor what peers actually receive. Capacity, convergence, caching, and failure recovery should be tested under burst and partial outage rather than only at steady state.\n\nDistributed design removes many single points of physical failure, yet it creates dependencies on trust and configuration. A router can be functioning exactly as programmed while propagating a route that should never have been accepted. Safeguards such as filters, staged rollout, and independent validation therefore protect the network from authorized mistakes as much as from hostile traffic.\n\nThe architectural lesson is distribution improves scale only when delegation, cache lifetimes, and validation prevent stale or forged answers from spreading. Resilience requires local autonomy bounded by interfaces that reject implausible state before it spreads. A rollback plan is valuable only when operators can still reach the equipment after the failed change takes effect.",
      "frame": "Opens the rollback ticket. \"Before I show you who signed it, tell me what the Domain Name System assumes.\"",
      "q": [
        {
          "q": "Which networking account best captures Paul Mockapetris’s contribution to the Domain Name System?",
          "o": [
            {
              "t": "Paul Mockapetris designed the Domain Name System, replacing a centrally copied host file with a hierarchical, distributed, and cached naming service. The routing trace keeps assumptions explicit in the case file.",
              "v": "expert",
              "fb": "Correct: network resilience depends on distributed protocols bounded by validation and recovery controls."
            },
            {
              "t": "Paul Mockapetris advanced the Domain Name System, but the account watches user traffic while leaving route policy, propagation, and rollback assumptions vague. Peer behavior is still unknown in the case file.",
              "v": "partial",
              "fb": "Traffic monitoring may reveal symptoms while missing the control-plane state that created them."
            },
            {
              "t": "Paul Mockapetris is portrayed as relying on routers to recognize an implausible announcement even when configured policy explicitly accepts it. Protocol compliance is treated as sufficient policy justification.",
              "v": "wrong",
              "fb": "Routers follow configured policy; they do not infer whether an authorized announcement is sensible."
            },
            {
              "t": "Paul Mockapetris is invoked to disable validation because a rapid global change is considered more valuable than a bounded rollout. Inside the routing trace, the claim outruns checks in the case file.",
              "v": "danger",
              "fb": "Faster change cannot justify removing the mechanism that contains an authorized mistake."
            }
          ]
        },
        {
          "q": "Which operations practice best implements the profile?",
          "o": [
            {
              "t": "Across the routing system, perform this operation: delegate zones to authoritative servers, resolve names through referrals, cache answers for limited times, and preserve clear authority boundaries.",
              "v": "expert",
              "fb": "Correct: network resilience depends on distributed protocols bounded by validation and recovery controls."
            },
            {
              "t": "Confirm that local routers remain reachable, but do not inspect what prefixes peers receive or whether the safety filter is active. Peer behavior is still unknown. The routing trace leaves one test open.",
              "v": "partial",
              "fb": "Traffic monitoring may reveal symptoms while missing the control-plane state that created them."
            },
            {
              "t": "Treat syntactically valid control messages as operationally correct and infer global reachability from one successful local session. The route record disagrees. The routing trace points to another result.",
              "v": "wrong",
              "fb": "Routers follow configured policy; they do not infer whether an authorized announcement is sensible."
            },
            {
              "t": "Push the urgent configuration everywhere at once, postpone rollback preparation, and describe any cascade as ordinary Internet fragility. Within the routing trace, assumption replaces verification.",
              "v": "danger",
              "fb": "Faster change cannot justify removing the mechanism that contains an authorized mistake."
            }
          ]
        },
        {
          "q": "Which architectural conclusion is most responsible?",
          "o": [
            {
              "t": "The architectural lesson is that distribution improves scale only when delegation, cache lifetimes, and validation prevent stale or forged answers from spreading. Propagation stays bounded.",
              "v": "expert",
              "fb": "Correct: network resilience depends on distributed protocols bounded by validation and recovery controls."
            },
            {
              "t": "Distributed operation improves resilience enough that local policy mistakes can be left for neighboring networks to identify and contain. Support across the routing trace stays partial.",
              "v": "partial",
              "fb": "Traffic monitoring may reveal symptoms while missing the control-plane state that created them."
            },
            {
              "t": "Working links and routers guarantee correct reachability even when the control plane has converged on an invalid or leaked route. Under the routing trace, direct comparison fails in the case file.",
              "v": "wrong",
              "fb": "Routers follow configured policy; they do not infer whether an authorized announcement is sensible."
            },
            {
              "t": "A large outage is treated as either a coordinated cyber-attack or an unlucky traffic surge, excluding an authorized configuration failure. Speed replaces validation. One change gains global reach.",
              "v": "danger",
              "fb": "Faster change cannot justify removing the mechanism that contains an authorized mistake."
            }
          ]
        }
      ]
    },
    "n_spanning": {
      "sci": "Radia Perlman (b. 1951)",
      "topic": "The spanning-tree protocol",
      "lede": "The Internet’s quiet machinery carries Radia Perlman’s thinking about the spanning-tree protocol.",
      "no": 6,
      "profile": "The network-operations lesson today centers on Radia Perlman and the spanning-tree protocol. Radia Perlman invented the spanning-tree protocol, allowing Ethernet bridges to create a loop-free active topology even when physical links contain redundancy. The Internet is not one machine but a federation of independently operated links, routers, naming systems, and endpoint protocols. Perlman’s work shows how a small set of shared rules lets that federation scale—and how one incorrect announcement can cross organizational boundaries faster than a human review.\n\nThe network discipline is to elect a root bridge, calculate preferred paths, and block selected links so frames cannot circulate endlessly through loops. Operators must separate forwarding from control, validate changes before export, limit blast radius, retain a known-good configuration, and monitor what peers actually receive. Capacity, convergence, caching, and failure recovery should be tested under burst and partial outage rather than only at steady state.\n\nDistributed design removes many single points of physical failure, yet it creates dependencies on trust and configuration. A router can be functioning exactly as programmed while propagating a route that should never have been accepted. Safeguards such as filters, staged rollout, and independent validation therefore protect the network from authorized mistakes as much as from hostile traffic.\n\nThe architectural lesson is redundant links improve availability only when a control protocol prevents the redundancy itself from amplifying traffic. Resilience requires local autonomy bounded by interfaces that reject implausible state before it spreads. An incident timeline should distinguish the first bad state, its propagation, and the later symptoms seen by users.",
      "frame": "Watches the topology reconverge. \"Working routers can still agree on the wrong path. Show me the spanning-tree protocol.\"",
      "q": [
        {
          "q": "Which networking account best captures Radia Perlman’s contribution to the spanning-tree protocol?",
          "o": [
            {
              "t": "Radia Perlman invented the spanning-tree protocol, allowing Ethernet bridges to create a loop-free active topology even when physical links contain redundancy. Propagation stays bounded. Rollback remains reachable in the case file.",
              "v": "expert",
              "fb": "Correct: network resilience depends on distributed protocols bounded by validation and recovery controls."
            },
            {
              "t": "Radia Perlman advanced the spanning-tree protocol, but the account watches user traffic while leaving route policy, propagation, and rollback assumptions vague. Control-plane evidence remains incomplete in the dated record.",
              "v": "partial",
              "fb": "Traffic monitoring may reveal symptoms while missing the control-plane state that created them."
            },
            {
              "t": "Radia Perlman is portrayed as relying on routers to recognize an implausible announcement even when configured policy explicitly accepts it. The route record disagrees. Protocol compliance is treated as sufficient policy justification.",
              "v": "wrong",
              "fb": "Routers follow configured policy; they do not infer whether an authorized announcement is sensible."
            },
            {
              "t": "Radia Perlman is invoked to disable validation because a rapid global change is considered more valuable than a bounded rollout. Speed replaces validation. Inside the routing trace, drama displaces testing in the case file.",
              "v": "danger",
              "fb": "Faster change cannot justify removing the mechanism that contains an authorized mistake."
            }
          ]
        },
        {
          "q": "Which operations practice best implements the profile?",
          "o": [
            {
              "t": "Across the routing system, perform this operation: elect a root bridge, calculate preferred paths, and block selected links so frames cannot circulate endlessly through loops.",
              "v": "expert",
              "fb": "Correct: network resilience depends on distributed protocols bounded by validation and recovery controls."
            },
            {
              "t": "Confirm that local routers remain reachable, but do not inspect what prefixes peers receive or whether the safety filter is active. The routing trace leaves one test open.",
              "v": "partial",
              "fb": "Traffic monitoring may reveal symptoms while missing the control-plane state that created them."
            },
            {
              "t": "Treat syntactically valid control messages as operationally correct and infer global reachability from one successful local session. The routing trace points to another result.",
              "v": "wrong",
              "fb": "Routers follow configured policy; they do not infer whether an authorized announcement is sensible."
            },
            {
              "t": "Push the urgent configuration everywhere at once, postpone rollback preparation, and describe any cascade as ordinary Internet fragility. One change gains global reach.",
              "v": "danger",
              "fb": "Faster change cannot justify removing the mechanism that contains an authorized mistake."
            }
          ]
        },
        {
          "q": "Which architectural conclusion is most responsible?",
          "o": [
            {
              "t": "The architectural lesson is that redundant links improve availability only when a control protocol prevents the redundancy itself from amplifying traffic. Propagation stays bounded in the case file.",
              "v": "expert",
              "fb": "Correct: network resilience depends on distributed protocols bounded by validation and recovery controls."
            },
            {
              "t": "Distributed operation improves resilience enough that local policy mistakes can be left for neighboring networks to identify and contain. The routing trace leaves one test open in the case file.",
              "v": "partial",
              "fb": "Traffic monitoring may reveal symptoms while missing the control-plane state that created them."
            },
            {
              "t": "Working links and routers guarantee correct reachability even when the control plane has converged on an invalid or leaked route. Within the routing trace, no support appears in the case file.",
              "v": "wrong",
              "fb": "Routers follow configured policy; they do not infer whether an authorized announcement is sensible."
            },
            {
              "t": "A large outage is treated as either a coordinated cyber-attack or an unlucky traffic surge, excluding an authorized configuration failure. Inside the routing trace, drama displaces testing.",
              "v": "danger",
              "fb": "Faster change cannot justify removing the mechanism that contains an authorized mistake."
            }
          ]
        }
      ]
    },
    "n_aqm": {
      "sci": "Sally Floyd (1950-2019)",
      "topic": "Congestion control & active queue management",
      "lede": "Sally Floyd helped make congestion control and active queue management scale across networks no single operator controlled.",
      "no": 7,
      "profile": "The network-operations lesson today centers on Sally Floyd and congestion control and active queue management. Sally Floyd developed active queue management and helped design Random Early Detection and Explicit Congestion Notification to signal congestion before buffers overflow. The Internet is not one machine but a federation of independently operated links, routers, naming systems, and endpoint protocols. Floyd’s work shows how a small set of shared rules lets that federation scale—and how one incorrect announcement can cross organizational boundaries faster than a human review.\n\nThe network discipline is to observe growing queues, mark or drop selected packets early, and give senders time to slow before sustained delay and loss dominate. Operators must separate forwarding from control, validate changes before export, limit blast radius, retain a known-good configuration, and monitor what peers actually receive. Capacity, convergence, caching, and failure recovery should be tested under burst and partial outage rather than only at steady state.\n\nDistributed design removes many single points of physical failure, yet it creates dependencies on trust and configuration. A router can be functioning exactly as programmed while propagating a route that should never have been accepted. Safeguards such as filters, staged rollout, and independent validation therefore protect the network from authorized mistakes as much as from hostile traffic.\n\nThe architectural lesson is a full buffer is a late symptom; stable networks act on congestion while there is still room to respond. Resilience requires local autonomy bounded by interfaces that reject implausible state before it spreads. Redundancy without loop prevention or policy control can amplify a fault instead of containing it.",
      "frame": "Pins a route update beside the outage clock. \"At The Operations Manager's Office, one line crossed a thousand boundaries. Explain congestion control and active queue management.\"",
      "q": [
        {
          "q": "Which networking account best captures Sally Floyd’s contribution to congestion control and active queue management?",
          "o": [
            {
              "t": "Sally Floyd developed active queue management and helped design Random Early Detection and Explicit Congestion Notification to signal congestion before buffers overflow. The routing trace keeps assumptions explicit in the case file.",
              "v": "expert",
              "fb": "Correct: network resilience depends on distributed protocols bounded by validation and recovery controls."
            },
            {
              "t": "Sally Floyd advanced congestion control and active queue management, but the account watches user traffic while leaving route policy, propagation, and rollback assumptions vague. Peer behavior is still unknown in the case file.",
              "v": "partial",
              "fb": "Traffic monitoring may reveal symptoms while missing the control-plane state that created them."
            },
            {
              "t": "Sally Floyd is portrayed as relying on routers to recognize an implausible announcement even when configured policy explicitly accepts it. The route record disagrees. Protocol compliance is treated as sufficient policy justification.",
              "v": "wrong",
              "fb": "Routers follow configured policy; they do not infer whether an authorized announcement is sensible."
            },
            {
              "t": "Sally Floyd is invoked to disable validation because a rapid global change is considered more valuable than a bounded rollout. Speed replaces validation. Inside the routing trace, drama displaces testing in the case file.",
              "v": "danger",
              "fb": "Faster change cannot justify removing the mechanism that contains an authorized mistake."
            }
          ]
        },
        {
          "q": "Which operations practice best implements the profile?",
          "o": [
            {
              "t": "Across the routing system, perform this operation: observe growing queues, mark or drop selected packets early, and give senders time to slow before sustained delay and loss dominate. Propagation stays bounded.",
              "v": "expert",
              "fb": "Correct: network resilience depends on distributed protocols bounded by validation and recovery controls."
            },
            {
              "t": "Confirm that local routers remain reachable, but do not inspect what prefixes peers receive or whether the safety filter is active. Peer behavior is still unknown. Support across the routing trace stays partial.",
              "v": "partial",
              "fb": "Traffic monitoring may reveal symptoms while missing the control-plane state that created them."
            },
            {
              "t": "Treat syntactically valid control messages as operationally correct and infer global reachability from one successful local session. Protocol validity is not policy validity. The routing trace defeats that inference.",
              "v": "wrong",
              "fb": "Routers follow configured policy; they do not infer whether an authorized announcement is sensible."
            },
            {
              "t": "Push the urgent configuration everywhere at once, postpone rollback preparation, and describe any cascade as ordinary Internet fragility. Speed replaces validation. Under the routing trace, warning is postponed.",
              "v": "danger",
              "fb": "Faster change cannot justify removing the mechanism that contains an authorized mistake."
            }
          ]
        },
        {
          "q": "Which architectural conclusion is most responsible?",
          "o": [
            {
              "t": "The architectural lesson is that a full buffer is a late symptom; stable networks act on congestion while there is still room to respond. The routing trace keeps assumptions explicit.",
              "v": "expert",
              "fb": "Correct: network resilience depends on distributed protocols bounded by validation and recovery controls."
            },
            {
              "t": "Distributed operation improves resilience enough that local policy mistakes can be left for neighboring networks to identify and contain. Control-plane evidence remains incomplete.",
              "v": "partial",
              "fb": "Traffic monitoring may reveal symptoms while missing the control-plane state that created them."
            },
            {
              "t": "Working links and routers guarantee correct reachability even when the control plane has converged on an invalid or leaked route. Under the routing trace, direct comparison fails.",
              "v": "wrong",
              "fb": "Routers follow configured policy; they do not infer whether an authorized announcement is sensible."
            },
            {
              "t": "A large outage is treated as either a coordinated cyber-attack or an unlucky traffic surge, excluding an authorized configuration failure. Inside the routing trace, the claim outruns checks.",
              "v": "danger",
              "fb": "Faster change cannot justify removing the mechanism that contains an authorized mistake."
            }
          ]
        }
      ]
    },
    "n_datagram": {
      "sci": "Louis Pouzin (b. 1931)",
      "topic": "The datagram",
      "lede": "Louis Pouzin treated the datagram as a distributed agreement that had to survive failure.",
      "no": 8,
      "profile": "The network-operations lesson today centers on Louis Pouzin and the datagram. Louis Pouzin led the CYCLADES project, whose datagram design placed reliability at the hosts and strongly influenced later internetworking. The Internet is not one machine but a federation of independently operated links, routers, naming systems, and endpoint protocols. Pouzin’s work shows how a small set of shared rules lets that federation scale—and how one incorrect announcement can cross organizational boundaries faster than a human review.\n\nThe network discipline is to send independent packets without requiring the network to maintain a connection, and let endpoints manage sequencing and recovery. Operators must separate forwarding from control, validate changes before export, limit blast radius, retain a known-good configuration, and monitor what peers actually receive. Capacity, convergence, caching, and failure recovery should be tested under burst and partial outage rather than only at steady state.\n\nDistributed design removes many single points of physical failure, yet it creates dependencies on trust and configuration. A router can be functioning exactly as programmed while propagating a route that should never have been accepted. Safeguards such as filters, staged rollout, and independent validation therefore protect the network from authorized mistakes as much as from hostile traffic.\n\nThe architectural lesson is a best-effort core can connect unlike networks, provided applications understand that delivery, order, and duplication are not guaranteed. Resilience requires local autonomy bounded by interfaces that reject implausible state before it spreads. A rollback plan is valuable only when operators can still reach the equipment after the failed change takes effect.",
      "frame": "Opens the rollback ticket. \"Before I show you who signed it, tell me what the datagram assumes.\"",
      "q": [
        {
          "q": "Which networking account best captures Louis Pouzin’s contribution to the datagram?",
          "o": [
            {
              "t": "Louis Pouzin led the CYCLADES project, whose datagram design placed reliability at the hosts and strongly influenced later internetworking. The routing trace keeps assumptions explicit in the case file.",
              "v": "expert",
              "fb": "Correct: network resilience depends on distributed protocols bounded by validation and recovery controls."
            },
            {
              "t": "Louis Pouzin advanced the datagram, but the account watches user traffic while leaving route policy, propagation, and rollback assumptions vague. Peer behavior is still unknown in the case file.",
              "v": "partial",
              "fb": "Traffic monitoring may reveal symptoms while missing the control-plane state that created them."
            },
            {
              "t": "Louis Pouzin is portrayed as relying on routers to recognize an implausible announcement even when configured policy explicitly accepts it. Protocol compliance is treated as sufficient policy justification.",
              "v": "wrong",
              "fb": "Routers follow configured policy; they do not infer whether an authorized announcement is sensible."
            },
            {
              "t": "Louis Pouzin is invoked to disable validation because a rapid global change is considered more valuable than a bounded rollout. Under the routing trace, warning is postponed in the dated record.",
              "v": "danger",
              "fb": "Faster change cannot justify removing the mechanism that contains an authorized mistake."
            }
          ]
        },
        {
          "q": "Which operations practice best implements the profile?",
          "o": [
            {
              "t": "Across the routing system, perform this operation: send independent packets without requiring the network to maintain a connection, and let endpoints manage sequencing and recovery. Rollback remains reachable.",
              "v": "expert",
              "fb": "Correct: network resilience depends on distributed protocols bounded by validation and recovery controls."
            },
            {
              "t": "Confirm that local routers remain reachable, but do not inspect what prefixes peers receive or whether the safety filter is active. Peer behavior is still unknown. Support across the routing trace stays partial.",
              "v": "partial",
              "fb": "Traffic monitoring may reveal symptoms while missing the control-plane state that created them."
            },
            {
              "t": "Treat syntactically valid control messages as operationally correct and infer global reachability from one successful local session. Protocol validity is not policy validity. The routing trace defeats that inference.",
              "v": "wrong",
              "fb": "Routers follow configured policy; they do not infer whether an authorized announcement is sensible."
            },
            {
              "t": "Push the urgent configuration everywhere at once, postpone rollback preparation, and describe any cascade as ordinary Internet fragility. Speed replaces validation. Under the routing trace, warning is postponed.",
              "v": "danger",
              "fb": "Faster change cannot justify removing the mechanism that contains an authorized mistake."
            }
          ]
        },
        {
          "q": "Which architectural conclusion is most responsible?",
          "o": [
            {
              "t": "The architectural lesson is that a best-effort core can connect unlike networks, provided applications understand that delivery, order, and duplication are not guaranteed in the case file.",
              "v": "expert",
              "fb": "Correct: network resilience depends on distributed protocols bounded by validation and recovery controls."
            },
            {
              "t": "Distributed operation improves resilience enough that local policy mistakes can be left for neighboring networks to identify and contain. Peer behavior is still unknown in the case file.",
              "v": "partial",
              "fb": "Traffic monitoring may reveal symptoms while missing the control-plane state that created them."
            },
            {
              "t": "Working links and routers guarantee correct reachability even when the control plane has converged on an invalid or leaked route. Protocol compliance is treated as sufficient policy justification.",
              "v": "wrong",
              "fb": "Routers follow configured policy; they do not infer whether an authorized announcement is sensible."
            },
            {
              "t": "A large outage is treated as either a coordinated cyber-attack or an unlucky traffic surge, excluding an authorized configuration failure. Under the routing trace, warning is postponed.",
              "v": "danger",
              "fb": "Faster change cannot justify removing the mechanism that contains an authorized mistake."
            }
          ]
        }
      ]
    },
    "n_bgp": {
      "sci": "Yakov Rekhter (Internet-routing pioneer)",
      "topic": "The Border Gateway Protocol",
      "lede": "The Internet’s quiet machinery carries Yakov Rekhter’s thinking about the Border Gateway Protocol.",
      "no": 9,
      "profile": "The network-operations lesson today centers on Yakov Rekhter and the Border Gateway Protocol. Yakov Rekhter coauthored major Border Gateway Protocol specifications, enabling autonomous networks to exchange reachability and select policy-based interdomain paths. The Internet is not one machine but a federation of independently operated links, routers, naming systems, and endpoint protocols. Rekhter’s work shows how a small set of shared rules lets that federation scale—and how one incorrect announcement can cross organizational boundaries faster than a human review.\n\nThe network discipline is to advertise address prefixes with path attributes, reject routes that violate policy, and filter announcements before they propagate to peers. Operators must separate forwarding from control, validate changes before export, limit blast radius, retain a known-good configuration, and monitor what peers actually receive. Capacity, convergence, caching, and failure recovery should be tested under burst and partial outage rather than only at steady state.\n\nDistributed design removes many single points of physical failure, yet it creates dependencies on trust and configuration. A router can be functioning exactly as programmed while propagating a route that should never have been accepted. Safeguards such as filters, staged rollout, and independent validation therefore protect the network from authorized mistakes as much as from hostile traffic.\n\nThe architectural lesson is global routing is built on distributed trust, so one mistaken announcement can travel far unless operators maintain effective filters. Resilience requires local autonomy bounded by interfaces that reject implausible state before it spreads. An incident timeline should distinguish the first bad state, its propagation, and the later symptoms seen by users.",
      "frame": "Watches the topology reconverge. \"Working routers can still agree on the wrong path. Show me the Border Gateway Protocol.\"",
      "q": [
        {
          "q": "Which networking account best captures Yakov Rekhter’s contribution to the Border Gateway Protocol?",
          "o": [
            {
              "t": "Yakov Rekhter coauthored major Border Gateway Protocol specifications, enabling autonomous networks to exchange reachability and select policy-based interdomain paths. Propagation stays bounded.",
              "v": "expert",
              "fb": "Correct: network resilience depends on distributed protocols bounded by validation and recovery controls."
            },
            {
              "t": "Yakov Rekhter advanced the Border Gateway Protocol, but the account watches user traffic while leaving route policy, propagation, and rollback assumptions vague. Peer behavior is still unknown.",
              "v": "partial",
              "fb": "Traffic monitoring may reveal symptoms while missing the control-plane state that created them."
            },
            {
              "t": "Yakov Rekhter is portrayed as relying on routers to recognize an implausible announcement even when configured policy explicitly accepts it. The routing trace points to another result.",
              "v": "wrong",
              "fb": "Routers follow configured policy; they do not infer whether an authorized announcement is sensible."
            },
            {
              "t": "Yakov Rekhter is invoked to disable validation because a rapid global change is considered more valuable than a bounded rollout. Speed replaces validation. One change gains global reach.",
              "v": "danger",
              "fb": "Faster change cannot justify removing the mechanism that contains an authorized mistake."
            }
          ]
        },
        {
          "q": "Which operations practice best implements the profile?",
          "o": [
            {
              "t": "Across the routing system, perform this operation: advertise address prefixes with path attributes, reject routes that violate policy, and filter announcements before they propagate to peers. Propagation stays bounded.",
              "v": "expert",
              "fb": "Correct: network resilience depends on distributed protocols bounded by validation and recovery controls."
            },
            {
              "t": "Confirm that local routers remain reachable, but do not inspect what prefixes peers receive or whether the safety filter is active. Control-plane evidence remains incomplete. The routing trace leaves one test open.",
              "v": "partial",
              "fb": "Traffic monitoring may reveal symptoms while missing the control-plane state that created them."
            },
            {
              "t": "Treat syntactically valid control messages as operationally correct and infer global reachability from one successful local session. Protocol validity is not policy validity. Within the routing trace, no support appears.",
              "v": "wrong",
              "fb": "Routers follow configured policy; they do not infer whether an authorized announcement is sensible."
            },
            {
              "t": "Push the urgent configuration everywhere at once, postpone rollback preparation, and describe any cascade as ordinary Internet fragility. Speed replaces validation. Inside the routing trace, drama displaces testing.",
              "v": "danger",
              "fb": "Faster change cannot justify removing the mechanism that contains an authorized mistake."
            }
          ]
        },
        {
          "q": "Which architectural conclusion is most responsible?",
          "o": [
            {
              "t": "The architectural lesson is that global routing is built on distributed trust, so one mistaken announcement can travel far unless operators maintain effective filters in the case file.",
              "v": "expert",
              "fb": "Correct: network resilience depends on distributed protocols bounded by validation and recovery controls."
            },
            {
              "t": "Distributed operation improves resilience enough that local policy mistakes can be left for neighboring networks to identify and contain. Peer behavior is still unknown in the case file.",
              "v": "partial",
              "fb": "Traffic monitoring may reveal symptoms while missing the control-plane state that created them."
            },
            {
              "t": "Working links and routers guarantee correct reachability even when the control plane has converged on an invalid or leaked route. Protocol compliance is treated as sufficient policy justification.",
              "v": "wrong",
              "fb": "Routers follow configured policy; they do not infer whether an authorized announcement is sensible."
            },
            {
              "t": "A large outage is treated as either a coordinated cyber-attack or an unlucky traffic surge, excluding an authorized configuration failure. Under the routing trace, warning is postponed.",
              "v": "danger",
              "fb": "Faster change cannot justify removing the mechanism that contains an authorized mistake."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "engineer": {
      "routers": "The Network Engineer joins you beneath the route wall at the core routers & peering as grey returns to green. \"Pushed the change on orders; the route filter had been switched off to save time. The network carried the announcement exactly as its policies allowed.\"",
      "noc": "The Network Engineer joins you beneath the route wall at the network operations centre as grey returns to green. \"Pushed the change on orders; the route filter had been switched off to save time. The network carried the announcement exactly as its policies allowed.\"",
      "office": "The Network Engineer joins you beneath the route wall at the operations manager's office as grey returns to green. \"Pushed the change on orders; the route filter had been switched off to save time. The network carried the announcement exactly as its policies allowed.\""
    },
    "peering": {
      "routers": "The Peering Coordinator joins you beneath the route wall at the core routers & peering as grey returns to green. \"Watches the routes; saw one bad announcement leak everywhere at once. The network carried the announcement exactly as its policies allowed.\"",
      "noc": "The Peering Coordinator joins you beneath the route wall at the network operations centre as grey returns to green. \"Watches the routes; saw one bad announcement leak everywhere at once. The network carried the announcement exactly as its policies allowed.\"",
      "office": "The Peering Coordinator joins you beneath the route wall at the operations manager's office as grey returns to green. \"Watches the routes; saw one bad announcement leak everywhere at once. The network carried the announcement exactly as its policies allowed.\""
    },
    "clerk": {
      "routers": "The Clerk joins you beneath the route wall at the core routers & peering as grey returns to green. \"Keeps the change tickets — and the sign-off that removed the safety filter. The network carried the announcement exactly as its policies allowed.\"",
      "noc": "The Clerk joins you beneath the route wall at the network operations centre as grey returns to green. \"Keeps the change tickets — and the sign-off that removed the safety filter. The network carried the announcement exactly as its policies allowed.\"",
      "office": "The Clerk joins you beneath the route wall at the operations manager's office as grey returns to green. \"Keeps the change tickets — and the sign-off that removed the safety filter. The network carried the announcement exactly as its policies allowed.\""
    }
  },
  "story": [
    "<b>The Great Grey-Out</b> opens inside the network-outage inquiry, where the public explanation has hardened faster than the evidence.",
    "<b>The Network Engineer</b>, <b>The Peering Coordinator</b>, and <b>The Clerk</b> hold different parts of the record, and every conversation begins with one real figure whose work teaches you how to read it.",
    "The case keeps pulling investigators toward <b>A coordinated attack knocked the network down</b> or <b>An unlucky traffic surge — the internet is just fragile</b>. Both are plausible enough to survive a headline; neither should survive the full dossier untested.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and decide the <b>WHAT</b> for yourself."
  ],
  "endings": {
    "overclaimWhat": "attack",
    "dismissalWhat": "surge",
    "win": {
      "expertTitle": "The Route Is Withdrawn",
      "expert": [
        "You trace <b>A routing misconfiguration and a removed safeguard cascaded</b> to <b>Cory Idris — the network operations lead</b> and the decisive authorization inside <b>The Operations Manager's Office</b>. Not a coordinated attack knocked the network down. Not an unlucky traffic surge — the internet is just fragile.",
        "The bad announcement escaped because the route filter had been disabled and the change was released without staged validation. The cascade was distributed, but its initiating configuration and removed safeguard were specific and documented."
      ],
      "soundTitle": "The Cascade Reconstructed",
      "sound": [
        "Your finding correctly joins <b>Cory Idris — the network operations lead</b>, <b>The Operations Manager's Office</b>, and <b>A routing misconfiguration and a removed safeguard cascaded</b>. The route history and change ticket support the conclusion.",
        "Some peer-by-peer propagation remains to be mapped, yet the origin and containment failure are clear enough to restore filters and redesign rollout authority."
      ],
      "namedTitle": "The Bad Announcement",
      "named": [
        "You select the correct answer: <b>Cory Idris — the network operations lead</b>, <b>The Operations Manager's Office</b>, and <b>A routing misconfiguration and a removed safeguard cascaded</b>.",
        "The technical account needs greater detail, but it directs the review toward the configuration, export policy, and missing rollback controls."
      ]
    },
    "overclaim": {
      "title": "An Attack Without Attack Traffic",
      "body": [
        "You choose <b>A coordinated attack knocked the network down</b>, reading simultaneous global symptoms as proof of coordinated hostile action.",
        "The packet and route records do not support that accusation. By insisting on an enemy, you make the documented configuration failure easier to dismiss as an ordinary outage theory."
      ]
    },
    "dismissal": {
      "title": "A Surge Cannot Change Route Policy",
      "body": [
        "You accept <b>An unlucky traffic surge — the internet is just fragile</b>, attributing the outage to volume while leaving the leaked announcement unexplained.",
        "That answer treats Internet fragility as fate and restores service without restoring the filter. The same authorized change can produce the same global failure again."
      ]
    },
    "wrongNames": {
      "title": "The Route Found, the Sign-Off Missed",
      "body": [
        "You recognize <b>A routing misconfiguration and a removed safeguard cascaded</b>, but blame the registry or place responsibility at peering rather than in the operations office. The change approval leads instead to"
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A network graph carrying one bad route\"><g fill=\"none\" stroke=\"#121212\" stroke-width=\"1.4\"><circle cx=\"90\" cy=\"70\" r=\"18\"/><circle cx=\"210\" cy=\"34\" r=\"18\"/><circle cx=\"210\" cy=\"106\" r=\"18\"/><circle cx=\"350\" cy=\"70\" r=\"18\"/><circle cx=\"500\" cy=\"34\" r=\"18\"/><circle cx=\"500\" cy=\"106\" r=\"18\"/><line x1=\"108\" y1=\"64\" x2=\"192\" y2=\"40\"/><line x1=\"108\" y1=\"76\" x2=\"192\" y2=\"100\"/><line x1=\"228\" y1=\"34\" x2=\"332\" y2=\"64\"/><line x1=\"228\" y1=\"106\" x2=\"332\" y2=\"76\"/><line x1=\"368\" y1=\"64\" x2=\"482\" y2=\"40\"/><line x1=\"368\" y1=\"76\" x2=\"482\" y2=\"100\"/></g><path d=\"M90 70 L210 34 L350 70 L500 106\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"2.6\"/><path d=\"M500 106 L554 106\" stroke=\"#326891\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/></svg>"
}};
