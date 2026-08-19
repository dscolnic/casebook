module.exports = { PACK: {
  "id": "blackout",
  "title": "The Cascade",
  "discipline": "Electrical Engineering & the Grid",
  "teaser": "A routine line trip became a nine-second continental blackout. Did hostile commands spread false trips, did generators lose synchronism, or did operators lose the feedback needed to stop a physical cascade?",
  "overclaimTag": "a coordinated control-system intrusion",
  "truthTag": "an alarm freeze during a physical cascade",
  "venue": "the blackout inquiry",
  "agent": {
    "name": "Analyst Robin Vasquez",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Technical credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Electrical Pioneers",
  "dossierName": "ELECTRICAL PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the blackout inquiry",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before the inquiry closes. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The WHERE you test determines the dossier you receive, and the conversation costs one day.",
  "overclaimTease": "Malware can trip equipment, but the order of real currents, voltages, and missing alarms must show whether an attacker was required.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "utility",
      "items": [
        {
          "id": "utility",
          "label": "Delgado — utility control-room manager"
        },
        {
          "id": "vendor",
          "label": "The control-software vendor"
        },
        {
          "id": "regulator",
          "label": "The grid regulator"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "controlroom",
      "items": [
        {
          "id": "substation",
          "label": "The Substation & Lines"
        },
        {
          "id": "controlroom",
          "label": "The Utility Control Room"
        },
        {
          "id": "datacenter",
          "label": "The Grid-Operator Data Center"
        }
      ]
    },
    "what": {
      "title": "What made the first line loss become a continent-scale blackout?",
      "truth": "cascade",
      "items": [
        {
          "id": "cyber",
          "label": "Malware issued false trips across several control regions."
        },
        {
          "id": "fluke",
          "label": "Generator instability outran protection after the first line loss."
        },
        {
          "id": "cascade",
          "label": "An alarm processor froze while overloads cascaded unseen."
        }
      ]
    }
  },
  "PLACES": {
    "substation": {
      "name": "The Substation & Lines",
      "xy": [
        140,
        90
      ]
    },
    "controlroom": {
      "name": "The Utility Control Room",
      "xy": [
        330,
        240
      ]
    },
    "datacenter": {
      "name": "The Grid-Operator Data Center",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "substation",
      "controlroom"
    ],
    [
      "controlroom",
      "datacenter"
    ]
  ],
  "CHARACTERS": {
    "line": {
      "name": "Lineman Ojo",
      "role": "Field lineman",
      "face": "⚡",
      "badge": "L",
      "legend": "the lines",
      "hint": "Walks the corridor; knows which line arced into an overgrown tree."
    },
    "op": {
      "name": "The Operator",
      "role": "Control-room operator",
      "face": "🖥",
      "badge": "O",
      "legend": "the control room",
      "hint": "Watched the screens freeze; the alarms never sounded."
    },
    "veng": {
      "name": "The Vendor Engineer",
      "role": "Software-vendor engineer",
      "face": "🐛",
      "badge": "V",
      "legend": "the data center",
      "hint": "Knows the race-condition bug that silenced the alarm system."
    }
  },
  "TOPICMAP": {
    "substation": {
      "line": [
        "charge"
      ],
      "op": [
        "voltage"
      ],
      "veng": [
        "induction"
      ]
    },
    "controlroom": {
      "line": [
        "acdc"
      ],
      "op": [
        "threephase"
      ],
      "veng": [
        "reactive"
      ]
    },
    "datacenter": {
      "line": [
        "loadflow"
      ],
      "op": [
        "cascade"
      ],
      "veng": [
        "cybernetics"
      ]
    }
  },
  "TOPICS": {
    // cell: Lineman Ojo @ The Substation & Lines
    "charge": {
      "sci": "Charles-Augustin de Coulomb (1736-1806)",
      "topic": "Electric charge & force",
      "lede": "The military engineer who weighed the invisible force between charges with a thread of silk.",
      "no": 1,
      "profile": "Charles-Augustin de Coulomb trained as a military engineer, building fortifications in the Caribbean before poor health turned him toward physics. In 1785 he published the law that bears his name: the force between two electric charges is proportional to the product of the charges and inversely proportional to the square of the distance between them. Double the separation and the force falls to a quarter; halve it and the force quadruples. It is the electrical twin of Newton's law of gravity, and it underlies everything that follows.\n\nCoulomb measured this with exquisite care using a torsion balance — a charged pith ball on a light beam hung from a fine fiber. The tiny twist of the fiber let him read forces far too small to weigh directly, and from those twists he extracted the inverse-square relationship. The unit of electric charge, the coulomb, honors him: one coulomb is the charge carried by roughly 6.24 billion billion electrons.\n\nCharge is the root of everything electrical. Voltage, current, fields, and the arcs that jump an air gap all trace back to charges attracting and repelling. When a high-voltage conductor sags near a grounded object, the field between them intensifies until the air itself breaks down and charge leaps across as an arc — a fault.\n\nFor the inquiry, Coulomb’s scale matters at the first instant. Burned bark, conductor pitting, and a high fault current would place the initiating event in the physical corridor. That evidence would not explain the later regional spread, but it would make a remote command unnecessary as the trigger. Investigators should separate the spark that opened one line from the control failure that allowed other lines to overload.",
      "frame": "Ojo taps the scorched crossarm and squints at you. \"People want a spy for this. I want to know if you even understand what pulls a spark out of the air. Answer me straight:\"",
      "q": [
        {
          "q": "What does Coulomb's law describe?",
          "o": [
            {
              "t": "The force between charges, scaling with their product and inversely with distance squared.",
              "v": "expert",
              "fb": "Exactly — product of charges over distance squared; that is Coulomb's law."
            },
            {
              "t": "The steady rate at which free charge drifts along a copper conductor once a circuit is closed.",
              "v": "wrong",
              "fb": "That is electric current, Ampere's domain, not the force law Coulomb found."
            },
            {
              "t": "The total quantity of charge a body can store before it discharges to the ground below.",
              "v": "wrong",
              "fb": "That is closer to capacitance; Coulomb's law is about force between charges."
            },
            {
              "t": "The energy each unit of charge carries as it is pushed around a completed loop, in use.",
              "v": "wrong",
              "fb": "That describes voltage; Coulomb's law gives force, not energy per charge."
            }
          ]
        },
        {
          "q": "How did Coulomb measure such tiny electrical forces?",
          "o": [
            {
              "t": "By timing how fast a charged sphere fell through still air toward a grounded metal plate.",
              "v": "wrong",
              "fb": "No falling-sphere method; he read forces from the twist of a suspended fiber."
            },
            {
              "t": "With a torsion balance, reading force from the twist of a fine fiber holding a charged ball.",
              "v": "expert",
              "fb": "Right — the torsion balance turned faint forces into a readable twist."
            },
            {
              "t": "By counting the sparks that jumped between two charged spheres over a fixed interval.",
              "v": "wrong",
              "fb": "Spark-counting is not it; the torsion balance gave him quantitative force."
            },
            {
              "t": "With a voltaic pile wired to a brass galvanometer that deflected in step with the applied force.",
              "v": "danger",
              "fb": "Anachronism — Volta's pile came later; Coulomb used a mechanical torsion balance."
            }
          ]
        },
        {
          "q": "Why does Coulomb's law matter for how an overhead line faults?",
          "o": [
            {
              "t": "Because sabotage software can rewrite the inverse-square law and force an arc on command, in use.",
              "v": "danger",
              "fb": "No code alters physics; an arc obeys Coulomb's law whether or not anyone attacks."
            },
            {
              "t": "Because a line primarily ever arcs if a second energized conductor is deliberately brought near.",
              "v": "wrong",
              "fb": "A grounded tree limb suffices; no second live wire is required to fault."
            },
            {
              "t": "Because the field across a shrinking gap intensifies until air breaks down and charge arcs over.",
              "v": "expert",
              "fb": "Yes — close the gap enough and the field ionizes the air into a fault arc."
            },
            {
              "t": "Because charge does not move through open air at all, so any outage is likely to be an internal cyber event.",
              "v": "wrong",
              "fb": "Air does break down and conduct once the field is high enough — that is the arc."
            }
          ]
        }
      ],
      "whatHint": "Coulomb’s law makes a shrinking air gap between conductor and tree a physical ignition path, not a software command. Check the flash marks and fault current before invoking malware."
    },
    // cell: The Operator @ The Substation & Lines
    "voltage": {
      "sci": "Alessandro Volta (1745-1827)",
      "topic": "Potential & the battery",
      "lede": "The Italian count who stacked metal discs into the first steady source of electric pressure.",
      "no": 2,
      "profile": "Alessandro Volta was an Italian physicist who, around 1800, built the first device that could deliver a steady electric current: the voltaic pile. He stacked alternating discs of two different metals — zinc and copper or silver — separated by cloth or cardboard soaked in brine. The chemical reaction between the dissimilar metals pushed charge through an external wire, giving experimenters, for the first time, a continuous source rather than the brief snap of a discharging jar.\n\nVolta built the pile partly to refute his rival Luigi Galvani, who thought the twitching of frog legs revealed a special 'animal electricity.' Volta showed the electricity came from the junction of two metals, not the animal, and in doing so invented the battery. The unit of electric potential, the volt, honors him. Voltage is the electrical 'pressure' or potential difference that drives current: the energy given to each unit of charge as it moves between two points.\n\nVoltage is what the grid works hardest to hold steady. Power is delivered at high voltage precisely because higher voltage means less current for the same power, and less current means less heat lost in the wires. Substations use transformers to step voltage up for long-distance transmission and back down for homes.\n\nIn the event log, voltage is a time marker rather than a verdict. A sag that begins locally and deepens as neighboring paths take more load supports progressive network stress. A cyber theory would need trip commands or falsified measurements that precede the electrical changes. An instability-first theory would need frequency and phase separation before the voltage decline, not after it.",
      "frame": "Rubs tired eyes. \"Voltage was our pulse. When it sags, the patient is dying. Tell me you know what voltage actually is, or you'll misread every number I show you:\"",
      "q": [
        {
          "q": "What is voltage?",
          "o": [
            {
              "t": "The potential difference driving charge, the energy given to each unit of charge moved.",
              "v": "expert",
              "fb": "Correct — voltage is energy per unit charge, the electrical pressure."
            },
            {
              "t": "The number of charges that stream past a fixed point in the wire every single second.",
              "v": "wrong",
              "fb": "That is current; voltage is the potential difference that drives it."
            },
            {
              "t": "The heat a conductor gives off as it fights the charge trying to pass through it.",
              "v": "wrong",
              "fb": "That is resistive loss; voltage is potential difference, not dissipated heat."
            },
            {
              "t": "The magnetic field that wraps itself around any conductor the moment charge starts to move.",
              "v": "wrong",
              "fb": "That is a magnetic effect of current; voltage is the driving potential."
            }
          ]
        },
        {
          "q": "What was Volta's pile, and what did it prove?",
          "o": [
            {
              "t": "A stack of two metals in brine giving steady current, proving electricity came from the metals.",
              "v": "expert",
              "fb": "Right — the metal junctions, not 'animal electricity,' were the source."
            },
            {
              "t": "A spinning glass disc that slowly built up a large static charge to be stored and released at will.",
              "v": "wrong",
              "fb": "That is a friction machine; Volta's pile was a chemical source of steady current."
            },
            {
              "t": "A coil of wire spun near a magnet, generating current by Faraday's law of induction, in use.",
              "v": "danger",
              "fb": "That is a generator and came decades later; the pile was purely chemical."
            },
            {
              "t": "A glass jar lined with foil that stored a single sharp jolt to be discharged all at once.",
              "v": "wrong",
              "fb": "That is a Leyden jar; the pile's breakthrough was a continuous, steady current."
            }
          ]
        },
        {
          "q": "Why does sagging voltage matter during a developing blackout?",
          "o": [
            {
              "t": "Because voltage generally rises during any real fault, so a drop is presented as showing the readings were hacked.",
              "v": "danger",
              "fb": "Voltage sags under a starved, overloaded grid; a droop is a real distress signal."
            },
            {
              "t": "Because a drooping voltage signals a strained, under-supported grid sliding toward collapse, in tests.",
              "v": "expert",
              "fb": "Yes — sagging voltage is the grid gasping, a warning of spreading overload."
            },
            {
              "t": "Because voltage has no bearing on grid health and can safely be ignored by operators, in the record, in use.",
              "v": "wrong",
              "fb": "Voltage is a core vital sign; ignoring its droop is exactly the failure that occurred."
            },
            {
              "t": "Because primarily a physical break in a wire could ever cause the measured voltage to change, on site.",
              "v": "wrong",
              "fb": "Overload and lost support sag voltage without any wire being cut."
            }
          ]
        }
      ],
      "whatHint": "Volta’s potential difference turns the voltage record into a chronology. A regional sag that deepens after each line trip looks unlike simultaneous false commands."
    },
    // cell: The Vendor Engineer @ The Substation & Lines
    "induction": {
      "sci": "Michael Faraday (1791-1867)",
      "topic": "Electromagnetic induction",
      "lede": "The bookbinder's apprentice who discovered that a changing magnetic field conjures a voltage from nothing.",
      "no": 3,
      "profile": "Michael Faraday rose from a poor London family and little formal schooling to become one of history's greatest experimentalists. In 1831 he made the discovery on which the entire electrical grid rests: electromagnetic induction. He found that a changing magnetic field through a loop of wire induces a voltage in that wire — move a magnet through a coil, or switch a current in a nearby coil, and current flows even though nothing physically touches. Faraday's law states that the induced voltage is proportional to the rate at which the magnetic flux changes.\n\nFrom this single principle flow both the generator and the transformer. A generator spins coils in a magnetic field so that the flux through them changes continuously, inducing the alternating voltage that powers civilization. A transformer uses one alternating current to create a changing flux in an iron core, inducing a voltage in a second winding — the trick that lets the grid step voltage up and down. Faraday, self-taught in mathematics, expressed his findings through the physical idea of 'lines of force,' a picture Maxwell would later cast into equations.\n\nInduction is why the grid is an alternating-current grid at all. Only a changing field induces voltage, so it is change — oscillation — that carries power efficiently across a transformer.\n\nThe relays at each substation recorded current and magnetic flux changing before their breakers operated. Faraday’s principle therefore offers a consistency check: did the measured waveform justify the trip, or did a command arrive without matching electrical evidence? Real fault signatures across the corridor weaken the claim that malware simply fabricated the outages.",
      "frame": "Leans in, quieter than expected. \"Every relay that tripped that night ran on Faraday — a changing field making a voltage. Before you blame my software, prove you grasp the physics under it:\"",
      "q": [
        {
          "q": "What is electromagnetic induction?",
          "o": [
            {
              "t": "A changing magnetic field through a loop induces a voltage in that loop of wire.",
              "v": "expert",
              "fb": "Correct — changing flux induces voltage; that is Faraday's law."
            },
            {
              "t": "A steady, unchanging magnetic field pushes a constant current through any nearby wire.",
              "v": "wrong",
              "fb": "A steady field induces nothing; primarily a changing flux induces voltage."
            },
            {
              "t": "Two like charges repel while two opposite charges attract across the space between them.",
              "v": "wrong",
              "fb": "That is Coulomb's law of charges, not magnetic induction."
            },
            {
              "t": "A current-carrying wire heats up in exact proportion to its own internal resistance.",
              "v": "wrong",
              "fb": "That is resistive heating; induction is about changing flux inducing voltage."
            }
          ]
        },
        {
          "q": "What machines are direct children of Faraday's induction?",
          "o": [
            {
              "t": "Generators and transformers, which both work by making a magnetic flux change in time.",
              "v": "expert",
              "fb": "Right — both the generator and transformer run on changing flux."
            },
            {
              "t": "Chemical batteries and the fuel cells that quietly turn stored fuel into direct current.",
              "v": "wrong",
              "fb": "Those are electrochemical; induction is not what drives a battery."
            },
            {
              "t": "Resistive heaters and incandescent bulbs that glow from current forced through a filament.",
              "v": "wrong",
              "fb": "Those rely on resistance, not on Faraday's changing-flux induction."
            },
            {
              "t": "Simple switches and mechanical fuses that primarily make or break a circuit's metal contact.",
              "v": "wrong",
              "fb": "Those are contacts; induction underlies generators and transformers instead."
            }
          ]
        },
        {
          "q": "How does induction argue against the sabotage theory of the trips?",
          "o": [
            {
              "t": "A relay trip is induction sensing a real change in current, not a foreign remote command, in use.",
              "v": "expert",
              "fb": "Exactly — the relays reacted to genuine physics, not to any attacker."
            },
            {
              "t": "Relays can primarily trip when an outside operator sends them an explicit digital instruction, in use.",
              "v": "danger",
              "fb": "Protective relays trip autonomously on sensed conditions; no command is required."
            },
            {
              "t": "Induction is presented as showing the trips were faked, since no real field change could reach a relay coil.",
              "v": "wrong",
              "fb": "Field changes reach relays constantly; that sensing is exactly how they work."
            },
            {
              "t": "Faraday's law primarily governs laboratory coils and has nothing to do with grid protection gear.",
              "v": "wrong",
              "fb": "Grid relays and instrument transformers run on induction directly."
            }
          ]
        }
      ],
      "whatHint": "Faraday’s induction lets relays respond to actual changing current. Compare their measured waveforms with the trip messages to see whether hardware sensed real faults."
    },
    // cell: Lineman Ojo @ The Utility Control Room
    "acdc": {
      "sci": "Nikola Tesla (1856-1943)",
      "topic": "AC vs DC & the War of Currents",
      "lede": "The visionary whose alternating-current motor won the war that wired the world.",
      "no": 4,
      "profile": "Nikola Tesla was a Serbian-American inventor whose championing of alternating current reshaped the modern world. Arriving in America in 1884, he briefly worked for Thomas Edison before the two parted ways over Edison's commitment to direct current. Tesla's decisive contribution was the polyphase induction motor, patented in 1888: a machine that used alternating current to create a rotating magnetic field, spinning a rotor without any electrical contact to it. George Westinghouse licensed Tesla's patents, and the two men carried the banner of AC into the 'War of the Currents' against Edison's DC.\n\nAC won for one overriding reason: transformers. Alternating current can be stepped up to very high voltage for efficient long-distance transmission and stepped back down for safe use, because transformers work only on changing current. Edison's DC could not be transformed easily and had to be generated close to where it was used. The 1893 Chicago World's Fair and the Niagara Falls power project, both AC, settled the argument.\n\nAlmost the entire grid runs on AC to this day, though modern high-voltage DC links now carry bulk power over very long distances where AC's own limits bite.\n\nTesla’s network explains why one contingency can become everyone’s problem. After a line opens, alternating-current power seeks other paths while generators remain coupled through frequency and angle. That reach does not prove any one cause. The decisive question is whether the redistributed flows, protective trips, and missing alarms form one continuous chronology. The early phase records therefore deserve separate comparison with the later system split, because broad coupling alone does not identify which mechanism first escaped control.",
      "frame": "Ojo jerks a thumb at the humming panels. \"All of this sings at one frequency because Tesla's side won. That's why one tree in one state can black out a nation. Show me you know why AC beat DC:\"",
      "q": [
        {
          "q": "Why did alternating current win the War of the Currents?",
          "o": [
            {
              "t": "Because transformers can step AC up and down, allowing efficient long-distance transmission.",
              "v": "expert",
              "fb": "Correct — transformability made AC the primarily practical way to move power far."
            },
            {
              "t": "Because direct current was found to be far more dangerous to touch at any voltage level.",
              "v": "partial",
              "fb": "Safety was argued loudly, but AC won mainly because it transforms for transmission."
            },
            {
              "t": "Because alternating current can be stored in large banks of batteries while direct current does not.",
              "v": "wrong",
              "fb": "Neither transmits from storage that way; batteries store DC, if anything."
            },
            {
              "t": "Because primarily alternating current is able to flow through a solid metal wire without loss.",
              "v": "wrong",
              "fb": "Both flow through wire; AC won because it transforms for efficient transmission."
            }
          ]
        },
        {
          "q": "What was Tesla's key invention in the AC system?",
          "o": [
            {
              "t": "The polyphase induction motor, spinning a rotor with a rotating magnetic field and no contacts.",
              "v": "expert",
              "fb": "Right — the induction motor made AC practical for real mechanical work."
            },
            {
              "t": "The incandescent light bulb, which finally gave alternating current its mass consumer market at last.",
              "v": "danger",
              "fb": "The bulb was Edison's, and it ran fine on either current; Tesla's gift was the AC motor."
            },
            {
              "t": "The chemical storage battery that let alternating current be banked for use overnight, in use.",
              "v": "wrong",
              "fb": "That was not Tesla's; his signature invention was the AC induction motor."
            },
            {
              "t": "The rotary telegraph key that first sent coded messages over long-distance power lines, in use.",
              "v": "wrong",
              "fb": "Not Tesla's contribution here; his key AC invention was the induction motor."
            }
          ]
        },
        {
          "q": "How does an AC grid relate to how a blackout spreads?",
          "o": [
            {
              "t": "Wide synchronized interconnection shares power but also lets a disturbance propagate far and fast.",
              "v": "expert",
              "fb": "Yes — the same links that share reserves also carry a cascade across regions."
            },
            {
              "t": "AC grids are largely isolated island by island, so any fault can rarely once leave its own substation.",
              "v": "wrong",
              "fb": "AC grids are broadly interconnected and synchronized; that is how cascades travel."
            },
            {
              "t": "The shared frequency means a hacker is likely to strike every plant at once to cause any outage.",
              "v": "danger",
              "fb": "No coordinated strike is needed; one fault propagates through the interconnection itself."
            },
            {
              "t": "Because AC reverses direction, current simply cancels out and outages does not spread at all.",
              "v": "wrong",
              "fb": "Reversal is normal AC behavior; disturbances still propagate across the network."
            }
          ]
        }
      ],
      "whatHint": "Tesla’s interconnected AC system can carry stress far beyond the first corridor. Coupling explains reach, but the order of overloads must still be reconstructed."
    },
    // cell: The Operator @ The Utility Control Room
    "threephase": {
      "sci": "Mikhail Dolivo-Dobrovolsky (1861-1919)",
      "topic": "Three-phase power",
      "lede": "The engineer who sent three currents down three wires and powered a whole exhibition 100 miles away.",
      "no": 5,
      "profile": "Mikhail Dolivo-Dobrovolsky was a Russian-born engineer working in Germany who developed the practical three-phase alternating-current system that remains the standard for power generation and transmission worldwide. In 1891 he engineered the celebrated Lauffen-to-Frankfurt demonstration, transmitting three-phase power roughly 175 kilometers to light a thousand lamps and drive a waterfall pump at the Frankfurt electrotechnical exhibition — proof that AC could carry power efficiently over long distances. He also built the practical three-phase induction motor and the three-phase transformer.\n\nThree-phase power uses three alternating currents, each offset from the next by one-third of a cycle (120 degrees), carried on three conductors. This arrangement has beautiful properties: it delivers constant total power (rather than the pulsing of a single phase), it lets motors start and run smoothly on a naturally rotating magnetic field, and it needs less conductor material than three separate single-phase circuits would. It is why the big transmission towers you see carry conductors in sets of three.\n\nBalanced three-phase is the design ideal, but real grids drift out of perfect balance, and imbalance stresses equipment. Keeping the three phases healthy and in step is part of an operator's job.\n\nThree-phase records can test the instability alternative. A generator falling out of step produces growing angle and frequency differences, not merely high line current. If the phases remain balanced and coherent while transmission elements overload, the machines are still following the grid when the cascade begins. Instability may arrive later, after the network has already fragmented. That distinction lets the inquiry test an instability-first story without confusing the eventual fragmentation of the grid with its initiating sequence.",
      "frame": "Gestures at three stacked trend lines. \"Everything out there comes in threes — three phases, locked in step. When people ask how one line took down a region, this is the answer. Prove you understand it:\"",
      "q": [
        {
          "q": "What defines a three-phase power system?",
          "o": [
            {
              "t": "Three alternating currents on three wires, each offset from the next by a third of a cycle.",
              "v": "expert",
              "fb": "Correct — three currents 120 degrees apart on three conductors."
            },
            {
              "t": "Three separate direct currents combined so that their steady voltages simply add up together.",
              "v": "wrong",
              "fb": "Three-phase is alternating and phase-offset, not summed direct currents."
            },
            {
              "t": "A single alternating current split by a transformer into three copies of equal timing.",
              "v": "wrong",
              "fb": "The three phases are offset in time by 120 degrees, not identical copies."
            },
            {
              "t": "Three different frequencies sent along one wire so three signals can share the line.",
              "v": "wrong",
              "fb": "All three phases share one frequency; they differ in phase, not frequency."
            }
          ]
        },
        {
          "q": "Why is three-phase power the worldwide standard?",
          "o": [
            {
              "t": "It delivers constant total power and runs motors smoothly with less conductor material.",
              "v": "expert",
              "fb": "Right — steady power, self-starting motors, and efficient use of copper."
            },
            {
              "t": "It is the primarily arrangement that can be stepped up in voltage by an ordinary transformer.",
              "v": "wrong",
              "fb": "Single-phase transforms fine too; three-phase wins on smoothness and efficiency."
            },
            {
              "t": "It removes the need for any synchronization between the generators feeding the grid.",
              "v": "danger",
              "fb": "Generators is likely to still stay synchronized; three-phase does not remove that need."
            },
            {
              "t": "It lets the grid run safely on direct current once the three phases are combined.",
              "v": "wrong",
              "fb": "Three-phase is an AC system; it does not convert the grid to direct current."
            }
          ]
        },
        {
          "q": "How does the three-phase, synchronized grid relate to a regional cascade?",
          "o": [
            {
              "t": "Everything is coupled through the phases, so local strain runs instantly through the whole grid.",
              "v": "expert",
              "fb": "Yes — one interlocked three-phase machine means trouble propagates everywhere."
            },
            {
              "t": "Each three-phase line is fully independent, so no single failure can affect its neighbors.",
              "v": "wrong",
              "fb": "The phases couple the whole system; that coupling is how the cascade spread."
            },
            {
              "t": "The three phases cancel out any fault, so a cascade would require a deliberate multi-site attack.",
              "v": "danger",
              "fb": "Phases do not cancel faults; a single fault propagates without any attack."
            },
            {
              "t": "Three-phase generators run at three separate speeds, keeping every fault trapped locally.",
              "v": "wrong",
              "fb": "They run locked in synchronism; that shared lock is what transmits the disturbance."
            }
          ]
        }
      ],
      "whatHint": "Dolivo-Dobrovolsky’s three-phase system exposes loss of synchronism through phase and frequency separation. If the phases remain coherent early, generator instability is not leading the sequence."
    },
    // cell: The Vendor Engineer @ The Utility Control Room
    "reactive": {
      "sci": "Oliver Heaviside (1850-1925)",
      "topic": "Reactance & reactive power",
      "lede": "The reclusive genius who coined 'impedance' and reshaped Maxwell into the tools engineers still use.",
      "no": 6,
      "profile": "Oliver Heaviside was a self-taught English engineer and mathematician, famously reclusive and often quarrelsome, who transformed the theory of electricity into the practical language engineers use today. He recast Maxwell's original twenty equations into the compact four-vector form now universally taught, developed an operational calculus for solving circuit problems, and coined the essential vocabulary: 'impedance,' 'inductance,' 'reactance,' and 'conductance.' His telegrapher's equations explained how signals travel and distort along transmission lines.\n\nReactance is the opposition to alternating current that comes not from resistance but from energy storage. Inductors (coils) and capacitors store energy in magnetic and electric fields and release it a fraction of a cycle later, so current and voltage fall out of step — out of phase. Reactive power is the power that sloshes back and forth into these fields without being consumed. It does no net work, yet it is absolutely essential: without enough reactive power, the voltage across the grid cannot be held up.\n\nThis is one of the least intuitive and most important ideas in power engineering. Long transmission lines and heavily loaded systems consume reactive power, and when reactive support runs short, voltage sags and can collapse.\n\nHeaviside’s vocabulary makes the less visible margin measurable. Heavy transfers consume reactive support and depress voltage, especially after lines are lost. In this case the reactive decline should be aligned with line loadings and alarm timestamps. If it follows the redistribution, it is part of the cascade; if it leads every trip, a voltage-driven alternative deserves more weight.",
      "frame": "Looks pained. \"Reactive power is the thing nobody outside the field understands, and it's exactly what was bleeding away that night. If you get this, you'll see what our silent alarm hid. Try me:\"",
      "q": [
        {
          "q": "What is reactance?",
          "o": [
            {
              "t": "Opposition to AC from energy stored in fields, pushing current and voltage out of phase.",
              "v": "expert",
              "fb": "Correct — reactance comes from storage in inductors and capacitors, shifting phase."
            },
            {
              "t": "Opposition to current from a material's resistance, dissipating all of the energy as pure heat.",
              "v": "wrong",
              "fb": "That is resistance; reactance stores and returns energy rather than burning it."
            },
            {
              "t": "The total charge a capacitor can hold before the voltage across it stops rising further.",
              "v": "wrong",
              "fb": "That is capacitance itself; reactance is the resulting opposition to AC."
            },
            {
              "t": "The magnetic force between two nearby wires when both are carrying a steady current.",
              "v": "wrong",
              "fb": "That is Ampere's force; reactance is phase-shifting opposition to alternating current."
            }
          ]
        },
        {
          "q": "What is reactive power, and why does it matter?",
          "o": [
            {
              "t": "Power that sloshes into fields doing no net work, yet is needed to hold voltage up.",
              "v": "expert",
              "fb": "Right — reactive power does no work but is essential for voltage support."
            },
            {
              "t": "The real power actually consumed by homes and factories, billed on the monthly meter.",
              "v": "wrong",
              "fb": "That is real power; reactive power does no net work but supports voltage."
            },
            {
              "t": "The waste heat a transmission line gives off as its temperature climbs under heavy load.",
              "v": "wrong",
              "fb": "That is resistive loss; reactive power is stored-and-returned, not dissipated heat."
            },
            {
              "t": "An largely useless quantity that engineers try to eliminate from the grid substantially.",
              "v": "danger",
              "fb": "It does no work but is far from useless — without it, voltage collapses."
            }
          ]
        },
        {
          "q": "How did reactive power figure in the blackout's progression?",
          "o": [
            {
              "t": "Reactive demand soared as supply fell, sliding voltage toward the collapse that precedes a cascade.",
              "v": "expert",
              "fb": "Yes — a reactive-power shortfall dragged voltage down, exactly what the alarm should have flagged."
            },
            {
              "t": "Reactive power surged so high it physically overcharged and detonated the substations, in use.",
              "v": "wrong",
              "fb": "Reactive power does not detonate gear; its shortage sags voltage toward collapse."
            },
            {
              "t": "Reactive power is irrelevant to blackouts and had no bearing on this event whatsoever, in use.",
              "v": "wrong",
              "fb": "It was central; the reactive shortfall was a key driver of the voltage decline."
            },
            {
              "t": "An attacker injected fake reactive power to fool every single meter across the whole region at once.",
              "v": "danger",
              "fb": "No injection needed; the real, physical reactive shortfall drove the voltage down."
            }
          ]
        }
      ],
      "whatHint": "Heaviside’s reactance links heavy transfers to falling voltage and shrinking reactive margin. Determine whether that deterioration follows overloaded lines rather than preceding them."
    },
    // cell: Lineman Ojo @ The Grid-Operator Data Center
    "loadflow": {
      "sci": "Edith Clarke (1883-1959)",
      "topic": "Network analysis",
      "lede": "America's first female electrical engineering professor, who computed the flow of power through the web.",
      "no": 7,
      "profile": "Edith Clarke was a pioneering American electrical engineer — the first woman to earn an electrical engineering degree from MIT, the first professionally employed female electrical engineer in the United States, and later the first female professor of electrical engineering in the country, at the University of Texas. At General Electric she specialized in the analysis of large power-transmission systems, the mathematics of how voltage, current, and power distribute themselves across a network of interconnected lines.\n\nIn 1921 she patented the 'Clarke calculator,' a graphical device that solved the equations governing current, voltage, and impedance on long transmission lines far faster than by hand. She developed the modified symmetrical-component method now called the Clarke transform, a mathematical tool still used to analyze unbalanced three-phase systems and embedded in modern motor and grid controls. She wrote an influential two-volume textbook on circuit analysis of power systems.\n\nHer field, network analysis or 'load flow,' answers the essential operating question: given the generators, loads, and lines, how much power flows on each line, and what is the voltage at each point? These are the calculations that tell operators whether any line is overloaded and whether the system is within safe limits.\n\nClarke’s equations let investigators recreate the counterfactual control room. Using the actual topology and demand, analysts can calculate which lines should have overloaded after the first outage and compare that forecast with the trips. A close match means the grid’s own flows propagated the event. The unanswered issue then becomes why operators did not see and interrupt a predictable sequence.",
      "frame": "Ojo points at a wiring diagram of the whole region. \"Somebody's supposed to compute how much runs on each of these lines, live. That's how you catch an overload before it bites. Prove you know what that analysis even does:\"",
      "q": [
        {
          "q": "What question does power-system load-flow analysis answer?",
          "o": [
            {
              "t": "Given the generators, loads, and lines, how much power flows on each and the voltage at each point.",
              "v": "expert",
              "fb": "Correct — load flow gives the line power flows and bus voltages."
            },
            {
              "t": "How much a utility ought to charge each residential customer for one kilowatt-hour of the energy used.",
              "v": "wrong",
              "fb": "That is rate-setting; load flow is about physical power flows and voltages."
            },
            {
              "t": "How long a given transmission tower will physically stand before it is likely to be replaced.",
              "v": "wrong",
              "fb": "That is structural engineering; load flow computes electrical flows, not tower life."
            },
            {
              "t": "Which specific customer is drawing power illegally from a tapped distribution line, in use.",
              "v": "wrong",
              "fb": "That is theft detection; load flow computes the network's flows and voltages."
            }
          ]
        },
        {
          "q": "What did Edith Clarke contribute to this analysis?",
          "o": [
            {
              "t": "A graphical calculator and transform methods that made transmission-line analysis far faster.",
              "v": "expert",
              "fb": "Right — the Clarke calculator and Clarke transform sped up network analysis."
            },
            {
              "t": "The very first alternating-current generator ever installed at a commercial power plant.",
              "v": "wrong",
              "fb": "She was an analyst; her contributions were computational tools, not the first generator."
            },
            {
              "t": "A chemical process for insulating high-voltage cables against moisture and corrosion.",
              "v": "wrong",
              "fb": "Her work was mathematical network analysis, not cable chemistry."
            },
            {
              "t": "The federal safety code that dictates how far a power line is likely to hang above the ground.",
              "v": "danger",
              "fb": "That is a clearance standard; Clarke's contribution was analytical methods for networks."
            }
          ]
        },
        {
          "q": "How did load-flow analysis fail the operators that night?",
          "o": [
            {
              "t": "With data stale, the load-flow picture no longer matched reality, hiding the real overloads.",
              "v": "expert",
              "fb": "Exactly — sound equations fed stale data gave the room a false, safe-looking picture."
            },
            {
              "t": "The load-flow equations were themselves wrong, so no operator could have trusted them.",
              "v": "wrong",
              "fb": "The equations were sound; they were being solved with outdated inputs."
            },
            {
              "t": "Load-flow analysis has nothing to do with spotting overloads on live transmission lines.",
              "v": "wrong",
              "fb": "Spotting overloads is exactly what it is for; stale data is what blinded it."
            },
            {
              "t": "An intruder quietly deleted the load-flow program, so no analysis of any kind was running at all.",
              "v": "danger",
              "fb": "The tool ran; it was fed stale data, not deleted by an attacker."
            }
          ]
        }
      ],
      "whatHint": "Clarke’s load-flow method predicts where power moves after a line opens. Successive overloads matching that redistribution support a physical cascade instead of invented trips."
    },
    // cell: The Operator @ The Grid-Operator Data Center
    "cascade": {
      "sci": "Charles Concordia (1908-2003)",
      "topic": "Stability & cascading failure",
      "lede": "The engineer who spent a lifetime studying how a synchronized grid stays in step — and how it tears apart.",
      "no": 8,
      "profile": "Charles Concordia was an American electrical engineer, largely self-taught, who spent a long career at General Electric becoming one of the world's foremost authorities on power-system stability and the dynamic behavior of synchronous machines. He analyzed how the many generators of an interconnected grid stay locked in step — all spinning in synchronism at the same frequency — and, crucially, the conditions under which they lose that synchronism and the system falls apart.\n\nPower-system stability is the grid's ability to return to a steady operating state after a disturbance. Generators are like masses coupled by springs (the transmission lines); nudge one and they all oscillate, and if a disturbance is too large or the system too stressed, the oscillations grow instead of damping, machines slip out of step, protective relays disconnect them, and the interconnection breaks into islands. Concordia's analyses of these dynamics shaped how grids are designed and operated to stay stable, and he served on the investigation of the great 1965 Northeast blackout.\n\nA cascading failure is stability's dark side realized. One element trips; the power it carried shifts to others, overloading them; they trip in turn; voltage and frequency swing; and within seconds a local problem propagates into a wide-area collapse faster than any human can intervene.\n\nConcordia’s work provides a strict chronology test. Loss of synchronism has recognizable frequency and rotor-angle behavior, while a thermal or voltage cascade shows loading and protection moving through the network first. The records should be ordered rather than blended into one dramatic moment. That order distinguishes the mechanism that spread the outage from the conditions that followed it.",
      "frame": "The Operator's hands are steady now. \"There's a whole science to how this grid holds together and how it comes apart. What we lived through has a name, and it isn't 'fluke' and it isn't 'attack.' Show me you know it:\"",
      "q": [
        {
          "q": "What is power-system stability?",
          "o": [
            {
              "t": "The grid's ability to return to a steady state after a disturbance, staying in synchronism.",
              "v": "expert",
              "fb": "Correct — stability is recovering synchronism and steady operation after a jolt."
            },
            {
              "t": "The total amount of electrical energy the grid is able to store for use in emergencies.",
              "v": "wrong",
              "fb": "The grid stores little; stability is about recovering from disturbances, not storage."
            },
            {
              "t": "The steadiness of the price of electricity in the market over a long trading period.",
              "v": "wrong",
              "fb": "That is price stability; here it means the grid's dynamic ability to stay in step."
            },
            {
              "t": "The physical strength of the towers and lines against wind, ice, and other weather.",
              "v": "wrong",
              "fb": "That is mechanical strength; power stability is about electrical synchronism."
            }
          ]
        },
        {
          "q": "What is a cascading failure?",
          "o": [
            {
              "t": "One element trips, its load shifts and overloads others, and the failures propagate in seconds.",
              "v": "expert",
              "fb": "Right — sequential overloading spreads a local failure across the network."
            },
            {
              "t": "A single massive generator explodes and instantly darkens an entire region on its own.",
              "v": "wrong",
              "fb": "A cascade is a chain of trips, not one blast; the failure spreads element to element."
            },
            {
              "t": "Many separate, unrelated faults happen to strike at the same moment by pure coincidence.",
              "v": "danger",
              "fb": "A cascade is causally linked, not coincidental; each trip loads and trips the next."
            },
            {
              "t": "A slow, gentle decline in voltage over many hours that operators can easily reverse.",
              "v": "wrong",
              "fb": "Cascades unfold in seconds, too fast for late reaction; that is their danger."
            }
          ]
        },
        {
          "q": "Why does a cascade refute both the 'fluke' and the 'attack' story?",
          "o": [
            {
              "t": "It follows deterministic overload dynamics and needs no enemy — the grid spreads it itself, in use.",
              "v": "expert",
              "fb": "Yes — lawful dynamics, no attacker, and no mere coincidence: that is a cascade."
            },
            {
              "t": "It is presented as showing an attacker is likely to have triggered each trip, since nothing spreads on its own.",
              "v": "danger",
              "fb": "No trigger needed; coupled dynamics spread the failure without any attacker."
            },
            {
              "t": "It shows the event was truly random, with no chain of cause connecting one trip to the next, in use.",
              "v": "wrong",
              "fb": "A cascade is a causal chain, not random; each overload causes the next trip."
            },
            {
              "t": "It means the grid can rarely be stabilized, so no operator action would ever have helped, in tests.",
              "v": "wrong",
              "fb": "Early intervention stops cascades; the failure was that the blind room could not intervene."
            }
          ]
        }
      ],
      "whatHint": "Concordia’s stability work separates an instability-first collapse from overloads that later disturb machines. Put rotor-angle and frequency changes beside the breaker timeline."
    },
    // cell: The Vendor Engineer @ The Grid-Operator Data Center
    "cybernetics": {
      "sci": "Norbert Wiener (1894-1964)",
      "topic": "Control & cybernetics",
      "lede": "The prodigy who named the science of control and communication in the machine and the animal alike.",
      "no": 9,
      "profile": "Norbert Wiener was an American mathematician, a child prodigy who earned his PhD at eighteen, and the founder of cybernetics — the science of control and communication in animals and machines. In his 1948 book Cybernetics, he unified ideas about feedback, control, and information into a single framework, arguing that a thermostat, an animal reaching for an object, and an anti-aircraft gun tracking a plane all share the same underlying logic: sense a state, compare it to a goal, and act to close the gap, using information fed back from the results.\n\nWiener's wartime work on automatic fire-control — predicting an aircraft's future position and steering a gun to meet it — crystallized the insight that purposeful behavior is feedback-driven control, and that information is as fundamental as energy in making a system work. Cybernetics gave a common language to engineering, biology, and the emerging computer age, and directly influenced control theory, automation, and thinking about complex systems.\n\nA modern control room is a cybernetic system in Wiener's exact sense: a coupling of a physical process (the grid), sensors (telemetry), a computed model (state estimation), a controller (automatic systems and human operators), and the information loops binding them. Its whole purpose is regulation through feedback.\n\nWiener directs attention to the broken feedback path. The field sensors may continue measuring correctly while an alarm processor stops refreshing the operator display. That is different from malware commanding false trips: one removes awareness, the other changes action. Comparing raw telemetry, processed alarms, and operator decisions can identify where the loop opened without treating every software failure as an attack.",
      "frame": "Speaks carefully. \"Wiener saw a control room for what it is — sensors, a controller, and information binding them. Ours had a broken bind. If you understand cybernetics, you'll understand exactly what my company hid. Try:\"",
      "q": [
        {
          "q": "What is cybernetics, as Wiener defined it?",
          "o": [
            {
              "t": "The science of control and communication through feedback, in animals and machines alike.",
              "v": "expert",
              "fb": "Correct — control and communication via feedback, spanning living and built systems."
            },
            {
              "t": "The study of building faster mechanical computers out of gears and rotating shafts.",
              "v": "wrong",
              "fb": "That is early computing hardware; cybernetics is about control and communication."
            },
            {
              "t": "The branch of physics describing how heat flows from a hot body to a cold one.",
              "v": "wrong",
              "fb": "That is thermodynamics; cybernetics concerns feedback-based control and information."
            },
            {
              "t": "A method for encrypting military messages so an enemy does not read intercepted signals.",
              "v": "wrong",
              "fb": "That is cryptography; cybernetics is the science of control and communication."
            }
          ]
        },
        {
          "q": "What is the core logic shared by all cybernetic systems?",
          "o": [
            {
              "t": "Sense a state, compare it to a goal, and act to close the gap using fed-back information.",
              "v": "expert",
              "fb": "Right — sense, compare, act, and feed the result back: purposeful control."
            },
            {
              "t": "Store as much energy as possible and release it in a single burst to do the work.",
              "v": "wrong",
              "fb": "Cybernetics is about information-driven control, not energy storage and release."
            },
            {
              "t": "Follow a fixed script of commands from start to finish, rarely reacting to any result.",
              "v": "danger",
              "fb": "That is open-loop; cybernetic control reacts to fed-back results, closing the loop."
            },
            {
              "t": "Amplify every incoming signal as much as possible before passing it further along.",
              "v": "wrong",
              "fb": "Blind amplification is not control; cybernetics compares to a goal and corrects."
            }
          ]
        },
        {
          "q": "In cybernetic terms, what went wrong in the control room?",
          "o": [
            {
              "t": "The controller was cut off from its sensors — the information loop to operators was broken.",
              "v": "expert",
              "fb": "Exactly — a blinded controller, its regulating loop silently opened."
            },
            {
              "t": "The grid ran out of energy, so no amount of control or information could have helped.",
              "v": "wrong",
              "fb": "Energy was not the issue; the broken information-and-control loop was."
            },
            {
              "t": "The controller worked perfectly, but the physical grid ignored every command it issued.",
              "v": "wrong",
              "fb": "The failure was upstream: operators lost the sensing needed to command at all."
            },
            {
              "t": "An enemy seized the controller and issued its own commands to darken the region.",
              "v": "danger",
              "fb": "No seized controller; the loop was opened by a silent failure, not a hostile takeover."
            }
          ]
        }
      ],
      "whatHint": "Wiener’s feedback loop fails when sensors no longer reach the controller. A frozen alarm display can leave correct measurements outside the room without requiring hostile control."
    }
  },
  "STORIES": {
    "line": {
      "substation": "Ojo meets you at the base of a tower, hard hat under his arm. \"See that scorch on the crossarm? A line kissed a tree limb right here. Nobody trimmed it. Ask me what you came to ask.\"",
      "controlroom": "Ojo looks out of place among the screens, boots still muddy. \"I told them from the field this corridor was overgrown,\" he mutters. \"The paperwork says otherwise. Funny, that.\"",
      "datacenter": "Ojo studies the wall of monitors and shakes his head. \"All these computers, and the answer was a tree I could've shown you in five minutes. Ask, and I'll walk you through it.\""
    },
    "op": {
      "substation": "The Operator has come out to the yard, pale in the daylight. \"I read these lines by their numbers, not by climbing them,\" they say. \"And that night the numbers lied to me. Ask, if you want to know how.\"",
      "controlroom": "The Operator sits at the dead console where it happened. \"The alarms never made a sound,\" they whisper. \"I sat here believing the grid was fine while it tore itself apart. Ask me.\"",
      "datacenter": "The Operator hovers near the servers, arms folded. \"This is where my screens got their picture — and where the picture froze. Whatever you need to know, ask it here.\""
    },
    "veng": {
      "substation": "The Vendor Engineer picks their way across the yard, uneasy. \"I write software; I don't climb towers. But I know the bug that mattered, and it wasn't out here. Ask, and I'll be honest.\"",
      "controlroom": "The Vendor Engineer stares at the console, guilt plain. \"Our code was supposed to make these alarms scream. Instead it went quiet and stayed quiet. Ask me what I know.\"",
      "datacenter": "The Vendor Engineer is home among the racks. \"This is where our alarm process ran — and hung. A race condition. We knew about it. Ask me, and I'll stop pretending we didn't.\""
    }
  },
  "story": [
    "<b>The Cascade</b> opens inside the blackout inquiry, where a common line fault somehow became a continental emergency in nine seconds.",
    "<b>Lineman Ojo</b>, <b>The Operator</b>, and <b>The Vendor Engineer</b> hold different records: the physical corridor, the control-room chronology, and the software that turned measurements into alarms.",
    "One theory says <b>malware issued false trips across several control regions</b>. Another says <b>generator instability outran protection after the first line loss</b>. The sequence of current, voltage, frequency, and operator awareness must decide between them.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and build the WHAT from the case notes."
  ],
  "endings": {
    "overclaimWhat": "cyber",
    "dismissalWhat": "fluke",
    "win": {
      "expertTitle": "A Physical Cascade Hidden by a Frozen Alarm Loop",
      "expert": [
        "Analyst Robin Vasquez names Delgado — utility control-room manager, The Utility Control Room, and an alarm processor freeze that left growing overloads unseen. The switching record contains no coordinated hostile trip commands, and the frequency record does not begin with generators falling out of step.",
        "The line contact started an ordinary contingency. Power redistributed, neighboring lines overloaded, and the feedback channel failed while operators still believed the system was stable. The finding separates trigger, propagation, and responsibility."
      ],
      "soundTitle": "The Mechanism Is Sound",
      "sound": [
        "The evidence fixes the mechanism: a physical overload cascade continued while the alarm processor stopped updating the room.",
        "Some management records remain incomplete, but current, voltage, and event order reject both hostile false trips and an instability-first collapse."
      ],
      "namedTitle": "Correct Mechanism, Thin Attribution",
      "named": [
        "The blackout mechanism is identified correctly, but too few WHO and WHERE clues support the named chain of responsibility.",
        "A technically right answer still needs enough records to withstand the inquiry."
      ]
    },
    "overclaim": {
      "title": "The Intrusion Story",
      "body": [
        "Vasquez attributes the outage to malware issuing false trips across control regions.",
        "Relay currents and breaker operations follow real overloads rather than forged commands. The software failure removed information; it did not manufacture a coordinated attack sequence."
      ]
    },
    "dismissal": {
      "title": "The Instability-First Story",
      "body": [
        "Vasquez concludes that generators lost synchronism before operators could intervene.",
        "Frequency and phase records remain coherent while line loadings rise and alarms stop refreshing. Instability appears later as a consequence, not as the initiating propagation mechanism."
      ]
    },
    "wrongNames": {
      "title": "Right Mechanism, Wrong Chain",
      "body": [
        "The alarm-blinded cascade is correct, but the responsible person or location is not. Rejoin the event log to the management and software records."
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A power grid cascade spreading across transmission lines\"><circle cx=\"90\" cy=\"70\" r=\"13\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.6\"/><circle cx=\"246\" cy=\"40\" r=\"13\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.6\"/><circle cx=\"246\" cy=\"102\" r=\"13\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.6\"/><circle cx=\"420\" cy=\"70\" r=\"13\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"2\"/><circle cx=\"574\" cy=\"42\" r=\"13\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.6\"/><circle cx=\"574\" cy=\"102\" r=\"13\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.6\"/><path d=\"M103 66 L233 44 M103 74 L233 98 M259 44 L407 66 M259 98 L407 74 M433 66 L561 46 M433 74 L561 98\" fill=\"none\" stroke=\"#326891\" stroke-width=\"1.8\"/><path d=\"M404 54 L436 86 M436 54 L404 86\" stroke=\"#B3261E\" stroke-width=\"2.2\"/></svg>"
}
};
