// Casebook V3 — three informants, three readings, one clue per correct answer.
module.exports = { PACK: {
  "schemaVersion": 3,
  "mode": "three_informants_three_readings",
  "id": "w_compound",
  "title": "The Compounding Room",
  "discipline": "Pharmacy & Sterile Compounding",
  "venue": "the Meridian Compounding inquiry",
  "agent": {
    "name": "Investigator Del Marsh",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Pharmacy Pioneers",
  "dossierName": "PHARMACY & STERILITY PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Meridian Compounding inquiry",
  "DAYS_TOTAL": 3,
  "teaser": "Patients in several states develop the same invasive infection after routine injections. Was a contaminant deliberately added, were the illnesses unrelated, or did altered production allow a facility organism to enter linked lots?",
  "overclaimTag": "a deliberate contaminant in the medicine",
  "truthTag": "a sterility failure repeatedly released from the owner’s office",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"An autoclave chamber and batch record with microbial growth appearing in a vial\"><rect x=\"78\" y=\"28\" width=\"230\" height=\"84\" rx=\"8\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><circle cx=\"160\" cy=\"70\" r=\"25\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2\"/><path d=\"M160 45 v50 M135 70 h50\" stroke=\"#e2e2d8\" stroke-width=\"2\"/><path d=\"M410 34 h76 l22 20 v58 h-98z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><path d=\"M486 34 v22 h22\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><g fill=\"#B3261E\"><circle cx=\"445\" cy=\"72\" r=\"4\"/><circle cx=\"466\" cy=\"88\" r=\"5\"/><circle cx=\"437\" cy=\"96\" r=\"3\"/></g></svg>",
  "overclaimTease": "Process records, environmental cultures, and patient isolates each answer a different part of the mystery. The final question is where that evidence was accepted or overridden before the lots left.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "owner",
      "items": [
        {
          "id": "pharmacist",
          "label": "The compounding pharmacist"
        },
        {
          "id": "owner",
          "label": "Guillory — the pharmacy owner"
        },
        {
          "id": "inspector",
          "label": "The state pharmacy inspector"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "office",
      "items": [
        {
          "id": "office",
          "label": "The Owner’s Business Office"
        },
        {
          "id": "culture",
          "label": "The Environmental-Monitoring Laboratory"
        },
        {
          "id": "cleanroom",
          "label": "The Clean Room & Autoclave"
        }
      ]
    },
    "what": {
      "title": "What happened",
      "truth": "sterility",
      "items": [
        {
          "id": "poison",
          "label": "A deliberate biological contaminant was added to medicine"
        },
        {
          "id": "sterility",
          "label": "Production changes allowed environmental organisms into batches"
        },
        {
          "id": "coincidence",
          "label": "Unrelated infections coincidentally followed the injections"
        }
      ]
    }
  },
  "READING_ORDER": [
    "tech",
    "micro",
    "clerk"
  ],
  "CHARACTERS": {
    "tech": {
      "name": "Pharmacy Tech Ruiz",
      "role": "Compounding technician",
      "face": "⚗️",
      "badge": "T",
      "legend": "the clean room",
      "hint": "Validated sterilizer cycles were shortened, leaving loads without complete time-and-temperature evidence.",
      "reading": "autoclave"
    },
    "micro": {
      "name": "The Micro Analyst",
      "role": "Environmental-monitoring analyst",
      "face": "🧫",
      "badge": "M",
      "legend": "the culture bench",
      "hint": "Room plates, retained vials, and patient isolates yield the same organism and closely matching strain pattern.",
      "reading": "tyndall"
    },
    "clerk": {
      "name": "The Batch Records Clerk",
      "role": "Quality records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the owner’s office",
      "hint": "The owner repeatedly authorized release after the laboratory flagged cycle deviations and environmental positives.",
      "reading": "biologics"
    }
  },
  "TOPICS": {
    "autoclave": {
      "sci": "Charles Chamberland (1851-1908)",
      "topic": "The autoclave & sterilizing filter",
      "lede": "Charles Chamberland used pressure, steam, and fine porcelain to make invisible contamination into a controllable laboratory problem.",
      "no": 1,
      "profile": "Charles Chamberland joined Louis Pasteur’s laboratory in Paris in the 1870s and became a central builder of the tools that made bacteriology practical. Experiments on microbes depended on clean culture media and equipment; without reliable sterilization, a flask could grow organisms that came from the room rather than the experiment. Chamberland designed devices to close that loophole, including a porous porcelain filter and a steam-pressure sterilizer that became known as the Chamberland autoclave.\n\nAn autoclave raises the pressure above atmospheric pressure so saturated steam can reach temperatures above the ordinary boiling point of water. Steam condenses on cooler surfaces and transfers heat efficiently. But sterilization is a process, not a dial setting. The load must allow steam penetration; air must be removed; the target temperature must be reached throughout the chamber; and the exposure must last long enough. A displayed temperature at one location cannot prove that tightly packed vials or a cold spot received the required treatment. Records, indicators, and validated cycles are therefore part of the barrier.\n\nChamberland’s porcelain filter pursued the same logic by another route: exclude microbes physically from liquids that cannot tolerate heat. Both inventions separated a controlled product from environmental organisms through a barrier whose performance could be tested.\n\nIn Meridian, incomplete steam holds and missing cycle printouts show that a validated barrier was no longer being completed. That creates a credible route for viable environmental organisms without requiring deliberate addition. Chamberland’s lesson also separates technical failure from release authority: the clean room created the unsafe condition, but the medicine entered commerce only after the owner’s office accepted incomplete cycle evidence and signed the batch forward.",
      "frame": "Unrolls a cycle chart that ends before the validated hold and places it beside a densely packed load diagram. “A chamber can be hot while the product is not yet sterile. Read the whole cycle.”",
      "q": [
        {
          "q": "Why does an autoclave use pressurized steam rather than ordinary boiling?",
          "o": [
            {
              "t": "Pressure mechanically crushes microorganisms even if the load remains cool.",
              "v": "wrong",
              "fb": "The primary sterilizing action is heat delivered by steam, not compression alone."
            },
            {
              "t": "Pressure permits hotter saturated steam that transfers lethal heat through the load.",
              "v": "expert",
              "fb": "Higher-temperature condensing steam can achieve validated microbial inactivation when it reaches the product."
            },
            {
              "t": "Steam chemically neutralizes added toxins while preserving the medicine’s full potency.",
              "v": "danger",
              "fb": "Autoclaving targets viable organisms and is not a universal antidote for deliberate chemicals."
            },
            {
              "t": "Boiling is identical, but pressure makes the printed cycle look more reliable.",
              "v": "partial",
              "fb": "Pressure changes attainable temperature and penetration conditions, not merely documentation."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — lead",
            "text": "Shortened steam holds weaken the validated barrier without implying that anyone deliberately added an organism."
          }
        },
        {
          "q": "What would most strongly show that a specific load was actually sterilized?",
          "o": [
            {
              "t": "A green status light showing the chamber door remained locked for the run.",
              "v": "partial",
              "fb": "Door status confirms containment but not that the coldest product reached the required exposure."
            },
            {
              "t": "A technician’s memory that the chamber felt extremely hot when opened.",
              "v": "wrong",
              "fb": "Subjective heat cannot replace calibrated cycle data and load-specific indicators."
            },
            {
              "t": "A complete validated cycle plus indicators at the hardest-to-heat location.",
              "v": "expert",
              "fb": "Sterility assurance depends on time, temperature, steam contact, and evidence from the limiting location."
            },
            {
              "t": "The absence of visible cloudiness in every vial immediately after filling.",
              "v": "danger",
              "fb": "Sterile products can contain low microbial levels without visible growth at release."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — lead",
            "text": "Technicians could run validated cycles but lacked authority to shorten recipes or release incomplete loads."
          }
        },
        {
          "q": "Where does an incomplete cycle become a released patient risk?",
          "o": [
            {
              "v": "expert",
              "t": "In the owner’s office, when incomplete loads receive release authorization.",
              "fb": "Release authority turns a process deviation into distributed medicine."
            },
            {
              "v": "partial",
              "t": "In the monitoring lab, when room, vial, and patient organisms match.",
              "fb": "The lab proves the chain but does not authorize distribution."
            },
            {
              "v": "wrong",
              "t": "At the autoclave display, when one chamber temperature appears.",
              "fb": "One display point does not establish release or full load sterility."
            },
            {
              "v": "danger",
              "t": "At distant hospitals, whenever illness follows an injection.",
              "fb": "Clinical timing alone cannot identify who accepted the failed batch."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — lead",
            "text": "The incomplete cycle becomes a patient risk only after the owner’s office authorizes the affected load for release."
          }
        }
      ]
    },
    "tyndall": {
      "sci": "John Tyndall (1820-1893)",
      "topic": "Heat-resistant spores & intermittent heating",
      "lede": "John Tyndall discovered that clear broth could survive boiling because some microbes waited in a resistant state before returning to growth.",
      "no": 2,
      "profile": "John Tyndall was an Irish physicist celebrated for work on heat, light, and the atmosphere, but his experiments also helped settle arguments about spontaneous generation and sterilization. Working with carefully prepared infusions, he showed that dust carried living germs. In a specially constructed dust-free chamber, sterilized broths remained clear until contaminated particles were admitted. Yet some infusions stubbornly spoiled after ordinary boiling, forcing him to investigate why heat sometimes seemed to fail.\n\nThe answer involved resistant bacterial spores. A vegetative cell actively growing in broth can be killed by conditions that a dormant spore survives. Tyndall developed intermittent heating: heat the material, allow surviving spores time to germinate into vulnerable cells, then heat again. The historical method, later called tyndallization, demonstrated a key principle even though modern pressure sterilization is more reliable for many products—microbial resistance depends on state, and one apparently successful heating step may not eliminate the most resistant population.\n\nTyndall also emphasized contamination routes. If organisms enter from dust after treatment, a perfect sterilization cycle can still be defeated. Investigators therefore compare the identity and distribution of organisms in the environment, product, and patients. Matching species and genetic patterns across those locations can tie an outbreak to a process rather than coincidence.\n\nTyndall’s work makes repeated matching organisms the strongest discriminator. Meridian’s environmental plates, retained vials, and patient isolates carry the same mold species and closely related strain profile across affected lots. That connected path is incompatible with unrelated infections and more specific than a generic poisoning claim. The laboratory established the route; the Owner’s Business Office became the culmination when those results were overruled and the linked lots remained on the release schedule.",
      "frame": "Sets three culture plates in chronological order: room air, released vial, patient isolate. “A coincidence does not usually repeat the same biological signature along the production path.”",
      "q": [
        {
          "q": "Why could a broth spoil after an apparently adequate boiling step?",
          "o": [
            {
              "t": "Boiling creates new organisms from nutrients once the vessel returns to room temperature.",
              "v": "wrong",
              "fb": "Tyndall’s controlled experiments opposed spontaneous generation and traced growth to surviving or entering germs."
            },
            {
              "t": "A deliberate poison can transform into mold whenever it contacts warm glass.",
              "v": "danger",
              "fb": "Chemical poisoning does not explain viable fungal growth with a matching environmental source."
            },
            {
              "t": "All microbes survive boiling equally, so temperature records provide no useful evidence.",
              "v": "partial",
              "fb": "Some forms are more resistant, but thermal history remains central to evaluating survival."
            },
            {
              "t": "Dormant spores survived, then germinated and repopulated the cooled broth.",
              "v": "expert",
              "fb": "Heat resistance varies by microbial state, so surviving spores can restart growth after cooling."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — corroboration",
            "text": "Cases cluster by lot, and the facility organism appears in both retained medicine and patient isolates."
          }
        },
        {
          "q": "What makes matching environmental and patient organisms powerful evidence?",
          "o": [
            {
              "t": "The organisms share a broad fungal category common in many environments.",
              "v": "partial",
              "fb": "A broad category is too common to identify a shared source."
            },
            {
              "t": "A close strain match links the facility source to affected lots and cases.",
              "v": "expert",
              "fb": "Specific relatedness across room, product, and patient supports one transmission chain."
            },
            {
              "t": "Patients became ill after injections even though no retained vials were tested.",
              "v": "wrong",
              "fb": "Timing alone does not establish the organism’s route through production."
            },
            {
              "t": "One monitoring plate grew an organism after the outbreak became public.",
              "v": "danger",
              "fb": "A late isolated plate lacks the repeated lot-linked pattern required."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — corroboration",
            "text": "Environmental positives and retained-vial growth are forwarded to the same office that keeps the lots on the schedule."
          }
        },
        {
          "q": "Which pattern argues most strongly against coincidence?",
          "o": [
            {
              "t": "Patients became ill at different hospitals several days after their injections.",
              "v": "partial",
              "fb": "Different hospitals do not rule out a common manufactured source, and incubation periods can vary."
            },
            {
              "t": "The illness organism is common in nature and therefore is unlikely to identify a source.",
              "v": "danger",
              "fb": "A common organism can still be traced through matching isolates, timing, lots, and environmental location."
            },
            {
              "t": "Affected patients received linked lots carrying the same organism found in the room.",
              "v": "expert",
              "fb": "Shared lot exposure and biological matching make unrelated infections increasingly implausible."
            },
            {
              "t": "Some recipients of the implicated lots remained well despite receiving injections.",
              "v": "wrong",
              "fb": "Incomplete attack rates are normal and do not erase a strong common-source pattern."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — corroboration",
            "text": "Laboratory positives and cycle deviations were escalated to the owner before affected lots left the facility."
          }
        }
      ]
    },
    "biologics": {
      "sci": "Milton J. Rosenau (1869-1946)",
      "topic": "Biologics sterility & public standards",
      "lede": "Milton Rosenau treated biological medicines as public-health systems whose safety depended on production standards, testing, and accountable release.",
      "no": 3,
      "profile": "Milton J. Rosenau was an American physician and public-health leader who worked in the federal Hygienic Laboratory, an ancestor of the National Institutes of Health, and later taught at Harvard and the University of North Carolina. At a time when vaccines, antitoxins, and other biological products were expanding rapidly, manufacturing quality varied widely. A medicine derived from living systems could save lives, but contamination or inconsistent potency could also spread harm across every recipient of a batch.\n\nRosenau helped develop laboratory methods and standards for biological products and wrote an influential textbook on preventive medicine and hygiene. The regulatory lesson of biologics is batch accountability. Materials, environmental conditions, sterilization records, test results, deviations, and release decisions must remain linked. Sterility testing samples only a fraction of a lot, so a negative test cannot rescue a process known to be uncontrolled. Manufacturers rely on validated barriers and honest deviation handling, not on inspecting quality into the finished product after the fact.\n\nThis logic also explains why outbreaks can cross geography. A single contaminated batch distributed widely may produce cases in several states, while neighboring patients who received other lots remain well. Lot numbers and release dates can reveal a sharper pattern than hospital location.\n\nRosenau’s manufacturing perspective joins process control to release authority. The owner received reports of shortened cycles, environmental positives, and linked lot complaints, then authorized continued distribution under output pressure. The laboratory proves that the organism belonged to the facility ecology and traveled through production. The business office is where that scientific evidence, batch genealogy, production target, and release signature became one accountable decision.",
      "frame": "Builds a batch genealogy from raw materials to patient lot numbers, then circles the release signatures. “Sterility is not one test. It is an accountable process that ends with someone accepting the batch.”",
      "q": [
        {
          "q": "Where are lot genealogy, culture warnings, and release signatures joined?",
          "o": [
            {
              "v": "expert",
              "t": "In the owner’s office, where laboratory warnings meet signed batch release.",
              "fb": "The office joins biological evidence to the accountable distribution decision."
            },
            {
              "v": "partial",
              "t": "In the monitoring lab, where retained vials and patient isolates are compared.",
              "fb": "The laboratory proves relatedness but does not own release authority."
            },
            {
              "v": "wrong",
              "t": "In the clean room, using only cleaning and gowning checklists.",
              "fb": "Those records omit patient isolates and the signed release decision."
            },
            {
              "v": "danger",
              "t": "At each hospital, using only dates from individual patient charts.",
              "fb": "Hospital timing cannot reconstruct the manufacturing authorization chain."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — decisive",
            "text": "Cycle deviations, strain matches, output targets, and final release signatures converge in the Owner’s Business Office."
          }
        },
        {
          "q": "What distribution pattern fits a contaminated manufactured lot?",
          "o": [
            {
              "t": "Every patient in one hospital becomes ill regardless of which product they received.",
              "v": "partial",
              "fb": "That pattern might suggest a local hospital source rather than a distributed lot."
            },
            {
              "t": "Illness appears randomly among people who did not receive the implicated injection.",
              "v": "wrong",
              "fb": "Cases without the exposure weaken rather than strengthen a batch-source explanation."
            },
            {
              "t": "An employee became sick before production and is assumed to have poisoned the vials.",
              "v": "danger",
              "fb": "Temporal coincidence and motive speculation cannot replace lot-specific epidemiology and microbiology."
            },
            {
              "t": "Cases at distant clinics cluster among recipients of the same released batch.",
              "v": "expert",
              "fb": "A common lot can connect geographically separated infections through one production event."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — decisive",
            "text": "Production changes allowed an environmental organism to survive or enter linked batches; coincidence and deliberate poisoning fail the joined pattern."
          }
        },
        {
          "q": "Which batch document links the release decisions to one responsible authority?",
          "o": [
            {
              "t": "The roster of technicians assigned to compound each affected vial.",
              "v": "partial",
              "fb": "The roster identifies hands-on staff but not who set targets and authorized release."
            },
            {
              "t": "Repeated signed releases made after documented cycle and monitoring deviations.",
              "v": "expert",
              "fb": "The signatures show who accepted uncontrolled batches despite known barrier failures."
            },
            {
              "t": "The inspector’s badge log from the first visit after the outbreak.",
              "v": "wrong",
              "fb": "Post-outbreak presence does not establish responsibility for earlier production decisions."
            },
            {
              "t": "An anonymous allegation that the pharmacist disliked one of the patients.",
              "v": "danger",
              "fb": "A personal theory cannot explain multi-lot, multi-state biological evidence and release records."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — decisive",
            "text": "One owner repeatedly signed release overrides after shortened cycles, matching environmental results, and early linked-case reports."
          }
        }
      ]
    }
  },
  "story": [
    "<b>Meridian’s injections reached three states; the same infection followed selected lots.</b>",
    "Pharmacy Tech Ruiz can explain the shortened cycles. The Micro Analyst can compare room, vial, and patient organisms. The Batch Records Clerk holds release authority and lot genealogy.",
    "A deliberate contaminant, unrelated illness, and a production sterility failure each predict a different biological pattern.",
    "The case must connect the broken barrier and laboratory evidence to the office that decided whether the affected lots would still leave."
  ],
  "endings": {
    "overclaimWhat": "poison",
    "dismissalWhat": "coincidence",
    "win": {
      "expertTitle": "The Organism Across the Chain",
      "expert": [
        "You connect Guillory, the Owner’s Business Office, and production changes that admitted the facility organism into released lots.",
        "Matching room, vial, and patient strains reject deliberate addition and unrelated illness. Release overrides show who kept distribution moving after the scientific warnings converged."
      ],
      "soundTitle": "The Sterility Chain",
      "sound": [
        "Your accusation identifies the owner, the business office, and the process contamination.",
        "Some cycle or strain details remain missing, but the lot pattern and release record support the conclusion."
      ],
      "namedTitle": "Right Contamination, Thin Genealogy",
      "named": [
        "You choose the correct person, place, and mechanism.",
        "The verdict holds, though missed clues leave portions of the organism or batch chain less complete."
      ]
    },
    "overclaim": {
      "title": "No Deliberate Addition Pattern",
      "body": [
        "The organism matches the facility environment and follows production lots rather than a targeted dosing pattern.",
        "The poisoner story overlooks the documented route created by weakened sterile processing."
      ]
    },
    "dismissal": {
      "title": "The Infections Share a Manufacturing Source",
      "body": [
        "Cases cluster by lot across hospitals, and related organisms appear in retained product and patients.",
        "That distribution is not credible as a run of unrelated infections."
      ]
    },
    "wrongNames": {
      "title": "The Sterility Failure, Misassigned",
      "body": [
        "You recognize the production route but place authority or culmination away from the owner and office that converted laboratory warnings into release."
      ]
    }
  }
}
};
