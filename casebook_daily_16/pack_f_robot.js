module.exports = { PACK: {
  "id": "f_robot",
  "title": "The Cell-9 Robot",
  "discipline": "Robotics & Autonomous Systems",
  "teaser": "A robot arm killed a technician inside its safety cage. A hacked machine? A careless worker? Or a safety lock someone had bypassed?",
  "overclaimTag": "a hacked machine",
  "truthTag": "a bypassed safety interlock and a known fault",
  "venue": "the Cell-9 robotics inquiry",
  "agent": {
    "name": "Investigator Mara Quint",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Robotics & Autonomy Pioneers",
  "dossierName": "ROBOTICS & AUTONOMY PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Cell-9 robotics inquiry",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before the inquiry closes. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The WHERE you test determines the dossier, and the conversation costs one day.",
  "overclaimTease": "A machine villain is easy to imagine; reconstruct the cell before giving the arm a motive.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "automation",
      "items": [
        {
          "id": "hacker",
          "label": "An outside attacker who seized the machine"
        },
        {
          "id": "automation",
          "label": "Guy Halloran — the plant automation manager"
        },
        {
          "id": "worker",
          "label": "The maintenance crew"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "office",
      "items": [
        {
          "id": "cell",
          "label": "The Robot Cell & Safety Cage"
        },
        {
          "id": "controls",
          "label": "The Robot Control & Interlock Room"
        },
        {
          "id": "office",
          "label": "The Automation Manager's Office"
        }
      ]
    },
    "what": {
      "title": "What is happening",
      "truth": "interlock",
      "items": [
        {
          "id": "hack",
          "label": "The robot was hacked and turned deadly"
        },
        {
          "id": "operator",
          "label": "Simple operator error — the worker stepped in"
        },
        {
          "id": "interlock",
          "label": "A safety interlock bypassed and a known fault left unfixed"
        }
      ]
    }
  },
  "PLACES": {
    "cell": {
      "name": "The Robot Cell & Safety Cage",
      "xy": [
        140,
        90
      ]
    },
    "controls": {
      "name": "The Robot Control & Interlock Room",
      "xy": [
        330,
        240
      ]
    },
    "office": {
      "name": "The Automation Manager's Office",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "cell",
      "controls"
    ],
    [
      "controls",
      "office"
    ]
  ],
  "CHARACTERS": {
    "technician": {
      "name": "The Robot Technician",
      "role": "Robotics maintenance tech",
      "face": "🤖",
      "badge": "R",
      "legend": "the robot cell",
      "hint": "Services the arm; the door interlock had been jumpered out to keep the line moving."
    },
    "controls2": {
      "name": "The Controls Engineer",
      "role": "Control-systems engineer",
      "face": "🎛",
      "badge": "E",
      "legend": "the control room",
      "hint": "Reads the logs; the arm had lunged unexpectedly before, and it was written up."
    },
    "clerk": {
      "name": "The Clerk",
      "role": "Safety-records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the office",
      "hint": "Keeps the incident file — and the order to bypass the guard 'temporarily'."
    }
  },
  "TOPICMAP": {
    "cell": {
      "technician": [
        "r_firstrobot"
      ],
      "controls2": [
        "r_arm"
      ],
      "clerk": [
        "r_planning"
      ]
    },
    "controls": {
      "technician": [
        "r_legged"
      ],
      "controls2": [
        "r_activeperc"
      ],
      "clerk": [
        "r_motion"
      ]
    },
    "office": {
      "technician": [
        "r_selfdrive"
      ],
      "controls2": [
        "r_field"
      ],
      "clerk": [
        "r_fuzzy"
      ]
    }
  },
  "TOPICS": {
    "r_firstrobot": {
      "sci": "George Devol (1912-2011)",
      "topic": "The first industrial robot",
      "lede": "George Devol made the first industrial robot work in machines that had to sense, decide, and move.",
      "no": 1,
      "profile": "Today’s autonomy briefing uses George Devol to explain the first industrial robot. George Devol patented a programmable device for transferring articles and developed the concept that became the Unimate industrial robot. A robot converts uncertain sensing into physical motion. Between those endpoints lie state estimation, planning, control, mechanical limits, communications, and protective devices. Devol’s contribution shows how capability is built from that chain—and why a correct command can still produce an unsafe movement.\n\nThe operational method is to store a sequence of motions, drive actuators to repeat them, and separate reprogrammable control from the mechanical arm. Engineers should specify the workspace, allowable contact, stopping distance, sensor uncertainty, controller update rate, and behavior after a missing or contradictory signal. Simulation is useful, but real tests must include occlusion, unexpected obstacles, maintenance modes, and faults in the protective system.\n\nIndustrial and autonomous robots are often discussed as if intelligence resides in the machine alone. In practice, safety is distributed across fences, interlocks, software limits, brakes, procedures, and the people who change configurations. Production pressure can preserve output while quietly erasing the separation between human and machine that the risk assessment assumed.\n\nThe engineering conclusion is repeatability makes automation productive, but a programmed machine has no inherent understanding of whether its motion has become unsafe. Reliable autonomy means controlling uncertainty and preserving independent barriers around physical action. Logs matter because an intermittent lunge may disappear during inspection while remaining visible in timing and state history. A machine that repeats a task flawlessly can repeat a hazardous condition with the same precision.",
      "frame": "Locks the pendant and watches the arm settle. \"At The Robot Cell & Safety Cage, motion follows assumptions. Explain the first industrial robot before we energize anything.\"",
      "q": [
        {
          "q": "Which robotics account best captures George Devol’s contribution to the first industrial robot?",
          "o": [
            {
              "t": "George Devol patented a programmable device for transferring articles and developed the concept that became the Unimate industrial robot. The interlock dossier lets later reviewers reconstruct events in the case file.",
              "v": "expert",
              "fb": "Correct: robotic safety joins sensing, control, physical limits, and independent protective barriers."
            },
            {
              "t": "George Devol contributed to the first industrial robot, yet the account measures task success without testing human presence, maintenance mode, or guard failure. The human workspace is treated as a stable background condition.",
              "v": "partial",
              "fb": "Capability evidence is incomplete when maintenance, faults, and human presence are outside the test."
            },
            {
              "t": "George Devol is described as proving safety through repeatable motion, even though the same precise path can enter an occupied workspace. Under the interlock dossier, direct comparison fails in the dated record in the case file.",
              "v": "wrong",
              "fb": "Repeatability proves consistent motion, not safe motion or safe assumptions about the workspace."
            },
            {
              "t": "George Devol is cited to justify bypassing the interlock because the production robot has completed many cycles without an injury. Output replaces the guard. Past performance is treated as the safety case in the case file.",
              "v": "danger",
              "fb": "A good incident history cannot replace an interlock designed for the first severe failure."
            }
          ]
        },
        {
          "q": "Which control-and-safety procedure best applies the profile?",
          "o": [
            {
              "t": "Inside the cell, follow this control practice: store a sequence of motions, drive actuators to repeat them, and separate reprogrammable control from the mechanical arm in the dated record.",
              "v": "expert",
              "fb": "Correct: robotic safety joins sensing, control, physical limits, and independent protective barriers."
            },
            {
              "t": "Tune the robot for accurate production and test obstacles in simulation, but leave stopping distance and protective failure unmeasured. The human workspace is treated as a stable background condition.",
              "v": "partial",
              "fb": "Capability evidence is incomplete when maintenance, faults, and human presence are outside the test."
            },
            {
              "t": "Assume the command is safe whenever the controller executes it correctly, regardless of stale sensing or an altered human workspace. The trajectory record resists that claim in the case file.",
              "v": "wrong",
              "fb": "Repeatability proves consistent motion, not safe motion or safe assumptions about the workspace."
            },
            {
              "t": "Keep the line moving under a temporary bypass and rely on operators to avoid the arm until the known motion fault is convenient to fix. Past performance is treated as the safety case in the case file.",
              "v": "danger",
              "fb": "A good incident history cannot replace an interlock designed for the first severe failure."
            }
          ]
        },
        {
          "q": "Which conclusion about autonomous motion is most defensible?",
          "o": [
            {
              "t": "The autonomy lesson is that repeatability makes automation productive, but a programmed machine has no inherent understanding of whether its motion has become unsafe in the dated record.",
              "v": "expert",
              "fb": "Correct: robotic safety joins sensing, control, physical limits, and independent protective barriers."
            },
            {
              "t": "Improved perception or control reduces risk enough that independent physical barriers can be treated as optional operational backups. The human workspace is treated as a stable background condition.",
              "v": "partial",
              "fb": "Capability evidence is incomplete when maintenance, faults, and human presence are outside the test."
            },
            {
              "t": "A robot that repeats its program precisely has demonstrated safe judgment about every person, obstacle, and maintenance condition. Precision is treated as a substitute for independent safeguarding.",
              "v": "wrong",
              "fb": "Repeatability proves consistent motion, not safe motion or safe assumptions about the workspace."
            },
            {
              "t": "The machine is assumed to have been hacked or the worker alone caused the event, so altered safeguards need not be part of the finding. Under the interlock dossier, warning is postponed.",
              "v": "danger",
              "fb": "A good incident history cannot replace an interlock designed for the first severe failure."
            }
          ]
        }
      ]
    },
    "r_arm": {
      "sci": "Victor Scheinman (1942-2016)",
      "topic": "The programmable robotic arm",
      "lede": "Victor Scheinman connected the programmable robotic arm to feedback, uncertainty, and action in the real world.",
      "no": 2,
      "profile": "Today’s autonomy briefing uses Victor Scheinman to explain the programmable robotic arm. Victor Scheinman designed the Stanford Arm, an electrically powered, computer-controlled manipulator whose articulated joints enabled precise general-purpose motion. A robot converts uncertain sensing into physical motion. Between those endpoints lie state estimation, planning, control, mechanical limits, communications, and protective devices. Scheinman’s contribution shows how capability is built from that chain—and why a correct command can still produce an unsafe movement.\n\nThe operational method is to represent joint angles and end-effector pose, solve the kinematics connecting them, and command coordinated trajectories within mechanical limits. Engineers should specify the workspace, allowable contact, stopping distance, sensor uncertainty, controller update rate, and behavior after a missing or contradictory signal. Simulation is useful, but real tests must include occlusion, unexpected obstacles, maintenance modes, and faults in the protective system.\n\nIndustrial and autonomous robots are often discussed as if intelligence resides in the machine alone. In practice, safety is distributed across fences, interlocks, software limits, brakes, procedures, and the people who change configurations. Production pressure can preserve output while quietly erasing the separation between human and machine that the risk assessment assumed.\n\nThe engineering conclusion is a robot can reach the commanded point precisely while still following an unsafe path if constraints and obstacles are omitted. Reliable autonomy means controlling uncertainty and preserving independent barriers around physical action. A maintenance mode should reduce energy and authority rather than merely change the label shown on a pendant. Logs matter because an intermittent lunge may disappear during inspection while remaining visible in timing and state history.",
      "frame": "Freezes a trajectory on the display. \"One path enters human space. Tell me how the programmable robotic arm handles that.\"",
      "q": [
        {
          "q": "Which robotics account best captures Victor Scheinman’s contribution to the programmable robotic arm?",
          "o": [
            {
              "t": "Victor Scheinman designed the Stanford Arm, an electrically powered, computer-controlled manipulator whose articulated joints enabled precise general-purpose motion. Protective action remains independent in the case file in the case file.",
              "v": "expert",
              "fb": "Correct: robotic safety joins sensing, control, physical limits, and independent protective barriers."
            },
            {
              "t": "Victor Scheinman contributed to the programmable robotic arm, yet the account measures task success without testing human presence, maintenance mode, or guard failure. The human workspace is treated as a stable background condition.",
              "v": "partial",
              "fb": "Capability evidence is incomplete when maintenance, faults, and human presence are outside the test."
            },
            {
              "t": "Victor Scheinman is described as proving safety through repeatable motion, even though the same precise path can enter an occupied workspace. Under the interlock dossier, direct comparison fails in the operational record in the case file.",
              "v": "wrong",
              "fb": "Repeatability proves consistent motion, not safe motion or safe assumptions about the workspace."
            },
            {
              "t": "Victor Scheinman is cited to justify bypassing the interlock because the production robot has completed many cycles without an injury. Within the interlock dossier, assumption replaces verification in the dated record in the case file.",
              "v": "danger",
              "fb": "A good incident history cannot replace an interlock designed for the first severe failure."
            }
          ]
        },
        {
          "q": "Which control-and-safety procedure best applies the profile?",
          "o": [
            {
              "t": "Inside the cell, follow this control practice: represent joint angles and end-effector pose, solve the kinematics connecting them, and command coordinated trajectories within mechanical limits. The motion boundary stays visible.",
              "v": "expert",
              "fb": "Correct: robotic safety joins sensing, control, physical limits, and independent protective barriers."
            },
            {
              "t": "Tune the robot for accurate production and test obstacles in simulation, but leave stopping distance and protective failure unmeasured. Maintenance behavior stays uncertain. Support across the interlock dossier stays partial.",
              "v": "partial",
              "fb": "Capability evidence is incomplete when maintenance, faults, and human presence are outside the test."
            },
            {
              "t": "Assume the command is safe whenever the controller executes it correctly, regardless of stale sensing or an altered human workspace. Within the interlock dossier, no support appears. The interlock dossier points to another result.",
              "v": "wrong",
              "fb": "Repeatability proves consistent motion, not safe motion or safe assumptions about the workspace."
            },
            {
              "t": "Keep the line moving under a temporary bypass and rely on operators to avoid the arm until the known motion fault is convenient to fix. Past luck becomes the safety case. Inside the interlock dossier, drama displaces testing.",
              "v": "danger",
              "fb": "A good incident history cannot replace an interlock designed for the first severe failure."
            }
          ]
        },
        {
          "q": "Which conclusion about autonomous motion is most defensible?",
          "o": [
            {
              "t": "The autonomy lesson is that a robot can reach the commanded point precisely while still following an unsafe path if constraints and obstacles are omitted. The motion boundary stays visible in the case file.",
              "v": "expert",
              "fb": "Correct: robotic safety joins sensing, control, physical limits, and independent protective barriers."
            },
            {
              "t": "Improved perception or control reduces risk enough that independent physical barriers can be treated as optional operational backups. Support across the interlock dossier stays partial in the case file.",
              "v": "partial",
              "fb": "Capability evidence is incomplete when maintenance, faults, and human presence are outside the test."
            },
            {
              "t": "A robot that repeats its program precisely has demonstrated safe judgment about every person, obstacle, and maintenance condition. Under the interlock dossier, direct comparison fails in the case file.",
              "v": "wrong",
              "fb": "Repeatability proves consistent motion, not safe motion or safe assumptions about the workspace."
            },
            {
              "t": "The machine is assumed to have been hacked or the worker alone caused the event, so altered safeguards need not be part of the finding. Within the interlock dossier, assumption replaces verification.",
              "v": "danger",
              "fb": "A good incident history cannot replace an interlock designed for the first severe failure."
            }
          ]
        }
      ]
    },
    "r_planning": {
      "sci": "Nils Nilsson (1933-2019)",
      "topic": "Robot planning & the A* search",
      "lede": "Physical autonomy became an engineering problem through Nils Nilsson’s approach to robot planning and the A* search.",
      "no": 3,
      "profile": "Today’s autonomy briefing uses Nils Nilsson to explain robot planning and the A* search. Nils Nilsson co-developed A* search and helped create planning methods used by Shakey, including systematic routes from a starting state to a goal. A robot converts uncertain sensing into physical motion. Between those endpoints lie state estimation, planning, control, mechanical limits, communications, and protective devices. Nilsson’s contribution shows how capability is built from that chain—and why a correct command can still produce an unsafe movement.\n\nThe operational method is to score partial paths by cost already incurred plus an admissible estimate of remaining cost, then expand the most promising state. Engineers should specify the workspace, allowable contact, stopping distance, sensor uncertainty, controller update rate, and behavior after a missing or contradictory signal. Simulation is useful, but real tests must include occlusion, unexpected obstacles, maintenance modes, and faults in the protective system.\n\nIndustrial and autonomous robots are often discussed as if intelligence resides in the machine alone. In practice, safety is distributed across fences, interlocks, software limits, brakes, procedures, and the people who change configurations. Production pressure can preserve output while quietly erasing the separation between human and machine that the risk assessment assumed.\n\nThe engineering conclusion is a planner's result is only as sound as its state description, allowed actions, and cost function. Reliable autonomy means controlling uncertainty and preserving independent barriers around physical action. A machine that repeats a task flawlessly can repeat a hazardous condition with the same precision. A maintenance mode should reduce energy and authority rather than merely change the label shown on a pendant.",
      "frame": "Points to the guard circuit. \"The robot obeyed a command; that does not make the cell safe. Show me robot planning and the A* search.\"",
      "q": [
        {
          "q": "Which robotics account best captures Nils Nilsson’s contribution to robot planning and the A* search?",
          "o": [
            {
              "t": "Nils Nilsson co-developed A* search and helped create planning methods used by Shakey, including systematic routes from a starting state to a goal. The motion boundary stays visible. Protective action remains independent in the case file.",
              "v": "expert",
              "fb": "Correct: robotic safety joins sensing, control, physical limits, and independent protective barriers."
            },
            {
              "t": "Nils Nilsson contributed to robot planning and the A* search, yet the account measures task success without testing human presence, maintenance mode, or guard failure. The interlock dossier leaves one test open in the dated record in the case file.",
              "v": "partial",
              "fb": "Capability evidence is incomplete when maintenance, faults, and human presence are outside the test."
            },
            {
              "t": "Nils Nilsson is described as proving safety through repeatable motion, even though the same precise path can enter an occupied workspace. The trajectory record resists that claim. Precision is treated as a substitute for independent safeguarding.",
              "v": "wrong",
              "fb": "Repeatability proves consistent motion, not safe motion or safe assumptions about the workspace."
            },
            {
              "t": "Nils Nilsson is cited to justify bypassing the interlock because the production robot has completed many cycles without an injury. Output replaces the guard. Inside the interlock dossier, the claim outruns checks in the dated record in the case file.",
              "v": "danger",
              "fb": "A good incident history cannot replace an interlock designed for the first severe failure."
            }
          ]
        },
        {
          "q": "Which control-and-safety procedure best applies the profile?",
          "o": [
            {
              "t": "Inside the cell, follow this control practice: score partial paths by cost already incurred plus an admissible estimate of remaining cost, then expand the most promising state.",
              "v": "expert",
              "fb": "Correct: robotic safety joins sensing, control, physical limits, and independent protective barriers."
            },
            {
              "t": "Tune the robot for accurate production and test obstacles in simulation, but leave stopping distance and protective failure unmeasured. Maintenance behavior stays uncertain.",
              "v": "partial",
              "fb": "Capability evidence is incomplete when maintenance, faults, and human presence are outside the test."
            },
            {
              "t": "Assume the command is safe whenever the controller executes it correctly, regardless of stale sensing or an altered human workspace. The interlock dossier defeats that inference.",
              "v": "wrong",
              "fb": "Repeatability proves consistent motion, not safe motion or safe assumptions about the workspace."
            },
            {
              "t": "Keep the line moving under a temporary bypass and rely on operators to avoid the arm until the known motion fault is convenient to fix. Past performance is treated as the safety case.",
              "v": "danger",
              "fb": "A good incident history cannot replace an interlock designed for the first severe failure."
            }
          ]
        },
        {
          "q": "Which conclusion about autonomous motion is most defensible?",
          "o": [
            {
              "t": "The autonomy lesson is that a planner's result is only as sound as its state description, allowed actions, and cost function. The interlock dossier keeps assumptions explicit in the case file.",
              "v": "expert",
              "fb": "Correct: robotic safety joins sensing, control, physical limits, and independent protective barriers."
            },
            {
              "t": "Improved perception or control reduces risk enough that independent physical barriers can be treated as optional operational backups. Maintenance behavior stays uncertain in the case file.",
              "v": "partial",
              "fb": "Capability evidence is incomplete when maintenance, faults, and human presence are outside the test."
            },
            {
              "t": "A robot that repeats its program precisely has demonstrated safe judgment about every person, obstacle, and maintenance condition. The trajectory record resists that claim in the case file.",
              "v": "wrong",
              "fb": "Repeatability proves consistent motion, not safe motion or safe assumptions about the workspace."
            },
            {
              "t": "The machine is assumed to have been hacked or the worker alone caused the event, so altered safeguards need not be part of the finding. Under the interlock dossier, warning is postponed.",
              "v": "danger",
              "fb": "A good incident history cannot replace an interlock designed for the first severe failure."
            }
          ]
        }
      ]
    },
    "r_legged": {
      "sci": "Marc Raibert (b. 1949)",
      "topic": "Dynamic & legged robots",
      "lede": "Marc Raibert made dynamic and legged robots work in machines that had to sense, decide, and move.",
      "no": 4,
      "profile": "Today’s autonomy briefing uses Marc Raibert to explain dynamic and legged robots. Marc Raibert pioneered dynamically balanced legged robots, using active control to make hopping and running stable rather than treating each pose as static. A robot converts uncertain sensing into physical motion. Between those endpoints lie state estimation, planning, control, mechanical limits, communications, and protective devices. Raibert’s contribution shows how capability is built from that chain—and why a correct command can still produce an unsafe movement.\n\nThe operational method is to measure body motion, adjust foot placement and thrust every cycle, and use feedback to regulate speed, height, and balance. Engineers should specify the workspace, allowable contact, stopping distance, sensor uncertainty, controller update rate, and behavior after a missing or contradictory signal. Simulation is useful, but real tests must include occlusion, unexpected obstacles, maintenance modes, and faults in the protective system.\n\nIndustrial and autonomous robots are often discussed as if intelligence resides in the machine alone. In practice, safety is distributed across fences, interlocks, software limits, brakes, procedures, and the people who change configurations. Production pressure can preserve output while quietly erasing the separation between human and machine that the risk assessment assumed.\n\nThe engineering conclusion is dynamic machines remain upright by correcting error continuously, so delayed or disabled feedback can turn a small disturbance into a fall. Reliable autonomy means controlling uncertainty and preserving independent barriers around physical action. Logs matter because an intermittent lunge may disappear during inspection while remaining visible in timing and state history. The lesson remains current.",
      "frame": "Locks the pendant and watches the arm settle. \"At The Robot Control & Interlock Room, motion follows assumptions. Explain dynamic and legged robots before we energize anything.\"",
      "q": [
        {
          "q": "Which robotics account best captures Marc Raibert’s contribution to dynamic and legged robots?",
          "o": [
            {
              "t": "Marc Raibert pioneered dynamically balanced legged robots, using active control to make hopping and running stable rather than treating each pose as static. Protective action remains independent in the case file in the case file.",
              "v": "expert",
              "fb": "Correct: robotic safety joins sensing, control, physical limits, and independent protective barriers."
            },
            {
              "t": "Marc Raibert contributed to dynamic and legged robots, yet the account measures task success without testing human presence, maintenance mode, or guard failure. The human workspace is treated as a stable background condition.",
              "v": "partial",
              "fb": "Capability evidence is incomplete when maintenance, faults, and human presence are outside the test."
            },
            {
              "t": "Marc Raibert is described as proving safety through repeatable motion, even though the same precise path can enter an occupied workspace. Within the interlock dossier, no support appears in the operational record in the case file.",
              "v": "wrong",
              "fb": "Repeatability proves consistent motion, not safe motion or safe assumptions about the workspace."
            },
            {
              "t": "Marc Raibert is cited to justify bypassing the interlock because the production robot has completed many cycles without an injury. Inside the interlock dossier, the claim outruns checks across the available record in the case file.",
              "v": "danger",
              "fb": "A good incident history cannot replace an interlock designed for the first severe failure."
            }
          ]
        },
        {
          "q": "Which control-and-safety procedure best applies the profile?",
          "o": [
            {
              "t": "Inside the cell, follow this control practice: measure body motion, adjust foot placement and thrust every cycle, and use feedback to regulate speed, height, and balance in the case file in the case file.",
              "v": "expert",
              "fb": "Correct: robotic safety joins sensing, control, physical limits, and independent protective barriers."
            },
            {
              "t": "Tune the robot for accurate production and test obstacles in simulation, but leave stopping distance and protective failure unmeasured. The human workspace is treated as a stable background condition.",
              "v": "partial",
              "fb": "Capability evidence is incomplete when maintenance, faults, and human presence are outside the test."
            },
            {
              "t": "Assume the command is safe whenever the controller executes it correctly, regardless of stale sensing or an altered human workspace. The trajectory record resists that claim in the case file in the case file.",
              "v": "wrong",
              "fb": "Repeatability proves consistent motion, not safe motion or safe assumptions about the workspace."
            },
            {
              "t": "Keep the line moving under a temporary bypass and rely on operators to avoid the arm until the known motion fault is convenient to fix. Past performance is treated as the safety case in the case file.",
              "v": "danger",
              "fb": "A good incident history cannot replace an interlock designed for the first severe failure."
            }
          ]
        },
        {
          "q": "Which conclusion about autonomous motion is most defensible?",
          "o": [
            {
              "t": "The autonomy lesson is that dynamic machines remain upright by correcting error continuously, so delayed or disabled feedback can turn a small disturbance into a fall in the dated record.",
              "v": "expert",
              "fb": "Correct: robotic safety joins sensing, control, physical limits, and independent protective barriers."
            },
            {
              "t": "Improved perception or control reduces risk enough that independent physical barriers can be treated as optional operational backups. The human workspace is treated as a stable background condition.",
              "v": "partial",
              "fb": "Capability evidence is incomplete when maintenance, faults, and human presence are outside the test."
            },
            {
              "t": "A robot that repeats its program precisely has demonstrated safe judgment about every person, obstacle, and maintenance condition. Precision is treated as a substitute for independent safeguarding.",
              "v": "wrong",
              "fb": "Repeatability proves consistent motion, not safe motion or safe assumptions about the workspace."
            },
            {
              "t": "The machine is assumed to have been hacked or the worker alone caused the event, so altered safeguards need not be part of the finding. Under the interlock dossier, warning is postponed.",
              "v": "danger",
              "fb": "A good incident history cannot replace an interlock designed for the first severe failure."
            }
          ]
        }
      ]
    },
    "r_activeperc": {
      "sci": "Ruzena Bajcsy (b. 1933)",
      "topic": "Active perception",
      "lede": "Ruzena Bajcsy connected active perception to feedback, uncertainty, and action in the real world.",
      "no": 5,
      "profile": "Today’s autonomy briefing uses Ruzena Bajcsy to explain active perception. Ruzena Bajcsy developed active perception, emphasizing that a robot can move sensors or change viewpoint to obtain the information a task requires. A robot converts uncertain sensing into physical motion. Between those endpoints lie state estimation, planning, control, mechanical limits, communications, and protective devices. Bajcsy’s contribution shows how capability is built from that chain—and why a correct command can still produce an unsafe movement.\n\nThe operational method is to choose sensing actions that reduce uncertainty, revisit ambiguous features, and coordinate perception with the planned manipulation or motion. Engineers should specify the workspace, allowable contact, stopping distance, sensor uncertainty, controller update rate, and behavior after a missing or contradictory signal. Simulation is useful, but real tests must include occlusion, unexpected obstacles, maintenance modes, and faults in the protective system.\n\nIndustrial and autonomous robots are often discussed as if intelligence resides in the machine alone. In practice, safety is distributed across fences, interlocks, software limits, brakes, procedures, and the people who change configurations. Production pressure can preserve output while quietly erasing the separation between human and machine that the risk assessment assumed.\n\nThe engineering conclusion is a system should seek missing evidence before acting when a safer viewpoint or measurement is available. Reliable autonomy means controlling uncertainty and preserving independent barriers around physical action. A maintenance mode should reduce energy and authority rather than merely change the label shown on a pendant. Logs matter because an intermittent lunge may disappear during inspection while remaining visible in timing and state history.",
      "frame": "Freezes a trajectory on the display. \"One path enters human space. Tell me how active perception handles that.\"",
      "q": [
        {
          "q": "Which robotics account best captures Ruzena Bajcsy’s contribution to active perception?",
          "o": [
            {
              "t": "Ruzena Bajcsy developed active perception, emphasizing that a robot can move sensors or change viewpoint to obtain the information a task requires. The interlock dossier keeps assumptions explicit in the case file.",
              "v": "expert",
              "fb": "Correct: robotic safety joins sensing, control, physical limits, and independent protective barriers."
            },
            {
              "t": "Ruzena Bajcsy contributed to active perception, yet the account measures task success without testing human presence, maintenance mode, or guard failure. The human workspace is treated as a stable background condition.",
              "v": "partial",
              "fb": "Capability evidence is incomplete when maintenance, faults, and human presence are outside the test."
            },
            {
              "t": "Ruzena Bajcsy is described as proving safety through repeatable motion, even though the same precise path can enter an occupied workspace. The interlock dossier points to another result in the dated record.",
              "v": "wrong",
              "fb": "Repeatability proves consistent motion, not safe motion or safe assumptions about the workspace."
            },
            {
              "t": "Ruzena Bajcsy is cited to justify bypassing the interlock because the production robot has completed many cycles without an injury. Inside the interlock dossier, the claim outruns checks in the dated record.",
              "v": "danger",
              "fb": "A good incident history cannot replace an interlock designed for the first severe failure."
            }
          ]
        },
        {
          "q": "Which control-and-safety procedure best applies the profile?",
          "o": [
            {
              "t": "Inside the cell, follow this control practice: choose sensing actions that reduce uncertainty, revisit ambiguous features, and coordinate perception with the planned manipulation or motion. The motion boundary stays visible.",
              "v": "expert",
              "fb": "Correct: robotic safety joins sensing, control, physical limits, and independent protective barriers."
            },
            {
              "t": "Tune the robot for accurate production and test obstacles in simulation, but leave stopping distance and protective failure unmeasured. The human workspace is unresolved. Support across the interlock dossier stays partial.",
              "v": "partial",
              "fb": "Capability evidence is incomplete when maintenance, faults, and human presence are outside the test."
            },
            {
              "t": "Assume the command is safe whenever the controller executes it correctly, regardless of stale sensing or an altered human workspace. The interlock dossier defeats that inference. The interlock dossier points to another result.",
              "v": "wrong",
              "fb": "Repeatability proves consistent motion, not safe motion or safe assumptions about the workspace."
            },
            {
              "t": "Keep the line moving under a temporary bypass and rely on operators to avoid the arm until the known motion fault is convenient to fix. Past luck becomes the safety case. Under the interlock dossier, warning is postponed.",
              "v": "danger",
              "fb": "A good incident history cannot replace an interlock designed for the first severe failure."
            }
          ]
        },
        {
          "q": "Which conclusion about autonomous motion is most defensible?",
          "o": [
            {
              "t": "The autonomy lesson is that a system should seek missing evidence before acting when a safer viewpoint or measurement is available. The motion boundary stays visible in the dated record.",
              "v": "expert",
              "fb": "Correct: robotic safety joins sensing, control, physical limits, and independent protective barriers."
            },
            {
              "t": "Improved perception or control reduces risk enough that independent physical barriers can be treated as optional operational backups. The human workspace is treated as a stable background condition.",
              "v": "partial",
              "fb": "Capability evidence is incomplete when maintenance, faults, and human presence are outside the test."
            },
            {
              "t": "A robot that repeats its program precisely has demonstrated safe judgment about every person, obstacle, and maintenance condition. Precision is treated as a substitute for independent safeguarding.",
              "v": "wrong",
              "fb": "Repeatability proves consistent motion, not safe motion or safe assumptions about the workspace."
            },
            {
              "t": "The machine is assumed to have been hacked or the worker alone caused the event, so altered safeguards need not be part of the finding. Under the interlock dossier, warning is postponed.",
              "v": "danger",
              "fb": "A good incident history cannot replace an interlock designed for the first severe failure."
            }
          ]
        }
      ]
    },
    "r_motion": {
      "sci": "Oussama Khatib (robot-control pioneer)",
      "topic": "Robot motion & obstacle avoidance",
      "lede": "Physical autonomy became an engineering problem through Oussama Khatib’s approach to robot motion and obstacle avoidance.",
      "no": 6,
      "profile": "Today’s autonomy briefing uses Oussama Khatib to explain robot motion and obstacle avoidance. Oussama Khatib introduced influential methods for real-time robot motion, including artificial potential fields and operational-space control. A robot converts uncertain sensing into physical motion. Between those endpoints lie state estimation, planning, control, mechanical limits, communications, and protective devices. Khatib’s contribution shows how capability is built from that chain—and why a correct command can still produce an unsafe movement.\n\nThe operational method is to treat goals as attractive influences, obstacles as repulsive constraints, and command forces or motion in task coordinates. Engineers should specify the workspace, allowable contact, stopping distance, sensor uncertainty, controller update rate, and behavior after a missing or contradictory signal. Simulation is useful, but real tests must include occlusion, unexpected obstacles, maintenance modes, and faults in the protective system.\n\nIndustrial and autonomous robots are often discussed as if intelligence resides in the machine alone. In practice, safety is distributed across fences, interlocks, software limits, brakes, procedures, and the people who change configurations. Production pressure can preserve output while quietly erasing the separation between human and machine that the risk assessment assumed.\n\nThe engineering conclusion is a mathematically smooth controller still needs safeguards for local minima, sensor error, unexpected contact, and unreachable goals. Reliable autonomy means controlling uncertainty and preserving independent barriers around physical action. A machine that repeats a task flawlessly can repeat a hazardous condition with the same precision. A maintenance mode should reduce energy and authority rather than merely change the label shown on a pendant.",
      "frame": "Points to the guard circuit. \"The robot obeyed a command; that does not make the cell safe. Show me robot motion and obstacle avoidance.\"",
      "q": [
        {
          "q": "Which robotics account best captures Oussama Khatib’s contribution to robot motion and obstacle avoidance?",
          "o": [
            {
              "t": "Oussama Khatib introduced influential methods for real-time robot motion, including artificial potential fields and operational-space control. The motion boundary stays visible in the case file in the case file.",
              "v": "expert",
              "fb": "Correct: robotic safety joins sensing, control, physical limits, and independent protective barriers."
            },
            {
              "t": "Oussama Khatib contributed to robot motion and obstacle avoidance, yet the account measures task success without testing human presence, maintenance mode, or guard failure in the dated record in the case file.",
              "v": "partial",
              "fb": "Capability evidence is incomplete when maintenance, faults, and human presence are outside the test."
            },
            {
              "t": "Oussama Khatib is described as proving safety through repeatable motion, even though the same precise path can enter an occupied workspace. Precision is treated as a substitute for independent safeguarding.",
              "v": "wrong",
              "fb": "Repeatability proves consistent motion, not safe motion or safe assumptions about the workspace."
            },
            {
              "t": "Oussama Khatib is cited to justify bypassing the interlock because the production robot has completed many cycles without an injury. Past performance is treated as the safety case in the case file in the case file.",
              "v": "danger",
              "fb": "A good incident history cannot replace an interlock designed for the first severe failure."
            }
          ]
        },
        {
          "q": "Which control-and-safety procedure best applies the profile?",
          "o": [
            {
              "t": "Inside the cell, follow this control practice: treat goals as attractive influences, obstacles as repulsive constraints, and command forces or motion in task coordinates in the case file in the case file.",
              "v": "expert",
              "fb": "Correct: robotic safety joins sensing, control, physical limits, and independent protective barriers."
            },
            {
              "t": "Tune the robot for accurate production and test obstacles in simulation, but leave stopping distance and protective failure unmeasured. The human workspace is treated as a stable background condition.",
              "v": "partial",
              "fb": "Capability evidence is incomplete when maintenance, faults, and human presence are outside the test."
            },
            {
              "t": "Assume the command is safe whenever the controller executes it correctly, regardless of stale sensing or an altered human workspace. The trajectory record resists that claim in the case file in the case file.",
              "v": "wrong",
              "fb": "Repeatability proves consistent motion, not safe motion or safe assumptions about the workspace."
            },
            {
              "t": "Keep the line moving under a temporary bypass and rely on operators to avoid the arm until the known motion fault is convenient to fix. Past performance is treated as the safety case in the case file.",
              "v": "danger",
              "fb": "A good incident history cannot replace an interlock designed for the first severe failure."
            }
          ]
        },
        {
          "q": "Which conclusion about autonomous motion is most defensible?",
          "o": [
            {
              "t": "The autonomy lesson is that a mathematically smooth controller still needs safeguards for local minima, sensor error, unexpected contact, and unreachable goals. The interlock dossier keeps assumptions explicit in the case file.",
              "v": "expert",
              "fb": "Correct: robotic safety joins sensing, control, physical limits, and independent protective barriers."
            },
            {
              "t": "Improved perception or control reduces risk enough that independent physical barriers can be treated as optional operational backups. Maintenance behavior stays uncertain. The human workspace is treated as a stable background condition.",
              "v": "partial",
              "fb": "Capability evidence is incomplete when maintenance, faults, and human presence are outside the test."
            },
            {
              "t": "A robot that repeats its program precisely has demonstrated safe judgment about every person, obstacle, and maintenance condition. The trajectory record resists that claim. Precision is treated as a substitute for independent safeguarding.",
              "v": "wrong",
              "fb": "Repeatability proves consistent motion, not safe motion or safe assumptions about the workspace."
            },
            {
              "t": "The machine is assumed to have been hacked or the worker alone caused the event, so altered safeguards need not be part of the finding. Past luck becomes the safety case. Under the interlock dossier, warning is postponed in the case file.",
              "v": "danger",
              "fb": "A good incident history cannot replace an interlock designed for the first severe failure."
            }
          ]
        }
      ]
    },
    "r_selfdrive": {
      "sci": "Sebastian Thrun (b. 1967)",
      "topic": "Self-driving & probabilistic robotics",
      "lede": "Sebastian Thrun made self-driving and probabilistic robotics work in machines that had to sense, decide, and move.",
      "no": 7,
      "profile": "Today’s autonomy briefing uses Sebastian Thrun to explain self-driving and probabilistic robotics. Sebastian Thrun led the Stanford team whose vehicle Stanley won the 2005 DARPA Grand Challenge and later helped launch major self-driving research programs. A robot converts uncertain sensing into physical motion. Between those endpoints lie state estimation, planning, control, mechanical limits, communications, and protective devices. Thrun’s contribution shows how capability is built from that chain—and why a correct command can still produce an unsafe movement.\n\nThe operational method is to combine maps, lidar, cameras, probabilistic localization, obstacle detection, and behavior planning while tracking uncertainty. Engineers should specify the workspace, allowable contact, stopping distance, sensor uncertainty, controller update rate, and behavior after a missing or contradictory signal. Simulation is useful, but real tests must include occlusion, unexpected obstacles, maintenance modes, and faults in the protective system.\n\nIndustrial and autonomous robots are often discussed as if intelligence resides in the machine alone. In practice, safety is distributed across fences, interlocks, software limits, brakes, procedures, and the people who change configurations. Production pressure can preserve output while quietly erasing the separation between human and machine that the risk assessment assumed.\n\nThe engineering conclusion is autonomous performance must be evaluated across rare conditions because average route success can hide dangerous boundary cases. Reliable autonomy means controlling uncertainty and preserving independent barriers around physical action. Logs matter because an intermittent lunge may disappear during inspection while remaining visible in timing and state history. A machine that repeats a task flawlessly can repeat a hazardous condition with the same precision.",
      "frame": "Locks the pendant and watches the arm settle. \"At The Automation Manager's Office, motion follows assumptions. Explain self-driving and probabilistic robotics before we energize anything.\"",
      "q": [
        {
          "q": "Which robotics account best captures Sebastian Thrun’s contribution to self-driving and probabilistic robotics?",
          "o": [
            {
              "t": "Sebastian Thrun led the Stanford team whose vehicle Stanley won the 2005 DARPA Grand Challenge and later helped launch major self-driving research programs. Through the interlock dossier, independent review remains possible in the case file.",
              "v": "expert",
              "fb": "Correct: robotic safety joins sensing, control, physical limits, and independent protective barriers."
            },
            {
              "t": "Sebastian Thrun contributed to self-driving and probabilistic robotics, yet the account measures task success without testing human presence, maintenance mode, or guard failure. Maintenance behavior stays uncertain in the dated record in the case file.",
              "v": "partial",
              "fb": "Capability evidence is incomplete when maintenance, faults, and human presence are outside the test."
            },
            {
              "t": "Sebastian Thrun is described as proving safety through repeatable motion, even though the same precise path can enter an occupied workspace. The trajectory record resists that claim. Precision is treated as a substitute for independent safeguarding.",
              "v": "wrong",
              "fb": "Repeatability proves consistent motion, not safe motion or safe assumptions about the workspace."
            },
            {
              "t": "Sebastian Thrun is cited to justify bypassing the interlock because the production robot has completed many cycles without an injury. Output replaces the guard. Inside the interlock dossier, the claim outruns checks in the dated record in the case file.",
              "v": "danger",
              "fb": "A good incident history cannot replace an interlock designed for the first severe failure."
            }
          ]
        },
        {
          "q": "Which control-and-safety procedure best applies the profile?",
          "o": [
            {
              "t": "Inside the cell, follow this control practice: combine maps, lidar, cameras, probabilistic localization, obstacle detection, and behavior planning while tracking uncertainty.",
              "v": "expert",
              "fb": "Correct: robotic safety joins sensing, control, physical limits, and independent protective barriers."
            },
            {
              "t": "Tune the robot for accurate production and test obstacles in simulation, but leave stopping distance and protective failure unmeasured. Maintenance behavior stays uncertain.",
              "v": "partial",
              "fb": "Capability evidence is incomplete when maintenance, faults, and human presence are outside the test."
            },
            {
              "t": "Assume the command is safe whenever the controller executes it correctly, regardless of stale sensing or an altered human workspace. The interlock dossier defeats that inference.",
              "v": "wrong",
              "fb": "Repeatability proves consistent motion, not safe motion or safe assumptions about the workspace."
            },
            {
              "t": "Keep the line moving under a temporary bypass and rely on operators to avoid the arm until the known motion fault is convenient to fix. Past performance is treated as the safety case.",
              "v": "danger",
              "fb": "A good incident history cannot replace an interlock designed for the first severe failure."
            }
          ]
        },
        {
          "q": "Which conclusion about autonomous motion is most defensible?",
          "o": [
            {
              "t": "The autonomy lesson is that autonomous performance must be evaluated across rare conditions because average route success can hide dangerous boundary cases. The interlock dossier keeps assumptions explicit in the dated record in the case file.",
              "v": "expert",
              "fb": "Correct: robotic safety joins sensing, control, physical limits, and independent protective barriers."
            },
            {
              "t": "Improved perception or control reduces risk enough that independent physical barriers can be treated as optional operational backups. Maintenance behavior stays uncertain. The human workspace is treated as a stable background condition.",
              "v": "partial",
              "fb": "Capability evidence is incomplete when maintenance, faults, and human presence are outside the test."
            },
            {
              "t": "A robot that repeats its program precisely has demonstrated safe judgment about every person, obstacle, and maintenance condition. The trajectory record resists that claim. Precision is treated as a substitute for independent safeguarding.",
              "v": "wrong",
              "fb": "Repeatability proves consistent motion, not safe motion or safe assumptions about the workspace."
            },
            {
              "t": "The machine is assumed to have been hacked or the worker alone caused the event, so altered safeguards need not be part of the finding. Past luck becomes the safety case. Under the interlock dossier, warning is postponed in the case file.",
              "v": "danger",
              "fb": "A good incident history cannot replace an interlock designed for the first severe failure."
            }
          ]
        }
      ]
    },
    "r_field": {
      "sci": "Red Whittaker (b. 1948)",
      "topic": "Field & autonomous vehicles",
      "lede": "Red Whittaker connected field and autonomous vehicles to feedback, uncertainty, and action in the real world.",
      "no": 8,
      "profile": "Today’s autonomy briefing uses Red Whittaker to explain field and autonomous vehicles. Red Whittaker pioneered field robotics at Carnegie Mellon, building autonomous machines for mines, disaster sites, deserts, and other unstructured environments. A robot converts uncertain sensing into physical motion. Between those endpoints lie state estimation, planning, control, mechanical limits, communications, and protective devices. Whittaker’s contribution shows how capability is built from that chain—and why a correct command can still produce an unsafe movement.\n\nThe operational method is to design for dust, vibration, uncertain terrain, communication loss, imperfect maps, and recovery when the planned route becomes impossible. Engineers should specify the workspace, allowable contact, stopping distance, sensor uncertainty, controller update rate, and behavior after a missing or contradictory signal. Simulation is useful, but real tests must include occlusion, unexpected obstacles, maintenance modes, and faults in the protective system.\n\nIndustrial and autonomous robots are often discussed as if intelligence resides in the machine alone. In practice, safety is distributed across fences, interlocks, software limits, brakes, procedures, and the people who change configurations. Production pressure can preserve output while quietly erasing the separation between human and machine that the risk assessment assumed.\n\nThe engineering conclusion is field reliability is proved by surviving the environment and recovering from faults, not by repeating a laboratory demonstration. Reliable autonomy means controlling uncertainty and preserving independent barriers around physical action. A maintenance mode should reduce energy and authority rather than merely change the label shown on a pendant. Logs matter because an intermittent lunge may disappear during inspection while remaining visible in timing and state history.",
      "frame": "Freezes a trajectory on the display. \"One path enters human space. Tell me how field and autonomous vehicles handles that.\"",
      "q": [
        {
          "q": "Which robotics account best captures Red Whittaker’s contribution to field and autonomous vehicles?",
          "o": [
            {
              "t": "Red Whittaker pioneered field robotics at Carnegie Mellon, building autonomous machines for mines, disaster sites, deserts, and other unstructured environments. The interlock dossier lets later reviewers reconstruct events in the case file.",
              "v": "expert",
              "fb": "Correct: robotic safety joins sensing, control, physical limits, and independent protective barriers."
            },
            {
              "t": "Red Whittaker contributed to field and autonomous vehicles, yet the account measures task success without testing human presence, maintenance mode, or guard failure. Support across the interlock dossier stays partial in the case file in the case file.",
              "v": "partial",
              "fb": "Capability evidence is incomplete when maintenance, faults, and human presence are outside the test."
            },
            {
              "t": "Red Whittaker is described as proving safety through repeatable motion, even though the same precise path can enter an occupied workspace. The trajectory record resists that claim. Precision is treated as a substitute for independent safeguarding.",
              "v": "wrong",
              "fb": "Repeatability proves consistent motion, not safe motion or safe assumptions about the workspace."
            },
            {
              "t": "Red Whittaker is cited to justify bypassing the interlock because the production robot has completed many cycles without an injury. Output replaces the guard. Inside the interlock dossier, the claim outruns checks in the dated record in the case file.",
              "v": "danger",
              "fb": "A good incident history cannot replace an interlock designed for the first severe failure."
            }
          ]
        },
        {
          "q": "Which control-and-safety procedure best applies the profile?",
          "o": [
            {
              "t": "Inside the cell, follow this control practice: design for dust, vibration, uncertain terrain, communication loss, imperfect maps, and recovery when the planned route becomes impossible.",
              "v": "expert",
              "fb": "Correct: robotic safety joins sensing, control, physical limits, and independent protective barriers."
            },
            {
              "t": "Tune the robot for accurate production and test obstacles in simulation, but leave stopping distance and protective failure unmeasured. The interlock dossier leaves one test open.",
              "v": "partial",
              "fb": "Capability evidence is incomplete when maintenance, faults, and human presence are outside the test."
            },
            {
              "t": "Assume the command is safe whenever the controller executes it correctly, regardless of stale sensing or an altered human workspace. Under the interlock dossier, direct comparison fails.",
              "v": "wrong",
              "fb": "Repeatability proves consistent motion, not safe motion or safe assumptions about the workspace."
            },
            {
              "t": "Keep the line moving under a temporary bypass and rely on operators to avoid the arm until the known motion fault is convenient to fix. Under the interlock dossier, warning is postponed.",
              "v": "danger",
              "fb": "A good incident history cannot replace an interlock designed for the first severe failure."
            }
          ]
        },
        {
          "q": "Which conclusion about autonomous motion is most defensible?",
          "o": [
            {
              "t": "The autonomy lesson is that field reliability is proved by surviving the environment and recovering from faults, not by repeating a laboratory demonstration. The interlock dossier keeps assumptions explicit in the dated record.",
              "v": "expert",
              "fb": "Correct: robotic safety joins sensing, control, physical limits, and independent protective barriers."
            },
            {
              "t": "Improved perception or control reduces risk enough that independent physical barriers can be treated as optional operational backups. Maintenance behavior stays uncertain. The human workspace is treated as a stable background condition.",
              "v": "partial",
              "fb": "Capability evidence is incomplete when maintenance, faults, and human presence are outside the test."
            },
            {
              "t": "A robot that repeats its program precisely has demonstrated safe judgment about every person, obstacle, and maintenance condition. The trajectory record resists that claim. Precision is treated as a substitute for independent safeguarding.",
              "v": "wrong",
              "fb": "Repeatability proves consistent motion, not safe motion or safe assumptions about the workspace."
            },
            {
              "t": "The machine is assumed to have been hacked or the worker alone caused the event, so altered safeguards need not be part of the finding. Past luck becomes the safety case. Under the interlock dossier, warning is postponed in the case file.",
              "v": "danger",
              "fb": "A good incident history cannot replace an interlock designed for the first severe failure."
            }
          ]
        }
      ]
    },
    "r_fuzzy": {
      "sci": "Lotfi Zadeh (1921-2017)",
      "topic": "Fuzzy logic & control",
      "lede": "Physical autonomy became an engineering problem through Lotfi Zadeh’s approach to fuzzy logic and control.",
      "no": 9,
      "profile": "Today’s autonomy briefing uses Lotfi Zadeh to explain fuzzy logic and control. Lotfi Zadeh introduced fuzzy sets in 1965, allowing membership and control rules to operate in degrees instead of only true-or-false categories. A robot converts uncertain sensing into physical motion. Between those endpoints lie state estimation, planning, control, mechanical limits, communications, and protective devices. Zadeh’s contribution shows how capability is built from that chain—and why a correct command can still produce an unsafe movement.\n\nThe operational method is to translate imprecise terms into membership functions, combine rule strengths, and convert the result into a control action. Engineers should specify the workspace, allowable contact, stopping distance, sensor uncertainty, controller update rate, and behavior after a missing or contradictory signal. Simulation is useful, but real tests must include occlusion, unexpected obstacles, maintenance modes, and faults in the protective system.\n\nIndustrial and autonomous robots are often discussed as if intelligence resides in the machine alone. In practice, safety is distributed across fences, interlocks, software limits, brakes, procedures, and the people who change configurations. Production pressure can preserve output while quietly erasing the separation between human and machine that the risk assessment assumed.\n\nThe engineering conclusion is fuzzy control can encode expert judgment clearly, but its rules and membership choices still require testing against real hazards. Reliable autonomy means controlling uncertainty and preserving independent barriers around physical action. A machine that repeats a task flawlessly can repeat a hazardous condition with the same precision. A maintenance mode should reduce energy and authority rather than merely change the label shown on a pendant.",
      "frame": "Points to the guard circuit. \"The robot obeyed a command; that does not make the cell safe. Show me fuzzy logic and control.\"",
      "q": [
        {
          "q": "Which robotics account best captures Lotfi Zadeh’s contribution to fuzzy logic and control?",
          "o": [
            {
              "t": "Lotfi Zadeh introduced fuzzy sets in 1965, allowing membership and control rules to operate in degrees instead of only true-or-false categories. The interlock dossier keeps assumptions explicit in the case file.",
              "v": "expert",
              "fb": "Correct: robotic safety joins sensing, control, physical limits, and independent protective barriers."
            },
            {
              "t": "Lotfi Zadeh contributed to fuzzy logic and control, yet the account measures task success without testing human presence, maintenance mode, or guard failure. The human workspace is treated as a stable background condition.",
              "v": "partial",
              "fb": "Capability evidence is incomplete when maintenance, faults, and human presence are outside the test."
            },
            {
              "t": "Lotfi Zadeh is described as proving safety through repeatable motion, even though the same precise path can enter an occupied workspace. The interlock dossier points to another result in the operational record.",
              "v": "wrong",
              "fb": "Repeatability proves consistent motion, not safe motion or safe assumptions about the workspace."
            },
            {
              "t": "Lotfi Zadeh is cited to justify bypassing the interlock because the production robot has completed many cycles without an injury. Inside the interlock dossier, drama displaces testing in the operational record.",
              "v": "danger",
              "fb": "A good incident history cannot replace an interlock designed for the first severe failure."
            }
          ]
        },
        {
          "q": "Which control-and-safety procedure best applies the profile?",
          "o": [
            {
              "t": "Inside the cell, follow this control practice: translate imprecise terms into membership functions, combine rule strengths, and convert the result into a control action in the dated record.",
              "v": "expert",
              "fb": "Correct: robotic safety joins sensing, control, physical limits, and independent protective barriers."
            },
            {
              "t": "Tune the robot for accurate production and test obstacles in simulation, but leave stopping distance and protective failure unmeasured. The human workspace is treated as a stable background condition.",
              "v": "partial",
              "fb": "Capability evidence is incomplete when maintenance, faults, and human presence are outside the test."
            },
            {
              "t": "Assume the command is safe whenever the controller executes it correctly, regardless of stale sensing or an altered human workspace. The trajectory record resists that claim in the case file.",
              "v": "wrong",
              "fb": "Repeatability proves consistent motion, not safe motion or safe assumptions about the workspace."
            },
            {
              "t": "Keep the line moving under a temporary bypass and rely on operators to avoid the arm until the known motion fault is convenient to fix. Past performance is treated as the safety case in the case file.",
              "v": "danger",
              "fb": "A good incident history cannot replace an interlock designed for the first severe failure."
            }
          ]
        },
        {
          "q": "Which conclusion about autonomous motion is most defensible?",
          "o": [
            {
              "t": "The autonomy lesson is that fuzzy control can encode expert judgment clearly, but its rules and membership choices still require testing against real hazards. The interlock dossier keeps assumptions explicit in the dated record.",
              "v": "expert",
              "fb": "Correct: robotic safety joins sensing, control, physical limits, and independent protective barriers."
            },
            {
              "t": "Improved perception or control reduces risk enough that independent physical barriers can be treated as optional operational backups. Maintenance behavior stays uncertain. The human workspace is treated as a stable background condition.",
              "v": "partial",
              "fb": "Capability evidence is incomplete when maintenance, faults, and human presence are outside the test."
            },
            {
              "t": "A robot that repeats its program precisely has demonstrated safe judgment about every person, obstacle, and maintenance condition. The trajectory record resists that claim. Precision is treated as a substitute for independent safeguarding.",
              "v": "wrong",
              "fb": "Repeatability proves consistent motion, not safe motion or safe assumptions about the workspace."
            },
            {
              "t": "The machine is assumed to have been hacked or the worker alone caused the event, so altered safeguards need not be part of the finding. Past luck becomes the safety case. Under the interlock dossier, warning is postponed in the case file.",
              "v": "danger",
              "fb": "A good incident history cannot replace an interlock designed for the first severe failure."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "technician": {
      "cell": "The Robot Technician stands at the robot cell & safety cage outside the taped reach envelope. \"Services the arm; the door interlock had been jumpered out to keep the line moving. The arm followed power, code, and a guard circuit somebody expected not to need.\"",
      "controls": "The Robot Technician stands at the robot control & interlock room outside the taped reach envelope. \"Services the arm; the door interlock had been jumpered out to keep the line moving. The arm followed power, code, and a guard circuit somebody expected not to need.\"",
      "office": "The Robot Technician stands at the automation manager's office outside the taped reach envelope. \"Services the arm; the door interlock had been jumpered out to keep the line moving. The arm followed power, code, and a guard circuit somebody expected not to need.\""
    },
    "controls2": {
      "cell": "The Controls Engineer stands at the robot cell & safety cage outside the taped reach envelope. \"Reads the logs; the arm had lunged unexpectedly before, and it was written up. The arm followed power, code, and a guard circuit somebody expected not to need.\"",
      "controls": "The Controls Engineer stands at the robot control & interlock room outside the taped reach envelope. \"Reads the logs; the arm had lunged unexpectedly before, and it was written up. The arm followed power, code, and a guard circuit somebody expected not to need.\"",
      "office": "The Controls Engineer stands at the automation manager's office outside the taped reach envelope. \"Reads the logs; the arm had lunged unexpectedly before, and it was written up. The arm followed power, code, and a guard circuit somebody expected not to need.\""
    },
    "clerk": {
      "cell": "The Clerk stands at the robot cell & safety cage outside the taped reach envelope. \"Keeps the incident file — and the order to bypass the guard 'temporarily'. The arm followed power, code, and a guard circuit somebody expected not to need.\"",
      "controls": "The Clerk stands at the robot control & interlock room outside the taped reach envelope. \"Keeps the incident file — and the order to bypass the guard 'temporarily'. The arm followed power, code, and a guard circuit somebody expected not to need.\"",
      "office": "The Clerk stands at the automation manager's office outside the taped reach envelope. \"Keeps the incident file — and the order to bypass the guard 'temporarily'. The arm followed power, code, and a guard circuit somebody expected not to need.\""
    }
  },
  "story": [
    "<b>The Cell-9 Robot</b> opens inside the Cell-9 robotics inquiry, where the public explanation has hardened faster than the evidence.",
    "<b>The Robot Technician</b>, <b>The Controls Engineer</b>, and <b>The Clerk</b> hold different parts of the record, and every conversation begins with one real figure whose work teaches you how to read it.",
    "The case keeps pulling investigators toward <b>The robot was hacked and turned deadly</b> or <b>Simple operator error — the worker stepped in</b>. Both are plausible enough to survive a headline; neither should survive the full dossier untested.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and decide the <b>WHAT</b> for yourself."
  ],
  "endings": {
    "overclaimWhat": "hack",
    "dismissalWhat": "operator",
    "win": {
      "expertTitle": "The Guard Circuit Speaks",
      "expert": [
        "Your finding assigns <b>A safety interlock bypassed and a known fault left unfixed</b> to <b>Guy Halloran — the plant automation manager</b> through the controlling record in <b>The Automation Manager's Office</b>. Not the robot was hacked and turned deadly. Not simple operator error — the worker stepped in.",
        "The jumper defeated the door interlock, and earlier logs documented the unexpected motion that management left unresolved. The robot did not need an outside attacker, and the technician’s entry did not erase the safety system that should have removed motion authority."
      ],
      "soundTitle": "The Cell Was Made Unsafe",
      "sound": [
        "Your accusation identifies <b>Guy Halloran — the plant automation manager</b> and <b>A safety interlock bypassed and a known fault left unfixed</b>; the decisive trail ends in <b>The Automation Manager's Office</b>. The bypass order and prior fault report support the finding.",
        "The exact sequence of the final lunge still needs simulation, but the cell’s independent human-protection barrier had already been knowingly defeated."
      ],
      "namedTitle": "The Bypassed Barrier",
      "named": [
        "You correctly choose <b>A safety interlock bypassed and a known fault left unfixed</b>, trace it to <b>The Automation Manager's Office</b>, and name <b>Guy Halloran — the plant automation manager</b>.",
        "The finding is spare, yet it points the safety board toward the jumper, log history, and authorization that explain why human entry remained hazardous."
      ]
    },
    "overclaim": {
      "title": "A Hacker Inside an Open Gate",
      "body": [
        "You accuse <b>The robot was hacked and turned deadly</b>, interpreting dangerous motion as proof that an outsider seized the controller.",
        "No intrusion trail supports the claim. The unsupported drama lets the documented bypass and known fault be recast as ordinary speculation about connected machinery."
      ]
    },
    "dismissal": {
      "title": "Operator Error as a Guard",
      "body": [
        "You accept <b>Simple operator error — the worker stepped in</b>, as though the worker’s presence relieved the cell of its duty to stop hazardous motion.",
        "That answer rewards a design that depended on perfect human behavior after its physical interlock was removed. The next maintenance entry remains governed by the same unsafe assumption."
      ]
    },
    "wrongNames": {
      "title": "The Fault Found, the Manager Missed",
      "body": [
        "You recognize <b>A safety interlock bypassed and a known fault left unfixed</b>, but attach the bypass to the maintenance crew or place the decisive approval outside the automation office. The written exception leads instead to"
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A robot arm crossing an opened safety gate\"><path d=\"M70 112 L70 34 L270 34 L270 112\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M270 34 L330 74\" stroke=\"#B3261E\" stroke-width=\"3\"/><circle cx=\"390\" cy=\"88\" r=\"18\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M390 70 L430 46 L470 68 L520 42\" fill=\"none\" stroke=\"#326891\" stroke-width=\"6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><circle cx=\"430\" cy=\"46\" r=\"7\" fill=\"#326891\"/><circle cx=\"470\" cy=\"68\" r=\"7\" fill=\"#326891\"/><path d=\"M520 42 L556 58\" stroke=\"#121212\" stroke-width=\"4\"/><path d=\"M556 58 L582 48 M556 58 L580 70\" stroke=\"#121212\" stroke-width=\"2\"/></svg>"
}};
