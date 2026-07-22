// Casebook V3 — three informants, three readings, one clue per correct answer.
module.exports = { PACK: {
  "schemaVersion": 3,
  "mode": "three_informants_three_readings",
  "id": "m_adas",
  "title": "The Autopilot on Vane Street",
  "discipline": "Vehicle Automation & Safety",
  "venue": "the Vane Street autonomy inquiry",
  "agent": {
    "name": "Investigator Dana Okafor",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Vehicle-Automation Pioneers",
  "dossierName": "VEHICLE-AUTOMATION & SAFETY PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Vane Street autonomy inquiry",
  "DAYS_TOTAL": 3,
  "teaser": "An automated car struck a pedestrian at night while its backup driver did not respond. Was it remotely hijacked, did one unforeseeable software upset occur, or did a known sensing limitation meet a safeguard the program had chosen to disable?",
  "overclaimTag": "a remote vehicle hijack",
  "truthTag": "a known sensing gap without its human backstop",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"An automated car approaching a pedestrian while sensors and driver monitor are disabled\"><path d=\"M20 112 H640\" stroke=\"#121212\" stroke-width=\"3\"/><path d=\"M95 86 h160 l35 26 H75z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><circle cx=\"115\" cy=\"114\" r=\"13\" fill=\"none\" stroke=\"#121212\" stroke-width=\"3\"/><circle cx=\"245\" cy=\"114\" r=\"13\" fill=\"none\" stroke=\"#121212\" stroke-width=\"3\"/><path d=\"M300 76 q70-50 150 0\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/><circle cx=\"480\" cy=\"61\" r=\"8\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><path d=\"M480 69 v26 M480 76 l-13 13 M480 76 l13 13 M480 95 l-12 18 M480 95 l13 18\" stroke=\"#121212\" stroke-width=\"2\"/><rect x=\"540\" y=\"34\" width=\"70\" height=\"45\" rx=\"5\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><path d=\"M550 44 l50 25 M600 44 l-50 25\" stroke=\"#B3261E\" stroke-width=\"3\"/></svg>",
  "overclaimTease": "Separate the machine’s perception from the system meant to supervise it. A crash can arise from one unlikely fault—or from two known protections allowed to fail together.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "ad_maker",
      "items": [
        {
          "id": "ad_driver",
          "label": "The backup safety driver"
        },
        {
          "id": "ad_maker",
          "label": "Sloane Pace — the autonomous-program lead"
        },
        {
          "id": "ad_regulator",
          "label": "The transport-safety regulator"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "ad_office",
      "items": [
        {
          "id": "ad_vehicle",
          "label": "The Vehicle & Its Sensors"
        },
        {
          "id": "ad_datacenter",
          "label": "The Telemetry & Perception Logs"
        },
        {
          "id": "ad_office",
          "label": "The Program Development Office"
        }
      ]
    },
    "what": {
      "title": "What happened",
      "truth": "ad_sensorsafeguard",
      "items": [
        {
          "id": "ad_hack",
          "label": "A remote attacker redirected the automated vehicle"
        },
        {
          "id": "ad_sensorsafeguard",
          "label": "A known night-sensing gap met a disabled driver safeguard"
        },
        {
          "id": "ad_glitch",
          "label": "A unique software upset escaped otherwise intact protections"
        }
      ]
    }
  },
  "READING_ORDER": [
    "ad_tech",
    "ad_analyst",
    "ad_clerk"
  ],
  "CHARACTERS": {
    "ad_tech": {
      "name": "Field Tech Ravi Sen",
      "role": "Vehicle field technician",
      "face": "🔧",
      "badge": "R",
      "legend": "the sensor rig",
      "hint": "Night tests repeatedly showed unstable pedestrian detections before the fatal run.",
      "reading": "ad_nader"
    },
    "ad_analyst": {
      "name": "The Perception Analyst",
      "role": "Perception and telemetry analyst",
      "face": "📈",
      "badge": "P",
      "legend": "the evaluation console",
      "hint": "Object classifications changed several times while the disabled attention monitor recorded no effective takeover.",
      "reading": "ad_haddon"
    },
    "ad_clerk": {
      "name": "The Program Records Clerk",
      "role": "Safety-release records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the development file",
      "hint": "The release waiver tied the known sensing ticket to a decision reducing backup-driver monitoring.",
      "reading": "ad_bohlin"
    }
  },
  "TOPICS": {
    "ad_nader": {
      "sci": "Ralph Nader (b. 1934)",
      "topic": "Automobile safety & crashworthiness",
      "lede": "The lawyer who made a nation stop blaming the driver and start reading the blueprints.",
      "no": 1,
      "profile": "Ralph Nader is the American lawyer and consumer advocate whose 1965 book 'Unsafe at Any Speed' forced a nation to see the car crash as a design problem, not merely a driver problem. Its opening chapter dissected the handling of the Chevrolet Corvair, but its larger argument was broader: the industry had spent decades blaming 'the nut behind the wheel' while refusing to engineer cars that protected people when crashes inevitably happened. Nader marshaled evidence that manufacturers already knew how to make vehicles safer and had chosen not to.\n\nThe book's impact was immediate. It helped drive passage of the National Traffic and Motor Vehicle Safety Act of 1966, which for the first time let the federal government set binding safety standards and created the agency that became the National Highway Traffic Safety Administration. Nader popularized 'crashworthiness' — the idea of the 'second collision,' in which an occupant strikes the interior after the car strikes something — and argued that padded surfaces, collapsible columns, and belts should be designed in, not left to chance or to the buyer.\n\nHis deeper contribution was a way of thinking. A crash, Nader insisted, is a foreseeable event with foreseeable causes, and calling it an 'accident' too often excuses the people who could have prevented it.\n\nFor this inquiry, that lesson cuts against both easy answers. When an automated car kills someone, the sensational story reaches for an outside villain — a hijacker — and the comfortable story reaches for bad luck, a freak glitch. Nader would ask a colder question: what did the makers know they should build, and what did they leave out? The answer to that question is where responsibility, and the truth, actually live.",
      "frame": "Sen wipes grease from a bracket. \"Folks love to call a crash bad luck, or pin it on whoever was behind the wheel. Ralph Nader never bought that, and neither do I. Show me you know what he actually changed.\"",
      "q": [
        {
          "q": "What was the central argument of 'Unsafe at Any Speed'?",
          "o": [
            {
              "t": "Faster engines are safer, since raw speed was not the hazard under review.",
              "v": "wrong",
              "fb": "He never argued speed was harmless; he argued cars must be crashworthy."
            },
            {
              "t": "Cars should be built to protect occupants, not merely to blame drivers.",
              "v": "expert",
              "fb": "Nader shifted the focus from the driver to the safety built into the car."
            },
            {
              "t": "Bad drivers cause almost every crash, so vehicle design barely matters.",
              "v": "danger",
              "fb": "That 'nut behind the wheel' excuse is exactly what Nader dismantled."
            },
            {
              "t": "The Corvair was the unsafe model, so fixing it resolved the broader problem.",
              "v": "partial",
              "fb": "The Corvair opened the book, but his case was against the whole industry."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — lead",
            "text": "The perception stack had repeatedly missed dark-clothed pedestrians at night, so the crash followed a known design exposure rather than a single inexplicable bit flip."
          }
        },
        {
          "q": "What does 'crashworthiness' and the second collision mean?",
          "o": [
            {
              "t": "Building the car so rigid that deformation is eliminated during a collision.",
              "v": "wrong",
              "fb": "Crashworthiness manages the occupant's impact, not just body stiffness."
            },
            {
              "t": "Trusting a careful driver to simply avoid every crash before it starts.",
              "v": "danger",
              "fb": "Avoidance helps, but the point was to survive the crashes that happen."
            },
            {
              "t": "Designing a car so occupants survive striking the interior in a crash.",
              "v": "expert",
              "fb": "The 'second collision' is the occupant hitting the interior; design for it."
            },
            {
              "t": "Adding a single belt and treating the rest of the cabin as good enough.",
              "v": "partial",
              "fb": "Belts matter, but crashworthiness spans the whole occupant environment."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — lead",
            "text": "The release decision that accepted the blind spot and reduced the backup-driver alert came from the program lead’s signed safety review."
          }
        },
        {
          "q": "Why does Nader's thinking matter to this inquiry?",
          "o": [
            {
              "t": "A modern automated crash means an outsider seized control of the car.",
              "v": "danger",
              "fb": "That leaps to a hijacker; Nader would look first at the car's own design."
            },
            {
              "t": "Blame the regulator, since the maker bears no fault for a compliant vehicle.",
              "v": "partial",
              "fb": "Regulators share blame, but the maker's design choices come first here."
            },
            {
              "t": "Label it a freak accident and the file closes with nobody responsible.",
              "v": "wrong",
              "fb": "'Freak accident' is the very excuse Nader spent his career refuting."
            },
            {
              "t": "Treat the crash as foreseeable and ask what the makers left out or hid.",
              "v": "expert",
              "fb": "Nader's frame points straight at design choices and what was concealed."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — lead",
            "text": "The first combined record of sensor misses and monitor changes appears in the program development file, not in evidence of remote access to the vehicle."
          }
        }
      ]
    },
    "ad_haddon": {
      "sci": "William Haddon Jr. (1926-1985)",
      "topic": "The epidemiology of crashes & the Haddon matrix",
      "lede": "The physician who treated the car crash as a disease — with a cause, a course, and a cure.",
      "no": 2,
      "profile": "William Haddon Jr. was an American physician and epidemiologist who became the first head of the federal agency now known as NHTSA in 1966. His radical move was to treat traffic injury as a public-health problem, subject to the same rigorous analysis as an epidemic. In this view the 'agent' of injury is energy — mechanical energy transferred to the body in a crash — and the task is to control that energy's release just as one would control a pathogen.\n\nHaddon built a framework, now called the Haddon Matrix, that organizes a crash into three phases — pre-crash, crash, and post-crash — crossed with three sets of factors: the human, the vehicle, and the physical and social environment. Each cell suggests places to intervene. Better hazard detection acts in the pre-crash phase; crumple zones and belts act in the crash phase; fast rescue and trauma care act in the post-crash phase. He also cataloged ten general strategies for injury control, from preventing the hazard's creation to strengthening the potential victim.\n\nThe power of the matrix is that it refuses single-cause thinking. A crash is never just a careless driver or just fate; it is a set of factors, many of them engineerable, interacting across time.\n\nFor this inquiry, Haddon is a compass. Faced with a fatal automated-vehicle crash, he would fill in the grid: what could the machine have sensed and done before impact; what protected the victim during it; what factors in the vehicle and its makers set the stage? That method exposes the trap answers for what they are. 'Hijack' fixates on one lurid human agent; 'freak glitch' pretends no factor was controllable. The matrix shows the controllable factors plainly.",
      "frame": "The analyst sketches a three-by-three grid. \"Haddon wouldn't let anyone blame the driver or fate before filling in every box. Show me you can think in his matrix, and I'll walk you through the logs.\"",
      "q": [
        {
          "q": "What was Haddon's central reframing of traffic injury?",
          "o": [
            {
              "t": "As a public-health problem in which energy is the controllable agent of harm.",
              "v": "expert",
              "fb": "Haddon treated crash injury like a disease, with energy as the agent."
            },
            {
              "t": "As purely a vehicle problem, with the human and environment left out of it.",
              "v": "partial",
              "fb": "His matrix included human and environment factors, not the vehicle alone."
            },
            {
              "t": "As random misfortune that no method could study, predict, or hope to reduce.",
              "v": "wrong",
              "fb": "His whole point was that injury is patterned and preventable, not random."
            },
            {
              "t": "As a moral failing of reckless drivers that stiffer penalties could cure.",
              "v": "danger",
              "fb": "He rejected blaming the driver alone for a systemic, engineerable problem."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — corroboration",
            "text": "The Haddon-style matrix of vehicle, human, and environment countermeasures was completed in the development office and shows the driver-monitor barrier removed before deployment."
          }
        },
        {
          "q": "What does the Haddon Matrix organize?",
          "o": [
            {
              "t": "A list of vehicle parts to inspect, with people and setting left off the grid.",
              "v": "partial",
              "fb": "Parts are one cell; the grid also covers human and environmental factors."
            },
            {
              "t": "Pre-crash, crash, and post-crash phases against human, vehicle, environment.",
              "v": "expert",
              "fb": "Three phases crossed with three factor sets map every point to intervene."
            },
            {
              "t": "The seconds of impact, since events before and after it fall outside prevention.",
              "v": "wrong",
              "fb": "The matrix spans before and after the crash, not just the impact instant."
            },
            {
              "t": "A ranking of drivers by blame so the guiltiest can be prosecuted the hardest.",
              "v": "danger",
              "fb": "It is an analysis of factors to fix, not a tool for assigning driver blame."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — corroboration",
            "text": "Night visibility, unstable classification, late braking, and an inattentive backup driver formed a linked barrier failure rather than one random software event."
          }
        },
        {
          "q": "How does the matrix expose the two trap answers here?",
          "o": [
            {
              "t": "It points at post-crash rescue while leaving the sensors outside the picture.",
              "v": "partial",
              "fb": "Rescue is one column; the pre-crash sensing factors are central here."
            },
            {
              "t": "It confirms nothing was controllable, so the death was pure random misfortune.",
              "v": "wrong",
              "fb": "The matrix is built to reveal the controllable factors, not excuse them."
            },
            {
              "t": "It shows controllable factors the makers could have addressed before impact.",
              "v": "expert",
              "fb": "The grid surfaces exactly the design factors both traps ignore."
            },
            {
              "t": "It identifies a single hostile agent, since a person appears in the grid.",
              "v": "danger",
              "fb": "The grid holds vehicle and environment factors too, not just a lone attacker."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — corroboration",
            "text": "The same program authority approved both continued night testing and a quieter attention alarm despite the documented interaction risk."
          }
        }
      ]
    },
    "ad_bohlin": {
      "sci": "Nils Bohlin (1920-2002)",
      "topic": "The three-point seatbelt",
      "lede": "The engineer who designed the belt that has saved more than a million lives — then let the world copy it for free.",
      "no": 3,
      "profile": "Nils Bohlin was a Swedish engineer who, in 1959, designed the modern three-point seatbelt while working at Volvo. He came to cars from aviation: he had developed ejection seats at Saab, so he understood restraint under violent forces. The belts of the day were two-point lap belts that held the pelvis but let the upper body jackknife forward, sometimes causing severe internal injuries. Bohlin's insight was a belt that secured both the chest and the pelvis with a single buckle a driver could fasten one-handed, spreading crash forces across the strong bones of the shoulder and hips.\n\nThe design was elegant and, crucially, practical enough that people would actually wear it. Volvo made the three-point belt standard in 1959 and then did something rare: it left the patent open, allowing every other manufacturer to adopt the design freely because the safety benefit mattered more than the licensing revenue. The belt is now regarded as one of the most effective safety devices ever invented, credited with saving more than a million lives.\n\nBohlin's lesson is deceptively simple: a safety device only works when it is present, correct, and actually in use. A belt in the glovebox saves no one.\n\nFor this inquiry, that principle is sharp. Automated vehicles carry safeguards too — automatic braking, driver-attention monitors, watchdogs that catch the machine's blind spots. Like a belt, each is worthless if it is switched off, unbuckled, or quietly disabled. When the sensational story shouts 'hijack' and the lazy story shrugs 'glitch,' Bohlin would ask the plainer question: which protection was supposed to catch this, and was it actually engaged?",
      "frame": "Sen holds up a frayed belt webbing. \"A safety part only counts when it's switched on and doing its job. Nils Bohlin proved that with a buckle. Convince me you understand why that matters here.\"",
      "q": [
        {
          "q": "What made Bohlin's three-point belt better than earlier belts?",
          "o": [
            {
              "t": "It replaced the need for any structural crumple zone at the front of the car.",
              "v": "wrong",
              "fb": "Belts complement crumple zones; they do not replace crash structure."
            },
            {
              "t": "It let the upper body swing freely so the ribs absorbed the whole impact.",
              "v": "danger",
              "fb": "That describes the old lap belt's flaw, which Bohlin's design fixed."
            },
            {
              "t": "It held the driver so rigidly that body movement was eliminated in a crash.",
              "v": "partial",
              "fb": "It manages motion and force; it does not freeze the body in place."
            },
            {
              "t": "It restrained chest and pelvis together, spreading force onto strong bones.",
              "v": "expert",
              "fb": "The three-point belt loads the shoulder and hips, sparing soft organs."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — decisive",
            "text": "One release credential waived the attention-monitor requirement even though field staff had requested it remain active during night operation."
          }
        },
        {
          "q": "Why is it notable that Volvo left the belt patent open?",
          "o": [
            {
              "t": "The safety benefit was judged to matter more than the licensing revenue.",
              "v": "expert",
              "fb": "Volvo shared the design so every maker's cars could be safer."
            },
            {
              "t": "It hid the belt's flaws so competitors would take the blame for failures.",
              "v": "danger",
              "fb": "There was no cover-up; the belt was shared precisely because it worked."
            },
            {
              "t": "It was a marketing stunt with no real effect on other manufacturers.",
              "v": "partial",
              "fb": "It was more than a stunt; open sharing spread a proven lifesaver."
            },
            {
              "t": "The patent was worthless because no rival ever wanted the design anyway.",
              "v": "wrong",
              "fb": "Rivals adopted it widely; the choice was deliberate generosity."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — decisive",
            "text": "Release notes, safety waivers, and the unresolved perception ticket converge in the signed development file."
          }
        },
        {
          "q": "How does Bohlin's principle apply to this inquiry?",
          "o": [
            {
              "t": "A missing safeguard indicates an outsider hacked in and turned it off remotely.",
              "v": "danger",
              "fb": "A safeguard can be disabled from inside; that need not mean a hijacker."
            },
            {
              "t": "A safeguard saves no one unless it is present, correct, and switched on.",
              "v": "expert",
              "fb": "Ask which protection should have caught this, and whether it was engaged."
            },
            {
              "t": "The belt is what matters, while electronic safeguards are decorative extras.",
              "v": "partial",
              "fb": "Electronic safeguards are as real as belts; both must be active to help."
            },
            {
              "t": "Safeguards are fully reliable in practice, so this crash reduces to bad luck.",
              "v": "wrong",
              "fb": "Safeguards fail constantly when disabled; that is not mere bad luck."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — decisive",
            "text": "A known sensing weakness reached a pedestrian while the independent human-backup safeguard had been deliberately disabled."
          }
        }
      ]
    }
  },
  "story": [
    "<b>An automated test vehicle struck a pedestrian at night while its backup driver failed to intervene.</b>",
    "Field Tech Ravi Sen holds the earlier sensor misses. The Perception Analyst can align classifications and braking. The records clerk has the release and driver-monitoring decisions.",
    "The crash may have come from remote hijacking, a unique software upset, or a known sensing weakness operating without its intended human backstop.",
    "Nine clues connect the vehicle behavior to the design decision that allowed that combination onto public streets."
  ],
  "endings": {
    "overclaimWhat": "ad_hack",
    "dismissalWhat": "ad_glitch",
    "win": {
      "expertTitle": "The Safeguard Removed Before the Crash",
      "expert": [
        "You connect Sloane Pace, the Program Development Office, and a known night-sensing gap combined with a disabled driver-monitoring safeguard. The sensor uncertainty, release waiver, and attention record form one causal chain.",
        "No remote command entered the vehicle, and the behavior was not a unique random upset. The program shipped a known exposure after weakening the independent human backstop intended to catch it."
      ],
      "soundTitle": "The Known Gap and Missing Backstop",
      "sound": [
        "Your accusation identifies the program lead, the development record, and the interacting sensor and monitoring failures.",
        "Some telemetry or review details remain incomplete, but the release history supports the finding."
      ],
      "namedTitle": "Correct System, Thin Support",
      "named": [
        "You select the correct WHO, WHERE, and WHAT.",
        "The verdict is right, although missed clues leave the interaction among perception, driver attention, and release authority less fully established."
      ]
    },
    "overclaim": {
      "title": "No Remote Control Path Appears",
      "body": [
        "Authentication and network records show no external steering or command session during the event.",
        "The vehicle followed its own perception and control stack while a known backup safeguard remained disabled."
      ]
    },
    "dismissal": {
      "title": "The Failure Was Reproducible Before Launch",
      "body": [
        "Earlier night tests produced the same unstable classifications, and the attention-monitor change was documented before deployment.",
        "That pattern cannot be reduced to a unique, unforeseeable software upset."
      ]
    },
    "wrongNames": {
      "title": "The Safety Failure, Misassigned",
      "body": [
        "You recognize the combined sensing and monitoring failure but place it away from the release authority and development record that joined those risks."
      ]
    }
  }
}
};
