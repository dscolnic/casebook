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
  "teaser": "A source change is followed by rising lead in children’s blood. Was poison introduced at treatment, were the results harmlessly within the rules, or did the new water alter what old pipes released?",
  "overclaimTag": "intentional contamination at treatment",
  "truthTag": "a source change that destabilized old plumbing",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"Water moving from treatment pipes through corroding service lines to a household tap\"><path d=\"M20 32 H210 V52 H260\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><path d=\"M260 42 H410 V62 H520\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><path d=\"M40 94 C120 72,190 112,270 90 S420 70,620 94\" fill=\"none\" stroke=\"#e2e2d8\" stroke-width=\"2\"/><g stroke=\"#121212\" fill=\"none\" stroke-width=\"2\"><path d=\"M520 46 v38 h64 v-38\"/><path d=\"M540 84 v26 M564 84 v26\"/></g><g stroke=\"#B3261E\" stroke-width=\"2\"><circle cx=\"463\" cy=\"62\" r=\"5\" fill=\"none\"/><circle cx=\"480\" cy=\"68\" r=\"3\" fill=\"#B3261E\"/><circle cx=\"496\" cy=\"58\" r=\"4\" fill=\"none\"/></g></svg>",
  "overclaimTease": "The plant is the obvious scene, but the strongest evidence may lie in what the source change did after the water left it—and who authorized that change.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "official",
      "items": [
        {
          "id": "operator",
          "label": "Operator Nunez — treatment-plant operator"
        },
        {
          "id": "official",
          "label": "Merrick — the city emergency manager"
        },
        {
          "id": "regulator",
          "label": "The state environmental regulator"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "cityhall",
      "items": [
        {
          "id": "plant",
          "label": "The Treatment Plant & Intake"
        },
        {
          "id": "lab",
          "label": "The Water-Testing Laboratory"
        },
        {
          "id": "cityhall",
          "label": "The City Manager’s Office"
        }
      ]
    },
    "what": {
      "title": "What happened",
      "truth": "corrosion",
      "items": [
        {
          "id": "tampering",
          "label": "A contaminant was intentionally added during treatment"
        },
        {
          "id": "safe",
          "label": "The source change stayed within safe operating limits"
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
      "name": "Operator Nunez",
      "role": "Treatment-plant operator",
      "face": "🚰",
      "badge": "O",
      "legend": "the treatment floor",
      "hint": "The new source met its plant targets, but the corrosion-control feed was never started.",
      "reading": "corrosionchem"
    },
    "chemist": {
      "name": "The Water Chemist",
      "role": "Water-testing chemist",
      "face": "🧪",
      "badge": "W",
      "legend": "the sample bench",
      "hint": "The highest lead results were real, geographically patterned, and removed only after reporting.",
      "reading": "leadkids"
    },
    "clerk": {
      "name": "The City-Hall Clerk",
      "role": "Municipal records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the records room",
      "hint": "The source-change order and the complaint response came from the same administrative chain.",
      "reading": "flintcorrosion"
    }
  },
  "TOPICS": {
    "corrosionchem": {
      "sci": "Marcel Pourbaix (1904-1998)",
      "topic": "Corrosion chemistry & passivation",
      "lede": "Marcel Pourbaix turned corrosion from a vague story about “bad water” into a map of chemical conditions and stable surfaces.",
      "no": 1,
      "profile": "Marcel Pourbaix was a Belgian electrochemist who spent much of his career asking a practical question: under a given set of water conditions, will a metal remain intact, dissolve, or cover itself with a protective film? His answer became the potential–pH diagram, now usually called a Pourbaix diagram. The chart places acidity on one axis and electrochemical potential on the other, then marks the regions where a metal is immune, actively corroding, or passivated by a stable oxide layer.\n\nThe diagram does not predict a corrosion rate by itself, and real plumbing adds flow, temperature, minerals, disinfectants, and mixed metals. Its power is diagnostic. A small change in pH, alkalinity, chloride, or oxidation conditions can move a pipe surface across a boundary. A scale that had remained stable for years may begin dissolving, exposing fresh metal and releasing material that had been trapped in the wall. Corrosion control therefore means managing water chemistry as part of the distribution system, not merely producing clear water at the plant gate.\n\nPourbaix assembled and published extensive electrochemical equilibrium data, culminating in his Atlas of Electrochemical Equilibria in Aqueous Solutions. Engineers still use the diagrams to reason about pipelines, boilers, reinforced concrete, and drinking-water plumbing. They also warn against treating compliance at one sampling point as proof that the entire system is chemically stable.\n\nIn Rushton, the useful comparison is spatial and chemical. Intentional poisoning at treatment should appear in water leaving the plant. A source change that destabilized old pipe scale should produce low readings at the plant and rising metals after contact with the network. Pourbaix’s map tells the investigator to follow the water’s changing environment before deciding whether the event was sabotage or safety as usual.",
      "frame": "Sets the old and new source analyses beside a sketch of the distribution mains. “Clear water can still cross a chemical boundary after it leaves me. Show me you know which boundary matters.”",
      "q": [
        {
          "q": "What does a Pourbaix diagram organize for a metal in water?",
          "o": [
            {
              "t": "Immunity, active corrosion, and passivation regions versus pH and potential.",
              "v": "expert",
              "fb": "The diagram separates the chemical domains in which metal stays intact, dissolves, or forms a protective film."
            },
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
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The corrosion-control feed was absent because the source-change authorization bypassed the plant’s normal chemistry review; the operator lacked authority to approve that exception."
          }
        },
        {
          "q": "Why can a source change release lead even when no lead enters at the plant?",
          "o": [
            {
              "t": "New pH and redox conditions can dissolve a scale that had isolated the pipe wall.",
              "v": "expert",
              "fb": "A chemistry shift can destabilize passivating deposits and expose metal already present in plumbing."
            },
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
              "t": "Old pipes release a fixed amount of lead regardless of the water that enters them.",
              "v": "partial",
              "fb": "Pipe material matters, yet release can change sharply when water chemistry or protective scale changes."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "The plant outlet remained low in lead while household taps rose after the source switch—a Pourbaix-style pattern of protective scale becoming unstable downstream."
          }
        },
        {
          "q": "Which location best preserves the decision that changed the corrosion regime?",
          "o": [
            {
              "t": "The administrative file approving the source switch without chemistry review.",
              "v": "expert",
              "fb": "The plant shows the chemistry, but the authorization record identifies where the decisive exception culminated."
            },
            {
              "t": "The intake screen where raw water first entered the treatment process.",
              "v": "partial",
              "fb": "The intake marks the physical beginning of the source change, not the authority that waived safeguards."
            },
            {
              "t": "The sample refrigerator containing the first validated elevated-lead bottles.",
              "v": "wrong",
              "fb": "Those bottles document consequences but not the governing decision behind them."
            },
            {
              "t": "A single household faucet selected because its result was the most alarming.",
              "v": "danger",
              "fb": "One dramatic tap cannot establish where the system-level decision was made."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The chemically important change began at the intake, but the unreviewed exception is preserved in the city administration’s source-switch file."
          }
        }
      ]
    },
    "leadkids": {
      "sci": "Herbert Needleman (1927-2017)",
      "topic": "Lead exposure & children’s development",
      "lede": "Herbert Needleman showed that children could be harmed by lead without displaying the dramatic symptoms medicine once required.",
      "no": 2,
      "profile": "Herbert Needleman was a pediatrician and psychiatrist who challenged the comfortable belief that lead mattered only when a child became visibly poisoned. In the 1970s he looked for a record of cumulative exposure in shed baby teeth. Dentine forms in layers and can retain lead absorbed during childhood, allowing researchers to compare exposure with school performance even when a child had no acute medical crisis.\n\nNeedleman and his collaborators reported that children with higher dentine lead burdens performed worse on measures of attention, language, classroom behavior, and psychological testing. Later follow-up work strengthened the case that low-level exposure could have lasting developmental effects. The research was controversial, especially because it threatened industries built around lead paint, gasoline, and other products, but it helped move public health away from a simple poisoning threshold and toward prevention.\n\nThe statistical lesson is as important as the toxicology. Population harm can appear as a shift in a distribution rather than a row of identical catastrophes. A citywide average may remain below a regulatory action level while particular neighborhoods, homes, or children experience much higher exposure. Removing high samples, changing the sampling pool, or averaging unlike locations can therefore erase the very pattern investigators need to see.\n\nNeedleman’s work gives the Rushton inquiry two tests. First, a harmless-change theory must explain why children’s measurements rose after the source switch and clustered where older service lines were common. Second, a deliberate dose at the plant should not selectively track plumbing age and water residence time. The case is not settled by whether one official average met a rule; it is settled by whether the full distribution follows an exposure mechanism.",
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
            "label": "WHAT clue",
            "text": "The elevated results formed a neighborhood pattern tied to older plumbing and time on the new source, not the random scatter expected from unrelated illnesses."
          }
        },
        {
          "q": "Why can a citywide average conceal an important lead problem?",
          "o": [
            {
              "t": "High exposures in vulnerable homes can disappear when unlike samples are pooled.",
              "v": "expert",
              "fb": "A mean can look acceptable while a subgroup or upper tail carries substantial risk."
            },
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
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The exclusions followed a reporting rule sent from the emergency manager’s staff after the chemists had already validated the high samples."
          }
        },
        {
          "q": "Which record would best test whether alarming samples were honestly summarized?",
          "o": [
            {
              "t": "The raw result table matched against the final report and each stated exclusion rule.",
              "v": "expert",
              "fb": "Comparing raw and reported data reveals whether high values were removed by a defensible method or by instruction."
            },
            {
              "t": "The final press release because it contains the city’s approved interpretation.",
              "v": "danger",
              "fb": "An approved summary cannot audit its own omissions without the underlying measurements."
            },
            {
              "t": "The laboratory instrument manual because it defines how lead is chemically detected.",
              "v": "partial",
              "fb": "The manual checks measurement technique, not whether validated results were later excluded."
            },
            {
              "t": "The treatment log because plant compliance determines every household exposure.",
              "v": "wrong",
              "fb": "Distribution plumbing can change water after treatment, so plant logs cannot substitute for tap data."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The laboratory retained the raw warnings, but the instruction to omit them points to the city manager’s reporting file rather than the sample bench."
          }
        }
      ]
    },
    "flintcorrosion": {
      "sci": "Marc Edwards (environmental engineer, b. 1964)",
      "topic": "Corrosion control & the Flint water crisis",
      "lede": "Marc Edwards followed household water, pipe chemistry, and citizens’ complaints until an administrative decision became a measurable exposure pathway.",
      "no": 3,
      "profile": "Marc Edwards is an environmental engineer at Virginia Tech whose work has focused on corrosion, premise plumbing, and the unintended consequences of water-treatment decisions. He became widely known through investigations of lead in Washington, D.C., drinking water and later the Flint water crisis. In both settings, the technical issue was not lead being poured into a reservoir. It was water chemistry interacting with lead-bearing service lines, solder, and household plumbing.\n\nCorrosion control commonly uses chemistry—often phosphate-based treatment, pH adjustment, or alkalinity management—to encourage stable protective scales. When a utility changes source water, disinfectant, or treatment conditions, it must test whether those scales will remain protective. Sampling design matters just as much. Flushing a tap, selecting low-risk homes, or failing to capture stagnant water can produce reassuring numbers that do not represent residents’ exposure. Edwards’s teams combined laboratory analysis, plumbing knowledge, and resident sampling to test the whole chain from treatment decision to tap.\n\nThe larger lesson is institutional. Residents can supply observations that formal monitoring misses: discoloration, rashes, unusual taste, or repeated high home tests. Those reports are not substitutes for chemistry, but they are reasons to investigate. When complaint records, corrosion studies, and sampling results all point in the same direction, dismissing each piece separately becomes less defensible.\n\nFor Rushton, Edwards’s method joins the case. The new source changed the water’s corrosivity; the control feed was omitted; high tap samples were filtered out of the public average; and complaints were answered from the same office that authorized the switch. That chain rejects a lone rogue at the plant and also rejects the claim that formal compliance settled the matter. The question is who controlled the decision and the record.",
      "frame": "Opens the source-change memo, the complaint ledger, and the pipe-loop test on the same desk. “A crisis sticks together only when the chemistry, the sampling, and the authority all point along one chain.”",
      "q": [
        {
          "q": "What must a utility evaluate when changing drinking-water sources?",
          "o": [
            {
              "t": "Whether the new chemistry will preserve protective scales throughout the network.",
              "v": "expert",
              "fb": "A source can meet treatment targets yet destabilize scales in service lines and household plumbing."
            },
            {
              "t": "Whether the new source tastes acceptable to a majority of customers on its first day.",
              "v": "partial",
              "fb": "Taste complaints can matter, but they do not replace corrosion testing and distribution-system analysis."
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
            "label": "WHAT clue",
            "text": "The pipe-loop study predicted loss of protective scale, the control feed stayed off, and the tap pattern followed that mechanism rather than a planted contaminant."
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
            "label": "WHERE clue",
            "text": "The decisive chain is assembled in the city manager’s office: source authorization, corrosion waiver, complaint responses, and the edited public summary."
          }
        },
        {
          "q": "Which evidence most directly identifies responsibility for the exposure pathway?",
          "o": [
            {
              "t": "A signed order linking the source switch, omitted control, and reporting response.",
              "v": "expert",
              "fb": "The joined authorization record connects the technical mechanism to the official who controlled the decision."
            },
            {
              "t": "A plant shift log showing which operator was present when the source changed.",
              "v": "partial",
              "fb": "Presence establishes who executed the switch, not who authorized the exception and controlled reporting."
            },
            {
              "t": "A regulator’s later inspection describing violations after residents became ill.",
              "v": "wrong",
              "fb": "The later inspection documents failure but does not necessarily identify the initiating authority."
            },
            {
              "t": "An anonymous claim that someone at the plant wanted residents to become sick.",
              "v": "danger",
              "fb": "Motive without corroboration cannot outweigh signed records and a reproducible corrosion mechanism."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The same city executive signed the unreviewed source order, denied the corrosion feed, and approved the response that discounted residents’ samples."
          }
        }
      ]
    }
  },
  "story": [
    "<b>Rushton’s water changed first; the city’s explanation changed several times afterward.</b> Plant samples looked ordinary while lead rose at household taps.",
    "Operator Nunez can explain the chemistry at treatment. The Water Chemist holds the complete sample distribution. The City-Hall Clerk has the source order and complaint trail.",
    "One account says a contaminant was deliberately introduced. Another says the change stayed inside safe limits. Both can sound plausible if the plant and the plumbing are treated as the same place.",
    "Each reading yields up to three notebook clues. The strongest accusation must connect source chemistry, downstream exposure, and the authority that controlled both the decision and its public record."
  ],
  "endings": {
    "overclaimWhat": "tampering",
    "dismissalWhat": "safe",
    "win": {
      "expertTitle": "The Chemistry and the Order",
      "expert": [
        "Your accusation matches the complete chain: the source changed, protective scale destabilized, high tap results were suppressed, and the governing exceptions converged in the city administration.",
        "The full notebook separates execution from authority and plant quality from household exposure; it explains why neither a planted poison nor routine compliance fits the spatial and documentary record."
      ],
      "soundTitle": "The Distribution Chain",
      "sound": [
        "You identify the responsible authority, the city office, and the chemistry-driven release from old plumbing.",
        "Some details remain less fully proved, but the neighborhood pattern and administrative record support the mechanism and reject both trap explanations."
      ],
      "namedTitle": "Correct, with Gaps",
      "named": [
        "You reach the right person, place, and mechanism with a thin notebook.",
        "The verdict is sound, though missed clues leave the sampling edits and authorization sequence less firmly reconstructed."
      ]
    },
    "overclaim": {
      "title": "The Poison Was Already in the Pipes",
      "body": [
        "The deliberate-contamination theory expects the contaminant at or immediately after treatment. Instead, plant water remained low while lead rose after contact with older plumbing.",
        "Chasing a rogue operator also misassigns authority: the signed exceptions and reporting instructions originated beyond the treatment floor."
      ]
    },
    "dismissal": {
      "title": "Compliance Did Not Describe Exposure",
      "body": [
        "A reassuring average cannot erase validated high homes or a distribution pattern tied to pipe age and time on the new source.",
        "The source change altered corrosion conditions, and the omitted control plus edited reporting turned a foreseeable chemical risk into children’s exposure."
      ]
    },
    "wrongNames": {
      "title": "The Mechanism, Filed in the Wrong Place",
      "body": [
        "You recognize the corrosion pathway but place responsibility or culmination away from the administrative record that joined the source decision, the waiver, and the response."
      ]
    }
  }
}
};
