module.exports = { PACK: {
  "id": "m_heli",
  "title": "The Ridgeline Rotor",
  "discipline": "Rotorcraft & Aeromechanics",
  "teaser": "A charter helicopter dropped out of a clear sky onto the ridge. A bird strike that shattered the rotor? A freak mountain gust? Or a warning bolted into the logbook?",
  "overclaimTag": "a bird strike or sabotage",
  "truthTag": "a deferred gearbox flaw flown anyway",
  "venue": "the Ridgeline rotorcraft inquiry",
  "agent": {
    "name": "Investigator Cole Aldith",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Rotorcraft Pioneers",
  "dossierName": "ROTORCRAFT & AEROMECHANICS PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Ridgeline rotorcraft inquiry",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before the inquiry closes. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The place you test determines the dossier you receive, and the conversation costs one day.",
  "overclaimTease": "And beware the answer the headlines crave: the evidence points not to a bird or a saboteur, but to something quieter — bolted into the machine and written down long before the flight.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "hx_operator",
      "items": [
        {
          "id": "hx_operator",
          "label": "Rourke Vane — charter-fleet operator"
        },
        {
          "id": "hx_pilot",
          "label": "The command pilot"
        },
        {
          "id": "hx_regulator",
          "label": "The aviation-safety inspector"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "hx_office",
      "items": [
        {
          "id": "hx_rotor",
          "label": "The Rotor Head & Gearbox Bay"
        },
        {
          "id": "hx_cabin",
          "label": "The Cockpit & Flight Recorders"
        },
        {
          "id": "hx_office",
          "label": "The Operator's Maintenance Office"
        }
      ]
    },
    "what": {
      "title": "What is happening",
      "truth": "hx_gearbox",
      "items": [
        {
          "id": "hx_strike",
          "label": "A bird strike or deliberate sabotage"
        },
        {
          "id": "hx_gust",
          "label": "A freak mountain gust — an act of God"
        },
        {
          "id": "hx_gearbox",
          "label": "A deferred gearbox flaw flown past its warning"
        }
      ]
    }
  },
  "PLACES": {
    "hx_rotor": {
      "name": "The Rotor Head & Gearbox Bay",
      "xy": [
        140,
        90
      ]
    },
    "hx_cabin": {
      "name": "The Cockpit & Flight Recorders",
      "xy": [
        330,
        240
      ]
    },
    "hx_office": {
      "name": "The Operator's Maintenance Office",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "hx_rotor",
      "hx_cabin"
    ],
    [
      "hx_cabin",
      "hx_office"
    ]
  ],
  "CHARACTERS": {
    "hx_mechanic": {
      "name": "Mechanic Iris Dane",
      "role": "Line mechanic",
      "face": "🔧",
      "badge": "M",
      "legend": "the rotor bay",
      "hint": "Turns the wrenches; logged the metal chips in the gearbox that kept coming back."
    },
    "hx_analyst": {
      "name": "The Flight-Data Analyst",
      "role": "Flight-recorder analyst",
      "face": "📈",
      "badge": "F",
      "legend": "the cockpit",
      "hint": "Reads the recorders; the vibration trace was screaming before the rotor let go."
    },
    "hx_clerk": {
      "name": "The Clerk",
      "role": "Maintenance-records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the office",
      "hint": "Keeps the tech log — and the deferral that kept a flagged part flying."
    }
  },
  "TOPICMAP": {
    "hx_rotor": {
      "hx_mechanic": [
        "hx_sikorsky"
      ],
      "hx_analyst": [
        "hx_focke"
      ],
      "hx_clerk": [
        "hx_flettner"
      ]
    },
    "hx_cabin": {
      "hx_mechanic": [
        "hx_piasecki"
      ],
      "hx_analyst": [
        "hx_glauert"
      ],
      "hx_clerk": [
        "hx_gearlewis"
      ]
    },
    "hx_office": {
      "hx_mechanic": [
        "hx_stribeck"
      ],
      "hx_analyst": [
        "hx_lcf"
      ],
      "hx_clerk": [
        "hx_vibration"
      ]
    }
  },
  "TOPICS": {
    "hx_sikorsky": {
      "sci": "Igor Sikorsky (1889-1972)",
      "topic": "The single main-rotor helicopter",
      "lede": "The émigré who lost a fortune to a revolution and rebuilt it into the machine whose shape every helicopter still wears.",
      "no": 1,
      "profile": "Igor Sikorsky is the engineer whose layout defined the helicopter. Born in Kyiv, he built pioneering multi-engine airplanes in Imperial Russia — the Ilya Muromets — then fled the Russian Revolution and arrived in the United States nearly penniless. He rebuilt his career on flying boats, the great Clippers that opened ocean air routes, before finally returning to the boyhood problem that had beaten him twice: vertical flight. In 1939 his VS-300 lifted off tethered, and by 1940 it flew free.\n\nThe VS-300 settled a question that had stumped earlier inventors: how to stop the fuselage from spinning. A single large rotor generates lift, but the engine torque driving it tries to rotate the body the opposite way. Sikorsky's answer was a small vertical rotor on a tail boom whose sideways thrust cancels that torque and, varied by the pilot's pedals, steers the aircraft in yaw. This single-main-rotor-plus-tail-rotor configuration proved simple, controllable, and scalable, and it became the dominant design worldwide.\n\nFor this inquiry, Sikorsky's layout points straight at the heart of the machine. In his configuration the engine, the main rotor, and the tail rotor are all tied together through one transmission — the gearbox that turns power into lift and anti-torque at once. That gearbox is the single component through which the helicopter's entire working life passes. Before anyone reaches for a bird strike or a saboteur, Sikorsky's design says: ask what the transmission was doing. A rotorcraft rarely falls from mystery; it falls from the parts that carry every ounce of its load, and those parts leave records.",
      "frame": "Iris Dane wipes grease from a gear tooth. \"Folks think the rotor is the helicopter. It isn't — it's what turns the rotor. Show me you know the shape of the thing, and I'll open up what I keep pulling out of that gearbox.\"",
      "q": [
        {
          "q": "Why does a single-main-rotor helicopter need a tail rotor?",
          "o": [
            {
              "t": "To cancel the engine torque that would otherwise spin the fuselage around.",
              "v": "expert",
              "fb": "The tail rotor's side thrust balances main-rotor torque and steers yaw."
            },
            {
              "t": "To supply most of the lift, since the main rotor alone is far too small.",
              "v": "wrong",
              "fb": "The main rotor makes the lift; the tail rotor only counters torque."
            },
            {
              "t": "To push the craft forward, a thrust the main rotor does not make at all.",
              "v": "wrong",
              "fb": "Forward flight comes from tilting the main rotor, not the tail rotor."
            },
            {
              "t": "To trim the aircraft in a banked turn, which is its single real purpose.",
              "v": "partial",
              "fb": "It does aid yaw in turns, but its core job is countering torque."
            }
          ]
        },
        {
          "q": "What did the VS-300 establish for helicopter design?",
          "o": [
            {
              "t": "A practical single-rotor layout that scaled up and became the world standard.",
              "v": "expert",
              "fb": "Sikorsky's configuration proved controllable and dominates to this day."
            },
            {
              "t": "That mainly two large rotors side by side could ever fly a helicopter safely.",
              "v": "wrong",
              "fb": "That is the lateral layout; Sikorsky proved the single-rotor form."
            },
            {
              "t": "That helicopters would stay tethered, since free flight was shown implausible.",
              "v": "wrong",
              "fb": "The VS-300 flew free in 1940; tethering was only an early test stage."
            },
            {
              "t": "A jet-driven rotor tip, the one arrangement that removed all torque problems.",
              "v": "partial",
              "fb": "Tip-drive rotors exist, but Sikorsky's answer was a shaft and tail rotor."
            }
          ]
        },
        {
          "q": "Why does Sikorsky's layout matter to this crash?",
          "o": [
            {
              "t": "Because engine, main rotor, and tail rotor all run through one gearbox.",
              "v": "expert",
              "fb": "That single transmission is where the whole machine's load concentrates."
            },
            {
              "t": "Because a single rotor can mainly fail if something strikes it from outside.",
              "v": "danger",
              "fb": "Rotors fail from within too; internal wear needs no external strike."
            },
            {
              "t": "Because the tail rotor carries the lift, so it is the mainly part worth checking.",
              "v": "wrong",
              "fb": "The main rotor lifts; both draw from the same gearbox worth checking."
            },
            {
              "t": "Because the design is so old that modern faults simply does not occur in it.",
              "v": "partial",
              "fb": "The layout is proven, not immune; its gearbox still wears and fails."
            }
          ]
        }
      ]
    },
    "hx_focke": {
      "sci": "Heinrich Focke (1890-1979)",
      "topic": "The first practical helicopter",
      "lede": "The airplane maker who, pushed out of his own company, built the first helicopter that truly obeyed its pilot.",
      "no": 2,
      "profile": "Heinrich Focke was a German aircraft designer, co-founder of the Focke-Wulf company, whose Fw 61 is widely recognized as the first fully practical helicopter. Forced from Focke-Wulf for political reasons in the 1930s, he continued rotary-wing work and in 1936 flew the Fw 61: an aircraft with two three-bladed rotors mounted on outriggers to either side of the fuselage, spinning in opposite directions so their torques cancelled without any tail rotor. It demonstrated controlled hovering, forward flight, sideways and rearward flight, and — crucially — a safe autorotative descent.\n\nWhat set the Fw 61 apart from every earlier attempt was control. The pilot could genuinely command the machine in all directions and trust it to respond, thanks to cyclic and collective pitch control of the blades. In 1937 the test pilot Hanna Reitsch famously flew it inside a Berlin sports arena, a public proof that the helicopter had become a usable aircraft rather than a laboratory curiosity. Focke went on to design the larger Fa 223 transport, one of the first helicopters to reach production.\n\nFor this inquiry, Focke's achievement frames the standard against which the accident must be judged. A practical helicopter is a controllable one; when it stops obeying, the cause is mechanical, not mystical. Focke proved decades ago that these machines answer their controls predictably in hover and cruise alike. So when the Ridgeline ship departed controlled flight in clear air, the board should not reach first for an act of God. A controllable machine that suddenly is not has usually had something break in the chain between engine and blade — and that chain is inspectable, loggable, and traceable.",
      "frame": "The analyst pulls up a control-response plot. \"A real helicopter does what the pilot tells it. Focke proved that in 1936. So show me you know why this one stopped listening, and the traces are yours.\"",
      "q": [
        {
          "q": "What made the Fw 61 the first practical helicopter?",
          "o": [
            {
              "t": "It was genuinely controllable — hover, cruise, and safe autorotation alike.",
              "v": "expert",
              "fb": "True pilot control in every regime is what made it practical."
            },
            {
              "t": "It flew faster than any airplane of its day, which no rotorcraft had managed.",
              "v": "wrong",
              "fb": "Its breakthrough was control, not raw speed over airplanes."
            },
            {
              "t": "It was the first machine to leave the ground under its own rotor power at all.",
              "v": "wrong",
              "fb": "Others had lifted off earlier; the Fw 61's gift was controllability."
            },
            {
              "t": "It needed no engine, drawing all its lift from autorotation the whole flight.",
              "v": "partial",
              "fb": "It used autorotation only to descend; powered rotors gave it lift."
            }
          ]
        },
        {
          "q": "How did the Fw 61 counter rotor torque without a tail rotor?",
          "o": [
            {
              "t": "Two side-by-side rotors turned opposite ways, cancelling each other's torque.",
              "v": "expert",
              "fb": "Counter-rotating lateral rotors balance torque with no tail rotor."
            },
            {
              "t": "A large vertical fin deflected the rotor wash to hold the nose straight.",
              "v": "wrong",
              "fb": "A fin alone cannot balance rotor torque; opposed rotors did it."
            },
            {
              "t": "The single rotor was simply spun slowly enough to make torque negligible.",
              "v": "wrong",
              "fb": "Slower spin means less lift, not balanced torque; it used two rotors."
            },
            {
              "t": "Weights swinging inside the hub absorbed the torque before it reached the body.",
              "v": "partial",
              "fb": "Hub dampers exist, but torque was cancelled by counter-rotation here."
            }
          ]
        },
        {
          "q": "What does Focke's controllability standard imply here?",
          "o": [
            {
              "t": "A controllable ship that suddenly is not has usually broken somewhere mechanical.",
              "v": "expert",
              "fb": "Loss of a proven, controllable machine points to a broken part."
            },
            {
              "t": "That losing control in clear air would be an act of God beyond investigation.",
              "v": "danger",
              "fb": "Loss of control is mechanical and traceable, not divine mystery."
            },
            {
              "t": "That mainly an outside strike can ever make a proven helicopter disobey.",
              "v": "danger",
              "fb": "Internal failures make a helicopter disobey without any strike."
            },
            {
              "t": "That the pilot alone is at fault whenever a helicopter departs controlled flight.",
              "v": "partial",
              "fb": "Crew is one factor; a broken drivetrain overrides even good technique."
            }
          ]
        }
      ]
    },
    "hx_flettner": {
      "sci": "Anton Flettner (1885-1961)",
      "topic": "Rotor control & the servo-flap",
      "lede": "The German inventor who let the wind itself twist a rotor blade — and built a helicopter whose blades wove between each other without ever touching.",
      "no": 3,
      "profile": "Anton Flettner was a German engineer and inventor with a gift for harnessing airflow cleverly. He is remembered for the Flettner rotor ship, which used spinning cylinders and the Magnus effect for propulsion, and in aviation for the Fl 282 Kolibri, one of the first helicopters to reach series production. The Fl 282 used intermeshing rotors — two rotors set close together and angled so their blades wove between one another without colliding, a 'synchropter' layout that cancelled torque with no tail rotor.\n\nFlettner's most enduring contribution to rotorcraft was the servo-flap method of control. Twisting a whole rotor blade against the aerodynamic forces on it takes considerable effort. Flettner instead placed a small trailing-edge flap out along each blade; deflecting that little flap generates an aerodynamic moment that twists the entire blade to the desired pitch, letting light control inputs command large blades. The blade is flown by a tab, much as a trim tab helps move an airliner's control surface. Charles Kaman later built a celebrated line of helicopters around this same servo-flap principle.\n\nFor this inquiry, Flettner's insight is a reminder that rotor control is a chain of small, highly stressed linkages: pitch links, control rods, bearings, and the swashplate that feeds pilot commands into spinning blades. Every one of those parts lives in constant vibration and cyclic load. When investigators are tempted by a dramatic external cause, Flettner points them to the unglamorous truth that a rotor is governed by delicate mechanical hardware, and that the failure of a single worn or cracked link in that chain can be as catastrophic as any strike — and far more likely.",
      "frame": "The clerk taps a line in the tech log. \"Everyone pictures the big rotor. I keep the record of the little parts that steer it — the links, the bearings, the tabs. Prove you grasp what really steers a rotor, and the entry that matters is yours to read.\"",
      "q": [
        {
          "q": "How does a servo-flap control a rotor blade?",
          "o": [
            {
              "t": "A small flap out on the blade twists the whole blade to the pitch commanded.",
              "v": "expert",
              "fb": "The flap's aerodynamic moment pitches the blade with light input."
            },
            {
              "t": "It brakes the blade tip in flight, slowing that blade to bank the rotor disc.",
              "v": "wrong",
              "fb": "It changes blade pitch aerodynamically; it does not brake the tip."
            },
            {
              "t": "It dumps air off the blade root to spoil lift on one side of the disc.",
              "v": "wrong",
              "fb": "It is a pitch-control tab, not a lift-dumping spoiler at the root."
            },
            {
              "t": "It heats the blade so it flexes into the correct shape for each maneuver.",
              "v": "partial",
              "fb": "Blades do flex, but the servo-flap works by aerodynamic moment, not heat."
            }
          ]
        },
        {
          "q": "What is a Flettner-type intermeshing rotor?",
          "o": [
            {
              "t": "Two rotors angled to weave their blades between each other without colliding.",
              "v": "expert",
              "fb": "Intermeshing rotors mesh their arcs and cancel torque, no tail rotor."
            },
            {
              "t": "A single rotor split into two halves that spin at different speeds in flight.",
              "v": "wrong",
              "fb": "It is two whole rotors angled apart, not one split rotor."
            },
            {
              "t": "One rotor stacked directly above another on the very same vertical shaft.",
              "v": "partial",
              "fb": "That is a coaxial rotor; intermeshing rotors sit on separate, tilted shafts."
            },
            {
              "t": "A rotor with blades that fold inward the instant the engine stops turning.",
              "v": "wrong",
              "fb": "Intermeshing describes the blade paths in flight, not any folding."
            }
          ]
        },
        {
          "q": "What does the servo-flap chain teach this board?",
          "o": [
            {
              "t": "A rotor is steered by small, stressed links whose failure can be catastrophic.",
              "v": "expert",
              "fb": "Worn control links and bearings can fail as badly as any strike."
            },
            {
              "t": "That rotor control has no moving parts, so nothing there can ever wear out.",
              "v": "wrong",
              "fb": "Control runs are full of moving, wearing, fatiguing hardware."
            },
            {
              "t": "That mainly a deliberate act could ever sever a rotor's control linkage.",
              "v": "danger",
              "fb": "Fatigue and wear sever links without any deliberate act."
            },
            {
              "t": "That the flap is the sole part worth inspecting in the whole control system.",
              "v": "partial",
              "fb": "The flap is one link; the pitch rods, bearings, and swashplate matter too."
            }
          ]
        }
      ]
    },
    "hx_piasecki": {
      "sci": "Frank Piasecki (1919-2008)",
      "topic": "The tandem-rotor helicopter",
      "lede": "The young engineer who put two big rotors nose and tail and built helicopters strong enough to haul the heaviest loads a rope could hold.",
      "no": 4,
      "profile": "Frank Piasecki was an American helicopter designer who, at just twenty-four, became the second American to design and fly a successful helicopter, and who then pioneered the tandem-rotor layout. Rather than one main rotor and a tail rotor, his machines carried two large rotors, one at the nose and one at the raised tail, turning in opposite directions so their torques cancelled — and so that every scrap of engine power went into lift rather than being spent on an anti-torque tail rotor. His PV-3 and later designs, nicknamed 'Flying Bananas' for their humped fuselages, led to a lineage that includes today's heavy-lift Chinook.\n\nThe tandem layout excels at carrying heavy, awkward loads over a wide range of centers of gravity, because balance can shift fore and aft between two lifting rotors. But it demanded that Piasecki solve hard synchronization and dynamics problems: the two rotors must be geared together precisely so their blades never collide, and the long drive shaft coupling them carries enormous torque. His work advanced the whole science of rotor and transmission dynamics for large helicopters.\n\nFor this inquiry, Piasecki's designs underline a truth that holds for every helicopter, tandem or single: the transmission is where the engine's power and the rotor's loads meet, and it is the most safety-critical mechanical assembly on the aircraft. He built machines whose entire lifting job depended on gears and shafts staying sound under sustained, punishing load. When a rotorcraft fails, the drivetrain is not a footnote; it is the prime suspect. Before entertaining a bird or a bomb, the board should read what the gearbox and its records were saying in the days before the flight.",
      "frame": "Iris Dane thumbs a drive coupling. \"Piasecki's whole machine hung on the gears staying sound under load. So does this one. Show me you respect the drivetrain, and I'll play back what the recorder saw before it quit.\"",
      "q": [
        {
          "q": "Why do tandem rotors turn in opposite directions?",
          "o": [
            {
              "t": "So their torques cancel, freeing all engine power for lift, not a tail rotor.",
              "v": "expert",
              "fb": "Counter-rotation cancels torque and needs no power-robbing tail rotor."
            },
            {
              "t": "So one rotor can stop while the other keeps the aircraft flying steadily.",
              "v": "wrong",
              "fb": "Both must run; they are geared together and cannot fly on one alone."
            },
            {
              "t": "So the front rotor makes the lift while the rear one mainly pushes the craft forward.",
              "v": "wrong",
              "fb": "Both rotors lift; opposite spin is about cancelling torque."
            },
            {
              "t": "So the blades can safely overlap and touch as they pass one another; in use.",
              "v": "partial",
              "fb": "They must never touch; gearing times them so their arcs stay clear."
            }
          ]
        },
        {
          "q": "What is a strength of the tandem-rotor layout?",
          "o": [
            {
              "t": "Heavy lift over a wide range of fore-and-aft center-of-gravity positions.",
              "v": "expert",
              "fb": "Two lifting rotors tolerate big CG shifts, ideal for heavy cargo."
            },
            {
              "t": "Far higher top speed than any single-rotor helicopter can ever reach.",
              "v": "wrong",
              "fb": "Its edge is load and CG range, not outright speed."
            },
            {
              "t": "The ability to fly indefinitely with the drive shaft between rotors severed.",
              "v": "danger",
              "fb": "A severed inter-rotor shaft is catastrophic, not survivable."
            },
            {
              "t": "Needing no gearbox at all, since two rotors balance without any gearing.",
              "v": "partial",
              "fb": "It relies heavily on precise gearing to keep the rotors synchronized."
            }
          ]
        },
        {
          "q": "What does Piasecki's work stress for this inquiry?",
          "o": [
            {
              "t": "The transmission is the most safety-critical assembly and the prime suspect.",
              "v": "expert",
              "fb": "Gears and shafts carry all the load; the drivetrain leads the suspects."
            },
            {
              "t": "The drivetrain is robust enough to be treated as a footnote in any crash.",
              "v": "wrong",
              "fb": "It carries every load and is the first place a rotorcraft fails."
            },
            {
              "t": "That heavy helicopters mainly ever fall to enemy action, rarely to their gears.",
              "v": "danger",
              "fb": "Gear and shaft failures fell helicopters far more often than enemies."
            },
            {
              "t": "That the recorders does not say anything useful about a gearbox in trouble.",
              "v": "partial",
              "fb": "Recorders capture vibration and power data that flag a failing gearbox."
            }
          ]
        }
      ]
    },
    "hx_glauert": {
      "sci": "Hermann Glauert (1892-1934)",
      "topic": "Blade-element & airscrew theory",
      "lede": "The Cambridge mathematician who cut a spinning propeller into slices and taught engineers to add up a rotor blade one strip at a time.",
      "no": 5,
      "profile": "Hermann Glauert was a British aerodynamicist at the Royal Aircraft Establishment whose 1926 book, 'The Elements of Aerofoil and Airscrew Theory,' became a foundational text for a generation of engineers. He refined blade-element theory, the method that complements Betz's broad momentum picture by looking at the fine detail: it treats a rotor or propeller blade as a stack of thin spanwise strips, calculates the lift and drag on each strip from the local airflow and angle of attack, and then sums the strips to find the whole blade's thrust and the torque needed to turn it.\n\nGlauert's genius was to marry this strip-by-strip view with momentum theory, producing blade-element momentum theory — still the workhorse for designing rotors and propellers. He also gave a correction for how a rotor behaves in fast forward flight and analyzed the tricky states a rotor enters when descending through its own wake. His career was cut short in 1934 by a freak accident while he watched the clearing of a tree stump by explosive, an irony not lost on anyone who studies risk.\n\nFor this inquiry, blade-element thinking supplies precision. It explains how much force each part of a blade carries, and therefore how loads concentrate at the blade root and in the hub — exactly the highly stressed regions where fatigue cracks begin. When investigators examine a failed rotor, Glauert's framework lets them work backward from the aerodynamic loads to the stresses the hardware actually saw. It replaces the vague notion that 'the rotor came apart' with a quantitative account of where and why, keeping the board anchored in calculable mechanics rather than the drama of sabotage or the shrug of an act of God.",
      "frame": "The analyst overlays a blade-load curve on the vibration trace. \"Every strip of that blade carries a number. The root carries the most. Show me you understand blade-element loads, and I'll show you where the trace lit up.\"",
      "q": [
        {
          "q": "What does blade-element theory do?",
          "o": [
            {
              "t": "It slices a blade into strips and sums the lift and drag on each of them.",
              "v": "expert",
              "fb": "Strip-by-strip loads are summed to get the whole blade's forces."
            },
            {
              "t": "It treats the rotor as one smooth disc and ignores the blades largely.",
              "v": "wrong",
              "fb": "That is momentum theory; blade-element theory resolves each strip."
            },
            {
              "t": "It measures mainly the noise a blade makes, saying nothing of its forces.",
              "v": "wrong",
              "fb": "It computes aerodynamic forces, not merely acoustic noise."
            },
            {
              "t": "It applies mainly to fixed wings and does not be used on a rotor at all.",
              "v": "partial",
              "fb": "It applies squarely to rotors and propellers, not just fixed wings."
            }
          ]
        },
        {
          "q": "Why combine blade-element and momentum theory?",
          "o": [
            {
              "t": "To join fine blade detail with the overall airflow into one usable method.",
              "v": "expert",
              "fb": "Blade-element momentum theory unites strip loads with the induced flow."
            },
            {
              "t": "To avoid ever having to test a rotor, since theory replaces all testing.",
              "v": "wrong",
              "fb": "Theory guides design; testing still verifies the real rotor."
            },
            {
              "t": "To suggests momentum theory wrong and discard it from rotor design for good.",
              "v": "wrong",
              "fb": "The two are combined, not opposed; each supplies what the other lacks."
            },
            {
              "t": "To compute mainly the engine's fuel burn across a full mission profile.",
              "v": "partial",
              "fb": "It yields thrust and torque; fuel burn is a downstream calculation."
            }
          ]
        },
        {
          "q": "How does Glauert's method serve the investigation?",
          "o": [
            {
              "t": "It maps where blade loads concentrate — the root and hub where cracks start.",
              "v": "expert",
              "fb": "Load concentration reveals the stressed spots where fatigue begins."
            },
            {
              "t": "It shows rotors mainly ever fail from a strike, rarely from internal stress.",
              "v": "danger",
              "fb": "It quantifies internal stress, the very thing that seeds fatigue cracks."
            },
            {
              "t": "It suggests any breakup in clear air is an unexplainable act of God.",
              "v": "danger",
              "fb": "It gives a calculable account of loads, the opposite of unexplainable."
            },
            {
              "t": "It replaces the recorders, so the flight data need not ever be examined at all.",
              "v": "partial",
              "fb": "It interprets the loads behind the data; it does not replace the record."
            }
          ]
        }
      ]
    },
    "hx_gearlewis": {
      "sci": "Wilfred Lewis (1854-1929)",
      "topic": "The gear-tooth strength equation",
      "lede": "The Philadelphia engineer who first treated a single gear tooth as a tiny cantilever beam — and gave designers a way to predict when it breaks.",
      "no": 6,
      "profile": "Wilfred Lewis was an American mechanical engineer whose 1892 analysis of gear teeth gave the field its first rational strength formula. Working in an era when gears were sized by rule of thumb and hard experience, Lewis modeled a loaded gear tooth as a cantilever beam — fixed at its base and pushed at its tip by the force from the meshing tooth of the mating gear. From this he derived the Lewis equation, relating the bending stress at the root of a tooth to the transmitted load, the tooth size, and the tooth's shape. Designers could finally calculate whether a tooth would carry its load or crack at the root.\n\nThe root of the tooth is the critical spot: it is where the bending stress is highest and where the geometry concentrates stress, so it is where fatigue cracks nucleate under the pounding of millions of mesh cycles. Lewis's insight, later refined with stress-concentration factors and dynamic-load corrections by others, remains the backbone of gear design. A helicopter transmission is a stack of exactly such gears, reducing high engine speed to rotor speed while multiplying torque enormously — meaning very large forces on those tooth roots, cycle after cycle.\n\nFor this inquiry, the Lewis equation names a specific failure mode the board must weigh. A gear tooth overstressed or fatigued at its root can crack and eventually break away; the liberated fragment then becomes a hard metal chip circulating in the oil, and a broken tooth throws the gear out of true, spiking vibration and shedding more debris. Metal chips in a gearbox are not random grit — they are the fingerprint of teeth or bearings failing exactly where Lewis said the stress is worst. That fingerprint is logged, dated, and impossible to blame on a bird or a gust.",
      "frame": "The clerk slides over a chip-detector report. \"Lewis showed a gear tooth breaks at its root, and the root sheds metal into the oil. We caught metal in this oil — more than once. Show me you know why, and the dates are yours.\"",
      "q": [
        {
          "q": "How did Lewis model a loaded gear tooth?",
          "o": [
            {
              "t": "As a cantilever beam, fixed at its base and pushed at its tip by the load.",
              "v": "expert",
              "fb": "The cantilever model gave the first rational gear-tooth stress formula."
            },
            {
              "t": "As a rigid block that does not bend, so its shape does not affect its strength.",
              "v": "wrong",
              "fb": "He treated it as a bending beam; tooth shape is central to the result."
            },
            {
              "t": "As a spring that stores and returns all the energy of each mesh unharmed.",
              "v": "wrong",
              "fb": "He analyzed bending stress and failure, not energy storage."
            },
            {
              "t": "As a fluid film, since gear strength is really set by the oil between teeth.",
              "v": "partial",
              "fb": "Lubrication matters, but Lewis addressed the tooth's bending strength."
            }
          ]
        },
        {
          "q": "Where does a gear tooth tend to crack?",
          "o": [
            {
              "t": "At the root, where bending stress is highest and stress concentrates.",
              "v": "expert",
              "fb": "The root is the peak-stress site where fatigue cracks begin."
            },
            {
              "t": "At the very tip, which carries the load and so wears away the fastest.",
              "v": "wrong",
              "fb": "The tip sees contact, but bending stress peaks at the root."
            },
            {
              "t": "At the exact center of the tooth face, equidistant from tip and root.",
              "v": "wrong",
              "fb": "The center is not the peak-stress point; the root is."
            },
            {
              "t": "Nowhere, since a properly cut tooth has no single weak spot at all.",
              "v": "partial",
              "fb": "Even a good tooth has a peak-stress root that limits its fatigue life."
            }
          ]
        },
        {
          "q": "What do metal chips in the gearbox oil signify?",
          "o": [
            {
              "t": "Teeth or bearings failing at their high-stress spots and shedding debris.",
              "v": "expert",
              "fb": "Chips are the fingerprint of internal fatigue, dated in the record."
            },
            {
              "t": "Ordinary road grit that entered the oil and means nothing about the gears.",
              "v": "wrong",
              "fb": "Hard metal chips come from the gears themselves, not outside grit."
            },
            {
              "t": "Proof that a bird or saboteur put foreign metal into the machine's oil.",
              "v": "danger",
              "fb": "The chips are shed by the gearbox's own failing parts, not planted."
            },
            {
              "t": "A harmless sign the oil is fresh, since new oil generally carries fine metal.",
              "v": "partial",
              "fb": "Recurring chips signal wear or cracking, not healthy fresh oil."
            }
          ]
        }
      ]
    },
    "hx_stribeck": {
      "sci": "Richard Stribeck (1861-1950)",
      "topic": "Bearing friction & lubrication",
      "lede": "The German engineer who charted how a film of oil, thick enough, lifts steel clear off steel — and how thin it must get before metal grinds on metal.",
      "no": 7,
      "profile": "Richard Stribeck was a German engineer who, around the turn of the twentieth century, ran systematic experiments on friction in lubricated bearings and produced the curve that bears his name. The Stribeck curve plots friction against a combination of the oil's viscosity, the sliding speed, and the load, and it reveals three distinct regimes. At low speed or high load the surfaces touch through the oil in 'boundary' lubrication, and friction and wear are high. As speed rises, a partial film forms in the 'mixed' regime. At sufficient speed a full film develops — 'hydrodynamic' lubrication — where the moving surfaces ride on a wedge of pressurized oil and never touch, and both friction and wear plummet.\n\nStribeck's work explained why proper lubrication is not a nicety but the very thing that keeps highly loaded parts from destroying themselves. A helicopter gearbox and its bearings are designed to run in that full-film regime, gears and races separated by a microscopically thin but crucial layer of oil. Lose the film — through low oil, contamination, overheating, or a failing pump — and the components drop into boundary contact, where metal scuffs metal, temperature spikes, and wear accelerates catastrophically.\n\nFor this inquiry, Stribeck's regimes explain how a gearbox fault feeds on itself. Once spalling debris contaminates the oil or a bearing begins to break down, the protective film degrades, friction and heat climb, and wear that was gradual turns rapid — a downward spiral that shows up as rising oil temperature and metal in the filters. This is a self-accelerating mechanical failure, entirely internal, entirely foreseeable from the instruments. It is neither an act of God nor an attack; it is lubrication physics running out of margin, and the gauges were recording every step.",
      "frame": "Iris Dane holds up an oil filter caked with fines. \"Stribeck showed the whole machine floats on a film of oil thinner than a hair. Let that film go and metal eats metal. Show me you get lubrication, and the oil temps' story is yours.\"",
      "q": [
        {
          "q": "What does the Stribeck curve describe?",
          "o": [
            {
              "t": "How friction shifts across boundary, mixed, and full-film lubrication regimes.",
              "v": "expert",
              "fb": "It maps friction versus speed, load, and viscosity across three regimes."
            },
            {
              "t": "How an engine's fuel burn changes with the throttle setting in cruise.",
              "v": "wrong",
              "fb": "It concerns lubrication friction, not fuel consumption."
            },
            {
              "t": "How a metal's strength falls as its temperature climbs toward melting.",
              "v": "wrong",
              "fb": "That is thermal softening; Stribeck's curve is about lubricated friction."
            },
            {
              "t": "How thick an oil film would be to stop a loaded bearing from ever wearing at all.",
              "v": "partial",
              "fb": "Viscosity is one axis, but the curve maps friction regimes, not a no-wear oil."
            }
          ]
        },
        {
          "q": "What is hydrodynamic (full-film) lubrication?",
          "o": [
            {
              "t": "Surfaces ride on a pressurized oil wedge and never actually touch metal.",
              "v": "expert",
              "fb": "A full film separates the parts, dropping friction and wear sharply."
            },
            {
              "t": "The oil is fully burned away, leaving dry metal that runs cool and clean.",
              "v": "wrong",
              "fb": "Full-film means an intact oil layer, not burned-off dry metal."
            },
            {
              "t": "The two surfaces weld together so firmly that they can rarely slide apart.",
              "v": "wrong",
              "fb": "They ride apart on oil; welding is a failure, not the goal."
            },
            {
              "t": "The bearing runs on grease alone, with no flowing oil film needed at all.",
              "v": "partial",
              "fb": "Some bearings use grease, but full-film means a load-bearing oil layer."
            }
          ]
        },
        {
          "q": "How does lubrication physics explain a gearbox's decline?",
          "o": [
            {
              "t": "Debris and heat break the film, so wear self-accelerates — a foreseeable spiral.",
              "v": "expert",
              "fb": "A lost film means metal-on-metal; the failure feeds on itself, on the gauges."
            },
            {
              "t": "The film is unbreakable, so a lubricated gearbox does not fail from within.",
              "v": "wrong",
              "fb": "The film can and does break down, driving rapid internal wear."
            },
            {
              "t": "Rising oil temperature can mainly come from a fire someone deliberately set.",
              "v": "danger",
              "fb": "Degrading lubrication raises oil temperature with no fire or sabotage."
            },
            {
              "t": "Oil temperature tells the board nothing at all, since gauges are too crude to trust.",
              "v": "partial",
              "fb": "Oil temperature and debris are exactly the trustworthy signs of decline."
            }
          ]
        }
      ]
    },
    "hx_lcf": {
      "sci": "Louis F. Coffin (1917-1990)",
      "topic": "Low-cycle fatigue",
      "lede": "The General Electric researcher who showed that a part strained hard enough will die not after millions of cycles, but after only a few thousand.",
      "no": 8,
      "profile": "Louis F. Coffin was an American engineer and researcher at General Electric who, in the 1950s, transformed the understanding of fatigue at high stress. Classical fatigue theory dealt with 'high-cycle' fatigue: small stresses, well within the elastic range, that a part survives for millions of cycles. Coffin studied the opposite corner — 'low-cycle' fatigue, where each cycle strains the metal beyond its yield point into plastic (permanent) deformation. He showed that in this regime the life is governed not by stress but by the range of plastic strain per cycle, and that the number of cycles to failure follows a clean power law against that plastic strain.\n\nThis result, developed in parallel with S. S. Manson and now called the Coffin-Manson relation, is one of the pillars of modern durability engineering. It explains why heavily loaded components — turbine discs, pressure vessels, and the most punished parts of a gearbox — can fail after only thousands or tens of thousands of cycles when the local strain is severe, especially at stress concentrations like a gear root or a keyway where plastic yielding is unavoidable.\n\nFor this inquiry, Coffin's work sets the timescale of the hazard. A helicopter gearbox part working near its limit, or one already weakened by spalling or a manufacturing defect that pushes local strain into the plastic range, is on a low-cycle-fatigue clock — a finite, countable number of load reversals before a crack forms and grows. Every flight spends cycles that cannot be recovered. When a manufacturer or operator sets an inspection or replacement interval, it is precisely to catch such a part before it exhausts its cycles. Deferring that action does not extend the part's life; it simply flies it deeper into a debt that Coffin's mathematics says must eventually be paid.",
      "frame": "The analyst lays out a cycle count beside the maintenance interval. \"Coffin proved a hard-strained part has a countable number of cycles in it — then it's done. This part had a limit and a due date. Show me you understand low-cycle fatigue, and I'll show you how far past due it flew.\"",
      "q": [
        {
          "q": "What distinguishes low-cycle fatigue from high-cycle fatigue?",
          "o": [
            {
              "t": "Each cycle strains the metal past yield, so it fails in far fewer cycles.",
              "v": "expert",
              "fb": "Plastic straining each cycle drives failure in thousands, not millions."
            },
            {
              "t": "It happens mainly at very high frequency, when a part vibrates extremely fast.",
              "v": "wrong",
              "fb": "It is about high strain per cycle, not the frequency of cycling."
            },
            {
              "t": "It affects mainly cold parts, since heat removes the risk of fatigue largely.",
              "v": "wrong",
              "fb": "Temperature can worsen it; the defining trait is plastic strain per cycle."
            },
            {
              "t": "It requires corrosion to be present before any cracking can begin at all.",
              "v": "partial",
              "fb": "Corrosion can accelerate fatigue, but low-cycle fatigue is defined by plastic strain."
            }
          ]
        },
        {
          "q": "What governs life in the low-cycle regime?",
          "o": [
            {
              "t": "The range of plastic strain per cycle, by the Coffin-Manson power law.",
              "v": "expert",
              "fb": "Plastic strain range sets the cycles to failure in this regime."
            },
            {
              "t": "The single peak stress, exactly as in ordinary high-cycle fatigue design.",
              "v": "wrong",
              "fb": "Here plastic strain, not peak stress, governs the life."
            },
            {
              "t": "The total running time in hours, regardless of how the part was loaded.",
              "v": "wrong",
              "fb": "It is load reversals and their strain, not clock hours, that count."
            },
            {
              "t": "The color of the metal, which reveals how many cycles it can still take.",
              "v": "partial",
              "fb": "Discoloration may hint at heat, but strain range governs the life."
            }
          ]
        },
        {
          "q": "What does low-cycle fatigue say about deferring an inspection?",
          "o": [
            {
              "t": "Cycles cannot be recovered, so deferral only flies the part deeper into debt.",
              "v": "expert",
              "fb": "Intervals catch a part before its cycles run out; deferral spends more."
            },
            {
              "t": "Deferral is harmless, since a rested part regains the cycles it has used.",
              "v": "wrong",
              "fb": "Fatigue cycles are permanent; rest does not restore them."
            },
            {
              "t": "A part past its interval fails mainly if a bird or saboteur strikes it first.",
              "v": "danger",
              "fb": "It fails on its own fatigue clock, needing no strike at all."
            },
            {
              "t": "The interval is arbitrary paperwork, so flying past it changes nothing real.",
              "v": "partial",
              "fb": "Intervals are set to the fatigue life; passing them raises real risk."
            }
          ]
        }
      ]
    },
    "hx_vibration": {
      "sci": "J. P. Den Hartog (1901-1989)",
      "topic": "Mechanical vibration & resonance",
      "lede": "The Dutch-American professor whose textbook taught the world that every machine has a note it must never be allowed to sing.",
      "no": 9,
      "profile": "Jacob Pieter Den Hartog was a Dutch-American engineer and MIT professor whose 1934 book 'Mechanical Vibrations' became the definitive teaching text on the subject for decades. He gave engineers a clear, physical grasp of how machines shake: every structure has natural frequencies at which it prefers to vibrate, and if a periodic force — say, from a rotating shaft or a meshing gear — happens to match one of those frequencies, the response grows dramatically. That amplification is resonance, and at resonance even a modest force can produce destructively large motions.\n\nDen Hartog also explained the tools engineers use to fight vibration: damping to bleed energy away, tuning to keep forcing frequencies clear of natural ones, and devices like the dynamic vibration absorber that cancel an unwanted oscillation. Crucially for diagnostics, he showed that a machine's vibration has structure — specific frequencies tied to specific rotating parts. A bearing defect, a cracked gear tooth, or an unbalanced shaft each produces a characteristic frequency signature, so the spectrum of a machine's vibration is effectively a readout of its internal health.\n\nFor this inquiry, Den Hartog is why the recorders can testify. A helicopter's structure and drivetrain are dense with rotating parts, each with a signature frequency, and modern rotorcraft carry health-monitoring systems built on exactly his principles. A failing gear or bearing raises the amplitude at its own telltale frequency long before it breaks — a rising line on a spectrum that engineers can name and date. When the flight-data analyst says the vibration was 'screaming before the rotor let go,' Den Hartog's science is what turns that scream into specific, attributable evidence: not a random shudder, but the identified voice of a particular part tearing itself apart on a schedule.",
      "frame": "The clerk sets down a spectral plot with one line climbing. \"Den Hartog taught that every rotating part has its own note, and a dying one sings louder. This note was rising for weeks. Show me you read vibration, and I'll show you when it was first logged.\"",
      "q": [
        {
          "q": "What is mechanical resonance?",
          "o": [
            {
              "t": "When a forcing frequency matches a natural one, the vibration grows sharply.",
              "v": "expert",
              "fb": "At resonance even a small force drives destructively large motion."
            },
            {
              "t": "When a machine is struck once and rings briefly before falling silent; in use.",
              "v": "wrong",
              "fb": "That is a transient; resonance is sustained amplification at a matched frequency."
            },
            {
              "t": "When friction slowly heats a spinning part until it warps clear out of its true shape.",
              "v": "wrong",
              "fb": "That is thermal distortion, not resonance."
            },
            {
              "t": "When a shaft spins so fast that it flings its bearings apart by force; in use.",
              "v": "partial",
              "fb": "Overspeed is one hazard, but resonance is frequency matching, not raw speed."
            }
          ]
        },
        {
          "q": "Why does a machine's vibration spectrum reveal its health?",
          "o": [
            {
              "t": "Each rotating part has a signature frequency, so faults show at known lines.",
              "v": "expert",
              "fb": "A defect raises its own telltale frequency, naming the failing part."
            },
            {
              "t": "Because all faults produce the same single tone, easy to hear but not place.",
              "v": "wrong",
              "fb": "Different parts show at different frequencies; that is what locates the fault."
            },
            {
              "t": "Because vibration appears mainly after a part has already fully broken apart.",
              "v": "wrong",
              "fb": "It rises well before final failure, giving early warning."
            },
            {
              "t": "Because louder machines are generally healthier than quiet ones in service.",
              "v": "partial",
              "fb": "Rising amplitude at a fault frequency signals trouble, not health."
            }
          ]
        },
        {
          "q": "How does Den Hartog's science serve this board?",
          "o": [
            {
              "t": "It turns a rising vibration line into the named, dated voice of one part.",
              "v": "expert",
              "fb": "The spectrum attributes the trouble to a specific, failing component."
            },
            {
              "t": "It suggests a shaking helicopter would have been struck from outside in flight.",
              "v": "danger",
              "fb": "Internal faults raise vibration with no external strike involved."
            },
            {
              "t": "It shows vibration is random noise that no analysis can ever attribute.",
              "v": "wrong",
              "fb": "Vibration is structured by frequency and is highly attributable."
            },
            {
              "t": "It lets the board skip the recorders and judge the case by the weather.",
              "v": "partial",
              "fb": "The recorders supply the very spectrum his science interprets."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "hx_mechanic": {
      "hx_rotor": "Iris Dane meets you inside the gearbox bay, a magnetic chip plug furred with grey metal in her palm. \"I pulled this off the sump myself, more than once. I flagged it every time. Show me you know your rotorcraft, and what happened to those flags is yours.\"",
      "hx_cabin": "Dane leans in the cockpit doorway, uneasy among the recorder gear. \"I bolt the parts on; I don't read the traces. But I can tell you the numbers on those screens started as chips in my hand. Know your machine, and I'll connect them for you.\"",
      "hx_office": "Dane stands stiffly in the operator's office, out of place without a wrench. \"This is where my write-ups came to die. I signed what I found; someone here signed it away. Prove you understand the mechanics, and I'll tell you whose desk they crossed.\""
    },
    "hx_analyst": {
      "hx_rotor": "The flight-data analyst crouches by the wreckage of the gearbox, tablet balanced on a knee. \"Everything I plot began right here, as steel grinding on steel. Show me you understand the rotor, and I'll show you where my trace and this metal agree.\"",
      "hx_cabin": "The analyst has the recorders open on three screens. \"The vibration was screaming a warning long before the rotor let go — I can show you the exact line climbing. Convince me you can read it, and we'll read it together.\"",
      "hx_office": "The analyst spreads printouts across the operator's desk. \"My traces match the dates in this room's paperwork almost to the flight. Someone saw the same rising line I did and filed it under 'later.' Show me you grasp the physics, and I'll point to when.\""
    },
    "hx_clerk": {
      "hx_rotor": "The clerk picks a careful path through the gearbox bay, ledger clutched tight. \"I don't turn wrenches, but I know every part number that came through here — and which kept coming back. Show me you understand the machine, and the book's record is yours.\"",
      "hx_cabin": "The clerk studies the recorder readouts warily. \"Those instruments and my logbook tell the same story from two ends. I kept the entries; I know what they were warned about. Prove you can read the data, and I'll open the pages that matter.\"",
      "hx_office": "In the maintenance office the clerk finally stops moving, one hand flat on the tech log. \"This is my room, and this book holds the whole truth of it — the flag, the deferral, and the name at the bottom. Show me you understand what a life limit means, and I'll turn to the signature.\""
    }
  },
  "story": [
    "The charter helicopter was three minutes from the ridgeline pad, in air so clear the passengers were photographing the peaks, when it dropped from level flight and struck the mountain. There was no distress call worth the name — only a rising note on the recorders and then silence. You are <b>Investigator Cole Aldith</b>, and the Ridgeline inquiry has been handed to you with the whole valley, the operator, and the newspapers watching to see what you will call it.",
    "<b>Three insiders will talk</b>, each holding a piece but no one holding all of it. <b>Mechanic Iris Dane</b>, who turns the wrenches and kept pulling metal out of the gearbox sump. <b>The Flight-Data Analyst</b>, who reads the recorders and watched a vibration trace climb toward a scream. And <b>the Clerk</b>, who keeps the tech log and knows which flagged part kept flying. Earn their trust and they will talk.",
    "<b>Someone here is behind it.</b> Three names sit in your notepad: <b>Rourke Vane</b>, the charter-fleet operator who owned the schedule and the maintenance budget; the <b>command pilot</b>, who flew the machine into the ridge; and the <b>aviation-safety inspector</b>, who was meant to be watching. Every column — <b>who</b> is behind it, <b>where</b> it culminates, and <b>what</b> truly happened — conceals a plausible trap. The cameras want <b>a bird strike or sabotage</b>. The easy file wants <b>a freak mountain gust, an act of God</b>. The truth is narrower than the first and graver than the second — and it was written down before the rotor ever turned that morning.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and decide the <b>WHAT</b> from the evidence."
  ],
  "endings": {
    "overclaimWhat": "hx_strike",
    "dismissalWhat": "hx_gust",
    "win": {
      "expertTitle": "What the Logbook Proves, and No More",
      "expert": [
        "Aldith names it exactly: Rourke Vane, the charter-fleet operator, who owned the schedule and the maintenance budget and kept signing the deferral; the truth culminating in the Operator's Maintenance Office, where the flagged findings and the deferred inspection live in the tech log; and a deferred gearbox flaw flown past its warning — a spalling bearing that shed metal and screamed on the vibration trace for weeks before it seized. Not a bird. Not a saboteur. Not the mountain wind.",
        "Every card accounted for. Aldith worked the gearbox bay, the recorders, and the maintenance office, turned a frightened mechanic and a careful clerk into witnesses, and claimed precisely what the chips, the traces, and the signed-off deferrals could defend. The inquiry grounds the fleet and closes the gap that let a life-limited part keep flying — which is the whole point of doing it right."
      ],
      "soundTitle": "Right — but Lightly Proven",
      "sound": [
        "Aldith names the right three — Vane, the Maintenance Office, and a deferred gearbox flaw flown past its warning. The shape of the case is correct, and the refusal to cry sabotage or blame the weather is exactly right.",
        "But too many threads were left loose, and Vane's lawyers will pull at them. A few more days tying the chip-detector findings to the specific deferral and the name that signed it would have made the finding unassailable. Close and honest, if not yet airtight."
      ],
      "namedTitle": "The Right Answer, Unearned",
      "named": [
        "Aldith names the truth — Vane, the Maintenance Office, the deferred gearbox flaw — but gathered too little to back it. It reads like a hunch that happened to land.",
        "The inquiry cannot ground a fleet on an accusation this thin, however correct. Being right is not the same as being able to prove it to the operator who will fight every word of the finding."
      ]
    },
    "overclaim": {
      "title": "The Inquiry That Cried Sabotage",
      "body": [
        "Aldith reports a bird strike or deliberate sabotage — the answer the cameras were already broadcasting. It is vivid, and it is not what the evidence shows.",
        "There was no impact debris in the rotor, no tampering, no bird remains — only a gearbox that had been shedding metal into its own oil and climbing on the vibration trace for weeks, with the warnings deferred in the log. When the sabotage story collapses, it takes credibility with it, and the real, provable failure is dismissed as one more conspiracy theory. The only saboteur was a spalling bearing and an operator who kept flying it."
      ]
    },
    "dismissal": {
      "title": "Case Closed on the Weather",
      "body": [
        "Aldith files it as a freak mountain gust — an act of God, nobody's fault, close the file. It is the easy answer and it is wrong.",
        "The rotor system is built to ride the gusts found on any ridge, and the recorders show no upset from turbulence — they show a gearbox tearing itself apart on a rising vibration line that began long before the flight. Blaming the wind leaves the same deferred flaw in every other machine in the fleet, waiting for the next clear morning. The inquiry saw an act of God and never the metal in the sump or the signature in the log."
      ]
    },
    "wrongNames": {
      "title": "So Close",
      "body": [
        "Aldith has the nature of it cold — a deferred gearbox flaw flown past its warning, a bearing that shed metal and screamed for weeks, neither a strike nor the weather. But the finger lands on the wrong name or the wrong room."
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A helicopter rotor and failing gearbox\"><path d=\"M180 74 C208 48,276 44,326 64 L382 64 L412 82 L322 88 L262 102 L196 96 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.6\"/><path d=\"M286 56 V28 M190 28 H382\" stroke=\"#121212\" stroke-width=\"1.7\"/><circle cx=\"286\" cy=\"64\" r=\"16\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"2\"/><path d=\"M276 54 L296 74 M296 54 L276 74\" stroke=\"#B3261E\" stroke-width=\"2\"/><path d=\"M424 82 L514 70 L540 82 L514 94 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M90 112 C210 102,340 120,470 108 S580 104,640 112\" fill=\"none\" stroke=\"#326891\" stroke-width=\"1.3\"/></svg>"
}};
