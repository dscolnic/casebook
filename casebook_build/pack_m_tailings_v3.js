// Casebook V3 — three informants, three readings, one clue per correct answer.
module.exports = { PACK: {
  "schemaVersion": 3,
  "mode": "three_informants_three_readings",
  "id": "m_tailings",
  "title": "The Serra Verde Tailings Dam",
  "discipline": "Slope Stability & Soil Liquefaction",
  "venue": "the Serra Verde tailings inquiry",
  "agent": {
    "name": "Inspector Rui Alvares",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Engineering credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Slope & Soil Pioneers",
  "dossierName": "SLOPE-STABILITY & SOIL PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Serra Verde tailings inquiry",
  "teaser": "A tailings dam liquefies moments after a sharp local pulse. Did an unauthorized production blast trigger the failure, did exceptional rain overtop the crest, or had static pore pressure already reached collapse without any external shock?",
  "overclaimTag": "an unreported blast beside the dam",
  "truthTag": "a real blasting pulse triggering cyclic liquefaction",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A tailings dam with a pressure spike after a nearby blast\"><path d=\"M50 112 L250 36 L430 112 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"3\"/><path d=\"M250 36 L500 36 L610 112\" fill=\"none\" stroke=\"#e2e2d8\" stroke-width=\"2\"/><path d=\"M470 75 l-14-24 18 5 -4-28 25 30 -18-3 8 24z\" fill=\"#B3261E\"/><path d=\"M120 96 v-42 M170 88 v-42 M220 75 v-42\" stroke=\"#326891\" stroke-width=\"2\"/><path d=\"M102 102 C148 88,190 105,238 84\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2\"/></svg>",
  "overclaimTease": "A blast explanation is dramatic but testable: the seismic pulse must precede the pore-pressure jump, match an industrial source, and connect to a party controlling the explosives.",
  "DAYS_TOTAL": 3,
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "tl_blaster",
      "items": [
        {
          "id": "tl_engineer",
          "label": "The dam-of-record engineer"
        },
        {
          "id": "tl_miningco",
          "label": "Bruna Teixeira — mine operations director"
        },
        {
          "id": "tl_blaster",
          "label": "Vale Norte’s blasting contractor"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "tl_toe",
      "items": [
        {
          "id": "tl_toe",
          "label": "The Toe, Piezometers & Blast Line"
        },
        {
          "id": "tl_office",
          "label": "The Mine Operations Office"
        },
        {
          "id": "tl_crest",
          "label": "The Raised Dam Crest"
        }
      ]
    },
    "what": {
      "title": "What happened",
      "truth": "tl_quake",
      "items": [
        {
          "id": "tl_quake",
          "label": "An unauthorized production blast triggered cyclic liquefaction"
        },
        {
          "id": "tl_liquefaction",
          "label": "Static liquefaction began from rising pore pressure without a shock"
        },
        {
          "id": "tl_rain",
          "label": "Exceptional rainfall overtopped an otherwise stable embankment"
        }
      ]
    }
  },
  "READING_ORDER": [
    "tl_walker",
    "tl_reader",
    "tl_clerk"
  ],
  "CHARACTERS": {
    "tl_walker": {
      "name": "Dam-Walker Ana Reis",
      "role": "Tailings-dam walker",
      "face": "💧",
      "badge": "A",
      "legend": "the downstream toe",
      "hint": "The crest was not overtopped, but the toe instruments jump immediately after one sharp ground pulse.",
      "reading": "seed"
    },
    "tl_reader": {
      "name": "The Instrument Reader",
      "role": "Geotechnical-instrument reader",
      "face": "📈",
      "badge": "I",
      "legend": "the piezometer station",
      "hint": "Pore pressure was elevated but stable until cyclic loading drove it abruptly toward the total stress.",
      "reading": "castro"
    },
    "tl_clerk": {
      "name": "The Blasting Records Clerk",
      "role": "Mine permits and explosives clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the blast archive",
      "hint": "Explosive issue sheets exceed the permitted shot, and the contractor’s electronic delay log was edited after the collapse.",
      "reading": "wilson"
    }
  },
  "TOPICS": {
    "seed": {
      "sci": "Harry Bolton Seed (1922-1989)",
      "topic": "Cyclic loading & liquefaction",
      "lede": "Seed explained how repeated shaking transfers load from grain contacts into pore water until saturated soil loses strength.",
      "no": 1,
      "profile": "Harry Bolton Seed was a British-born geotechnical engineer who spent most of his career at the University of California, Berkeley. His research after damaging earthquakes helped establish modern soil liquefaction engineering. Loose, saturated sand can carry load through a skeleton of grains while water fills the pores. Under rapid cyclic shaking, the grains try to rearrange into a denser state, but the water cannot drain quickly enough.\n\nThe blocked contraction raises pore-water pressure. Effective stress—the portion of total stress carried through grain contacts—falls as pore pressure rises. When effective stress approaches zero, the soil can lose much of its shear strength and behave temporarily like a fluid. Seed developed laboratory, field, and empirical methods for relating earthquake demand to liquefaction resistance, including the use of penetration-test data and cyclic stress ratios.\n\nThe mechanism depends on sequence. A pre-existing high water level can reduce the margin, but cyclic loading supplies repeated stress reversals that build pressure rapidly. Rainfall-induced static failure follows a different time history, and overtopping leaves erosion at the crest. A nearby blast may generate a short, intense cyclic demand even if its magnitude is small compared with a regional earthquake.\n\nAt Serra Verde, accelerometers record a compact pulse before the piezometers rise. The crest remains below the water line needed for overtopping. Seed’s framework therefore permits the dramatic answer: a real shock can trigger liquefaction. It also prevents the conclusion from resting on drama alone, because the pressure response and cyclic demand occur in the order his mechanism requires.",
      "frame": "Ana Reis points from the acceleration spike to the rising pressure trace. “The dam was wet. That is vulnerability. Tell me what supplied the cycles.”",
      "q": [
        {
          "q": "What happens to effective stress as pore-water pressure rises under constant total stress?",
          "o": [
            {
              "t": "Effective stress rises because the water reinforces the soil skeleton in the unit.",
              "v": "partial",
              "fb": "Pore water supports more of the total load and weakens grain contact."
            },
            {
              "t": "Effective stress remains fixed until water reaches the ground surface.",
              "v": "wrong",
              "fb": "Strength can decline before water appears at the surface."
            },
            {
              "t": "Effective stress becomes equal to the soil’s total unit weight in the unit.",
              "v": "danger",
              "fb": "Unit weight is not the definition of effective stress."
            },
            {
              "t": "Effective stress falls because less load is carried through grain contacts.",
              "v": "expert",
              "fb": "Effective stress is total stress minus pore pressure, so it decreases as pressure rises."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "Seed’s sequence appears exactly: a sharp cyclic pulse is followed by rapid pore-pressure rise and loss of effective stress."
          }
        },
        {
          "q": "Why does saturated loose sand become vulnerable during rapid cyclic loading?",
          "o": [
            {
              "t": "Grains try to contract while undrained water pressure builds and weakens contact forces.",
              "v": "expert",
              "fb": "Undrained contraction raises pore pressure and reduces the effective stress carrying shear."
            },
            {
              "t": "Repeated motion instantly dries the pores and removes all interparticle friction.",
              "v": "partial",
              "fb": "Liquefaction occurs because water cannot drain rapidly, not because pores dry."
            },
            {
              "t": "Shaking converts mineral grains chemically into a liquid phase at the failure time.",
              "v": "wrong",
              "fb": "The grains remain solid; the loss of strength is mechanical."
            },
            {
              "t": "The water drains so quickly that the soil loses confining pressure from above.",
              "v": "danger",
              "fb": "Rapid drainage would relieve rather than build the excess pressure."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The triggering pulse and pressure jump are recorded together at the toe instruments nearest the contractor’s blast line."
          }
        },
        {
          "q": "Which evidence most weakens an overtopping explanation?",
          "o": [
            {
              "t": "Rain fell somewhere in the watershed during the week before the collapse.",
              "v": "partial",
              "fb": "Recent rain may affect conditions but does not prove water crossed the crest."
            },
            {
              "t": "The crest shows no overflow erosion while failure begins at the saturated downstream toe.",
              "v": "expert",
              "fb": "No crest flow path and a toe-origin failure contradict overtopping."
            },
            {
              "t": "The impoundment contained water and fine tailings behind the embankment.",
              "v": "wrong",
              "fb": "Stored water is common to tailings facilities and does not identify the trigger."
            },
            {
              "t": "The failure produced a fast downstream flow after the dam lost strength.",
              "v": "danger",
              "fb": "Rapid runout follows several failure mechanisms."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The physical sequence requires a timed external shock, focusing responsibility on the party controlling the nearby production blast rather than routine dam operations."
          }
        }
      ]
    },
    "castro": {
      "sci": "Gonzalo Castro (static-liquefaction researcher)",
      "topic": "Steady state & static liquefaction",
      "lede": "Castro separated a soil that collapses under monotonic loading from one driven over the edge by cyclic stress.",
      "no": 2,
      "profile": "Gonzalo Castro conducted influential research on the behaviour of loose sands near their steady state, including the phenomenon often called static liquefaction. In laboratory triaxial tests, a loose saturated specimen can contract during shearing. If drainage is prevented, pore pressure rises, effective stress falls, and the material may pass a peak strength and collapse toward a lower steady-state resistance.\n\nThis differs from classical earthquake-induced cyclic liquefaction mainly in the loading path. Static liquefaction can be initiated by a monotonic change in stress, loading, erosion, or geometry without repeated shaking. Cyclic liquefaction accumulates pressure through stress reversals. Both mechanisms can end in severe strength loss, and a real dam may be close to instability before a small disturbance decides the moment.\n\nCastro’s work encourages investigators to plot the time history rather than choose a label from the final appearance. If pore pressure had been climbing continuously and deformation accelerated before any pulse, static instability may already have been underway. If instruments are stable and then jump immediately after cyclic acceleration, the external shock is a stronger trigger. Elevated baseline pressure is a susceptibility, not necessarily the initiating event.\n\nSerra Verde’s piezometers were high enough to warrant concern but nearly flat during the preceding day. At the recorded pulse, pressure rises sharply across several cells and lateral deformation begins within seconds. Castro’s distinction preserves nuance: the dam was vulnerable, yet the timing supports blast-triggered cyclic failure rather than a spontaneous static collapse. That difference matters when assigning the initiating act. The distinction preserves both the dam’s vulnerability and the contractor’s initiating role.",
      "frame": "The reader magnifies the last hour of data. “High is not the same as rising. Find the instant the loading path changes.”",
      "q": [
        {
          "q": "What distinguishes static liquefaction from cyclic liquefaction most directly?",
          "o": [
            {
              "t": "Static liquefaction occurs mainly in dry soil and cyclic liquefaction mainly underwater.",
              "v": "partial",
              "fb": "Both phenomena concern saturated contractive soils."
            },
            {
              "t": "Static failure changes grain chemistry, whereas cyclic failure changes water chemistry.",
              "v": "wrong",
              "fb": "Neither mechanism depends on chemical conversion of the grains."
            },
            {
              "t": "Static collapse follows a monotonic loading path, while cyclic failure builds under reversals.",
              "v": "expert",
              "fb": "The loading path—not dry versus wet soil—is the central distinction."
            },
            {
              "t": "Cyclic liquefaction generally requires a large natural earthquake rather than any vibration source.",
              "v": "danger",
              "fb": "Blasts and machinery can also supply cyclic loading."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "Castro’s time-history test rejects spontaneous static collapse because pressure is stable until the external pulse, then rises across instruments at once."
          }
        },
        {
          "q": "Why is elevated baseline pore pressure not enough to identify the trigger?",
          "o": [
            {
              "t": "High pressure strongly suggests that an earthquake occurred before any sensor recorded it.",
              "v": "partial",
              "fb": "Pressure can rise for many reasons and does not invent an unrecorded earthquake."
            },
            {
              "t": "Pore pressure has no relation to effective stress or soil strength at the dam.",
              "v": "wrong",
              "fb": "Pore pressure is central to effective stress."
            },
            {
              "t": "Once pressure is elevated, nearly every later disturbance becomes scientifically irrelevant.",
              "v": "danger",
              "fb": "A later disturbance can determine when a vulnerable material fails."
            },
            {
              "t": "It shows reduced margin, but the initiating loading path must come from the event timeline.",
              "v": "expert",
              "fb": "Susceptibility and trigger are distinct causal questions."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The decisive transition is captured at the toe: flat high pressure changes to a synchronized spike immediately after the blast signal."
          }
        },
        {
          "q": "Which timeline best supports a monotonic static failure?",
          "o": [
            {
              "t": "Progressive pressure and deformation accelerate before any discrete vibration pulse.",
              "v": "expert",
              "fb": "A gradual pre-pulse acceleration is the expected static-instability chronology."
            },
            {
              "t": "A compact acceleration pulse arrives first and pressure jumps in the next samples.",
              "v": "partial",
              "fb": "Pulse-then-pressure supports cyclic triggering instead."
            },
            {
              "t": "The crest remains intact while a seismic record shows one industrial-frequency event.",
              "v": "wrong",
              "fb": "Those observations also lean away from spontaneous static failure."
            },
            {
              "t": "Electronic blast delays align with the first motion at nearby instruments.",
              "v": "danger",
              "fb": "Matching blast timing identifies an external cyclic source."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "Because the failure clock begins with the industrial pulse, the dam engineer’s prior monitoring concern does not replace the contractor’s role in initiating collapse."
          }
        }
      ]
    },
    "wilson": {
      "sci": "Stanley D. Wilson (geotechnical-instrumentation pioneer)",
      "topic": "Piezometers, inclinometers & failure timing",
      "lede": "Wilson’s instruments let engineers put hidden water pressure, ground motion, and deformation on one common clock.",
      "no": 3,
      "profile": "Stanley D. Wilson was a geotechnical engineer associated with the development and practical use of field instrumentation for slopes and earth structures. Piezometers measure water pressure within soil or rock, while inclinometers track lateral movement along a borehole. Together they let engineers observe processes that are otherwise hidden beneath an embankment.\n\nInstrumentation is useful only when its response time and installation are understood. A standpipe piezometer may respond slowly in low-permeability material; a vibrating-wire instrument can record faster changes. Calibration, elevation, drainage conditions, and data acquisition frequency determine what the numbers mean. Inclinometers reveal where shear deformation concentrates, but readings must be compared along the same casing and reference.\n\nA failure investigation aligns instruments on one clock. Rainfall, reservoir level, blast monitors, piezometers, accelerometers, and deformation sensors should be synchronized before causal conclusions are drawn. A supposed earthquake or blast requires a corresponding pulse at multiple stations. A claimed static failure should show pressure or movement developing before the final collapse, not only after it.\n\nAt Serra Verde, the contractor’s electronic delay sequence matches the acceleration waveform to within the recorder tolerance. The nearby piezometers spike in the following samples, and the inclinometer nearest the toe begins moving immediately afterward. Explosive inventory exceeds the permitted shot; a delay log is edited later. Wilson’s instrumentation supplies the handoff from source to mechanism. It makes the outside blast neither rumor nor sole cause: the pulse triggers liquefaction in susceptible tailings, and the records identify who controlled that pulse. The aligned clocks make the attribution mechanical before it becomes legal.",
      "frame": "The clerk synchronizes the blast monitor and three dam sensors. “The clocks tell a sentence. Read the verbs in order.”",
      "q": [
        {
          "q": "What does a piezometer measure in an earth structure?",
          "o": [
            {
              "t": "The total mass of tailings stored behind the dam crest.",
              "v": "partial",
              "fb": "Stored mass requires survey and density information."
            },
            {
              "t": "Pore-water pressure at the instrument’s screened or sensing location.",
              "v": "expert",
              "fb": "Piezometers observe water pressure that contributes directly to effective stress."
            },
            {
              "t": "The chemical composition of nearly every mineral grain in the embankment.",
              "v": "wrong",
              "fb": "Mineralogy needs sampling and laboratory analysis."
            },
            {
              "t": "The horizontal acceleration of a blast without any pressure response.",
              "v": "danger",
              "fb": "Acceleration is measured by a different instrument."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "Wilson’s synchronized sensors place acceleration, pressure rise, and first deformation along the toe and blast line rather than at an overtopped crest."
          }
        },
        {
          "q": "Why must instruments be aligned on one clock during a failure inquiry?",
          "o": [
            {
              "t": "Clock alignment makes nearly every sensor report the same physical quantity on one clock.",
              "v": "partial",
              "fb": "Different instruments retain distinct physical measurements."
            },
            {
              "t": "Synchronizing timestamps removes the need to calibrate individual instruments on one clock.",
              "v": "wrong",
              "fb": "Calibration remains essential after clocks are aligned."
            },
            {
              "t": "Causal order depends on whether vibration, pressure rise, and movement occur before or after one another.",
              "v": "expert",
              "fb": "Sequence distinguishes susceptibility, trigger, and consequence."
            },
            {
              "t": "The earliest timestamp automatically identifies the person legally responsible on one clock.",
              "v": "danger",
              "fb": "Timing supports causation but responsibility also requires custody and records."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "The synchronized clock shows the blast pulse first, then excess pore pressure, then lateral movement—the complete cyclic-liquefaction sequence."
          }
        },
        {
          "q": "Which documentary match most strongly attributes the trigger?",
          "o": [
            {
              "t": "The dam engineer previously requested more frequent piezometer readings on one clock.",
              "v": "partial",
              "fb": "A monitoring request shows concern but not authorship of the pulse."
            },
            {
              "t": "The mine director approved ordinary production targets for the quarter on one clock.",
              "v": "wrong",
              "fb": "Production targets are remote from the specific unpermitted shot."
            },
            {
              "t": "The independent auditor photographed damp ground during an earlier inspection.",
              "v": "danger",
              "fb": "Earlier dampness establishes vulnerability, not the event trigger."
            },
            {
              "t": "The contractor’s electronic delay pattern matches the recorded pulse and excess explosive issue.",
              "v": "expert",
              "fb": "Matching delay timing and explosive custody connect the physical trigger to the contractor."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "Explosive custody, excess issue, and the matching delay sequence converge on the outside crew controlling the shot rather than mine operations or the auditor."
          }
        }
      ]
    }
  },
  "story": [
    "<b>Serra Verde’s tailings turn fluid in seconds, making both the dam’s weakness and the sharp local shock impossible to ignore.</b>",
    "Dam-Walker Ana Reis has the failure geometry. The Instrument Reader can distinguish static from cyclic loading. The Blasting Records Clerk holds the pulse timing and explosive custody.",
    "Rainfall overtopping, spontaneous static liquefaction, and an unauthorized blast can all produce a fast flow, but not the same sequence.",
    "The inquiry must name the trigger without pretending the dam’s susceptibility was irrelevant."
  ],
  "endings": {
    "overclaimWhat": "tl_liquefaction",
    "dismissalWhat": "tl_rain",
    "win": {
      "expertTitle": "The Pulse Before the Pressure",
      "expert": [
        "You connect Vale Norte’s blasting contractor, the Toe, Piezometers & Blast Line, and an unauthorized production blast triggering cyclic liquefaction. The full clue chain links the initiating condition, the physical mechanism, and the decisive record without relying on candidate order.",
        "The two alternative explanations each fit part of the scene, but neither survives the combined timing, material, and documentary evidence."
      ],
      "soundTitle": "The Trigger and the Vulnerability",
      "sound": [
        "Your accusation identifies Vale Norte’s blasting contractor, the Toe, Piezometers & Blast Line, and an unauthorized production blast triggering cyclic liquefaction.",
        "A few missed clues leave gaps in the reconstruction, yet the evidence you recovered is sufficient to distinguish the true sequence from both traps."
      ],
      "namedTitle": "Correct Trigger, Thin Timing",
      "named": [
        "You reach the correct three-part verdict with a thin evidentiary file.",
        "The result is right, although the unrecovered clues would be needed to defend the causal chain under sustained challenge."
      ]
    },
    "overclaim": {
      "title": "Static Risk Was Not the Initiating Event",
      "body": [
        "The dam was vulnerable, but its pore pressure and deformation did not accelerate before the pulse.",
        "Calling the failure spontaneous ignores the synchronized shock-then-pressure sequence and the matching blast delay pattern."
      ]
    },
    "dismissal": {
      "title": "Rain Did Not Cross the Crest",
      "body": [
        "The crest shows no overtopping path and rainfall did not produce the abrupt acceleration signature.",
        "Water condition reduced the margin, but it did not supply the timed trigger recorded at the toe."
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
