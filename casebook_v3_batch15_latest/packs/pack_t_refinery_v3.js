// Casebook V3 — three informants, three readings, one clue per correct answer.
module.exports = { PACK: {
  "schemaVersion": 3,
  "mode": "three_informants_three_readings",
  "id": "t_refinery",
  "title": "The Halden Refinery Fire",
  "discipline": "Process Safety & Combustion Engineering",
  "venue": "the Halden refinery inquiry",
  "agent": {
    "name": "Investigator Cara Mendel",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Combustion & Corrosion Pioneers",
  "dossierName": "COMBUSTION & CORROSION PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Halden refinery inquiry",
  "teaser": "A refinery fractionator ruptures and feeds a dawn fireball. Was an attacker responsible, did one random spark overwhelm a sound unit, or did the unit superintendent authorize operation with corroded equipment and the only relief path isolated?",
  "overclaimTag": "deliberate sabotage of the process unit",
  "truthTag": "an authorized relief isolation combined with known corrosion",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A refinery tower with isolated relief line and corroded rupture\"><path d=\"M100 118 V28 h90 v90\" fill=\"none\" stroke=\"#121212\" stroke-width=\"3\"/><path d=\"M120 50 h50 M120 72 h50 M120 94 h50\" stroke=\"#e2e2d8\" stroke-width=\"2\"/><path d=\"M190 42 h115 v-18 h55\" fill=\"none\" stroke=\"#326891\" stroke-width=\"3\"/><path d=\"M280 30 l18 18 M298 30 l-18 18\" stroke=\"#B3261E\" stroke-width=\"3\"/><path d=\"M350 108 C390 72,430 92,455 52 C480 18,520 48,548 26\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"4\"/><path d=\"M402 118 h160\" stroke=\"#121212\" stroke-width=\"3\"/></svg>",
  "overclaimTease": "The flame begins after containment is lost. Reconstruct pressure, relief capacity, wall condition, and authorization before treating ignition as either sabotage or meaningless chance.",
  "DAYS_TOTAL": 3,
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "superintendent",
      "items": [
        {
          "id": "operator",
          "label": "Garon Voss — refinery operator"
        },
        {
          "id": "superintendent",
          "label": "Mira Halden — unit superintendent"
        },
        {
          "id": "inspector",
          "label": "The state process-safety inspector"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "control",
      "items": [
        {
          "id": "units",
          "label": "The Fractionator, Relief Header & Flare"
        },
        {
          "id": "office",
          "label": "The Corporate Asset Office"
        },
        {
          "id": "control",
          "label": "The Unit Control Room"
        }
      ]
    },
    "what": {
      "title": "What happened",
      "truth": "neglect",
      "items": [
        {
          "id": "attack",
          "label": "Deliberate damage opened the vessel and ignited the release"
        },
        {
          "id": "freak",
          "label": "A random ignition caused failure in an otherwise protected unit"
        },
        {
          "id": "neglect",
          "label": "Known wall loss met rising pressure after the relief path was isolated"
        }
      ]
    }
  },
  "READING_ORDER": [
    "unitop",
    "boardop",
    "clerk"
  ],
  "CHARACTERS": {
    "unitop": {
      "name": "Operator Delia Fenn",
      "role": "Unit operator",
      "face": "🔥",
      "badge": "U",
      "legend": "the fractionator deck",
      "hint": "The vessel pressure climbed after the relief header was isolated under a live operating permit.",
      "reading": "papin"
    },
    "boardop": {
      "name": "The Board Operator",
      "role": "Control-room operator",
      "face": "🎛️",
      "badge": "B",
      "legend": "the control console",
      "hint": "Trend data show pressure and temperature rising through known alarm limits while the flare path remained unavailable.",
      "reading": "fk"
    },
    "clerk": {
      "name": "The Inspection Records Clerk",
      "role": "Corrosion and permit clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the permit archive",
      "hint": "Thickness readings, the temporary isolation, and the startup authorization carry the superintendent’s review.",
      "reading": "pourbaix"
    }
  },
  "TOPICS": {
    "papin": {
      "sci": "Denis Papin (1647-1713)",
      "topic": "The pressure vessel & safety valve",
      "lede": "Papin made pressurized steam useful and added the escape path that keeps a closed vessel from becoming a bomb.",
      "no": 1,
      "profile": "Denis Papin was a French physician, physicist, and inventor whose experiments with steam made pressure both useful and visibly dangerous. In the 1670s he developed the “steam digester,” a strong closed vessel that used pressurized steam to cook and soften material at temperatures above the ordinary boiling point of water. The device was an ancestor of the pressure cooker and laboratory autoclave.\n\nPapin added a weighted safety valve so excess pressure could lift the valve and escape rather than rupture the vessel. The idea is simple but profound: a closed process that can continue generating vapour or gas needs an independent path sized for the worst credible pressure source. A relief valve is not a routine control knob. It is a last protective layer when normal regulation, cooling, or operator action is insufficient.\n\nRelief capacity depends on more than the valve body. The inlet, outlet, header, flare, back pressure, isolation valves, and discharge destination must all remain available. A perfectly tested valve cannot protect a vessel if a blind, closed block valve, frozen line, or overloaded header cuts the route. Temporary isolation during maintenance therefore requires rigorous control and compensating protection.\n\nAt Halden, the relief valve itself is intact, but its outlet is isolated from the flare while the fractionator remains in service. Papin’s safeguard has been converted into a sealed ornament. Pressure rises against a vessel already thinned by corrosion. The fire follows the rupture; the missing relief path explains why containment failed before any ignition source mattered. The closed line makes the missing protection physically visible.",
      "frame": "Delia Fenn traces the relief line to a closed isolation. “A valve cannot save a vessel through a blind. Tell me what protection was actually available.”",
      "q": [
        {
          "q": "Why did Papin add a safety valve to his steam digester?",
          "o": [
            {
              "t": "To vent excess pressure before the closed vessel ruptured in the unit.",
              "v": "expert",
              "fb": "The valve provides an escape path when generated pressure exceeds the safe limit."
            },
            {
              "t": "To increase pressure without limit while keeping the vessel temperature fixed.",
              "v": "partial",
              "fb": "Unlimited pressure would defeat the purpose of the protective device."
            },
            {
              "t": "To admit outside air so steam could no longer form inside the chamber.",
              "v": "wrong",
              "fb": "Admitting air is not the operating principle of a pressure relief valve."
            },
            {
              "t": "To measure food density without changing pressure in the vessel.",
              "v": "danger",
              "fb": "The valve protects containment rather than measuring material density."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "Papin’s principle shows the initiating protection failure: pressure continued to rise because the relief route was physically isolated from the flare."
          }
        },
        {
          "q": "Why can a tested relief valve still fail to protect a vessel?",
          "o": [
            {
              "t": "Relief valves work mainly on liquids and does not discharge vapour or gas in the unit.",
              "v": "partial",
              "fb": "Relief devices are commonly designed for vapour, gas, liquid, or mixed service."
            },
            {
              "t": "Its inlet or discharge path may be blocked, isolated, or exposed to excessive back pressure.",
              "v": "expert",
              "fb": "Protection requires the complete flow path, not merely a functioning valve mechanism."
            },
            {
              "t": "A valve becomes unnecessary whenever an operator is present in the control room.",
              "v": "wrong",
              "fb": "Operators cannot always respond fast enough to replace an independent layer."
            },
            {
              "t": "Testing permanently lowers the pressure rating of the protected vessel in the unit before rupture.",
              "v": "danger",
              "fb": "Proper testing does not inherently reduce vessel rating."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The permit and control display place the decisive isolation in the control-room lineup, where the relief header was knowingly left unavailable during operation."
          }
        },
        {
          "q": "Which finding most weakens a sabotage explanation for the initial loss of containment?",
          "o": [
            {
              "t": "A loud fireball is visible from outside the refinery after dawn in the unit.",
              "v": "partial",
              "fb": "Visual drama identifies consequence, not the initiating mechanism."
            },
            {
              "t": "The unit contains flammable hydrocarbons capable of burning after release in the unit.",
              "v": "wrong",
              "fb": "Flammability explains the fire after release but not why the vessel opened."
            },
            {
              "t": "Pressure trends rise normally against an isolated relief path until a thinned wall ruptures.",
              "v": "expert",
              "fb": "A continuous process-pressure sequence explains rupture without an external damaging act."
            },
            {
              "t": "One exterior camera loses contrast in the heat of the ensuing fire in the unit before rupture.",
              "v": "danger",
              "fb": "Heat-degraded video after ignition does not establish sabotage beforehand."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The operator followed the approved lineup; the authorization to run with the relief path isolated came from the superintendent who controlled the permit."
          }
        }
      ]
    },
    "fk": {
      "sci": "David Frank-Kamenetskii (1910-1970)",
      "topic": "Thermal explosion theory",
      "lede": "Frank-Kamenetskii described the tipping point where heat generation outruns removal and a controlled process accelerates away.",
      "no": 2,
      "profile": "David Frank-Kamenetskii was a Soviet physicist and chemist who developed influential theories of combustion and thermal explosion. He studied systems in which heat is produced by chemical reaction while simultaneously being removed through the vessel wall, cooling medium, or surrounding environment. Because reaction rates often increase steeply with temperature, a small warming can accelerate heat generation, which causes further warming.\n\nThis positive feedback does not make every hot process unstable. Stability depends on geometry, heat-transfer area, kinetics, concentration, and cooling. Frank-Kamenetskii introduced dimensionless ways to compare heat generation with heat removal and identify conditions under which no stable temperature solution remains. Beyond that threshold, temperature accelerates toward runaway unless the reaction or feed is stopped.\n\nRefinery fractionators are not simple batch reactors, but the reasoning transfers to abnormal operation. Loss of cooling, blocked vapour removal, excess feed, or pressure accumulation can move a system away from its controlled state. Trend shape matters. A random ignition after a harmless leak does not explain rising vessel pressure before release. Sabotage would need an external discontinuity. A process excursion produces connected changes in temperature, pressure, and flow.\n\nHalden’s historian shows a slow temperature rise, increasing overhead pressure, and declining condenser duty before the vessel opens. Alarm acknowledgments occur, but the unit remains online. The flare header is unavailable, so vapour has no protective destination. Frank-Kamenetskii’s feedback picture links process conditions to the final rupture. The spark that ignites the cloud is consequential, yet it is not the root cause of the containment failure.",
      "frame": "The board operator scrolls backward from the fireball into an hour of rising trends. “Ignition is the last frame. Find the feedback before it.”",
      "q": [
        {
          "q": "What creates thermal runaway in Frank-Kamenetskii’s framework?",
          "o": [
            {
              "t": "Cooling generally increases reaction rate until the vessel reaches a fixed limit in the trend.",
              "v": "partial",
              "fb": "Cooling opposes temperature rise rather than accelerating the reaction by definition."
            },
            {
              "t": "Pressure falls to zero whenever a chemical reaction releases energy in the trend.",
              "v": "wrong",
              "fb": "Exothermic reaction can raise both temperature and pressure."
            },
            {
              "t": "A spark would need to enter from outside before any process temperature can rise.",
              "v": "danger",
              "fb": "Many process excursions develop before any external ignition."
            },
            {
              "t": "Heat generation accelerates with temperature faster than the system can remove heat.",
              "v": "expert",
              "fb": "Runaway is a positive feedback between temperature and reaction heat."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "The historian shows linked temperature and pressure acceleration before rupture, identifying a process excursion rather than a random post-release spark as the initiating failure."
          }
        },
        {
          "q": "Why is the shape of a process trend important?",
          "o": [
            {
              "t": "Connected changes in temperature, pressure, and cooling reveal feedback before the final event.",
              "v": "expert",
              "fb": "The sequence reveals whether variables evolve through a physical process mechanism."
            },
            {
              "t": "Mainly the maximum temperature matters; all earlier measurements are operational noise in the trend.",
              "v": "partial",
              "fb": "Discarding the approach to the peak removes causal information."
            },
            {
              "t": "A smooth trend strongly suggests the instruments were fabricated after the incident.",
              "v": "wrong",
              "fb": "Smooth physical trends are common and not evidence of fabrication."
            },
            {
              "t": "Trend data can identify ignition but rarely conditions leading to loss of containment.",
              "v": "danger",
              "fb": "Trends often show the pressure and thermal excursion that precedes ignition."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The complete pre-rupture sequence survives in the control-room historian, not in the burned exterior scene or corporate summary."
          }
        },
        {
          "q": "Which response most directly interrupts a developing runaway?",
          "o": [
            {
              "t": "Silence the alarms so operators can concentrate on ordinary production targets.",
              "v": "partial",
              "fb": "Muting information does not change the physical feedback."
            },
            {
              "t": "Reduce or stop the heat-generating feed while restoring cooling or safe vapour removal.",
              "v": "expert",
              "fb": "The response must reduce generation and restore a path for heat or pressure removal."
            },
            {
              "t": "Increase feed to push the unstable material through the vessel more quickly.",
              "v": "wrong",
              "fb": "Additional feed can intensify the excursion."
            },
            {
              "t": "Wait for an ignition source because runaway does not damage containment by itself.",
              "v": "danger",
              "fb": "Pressure and temperature can rupture equipment before a cloud ignites."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "Control records show the board operator requested shutdown, but the unit superintendent denied it and renewed the live operating permit."
          }
        }
      ]
    },
    "pourbaix": {
      "sci": "Marcel Pourbaix (1904-1998)",
      "topic": "Corrosion & potential-pH diagrams",
      "lede": "Pourbaix mapped when metals remain protected, dissolve, or lose the passive film on which their apparent strength depends.",
      "no": 3,
      "profile": "Marcel Pourbaix was a Belgian electrochemist best known for potential–pH diagrams, often called Pourbaix diagrams. These maps show the thermodynamically stable forms of a metal under combinations of acidity and electrochemical potential. A region may favour metallic immunity, active dissolution, or a protective oxide film called passivation.\n\nThe diagrams do not predict corrosion rate by themselves. Real equipment adds temperature, flow, contaminants, deposits, stress, and localized chemistry. Chlorides can break down passive films; sulphur compounds and acids can create aggressive environments; deposits can form crevices with chemistry unlike the bulk process. The practical lesson is that material condition depends on the environment at the wall, not only the nominal alloy name.\n\nThickness monitoring translates that chemistry into remaining structural margin. Ultrasonic readings, corrosion probes, inspection locations, and rate estimates are trended over time. A low reading may require reduced pressure, repair, replacement, or more frequent examination. Extrapolation is uncertain, but a measured wall below the minimum allowable thickness is not a cosmetic concern.\n\nHalden’s inspection grid shows localized thinning at the eventual rupture site. The most recent verified reading is below the action threshold, followed by a management deferral and no compensating pressure reduction. Fire damage cannot create the older layered corrosion product preserved around the break. Pourbaix’s chemistry establishes a pre-existing weak wall; Papin and Frank-Kamenetskii explain the rising load placed upon it. The combined evidence identifies an authorized process decision, not an attack and not an unavoidable spark. The remaining metal had already lost the margin required for safe pressure service.",
      "frame": "The clerk overlays wall-thickness points on the rupture sketch. “The fire is new. This scale is old. Decide when the vessel became weak.”",
      "q": [
        {
          "q": "What does a Pourbaix diagram show?",
          "o": [
            {
              "t": "The exact corrosion rate of nearly every alloy in any flowing industrial process.",
              "v": "partial",
              "fb": "Rate also depends on transport, temperature, deposits, and local chemistry."
            },
            {
              "t": "The maximum pressure a vessel can hold after any amount of wall loss.",
              "v": "wrong",
              "fb": "Pressure capacity requires geometry, material properties, and measured thickness."
            },
            {
              "t": "Thermodynamically favoured metal, dissolved, or passive states across potential and pH.",
              "v": "expert",
              "fb": "The diagram maps equilibrium stability regions rather than a universal kinetic rate."
            },
            {
              "t": "The ignition temperature of nearly every hydrocarbon released from a refinery.",
              "v": "danger",
              "fb": "Combustion properties are outside the diagram’s purpose."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "Pourbaix’s corrosion logic and the preserved scale establish that the rupture wall was weakened before the fire, excluding damage created only by ignition."
          }
        },
        {
          "q": "Why are localized thickness readings important?",
          "o": [
            {
              "t": "Average thickness generally equals the minimum thickness at the most corroded point.",
              "v": "partial",
              "fb": "Averages can conceal severe pits or thin bands."
            },
            {
              "t": "Localized corrosion affects appearance but not pressure containment at the wall at the thin spot.",
              "v": "wrong",
              "fb": "Local wall loss can govern the rupture pressure."
            },
            {
              "t": "One thick reading strongly suggests the entire vessel has uniform remaining strength.",
              "v": "danger",
              "fb": "Sparse thick readings do not exclude an unmeasured thin area."
            },
            {
              "t": "A small aggressive region can fall below safe wall thickness while surrounding metal appears sound.",
              "v": "expert",
              "fb": "Pressure failure can begin at a local minimum that a broad average hides."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The inspection map and permit package meet in the control room, where the known thin location was operated above its compensating limit."
          }
        },
        {
          "q": "Which record most directly assigns the unsafe operating decision?",
          "o": [
            {
              "t": "A signed permit renewing service after the low thickness reading and relief isolation.",
              "v": "expert",
              "fb": "The permit connects known condition, unavailable protection, and authority to continue operation."
            },
            {
              "t": "The operator’s routine log that records the pressure shown by the instrument.",
              "v": "partial",
              "fb": "Recording the condition is not equivalent to authorizing the risk."
            },
            {
              "t": "The state inspector’s earlier request for the next scheduled survey.",
              "v": "wrong",
              "fb": "Scheduling oversight is weaker than the specific live permit."
            },
            {
              "t": "A laboratory report identifying the hydrocarbon that burned after release.",
              "v": "danger",
              "fb": "Fuel identity explains combustion but not who accepted the pre-release conditions."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The superintendent signs the only permit combining the below-threshold wall reading, isolated relief path, and decision to keep the unit online."
          }
        }
      ]
    }
  },
  "story": [
    "<b>Halden’s fireball dominates the footage, but the unit’s final hour begins with pressure, temperature, and a relief path already unavailable.</b>",
    "Operator Delia Fenn has the physical lineup. The Board Operator holds the process historian. The Inspection Records Clerk has the thickness grid and live permit.",
    "Sabotage, an unlucky ignition, and an authorized degraded condition each explain the flame differently.",
    "The inquiry must separate what opened the vessel from what ignited the material after it escaped."
  ],
  "endings": {
    "overclaimWhat": "attack",
    "dismissalWhat": "freak",
    "win": {
      "expertTitle": "The Permit Behind the Fire",
      "expert": [
        "You connect Mira Halden — the unit superintendent, the Unit Control Room, and known wall loss meeting rising pressure after the relief path was isolated. The full clue chain links the initiating condition, the physical mechanism, and the decisive record without relying on candidate order.",
        "The two alternative explanations each fit part of the scene, but neither survives the combined timing, material, and documentary evidence."
      ],
      "soundTitle": "The Pressure and Wall Chain",
      "sound": [
        "Your accusation identifies Mira Halden — the unit superintendent, the Unit Control Room, and known wall loss meeting rising pressure after the relief path was isolated.",
        "A few missed clues leave gaps in the reconstruction, yet the evidence you recovered is sufficient to distinguish the true sequence from both traps."
      ],
      "namedTitle": "Correct Decision, Thin Reconstruction",
      "named": [
        "You reach the correct three-part verdict with a thin evidentiary file.",
        "The result is right, although the unrecovered clues would be needed to defend the causal chain under sustained challenge."
      ]
    },
    "overclaim": {
      "title": "No Saboteur Is Needed",
      "body": [
        "No external discontinuity, tool mark, or explosive residue precedes the pressure excursion.",
        "The process historian and old corrosion scale provide a complete internal rupture mechanism."
      ]
    },
    "dismissal": {
      "title": "The Spark Was Not the Root Cause",
      "body": [
        "The ignition source affected the released cloud, but containment had already failed through foreseeable pressure and wall loss.",
        "Calling the spark random does not explain the isolated relief header or the signed decision to continue operation."
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
