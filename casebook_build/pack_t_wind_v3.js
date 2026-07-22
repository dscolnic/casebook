// Casebook V3 — three informants, three readings, one clue per correct answer.
module.exports = { PACK: {
  "schemaVersion": 3,
  "mode": "three_informants_three_readings",
  "id": "t_wind",
  "title": "The Fenmark Turbine Collapse",
  "discipline": "Wind Energy & Fatigue Engineering",
  "venue": "the Fenmark turbine inquiry",
  "agent": {
    "name": "Inspector Yara Doss",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Wind & Fatigue Pioneers",
  "dossierName": "WIND & FATIGUE PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Fenmark turbine inquiry",
  "teaser": "A turbine throws a blade and folds its tower during a narrow convective gust front. Was the machine struck or sabotaged, had fatigue been missed during maintenance, or did a rare coherent gust exceed the certified load case despite an intact inspection record?",
  "overclaimTag": "deliberate damage or an outside strike",
  "truthTag": "a code-exceeding coherent gust with no culpable actor",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A wind turbine encountering a sharp coherent gust\"><path d=\"M300 126 V50\" stroke=\"#121212\" stroke-width=\"5\"/><circle cx=\"300\" cy=\"45\" r=\"8\" fill=\"none\" stroke=\"#121212\" stroke-width=\"3\"/><path d=\"M300 45 L220 24 M300 45 L370 12 M300 45 L356 102\" stroke=\"#121212\" stroke-width=\"5\"/><path d=\"M40 40 C120 14,160 66,240 38 M380 38 C460 12,520 62,620 28\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"4\"/><path d=\"M120 92 h120 M390 92 h170\" stroke=\"#e2e2d8\" stroke-width=\"2\"/></svg>",
  "overclaimTease": "A rare gust should leave a load signature distinct from fatigue or impact: a coherent wind spike, fresh overload fracture, and no long crack-growth history.",
  "DAYS_TOTAL": 3,
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "gust",
      "items": [
        {
          "id": "gust",
          "label": "An act of nature — the convective gust front, not a person"
        },
        {
          "id": "technician",
          "label": "The turbine service lead"
        },
        {
          "id": "operator",
          "label": "Sylvie Renn — wind-farm operator"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "nacelle",
      "items": [
        {
          "id": "scada",
          "label": "The SCADA Control Hut"
        },
        {
          "id": "nacelle",
          "label": "The Nacelle, Rotor & Blade Root"
        },
        {
          "id": "office",
          "label": "The Operator’s Asset Office"
        }
      ]
    },
    "what": {
      "title": "What happened",
      "truth": "freak",
      "items": [
        {
          "id": "fatigue",
          "label": "Blade-root fatigue progressed through a missed service interval"
        },
        {
          "id": "freak",
          "label": "A coherent gust exceeded the certified transient load case"
        },
        {
          "id": "attack",
          "label": "An outside strike or deliberate damage initiated the collapse"
        }
      ]
    }
  },
  "READING_ORDER": [
    "climber",
    "scadaop",
    "clerk"
  ],
  "CHARACTERS": {
    "climber": {
      "name": "Blade Tech Aro",
      "role": "Rope-access technician",
      "face": "🧗",
      "badge": "A",
      "legend": "the blade root",
      "hint": "The previous inspection is complete, and the recovered fracture is fresh overload rather than an oxidized fatigue front.",
      "reading": "betz"
    },
    "scadaop": {
      "name": "The SCADA Operator",
      "role": "Control-hut operator",
      "face": "🖥️",
      "badge": "S",
      "legend": "the wind record",
      "hint": "A narrow gust strikes all nearby turbines coherently and briefly exceeds the certified extreme operating gust.",
      "reading": "glauert"
    },
    "clerk": {
      "name": "The Certification Clerk",
      "role": "Load-case and maintenance clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the engineering archive",
      "hint": "Maintenance, bolt torque, and alarm records are complete; the measured transient falls outside the certification envelope.",
      "reading": "rayleigh"
    }
  },
  "TOPICS": {
    "betz": {
      "sci": "Albert Betz (1885-1968)",
      "topic": "The Betz limit & wind-turbine loading",
      "lede": "Betz’s famous power limit also reveals how rapidly thrust demand rises when wind speed jumps.",
      "no": 1,
      "profile": "Albert Betz was a German physicist and engineer who gave wind-energy design one of its defining results. In 1919 he analysed an ideal rotor extracting energy from a moving stream of air. A turbine cannot stop the air completely, because the slowed flow must continue through and away from the rotor. Balancing mass, momentum, and energy yields the Betz limit: an ideal actuator disc can capture at most 16/27, about 59.3 percent, of the wind’s kinetic power.\n\nThe result is often described as an efficiency ceiling, but it also teaches load scaling. Wind power grows with the cube of wind speed, while aerodynamic thrust grows approximately with the square. A modest increase in wind can therefore create a large increase in both available power and structural demand. Real turbines regulate that demand through blade pitch, generator torque, yaw control, and shutdown strategies.\n\nDesign standards include operating gusts and parked extreme winds, yet every certification envelope has assumptions about duration, coherence, shear, direction change, and control response. A brief spatially coherent gust can load several blades and the tower differently from ordinary turbulence. The question after failure is whether the measured wind lies within the certified case and whether the rotor responded as expected.\n\nAt Fenmark, normal production stops as commanded, but the measured transient rises above the certified operating-gust envelope before pitch can unload the rotor. Betz’s scaling explains why the short speed increase creates a disproportionate thrust impulse. It neither excuses missing fatigue nor proves sabotage; it provides the load magnitude that both alternative stories must match.",
      "frame": "Aro holds the clean fracture beside the gust record. “Wind load does not rise politely. Show me what a few extra metres per second can do.”",
      "q": [
        {
          "q": "Why can no wind turbine extract all kinetic energy from the passing air?",
          "o": [
            {
              "t": "The blades reflect exactly half the wind backward regardless of their design.",
              "v": "partial",
              "fb": "The optimal slowdown is derived from momentum, not a fixed reflection fraction."
            },
            {
              "t": "The air must retain enough motion to continue through and away from the rotor.",
              "v": "expert",
              "fb": "Betz’s momentum balance requires a continuing downstream flow."
            },
            {
              "t": "Generators does not convert rotational motion into electrical energy above low speed.",
              "v": "wrong",
              "fb": "Generators can operate efficiently; the aerodynamic stream sets the ideal limit."
            },
            {
              "t": "Atmospheric pressure becomes zero immediately behind an efficient rotor.",
              "v": "danger",
              "fb": "The wake pressure recovers and does not become a permanent vacuum."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "Betz’s load scaling shows the measured gust could create the recorded thrust impulse without impact or pre-existing fatigue."
          }
        },
        {
          "q": "How does aerodynamic thrust change approximately with wind speed?",
          "o": [
            {
              "t": "It stays constant because blade pitch removes nearly every effect of stronger wind.",
              "v": "partial",
              "fb": "Controls reduce loads but cannot erase every transient instantly."
            },
            {
              "t": "It falls linearly as wind speed increases above the rated value in wind data.",
              "v": "wrong",
              "fb": "Above-rated control changes behaviour, but thrust does not simply fall linearly."
            },
            {
              "t": "It grows roughly with the square of speed for comparable operating conditions.",
              "v": "expert",
              "fb": "Squared speed means a short extreme can increase structural demand sharply."
            },
            {
              "t": "It depends mainly on generator voltage and not on the moving air.",
              "v": "danger",
              "fb": "Aerodynamic force originates in the air-blade interaction."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The fresh blade-root overload and nacelle load cells align with the gust impulse at the rotor, not with damage originating in the office or control hut."
          }
        },
        {
          "q": "Which fracture observation most strongly weakens a missed-fatigue explanation?",
          "o": [
            {
              "t": "A blade separated near a heavily loaded root connection across the turbine array.",
              "v": "partial",
              "fb": "The root is highly loaded in both fatigue and overload cases."
            },
            {
              "t": "The turbine had accumulated many operating hours before the event.",
              "v": "wrong",
              "fb": "Operating time creates opportunity but not proof of a crack."
            },
            {
              "t": "Technicians used standard nondestructive inspection during the prior service.",
              "v": "danger",
              "fb": "Standard inspection supports maintenance quality but the fracture surface is more direct."
            },
            {
              "t": "A fresh overload surface without an older oxidized crack-growth region.",
              "v": "expert",
              "fb": "Absence of progressive fatigue morphology favours one-time overload."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "A complete inspection record and fresh fracture leave no technician or operator decision at the beginning of the failure; the initiating agent is the gust itself."
          }
        }
      ]
    },
    "glauert": {
      "sci": "Hermann Glauert (1892-1934)",
      "topic": "Blade-element momentum & rotor aerodynamics",
      "lede": "Glauert linked each blade section to the flow through the whole rotor, making gust load a calculable event.",
      "no": 2,
      "profile": "Hermann Glauert was a British aerodynamicist at the Royal Aircraft Establishment who developed practical theories for propellers, wings, and rotors. Blade-element momentum theory combines two views. Momentum theory treats the rotor as a disc changing the flow, while blade-element theory divides each blade into small sections whose lift and drag depend on local speed and angle of attack.\n\nThe combined method lets engineers calculate thrust, torque, induced velocity, and the effects of blade geometry. A rotating blade experiences different relative wind along its span, and yaw, shear, turbulence, and rapid pitch changes make the inflow unsteady. Modern turbine codes extend Glauert’s framework with dynamic stall, wake dynamics, structural flexibility, and control models.\n\nGust coherence is important. Ordinary turbulence varies across the rotor, so loads partly average among blades and over time. A coherent gust changes wind over much of the disc together, producing a stronger collective thrust and tower-bending response. Directional shear or a fast veer can add asymmetric loading. Comparing multiple turbines and meteorological sensors can distinguish a real atmospheric front from a faulty anemometer on one machine.\n\nFenmark’s lidar, nacelle instruments, and neighbouring turbines record the same narrow gust and direction change. The failed machine’s pitch begins its commanded response, but the load peak arrives before the blades reach the unloading angle. Glauert’s rotor physics links the measured inflow to the transient root load. The event is rare, not unobservable, and the common signal across machines argues against local sabotage or a single defective sensor. That agreement across machines is the strongest reason to trust the measured gust.",
      "frame": "The SCADA operator overlays lidar and five turbine traces. “One sensor can lie. A front crossing the farm leaves witnesses.”",
      "q": [
        {
          "q": "What does blade-element momentum theory combine?",
          "o": [
            {
              "t": "Section-by-section blade forces with the momentum change of flow through the rotor.",
              "v": "expert",
              "fb": "The method links local airfoil forces to the rotor’s overall flow and thrust."
            },
            {
              "t": "Electrical generator losses with the market price of delivered wind power.",
              "v": "partial",
              "fb": "Electrical and market quantities are outside the aerodynamic theory."
            },
            {
              "t": "Tower-foundation settlement with the chemical ageing of blade resin.",
              "v": "wrong",
              "fb": "Those structural and material issues require different models."
            },
            {
              "t": "Weather forecasts with a fixed assumption that nearly every blade sees identical wind.",
              "v": "danger",
              "fb": "The theory can represent varying local inflow rather than assuming perfect uniformity."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "Glauert’s reconstruction turns the measured coherent inflow into the blade-root load peak, confirming a gust-driven transient rather than a hidden crack."
          }
        },
        {
          "q": "Why can a coherent gust load a rotor more severely than ordinary turbulence?",
          "o": [
            {
              "t": "Coherent gusts contain no moving air and therefore stop the rotor instantaneously.",
              "v": "partial",
              "fb": "A gust is a wind-speed change, not an absence of air."
            },
            {
              "t": "Much of the rotor disc experiences the change together, so loads do not average out.",
              "v": "expert",
              "fb": "Spatially aligned inflow creates a strong collective thrust response."
            },
            {
              "t": "Ordinary turbulence generally affects nearly every blade with exactly the same phase.",
              "v": "wrong",
              "fb": "Ordinary turbulence is often less correlated across the disc."
            },
            {
              "t": "A coherent gust can occur mainly after a turbine’s pitch system has failed.",
              "v": "danger",
              "fb": "The atmospheric event is independent of whether the pitch system is healthy."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "Lidar, adjacent turbines, and the failed nacelle record the same front, locating the decisive load at the rotor rather than in one faulty control channel."
          }
        },
        {
          "q": "Which observation best rules out one bad anemometer?",
          "o": [
            {
              "t": "The failed turbine reports the highest single wind value in the farm in wind data.",
              "v": "partial",
              "fb": "One extreme instrument could itself be faulty."
            },
            {
              "t": "One technician remembers that the day felt unusually windy at ground level in wind data.",
              "v": "wrong",
              "fb": "A subjective ground impression does not validate rotor-height timing."
            },
            {
              "t": "Independent lidar and several nearby turbines record the same gust timing and direction shift.",
              "v": "expert",
              "fb": "Independent spatial agreement confirms a real atmospheric transient."
            },
            {
              "t": "The operator’s office received a weather advisory earlier in the week in wind data.",
              "v": "danger",
              "fb": "A broad advisory cannot establish the exact gust."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "Independent instruments remove the operator and service lead as creators of the signal; no local data manipulation is needed to produce the event."
          }
        }
      ]
    },
    "rayleigh": {
      "sci": "Lord Rayleigh (1842-1919)",
      "topic": "Vibration, impulse & resonance",
      "lede": "Rayleigh showed how a brief force can awaken a structure’s natural modes without years of hidden damage.",
      "no": 3,
      "profile": "Lord Rayleigh, born John William Strutt, made foundational contributions across acoustics, optics, and vibration. His work on oscillating systems showed how structures have natural modes and frequencies determined by mass, stiffness, and boundary conditions. When a periodic or transient force contains energy near a natural frequency, the response can be amplified.\n\nResonance is not limited to a perfectly repeating sinusoid. A sharp impulse or gust contains a range of frequencies and can excite several structural modes. Damping controls how quickly the motion decays. For a wind turbine, flexible blades, drivetrain components, nacelle, and tower interact; controls may also add or remove damping. Engineers use measured mode shapes and load simulations to avoid dangerous operating ranges and to evaluate transient extremes.\n\nFatigue and overload leave different evidence. Resonant cycling over long periods can grow cracks, producing beach marks, oxidation, or a progressive front. One exceptional transient may drive stress beyond ultimate strength and leave a comparatively fresh fracture. Vibration records can show whether a mode grew gradually before failure or responded once to a sudden input.\n\nFenmark’s tower and nacelle channels show a single large first-mode response beginning with the farm-wide gust, followed by immediate blade separation. Earlier spectra are stable, and maintenance torque checks are complete. The measured gust lies outside the certified transient case used for that control state. Rayleigh’s dynamics therefore support a genuine rare event. The conclusion is not “wind is unpredictable”; it is that one documented atmospheric input exceeded the modelled envelope without a hidden fatigue prelude.",
      "frame": "The clerk runs the tower spectrum from calm operation into one violent mode. “Find whether this motion grew for months or arrived in one breath.”",
      "q": [
        {
          "q": "What is a structural natural frequency?",
          "o": [
            {
              "t": "The average wind speed naturally expected at the site each calendar year.",
              "v": "partial",
              "fb": "Wind climate and structural vibration are different quantities."
            },
            {
              "t": "A fixed generator frequency that prevents the tower from moving at the mode.",
              "v": "wrong",
              "fb": "Generator control does not make the flexible tower immobile."
            },
            {
              "t": "The fracture strength of a material expressed as cycles per second at the mode.",
              "v": "danger",
              "fb": "Strength is not itself a vibration frequency."
            },
            {
              "t": "A frequency at which the system tends to oscillate according to its mass and stiffness.",
              "v": "expert",
              "fb": "Natural modes arise from structural mass, stiffness, and constraints."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "Rayleigh’s modal record shows one large response launched by the gust, not a growing vibration or crack history before the event."
          }
        },
        {
          "q": "Why can a brief impulse excite a structural mode?",
          "o": [
            {
              "t": "A sharp input contains a range of frequencies, including energy near the mode.",
              "v": "expert",
              "fb": "Broad-frequency content allows a transient to excite one or more modes."
            },
            {
              "t": "Mainly a perfectly periodic force can make any structure vibrate.",
              "v": "partial",
              "fb": "Repeated forcing is not required for a transient modal response."
            },
            {
              "t": "An impulse removes mass from the structure and changes gravity.",
              "v": "wrong",
              "fb": "The force changes motion, not the structure’s mass by definition."
            },
            {
              "t": "Modes exist mainly in laboratory models, not full-scale towers.",
              "v": "danger",
              "fb": "Full-scale structures have measurable natural modes."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The nacelle and tower sensors capture the first-mode impulse at the turbine itself, synchronized with the farm-wide gust front."
          }
        },
        {
          "q": "Which record best distinguishes rare overload from long fatigue?",
          "o": [
            {
              "t": "Many years of operation without examining the fracture surface or vibration archive.",
              "v": "partial",
              "fb": "Operating age alone cannot choose between fatigue and overload."
            },
            {
              "t": "Stable earlier spectra and a fresh fracture followed by one extreme modal response.",
              "v": "expert",
              "fb": "The combination directly tests history and final loading mechanism."
            },
            {
              "t": "A service schedule that contains fewer pages than the certification report.",
              "v": "wrong",
              "fb": "Document length has no causal meaning."
            },
            {
              "t": "A public claim that modern turbines are designed for severe weather.",
              "v": "danger",
              "fb": "General design claims do not replace event-specific evidence."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "Certification and service records contain no waived maintenance or muted alarm; the evidence assigns no culpable person to the code-exceeding atmospheric input."
          }
        }
      ]
    }
  },
  "story": [
    "<b>Fenmark’s fallen turbine invites blame because the gust front has already passed and cannot answer questions.</b>",
    "Blade Tech Aro has the fracture morphology. The SCADA Operator holds independent wind records. The Certification Clerk can compare the transient with the approved load envelope and maintenance file.",
    "Sabotage, missed fatigue, and a genuine code-exceeding gust each predict a different history before the blade leaves the hub.",
    "The verdict must decide whether the absence of a culprit is earned by evidence rather than selected by convenience."
  ],
  "endings": {
    "overclaimWhat": "fatigue",
    "dismissalWhat": "attack",
    "win": {
      "expertTitle": "The Gust Beyond the Envelope",
      "expert": [
        "You connect no culpable individual, the Nacelle, Rotor & Blade Root, and a coherent gust exceeding the certified transient load case. The full clue chain links the initiating condition, the physical mechanism, and the decisive record without relying on candidate order.",
        "The two alternative explanations each fit part of the scene, but neither survives the combined timing, material, and documentary evidence."
      ],
      "soundTitle": "The Rare Load Case",
      "sound": [
        "Your accusation identifies no culpable individual, the Nacelle, Rotor & Blade Root, and a coherent gust exceeding the certified transient load case.",
        "A few missed clues leave gaps in the reconstruction, yet the evidence you recovered is sufficient to distinguish the true sequence from both traps."
      ],
      "namedTitle": "Correct Event, Sparse Dynamics",
      "named": [
        "You reach the correct three-part verdict with a thin evidentiary file.",
        "The result is right, although the unrecovered clues would be needed to defend the causal chain under sustained challenge."
      ]
    },
    "overclaim": {
      "title": "Fatigue Leaves a History",
      "body": [
        "The fracture lacks an older oxidized growth front, and earlier vibration spectra remain stable.",
        "Inspection and torque records are complete; the failure begins with one extreme load rather than a missed maintenance interval."
      ]
    },
    "dismissal": {
      "title": "No Strike Created the Wind",
      "body": [
        "Independent lidar and several turbines record the same atmospheric front, while the blade shows no impact or tool signature.",
        "A local attacker is unnecessary and cannot explain the farm-wide coherent gust."
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
