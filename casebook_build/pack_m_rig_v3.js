// Casebook V3 — three informants, three readings, one clue per correct answer.
module.exports = { PACK: {
  "schemaVersion": 3,
  "mode": "three_informants_three_readings",
  "id": "m_rig",
  "title": "The Deepwater Meridian",
  "discipline": "Drilling & Well Control",
  "venue": "the Meridian blowout inquiry",
  "agent": {
    "name": "Investigator Ike Marlow",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Commission credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Drilling & Well-Control Pioneers",
  "dossierName": "DRILLING & WELL-CONTROL PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Meridian blowout inquiry",
  "teaser": "An offshore well flows onto the rig after a negative-pressure test is called successful. Was the platform attacked, did an unknowable gas pocket overwhelm every barrier, or did the driller misread the test and displace heavy mud before the cement barrier was proved?",
  "overclaimTag": "sabotage at the wellhead",
  "truthTag": "a frontline well-control decision after a failed test",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A well column underbalanced after a failed cement test\"><path d=\"M270 15 v110 M390 15 v110\" stroke=\"#121212\" stroke-width=\"4\"/><path d=\"M290 20 v100 M370 20 v100\" stroke=\"#326891\" stroke-width=\"3\"/><path d=\"M330 120 C300 92,365 72,325 44 C300 26,350 18,334 2\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"5\"/><path d=\"M70 110 h160 M430 110 h160\" stroke=\"#e2e2d8\" stroke-width=\"2\"/></svg>",
  "overclaimTease": "A blowout is a pressure sequence before it is a fire. Read the gas expansion, cement barrier, returns, and the exact handoff that declared a failed test acceptable.",
  "DAYS_TOTAL": 3,
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "rg_driller",
      "items": [
        {
          "id": "rg_operator",
          "label": "Dalton Voss — well operator’s rig manager"
        },
        {
          "id": "rg_driller",
          "label": "Cal Rusk — the rig’s driller"
        },
        {
          "id": "rg_regulator",
          "label": "The offshore-safety regulator"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "rg_floor",
      "items": [
        {
          "id": "rg_wellhead",
          "label": "The Wellhead & Blowout Preventer"
        },
        {
          "id": "rg_floor",
          "label": "The Drill Floor & Mud-Logging Console"
        },
        {
          "id": "rg_office",
          "label": "The Operator’s Onshore Office"
        }
      ]
    },
    "what": {
      "title": "What happened",
      "truth": "rg_wellcontrol",
      "items": [
        {
          "id": "rg_wellcontrol",
          "label": "A failed barrier test was accepted before heavy mud was displaced"
        },
        {
          "id": "rg_attack",
          "label": "Sabotage opened a flow path through the well-control equipment"
        },
        {
          "id": "rg_pocket",
          "label": "An unforeseeable gas pocket defeated correctly tested barriers"
        }
      ]
    }
  },
  "READING_ORDER": [
    "rg_roughneck",
    "rg_mudlogger",
    "rg_clerk"
  ],
  "CHARACTERS": {
    "rg_roughneck": {
      "name": "Roughneck Sal Ortiz",
      "role": "Drill-floor roughneck",
      "face": "🔧",
      "badge": "R",
      "legend": "the displacement line",
      "hint": "Mud returns changed during displacement after the driller called an unstable pressure test acceptable.",
      "reading": "rg_boyle"
    },
    "rg_mudlogger": {
      "name": "The Mud Logger",
      "role": "Mud-logging technician",
      "face": "📈",
      "badge": "M",
      "legend": "the returns display",
      "hint": "Flow continued with pumps off and gas units climbed before the final kick was acknowledged.",
      "reading": "rg_halliburton"
    },
    "rg_clerk": {
      "name": "The Well Records Clerk",
      "role": "Test and operations clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the rig record",
      "hint": "The test sheet contains a handwritten pass entered by the driller despite contradictory pressure and flow.",
      "reading": "rg_bernoulli"
    }
  },
  "TOPICS": {
    "rg_boyle": {
      "sci": "Robert Boyle (1627-1691)",
      "topic": "The gas law & expanding gas",
      "lede": "The founder of the chemical experiment, who squeezed air in a bent glass tube and found the law that turns a bubble at depth into a wall of gas at the surface.",
      "no": 1,
      "profile": "Robert Boyle was an Anglo-Irish natural philosopher, a founder of the Royal Society, and a champion of the experimental method who insisted that claims be tested, measured, and reported honestly. Working with his assistant Robert Hooke and an improved air pump, he studied the 'spring of the air.' In 1662 he published the relationship now called Boyle's law: at constant temperature, the pressure of a fixed amount of gas is inversely proportional to its volume. Halve the pressure and the gas doubles in size; drop the pressure to a fraction and the gas swells enormously.\n\nThat inverse law is the engine of a blowout. Gas that enters a well at the bottom sits under thousands of pounds of pressure, squeezed into a small volume. As the well flows and that gas migrates upward, the pressure around it falls, and by Boyle's law it expands — slowly at first, then violently in the last few hundred metres, where each drop in pressure multiplies its volume. The expanding gas pushes mud out ahead of it, which lowers the pressure further, which expands the gas further: a runaway that can empty a well in seconds.\n\nFor this inquiry, Boyle explains why a small, ignored inflow becomes a fireball. A kick that looks minor at depth is a coiled spring; let it climb unchecked and Boyle's law releases it all at once. This is not the caprice of a 'freak pocket' — it is a law known since 1662, and it is precisely why wells carry blowout preventers to shut the gas in while it is still small and deep. The physics is old and certain. The only variable at the Meridian was whether the barriers meant to interrupt it were doing their job.",
      "frame": "Ortiz's voice goes flat. \"A cupful of gas down deep is a truckload by the time it reaches you. Prove you understand that, and I'll tell you how fast the floor cleared.\"",
      "q": [
        {
          "q": "At fixed temperature, how are a gas’s pressure and volume connected?",
          "o": [
            {
              "t": "A gas's pressure and volume inversely, at a fixed temperature and amount.",
              "v": "expert",
              "fb": "Lower the pressure and the volume rises in proportion — Boyle's inverse law."
            },
            {
              "t": "A gas's temperature and volume directly, so warming generally shrinks the gas.",
              "v": "wrong",
              "fb": "That is a different relation, and warming expands rather than shrinks a gas."
            },
            {
              "t": "A gas's weight and its color, letting one read its pressure by eye at depth.",
              "v": "wrong",
              "fb": "Boyle's law links pressure and volume, not weight and color."
            },
            {
              "t": "A gas's pressure and volume, but mainly for gases that rarely actually flow.",
              "v": "partial",
              "fb": "The law holds for flowing gas too; migrating gas obeys it as it rises."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "Boyle’s expanding-gas sequence begins only after the driller orders displacement, focusing the initiating decision on the drill floor rather than the regulator or onshore office."
          }
        },
        {
          "q": "Why does a small gas kick become dangerous near the surface?",
          "o": [
            {
              "t": "Because the surface air chemically ignites any gas the instant it arrives.",
              "v": "danger",
              "fb": "The danger is expansion and volume, not spontaneous ignition on contact."
            },
            {
              "t": "Falling pressure lets it expand fast, pushing out mud and unloading the well.",
              "v": "expert",
              "fb": "Expansion near the top is explosive because pressure drops fastest there."
            },
            {
              "t": "Because gas gains mass as it rises, growing heavier with nearly every metre it climbs.",
              "v": "wrong",
              "fb": "Its mass is fixed; it is the volume that grows as pressure falls."
            },
            {
              "t": "Because the drill pipe narrows near the top, squeezing the gas into a smaller space.",
              "v": "partial",
              "fb": "Geometry matters less than Boyle's law; the gas expands regardless."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "Gas volume grows as hydrostatic pressure falls during displacement, explaining the accelerating kick without a mysterious new reservoir pocket."
          }
        },
        {
          "q": "What does Boyle's law say about a 'freak pocket' explanation?",
          "o": [
            {
              "t": "Nothing — expanding gas is chaotic, so no equipment could ever have stopped it.",
              "v": "danger",
              "fb": "Preventers are built precisely because the expansion is lawful and foreseeable."
            },
            {
              "t": "That gas expansion is far too slow to matter over the height of a real well.",
              "v": "wrong",
              "fb": "Expansion accelerates near the surface and is anything but slow."
            },
            {
              "t": "Gas behaves by a known law, so a preventer is meant to catch it while small.",
              "v": "expert",
              "fb": "The physics is predictable, which is exactly why barriers exist to interrupt it."
            },
            {
              "t": "That mainly unusually deep wells ever face expanding gas on the way up.",
              "v": "partial",
              "fb": "Any well with gas below faces expansion; depth changes degree, not kind."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The earliest measurable expansion appears in returns and pit-volume data at the drill-floor and mud-logging console."
          }
        }
      ]
    },
    "rg_halliburton": {
      "sci": "Erle P. Halliburton (1892-1957)",
      "topic": "Oil-well cementing",
      "lede": "The tinkerer who pumped cement down a well to seal it, patented the method against fierce resistance, and made the sealed borehole the foundation of well control.",
      "no": 2,
      "profile": "Erle Palmer Halliburton was an American oil-field entrepreneur who turned well cementing into a reliable, measured process and built one of the world's great oil-service companies around it. In the early 1920s, borrowing an idea from a former employer, he developed a method for pumping cement slurry down the inside of the casing and up into the space behind it, then founded the Halliburton Oil Well Cementing Company in 1919 in Oklahoma. He patented his jet mixer and cementing techniques and defended them vigorously, standardizing a step that had been crude and unreliable.\n\nCementing is the operation that seals a well. After steel casing is run into the hole, cement is pumped down and around it to bond the pipe to the rock and, above all, to isolate the pressured formations from one another and from the surface. A good cement job at the bottom of a well is the primary barrier against the reservoir: it keeps oil and gas confined until they are meant to be produced. A bad job — cement that channels, fails to set, or is contaminated — leaves a hidden path for gas to migrate up behind the casing.\n\nFor this inquiry, cement is the heart of the matter. It is the barrier the whole well rests on, and its condition is not a matter of faith: it is tested. A negative-pressure test checks whether the cement and casing hold when the mud's weight is reduced, and a cement bond log images the seal directly. A cement job accepted without a convincing test is a barrier assumed rather than proven. If the Meridian's crew ran seawater in and trusted a cement seal no test had confirmed — or dismissed a test that failed — then the well's first defence was never really in place. Halliburton's discipline was to prove the seal, not to hope for it.",
      "frame": "The clerk sets a well diagram on the desk and taps the shoe. \"Everything hangs on the cement down here. It's meant to be tested, not trusted. Show me you understand that, and I'll show you what the plan ordered.\"",
      "q": [
        {
          "q": "What is the purpose of cementing a well?",
          "o": [
            {
              "t": "To lubricate the casing so the drill string slides in and out more smoothly.",
              "v": "wrong",
              "fb": "Cement seals; it is not a lubricant for the drill string."
            },
            {
              "t": "To fill the whole borehole solid so no oil is ever produced from the well.",
              "v": "wrong",
              "fb": "Cement isolates zones behind the pipe; the well still produces through it."
            },
            {
              "t": "To cool the reservoir rock so its pressure drops to a safe level before flow.",
              "v": "partial",
              "fb": "Cement does not cool the reservoir; it seals and isolates the well."
            },
            {
              "t": "To bond the casing to the rock and isolate the pressured formations behind it.",
              "v": "expert",
              "fb": "Cement seals and isolates the formations — the well's primary barrier."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "Halliburton’s barrier purpose makes the unstable negative-pressure response a failed cement test, not proof of a sealed well."
          }
        },
        {
          "q": "What is a bad cement job likely to leave behind?",
          "o": [
            {
              "t": "Channels or gaps that give gas a hidden path to migrate up the well.",
              "v": "expert",
              "fb": "Poor cement channels, letting gas rise behind the casing unseen."
            },
            {
              "t": "A stronger seal than good cement, since gaps let pressure escape harmlessly.",
              "v": "wrong",
              "fb": "Gaps weaken the seal and invite flow; they do not relieve pressure safely."
            },
            {
              "t": "Evidence of a planted charge, since mainly a blast disturbs setting cement.",
              "v": "danger",
              "fb": "Contamination and channeling are ordinary failures, not signs of a bomb."
            },
            {
              "t": "No consequence at all, because the mud alone keeps the well fully sealed.",
              "v": "partial",
              "fb": "Mud is temporary; cement is the permanent barrier, and its flaws matter."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "Pressure and flow evidence from the test is preserved on the drill-floor sheet and mud-logging trace where the pass was called."
          }
        },
        {
          "q": "How is a cement barrier meant to be confirmed?",
          "o": [
            {
              "t": "By the rig manager's signature alone, which certifies the cement is sound.",
              "v": "wrong",
              "fb": "A signature is not a test; the barrier must be physically verified."
            },
            {
              "t": "By a negative-pressure test and a bond log, not by assumption or faith.",
              "v": "expert",
              "fb": "Testing proves the seal; an accepted-but-untested job is only assumed."
            },
            {
              "t": "By waiting for the well to flow, since a leak strongly suggests the cement failed.",
              "v": "danger",
              "fb": "Waiting for flow is waiting for a blowout; tests catch failure beforehand."
            },
            {
              "t": "By checking the color of the returns, which reveals the seal below.",
              "v": "partial",
              "fb": "Returns hint at problems, but the seal is confirmed by pressure test and log."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The driller—not the roughneck or regulator—had authority to accept the test and begin displacement despite continuing flow."
          }
        }
      ]
    },
    "rg_bernoulli": {
      "sci": "Daniel Bernoulli (1700-1782)",
      "topic": "Fluid pressure & flow in the well",
      "lede": "The Swiss mathematician who wrote the book on moving fluids and showed that a well is nothing but a pressure ledger that must balance.",
      "no": 3,
      "profile": "Daniel Bernoulli was a Swiss mathematician and physicist, one of a famous mathematical family, whose 1738 masterwork 'Hydrodynamica' founded the study of fluids in motion. His central result, still taught as Bernoulli's principle, is a statement of energy conservation along a streamline: where a flowing fluid speeds up its pressure falls, and where it slows its pressure rises, with pressure, speed, and elevation trading against one another so their sum stays constant. From that single balance he drew consequences reaching from the flow of water in pipes to the rise of oil up a mile of steel.\n\nA drilled well is a plumbing problem Bernoulli would have recognized at once. The column of drilling mud presses down on the rock; the formation at the bottom presses back. So long as the mud's pressure exceeds the formation's, nothing flows in and the well is 'balanced' and quiet. Let the mud pressure slip below the formation's, and fluid enters, accelerates up the narrowing annulus, and loses pressure as it climbs, which only feeds the flow faster. Every kick and every blowout obeys this bookkeeping of pressure and speed.\n\nFor this inquiry, Bernoulli is the reminder that a blowout is not sorcery and not sabotage — it is arithmetic. The pressures at the bottom of the Meridian's well were known, or knowable, before the last valve was set. If someone let the formation's push win, the physics did the rest, exactly as the equation predicts. An 'act of God' invites you to shrug at numbers that sat on a chart; an 'attack' invites you to hunt a villain when the ledger already balances. Follow the pressures, and the well states plainly what was done to it.",
      "frame": "Ortiz jabs a thumb at the standpipe. \"They'll tell you the well 'just let go,' like weather. It doesn't. It's numbers. Show me you can read the pressures and I'll tell you what I felt through the floor.\"",
      "q": [
        {
          "q": "What does Bernoulli's principle say about a flowing fluid?",
          "o": [
            {
              "t": "A fluid's pressure climbs higher and higher the faster it is forced along a pipe.",
              "v": "wrong",
              "fb": "It is the reverse: faster flow means lower pressure along the streamline."
            },
            {
              "t": "A fluid in motion carries no pressure at all, so a flowing well does not push back.",
              "v": "danger",
              "fb": "Flowing fluid still exerts pressure; a live well pushes hard the whole way up."
            },
            {
              "t": "Where a flowing fluid speeds up, its pressure falls, with the total energy conserved.",
              "v": "expert",
              "fb": "Speed up, pressure down, sum conserved — that is the whole of Bernoulli."
            },
            {
              "t": "Speed adds force to a fluid, but its pressure and its speed rarely affect one another.",
              "v": "partial",
              "fb": "They are tightly coupled; trading pressure for speed is the entire idea."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "Bernoulli’s pressure ledger places underbalance in the well and its operational control at the drill floor, before the blowout preventer becomes the last defence."
          }
        },
        {
          "q": "When does formation fluid start entering a well?",
          "o": [
            {
              "t": "Mainly when a charge or intruder physically breaches the casing from the outside.",
              "v": "danger",
              "fb": "No breach is needed; a pressure imbalance alone invites the formation in."
            },
            {
              "t": "Whenever the drill bit is turning, since rotation alone pulls fluid up the hole.",
              "v": "wrong",
              "fb": "Rotation does not draw fluid in; the balance of pressures does."
            },
            {
              "t": "rarely, as a sealed well is proof against inflow no matter how the pressures sit.",
              "v": "partial",
              "fb": "A well is only as sealed as its pressure margin; lose that and fluid enters."
            },
            {
              "t": "When mud pressure at the bottom drops below the pressure of the formation itself.",
              "v": "expert",
              "fb": "Underbalance — formation pressure winning — is exactly when a kick begins."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The recorded order to reduce mud hydrostatic pressure comes from the driller’s station after the logger objects to the flow."
          }
        },
        {
          "q": "Why does Bernoulli's bookkeeping matter to this board?",
          "o": [
            {
              "t": "Because the pressures that drove the blowout were charted numbers, not mysteries.",
              "v": "expert",
              "fb": "Known, traceable pressures are the antidote to both 'act of God' and 'attack'."
            },
            {
              "t": "Because it strongly suggests mainly a deliberate strike could ever unbalance a modern well.",
              "v": "danger",
              "fb": "Wells go underbalanced through ordinary decisions, no saboteur required."
            },
            {
              "t": "Because it shows well pressures are unknowable, so any cause is as likely as another.",
              "v": "wrong",
              "fb": "Bernoulli made the flow calculable; the numbers narrow the cause sharply."
            },
            {
              "t": "Because it lets the board study the mud alone and ignore the formation entirely.",
              "v": "partial",
              "fb": "Both sides of the balance matter; you cannot drop the formation's pressure."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "Formation pressure exceeds the reduced mud column, so the blowout follows ordinary well-control arithmetic rather than attack or unknowable chance."
          }
        }
      ]
    }
  },
  "story": [
    "<b>The Deepwater Meridian burns after a test that one person called good while the well continued to speak.</b>",
    "Roughneck Sal Ortiz has the displacement sequence. The Mud Logger holds pressure, flow, and gas returns. The Well Records Clerk has the test sheet and authority trail.",
    "Sabotage, an unforeseeable gas pocket, and an accepted failed barrier test all explain the final flame differently.",
    "The commission must identify the decision that turned a vulnerable cement barrier into an underbalanced live well."
  ],
  "endings": {
    "overclaimWhat": "rg_attack",
    "dismissalWhat": "rg_pocket",
    "win": {
      "expertTitle": "The Test That Was Called Good",
      "expert": [
        "You connect Cal Rusk — the rig’s driller, the Drill Floor & Mud-Logging Console, and a failed barrier test accepted before heavy mud was displaced. The full clue chain links the initiating condition, the physical mechanism, and the decisive record without relying on candidate order.",
        "The two alternative explanations each fit part of the scene, but neither survives the combined timing, material, and documentary evidence."
      ],
      "soundTitle": "The Underbalance Sequence",
      "sound": [
        "Your accusation identifies Cal Rusk — the rig’s driller, the Drill Floor & Mud-Logging Console, and a failed barrier test accepted before heavy mud was displaced.",
        "A few missed clues leave gaps in the reconstruction, yet the evidence you recovered is sufficient to distinguish the true sequence from both traps."
      ],
      "namedTitle": "Correct Decision, Thin Well Record",
      "named": [
        "You reach the correct three-part verdict with a thin evidentiary file.",
        "The result is right, although the unrecovered clues would be needed to defend the causal chain under sustained challenge."
      ]
    },
    "overclaim": {
      "title": "No Attacker Opened the Well",
      "body": [
        "No external breach or manipulated preventer precedes the pressure imbalance.",
        "The kick begins through the cement path while hydrostatic pressure is deliberately reduced."
      ]
    },
    "dismissal": {
      "title": "The Gas Was Not Unknowable",
      "body": [
        "Formation gas is expected and measurable; the surprise claim cannot explain flow with pumps off during the failed test.",
        "Boyle and Bernoulli show why known gas becomes dangerous after the barrier is misread and mud pressure is removed."
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
