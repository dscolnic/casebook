module.exports = { PACK: {
  "id": "c_arch",
  "title": "The Cranmoor Skull",
  "discipline": "Archaeology & Scientific Dating",
  "teaser": "A celebrated gravel-pit fossil appears to join skull and jaw in one early human. Is it a genuine ancestor, an innocent mixture of nearby bones, or a specimen deliberately altered and placed?",
  "overclaimTag": "a genuine missing-link fossil",
  "truthTag": "an altered composite with a manufactured context",
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
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before the inquiry closes. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The place you test determines the dossier you receive, and the conversation costs one day.",
  "overclaimTease": "A famous shape can suggest ancestry; only context, component ages, and traces of alteration can show whether the pieces ever belonged together.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "ah_amateur",
      "items": [
        {
          "id": "ah_amateur",
          "label": "Silas Fenn — the amateur antiquary who 'found' it"
        },
        {
          "id": "ah_keeper",
          "label": "Dr. Marrick — the museum keeper"
        },
        {
          "id": "ah_geologist",
          "label": "Prof. Aldous — the site geologist"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "ah_lab",
      "items": [
        {
          "id": "ah_pit",
          "label": "The Gravel Pit & Dig"
        },
        {
          "id": "ah_gallery",
          "label": "The Museum Gallery"
        },
        {
          "id": "ah_lab",
          "label": "The Dating Laboratory"
        }
      ]
    },
    "what": {
      "title": "What exactly is the Cranmoor specimen?",
      "truth": "ah_planted",
      "items": [
        {
          "id": "ah_link",
          "label": "A genuine archaic skull and jaw from one early human."
        },
        {
          "id": "ah_mistake",
          "label": "A mixed find assembled innocently from nearby fossil pieces."
        },
        {
          "id": "ah_planted",
          "label": "A modern ape jaw altered and planted beside an older skull."
        }
      ]
    }
  },
  "PLACES": {
    "ah_pit": {
      "name": "The Gravel Pit & Dig",
      "xy": [
        140,
        90
      ]
    },
    "ah_gallery": {
      "name": "The Museum Gallery",
      "xy": [
        330,
        240
      ]
    },
    "ah_lab": {
      "name": "The Dating Laboratory",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "ah_pit",
      "ah_gallery"
    ],
    [
      "ah_gallery",
      "ah_lab"
    ]
  ],
  "CHARACTERS": {
    "ah_tech": {
      "name": "Lab Tech Oona",
      "role": "Dating-lab technician",
      "face": "🧪",
      "badge": "O",
      "legend": "the laboratory",
      "hint": "Runs the fluorine and nitrogen tests; the jaw and the skull are nowhere near the same age."
    },
    "ah_foreman": {
      "name": "Dig Foreman Cray",
      "role": "Excavation foreman",
      "face": "⛏",
      "badge": "C",
      "legend": "the gravel pit",
      "hint": "Dug the pit for years; the prize pieces only ever turned up when one man was watching."
    },
    "ah_registrar": {
      "name": "Registrar Pell",
      "role": "Museum registrar",
      "face": "🗂",
      "badge": "P",
      "legend": "the gallery",
      "hint": "Keeps the accession records; the find has no honest chain of discovery."
    }
  },
  "TOPICMAP": {
    "ah_pit": {
      "ah_tech": [
        "ah_petrie"
      ],
      "ah_foreman": [
        "ah_schliemann"
      ],
      "ah_registrar": [
        "ah_wheeler"
      ]
    },
    "ah_gallery": {
      "ah_tech": [
        "ah_garrod"
      ],
      "ah_foreman": [
        "ah_douglass"
      ],
      "ah_registrar": [
        "ah_weiner"
      ]
    },
    "ah_lab": {
      "ah_tech": [
        "ah_grahameclark"
      ],
      "ah_foreman": [
        "ah_nelson"
      ],
      "ah_registrar": [
        "ah_suess"
      ]
    }
  },
  "TOPICS": {
    // cell: Lab Tech Oona @ The Gravel Pit & Dig
    "ah_petrie": {
      "sci": "Flinders Petrie (1853–1942)",
      "topic": "Seriation & scientific excavation",
      "lede": "Flinders Petrie entered archaeology with an engineer’s appetite for measurement.",
      "no": 1,
      "profile": "Flinders Petrie entered archaeology with an engineer’s appetite for measurement. Working in Egypt, he recorded pottery, small finds, architecture, and deposit relationships with unusual precision for his time. His sequence dating arranged changing pottery forms into relative order, allowing sites without written dates to be compared through recurring combinations of styles. The method depended less on a spectacular object than on many ordinary fragments kept in their excavated groups.\n\nPetrie understood that excavation destroys the arrangement it studies. A notebook entry, plan, section, bag label, and soil description preserve different parts of a context after the trench is gone. If an object is separated from those records, later researchers can inspect the object but cannot reliably reconstruct its association. Seriation also requires representative collections; selecting only attractive pieces distorts the frequency pattern that gives the method power.\n\nThe Cranmoor specimen therefore raises a Petrie-style question before any anatomical claim: where, exactly, were the skull and jaw recovered? Their matrix should match the recorded gravel layer, and the original field notes should identify depth, coordinates, nearby fauna, and the people present. A label written after publicity began cannot substitute for a contemporaneous find record.\n\nContext alone will not prove deliberate planting. Natural disturbance can move fossils, and an eager excavator can record badly. Yet a specimen said to be one individual should have a coherent depositional history. Petrie’s discipline makes the missing context visible and tells investigators which later laboratory comparisons must carry more weight. The surviving bags and notebooks can also reveal whether routine fragments from the alleged pocket were retained or quietly excluded after the headline find.",
      "frame": "Spreads the original bag labels beside a plan of the gravel pit. “Sequence begins with where each ordinary fragment was actually found.”",
      "q": [
        {
          "q": "Petrie’s sequence dating becomes reliable only when which evidence is preserved?",
          "o": [
            {
              "t": "Pottery frequencies remain grouped by their excavated contexts and levels.",
              "v": "expert",
              "fb": "Seriation depends on representative groups whose frequencies can be compared across contexts."
            },
            {
              "t": "Distinctive vessels are photographed, although routine fragments lose their contexts.",
              "v": "partial",
              "fb": "Photographs help, but selective retention removes the ordinary material that defines the sequence."
            },
            {
              "t": "The finest objects are ordered by visual elegance and collector preference.",
              "v": "wrong",
              "fb": "Aesthetic order is not a chronological measure and cannot replace excavated association."
            },
            {
              "t": "A famous identification is published before the deposit groups are compared.",
              "v": "danger",
              "fb": "Publicity fixes a narrative before the comparative sequence has been tested."
            }
          ]
        },
        {
          "q": "The Cranmoor jaw has a label but no original coordinate. What can Petrie’s method establish?",
          "o": [
            {
              "t": "The claimed association is unverified because its depositional relationship was not recorded.",
              "v": "expert",
              "fb": "The object can be studied, but the lost context prevents the label from proving association."
            },
            {
              "t": "The jaw may still be old, although the skull connection remains weakly documented.",
              "v": "partial",
              "fb": "Antiquity remains possible; the specific link to the skull is what the missing record weakens."
            },
            {
              "t": "The label proves both pieces came from the same layer and individual; in context.",
              "v": "wrong",
              "fb": "A later label is a claim about provenience, not contemporaneous proof of it."
            },
            {
              "t": "Anatomical resemblance should override the missing field record immediately; in context.",
              "v": "danger",
              "fb": "Shape cannot reconstruct the destroyed spatial and stratigraphic relationship."
            }
          ]
        },
        {
          "q": "Which recovery plan would best test whether Cranmoor keeps producing the same association?",
          "o": [
            {
              "t": "Re-excavate under independent supervision while screening and recording every comparable find.",
              "v": "expert",
              "fb": "Independent recovery tests both the deposit and the reliability of the original discovery pattern."
            },
            {
              "t": "Ask the original finder to identify likely pockets, then inspect only promising objects.",
              "v": "partial",
              "fb": "The finder’s experience is useful, but selective searching repeats the original confirmation risk."
            },
            {
              "t": "Search museum drawers for another similar jaw without reviewing their provenience.",
              "v": "wrong",
              "fb": "Similarity without secure context cannot reproduce the claimed archaeological association."
            },
            {
              "t": "Delay controlled work until the specimen’s public importance has been fully promoted.",
              "v": "danger",
              "fb": "Promotion before testing increases pressure to interpret later finds as confirmation."
            }
          ]
        }
      ],
      "whatHint": "Petrie’s sequence dating depends on objects staying with their recorded deposits. Ask whether skull and jaw share a contemporaneous context rather than a label written after discovery."
    },
    // cell: Dig Foreman Cray @ The Gravel Pit & Dig
    "ah_schliemann": {
      "sci": "Heinrich Schliemann (1822–1890)",
      "topic": "Troy & the perils of the eager digger",
      "lede": "Heinrich Schliemann pursued the places described in Homer with extraordinary energy and confidence.",
      "no": 2,
      "profile": "Heinrich Schliemann pursued the places described in Homer with extraordinary energy and confidence. At Hisarlik he drove a deep trench through the mound in search of the city he believed to be Troy. The work exposed important early levels, but it also cut through and removed large portions of later occupation. His celebrated “Priam’s Treasure” was assigned to Homer’s king even though the deposit was far earlier than the traditional setting of the Trojan War.\n\nSchliemann’s career is not a simple warning against ambition. He helped focus attention on a major archaeological site and demonstrated that epic landscapes could be investigated materially. The problem was the way expectation governed excavation. When the desired story comes first, layers that do not fit may be treated as obstruction, and an impressive object can receive a famous name before chronology has been established.\n\nAt Cranmoor, rough digging could explain scratches, broken edges, or displaced gravel. It cannot automatically explain surfaces deliberately reshaped before burial. Investigators should distinguish accidental excavation damage from regular filing on tooth crowns, artificial staining in protected crevices, or tool marks that predate the claimed discovery. Those traces require microscopic comparison rather than a judgment based on dramatic appearance.\n\nSchliemann also teaches the value of independent recovery. If every prize fragment appears only when the same finder is alone, confidence should fall even before fraud is alleged. Re-excavation, controlled screening, and neutral witnesses can test whether the deposit produces comparable material without repeating the original discoverer’s expectations. A controlled return to the pit should therefore be designed to disconfirm the celebrated association, not merely to recover another object that resembles it.",
      "frame": "Turns a raking light across the jaw’s teeth. “A hurried pick leaves one kind of scar; a file used before burial leaves another.”",
      "q": [
        {
          "q": "What is the central methodological warning from Schliemann’s great trench at Hisarlik?",
          "o": [
            {
              "t": "A desired historical story can drive excavation through layers that contradict it.",
              "v": "expert",
              "fb": "Expectation can decide what counts as obstruction and destroy later evidence in the process."
            },
            {
              "t": "Schliemann showed that bold excavation can locate a site, even while later layers are lost.",
              "v": "partial",
              "fb": "Careful object recovery does not restore layers and relationships removed by the trench."
            },
            {
              "t": "Epic texts identify the correct layer even when the material chronology differs.",
              "v": "wrong",
              "fb": "Texts guide questions, but they cannot cancel a deposit’s independent chronology."
            },
            {
              "t": "Spectacular treasure gives the excavator authority to assign names immediately.",
              "v": "danger",
              "fb": "Fame and ownership do not establish the date or identity of a find."
            }
          ]
        },
        {
          "q": "Which mark on the Cranmoor jaw is hardest to explain as rough excavation damage?",
          "o": [
            {
              "t": "Parallel filing across tooth crowns beneath stain that also fills the fresh grooves.",
              "v": "expert",
              "fb": "Regular reshaping followed by applied stain describes work done to make the teeth appear worn."
            },
            {
              "t": "One chipped edge where a pick may have struck the jaw during hurried removal.",
              "v": "partial",
              "fb": "A local chip is compatible with accidental recovery damage and carries little intent evidence."
            },
            {
              "t": "Scattered scratches mixed with gravel abrasion across several exposed surfaces.",
              "v": "wrong",
              "fb": "Irregular abrasion can arise during burial, transport, or excavation without deliberate alteration."
            },
            {
              "t": "A drying crack documented after the specimen had already reached the museum.",
              "v": "danger",
              "fb": "Post-recovery drying damage says nothing about how the jaw entered the deposit."
            }
          ]
        },
        {
          "q": "How should an inquiry respond when every remarkable fossil appeared with one finder alone?",
          "o": [
            {
              "t": "Require independent excavation and a complete custody record before accepting the pattern.",
              "v": "expert",
              "fb": "Independent recovery separates genuine skill from a discovery pattern no one else can reproduce."
            },
            {
              "t": "Treat repeated success as strong evidence that the finder recognizes fossils unusually well.",
              "v": "partial",
              "fb": "Expertise may matter, but concentration of all key finds in one person’s custody needs testing."
            },
            {
              "t": "Accept the discoveries if each object looks compatible with the preferred reconstruction.",
              "v": "wrong",
              "fb": "Compatibility with a theory is not independent evidence for the circumstances of recovery."
            },
            {
              "t": "Give the finder exclusive access so the site’s remaining prizes are recovered quickly.",
              "v": "danger",
              "fb": "Exclusive access removes the very observations needed to evaluate the claim."
            }
          ]
        }
      ],
      "whatHint": "Schliemann’s trench shows how enthusiasm can destroy context, but excavation damage differs from regular filing and applied stain. Examine whether the suspicious marks predate recovery."
    },
    // cell: Registrar Pell @ The Gravel Pit & Dig
    "ah_wheeler": {
      "sci": "Mortimer Wheeler (1890–1976)",
      "topic": "The grid method & stratigraphic rigor",
      "lede": "Mortimer Wheeler made excavation look disciplined because he treated the trench as a visible argument.",
      "no": 3,
      "profile": "Mortimer Wheeler made excavation look disciplined because he treated the trench as a visible argument. His grid system divided a site into squares, often leaving standing baulks between them so vertical sections could be read while horizontal plans were developed. Numbered layers, measured coordinates, and brisk publication helped turn excavation from treasure hunting into a controlled record of sequence.\n\nThe method had limits. Baulks could hide relationships, and later archaeologists often preferred open-area excavation when broad surfaces mattered more than retained walls of sediment. Wheeler’s lasting contribution was not one permanent trench design but insistence that provenience should be recoverable from drawings and records. A claimed location must correspond to a square, depth, interface, and date that existed in the excavation at that moment.\n\nFor Cranmoor, the grid record can test whether the discovery coordinates were written during fieldwork or reconstructed afterward. A point assigned to a square already emptied on the stated date, a depth inconsistent with the surviving section, or handwriting added to a completed plan would weaken the official story. Photographs should show the specimen in place before removal, not merely resting on cleaned gravel.\n\nA disturbed pocket matters as well. If a cut descends from a later surface into older sediment, an object inside the fill is intrusive even when surrounded by ancient gravel. Wheeler’s sections help identify that relationship. They do not by themselves decide whether intrusion was accidental or deliberate, but they prevent an intrusive object from borrowing the age of the layer it penetrated.",
      "frame": "Pins the claimed coordinates over the day-by-day grid. “A discovery cannot occupy a square that the crew had already emptied.”",
      "q": [
        {
          "q": "Why did Wheeler leave standing baulks between excavation squares?",
          "o": [
            {
              "t": "Their exposed sections preserved vertical relationships while adjacent areas were excavated.",
              "v": "expert",
              "fb": "The sections made layer boundaries and later cuts visible after surrounding sediment was removed."
            },
            {
              "t": "They prevented every artifact from moving horizontally after it entered the soil.",
              "v": "partial",
              "fb": "Baulks preserve profiles; they cannot stop ancient disturbance or all modern movement."
            },
            {
              "t": "They guaranteed that each square represented a single period of occupation; in context.",
              "v": "wrong",
              "fb": "Deposits can cross squares and contain several episodes despite the grid."
            },
            {
              "t": "They allowed valuable finds to remain hidden until the final public excavation day.",
              "v": "danger",
              "fb": "A recording device is not a strategy for staging discoveries."
            }
          ]
        },
        {
          "q": "Which discrepancy most strongly suggests that Cranmoor’s coordinates were added later?",
          "o": [
            {
              "t": "The plotted point lies in a square documented as empty before the stated discovery date.",
              "v": "expert",
              "fb": "A find cannot be recovered from sediment that the daily record says was already removed."
            },
            {
              "t": "The coordinate uses a different pencil from several routine measurements on the plan.",
              "v": "partial",
              "fb": "Different writing materials invite scrutiny but do not by themselves prove a later addition."
            },
            {
              "t": "The fossil was found near the edge rather than the center of an excavation square.",
              "v": "wrong",
              "fb": "Objects commonly occur near boundaries; edge position is not suspicious without stratigraphic conflict."
            },
            {
              "t": "The plan was redrawn neatly for publication after fieldwork had ended; in context.",
              "v": "danger",
              "fb": "Publication drawings may be legitimate copies if they faithfully preserve the original record."
            }
          ]
        },
        {
          "q": "A narrow pocket cuts downward from the modern surface into old gravel. What follows?",
          "o": [
            {
              "t": "Material inside the pocket is intrusive and cannot inherit the age of adjacent gravel.",
              "v": "expert",
              "fb": "A later cut changes the stratigraphic position of its fill regardless of the gravel beside it."
            },
            {
              "t": "Everything below the surface is ancient because the surrounding matrix is ancient.",
              "v": "partial",
              "fb": "Old surrounding sediment does not date objects introduced through a younger feature."
            },
            {
              "t": "The pocket proves intentional planting before its fill and contents are fully examined.",
              "v": "wrong",
              "fb": "Intrusion establishes later entry, not the motive or person responsible for it."
            },
            {
              "t": "The entire gravel layer should be discarded as chronologically useless; in context.",
              "v": "danger",
              "fb": "One cut can be isolated and studied without abandoning the rest of the sequence."
            }
          ]
        }
      ],
      "whatHint": "Wheeler’s grid makes a find location retraceable. A coordinate that lands in an already emptied square or a later cut would not belong to the ancient layer beside it."
    },
    // cell: Lab Tech Oona @ The Museum Gallery
    "ah_garrod": {
      "sci": "Dorothy Garrod (1892–1968)",
      "topic": "Palaeolithic prehistory & method",
      "lede": "Dorothy Garrod built long Palaeolithic sequences from caves in the Levant, especially the Mount Carmel sites.",
      "no": 4,
      "profile": "Dorothy Garrod built long Palaeolithic sequences from caves in the Levant, especially the Mount Carmel sites. Her teams recovered stone tools, animal remains, sediments, and human fossils from layered deposits that documented cultural and environmental change over immense spans of time. In 1939 she became the first woman to hold a professorship at Cambridge, serving as Disney Professor of Archaeology.\n\nCave excavation taught Garrod that a fossil is part of an assemblage. Sediment texture, animal species, tool types, burning, weathering, and spatial position all help establish whether finds belong to the same episode. A skull and jaw from one individual need not touch when found, but their preservation should make sense within one depositional setting. Different mineral staining, abrasion, or associated fauna can indicate separate histories.\n\nThe Cranmoor claim should therefore be tested against its gravel community. Analysts can compare sediment trapped inside cavities, adhering mineral grains, surface polish, and the species recovered from the same level. If the skull reflects long burial in one chemical environment while the jaw retains a different matrix and weathering pattern, anatomical fit cannot make them contemporaneous.\n\nGarrod’s method also guards against a false choice. Components of different history might meet through natural reworking rather than fraud. The stronger question is whether the deposit shows ordinary mixing—rounded surfaces, broad distribution, and other displaced bones—or a singular combination with altered surfaces and a suspicious recovery record. Assemblage evidence narrows the possibilities before motive enters the inquiry. Microscopic sediment retained in protected cavities is especially useful because it is harder to exchange casually than loose gravel brushed onto an exposed surface.",
      "frame": "Sets sediment from the skull cavity beside grains adhering to the jaw. “One burial should carry one environmental history.”",
      "q": [
        {
          "q": "What made Garrod’s long cave sequences stronger than a collection of isolated fossils?",
          "o": [
            {
              "t": "Tools, fauna, sediments, and human remains changed together through recorded layers.",
              "v": "expert",
              "fb": "Converging components turned a vertical deposit into an environmental and cultural history."
            },
            {
              "t": "Each important fossil was assigned to the culture that best matched its appearance.",
              "v": "partial",
              "fb": "Visual matching without layer evidence cannot establish which materials belong together."
            },
            {
              "t": "The deepest specimen defines the earliest occupation despite later cuts and disturbance.",
              "v": "wrong",
              "fb": "Depth alone can be reversed by cuts, disturbance, or sloping deposits."
            },
            {
              "t": "Rare objects were removed from ordinary debris so their significance stayed clear.",
              "v": "danger",
              "fb": "Ordinary remains provide the comparisons that make exceptional fossils interpretable."
            }
          ]
        },
        {
          "q": "Which comparison best tests whether Cranmoor’s skull and jaw shared one burial environment?",
          "o": [
            {
              "t": "Match adhering sediment, mineral staining, weathering, and associated fauna on both pieces.",
              "v": "expert",
              "fb": "A shared depositional history should leave compatible physical and assemblage signatures."
            },
            {
              "t": "Compare only the reconstructed facial profile after the jaw is fitted to the skull.",
              "v": "partial",
              "fb": "An anatomical fit can be suggestive, but it does not test burial chemistry or context."
            },
            {
              "t": "Ask whether both pieces have acquired a similar museum varnish since discovery.",
              "v": "wrong",
              "fb": "Later treatment may make surfaces look alike while concealing their original histories."
            },
            {
              "t": "Use the discoverer’s memory of color as the primary environmental record; in context.",
              "v": "danger",
              "fb": "Memory is less reliable than retained sediment and documented associated material."
            }
          ]
        },
        {
          "q": "What pattern would favor natural reworking over one specially assembled specimen?",
          "o": [
            {
              "t": "Many fossils show similar abrasion and age mixing across a broad sedimentary deposit.",
              "v": "expert",
              "fb": "Water reworking usually affects an assemblage, leaving distributed sorting and wear."
            },
            {
              "t": "Only the celebrated skull and jaw differ, and both appeared in one small pocket.",
              "v": "partial",
              "fb": "A singular concentration is less consistent with broad natural mixing."
            },
            {
              "t": "The jaw bears regular tool marks while nearby animal bones remain unmodified.",
              "v": "wrong",
              "fb": "Purposeful modification is not a normal product of transport in gravel."
            },
            {
              "t": "All associated material was discarded before anyone could compare preservation.",
              "v": "danger",
              "fb": "Discarding the comparison material prevents the natural-process hypothesis from being tested."
            }
          ]
        }
      ],
      "whatHint": "Garrod’s cave sequences compare sediment, fauna, and preservation. Components from one burial should make sense within the same environmental assemblage."
    },
    // cell: Dig Foreman Cray @ The Museum Gallery
    "ah_douglass": {
      "sci": "A. E. Douglass (1867–1962)",
      "topic": "Dendrochronology: tree-ring dating",
      "lede": "A.",
      "no": 5,
      "profile": "A. E. Douglass was an astronomer searching for links between solar activity and climate when he discovered that tree rings could be matched across specimens. Wide and narrow rings form patterns shaped by regional growing conditions. By overlapping those patterns among living trees, old beams, and archaeological timbers, he created master chronologies extending far beyond the life of any single tree.\n\nDendrochronology works through cross-dating, not simple ring counting. A missing ring, a locally suppressed ring, or a reused timber can mislead anyone who studies one sample alone. Confidence comes when a distinctive sequence matches at multiple positions and independent specimens converge on the same calendar years. Douglass’s broader lesson is that components claimed to share one history should agree when dated by independent patterns.\n\nCranmoor contains no useful tree-ring sequence in the fossil itself, but the logic transfers directly. The skull, jaw, adhering sediment, and any associated organic material should occupy overlapping chronological ranges. Chemical dating, radiocarbon where appropriate, and comparative preservation can each carry uncertainty; investigators should ask whether those ranges overlap rather than treating one point estimate as exact.\n\nA genuine individual should not require one component’s date to be ignored. An accidental mixed find can produce incompatible ages without human intervention. Deliberate assembly becomes more plausible only when age mismatch is joined by alteration and a manufactured context. Douglass therefore supplies a chronology test, not a verdict: build independent timelines, look for overlap, and resist forcing separate sequences into one desired date. Agreement among methods matters more than a single impressive date, especially when the components have passed through different storage and treatment histories.",
      "frame": "Draws two uncertain date ranges on transparent strips. “Do they overlap, or are we forcing separate clocks to agree?”",
      "q": [
        {
          "q": "What distinguishes Douglass’s cross-dating from merely counting rings?",
          "o": [
            {
              "t": "Distinctive ring patterns are overlapped across independent trees and known chronologies.",
              "v": "expert",
              "fb": "Pattern matching corrects for missing or locally suppressed rings and extends the chronology."
            },
            {
              "t": "The widest ring is treated as the first year because growth begins strongly; in context.",
              "v": "partial",
              "fb": "Ring width varies with conditions; one dramatic ring cannot anchor an entire sequence."
            },
            {
              "t": "Every timber is assumed to contain one visible ring for each calendar year; in context.",
              "v": "wrong",
              "fb": "Trees can omit or blur rings, so simple counting can shift dates."
            },
            {
              "t": "A building’s traditional date fixes the ring sequence before independent matching can begin.",
              "v": "danger",
              "fb": "Historical expectation must be tested against the sequence rather than fixing it."
            }
          ]
        },
        {
          "q": "The skull and jaw return non-overlapping age ranges. What does Douglass’s logic permit?",
          "o": [
            {
              "t": "Reject one-individual status while leaving accident and deliberate assembly to other evidence.",
              "v": "expert",
              "fb": "Independent timelines can disprove shared origin without identifying how the pieces were joined."
            },
            {
              "t": "Conclude fraud immediately because components of different age can never meet naturally.",
              "v": "partial",
              "fb": "Natural reworking can mix ages, so chronology alone does not establish intent."
            },
            {
              "t": "Average the two dates so the reconstructed specimen keeps a single age; in context.",
              "v": "wrong",
              "fb": "A mean date describes neither component and hides the incompatibility."
            },
            {
              "t": "Prefer the component whose date better fits the expected human-evolution story; in context.",
              "v": "danger",
              "fb": "Narrative preference cannot decide which measurement to ignore."
            }
          ]
        },
        {
          "q": "Which dating result would most strengthen the claim that the components share one history?",
          "o": [
            {
              "t": "Several suitable samples yield overlapping calibrated ranges under independent preparation.",
              "v": "expert",
              "fb": "Overlap from independent samples is stronger than one result that combines the components."
            },
            {
              "t": "One uncalibrated measurement from mixed scrapings falls near the desired period.",
              "v": "partial",
              "fb": "A mixed sample can average different histories and conceal disagreement."
            },
            {
              "t": "A laboratory repeats the same contaminated extract and obtains the same number.",
              "v": "wrong",
              "fb": "Repeatability of contaminated preparation does not create accuracy."
            },
            {
              "t": "The skull date is precise, while the jaw is left untested to preserve material.",
              "v": "danger",
              "fb": "Avoiding the decisive component leaves the shared-history claim incomplete."
            }
          ]
        }
      ],
      "whatHint": "Douglass’s cross-dating asks whether independent timelines overlap. Date skull and jaw separately before treating anatomical proximity as one life history."
    },
    // cell: Registrar Pell @ The Museum Gallery
    "ah_weiner": {
      "sci": "Joseph Weiner (1915–1982)",
      "topic": "The exposure of the Piltdown hoax",
      "lede": "Joseph Weiner helped expose the Piltdown fossil as a deliberate fraud in 1953, working with geologist Kenneth Oakley and anatomist Wilfrid Le Gros Clark.",
      "no": 6,
      "profile": "Joseph Weiner helped expose the Piltdown fossil as a deliberate fraud in 1953, working with geologist Kenneth Oakley and anatomist Wilfrid Le Gros Clark. Piltdown had been presented as an ancient human combining a large braincase with an ape-like jaw. For decades its apparent fit with expectations about human evolution protected it from sufficiently integrated testing.\n\nThe re-examination joined several kinds of evidence. Fluorine and nitrogen measurements showed that the pieces did not share the antiquity claimed for them. Anatomical study identified the jaw as orangutan, while microscopy revealed that the teeth had been filed to imitate human wear. Staining helped the components appear similar. No single observation did all the work; deliberate fabrication emerged from the combination of different age, different anatomy, and purposeful modification.\n\nCranmoor demands the same separation of questions. First, do the skull and jaw belong to the same species or individual? Second, did they spend comparable time in the same deposit? Third, were surfaces altered to make them look compatible? Regular tool marks, stain inside fresh scratches, or wear patterns inconsistent with chewing are especially important because natural mixing does not create them.\n\nWeiner’s example also warns against protecting a famous specimen through restricted access. Replication by specialists in dating, anatomy, and materials should be encouraged, with samples and images documented before testing. An honest mistake may explain a mistaken association. It does not explain a coordinated set of alterations designed to make unlike pieces tell one evolutionary story. Photographing every sampled area before and after analysis keeps the destructive part of the inquiry proportionate, transparent, and available for later challenge.",
      "frame": "Places microscopic images of tooth wear and stain under matched lighting. “Accident can mix bones; it cannot quietly reshape them.”",
      "q": [
        {
          "q": "Which combination was decisive in the Piltdown re-examination associated with Weiner?",
          "o": [
            {
              "t": "Different component ages, an ape jaw, filed teeth, and artificial staining converged.",
              "v": "expert",
              "fb": "Independent chemical, anatomical, and microscopic findings identified deliberate construction."
            },
            {
              "t": "A single scholar disliked the specimen’s appearance and persuaded others to reject it.",
              "v": "partial",
              "fb": "Disagreement by authority would not explain the physical alterations."
            },
            {
              "t": "The skull lacked a complete excavation diary, so all anatomical study became irrelevant.",
              "v": "wrong",
              "fb": "Poor provenience weakened Piltdown but did not replace the component tests."
            },
            {
              "t": "A new evolutionary theory made the fossil unfashionable and therefore false.",
              "v": "danger",
              "fb": "Scientific truth does not change because a specimen falls out of theoretical fashion."
            }
          ]
        },
        {
          "q": "Which Cranmoor observation most clearly separates deliberate alteration from innocent mixing?",
          "o": [
            {
              "t": "Tooth crowns were filed to a new shape and the fresh grooves were stained afterward.",
              "v": "expert",
              "fb": "Sequential reshaping and staining show an attempt to manufacture compatibility."
            },
            {
              "t": "The jaw and skull have different ages but were recovered from one mixed gravel deposit.",
              "v": "partial",
              "fb": "Age mismatch can occur through natural reworking and does not by itself establish intent."
            },
            {
              "t": "The two pieces belong to different individuals but show no purposeful surface alteration.",
              "v": "wrong",
              "fb": "Mixed deposits can contain unrelated individuals without human modification."
            },
            {
              "t": "The discoverer first misidentified the jaw while working without an anatomical specialist.",
              "v": "danger",
              "fb": "An honest anatomical mistake remains possible until purposeful alteration is demonstrated."
            }
          ]
        },
        {
          "q": "What access policy best follows from Weiner’s experience with a celebrated specimen?",
          "o": [
            {
              "t": "Document sampling and allow qualified independent teams to repeat the critical tests.",
              "v": "expert",
              "fb": "Independent replication reduces the chance that reputation or custody controls the result."
            },
            {
              "t": "Limit examination to scholars who have already supported the specimen publicly.",
              "v": "partial",
              "fb": "Supporters alone do not supply independent scrutiny of a contested object."
            },
            {
              "t": "Permit only nondestructive photography even when tiny samples could resolve the dispute.",
              "v": "wrong",
              "fb": "Preservation matters, but proportionate sampling may be necessary for decisive evidence."
            },
            {
              "t": "Let the owner select one confidential laboratory and release only its final conclusion.",
              "v": "danger",
              "fb": "A hidden process prevents others from evaluating methods, uncertainty, and chain of custody."
            }
          ]
        }
      ],
      "whatHint": "Weiner’s Piltdown tests joined age mismatch with filed teeth and artificial staining. Natural mixing can separate ages; it does not manufacture matching surfaces."
    },
    // cell: Lab Tech Oona @ The Dating Laboratory
    "ah_grahameclark": {
      "sci": "Grahame Clark (1907–1995)",
      "topic": "Economic prehistory & method",
      "lede": "Grahame Clark expanded prehistoric archaeology beyond monuments and decorated objects.",
      "no": 7,
      "profile": "Grahame Clark expanded prehistoric archaeology beyond monuments and decorated objects. At sites such as Star Carr, he studied animal bones, plant remains, tools, landscape, and subsistence to reconstruct how people lived within particular environments. His “economic prehistory” treated ordinary debris as evidence for season, diet, technology, mobility, and the use of local resources.\n\nAn assemblage is persuasive when its parts support one another. Faunal remains should fit the habitat and period; sediments should match the processes that formed the site; tool wear and refuse patterns should correspond to plausible activity. An isolated trophy can be genuine, but it offers fewer checks than a find embedded in a coherent ecological and cultural setting. Absence is not proof, yet a claim becomes weaker when all expected companions are missing.\n\nFor the Cranmoor fossil, Clark would ask what surrounds it. Does the supposed early-human layer contain animal species, pollen, stone technology, and depositional features appropriate to the proposed age? Do those materials continue across the pit, or does the remarkable association occur only in one disturbed pocket? A skull deposited naturally should participate in the local history even if rare.\n\nThis approach helps distinguish an innocent mixture from a manufactured display. Flooded gravels can rework fossils from several ages, but reworking normally affects a broader assemblage and leaves abrasion or sorting. A uniquely paired skull and jaw with no matching ecological context deserves closer scrutiny. Clark’s method does not begin with accusation; it asks whether the surrounding evidence behaves like a real site rather than a stage set.",
      "frame": "Lays out fauna, pollen, and tool records from the claimed layer. “A fossil should have neighbors that belong to the same world.”",
      "q": [
        {
          "q": "What did Clark add by treating subsistence and environment as archaeological evidence?",
          "o": [
            {
              "t": "He reconstructed daily life from fauna, plants, tools, landscape, and ordinary debris.",
              "v": "expert",
              "fb": "Multiple modest remains can reveal activities and environments invisible in prestige objects."
            },
            {
              "t": "He replaced excavation records with broad stories about how prehistoric people behaved.",
              "v": "partial",
              "fb": "Environmental interpretation still depends on recorded deposits and comparative data."
            },
            {
              "t": "He treated decorated objects as the only reliable guide to cultural identity.",
              "v": "wrong",
              "fb": "Selective art objects omit much of the economic life Clark sought to understand."
            },
            {
              "t": "He assumed every object near a settlement was used during the same occupation.",
              "v": "danger",
              "fb": "Spatial proximity alone does not prove contemporaneity or common use."
            }
          ]
        },
        {
          "q": "Which missing evidence most troubles Clark’s reading of the Cranmoor layer?",
          "o": [
            {
              "t": "No matching fauna, tools, pollen, or sediment pattern supports the proposed early-human age.",
              "v": "expert",
              "fb": "A major chronological claim should participate in the environmental assemblage of its layer."
            },
            {
              "t": "The skull is rare, because important hominin fossils are expected to be common; in context.",
              "v": "partial",
              "fb": "Rarity alone is not suspicious; lack of coherent surrounding evidence is the issue."
            },
            {
              "t": "The jaw is incomplete, although fragmentary remains are normal in archaeology; in context.",
              "v": "wrong",
              "fb": "Completeness affects interpretation but does not determine authenticity."
            },
            {
              "t": "The missing ecological context is unimportant if the skull itself looks anatomically persuasive.",
              "v": "danger",
              "fb": "Archaeology reconstructs context, not an imagined likeness of the individual."
            }
          ]
        },
        {
          "q": "What would make broad natural mixing a stronger explanation at Cranmoor?",
          "o": [
            {
              "t": "Comparable age mixtures and abrasion occur among many fossils across the same gravel body.",
              "v": "expert",
              "fb": "A repeated assemblage-wide signature supports a depositional process rather than a singular act."
            },
            {
              "t": "Only the skull and jaw are mismatched, while all surrounding material forms one sequence.",
              "v": "partial",
              "fb": "One exceptional pair is less persuasive evidence for widespread reworking."
            },
            {
              "t": "The two pieces were publicized together before the rest of the assemblage was studied.",
              "v": "wrong",
              "fb": "Public sequence can bias interpretation and supplies no geological mechanism."
            },
            {
              "t": "The finder insists that floods can move any object into any layer without leaving patterns.",
              "v": "danger",
              "fb": "A natural process must predict observable sorting, distribution, and surface effects."
            }
          ]
        }
      ],
      "whatHint": "Clark’s assemblages expect a fossil to participate in the ecology of its layer. Look for the animals, sediments, and wear patterns that should accompany a genuine deposit."
    },
    // cell: Dig Foreman Cray @ The Dating Laboratory
    "ah_nelson": {
      "sci": "Nels Nelson (1875–1964)",
      "topic": "Stratigraphic excavation",
      "lede": "Nels Nelson demonstrated the value of systematic stratigraphic excavation in the American Southwest.",
      "no": 8,
      "profile": "Nels Nelson demonstrated the value of systematic stratigraphic excavation in the American Southwest. At Pueblo San Cristóbal and other sites, he divided deposits into measured levels and recorded how pottery types changed with depth. The sequence showed that cultural change could be reconstructed from vertical distribution even where written dates were absent.\n\nMeasured levels are only a first approximation. True stratigraphy follows deposits and interfaces, which may slope, cut one another, or contain pits from later activity. Still, Nelson’s insistence on recording finds by vertical position made it possible to detect inversions and intrusions. An object lower in the trench is not necessarily older if it lies in the fill of a later cut.\n\nThe Cranmoor pit should be read for such a cut. Color, compaction, clast orientation, and sharp boundaries can reveal a pocket dug from above and refilled with older gravel. If the skull and jaw sit inside that pocket, they cannot borrow the age of the undisturbed deposit beside it. Conversely, broad reworking by water should produce a more diffuse pattern rather than one neat concentration.\n\nNelson’s sequence also tests the finder’s account. Daily level sheets, spoil locations, and the order in which sediments were removed should agree with the claimed depth. A specimen appearing after the relevant layer had already been cleared points to intrusion or record failure. Stratigraphy establishes when an object entered a deposit relative to surrounding events; alteration evidence and custody records must then decide whether the entry was deliberate. The boundary should be sampled across its edge so texture and chemistry can confirm whether the pocket was refilled from material gathered elsewhere.",
      "frame": "Traces a sharp soil boundary descending from the modern surface. “This pocket cuts the layer; it does not grow from it.”",
      "q": [
        {
          "q": "What did Nelson gain by recording pottery through successive measured levels?",
          "o": [
            {
              "t": "He could trace relative cultural change through vertical distributions at one site.",
              "v": "expert",
              "fb": "Changing frequencies through the sequence supplied a relative chronology."
            },
            {
              "t": "He converted every arbitrary level directly into a precise calendar date.",
              "v": "partial",
              "fb": "Measured levels organize evidence but require other methods for calendar dating."
            },
            {
              "t": "He proved that deeper objects are older even when pits cut through the deposit.",
              "v": "wrong",
              "fb": "Later cuts can place younger material below older surfaces."
            },
            {
              "t": "He made horizontal provenience unnecessary once depth had been measured.",
              "v": "danger",
              "fb": "Depth without horizontal and contextual records loses important relationships."
            }
          ]
        },
        {
          "q": "Which soil feature would show that the Cranmoor fossil entered from above?",
          "o": [
            {
              "t": "A sharp-sided pocket descends from a younger surface and contains differently packed fill.",
              "v": "expert",
              "fb": "A later cut interrupts the older deposit and gives its contents a younger stratigraphic entry."
            },
            {
              "t": "The ancient gravel contains rounded clasts of several sizes throughout the exposure.",
              "v": "partial",
              "fb": "Normal gravel variation does not define a discrete intrusive feature."
            },
            {
              "t": "The fossil lies lower than the current ground surface after quarrying removed overburden.",
              "v": "wrong",
              "fb": "Modern surface depth is not the same as stratigraphic age after excavation."
            },
            {
              "t": "The jaw’s museum placement beside the skull proves their original stratigraphic association.",
              "v": "danger",
              "fb": "Museum arrangement provides no information about original deposition."
            }
          ]
        },
        {
          "q": "The daily sheet says the layer was cleared before the fossil appeared. What is the sound response?",
          "o": [
            {
              "t": "Treat the provenience as contradicted and investigate intrusion, record alteration, or substitution.",
              "v": "expert",
              "fb": "A direct chronology conflict requires explanation before the find can retain its stated context."
            },
            {
              "t": "Assume the excavator simply uncovered a hidden remnant of the same layer without noting it.",
              "v": "partial",
              "fb": "An unnoticed remnant is possible, but it must be demonstrated in plans or sections."
            },
            {
              "t": "Keep the claimed provenience because the object itself appears sufficiently ancient; in context.",
              "v": "wrong",
              "fb": "Appearance cannot override the sequence recorded during excavation."
            },
            {
              "t": "Discard every other entry in the field notebook as unreliable and unusable; by sequence.",
              "v": "danger",
              "fb": "One contradiction should be isolated and tested rather than erasing all independent records."
            }
          ]
        }
      ],
      "whatHint": "Nelson’s stratigraphy can expose a pocket cut down from above. An object inside later backfill is intrusive even when ancient gravel surrounds it."
    },
    // cell: Registrar Pell @ The Dating Laboratory
    "ah_suess": {
      "sci": "Hans Suess (1909–1993)",
      "topic": "Radiocarbon calibration",
      "lede": "Hans Suess studied variations in atmospheric radiocarbon and helped turn radiocarbon measurements into more reliable calendar ages.",
      "no": 9,
      "profile": "Hans Suess studied variations in atmospheric radiocarbon and helped turn radiocarbon measurements into more reliable calendar ages. He identified the dilution of atmospheric carbon-14 by fossil-fuel carbon, known as the Suess effect, and contributed to early calibration work using independently dated tree rings. The research showed that a radiocarbon result must be interpreted through the changing atmosphere rather than converted by one timeless formula.\n\nCalibration does not make every archaeological date exact. Samples may be contaminated, organisms can draw carbon from reservoirs with different apparent ages, and old consolidants can alter a museum specimen. Laboratories therefore document pretreatment, material type, uncertainty, and the calibration curve used. Dating is strongest when several appropriate samples and another chronological method agree.\n\nAt Cranmoor, the skull and jaw should be tested as separate components. Preserved collagen, adhering organic material, or associated finds may provide dates, while chemical weathering and fluorine uptake offer additional comparison. A result beyond radiocarbon range should be reported as a limit rather than forced into a precise age. The key question is whether the components’ credible ranges overlap.\n\nDifferent dates alone can support an accidental mixture. Suess’s lesson becomes more powerful when chronology is joined to surface analysis and find history. If one component is much younger, has been artificially stained, and appears in a disturbed pocket recorded only after discovery, the dating evidence participates in a larger argument. Calibration keeps that argument honest by preventing a dramatic claim from resting on a falsely exact number. A laboratory blank and known-age control help show whether the surprising separation belongs to the specimens rather than preparation or instrument error.",
      "frame": "Checks pretreatment notes against the laboratory’s calibrated ranges. “A date without its assumptions is only a persuasive-looking number.”",
      "q": [
        {
          "q": "Why must a radiocarbon result be calibrated rather than read as a timeless calendar age?",
          "o": [
            {
              "t": "Atmospheric carbon-14 has varied, so measured ages map unevenly onto calendar years.",
              "v": "expert",
              "fb": "Calibration accounts for documented atmospheric variation in the relationship between ages."
            },
            {
              "t": "Radioactive decay changes speed whenever an archaeological sample enters a laboratory.",
              "v": "partial",
              "fb": "Decay is stable; the initial atmospheric concentration is what changes."
            },
            {
              "t": "Calibration removes every source of contamination from the specimen automatically.",
              "v": "wrong",
              "fb": "Pretreatment addresses contamination, while calibration addresses the atmospheric record."
            },
            {
              "t": "The expected historical period determines which part of the curve should be selected.",
              "v": "danger",
              "fb": "Historical expectation cannot be used to choose among inconvenient calibrated ranges."
            }
          ]
        },
        {
          "q": "How should Cranmoor’s component dates be reported when their ranges do not overlap?",
          "o": [
            {
              "t": "State the separate ranges and uncertainties rather than compressing them into one specimen age.",
              "v": "expert",
              "fb": "Separate reporting preserves the chronological conflict that the inquiry must explain."
            },
            {
              "t": "Average the central values because the pieces are displayed as one reconstruction; in context.",
              "v": "partial",
              "fb": "Averaging unlike components invents a date that belongs to neither object."
            },
            {
              "t": "Report only the older component because it gives the fossil greater significance; in context.",
              "v": "wrong",
              "fb": "Selective publication turns significance into a criterion for accepting evidence."
            },
            {
              "t": "Round both results broadly until the intervals appear compatible in the public catalogue and summary.",
              "v": "danger",
              "fb": "Artificially broad rounding conceals rather than represents measurement uncertainty."
            }
          ]
        },
        {
          "q": "Which package of evidence would move age mismatch from accident toward deliberate assembly?",
          "o": [
            {
              "t": "Non-overlapping dates coincide with filed teeth, applied stain, and a disturbed recovery pocket.",
              "v": "expert",
              "fb": "Chronology joined to purposeful modification and manufactured context supports intentional construction."
            },
            {
              "t": "Different dates occur among many naturally abraded fossils spread across the gravel body.",
              "v": "partial",
              "fb": "Assemblage-wide mixing and natural wear instead support geological reworking."
            },
            {
              "t": "One date has a wide uncertainty interval and the other sample was too poor to measure.",
              "v": "wrong",
              "fb": "Weak measurements cannot carry a strong claim about either accident or intent."
            },
            {
              "t": "The components look persuasive together after a museum preparator reconstructs missing parts.",
              "v": "danger",
              "fb": "Aesthetic coherence after restoration does not establish the pieces’ original relationship."
            }
          ]
        }
      ],
      "whatHint": "Suess’s calibration work warns against forcing separate measurements into one date. Compare credible age ranges and the pretreatment history of each component."
    }
  },
  "STORIES": {
    "ah_tech": {
      "ah_pit": "At the pit, Oona seals gravel from inside the skull cavity separately from loose matrix. “Petrie would never let one label stand in for a context; show me why.”",
      "ah_gallery": "In the gallery workroom, Oona compares mineral films under oblique light. “Garrod built histories from whole assemblages. Read hers before I reveal which surfaces disagree.”",
      "ah_lab": "At the dating bench, Oona arranges fauna, sediment, and tool records around the specimen tray. “Clark asks whether the remarkable object belongs to the ordinary world around it.”"
    },
    "ah_foreman": {
      "ah_pit": "Cray stands inside the old trench and points to the scar of an over-deep cut. “Schliemann found a city while destroying parts of its sequence. Tell me what enthusiasm can erase.”",
      "ah_gallery": "Cray opens photographs taken before the display was assembled, then lays two date ranges over them. “Douglass never forced clocks to agree. Neither should we.”",
      "ah_lab": "Cray rotates a resin cast of the soil boundary under the lamp. “Nelson would ask whether this pocket belongs to the layer or cuts down through it.”"
    },
    "ah_registrar": {
      "ah_pit": "Pell compares the day sheet with coordinates added to a cleaner publication plan. “Wheeler made every square answerable. Find the contradiction and the original ledger is yours.”",
      "ah_gallery": "Pell unlocks a drawer containing tooth photographs and old correspondence. “Weiner’s Piltdown inquiry separated mistake from manufacture. The same distinction matters here.”",
      "ah_lab": "Pell checks sample seals against calibration certificates and treatment notes. “Suess taught that a number carries assumptions. Account for them before I release the component dates.”"
    }
  },
  "story": [
    "<b>The Cranmoor Skull</b> opens at a gravel-pit inquiry where a skull and jaw have been presented as one extraordinary early human.",
    "<b>Lab Tech Oona</b>, <b>Dig Foreman Cray</b>, and <b>Registrar Pell</b> each guard a different route to the specimen’s history: laboratory comparison, excavation sequence, and accession record.",
    "The specimen may be <b>a genuine archaic skull and jaw from one early human</b>, or <b>a mixed find assembled innocently from nearby fossil pieces</b>. Neither possibility can be accepted from appearance alone.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and accumulate the observations needed to judge the specimen."
  ],
  "endings": {
    "overclaimWhat": "ah_link",
    "dismissalWhat": "ah_mistake",
    "win": {
      "expertTitle": "One Display, Two Ages, Deliberate Alteration",
      "expert": [
        "Inspector Cal Merrin identifies Silas Fenn, the Dating Laboratory, and a modern ape jaw altered and planted beside an older skull. The components do not share one depositional history, and the jaw carries filing and staining that natural mixing cannot explain.",
        "Stratigraphy, component dating, microscopic alteration, and the accession trail converge. The inquiry distinguishes a genuine individual from an accidental mixture and then distinguishes accident from manufacture."
      ],
      "soundTitle": "A Defensible Composite Finding",
      "sound": [
        "The physical evidence establishes an altered composite rather than one archaic individual or an innocent mixed find.",
        "Some custody details remain incomplete, but the incompatible ages and worked surfaces make the scientific conclusion sound."
      ],
      "namedTitle": "Correct Specimen, Sparse Chain",
      "named": [
        "The specimen is identified correctly, but too few WHO and WHERE clues support the named act of planting.",
        "The laboratory conclusion needs a documented chain from alteration to placement."
      ]
    },
    "overclaim": {
      "title": "The Missing-Link Identification",
      "body": [
        "Merrin accepts the skull and jaw as one genuine archaic individual.",
        "Their ages, surface histories, and anatomical modifications do not align. Resemblance cannot repair incompatible component evidence."
      ]
    },
    "dismissal": {
      "title": "The Innocent Mixture",
      "body": [
        "Merrin treats the specimen as an accidental association of unrelated fossils.",
        "Natural mixing can join pieces of different age, but it does not file teeth, stain surfaces to match, or manufacture a discovery record."
      ]
    },
    "wrongNames": {
      "title": "Right Specimen, Wrong Attribution",
      "body": [
        "The altered composite is recognized, but the responsible person or culminating location is wrong. Reassemble the find and accession chronology."
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A skull and altered jaw above layered gravel\"><path d=\"M0 108 C110 96,210 118,330 104 S540 96,660 108\" fill=\"none\" stroke=\"#e2e2d8\" stroke-width=\"1\"/><path d=\"M0 122 C140 112,250 132,390 118 S560 112,660 122\" fill=\"none\" stroke=\"#e2e2d8\" stroke-width=\"1\"/><path d=\"M238 36 C206 48,198 78,214 96 C226 110,250 108,264 96 L284 96 C302 82,302 52,284 38 C272 28,250 28,238 36 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.7\"/><path d=\"M224 70 C236 62,252 62,264 70 M232 88 L270 88\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.3\"/><path d=\"M332 82 C350 70,382 68,404 80 L396 102 C378 112,350 110,332 98 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.7\"/><path d=\"M344 88 L392 88 M350 94 L388 94\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><path d=\"M296 60 L318 60\" stroke=\"#326891\" stroke-width=\"1.5\" stroke-dasharray=\"3 4\"/></svg>"
}
};
