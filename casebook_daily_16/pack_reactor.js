module.exports = { PACK: {
  "id": "reactor",
  "title": "The Thornbury Reactor",
  "discipline": "Nuclear Reactor Safety",
  "teaser": "A reactor ran wild during a night-shift test. An attack? A one-in-a-billion fluke? Or a design flaw someone buried?",
  "overclaimTag": "sabotage or an attack",
  "truthTag": "a concealed reactor design flaw",
  "venue": "the Thornbury reactor inquiry",
  "agent": {
    "name": "Inspector Ada Vrain",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Nuclear Pioneers",
  "dossierName": "NUCLEAR PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Thornbury reactor inquiry",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before the inquiry closes. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The WHERE you test determines the dossier you receive, and the conversation costs one day.",
  "overclaimTease": "And beware the answer the cameras want: the traces point not to an intruder in the night, but to something quieter — and far harder to bury.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "designer",
      "items": [
        {
          "id": "operator",
          "label": "Operations chief Marsh"
        },
        {
          "id": "designer",
          "label": "Aldous Reeve — chief reactor designer"
        },
        {
          "id": "regulator",
          "label": "The nuclear inspector"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "designoffice",
      "items": [
        {
          "id": "control",
          "label": "The Reactor Control Room"
        },
        {
          "id": "hall",
          "label": "The Reactor Hall & Core"
        },
        {
          "id": "designoffice",
          "label": "The Design Authority's Office"
        }
      ]
    },
    "what": {
      "title": "What is happening",
      "truth": "designflaw",
      "items": [
        {
          "id": "attack",
          "label": "Sabotage or an attack on the plant"
        },
        {
          "id": "freak",
          "label": "A freak accident — vanishingly unlikely"
        },
        {
          "id": "designflaw",
          "label": "A concealed reactor design flaw, run past its margin"
        }
      ]
    }
  },
  "PLACES": {
    "control": {
      "name": "The Reactor Control Room",
      "xy": [
        140,
        90
      ]
    },
    "hall": {
      "name": "The Reactor Hall & Core",
      "xy": [
        330,
        240
      ]
    },
    "designoffice": {
      "name": "The Design Authority's Office",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "control",
      "hall"
    ],
    [
      "hall",
      "designoffice"
    ]
  ],
  "CHARACTERS": {
    "operator2": {
      "name": "Operator Nadia Sorel",
      "role": "Reactor operator",
      "face": "🎛",
      "badge": "O",
      "legend": "the control room",
      "hint": "Ran the test to the book she was handed; the book was wrong."
    },
    "healthphys": {
      "name": "The Health Physicist",
      "role": "Health physicist",
      "face": "☢",
      "badge": "H",
      "legend": "the reactor hall",
      "hint": "Reads the dose and the core; knows how fast the power really ran away."
    },
    "clerk": {
      "name": "The Clerk",
      "role": "Design-office clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the office",
      "hint": "Keeps the design files — and the flaw report stamped and shelved."
    }
  },
  "TOPICMAP": {
    "control": {
      "operator2": [
        "radioactivity"
      ],
      "healthphys": [
        "neutron"
      ],
      "clerk": [
        "fissionchem"
      ]
    },
    "hall": {
      "operator2": [
        "firstpile"
      ],
      "healthphys": [
        "reactorphysics"
      ],
      "clerk": [
        "betadecay"
      ]
    },
    "designoffice": {
      "operator2": [
        "inherentsafety"
      ],
      "healthphys": [
        "healthphysics"
      ],
      "clerk": [
        "riskassessment"
      ]
    }
  },
  "TOPICS": {
    "radioactivity": {
      "whatHint": "Curie read matter by the signatures it emits. Ask what the fission-product traces name — the core's own fuel, or an outside hand.",
      "sci": "Marie Curie (1867-1934)",
      "topic": "Radioactivity",
      "lede": "The Paris physicist who gave the phenomenon at the heart of this inquiry its name — and paid for it with her life.",
      "no": 1,
      "profile": "Marie Curie was a Polish-born physicist and chemist working in Paris who gave the phenomenon at the center of this inquiry its name: radioactivity. Studying the mysterious rays from uranium that Henri Becquerel had noticed, she made a decisive measurement — the intensity of the radiation depended only on how much uranium was present, not on its chemical form, temperature, or combination. From this she argued that radioactivity is a property of the atom itself, an internal event, not a chemical reaction between atoms.\n\nWorking with her husband Pierre, she pursued the tiny extra activity in uranium ore and, in 1898, announced two new elements: polonium, named for her homeland, and radium. Isolating a measurable amount of pure radium from tons of pitchblende took years of punishing chemical labor. Her tool throughout was quantitative: an ionization chamber paired with Pierre's piezoelectric quartz, which let her measure the faint electric current the rays drove through air. She won two Nobel Prizes — Physics in 1903, shared with Pierre and Becquerel, and Chemistry in 1911 — the only person honored in two different sciences. She died in 1934 of a blood disease almost certainly caused by decades of exposure.\n\nFor this board, Curie's legacy is that radioactivity is measurable and lawful. The rays a reactor produces are not mysterious or capricious; their intensity tracks exactly what the atoms are doing. Every detector in that control room descends from her ionization chamber. So when a reactor's power runs away, it leaves a quantitative record — a trace that can distinguish a physical excursion from an intruder's hand. Before anyone calls the accident a fluke or a plot, Curie would say: read the numbers, because the atoms were counting.",
      "frame": "Nadia slides her logbook across. \"They're already whispering I broke it, or that someone else did. I read every dial that night. Before you trust my numbers, show me you know what those dials even measure.\"",
      "q": [
        {
          "q": "What did Curie establish about radioactivity?",
          "o": [
            {
              "t": "That it is a property of the atom itself, independent of the element's chemical form.",
              "v": "expert",
              "fb": "Radioactivity is intrinsic to the atom, not a property of the compound."
            },
            {
              "t": "That it is a delicate reaction between atoms that the smallest disturbance can set off.",
              "v": "danger",
              "fb": "It is not a fragile chemical reaction; nothing external sets off a single atom."
            },
            {
              "t": "That it depends on the uranium's temperature and on how the sample has been prepared.",
              "v": "wrong",
              "fb": "Curie showed activity ignores temperature and chemical preparation largely."
            },
            {
              "t": "That primarily uranium is radioactive, so the effect is rare and easily contained.",
              "v": "partial",
              "fb": "She found activity in thorium and new elements too; uranium is not unique."
            }
          ]
        },
        {
          "q": "How did the Curies measure radioactivity?",
          "o": [
            {
              "t": "By the electric current the rays drove through air, read on a sensitive electrometer.",
              "v": "expert",
              "fb": "Ionized air conducts a tiny current; measuring it quantified the radiation."
            },
            {
              "t": "By the heat the rays gave off, gauged with a finely calibrated laboratory thermometer.",
              "v": "wrong",
              "fb": "Radium does warm slightly, but the Curies measured ionization, not heat."
            },
            {
              "t": "By how quickly the samples visibly glowed, which primarily the purest radium could do.",
              "v": "danger",
              "fb": "Glow is not the measurement; the electrometer read invisible ionization."
            },
            {
              "t": "By weighing the ore before and after, since activity slowly consumes the mineral.",
              "v": "partial",
              "fb": "The ore is not consumed measurably; activity was read electrically."
            }
          ]
        },
        {
          "q": "Why does measurable radioactivity matter to this inquiry?",
          "o": [
            {
              "t": "A reactor's power leaves a quantitative trace, so its behavior can be read, not guessed.",
              "v": "expert",
              "fb": "Instruments record the excursion; a runaway and a break-in read differently."
            },
            {
              "t": "Any radiation reading at all is proof that someone breached and tampered with the core.",
              "v": "danger",
              "fb": "Elevated radiation follows any power surge; it does not by itself mean sabotage."
            },
            {
              "t": "Radiation does not be measured in real time, so the night's events are lost for good.",
              "v": "wrong",
              "fb": "Curie's ionization chambers measure in real time; the traces survive."
            },
            {
              "t": "The dose to the crew is all that counts; the power history tells the board nothing.",
              "v": "partial",
              "fb": "Dose matters, but the power and flux record is what reveals the cause."
            }
          ]
        }
      ]
    },
    "neutron": {
      "whatHint": "Chadwick's neutron is what sustains the chain. Ask whether the power climbed by its own neutron feedback rather than by any tampering.",
      "sci": "James Chadwick (1891-1974)",
      "topic": "The neutron",
      "lede": "The quiet Cavendish physicist who caught the uncharged particle that makes every reactor — and every runaway — possible.",
      "no": 2,
      "profile": "James Chadwick discovered the particle that makes a reactor possible. Working under Rutherford at Cambridge's Cavendish Laboratory, he chased a puzzle: when beryllium was bombarded with alpha particles, it gave off a strange, highly penetrating radiation that carried no charge. Others guessed it was high-energy gamma rays, but the energetics did not add up. In 1932 Chadwick ran careful experiments showing the radiation could knock protons out of paraffin with an efficiency only a massive particle could explain. He concluded it was a new, electrically neutral particle with almost the same mass as the proton — the neutron. It won him the Nobel Prize in 1935.\n\nRutherford had predicted such a particle years earlier, but Chadwick proved it. The consequence was immediate and enormous. Because the neutron has no electric charge, it feels no repulsion from the positively charged nucleus; even a slow neutron can drift straight in and be captured. That is exactly what makes nuclear fission and a self-sustaining chain reaction possible: neutrons split heavy nuclei, which release more neutrons, which split more nuclei. Chadwick understood the stakes and became the scientific head of the British mission to the Manhattan Project.\n\nFor this board, the neutron is the currency of the whole event. A reactor's power is really a neutron population, multiplying or dying away from instant to instant. Control rods work by swallowing neutrons; the moderator works by slowing them so they split fuel more readily. When power runs away, it is the neutron count that explodes, and neutron detectors record that rise in fine detail. That trace is a physical fingerprint of an excursion — utterly unlike the mark an intruder would leave, and entirely foreseeable to anyone who understood Chadwick's particle.",
      "frame": "Sets a foil detector on the table. \"Everything that happened in that core, the neutrons wrote down for me. Show me you know what a neutron is before I share the count.\"",
      "q": [
        {
          "q": "What did Chadwick discover in 1932?",
          "o": [
            {
              "t": "A neutral particle of nearly proton mass behind beryllium's penetrating radiation.",
              "v": "expert",
              "fb": "The neutron: uncharged, roughly a proton's mass, and deeply penetrating."
            },
            {
              "t": "A new form of gamma ray far more energetic than any seen before from beryllium.",
              "v": "wrong",
              "fb": "The gamma explanation failed the energy bookkeeping; it was a particle."
            },
            {
              "t": "A ray so penetrating that no shielding can stop it or contain a reactor's core.",
              "v": "danger",
              "fb": "Neutrons are shielded routinely by water and concrete; not unstoppable."
            },
            {
              "t": "A second kind of electron, negatively charged but far heavier than the ordinary one.",
              "v": "partial",
              "fb": "It carries no charge at all and is not any kind of electron."
            }
          ]
        },
        {
          "q": "Why does the neutron's lack of charge matter?",
          "o": [
            {
              "t": "Feeling no repulsion, it enters nuclei easily, driving fission and the chain reaction.",
              "v": "expert",
              "fb": "No charge means no electrical barrier, so neutrons readily split fuel."
            },
            {
              "t": "Being electrically neutral, it passes through everything and can rarely be controlled.",
              "v": "danger",
              "fb": "Neutrons are absorbed by rods and moderators; they are controllable."
            },
            {
              "t": "Its neutrality lets it orbit the nucleus closely, holding the whole atom tightly together.",
              "v": "wrong",
              "fb": "Neutrons live in the nucleus, not in orbit; charge is a separate matter."
            },
            {
              "t": "It makes the neutron heavy, which is why it can knock protons loose on contact.",
              "v": "partial",
              "fb": "Mass and charge are distinct; its neutrality is what eases nuclear capture."
            }
          ]
        },
        {
          "q": "Why is the neutron central to this inquiry?",
          "o": [
            {
              "t": "Reactor power is a neutron population, and detectors record its explosive rise.",
              "v": "expert",
              "fb": "The flux trace is a physical fingerprint of the excursion, second by second."
            },
            {
              "t": "A neutron surge can primarily come from an intruder deliberately pulling the core apart.",
              "v": "danger",
              "fb": "A power excursion is neutron multiplication, not the mark of a saboteur."
            },
            {
              "t": "Neutrons does not be counted quickly, so the runaway left no usable record behind.",
              "v": "wrong",
              "fb": "Neutron detectors respond in milliseconds; the rise was recorded in detail."
            },
            {
              "t": "primarily the final dose matters; the neutron history adds nothing to the board's picture.",
              "v": "partial",
              "fb": "The flux record is precisely what tells a physical runaway from tampering."
            }
          ]
        }
      ]
    },
    "fissionchem": {
      "whatHint": "Hahn read fission by its chemical fingerprints. The isotopes in the debris say whose fuel burned; ask whether they match the core or something introduced.",
      "sci": "Otto Hahn (1879-1968)",
      "topic": "The chemistry of fission",
      "lede": "The meticulous radiochemist who found barium where uranium should have been — and could not believe his own flawless result.",
      "no": 3,
      "profile": "Otto Hahn is often called the father of nuclear chemistry, and it was his chemistry that caught nuclear fission in the act. A meticulous German radiochemist, he had worked with Lise Meitner in Berlin for thirty years, discovering the element protactinium and the phenomenon of nuclear isomerism along the way. In December 1938, with his assistant Fritz Strassmann, he bombarded uranium with neutrons and set out to identify what was produced.\n\nThe result baffled him. Among the products was barium — an element barely more than half the mass of uranium. Hahn's radiochemistry was too careful to be wrong: he could separate and identify the barium beyond doubt. But as a chemist he could not say how a uranium nucleus could shed so much of itself, and he wrote to Meitner in exile for help. Her physics supplied the answer — the nucleus had split — while his chemistry supplied the proof. He received the 1944 Nobel Prize in Chemistry for the discovery, an award that painfully omitted Meitner. After the war he spoke out against nuclear weapons and led German science as head of the Max Planck Society.\n\nFor this board, Hahn embodies evidence over assertion. Fission does not merely release energy; it leaves ash — a specific inventory of lighter elements, the fission products, each a chemical fingerprint of a nucleus that split. The mix and the amounts record how much fission occurred and under what conditions. From the debris in a wrecked core, a radiochemist can reconstruct the event as surely as Hahn read barium out of his uranium. That is the opposite of guessing at sabotage: the chemistry testifies to a power excursion, a physical process with a traceable, quantitative signature that no intruder's story can imitate.",
      "frame": "Squares a folder on the desk. \"Every claim in this inquiry needs a paper behind it. The fission products are the paper the core kept on itself. Show me you can read that chemistry.\"",
      "q": [
        {
          "q": "What did Hahn and Strassmann prove?",
          "o": [
            {
              "t": "That barium, far lighter than uranium, was among the products — proof the nucleus split.",
              "v": "expert",
              "fb": "Barium's presence was the chemical proof that uranium nuclei had divided."
            },
            {
              "t": "That the uranium sample had been chemically poisoned by someone deliberately tampering with it.",
              "v": "danger",
              "fb": "The barium came from fission, not contamination; the chemistry was clean."
            },
            {
              "t": "That uranium turns to lead through the ordinary chain of natural radioactive decay.",
              "v": "wrong",
              "fb": "Natural decay ends at lead slowly; this was prompt splitting into barium."
            },
            {
              "t": "That a new element heavier than uranium had been created by the added neutrons, in use.",
              "v": "partial",
              "fb": "Transuranics were the expectation; the shock was a much lighter product."
            }
          ]
        },
        {
          "q": "Why was identifying the products so difficult?",
          "o": [
            {
              "t": "The fission products were tiny traces mixed together, needing painstaking separation.",
              "v": "expert",
              "fb": "Minute quantities amid many others demanded exacting radiochemistry."
            },
            {
              "t": "The products were radioactive gases that escaped before they could be weighed.",
              "v": "wrong",
              "fb": "Most fission products are solids; careful chemistry pinned them down."
            },
            {
              "t": "The samples were so dangerous that no chemist could safely approach them at all.",
              "v": "danger",
              "fb": "The quantities were minute and workable; skill, not danger, was the barrier."
            },
            {
              "t": "The products decayed within seconds, leaving nothing behind to analyze at leisure.",
              "v": "partial",
              "fb": "Many products persist long enough to identify; separation was the real task."
            }
          ]
        },
        {
          "q": "Why does fission chemistry matter to this inquiry?",
          "o": [
            {
              "t": "Fission products fingerprint how much fission occurred, letting the board reconstruct it.",
              "v": "expert",
              "fb": "The product inventory records the excursion's size and course quantitatively."
            },
            {
              "t": "Any fission products found in the room establish a device was smuggled in and detonated.",
              "v": "danger",
              "fb": "Fission products come from the fuel splitting in the core, not from any bomb."
            },
            {
              "t": "The debris tells the board nothing, since fission products look identical for every fault.",
              "v": "wrong",
              "fb": "Product ratios vary with the event and reveal its specific history."
            },
            {
              "t": "The chemistry gives the fuel's age but reveals nothing about the night in question.",
              "v": "partial",
              "fb": "The inventory dates the fuel and quantifies the surge that occurred."
            }
          ]
        }
      ]
    },
    "firstpile": {
      "whatHint": "Fermi balanced the first pile on its feedback. Ask whether this core's feedback ran the wrong way past a known threshold — physics understood in advance, not an accident of pure chance.",
      "sci": "Enrico Fermi (1901-1954)",
      "topic": "The first controlled pile",
      "lede": "The Italian navigator who lit the first nuclear fire beneath a football stadium — and proved a chain reaction could be tamed.",
      "no": 4,
      "profile": "Enrico Fermi built the first nuclear reactor and proved that a chain reaction could be tamed. An Italian physicist of extraordinary range — equally gifted in theory and experiment — he had already won the 1938 Nobel Prize for creating radioactive isotopes by neutron bombardment and for discovering that slow neutrons are far more effective at splitting nuclei. He used the prize trip to Stockholm to escape Fascist Italy with his Jewish wife and emigrate to the United States.\n\nAt the University of Chicago, beneath the stands of an unused football field, Fermi and his team assembled Chicago Pile-1: a lattice of graphite blocks and lumps of uranium, studded with cadmium-coated control rods. The graphite slowed the neutrons so they would split more uranium; the rods, which soak up neutrons, held the reaction in check. On December 2, 1942, Fermi ordered the rods withdrawn a measured step at a time, watching the neutron count climb and level off exactly as his slide-rule predicted, until the pile sustained its own chain reaction for the first time in history. He kept it critical for less than half an hour, then ordered the rods back in.\n\nFor this board, Fermi's pile is the founding proof that a chain reaction is not a wild force but a controllable one. Control came from the rods and from a sliver of timing grace built into fission itself, and Fermi advanced only as fast as his measurements let him. A reactor that runs away has lost that control — and control is lost for physical, understandable reasons rooted in the design, not by fate and not by a phantom. Fermi's discipline was to move one careful step at a time and never past what the numbers allowed; a night-shift test that pushed a core past its margins is the exact opposite of how he worked.",
      "frame": "Nadia stands at the rail above the core. \"Fermi ran the first one of these by hand and never let it get ahead of him. That's how I was trained. Show me you know how the first pile was held in check.\"",
      "q": [
        {
          "q": "What did Fermi achieve on December 2, 1942?",
          "o": [
            {
              "t": "The first controlled, self-sustaining chain reaction, in a graphite-and-uranium pile.",
              "v": "expert",
              "fb": "A controlled, self-sustaining pile — the first working reactor."
            },
            {
              "t": "The first nuclear explosion, a small test blast beneath a Chicago football stadium.",
              "v": "danger",
              "fb": "It was controlled and released little energy; there was no explosion."
            },
            {
              "t": "The first electricity generated from atomic fission, lighting a single small bulb.",
              "v": "wrong",
              "fb": "CP-1 produced no electricity; it proved a controlled chain reaction."
            },
            {
              "t": "The first proof that uranium fissions, by detecting barium among the products.",
              "v": "partial",
              "fb": "Fission was already known; Fermi proved it could be self-sustaining."
            }
          ]
        },
        {
          "q": "How did Fermi control the pile?",
          "o": [
            {
              "t": "With neutron-absorbing rods, withdrawn or inserted to hold multiplication at one.",
              "v": "expert",
              "fb": "Cadmium rods soaked up neutrons; their position set the reactivity."
            },
            {
              "t": "By flooding it with water the instant the neutron count began to rise at all.",
              "v": "danger",
              "fb": "CP-1 had no such flood system; control was by the movable rods."
            },
            {
              "t": "By limiting the uranium so tightly that the reaction could rarely quite sustain.",
              "v": "wrong",
              "fb": "The pile was built to just reach critical; rods controlled it."
            },
            {
              "t": "By adjusting the graphite blocks between runs to tune how fast neutrons moved.",
              "v": "partial",
              "fb": "Graphite was fixed once built; the rods did the moment-to-moment control."
            }
          ]
        },
        {
          "q": "Why does the first pile matter to this inquiry?",
          "o": [
            {
              "t": "It proved a chain reaction is controllable, so lost control points to the machine.",
              "v": "expert",
              "fb": "Control is real physics; losing it has design causes, not fated ones."
            },
            {
              "t": "It proved reactors are so stable that primarily sabotage could ever make one run away.",
              "v": "danger",
              "fb": "Reactors can be tipped by their own feedbacks; sabotage is not required."
            },
            {
              "t": "It proved reactors are inherently wild, so any accident is simply bad luck.",
              "v": "wrong",
              "fb": "The pile showed control is achievable; a runaway means control was lost."
            },
            {
              "t": "It showed reactors make heat, which tells the board little about the accident.",
              "v": "partial",
              "fb": "The pile's lesson is controllability, which bears directly on this case."
            }
          ]
        }
      ]
    },
    "reactorphysics": {
      "whatHint": "Wigner knew reactors hide effects that bite at the margins. Ask whether the core's own physics, not an intruder, drove it.",
      "sci": "Eugene Wigner (1902-1995)",
      "topic": "Reactor physics & the Wigner effect",
      "lede": "The theorist who became a reactor engineer and catalogued the core's hidden traps — stored energy and the poison that chokes a chain.",
      "no": 5,
      "profile": "Eugene Wigner was the rare theorist who also became a reactor engineer, and the phenomena that bear his mark sit close to this case. A Hungarian-American physicist who would win the 1963 Nobel Prize for his work on symmetry in physics, Wigner turned during the war to designing the giant Hanford reactors that produced plutonium — arguably the first person to treat reactor design as a full engineering discipline rather than a physics experiment.\n\nTwo of his contributions matter here. The first is the Wigner effect: intense neutron bombardment knocks carbon atoms out of their normal positions in a graphite moderator, storing potential energy in the disordered lattice. If enough accumulates, it can be released suddenly as heat — a hazard behind the 1957 Windscale reactor fire. The second is his insight into fission-product poisoning. When the first Hanford reactor started up and then mysteriously died back hours later, Wigner and Fermi recognized the culprit: xenon-135, a fission product that is one of the most voracious neutron absorbers known. It builds up when power falls and smothers the chain reaction, then slowly burns off. Wigner had prudently designed in spare fuel channels, which saved the project.\n\nFor this board, Wigner's work is a catalogue of the reactor's hidden traps — effects that are subtle but entirely known and predictable to those who study them. A reactor sitting in a deeply xenon-poisoned, low-power state is in a treacherous condition: the poison must be overridden to restore power, and doing so carelessly can leave the core primed to surge once the xenon burns away. None of this is mysterious. It is textbook reactor physics. That is why an excursion reached during an ill-advised test is a foreseeable outcome rather than a freak of nature — the warnings were written into the science decades before.",
      "frame": "Unrolls a chart of xenon curves. \"The core was in a state a first-year student is taught to respect. If you think this was simply bad luck, you haven't met the physics yet. Let me test you.\"",
      "q": [
        {
          "q": "What is the Wigner effect?",
          "o": [
            {
              "t": "Neutron bombardment displaces graphite atoms, storing energy later freed as heat.",
              "v": "expert",
              "fb": "Displaced atoms store 'Wigner energy' that can later be freed as heat."
            },
            {
              "t": "Radiation makes the graphite so unstable it can explode without any warning at all.",
              "v": "danger",
              "fb": "The stored energy releases as heat, not as a spontaneous explosion."
            },
            {
              "t": "Neutrons make the graphite intensely radioactive, which is its primarily real hazard.",
              "v": "wrong",
              "fb": "Induced activity is separate; the Wigner effect is stored lattice energy."
            },
            {
              "t": "Irradiation gradually crumbles the graphite moderator to dust, weakening the core.",
              "v": "partial",
              "fb": "The lattice disorders and stores energy; it does not simply crumble."
            }
          ]
        },
        {
          "q": "What is xenon poisoning?",
          "o": [
            {
              "t": "Xenon-135, a fission product and strong neutron absorber, builds up and chokes the chain.",
              "v": "expert",
              "fb": "Xenon-135 absorbs neutrons voraciously, suppressing power after a drop."
            },
            {
              "t": "A leak of xenon gas into the reactor hall that would swiftly poison anyone working nearby.",
              "v": "danger",
              "fb": "Xenon poisoning is neutronic, not a toxic gas hazard to workers."
            },
            {
              "t": "A slow chemical corrosion of the fuel rods by xenon gas released during operation.",
              "v": "wrong",
              "fb": "It is neutron absorption, not chemical corrosion of the rods."
            },
            {
              "t": "A buildup of ash in the fuel that gradually lowers how much heat the core can make.",
              "v": "partial",
              "fb": "It is specifically neutron absorption by xenon-135, not generic ash."
            }
          ]
        },
        {
          "q": "Why does reactor physics matter to this inquiry?",
          "o": [
            {
              "t": "These effects are known, so a poisoned or over-stressed core is a foreseeable hazard.",
              "v": "expert",
              "fb": "Xenon and stored energy are textbook; the hazard was predictable, not fated."
            },
            {
              "t": "These effects are so obscure that no working operator could have seen the danger coming.",
              "v": "danger",
              "fb": "These effects are standard curriculum; the danger was well understood."
            },
            {
              "t": "These effects vanish largely at full power, so they had no bearing on the night's events.",
              "v": "wrong",
              "fb": "Xenon poisoning is worst at low power, exactly the test condition here."
            },
            {
              "t": "These effects change the dose but not the odds of the reactor running away, in use.",
              "v": "partial",
              "fb": "These effects directly shape reactivity and the chance of an excursion."
            }
          ]
        }
      ]
    },
    "betadecay": {
      "whatHint": "Wu trusted precise measurement over expectation. The flux record is a measurement; ask whether it shows a designed threshold crossed, not an unlucky fluke.",
      "sci": "Chien-Shiung Wu (1912-1997)",
      "topic": "Beta decay & precision measurement",
      "lede": "The 'First Lady of Physics' who overturned a law of nature by refusing to trust anything she had not measured to the last decimal.",
      "no": 6,
      "profile": "Chien-Shiung Wu was the most exacting experimental physicist of her generation, and her craft is the standard an inquiry should hold itself to. Born near Shanghai and educated at Berkeley, she became known as the 'First Lady of Physics.' During the war she joined the Manhattan Project, where her doctoral expertise proved unexpectedly vital: when the first Hanford production reactor started up and then died back, it was Wu's earlier measurements of xenon-135 as a fission product — and of how ferociously it absorbs neutrons — that helped explain the poisoning that was choking the chain reaction.\n\nHer most celebrated work came in 1956. Two theorists, Lee and Yang, proposed that the weak interaction governing beta decay might violate 'parity' — that nature might, at the deepest level, tell left from right. Most physicists thought it absurd. Wu designed and executed a beautifully controlled experiment, cooling cobalt-60 nuclei to near absolute zero and aligning their spins, and showed that the electrons from beta decay flew off preferentially in one direction. Parity was violated. Lee and Yang won the Nobel Prize; Wu, whose experiment proved them right, was passed over — a famous oversight.\n\nFor this board, Wu offers method as much as physics. Beta decay is the process by which a neutron in a nucleus turns into a proton, spitting out an electron and a neutrino; it is also how fission products transform, giving rise both to the delayed neutrons that make a reactor controllable and to poisons like xenon. But Wu's deeper lesson is discipline: she trusted no result until every variable was pinned down. A board tempted by a quick, dramatic answer — sabotage — or a quick, comforting one — a fluke — should remember that Wu overturned a law of physics only because she refused to accept anything she had not measured to the last decimal.",
      "frame": "Lines up three signed statements. \"Two of these can't both be true. Wu would have measured her way to the answer and trusted nothing else. Show me you can be that careful about beta decay.\"",
      "q": [
        {
          "q": "What did Wu's 1956 experiment demonstrate?",
          "o": [
            {
              "t": "That beta decay violates parity — nature can tell left from right at the deepest level.",
              "v": "expert",
              "fb": "Aligned cobalt-60 sent electrons one way — parity is not conserved."
            },
            {
              "t": "That radioactive atoms can be made to decay on command by cooling them near zero.",
              "v": "danger",
              "fb": "Cooling aligned the spins; it did not trigger decay on command."
            },
            {
              "t": "That beta particles travel faster than light when a nucleus is chilled enough.",
              "v": "wrong",
              "fb": "Nothing exceeds light speed; she measured a directional asymmetry."
            },
            {
              "t": "That cobalt-60 emits electrons equally in every direction, as symmetry demands.",
              "v": "partial",
              "fb": "The whole point was that emission was not symmetric; parity failed."
            }
          ]
        },
        {
          "q": "What is beta decay?",
          "o": [
            {
              "t": "A nucleus turns a neutron into a proton, emitting an electron and a neutrino.",
              "v": "expert",
              "fb": "Neutron-to-proton conversion emits a beta electron and a neutrino."
            },
            {
              "t": "A nucleus violently bursts apart, scattering protons and neutrons in all directions.",
              "v": "danger",
              "fb": "That is fission or fragmentation; beta decay changes just one nucleon."
            },
            {
              "t": "A nucleus absorbs an electron from its innermost orbit and grows one unit heavier.",
              "v": "wrong",
              "fb": "That is electron capture; ordinary beta-minus emits an electron instead."
            },
            {
              "t": "A nucleus sheds a helium nucleus, dropping two protons and two neutrons at once.",
              "v": "partial",
              "fb": "That is alpha decay; beta decay involves no helium nucleus."
            }
          ]
        },
        {
          "q": "Why does Wu's precision matter to this inquiry?",
          "o": [
            {
              "t": "She trusted only measured facts, the standard for rejecting a convenient story here, in use.",
              "v": "expert",
              "fb": "Measure everything, assume nothing — that discipline rejects both traps."
            },
            {
              "t": "Her work is presented as showing reactors are unpredictable, so no accident can truly be explained.",
              "v": "danger",
              "fb": "Wu made physics more predictable, not less; her rigor cuts against 'fluke.'."
            },
            {
              "t": "Her parity result already settles the cause of the accident, with no further inquiry needed.",
              "v": "wrong",
              "fb": "Parity has no bearing on the cause; her method, not her result, applies."
            },
            {
              "t": "Her rigor matters primarily in a laboratory, not in a working reactor investigation, in use.",
              "v": "partial",
              "fb": "Her method applies exactly here: reconstruct the event from hard evidence."
            }
          ]
        }
      ]
    },
    "inherentsafety": {
      "whatHint": "Weinberg asked whether a reactor is safe by design or by luck. Ask whether this one's flaw was known and undisclosed rather than a one-in-a-million chance.",
      "sci": "Alvin Weinberg (1915-2006)",
      "topic": "Reactor design & inherent safety",
      "lede": "The Oak Ridge director who coined 'inherent safety' and warned that nuclear power is a Faustian bargain paid in permanent honesty.",
      "no": 7,
      "profile": "Alvin Weinberg spent his life on the question this inquiry turns on: what makes a reactor safe by its very nature. An American physicist who directed Oak Ridge National Laboratory for eighteen years, he co-invented the pressurized-water reactor with Eugene Wigner and then became the technology's most thoughtful critic. He coined the phrase 'inherent safety' and argued that the ideal reactor is one whose own physics protects it — so that if power starts to rise, the reactor's response is to push reactivity down and quiet itself, with no operator and no active system required.\n\nWeinberg contrasted this with reactors that lean on engineered safeguards and human vigilance to stay out of trouble. He championed the molten-salt reactor precisely because he believed it failed safe. And he famously called nuclear energy a 'Faustian bargain': society gains an almost limitless energy source, but only if it commits to the long-term discipline, care, and honesty the technology demands, forever. Break that bargain — cut corners, hide problems — and the gift turns dangerous.\n\nFor this board, Weinberg names the fault line at the center of the case. A well-designed reactor has negative feedback: heat up, and reactivity drops. A dangerous reactor can have the reverse under some conditions — a positive feedback in which a rise in power or a change in coolant increases reactivity, driving power higher still. That is the opposite of inherent safety, and it is a property of the design, chosen or tolerated by whoever drew it. Weinberg would tell the board that if the Thornbury core could reinforce its own power under the conditions of that test, then no operator error and no outside enemy is needed to explain a runaway — the machine was built to be able to run away, and someone decided that was acceptable.",
      "frame": "Nadia looks around the design office. \"Out here they decide whether the machine forgives a mistake or punishes it. I want to know which one they built. Tell me what inherent safety means.\"",
      "q": [
        {
          "q": "What is inherent (passive) safety?",
          "o": [
            {
              "t": "Physics that lowers reactivity as power rises, so the reactor quiets itself unaided.",
              "v": "expert",
              "fb": "Negative feedback means a power rise damps itself, with no action needed."
            },
            {
              "t": "A reactor so heavily guarded that no accident of any kind is physically possible.",
              "v": "danger",
              "fb": "No reactor is accident-proof; inherent safety is self-damping physics."
            },
            {
              "t": "A bank of backup pumps and diesels that switch on the instant anything goes wrong.",
              "v": "wrong",
              "fb": "Those are active safeguards; inherent safety needs no equipment to act."
            },
            {
              "t": "A trained operator watching the gauges closely enough to catch every small rise in power.",
              "v": "partial",
              "fb": "Inherent safety works without an operator; it is built into the physics."
            }
          ]
        },
        {
          "q": "What did Weinberg mean by a 'Faustian bargain'?",
          "o": [
            {
              "t": "Nuclear power gives great benefit but demands permanent discipline and honesty in return.",
              "v": "expert",
              "fb": "Great energy in exchange for lasting vigilance — that is the bargain."
            },
            {
              "t": "Nuclear power is a pact with the devil that is certain to destroy whoever ever dares use it.",
              "v": "danger",
              "fb": "He meant sober commitment, not literal doom; discipline is the price."
            },
            {
              "t": "Nuclear power is largely free of cost once the first reactor has been fully built.",
              "v": "wrong",
              "fb": "The bargain is ongoing care, not a one-time cost; vigilance rarely ends."
            },
            {
              "t": "Nuclear power is risky primarily for the first generation, then becomes largely safe.",
              "v": "partial",
              "fb": "The vigilance he demanded is permanent, not a passing phase."
            }
          ]
        },
        {
          "q": "Why does inherent safety matter to this inquiry?",
          "o": [
            {
              "t": "A positive feedback under some conditions means a surge can grow instead of self-correcting.",
              "v": "expert",
              "fb": "If feedback goes positive, power reinforces itself — no enemy needed."
            },
            {
              "t": "A missing safeguard would establish an intruder disabled it, since the physics itself rarely fails.",
              "v": "danger",
              "fb": "Positive feedback is a design property, not evidence of tampering."
            },
            {
              "t": "Inherent safety is automatic, so any well-built reactor simply does not ever surge at all.",
              "v": "wrong",
              "fb": "Not all reactors are inherently safe; some can amplify a surge by design."
            },
            {
              "t": "Inherent safety concerns primarily brand-new designs, not a reactor already in service today.",
              "v": "partial",
              "fb": "Inherent safety is a property of this operating reactor's design too."
            }
          ]
        }
      ]
    },
    "healthphysics": {
      "whatHint": "Morgan mapped where dose and contamination fall. Ask whether the pattern is a reactor venting its own excursion, not a breach forced from outside.",
      "sci": "Karl Z. Morgan (1907-1999)",
      "topic": "Health physics & radiation dose",
      "lede": "The father of health physics, who built the science of measuring dose — and later turned to warn the industry he had helped create.",
      "no": 8,
      "profile": "Karl Z. Morgan is called the father of health physics — the science of protecting people from radiation — and both his measurements and his conscience speak to this case. Recruited to the Manhattan Project, he was tasked with keeping the workers who handled unprecedented quantities of radioactive material from being harmed. From that wartime urgency he built an entire discipline: how to measure radiation dose, how to set exposure limits, and how to track radioactive material once it enters the body. He led health physics at Oak Ridge for decades and became the first president of the Health Physics Society.\n\nMorgan championed the principle now known as ALARA — keep every dose 'as low as reasonably achievable' — grounded in the sober assumption that there may be no perfectly safe threshold, so even small exposures carry some risk. He pressed for careful monitoring, shielding, and honest accounting of doses. And in his later years he did something rarer: he turned critic, testifying that the industry he had helped build was underplaying the hazards of low-level radiation. He spoke uncomfortable truths against powerful pressure to stay quiet.\n\nFor this board, Morgan supplies both a tool and a warning. The tool is dose: radiation released in an accident is measurable, and the pattern and quantity of that release record how much fuel fissioned, how fast, and where it went. A power excursion leaves a distinctive radiological signature — a burst of specific fission products in specific places — quite unlike anything an intruder could stage. The warning is his life's second act: that those closest to a nuclear program may know its dangers and be pressed to keep silent. A board should weigh both the numbers on the dosimeters and the possibility that someone with knowledge was told to look away.",
      "frame": "Spreads the dose maps across the design table. \"These numbers don't argue and they don't forget. Morgan built the whole science of reading them. Show me you can, and I'll tell you what they say happened.\"",
      "q": [
        {
          "q": "What is health physics?",
          "o": [
            {
              "t": "The science of measuring radiation and protecting people from its harm.",
              "v": "expert",
              "fb": "Morgan's field measures dose and shields people from radiation harm."
            },
            {
              "t": "The study of using radiation to cure disease at the highest possible dose.",
              "v": "danger",
              "fb": "That is radiation therapy; health physics limits and protects against dose."
            },
            {
              "t": "The branch of physics that designs the reactors themselves for maximum output.",
              "v": "wrong",
              "fb": "Reactor design is separate; health physics protects people from radiation."
            },
            {
              "t": "The practice of cleaning up radioactive spills after an accident has occurred.",
              "v": "partial",
              "fb": "Cleanup is one part; the field is measurement and protection broadly."
            }
          ]
        },
        {
          "q": "What does the ALARA principle require?",
          "o": [
            {
              "t": "Keep doses as low as reasonably achievable, since no dose is surely without risk.",
              "v": "expert",
              "fb": "ALARA drives dose down because there may be no safe threshold at all."
            },
            {
              "t": "Permit any dose below a high threshold, since low-level radiation is largely harmless.",
              "v": "danger",
              "fb": "ALARA assumes there may be no safe threshold; it does not permit exposure freely."
            },
            {
              "t": "Match each worker's dose to a fixed annual quota and stop measuring once it is met.",
              "v": "wrong",
              "fb": "ALARA minimizes dose continuously; it is not a quota to spend down."
            },
            {
              "t": "Shield primarily the workers nearest the core, since distant staff face no real hazard.",
              "v": "partial",
              "fb": "ALARA protects everyone exposed, not primarily the closest workers."
            }
          ]
        },
        {
          "q": "Why does dose measurement matter to this inquiry?",
          "o": [
            {
              "t": "The release records how much fuel fissioned and how fast, revealing the excursion.",
              "v": "expert",
              "fb": "The radiological signature reconstructs the excursion's scale and course."
            },
            {
              "t": "Any radiation found is certain proof that a device was smuggled in and detonated inside.",
              "v": "danger",
              "fb": "A power surge releases radiation too; it is no proof of a bomb."
            },
            {
              "t": "Dose reveals primarily who was harmed, rarely anything about how the accident unfolded.",
              "v": "wrong",
              "fb": "The release pattern encodes the event's size, speed, and location."
            },
            {
              "t": "The dose maps show where people stood but does not indicate the size of the event.",
              "v": "partial",
              "fb": "The quantity and mix of products directly scale the excursion."
            }
          ]
        }
      ]
    },
    "riskassessment": {
      "whatHint": "Rasmussen put numbers to reactor accidents. 'Vanishingly unlikely' is a claim to test: ask whether the sequence followed known physics a design review had already flagged.",
      "sci": "Norman Rasmussen (1927-2003)",
      "topic": "Reactor risk assessment",
      "lede": "The MIT engineer who first put hard numbers on reactor catastrophe — and gave the board the arithmetic to test a 'one-in-a-billion' fluke.",
      "no": 9,
      "profile": "Norman Rasmussen taught the nuclear field how to put numbers on catastrophe, and his methods are the direct answer to anyone calling the Thornbury accident a one-in-a-billion fluke. A physicist and nuclear engineer at MIT, he was chosen in the early 1970s to lead a landmark study of how likely a serious reactor accident really was. The result, published in 1975 as WASH-1400, the Reactor Safety Study, was the first large-scale application of probabilistic risk assessment to nuclear power.\n\nRasmussen's team did not guess. They broke potential accidents into sequences — an initiating event, followed by the success or failure of each safety system in turn — and built 'event trees' and 'fault trees' to trace every path to core damage and estimate the probability of each. The study was influential and also controversial; a later review panel criticized its handling of uncertainty. But it established the framework the whole industry now uses to find weak points and rank hazards, and it made explicit that reactor accidents are not single random strokes but chains of failures whose odds can be estimated.\n\nFor this board, Rasmussen is the antidote to the dismissal trap. 'A vanishingly unlikely accident, no one's fault' is a claim about probability, and probability can be checked. Risk assessment asks: what was the true chain here — a design feature that could turn feedback the wrong way, a safety margin knowingly violated, a test run in a forbidden regime, a warning left unshared? Each link raises the odds, and together they can turn a supposed one-in-a-billion event into something that was, in truth, waiting to happen. Rasmussen's trees expose the difference between an accident that was genuinely improbable and one that only looks that way because someone hid a branch of the tree from view.",
      "frame": "Lays out a fan of fault-tree diagrams. \"People love the phrase 'one in a billion.' Rasmussen taught us to actually do the arithmetic. Show me you can, and I'll tell you which branch of this tree went missing.\"",
      "q": [
        {
          "q": "What is probabilistic risk assessment?",
          "o": [
            {
              "t": "A method estimating accident odds by mapping chains of failures through logic trees.",
              "v": "expert",
              "fb": "Event and fault trees estimate the odds of each accident sequence."
            },
            {
              "t": "A promise that reactors are perfectly safe, since every accident is ruled highly unlikely.",
              "v": "danger",
              "fb": "PRA quantifies risk; it rarely claims accidents are highly unlikely."
            },
            {
              "t": "A single overall safety rating stamped on a reactor once at the time it is licensed.",
              "v": "wrong",
              "fb": "PRA is an analysis of failure paths, not a one-time stamp."
            },
            {
              "t": "A tally of past accidents used to guess how often the next one will occur, in use.",
              "v": "partial",
              "fb": "PRA models sequences from first principles, not just past counts."
            }
          ]
        },
        {
          "q": "What did Rasmussen's WASH-1400 do?",
          "o": [
            {
              "t": "It gave the first systematic estimate of reactor accident probabilities and effects.",
              "v": "expert",
              "fb": "It pioneered probabilistic risk assessment for reactor accidents."
            },
            {
              "t": "It proved a serious reactor accident could rarely physically happen in any design, in use.",
              "v": "danger",
              "fb": "It estimated real, nonzero accident odds; it did not rule accidents out."
            },
            {
              "t": "It set out the legal radiation dose limits that every nuclear plant is likely to operate within.",
              "v": "wrong",
              "fb": "Dose limits are Morgan's domain; WASH-1400 estimated accident risk."
            },
            {
              "t": "It ranked reactors by cost, choosing the cheapest safe design for the utilities, in use.",
              "v": "partial",
              "fb": "It assessed safety risk, not construction cost."
            }
          ]
        },
        {
          "q": "Why does risk assessment matter to this inquiry?",
          "o": [
            {
              "t": "It tests the 'fluke' claim, since a hidden flaw makes the accident far more likely, in use.",
              "v": "expert",
              "fb": "Each concealed flaw and violated margin raises the odds far above 'freak.'."
            },
            {
              "t": "It shows the odds are so tiny that this accident truly is likely to have been an act of God alone.",
              "v": "danger",
              "fb": "A concealed flaw removes the low odds; the event was not improbable."
            },
            {
              "t": "It is presented as showing nothing, since accident odds can rarely be calculated for a real reactor.",
              "v": "wrong",
              "fb": "Rasmussen showed odds can be estimated sequence by sequence."
            },
            {
              "t": "It scores the reactor overall but says nothing about this particular sequence, in tests.",
              "v": "partial",
              "fb": "PRA works precisely at the level of the specific accident sequence."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "operator2": {
      "control": "Nadia sits at her own console, the test log open. \"I turned every knob exactly as written. If the procedure was a trap, I walked into it blind. Show me you understand this room and I'll tell you what the book told me to do.\"",
      "hall": "Nadia leads you onto the gantry above the core. \"This is where my numbers turned to noise. I know what I did; I want to know what the machine did back. Prove you can follow it.\"",
      "designoffice": "Nadia stands stiffly among the drafting tables. \"They wrote the book I followed. Somewhere out here is the reason it was wrong. Help me understand the physics and I'll show you the line I was told never to question.\""
    },
    "healthphys": {
      "control": "The Health Physicist scrolls the flux recording. \"The detectors caught the whole rise, millisecond by millisecond. Convince me you can read what they saw, and I'll tell you how fast it truly ran.\"",
      "hall": "The Health Physicist checks a survey meter against the core. \"The dose here tells me how much fuel let go, and when. Show me you know the physics, and I'll tell you what the readings rule out.\"",
      "designoffice": "The Health Physicist spreads dose maps over a designer's desk. \"These numbers match a power excursion and nothing else — not a bomb, not a fluke. Earn it, and I'll walk you through why.\""
    },
    "clerk": {
      "control": "The Clerk arrives with a trolley of logbooks. \"Every switch throw in here is written down somewhere. The trouble is what isn't. Show me you understand this place and I'll tell you which records to trust.\"",
      "hall": "The Clerk eyes the core uneasily, clipboard clutched tight. \"I file what the physicists hand me; I don't come down here often. Prove you grasp the machine, and I'll tell you what crossed my desk about it.\"",
      "designoffice": "The Clerk stands beside a locked cabinet. \"This is where the design files live — every one stamped, dated, and shelved. Some were shelved a little too quickly. Show me you understand the physics, and I'll tell you which drawer to open.\""
    }
  },
  "story": [
    "<b>The Thornbury Reactor</b> begins inside the Thornbury reactor inquiry, where the first explanation is already spreading faster than the evidence.",
    "<b>Operator Nadia Sorel</b>, <b>The Health Physicist</b>, and <b>The Clerk</b> each hold a different part of the record, and each conversation opens with one real pioneer whose work changes how the evidence should be read.",
    "The inquiry keeps circling <b>Sabotage or an attack on the plant</b> and <b>A freak accident — vanishingly unlikely</b>. Both are tempting, and neither can be accepted just because it makes the cleanest headline.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and make the final WHAT judgment from what you learned."
  ],
  "endings": {
    "overclaimWhat": "attack",
    "dismissalWhat": "freak",
    "win": {
      "expertTitle": "What the Traces Prove, and No More",
      "expert": [
        "Vrain names it exactly: Aldous Reeve, the chief reactor designer, whose office holds the safety report he shelved rather than share; the truth culminating in the Design Authority's Office, where the concealed flaw and the buried memo live; and a hidden design flaw — a positive feedback that let the core reinforce its own power, driven past its margin during the night-shift test. Not an attack. Not a freak of nature.",
        "Every card accounted for. Vrain worked the control room, the reactor hall, and the design office, turned a wary clerk into a witness, and claimed precisely what the flux traces and the shelved report could defend. The inquiry issues findings that shut down the flawed cores and force the fault into the open — which is the entire point of doing it right."
      ],
      "soundTitle": "Right — but Lightly Proven",
      "sound": [
        "Vrain names the right three — Reeve, the Design Office, and the concealed design flaw run past its margin. The shape of the case is correct, and the refusal to cry sabotage or shrug off a fluke is exactly right.",
        "But too many threads were left loose, and the design authority's lawyers will pull at them. A few more days tracing the shelved report and the flux record would have made the finding unassailable. Close and honest, if not yet airtight."
      ],
      "namedTitle": "The Right Answer, Unearned",
      "named": [
        "Vrain names the truth — Reeve, the Design Office, the concealed flaw driven past its margin — but gathered too little to back it. It reads like a hunch that happened to land.",
        "The inquiry cannot shut down a fleet on an accusation this thin, however correct. Being right is not the same as being able to prove it to the people who will fight the finding."
      ]
    },
    "overclaim": {
      "title": "The Inquiry That Cried Sabotage",
      "body": [
        "Vrain reports sabotage — an attack on the plant — the answer the cameras were already broadcasting. It is vivid, and it is not what the evidence shows.",
        "The flux traces show a physical power excursion, the fission-product signature matches the core's own fuel, and no intruder left a mark — only a reactor reinforcing its own power until it ran away. When the overclaim collapses, it takes the inquiry's credibility with it, and the real, provable flaw is dismissed as one more conspiracy theory. The only saboteur was a feedback built into the design and a report someone chose not to read."
      ]
    },
    "dismissal": {
      "title": "Case Closed as an Act of God",
      "body": [
        "Vrain files it as a freak accident — vanishingly unlikely, no one's fault, close the file. It is comforting, and it misses the graver truth.",
        "The runaway followed known physics across a known threshold, in a core whose designers understood its flaw and did not disclose it. Calling it fate leaves that flaw in every sister reactor still running, waiting for the next night-shift test to find it again. The inquiry saw an unlucky night and never the hazard that had been designed in and hidden."
      ]
    },
    "wrongNames": {
      "title": "So Close",
      "body": [
        "Vrain has the nature of it cold — a concealed design flaw, a core driven past its margin into a runaway, neither an attack nor a freak of nature. But the finger lands on the wrong name or the wrong room."
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A reactor core with control rods and a rising power trace\"><rect x=\"76\" y=\"32\" width=\"176\" height=\"76\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><line x1=\"118\" y1=\"18\" x2=\"118\" y2=\"84\" stroke=\"#121212\" stroke-width=\"3\"/><line x1=\"164\" y1=\"18\" x2=\"164\" y2=\"72\" stroke=\"#121212\" stroke-width=\"3\"/><line x1=\"210\" y1=\"18\" x2=\"210\" y2=\"92\" stroke=\"#121212\" stroke-width=\"3\"/><path d=\"M302 100 L382 94 L432 88 L474 72 L510 40 L558 18\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"2.4\"/><path d=\"M302 30 L302 108 L588 108\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.4\"/></svg>"
}};
