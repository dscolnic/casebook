// Casebook V3 — three informants, three readings, one clue per correct answer.
module.exports = { PACK: {
  "schemaVersion": 3,
  "mode": "three_informants_three_readings",
  "id": "m_heli",
  "title": "The Ridgeline Rotor",
  "discipline": "Rotorcraft & Aeromechanics",
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
  "teaser": "A charter helicopter loses rotor drive over a ridge after weeks of rising vibration and metal debris. Was a bird or saboteur responsible, did a mountain gust make recovery impossible, or did the fleet operator keep a fatigued gearbox in service after its own warnings?",
  "overclaimTag": "a bird strike or deliberate rotor damage",
  "truthTag": "a deferred gearbox failure flown beyond warning",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A helicopter gearbox with rising vibration and metal debris\"><path d=\"M120 72 h140\" stroke=\"#121212\" stroke-width=\"5\"/><circle cx=\"190\" cy=\"72\" r=\"26\" fill=\"none\" stroke=\"#326891\" stroke-width=\"3\"/><path d=\"M190 46 v52 M164 72 h52\" stroke=\"#e2e2d8\" stroke-width=\"2\"/><path d=\"M260 72 h120\" stroke=\"#121212\" stroke-width=\"6\"/><g fill=\"#B3261E\"><circle cx=\"315\" cy=\"58\" r=\"4\"/><circle cx=\"337\" cy=\"82\" r=\"5\"/><circle cx=\"360\" cy=\"62\" r=\"3\"/></g><path d=\"M430 104 C455 90,480 96,505 66 S555 62,590 30\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"3\"/></svg>",
  "overclaimTease": "Rotor loss can look instantaneous even when its gearbox has been writing a long warning. Match debris, bearing life, vibration harmonics, and the deferral record.",
  "DAYS_TOTAL": 3,
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "hx_operator",
      "items": [
        {
          "id": "hx_pilot",
          "label": "The command pilot"
        },
        {
          "id": "hx_regulator",
          "label": "The aviation-safety inspector"
        },
        {
          "id": "hx_operator",
          "label": "Rourke Vane — charter-fleet operator"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "hx_office",
      "items": [
        {
          "id": "hx_office",
          "label": "The Operator’s Maintenance Office"
        },
        {
          "id": "hx_cabin",
          "label": "The Cockpit & Flight Recorders"
        },
        {
          "id": "hx_rotor",
          "label": "The Rotor Head & Gearbox Bay"
        }
      ]
    },
    "what": {
      "title": "What happened",
      "truth": "hx_gearbox",
      "items": [
        {
          "id": "hx_strike",
          "label": "An outside strike or deliberate act damaged the rotor system"
        },
        {
          "id": "hx_gust",
          "label": "A severe mountain gust defeated an otherwise serviceable aircraft"
        },
        {
          "id": "hx_gearbox",
          "label": "Progressive gearbox fatigue was deferred beyond repeated warnings"
        }
      ]
    }
  },
  "READING_ORDER": [
    "hx_mechanic",
    "hx_analyst",
    "hx_clerk"
  ],
  "CHARACTERS": {
    "hx_mechanic": {
      "name": "Mechanic Iris Dane",
      "role": "Line mechanic",
      "face": "🔧",
      "badge": "M",
      "legend": "the gearbox bay",
      "hint": "Repeated chip-detector findings and a bearing replacement recommendation remained open before the flight.",
      "reading": "hx_sikorsky"
    },
    "hx_analyst": {
      "name": "The Flight-Data Analyst",
      "role": "Flight-recorder analyst",
      "face": "📈",
      "badge": "F",
      "legend": "the vibration trace",
      "hint": "Gear-mesh and bearing harmonics rose across flights before rotor speed collapsed without an external impact spike.",
      "reading": "hx_bearing"
    },
    "hx_clerk": {
      "name": "The Maintenance Records Clerk",
      "role": "Fleet maintenance clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the deferral archive",
      "hint": "The operator renewed the deferral twice and assigned the aircraft despite the escalating vibration criterion.",
      "reading": "hx_vibration"
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
            },
            {
              "t": "To cancel the engine torque that would otherwise spin the fuselage around.",
              "v": "expert",
              "fb": "The tail rotor's side thrust balances main-rotor torque and steers yaw."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "Sikorsky’s common transmission path rules out the pilot as the origin of a simultaneous main- and tail-rotor drive loss; the unresolved mechanical warnings belong to fleet maintenance authority."
          }
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
              "t": "That tethered hovering was practical, but free helicopter flight remained unworkable.",
              "v": "wrong",
              "fb": "The VS-300 flew free in 1940; tethering was only an early test stage."
            },
            {
              "t": "A jet-driven rotor tip, the one arrangement that removed all torque problems.",
              "v": "partial",
              "fb": "Tip-drive rotors exist, but Sikorsky's answer was a shaft and tail rotor."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The configuration directs the investigation from visible rotor blades into the gearbox bay and then to the office controlling its continued service."
          }
        },
        {
          "q": "Why does Sikorsky's layout matter to this crash?",
          "o": [
            {
              "t": "Because a single rotor can mainly fail if something strikes it from outside.",
              "v": "danger",
              "fb": "Rotors fail from within too; internal wear needs no external strike."
            },
            {
              "t": "Because engine, main rotor, and tail rotor all run through one gearbox.",
              "v": "expert",
              "fb": "That single transmission is where the whole machine's load concentrates."
            },
            {
              "t": "Because the tail rotor carries the lift, so it is the primary part worth checking.",
              "v": "wrong",
              "fb": "The main rotor lifts; both draw from the same gearbox worth checking."
            },
            {
              "t": "Because the design is so old that modern faults simply does not occur in it.",
              "v": "partial",
              "fb": "The layout is proven, not immune; its gearbox still wears and fails."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "Because engine, main rotor, and tail rotor share the transmission, their simultaneous loss is explained by gearbox failure rather than a local bird strike or gust."
          }
        }
      ]
    },
    "hx_bearing": {
      "sci": "Arvid Palmgren (1890-1971)",
      "topic": "Rolling-bearing fatigue life",
      "lede": "The Swedish engineer who spent a career at SKF turning the lifespan of a ball bearing from a guess into a number.",
      "no": 2,
      "profile": "Arvid Palmgren was a Swedish engineer who spent his career at the bearing manufacturer SKF and did more than anyone to make rolling-bearing life predictable. He recognized that even a perfectly made, well-lubricated bearing does not last forever: as its balls or rollers repeatedly press on the raceways, the contact stresses just below the surface eventually initiate tiny cracks that grow and flake off material — a fatigue failure called spalling. Palmgren showed this life is statistical, and his work underpins the 'L10 life,' the number of revolutions ninety percent of a batch of bearings will survive.\n\nHe also co-authored the linear cumulative-damage rule, often called the Palmgren-Miner rule: the idea that a part accumulates fatigue damage as a running total across all the different load levels it experiences, and fails when that total reaches one. It let engineers add up damage from a mix of hard and easy operating cycles to estimate remaining life. Together, his contributions made bearing selection and maintenance planning a quantitative discipline rather than folklore.\n\nFor this inquiry, Palmgren's science is the key to the gearbox's warning. A spalling bearing sheds hard metal flakes into the oil — the very chips a chip detector catches — and its rising vibration signature announces the damage long before final failure. Because fatigue accumulates, a bearing flagged with early spalling does not heal; it marches steadily toward seizure with every hour flown. Palmgren's rule means that continuing to fly a bearing already shedding metal is not a gamble against random chance but a countdown against a rising damage total. The board can therefore read the chip and vibration record as a clock that was ticking — and ask who chose to keep flying while it ran down.",
      "frame": "The clerk taps a vibration log. \"Palmgren proved a bearing sheds metal and buzzes louder as it dies — and the damage only ever adds up. This one was talking for weeks. Show me you understand fatigue life, and I'll tell you who kept flying it.\"",
      "q": [
        {
          "q": "What is a rolling bearing's dominant failure mode?",
          "o": [
            {
              "t": "Sudden melting when friction heats the bearing past its metal's limit.",
              "v": "wrong",
              "fb": "The dominant mode is fatigue spalling, not melting."
            },
            {
              "t": "Chemical corrosion that dissolves the balls the moment the oil turns acidic.",
              "v": "wrong",
              "fb": "Corrosion can occur, but classic bearing failure is fatigue spalling."
            },
            {
              "t": "Subsurface fatigue that flakes material from the raceways, called spalling.",
              "v": "expert",
              "fb": "Repeated contact stress spalls the raceway — the classic fatigue failure."
            },
            {
              "t": "A single overload on installation that cracks the race on its first turn.",
              "v": "partial",
              "fb": "Overload can dent a race, but fatigue spalling is the usual life-limiter."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "Palmgren’s bearing-life logic fits the repeated metal particles and cumulative cycles, showing progressive fatigue rather than one unforeseeable atmospheric event."
          }
        },
        {
          "q": "What does the Palmgren-Miner rule say about fatigue damage?",
          "o": [
            {
              "t": "Damage resets to zero each time the machine is switched off and cooled.",
              "v": "wrong",
              "fb": "Fatigue damage accumulates; rest does not undo it."
            },
            {
              "t": "Mainly the single hardest load a part ever sees decides when it will fail.",
              "v": "wrong",
              "fb": "All cycles contribute; the rule sums damage across load levels."
            },
            {
              "t": "Damage grows mainly above a certain stress threshold and can be safely ignored below it.",
              "v": "partial",
              "fb": "There is a fatigue limit for some steels, but damage still accumulates in service."
            },
            {
              "t": "Damage adds up across all load cycles, and failure comes when the total hits one.",
              "v": "expert",
              "fb": "Cumulative damage sums over every cycle until it reaches the limit."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "Chip records and bearing inspection measurements converge in the rotor-head and gearbox bay, where the damaged race and spalling are recovered."
          }
        },
        {
          "q": "How does Palmgren's science read the gearbox record?",
          "o": [
            {
              "t": "Chips and rising vibration are a clock counting down to seizure, not luck.",
              "v": "expert",
              "fb": "A flagged bearing marches toward failure; the record is a ticking clock."
            },
            {
              "t": "A shedding bearing may heal itself, so flying it on is a fair gamble.",
              "v": "wrong",
              "fb": "Fatigue does not heal; the damage total only rises with each hour."
            },
            {
              "t": "Metal in the oil strongly suggests a bird or saboteur breached the sealed gearbox.",
              "v": "danger",
              "fb": "A spalling bearing sheds its own metal; nothing was breached."
            },
            {
              "t": "Vibration data are meaningless, so mainly the final teardown can tell anything.",
              "v": "partial",
              "fb": "Vibration signatures flag bearing damage well before any teardown."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The calculated life and recurring debris were delivered to the fleet operator, whose deferral kept the bearing in service after the maintenance threshold."
          }
        }
      ]
    },
    "hx_vibration": {
      "sci": "J. P. Den Hartog (1901-1989)",
      "topic": "Mechanical vibration & resonance",
      "lede": "The Dutch-American professor whose textbook taught the world that every machine has a note it must never be allowed to sing.",
      "no": 3,
      "profile": "Jacob Pieter Den Hartog was a Dutch-American engineer and MIT professor whose 1934 book 'Mechanical Vibrations' became the definitive teaching text on the subject for decades. He gave engineers a clear, physical grasp of how machines shake: every structure has natural frequencies at which it prefers to vibrate, and if a periodic force — say, from a rotating shaft or a meshing gear — happens to match one of those frequencies, the response grows dramatically. That amplification is resonance, and at resonance even a modest force can produce destructively large motions.\n\nDen Hartog also explained the tools engineers use to fight vibration: damping to bleed energy away, tuning to keep forcing frequencies clear of natural ones, and devices like the dynamic vibration absorber that cancel an unwanted oscillation. Crucially for diagnostics, he showed that a machine's vibration has structure — specific frequencies tied to specific rotating parts. A bearing defect, a cracked gear tooth, or an unbalanced shaft each produces a characteristic frequency signature, so the spectrum of a machine's vibration is effectively a readout of its internal health.\n\nFor this inquiry, Den Hartog is why the recorders can testify. A helicopter's structure and drivetrain are dense with rotating parts, each with a signature frequency, and modern rotorcraft carry health-monitoring systems built on exactly his principles. A failing gear or bearing raises the amplitude at its own telltale frequency long before it breaks — a rising line on a spectrum that engineers can name and date. When the flight-data analyst says the vibration was 'screaming before the rotor let go,' Den Hartog's science is what turns that scream into specific, attributable evidence: not a random shudder, but the identified voice of a particular part tearing itself apart on a schedule.",
      "frame": "The clerk sets down a spectral plot with one line climbing. \"Den Hartog taught that every rotating part has its own note, and a dying one sings louder. This note was rising for weeks. Show me you read vibration, and I'll show you when it was first logged.\"",
      "q": [
        {
          "q": "What is mechanical resonance?",
          "o": [
            {
              "t": "When a machine is struck once and rings briefly before falling silent.",
              "v": "wrong",
              "fb": "That is a transient; resonance is sustained amplification at a matched frequency."
            },
            {
              "t": "When a forcing frequency matches a natural one, the vibration grows sharply.",
              "v": "expert",
              "fb": "At resonance even a small force drives destructively large motion."
            },
            {
              "t": "When friction slowly heats a spinning part until it warps clear out of its true shape.",
              "v": "wrong",
              "fb": "That is thermal distortion, not resonance."
            },
            {
              "t": "When a shaft spins so fast that it flings its bearings apart by force.",
              "v": "partial",
              "fb": "Overspeed is one hazard, but resonance is frequency matching, not raw speed."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "Den Hartog’s spectrum locates the growing energy at gearbox mesh and bearing frequencies, not at an aerodynamic blade-impact mode."
          }
        },
        {
          "q": "Why does a machine's vibration spectrum reveal its health?",
          "o": [
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
              "t": "Each rotating part has a signature frequency, so faults show at known lines.",
              "v": "expert",
              "fb": "A defect raises its own telltale frequency, naming the failing part."
            },
            {
              "t": "Because louder machines are generally healthier than quiet ones in service.",
              "v": "partial",
              "fb": "Rising amplitude at a fault frequency signals trouble, not health."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The analyst’s escalation appears in the office file with the operator’s signed decision to monitor rather than ground the aircraft."
          }
        },
        {
          "q": "How does Den Hartog's science serve this board?",
          "o": [
            {
              "t": "It treats severe vibration as evidence of an outside strike during the final flight.",
              "v": "danger",
              "fb": "Internal faults raise vibration with no external strike involved."
            },
            {
              "t": "It treats vibration as random noise that component analysis cannot attribute.",
              "v": "wrong",
              "fb": "Vibration is structured by frequency and is highly attributable."
            },
            {
              "t": "It lets the board ignore recorder trends and rely on the mountain weather.",
              "v": "partial",
              "fb": "The recorders supply the very spectrum his science interprets."
            },
            {
              "t": "It turns a rising vibration line into the named, dated voice of one part.",
              "v": "expert",
              "fb": "The spectrum attributes the trouble to a specific, failing component."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "The rising harmonics across several flights form a mechanical warning history that a sudden gust or deliberate strike would not leave."
          }
        }
      ]
    }
  },
  "story": [
    "<b>The Ridgeline Rotor falls in seconds after its transmission has warned for weeks.</b>",
    "Mechanic Iris Dane has the debris history. The Flight-Data Analyst can read the harmonic growth. The Maintenance Records Clerk holds the deferrals and assignment decision.",
    "A strike, a mountain gust, and a progressive gearbox failure each predict different relationships among rotor damage, vibration, and prior maintenance.",
    "The case asks who accepted the known trend, where that decision survives, and what single component could remove both lift and anti-torque together."
  ],
  "endings": {
    "overclaimWhat": "hx_strike",
    "dismissalWhat": "hx_gust",
    "win": {
      "expertTitle": "The Deferred Gearbox",
      "expert": [
        "You connect Rourke Vane — the charter-fleet operator, the Operator’s Maintenance Office, and progressive gearbox fatigue deferred beyond repeated warnings. The full clue chain links the initiating condition, the physical mechanism, and the decisive record without relying on candidate order.",
        "The two alternative explanations each fit part of the scene, but neither survives the combined timing, material, and documentary evidence."
      ],
      "soundTitle": "The Mechanical Warning Chain",
      "sound": [
        "Your accusation identifies Rourke Vane — the charter-fleet operator, the Operator’s Maintenance Office, and progressive gearbox fatigue deferred beyond repeated warnings.",
        "A few missed clues leave gaps in the reconstruction, yet the evidence you recovered is sufficient to distinguish the true sequence from both traps."
      ],
      "namedTitle": "Correct Failure, Thin Deferral",
      "named": [
        "You reach the correct three-part verdict with a thin evidentiary file.",
        "The result is right, although the unrecovered clues would be needed to defend the causal chain under sustained challenge."
      ]
    },
    "overclaim": {
      "title": "No External Strike Reached the Gear Train",
      "body": [
        "No bird residue, impact transient, or local blade damage precedes the simultaneous drive loss.",
        "The fracture and debris originate inside the gearbox and predate the final flight."
      ]
    },
    "dismissal": {
      "title": "The Mountain Did Not Create the Debris",
      "body": [
        "The flight record contains no gust capable of explaining the rising gear-mesh harmonics or spalled bearing.",
        "Autorotation was compromised because rotor-drive integrity failed, not because weather alone overwhelmed a serviceable aircraft."
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
