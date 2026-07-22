// Casebook V3 — three informants, three readings, one clue per correct answer.
module.exports = { PACK: {
  "schemaVersion": 3,
  "mode": "three_informants_three_readings",
  "id": "c_arch",
  "title": "The Cranmoor Skull",
  "discipline": "Archaeology & Scientific Dating",
  "venue": "the Cranmoor Skull inquiry",
  "agent": {
    "name": "Inspector Cal Merrin",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Archaeologists",
  "readingLabel": "Archaeology & Dating Pioneers",
  "dossierName": "ARCHAEOLOGY & DATING PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Cranmoor Skull inquiry",
  "DAYS_TOTAL": 3,
  "teaser": "A gravel pit produced a skull and jaw hailed as a missing link. Are they one genuine ancestor, an honest amateur combination of unrelated finds, or a deliberately filed and stained composite planted to create a false context?",
  "overclaimTag": "the discovery of the century",
  "truthTag": "a planted composite exposed by context and dating",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A composite skull and jaw separated by laboratory dating tests\"><path d=\"M110 34 q58-30 105 8 q34 28 4 65 q-38 25-92 5 q-36-28-17-78z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"3\"/><path d=\"M132 102 q42 28 83-2\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"4\"/><path d=\"M285 70 H390\" stroke=\"#326891\" stroke-width=\"3\" stroke-dasharray=\"6 4\"/><rect x=\"420\" y=\"28\" width=\"150\" height=\"84\" rx=\"6\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><path d=\"M445 48 h100 M445 68 h100 M445 88 h72\" stroke=\"#e2e2d8\" stroke-width=\"2\"/><path d=\"M455 100 l80-58\" stroke=\"#B3261E\" stroke-width=\"3\"/></svg>",
  "overclaimTease": "A remarkable specimen without witnessed context begins as a claim. Test whether the pieces share one burial history, then follow the alterations and access that made them appear together.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "ah_amateur",
      "items": [
        {
          "id": "ah_amateur",
          "label": "Silas Fenn — the amateur antiquary"
        },
        {
          "id": "ah_keeper",
          "label": "Dr. Marrick — the museum keeper"
        },
        {
          "id": "ah_geologist",
          "label": "Professor Aldous — the site geologist"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "ah_pit",
      "items": [
        {
          "id": "ah_pit",
          "label": "The Gravel Pit & Fabricated Find Context"
        },
        {
          "id": "ah_gallery",
          "label": "The Museum Gallery"
        },
        {
          "id": "ah_lab",
          "label": "The Dating & Anatomy Laboratory"
        }
      ]
    },
    "what": {
      "title": "What happened",
      "truth": "ah_planted",
      "items": [
        {
          "id": "ah_link",
          "label": "A genuine transitional ancestor was recovered from the gravel"
        },
        {
          "id": "ah_mistake",
          "label": "An amateur honestly combined unrelated specimens by mistake"
        },
        {
          "id": "ah_planted",
          "label": "A filed, stained composite was deliberately planted as one find"
        }
      ]
    }
  },
  "READING_ORDER": [
    "ah_foreman",
    "ah_tech",
    "ah_registrar"
  ],
  "CHARACTERS": {
    "ah_tech": {
      "name": "Lab Tech Oona",
      "role": "Dating-laboratory technician",
      "face": "🧪",
      "badge": "O",
      "legend": "the comparative chemistry",
      "hint": "The skull and jaw have incompatible burial histories, and the jaw’s stain covers recent filing marks.",
      "reading": "ah_oakley"
    },
    "ah_foreman": {
      "name": "Dig Foreman Cray",
      "role": "Excavation foreman",
      "face": "⛏",
      "badge": "C",
      "legend": "the spoil record",
      "hint": "Both prize pieces appeared without witnesses after Silas Fenn had private access to the conveyor.",
      "reading": "ah_pittrivers"
    },
    "ah_registrar": {
      "name": "Registrar Pell",
      "role": "Museum provenance registrar",
      "face": "🗂",
      "badge": "P",
      "legend": "the acquisition trail",
      "hint": "Purchases, tool marks, notes, and access records join the altered pieces to Fenn.",
      "reading": "ah_weiner"
    }
  },
  "TOPICS": {
    "ah_pittrivers": {
      "sci": "Augustus Pitt Rivers (1827-1900)",
      "topic": "Stratigraphy, typology, and complete excavation records",
      "lede": "Augustus Pitt Rivers insisted that ordinary objects and exact find positions matter as much as spectacular treasures.",
      "no": 1,
      "profile": "Augustus Henry Lane Fox Pitt Rivers was a British army officer, collector, and archaeologist who helped make excavation more systematic in the nineteenth century. Military work with firearms encouraged him to arrange objects by gradual changes in form, an approach that influenced archaeological typology. After inheriting a large estate, he excavated sites in southern England and published unusually detailed plans, sections, catalogs, and illustrations.\n\nPitt Rivers argued that excavators should record common artifacts, not only beautiful or valuable finds. Context gives an object meaning: its layer, association, orientation, and relationship to features around it. A spectacular specimen without secure provenance may be scientifically weaker than a broken pot whose exact position is documented.\n\nHis methods were not modern in every respect, but the principle of context remains fundamental. Gravel pits are especially challenging because extraction, slumping, redeposition, and collecting can mix materials from different ages. A fossil said to come from one layer needs witnesses, field notes, sediment attached to it, and ideally independent recovery.\n\nThe Cranmoor pieces lack that chain. Dig Foreman Cray worked the pit for years and never saw the skull or jaw emerge from an undisturbed face. Each appeared loose on spoil after Silas Fenn had been alone near the conveyor. Sediment packed into cavities differs from the claimed bed, and no tool photograph or coordinate fixes either find. Pitt Rivers does not prove fraud merely from poor documentation; amateurs can make honest mistakes. But he establishes the first decisive break: the “discovery” was not excavated. It entered the archaeological record through one person’s unsupported placement, at the gravel pit where context should have existed and did not.",
      "frame": "Unrolls the pit section and leaves two blank spaces where find coordinates should be. “A fossil without context is a story. Here the story begins after one man handled the spoil.”",
      "q": [
        {
          "q": "Why did Pitt Rivers record ordinary objects as well as spectacular finds?",
          "o": [
            {
              "t": "Complete context and variation reveal chronology better than exceptional finds alone.",
              "v": "expert",
              "fb": "Systematic recording lets associations and gradual change carry historical meaning."
            },
            {
              "t": "A spectacular object needs less documentation because its importance is already self-evident.",
              "v": "danger",
              "fb": "Extraordinary claims require stronger provenance, not exemption from it."
            },
            {
              "t": "Common objects were easier to sell and financed the excavation of important finds.",
              "v": "partial",
              "fb": "His purpose was scientific completeness rather than commercial funding through common finds."
            },
            {
              "t": "He treated aesthetic quality as the most reliable indicator of archaeological age.",
              "v": "wrong",
              "fb": "Pitt Rivers moved archaeology away from beauty as the sole criterion of importance."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — lead",
            "text": "The skull and jaw have no witnessed coordinates or undisturbed layer at the Gravel Pit & Dig."
          }
        },
        {
          "q": "What most weakens the claim that the Cranmoor pieces came from one ancient layer?",
          "o": [
            {
              "t": "The discoverer was an amateur, so the objects should be fraudulent by definition.",
              "v": "danger",
              "fb": "Amateur status is not evidence; access and missing context are the relevant facts."
            },
            {
              "t": "No witnessed recovery or coordinates connect either piece to the undisturbed deposit.",
              "v": "expert",
              "fb": "Missing provenience prevents the claimed association from being tested independently."
            },
            {
              "t": "The skull and jaw were found on different days within the same excavation month.",
              "v": "partial",
              "fb": "Separate discovery dates can be legitimate if both contexts are securely documented."
            },
            {
              "t": "The pit contained gravel rather than the fine cave sediment preferred by museums.",
              "v": "wrong",
              "fb": "Fossils can occur in gravel; sediment type alone does not invalidate the site."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — lead",
            "text": "Both pieces appeared loose on spoil only after Fenn had access, with sediment inconsistent with the claimed bed."
          }
        },
        {
          "q": "Who controlled the only undocumented moments when both prize pieces appeared?",
          "o": [
            {
              "t": "The museum keeper who accepted and catalogued the finds after they reached the gallery.",
              "v": "partial",
              "fb": "Acceptance after discovery may show weak scrutiny without explaining how the objects appeared."
            },
            {
              "t": "The site geologist who mapped the gravel units before either object appeared.",
              "v": "wrong",
              "fb": "Prior geological mapping does not create or place the later specimens."
            },
            {
              "t": "The amateur finder who alone placed both objects into the recorded discovery chain.",
              "v": "expert",
              "fb": "Exclusive access and authorship of the unsupported context make Fenn the focal actor."
            },
            {
              "t": "The foreman, because supervising the pit makes him responsible for any hoax at that site.",
              "v": "danger",
              "fb": "Supervision creates duties, but the specific access record identifies who handled both appearances."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — lead",
            "text": "Silas Fenn was alone beside the spoil before each object was announced and supplied every claim about its layer."
          }
        }
      ]
    },
    "ah_oakley": {
      "sci": "Kenneth Oakley (1911-1981)",
      "topic": "Fluorine testing and the exposure of Piltdown",
      "lede": "Kenneth Oakley compared the chemistry of bones from one deposit and showed that Piltdown’s skull and jaw had not aged together.",
      "no": 2,
      "profile": "Kenneth Page Oakley was a British geologist and paleontologist at the Natural History Museum in London. He became central to the exposure of the Piltdown hoax, a supposed early human assembled from a human skull and an orangutan jaw. The pieces had been accepted for decades partly because they seemed to fit expectations about a large-brained British ancestor.\n\nBuried bone gradually exchanges chemicals with groundwater. Fluorine can accumulate while nitrogen from collagen declines, although rates vary with local conditions. Oakley used fluorine testing to compare bones claimed to come from the same deposit. The method does not yield a universal calendar age, but bones buried together in the same environment should show broadly compatible chemical histories.\n\nIn 1949 Oakley’s tests indicated that the Piltdown remains were much younger than claimed. Later work with Joseph Weiner and Wilfrid Le Gros Clark combined improved chemical tests with anatomical examination. The skull and jaw differed in age, the teeth had been filed, and the material had been artificially stained.\n\nCranmoor produces the same kind of contradiction. The skull has substantial fluorine uptake and low nitrogen consistent with long burial in the gravel system. The jaw retains far more nitrogen and much less fluorine. Its stain is superficial and penetrates recent scratches, while the skull’s coloration follows old mineral infiltration. These results do not merely show uncertainty in absolute dating; they show that the pieces did not share one burial history. Oakley’s comparative logic rules out the “missing link” as a natural association. It also weighs against an innocent anatomical muddle, because filing and fresh stain are actions performed to make unlike pieces look related.",
      "frame": "Places fluorine and nitrogen results beside polished tooth surfaces. “The numbers do not need an exact birthday. They show these bones did not lie together.”",
      "q": [
        {
          "q": "What can a fluorine comparison establish most reliably?",
          "o": [
            {
              "t": "The exact calendar year when any fossil was deposited in every soil type.",
              "v": "partial",
              "fb": "Uptake rates vary, so the test does not supply a universal exact date."
            },
            {
              "t": "The biological species of a specimen from its mineral content alone.",
              "v": "wrong",
              "fb": "Taxonomy requires anatomy or genetics rather than fluorine concentration alone."
            },
            {
              "t": "That any chemically different bones were deliberately joined by the excavator.",
              "v": "danger",
              "fb": "Different histories establish mismatch; intent requires additional evidence of alteration and access."
            },
            {
              "t": "Whether bones from the same environment have broadly compatible burial histories.",
              "v": "expert",
              "fb": "Fluorine is strongest as a relative comparison within the same depositional environment."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — corroboration",
            "text": "The skull and jaw show incompatible burial chemistry, and the jaw’s stain covers recent filing scratches."
          }
        },
        {
          "q": "Why do superficial stain and filed teeth matter beyond the age mismatch?",
          "o": [
            {
              "t": "They are deliberate alterations that make unlike specimens appear to belong together.",
              "v": "expert",
              "fb": "Filing and artificial coloration transform a mismatch into evidence of purposeful construction."
            },
            {
              "t": "They are normal changes produced by long burial in moving gravel deposits.",
              "v": "wrong",
              "fb": "Burial abrasion and mineral staining do not create controlled filing facets with fresh stain."
            },
            {
              "t": "They prove every person who later handled the jaw participated in the museum deception.",
              "v": "danger",
              "fb": "Alteration identifies a fraudulent act, while authorship still depends on provenance and opportunity."
            },
            {
              "t": "They show the museum damaged the specimen during later cleaning and display.",
              "v": "partial",
              "fb": "Treatment records and scratch staining place the alterations before museum cleaning."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — corroboration",
            "text": "The modifications were made before Fenn presented the jaw and were intended to imitate the skull’s age and human wear."
          }
        },
        {
          "q": "Where should the chemical results be connected back to the discovery claim?",
          "o": [
            {
              "t": "To unrelated fossils from distant regions with different groundwater chemistry.",
              "v": "wrong",
              "fb": "Different soils can produce different uptake and are poor direct comparators."
            },
            {
              "t": "To the claimed pit layers and the actual circumstances in which each piece appeared.",
              "v": "expert",
              "fb": "Relative chemistry and field provenance must be interpreted together."
            },
            {
              "t": "Nowhere, because laboratory numbers replace the need for archaeological context.",
              "v": "danger",
              "fb": "Scientific tests become stronger when their sampling and archaeological contexts are explicit."
            },
            {
              "t": "To the museum gallery label written after public excitement had already begun.",
              "v": "partial",
              "fb": "A gallery label records the claim but not the depositional environment that would test it."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — corroboration",
            "text": "Laboratory mismatch gains meaning when tied to the unsupported spoil appearances at the Gravel Pit & Dig."
          }
        }
      ]
    },
    "ah_weiner": {
      "sci": "Joseph Weiner (1915-1982)",
      "topic": "Anatomy, provenance, and the Piltdown hoax",
      "lede": "Joseph Weiner joined chemistry, anatomy, tool marks, and historical access to show that Piltdown was manufactured rather than merely misclassified.",
      "no": 3,
      "profile": "Joseph Sidney Weiner was a South African-born physical anthropologist who worked at Oxford. In the early 1950s, doubts about Piltdown led him to collaborate with Kenneth Oakley and anatomist Wilfrid Le Gros Clark. Their 1953 investigation became a classic demonstration of multidisciplinary fraud detection.\n\nThey reexamined the anatomy and surfaces instead of accepting decades of authority. The jaw belonged to an orangutan, not an early human. Teeth had been filed to imitate human wear. Chemical tests showed inconsistent ages, and artificial staining made the pieces look as though they shared the same deposit. The investigators also reconstructed how expectations had protected the fraud: scholars wanted a large-brained early ancestor and were reluctant to disturb a famous national discovery.\n\nA hoax inquiry must separate proof of fabrication from identification of the fabricator. Tool marks and mismatched specimens show what happened. Chain of custody, access, handwriting, purchases, correspondence, and timing identify who could have assembled and planted the object. Fame, rivalry, or embarrassment are motives, not substitutes for that chain.\n\nAt Cranmoor, the final records converge on Silas Fenn. A supplier invoice under his alias lists an ape jaw and geological stain. Microscopic striations match a file recovered from his workshop. His notebook sketches the pit’s conveyor schedule, and both discoveries occur during unsupervised intervals he marked. The museum keeper promoted the find too quickly and the geologist trusted the reported context, but neither possessed the materials or controlled both appearances. Weiner’s lesson completes the case: the artifact was not the discovery of the century and not an honest amateur confusion. It was a planted composite, altered to exploit scientific expectation and inserted where its missing context would be hardest to challenge.",
      "frame": "Sets the supplier invoice, tool-mark comparison, and pit schedule beside the composite. “Fabrication tells us what. Access and preparation tell us who.”",
      "q": [
        {
          "q": "What combination exposed Piltdown as a manufactured composite?",
          "o": [
            {
              "t": "Earlier scholars felt embarrassed, which was treated as sufficient evidence of fraud.",
              "v": "danger",
              "fb": "Scholarly embarrassment is a consequence, not evidence about the specimen."
            },
            {
              "t": "A single expert’s visual dislike of the skull shape, jaw form, and heavy brow ridge.",
              "v": "partial",
              "fb": "Visual skepticism can prompt testing but does not establish fabrication alone."
            },
            {
              "t": "Chemical mismatch, anatomical conflict, tool marks, staining, and provenance failure.",
              "v": "expert",
              "fb": "Independent scientific and historical indicators joined to exclude natural association and mistake."
            },
            {
              "t": "A radiocarbon date proving every component was made from plaster in modern times.",
              "v": "wrong",
              "fb": "Piltdown used real bone components rather than an entirely plaster object."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — decisive",
            "text": "Incompatible ages, orangutan anatomy, filed teeth, artificial stain, and false context all converge on deliberate construction."
          }
        },
        {
          "q": "Which chain most directly identifies Silas Fenn as the maker and planter?",
          "o": [
            {
              "t": "The geologist’s scientific reputation, because trusted experts are harder to suspect.",
              "v": "danger",
              "fb": "Reputation should neither convict nor protect a person without a specific evidentiary chain."
            },
            {
              "t": "His public enthusiasm and repeated insistence that the skull would change history.",
              "v": "partial",
              "fb": "Enthusiasm provides motive or expectation but not the means and sequence of manufacture."
            },
            {
              "t": "The museum keeper’s decision to place the object on display before complete testing.",
              "v": "wrong",
              "fb": "Premature display shows poor judgment after discovery, not authorship of the hoax."
            },
            {
              "t": "Materials purchase, matching tool marks, planning notes, and timed opportunity.",
              "v": "expert",
              "fb": "Preparation evidence and opportunity join the fraudulent object to one actor."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — decisive",
            "text": "His purchase alias, matching file, preparation notes, and exclusive access connect assembly to both spoil appearances."
          }
        },
        {
          "q": "Why is the Gravel Pit the decisive culmination rather than only the laboratory?",
          "o": [
            {
              "t": "That is where the altered pieces acquired their fabricated discovery context.",
              "v": "expert",
              "fb": "The fraudulent act became archaeology when the object was inserted into a false provenience."
            },
            {
              "t": "The pit is older than the museum and therefore more historically important.",
              "v": "partial",
              "fb": "Age of the location does not determine where the causal act culminated."
            },
            {
              "t": "All chemical and anatomical tests were physically performed beside the conveyor.",
              "v": "wrong",
              "fb": "The decisive tests occurred in laboratories, but they exposed a context created at the pit."
            },
            {
              "t": "A laboratory result loses relevance once an artifact has been announced in the field.",
              "v": "danger",
              "fb": "Field and laboratory evidence work together; neither automatically cancels the other."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — decisive",
            "text": "Fenn converted a prepared composite into an archaeological claim by placing it on spoil and supplying the false layer history."
          }
        }
      ]
    }
  },
  "story": [
    "<b>A skull and jaw announced as a missing link appeared loose on Cranmoor’s spoil rather than in a witnessed excavation layer.</b>",
    "Lab Tech Oona can compare burial histories. Dig Foreman Cray holds the field-access record. Registrar Pell can connect purchases, tools, and notes to the acquisition chain.",
    "The pieces may form a genuine ancestor, an honest amateur mix-up, or a deliberately altered composite planted to acquire archaeological context.",
    "Nine clues move from missing provenance through relative dating and anatomy to the person who prepared and placed the find."
  ],
  "endings": {
    "overclaimWhat": "ah_link",
    "dismissalWhat": "ah_mistake",
    "win": {
      "expertTitle": "The Composite Planted in the Gravel",
      "expert": [
        "You connect Silas Fenn, the Gravel Pit & Fabricated Find Context, and a filed, stained composite deliberately planted as one discovery. Context failure, burial chemistry, anatomy, tool marks, purchases, and access all converge.",
        "The object was not a missing link, and it was not an innocent amateur muddle. Real bones of different histories were modified and inserted into a false archaeological context to exploit scientific expectation."
      ],
      "soundTitle": "The Cranmoor Hoax",
      "sound": [
        "Your accusation identifies Fenn, the gravel pit, and the planted composite.",
        "Some purchase or tool-mark details remain incomplete, but the mismatched histories and access record support the verdict."
      ],
      "namedTitle": "Right Hoax, Limited Provenance",
      "named": [
        "You select the correct WHO, WHERE, and WHAT.",
        "The conclusion is right, although missed clues leave parts of the fabrication or planting sequence less firmly established."
      ]
    },
    "overclaim": {
      "title": "The Pieces Never Shared One Burial History",
      "body": [
        "Fluorine, nitrogen, anatomy, and surface treatment show that the skull and jaw are unrelated components.",
        "The missing-link interpretation depends on an association that was manufactured rather than excavated."
      ]
    },
    "dismissal": {
      "title": "This Was More Than an Honest Muddle",
      "body": [
        "Filed teeth, artificial stain, supply purchases, and planned access show deliberate preparation and placement.",
        "An accidental combination cannot explain the coordinated alterations used to imitate one ancient specimen."
      ]
    },
    "wrongNames": {
      "title": "The Hoax, Misassigned",
      "body": [
        "You recognize the planted composite but place it away from Fenn and the gravel-pit context where prepared objects became a false discovery."
      ]
    }
  }
}
};
