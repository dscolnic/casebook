module.exports = { PACK: {
  "id": "m_sub",
  "title": "The Carrow Deep Implosion",
  "discipline": "Deep Submergence & the Physics of Pressure",
  "teaser": "The Sirena vanished on descent, leaving one acoustic pulse and a field of fragments. Did it hit the wreck, lose its crew to a cabin casualty, or does the surviving record support a third explanation?",
  "overclaimTag": "a collision with the wreck",
  "truthTag": "a hull fatigued by one dive too many",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A submersible descending to a wreck; an implosion above it\"><path d=\"M0 52 C130 46,270 58,410 52 S620 46,660 52\" fill=\"none\" stroke=\"#e2e2d8\" stroke-width=\"1\"/><path d=\"M0 80 C130 74,270 86,410 80 S620 74,660 80\" fill=\"none\" stroke=\"#e2e2d8\" stroke-width=\"1\"/><path d=\"M0 108 C130 102,270 114,410 108 S620 102,660 108\" fill=\"none\" stroke=\"#e2e2d8\" stroke-width=\"1\"/><path d=\"M0 22 C90 14,180 30,270 22 S450 14,540 22 S650 28,660 22\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><line x1=\"300\" y1=\"24\" x2=\"300\" y2=\"58\" stroke=\"#326891\" stroke-width=\"1.5\" stroke-dasharray=\"3 4\"/><g stroke=\"#B3261E\" stroke-width=\"1.6\" stroke-linecap=\"round\"><line x1=\"300\" y1=\"54\" x2=\"300\" y2=\"82\"/><line x1=\"286\" y1=\"68\" x2=\"314\" y2=\"68\"/><line x1=\"290\" y1=\"58\" x2=\"310\" y2=\"78\"/><line x1=\"310\" y1=\"58\" x2=\"290\" y2=\"78\"/></g><circle cx=\"300\" cy=\"68\" r=\"3.5\" fill=\"#B3261E\"/><g transform=\"rotate(-7 470 118)\"><path d=\"M432 116 L512 116 L500 128 L446 128 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><line x1=\"470\" y1=\"116\" x2=\"470\" y2=\"105\" stroke=\"#121212\" stroke-width=\"1.5\"/></g></svg>",
  "venue": "the Carrow Deep inquiry",
  "agent": {
    "name": "Investigator Okonkwo",
    "role": "Board of Inquiry Notebook"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Pioneers of the Deep",
  "dossierName": "PIONEERS OF THE DEEP",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside a deep-submersible disaster",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before the inquiry closes. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The place you test determines the dossier you receive, and the conversation costs one day.",
  "overclaimTease": "A famous wreck makes collision irresistible; first ask whether the Sirena had reached it when the ocean recorded the final sound.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "sd_founder",
      "items": [
        {
          "id": "sd_founder",
          "label": "Marcus Vane — the expedition's founder-pilot"
        },
        {
          "id": "sd_engineer",
          "label": "The lead hull engineer"
        },
        {
          "id": "sd_opsdir",
          "label": "The surface-operations director"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "sd_lab",
      "items": [
        {
          "id": "sd_dock",
          "label": "The expedition dock and hangar"
        },
        {
          "id": "sd_ship",
          "label": "The support ship and recovery barge"
        },
        {
          "id": "sd_lab",
          "label": "The materials lab and recovered fragments"
        }
      ]
    },
    "what": {
      "title": "Why the submersible imploded",
      "truth": "sd_fatigue",
      "items": [
        {
          "id": "sd_strike",
          "label": "It struck the wreck and the pressure hull was breached"
        },
        {
          "id": "sd_life",
          "label": "A battery fire or oxygen casualty disabled the crew"
        },
        {
          "id": "sd_fatigue",
          "label": "Fatigue from repeated dives collapsed the hull"
        }
      ]
    }
  },
  "PLACES": {
    "sd_dock": {
      "name": "The Expedition Dock",
      "xy": [
        140,
        90
      ]
    },
    "sd_ship": {
      "name": "The Support Ship",
      "xy": [
        330,
        240
      ]
    },
    "sd_lab": {
      "name": "The Materials Lab",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "sd_dock",
      "sd_ship"
    ],
    [
      "sd_ship",
      "sd_lab"
    ]
  ],
  "CHARACTERS": {
    "diver": {
      "name": "Salvage Lead Reyes",
      "role": "Deep-recovery ROV lead",
      "face": "🤿",
      "badge": "R",
      "legend": "the recovery",
      "hint": "Surveyed the debris field and knows how the hull sections came to rest."
    },
    "acoust": {
      "name": "The Acoustics Analyst",
      "role": "Hydrophone-array analyst",
      "face": "🎧",
      "badge": "A",
      "legend": "the sound record",
      "hint": "Holds the moored-hydrophone record — the exact time, depth, and shape of the event."
    },
    "clerk": {
      "name": "The Records Clerk",
      "role": "Materials & certification clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the records",
      "hint": "Keeps the dive-cycle log, the hull's build file, and the certification that never came."
    }
  },
  "TOPICMAP": {
    "sd_dock": {
      "diver": [
        "sd_timoshenko"
      ],
      "acoust": [
        "sd_langevin"
      ],
      "clerk": [
        "sd_wohler"
      ]
    },
    "sd_ship": {
      "diver": [
        "sd_piccarda"
      ],
      "acoust": [
        "sd_ewing"
      ],
      "clerk": [
        "sd_kaiser"
      ]
    },
    "sd_lab": {
      "diver": [
        "sd_haldane"
      ],
      "acoust": [
        "sd_rayleigh"
      ],
      "clerk": [
        "sd_kwolek"
      ]
    }
  },
  "TOPICS": {
    "sd_timoshenko": {
      "whatHint": "Timoshenko shows a thin shell fails by sudden buckling once its margin is gone — a whole-hull collapse, not a local puncture. Ask what the shell's history had already spent.",
      "sci": "Stephen Timoshenko (1878-1972)",
      "topic": "Why thin shells buckle and collapse",
      "lede": "Stephen Timoshenko showed why a flawless-looking shell can fail suddenly under pressure it once survived.",
      "no": 1,
      "profile": "Stephen Timoshenko became one of the twentieth century’s most influential teachers of engineering mechanics. Born in the Russian Empire in what is now Ukraine, he worked across Europe before joining American universities, eventually teaching at the University of Michigan and Stanford. His books on strength of materials, elasticity, vibration, and structural stability trained generations of engineers to translate loads into stresses, deflections, and failure modes.\n\nOne of his central subjects was buckling: a loss of structural stability rather than a simple crushing of the material. A slender column may bow sideways under a compressive load even though the metal has not reached its ordinary breaking strength. Thin cylindrical and spherical shells behave similarly. Under external pressure, a shell can remain nearly unchanged until a small imperfection—an uneven wall, a slightly distorted shape, a weak joint, or a local delamination—concentrates deformation. Once instability begins, the geometry redirects the load and collapse can accelerate abruptly.\n\nThat distinction matters for deep submergence. Water pressure rises by roughly one atmosphere for every ten metres of depth, pressing inward over the entire hull. A pressure vessel is therefore judged not only by the strength of its material but by its shape, thickness, joints, penetrations, manufacturing tolerances, and previous damage. A successful static pressure test proves survival of that test; it does not automatically establish unlimited life under repeated dives.\n\nTimoshenko’s framework separates a slow life-support emergency from structural implosion. Oxygen loss, carbon-dioxide buildup, or battery trouble normally develops through measurable changes. Buckling of a critically weakened shell can cross its stability threshold with little visible warning and finish in a fraction of a second. The useful question is not merely whether the material was “strong,” but whether the complete shell still possessed sufficient stability at that depth.",
      "frame": "Reyes taps a chalked ring on the hangar floor. “A pressure hull does not have to crack open slowly. Show me you understand how a shell can lose stability all at once.”",
      "q": [
        {
          "q": "What makes elastic buckling different from ordinary material crushing?",
          "o": [
            {
              "t": "A structure loses geometric stability before its material reaches full strength.",
              "v": "expert",
              "fb": "Buckling is an instability of shape, so it may occur below the material’s crushing or yield strength."
            },
            {
              "t": "A structure melts locally before its material reaches the stated service limit.",
              "v": "wrong",
              "fb": "Melting is a thermal failure, whereas buckling is driven by compressive load and geometry."
            },
            {
              "t": "A structure corrodes evenly until every part reaches the same reduced thickness.",
              "v": "partial",
              "fb": "Corrosion can promote buckling, but uniform thinning is not what defines the instability."
            },
            {
              "t": "A structure fractures mainly after every section carries identical tensile stress.",
              "v": "wrong",
              "fb": "Buckling usually begins under compression and does not require uniform tensile stress."
            }
          ]
        },
        {
          "q": "Why are small imperfections important in a pressure shell?",
          "o": [
            {
              "t": "They focus deformation and can sharply reduce the pressure needed for collapse.",
              "v": "expert",
              "fb": "Real shells buckle below ideal predictions because imperfections concentrate displacement and stress."
            },
            {
              "t": "They increase buoyancy and therefore raise the external pressure on every surface.",
              "v": "wrong",
              "fb": "Buoyancy does not turn a small geometric flaw into extra hydrostatic pressure."
            },
            {
              "t": "They equalize the stress field and delay buckling until the material fully yields.",
              "v": "danger",
              "fb": "Imperfections generally weaken shell stability rather than making the stress field more uniform."
            },
            {
              "t": "They matter mainly after a shell has already split substantially along a welded seam.",
              "v": "wrong",
              "fb": "Imperfections can trigger instability before any complete split or open crack appears."
            }
          ]
        },
        {
          "q": "What does one successful pressure test establish most securely?",
          "o": [
            {
              "t": "The vessel survived that particular load history and test configuration.",
              "v": "expert",
              "fb": "A passed test supports that tested condition, not unlimited future cycles or altered configurations."
            },
            {
              "t": "The vessel will survive every later dive regardless of damage or modifications.",
              "v": "danger",
              "fb": "Past survival cannot guarantee future integrity when defects and cycle damage can accumulate."
            },
            {
              "t": "The vessel material can rarely buckle because its static strength was demonstrated.",
              "v": "wrong",
              "fb": "Static material strength and shell-buckling resistance are related but not interchangeable."
            },
            {
              "t": "The vessel needs no inspection until its rated operating depth is exceeded.",
              "v": "wrong",
              "fb": "Inspection remains necessary because damage can grow during service below the nominal depth limit."
            }
          ]
        }
      ]
    },
    "sd_langevin": {
      "whatHint": "Langevin's echo-ranging fixes where a sound was born. Ask the hydrophones at what depth the transient rang — and whether the Sirena had yet reached the wreck.",
      "sci": "Paul Langevin (1872-1946)",
      "topic": "Echo-ranging and the birth of sonar",
      "lede": "Paul Langevin turned quartz, timing, and underwater echoes into a practical way of locating unseen events.",
      "no": 2,
      "profile": "Paul Langevin was a French physicist whose career ranged from magnetism and relativity to underwater acoustics. During the First World War, submarine warfare created an urgent need to detect objects hidden beneath the sea. Working with Constantin Chilowsky and drawing on the piezoelectric properties of quartz, Langevin helped develop an apparatus that could send a sharp sound pulse through water and listen for its return.\n\nThe principle was echo ranging, later called active sonar. Measure the time between transmitting a pulse and receiving its echo, multiply by the speed of sound in water, and divide by two because the pulse travels out and back. Direction comes from the orientation or arrangement of the transducers. Real oceans complicate the arithmetic: sound speed changes with temperature, salinity, and pressure, and boundaries can produce reflections. Even so, careful timing converts sound into distance.\n\nUnderwater listening can also be passive. A hydrophone does not need to send anything; it records pressure waves produced by machinery, explosions, impacts, or collapsing structures. Different events leave different signatures. A prolonged mechanical problem may create a sequence of noises, while a violent implosion produces a compact broadband transient. Several separated hydrophones can compare arrival times to estimate where and when the signal originated.\n\nLangevin’s lesson is that an acoustic record has geometry as well as drama. A loud sound near a shipwreck does not prove a collision with that wreck. The source must be localized in three dimensions and matched to the vehicle’s track. If an impulsive event is calculated at a depth above the wreck during descent, the timing rules out contact with the bottom no matter how attractive the collision story appears. The clock and the travel path decide what the sound can mean.",
      "frame": "The analyst sets a hydrophone trace beside a descent chart. “Sound can place an event where no camera survived. Tell me what timing can prove before I open the raw record.”",
      "q": [
        {
          "q": "How does active sonar estimate the range to a reflecting object?",
          "o": [
            {
              "t": "It uses half the sound speed multiplied by the echo’s round-trip time.",
              "v": "expert",
              "fb": "The pulse travels to the target and back, so the measured path length must be divided by two."
            },
            {
              "t": "It uses the echo frequency multiplied by the ship’s distance from the coast.",
              "v": "wrong",
              "fb": "Frequency alone does not provide range without timing or another geometric measurement."
            },
            {
              "t": "It uses the source depth divided by the pressure measured at the receiver.",
              "v": "wrong",
              "fb": "Hydrostatic pressure can indicate depth, but it does not supply an echo range by itself."
            },
            {
              "t": "It uses the loudness difference between the transmitted pulse and background.",
              "v": "partial",
              "fb": "Amplitude can describe losses or target strength, but travel time is the main ranging measurement."
            }
          ]
        },
        {
          "q": "What can separated hydrophones contribute to an event investigation?",
          "o": [
            {
              "t": "Arrival-time differences can locate the source of a sudden underwater sound.",
              "v": "expert",
              "fb": "An array can triangulate or otherwise estimate a source from relative arrival times."
            },
            {
              "t": "Matching volume readings can suggests every receiver was beside the same object.",
              "v": "wrong",
              "fb": "Similar amplitudes do not establish that all receivers occupied the source location."
            },
            {
              "t": "A single shared frequency can identify the legal cause of the entire casualty.",
              "v": "danger",
              "fb": "A frequency feature may classify a sound, but it cannot assign responsibility by itself."
            },
            {
              "t": "The deepest receiver automatically marks the depth where the sound originated.",
              "v": "wrong",
              "fb": "Receiver depth is not source depth; propagation times and geometry must be analyzed."
            }
          ]
        },
        {
          "q": "Why does source depth matter when testing a collision hypothesis?",
          "o": [
            {
              "t": "An event above the wreck occurred before the vehicle could strike the wreck.",
              "v": "expert",
              "fb": "A localized source shallower than the target depth is incompatible with impact at that target."
            },
            {
              "t": "A deeper event generally suggests the vehicle was operating normally before contact.",
              "v": "wrong",
              "fb": "Depth alone cannot prove normal operation or identify what happened immediately beforehand."
            },
            {
              "t": "A shallow event suggests the sound came from the support ship rather than the vehicle.",
              "v": "partial",
              "fb": "A shallow source narrows possibilities, but attribution still requires position and signature evidence."
            },
            {
              "t": "Any event near the descent route counts as contact once the wreck is nearby.",
              "v": "danger",
              "fb": "Proximity on a map is not enough; the source must coincide with the wreck in depth and time."
            }
          ]
        }
      ]
    },
    "sd_wohler": {
      "whatHint": "Wöhler counted the cycles a part survives before it fails without warning. A dive log is a cycle count; ask how many this hull had spent against the number it was certified for.",
      "sci": "August Wöhler (1819-1914)",
      "topic": "Fatigue and the life of a cyclically loaded part",
      "lede": "August Wöhler discovered that modest loads, repeated often enough, can break parts that pass static tests.",
      "no": 3,
      "profile": "August Wöhler was a German railway engineer confronted by a disturbing industrial mystery: axles sometimes fractured after long service even though ordinary calculations said the loads were safe. Railway expansion made the problem urgent. A broken axle could derail a train, yet the part might show no single overload large enough to explain the failure.\n\nWöhler built systematic test machines and repeatedly loaded specimens until they broke. He varied the stress and counted the cycles. The resulting relationship, later represented by stress-life or S–N curves, established fatigue as a distinct failure process. High repeated stresses produced failure in fewer cycles; lower stresses permitted longer life. A component could fail under loads well below the force needed to break it in one pull because microscopic damage initiated and grew with repetition.\n\nFatigue begins locally. Surface marks, holes, joints, manufacturing defects, residual stresses, and abrupt changes in shape raise the stress at particular points. Tiny cracks can advance by minute amounts on each cycle and then accelerate after the remaining sound section becomes too small. The final fracture may look sudden, but much of its history was written gradually. Counting cycles, examining fracture surfaces, and knowing the actual load spectrum therefore matter as much as the maximum load.\n\nWöhler worked mainly with metals, while modern submersibles may use layered composites, adhesives, and mixed-material joints. The materials differ, but the engineering discipline carries over: repeated pressure cycles are a life variable, not background scenery. A vessel validated for a limited test program cannot be assumed immortal because earlier dives succeeded. Every descent and ascent applies another severe reversal of stress. When cycle limits, inspections, or independent certification are missing, “it survived before” becomes evidence of exposure, not proof of safety.",
      "frame": "The clerk lays a dive ledger beside a railway-axle sketch. “Failures can be counted long before they are seen. Show me why the number of cycles belongs in a build file.”",
      "q": [
        {
          "q": "What did Wöhler’s repeated-load experiments establish?",
          "o": [
            {
              "t": "Parts can fail from many cycles at stresses below one-pull strength; in use.",
              "v": "expert",
              "fb": "Fatigue allows repeated subcritical loads to initiate and grow damage until fracture occurs."
            },
            {
              "t": "Parts fail mainly when one cycle exceeds the material’s measured tensile strength.",
              "v": "danger",
              "fb": "Fatigue failure can occur without any single cycle reaching the static breaking strength."
            },
            {
              "t": "Parts become stronger whenever the same moderate load is applied repeatedly.",
              "v": "wrong",
              "fb": "Repeated loading can accumulate damage rather than continually strengthening the part."
            },
            {
              "t": "Parts have identical service lives whenever their maximum loads are equal.",
              "v": "wrong",
              "fb": "Life also depends on cycle count, load range, defects, environment, and geometry."
            }
          ]
        },
        {
          "q": "What information does an S–N curve relate?",
          "o": [
            {
              "t": "Cyclic stress level to the number of cycles sustained before failure.",
              "v": "expert",
              "fb": "An S–N curve links stress amplitude or range with fatigue life measured in cycles."
            },
            {
              "t": "Static pressure depth to the amount of buoyancy produced by a hull.",
              "v": "wrong",
              "fb": "Buoyancy and hydrostatic depth are not the variables represented by an S–N curve."
            },
            {
              "t": "Crack width to the acoustic frequency recorded by every nearby sensor.",
              "v": "partial",
              "fb": "Cracks can emit sound, but an S–N curve does not directly map width to frequency."
            },
            {
              "t": "Material density to the speed at which a support vessel reaches port.",
              "v": "wrong",
              "fb": "Transport speed and material density are unrelated to the fatigue-life graph."
            }
          ]
        },
        {
          "q": "Why can earlier successful dives be misleading evidence of safety?",
          "o": [
            {
              "t": "Each dive adds cycles, so prior survival may coexist with growing hidden damage.",
              "v": "expert",
              "fb": "Fatigue accumulates during successful service and may remain invisible until late in life."
            },
            {
              "t": "Each dive removes all prior stresses once the vehicle returns to the surface.",
              "v": "danger",
              "fb": "Unloading removes current stress but does not erase cracks, delamination, or other permanent damage."
            },
            {
              "t": "Each dive suggests the hull has entered an unlimited endurance regime automatically.",
              "v": "wrong",
              "fb": "An endurance limit cannot be assumed, especially for composites and mixed structural systems."
            },
            {
              "t": "Each dive lowers seawater pressure during the next descent by a fixed amount.",
              "v": "wrong",
              "fb": "External pressure depends on depth, not on how many previous descents the vessel completed."
            }
          ]
        }
      ]
    },
    "sd_piccarda": {
      "whatHint": "Piccard built hulls to a validated depth-and-cycle envelope. Ask whether this one was run beyond the program its designers signed off.",
      "sci": "Auguste Piccard (1884-1962)",
      "topic": "Building a hull for the crushing deep",
      "lede": "Auguste Piccard carried pressure-vessel thinking from the stratosphere down into the crushing ocean depths.",
      "no": 4,
      "profile": "Auguste Piccard was a Swiss physicist and explorer who treated extreme environments as engineering laboratories. He first became famous for balloon flights into the stratosphere inside a sealed, pressurized gondola. The challenge there was keeping breathable pressure inside while the surrounding air thinned. He later reversed the problem and designed the bathyscaphe, which had to protect people from immense water pressure outside.\n\nPiccard separated buoyancy from human survival. A large float filled with gasoline provided lift because gasoline is less dense than seawater and changes volume less dangerously than a gas bubble at depth. Beneath it hung a compact steel pressure sphere for the crew. Iron shot served as releasable ballast: if electrical power failed, dropping the shot could make the craft rise. This arrangement led to vehicles such as FNRS-2 and influenced the later bathyscaphe Trieste.\n\nThe spherical crew compartment was not a stylistic choice. A sphere carries external pressure more evenly than a long flat-sided cabin, reducing bending stresses and dangerous weak zones. Windows, hatches, cable penetrations, and attachments still demand special care because they interrupt the smooth load path. Thick walls, precise machining, material inspection, proof testing, and conservative margins all work together. No single attractive material can substitute for a validated pressure-vessel design.\n\nPiccard’s bathyscaphe also illustrates why certification and configuration control matter. Deep-diving craft are systems: hull, joints, viewports, ballast, communications, life support, and recovery provisions must be tested as an integrated vehicle. A novel cylindrical composite chamber cannot inherit the safety record of a steel sphere merely because both descend underwater. Each geometry and material system needs evidence for manufacturing quality, pressure stability, repeated-cycle life, and fail-safe behavior. Exploration rewards imagination, but pressure punishes analogy.",
      "frame": "Reyes points from an old bathyscaphe photograph to the submersible cradle. “Piccard did not ask one material to solve every problem. Tell me why his crew sat inside a sphere.”",
      "q": [
        {
          "q": "Why did Piccard place the crew inside a pressure sphere?",
          "o": [
            {
              "t": "A sphere distributes external pressure with less bending than flat-sided shapes.",
              "v": "expert",
              "fb": "Spherical geometry carries uniform external pressure efficiently and limits bending concentrations."
            },
            {
              "t": "A sphere creates oxygen continuously by rotating as the craft descends.",
              "v": "wrong",
              "fb": "Shape does not generate oxygen; a separate life-support system is required."
            },
            {
              "t": "A sphere makes seawater pressure disappear at every hatch and window opening.",
              "v": "danger",
              "fb": "Penetrations remain critical stress concentrations even in an otherwise efficient sphere."
            },
            {
              "t": "A sphere indicates unlimited fatigue life without inspection or proof testing.",
              "v": "wrong",
              "fb": "Efficient geometry does not remove material defects, cyclic damage, or inspection needs."
            }
          ]
        },
        {
          "q": "What provided buoyancy in Piccard’s bathyscaphe concept?",
          "o": [
            {
              "t": "A large gasoline-filled float supplied lift above the pressure sphere.",
              "v": "expert",
              "fb": "Piccard used gasoline because it is less dense than seawater and suitable for a deep float."
            },
            {
              "t": "Compressed oxygen tanks expanded freely outside the hull during descent.",
              "v": "wrong",
              "fb": "Gas volume shrinks under pressure and oxygen tanks were not the main buoyant element."
            },
            {
              "t": "The steel crew sphere floated because thick metal becomes lighter at depth.",
              "v": "wrong",
              "fb": "Steel remains denser than seawater, so the sphere required external buoyancy."
            },
            {
              "t": "Iron ballast produced lift whenever electrical power was applied to it.",
              "v": "partial",
              "fb": "Dropping iron ballast aided ascent, but the ballast itself did not provide positive buoyancy."
            }
          ]
        },
        {
          "q": "What is the strongest lesson of Piccard’s integrated design?",
          "o": [
            {
              "t": "Geometry, materials, penetrations, ballast, and tests must work as one system.",
              "v": "expert",
              "fb": "Deep-submergence safety comes from validated system integration rather than one impressive component."
            },
            {
              "t": "A strong fibre can replace pressure testing if its tensile strength is high.",
              "v": "danger",
              "fb": "Tensile strength alone does not validate shell stability, joints, or cyclic pressure performance."
            },
            {
              "t": "A successful shallow dive certifies every component for any greater depth.",
              "v": "wrong",
              "fb": "Qualification must cover the intended pressure and configuration with appropriate margins."
            },
            {
              "t": "Life support is the mainly system that matters once sufficient ballast is carried.",
              "v": "wrong",
              "fb": "Pressure integrity, buoyancy, controls, communications, and recovery are all essential."
            }
          ]
        }
      ]
    },
    "sd_ewing": {
      "whatHint": "Ewing's deep sound channel carries a single event far and cleanly. One sharp transient at one depth is not the long grinding of a hull working against a wreck.",
      "sci": "Maurice Ewing (1906-1974)",
      "topic": "The deep sound channel of the sea",
      "lede": "Maurice Ewing mapped the ocean with sound and showed how distant underwater events can remain acoustically visible.",
      "no": 5,
      "profile": "Maurice Ewing was an American geophysicist and oceanographer who helped turn the deep ocean into a place that could be measured remotely. At Columbia University’s Lamont Geological Observatory, he led programs using seismic reflection, refraction, gravity, magnetism, and underwater acoustics to investigate the seafloor and Earth’s crust. His teams worked from ships because the ocean concealed the structures they wanted to study.\n\nEwing and collaborators demonstrated the importance of the deep sound channel, often called the SOFAR channel. Sound speed in the ocean changes with temperature, pressure, and salinity. At certain depths it reaches a minimum. Sound rays bending toward that minimum can become trapped and travel enormous distances with comparatively little loss. An explosion or implosion can therefore be heard far beyond visual range.\n\nAn array turns distant sound into location evidence. If several hydrophones record the same transient at slightly different times, analysts compare those arrivals with a sound-speed model. The event time, horizontal position, and depth can be estimated, although uncertainty must be stated honestly. The waveform adds another layer: a compact broadband pulse differs from a long sequence of machinery noise or slowly failing equipment. Ocean boundaries and multipath arrivals complicate the record, so analysts test several propagation routes rather than trusting the first peak.\n\nEwing’s work teaches why an acoustic source must be reconstructed before a narrative is attached to it. A wreck may be the expedition’s destination and still be irrelevant to the initiating event. If the calculated transient lies above the wreck and along the descent track, contact at the bottom is physically out of sequence. The hydrophones do not explain every structural detail, but they can eliminate stories that require the vehicle to be somewhere it had not yet reached. In deep water, sound is often the surviving witness with the best clock.",
      "frame": "The analyst draws curved sound paths through a water-column profile. “The ocean bends sound before it reaches us. Show me how an array can still recover a source.”",
      "q": [
        {
          "q": "What is the deep sound channel?",
          "o": [
            {
              "t": "A sound-speed minimum that can guide underwater sound over long distances.",
              "v": "expert",
              "fb": "Refraction bends sound back toward the minimum, allowing efficient long-range propagation."
            },
            {
              "t": "A trench where seawater becomes too dense for any acoustic wave to cross.",
              "v": "wrong",
              "fb": "Sound continues to propagate; the channel is a refractive feature, not an acoustic barrier."
            },
            {
              "t": "A radio-frequency corridor used by satellites to communicate through seawater.",
              "v": "wrong",
              "fb": "The SOFAR channel concerns acoustic waves, not ordinary satellite radio transmission."
            },
            {
              "t": "A surface duct created mainly when breaking waves trap air beneath a vessel.",
              "v": "partial",
              "fb": "Surface ducts can occur, but the deep sound channel is a different water-column feature."
            }
          ]
        },
        {
          "q": "How can a hydrophone array estimate an underwater source location?",
          "o": [
            {
              "t": "It compares arrival times using array geometry and a sound-speed model.",
              "v": "expert",
              "fb": "Relative arrival times constrain the source when combined with sensor positions and propagation physics."
            },
            {
              "t": "It assigns the source to whichever receiver recorded the greatest loudness.",
              "v": "wrong",
              "fb": "Amplitude varies with propagation and sensor response, so the loudest receiver need not be closest."
            },
            {
              "t": "It assumes every pulse came from the expedition’s planned destination.",
              "v": "danger",
              "fb": "A destination is not a source location; the acoustic data must determine the position independently."
            },
            {
              "t": "It averages receiver depths and declares that value to be the source depth.",
              "v": "wrong",
              "fb": "Source depth must be inferred from travel paths rather than the mean sensor depth."
            }
          ]
        },
        {
          "q": "What does a compact broadband transient most strongly suggest?",
          "o": [
            {
              "t": "A sudden energetic event rather than a slowly developing equipment decline.",
              "v": "expert",
              "fb": "A short broadband impulse is consistent with an abrupt release or collapse of stored energy."
            },
            {
              "t": "A gradual oxygen shortage that changed the crew’s breathing over several hours.",
              "v": "wrong",
              "fb": "A life-support decline would not normally create one isolated, high-energy acoustic impulse."
            },
            {
              "t": "A routine sonar transmission whose frequency and duration remained narrowly fixed.",
              "v": "partial",
              "fb": "Sonar pulses are usually controlled signals and often narrower in bandwidth than an implosion transient."
            },
            {
              "t": "A legal conclusion that identifies the person responsible for the casualty.",
              "v": "danger",
              "fb": "Waveform classification can describe an event, but responsibility requires separate evidence."
            }
          ]
        }
      ]
    },
    "sd_kaiser": {
      "whatHint": "Kaiser found that stressed metal talks before it breaks — micro-cracking a monitored hull records long before the end. Ask whether anything was listening across those dives.",
      "sci": "Josef Kaiser (1907-1992)",
      "topic": "Materials that crackle before they break",
      "lede": "Josef Kaiser learned that stressed materials remember earlier loads—and announce new damage with tiny bursts of sound.",
      "no": 6,
      "profile": "Josef Kaiser’s work in the middle of the twentieth century helped establish acoustic emission as a method for listening to materials under load. In tensile tests he detected brief elastic waves released when microscopic processes—slip, crack initiation, fibre breakage, or other internal changes—suddenly liberated stored strain energy. Sensors attached to a structure could convert those waves into electrical signals.\n\nThe behavior associated with his name is the Kaiser effect. In an idealized material that has previously been loaded to a certain maximum, little new acoustic emission appears during reloading until the earlier maximum stress is exceeded. The material seems to retain a memory of its load history. Engineers later developed related measures for imperfect and composite structures. When significant emissions resume below the previous maximum—a departure often discussed through the Felicity effect—it can indicate continuing damage or reduced structural integrity.\n\nAcoustic emission is not simply a loudness alarm. Analysts examine event counts, energy, location, timing, and how activity changes with load. A single click may be harmless friction or electronic noise. A growing pattern localized to a pressure hull during successive dives is more concerning, especially if it begins earlier in the loading cycle. Sensors require calibration and interpretation, and silence does not guarantee health; damaged regions may stop emitting after a major crack has already formed.\n\nFor composite pressure structures, the method is valuable because damage can be distributed and partly hidden. Matrix microcracks, fibre fractures, debonding, and delamination can occur inside layers that look intact from the surface. Repeated acoustic activity is evidence that the structure is changing, not proof that it is safely “settling.” Kaiser’s legacy is a disciplined way to treat crackling as data tied to load history. When warnings recur and the validated cycle life is uncertain, they demand investigation rather than normalization.",
      "frame": "The clerk slides over a waveform log marked with dive numbers. “The hull was not silent during loading. Tell me what a material’s acoustic memory can reveal.”",
      "q": [
        {
          "q": "What produces an acoustic-emission signal in a loaded material?",
          "o": [
            {
              "t": "A sudden internal damage event releases strain energy as elastic waves.",
              "v": "expert",
              "fb": "Cracking, fibre breakage, slip, or debonding can emit transient elastic waves detected by sensors."
            },
            {
              "t": "A steady temperature reading is converted directly into an underwater echo.",
              "v": "wrong",
              "fb": "Temperature sensors and acoustic-emission sensors measure different physical quantities."
            },
            {
              "t": "External water pressure becomes audible without any change inside the material.",
              "v": "partial",
              "fb": "Load creates the conditions, but emissions arise from discrete internal changes or frictional events."
            },
            {
              "t": "A computer invents warning pulses whenever a scheduled inspection is overdue.",
              "v": "danger",
              "fb": "Instrumentation may produce noise, but genuine emissions must be distinguished through calibration and location."
            }
          ]
        },
        {
          "q": "What does the classic Kaiser effect describe?",
          "o": [
            {
              "t": "Emission stays low on reloading until the previous maximum stress is exceeded.",
              "v": "expert",
              "fb": "The effect reflects a material memory in which substantial new activity begins above the prior maximum."
            },
            {
              "t": "Emission doubles at every cycle even when the structure carries no applied load.",
              "v": "wrong",
              "fb": "Acoustic emission depends on active internal processes and does not automatically double by cycle count."
            },
            {
              "t": "Emission suggests a structure is safe whenever it produces loud crackling sounds.",
              "v": "danger",
              "fb": "Crackling can indicate active damage and should never be treated as a certificate of safety."
            },
            {
              "t": "Emission occurs mainly after a component has separated into two visible pieces.",
              "v": "wrong",
              "fb": "Sensors can detect microscopic damage long before complete visible fracture."
            }
          ]
        },
        {
          "q": "Why is repeated early-cycle emission concerning in a composite?",
          "o": [
            {
              "t": "It can indicate new damage developing below the structure’s former load level.",
              "v": "expert",
              "fb": "Activity below the prior maximum may show degraded integrity and continuing internal damage."
            },
            {
              "t": "It suggests the fibres are becoming stronger through harmless pressure conditioning.",
              "v": "danger",
              "fb": "Repeated emissions are not evidence of beneficial strengthening and may mark progressive failure."
            },
            {
              "t": "It shows the hydrophones have mistaken every hull sound for a seabed collision.",
              "v": "wrong",
              "fb": "Hull-mounted acoustic emission and remote hydrophone localization are separate measurements."
            },
            {
              "t": "It means the resin has converted all compressive stress into useful buoyancy.",
              "v": "wrong",
              "fb": "Resin cannot transform structural compression into buoyant lift through acoustic activity."
            }
          ]
        }
      ]
    },
    "sd_haldane": {
      "whatHint": "Haldane traced how a sealed atmosphere fails: slowly, with rising carbon dioxide and a crew responding. Ask whether any such developing timeline exists, or whether the record simply stops at once.",
      "sci": "John Scott Haldane (1860-1936)",
      "topic": "Breathing, carbon dioxide, and sealed spaces",
      "lede": "John Scott Haldane made invisible breathing hazards measurable, turning sealed-space survival into physiology and engineering.",
      "no": 7,
      "profile": "John Scott Haldane was a Scottish physician and physiologist who repeatedly entered dangerous environments to understand how gases affect the body. He investigated mine atmospheres, carbon monoxide poisoning, oxygen deficiency, ventilation, and the control of breathing. His work helped establish that safe air cannot be judged by smell or by the presence of oxygen alone.\n\nCarbon dioxide is a powerful respiratory signal. As it accumulates, breathing becomes deeper and faster, headache and confusion can follow, and high concentrations can incapacitate or kill. Oxygen deficiency creates a different hazard: judgment and coordination may deteriorate before a person recognizes the danger. Haldane also showed the importance of partial pressure—the effective pressure contributed by each gas—because the same percentage can have different physiological consequences when total pressure changes.\n\nFor diving, Haldane led work that produced staged decompression procedures based on the uptake and release of inert gas by body tissues. That problem is distinct from a sealed-cabin atmosphere, but the method was characteristic: identify the physiological process, measure its time course, and replace guesswork with operational limits. Life support therefore requires continuous attention to oxygen, carbon dioxide removal, pressure, temperature, and power.\n\nA battery fire, oxygen shortage, or carbon-dioxide scrubber failure is serious, yet it usually leaves a developing sequence. Electrical values change, atmosphere sensors drift, alarms appear, communications continue for some interval, or crew behavior reflects impairment. The exact timeline depends on the failure, so no single symptom is guaranteed. Still, these are physiological and systems casualties, not instantaneous shell collapse. Haldane’s work teaches investigators to look for a time history: changing gas composition, power telemetry, attempted responses, and a survivable interval. An abrupt end accompanied by a single energetic pressure transient belongs to a different class of event.",
      "frame": "Reyes checks the emergency scrubber cartridge recovered from the hangar. “A bad atmosphere can kill without a mark on the hull. Show me what timeline the instruments should leave.”",
      "q": [
        {
          "q": "Why can carbon-dioxide buildup be dangerous in a sealed cabin?",
          "o": [
            {
              "t": "It drives respiratory distress and neurological impairment as concentration rises.",
              "v": "expert",
              "fb": "Elevated carbon dioxide can cause air hunger, headache, confusion, unconsciousness, and death."
            },
            {
              "t": "It becomes harmless whenever the cabin still contains a normal oxygen percentage.",
              "v": "danger",
              "fb": "Carbon dioxide can reach dangerous levels even while substantial oxygen remains present."
            },
            {
              "t": "It instantly buckles the pressure hull by increasing seawater density outside.",
              "v": "wrong",
              "fb": "Cabin carbon dioxide does not cause sudden external-pressure shell buckling in that manner."
            },
            {
              "t": "It can be detected reliably by odor before any physiological effect develops.",
              "v": "wrong",
              "fb": "Carbon dioxide is not safely monitored by smell and requires appropriate instrumentation."
            }
          ]
        },
        {
          "q": "What does partial pressure describe?",
          "o": [
            {
              "t": "The share of total pressure contributed by one gas present in a mixture.",
              "v": "expert",
              "fb": "Gas physiology depends on each component’s partial pressure, not percentage alone."
            },
            {
              "t": "The fraction of hull thickness that remains after a crack crosses one layer.",
              "v": "wrong",
              "fb": "That is a structural-damage question rather than the definition of gas partial pressure."
            },
            {
              "t": "The difference between acoustic pressure at two separated hydrophone stations.",
              "v": "partial",
              "fb": "Acoustic pressure is measurable, but partial pressure specifically concerns gases in a mixture."
            },
            {
              "t": "The maximum depth reached before a vessel begins its planned ascent sequence.",
              "v": "wrong",
              "fb": "Dive depth is not what physiologists mean by the partial pressure of a gas."
            }
          ]
        },
        {
          "q": "What evidence best distinguishes a life-support casualty from implosion?",
          "o": [
            {
              "t": "A developing telemetry and atmosphere trend indicates a progressive cabin emergency.",
              "v": "expert",
              "fb": "Life-support failures generally produce a time history rather than one instantaneous structural transient."
            },
            {
              "t": "A single broadband pulse suggests carbon dioxide accumulated for several hours.",
              "v": "wrong",
              "fb": "One impulsive sound does not document the gradual gas trend expected from carbon-dioxide buildup."
            },
            {
              "t": "A missing odor report suggests the cabin gases remained within safe limits.",
              "v": "danger",
              "fb": "Odor is not a dependable safeguard for oxygen or carbon-dioxide hazards."
            },
            {
              "t": "An intact battery label establishes that every electrical circuit kept working.",
              "v": "wrong",
              "fb": "A component label cannot substitute for voltage, current, alarm, and communications records."
            }
          ]
        }
      ]
    },
    "sd_rayleigh": {
      "whatHint": "Rayleigh described the single violent collapse of a void — one sharp, energetic pulse: not the slow signature of a fire or an air casualty, and not the long grinding of a hull working against a wreck.",
      "sci": "Lord Rayleigh (1842-1919)",
      "topic": "The violent collapse of a cavity",
      "lede": "Lord Rayleigh calculated how a cavity driven inward by pressure can collapse with startling speed and violence.",
      "no": 8,
      "profile": "Lord Rayleigh, born John William Strutt, was a British physicist and mathematician whose work ranged across sound, vibration, optics, fluid mechanics, and gases. He shared in the discovery of argon and received the 1904 Nobel Prize in Physics, but his name also belongs to a foundational calculation of cavity collapse in a liquid.\n\nIn 1917 Rayleigh examined an ideal spherical cavity surrounded by liquid at higher pressure. The pressure difference accelerates the liquid inward. As the cavity shrinks, the moving liquid gains speed and focuses energy into a smaller region. Rayleigh derived a collapse time that depends on the cavity’s initial size, the liquid density, and the pressure difference. The final stage becomes extremely rapid, with high local velocities and pressure pulses.\n\nA collapsing pressure hull is not identical to a gas bubble: the hull has solid structure, joints, material resistance, and complex geometry. Yet the calculation captures an essential feature of implosion. External pressure stores the capacity for violent inward motion. Once the structure loses stability and no longer supports that pressure, water accelerates into the displaced volume. The event can be over before a human nervous system could react, and it produces a short, energetic acoustic transient.\n\nRayleigh’s result separates instantaneous collapse from slower operational casualties. A collision would require the vehicle to reach and contact an object. A battery or atmosphere emergency would ordinarily unfold through a sequence of warnings and degraded functions. Implosion instead has a sharply defined moment tied to structural instability. Its acoustic signature may travel far through the ocean, but the event itself is brief. The forensic task is to combine that transient with source depth, descent telemetry, and material history. The violence of the final instant says little about how long the structure had been accumulating damage beforehand.",
      "frame": "The analyst places one narrow pulse under a much longer telemetry chart. “Rayleigh wrote the mathematics of inward collapse. Tell me why the final event can be instantaneous even when the damage was not.”",
      "q": [
        {
          "q": "What drives Rayleigh’s ideal cavity collapse?",
          "o": [
            {
              "t": "Higher surrounding liquid pressure accelerates the boundary inward.",
              "v": "expert",
              "fb": "The pressure difference forces liquid toward the lower-pressure cavity and speeds the collapse."
            },
            {
              "t": "Lower surrounding pressure pulls the liquid outward until the cavity freezes.",
              "v": "wrong",
              "fb": "Rayleigh collapse is driven by greater pressure outside the cavity, not lower pressure."
            },
            {
              "t": "A constant electrical current rotates the cavity wall through the liquid.",
              "v": "wrong",
              "fb": "The model concerns pressure-driven fluid motion rather than electrical rotation."
            },
            {
              "t": "Buoyancy alone compresses the cavity mainly after it reaches the seafloor.",
              "v": "danger",
              "fb": "Hydrostatic pressure acts throughout descent and does not wait for bottom contact."
            }
          ]
        },
        {
          "q": "Why does the final stage of collapse become so rapid?",
          "o": [
            {
              "t": "Inward-moving liquid focuses energy into an ever-smaller volume near collapse.",
              "v": "expert",
              "fb": "As radius decreases, the converging flow accelerates and concentrates energy near collapse."
            },
            {
              "t": "The surrounding water loses all its mass as the cavity becomes smaller.",
              "v": "wrong",
              "fb": "Water retains its mass; the dynamics arise from accelerated converging flow."
            },
            {
              "t": "The cavity creates oxygen that detonates after a long chemical induction period.",
              "v": "wrong",
              "fb": "Rayleigh’s collapse does not require oxygen production or chemical detonation."
            },
            {
              "t": "The shell slowly opens a door that equalizes pressure without a transient.",
              "v": "danger",
              "fb": "A gentle equalization is the opposite of unstable, rapid implosive collapse."
            }
          ]
        },
        {
          "q": "What record is most consistent with an instantaneous implosion?",
          "o": [
            {
              "t": "One compact energetic transient coincident with an abrupt telemetry end.",
              "v": "expert",
              "fb": "A sudden structural collapse can create a brief broadband pulse and immediate loss of systems."
            },
            {
              "t": "Several hours of rising carbon dioxide followed by repeated crew radio calls.",
              "v": "partial",
              "fb": "That pattern better supports a progressive life-support casualty than instantaneous collapse."
            },
            {
              "t": "A gradual battery-voltage decline with pumps continuing throughout the descent.",
              "v": "wrong",
              "fb": "Continued telemetry during a slow electrical decline does not match an abrupt implosion instant."
            },
            {
              "t": "A scrape recorded mainly after the vehicle reached the wreck’s known depth.",
              "v": "danger",
              "fb": "A bottom-contact sound is a distinct hypothesis and requires location at the wreck."
            }
          ]
        }
      ]
    },
    "sd_kwolek": {
      "whatHint": "Kwolek's fibres win their strength from an intact structure; once fatigue seeds a flaw, that margin is quietly gone. Ask what the material's service life had already used up.",
      "sci": "Stephanie Kwolek (1923-2014)",
      "topic": "High-strength fibres and the composites they build",
      "lede": "Stephanie Kwolek’s extraordinary fibre showed both the promise of composites and the danger of oversimplifying them.",
      "no": 9,
      "profile": "Stephanie Kwolek was an American chemist at DuPont who discovered the polymer chemistry that led to Kevlar. While searching for lightweight, high-performance fibres, she produced an unusual cloudy liquid-crystalline solution. Others might have discarded it, but she persuaded a technician to spin it. The resulting aramid fibre was exceptionally strong and stiff for its weight, heat resistant, and useful in products ranging from protective armour to cables and tires.\n\nA high-strength fibre is not the same thing as a finished structure. Composites place fibres inside a matrix, often a polymer resin, so that each constituent performs a different job. Fibres carry loads most effectively along their length; the matrix binds them, transfers stress, protects surfaces, and gives the part its shape. Fibre direction therefore matters. A laminate optimized for tension in one direction may be less tolerant of compression, shear, impact, or through-thickness loading.\n\nManufacturing quality is equally important. Voids, wrinkles, uneven curing, contamination, weak bonds, and changes in fibre placement can create local stress concentrations. Repeated loading may produce matrix cracks, fibre-matrix debonding, delamination between layers, and broken fibres. Some damage is internal and does not create a conspicuous surface crack. Inspection methods must be matched to the material, and qualification specimens must represent the real thickness, geometry, joints, and production process.\n\nKwolek’s achievement should inspire precision rather than magical thinking about “stronger than steel.” Specific strength is valuable, but steel and fibre composites fail differently. A carbon-composite pressure cylinder under repeated external pressure must be validated for compression, stability, cyclic life, moisture, temperature, joints, and defects—not merely compared by tensile strength. Composites can make remarkable vehicles possible, yet their anisotropy and hidden damage demand conservative testing and traceable manufacturing. The fibre’s strength is only one line in the structural argument.",
      "frame": "The clerk sets a bright fibre sample beside a dark delaminated fragment. “Strong fibre is not a complete hull. Show me what the resin, layup, and hidden interfaces contribute.”",
      "q": [
        {
          "q": "What was distinctive about Kwolek’s Kevlar fibre?",
          "o": [
            {
              "t": "It combined very high strength and stiffness with comparatively low weight.",
              "v": "expert",
              "fb": "Kevlar’s high specific strength and stiffness made it valuable in demanding lightweight applications."
            },
            {
              "t": "It became a liquid metal that repaired cracks whenever pressure increased.",
              "v": "wrong",
              "fb": "Kevlar is an aramid polymer fibre and does not flow like a self-healing metal."
            },
            {
              "t": "It remained equally strong in every direction without a supporting matrix.",
              "v": "danger",
              "fb": "Fibres are directionally strong, and structural composites depend on layup and matrix behavior."
            },
            {
              "t": "It generated electrical power directly from seawater during deep descents.",
              "v": "wrong",
              "fb": "Kevlar is a structural fibre, not an electrochemical power source."
            }
          ]
        },
        {
          "q": "Why does fibre orientation matter in a composite laminate?",
          "o": [
            {
              "t": "Fibres carry load best along their axes, making the structure anisotropic.",
              "v": "expert",
              "fb": "Composite strength and stiffness depend strongly on the directions in which fibres are placed."
            },
            {
              "t": "Fibres erase all differences between tension, compression, and shear loading.",
              "v": "danger",
              "fb": "Composites respond differently to different load modes and cannot be treated as isotropic."
            },
            {
              "t": "Fibres make every resin void harmless once the laminate has fully cured.",
              "v": "wrong",
              "fb": "Voids and poor bonding can remain critical defects after cure."
            },
            {
              "t": "Fibres determine buoyancy but contribute nothing to structural load carrying.",
              "v": "wrong",
              "fb": "The fibres are primary load-carrying elements in the directions for which they are arranged."
            }
          ]
        },
        {
          "q": "What hidden damage can repeated loading create in a composite?",
          "o": [
            {
              "t": "Matrix cracking, debonding, delamination, and fibre breaks can accumulate inside.",
              "v": "expert",
              "fb": "Composite fatigue may progress internally through several interacting damage mechanisms."
            },
            {
              "t": "mainly a single polished surface crack can occur before complete structural failure.",
              "v": "danger",
              "fb": "Internal distributed damage may develop without one obvious external crack."
            },
            {
              "t": "The resin converts all previous damage into extra stiffness after each cycle.",
              "v": "wrong",
              "fb": "Cyclic damage generally degrades stiffness and integrity rather than increasing them."
            },
            {
              "t": "Every defect becomes visible through paint before it affects pressure stability.",
              "v": "wrong",
              "fb": "Paint and surface appearance cannot reveal all subsurface composite damage."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "diver": {
      "sd_dock": "Reyes stands beneath the empty launch frame, one hand on the scarred lifting sling. “The Sirena left this dock looking whole,” she says. “Ask me what recovery patterns can—and cannot—say about how it came apart.”",
      "sd_ship": "On the aft deck, Reyes watches the ROV feed replay over a bank of wet monitors. “Debris settles according to current, shape, and the violence that made it,” she says. “Earn the map before you read motives into it.”",
      "sd_lab": "Reyes turns a recovered ring beneath the laboratory lights. “The sea returned fragments, not a confession,” she says. “Show me you understand pressure structures before I tell you where each piece was found.”"
    },
    "acoust": {
      "sd_dock": "The analyst tests a portable hydrophone beside the dock pilings. “Water carries more than voices,” they say. “Prove you know the difference between an echo, machinery noise, and a collapse transient.”",
      "sd_ship": "In the ship’s acoustics room, three synchronized traces glow above the chart table. “These stations heard the same instant at different times,” the analyst says. “Show me how timing becomes position.”",
      "sd_lab": "The analyst places the acoustic pulse beside a recovered clock module. “One record survived at a distance, the other inside the wreckage,” they say. “Tell me which can fix the event’s moment without inventing a story.”"
    },
    "clerk": {
      "sd_dock": "The clerk unlocks a hangar cabinet packed with pressure-test certificates. “Some papers describe the craft that was built; others describe the craft people wished they had built,” she says. “Show me you can separate them.”",
      "sd_ship": "At a folding desk below the bridge, the clerk opens the dive-cycle ledger. “A voyage log is also a fatigue history,” she says. “Convince me you know why successful returns still count against service life.”",
      "sd_lab": "The clerk waits beside trays of labelled composite fragments. “The build file stops where independent certification should begin,” she says. “Pass my test, and I will show you who accepted that gap.”"
    }
  },
  "story": [
    "The research submersible <b>Sirena</b> vanished during its descent into the Carrow Deep. Minutes later, distant hydrophones registered a violent underwater transient, and the support ship recovered only scattered fragments.",
    "<b>Salvage Lead Reyes</b> recovered the fragments. <b>The Acoustics Analyst</b> holds the underwater sound record. <b>The Records Clerk</b> controls the expedition’s technical and operating files.",
    "The board must name who bears responsibility, where the decisive record lies, and why the pressure hull failed. A <b>collision with the wreck</b> offers a dramatic explanation; a <b>battery fire or oxygen casualty</b> offers a slower one. Both have serious advocates.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and decide the <b>WHAT</b> from the evidence."
  ],
  "endings": {
    "overclaimWhat": "sd_strike",
    "dismissalWhat": "sd_life",
    "win": {
      "expertTitle": "The Depth, the Cycles, and the Missing Certificate",
      "expert": [
        "Okonkwo names Marcus Vane, the expedition’s founder-pilot; the materials lab and recovered fragments; and fatigue from repeated dives collapsing the pressure hull. The cycle ledger, acoustic-emission history, composite damage, and instantaneous transient form one chain. Not a collision with the wreck. Not a battery fire or oxygen casualty.",
        "The hydrophones place the implosion above the wreck during descent, while the telemetry ends at the same instant rather than decaying through a cabin emergency. Vane continued operations beyond the validated cycle program without independent certification. The finding distinguishes the long accumulation of damage from the brief final collapse."
      ],
      "soundTitle": "The Right Failure, Solidly Supported",
      "sound": [
        "Okonkwo identifies Marcus Vane, the materials lab, and pressure-cycle fatigue as the cause of the Sirena’s implosion. The principal evidence agrees: the source depth excludes wreck contact, and the acoustic transient does not fit a gradual life-support casualty.",
        "Some links in the materials history remain less fully documented than the expert finding would prefer, but the judgment is technically sound and supported by the surviving records."
      ],
      "namedTitle": "Correct, but Barely Anchored",
      "named": [
        "Okonkwo names Marcus Vane, the materials lab, and fatigue from repeated dives. The accusation is right, yet too few records and readings were secured to demonstrate why the two rival explanations fail.",
        "A board can investigate the correct theory from here, but it should not have to reconstruct the investigator’s reasoning after the finding is filed."
      ]
    },
    "overclaim": {
      "title": "The Wreck That Was Never Reached",
      "body": [
        "Okonkwo blames a collision with the wreck because it is the most vivid event available: a fragile craft descending toward twisted steel in darkness.",
        "The hydrophone solution places the single implosion transient at a depth above the wreck, before contact was possible. Treating destination as cause ignores the acoustic geometry and distracts the board from the pressure-cycle history preserved in the hull records."
      ]
    },
    "dismissal": {
      "title": "A Slow Emergency Assigned to an Instant",
      "body": [
        "Okonkwo attributes the loss to a battery fire or oxygen casualty, a plausible danger in any sealed submersible and an explanation that initially fits the absence of survivors.",
        "The surviving record lacks the developing electrical, atmospheric, communications, or crew-response timeline such a casualty should produce. Instead, telemetry ends with one energetic implosion transient. The slow-failure theory mistakes a real operational hazard for the event the instruments actually recorded."
      ]
    },
    "wrongNames": {
      "title": "The Mechanism Found, the Accusation Misplaced",
      "body": [
        "Okonkwo correctly concludes that repeated pressure cycles fatigued the composite hull, but assigns responsibility to the wrong person or places the decisive act at the wrong site. The physics is established; the remaining task is to follow the cycle authorization and certification record to the person who accepted the risk and the files where that decision survives."
      ]
    }
  }
}};
