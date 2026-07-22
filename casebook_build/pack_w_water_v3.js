// Casebook V3 — three informants, three readings, one clue per correct answer.
module.exports = { PACK: {
  "schemaVersion": 3,
  "mode": "three_informants_three_readings",
  "id": "w_water",
  "title": "The Tap",
  "discipline": "Water Supply & Environmental Health",
  "venue": "the Rushton water inquiry",
  "agent": {
    "name": "Investigator Faye Orwell",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Water Pioneers",
  "dossierName": "WATER & PUBLIC-HEALTH PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Rushton water inquiry",
  "DAYS_TOTAL": 3,
  "teaser": "A source change is followed by rising lead in children’s blood. Was poison added at treatment, did the new water remain safe throughout distribution, or did altered chemistry attack old plumbing after a required control feed was left off?",
  "overclaimTag": "intentional contamination at treatment",
  "truthTag": "a plant operator left required corrosion control offline",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"Water moving from treatment pipes through corroding service lines to a household tap\"><path d=\"M20 32 H210 V52 H260\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><path d=\"M260 42 H410 V62 H520\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><path d=\"M40 94 C120 72,190 112,270 90 S420 70,620 94\" fill=\"none\" stroke=\"#e2e2d8\" stroke-width=\"2\"/><g stroke=\"#121212\" fill=\"none\" stroke-width=\"2\"><path d=\"M520 46 v38 h64 v-38\"/><path d=\"M540 84 v26 M564 84 v26\"/></g><g stroke=\"#B3261E\" stroke-width=\"2\"><circle cx=\"463\" cy=\"62\" r=\"5\" fill=\"none\"/><circle cx=\"480\" cy=\"68\" r=\"3\" fill=\"#B3261E\"/><circle cx=\"496\" cy=\"58\" r=\"4\" fill=\"none\"/></g></svg>",
  "overclaimTease": "Compare the authorized source plan with the actual treatment historian, finished-water chemistry, and household pattern. Policy, operation, and downstream exposure may point to different people.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "operator",
      "items": [
        {
          "id": "official",
          "label": "Merrick — the city emergency manager"
        },
        {
          "id": "regulator",
          "label": "The state environmental regulator"
        },
        {
          "id": "operator",
          "label": "Operator Nunez — treatment-plant operator"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "plant",
      "items": [
        {
          "id": "plant",
          "label": "The Treatment Plant & Corrosion-Feed Station"
        },
        {
          "id": "cityhall",
          "label": "The City Manager’s Office"
        },
        {
          "id": "lab",
          "label": "The Water-Testing Laboratory"
        }
      ]
    },
    "what": {
      "title": "What happened",
      "truth": "corrosion",
      "items": [
        {
          "id": "safe",
          "label": "The source change remained within safe distribution limits"
        },
        {
          "id": "tampering",
          "label": "A contaminant was intentionally added during treatment"
        },
        {
          "id": "corrosion",
          "label": "The new chemistry destabilized protective pipe scale"
        }
      ]
    }
  },
  "READING_ORDER": [
    "operator2",
    "chemist",
    "clerk"
  ],
  "CHARACTERS": {
    "operator2": {
      "name": "Shift Operator Vale",
      "role": "Treatment-plant shift operator",
      "face": "🚰",
      "badge": "O",
      "legend": "the treatment floor",
      "hint": "The corrosion-feed order was active, but Operator Nunez repeatedly left the dosing pump offline during his shifts.",
      "reading": "corrosionchem"
    },
    "chemist": {
      "name": "The Water Chemist",
      "role": "Water-testing chemist",
      "face": "🧪",
      "badge": "W",
      "legend": "the sample bench",
      "hint": "Lead results track old plumbing and time on the new source, while treated plant water shows no added contaminant.",
      "reading": "leadkids"
    },
    "clerk": {
      "name": "The City-Hall Clerk",
      "role": "Municipal records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the records room",
      "hint": "City and regulator records required corrosion control; plant logs isolate the unapproved departure to one operator.",
      "reading": "flintcorrosion"
    }
  },
  "TOPICS": {
    "corrosionchem": {
      "sci": "Marcel Pourbaix (1904-1998)",
      "topic": "Corrosion chemistry & passivation",
      "lede": "Marcel Pourbaix turned corrosion from a vague story about “bad water” into a map of chemical conditions and stable surfaces.",
      "no": 1,
      "profile": "Marcel Pourbaix was a Belgian electrochemist who spent much of his career asking a practical question: under a given set of water conditions, will a metal remain intact, dissolve, or cover itself with a protective film? His answer became the potential–pH diagram, now usually called a Pourbaix diagram. The chart places acidity on one axis and electrochemical potential on the other, then marks the regions where a metal is immune, actively corroding, or passivated by a stable oxide layer.\n\nThe diagram does not predict a corrosion rate by itself, and real plumbing adds flow, temperature, minerals, disinfectants, and mixed metals. Its power is diagnostic. A small change in pH, alkalinity, chloride, or oxidation conditions can move a pipe surface across a boundary. A scale that had remained stable for years may begin dissolving, exposing fresh metal and releasing material that had been trapped in the wall. Corrosion control therefore means managing water chemistry as part of the distribution system, not merely producing clear water at the plant gate.\n\nPourbaix assembled and published extensive electrochemical equilibrium data, culminating in his Atlas of Electrochemical Equilibria in Aqueous Solutions. Engineers still use the diagrams to reason about pipelines, boilers, reinforced concrete, and drinking-water plumbing. They also warn against treating compliance at one sampling point as proof that the entire system is chemically stable.\n\nPourbaix’s diagrams make the missing feed technically meaningful. The source switch shifted pH, alkalinity, and chloride conditions enough to destabilize protective scale unless the ordered corrosion treatment was running. City authorization and regulator correspondence both required that control, but the plant historian shows the dosing pump repeatedly left offline during Operator Nunez’s shifts. The chemical mechanism begins at the Treatment Plant & Corrosion-Feed Station even though lead is released later inside household plumbing.",
      "frame": "Sets the old and new source analyses beside a sketch of the distribution mains. “Clear water can still cross a chemical boundary after it leaves me. Show me you know which boundary matters.”",
      "q": [
        {
          "q": "What does a Pourbaix diagram organize for a metal in water?",
          "o": [
            {
              "t": "Expected pipe lifetime versus pressure, diameter, and average daily flow rate.",
              "v": "partial",
              "fb": "Hydraulics affect service life, but those variables are not the axes of a Pourbaix diagram."
            },
            {
              "t": "Disinfectant dose versus bacterial count at each stage of water treatment.",
              "v": "wrong",
              "fb": "That is a treatment-control chart rather than an electrochemical stability map."
            },
            {
              "t": "The concentration of any poison needed to remain invisible in routine samples.",
              "v": "danger",
              "fb": "Pourbaix diagrams describe metal-water equilibria, not how contaminants evade detection."
            },
            {
              "t": "Immunity, active corrosion, and passivation regions versus pH and potential.",
              "v": "expert",
              "fb": "The diagram separates the chemical domains in which metal stays intact, dissolves, or forms a protective film."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — lead",
            "text": "The source-change order required corrosion dosing; the first departures appear as unexplained feed shutdowns tied to one operator’s shifts."
          }
        },
        {
          "q": "Why can a source change release lead even when no lead enters at the plant?",
          "o": [
            {
              "t": "Higher pressure can manufacture lead ions from otherwise lead-free pipe material.",
              "v": "wrong",
              "fb": "Pressure may affect leaks and flow, but it cannot create an element that is not in the plumbing."
            },
            {
              "t": "Chlorine can transform harmless minerals into lead whenever water stands overnight.",
              "v": "danger",
              "fb": "Disinfectants influence corrosion chemistry, but they do not transmute other minerals into lead."
            },
            {
              "t": "New pH and redox conditions can dissolve a scale that had isolated the pipe wall.",
              "v": "expert",
              "fb": "A chemistry shift can destabilize passivating deposits and expose metal already present in plumbing."
            },
            {
              "t": "Old pipes release a fixed amount of lead regardless of the water that enters them.",
              "v": "partial",
              "fb": "Pipe material matters, yet release can change sharply when water chemistry or protective scale changes."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — lead",
            "text": "The source switch changed conditions that govern whether protective lead-bearing pipe scale remains stable."
          }
        },
        {
          "q": "Which record most directly shows who changed the corrosion regime?",
          "o": [
            {
              "t": "The city order authorizing the new source with corrosion treatment required.",
              "v": "partial",
              "fb": "The order establishes the required safeguard rather than its defeat."
            },
            {
              "t": "Feed-pump historian and shift log showing repeated unapproved shutdowns.",
              "v": "expert",
              "fb": "Equipment state tied to operator shifts identifies the enacted departure."
            },
            {
              "t": "The regulator letter describing acceptable monitoring and control conditions.",
              "v": "wrong",
              "fb": "The regulator conditions support control and do not identify the shutdown."
            },
            {
              "t": "A resident complaint reporting discolored water weeks after the switch.",
              "v": "danger",
              "fb": "Complaints show consequences but not who changed plant operation."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — lead",
            "text": "Finished water contains no added poison, but the corrosion-feed station shows the control pump offline after the new source enters treatment."
          }
        }
      ]
    },
    "leadkids": {
      "sci": "Herbert Needleman (1927-2017)",
      "topic": "Lead exposure & children’s development",
      "lede": "Herbert Needleman showed that children could be harmed by lead without displaying the dramatic symptoms medicine once required.",
      "no": 2,
      "profile": "Herbert Needleman was a pediatrician and psychiatrist who challenged the comfortable belief that lead mattered only when a child became visibly poisoned. In the 1970s he looked for a record of cumulative exposure in shed baby teeth. Dentine forms in layers and can retain lead absorbed during childhood, allowing researchers to compare exposure with school performance even when a child had no acute medical crisis.\n\nNeedleman and his collaborators reported that children with higher dentine lead burdens performed worse on measures of attention, language, classroom behavior, and psychological testing. Later follow-up work strengthened the case that low-level exposure could have lasting developmental effects. The research was controversial, especially because it threatened industries built around lead paint, gasoline, and other products, but it helped move public health away from a simple poisoning threshold and toward prevention.\n\nThe statistical lesson is as important as the toxicology. Population harm can appear as a shift in a distribution rather than a row of identical catastrophes. A citywide average may remain below a regulatory action level while particular neighborhoods, homes, or children experience much higher exposure. Removing high samples, changing the sampling pool, or averaging unlike locations can therefore erase the very pattern investigators need to see.\n\nNeedleman’s work makes the exposure pattern incompatible with both harmless averages and a poison added at the plant. Elevated results concentrate in homes with older service lines, increase with stagnation, and rise with time on the new source; water leaving treatment lacks the alleged contaminant. Raw samples remain valid, while the distribution pattern follows pipe interaction. The evidence also separates a broad policy failure from a specific operational departure: the required feed existed, but one operator did not keep it running.",
      "frame": "Spreads the raw tap results beside a neighborhood map. “An average can hide the children at the tail. Read the pattern before anyone tells you the number was acceptable.”",
      "q": [
        {
          "q": "What did Needleman’s use of shed teeth add to lead research?",
          "o": [
            {
              "t": "A cumulative childhood exposure record that could be compared with later performance.",
              "v": "expert",
              "fb": "Dentine lead offered a longer exposure record than a single blood measurement taken after the fact."
            },
            {
              "t": "A way to prove each learning problem had no cause except environmental lead.",
              "v": "danger",
              "fb": "The studies showed associations and population effects, not a unique cause for every individual difficulty."
            },
            {
              "t": "A direct measurement of the lead concentration in a child’s current drinking water.",
              "v": "wrong",
              "fb": "Teeth record absorbed exposure; they do not identify the present concentration at a specific tap."
            },
            {
              "t": "A screening method that became useful after a child showed severe poisoning.",
              "v": "partial",
              "fb": "Needleman’s point was that meaningful harm could appear below the level of obvious acute poisoning."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — corroboration",
            "text": "Elevated samples cluster in older plumbing and with stagnation rather than appearing uniformly in water leaving the plant."
          }
        },
        {
          "q": "Why can a citywide average conceal an important lead problem?",
          "o": [
            {
              "t": "An average below an action level indicates that sampled households were protected.",
              "v": "danger",
              "fb": "An action level is not a guarantee that no home or child experienced a high exposure."
            },
            {
              "t": "Lead affects every child identically, so variation among homes is statistical noise.",
              "v": "wrong",
              "fb": "Exposure and susceptibility vary; the distribution is part of the evidence rather than noise."
            },
            {
              "t": "The median dominates because extreme readings are usually treated as laboratory errors.",
              "v": "partial",
              "fb": "Outliers require investigation, but automatically discarding them can erase real high-exposure homes."
            },
            {
              "t": "High exposures in vulnerable homes can disappear when unlike samples are pooled.",
              "v": "expert",
              "fb": "A mean can look acceptable while a subgroup or upper tail carries substantial risk."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — corroboration",
            "text": "City and regulator records retain the safeguard, while the plant historian repeatedly links its absence to Operator Nunez’s console login."
          }
        },
        {
          "q": "Which location best distinguishes added poison from pipe-released lead?",
          "o": [
            {
              "t": "The city office where resident complaint summaries were assembled.",
              "v": "partial",
              "fb": "Administrative summaries cannot locate the contaminant source."
            },
            {
              "t": "The laboratory average after high household results were removed.",
              "v": "wrong",
              "fb": "An edited average conceals rather than resolves the spatial mechanism."
            },
            {
              "t": "The plant feed station and finished-water samples before distribution.",
              "v": "expert",
              "fb": "Plant-side chemistry tests whether contamination existed before water reached pipes."
            },
            {
              "t": "One home tap with old plumbing and a long stagnation period.",
              "v": "danger",
              "fb": "One home shows exposure but cannot alone test treatment-stage addition."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — corroboration",
            "text": "The plant historian aligns each untreated period with the chemistry later associated with elevated household lead release."
          }
        }
      ]
    },
    "flintcorrosion": {
      "sci": "Marc Edwards (environmental engineer, b. 1964)",
      "topic": "Corrosion control & the Flint water crisis",
      "lede": "Marc Edwards followed household water, pipe chemistry, and citizens’ complaints until an administrative decision became a measurable exposure pathway.",
      "no": 3,
      "profile": "Marc Edwards is an environmental engineer at Virginia Tech whose work has focused on corrosion, premise plumbing, and the unintended consequences of water-treatment decisions. He became widely known through investigations of lead in Washington, D.C., drinking water and later the Flint water crisis. In both settings, the technical issue was not lead being poured into a reservoir. It was water chemistry interacting with lead-bearing service lines, solder, and household plumbing.\n\nCorrosion control commonly uses chemistry—often phosphate-based treatment, pH adjustment, or alkalinity management—to encourage stable protective scales. When a utility changes source water, disinfectant, or treatment conditions, it must test whether those scales will remain protective. Sampling design matters just as much. Flushing a tap, selecting low-risk homes, or failing to capture stagnant water can produce reassuring numbers that do not represent residents’ exposure. Edwards’s teams combined laboratory analysis, plumbing knowledge, and resident sampling to test the whole chain from treatment decision to tap.\n\nThe larger lesson is institutional. Residents can supply observations that formal monitoring misses: discoloration, rashes, unusual taste, or repeated high home tests. Those reports are not substitutes for chemistry, but they are reasons to investigate. When complaint records, corrosion studies, and sampling results all point in the same direction, dismissing each piece separately becomes less defensible.\n\nEdwards’s source-change method joins chemistry, operations, and residents. Pipe-loop tests predicted scale destabilization without dosing, complaints rose after the source switch, and the feed historian identifies repeated offline periods under one operator. The emergency manager’s order and regulator file both anticipated corrosion control rather than waiving it. Responsibility therefore sits with the frontline decision that defeated an approved safeguard, and the decisive physical scene is the treatment feed station where that decision was enacted.",
      "frame": "Opens the source-change memo, the complaint ledger, and the pipe-loop test on the same desk. “A crisis sticks together only when the chemistry, the sampling, and the authority all point along one chain.”",
      "q": [
        {
          "q": "What must a utility evaluate when changing drinking-water sources?",
          "o": [
            {
              "t": "Whether the new source tastes acceptable to a majority of customers on its first day.",
              "v": "partial",
              "fb": "Taste complaints can matter, but they do not replace corrosion testing and distribution-system analysis."
            },
            {
              "t": "Whether the new chemistry will preserve protective scales throughout the network.",
              "v": "expert",
              "fb": "A source can meet treatment targets yet destabilize scales in service lines and household plumbing."
            },
            {
              "t": "Whether the plant operator can keep the water visibly clear without changing equipment.",
              "v": "wrong",
              "fb": "Clarity is not evidence that lead-bearing plumbing remains chemically protected."
            },
            {
              "t": "Whether officials can average enough samples to remain below the action threshold.",
              "v": "danger",
              "fb": "Sampling should discover exposure, not be designed backward from a desired compliance result."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — decisive",
            "text": "Required corrosion control stayed offline long enough for the new chemistry to destabilize scale and release lead from distribution plumbing."
          }
        },
        {
          "q": "Why are resident samples valuable in a corrosion investigation?",
          "o": [
            {
              "t": "They test water after it has contacted the service lines and household plumbing.",
              "v": "expert",
              "fb": "The exposure point is the tap, where distribution and premise plumbing have altered the treated water."
            },
            {
              "t": "They replace laboratory quality control because residents know their own water best.",
              "v": "partial",
              "fb": "Residents reveal conditions and locations, but validated analysis is still needed to measure contaminants."
            },
            {
              "t": "They indicate that unusual taste or color is caused by toxic lead release.",
              "v": "danger",
              "fb": "Sensory changes warrant investigation but do not identify a contaminant by themselves."
            },
            {
              "t": "They show whether treatment staff followed the plant’s daily operating checklist.",
              "v": "wrong",
              "fb": "Plant procedure is documented elsewhere; home samples test the downstream result of those procedures."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — decisive",
            "text": "Source water, dosing status, alarm acknowledgment, and the first altered distribution chemistry converge at the Treatment Plant & Corrosion-Feed Station."
          }
        },
        {
          "q": "Which evidence most directly assigns the failed safeguard to one worker?",
          "o": [
            {
              "t": "The emergency manager’s signature on the broader source-change authorization.",
              "v": "partial",
              "fb": "Authorization of the source is not authorization to disable required control."
            },
            {
              "t": "The regulator’s approval of a plan that included corrosion-control treatment.",
              "v": "wrong",
              "fb": "Approval supports the safeguard rather than the failure to operate it."
            },
            {
              "t": "The chemist’s validation of high samples from neighborhoods with old plumbing.",
              "v": "danger",
              "fb": "Validated samples establish harm but not the person controlling the pump."
            },
            {
              "t": "Required dosing orders plus historian gaps recurring on the same operator’s shifts.",
              "v": "expert",
              "fb": "The comparison separates approved policy from the frontline departure that defeated it."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — decisive",
            "text": "One treatment operator left the required pump offline, acknowledged the alarm, and restored no dosing during the periods that changed distribution chemistry."
          }
        }
      ]
    }
  },
  "story": [
    "<b>Rushton’s new source looked acceptable at the plant gate; children’s exposure rose in neighborhoods with old plumbing.</b>",
    "Shift Operator Vale can read the corrosion-feed historian. The Water Chemist holds raw household and finished-water results. The City-Hall Clerk can compare operating requirements with what the plant actually did.",
    "Intentional contamination, a harmless source change, and destabilized pipe scale each predict a different location and exposure pattern.",
    "The case turns on whether the approved safeguard was absent by policy—or defeated by the person operating it."
  ],
  "endings": {
    "overclaimWhat": "tampering",
    "dismissalWhat": "safe",
    "win": {
      "expertTitle": "The Feed Left Offline",
      "expert": [
        "You connect Operator Nunez, the Treatment Plant & Corrosion-Feed Station, and the source chemistry that destabilized protective pipe scale.",
        "No contaminant appears in finished water, and the neighborhood pattern rejects a harmless change. Orders required dosing; historian and shift records show the frontline operator repeatedly defeated that safeguard."
      ],
      "soundTitle": "The Plant-Side Departure",
      "sound": [
        "Your accusation identifies the operator, the feed station, and the corrosion mechanism.",
        "Some chemistry or historian details remain incomplete, but the required-control and exposure pattern support the conclusion."
      ],
      "namedTitle": "Right Operator, Thin Chemistry",
      "named": [
        "You choose the correct person, location, and mechanism.",
        "The verdict holds, though missed clues leave parts of the dosing or neighborhood evidence less complete."
      ]
    },
    "overclaim": {
      "title": "No Poison Was Added at Treatment",
      "body": [
        "Finished-water testing lacks the alleged contaminant, while exposure tracks old plumbing, stagnation, and time on the source.",
        "The treatment-stage poisoning story cannot explain that distribution pattern."
      ]
    },
    "dismissal": {
      "title": "Plant Compliance Did Not Mean Distribution Safety",
      "body": [
        "The new chemistry interacted with old service lines after required corrosion control was left offline.",
        "A safe-looking plant result does not erase lead released downstream from destabilized scale."
      ]
    },
    "wrongNames": {
      "title": "The Corrosion Mechanism, Misassigned",
      "body": [
        "You recognize pipe-scale destabilization but place responsibility or culmination away from the operator and feed station that changed the water chemistry."
      ]
    }
  }
}
};
