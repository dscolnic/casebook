module.exports = { PACK: {
  "id": "swarm",
  "icon": "Σ",
  "discipline": "Autonomy & multi-agent systems",
  "title": "Many Robots, One Search",
  "headline": "Reconstruct how a team of autonomous vehicles divides work, shares evidence, and adapts when the mission changes.",
  "kicker": "Maritime-autonomy test range · Several unmanned vehicles receive one search objective",
  "story": [
    "No single vehicle has complete sensor coverage, unlimited energy, or continuous communication with every teammate.",
    "Arrange how a distributed team allocates tasks, builds a shared picture, and reorganizes after a new contact or vehicle failure."
  ],
  "principles": [
    [
      "Central control may be unavailable",
      "Vehicles need local rules that still produce useful group behavior when communication is delayed or lost."
    ],
    [
      "Task allocation is an optimization problem",
      "A good assignment considers distance, energy, sensor capability, risk, and duplication."
    ],
    [
      "Shared maps contain uncertainty",
      "Reports from different vehicles may overlap, disagree, or describe a changing environment."
    ],
    [
      "Robust teams replan",
      "The mission should continue when evidence changes, links fail, or a vehicle becomes unavailable."
    ]
  ],
  "terms": [
    [
      "Multi-agent system",
      "A group of autonomous decision-making vehicles or software agents."
    ],
    [
      "Task allocation",
      "Assigning mission responsibilities among team members."
    ],
    [
      "Consensus",
      "A process through which agents bring estimates or decisions toward agreement."
    ],
    [
      "Local observation",
      "Information available directly to one vehicle’s sensors."
    ],
    [
      "Data association",
      "Determining whether separate observations refer to the same object."
    ],
    [
      "Uncertainty",
      "A numerical or qualitative description of what the system does not know."
    ],
    [
      "Replanning",
      "Updating routes or assignments in response to new information."
    ],
    [
      "Fault tolerance",
      "Continuing useful operation despite component, vehicle, or communication failures."
    ]
  ],
  "note": "Real swarms use diverse architectures, communication protocols, safety constraints, vehicle types, and levels of human supervision. This game uses a distributed search-and-map mission.",
  "sources": "Aligned with ONR Science of Autonomy and Cooperative Autonomous Swarm Technology interests in unmanned maritime cooperation, perception, control, decision-making, reliability, and human-autonomy interaction.",
  "chapters": [
    {
      "id": "allocate",
      "cards": [
        [
          "map",
          "The team divides the search region into candidate tasks"
        ],
        [
          "cost",
          "Each vehicle estimates travel, energy, and sensing cost"
        ],
        [
          "bid",
          "Vehicles exchange compact task bids"
        ],
        [
          "assign",
          "The team assigns nonduplicated search areas"
        ]
      ]
    },
    {
      "id": "share",
      "cards": [
        [
          "sense",
          "Each vehicle gathers local observations"
        ],
        [
          "summarize",
          "Onboard processing compresses the useful evidence"
        ],
        [
          "exchange",
          "Available links carry summaries between teammates"
        ],
        [
          "fuse",
          "The team associates observations and updates a shared map"
        ]
      ]
    },
    {
      "id": "adapt",
      "cards": [
        [
          "change",
          "A new contact or vehicle failure changes mission value"
        ],
        [
          "reevaluate",
          "Vehicles recalculate the remaining task costs"
        ],
        [
          "redistribute",
          "The team redistributes routes and responsibilities"
        ],
        [
          "complete",
          "The surviving vehicles finish the highest-value coverage"
        ]
      ]
    }
  ],
  "chapterOrder": [
    "allocate",
    "share",
    "adapt"
  ],
  "intro": "The vehicles begin with a common mission objective but no detailed assignment of who should search each area. Sequence A must transform capabilities and costs into a division of labor that avoids wasteful duplication.",
  "segues": [
    "The vehicles now have separate responsibilities, but each one sees only a fraction of the environment. The next sequence turns local sensor observations into a shared operational picture despite limited links.",
    "The team now has a fused map and an active plan, but neither is permanent. The next sequence responds to evidence or failures that change which tasks are most valuable and which vehicles can perform them."
  ],
  "hints": [
    "Vehicles estimate the cost of candidate tasks before they exchange bids for those tasks.",
    "Onboard processing compresses local evidence before limited communication links carry the summaries to teammates."
  ],
  "collection": "ONR collection"
} };
