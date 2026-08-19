// Casebook V3 — three informants, three readings, one clue per correct answer.
module.exports = { PACK: {
  "schemaVersion": 3,
  "mode": "three_informants_three_readings",
  "id": "t_transformer",
  "title": "The Aldergate Substation Fire",
  "discipline": "Power Engineering & Dielectrics",
  "venue": "the Aldergate substation inquiry",
  "agent": {
    "name": "Investigator Emun Halle",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Power & Dielectric Pioneers",
  "dossierName": "POWER & DIELECTRIC PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Aldergate substation inquiry",
  "DAYS_TOTAL": 3,
  "teaser": "A power transformer burns and the city goes dark. Did someone attack the yard, did a lightning impulse overwhelm sound equipment, or did a long thermal and insulation decline finally reach breakdown?",
  "overclaimTag": "deliberate damage in the substation yard",
  "truthTag": "a long overload and insulation-degradation history",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A transformer tank, control traces, and an internal electrical breakdown\"><rect x=\"95\" y=\"32\" width=\"180\" height=\"78\" rx=\"7\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><path d=\"M125 52 h120 M125 72 h120 M125 92 h120\" stroke=\"#e2e2d8\" stroke-width=\"2\"/><path d=\"M360 24 v92 M410 24 v92 M360 50 h50 M360 88 h50\" stroke=\"#121212\" stroke-width=\"2\"/><path d=\"M455 28 l-18 34 h22 l-15 38 44-50 h-24 l18-22z\" fill=\"#B3261E\"/><path d=\"M530 102 C555 75,585 80,610 48\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2\"/></svg>",
  "overclaimTease": "The flash is the last second of the story. Distinguish an external impulse from a machine that had been accumulating heat and insulation damage under authorized load.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "operator",
      "items": [
        {
          "id": "operator",
          "label": "Bram Odell — utility asset operator"
        },
        {
          "id": "engineer",
          "label": "The substation protection engineer"
        },
        {
          "id": "regulator",
          "label": "The grid-safety regulator"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "office",
      "items": [
        {
          "id": "yard",
          "label": "The Substation Yard & Transformer"
        },
        {
          "id": "relay",
          "label": "The Relay & Control House"
        },
        {
          "id": "office",
          "label": "The Utility Asset Office"
        }
      ]
    },
    "what": {
      "title": "What happened",
      "truth": "overload",
      "items": [
        {
          "id": "attack",
          "label": "Deliberate physical damage initiated the transformer fire"
        },
        {
          "id": "freak",
          "label": "A lightning impulse overwhelmed an otherwise sound transformer"
        },
        {
          "id": "overload",
          "label": "Long overheating degraded the insulation until it broke down"
        }
      ]
    }
  },
  "READING_ORDER": [
    "subop",
    "oiltech",
    "clerk"
  ],
  "CHARACTERS": {
    "subop": {
      "name": "Operator Nkemi",
      "role": "Substation operator",
      "face": "⚡",
      "badge": "N",
      "legend": "the transformer yard",
      "hint": "The unit ran above its planned loading band for months under dispatch instructions.",
      "reading": "tx_hopkinson"
    },
    "oiltech": {
      "name": "The Oil Technician",
      "role": "Insulating-oil technician",
      "face": "🧪",
      "badge": "O",
      "legend": "the oil laboratory",
      "hint": "Sequential oil samples showed rising fault gases, but the required follow-up was repeatedly deferred.",
      "reading": "tx_paschen"
    },
    "clerk": {
      "name": "The Asset Records Clerk",
      "role": "Maintenance records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the asset office",
      "hint": "Load waivers, test deferrals, and replacement delays all carry the same asset-operator approval.",
      "reading": "tx_stefan"
    }
  },
  "TOPICS": {
    "tx_hopkinson": {
      "sci": "John Hopkinson (1849-1898)",
      "topic": "Magnetic circuits & transformer theory",
      "lede": "John Hopkinson gave engineers a circuit language for magnetic flux, making transformer loading and core behavior calculable rather than mysterious.",
      "no": 1,
      "profile": "John Hopkinson was a British electrical engineer and physicist who helped place the rapidly developing machinery of the late nineteenth century on a rigorous analytical foundation. He studied dynamos, alternating-current systems, and transformers at a moment when electrical power was moving from laboratory demonstration to public infrastructure. His name is attached to Hopkinson’s law, an analogy between an electric circuit and a magnetic circuit. Magnetomotive force drives magnetic flux through reluctance much as voltage drives current through resistance.\n\nThe analogy is not perfect, because iron is nonlinear and can saturate, but it lets designers reason about cores, windings, air gaps, and flux density. In a transformer, alternating current in the primary creates changing magnetic flux that induces voltage in the secondary. Load current produces copper losses proportional to current squared, while magnetic behavior contributes core losses. The resulting heat must be carried away through oil, radiators, and the tank. Operating above rating does not guarantee immediate failure; it accelerates insulation ageing and narrows the margin for another fault.\n\nHopkinson also investigated transformer theory directly, considering continuous iron magnetic circuits and the relationships among turns, current, resistance, and induction. His work helped engineers separate ordinary energy conversion from abnormal magnetic and thermal conditions.\n\nAt Aldergate, this distinction makes the loading record important. An attacker could damage the unit suddenly, and a lightning impulse could produce a sharp transient. Neither explanation predicts months of elevated current, rising top-oil temperature, and repeated cooling alarms. Hopkinson’s magnetic-circuit view tells the investigator to reconstruct what the transformer was asked to carry before treating the final arc as the beginning of the event.",
      "frame": "Pins the rating plate beside a year of load curves. “The tank does not know why dispatch wants more power. It only turns current and flux into heat. Show me where the margin went.”",
      "q": [
        {
          "q": "What does Hopkinson’s magnetic-circuit analogy compare?",
          "o": [
            {
              "t": "Magnetomotive force, flux, and reluctance to voltage, current, and resistance.",
              "v": "expert",
              "fb": "The analogy provides a practical language for calculating magnetic paths in transformer cores."
            },
            {
              "t": "Transformer oil pressure, flow, and temperature to a municipal water network.",
              "v": "partial",
              "fb": "Cooling hydraulics matter, but Hopkinson’s named analogy concerns magnetic rather than fluid circuits."
            },
            {
              "t": "Lightning current, ground resistance, and blast pressure inside a substation.",
              "v": "wrong",
              "fb": "Those variables describe surge protection and physical effects, not the magnetic-circuit relation."
            },
            {
              "t": "An attacker’s energy, access time, and ability to bypass the protective relays.",
              "v": "danger",
              "fb": "The theory analyzes equipment behavior without presuming a malicious actor."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "The long load record predicts copper heating and reduced thermal margin before the fire; the final arc therefore has a months-long electrical prehistory."
          }
        },
        {
          "q": "Why does sustained overload damage a transformer even if it keeps supplying power?",
          "o": [
            {
              "t": "Higher current raises losses and temperature, accelerating insulation ageing.",
              "v": "expert",
              "fb": "A unit can remain in service while heat steadily consumes the life of paper and oil insulation."
            },
            {
              "t": "Extra current permanently magnetizes the core after the first overloaded hour.",
              "v": "wrong",
              "fb": "Core behavior is more complex, and thermal ageing—not permanent magnetization—is the main long-duration concern here."
            },
            {
              "t": "Overload matters when a lightning strike arrives during the same minute.",
              "v": "danger",
              "fb": "Thermal degradation accumulates independently and can create the conditions for later internal failure."
            },
            {
              "t": "The nameplate rating is merely economic guidance and has no reliability meaning.",
              "v": "partial",
              "fb": "Ratings include thermal and insulation limits, even though short emergency loading may sometimes be managed."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "Substation staff logged the overheating, but the instruction to maintain the elevated loading came through the asset operator who controlled dispatch exceptions."
          }
        },
        {
          "q": "Which record best distinguishes chronic loading from a sudden external event?",
          "o": [
            {
              "t": "A time series of current, temperature, cooling alarms, and rating exceedances.",
              "v": "expert",
              "fb": "A persistent correlated trend reveals cumulative thermal stress before the final failure."
            },
            {
              "t": "A photograph of the flames and tank rupture taken during the city blackout.",
              "v": "partial",
              "fb": "The photograph documents severity but cannot reveal the transformer’s earlier operating history."
            },
            {
              "t": "The weather report showing lightning somewhere in the service territory that day.",
              "v": "danger",
              "fb": "Regional lightning is not proof that a damaging impulse reached this transformer."
            },
            {
              "t": "A security log showing no unauthorized person entered the control house.",
              "v": "wrong",
              "fb": "Access evidence addresses sabotage but does not test the overload history directly."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The yard instruments recorded the symptoms, while the approved rating exceptions and dispatch instructions culminate in the utility’s asset office."
          }
        }
      ]
    },
    "tx_paschen": {
      "sci": "Friedrich Paschen (1865-1947)",
      "topic": "Gas breakdown & Paschen’s law",
      "lede": "Friedrich Paschen showed that electrical breakdown through a gas depends on both pressure and distance, not voltage alone.",
      "no": 2,
      "profile": "Friedrich Paschen was a German physicist whose experimental work ranged from spectroscopy to electrical discharge. In the late nineteenth century he measured the voltage required to start a discharge between electrodes in a gas while changing the gas pressure and the electrode spacing. The result, known as Paschen’s law, showed that breakdown voltage depends mainly on the product of pressure and gap distance. The curve has a minimum: at some conditions electrons gain enough energy between collisions to ionize more molecules efficiently, creating an avalanche.\n\nThe law corrected a simple intuition that a larger gap or higher pressure must always be safer. If there are too few collisions, an electron cannot build an avalanche; if there are too many, it loses energy before ionizing the next molecule. Between those regimes, breakdown can occur at surprisingly modest voltage. Modern high-voltage insulation involves liquids, solids, interfaces, bubbles, moisture, and complex fields, so Paschen’s law is not a complete transformer model. It remains valuable for understanding why gaseous voids and evolving internal conditions can become weak points.\n\nAn internal discharge leaves traces. Electrical and thermal faults can decompose insulating oil and paper, generating gases that dissolve in the oil. Sequential dissolved-gas analysis can reveal whether gases are rising over time and whether the pattern is more consistent with heating, partial discharge, or arcing. A single post-fire sample is harder to interpret because the final event itself creates gas.\n\nAt Aldergate, the useful evidence lies in the sequence. Tests months apart showed rising gases and were followed by requests for closer monitoring. A lightning impulse would be sudden; deliberate damage would need its own access and physical evidence. Paschen’s lesson is that insulation can move toward breakdown as internal conditions change, and the earliest samples matter more than the spectacular final flash.",
      "frame": "Arranges three oil reports from oldest to newest and draws a discharge curve beside them. “The last sample contains the fire. The earlier samples contain the warning.”",
      "q": [
        {
          "q": "What variables are joined in Paschen’s law for gas breakdown?",
          "o": [
            {
              "t": "Gas pressure and electrode spacing, combined through their product.",
              "v": "expert",
              "fb": "Breakdown conditions depend on how pressure and distance shape electron collisions and ionization."
            },
            {
              "t": "Oil temperature and transformer current, through their arithmetic average.",
              "v": "partial",
              "fb": "Those variables matter to transformer condition but are not the variables in Paschen’s law."
            },
            {
              "t": "Lightning frequency and grounding resistance, through their peak value.",
              "v": "wrong",
              "fb": "Surge exposure and grounding are separate from the gas-gap relationship Paschen measured."
            },
            {
              "t": "Attacker distance and explosive mass, through a security-risk score.",
              "v": "danger",
              "fb": "The physical discharge law does not require or diagnose sabotage."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "Rising fault gases before the fire indicate an internal insulation condition developing over time, not merely gas produced by the final rupture."
          }
        },
        {
          "q": "Why can a small gas void become dangerous inside high-voltage insulation?",
          "o": [
            {
              "t": "Its pressure and gap can permit an ionizing avalanche at the local field.",
              "v": "expert",
              "fb": "A void can support discharge even when the surrounding bulk insulation remains intact."
            },
            {
              "t": "Gas conducts perfectly at every pressure, so any bubble shorts the winding instantly.",
              "v": "wrong",
              "fb": "Breakdown depends on conditions; a bubble is a risk, not an automatic metallic short."
            },
            {
              "t": "A void indicates someone opened the tank and deliberately injected air inside.",
              "v": "danger",
              "fb": "Voids and gas can arise from ageing, heating, moisture, and material degradation without intrusion."
            },
            {
              "t": "The bubble blocks all electric field and therefore protects the surrounding paper.",
              "v": "partial",
              "fb": "Field stress can concentrate around interfaces rather than disappear."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The oil laboratory documented the warnings, but repeated deferral approvals were attached to the asset-office maintenance schedule."
          }
        },
        {
          "q": "Which comparison best separates a chronic internal fault from one lightning impulse?",
          "o": [
            {
              "t": "Several pre-event samples showing a rising gas trend and repeated follow-up requests.",
              "v": "expert",
              "fb": "A developing trend predating the fire is difficult to reconcile with a single final-day impulse."
            },
            {
              "t": "One sample drawn after the tank burned, containing abundant decomposition gases.",
              "v": "partial",
              "fb": "Post-event gas confirms severe heating or arcing but cannot date its origin by itself."
            },
            {
              "t": "A lightning map showing one strike within many kilometers of the substation.",
              "v": "danger",
              "fb": "Proximity alone does not establish coupling into the transformer or explain earlier gas trends."
            },
            {
              "t": "A clean security camera view of the transformer during the night shift.",
              "v": "wrong",
              "fb": "Video may address intrusion, but it does not compare insulation histories."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The oil technicians escalated the trend twice; the same asset authority signed both deferrals and kept the transformer in the high-load plan."
          }
        }
      ]
    },
    "tx_stefan": {
      "sci": "Josef Stefan (1835-1893)",
      "topic": "Thermal radiation & temperature",
      "lede": "Josef Stefan found that emitted thermal power rises steeply with absolute temperature, making sustained heat an accelerating warning rather than a neutral condition.",
      "no": 3,
      "profile": "Josef Stefan was an Austrian physicist who worked in Vienna on heat conduction, gas kinetics, electromagnetism, and thermal radiation. In 1879 he examined experimental measurements of radiation from hot bodies and proposed that the energy emitted per unit area rises with the fourth power of absolute temperature. Ludwig Boltzmann later derived the relationship theoretically, and it became the Stefan–Boltzmann law. The law describes an ideal blackbody exactly and real surfaces through an emissivity factor.\n\nA power transformer does not cool by radiation alone. Oil circulation, conduction through materials, and convection through radiators usually carry much of the heat. Still, Stefan’s steep temperature relationship captures an engineering truth: thermal behavior is strongly nonlinear. Higher load creates more electrical loss; hotter oil and windings age insulation faster; damaged insulation can worsen dielectric performance and create additional local heating. Thermal images and long-term temperature records are therefore useful when interpreted alongside load and cooling status.\n\nInsulation ageing is cumulative. Cellulose paper around windings becomes brittle as temperature and chemical degradation progress. Oil oxidizes and can lose dielectric quality. A transformer may survive many periods above normal temperature while its remaining life falls much faster than the calendar suggests. Asset management must distinguish a short, controlled emergency from a chronic operating strategy.\n\nFor Aldergate, Stefan’s lesson completes the chain. Load waivers, hot-spot alarms, deferred oil tests, and a postponed replacement all sit in one asset file. The final fire is not proof of attack, and severe weather on the day does not erase the months of heat. The office that accepted each thermal warning also controlled whether the unit stayed in service.",
      "frame": "Projects the load and top-oil curves over the maintenance calendar. “Heat does not vote once. It compounds every time the same exception is renewed.”",
      "q": [
        {
          "q": "What does the Stefan–Boltzmann law say about ideal thermal emission?",
          "o": [
            {
              "t": "Emitted power per area rises with the fourth power of absolute temperature.",
              "v": "expert",
              "fb": "The strong temperature dependence makes thermal emission increase rapidly as an object becomes hotter."
            },
            {
              "t": "Emitted power rises linearly with Celsius temperature above freezing.",
              "v": "wrong",
              "fb": "The law uses absolute temperature and a fourth-power relationship, not a linear Celsius scale."
            },
            {
              "t": "Radiation begins after a surface becomes hot enough to glow visibly red.",
              "v": "partial",
              "fb": "All finite-temperature surfaces emit thermal radiation, including below visible glow."
            },
            {
              "t": "A fire’s brightness directly identifies whether sabotage caused it.",
              "v": "danger",
              "fb": "Thermal emission describes temperature, not motive or initiating cause."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "The temperature record rose with repeated overload periods, while cooling alarms and oil warnings accumulated—the pattern of accelerating thermal ageing."
          }
        },
        {
          "q": "Why is chronic overheating more serious than the calendar time alone suggests?",
          "o": [
            {
              "t": "Higher temperature accelerates chemical ageing of paper and insulating oil.",
              "v": "expert",
              "fb": "Thermal ageing consumes insulation life disproportionately during hot operation."
            },
            {
              "t": "Heat erases earlier fault-gas evidence, making every later sample reassuring.",
              "v": "wrong",
              "fb": "Heating can generate and alter gases; it does not make sequential evidence irrelevant."
            },
            {
              "t": "Once a unit survives one overload, later overloads become progressively safer.",
              "v": "danger",
              "fb": "Survival does not restore consumed insulation life or thermal margin."
            },
            {
              "t": "Visible tank discoloration is the main indicator of meaningful insulation degradation.",
              "v": "partial",
              "fb": "Internal paper and oil can age well before obvious external damage appears."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The complete thermal history is not one alarm panel; it is the office file joining load waivers, maintenance deferrals, and replacement decisions."
          }
        },
        {
          "q": "What record joins the overload and test deferrals under one authority?",
          "o": [
            {
              "t": "Signed waivers accepting overload, delayed testing, and postponed replacement.",
              "v": "expert",
              "fb": "Repeated approvals show who converted temporary risk into an ongoing asset strategy."
            },
            {
              "t": "The operator roster identifying everyone physically present during the explosion.",
              "v": "partial",
              "fb": "Presence identifies responders and operators, not necessarily the authority that set long-term conditions."
            },
            {
              "t": "The regulator’s public statement and preliminary findings issued after the blackout.",
              "v": "wrong",
              "fb": "A later statement cannot replace contemporaneous internal approvals."
            },
            {
              "t": "A theory that a skilled intruder could damage the unit without physical evidence.",
              "v": "danger",
              "fb": "An unfalsifiable intrusion story cannot outweigh a documented thermal and maintenance chain."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The asset operator whose approval appears on the overload plan, both test deferrals, and the replacement postponement controlled the whole decline."
          }
        }
      ]
    }
  },
  "story": [
    "<b>The Aldergate transformer failed in seconds, but its records stretch back months.</b> The city saw flame; the instruments had seen heat and gas first.",
    "Operator Nkemi has the load and temperature traces. The Oil Technician has the sequential dissolved-gas warnings. The Asset Records Clerk has the waivers that kept the unit carrying the same burden.",
    "An attack explains the drama at the yard. A lightning impulse explains a sudden electrical event. Neither automatically explains a developing condition before that night.",
    "The nine possible clues reconstruct the path from approved loading to insulation breakdown. A strong verdict must identify where temporary exceptions became the asset plan."
  ],
  "endings": {
    "overclaimWhat": "attack",
    "dismissalWhat": "freak",
    "win": {
      "expertTitle": "The Asset Was Spent",
      "expert": [
        "You join chronic overload, rising oil-gas warnings, accelerating thermal ageing, and repeated deferrals in the utility asset office under Bram Odell’s authority.",
        "The final arc was the end of a documented internal decline. Neither deliberate yard damage nor a single lightning impulse accounts for the pre-event load, temperature, and maintenance history."
      ],
      "soundTitle": "The Long Failure",
      "sound": [
        "Your accusation identifies the asset operator, the office, and the overheating-driven insulation breakdown.",
        "Some diagnostic details remain incomplete, but the pre-event trends make both sudden-event traps untenable."
      ],
      "namedTitle": "Correct Asset, Thin Trend",
      "named": [
        "You select the right person, place, and mechanism.",
        "The verdict is correct, though missed clues leave the exact sequence of gas escalation and replacement delay less secure."
      ]
    },
    "overclaim": {
      "title": "The Yard Was the Last Scene",
      "body": [
        "The attack theory starts at the visible fire and ignores months of elevated load, temperature, and fault-gas warnings.",
        "No hidden intruder is needed to explain an insulation system whose documented margin had already been consumed."
      ]
    },
    "dismissal": {
      "title": "Lightning Does Not Create Earlier Warnings",
      "body": [
        "A lightning impulse can damage equipment, but it cannot explain sequential gas trends, chronic hot operation, and deferred follow-up that predate the storm.",
        "Calling the fire an act of weather erases the asset decisions that made internal breakdown increasingly likely."
      ]
    },
    "wrongNames": {
      "title": "The Mechanism, Assigned Elsewhere",
      "body": [
        "You identify the long thermal decline but place responsibility or culmination away from the asset file that joined loading, testing, and replacement authority."
      ]
    }
  }
}
};
