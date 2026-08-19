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
  "teaser": "Patients in several states develop the same invasive infection after routine injections. Was a poison deliberately introduced, was the timing coincidental, or did production changes open a path for environmental organisms?",
  "overclaimTag": "a deliberate contaminant in the medicine",
  "truthTag": "a production process that no longer maintained sterility",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"An autoclave chamber and batch record with microbial growth appearing in a vial\"><rect x=\"78\" y=\"28\" width=\"230\" height=\"84\" rx=\"8\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><circle cx=\"160\" cy=\"70\" r=\"25\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2\"/><path d=\"M160 45 v50 M135 70 h50\" stroke=\"#e2e2d8\" stroke-width=\"2\"/><path d=\"M410 34 h76 l22 20 v58 h-98z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><path d=\"M486 34 v22 h22\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><g fill=\"#B3261E\"><circle cx=\"445\" cy=\"72\" r=\"4\"/><circle cx=\"466\" cy=\"88\" r=\"5\"/><circle cx=\"437\" cy=\"96\" r=\"3\"/></g></svg>",
  "overclaimTease": "A poisoner would need to explain the organism, the batch pattern, and the production record; the quieter route begins with what heat, pressure, and monitoring failed to remove.",
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
          "id": "cleanroom",
          "label": "The Clean Room & Autoclave"
        },
        {
          "id": "culture",
          "label": "The Environmental-Monitoring Laboratory"
        },
        {
          "id": "office",
          "label": "The Owner’s Business Office"
        }
      ]
    },
    "what": {
      "title": "What happened",
      "truth": "sterility",
      "items": [
        {
          "id": "poison",
          "label": "A deliberate biological contaminant was added to the released medicine"
        },
        {
          "id": "coincidence",
          "label": "Unrelated infections coincidentally followed the affected injections"
        },
        {
          "id": "sterility",
          "label": "Production changes allowed environmental organisms into batches"
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
      "hint": "The sterilizer cycles were shortened and loads were released before complete records printed.",
      "reading": "autoclave"
    },
    "micro": {
      "name": "The Micro Analyst",
      "role": "Environmental-monitoring analyst",
      "face": "🧫",
      "badge": "M",
      "legend": "the culture bench",
      "hint": "The same mold appeared on room monitors and in patient isolates from linked lots.",
      "reading": "tyndall"
    },
    "clerk": {
      "name": "The Batch Records Clerk",
      "role": "Quality records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the owner’s office",
      "hint": "Capacity targets, failed plates, and release overrides converge in the owner’s signed production file.",
      "reading": "biologics"
    }
  },
  "TOPICS": {
    "autoclave": {
      "sci": "Charles Chamberland (1851-1908)",
      "topic": "The autoclave & sterilizing filter",
      "lede": "Charles Chamberland used pressure, steam, and fine porcelain to make invisible contamination into a controllable laboratory problem.",
      "no": 1,
      "profile": "Charles Chamberland joined Louis Pasteur’s laboratory in Paris in the 1870s and became a central builder of the tools that made bacteriology practical. Experiments on microbes depended on clean culture media and equipment; without reliable sterilization, a flask could grow organisms that came from the room rather than the experiment. Chamberland designed devices to close that loophole, including a porous porcelain filter and a steam-pressure sterilizer that became known as the Chamberland autoclave.\n\nAn autoclave raises the pressure above atmospheric pressure so saturated steam can reach temperatures above the ordinary boiling point of water. Steam condenses on cooler surfaces and transfers heat efficiently. But sterilization is a process, not a dial setting. The load must allow steam penetration; air must be removed; the target temperature must be reached throughout the chamber; and the exposure must last long enough. A displayed temperature at one location cannot prove that tightly packed vials or a cold spot received the required treatment. Records, indicators, and validated cycles are therefore part of the barrier.\n\nChamberland’s porcelain filter pursued the same logic by another route: exclude microbes physically from liquids that cannot tolerate heat. Both inventions separated a controlled product from environmental organisms through a barrier whose performance could be tested.\n\nIn the Meridian inquiry, shortened cycles and incomplete printouts matter because they weaken evidence that the barrier ever operated. A deliberate poison would not naturally produce the same environmental organism on room plates and in multiple released lots. Coincidence becomes harder to defend when affected batches share a sterilization schedule. Chamberland’s lesson is to inspect the full cycle and its records before treating “the autoclave ran” as proof of sterility.",
      "frame": "Unrolls a cycle chart that ends before the validated hold and places it beside a densely packed load diagram. “A chamber can be hot while the product is not yet sterile. Read the whole cycle.”",
      "q": [
        {
          "q": "Why does an autoclave use pressurized steam rather than ordinary boiling?",
          "o": [
            {
              "t": "Pressure permits hotter saturated steam that transfers lethal heat through the load.",
              "v": "expert",
              "fb": "Higher-temperature condensing steam can achieve validated microbial inactivation when it reaches the product."
            },
            {
              "t": "Pressure mechanically crushes microorganisms even if the load remains cool.",
              "v": "wrong",
              "fb": "The primary sterilizing action is heat delivered by steam, not compression alone."
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
            "label": "WHAT clue",
            "text": "The released loads never completed the validated steam hold, creating a plausible route for living environmental organisms without any added poison."
          }
        },
        {
          "q": "What would most strongly show that a specific load was actually sterilized?",
          "o": [
            {
              "t": "A complete validated cycle plus indicators at the hardest-to-heat location.",
              "v": "expert",
              "fb": "Sterility assurance depends on time, temperature, steam contact, and evidence from the limiting location."
            },
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
              "t": "The absence of visible cloudiness in every vial immediately after filling.",
              "v": "danger",
              "fb": "Sterile products can contain low microbial levels without visible growth at release."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "Technicians could start cycles but could not shorten validated recipes; the altered parameters came from a production authority above the clean-room staff."
          }
        },
        {
          "q": "Where should investigators look for the decision to release an incomplete cycle?",
          "o": [
            {
              "t": "The batch-authorization file joining cycle data, deviations, and release approval.",
              "v": "expert",
              "fb": "The autoclave shows what occurred; the joined release file shows who accepted it as sufficient."
            },
            {
              "t": "The chamber drain, because surviving organisms collect there after steaming.",
              "v": "wrong",
              "fb": "A drain sample may inform sanitation but cannot establish release authority."
            },
            {
              "t": "The filling hood alone, because contamination occurs after sterilization.",
              "v": "danger",
              "fb": "Contamination may enter before, during, or after processing; the full batch record is needed."
            },
            {
              "t": "The state inspection report written after the outbreak became public.",
              "v": "partial",
              "fb": "A later inspection records findings, but the contemporaneous release decision is more direct."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The physical barrier failed in the clean room, but the incomplete cycle became a released medicine only through the batch-authorization file in the owner’s office."
          }
        }
      ]
    },
    "tyndall": {
      "sci": "John Tyndall (1820-1893)",
      "topic": "Heat-resistant spores & intermittent heating",
      "lede": "John Tyndall discovered that clear broth could survive boiling because some microbes waited in a resistant state before returning to growth.",
      "no": 2,
      "profile": "John Tyndall was an Irish physicist celebrated for work on heat, light, and the atmosphere, but his experiments also helped settle arguments about spontaneous generation and sterilization. Working with carefully prepared infusions, he showed that dust carried living germs. In a specially constructed dust-free chamber, sterilized broths remained clear until contaminated particles were admitted. Yet some infusions stubbornly spoiled after ordinary boiling, forcing him to investigate why heat sometimes seemed to fail.\n\nThe answer involved resistant bacterial spores. A vegetative cell actively growing in broth can be killed by conditions that a dormant spore survives. Tyndall developed intermittent heating: heat the material, allow surviving spores time to germinate into vulnerable cells, then heat again. The historical method, later called tyndallization, demonstrated a key principle even though modern pressure sterilization is more reliable for many products—microbial resistance depends on state, and one apparently successful heating step may not eliminate the most resistant population.\n\nTyndall also emphasized contamination routes. If organisms enter from dust after treatment, a perfect sterilization cycle can still be defeated. Investigators therefore compare the identity and distribution of organisms in the environment, product, and patients. Matching species and genetic patterns across those locations can tie an outbreak to a process rather than coincidence.\n\nFor Meridian, the same mold appeared repeatedly on environmental plates near the filling area and in patient isolates linked to particular lots. That is not the pattern of unrelated illnesses, and it does not resemble an arbitrary chemical poison. Short cycles, positive room monitors, and common organisms form one biological chain. Tyndall’s work teaches that survival and re-entry are mechanisms that can be tested, not excuses hidden under the word contamination.",
      "frame": "Sets three culture plates in chronological order: room air, released vial, patient isolate. “A coincidence does not usually repeat the same biological signature along the production path.”",
      "q": [
        {
          "q": "Why could a broth spoil after an apparently adequate boiling step?",
          "o": [
            {
              "t": "Dormant spores survived, then germinated and repopulated the cooled broth.",
              "v": "expert",
              "fb": "Heat resistance varies by microbial state, so surviving spores can restart growth after cooling."
            },
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
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "The same viable organism appears along the room-to-vial-to-patient path, supporting survival or entry during production rather than unrelated post-injection illness."
          }
        },
        {
          "q": "What makes matching environmental and patient organisms powerful evidence?",
          "o": [
            {
              "t": "It links one biological source across monitoring, product, and patient illness.",
              "v": "expert",
              "fb": "Concordant identities transform separate observations into one contamination pathway."
            },
            {
              "t": "It indicates that each positive environmental plate infected a patient.",
              "v": "danger",
              "fb": "A match supports linkage, but investigators still need lot, timing, and exposure evidence."
            },
            {
              "t": "It shows the organism could not have been present before the pharmacy opened.",
              "v": "wrong",
              "fb": "Microbial identity does not establish when an organism first entered the facility."
            },
            {
              "t": "It matters when each patient was treated in the same hospital room and ward.",
              "v": "partial",
              "fb": "A common manufactured lot can connect patients across institutions and states."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "Monitoring plates identified the room source, but the decision to disregard repeated positives is preserved with the release deviations in the business office."
          }
        },
        {
          "q": "Which pattern argues most strongly against coincidence?",
          "o": [
            {
              "t": "Affected patients received linked lots carrying the same organism found in the room.",
              "v": "expert",
              "fb": "Shared lot exposure and biological matching make unrelated infections increasingly implausible."
            },
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
              "t": "Some recipients of the implicated lots remained well despite receiving injections.",
              "v": "wrong",
              "fb": "Incomplete attack rates are normal and do not erase a strong common-source pattern."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The repeated environmental positives were acknowledged in internal reviews, yet the same executive kept the affected lots on the release schedule."
          }
        }
      ]
    },
    "biologics": {
      "sci": "Milton J. Rosenau (1869-1946)",
      "topic": "Biologics sterility & public standards",
      "lede": "Milton Rosenau treated biological medicines as public-health systems whose safety depended on production standards, testing, and accountable release.",
      "no": 3,
      "profile": "Milton J. Rosenau was an American physician and public-health leader who worked in the federal Hygienic Laboratory, an ancestor of the National Institutes of Health, and later taught at Harvard and the University of North Carolina. At a time when vaccines, antitoxins, and other biological products were expanding rapidly, manufacturing quality varied widely. A medicine derived from living systems could save lives, but contamination or inconsistent potency could also spread harm across every recipient of a batch.\n\nRosenau helped develop laboratory methods and standards for biological products and wrote an influential textbook on preventive medicine and hygiene. The regulatory lesson of biologics is batch accountability. Materials, environmental conditions, sterilization records, test results, deviations, and release decisions must remain linked. Sterility testing samples only a fraction of a lot, so a negative test cannot rescue a process known to be uncontrolled. Manufacturers rely on validated barriers and honest deviation handling, not on inspecting quality into the finished product after the fact.\n\nThis logic also explains why outbreaks can cross geography. A single contaminated batch distributed widely may produce cases in several states, while neighboring patients who received other lots remain well. Lot numbers and release dates can reveal a sharper pattern than hospital location.\n\nFor the Meridian inquiry, Rosenau’s framework points past the technician who followed altered settings and past the inspector who arrived later. The business records connect output targets, shortened cycles, positive environmental plates, and “release anyway” approvals. A poisoner story adds an unnecessary actor; coincidence ignores the lot structure. The responsible decision is the one that repeatedly accepted an uncontrolled process and sent its products into interstate distribution.",
      "frame": "Builds a batch genealogy from raw materials to patient lot numbers, then circles the release signatures. “Sterility is not one test. It is an accountable process that ends with someone accepting the batch.”",
      "q": [
        {
          "q": "Why can a negative sterility test not rescue a known process failure?",
          "o": [
            {
              "t": "Testing samples only part of a lot, while validated controls protect the whole process.",
              "v": "expert",
              "fb": "A small sample can miss rare contamination, so process assurance remains essential."
            },
            {
              "t": "Sterility tests are useless because microorganisms rarely grow under laboratory conditions.",
              "v": "wrong",
              "fb": "Culture methods have limits, but they remain informative when interpreted with process evidence."
            },
            {
              "t": "Any failed process indicates each vial in the batch contains the same number of organisms.",
              "v": "danger",
              "fb": "Loss of control raises risk but does not imply uniform contamination in every container."
            },
            {
              "t": "A negative result matters when the medicine remains within one state market.",
              "v": "partial",
              "fb": "Geography does not determine the microbiological limits of sampling."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The complete batch genealogy—including cycle deviations, culture results, output targets, and release signatures—converges in the owner’s business office."
          }
        },
        {
          "q": "What distribution pattern fits a contaminated manufactured lot?",
          "o": [
            {
              "t": "Cases at distant clinics cluster among recipients of the same released batch.",
              "v": "expert",
              "fb": "A common lot can connect geographically separated infections through one production event."
            },
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
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "The cases cluster by lot, not by hospital, and the organism matches the facility environment—the expected shape of a released sterility failure."
          }
        },
        {
          "q": "Which batch document links the release decisions to one responsible authority?",
          "o": [
            {
              "t": "Repeated signed releases made after documented cycle and monitoring deviations.",
              "v": "expert",
              "fb": "The signatures show who accepted uncontrolled batches despite known barrier failures."
            },
            {
              "t": "The roster of technicians assigned to compound each affected vial.",
              "v": "partial",
              "fb": "The roster identifies hands-on staff but not who set targets and authorized release."
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
            "label": "WHO clue",
            "text": "One owner’s signature recurs after shortened cycles, failed environmental plates, and interstate release, joining motive, authority, and outcome."
          }
        }
      ]
    }
  },
  "story": [
    "<b>Routine injections from Meridian were followed by the same uncommon infection across three states.</b> The hospitals differed; the lot numbers did not.",
    "Pharmacy Tech Ruiz has the incomplete sterilizer charts. The Micro Analyst has matching environmental and patient cultures. The Batch Records Clerk has the genealogy from production target to release signature.",
    "A deliberate contaminant makes an immediate villain. Coincidental illness makes the pharmacy irrelevant. The organism and the batch structure test both stories.",
    "Three readings can yield nine clues. The completed notebook should trace a living organism through failed barriers and into a decision that sent the affected lots outward."
  ],
  "endings": {
    "overclaimWhat": "poison",
    "dismissalWhat": "coincidence",
    "win": {
      "expertTitle": "The Released Contamination Chain",
      "expert": [
        "You connect incomplete sterilization, matching environmental organisms, lot-clustered illness, and repeated release approvals in the owner’s business office.",
        "The evidence needs no poisoner and cannot be reduced to unrelated infections. It shows a production system whose barriers were weakened and whose warnings were knowingly accepted."
      ],
      "soundTitle": "The Batch Pattern Holds",
      "sound": [
        "Your accusation identifies the owner, the business office, and the uncontrolled sterility process.",
        "Even with some missing clues, the lot distribution and microbial match establish a common manufactured source rather than either trap."
      ],
      "namedTitle": "Correct Batch, Thin File",
      "named": [
        "You select the right person, place, and mechanism.",
        "The verdict is correct, though unanswered questions leave parts of the cycle and release sequence less fully reconstructed."
      ]
    },
    "overclaim": {
      "title": "A Living Route, Not a Secret Poison",
      "body": [
        "The affected lots carried an organism also recovered from the production environment. Short cycles and ignored monitoring provide a direct biological route.",
        "A deliberate-poison theory adds drama but fails to explain the matched cultures and repeated release process."
      ]
    },
    "dismissal": {
      "title": "The Lot Numbers Defeat Coincidence",
      "body": [
        "Patients in different states were linked by specific batches, and their isolates matched the facility environment.",
        "Calling the illnesses unrelated discards the strongest epidemiological and microbiological structure in the case."
      ]
    },
    "wrongNames": {
      "title": "The Process, Misassigned",
      "body": [
        "You recognize the sterility failure but place responsibility or culmination away from the business file that linked production targets, deviations, and release authority."
      ]
    }
  }
}
};
