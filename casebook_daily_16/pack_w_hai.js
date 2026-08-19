module.exports = { PACK: {
  "id": "w_hai",
  "title": "The Ward Cluster",
  "discipline": "Hospital Epidemiology & Microbiology",
  "teaser": "A resistant infection appeared across one ward within days. Did staff hands transmit a strain, or did antibiotics select separate resistant infections? Procedure timing and typing must determine the route.",
  "overclaimTag": "hand-to-hand transmission",
  "truthTag": "a common contaminated device",
  "venue": "the Kettleridge Hospital infection inquiry",
  "agent": {
    "name": "Investigator Ida Brenner",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Microbiology Pioneers",
  "dossierName": "MICROBIOLOGY & INFECTION PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Kettleridge Hospital infection inquiry",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before your inquiry ends. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The place you test determines the dossier you receive, and the conversation costs one day.",
  "overclaimTease": "Hand transmission and antibiotic selection are both common hospital explanations; strain pattern and procedure timing must decide.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "opsmanager",
      "items": [
        {
          "id": "nurse4",
          "label": "A ward nurse"
        },
        {
          "id": "opsmanager",
          "label": "Whitlock — the hospital's operations manager"
        },
        {
          "id": "inspector2",
          "label": "The infection-control inspector"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "records",
      "items": [
        {
          "id": "ward2",
          "label": "The Affected Ward"
        },
        {
          "id": "sterile",
          "label": "The Sterile-Processing Department"
        },
        {
          "id": "records",
          "label": "The Infection-Control Office & Records"
        }
      ]
    },
    "what": {
      "title": "How did the ward cluster spread?",
      "truth": "protocol",
      "items": [
        {
          "id": "killer",
          "label": "Hand transmission moved one resistant strain between nearby patients."
        },
        {
          "id": "chance",
          "label": "Antibiotic pressure selected unrelated resistant infections independently."
        },
        {
          "id": "protocol",
          "label": "A common contaminated device carried one strain into multiple patients."
        }
      ]
    }
  },
  "PLACES": {
    "ward2": {
      "name": "The Affected Ward",
      "xy": [
        140,
        90
      ]
    },
    "sterile": {
      "name": "The Sterile-Processing Department",
      "xy": [
        330,
        240
      ]
    },
    "records": {
      "name": "The Infection-Control Office & Records",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "ward2",
      "sterile"
    ],
    [
      "sterile",
      "records"
    ]
  ],
  "CHARACTERS": {
    "chargenurse": {
      "name": "Charge Nurse Iyer",
      "role": "Charge nurse",
      "face": "🩺",
      "badge": "N",
      "legend": "the ward",
      "hint": "Knows patient movement and can identify staff assignments and ward locations during the cluster."
    },
    "cssdtech": {
      "name": "The Sterile-Processing Tech",
      "role": "Sterile-processing technician",
      "face": "♨",
      "badge": "P",
      "legend": "the sterile unit",
      "hint": "Maintains reprocessing custody and can trace instruments, staff, and departments by date."
    },
    "clerk": {
      "name": "The Clerk",
      "role": "Infection-control records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the office",
      "hint": "Holds surveillance, staffing, and management records for infection-control operations."
    }
  },
  "TOPICMAP": {
    "ward2": {
      "chargenurse": [
        "microscopy"
      ],
      "cssdtech": [
        "ecoli"
      ],
      "clerk": [
        "cultureplate"
      ]
    },
    "sterile": {
      "chargenurse": [
        "gramstain"
      ],
      "cssdtech": [
        "anaerobe"
      ],
      "clerk": [
        "penicillin"
      ]
    },
    "records": {
      "chargenurse": [
        "penisolation"
      ],
      "cssdtech": [
        "resistance"
      ],
      "clerk": [
        "infectioncontrol"
      ]
    }
  },
  "TOPICS": {
    "microscopy": {
      "sci": "Antonie van Leeuwenhoek (1632-1723)",
      "topic": "The first sight of microbes",
      "lede": "Antonie van Leeuwenhoek used the first sight of microbes to make invisible transmission visible in the laboratory and ward.",
      "no": 1,
      "profile": "Today’s microbiology cover note considers Antonie van Leeuwenhoek and the first sight of microbes. Antonie van Leeuwenhoek ground exceptionally fine single-lens microscopes and used them to describe bacteria, protozoa, sperm cells, and other microscopic life. His letters to the Royal Society made a previously invisible biological world observable. Hospital epidemiology must distinguish colonization, contamination, infection, and transmission. Leeuwenhoek’s work gives that distinction a concrete laboratory or surveillance tool.\n\nThe useful practice is to observe specimens repeatedly, document preparation and scale, and distinguish living forms from optical artifacts. Patient location, timing, specimen quality, organism identity, susceptibility, equipment, and procedure records should be aligned before declaring cases unrelated or assigning a route.\n\nHealthcare infections arise where vulnerable patients meet invasive devices, antibiotics, crowded workflows, and microbes able to persist. Sterilization, isolation, hand hygiene, environmental control, and surveillance are separate barriers; weakening several can transform sporadic cases into a cluster.\n\nThe infection-control principle: infection science begins by making organisms and their transmission visible. Prevention succeeds through repeated verified steps, not through confidence that the ward has always been safe. A negative environmental sample cannot clear a process if collection missed the relevant surface or time. Outbreak curves become more informative when antibiotic exposure and patient movement are added. A line list should preserve onset, specimen, procedure, room, device, and outcome for every suspected case. Control measures deserve follow-up cultures and compliance data so apparent improvement is not confused with incomplete detection. The earliest cases may reveal the common process before later transmission creates a more complicated pattern.",
      "frame": "Sets a culture plate under the lamp at The Affected Ward. \"Growth has a pattern. Explain the first sight of microbes before I show you the ward timeline.\"",
      "q": [
        {
          "q": "Which microbiological interpretation best captures Antonie van Leeuwenhoek’s work on the first sight of microbes?",
          "o": [
            {
              "t": "Antonie van Leeuwenhoek ground exceptionally fine single-lens microscopes and used them to describe bacteria, protozoa, sperm cells, and other microscopic life. Patient movement remains linked to organism typing.",
              "v": "expert",
              "fb": "Correct: the response joins organism evidence, patient timing, procedures, and transmission control."
            },
            {
              "t": "Antonie van Leeuwenhoek's infection work emphasizes species identification and case dates. The surface culture looks persuasive. Different diagnoses support separation. Visible cleanliness appears reassuring. Fits.",
              "v": "partial",
              "fb": "This helps, but it cannot establish the route or system failure without the missing records."
            },
            {
              "t": "Antonie van Leeuwenhoek's infection work is read within infection practice as support for a ward-surface isolate as sufficient evidence for the transmission route of nearby infections. The surface culture looks persuasive.",
              "v": "wrong",
              "fb": "That conclusion overreads or misreads what the culture, stain, or clinical pattern can show."
            },
            {
              "t": "Antonie van Leeuwenhoek's infection authority supports keeping a failed sterilizer in service when most processed instruments show little visible contamination. Visible cleanliness appears reassuring. Context fits.",
              "v": "danger",
              "fb": "That decision normalizes repeated barrier failures and allows transmission to continue."
            }
          ]
        },
        {
          "q": "Which investigation step best distinguishes a hospital cluster from coincidence?",
          "o": [
            {
              "t": "Use this outbreak-control method: observe specimens repeatedly, document preparation and scale, and distinguish living forms from optical artifacts. The transmission chain stays testable. Infection fits.",
              "v": "expert",
              "fb": "Correct: the response joins organism evidence, patient timing, procedures, and transmission control."
            },
            {
              "t": "Compare cultures and dates while treating antibiotic exposure, device history, staff movement, and sterilization records as later work. Visible cleanliness appears reassuring. The infection record fits.",
              "v": "partial",
              "fb": "This helps, but it cannot establish the route or system failure without the missing records."
            },
            {
              "t": "Declare cases unrelated when patients have different diagnoses even if the organism and procedure route match. Different diagnoses support separation. Visible cleanliness appears reassuring. Infection fits.",
              "v": "wrong",
              "fb": "That conclusion overreads or misreads what the culture, stain, or clinical pattern can show."
            },
            {
              "t": "Restore bed capacity, relax isolation, and wait for additional cases before treating the cluster as operationally linked. Bed demand favors rapid turnover. Infection records fit this infection account.",
              "v": "danger",
              "fb": "That decision normalizes repeated barrier failures and allows transmission to continue."
            }
          ]
        },
        {
          "q": "What infection-control principle is best supported?",
          "o": [
            {
              "t": "The infection lesson is that infection science begins by making organisms and their transmission visible. Patient movement remains linked to organism typing. Infection fits.",
              "v": "expert",
              "fb": "Correct: the response joins organism evidence, patient timing, procedures, and transmission control."
            },
            {
              "t": "Rely on environmental cleaning and antibiotics while isolation and instrument validation remain inconsistent. Visible cleanliness appears reassuring. Infection fits.",
              "v": "partial",
              "fb": "This helps, but it cannot establish the route or system failure without the missing records."
            },
            {
              "t": "Treat the sterilizer’s displayed temperature as sufficient evidence of sterility for the processed load. Visible cleanliness appears reassuring. The infection record fits.",
              "v": "wrong",
              "fb": "That conclusion overreads or misreads what the culture, stain, or clinical pattern can show."
            },
            {
              "t": "Attribute the cluster mainly to a malicious worker or random chance rather than repeated failures across routine controls. Infection practice makes the infection view plausible.",
              "v": "danger",
              "fb": "That decision normalizes repeated barrier failures and allows transmission to continue."
            }
          ]
        }
      ]
    },
    "ecoli": {
      "sci": "Theodor Escherich (1857-1911)",
      "topic": "E. coli & the gut flora",
      "lede": "Theodor Escherich placed e. coli and the gut flora inside the practical defenses against healthcare infection.",
      "no": 2,
      "profile": "Today’s microbiology cover note considers Theodor Escherich and e. coli and the gut flora. Theodor Escherich isolated and described bacteria from the intestines of infants, including the organism later named Escherichia coli. He helped establish that the normal gut contains characteristic microbes, some harmless in place but dangerous elsewhere. Hospital epidemiology must distinguish colonization, contamination, infection, and transmission. Escherich’s work gives that distinction a concrete laboratory or surveillance tool.\n\nThe useful practice is to interpret an isolate in relation to body site, strain, symptoms, and route of entry. Patient location, timing, specimen quality, organism identity, susceptibility, equipment, and procedure records should be aligned before declaring cases unrelated or assigning a route.\n\nHealthcare infections arise where vulnerable patients meet invasive devices, antibiotics, crowded workflows, and microbes able to persist. Sterilization, isolation, hand hygiene, environmental control, and surveillance are separate barriers; weakening several can transform sporadic cases into a cluster.\n\nThe infection-control principle: the same species can mark normal flora, contamination, or invasive infection depending on context. Prevention succeeds through repeated verified steps, not through confidence that the ward has always been safe. A negative environmental sample cannot clear a process if collection missed the relevant surface or time. Outbreak curves become more informative when antibiotic exposure and patient movement are added. A line list should preserve onset, specimen, procedure, room, device, and outcome for every suspected case. Control measures deserve follow-up cultures and compliance data so apparent improvement is not confused with incomplete detection. The earliest cases may reveal the common process before later transmission creates a more complicated pattern.",
      "frame": "Turns a surveillance chart sideways. \"Chance should not draw the same curve repeatedly. Start with e. coli and the gut flora.\"",
      "q": [
        {
          "q": "Which microbiological interpretation best captures Theodor Escherich’s work on e. coli and the gut flora?",
          "o": [
            {
              "t": "Theodor Escherich isolated and described bacteria from the intestines of infants, including the organism later named Escherichia coli. The transmission chain stays testable. Barrier failures remain linked. Context fits.",
              "v": "expert",
              "fb": "Correct: the response joins organism evidence, patient timing, procedures, and transmission control."
            },
            {
              "t": "Theodor Escherich's infection work emphasizes species identification and case dates. Different diagnoses support separation. Visible cleanliness appears reassuring. Infection timing supports this infection claim. Fits.",
              "v": "partial",
              "fb": "This helps, but it cannot establish the route or system failure without the missing records."
            },
            {
              "t": "Theodor Escherich's infection work is read within infection practice as support for a ward-surface isolate as sufficient evidence for the transmission route of nearby infections. Infection timing supports this infection claim.",
              "v": "wrong",
              "fb": "That conclusion overreads or misreads what the culture, stain, or clinical pattern can show."
            },
            {
              "t": "Theodor Escherich's infection authority supports keeping a failed sterilizer in service when most processed instruments show little visible contamination. Visible cleanliness appears reassuring. Infection fits. Fits.",
              "v": "danger",
              "fb": "That decision normalizes repeated barrier failures and allows transmission to continue."
            }
          ]
        },
        {
          "q": "Which investigation step best distinguishes a hospital cluster from coincidence?",
          "o": [
            {
              "t": "Use this outbreak-control method: interpret an isolate in relation to body site, strain, symptoms, and route of entry. The transmission chain stays testable. Infection context matters.",
              "v": "expert",
              "fb": "Correct: the response joins organism evidence, patient timing, procedures, and transmission control."
            },
            {
              "t": "Compare cultures and dates while treating antibiotic exposure, device history, staff movement, and sterilization records as later work. Bed demand favors rapid turnover. Infection fits.",
              "v": "partial",
              "fb": "This helps, but it cannot establish the route or system failure without the missing records."
            },
            {
              "t": "Declare cases unrelated when patients have different diagnoses even if the organism and procedure route match. Visible cleanliness appears reassuring. The infection record fits.",
              "v": "wrong",
              "fb": "That conclusion overreads or misreads what the culture, stain, or clinical pattern can show."
            },
            {
              "t": "Restore bed capacity, relax isolation, and wait for additional cases before treating the cluster as operationally linked. Bed demand favors rapid turnover. The infection record fits.",
              "v": "danger",
              "fb": "That decision normalizes repeated barrier failures and allows transmission to continue."
            }
          ]
        },
        {
          "q": "What infection-control principle is best supported?",
          "o": [
            {
              "t": "The infection lesson is that the same species can mark normal flora, contamination, or invasive infection depending on context. Barrier failures remain linked. Infection fits.",
              "v": "expert",
              "fb": "Correct: the response joins organism evidence, patient timing, procedures, and transmission control."
            },
            {
              "t": "Rely on environmental cleaning and antibiotics while isolation and instrument validation remain inconsistent. Visible cleanliness appears reassuring. The infection record fits.",
              "v": "partial",
              "fb": "This helps, but it cannot establish the route or system failure without the missing records."
            },
            {
              "t": "Treat the sterilizer’s displayed temperature as sufficient evidence of sterility for the processed load. Visible cleanliness appears reassuring. The infection record fits.",
              "v": "wrong",
              "fb": "That conclusion overreads or misreads what the culture, stain, or clinical pattern can show."
            },
            {
              "t": "Attribute the cluster mainly to a malicious worker or random chance rather than repeated failures across routine controls. Visible cleanliness appears reassuring. Infection fits.",
              "v": "danger",
              "fb": "That decision normalizes repeated barrier failures and allows transmission to continue."
            }
          ]
        }
      ]
    },
    "cultureplate": {
      "sci": "Julius Petri (1852-1921)",
      "topic": "The culture plate",
      "lede": "A hospital organism became traceable in practice through Julius Petri’s work on the culture plate.",
      "no": 3,
      "profile": "Today’s microbiology cover note considers Julius Petri and the culture plate. Julius Richard Petri introduced the shallow covered culture dish while working in Robert Koch's laboratory. The Petri dish gave colonies room to grow separately on solid medium and made contamination easier to recognize. Hospital epidemiology must distinguish colonization, contamination, infection, and transmission. Petri’s work gives that distinction a concrete laboratory or surveillance tool.\n\nThe useful practice is to use sterile technique and isolated colonies to trace organisms from specimen to identification. Patient location, timing, specimen quality, organism identity, susceptibility, equipment, and procedure records should be aligned before declaring cases unrelated or assigning a route.\n\nHealthcare infections arise where vulnerable patients meet invasive devices, antibiotics, crowded workflows, and microbes able to persist. Sterilization, isolation, hand hygiene, environmental control, and surveillance are separate barriers; weakening several can transform sporadic cases into a cluster.\n\nThe infection-control principle: a simple container can become a control when it separates growth and exposes contamination. Prevention succeeds through repeated verified steps, not through confidence that the ward has always been safe. A negative environmental sample cannot clear a process if collection missed the relevant surface or time. Outbreak curves become more informative when antibiotic exposure and patient movement are added. A line list should preserve onset, specimen, procedure, room, device, and outcome for every suspected case. Control measures deserve follow-up cultures and compliance data so apparent improvement is not confused with incomplete detection. The earliest cases may reveal the common process before later transmission creates a more complicated pattern.",
      "frame": "Seals an instrument tray. \"Clean-looking is not sterile. Tell me what the culture plate actually proves.\"",
      "q": [
        {
          "q": "Which microbiological interpretation best captures Julius Petri’s work on the culture plate?",
          "o": [
            {
              "t": "Julius Richard Petri introduced the shallow covered culture dish while working in Robert Koch's laboratory. Isolation changes can be checked against transmission. Infection fits.",
              "v": "expert",
              "fb": "Correct: the response joins organism evidence, patient timing, procedures, and transmission control."
            },
            {
              "t": "Julius Petri's infection work emphasizes species identification and case dates. Visible cleanliness appears reassuring. Infection practice makes the infection view plausible. Fits.",
              "v": "partial",
              "fb": "This helps, but it cannot establish the route or system failure without the missing records."
            },
            {
              "t": "Julius Petri's infection work is read within infection practice as support for a ward-surface isolate as sufficient evidence for the transmission route of nearby infections. Infection fits.",
              "v": "wrong",
              "fb": "That conclusion overreads or misreads what the culture, stain, or clinical pattern can show."
            },
            {
              "t": "Julius Petri's infection authority supports keeping a failed sterilizer in service when most processed instruments show little visible contamination. The infection record fits. Fits.",
              "v": "danger",
              "fb": "That decision normalizes repeated barrier failures and allows transmission to continue."
            }
          ]
        },
        {
          "q": "Which investigation step best distinguishes a hospital cluster from coincidence?",
          "o": [
            {
              "t": "Use this outbreak-control method: use sterile technique and isolated colonies to trace organisms from specimen to identification. Barrier failures remain linked. Infection fits.",
              "v": "expert",
              "fb": "Correct: the response joins organism evidence, patient timing, procedures, and transmission control."
            },
            {
              "t": "Compare cultures and dates while treating antibiotic exposure, device history, staff movement, and sterilization records as later work. Bed demand favors rapid turnover.",
              "v": "partial",
              "fb": "This helps, but it cannot establish the route or system failure without the missing records."
            },
            {
              "t": "Declare cases unrelated when patients have different diagnoses even if the organism and procedure route match. Bed demand favors rapid turnover. The infection practice fits.",
              "v": "wrong",
              "fb": "That conclusion overreads or misreads what the culture, stain, or clinical pattern can show."
            },
            {
              "t": "Restore bed capacity, relax isolation, and wait for additional cases before treating the cluster as operationally linked. The surface culture looks persuasive. Infection fits.",
              "v": "danger",
              "fb": "That decision normalizes repeated barrier failures and allows transmission to continue."
            }
          ]
        },
        {
          "q": "What infection-control principle is best supported?",
          "o": [
            {
              "t": "The infection lesson is that a simple container can become a control when it separates growth and exposes contamination. Barrier failures remain linked.",
              "v": "expert",
              "fb": "Correct: the response joins organism evidence, patient timing, procedures, and transmission control."
            },
            {
              "t": "Rely on environmental cleaning and antibiotics while isolation and instrument validation remain inconsistent. Visible cleanliness appears reassuring.",
              "v": "partial",
              "fb": "This helps, but it cannot establish the route or system failure without the missing records."
            },
            {
              "t": "Treat the sterilizer’s displayed temperature as sufficient evidence of sterility for the processed load. Visible cleanliness appears reassuring.",
              "v": "wrong",
              "fb": "That conclusion overreads or misreads what the culture, stain, or clinical pattern can show."
            },
            {
              "t": "Attribute the cluster mainly to a malicious worker or random chance rather than repeated failures across routine controls. Bed demand favors rapid turnover.",
              "v": "danger",
              "fb": "That decision normalizes repeated barrier failures and allows transmission to continue."
            }
          ]
        }
      ]
    },
    "gramstain": {
      "sci": "Hans Christian Gram (1853-1938)",
      "topic": "The Gram stain",
      "lede": "Hans Christian Gram used the gram stain to make invisible transmission visible in the laboratory and ward.",
      "no": 4,
      "profile": "Today’s microbiology cover note considers Hans Christian Gram and the gram stain. Hans Christian Gram developed a staining procedure that separates bacteria according to how their cell walls retain crystal violet after decolorization. Gram-positive and Gram-negative reactions quickly guide identification and treatment, though they do not by themselves name a species. Hospital epidemiology must distinguish colonization, contamination, infection, and transmission. Gram’s work gives that distinction a concrete laboratory or surveillance tool.\n\nThe useful practice is to standardize staining, controls, timing, and interpretation before using morphology to guide action. Patient location, timing, specimen quality, organism identity, susceptibility, equipment, and procedure records should be aligned before declaring cases unrelated or assigning a route.\n\nHealthcare infections arise where vulnerable patients meet invasive devices, antibiotics, crowded workflows, and microbes able to persist. Sterilization, isolation, hand hygiene, environmental control, and surveillance are separate barriers; weakening several can transform sporadic cases into a cluster.\n\nThe infection-control principle: a rapid classification is valuable when its limits remain explicit. Prevention succeeds through repeated verified steps, not through confidence that the ward has always been safe. A negative environmental sample cannot clear a process if collection missed the relevant surface or time. Outbreak curves become more informative when antibiotic exposure and patient movement are added. A line list should preserve onset, specimen, procedure, room, device, and outcome for every suspected case. Control measures deserve follow-up cultures and compliance data so apparent improvement is not confused with incomplete detection. The earliest cases may reveal the common process before later transmission creates a more complicated pattern.",
      "frame": "Sets a culture plate under the lamp at The Sterile-Processing Department. \"Growth has a pattern. Explain the gram stain before I show you the ward timeline.\"",
      "q": [
        {
          "q": "Which microbiological interpretation best captures Hans Christian Gram’s work on the gram stain?",
          "o": [
            {
              "t": "Hans Christian Gram developed a staining procedure that separates bacteria according to how their cell walls retain crystal violet after decolorization. The transmission chain stays testable. Infection fits.",
              "v": "expert",
              "fb": "Correct: the response joins organism evidence, patient timing, procedures, and transmission control."
            },
            {
              "t": "Hans Christian Gram's infection work relies on species identification and case dates. Bed demand favors rapid turnover. Infection records fit this infection account. The surface culture looks persuasive.",
              "v": "partial",
              "fb": "This helps, but it cannot establish the route or system failure without the missing records."
            },
            {
              "t": "Hans Christian Gram's infection work supports a ward-surface isolate as sufficient evidence for the transmission route of nearby infections. Visible cleanliness appears reassuring. Infection fits.",
              "v": "wrong",
              "fb": "That conclusion overreads or misreads what the culture, stain, or clinical pattern can show."
            },
            {
              "t": "Hans Christian Gram's infection authority supports keeping a failed sterilizer in service when most processed instruments show little visible contamination. Bed demand favors rapid turnover. Infection fits.",
              "v": "danger",
              "fb": "That decision normalizes repeated barrier failures and allows transmission to continue."
            }
          ]
        },
        {
          "q": "Which investigation step best distinguishes a hospital cluster from coincidence?",
          "o": [
            {
              "t": "Use this outbreak-control method: standardize staining, controls, timing, and interpretation before using morphology to guide action. Barrier failures remain linked. Infection context matters.",
              "v": "expert",
              "fb": "Correct: the response joins organism evidence, patient timing, procedures, and transmission control."
            },
            {
              "t": "Compare cultures and dates while treating antibiotic exposure, device history, staff movement, and sterilization records as later work. Bed demand favors rapid turnover. Infection fits. Infection fits.",
              "v": "partial",
              "fb": "This helps, but it cannot establish the route or system failure without the missing records."
            },
            {
              "t": "Declare cases unrelated when patients have different diagnoses even if the organism and procedure route match. Bed demand favors rapid turnover. The infection practice fits. The infection record fits.",
              "v": "wrong",
              "fb": "That conclusion overreads or misreads what the culture, stain, or clinical pattern can show."
            },
            {
              "t": "Restore bed capacity, relax isolation, and wait for additional cases before treating the cluster as operationally linked. Visible cleanliness appears reassuring. The infection record fits. Infection fits.",
              "v": "danger",
              "fb": "That decision normalizes repeated barrier failures and allows transmission to continue."
            }
          ]
        },
        {
          "q": "What infection-control principle is best supported?",
          "o": [
            {
              "t": "The infection lesson is that a rapid classification is valuable when its limits remain explicit. Isolation changes can be checked against transmission.",
              "v": "expert",
              "fb": "Correct: the response joins organism evidence, patient timing, procedures, and transmission control."
            },
            {
              "t": "Rely on environmental cleaning and antibiotics while isolation and instrument validation remain inconsistent. Visible cleanliness appears reassuring.",
              "v": "partial",
              "fb": "This helps, but it cannot establish the route or system failure without the missing records."
            },
            {
              "t": "Treat the sterilizer’s displayed temperature as sufficient evidence of sterility for the processed load. Visible cleanliness appears reassuring.",
              "v": "wrong",
              "fb": "That conclusion overreads or misreads what the culture, stain, or clinical pattern can show."
            },
            {
              "t": "Attribute the cluster mainly to a malicious worker or random chance rather than repeated failures across routine controls. Bed demand favors rapid turnover.",
              "v": "danger",
              "fb": "That decision normalizes repeated barrier failures and allows transmission to continue."
            }
          ]
        }
      ]
    },
    "anaerobe": {
      "sci": "Kitasato Shibasaburō (1853-1931)",
      "topic": "Anaerobic culture & pathogens",
      "lede": "Kitasato Shibasaburō placed anaerobic culture and pathogens inside the practical defenses against healthcare infection.",
      "no": 5,
      "profile": "Today’s microbiology cover note considers Kitasato Shibasaburō and anaerobic culture and pathogens. Kitasato Shibasaburō developed methods for culturing bacteria without oxygen and obtained pure cultures of the tetanus bacillus. His work demonstrated that important pathogens could be missed if laboratory conditions were unsuitable. Hospital epidemiology must distinguish colonization, contamination, infection, and transmission. Shibasaburō’s work gives that distinction a concrete laboratory or surveillance tool.\n\nThe useful practice is to match transport and culture conditions to the organism's oxygen requirements. Patient location, timing, specimen quality, organism identity, susceptibility, equipment, and procedure records should be aligned before declaring cases unrelated or assigning a route.\n\nHealthcare infections arise where vulnerable patients meet invasive devices, antibiotics, crowded workflows, and microbes able to persist. Sterilization, isolation, hand hygiene, environmental control, and surveillance are separate barriers; weakening several can transform sporadic cases into a cluster.\n\nThe infection-control principle: a negative culture may reflect a failed method rather than absence of a pathogen. Prevention succeeds through repeated verified steps, not through confidence that the ward has always been safe. A negative environmental sample cannot clear a process if collection missed the relevant surface or time. Outbreak curves become more informative when antibiotic exposure and patient movement are added. A line list should preserve onset, specimen, procedure, room, device, and outcome for every suspected case. Control measures deserve follow-up cultures and compliance data so apparent improvement is not confused with incomplete detection. The earliest cases may reveal the common process before later transmission creates a more complicated pattern. A negative environmental sample cannot clear a process if collection missed the relevant surface or time.",
      "frame": "Turns a surveillance chart sideways. \"Chance should not draw the same curve repeatedly. Start with anaerobic culture and pathogens.\"",
      "q": [
        {
          "q": "Which microbiological interpretation best captures Kitasato Shibasaburō’s work on anaerobic culture and pathogens?",
          "o": [
            {
              "t": "Kitasato Shibasaburō developed methods for culturing bacteria without oxygen and obtained pure cultures of the tetanus bacillus. Patient movement remains linked to organism typing. Infection fits.",
              "v": "expert",
              "fb": "Correct: the response joins organism evidence, patient timing, procedures, and transmission control."
            },
            {
              "t": "Kitasato Shibasaburō's infection work emphasizes species identification and case dates. Different diagnoses support separation. Visible cleanliness appears reassuring. The infection record fits.",
              "v": "partial",
              "fb": "This helps, but it cannot establish the route or system failure without the missing records."
            },
            {
              "t": "Kitasato Shibasaburō's infection work supports a ward-surface isolate as sufficient evidence for the transmission route of nearby infections. Infection records fit this infection account.",
              "v": "wrong",
              "fb": "That conclusion overreads or misreads what the culture, stain, or clinical pattern can show."
            },
            {
              "t": "Kitasato Shibasaburō's authority is invoked in infection practice to justify keeping a failed sterilizer in service when most processed instruments show little visible contamination. Infection fits.",
              "v": "danger",
              "fb": "That decision normalizes repeated barrier failures and allows transmission to continue."
            }
          ]
        },
        {
          "q": "Which investigation step best distinguishes a hospital cluster from coincidence?",
          "o": [
            {
              "t": "Use this outbreak-control method: match transport and culture conditions to the organism's oxygen requirements. Patient movement remains linked to organism typing.",
              "v": "expert",
              "fb": "Correct: the response joins organism evidence, patient timing, procedures, and transmission control."
            },
            {
              "t": "Compare cultures and dates while treating antibiotic exposure, device history, staff movement, and sterilization records as later work. Bed demand favors rapid turnover.",
              "v": "partial",
              "fb": "This helps, but it cannot establish the route or system failure without the missing records."
            },
            {
              "t": "Declare cases unrelated when patients have different diagnoses even if the organism and procedure route match. Bed demand favors rapid turnover. The infection practice fits.",
              "v": "wrong",
              "fb": "That conclusion overreads or misreads what the culture, stain, or clinical pattern can show."
            },
            {
              "t": "Restore bed capacity, relax isolation, and wait for additional cases before treating the cluster as operationally linked. Visible cleanliness appears reassuring.",
              "v": "danger",
              "fb": "That decision normalizes repeated barrier failures and allows transmission to continue."
            }
          ]
        },
        {
          "q": "What infection-control principle is best supported?",
          "o": [
            {
              "t": "The infection lesson is that a negative culture may reflect a failed method rather than absence of a pathogen. The transmission chain stays testable.",
              "v": "expert",
              "fb": "Correct: the response joins organism evidence, patient timing, procedures, and transmission control."
            },
            {
              "t": "Rely on environmental cleaning and antibiotics while isolation and instrument validation remain inconsistent. The surface culture looks persuasive.",
              "v": "partial",
              "fb": "This helps, but it cannot establish the route or system failure without the missing records."
            },
            {
              "t": "Treat the sterilizer’s displayed temperature as sufficient evidence of sterility for the processed load. Visible cleanliness appears reassuring.",
              "v": "wrong",
              "fb": "That conclusion overreads or misreads what the culture, stain, or clinical pattern can show."
            },
            {
              "t": "Attribute the cluster mainly to a malicious worker or random chance rather than repeated failures across routine controls. Bed demand favors rapid turnover.",
              "v": "danger",
              "fb": "That decision normalizes repeated barrier failures and allows transmission to continue."
            }
          ]
        }
      ]
    },
    "penicillin": {
      "sci": "Alexander Fleming (1881-1955)",
      "topic": "Penicillin",
      "lede": "A hospital organism became traceable in practice through Alexander Fleming’s work on penicillin.",
      "no": 6,
      "profile": "Today’s microbiology cover note considers Alexander Fleming and penicillin. Alexander Fleming noticed that a contaminating Penicillium mold inhibited nearby staphylococcal colonies. He described penicillin's antibacterial effect but did not turn it into a stable, mass-produced medicine. Hospital epidemiology must distinguish colonization, contamination, infection, and transmission. Fleming’s work gives that distinction a concrete laboratory or surveillance tool.\n\nThe useful practice is to investigate an unexpected laboratory observation with controls rather than discarding it as contamination. Patient location, timing, specimen quality, organism identity, susceptibility, equipment, and procedure records should be aligned before declaring cases unrelated or assigning a route.\n\nHealthcare infections arise where vulnerable patients meet invasive devices, antibiotics, crowded workflows, and microbes able to persist. Sterilization, isolation, hand hygiene, environmental control, and surveillance are separate barriers; weakening several can transform sporadic cases into a cluster.\n\nThe infection-control principle: discovery and reliable clinical production are separate scientific achievements. Prevention succeeds through repeated verified steps, not through confidence that the ward has always been safe. A negative environmental sample cannot clear a process if collection missed the relevant surface or time. Outbreak curves become more informative when antibiotic exposure and patient movement are added. A line list should preserve onset, specimen, procedure, room, device, and outcome for every suspected case. Control measures deserve follow-up cultures and compliance data so apparent improvement is not confused with incomplete detection. The earliest cases may reveal the common process before later transmission creates a more complicated pattern. A negative environmental sample cannot clear a process if collection missed the relevant surface or time.",
      "frame": "Seals an instrument tray. \"Clean-looking is not sterile. Tell me what penicillin actually proves.\"",
      "q": [
        {
          "q": "Which microbiological interpretation best captures Alexander Fleming’s work on penicillin?",
          "o": [
            {
              "t": "Alexander Fleming noticed that a contaminating Penicillium mold inhibited nearby staphylococcal colonies. Isolation changes can be checked against transmission. Infection fits.",
              "v": "expert",
              "fb": "Correct: the response joins organism evidence, patient timing, procedures, and transmission control."
            },
            {
              "t": "Alexander Fleming's infection work emphasizes species identification and case dates. Infection records fit this infection account. Infection timing supports this infection claim.",
              "v": "partial",
              "fb": "This helps, but it cannot establish the route or system failure without the missing records."
            },
            {
              "t": "Alexander Fleming's infection work is read within infection practice as support for a ward-surface isolate as sufficient evidence for the transmission route of nearby infections.",
              "v": "wrong",
              "fb": "That conclusion overreads or misreads what the culture, stain, or clinical pattern can show."
            },
            {
              "t": "Alexander Fleming's infection authority supports keeping a failed sterilizer in service when most processed instruments show little visible contamination. Infection fits.",
              "v": "danger",
              "fb": "That decision normalizes repeated barrier failures and allows transmission to continue."
            }
          ]
        },
        {
          "q": "Which investigation step best distinguishes a hospital cluster from coincidence?",
          "o": [
            {
              "t": "Use this outbreak-control method: investigate an unexpected laboratory observation with controls rather than discarding it as contamination. Barrier failures remain linked. Infection fits.",
              "v": "expert",
              "fb": "Correct: the response joins organism evidence, patient timing, procedures, and transmission control."
            },
            {
              "t": "Compare cultures and dates while treating antibiotic exposure, device history, staff movement, and sterilization records as later work. Infection records fit this infection account.",
              "v": "partial",
              "fb": "This helps, but it cannot establish the route or system failure without the missing records."
            },
            {
              "t": "Declare cases unrelated when patients have different diagnoses even if the organism and procedure route match. Bed demand favors rapid turnover. Infection records fit this infection account.",
              "v": "wrong",
              "fb": "That conclusion overreads or misreads what the culture, stain, or clinical pattern can show."
            },
            {
              "t": "Restore bed capacity, relax isolation, and wait for additional cases before treating the cluster as operationally linked. Visible cleanliness appears reassuring. The infection record fits.",
              "v": "danger",
              "fb": "That decision normalizes repeated barrier failures and allows transmission to continue."
            }
          ]
        },
        {
          "q": "What infection-control principle is best supported?",
          "o": [
            {
              "t": "The infection lesson is that discovery and reliable clinical production are separate scientific achievements. Patient movement remains linked to organism typing. Infection fits.",
              "v": "expert",
              "fb": "Correct: the response joins organism evidence, patient timing, procedures, and transmission control."
            },
            {
              "t": "Rely on environmental cleaning and antibiotics while isolation and instrument validation remain inconsistent. Visible cleanliness appears reassuring. The infection practice fits.",
              "v": "partial",
              "fb": "This helps, but it cannot establish the route or system failure without the missing records."
            },
            {
              "t": "Treat the sterilizer’s displayed temperature as sufficient evidence of sterility for the processed load. Bed demand favors rapid turnover. Infection records fit this infection account.",
              "v": "wrong",
              "fb": "That conclusion overreads or misreads what the culture, stain, or clinical pattern can show."
            },
            {
              "t": "Attribute the cluster mainly to a malicious worker or random chance rather than repeated failures across routine controls. Visible cleanliness appears reassuring. Infection fits.",
              "v": "danger",
              "fb": "That decision normalizes repeated barrier failures and allows transmission to continue."
            }
          ]
        }
      ]
    },
    "penisolation": {
      "sci": "Ernst Chain (1906-1979)",
      "topic": "Isolating penicillin",
      "lede": "Ernst Chain used isolating penicillin to make invisible transmission visible in the laboratory and ward.",
      "no": 7,
      "profile": "Today’s microbiology cover note considers Ernst Chain and isolating penicillin. Ernst Chain helped isolate and characterize penicillin at Oxford and clarify its chemistry and antibacterial action. His biochemical work was central to obtaining material suitable for experimental and clinical testing. Hospital epidemiology must distinguish colonization, contamination, infection, and transmission. Chain’s work gives that distinction a concrete laboratory or surveillance tool.\n\nThe useful practice is to separate the active compound from impurities and verify potency across batches. Patient location, timing, specimen quality, organism identity, susceptibility, equipment, and procedure records should be aligned before declaring cases unrelated or assigning a route.\n\nHealthcare infections arise where vulnerable patients meet invasive devices, antibiotics, crowded workflows, and microbes able to persist. Sterilization, isolation, hand hygiene, environmental control, and surveillance are separate barriers; weakening several can transform sporadic cases into a cluster.\n\nThe infection-control principle: sterility and chemical consistency are essential when a biological product enters patients. Prevention succeeds through repeated verified steps, not through confidence that the ward has always been safe. A negative environmental sample cannot clear a process if collection missed the relevant surface or time. Outbreak curves become more informative when antibiotic exposure and patient movement are added. A line list should preserve onset, specimen, procedure, room, device, and outcome for every suspected case. Control measures deserve follow-up cultures and compliance data so apparent improvement is not confused with incomplete detection. The earliest cases may reveal the common process before later transmission creates a more complicated pattern. A negative environmental sample cannot clear a process if collection missed the relevant surface or time.",
      "frame": "Sets a culture plate under the lamp at The Infection-Control Office & Records. \"Growth has a pattern. Explain isolating penicillin before I show you the ward timeline.\"",
      "q": [
        {
          "q": "Which microbiological interpretation best captures Ernst Chain’s work on isolating penicillin?",
          "o": [
            {
              "t": "Ernst Chain helped isolate and characterize penicillin at Oxford and clarify its chemistry and antibacterial action. Patient movement remains linked to organism typing. Infection fits.",
              "v": "expert",
              "fb": "Correct: the response joins organism evidence, patient timing, procedures, and transmission control."
            },
            {
              "t": "Ernst Chain's infection work emphasizes species identification and case dates. Different diagnoses support separation. Visible cleanliness appears reassuring. The infection record fits.",
              "v": "partial",
              "fb": "This helps, but it cannot establish the route or system failure without the missing records."
            },
            {
              "t": "Ernst Chain's infection work supports a ward-surface isolate as sufficient evidence for the transmission route of nearby infections. Bed demand favors rapid turnover. Infection fits.",
              "v": "wrong",
              "fb": "That conclusion overreads or misreads what the culture, stain, or clinical pattern can show."
            },
            {
              "t": "Ernst Chain's authority is invoked in infection practice to justify keeping a failed sterilizer in service when most processed instruments show little visible contamination.",
              "v": "danger",
              "fb": "That decision normalizes repeated barrier failures and allows transmission to continue."
            }
          ]
        },
        {
          "q": "Which investigation step best distinguishes a hospital cluster from coincidence?",
          "o": [
            {
              "t": "Use this outbreak-control method: separate the active compound from impurities and verify potency across batches. The transmission chain stays testable.",
              "v": "expert",
              "fb": "Correct: the response joins organism evidence, patient timing, procedures, and transmission control."
            },
            {
              "t": "Compare cultures and dates while treating antibiotic exposure, device history, staff movement, and sterilization records as later work. The infection record fits.",
              "v": "partial",
              "fb": "This helps, but it cannot establish the route or system failure without the missing records."
            },
            {
              "t": "Declare cases unrelated when patients have different diagnoses even if the organism and procedure route match. Visible cleanliness appears reassuring.",
              "v": "wrong",
              "fb": "That conclusion overreads or misreads what the culture, stain, or clinical pattern can show."
            },
            {
              "t": "Restore bed capacity, relax isolation, and wait for additional cases before treating the cluster as operationally linked. Bed demand favors rapid turnover.",
              "v": "danger",
              "fb": "That decision normalizes repeated barrier failures and allows transmission to continue."
            }
          ]
        },
        {
          "q": "What infection-control principle is best supported?",
          "o": [
            {
              "t": "The infection lesson is that sterility and chemical consistency are essential when a biological product enters patients. Barrier failures remain linked.",
              "v": "expert",
              "fb": "Correct: the response joins organism evidence, patient timing, procedures, and transmission control."
            },
            {
              "t": "Rely on environmental cleaning and antibiotics while isolation and instrument validation remain inconsistent. Visible cleanliness appears reassuring.",
              "v": "partial",
              "fb": "This helps, but it cannot establish the route or system failure without the missing records."
            },
            {
              "t": "Treat the sterilizer’s displayed temperature as sufficient evidence of sterility for the processed load. Visible cleanliness appears reassuring.",
              "v": "wrong",
              "fb": "That conclusion overreads or misreads what the culture, stain, or clinical pattern can show."
            },
            {
              "t": "Attribute the cluster mainly to a malicious worker or random chance rather than repeated failures across routine controls. Bed demand favors rapid turnover.",
              "v": "danger",
              "fb": "That decision normalizes repeated barrier failures and allows transmission to continue."
            }
          ]
        }
      ]
    },
    "resistance": {
      "sci": "Mary Barber (1911-1965)",
      "topic": "Hospital antibiotic resistance",
      "lede": "Mary Barber placed hospital antibiotic resistance inside the practical defenses against healthcare infection.",
      "no": 8,
      "profile": "Today’s microbiology cover note considers Mary Barber and hospital antibiotic resistance. Mary Barber documented the rapid rise of penicillin-resistant staphylococci in hospitals and studied how antibiotic use shaped that increase. Her observations helped establish hospitals as environments where selection and transmission interact. Hospital epidemiology must distinguish colonization, contamination, infection, and transmission. Barber’s work gives that distinction a concrete laboratory or surveillance tool.\n\nThe useful practice is to track susceptibility patterns over time and connect them with prescribing and patient movement. Patient location, timing, specimen quality, organism identity, susceptibility, equipment, and procedure records should be aligned before declaring cases unrelated or assigning a route.\n\nHealthcare infections arise where vulnerable patients meet invasive devices, antibiotics, crowded workflows, and microbes able to persist. Sterilization, isolation, hand hygiene, environmental control, and surveillance are separate barriers; weakening several can transform sporadic cases into a cluster.\n\nThe infection-control principle: resistance is an ecological warning, not merely a property of one patient's isolate. Prevention succeeds through repeated verified steps, not through confidence that the ward has always been safe. A negative environmental sample cannot clear a process if collection missed the relevant surface or time. Outbreak curves become more informative when antibiotic exposure and patient movement are added. A line list should preserve onset, specimen, procedure, room, device, and outcome for every suspected case. Control measures deserve follow-up cultures and compliance data so apparent improvement is not confused with incomplete detection. The earliest cases may reveal the common process before later transmission creates a more complicated pattern.\n\nBarber's hospital studies show how antibiotic pressure can create a different pattern. Treatment suppresses susceptible organisms and favors resistant ones already present, so separate patients may develop resistant infections without direct transmission. Those cases need not share an identical strain and may involve different species or resistance mechanisms. A tight cluster of nearly indistinguishable isolates linked to one exposure is stronger evidence of a common source than independent selection.",
      "frame": "Turns a surveillance chart sideways. \"Chance should not draw the same curve repeatedly. Start with hospital antibiotic resistance.\"",
      "q": [
        {
          "q": "Which microbiological interpretation best captures Mary Barber’s work on hospital antibiotic resistance?",
          "o": [
            {
              "t": "Mary Barber documented the rapid rise of penicillin-resistant staphylococci in hospitals and studied how antibiotic use shaped that increase. Barrier failures remain linked.",
              "v": "expert",
              "fb": "Correct: the response joins organism evidence, patient timing, procedures, and transmission control."
            },
            {
              "t": "Mary Barber's infection work emphasizes species identification and case dates. Different diagnoses support separation. Visible cleanliness appears reassuring. The infection record fits.",
              "v": "partial",
              "fb": "This helps, but it cannot establish the route or system failure without the missing records."
            },
            {
              "t": "Mary Barber's infection work supports a ward-surface isolate as sufficient evidence for the transmission route of nearby infections. Infection timing supports this infection claim.",
              "v": "wrong",
              "fb": "That conclusion overreads or misreads what the culture, stain, or clinical pattern can show."
            },
            {
              "t": "Mary Barber's authority is invoked in infection practice to justify keeping a failed sterilizer in service when most processed instruments show little visible contamination.",
              "v": "danger",
              "fb": "That decision normalizes repeated barrier failures and allows transmission to continue."
            }
          ]
        },
        {
          "q": "Which investigation step best distinguishes a hospital cluster from coincidence?",
          "o": [
            {
              "t": "Use this outbreak-control method: track susceptibility patterns over time and connect them with prescribing and patient movement. Barrier failures remain linked. Infection fits.",
              "v": "expert",
              "fb": "Correct: the response joins organism evidence, patient timing, procedures, and transmission control."
            },
            {
              "t": "Compare cultures and dates while treating antibiotic exposure, device history, staff movement, and sterilization records as later work. Bed demand favors rapid turnover.",
              "v": "partial",
              "fb": "This helps, but it cannot establish the route or system failure without the missing records."
            },
            {
              "t": "Declare cases unrelated when patients have different diagnoses even if the organism and procedure route match. Bed demand favors rapid turnover. The infection practice fits.",
              "v": "wrong",
              "fb": "That conclusion overreads or misreads what the culture, stain, or clinical pattern can show."
            },
            {
              "t": "Restore bed capacity, relax isolation, and wait for additional cases before treating the cluster as operationally linked. The surface culture looks persuasive. Infection fits.",
              "v": "danger",
              "fb": "That decision normalizes repeated barrier failures and allows transmission to continue."
            }
          ]
        },
        {
          "q": "What infection-control principle is best supported?",
          "o": [
            {
              "t": "The infection lesson is that resistance is an ecological warning, not merely a property of one patient's isolate. The transmission chain stays testable.",
              "v": "expert",
              "fb": "Correct: the response joins organism evidence, patient timing, procedures, and transmission control."
            },
            {
              "t": "Rely on environmental cleaning and antibiotics while isolation and instrument validation remain inconsistent. Visible cleanliness appears reassuring.",
              "v": "partial",
              "fb": "This helps, but it cannot establish the route or system failure without the missing records."
            },
            {
              "t": "Treat the sterilizer’s displayed temperature as sufficient evidence of sterility for the processed load. Visible cleanliness appears reassuring.",
              "v": "wrong",
              "fb": "That conclusion overreads or misreads what the culture, stain, or clinical pattern can show."
            },
            {
              "t": "Attribute the cluster mainly to a malicious worker or random chance rather than repeated failures across routine controls. Bed demand favors rapid turnover.",
              "v": "danger",
              "fb": "That decision normalizes repeated barrier failures and allows transmission to continue."
            }
          ]
        }
      ]
    },
    "infectioncontrol": {
      "sci": "E.J.L. Lowbury (1913-2007)",
      "topic": "Hospital infection control",
      "lede": "A hospital organism became traceable in practice through E.J.L. Lowbury’s work on hospital infection control.",
      "no": 9,
      "profile": "Today’s microbiology cover note considers E.J.L. Lowbury and hospital infection control. E. J. L. Lowbury studied hospital infection, burns units, antiseptics, antibiotic resistance, and environmental control. His work connected microbiological surveillance with practical measures in wards and operating areas. Hospital epidemiology must distinguish colonization, contamination, infection, and transmission. Lowbury’s work gives that distinction a concrete laboratory or surveillance tool.\n\nThe useful practice is to combine patient cultures, environmental sampling, procedures, and antibiotic data in outbreak control. Patient location, timing, specimen quality, organism identity, susceptibility, equipment, and procedure records should be aligned before declaring cases unrelated or assigning a route.\n\nHealthcare infections arise where vulnerable patients meet invasive devices, antibiotics, crowded workflows, and microbes able to persist. Sterilization, isolation, hand hygiene, environmental control, and surveillance are separate barriers; weakening several can transform sporadic cases into a cluster.\n\nThe infection-control principle: infection prevention is a system of barriers whose failures can reinforce one another. Prevention succeeds through repeated verified steps, not through confidence that the ward has always been safe. A negative environmental sample cannot clear a process if collection missed the relevant surface or time. Outbreak curves become more informative when antibiotic exposure and patient movement are added. A line list should preserve onset, specimen, procedure, room, device, and outcome for every suspected case. Control measures deserve follow-up cultures and compliance data so apparent improvement is not confused with incomplete detection. The earliest cases may reveal the common process before later transmission creates a more complicated pattern. A negative environmental sample cannot clear a process if collection missed the relevant surface or time.\n\nLowbury's infection-control research emphasizes source tracing across systems. A contaminated device or reprocessing pathway can expose patients in different rooms and on different shifts, producing cases after the same procedure and isolates with a common fingerprint. Instrument tracking, culture results, and incubation intervals can reveal that point source. This pattern differs from a contact chain through hands and from unrelated infections selected separately by antibiotics.",
      "frame": "Seals an instrument tray. \"Clean-looking is not sterile. Tell me what hospital infection control actually proves.\"",
      "q": [
        {
          "q": "Which microbiological interpretation best captures E.J.L. Lowbury’s work on hospital infection control?",
          "o": [
            {
              "t": "E. The transmission chain stays testable. Barrier failures remain linked. Patient movement remains linked to organism typing. Sterilizer performance stays beside the case curve. Infection fits.",
              "v": "expert",
              "fb": "Correct: the response joins organism evidence, patient timing, procedures, and transmission control."
            },
            {
              "t": "E.J.L. Lowbury's infection work emphasizes species identification and case dates. Different diagnoses support separation. Visible cleanliness appears reassuring. The infection record fits.",
              "v": "partial",
              "fb": "This helps, but it cannot establish the route or system failure without the missing records."
            },
            {
              "t": "E.J.L. Lowbury's infection work supports a ward-surface isolate as sufficient evidence for the transmission route of nearby infections. The surface culture looks persuasive. Infection fits.",
              "v": "wrong",
              "fb": "That conclusion overreads or misreads what the culture, stain, or clinical pattern can show."
            },
            {
              "t": "E.J.L. Lowbury's authority is invoked in infection practice to justify keeping a failed sterilizer in service when most processed instruments show little visible contamination. Infection fits.",
              "v": "danger",
              "fb": "That decision normalizes repeated barrier failures and allows transmission to continue."
            }
          ]
        },
        {
          "q": "Which investigation step best distinguishes a hospital cluster from coincidence?",
          "o": [
            {
              "t": "Use this outbreak-control method: combine patient cultures, environmental sampling, procedures, and antibiotic data in outbreak control. Barrier failures remain linked. Infection fits.",
              "v": "expert",
              "fb": "Correct: the response joins organism evidence, patient timing, procedures, and transmission control."
            },
            {
              "t": "Compare cultures and dates while treating antibiotic exposure, device history, staff movement, and sterilization records as later work. Bed demand favors rapid turnover. Infection fits.",
              "v": "partial",
              "fb": "This helps, but it cannot establish the route or system failure without the missing records."
            },
            {
              "t": "Declare cases unrelated when patients have different diagnoses even if the organism and procedure route match. Bed demand favors rapid turnover. Infection records fit this infection account.",
              "v": "wrong",
              "fb": "That conclusion overreads or misreads what the culture, stain, or clinical pattern can show."
            },
            {
              "t": "Restore bed capacity, relax isolation, and wait for additional cases before treating the cluster as operationally linked. Visible cleanliness appears reassuring. The infection record fits.",
              "v": "danger",
              "fb": "That decision normalizes repeated barrier failures and allows transmission to continue."
            }
          ]
        },
        {
          "q": "What infection-control principle is best supported?",
          "o": [
            {
              "t": "The infection lesson is that infection prevention is a system of barriers whose failures can reinforce one another. The transmission chain stays testable. Infection fits.",
              "v": "expert",
              "fb": "Correct: the response joins organism evidence, patient timing, procedures, and transmission control."
            },
            {
              "t": "Rely on environmental cleaning and antibiotics while isolation and instrument validation remain inconsistent. Visible cleanliness appears reassuring. Infection fits.",
              "v": "partial",
              "fb": "This helps, but it cannot establish the route or system failure without the missing records."
            },
            {
              "t": "Treat the sterilizer’s displayed temperature as sufficient evidence of sterility for the processed load. Visible cleanliness appears reassuring. The infection record fits.",
              "v": "wrong",
              "fb": "That conclusion overreads or misreads what the culture, stain, or clinical pattern can show."
            },
            {
              "t": "Attribute the cluster mainly to a malicious worker or random chance rather than repeated failures across routine controls. Infection timing supports this infection claim.",
              "v": "danger",
              "fb": "That decision normalizes repeated barrier failures and allows transmission to continue."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "chargenurse": {
      "ward2": "The device-tracking meeting occurs at The Affected Ward; Charge Nurse Iyer opens the patient-contact timeline. \"Infection control begins with careful distinctions; pass the reading before the census opens.\"",
      "sterile": "The device-tracking meeting occurs at The Sterile-Processing Department; Charge Nurse Iyer opens the instrument tracking ledger. \"Infection control begins with careful distinctions; pass the reading before the census opens.\"",
      "records": "The device-tracking meeting occurs at The Infection-Control Office & Records; Charge Nurse Iyer opens the isolate and surveillance files. \"Infection control begins with careful distinctions; pass the reading before the census opens.\""
    },
    "cssdtech": {
      "ward2": "The device-tracking meeting occurs at The Affected Ward; The Sterile-Processing Tech opens the patient-contact timeline. \"The tracking ledger follows only after you master today's microbiology profile.\"",
      "sterile": "The device-tracking meeting occurs at The Sterile-Processing Department; The Sterile-Processing Tech opens the instrument tracking ledger. \"The tracking ledger follows only after you master today's microbiology profile.\"",
      "records": "The device-tracking meeting occurs at The Infection-Control Office & Records; The Sterile-Processing Tech opens the isolate and surveillance files. \"The tracking ledger follows only after you master today's microbiology profile.\""
    },
    "clerk": {
      "ward2": "The device-tracking meeting occurs at The Affected Ward; The Clerk opens the patient-contact timeline. \"Answer from the dossier, and the surveillance archive becomes yours.\"",
      "sterile": "The device-tracking meeting occurs at The Sterile-Processing Department; The Clerk opens the instrument tracking ledger. \"Answer from the dossier, and the surveillance archive becomes yours.\"",
      "records": "The device-tracking meeting occurs at The Infection-Control Office & Records; The Clerk opens the isolate and surveillance files. \"Answer from the dossier, and the surveillance archive becomes yours.\""
    }
  },
  "story": [
    "<b>The Ward Cluster</b> opens inside the Kettleridge Hospital infection inquiry, where the visible damage is easier to describe than the chain that produced it.",
    "<b>Charge Nurse Iyer</b>, <b>The Sterile-Processing Tech</b>, and <b>The Clerk</b> each control a different slice of the record, and each conversation turns one real pioneer into a way of reading the case.",
    "Some witnesses are drawn toward <b>Hand transmission moved one resistant strain between nearby patients.</b>; others settle too quickly on <b>Antibiotic pressure selected unrelated resistant infections independently.</b>. Your job is to separate those tempting stories from the harder explanation the evidence supports.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and decide what the case is really about."
  ],
  "endings": {
    "overclaimWhat": "killer",
    "dismissalWhat": "chance",
    "win": {
      "expertTitle": "One Device, Several Patients",
      "expert": [
        "Investigator Ida Brenner names Whitlock — the hospital's operations manager, The Infection-Control Office & Records, and A common contaminated device carried one strain into multiple patients. Not Hand transmission moved one resistant strain between nearby patients. Not Antibiotic pressure selected unrelated resistant infections independently.",
        "The readings distinguish person-to-person hand transmission, independent selection under antibiotics, and a common contaminated device through strain identity, contact networks, procedure linkage, and case timing."
      ],
      "soundTitle": "A Defensible Transmission Finding",
      "sound": [
        "Device evidence fixes the trio: Whitlock — the hospital's operations manager; The Infection-Control Office & Records; A common contaminated device carried one strain into multiple patients.",
        "The transmission map is convincing, although some device-tracking pages are still missing."
      ],
      "namedTitle": "Correct Route, Limited Chain",
      "named": [
        "Device evidence points to Whitlock — the hospital's operations manager, The Infection-Control Office & Records, and A common contaminated device carried one strain into multiple patients; device support remains incomplete.",
        "The common-source route is right; the surveillance file is too incomplete to close the review."
      ]
    },
    "overclaim": {
      "title": "The Hand-Transmission Theory",
      "body": [
        "Investigator Ida Brenner chooses Hand transmission moved one resistant strain between nearby patients. Patient contacts do not form the required transmission chain.",
        "Hand transmission usually follows staff contact and bed adjacency in a chain, with cases appearing as the organism moves between people. The cluster instead aligns tightly with one procedure across separated rooms."
      ]
    },
    "dismissal": {
      "title": "The Independent-Selection Theory",
      "body": [
        "Investigator Ida Brenner instead favors Antibiotic pressure selected unrelated resistant infections independently. Identical isolates after one procedure are not independent selection.",
        "Antibiotic pressure can select resistance independently, but that mechanism tends to produce varied organisms or genotypes rather than one near-identical strain appearing after the same exposure."
      ]
    },
    "wrongNames": {
      "title": "Right Route, Wrong Names",
      "body": [
        "The common-device route is correct, although attribution is not. Join the transmission map to the proper records and names."
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A hospital bed, sterilizer, and infection spread\"><rect x=\"76\" y=\"58\" width=\"124\" height=\"34\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M76 92 L76 108 M200 92 L200 108 M92 58 L92 42 L168 42 L168 58\" stroke=\"#121212\" stroke-width=\"1.5\" fill=\"none\"/><path d=\"M296 38 L392 38 L392 100 L296 100 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><circle cx=\"486\" cy=\"66\" r=\"18\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"2\"/><path d=\"M468 66 L504 66 M486 48 L486 84 M474 54 L498 78 M498 54 L474 78\" stroke=\"#B3261E\" stroke-width=\"1.6\"/><path d=\"M208 70 C240 70,252 58,274 58 C296 58,308 66,328 66\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2\" stroke-dasharray=\"4 5\"/></svg>"
}};
