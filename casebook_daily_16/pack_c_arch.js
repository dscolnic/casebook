module.exports = { PACK: {
  "id": "c_arch",
  "title": "The Cranmoor Skull",
  "discipline": "Archaeology & Scientific Dating",
  "teaser": "A gravel pit gave up the missing link. The discovery of the century? A crank's blunder? Or something that was put there?",
  "overclaimTag": "the discovery of the century",
  "truthTag": "a planted, doctored artifact",
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
  "overclaimTease": "The grand label may glitter, but old earth yields its answers to context, comparison, and patient tests.",
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
      "title": "What is happening",
      "truth": "ah_planted",
      "items": [
        {
          "id": "ah_link",
          "label": "The missing link — the earliest human ancestor"
        },
        {
          "id": "ah_mistake",
          "label": "A muddle — an amateur's honest mistake"
        },
        {
          "id": "ah_planted",
          "label": "A planted composite: filed, stained, and caught by dating"
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
    "ah_petrie": {
      "sci": "Flinders Petrie (1853–1942)",
      "topic": "Seriation & scientific excavation",
      "lede": "Flinders Petrie made seriation and scientific excavation a discipline of layers, context, and records that outlast the excavation.",
      "no": 1,
      "profile": "Today’s field note begins with Flinders Petrie, whose work provides a practical entrance to seriation and scientific excavation. Flinders Petrie used meticulous measurement in Egypt and developed sequence dating by arranging pottery styles into changing series. Archaeology gains meaning from position and association, so an object removed from its setting loses part of its history. Petrie’s contribution made recording a form of evidence rather than clerical housekeeping.\n\nThe operational core is straightforward to state and demanding to perform: compare artifact forms statistically, record their contexts, and order recurring styles before assigning a chronology. Soil changes, object groupings, laboratory measurements, and custody records must be kept distinct before they are combined. A conclusion should explain why those lines agree and acknowledge what a disturbed deposit or contaminated sample cannot establish.\n\nThis approach changed excavation from treasure recovery into controlled destruction with a permanent record. Because digging cannot be repeated after a layer is removed, plans, sections, labels, photographs, and samples become the experiment’s surviving trace. Comparison across sites then depends on whether those traces were made consistently.\n\nThe durable rule is relative dating becomes persuasive when many small, documented changes form a consistent sequence. Archaeological confidence grows from context that remains available after the excitement of discovery has passed. Even ordinary fragments can become decisive when their location and associations are secure. A spectacular specimen without provenience may answer fewer questions than a box of carefully labeled debris. Even ordinary fragments can become decisive when their location and associations are secure.",
      "frame": "Brushes grit from a sample tray. \"At The Gravel Pit & Dig, context disappears faster than bone. Tell me what seriation and scientific excavation requires before I open the field log.\"",
      "q": [
        {
          "q": "Which archaeological account best represents Flinders Petrie’s work on seriation and scientific excavation?",
          "o": [
            {
              "t": "Flinders Petrie made seriation and scientific excavation depend on recorded context, sequence, and comparative evidence. It remains checkable. Others can retrace it.",
              "v": "expert",
              "fb": "Correct: archaeological meaning depends on the documented relation between object, deposit, and comparison."
            },
            {
              "t": "Flinders Petrie treated seriation and scientific excavation as a useful theme but left the deposit history incompletely tested. The main comparison is absent.",
              "v": "partial",
              "fb": "Rarity may attract attention, but it does not reconstruct a deposit or chronology."
            },
            {
              "t": "Flinders Petrie let labels and collector authority decide seriation and scientific excavation despite conflicting field records. The evidence points elsewhere.",
              "v": "wrong",
              "fb": "A label is a claim about provenience, not a substitute for provenience."
            },
            {
              "t": "Flinders Petrie used seriation and scientific excavation to support a spectacular conclusion before provenience was secure. The claim outruns the trench record.",
              "v": "danger",
              "fb": "Appearance alone cannot establish where an object came from or how long it was buried."
            }
          ]
        },
        {
          "q": "What field procedure most closely follows the standard described in this profile?",
          "o": [
            {
              "t": "Follow the stated field method, preserve every context record, and compare the result independently. It remains checkable.",
              "v": "expert",
              "fb": "Yes: excavation becomes scientific through a retraceable record of an unrepeatable operation."
            },
            {
              "t": "Record the finest object carefully, but leave routine fragments and soil changes undocumented. The key test is missing.",
              "v": "partial",
              "fb": "Selective recording destroys the comparative evidence carried by ordinary material."
            },
            {
              "t": "Remove the deposit quickly, then reconstruct its order later from the excavator's memory. The field record points elsewhere.",
              "v": "wrong",
              "fb": "Memory cannot recreate interfaces and associations removed during digging."
            },
            {
              "t": "Publicize the identification first, and postpone specialist review of context and laboratory evidence. Checking comes later.",
              "v": "danger",
              "fb": "Early publicity can harden a guess before the deposit has been evaluated."
            }
          ]
        },
        {
          "q": "Which conclusion follows most responsibly from seriation and scientific excavation?",
          "o": [
            {
              "t": "Independent context and converging tests should determine the strength of the archaeological claim. Others can retrace it; in use.",
              "v": "expert",
              "fb": "Exactly: context and independent agreement determine how much an archaeological conclusion can carry."
            },
            {
              "t": "A larger collection should settle the question even when most pieces lack secure provenience. The main comparison is absent.",
              "v": "partial",
              "fb": "Quantity does not repair the missing history of where objects were recovered."
            },
            {
              "t": "A coherent reconstruction should outweigh chemical dates and stratigraphy that contradict it. The evidence points elsewhere.",
              "v": "wrong",
              "fb": "Narrative coherence cannot overrule incompatible physical and stratigraphic evidence."
            },
            {
              "t": "The discovery would either transform prehistory substantially or deserve no further investigation. The claim outruns the trench record.",
              "v": "danger",
              "fb": "Measured revision is more informative than choosing between spectacle and abandonment."
            }
          ]
        }
      ]
    },
    "ah_schliemann": {
      "sci": "Heinrich Schliemann (1822–1890)",
      "topic": "Troy & the perils of the eager digger",
      "lede": "Heinrich Schliemann taught archaeologists to read troy and the perils of the eager digger through associations that digging can expose only once.",
      "no": 2,
      "profile": "Today’s field note begins with Heinrich Schliemann, whose work provides a practical entrance to troy and the perils of the eager digger. Heinrich Schliemann pursued Homeric Troy at Hisarlik and cut a deep trench that destroyed substantial later remains while exposing earlier levels. Archaeology gains meaning from position and association, so an object removed from its setting loses part of its history. Schliemann’s contribution made recording a form of evidence rather than clerical housekeeping.\n\nThe operational core is straightforward to state and demanding to perform: separate enthusiasm for a hypothesis from the slower work of identifying layers, structures, and disturbances. Soil changes, object groupings, laboratory measurements, and custody records must be kept distinct before they are combined. A conclusion should explain why those lines agree and acknowledge what a disturbed deposit or contaminated sample cannot establish.\n\nThis approach changed excavation from treasure recovery into controlled destruction with a permanent record. Because digging cannot be repeated after a layer is removed, plans, sections, labels, photographs, and samples become the experiment’s surviving trace. Comparison across sites then depends on whether those traces were made consistently.\n\nThe durable rule is an exciting identification cannot repair archaeological context once excavation has removed it. Archaeological confidence grows from context that remains available after the excitement of discovery has passed. Even ordinary fragments can become decisive when their location and associations are secure. A spectacular specimen without provenience may answer fewer questions than a box of carefully labeled debris. Even ordinary fragments can become decisive when their location and associations are secure.",
      "frame": "Keeps the accession tag turned face down. \"Earn the provenience first: explain troy and the perils of the eager digger, then I will show you what was recorded here.\"",
      "q": [
        {
          "q": "Which archaeological account best represents Heinrich Schliemann’s work on troy and the perils of the eager digger?",
          "o": [
            {
              "t": "Heinrich Schliemann made troy and the perils of the eager digger depend on recorded context, sequence, and comparative evidence. It remains checkable. Others can retrace it.",
              "v": "expert",
              "fb": "Correct: archaeological meaning depends on the documented relation between object, deposit, and comparison."
            },
            {
              "t": "Heinrich Schliemann treated troy and the perils of the eager digger as a useful theme but left the deposit history incompletely tested. The main comparison is absent.",
              "v": "partial",
              "fb": "Rarity may attract attention, but it does not reconstruct a deposit or chronology."
            },
            {
              "t": "Heinrich Schliemann let labels and collector authority decide troy and the perils of the eager digger despite conflicting field records. The evidence points elsewhere.",
              "v": "wrong",
              "fb": "A label is a claim about provenience, not a substitute for provenience."
            },
            {
              "t": "Heinrich Schliemann used troy and the perils of the eager digger to support a spectacular conclusion before provenience was secure. The claim outruns the trench record.",
              "v": "danger",
              "fb": "Appearance alone cannot establish where an object came from or how long it was buried."
            }
          ]
        },
        {
          "q": "What field procedure most closely follows the standard described in this profile?",
          "o": [
            {
              "t": "Follow the stated field method, preserve every context record, and compare the result independently. It remains checkable.",
              "v": "expert",
              "fb": "Yes: excavation becomes scientific through a retraceable record of an unrepeatable operation."
            },
            {
              "t": "Record the finest object carefully, but leave routine fragments and soil changes undocumented. The key test is missing.",
              "v": "partial",
              "fb": "Selective recording destroys the comparative evidence carried by ordinary material."
            },
            {
              "t": "Remove the deposit quickly, then reconstruct its order later from the excavator's memory. The field record points elsewhere.",
              "v": "wrong",
              "fb": "Memory cannot recreate interfaces and associations removed during digging."
            },
            {
              "t": "Publicize the identification first, and postpone specialist review of context and laboratory evidence. Checking comes later.",
              "v": "danger",
              "fb": "Early publicity can harden a guess before the deposit has been evaluated."
            }
          ]
        },
        {
          "q": "Which conclusion follows most responsibly from troy and the perils of the eager digger?",
          "o": [
            {
              "t": "Independent context and converging tests should determine the strength of the archaeological claim. Others can retrace it; in use.",
              "v": "expert",
              "fb": "Exactly: context and independent agreement determine how much an archaeological conclusion can carry."
            },
            {
              "t": "A larger collection should settle the question even when most pieces lack secure provenience. The main comparison is absent.",
              "v": "partial",
              "fb": "Quantity does not repair the missing history of where objects were recovered."
            },
            {
              "t": "A coherent reconstruction should outweigh chemical dates and stratigraphy that contradict it. The evidence points elsewhere.",
              "v": "wrong",
              "fb": "Narrative coherence cannot overrule incompatible physical and stratigraphic evidence."
            },
            {
              "t": "The discovery would either transform prehistory substantially or deserve no further investigation. The claim outruns the trench record.",
              "v": "danger",
              "fb": "Measured revision is more informative than choosing between spectacle and abandonment."
            }
          ]
        }
      ]
    },
    "ah_wheeler": {
      "sci": "Mortimer Wheeler (1890–1976)",
      "topic": "The grid method & stratigraphic rigor",
      "lede": "A trench becomes evidence through Mortimer Wheeler's approach to the grid method and stratigraphic rigor, not through the rarity of its finds.",
      "no": 3,
      "profile": "Today’s field note begins with Mortimer Wheeler, whose work provides a practical entrance to the grid method and stratigraphic rigor. Mortimer Wheeler popularized square excavation grids separated by standing baulks, making vertical profiles and horizontal plans easier to compare. Archaeology gains meaning from position and association, so an object removed from its setting loses part of its history. Wheeler’s contribution made recording a form of evidence rather than clerical housekeeping.\n\nThe operational core is straightforward to state and demanding to perform: excavate in controlled units while retaining visible sections that show how deposits relate through depth. Soil changes, object groupings, laboratory measurements, and custody records must be kept distinct before they are combined. A conclusion should explain why those lines agree and acknowledge what a disturbed deposit or contaminated sample cannot establish.\n\nThis approach changed excavation from treasure recovery into controlled destruction with a permanent record. Because digging cannot be repeated after a layer is removed, plans, sections, labels, photographs, and samples become the experiment’s surviving trace. Comparison across sites then depends on whether those traces were made consistently.\n\nThe durable rule is a grid is useful only when recording remains tied to stratigraphic reasoning rather than neat geometry alone. Archaeological confidence grows from context that remains available after the excitement of discovery has passed. Even ordinary fragments can become decisive when their location and associations are secure. A spectacular specimen without provenience may answer fewer questions than a box of carefully labeled debris. Even ordinary fragments can become decisive when their location and associations are secure.",
      "frame": "Points toward a numbered section drawing. \"A find without its layer is half a fact. Show me you understand the grid method and stratigraphic rigor.\"",
      "q": [
        {
          "q": "Which archaeological account best represents Mortimer Wheeler’s work on the grid method and stratigraphic rigor?",
          "o": [
            {
              "t": "Mortimer Wheeler made the grid method and stratigraphic rigor depend on recorded context, sequence, and comparative evidence. It remains checkable. Others can retrace it.",
              "v": "expert",
              "fb": "Correct: archaeological meaning depends on the documented relation between object, deposit, and comparison."
            },
            {
              "t": "Mortimer Wheeler treated the grid method and stratigraphic rigor as a useful theme but left the deposit history incompletely tested. The main comparison is absent.",
              "v": "partial",
              "fb": "Rarity may attract attention, but it does not reconstruct a deposit or chronology."
            },
            {
              "t": "Mortimer Wheeler let labels and collector authority decide the grid method and stratigraphic rigor despite conflicting field records. The evidence points elsewhere.",
              "v": "wrong",
              "fb": "A label is a claim about provenience, not a substitute for provenience."
            },
            {
              "t": "Mortimer Wheeler used the grid method and stratigraphic rigor to support a spectacular conclusion before provenience was secure. The claim outruns the trench record.",
              "v": "danger",
              "fb": "Appearance alone cannot establish where an object came from or how long it was buried."
            }
          ]
        },
        {
          "q": "What field procedure most closely follows the standard described in this profile?",
          "o": [
            {
              "t": "Follow the stated field method, preserve every context record, and compare the result independently. It remains checkable.",
              "v": "expert",
              "fb": "Yes: excavation becomes scientific through a retraceable record of an unrepeatable operation."
            },
            {
              "t": "Record the finest object carefully, but leave routine fragments and soil changes undocumented. The key test is missing.",
              "v": "partial",
              "fb": "Selective recording destroys the comparative evidence carried by ordinary material."
            },
            {
              "t": "Remove the deposit quickly, then reconstruct its order later from the excavator's memory. The field record points elsewhere.",
              "v": "wrong",
              "fb": "Memory cannot recreate interfaces and associations removed during digging."
            },
            {
              "t": "Publicize the identification first, and postpone specialist review of context and laboratory evidence. Checking comes later.",
              "v": "danger",
              "fb": "Early publicity can harden a guess before the deposit has been evaluated."
            }
          ]
        },
        {
          "q": "Which conclusion follows most responsibly from the grid method and stratigraphic rigor?",
          "o": [
            {
              "t": "Independent context and converging tests should determine the strength of the archaeological claim. Others can retrace it; in use.",
              "v": "expert",
              "fb": "Exactly: context and independent agreement determine how much an archaeological conclusion can carry."
            },
            {
              "t": "A larger collection should settle the question even when most pieces lack secure provenience. The main comparison is absent.",
              "v": "partial",
              "fb": "Quantity does not repair the missing history of where objects were recovered."
            },
            {
              "t": "A coherent reconstruction should outweigh chemical dates and stratigraphy that contradict it. The evidence points elsewhere.",
              "v": "wrong",
              "fb": "Narrative coherence cannot overrule incompatible physical and stratigraphic evidence."
            },
            {
              "t": "The discovery would either transform prehistory substantially or deserve no further investigation. The claim outruns the trench record.",
              "v": "danger",
              "fb": "Measured revision is more informative than choosing between spectacle and abandonment."
            }
          ]
        }
      ]
    },
    "ah_garrod": {
      "sci": "Dorothy Garrod (1892–1968)",
      "topic": "Palaeolithic prehistory & method",
      "lede": "Dorothy Garrod made palaeolithic prehistory and method a discipline of layers, context, and records that outlast the excavation.",
      "no": 4,
      "profile": "Today’s field note begins with Dorothy Garrod, whose work provides a practical entrance to palaeolithic prehistory and method. Dorothy Garrod directed major Palaeolithic excavations in the Levant, including Mount Carmel, and helped establish long cultural sequences from caves. Archaeology gains meaning from position and association, so an object removed from its setting loses part of its history. Garrod’s contribution made recording a form of evidence rather than clerical housekeeping.\n\nThe operational core is straightforward to state and demanding to perform: combine controlled excavation, artifact classification, human remains, and environmental evidence across successive occupations. Soil changes, object groupings, laboratory measurements, and custody records must be kept distinct before they are combined. A conclusion should explain why those lines agree and acknowledge what a disturbed deposit or contaminated sample cannot establish.\n\nThis approach changed excavation from treasure recovery into controlled destruction with a permanent record. Because digging cannot be repeated after a layer is removed, plans, sections, labels, photographs, and samples become the experiment’s surviving trace. Comparison across sites then depends on whether those traces were made consistently.\n\nThe durable rule is prehistory becomes richer when stone tools are read together with people, animals, and changing landscapes. Archaeological confidence grows from context that remains available after the excitement of discovery has passed. Even ordinary fragments can become decisive when their location and associations are secure. A spectacular specimen without provenience may answer fewer questions than a box of carefully labeled debris. Even ordinary fragments can become decisive when their location and associations are secure.",
      "frame": "Brushes grit from a sample tray. \"At The Museum Gallery, context disappears faster than bone. Tell me what palaeolithic prehistory and method requires before I open the field log.\"",
      "q": [
        {
          "q": "Which archaeological account best represents Dorothy Garrod’s work on palaeolithic prehistory and method?",
          "o": [
            {
              "t": "Dorothy Garrod made palaeolithic prehistory and method depend on recorded context, sequence, and comparative evidence. It remains checkable. Others can retrace it.",
              "v": "expert",
              "fb": "Correct: archaeological meaning depends on the documented relation between object, deposit, and comparison."
            },
            {
              "t": "Dorothy Garrod treated palaeolithic prehistory and method as a useful theme but left the deposit history incompletely tested. The main comparison is absent.",
              "v": "partial",
              "fb": "Rarity may attract attention, but it does not reconstruct a deposit or chronology."
            },
            {
              "t": "Dorothy Garrod let labels and collector authority decide palaeolithic prehistory and method despite conflicting field records. The evidence points elsewhere.",
              "v": "wrong",
              "fb": "A label is a claim about provenience, not a substitute for provenience."
            },
            {
              "t": "Dorothy Garrod used palaeolithic prehistory and method to support a spectacular conclusion before provenience was secure. The claim outruns the trench record.",
              "v": "danger",
              "fb": "Appearance alone cannot establish where an object came from or how long it was buried."
            }
          ]
        },
        {
          "q": "What field procedure most closely follows the standard described in this profile?",
          "o": [
            {
              "t": "Follow the stated field method, preserve every context record, and compare the result independently. It remains checkable.",
              "v": "expert",
              "fb": "Yes: excavation becomes scientific through a retraceable record of an unrepeatable operation."
            },
            {
              "t": "Record the finest object carefully, but leave routine fragments and soil changes undocumented. The key test is missing.",
              "v": "partial",
              "fb": "Selective recording destroys the comparative evidence carried by ordinary material."
            },
            {
              "t": "Remove the deposit quickly, then reconstruct its order later from the excavator's memory. The field record points elsewhere.",
              "v": "wrong",
              "fb": "Memory cannot recreate interfaces and associations removed during digging."
            },
            {
              "t": "Publicize the identification first, and postpone specialist review of context and laboratory evidence. Checking comes later.",
              "v": "danger",
              "fb": "Early publicity can harden a guess before the deposit has been evaluated."
            }
          ]
        },
        {
          "q": "Which conclusion follows most responsibly from palaeolithic prehistory and method?",
          "o": [
            {
              "t": "Independent context and converging tests should determine the strength of the archaeological claim. Others can retrace it; in use.",
              "v": "expert",
              "fb": "Exactly: context and independent agreement determine how much an archaeological conclusion can carry."
            },
            {
              "t": "A larger collection should settle the question even when most pieces lack secure provenience. The main comparison is absent.",
              "v": "partial",
              "fb": "Quantity does not repair the missing history of where objects were recovered."
            },
            {
              "t": "A coherent reconstruction should outweigh chemical dates and stratigraphy that contradict it. The evidence points elsewhere.",
              "v": "wrong",
              "fb": "Narrative coherence cannot overrule incompatible physical and stratigraphic evidence."
            },
            {
              "t": "The discovery would either transform prehistory substantially or deserve no further investigation. The claim outruns the trench record.",
              "v": "danger",
              "fb": "Measured revision is more informative than choosing between spectacle and abandonment."
            }
          ]
        }
      ]
    },
    "ah_douglass": {
      "sci": "A. E. Douglass (1867–1962)",
      "topic": "Dendrochronology: tree-ring dating",
      "lede": "A. E. Douglass taught archaeologists to read dendrochronology: tree-ring dating through associations that digging can expose only once.",
      "no": 5,
      "profile": "Today’s field note begins with A. E. Douglass, whose work provides a practical entrance to dendrochronology: tree-ring dating. A. E. Douglass founded dendrochronology by matching distinctive patterns of wide and narrow tree rings across living trees and ancient timbers. Archaeology gains meaning from position and association, so an object removed from its setting loses part of its history. Douglass’s contribution made recording a form of evidence rather than clerical housekeeping.\n\nThe operational core is straightforward to state and demanding to perform: cross-match overlapping ring-width sequences until each ring can be assigned to a calendar year. Soil changes, object groupings, laboratory measurements, and custody records must be kept distinct before they are combined. A conclusion should explain why those lines agree and acknowledge what a disturbed deposit or contaminated sample cannot establish.\n\nThis approach changed excavation from treasure recovery into controlled destruction with a permanent record. Because digging cannot be repeated after a layer is removed, plans, sections, labels, photographs, and samples become the experiment’s surviving trace. Comparison across sites then depends on whether those traces were made consistently.\n\nThe durable rule is independent chronological patterns become powerful when the same sequence appears in many separate trees. Archaeological confidence grows from context that remains available after the excitement of discovery has passed. Even ordinary fragments can become decisive when their location and associations are secure. A spectacular specimen without provenience may answer fewer questions than a box of carefully labeled debris. Even ordinary fragments can become decisive when their location and associations are secure.",
      "frame": "Keeps the accession tag turned face down. \"Earn the provenience first: explain dendrochronology: tree-ring dating, then I will show you what was recorded here.\"",
      "q": [
        {
          "q": "Which archaeological account best represents A. E. Douglass’s work on dendrochronology: tree-ring dating?",
          "o": [
            {
              "t": "A. E. Douglass made dendrochronology: tree-ring dating depend on recorded context, sequence, and comparative evidence. It remains checkable. Others can retrace it.",
              "v": "expert",
              "fb": "Correct: archaeological meaning depends on the documented relation between object, deposit, and comparison."
            },
            {
              "t": "A. E. Douglass treated dendrochronology: tree-ring dating as a useful theme but left the deposit history incompletely tested. The main comparison is absent.",
              "v": "partial",
              "fb": "Rarity may attract attention, but it does not reconstruct a deposit or chronology."
            },
            {
              "t": "A. E. Douglass let labels and collector authority decide dendrochronology: tree-ring dating despite conflicting field records. The evidence points elsewhere.",
              "v": "wrong",
              "fb": "A label is a claim about provenience, not a substitute for provenience."
            },
            {
              "t": "A. E. Douglass used dendrochronology: tree-ring dating to support a spectacular conclusion before provenience was secure. The claim outruns the trench record.",
              "v": "danger",
              "fb": "Appearance alone cannot establish where an object came from or how long it was buried."
            }
          ]
        },
        {
          "q": "What field procedure most closely follows the standard described in this profile?",
          "o": [
            {
              "t": "Follow the stated field method, preserve every context record, and compare the result independently. It remains checkable.",
              "v": "expert",
              "fb": "Yes: excavation becomes scientific through a retraceable record of an unrepeatable operation."
            },
            {
              "t": "Record the finest object carefully, but leave routine fragments and soil changes undocumented. The key test is missing.",
              "v": "partial",
              "fb": "Selective recording destroys the comparative evidence carried by ordinary material."
            },
            {
              "t": "Remove the deposit quickly, then reconstruct its order later from the excavator's memory. The field record points elsewhere.",
              "v": "wrong",
              "fb": "Memory cannot recreate interfaces and associations removed during digging."
            },
            {
              "t": "Publicize the identification first, and postpone specialist review of context and laboratory evidence. Checking comes later.",
              "v": "danger",
              "fb": "Early publicity can harden a guess before the deposit has been evaluated."
            }
          ]
        },
        {
          "q": "Which conclusion follows most responsibly from dendrochronology: tree-ring dating?",
          "o": [
            {
              "t": "Independent context and converging tests should determine the strength of the archaeological claim. Others can retrace it; in use.",
              "v": "expert",
              "fb": "Exactly: context and independent agreement determine how much an archaeological conclusion can carry."
            },
            {
              "t": "A larger collection should settle the question even when most pieces lack secure provenience. The main comparison is absent.",
              "v": "partial",
              "fb": "Quantity does not repair the missing history of where objects were recovered."
            },
            {
              "t": "A coherent reconstruction should outweigh chemical dates and stratigraphy that contradict it. The evidence points elsewhere.",
              "v": "wrong",
              "fb": "Narrative coherence cannot overrule incompatible physical and stratigraphic evidence."
            },
            {
              "t": "The discovery would either transform prehistory substantially or deserve no further investigation. The claim outruns the trench record.",
              "v": "danger",
              "fb": "Measured revision is more informative than choosing between spectacle and abandonment."
            }
          ]
        }
      ]
    },
    "ah_weiner": {
      "sci": "Joseph Weiner (1915–1982)",
      "topic": "The exposure of the Piltdown hoax",
      "lede": "A trench becomes evidence through Joseph Weiner's approach to the exposure of the piltdown hoax, not through the rarity of its finds.",
      "no": 6,
      "profile": "Today’s field note begins with Joseph Weiner, whose work provides a practical entrance to the exposure of the piltdown hoax. Joseph Weiner worked with Kenneth Oakley and Wilfrid Le Gros Clark in the 1953 re-examination that established Piltdown as a deliberate fraud. Archaeology gains meaning from position and association, so an object removed from its setting loses part of its history. Weiner’s contribution made recording a form of evidence rather than clerical housekeeping.\n\nThe operational core is straightforward to state and demanding to perform: combine chemical tests, microscopic inspection, anatomical comparison, and archival reconstruction rather than relying on one anomaly. Soil changes, object groupings, laboratory measurements, and custody records must be kept distinct before they are combined. A conclusion should explain why those lines agree and acknowledge what a disturbed deposit or contaminated sample cannot establish.\n\nThis approach changed excavation from treasure recovery into controlled destruction with a permanent record. Because digging cannot be repeated after a layer is removed, plans, sections, labels, photographs, and samples become the experiment’s surviving trace. Comparison across sites then depends on whether those traces were made consistently.\n\nThe durable rule is fraud is most securely demonstrated when independent specialties converge on the same contradiction. Archaeological confidence grows from context that remains available after the excitement of discovery has passed. Even ordinary fragments can become decisive when their location and associations are secure. A spectacular specimen without provenience may answer fewer questions than a box of carefully labeled debris. Even ordinary fragments can become decisive when their location and associations are secure.",
      "frame": "Points toward a numbered section drawing. \"A find without its layer is half a fact. Show me you understand the exposure of the piltdown hoax.\"",
      "q": [
        {
          "q": "Which archaeological account best represents Joseph Weiner’s work on the exposure of the piltdown hoax?",
          "o": [
            {
              "t": "Joseph Weiner made the exposure of the piltdown hoax depend on recorded context, sequence, and comparative evidence. It remains checkable. Others can retrace it.",
              "v": "expert",
              "fb": "Correct: archaeological meaning depends on the documented relation between object, deposit, and comparison."
            },
            {
              "t": "Joseph Weiner treated the exposure of the piltdown hoax as a useful theme but left the deposit history incompletely tested. The main comparison is absent.",
              "v": "partial",
              "fb": "Rarity may attract attention, but it does not reconstruct a deposit or chronology."
            },
            {
              "t": "Joseph Weiner let labels and collector authority decide the exposure of the piltdown hoax despite conflicting field records. The evidence points elsewhere.",
              "v": "wrong",
              "fb": "A label is a claim about provenience, not a substitute for provenience."
            },
            {
              "t": "Joseph Weiner used the exposure of the piltdown hoax to support a spectacular conclusion before provenience was secure. The claim outruns the trench record.",
              "v": "danger",
              "fb": "Appearance alone cannot establish where an object came from or how long it was buried."
            }
          ]
        },
        {
          "q": "What field procedure most closely follows the standard described in this profile?",
          "o": [
            {
              "t": "Follow the stated field method, preserve every context record, and compare the result independently. It remains checkable.",
              "v": "expert",
              "fb": "Yes: excavation becomes scientific through a retraceable record of an unrepeatable operation."
            },
            {
              "t": "Record the finest object carefully, but leave routine fragments and soil changes undocumented. The key test is missing.",
              "v": "partial",
              "fb": "Selective recording destroys the comparative evidence carried by ordinary material."
            },
            {
              "t": "Remove the deposit quickly, then reconstruct its order later from the excavator's memory. The field record points elsewhere.",
              "v": "wrong",
              "fb": "Memory cannot recreate interfaces and associations removed during digging."
            },
            {
              "t": "Publicize the identification first, and postpone specialist review of context and laboratory evidence. Checking comes later.",
              "v": "danger",
              "fb": "Early publicity can harden a guess before the deposit has been evaluated."
            }
          ]
        },
        {
          "q": "Which conclusion follows most responsibly from the exposure of the piltdown hoax?",
          "o": [
            {
              "t": "Independent context and converging tests should determine the strength of the archaeological claim. Others can retrace it; in use.",
              "v": "expert",
              "fb": "Exactly: context and independent agreement determine how much an archaeological conclusion can carry."
            },
            {
              "t": "A larger collection should settle the question even when most pieces lack secure provenience. The main comparison is absent.",
              "v": "partial",
              "fb": "Quantity does not repair the missing history of where objects were recovered."
            },
            {
              "t": "A coherent reconstruction should outweigh chemical dates and stratigraphy that contradict it. The evidence points elsewhere.",
              "v": "wrong",
              "fb": "Narrative coherence cannot overrule incompatible physical and stratigraphic evidence."
            },
            {
              "t": "The discovery would either transform prehistory substantially or deserve no further investigation. The claim outruns the trench record.",
              "v": "danger",
              "fb": "Measured revision is more informative than choosing between spectacle and abandonment."
            }
          ]
        }
      ]
    },
    "ah_grahameclark": {
      "sci": "Grahame Clark (1907–1995)",
      "topic": "Economic prehistory & method",
      "lede": "Grahame Clark made economic prehistory and method a discipline of layers, context, and records that outlast the excavation.",
      "no": 7,
      "profile": "Today’s field note begins with Grahame Clark, whose work provides a practical entrance to economic prehistory and method. Grahame Clark broadened prehistoric archaeology by studying subsistence, environment, technology, and daily life, notably at Star Carr. Archaeology gains meaning from position and association, so an object removed from its setting loses part of its history. Clark’s contribution made recording a form of evidence rather than clerical housekeeping.\n\nThe operational core is straightforward to state and demanding to perform: reconstruct economies from animal bone, plant remains, tools, settlement evidence, and environmental context. Soil changes, object groupings, laboratory measurements, and custody records must be kept distinct before they are combined. A conclusion should explain why those lines agree and acknowledge what a disturbed deposit or contaminated sample cannot establish.\n\nThis approach changed excavation from treasure recovery into controlled destruction with a permanent record. Because digging cannot be repeated after a layer is removed, plans, sections, labels, photographs, and samples become the experiment’s surviving trace. Comparison across sites then depends on whether those traces were made consistently.\n\nThe durable rule is ordinary traces of food and work can reveal social life that monuments and elite objects omit. Archaeological confidence grows from context that remains available after the excitement of discovery has passed. Even ordinary fragments can become decisive when their location and associations are secure. A spectacular specimen without provenience may answer fewer questions than a box of carefully labeled debris. Even ordinary fragments can become decisive when their location and associations are secure.",
      "frame": "Brushes grit from a sample tray. \"At The Dating Laboratory, context disappears faster than bone. Tell me what economic prehistory and method requires before I open the field log.\"",
      "q": [
        {
          "q": "Which archaeological account best represents Grahame Clark’s work on economic prehistory and method?",
          "o": [
            {
              "t": "Grahame Clark made economic prehistory and method depend on recorded context, sequence, and comparative evidence. It remains checkable. Others can retrace it.",
              "v": "expert",
              "fb": "Correct: archaeological meaning depends on the documented relation between object, deposit, and comparison."
            },
            {
              "t": "Grahame Clark treated economic prehistory and method as a useful theme but left the deposit history incompletely tested. The main comparison is absent.",
              "v": "partial",
              "fb": "Rarity may attract attention, but it does not reconstruct a deposit or chronology."
            },
            {
              "t": "Grahame Clark let labels and collector authority decide economic prehistory and method despite conflicting field records. The evidence points elsewhere.",
              "v": "wrong",
              "fb": "A label is a claim about provenience, not a substitute for provenience."
            },
            {
              "t": "Grahame Clark used economic prehistory and method to support a spectacular conclusion before provenience was secure. The claim outruns the trench record.",
              "v": "danger",
              "fb": "Appearance alone cannot establish where an object came from or how long it was buried."
            }
          ]
        },
        {
          "q": "What field procedure most closely follows the standard described in this profile?",
          "o": [
            {
              "t": "Follow the stated field method, preserve every context record, and compare the result independently. It remains checkable.",
              "v": "expert",
              "fb": "Yes: excavation becomes scientific through a retraceable record of an unrepeatable operation."
            },
            {
              "t": "Record the finest object carefully, but leave routine fragments and soil changes undocumented. The key test is missing.",
              "v": "partial",
              "fb": "Selective recording destroys the comparative evidence carried by ordinary material."
            },
            {
              "t": "Remove the deposit quickly, then reconstruct its order later from the excavator's memory. The field record points elsewhere.",
              "v": "wrong",
              "fb": "Memory cannot recreate interfaces and associations removed during digging."
            },
            {
              "t": "Publicize the identification first, and postpone specialist review of context and laboratory evidence. Checking comes later.",
              "v": "danger",
              "fb": "Early publicity can harden a guess before the deposit has been evaluated."
            }
          ]
        },
        {
          "q": "Which conclusion follows most responsibly from economic prehistory and method?",
          "o": [
            {
              "t": "Independent context and converging tests should determine the strength of the archaeological claim. Others can retrace it; in use.",
              "v": "expert",
              "fb": "Exactly: context and independent agreement determine how much an archaeological conclusion can carry."
            },
            {
              "t": "A larger collection should settle the question even when most pieces lack secure provenience. The main comparison is absent.",
              "v": "partial",
              "fb": "Quantity does not repair the missing history of where objects were recovered."
            },
            {
              "t": "A coherent reconstruction should outweigh chemical dates and stratigraphy that contradict it. The evidence points elsewhere.",
              "v": "wrong",
              "fb": "Narrative coherence cannot overrule incompatible physical and stratigraphic evidence."
            },
            {
              "t": "The discovery would either transform prehistory substantially or deserve no further investigation. The claim outruns the trench record.",
              "v": "danger",
              "fb": "Measured revision is more informative than choosing between spectacle and abandonment."
            }
          ]
        }
      ]
    },
    "ah_nelson": {
      "sci": "Nels Nelson (1875–1964)",
      "topic": "Stratigraphic excavation",
      "lede": "Nels Nelson taught archaeologists to read stratigraphic excavation through associations that digging can expose only once.",
      "no": 8,
      "profile": "Today’s field note begins with Nels Nelson, whose work provides a practical entrance to stratigraphic excavation. Nels Nelson demonstrated systematic stratigraphic excavation in the American Southwest, recording pottery changes through successive levels at sites such as Pueblo San Cristóbal. Archaeology gains meaning from position and association, so an object removed from its setting loses part of its history. Nelson’s contribution made recording a form of evidence rather than clerical housekeeping.\n\nThe operational core is straightforward to state and demanding to perform: excavate deposits in measured levels and correlate changing artifact frequencies with vertical position. Soil changes, object groupings, laboratory measurements, and custody records must be kept distinct before they are combined. A conclusion should explain why those lines agree and acknowledge what a disturbed deposit or contaminated sample cannot establish.\n\nThis approach changed excavation from treasure recovery into controlled destruction with a permanent record. Because digging cannot be repeated after a layer is removed, plans, sections, labels, photographs, and samples become the experiment’s surviving trace. Comparison across sites then depends on whether those traces were made consistently.\n\nThe durable rule is repeated quantitative changes through depth can establish chronology more reliably than isolated stylistic guesses. Archaeological confidence grows from context that remains available after the excitement of discovery has passed. Even ordinary fragments can become decisive when their location and associations are secure. A spectacular specimen without provenience may answer fewer questions than a box of carefully labeled debris. Even ordinary fragments can become decisive when their location and associations are secure.",
      "frame": "Keeps the accession tag turned face down. \"Earn the provenience first: explain stratigraphic excavation, then I will show you what was recorded here.\"",
      "q": [
        {
          "q": "Which archaeological account best represents Nels Nelson’s work on stratigraphic excavation?",
          "o": [
            {
              "t": "Nels Nelson made stratigraphic excavation depend on recorded context, sequence, and comparative evidence. It remains checkable. Others can retrace it.",
              "v": "expert",
              "fb": "Correct: archaeological meaning depends on the documented relation between object, deposit, and comparison."
            },
            {
              "t": "Nels Nelson treated stratigraphic excavation as a useful theme but left the deposit history incompletely tested. The main comparison is absent.",
              "v": "partial",
              "fb": "Rarity may attract attention, but it does not reconstruct a deposit or chronology."
            },
            {
              "t": "Nels Nelson let labels and collector authority decide stratigraphic excavation despite conflicting field records. The evidence points elsewhere.",
              "v": "wrong",
              "fb": "A label is a claim about provenience, not a substitute for provenience."
            },
            {
              "t": "Nels Nelson used stratigraphic excavation to support a spectacular conclusion before provenience was secure. The claim outruns the trench record.",
              "v": "danger",
              "fb": "Appearance alone cannot establish where an object came from or how long it was buried."
            }
          ]
        },
        {
          "q": "What field procedure most closely follows the standard described in this profile?",
          "o": [
            {
              "t": "Follow the stated field method, preserve every context record, and compare the result independently. It remains checkable.",
              "v": "expert",
              "fb": "Yes: excavation becomes scientific through a retraceable record of an unrepeatable operation."
            },
            {
              "t": "Record the finest object carefully, but leave routine fragments and soil changes undocumented. The key test is missing.",
              "v": "partial",
              "fb": "Selective recording destroys the comparative evidence carried by ordinary material."
            },
            {
              "t": "Remove the deposit quickly, then reconstruct its order later from the excavator's memory. The field record points elsewhere.",
              "v": "wrong",
              "fb": "Memory cannot recreate interfaces and associations removed during digging."
            },
            {
              "t": "Publicize the identification first, and postpone specialist review of context and laboratory evidence. Checking comes later.",
              "v": "danger",
              "fb": "Early publicity can harden a guess before the deposit has been evaluated."
            }
          ]
        },
        {
          "q": "Which conclusion follows most responsibly from stratigraphic excavation?",
          "o": [
            {
              "t": "Independent context and converging tests should determine the strength of the archaeological claim. Others can retrace it; in use.",
              "v": "expert",
              "fb": "Exactly: context and independent agreement determine how much an archaeological conclusion can carry."
            },
            {
              "t": "A larger collection should settle the question even when most pieces lack secure provenience. The main comparison is absent.",
              "v": "partial",
              "fb": "Quantity does not repair the missing history of where objects were recovered."
            },
            {
              "t": "A coherent reconstruction should outweigh chemical dates and stratigraphy that contradict it. The evidence points elsewhere.",
              "v": "wrong",
              "fb": "Narrative coherence cannot overrule incompatible physical and stratigraphic evidence."
            },
            {
              "t": "The discovery would either transform prehistory substantially or deserve no further investigation. The claim outruns the trench record.",
              "v": "danger",
              "fb": "Measured revision is more informative than choosing between spectacle and abandonment."
            }
          ]
        }
      ]
    },
    "ah_suess": {
      "sci": "Hans Suess (1909–1993)",
      "topic": "Radiocarbon calibration",
      "lede": "A trench becomes evidence through Hans Suess's approach to radiocarbon calibration, not through the rarity of its finds.",
      "no": 9,
      "profile": "Today’s field note begins with Hans Suess, whose work provides a practical entrance to radiocarbon calibration. Hans Suess identified variations in atmospheric radiocarbon, including the fossil-fuel dilution known as the Suess effect, and helped improve calibration. Archaeology gains meaning from position and association, so an object removed from its setting loses part of its history. Suess’s contribution made recording a form of evidence rather than clerical housekeeping.\n\nThe operational core is straightforward to state and demanding to perform: compare radiocarbon measurements with independently dated material to detect changes in atmospheric carbon through time. Soil changes, object groupings, laboratory measurements, and custody records must be kept distinct before they are combined. A conclusion should explain why those lines agree and acknowledge what a disturbed deposit or contaminated sample cannot establish.\n\nThis approach changed excavation from treasure recovery into controlled destruction with a permanent record. Because digging cannot be repeated after a layer is removed, plans, sections, labels, photographs, and samples become the experiment’s surviving trace. Comparison across sites then depends on whether those traces were made consistently.\n\nThe durable rule is radiocarbon years cannot be treated as calendar years without accounting for a changing atmosphere. Archaeological confidence grows from context that remains available after the excitement of discovery has passed. Even ordinary fragments can become decisive when their location and associations are secure. A spectacular specimen without provenience may answer fewer questions than a box of carefully labeled debris. Even ordinary fragments can become decisive when their location and associations are secure.",
      "frame": "Points toward a numbered section drawing. \"A find without its layer is half a fact. Show me you understand radiocarbon calibration.\"",
      "q": [
        {
          "q": "Which archaeological account best represents Hans Suess’s work on radiocarbon calibration?",
          "o": [
            {
              "t": "Hans Suess made radiocarbon calibration depend on recorded context, sequence, and comparative evidence. It remains checkable. Others can retrace it.",
              "v": "expert",
              "fb": "Correct: archaeological meaning depends on the documented relation between object, deposit, and comparison."
            },
            {
              "t": "Hans Suess treated radiocarbon calibration as a useful theme but left the deposit history incompletely tested. The main comparison is absent.",
              "v": "partial",
              "fb": "Rarity may attract attention, but it does not reconstruct a deposit or chronology."
            },
            {
              "t": "Hans Suess let labels and collector authority decide radiocarbon calibration despite conflicting field records. The evidence points elsewhere.",
              "v": "wrong",
              "fb": "A label is a claim about provenience, not a substitute for provenience."
            },
            {
              "t": "Hans Suess used radiocarbon calibration to support a spectacular conclusion before provenience was secure. The claim outruns the trench record.",
              "v": "danger",
              "fb": "Appearance alone cannot establish where an object came from or how long it was buried."
            }
          ]
        },
        {
          "q": "What field procedure most closely follows the standard described in this profile?",
          "o": [
            {
              "t": "Follow the stated field method, preserve every context record, and compare the result independently. It remains checkable.",
              "v": "expert",
              "fb": "Yes: excavation becomes scientific through a retraceable record of an unrepeatable operation."
            },
            {
              "t": "Record the finest object carefully, but leave routine fragments and soil changes undocumented. The key test is missing.",
              "v": "partial",
              "fb": "Selective recording destroys the comparative evidence carried by ordinary material."
            },
            {
              "t": "Remove the deposit quickly, then reconstruct its order later from the excavator's memory. The field record points elsewhere.",
              "v": "wrong",
              "fb": "Memory cannot recreate interfaces and associations removed during digging."
            },
            {
              "t": "Publicize the identification first, and postpone specialist review of context and laboratory evidence. Checking comes later.",
              "v": "danger",
              "fb": "Early publicity can harden a guess before the deposit has been evaluated."
            }
          ]
        },
        {
          "q": "Which conclusion follows most responsibly from radiocarbon calibration?",
          "o": [
            {
              "t": "Independent context and converging tests should determine the strength of the archaeological claim. Others can retrace it; in use.",
              "v": "expert",
              "fb": "Exactly: context and independent agreement determine how much an archaeological conclusion can carry."
            },
            {
              "t": "A larger collection should settle the question even when most pieces lack secure provenience. The main comparison is absent.",
              "v": "partial",
              "fb": "Quantity does not repair the missing history of where objects were recovered."
            },
            {
              "t": "A coherent reconstruction should outweigh chemical dates and stratigraphy that contradict it. The evidence points elsewhere.",
              "v": "wrong",
              "fb": "Narrative coherence cannot overrule incompatible physical and stratigraphic evidence."
            },
            {
              "t": "The discovery would either transform prehistory substantially or deserve no further investigation. The claim outruns the trench record.",
              "v": "danger",
              "fb": "Measured revision is more informative than choosing between spectacle and abandonment."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "ah_tech": {
      "ah_pit": "Lab Tech Oona kneels beside a crate at the gravel pit & dig, checking the tag twice. \"Runs the fluorine and nitrogen tests; the jaw and the skull are nowhere near the same age. Soil remembers what publicity forgets.\"",
      "ah_gallery": "Lab Tech Oona kneels beside a crate at the museum gallery, checking the tag twice. \"Runs the fluorine and nitrogen tests; the jaw and the skull are nowhere near the same age. Soil remembers what publicity forgets.\"",
      "ah_lab": "Lab Tech Oona kneels beside a crate at the dating laboratory, checking the tag twice. \"Runs the fluorine and nitrogen tests; the jaw and the skull are nowhere near the same age. Soil remembers what publicity forgets.\""
    },
    "ah_foreman": {
      "ah_pit": "Dig Foreman Cray kneels beside a crate at the gravel pit & dig, checking the tag twice. \"Dug the pit for years; the prize pieces only ever turned up when one man was watching. Soil remembers what publicity forgets.\"",
      "ah_gallery": "Dig Foreman Cray kneels beside a crate at the museum gallery, checking the tag twice. \"Dug the pit for years; the prize pieces only ever turned up when one man was watching. Soil remembers what publicity forgets.\"",
      "ah_lab": "Dig Foreman Cray kneels beside a crate at the dating laboratory, checking the tag twice. \"Dug the pit for years; the prize pieces only ever turned up when one man was watching. Soil remembers what publicity forgets.\""
    },
    "ah_registrar": {
      "ah_pit": "Registrar Pell kneels beside a crate at the gravel pit & dig, checking the tag twice. \"Keeps the accession records; the find has no honest chain of discovery. Soil remembers what publicity forgets.\"",
      "ah_gallery": "Registrar Pell kneels beside a crate at the museum gallery, checking the tag twice. \"Keeps the accession records; the find has no honest chain of discovery. Soil remembers what publicity forgets.\"",
      "ah_lab": "Registrar Pell kneels beside a crate at the dating laboratory, checking the tag twice. \"Keeps the accession records; the find has no honest chain of discovery. Soil remembers what publicity forgets.\""
    }
  },
  "story": [
    "<p>Rainwater shines in the Cranmoor gravel while a skull fragment waits behind museum glass. The celebrated discovery has arrived with less context than dust.</p>",
    "<p><b>Lab Tech Oona</b> can read the laboratory dates, <b>Dig Foreman Cray</b> remembers who stood over each trench, and <b>Registrar Pell</b> controls the accession trail.</p>",
    "<p><b>The missing link — the earliest human ancestor</b> would rewrite human origins; <b>A muddle — an amateur's honest mistake</b> would excuse every broken record. Both answers ask you to stop before the layers do.</p>",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and decide the <b>WHAT</b> from the evidence."
  ],
  "endings": {
    "overclaimWhat": "ah_link",
    "dismissalWhat": "ah_mistake",
    "win": {
      "expertTitle": "The Composite Comes Apart",
      "expert": [
        "You identify <b>Silas Fenn — the amateur antiquary who 'found' it</b>, place the decisive exposure in <b>The Dating Laboratory</b>, and name <b>A planted composite: filed, stained, and caught by dating</b>. Not the missing link — the earliest human ancestor. Not a muddle — an amateur's honest mistake.",
        "The incompatible ages, altered surfaces, and broken chain of discovery now form one archaeological argument. The skull and jaw did not share a burial; the supposed context was manufactured around them."
      ],
      "soundTitle": "Context Restored",
      "sound": [
        "Your accusation correctly joins <b>Silas Fenn — the amateur antiquary who 'found' it</b>, <b>The Dating Laboratory</b>, and <b>A planted composite: filed, stained, and caught by dating</b>. The dating results and accession history support the central finding.",
        "A few details of preparation remain uncertain, but the composite itself is no longer defensible as an honest excavation result. The museum can separate the authentic components from the invented association."
      ],
      "namedTitle": "The Right Trench",
      "named": [
        "You choose the correct answer: <b>Silas Fenn — the amateur antiquary who 'found' it</b>, exposed at <b>The Dating Laboratory</b>, through <b>A planted composite: filed, stained, and caught by dating</b>.",
        "The report needs a fuller account of filing, staining, and custody, yet it now points investigators toward the evidence that can supply one."
      ]
    },
    "overclaim": {
      "title": "The Missing Link That Wasn’t",
      "body": [
        "You declare <b>The missing link — the earliest human ancestor</b> and give the planted object the triumph its maker designed for it. The chemical mismatch and doctored anatomy become footnotes to a headline.",
        "Once the claim collapses, genuine dating evidence is tainted by association with your overreach. A provable fraud is made to look like scholarly jealousy toward a great discovery."
      ]
    },
    "dismissal": {
      "title": "An Error With Tool Marks",
      "body": [
        "You accept <b>A muddle — an amateur's honest mistake</b>, treating incompatible ages, artificial staining, and absent provenience as ordinary amateur confusion.",
        "That leniency leaves deliberate alterations unexplained and rewards the person who controlled each appearance of evidence. The institution learns nothing about how a planted composite entered its collection."
      ]
    },
    "wrongNames": {
      "title": "The Fraud, Misplaced",
      "body": [
        "You recognize <b>A planted composite: filed, stained, and caught by dating</b>, but attach the planting to the wrong custodian or the decisive proof to the wrong room. Follow the specimen’s custody and the tests instead to"
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A composite skull beside a dating curve\"><path d=\"M92 40 C124 14,184 18,210 50 C228 72,216 108,184 116 L128 110 C96 102,76 72,92 40 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.6\"/><path d=\"M132 48 C150 38,176 40,188 56 M126 78 H190\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.3\"/><path d=\"M150 40 L172 110\" stroke=\"#B3261E\" stroke-width=\"2\"/><path d=\"M304 106 V28 M304 106 H594\" stroke=\"#121212\" stroke-width=\"1.4\"/><path d=\"M330 88 C390 86,430 72,470 56 S540 32,578 34\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2\"/><circle cx=\"446\" cy=\"66\" r=\"5\" fill=\"#B3261E\"/></svg>"
}};
