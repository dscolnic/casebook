module.exports = { PACK: {
  "id": "m_adas",
  "title": "The Autopilot on Vane Street",
  "discipline": "Vehicle Automation & Safety",
  "teaser": "A self-driving car ran down a pedestrian at night, its autopilot engaged. Was the car hacked and hijacked? A one-in-a-million glitch? Or a safeguard someone switched off?",
  "overclaimTag": "a hack or remote hijack",
  "truthTag": "a sensor blind spot and a disabled driver-monitor",
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
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before the inquiry closes. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The place you test determines the dossier you receive, and the conversation costs one day.",
  "overclaimTease": "And beware the answer the cameras want: the evidence points not to a hijacker at the wheel, but to something quieter — and far harder to admit.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "ad_maker",
      "items": [
        {
          "id": "ad_maker",
          "label": "Sloane Pace — self-driving program lead"
        },
        {
          "id": "ad_driver",
          "label": "The backup safety driver"
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
          "label": "The Program's Development Office"
        }
      ]
    },
    "what": {
      "title": "What is happening",
      "truth": "ad_sensorsafeguard",
      "items": [
        {
          "id": "ad_hack",
          "label": "A hack or remote hijack of the car"
        },
        {
          "id": "ad_glitch",
          "label": "A freak one-off software glitch — bad luck"
        },
        {
          "id": "ad_sensorsafeguard",
          "label": "A sensor blind spot met by a disabled driver-monitoring safeguard"
        }
      ]
    }
  },
  "PLACES": {
    "ad_vehicle": {
      "name": "The Vehicle & Its Sensors",
      "xy": [
        140,
        90
      ]
    },
    "ad_datacenter": {
      "name": "The Telemetry & Perception Logs",
      "xy": [
        330,
        240
      ]
    },
    "ad_office": {
      "name": "The Program's Development Office",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "ad_vehicle",
      "ad_datacenter"
    ],
    [
      "ad_datacenter",
      "ad_office"
    ]
  ],
  "CHARACTERS": {
    "ad_tech": {
      "name": "Field Tech Ravi Sen",
      "role": "Vehicle field technician",
      "face": "🔧",
      "badge": "R",
      "legend": "the vehicle",
      "hint": "Services the sensors; saw the car repeatedly miss objects in the dark."
    },
    "ad_analyst": {
      "name": "The Perception Analyst",
      "role": "Perception-log analyst",
      "face": "📈",
      "badge": "P",
      "legend": "the data centre",
      "hint": "Reads the logs; the car classified the victim three ways and braked too late."
    },
    "ad_clerk": {
      "name": "The Clerk",
      "role": "Program records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the office",
      "hint": "Holds the release notes — and the ticket that disabled the driver-attention alarm."
    }
  },
  "TOPICMAP": {
    "ad_vehicle": {
      "ad_tech": [
        "ad_nader"
      ],
      "ad_analyst": [
        "ad_barenyi"
      ],
      "ad_clerk": [
        "ad_stapp"
      ]
    },
    "ad_datacenter": {
      "ad_tech": [
        "ad_hulsmeyer"
      ],
      "ad_analyst": [
        "ad_fossum"
      ],
      "ad_clerk": [
        "ad_dickmanns"
      ]
    },
    "ad_office": {
      "ad_tech": [
        "ad_thrun"
      ],
      "ad_analyst": [
        "ad_parasuraman"
      ],
      "ad_clerk": [
        "ad_endsley"
      ]
    }
  },
  "TOPICS": {
    "ad_nader": {
      "whatHint": "Nader made crashes a question of design, not fate. Ask whether this one traces to a built-in gap rather than a stroke of bad luck.",
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
              "t": "Faster engines are generally safer, since raw speed was rarely the hazard.",
              "v": "wrong",
              "fb": "He never argued speed was harmless; he argued cars must be crashworthy."
            },
            {
              "t": "mainly the Corvair was unsafe, so fixing one model solved the problem.",
              "v": "partial",
              "fb": "The Corvair opened the book, but his case was against the whole industry."
            }
          ]
        },
        {
          "q": "What does 'crashworthiness' and the second collision mean?",
          "o": [
            {
              "t": "Designing a car so occupants survive striking the interior in a crash.",
              "v": "expert",
              "fb": "The 'second collision' is the occupant hitting the interior; design for it."
            },
            {
              "t": "Building the car so rigid that it rarely deforms at all in a collision.",
              "v": "wrong",
              "fb": "Crashworthiness manages the occupant's impact, not just body stiffness."
            },
            {
              "t": "Trusting a careful driver to simply avoid every crash before it starts.",
              "v": "danger",
              "fb": "Avoidance helps, but the point was to survive the crashes that happen."
            },
            {
              "t": "Adding a single belt and treating the rest of the cabin as good enough.",
              "v": "partial",
              "fb": "Belts matter, but crashworthiness spans the whole occupant environment."
            }
          ]
        },
        {
          "q": "Why does Nader's thinking matter to this inquiry?",
          "o": [
            {
              "t": "Treat the crash as foreseeable and ask what the makers left out or hid.",
              "v": "expert",
              "fb": "Nader's frame points straight at design choices and what was concealed."
            },
            {
              "t": "A modern automated crash means an outsider seized control of the car.",
              "v": "danger",
              "fb": "That leaps to a hijacker; Nader would look first at the car's own design."
            },
            {
              "t": "Label it a freak accident and the file closes with nobody responsible.",
              "v": "wrong",
              "fb": "'Freak accident' is the very excuse Nader spent his career refuting."
            },
            {
              "t": "Blame mainly the regulator, since a maker is rarely at fault in a crash.",
              "v": "partial",
              "fb": "Regulators share blame, but the maker's design choices come first here."
            }
          ]
        }
      ]
    },
    "ad_barenyi": {
      "whatHint": "Barényi built safety in layers so one failure isn't fatal. Ask which layer was missing here — and whether it had been switched off.",
      "sci": "Béla Barényi (1907-1997)",
      "topic": "The crumple zone & passive safety",
      "lede": "The Mercedes engineer who realized a car should crush on purpose to keep its people whole.",
      "no": 2,
      "profile": "Béla Barényi was an Austrian-Hungarian engineer at Mercedes-Benz whose ideas quietly reshaped how every car is built. Against the intuition of his era — that a safe car is a strong, rigid car — Barényi argued the opposite. In a patent filed in 1952 he set out the crumple zone: a passenger compartment kept rigid to survive as a protective cell, flanked by front and rear structures deliberately engineered to deform and crush on impact. Those crumpling ends absorb the kinetic energy of a collision over a longer distance and time, so less of that violence reaches the people inside.\n\nThis is the essence of 'passive safety' — features that protect occupants during a crash rather than trying to prevent it. Barényi held an extraordinary number of patents, thousands over his career, covering safety-related structures and details most drivers never notice. Mercedes-Benz introduced production cars with his crumple-zone principle in 1959, and the concept became universal. His work made explicit a hard truth: some collisions cannot be avoided, so the intelligent response is to design for them in advance.\n\nFor this inquiry, Barényi reframes the whole question. Automated driving will not eliminate the moment when a hazard appears too late to fully avoid — a pedestrian stepping from shadow, a sensor's blind spot. A responsible system, like a responsible car body, is engineered to detect, slow, and mitigate that moment, not to pretend it will never come. The sensational answer imagines an external attacker; the dismissive answer calls the death unavoidable bad luck. Barényi's discipline asks instead what the designers built to manage the collision they knew could happen — and what protection was missing when it did.",
      "frame": "The analyst pulls up a deformation model. \"Barényi taught that a car should crush in the right places on purpose. Show me you grasp designing for the crash you can't dodge, and I'll show you the perception trace.\"",
      "q": [
        {
          "q": "What is the core idea of the crumple zone?",
          "o": [
            {
              "t": "A rigid cabin with crushable ends that absorb the energy of an impact.",
              "v": "expert",
              "fb": "Deforming ends soak up energy so the protected cell stays intact."
            },
            {
              "t": "A uniformly rigid shell so the whole car resists deforming anywhere at all.",
              "v": "danger",
              "fb": "A fully rigid car transmits the crash to its occupants; Barényi rejected that."
            },
            {
              "t": "A soft outer skin whose mainly job is to reduce the cost of body repairs.",
              "v": "wrong",
              "fb": "Crumple zones protect people by managing energy, not to cut repair bills."
            },
            {
              "t": "A heavy bumper that bounces the car back off whatever it happens to strike.",
              "v": "partial",
              "fb": "It is about absorbing energy through deformation, not rebounding away."
            }
          ]
        },
        {
          "q": "What does 'passive safety' describe?",
          "o": [
            {
              "t": "Features that protect occupants during a crash rather than preventing it.",
              "v": "expert",
              "fb": "Passive safety limits harm once a collision is already happening."
            },
            {
              "t": "Systems that steer or brake automatically to avoid the crash before it starts.",
              "v": "wrong",
              "fb": "That is active safety; passive safety works during the impact itself."
            },
            {
              "t": "A driver staying alert and cautious so that no crash ever actually occurs.",
              "v": "wrong",
              "fb": "That is driver behavior, not the built-in passive protection Barényi meant."
            },
            {
              "t": "Insurance and warning labels that shift the blame after a crash has happened.",
              "v": "partial",
              "fb": "Passive safety is engineered structure, not paperwork after the fact."
            }
          ]
        },
        {
          "q": "How does Barényi's thinking bear on this inquiry?",
          "o": [
            {
              "t": "Design for the collision you cannot fully avoid, not for a world without one.",
              "v": "expert",
              "fb": "A sound system detects and mitigates the hazard it may meet too late."
            },
            {
              "t": "Since crashes can be designed for, any real crash means the car was attacked.",
              "v": "danger",
              "fb": "Designing for impact assumes crashes happen; it does not imply an attacker."
            },
            {
              "t": "If a crash still happened, it was simply unavoidable and no one is at fault.",
              "v": "wrong",
              "fb": "Barényi's point is that foreseeable impacts must be engineered for, not excused."
            },
            {
              "t": "Passive safety alone settles the case, so the sensors need no examination.",
              "v": "partial",
              "fb": "Passive safety is one layer; the perception failure still demands scrutiny."
            }
          ]
        }
      ]
    },
    "ad_stapp": {
      "whatHint": "Stapp proved a human can act if warned in time. Ask whether the driver was being watched and warned — or whether that safeguard was silent.",
      "sci": "John Paul Stapp (1910-1999)",
      "topic": "Human tolerance to deceleration",
      "lede": "The Air Force doctor who strapped himself to a rocket sled to learn exactly how much a body can take.",
      "no": 3,
      "profile": "John Paul Stapp was a U.S. Air Force flight surgeon and biophysicist who answered a life-or-death question by making himself the test subject. In the late 1940s the received wisdom was that roughly 18 g of deceleration was the limit of human survival, a belief that led designers to build flimsy restraints and cockpits on the assumption that crashes above that were hopeless. Stapp doubted the number and set out to measure it directly, riding rocket-propelled sleds that accelerated hard and then braked violently on a measured track.\n\nOn December 10, 1954, aboard the sled 'Sonic Wind,' Stapp decelerated from over 600 mph to a stop in about a second, enduring a peak of roughly 46 g — far beyond the supposed lethal limit — and survived, though at real cost to his body and eyes. His experiments proved that humans could tolerate much greater forces than assumed if properly restrained, and they drove better harnesses, seats, and eventually automobile safety. He was also a tireless campaigner for car seatbelts, and his projects gave rise to the popular telling of 'Murphy's Law.'\n\nStapp's method is his message: replace assumption with measurement, even when the assumption is comfortable and the measurement is hard.\n\nFor this inquiry, that discipline is central. The forces, speeds, and timing of an automated-vehicle crash are not matters of opinion — they are recorded to the millisecond. The sensational and dismissive stories both rest on assumptions: that an intruder must have struck, or that nothing could have been done. Stapp would demand the numbers first — how fast, how late the braking, how much warning the machine had — and let the measured record, not the assumption, decide what happened.",
      "frame": "The clerk lays out a deceleration chart. \"Stapp never trusted a comfortable assumption when he could measure the truth on his own spine. Show me you respect the numbers, and I'll open the file.\"",
      "q": [
        {
          "q": "What did Stapp's rocket-sled runs prove?",
          "o": [
            {
              "t": "Humans can survive far more deceleration than assumed if well restrained.",
              "v": "expert",
              "fb": "He shattered the 18-g myth, showing survival with proper restraint."
            },
            {
              "t": "That roughly 18 g was indeed the hard ceiling on human survival after all.",
              "v": "wrong",
              "fb": "He disproved that very ceiling, enduring far higher forces himself."
            },
            {
              "t": "That restraint is pointless, since the body does not be protected in any crash.",
              "v": "danger",
              "fb": "He proved the opposite: restraint is what makes survival possible."
            },
            {
              "t": "That mainly unmanned tests can measure crash forces safely on any vehicle.",
              "v": "partial",
              "fb": "He used himself precisely to get human data machines could not give."
            }
          ]
        },
        {
          "q": "What was the essence of Stapp's method?",
          "o": [
            {
              "t": "Replace a comfortable assumption with a direct, measured experiment.",
              "v": "expert",
              "fb": "He measured the limit rather than accepting the received number."
            },
            {
              "t": "Accept the established figure, since testing a known limit wastes resources.",
              "v": "wrong",
              "fb": "He refused the established figure and tested it to destruction."
            },
            {
              "t": "Trust intuition about danger, because bodies vary too much to ever measure.",
              "v": "danger",
              "fb": "He showed the limit was measurable, not a matter of intuition."
            },
            {
              "t": "Run one quick trial and generalize freely from that single data point.",
              "v": "partial",
              "fb": "He ran careful, instrumented, repeated runs, not a single casual trial."
            }
          ]
        },
        {
          "q": "How does Stapp's discipline apply to this crash?",
          "o": [
            {
              "t": "Demand the recorded speed, timing, and braking before accepting any story.",
              "v": "expert",
              "fb": "The measured record, not assumption, should decide what happened."
            },
            {
              "t": "Assume an intruder caused it, since a machine could not fail on its own.",
              "v": "danger",
              "fb": "That is an assumption; the recorded data can test it directly instead."
            },
            {
              "t": "Assume nothing could be done, so the numbers are not worth examining.",
              "v": "wrong",
              "fb": "Stapp's whole life argued the numbers are exactly what must be examined."
            },
            {
              "t": "Trust the makers' summary rather than the raw deceleration record itself.",
              "v": "partial",
              "fb": "A summary can mislead; Stapp would insist on the raw measured data."
            }
          ]
        }
      ]
    },
    "ad_hulsmeyer": {
      "whatHint": "Hülsmeyer's radar sees what a camera can miss. Ask whether the car was acting on its own sensors' blind spot — not an outside hand — and whether that gap would recur every time rather than strike once by chance.",
      "sci": "Christian Hülsmeyer (1881-1957)",
      "topic": "Radar & obstacle detection",
      "lede": "Christian Hülsmeyer used reflected radio waves to detect ships hidden by fog before radar had its modern name.",
      "no": 4,
      "profile": "Christian Hülsmeyer was a German inventor who demonstrated an early radio-based obstacle detector in 1904. His “telemobiloscope” transmitted radio waves and detected energy reflected from large metal objects such as ships. The immediate problem was maritime collision in fog, not autonomous driving, but the underlying idea became central to radar: send electromagnetic energy outward and infer the presence of an object from the returned signal.\n\nDetection is not the same as understanding. A radar return depends on transmitted power, wavelength, antenna pattern, target geometry, material, range, and the surrounding clutter. Early systems could indicate that a reflecting object was present without producing the detailed range, speed, and classification available from later pulsed and Doppler radar. Modern automotive radar adds timing and frequency analysis, but it still sees a scene through reflections rather than direct labels.\n\nRoad systems combine radar with cameras, lidar, maps, and vehicle motion. Each sensor has characteristic strengths and blind spots. Radar performs well in darkness and often in poor weather, yet multipath reflections, weak targets, occlusion, and ambiguous geometry can complicate interpretation. A strong return may come from a large stationary structure while a vulnerable road user produces a weaker or inconsistent signature.\n\nThe engineering lesson is to separate detection, tracking, and classification. Finding a return does not establish what it is; assigning a class does not guarantee a safe predicted path. Sensor fusion and conservative uncertainty handling are meant to prevent one brittle interpretation from becoming a physical command. Automotive radar therefore needs tests involving vulnerable road users, roadside metal, curves, and partial occlusion rather than clean targets on an empty range.",
      "frame": "Points toward the radar units. \"Hülsmeyer could find metal in fog. Tell me why a return is evidence of an object, not a complete understanding of the road.\"",
      "q": [
        {
          "q": "What did Hülsmeyer demonstrate in 1904?",
          "o": [
            {
              "t": "A radio system that detected reflected energy from large metal objects such as ships.",
              "v": "expert",
              "fb": "The telemobiloscope anticipated the basic reflective principle later used by radar."
            },
            {
              "t": "A camera system that reconstructed road objects from visible-light images in dense fog.",
              "v": "partial",
              "fb": "His invention used radio reflection rather than optical imaging."
            },
            {
              "t": "A satellite navigation method that located a receiver from timed signals in orbit; in use.",
              "v": "wrong",
              "fb": "That describes later satellite navigation, not Hülsmeyer’s detector."
            },
            {
              "t": "A strong radar return can be accepted as a complete classification of the object and its intent.",
              "v": "danger",
              "fb": "Detection and classification are separate steps with separate uncertainties."
            }
          ]
        },
        {
          "q": "Why can automotive radar still misinterpret a scene?",
          "o": [
            {
              "t": "Returns vary with geometry, material, range, occlusion, clutter, and multipath reflections.",
              "v": "expert",
              "fb": "Radar observes reflected energy whose meaning depends on the scene and signal path."
            },
            {
              "t": "Radar measures object identity directly, while uncertainty enters mainly from the vehicle map.",
              "v": "partial",
              "fb": "Radar provides measurements that still require tracking and classification."
            },
            {
              "t": "Darkness removes the radio reflection needed for radar to detect a nearby object; in use.",
              "v": "wrong",
              "fb": "Radio sensing does not depend on visible illumination."
            },
            {
              "t": "A system may prioritize the strongest reflector and discard a weaker road user as background clutter.",
              "v": "danger",
              "fb": "Signal strength alone does not determine which object is safety-critical."
            }
          ]
        },
        {
          "q": "What safety principle follows from Hülsmeyer’s work?",
          "o": [
            {
              "t": "Keep detection, tracking, classification, and motion prediction as separately testable stages.",
              "v": "expert",
              "fb": "A sensor return should not silently become an unverified behavioral conclusion."
            },
            {
              "t": "Combine radar with another sensor, then treat agreement as proof that both systems are correct.",
              "v": "partial",
              "fb": "Fusion helps, but shared assumptions and correlated errors still require testing."
            },
            {
              "t": "Use radar primarily to confirm the class already chosen by the camera system; in use.",
              "v": "wrong",
              "fb": "Independent measurements are most useful when they can challenge one another."
            },
            {
              "t": "Continue normal speed when classification is unstable because the radar has detected something.",
              "v": "danger",
              "fb": "Uncertain classification should produce a conservative response, not confidence."
            }
          ]
        }
      ]
    },
    "ad_fossum": {
      "whatHint": "Fossum's camera has known limits — low light, glare, contrast. Ask whether the object sat exactly where the sensor was weakest.",
      "sci": "Eric Fossum (image-sensor researcher)",
      "topic": "The CMOS camera sensor",
      "lede": "Eric Fossum put an active amplifier inside each pixel and helped cameras become small, fast, and ubiquitous.",
      "no": 5,
      "profile": "Eric Fossum developed the CMOS active-pixel image sensor while working at NASA’s Jet Propulsion Laboratory in the early 1990s. The goal was to make spacecraft cameras smaller and less power-hungry than conventional systems. In an active-pixel sensor, circuitry within or near each pixel helps convert collected charge into a readable signal. CMOS fabrication also allows timing, control, and processing electronics to share the same chip.\n\nThe result transformed digital imaging. Compact, low-power CMOS sensors became practical for spacecraft, phones, medical devices, webcams, and vehicle cameras. Yet the chip does not remove the physics of imaging. A camera still depends on lens focus, exposure time, photon count, dynamic range, pixel size, read noise, motion blur, and calibration. Darkness reduces the available signal; bright headlights can saturate part of the image; and a dark object against a dark road may produce weak contrast.\n\nMachine vision adds another layer. Software turns pixels into edges, objects, tracks, and predicted paths. A high-resolution image can still support the wrong interpretation if training data, labeling, thresholds, or temporal logic are poor. Conversely, a modest image may be useful when the system preserves uncertainty and combines several frames or sensors.\n\nThe safety lesson is that “the camera was working” is not the same as “the pedestrian was reliably perceived.” Engineers need raw frames, exposure settings, confidence scores, intermediate classifications, and the timing of every update. That chain shows whether the failure began in the optics, the sensor, the perception model, or the decision logic. Night testing should preserve the original sensor data, because later enhancement cannot recreate photons that the camera never collected.",
      "frame": "Freezes a dark frame. \"Fossum made the camera fit behind the windshield. Explain why a functioning pixel array can still deliver an uncertain pedestrian.\"",
      "q": [
        {
          "q": "What was Fossum’s major imaging contribution?",
          "o": [
            {
              "t": "The CMOS active-pixel sensor, integrating low-power image sensing and readout on a compact chip.",
              "v": "expert",
              "fb": "Fossum’s architecture helped make small, efficient digital cameras widely practical."
            },
            {
              "t": "The first glass lens able to focus visible light onto a chemically coated photographic plate; in use.",
              "v": "partial",
              "fb": "That belongs to earlier photography rather than CMOS electronic imaging."
            },
            {
              "t": "The pulsed radio transmitter used by automotive radar to measure closing speed; for this system.",
              "v": "wrong",
              "fb": "CMOS sensors detect light; radar uses reflected radio waves."
            },
            {
              "t": "A working camera can be treated as evidence that every road user was represented clearly enough for control.",
              "v": "danger",
              "fb": "Sensor operation does not guarantee adequate contrast, exposure, or interpretation."
            }
          ]
        },
        {
          "q": "Which conditions can degrade a vehicle camera image?",
          "o": [
            {
              "t": "Low photon count, glare, saturation, motion blur, poor focus, and weak object-background contrast.",
              "v": "expert",
              "fb": "Those factors can reduce usable information even when the sensor remains powered."
            },
            {
              "t": "Vehicle speed and road curvature matter, while exposure and optical contrast have little effect.",
              "v": "partial",
              "fb": "Motion and geometry matter, but image formation still depends strongly on light and optics."
            },
            {
              "t": "A CMOS sensor loses the ability to record images whenever the scene contains stationary objects.",
              "v": "wrong",
              "fb": "Stationary objects are recorded; the challenge is interpreting their appearance and relevance."
            },
            {
              "t": "A dark pedestrian may be removed as noise when confidence thresholds favor brighter familiar objects.",
              "v": "danger",
              "fb": "Thresholding can suppress a safety-critical but weak visual signal."
            }
          ]
        },
        {
          "q": "What evidence best locates a camera-perception failure?",
          "o": [
            {
              "t": "Raw frames, exposure settings, timestamps, intermediate classifications, confidence, and control output.",
              "v": "expert",
              "fb": "The full chain distinguishes image-formation problems from model and decision errors."
            },
            {
              "t": "The final object label and braking command, without retaining the images or earlier classifications.",
              "v": "partial",
              "fb": "Final outputs alone cannot show where the perception chain first went wrong."
            },
            {
              "t": "A post-crash photograph taken under different lighting and from a different viewpoint; in use.",
              "v": "wrong",
              "fb": "Different conditions cannot reconstruct what the vehicle camera actually received."
            },
            {
              "t": "A summary that reports the camera online and omits frames where the classification changed repeatedly.",
              "v": "danger",
              "fb": "Unstable classifications are central evidence, not noise to remove from the review."
            }
          ]
        }
      ]
    },
    "ad_dickmanns": {
      "whatHint": "Dickmanns' cars drove on their own vision, for better and worse. A car following its own flawed perception is not a car seized from outside.",
      "sci": "Ernst Dickmanns (b. 1936)",
      "topic": "Machine vision & the first self-driving car",
      "lede": "Ernst Dickmanns taught vehicles to interpret moving road scenes instead of treating vision as a stack of photographs.",
      "no": 6,
      "profile": "Ernst Dickmanns, working at the Bundeswehr University Munich, became a pioneer of autonomous road vehicles and dynamic machine vision. Beginning in the 1980s, his group equipped vehicles with cameras and computers that estimated road geometry and vehicle motion in real time. Their VaMoRs research vehicle and later work in the European PROMETHEUS program demonstrated autonomous driving at speeds that made the problem fundamentally dynamic.\n\nDickmanns emphasized recursive estimation: use a model of how the vehicle and observed features should move, predict the next state, compare the prediction with new images, and update the estimate. This approach treats vision as a time sequence rather than a set of unrelated frames. Road edges, lane curvature, other vehicles, and relative motion become hypotheses that are continually tested.\n\nThe method also exposes failure modes. A model may track the wrong feature, lose an object during occlusion, or remain committed to an earlier classification after the scene changes. Limited computing power encourages selective attention, which can be efficient but dangerous when the selected region excludes an unexpected pedestrian. Good systems maintain uncertainty and know when their state estimate has become unreliable.\n\nAutonomous driving therefore depends on temporal consistency without becoming trapped by it. History should stabilize noisy measurements, not erase new evidence. Engineers need to inspect tracks, prediction errors, object identities, and the moment when a model changed or refused to change. A trajectory that looks smooth may still be smoothly wrong. This is why replay tools should show both the chosen track and competing hypotheses the software considered and rejected.",
      "frame": "Opens the perception timeline. \"Dickmanns made the road a moving estimate. Tell me how prediction helps—and how an old hypothesis can blind a new frame.\"",
      "q": [
        {
          "q": "What distinguished Dickmanns’s approach to machine vision?",
          "o": [
            {
              "t": "It predicted a changing road scene over time and updated the estimate with each new image; in use.",
              "v": "expert",
              "fb": "Dynamic vision uses temporal models rather than interpreting every frame in isolation."
            },
            {
              "t": "It classified each image independently, avoiding any influence from earlier vehicle observations.",
              "v": "partial",
              "fb": "Independent frames discard useful motion information and continuity."
            },
            {
              "t": "It replaced cameras with a fixed map that supplied the position of every moving road user; in use.",
              "v": "wrong",
              "fb": "Maps do not provide the live motion and presence of road users."
            },
            {
              "t": "A stable track may be trusted after conflicting frames appear because continuity is the main objective.",
              "v": "danger",
              "fb": "Continuity should be challenged when new evidence no longer fits the tracked hypothesis."
            }
          ]
        },
        {
          "q": "How can recursive estimation improve perception?",
          "o": [
            {
              "t": "A motion model predicts the next state, then new measurements correct the prediction and uncertainty.",
              "v": "expert",
              "fb": "Prediction and correction can stabilize noisy observations while preserving a measure of confidence."
            },
            {
              "t": "The model carries the previous label forward and uses new images mainly to confirm that label; in use.",
              "v": "partial",
              "fb": "New measurements must be able to overturn the earlier hypothesis."
            },
            {
              "t": "The model removes the need for timestamps because road scenes change smoothly between frames; in use.",
              "v": "wrong",
              "fb": "Timing is essential for estimating velocity, acceleration, and prediction error."
            },
            {
              "t": "Selective attention can exclude an unexpected pedestrian when processing favors the expected road corridor.",
              "v": "danger",
              "fb": "Efficient attention becomes unsafe when it hides objects outside the assumed scene model."
            }
          ]
        },
        {
          "q": "Which log best tests a dynamic-vision failure?",
          "o": [
            {
              "t": "Object tracks, prediction residuals, confidence changes, timestamps, and the frames that challenged the model.",
              "v": "expert",
              "fb": "Those records reveal when the estimate diverged from the observed scene."
            },
            {
              "t": "A final smooth trajectory without the intermediate measurements or uncertainty values used to create it.",
              "v": "partial",
              "fb": "The final path conceals whether the model ignored contradictory evidence."
            },
            {
              "t": "A list of camera hardware versions without the corresponding perception states and timing; in use.",
              "v": "wrong",
              "fb": "Hardware inventory cannot reconstruct the evolving scene interpretation."
            },
            {
              "t": "A cleaned timeline that removes identity changes because they make the perception output look inconsistent.",
              "v": "danger",
              "fb": "Identity changes may be the clearest sign that the system did not understand the object."
            }
          ]
        }
      ]
    },
    "ad_thrun": {
      "whatHint": "Thrun's autonomy acts on what it perceives. Ask whether the record shows an outside hand at the controls, or a system doing exactly what its sensors told it.",
      "sci": "Sebastian Thrun (b. 1967)",
      "topic": "Autonomous driving & the DARPA challenge",
      "lede": "Sebastian Thrun helped turn desert robot races into a practical program for autonomous road vehicles.",
      "no": 7,
      "profile": "Sebastian Thrun is a computer scientist and roboticist whose Stanford team built Stanley, the vehicle that won the 2005 DARPA Grand Challenge. The race required autonomous vehicles to navigate a long desert course using onboard sensing, mapping, planning, and control. Stanley combined laser sensing, cameras, probabilistic estimation, and learned terrain classification. Its success showed that autonomy emerges from an integrated system rather than one spectacular algorithm.\n\nThrun later helped launch Google’s self-driving-car effort. Road driving expanded the problem from desert navigation to traffic rules, vulnerable road users, construction, weather, and rare interactions. The technical program relied on extensive testing and on probabilistic robotics: representing uncertainty in localization, perception, and prediction rather than pretending each estimate is exact.\n\nLarge mileage totals can still mislead. Common highway travel may add millions of easy miles while contributing little evidence about a dark pedestrian crossing outside a crosswalk. Safety evaluation must therefore organize experience by scenario, exposure, severity, and system change. Disengagements, near misses, simulation results, and closed-course tests answer different questions and should not be collapsed into one headline number.\n\nThe management lesson is that a demonstration proves capability under its tested conditions. Deployment requires a defined operational design domain—the roads, speeds, weather, lighting, and supervision in which the system is intended to work. Expanding that domain without new evidence can turn past success into unjustified confidence. Rare-event testing and simulation are valuable when their assumptions and coverage are reported alongside road mileage. A safety claim should therefore name the tested domain and the remaining gaps explicitly.",
      "frame": "Circles the test-route map. \"Thrun’s vehicles won by integrating uncertainty, not by declaring victory after one route. Show me what a demonstration can and cannot establish.\"",
      "q": [
        {
          "q": "What did Stanley demonstrate in the 2005 DARPA Grand Challenge?",
          "o": [
            {
              "t": "Integrated sensing, probabilistic estimation, planning, and control could navigate a long desert route.",
              "v": "expert",
              "fb": "Stanley’s achievement came from a coordinated autonomous system tested on a defined course."
            },
            {
              "t": "One learned vision model could replace mapping, localization, planning, and vehicle control.",
              "v": "partial",
              "fb": "Learning contributed, but Stanley depended on several linked subsystems."
            },
            {
              "t": "Desert success established safe operation in dense urban traffic under varied lighting and weather.",
              "v": "wrong",
              "fb": "A desert course and an urban road present different hazards and requirements."
            },
            {
              "t": "A famous demonstration can justify expanding deployment before rare pedestrian scenarios are tested.",
              "v": "danger",
              "fb": "Capability in one domain does not supply evidence for every new domain."
            }
          ]
        },
        {
          "q": "Why can total autonomous mileage be a weak safety measure?",
          "o": [
            {
              "t": "Mileage may be dominated by easy scenarios and hide limited exposure to rare severe hazards; on record.",
              "v": "expert",
              "fb": "Scenario coverage matters more than a single aggregate distance."
            },
            {
              "t": "Mileage matters mainly for mechanical wear, while software behavior is independent of driving exposure.",
              "v": "partial",
              "fb": "Driving exposure is relevant, but its distribution across scenarios determines what it tests."
            },
            {
              "t": "Every mile contributes equal evidence about nighttime pedestrians, construction zones, and unusual road users.",
              "v": "wrong",
              "fb": "Different miles exercise very different hazards and system functions."
            },
            {
              "t": "A program may emphasize routine miles while leaving difficult interventions and near misses outside the headline.",
              "v": "danger",
              "fb": "Selective reporting can create confidence without testing the controlling risks."
            }
          ]
        },
        {
          "q": "What is an operational design domain?",
          "o": [
            {
              "t": "The roads, speeds, weather, lighting, and supervision conditions in which the system is designed to operate.",
              "v": "expert",
              "fb": "The domain defines where the evidence and safety claims apply."
            },
            {
              "t": "The complete set of situations a vehicle could encounter after customers begin using it; in use.",
              "v": "partial",
              "fb": "A design domain should be bounded rather than equated with every possible situation."
            },
            {
              "t": "The office team responsible for designing the perception and control software; in the case file.",
              "v": "wrong",
              "fb": "The term describes operating conditions, not an organizational unit."
            },
            {
              "t": "A boundary that can be widened by policy even when the new conditions have not been validated; in use.",
              "v": "danger",
              "fb": "Changing the label does not create evidence for operation outside the tested domain."
            }
          ]
        }
      ]
    },
    "ad_parasuraman": {
      "whatHint": "Parasuraman showed people stop watching automation they trust. Ask whether the driver-monitor meant to catch that was working — or disabled.",
      "sci": "Raja Parasuraman (1950-2015)",
      "topic": "Automation complacency & vigilance",
      "lede": "Raja Parasuraman showed why reliable automation can make human monitoring weaker rather than stronger.",
      "no": 8,
      "profile": "Raja Parasuraman was a psychologist and human-factors researcher who studied attention, vigilance, and human interaction with automation. His work helped explain automation complacency: when a system is usually reliable, operators may allocate attention elsewhere and become slower to detect the moments when it fails. This is not simply laziness. Monitoring is difficult, especially when people divide attention among several tasks and receive few meaningful events.\n\nParasuraman also examined automation bias, the tendency to favor an automated recommendation over contradictory information or to miss a problem the automation fails to flag. These effects can appear in both novices and experts. Training helps people understand limitations, but practice alone does not remove the basic attention problem. Interface design, workload, alert quality, and opportunities for active engagement all matter.\n\nLevels of automation should be chosen by function. A machine may gather information, analyze it, recommend an action, or execute that action. Assigning every stage to automation can improve speed while weakening the operator’s model of what is happening. A last-second demand for human takeover is especially hazardous when the system has spent minutes encouraging disengagement.\n\nDriver monitoring must therefore measure more than whether a person is physically present. Gaze, posture, hands, response timing, and the driving context can help estimate readiness, but each measure has uncertainty. A monitoring safeguard that is disabled removes the evidence needed to know whether fallback is realistic. Effective alerts also need graded escalation, because frequent nuisance warnings can train operators to discount the one that matters. Readiness is a measured state, not a staffing assumption.",
      "frame": "Points to the driver-monitor trace. \"Parasuraman studied what happens when reliable automation trains attention away. Explain why a backup driver may not be ready on command.\"",
      "q": [
        {
          "q": "What is automation complacency?",
          "o": [
            {
              "t": "Attention shifts away from a usually reliable automated task, delaying detection when it fails; in use.",
              "v": "expert",
              "fb": "Reliable automation can reduce active monitoring, especially under competing workload."
            },
            {
              "t": "The operator intentionally ignores automation because frequent false alarms make every warning untrustworthy.",
              "v": "partial",
              "fb": "Alarm quality matters, but complacency can occur even with generally reliable automation."
            },
            {
              "t": "The automated system becomes less accurate because the human operator is looking elsewhere; in use.",
              "v": "wrong",
              "fb": "Complacency describes human monitoring behavior, not a direct change in algorithm accuracy."
            },
            {
              "t": "A program may remove driver monitoring while assuming the backup driver remains continuously ready.",
              "v": "danger",
              "fb": "Reduced engagement makes immediate takeover less credible, not more."
            }
          ]
        },
        {
          "q": "What is automation bias?",
          "o": [
            {
              "t": "People may favor an automated recommendation or miss a problem the automation does not flag; in use.",
              "v": "expert",
              "fb": "Automation can shape both commission errors and omissions."
            },
            {
              "t": "People reject every automated recommendation after seeing one visible system error; on record.",
              "v": "partial",
              "fb": "Distrust can occur, but automation bias refers to overreliance rather than blanket rejection."
            },
            {
              "t": "Automation produces biased data whenever its output differs from a human judgment; on record.",
              "v": "wrong",
              "fb": "Disagreement does not by itself identify which source is biased or wrong."
            },
            {
              "t": "A safety review may accept the system label despite camera evidence that the classification was unstable.",
              "v": "danger",
              "fb": "Contradictory evidence should challenge the automated recommendation."
            }
          ]
        },
        {
          "q": "Why is a sudden takeover request risky?",
          "o": [
            {
              "t": "The operator may need time to rebuild situation awareness after prolonged passive monitoring.",
              "v": "expert",
              "fb": "Readiness cannot be assumed immediately after attention has been directed elsewhere."
            },
            {
              "t": "The operator needs time mainly to learn the vehicle controls, even after extensive training and practice.",
              "v": "partial",
              "fb": "Control familiarity helps, but the larger issue is reconstructing the current situation."
            },
            {
              "t": "The automation transfers its internal scene model directly to the human at the moment of the alert.",
              "v": "wrong",
              "fb": "Humans must perceive and interpret the situation themselves."
            },
            {
              "t": "A disabled monitor can leave the system unable to tell whether the fallback driver is attentive at all.",
              "v": "danger",
              "fb": "Without monitoring, the takeover strategy rests on an untested assumption."
            }
          ]
        }
      ]
    },
    "ad_endsley": {
      "whatHint": "Endsley measured whether an operator knows what the machine sees. Ask whether system and driver both lost the obstacle by a design gap, not one-off luck.",
      "sci": "Mica Endsley (b. 1960)",
      "topic": "Situation awareness",
      "lede": "Mica Endsley gave engineers a three-level model for whether an operator understands a changing system.",
      "no": 9,
      "profile": "Mica Endsley is a human-factors engineer known for developing a widely used model of situation awareness. She separates it into three levels: perception of relevant elements, comprehension of what those elements mean, and projection of how the situation may develop. Seeing a warning light is perception; understanding that it signals a degraded sensor is comprehension; anticipating that the vehicle may miss a pedestrian is projection.\n\nThe model explains why information quantity is not the same as awareness. A display can show many measurements while hiding relationships, timing, and priority. Automation may improve awareness by filtering data and predicting hazards, yet it may also reduce awareness when it conceals its reasoning or changes modes without making the transition obvious. Operators then know the output without understanding the state that produced it.\n\nSituation awareness is also time-dependent. A person who has been disengaged from control cannot instantly recover the road scene, system limitations, and likely next events. Good interfaces support the transition by showing what the automation sees, what it is uncertain about, what changed, and what action is needed. Alerts that arrive late or use vague language consume the remaining response time.\n\nFor automated vehicles, driver monitoring and system transparency work together. Monitoring estimates whether the fallback driver is looking and responsive; transparent displays help that person rebuild comprehension. Removing either safeguard weakens the handoff. A takeover plan is credible only when the human has both the attention and the information required to act. A well-designed handoff supports all three levels instead of merely sounding a tone and transferring steering authority.",
      "frame": "Sets the handoff screen beside the driver video. \"Endsley separated seeing, understanding, and predicting. Tell me which of those a takeover alert actually restores.\"",
      "q": [
        {
          "q": "What are Endsley’s three levels of situation awareness?",
          "o": [
            {
              "t": "Perception of elements, comprehension of their meaning, and projection of likely future states.",
              "v": "expert",
              "fb": "The model moves from noticing information to understanding and anticipating its consequences."
            },
            {
              "t": "Detection of an alert, physical control of the vehicle, and later review of the event.",
              "v": "partial",
              "fb": "Those are useful activities, but they are not the three levels in Endsley’s model."
            },
            {
              "t": "Sensor fusion, route planning, and execution of the selected steering command; in use.",
              "v": "wrong",
              "fb": "Those are automation functions rather than levels of human situation awareness."
            },
            {
              "t": "A driver may look forward yet lack comprehension of the mode change and the developing hazard.",
              "v": "danger",
              "fb": "Gaze alone does not establish understanding or projection."
            }
          ]
        },
        {
          "q": "Why can more display information reduce awareness?",
          "o": [
            {
              "t": "High volume can obscure relationships, priorities, mode changes, and the meaning of uncertainty; in use.",
              "v": "expert",
              "fb": "Awareness depends on organized understanding, not the amount of data shown."
            },
            {
              "t": "Additional information reduces awareness mainly because screens consume electrical power and processing time.",
              "v": "partial",
              "fb": "Resource limits matter, but the human problem is interpretation and attention."
            },
            {
              "t": "Operators understand every displayed value independently, so information density has little effect.",
              "v": "wrong",
              "fb": "Dense or poorly organized displays can overwhelm attention and hide important relationships."
            },
            {
              "t": "A program may add more icons while leaving the automation’s mode and confidence difficult to interpret.",
              "v": "danger",
              "fb": "Decoration does not substitute for meaningful state and uncertainty information."
            }
          ]
        },
        {
          "q": "What makes a human fallback credible?",
          "o": [
            {
              "t": "The driver is attentive and receives enough state, uncertainty, and timing information to rebuild awareness.",
              "v": "expert",
              "fb": "Both readiness and understandable system information are needed for a safe handoff."
            },
            {
              "t": "The driver is seated behind the wheel and has previously completed a general training course; on record.",
              "v": "partial",
              "fb": "Presence and training do not guarantee awareness of the current situation."
            },
            {
              "t": "The alert transfers control instantly, so comprehension and projection can develop after the maneuver.",
              "v": "wrong",
              "fb": "The human needs awareness before making a time-critical response."
            },
            {
              "t": "A disabled driver monitor leaves readiness assumed while the interface supplies little explanation of the failure.",
              "v": "danger",
              "fb": "That handoff depends on two unsupported assumptions at once."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "ad_tech": {
      "ad_vehicle": "",
      "ad_datacenter": "",
      "ad_office": ""
    },
    "ad_analyst": {
      "ad_vehicle": "",
      "ad_datacenter": "",
      "ad_office": ""
    },
    "ad_clerk": {
      "ad_vehicle": "",
      "ad_datacenter": "",
      "ad_office": ""
    }
  },
  "story": [
    "<b>The Autopilot on Vane Street</b> opens inside the Vane Street autonomy inquiry, where the visible evidence supports more than one plausible account.",
    "<b>Field Tech Ravi Sen</b>, <b>The Perception Analyst</b>, and <b>The Clerk</b> each control a different part of the record.",
    "The inquiry is pulled between <b>A hack or remote hijack of the car</b> and <b>A freak one-off software glitch — bad luck</b>, while the readings test what each explanation can actually support.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and decide the <b>WHAT</b> from the evidence."
  ],
  "endings": {
    "overclaimWhat": "ad_hack",
    "dismissalWhat": "ad_glitch",
    "win": {
      "expertTitle": "",
      "expert": [
        "",
        ""
      ],
      "soundTitle": "",
      "sound": [
        "",
        ""
      ],
      "namedTitle": "",
      "named": [
        "",
        ""
      ]
    },
    "overclaim": {
      "title": "",
      "body": [
        "",
        ""
      ]
    },
    "dismissal": {
      "title": "",
      "body": [
        "",
        ""
      ]
    },
    "wrongNames": {
      "title": "",
      "body": [
        ""
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"An automated car sensing a pedestrian at night\"><path d=\"M76 88 L118 56 H242 L278 88 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.7\"/><circle cx=\"124\" cy=\"92\" r=\"14\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.6\"/><circle cx=\"238\" cy=\"92\" r=\"14\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.6\"/><path d=\"M278 70 L486 40 L486 112 Z\" fill=\"none\" stroke=\"#326891\" stroke-width=\"1.5\"/><circle cx=\"488\" cy=\"56\" r=\"8\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M488 64 V92 M488 72 L472 82 M488 72 L504 82 M488 92 L476 112 M488 92 L500 112\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M454 40 L518 112\" stroke=\"#B3261E\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/></svg>"
}};
