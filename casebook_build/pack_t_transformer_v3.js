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
  "teaser": "A power transformer burns and the city goes dark. Did someone attack the yard, did chronic overheating age the insulation to failure, or did a direct lightning impulse exceed the protection and insulation level of an otherwise serviceable unit?",
  "overclaimTag": "deliberate damage in the substation yard",
  "truthTag": "a direct lightning impulse beyond the protected level",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A transformer tank, control traces, and an internal electrical breakdown\"><rect x=\"95\" y=\"32\" width=\"180\" height=\"78\" rx=\"7\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><path d=\"M125 52 h120 M125 72 h120 M125 92 h120\" stroke=\"#e2e2d8\" stroke-width=\"2\"/><path d=\"M360 24 v92 M410 24 v92 M360 50 h50 M360 88 h50\" stroke=\"#121212\" stroke-width=\"2\"/><path d=\"M455 28 l-18 34 h22 l-15 38 44-50 h-24 l18-22z\" fill=\"#B3261E\"/><path d=\"M530 102 C555 75,585 80,610 48\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2\"/></svg>",
  "overclaimTease": "The last flash can resemble sabotage or the end of a long decline. Compare pre-event loading and oil history with arrester records, lightning location, and the first electrical waveform.",
  "CATS": {
    "who": {
      "title": "Who bears responsibility",
      "truth": "lightning",
      "items": [
        {
          "id": "lightning",
          "label": "An act of nature — a lightning strike, not a person"
        },
        {
          "id": "engineer",
          "label": "The substation protection engineer"
        },
        {
          "id": "operator",
          "label": "Bram Odell — utility asset operator"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "yard",
      "items": [
        {
          "id": "relay",
          "label": "The Relay & Control House"
        },
        {
          "id": "yard",
          "label": "The Substation Yard & Transformer"
        },
        {
          "id": "office",
          "label": "The Utility Asset Office"
        }
      ]
    },
    "what": {
      "title": "What happened",
      "truth": "freak",
      "items": [
        {
          "id": "attack",
          "label": "Deliberate physical damage initiated the transformer fire"
        },
        {
          "id": "overload",
          "label": "Long overheating degraded insulation until it broke down"
        },
        {
          "id": "freak",
          "label": "A direct lightning impulse exceeded the protected insulation level"
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
      "hint": "Months of loading and temperatures remained inside the approved band before a single high-amplitude impulse arrived.",
      "reading": "tx_hopkinson"
    },
    "oiltech": {
      "name": "The Oil Technician",
      "role": "Insulating-oil technician",
      "face": "🧪",
      "badge": "O",
      "legend": "the oil laboratory",
      "hint": "Sequential pre-event oil samples were stable and lacked the rising fault-gas trend expected from chronic internal damage.",
      "reading": "tx_paschen"
    },
    "clerk": {
      "name": "The Asset Records Clerk",
      "role": "Maintenance records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the asset office",
      "hint": "Lightning location, arrester discharge, bushing flashover, and relay timing align at the transformer yard without an unauthorized entry.",
      "reading": "tx_stefan"
    }
  },
  "TOPICS": {
    "tx_hopkinson": {
      "sci": "John Hopkinson (1849-1898)",
      "topic": "Magnetic circuits & transformer theory",
      "lede": "John Hopkinson gave engineers a circuit language for magnetic flux, making transformer loading and core behavior calculable rather than mysterious.",
      "no": 1,
      "profile": "John Hopkinson was a British electrical engineer and physicist who helped place the rapidly developing machinery of the late nineteenth century on a rigorous analytical foundation. He studied dynamos, alternating-current systems, and transformers at a moment when electrical power was moving from laboratory demonstration to public infrastructure. His name is attached to Hopkinson’s law, an analogy between an electric circuit and a magnetic circuit. Magnetomotive force drives magnetic flux through reluctance much as voltage drives current through resistance.\n\nThe analogy is not perfect, because iron is nonlinear and can saturate, but it lets designers reason about cores, windings, air gaps, and flux density. In a transformer, alternating current in the primary creates changing magnetic flux that induces voltage in the secondary. Load current produces copper losses proportional to current squared, while magnetic behavior contributes core losses. The resulting heat must be carried away through oil, radiators, and the tank. Operating above rating does not guarantee immediate failure; it accelerates insulation ageing and narrows the margin for another fault.\n\nHopkinson also investigated transformer theory directly, considering continuous iron magnetic circuits and the relationships among turns, current, resistance, and induction. His work helped engineers separate ordinary energy conversion from abnormal magnetic and thermal conditions.\n\nHopkinson’s framework makes chronic loading testable rather than rhetorical. Aldergate’s current, cooling, and temperature series remain within the approved operating band, with no sustained hot-spot pattern before the event. The first abnormal record is a steep external impulse coincident with a nearby lightning channel. Overload can certainly age a transformer, but the necessary thermal history is absent here. The physical culmination is the yard unit and its line entrance, not the asset office.",
      "frame": "Pins a year of normal load and hot-spot curves beside one towering impulse waveform. “Chronic heat leaves a history. A lightning event leaves a beginning.”",
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
            "label": "WHAT — lead",
            "text": "Pre-event load and temperature histories lack the sustained heating required for accelerated insulation ageing."
          }
        },
        {
          "q": "Why does sustained overload damage a transformer even if it keeps supplying power?",
          "o": [
            {
              "t": "Extra current permanently magnetizes the core after the first overloaded hour.",
              "v": "wrong",
              "fb": "Core behavior is more complex, and thermal ageing—not permanent magnetization—is the main long-duration concern here."
            },
            {
              "t": "Higher current raises losses and temperature, accelerating insulation ageing.",
              "v": "expert",
              "fb": "A unit can remain in service while heat steadily consumes the life of paper and oil insulation."
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
            "label": "WHO — lead",
            "text": "Operating records show no sustained overload decision or unauthorized yard access before the first impulse."
          }
        },
        {
          "q": "Which record most strongly argues against chronic thermal ageing?",
          "o": [
            {
              "t": "A tank photograph taken after the transformer burned and ruptured.",
              "v": "partial",
              "fb": "Post-fire appearance cannot reconstruct the preceding temperature exposure."
            },
            {
              "t": "An asset-replacement plan listing the unit as older than its neighbors.",
              "v": "wrong",
              "fb": "Calendar age alone does not establish damaging thermal operation."
            },
            {
              "t": "A brief overload occurring after the lightning impulse had already arrived.",
              "v": "danger",
              "fb": "A later overload is consequence or response, not the initiating cause."
            },
            {
              "t": "Months of current, hot-spot temperature, and cooling data within limits.",
              "v": "expert",
              "fb": "A normal pre-event thermal history removes the sustained heating mechanism."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — lead",
            "text": "The first abnormal waveform and physical flashover occur at the transformer’s line bushing in the substation yard."
          }
        }
      ]
    },
    "tx_paschen": {
      "sci": "Friedrich Paschen (1865-1947)",
      "topic": "Gas breakdown & Paschen’s law",
      "lede": "Friedrich Paschen showed that electrical breakdown through a gas depends on both pressure and distance, not voltage alone.",
      "no": 2,
      "profile": "Friedrich Paschen was a German physicist whose experimental work ranged from spectroscopy to electrical discharge. In the late nineteenth century he measured the voltage required to start a discharge between electrodes in a gas while changing the gas pressure and the electrode spacing. The result, known as Paschen’s law, showed that breakdown voltage depends mainly on the product of pressure and gap distance. The curve has a minimum: at some conditions electrons gain enough energy between collisions to ionize more molecules efficiently, creating an avalanche.\n\nThe law corrected a simple intuition that a larger gap or higher pressure must always be safer. If there are too few collisions, an electron cannot build an avalanche; if there are too many, it loses energy before ionizing the next molecule. Between those regimes, breakdown can occur at surprisingly modest voltage. Modern high-voltage insulation involves liquids, solids, interfaces, bubbles, moisture, and complex fields, so Paschen’s law is not a complete transformer model. It remains valuable for understanding why gaseous voids and evolving internal conditions can become weak points.\n\nAn internal discharge leaves traces. Electrical and thermal faults can decompose insulating oil and paper, generating gases that dissolve in the oil. Sequential dissolved-gas analysis can reveal whether gases are rising over time and whether the pattern is more consistent with heating, partial discharge, or arcing. A single post-fire sample is harder to interpret because the final event itself creates gas.\n\nPaschen’s work helps explain how a sufficiently large impulse can cross insulation gaps and initiate flashover even when routine condition monitoring is reassuring. Aldergate’s pre-event dissolved-gas samples are stable rather than progressively rising, while the bushing and arrester records show a sudden high-field event. One post-fire sample cannot manufacture a prior trend. The sequence therefore favors an external lightning impulse over months of hidden internal discharge.",
      "frame": "Arranges stable oil reports beside the bushing flashover and arrester record. “Do not let gases made by the fire invent warnings that were absent before it.”",
      "q": [
        {
          "q": "What variables are joined in Paschen’s law for gas breakdown?",
          "o": [
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
              "t": "Gas pressure and electrode spacing, combined through their product.",
              "v": "expert",
              "fb": "Breakdown conditions depend on how pressure and distance shape electron collisions and ionization."
            },
            {
              "t": "Attacker distance and explosive mass, through a security-risk score.",
              "v": "danger",
              "fb": "The physical discharge law does not require or diagnose sabotage."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — corroboration",
            "text": "Sequential oil samples remain stable, while the event begins as one steep external impulse rather than a growing internal fault."
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
            "label": "WHERE — corroboration",
            "text": "Arrester discharge marks and the lightning-location solution align with the same yard entrance within milliseconds."
          }
        },
        {
          "q": "Which comparison most strongly supports one lightning impulse?",
          "o": [
            {
              "t": "Several samples showing a rising combustible-gas trend over many months.",
              "v": "partial",
              "fb": "A rising trend would instead support chronic insulation deterioration."
            },
            {
              "t": "Stable pre-event gas samples followed by arrester discharge and bushing flashover.",
              "v": "expert",
              "fb": "Normal history plus a timed external impulse fits sudden flashover."
            },
            {
              "t": "Repeated requests for closer monitoring after internal partial discharges.",
              "v": "wrong",
              "fb": "Repeated internal warnings would contradict the one-event explanation."
            },
            {
              "t": "A post-fire oil sample containing gases produced during the final blaze.",
              "v": "danger",
              "fb": "After-fire gases cannot identify whether deterioration existed beforehand."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — corroboration",
            "text": "Protection settings, maintenance, oil testing, and loading all meet their approved requirements before the event."
          }
        }
      ]
    },
    "tx_stefan": {
      "sci": "Josef Stefan (1835-1893)",
      "topic": "Thermal radiation & temperature",
      "lede": "Josef Stefan found that emitted thermal power rises steeply with absolute temperature, making sustained heat an accelerating warning rather than a neutral condition.",
      "no": 3,
      "profile": "Josef Stefan was an Austrian physicist who worked in Vienna on heat conduction, gas kinetics, electromagnetism, and thermal radiation. In 1879 he examined experimental measurements of radiation from hot bodies and proposed that the energy emitted per unit area rises with the fourth power of absolute temperature. Ludwig Boltzmann later derived the relationship theoretically, and it became the Stefan–Boltzmann law. The law describes an ideal blackbody exactly and real surfaces through an emissivity factor.\n\nA power transformer does not cool by radiation alone. Oil circulation, conduction through materials, and convection through radiators usually carry much of the heat. Still, Stefan’s steep temperature relationship captures an engineering truth: thermal behavior is strongly nonlinear. Higher load creates more electrical loss; hotter oil and windings age insulation faster; damaged insulation can worsen dielectric performance and create additional local heating. Thermal images and long-term temperature records are therefore useful when interpreted alongside load and cooling status.\n\nInsulation ageing is cumulative. Cellulose paper around windings becomes brittle as temperature and chemical degradation progress. Oil oxidizes and can lose dielectric quality. A transformer may survive many periods above normal temperature while its remaining life falls much faster than the calendar suggests. Asset management must distinguish a short, controlled emergency from a chronic operating strategy.\n\nStefan’s thermal law provides the final check on the systemic-overheating theory. Temperature alarms, loading waivers, and cooling records do not show the cumulative heat exposure needed to explain accelerated insulation ageing. By contrast, lightning-location data, arrester discharge, relay onset, and yard damage align within milliseconds. The records leave no culpable operator or engineer below standard; this is a genuine low-probability impulse that exceeded the protected insulation level.",
      "frame": "Aligns lightning-location time, relay onset, and yard damage to the millisecond. “A rare event still needs positive evidence. Show me the channel, not just the flash.”",
      "q": [
        {
          "q": "What does the Stefan–Boltzmann law say about ideal thermal emission?",
          "o": [
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
            },
            {
              "t": "Emitted power per area rises with the fourth power of absolute temperature.",
              "v": "expert",
              "fb": "The strong temperature dependence makes thermal emission increase rapidly as an object becomes hotter."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — decisive",
            "text": "A direct lightning impulse exceeded the protected insulation level of an otherwise serviceable transformer; neither sabotage nor deferred deterioration fits the timeline."
          }
        },
        {
          "q": "Why is chronic overheating more serious than the calendar time alone suggests?",
          "o": [
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
              "t": "Higher temperature accelerates chemical ageing of paper and insulating oil.",
              "v": "expert",
              "fb": "Thermal ageing consumes insulation life disproportionately during hot operation."
            },
            {
              "t": "Visible tank discoloration is the main indicator of meaningful insulation degradation.",
              "v": "partial",
              "fb": "Internal paper and oil can age well before obvious external damage appears."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — decisive",
            "text": "Waveform onset, bushing damage, arrester operation, and channel location converge at the Substation Yard & Transformer."
          }
        },
        {
          "q": "What joined evidence can clear both sabotage and deferred-maintenance theories?",
          "o": [
            {
              "t": "No entry or thermal trend, plus a timed lightning channel and arrester operation.",
              "v": "expert",
              "fb": "Independent absence and positive impulse evidence test both competing stories."
            },
            {
              "t": "A security camera gap and a replacement delay in the same maintenance year.",
              "v": "partial",
              "fb": "Two suspicious facts do not establish either initiating mechanism."
            },
            {
              "t": "One eyewitness reporting a bright flash before the substation fire spread.",
              "v": "wrong",
              "fb": "A flash is expected in several electrical failures and lacks discrimination."
            },
            {
              "t": "The regulator’s assurance that lightning is common in the surrounding region.",
              "v": "danger",
              "fb": "Regional frequency does not tie a channel to this unit or moment."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — decisive",
            "text": "The joined record identifies no culpable human action below standard; a directly timed lightning channel supplies the initiating energy."
          }
        }
      ]
    }
  },
  "story": [
    "<b>Aldergate’s transformer failed in a flash, but the months before it are as important as the millisecond of breakdown.</b>",
    "Operator Nkemi has the loading history. The Oil Technician has the pre-event condition series. The Asset Records Clerk can join protection settings to lightning and relay timing.",
    "Sabotage, chronic insulation decline, and a direct lightning exceedance each predict a different record before the fire.",
    "The inquiry must decide whether someone accepted a known risk—or whether the equipment met its obligations and still met a rarer event."
  ],
  "endings": {
    "overclaimWhat": "attack",
    "dismissalWhat": "overload",
    "win": {
      "expertTitle": "The Direct Impulse",
      "expert": [
        "You identify no culpable human actor, the Substation Yard & Transformer, and a direct lightning impulse beyond the protected insulation level. The channel, arrester, relay, and bushing records align.",
        "The sabotage theory lacks access or physical evidence, while the chronic-overheating theory lacks the required thermal and gas history. This failure is a genuine residual-risk event."
      ],
      "soundTitle": "The Lightning Sequence",
      "sound": [
        "Your verdict places the failure at the yard transformer and recognizes a direct impulse without human fault.",
        "Some waveform or condition details remain incomplete, but the positive lightning evidence and normal prehistory support the result."
      ],
      "namedTitle": "Right Impulse, Limited Condition Record",
      "named": [
        "You choose the correct responsibility finding, place, and mechanism.",
        "The conclusion is right, although missed clues leave the protection or pre-event condition case less complete."
      ]
    },
    "overclaim": {
      "title": "No Deliberate Entry or Damage",
      "body": [
        "Security, physical inspection, and electrical onset show no human intrusion or planted initiating fault.",
        "A dramatic fire is not evidence of sabotage when a timed natural impulse is recorded."
      ]
    },
    "dismissal": {
      "title": "The Systemic-Decline Story Was the False Pattern",
      "body": [
        "Loading, temperature, cooling, and dissolved-gas histories do not show the cumulative deterioration that the overload theory requires.",
        "Importing a familiar deferred-maintenance narrative would ignore the unit’s normal pre-event condition."
      ]
    },
    "wrongNames": {
      "title": "The Lightning Event, Given Human Blame",
      "body": [
        "You recognize the impulse but assign culpability or culmination away from the transformer yard where the complete event signature begins."
      ]
    }
  }
}
};
