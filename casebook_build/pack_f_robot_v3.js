// Casebook V3 — three informants, three readings, one clue per correct answer.
module.exports = { PACK: {
  "schemaVersion": 3,
  "mode": "three_informants_three_readings",
  "id": "f_robot",
  "title": "The Cell-9 Robot",
  "discipline": "Robotics & Autonomous Systems",
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
  "DAYS_TOTAL": 3,
  "teaser": "A robot arm killed a technician inside a guarded maintenance cell. Did an outside intruder take control, did plant staff bypass a safety interlock for production, or did the worker enter a cell whose protections were functioning correctly?",
  "overclaimTag": "a remote robot takeover",
  "truthTag": "a stolen service account that changed the robot’s map",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"An industrial robot arm moving inside a guarded cell while a remote command enters the controller\"><rect x=\"55\" y=\"24\" width=\"350\" height=\"96\" fill=\"none\" stroke=\"#e2e2d8\" stroke-width=\"2\" stroke-dasharray=\"7 5\"/><circle cx=\"145\" cy=\"96\" r=\"22\" fill=\"none\" stroke=\"#121212\" stroke-width=\"3\"/><path d=\"M145 74 l55-34 46 30 54-24\" fill=\"none\" stroke=\"#121212\" stroke-width=\"8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><circle cx=\"200\" cy=\"40\" r=\"8\" fill=\"#326891\"/><circle cx=\"246\" cy=\"70\" r=\"8\" fill=\"#326891\"/><path d=\"M300 46 l25-8 -8 25\" fill=\"none\" stroke=\"#121212\" stroke-width=\"3\"/><rect x=\"470\" y=\"45\" width=\"120\" height=\"62\" rx=\"6\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><path d=\"M405 75 H470\" stroke=\"#B3261E\" stroke-width=\"4\"/><path d=\"M445 62 l15 13 -15 13\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"3\"/></svg>",
  "overclaimTease": "Unexpected motion is not enough to prove a hack. Follow the command provenance, state estimates, and safety-map changes until one control path explains all three.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "hacker",
      "items": [
        {
          "id": "automation",
          "label": "Guy Halloran — the plant automation manager"
        },
        {
          "id": "worker",
          "label": "The maintenance crew inside Cell 9"
        },
        {
          "id": "hacker",
          "label": "An outside intruder using a stolen service account"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "controls",
      "items": [
        {
          "id": "controls",
          "label": "The Robot Controller & Remote-Service Logs"
        },
        {
          "id": "cell",
          "label": "The Robot Cell & Safety Cage"
        },
        {
          "id": "office",
          "label": "The Automation Manager’s Office"
        }
      ]
    },
    "what": {
      "title": "What happened",
      "truth": "hack",
      "items": [
        {
          "id": "hack",
          "label": "A remote intruder altered the safety map and motion program"
        },
        {
          "id": "interlock",
          "label": "Plant staff bypassed a known interlock to maintain production"
        },
        {
          "id": "operator",
          "label": "The technician entered a correctly protected operating cell"
        }
      ]
    }
  },
  "READING_ORDER": [
    "technician",
    "controls2",
    "clerk"
  ],
  "CHARACTERS": {
    "technician": {
      "name": "The Robot Technician",
      "role": "Robotics maintenance technician",
      "face": "🤖",
      "badge": "R",
      "legend": "the guarded cell",
      "hint": "The crew entered under approved maintenance mode before an unknown remote session loaded a new job.",
      "reading": "r_firstrobot"
    },
    "controls2": {
      "name": "The Controls Engineer",
      "role": "Control-systems engineer",
      "face": "🎛",
      "badge": "E",
      "legend": "the controller trace",
      "hint": "Desired, estimated, and measured motion agree; the change began in commands, not sensors or mechanics.",
      "reading": "r_kalman"
    },
    "clerk": {
      "name": "The Security Records Clerk",
      "role": "Remote-access and safety-records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the service archive",
      "hint": "A stolen vendor account changed the exclusion map and launched the motion from outside the plant.",
      "reading": "r_motion"
    }
  },
  "TOPICS": {
    "r_firstrobot": {
      "sci": "George Devol (1912-2011)",
      "topic": "The first industrial robot and recorded control",
      "lede": "George Devol imagined a programmable machine that could repeat dangerous factory motions from stored instructions rather than human muscle.",
      "no": 1,
      "profile": "George Devol was an American inventor whose 1954 patent for a “Programmed Article Transfer” device became the foundation of the industrial robot. Devol combined a mechanical arm, hydraulic power, and a programmable memory that could store a sequence of positions and actions. With entrepreneur Joseph Engelberger, he developed the Unimate, first installed at a General Motors plant in 1961 to handle hot die-cast parts and other unpleasant, hazardous work.\n\nThe novelty was not simply an arm. Factories already used fixed automation. Devol’s machine could be taught a sequence, replay it, and be reassigned. That flexibility also created a new safety problem. A powerful arm may appear still while holding an executable program, and its next motion can begin faster than a nearby worker can react. Industrial cells therefore use guarded spaces, interlocks, teach modes, reduced-speed operation, and carefully controlled program changes.\n\nProgrammability leaves evidence. Controllers store job files, command histories, mode changes, timestamps, and sometimes checksums or signatures. A mechanical fault can cause a commanded move to be executed poorly; an altered program changes what the controller intended to do. Investigators must separate those layers by comparing the stored path, the issued command, and the measured motion.\n\nIn Cell 9, the arm did not merely drift or repeat an old maintenance cycle. The controller loaded a new motion block while the technician was inside the cage, then received a remote start through a service account. The gate interlock reported closed because its safety map had been changed in software, not because a maintainer jumpered the switch. Devol’s architecture makes the distinction precise: identify who changed the stored instructions, and the machine’s deadly movement stops looking like either spontaneous autonomy or a worker’s careless step.",
      "frame": "Pulls the active job file beside the archived production version. “A robot does not ‘decide’ to invent a new path. Someone changed the instructions it was built to repeat.”",
      "q": [
        {
          "q": "What made Devol’s industrial robot different from fixed factory automation?",
          "o": [
            {
              "t": "Stored instructions let the same machine replay and change programmed motion sequences.",
              "v": "expert",
              "fb": "Devol’s key advance was reprogrammable stored control, not independent intention."
            },
            {
              "t": "The arm understood spoken goals and planned factory work without any programming.",
              "v": "wrong",
              "fb": "Unimate followed taught instructions and did not understand open-ended spoken goals."
            },
            {
              "t": "A programmable robot can create any motion it wants once no supervisor watches the cell.",
              "v": "danger",
              "fb": "Programmability expands possible behavior without making the controller self-willed."
            },
            {
              "t": "Hydraulic power allowed the arm to lift heavier parts than most human workers.",
              "v": "partial",
              "fb": "Power mattered for industrial use, but programmability distinguished the machine concept."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — lead",
            "text": "The fatal path appears as a newly loaded program block rather than a mechanical deviation from the approved job."
          }
        },
        {
          "q": "Which evidence separates an altered program from a mechanical motion fault?",
          "o": [
            {
              "t": "A gearbox temperature alarm appears several minutes after the collision occurs.",
              "v": "wrong",
              "fb": "A later temperature alarm cannot explain the origin of the earlier command sequence."
            },
            {
              "t": "The commanded trajectory differs from the approved file before the arm begins moving.",
              "v": "expert",
              "fb": "A changed command establishes altered intent at the controller layer before mechanics execute it."
            },
            {
              "t": "Any unexpected motion should be treated as proof the robot was remotely controlled.",
              "v": "danger",
              "fb": "Unexpected behavior has many causes; command provenance is needed to prove takeover."
            },
            {
              "t": "The arm reaches a position slightly slower than its maintenance specification allows.",
              "v": "partial",
              "fb": "Timing variation may indicate wear but does not show that the intended path changed."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — lead",
            "text": "The approved path and the newly loaded block can be compared inside the robot-control and remote-service logs."
          }
        },
        {
          "q": "What first fact points away from maintenance-crew error and toward an outside actor?",
          "o": [
            {
              "t": "The victim had worked on the same robot during several earlier scheduled shutdowns.",
              "v": "wrong",
              "fb": "Prior work establishes familiarity, not responsibility for this new program."
            },
            {
              "t": "The worker’s presence inside the cage establishes acceptance of every movement risk.",
              "v": "danger",
              "fb": "Authorized entry does not waive safeguards or imply consent to unexpected powered motion."
            },
            {
              "t": "A remote session loads the new job after local staff enter protected maintenance mode.",
              "v": "expert",
              "fb": "The timing and origin of the remote change separate local maintenance from the outside command."
            },
            {
              "t": "The technician carries tools that could physically reach the gate-switch hardware.",
              "v": "partial",
              "fb": "Physical access creates opportunity but does not match the recorded software intervention."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — lead",
            "text": "The service account entered from an external address after the crew had locked the cell and begun the approved inspection."
          }
        }
      ]
    },
    "r_kalman": {
      "sci": "Rudolf Kálmán (1930-2016)",
      "topic": "State estimation and traceable sensor fusion",
      "lede": "Rudolf Kálmán created a filter that continually compares a system’s predicted state with new measurements and preserves the corrections.",
      "no": 2,
      "profile": "Rudolf E. Kálmán was a Hungarian-American electrical engineer and mathematician whose 1960 work on recursive estimation became central to navigation, control, robotics, and signal processing. A control system rarely observes its true state directly. Sensors are noisy, some variables are hidden, and motion unfolds between measurements. The Kalman filter predicts the next state from a mathematical model, compares that prediction with a new measurement, and weights the correction according to uncertainty.\n\nThe method is recursive: it updates a compact state estimate rather than reprocessing the entire history. During the Apollo program, related estimation techniques helped navigation computers combine inertial measurements and tracking data. Modern robots use Kalman-family filters to estimate joint motion, vehicle position, target location, and equipment condition from imperfect streams.\n\nEstimation also supplies a forensic discipline. Investigators should distinguish the controller’s desired state, the estimator’s believed state, and the physical system’s measured state. If all three align during an unexpected movement, a random sensor hallucination is less plausible. If the desired path changes first and sensors accurately report the arm following it, the anomaly entered through commands. Conversely, a sensor fault may show implausible innovations—large differences between prediction and measurement—without a corresponding program change.\n\nCell 9’s logs contain that layered sequence. Joint encoders, current sensors, and the state estimator agreed that the arm followed the newly loaded path. No sudden localization jump preceded the motion. The safety-zone representation changed during the same authenticated remote session that inserted the job block. Kálmán’s framework therefore rules out a robot confused about where it was. The machine knew its state and executed a coherent command. The remaining question is whose credentials and network route supplied that command, evidence preserved in the control room rather than on the victim’s tools.",
      "frame": "Plots desired joint angles, estimated state, and encoder measurements on one screen. “Three traces agree. The robot was not lost; it was told to go there.”",
      "q": [
        {
          "q": "What does a Kalman filter do when new sensor data arrive?",
          "o": [
            {
              "t": "It removes all noise and reconstructs the exact physical state without uncertainty.",
              "v": "wrong",
              "fb": "State estimation reduces uncertainty but never makes observation exact."
            },
            {
              "t": "It labels any surprising measurement as an attack and discards it automatically.",
              "v": "danger",
              "fb": "An innovation is evidence to evaluate, not automatic proof of malicious control."
            },
            {
              "t": "It averages every sensor equally so no single instrument can dominate the result.",
              "v": "partial",
              "fb": "Equal averaging ignores differences in sensor quality and predicted uncertainty."
            },
            {
              "t": "It combines prediction and measurement according to their estimated uncertainties.",
              "v": "expert",
              "fb": "The filter weights model and measurement rather than trusting either one absolutely."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — corroboration",
            "text": "Predicted, estimated, and measured joint states remain consistent while the commanded path itself changes."
          }
        },
        {
          "q": "Which trace pattern would indicate a command change rather than sensor confusion?",
          "o": [
            {
              "t": "The desired path changes while estimated and measured motion agree with it.",
              "v": "expert",
              "fb": "Agreement in following a changed command locates the anomaly at the command layer."
            },
            {
              "t": "One encoder briefly disagrees with the other sensors before returning to normal.",
              "v": "partial",
              "fb": "A brief sensor disagreement points toward measurement quality, not necessarily new intent."
            },
            {
              "t": "The estimator shows a large residual while the controller requests no movement.",
              "v": "wrong",
              "fb": "A residual without a command change is more consistent with sensing or modeling error."
            },
            {
              "t": "Every measurement remains constant, so investigators infer an invisible motion occurred.",
              "v": "danger",
              "fb": "Constant measurements provide no basis for claiming an unobserved physical movement."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — corroboration",
            "text": "Control-room logs show the desired trajectory changed first, followed normally by estimator and encoder response."
          }
        },
        {
          "q": "What evidence ties the altered safety map to the same actor as the fatal motion?",
          "o": [
            {
              "t": "Both files were stored on equipment supplied by the robot manufacturer.",
              "v": "partial",
              "fb": "Common hardware ownership does not identify who made the changes."
            },
            {
              "t": "The same authenticated session edits both files and launches the new sequence.",
              "v": "expert",
              "fb": "Shared session provenance joins the barrier removal and motion command to one operator."
            },
            {
              "t": "The technician had previously requested a safer maintenance-zone layout.",
              "v": "wrong",
              "fb": "A safety request points away from creating the dangerous configuration."
            },
            {
              "t": "Anyone who knew the cell dimensions could have changed the software anonymously.",
              "v": "danger",
              "fb": "Knowledge creates possibility, while authentication and timing identify the actual session."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — corroboration",
            "text": "One remote session changed both the protected-zone file and the executable job before issuing start."
          }
        }
      ]
    },
    "r_motion": {
      "sci": "Oussama Khatib (b. 1950)",
      "topic": "Robot motion and obstacle avoidance",
      "lede": "Oussama Khatib taught robots to treat nearby obstacles as forces that reshape motion before contact occurs.",
      "no": 3,
      "profile": "Oussama Khatib is a roboticist known for influential work on motion control, manipulation, and human-robot interaction. In the 1980s he developed the artificial potential field approach to real-time obstacle avoidance. A goal can be represented as an attractive potential and obstacles as repulsive potentials. The robot follows the resulting gradient, continually adjusting its path as geometry changes. The method has limitations, including local minima, but it helped move collision avoidance from offline path planning into responsive control.\n\nKhatib also developed operational-space control, which expresses robot tasks in terms of end-effector position, force, and motion rather than only joint coordinates. These ideas support robots that manipulate objects, share spaces, and react to contact while respecting physical constraints. Safety depends on accurate models of the environment and on trusted boundaries defining where people may be.\n\nA safety zone is therefore not decorative metadata. It changes which trajectories are considered permissible. If an authenticated update erases a protected volume, a planner may generate a mathematically smooth path straight through a person’s workspace. The resulting movement can look technically perfect: no joint fault, no unstable controller, no unexpected obstacle according to the altered map.\n\nThat is what the final Cell 9 evidence shows. The technician’s presence was visible to a separate cage sensor, but the remote session removed the corresponding exclusion volume from the robot controller. The new path passed through that space and was executed at production speed. Network records then trace the service credential to an external contractor account reused from a breached vendor portal. Khatib’s lesson prevents a misleading conclusion that the worker simply stepped into an unknowable machine path. The path was made legal inside the controller by someone who changed the environment the robot was allowed to believe.",
      "frame": "Overlays the original and altered exclusion volumes on the arm’s path. “The motion was smooth because the map had been made dangerous. Find who redrew the world.”",
      "q": [
        {
          "q": "How do artificial potential fields guide a robot around obstacles?",
          "o": [
            {
              "t": "Every obstacle is converted into a fixed joint-angle limit before operation begins.",
              "v": "partial",
              "fb": "Joint limits matter, but they are not the same as representing workspace obstacles."
            },
            {
              "t": "The arm waits for physical contact and then calculates where the obstacle was.",
              "v": "wrong",
              "fb": "Reactive contact may reduce harm but does not provide pre-contact avoidance."
            },
            {
              "t": "Goals attract the path while modeled obstacles repel it during motion planning.",
              "v": "expert",
              "fb": "Potential fields reshape the planned path using goal attraction and obstacle repulsion."
            },
            {
              "t": "The planner ignores mapped obstacles whenever the shortest path reaches the goal faster.",
              "v": "danger",
              "fb": "Discarding obstacles for speed would invert the safety purpose of the planner."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — decisive",
            "text": "The original and altered protected-zone maps, motion plan, and remote edits all survive in the control system."
          }
        },
        {
          "q": "What happens if a valid safety exclusion volume is removed from the robot’s map?",
          "o": [
            {
              "t": "The arm stops by default because missing map data are treated as occupied space.",
              "v": "partial",
              "fb": "Some systems default safely, but this controller treated the deleted zone as free space."
            },
            {
              "t": "The graphical display changes while executable motion remains unaffected by maps.",
              "v": "wrong",
              "fb": "The safety map directly constrains which trajectories the controller may execute."
            },
            {
              "t": "The worker becomes responsible because software no longer recognizes the protected area.",
              "v": "danger",
              "fb": "A removed safeguard does not transfer responsibility to the person it was meant to protect."
            },
            {
              "t": "The planner may generate a smooth trajectory through space that should remain protected.",
              "v": "expert",
              "fb": "Planning is only as safe as the environment and constraints represented to it."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — decisive",
            "text": "A remote edit made the victim’s maintenance space permissible, after which the controller planned and executed a coherent lethal path."
          }
        },
        {
          "q": "Which chain most directly identifies the external attacker?",
          "o": [
            {
              "t": "Vendor-portal compromise links the service credential, network route, edits, and start.",
              "v": "expert",
              "fb": "The end-to-end digital provenance ties the external account to the dangerous actions."
            },
            {
              "t": "The robot manufacturer is responsible automatically because it designed the controller.",
              "v": "danger",
              "fb": "Design responsibility and authorship of a specific intrusion are different questions."
            },
            {
              "t": "The automation manager approved the vendor’s ordinary remote-maintenance contract.",
              "v": "partial",
              "fb": "Contract approval enabled access but does not identify the attacker who abused it."
            },
            {
              "t": "The technician’s badge opened the cage shortly before the remote session began.",
              "v": "wrong",
              "fb": "Badge access explains lawful entry, not the later remote software changes."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — decisive",
            "text": "A breached vendor account, matching network address, file edits, and launch command form one continuous remote session."
          }
        }
      ]
    }
  },
  "story": [
    "<b>A robot arm accelerated through a technician inside a cell that had been placed in maintenance mode.</b>",
    "The Robot Technician holds the approved job files. The Controls Engineer can separate command from sensor error. The security clerk has the remote-service and account history.",
    "The arm may have been seized from outside, locally stripped of its interlock, or encountered a worker who entered a correctly protected cell.",
    "Nine clues reconstruct who changed the robot’s internal map, where the command entered, and why the motion looked mechanically normal."
  ],
  "endings": {
    "overclaimWhat": "interlock",
    "dismissalWhat": "operator",
    "win": {
      "expertTitle": "The Remote Path Into Cell 9",
      "expert": [
        "You connect the outside intruder, the Robot Controller & Remote-Service Logs, and a takeover that altered both the safety map and motion program. Command, state, network, and account records form one continuous session.",
        "Plant management did not jumper the gate for production, and the technician did not enter an actively protected cell carelessly. A stolen vendor credential made the protected space appear free and then started the robot."
      ],
      "soundTitle": "The Stolen Service Session",
      "sound": [
        "Your accusation identifies the intruder, the controller logs, and the altered map and job file.",
        "Some account or motion details remain incomplete, but the remote provenance supports the verdict."
      ],
      "namedTitle": "Correct Intrusion, Limited Trace",
      "named": [
        "You select the correct WHO, WHERE, and WHAT.",
        "The call is right, although missed clues leave parts of the credential compromise or controller sequence underdeveloped."
      ]
    },
    "overclaim": {
      "title": "No Local Interlock Jumper Caused This Motion",
      "body": [
        "The physical gate circuit remained in maintenance state, while the controller’s software exclusion map was changed remotely.",
        "A familiar safety-bypass story misses the authenticated outside session that created and launched the path."
      ]
    },
    "dismissal": {
      "title": "The Technician Entered Under Approved Maintenance Mode",
      "body": [
        "Badge, lockout, and work records show authorized entry before the remote changes began.",
        "The victim’s presence does not explain why the controller erased the protected zone and issued production-speed motion."
      ]
    },
    "wrongNames": {
      "title": "The Takeover, Mislocated",
      "body": [
        "You recognize malicious control but assign it away from the outside account and controller records that preserve the complete intrusion path."
      ]
    }
  }
}
};
