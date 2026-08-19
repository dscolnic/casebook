module.exports = { PACK: {
  "id": "t_dust",
  "title": "The Corriston Mill Blast",
  "discipline": "Combustion & Dust-Explosion Engineering",
  "teaser": "The Corriston mill failed in a sequence of blasts. Some investigators favor a confined gas deflagration; others insist on detonation. Which mechanism fits the floor-by-floor damage?",
  "overclaimTag": "a confined gas deflagration",
  "truthTag": "secondary dust explosions through suspended deposits",
  "venue": "the Corriston mill inquiry",
  "agent": {
    "name": "Inspector Nash Verel",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Combustion Pioneers",
  "dossierName": "COMBUSTION & EXPLOSION PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Corriston mill inquiry",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before your inquiry ends. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The place you test determines the dossier you receive, and the conversation costs one day.",
  "overclaimTease": "Gas deflagration and detonation both fit a shattered mill at first glance; the damage sequence must decide between them.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "owner",
      "items": [
        {
          "id": "owner",
          "label": "Corwin Ash — plant owner"
        },
        {
          "id": "manager",
          "label": "The production manager"
        },
        {
          "id": "inspector",
          "label": "The safety inspector"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "office",
      "items": [
        {
          "id": "floor",
          "label": "The Production Floor & Ducts"
        },
        {
          "id": "mcc",
          "label": "The Motor Control Room"
        },
        {
          "id": "office",
          "label": "The Owner's Plant Office"
        }
      ]
    },
    "what": {
      "title": "What kind of explosion propagated?",
      "truth": "neglect",
      "items": [
        {
          "id": "attack",
          "label": "A confined gas deflagration spread through the mill."
        },
        {
          "id": "freak",
          "label": "A high-order detonation drove one dominant blast wave."
        },
        {
          "id": "neglect",
          "label": "Secondary dust blasts lifted deposits floor by floor."
        }
      ]
    }
  },
  "PLACES": {
    "floor": {
      "name": "The Production Floor & Ducts",
      "xy": [
        140,
        90
      ]
    },
    "mcc": {
      "name": "The Motor Control Room",
      "xy": [
        330,
        240
      ]
    },
    "office": {
      "name": "The Owner's Plant Office",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "floor",
      "mcc"
    ],
    [
      "mcc",
      "office"
    ]
  ],
  "CHARACTERS": {
    "sweeper": {
      "name": "Sweeper Ruiz",
      "role": "Housekeeping hand",
      "face": "🧹",
      "badge": "S",
      "legend": "the production floor",
      "hint": "Knows the production floors and can identify who controlled access, staffing, and cleanup records."
    },
    "electrician": {
      "name": "The Electrician",
      "role": "Plant electrician",
      "face": "⚡",
      "badge": "E",
      "legend": "the motor room",
      "hint": "Maintains motors and extraction equipment and can place electrical work within the plant chronology."
    },
    "clerk": {
      "name": "The Clerk",
      "role": "Records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the office",
      "hint": "Keeps shift rosters, inspection files, and the correspondence linking decisions to the owner's office."
    }
  },
  "TOPICMAP": {
    "floor": {
      "sweeper": [
        "du_boyle"
      ],
      "electrician": [
        "du_scheele"
      ],
      "clerk": [
        "du_gaylussac"
      ]
    },
    "mcc": {
      "sweeper": [
        "du_mallard"
      ],
      "electrician": [
        "du_mach"
      ],
      "clerk": [
        "du_bartknecht"
      ]
    },
    "office": {
      "sweeper": [
        "du_galloway"
      ],
      "electrician": [
        "du_bagnold"
      ],
      "clerk": [
        "du_lichtenberg"
      ]
    }
  },
  "TOPICS": {
    "du_boyle": {
      "sci": "Robert Boyle (1627-1691)",
      "topic": "Air, pressure & combustion",
      "lede": "Robert Boyle made air, pressure & combustion part of the physical explanation for fast industrial combustion.",
      "no": 1,
      "profile": "This combustible-powder cover note uses Robert Boyle to explore air, pressure & combustion. Robert Boyle used air pumps to show that flames and living creatures require air, and he established the inverse pressure-volume relation for gases at constant temperature. His experiments made air a measurable participant in combustion rather than an empty background. The work made air, particles, heat, pressure, or charge part of a physical account that could be tested inside industrial enclosures.\n\nCombustion severity depends on fuel, oxidizer, confinement, pressure, and the rate at which heat and gases are released. A dust explosion requires combustible particles, dispersion, oxygen, ignition, and enough confinement for pressure to build. Removing any one element can prevent the event, but industrial processes often recreate all five during ordinary operation. A dust-hazard explanation should state fuel properties, concentration, dispersion, oxygen, confinement, ignition energy, and the route available for pressure relief.\n\nFine particles expose enormous surface area. A small primary ignition may lift settled dust from beams, ducts, or floors, producing a secondary cloud with far more fuel than the first explosion contained. Housekeeping and ventilation are engineering controls, not cosmetic work. Dust depth, hidden ledges, extraction flow, bonding, grounding, ignition sources, isolation, and venting must be inspected as one connected system. The mill record should join deposit surveys, particle data, extraction flow, grounding tests, cleaning rounds, production changes, and ignition evidence.\n\nThe combustion lesson is that a tiny spark does not explain a catastrophe by itself. Severity comes from fuel inventory, dispersion, confinement, propagation paths, and the defenses that were present or absent. A trustworthy plant record includes dust sampling, explosibility data, cleaning rounds, fan performance, static controls, hot-work permits, near misses, and any change in production rate or particle size. Cover knowledge here means reading deposits and blast patterns as a sequence. A bomb story is not needed when ordinary powder, poor housekeeping, and connected enclosures explain the pressure wave.",
      "frame": "Brushes powder from a beam at The Production Floor & Ducts. \"Use Robert Boyle to explain how settled fuel becomes moving flame and pressure.\"",
      "q": [
        {
          "q": "Which combustible-dust account best presents Robert Boyle's work on air, pressure & combustion?",
          "o": [
            {
              "t": "Robert Boyle used air pumps to show that flames and living creatures require air, and he established the inverse pressure-volume relation for gases at constant temperature. The powder-hazard file stores the raw airflow record.",
              "v": "expert",
              "fb": "Correct: the answer connects combustion physics with dust inventory, dispersion, and engineered controls."
            },
            {
              "t": "Robert Boyle's dust work relies on the visible ignition source. The first blast looks external. Settled powder appears inactive. Dust records fit this dust account. Dust context supports the view. Dust timing supports this dust claim.",
              "v": "partial",
              "fb": "This names one part of the fire triangle but leaves confinement or secondary fuel unaddressed."
            },
            {
              "t": "Robert Boyle's dust work is read within dust practice as support for a bomb as the most plausible source of a fast pressure wave through the processing building. Ignition receives the most attention. Dust timing supports this dust claim.",
              "v": "wrong",
              "fb": "That explanation applies the wrong gas or flame concept to the observed powder hazard."
            },
            {
              "t": "Robert Boyle's authority is invoked in dust practice to justify leaving settled deposits in place because they appear harmless before becoming airborne. Ignition receives the most attention. Dust timing supports this dust claim.",
              "v": "danger",
              "fb": "That shortcut leaves accumulated fuel in place and treats the eventual ignition source as unforeseeable."
            }
          ]
        },
        {
          "q": "Which powder-hazard principle does this work establish?",
          "o": [
            {
              "t": "Combustion severity depends on fuel, oxidizer, confinement, pressure, and the rate at which heat and gases are released. The powder-hazard file stores the dust survey. Dust fits. Dust fits.",
              "v": "expert",
              "fb": "Correct: the answer connects combustion physics with dust inventory, dispersion, and engineered controls."
            },
            {
              "t": "Analyze the ignition source while treating dust concentration, enclosure, turbulence, and secondary fuel as later details. Ignition receives the most attention. The dust record fits.",
              "v": "partial",
              "fb": "This names one part of the fire triangle but leaves confinement or secondary fuel unaddressed."
            },
            {
              "t": "Assume flame speed and pressure are largely independent of particle size, turbulence, oxygen, and enclosure geometry. Dust records fit this dust account. Dust timing supports this dust claim.",
              "v": "wrong",
              "fb": "That explanation applies the wrong gas or flame concept to the observed powder hazard."
            },
            {
              "t": "Leave the powder in place and treat the eventual ignition source as too unpredictable to manage in advance. Dust records fit this dust account. Dust timing supports this dust claim.",
              "v": "danger",
              "fb": "That shortcut leaves accumulated fuel in place and treats the eventual ignition source as unforeseeable."
            }
          ]
        },
        {
          "q": "What prevention lesson should a combustible-dust plant retain?",
          "o": [
            {
              "t": "Cover knowledge here means reading deposits and blast patterns as a sequence. A bomb story is not needed when ordinary powder, poor housekeeping, and connected enclosures explain the pressure wave. Dust fits.",
              "v": "expert",
              "fb": "Correct: the answer connects combustion physics with dust inventory, dispersion, and engineered controls."
            },
            {
              "t": "Improve ignition control while handling housekeeping and ventilation as separate production-maintenance tasks. Dust records fit this dust account. Dust context supports the view. Dust timing supports this dust claim.",
              "v": "partial",
              "fb": "This names one part of the fire triangle but leaves confinement or secondary fuel unaddressed."
            },
            {
              "t": "Attribute the explosion mainly to a bomb or random spark rather than accumulated fuel and propagation. Dust records fit this dust account. Dust context supports the view. Dust timing supports this dust claim.",
              "v": "wrong",
              "fb": "That explanation applies the wrong gas or flame concept to the observed powder hazard."
            },
            {
              "t": "Restart production with hidden ledges still coated and measure dust after another ignition event. Production history can support it. Dust context supports the view. Dust timing supports this dust claim. Dust fits.",
              "v": "danger",
              "fb": "That shortcut leaves accumulated fuel in place and treats the eventual ignition source as unforeseeable."
            }
          ]
        }
      ]
    },
    "du_scheele": {
      "sci": "Carl Wilhelm Scheele (1742-1786)",
      "topic": "The discovery of oxygen",
      "lede": "Carl Wilhelm Scheele's work on the discovery of oxygen gave powder hazards a measurable mechanism.",
      "no": 2,
      "profile": "This combustible-powder cover note uses Carl Wilhelm Scheele to explore the discovery of oxygen. Carl Wilhelm Scheele independently prepared oxygen before Priestley's publication and called it fire air. He obtained it by heating several oxygen-rich compounds and recognized that it supported combustion. The work made air, particles, heat, pressure, or charge part of a physical account that could be tested inside industrial enclosures.\n\nOxidizer availability controls whether ignition remains local or develops into a self-sustaining flame front. Housekeeping and ventilation are engineering controls, not cosmetic work. Dust depth, hidden ledges, extraction flow, bonding, grounding, ignition sources, isolation, and venting must be inspected as one connected system. A dust-hazard explanation should state fuel properties, concentration, dispersion, oxygen, confinement, ignition energy, and the route available for pressure relief.\n\nA dust explosion requires combustible particles, dispersion, oxygen, ignition, and enough confinement for pressure to build. Removing any one element can prevent the event, but industrial processes often recreate all five during ordinary operation. Fine particles expose enormous surface area. A small primary ignition may lift settled dust from beams, ducts, or floors, producing a secondary cloud with far more fuel than the first explosion contained. The mill record should join deposit surveys, particle data, extraction flow, grounding tests, cleaning rounds, production changes, and ignition evidence.\n\nCover knowledge here means reading deposits and blast patterns as a sequence. A bomb story is not needed when ordinary powder, poor housekeeping, and connected enclosures explain the pressure wave. The combustion lesson is that a tiny spark does not explain a catastrophe by itself. Severity comes from fuel inventory, dispersion, confinement, propagation paths, and the defenses that were present or absent. A trustworthy plant record includes dust sampling, explosibility data, cleaning rounds, fan performance, static controls, hot-work permits, near misses, and any change in production rate or particle size.",
      "frame": "Seals a dust sample at The Production Floor & Ducts. \"Start with Carl Wilhelm Scheele; keep concentration and confinement in view.\"",
      "q": [
        {
          "q": "Which combustible-dust account best presents Carl Wilhelm Scheele's work on the discovery of oxygen?",
          "o": [
            {
              "t": "Carl Wilhelm Scheele independently prepared oxygen before Priestley's publication and called it fire air. Explosion evidence ties the raw dated cleaning history to prevention controls.",
              "v": "expert",
              "fb": "Correct: the answer connects combustion physics with dust inventory, dispersion, and engineered controls."
            },
            {
              "t": "Carl Wilhelm Scheele's dust work emphasizes the visible ignition source. Ignition receives the most attention. Production history can support it. Dust practice makes the dust view plausible.",
              "v": "partial",
              "fb": "This names one part of the fire triangle but leaves confinement or secondary fuel unaddressed."
            },
            {
              "t": "Carl Wilhelm Scheele's dust work supports a bomb as the most plausible source of a fast pressure wave through the processing building. Ignition receives the most attention. Dust fits.",
              "v": "wrong",
              "fb": "That explanation applies the wrong gas or flame concept to the observed powder hazard."
            },
            {
              "t": "Carl Wilhelm Scheele's dust authority supports leaving settled deposits in place because they appear harmless before becoming airborne. Ignition receives the most attention. Dust fits.",
              "v": "danger",
              "fb": "That shortcut leaves accumulated fuel in place and treats the eventual ignition source as unforeseeable."
            }
          ]
        },
        {
          "q": "Which powder-hazard principle does this work establish?",
          "o": [
            {
              "t": "Oxidizer availability controls whether ignition remains local or develops into a self-sustaining flame front. The housekeeping archive carries the raw ignition log. Dust fits.",
              "v": "expert",
              "fb": "Correct: the answer connects combustion physics with dust inventory, dispersion, and engineered controls."
            },
            {
              "t": "Analyze the ignition source while treating dust concentration, enclosure, turbulence, and secondary fuel as later details. Ignition receives the most attention. Dust fits.",
              "v": "partial",
              "fb": "This names one part of the fire triangle but leaves confinement or secondary fuel unaddressed."
            },
            {
              "t": "Assume flame speed and pressure are largely independent of particle size, turbulence, oxygen, and enclosure geometry. Dust records fit this dust account. The dust practice fits.",
              "v": "wrong",
              "fb": "That explanation applies the wrong gas or flame concept to the observed powder hazard."
            },
            {
              "t": "Leave the powder in place and treat the eventual ignition source as too unpredictable to manage in advance. Dust records fit this dust account. Dust timing supports this dust claim.",
              "v": "danger",
              "fb": "That shortcut leaves accumulated fuel in place and treats the eventual ignition source as unforeseeable."
            }
          ]
        },
        {
          "q": "What prevention lesson should a combustible-dust plant retain?",
          "o": [
            {
              "t": "A trustworthy plant record includes dust sampling, explosibility data, cleaning rounds, fan performance, static controls, hot-work permits, near misses, and any change in production rate or particle size.",
              "v": "expert",
              "fb": "Correct: the answer connects combustion physics with dust inventory, dispersion, and engineered controls."
            },
            {
              "t": "Improve ignition control while handling housekeeping and ventilation as separate production-maintenance tasks. Dust records fit this dust account. Dust context supports the view. Dust timing supports this dust claim.",
              "v": "partial",
              "fb": "This names one part of the fire triangle but leaves confinement or secondary fuel unaddressed."
            },
            {
              "t": "Attribute the explosion mainly to a bomb or random spark rather than accumulated fuel and propagation. Ignition receives the most attention. Dust records fit this dust account. Dust timing supports this dust claim.",
              "v": "wrong",
              "fb": "That explanation applies the wrong gas or flame concept to the observed powder hazard."
            },
            {
              "t": "Restart production with hidden ledges still coated and measure dust after another ignition event. Settled powder appears inactive. Ignition receives the most attention. Production history can support it. Dust fits.",
              "v": "danger",
              "fb": "That shortcut leaves accumulated fuel in place and treats the eventual ignition source as unforeseeable."
            }
          ]
        }
      ]
    },
    "du_gaylussac": {
      "sci": "Joseph Louis Gay-Lussac (1778-1850)",
      "topic": "Gas pressure, temperature & explosion",
      "lede": "Through gas pressure, temperature & explosion, Joseph Louis Gay-Lussac clarified how particles, gases, heat, or charge can escalate pressure.",
      "no": 3,
      "profile": "This combustible-powder cover note uses Joseph Louis Gay-Lussac to explore gas pressure, temperature & explosion. Joseph Louis Gay-Lussac established relations among gas volume, temperature, and pressure and studied reacting gas volumes. Heating a confined gas raises pressure, while combustion adds both heat and product gases. The work made air, particles, heat, pressure, or charge part of a physical account that could be tested inside industrial enclosures.\n\nConfinement turns fast burning into pressure loading, so vent area and structural strength must match the expected rate of combustion. Fine particles expose enormous surface area. A small primary ignition may lift settled dust from beams, ducts, or floors, producing a secondary cloud with far more fuel than the first explosion contained. A dust-hazard explanation should state fuel properties, concentration, dispersion, oxygen, confinement, ignition energy, and the route available for pressure relief.\n\nHousekeeping and ventilation are engineering controls, not cosmetic work. Dust depth, hidden ledges, extraction flow, bonding, grounding, ignition sources, isolation, and venting must be inspected as one connected system. A dust explosion requires combustible particles, dispersion, oxygen, ignition, and enough confinement for pressure to build. Removing any one element can prevent the event, but industrial processes often recreate all five during ordinary operation. The mill record should join deposit surveys, particle data, extraction flow, grounding tests, cleaning rounds, production changes, and ignition evidence.\n\nA trustworthy plant record includes dust sampling, explosibility data, cleaning rounds, fan performance, static controls, hot-work permits, near misses, and any change in production rate or particle size. Cover knowledge here means reading deposits and blast patterns as a sequence. A bomb story is not needed when ordinary powder, poor housekeeping, and connected enclosures explain the pressure wave. The combustion lesson is that a tiny spark does not explain a catastrophe by itself. Severity comes from fuel inventory, dispersion, confinement, propagation paths, and the defenses that were present or absent.",
      "frame": "Points into a clogged duct at The Production Floor & Ducts. \"Give me gas pressure, temperature & explosion, the ignition condition, and the propagation path.\"",
      "q": [
        {
          "q": "Which combustible-dust account best presents Joseph Louis Gay-Lussac's work on gas pressure, temperature & explosion?",
          "o": [
            {
              "t": "Joseph Louis Gay-Lussac established relations among gas volume, temperature, and pressure and studied reacting gas volumes. Dust review keeps the deposit-measured airflow record available for analysis. Fits.",
              "v": "expert",
              "fb": "Correct: the answer connects combustion physics with dust inventory, dispersion, and engineered controls."
            },
            {
              "t": "Joseph Louis Gay-Lussac's dust work relies on the visible ignition source. The first blast looks external. Dust records fit this dust account. Dust context supports the view. Dust timing supports this dust claim.",
              "v": "partial",
              "fb": "This names one part of the fire triangle but leaves confinement or secondary fuel unaddressed."
            },
            {
              "t": "Joseph Louis Gay-Lussac's dust work is read within dust practice as support for a bomb as the most plausible source of a fast pressure wave through the processing building. Dust practice makes the dust view plausible.",
              "v": "wrong",
              "fb": "That explanation applies the wrong gas or flame concept to the observed powder hazard."
            },
            {
              "t": "Joseph Louis Gay-Lussac's authority is invoked in dust practice to justify leaving settled deposits in place because they appear harmless before becoming airborne. Dust practice makes the dust view plausible.",
              "v": "danger",
              "fb": "That shortcut leaves accumulated fuel in place and treats the eventual ignition source as unforeseeable."
            }
          ]
        },
        {
          "q": "Which powder-hazard principle does this work establish?",
          "o": [
            {
              "t": "Confinement turns fast burning into pressure loading, so vent area and structural strength must match the expected rate of combustion. The powder-hazard file stores the dust survey. Dust fits.",
              "v": "expert",
              "fb": "Correct: the answer connects combustion physics with dust inventory, dispersion, and engineered controls."
            },
            {
              "t": "Analyze the ignition source while treating dust concentration, enclosure, turbulence, and secondary fuel as later details. Dust records fit this dust account. Dust timing supports this dust claim.",
              "v": "partial",
              "fb": "This names one part of the fire triangle but leaves confinement or secondary fuel unaddressed."
            },
            {
              "t": "Assume flame speed and pressure are largely independent of particle size, turbulence, oxygen, and enclosure geometry. Ignition receives the most attention. Dust records fit this dust account.",
              "v": "wrong",
              "fb": "That explanation applies the wrong gas or flame concept to the observed powder hazard."
            },
            {
              "t": "Leave the powder in place and treat the eventual ignition source as too unpredictable to manage in advance. Ignition receives the most attention. Dust practice makes the dust view plausible.",
              "v": "danger",
              "fb": "That shortcut leaves accumulated fuel in place and treats the eventual ignition source as unforeseeable."
            }
          ]
        },
        {
          "q": "What prevention lesson should a combustible-dust plant retain?",
          "o": [
            {
              "t": "The combustion lesson is that a tiny spark does not explain a catastrophe by itself. Severity comes from fuel inventory, dispersion, confinement, propagation paths, and the defenses that were present or absent. Dust fits.",
              "v": "expert",
              "fb": "Correct: the answer connects combustion physics with dust inventory, dispersion, and engineered controls."
            },
            {
              "t": "Improve ignition control while handling housekeeping and ventilation as separate production-maintenance tasks. Dust context supports the view. Dust practice makes the dust view plausible. Dust timing supports this dust claim.",
              "v": "partial",
              "fb": "This names one part of the fire triangle but leaves confinement or secondary fuel unaddressed."
            },
            {
              "t": "Attribute the explosion mainly to a bomb or random spark rather than accumulated fuel and propagation. Settled powder appears inactive. Ignition receives the most attention. Production history can support it. Dust fits.",
              "v": "wrong",
              "fb": "That explanation applies the wrong gas or flame concept to the observed powder hazard."
            },
            {
              "t": "Restart production with hidden ledges still coated and measure dust after another ignition event. Ignition receives the most attention. Production history can support it. Dust practice makes the dust view plausible.",
              "v": "danger",
              "fb": "That shortcut leaves accumulated fuel in place and treats the eventual ignition source as unforeseeable."
            }
          ]
        }
      ]
    },
    "du_mallard": {
      "sci": "Ernest-Francois Mallard (1833-1894)",
      "topic": "Flame propagation in gases",
      "lede": "Ernest-Francois Mallard made flame propagation in gases part of the physical explanation for fast industrial combustion.",
      "no": 4,
      "profile": "This combustible-powder cover note uses Ernest-Francois Mallard to explore flame propagation in gases. Ernest-François Mallard and Henry Le Chatelier studied flame propagation, ignition, and firedamp explosions. Their work linked flame speed with gas composition, temperature, and confinement. The work made air, particles, heat, pressure, or charge part of a physical account that could be tested inside industrial enclosures.\n\nA primary flame can accelerate as turbulence mixes unburned fuel, making ductwork and connected rooms part of the hazard. A dust explosion requires combustible particles, dispersion, oxygen, ignition, and enough confinement for pressure to build. Removing any one element can prevent the event, but industrial processes often recreate all five during ordinary operation. A dust-hazard explanation should state fuel properties, concentration, dispersion, oxygen, confinement, ignition energy, and the route available for pressure relief.\n\nFine particles expose enormous surface area. A small primary ignition may lift settled dust from beams, ducts, or floors, producing a secondary cloud with far more fuel than the first explosion contained. Housekeeping and ventilation are engineering controls, not cosmetic work. Dust depth, hidden ledges, extraction flow, bonding, grounding, ignition sources, isolation, and venting must be inspected as one connected system. The mill record should join deposit surveys, particle data, extraction flow, grounding tests, cleaning rounds, production changes, and ignition evidence.\n\nMallard's flame studies help distinguish a gas deflagration from other blast mechanisms. A deflagration travels subsonically through a premixed fuel-air cloud, with pressure rising as confinement and congestion accelerate the flame. Investigators should expect evidence of a gas or vapor source, a connected flammable mixture, and damage organized around that cloud. Without such a source, ordinary gas-flame theory cannot by itself explain repeated explosions on separated dusty floors.",
      "frame": "Brushes powder from a beam at The Motor Control Room. \"Use Ernest-Francois Mallard to explain how settled fuel becomes moving flame and pressure.\"",
      "q": [
        {
          "q": "Which combustible-dust account best presents Ernest-Francois Mallard's work on flame propagation in gases?",
          "o": [
            {
              "t": "Ernest-François Mallard and Henry Le Chatelier studied flame propagation, ignition, and firedamp explosions. Explosion evidence ties the raw explosibility-linked cleaning history to prevention controls.",
              "v": "expert",
              "fb": "Correct: the answer connects combustion physics with dust inventory, dispersion, and engineered controls."
            },
            {
              "t": "Ernest-Francois Mallard's dust work relies on the visible ignition source. The first blast looks external. Dust records fit this dust account. Dust context supports the view. Dust timing supports this dust claim.",
              "v": "partial",
              "fb": "This names one part of the fire triangle but leaves confinement or secondary fuel unaddressed."
            },
            {
              "t": "Ernest-Francois Mallard's dust work is read within dust practice as support for a bomb as the most plausible source of a fast pressure wave through the processing building. Production history can support it.",
              "v": "wrong",
              "fb": "That explanation applies the wrong gas or flame concept to the observed powder hazard."
            },
            {
              "t": "Ernest-Francois Mallard's authority is invoked in dust practice to justify leaving settled deposits in place because they appear harmless before becoming airborne. Production history can support it. Dust fits.",
              "v": "danger",
              "fb": "That shortcut leaves accumulated fuel in place and treats the eventual ignition source as unforeseeable."
            }
          ]
        },
        {
          "q": "Which powder-hazard principle does this work establish?",
          "o": [
            {
              "t": "A primary flame can accelerate as turbulence mixes unburned fuel, making ductwork and connected rooms part of the hazard. The powder-hazard file stores the dust survey. Dust fits.",
              "v": "expert",
              "fb": "Correct: the answer connects combustion physics with dust inventory, dispersion, and engineered controls."
            },
            {
              "t": "Analyze the ignition source while treating dust concentration, enclosure, turbulence, and secondary fuel as later details. Ignition receives the most attention. The dust record fits.",
              "v": "partial",
              "fb": "This names one part of the fire triangle but leaves confinement or secondary fuel unaddressed."
            },
            {
              "t": "Assume flame speed and pressure are largely independent of particle size, turbulence, oxygen, and enclosure geometry. Dust records fit this dust account. Dust timing supports this dust claim.",
              "v": "wrong",
              "fb": "That explanation applies the wrong gas or flame concept to the observed powder hazard."
            },
            {
              "t": "Leave the powder in place and treat the eventual ignition source as too unpredictable to manage in advance. Dust records fit this dust account. Dust timing supports this dust claim.",
              "v": "danger",
              "fb": "That shortcut leaves accumulated fuel in place and treats the eventual ignition source as unforeseeable."
            }
          ]
        },
        {
          "q": "What prevention lesson should a combustible-dust plant retain?",
          "o": [
            {
              "t": "Cover knowledge here means reading deposits and blast patterns as a sequence. A bomb story is not needed when ordinary powder, poor housekeeping, and connected enclosures explain the pressure wave. Dust fits.",
              "v": "expert",
              "fb": "Correct: the answer connects combustion physics with dust inventory, dispersion, and engineered controls."
            },
            {
              "t": "Improve ignition control while handling housekeeping and ventilation as separate production-maintenance tasks. Dust records fit this dust account. Dust context supports the view. Dust timing supports this dust claim.",
              "v": "partial",
              "fb": "This names one part of the fire triangle but leaves confinement or secondary fuel unaddressed."
            },
            {
              "t": "Attribute the explosion mainly to a bomb or random spark rather than accumulated fuel and propagation. Dust records fit this dust account. Dust context supports the view. Dust timing supports this dust claim.",
              "v": "wrong",
              "fb": "That explanation applies the wrong gas or flame concept to the observed powder hazard."
            },
            {
              "t": "Restart production with hidden ledges still coated and measure dust after another ignition event. Production history can support it. Dust context supports the view. Dust timing supports this dust claim. Dust fits.",
              "v": "danger",
              "fb": "That shortcut leaves accumulated fuel in place and treats the eventual ignition source as unforeseeable."
            }
          ]
        }
      ]
    },
    "du_mach": {
      "sci": "Ernst Mach (1838-1916)",
      "topic": "Shock waves",
      "lede": "Ernst Mach's work on shock waves gave powder hazards a measurable mechanism.",
      "no": 5,
      "profile": "This combustible-powder cover note uses Ernst Mach to explore shock waves. Ernst Mach photographed and analyzed shock waves, showing how disturbances steepen when objects or flows move faster than sound. The Mach number became the basic ratio comparing speed with sound speed. The work made air, particles, heat, pressure, or charge part of a physical account that could be tested inside industrial enclosures.\n\nA blast wave carries a sudden pressure jump; its effect depends on peak overpressure, impulse, distance, and reflections. Housekeeping and ventilation are engineering controls, not cosmetic work. Dust depth, hidden ledges, extraction flow, bonding, grounding, ignition sources, isolation, and venting must be inspected as one connected system. A dust-hazard explanation should state fuel properties, concentration, dispersion, oxygen, confinement, ignition energy, and the route available for pressure relief.\n\nA dust explosion requires combustible particles, dispersion, oxygen, ignition, and enough confinement for pressure to build. Removing any one element can prevent the event, but industrial processes often recreate all five during ordinary operation. Fine particles expose enormous surface area. A small primary ignition may lift settled dust from beams, ducts, or floors, producing a secondary cloud with far more fuel than the first explosion contained. The mill record should join deposit surveys, particle data, extraction flow, grounding tests, cleaning rounds, production changes, and ignition evidence.\n\nCover knowledge here means reading deposits and blast patterns as a sequence. A bomb story is not needed when ordinary powder, poor housekeeping, and connected enclosures explain the pressure wave. The combustion lesson is that a tiny spark does not explain a catastrophe by itself. Severity comes from fuel inventory, dispersion, confinement, propagation paths, and the defenses that were present or absent. A trustworthy plant record includes dust sampling, explosibility data, cleaning rounds, fan performance, static controls, hot-work permits, near misses, and any change in production rate or particle size.",
      "frame": "Seals a dust sample at The Motor Control Room. \"Start with Ernst Mach; keep concentration and confinement in view.\"",
      "q": [
        {
          "q": "Which combustible-dust account best presents Ernst Mach's work on shock waves?",
          "o": [
            {
              "t": "Ernst Mach photographed and analyzed shock waves, showing how disturbances steepen when objects or flows move faster than sound. Combustion specialists compare the raw airflow record with deposits. Dust fits.",
              "v": "expert",
              "fb": "Correct: the answer connects combustion physics with dust inventory, dispersion, and engineered controls."
            },
            {
              "t": "Ernst Mach's dust work emphasizes the visible ignition source. Production history can support it. Dust records fit this dust account. Dust practice makes the dust view plausible. Dust timing supports this dust claim.",
              "v": "partial",
              "fb": "This names one part of the fire triangle but leaves confinement or secondary fuel unaddressed."
            },
            {
              "t": "Ernst Mach's dust work supports a bomb as the most plausible source of a fast pressure wave through the processing building. Production history can support it. Dust practice makes the dust view plausible.",
              "v": "wrong",
              "fb": "That explanation applies the wrong gas or flame concept to the observed powder hazard."
            },
            {
              "t": "Ernst Mach's dust authority supports leaving settled deposits in place because they appear harmless before becoming airborne. Ignition receives the most attention. Dust records fit this dust account. Dust fits.",
              "v": "danger",
              "fb": "That shortcut leaves accumulated fuel in place and treats the eventual ignition source as unforeseeable."
            }
          ]
        },
        {
          "q": "Which powder-hazard principle does this work establish?",
          "o": [
            {
              "t": "A blast wave carries a sudden pressure jump; its effect depends on peak overpressure, impulse, distance, and reflections. The powder-hazard file stores the dust survey. Dust fits.",
              "v": "expert",
              "fb": "Correct: the answer connects combustion physics with dust inventory, dispersion, and engineered controls."
            },
            {
              "t": "Analyze the ignition source while treating dust concentration, enclosure, turbulence, and secondary fuel as later details. Ignition receives the most attention. The dust record fits.",
              "v": "partial",
              "fb": "This names one part of the fire triangle but leaves confinement or secondary fuel unaddressed."
            },
            {
              "t": "Assume flame speed and pressure are largely independent of particle size, turbulence, oxygen, and enclosure geometry. Dust records fit this dust account. Dust timing supports this dust claim.",
              "v": "wrong",
              "fb": "That explanation applies the wrong gas or flame concept to the observed powder hazard."
            },
            {
              "t": "Leave the powder in place and treat the eventual ignition source as too unpredictable to manage in advance. Dust records fit this dust account. Dust timing supports this dust claim.",
              "v": "danger",
              "fb": "That shortcut leaves accumulated fuel in place and treats the eventual ignition source as unforeseeable."
            }
          ]
        },
        {
          "q": "What prevention lesson should a combustible-dust plant retain?",
          "o": [
            {
              "t": "A trustworthy plant record includes dust sampling, explosibility data, cleaning rounds, fan performance, static controls, hot-work permits, near misses, and any change in production rate or particle size.",
              "v": "expert",
              "fb": "Correct: the answer connects combustion physics with dust inventory, dispersion, and engineered controls."
            },
            {
              "t": "Improve ignition control while handling housekeeping and ventilation as separate production-maintenance tasks. Dust records fit this dust account. Dust context supports the view. Dust timing supports this dust claim.",
              "v": "partial",
              "fb": "This names one part of the fire triangle but leaves confinement or secondary fuel unaddressed."
            },
            {
              "t": "Attribute the explosion mainly to a bomb or random spark rather than accumulated fuel and propagation. Ignition receives the most attention. Dust records fit this dust account. Dust timing supports this dust claim.",
              "v": "wrong",
              "fb": "That explanation applies the wrong gas or flame concept to the observed powder hazard."
            },
            {
              "t": "Restart production with hidden ledges still coated and measure dust after another ignition event. Settled powder appears inactive. Ignition receives the most attention. Production history can support it. Dust fits.",
              "v": "danger",
              "fb": "That shortcut leaves accumulated fuel in place and treats the eventual ignition source as unforeseeable."
            }
          ]
        }
      ]
    },
    "du_bartknecht": {
      "sci": "Wolfgang Bartknecht (dust-explosion researcher)",
      "topic": "Dust-explosion severity & venting",
      "lede": "Through dust-explosion severity & venting, Wolfgang Bartknecht clarified how particles, gases, heat, or charge can escalate pressure.",
      "no": 6,
      "profile": "This combustible-powder cover note uses Wolfgang Bartknecht to explore dust-explosion severity & venting. Wolfgang Bartknecht conducted influential experiments on dust-explosion pressure, venting, suppression, and industrial prevention. His data helped engineers size relief systems for combustible powders. The work made air, particles, heat, pressure, or charge part of a physical account that could be tested inside industrial enclosures.\n\nVenting must be designed for the dust's measured explosibility and the enclosure geometry, not copied from an unrelated process. Fine particles expose enormous surface area. A small primary ignition may lift settled dust from beams, ducts, or floors, producing a secondary cloud with far more fuel than the first explosion contained. A dust-hazard explanation should state fuel properties, concentration, dispersion, oxygen, confinement, ignition energy, and the route available for pressure relief.\n\nHousekeeping and ventilation are engineering controls, not cosmetic work. Dust depth, hidden ledges, extraction flow, bonding, grounding, ignition sources, isolation, and venting must be inspected as one connected system. A dust explosion requires combustible particles, dispersion, oxygen, ignition, and enough confinement for pressure to build. Removing any one element can prevent the event, but industrial processes often recreate all five during ordinary operation. The mill record should join deposit surveys, particle data, extraction flow, grounding tests, cleaning rounds, production changes, and ignition evidence.\n\nA trustworthy plant record includes dust sampling, explosibility data, cleaning rounds, fan performance, static controls, hot-work permits, near misses, and any change in production rate or particle size. Cover knowledge here means reading deposits and blast patterns as a sequence. A bomb story is not needed when ordinary powder, poor housekeeping, and connected enclosures explain the pressure wave. The combustion lesson is that a tiny spark does not explain a catastrophe by itself. Severity comes from fuel inventory, dispersion, confinement, propagation paths, and the defenses that were present or absent.",
      "frame": "Points into a clogged duct at The Motor Control Room. \"Give me dust-explosion severity & venting, the ignition condition, and the propagation path.\"",
      "q": [
        {
          "q": "Which combustible-dust account best presents Wolfgang Bartknecht's work on dust-explosion severity & venting?",
          "o": [
            {
              "t": "Wolfgang Bartknecht conducted influential experiments on dust-explosion pressure, venting, suppression, and industrial prevention. Dust review keeps the cleaning history available for analysis.",
              "v": "expert",
              "fb": "Correct: the answer connects combustion physics with dust inventory, dispersion, and engineered controls."
            },
            {
              "t": "Wolfgang Bartknecht's dust work relies on the visible ignition source. The first blast looks external. Dust records fit this dust account. Dust context supports the view. The first blast looks external.",
              "v": "partial",
              "fb": "This names one part of the fire triangle but leaves confinement or secondary fuel unaddressed."
            },
            {
              "t": "Wolfgang Bartknecht's dust work is read within dust practice as support for a bomb as the most plausible source of a fast pressure wave through the processing building. Dust records fit this dust account.",
              "v": "wrong",
              "fb": "That explanation applies the wrong gas or flame concept to the observed powder hazard."
            },
            {
              "t": "Wolfgang Bartknecht's authority is invoked in dust practice to justify leaving settled deposits in place because they appear harmless before becoming airborne. Dust records fit this dust account.",
              "v": "danger",
              "fb": "That shortcut leaves accumulated fuel in place and treats the eventual ignition source as unforeseeable."
            }
          ]
        },
        {
          "q": "Which powder-hazard principle does this work establish?",
          "o": [
            {
              "t": "Venting must be designed for the dust's measured explosibility and the enclosure geometry, not copied from an unrelated process. The powder-hazard file stores the ignition log. Dust fits.",
              "v": "expert",
              "fb": "Correct: the answer connects combustion physics with dust inventory, dispersion, and engineered controls."
            },
            {
              "t": "Analyze the ignition source while treating dust concentration, enclosure, turbulence, and secondary fuel as later details. Dust records fit this dust account. Dust timing supports this dust claim.",
              "v": "partial",
              "fb": "This names one part of the fire triangle but leaves confinement or secondary fuel unaddressed."
            },
            {
              "t": "Assume flame speed and pressure are largely independent of particle size, turbulence, oxygen, and enclosure geometry. Settled powder appears inactive. Dust records fit this dust account.",
              "v": "wrong",
              "fb": "That explanation applies the wrong gas or flame concept to the observed powder hazard."
            },
            {
              "t": "Leave the powder in place and treat the eventual ignition source as too unpredictable to manage in advance. Production history can support it. Dust timing supports this dust claim. Dust fits.",
              "v": "danger",
              "fb": "That shortcut leaves accumulated fuel in place and treats the eventual ignition source as unforeseeable."
            }
          ]
        },
        {
          "q": "What prevention lesson should a combustible-dust plant retain?",
          "o": [
            {
              "t": "The combustion lesson is that a tiny spark does not explain a catastrophe by itself. Severity comes from fuel inventory, dispersion, confinement, propagation paths, and the defenses that were present or absent. Dust fits.",
              "v": "expert",
              "fb": "Correct: the answer connects combustion physics with dust inventory, dispersion, and engineered controls."
            },
            {
              "t": "Improve ignition control while handling housekeeping and ventilation as separate production-maintenance tasks. Dust context supports the view. Dust practice makes the dust view plausible. Dust timing supports this dust claim.",
              "v": "partial",
              "fb": "This names one part of the fire triangle but leaves confinement or secondary fuel unaddressed."
            },
            {
              "t": "Attribute the explosion mainly to a bomb or random spark rather than accumulated fuel and propagation. Settled powder appears inactive. Ignition receives the most attention. Production history can support it. Dust fits.",
              "v": "wrong",
              "fb": "That explanation applies the wrong gas or flame concept to the observed powder hazard."
            },
            {
              "t": "Restart production with hidden ledges still coated and measure dust after another ignition event. Ignition receives the most attention. Production history can support it. Dust practice makes the dust view plausible.",
              "v": "danger",
              "fb": "That shortcut leaves accumulated fuel in place and treats the eventual ignition source as unforeseeable."
            }
          ]
        }
      ]
    },
    "du_galloway": {
      "sci": "William Galloway (coal-dust explosion researcher)",
      "topic": "Coal-dust explosions",
      "lede": "William Galloway made coal-dust explosions part of the physical explanation for fast industrial combustion.",
      "no": 7,
      "profile": "This combustible-powder cover note uses William Galloway to explore coal-dust explosions. William Galloway argued from mine disasters and experiments that fine coal dust could propagate explosions even when methane was not the sole fuel. His work challenged explanations that treated firedamp as the only cause. The work made air, particles, heat, pressure, or charge part of a physical account that could be tested inside industrial enclosures.\n\nDeposited dust is stored fuel; an initial pressure wave can lift it into a far larger secondary cloud. A dust explosion requires combustible particles, dispersion, oxygen, ignition, and enough confinement for pressure to build. Removing any one element can prevent the event, but industrial processes often recreate all five during ordinary operation. A dust-hazard explanation should state fuel properties, concentration, dispersion, oxygen, confinement, ignition energy, and the route available for pressure relief.\n\nFine particles expose enormous surface area. A small primary ignition may lift settled dust from beams, ducts, or floors, producing a secondary cloud with far more fuel than the first explosion contained. Housekeeping and ventilation are engineering controls, not cosmetic work. Dust depth, hidden ledges, extraction flow, bonding, grounding, ignition sources, isolation, and venting must be inspected as one connected system. The mill record should join deposit surveys, particle data, extraction flow, grounding tests, cleaning rounds, production changes, and ignition evidence.\n\nThe combustion lesson is that a tiny spark does not explain a catastrophe by itself. Severity comes from fuel inventory, dispersion, confinement, propagation paths, and the defenses that were present or absent. A trustworthy plant record includes dust sampling, explosibility data, cleaning rounds, fan performance, static controls, hot-work permits, near misses, and any change in production rate or particle size. Cover knowledge here means reading deposits and blast patterns as a sequence. A bomb story is not needed when ordinary powder, poor housekeeping, and connected enclosures explain the pressure wave.",
      "frame": "Brushes powder from a beam at The Owner's Plant Office. \"Use William Galloway to explain how settled fuel becomes moving flame and pressure.\"",
      "q": [
        {
          "q": "Which combustible-dust account best presents William Galloway's work on coal-dust explosions?",
          "o": [
            {
              "t": "William Galloway argued from mine disasters and experiments that fine coal dust could propagate explosions even when methane was not the sole fuel. Explosion evidence ties the raw dated airflow record to prevention controls.",
              "v": "expert",
              "fb": "Correct: the answer connects combustion physics with dust inventory, dispersion, and engineered controls."
            },
            {
              "t": "William Galloway's treatment of coal-dust explosions uses a dust simplification: the visible ignition source, with deposited fuel, confinement, and secondary propagation treated as lesser factors. The first blast looks external.",
              "v": "partial",
              "fb": "This names one part of the fire triangle but leaves confinement or secondary fuel unaddressed."
            },
            {
              "t": "William Galloway's dust work is read within dust practice as support for a bomb as the most plausible source of a fast pressure wave through the processing building. Dust context supports the view. Dust timing supports this dust claim.",
              "v": "wrong",
              "fb": "That explanation applies the wrong gas or flame concept to the observed powder hazard."
            },
            {
              "t": "William Galloway's authority is invoked in dust practice to justify leaving settled deposits in place because they appear harmless before becoming airborne. Dust context supports the view. Dust timing supports this dust claim.",
              "v": "danger",
              "fb": "That shortcut leaves accumulated fuel in place and treats the eventual ignition source as unforeseeable."
            }
          ]
        },
        {
          "q": "Which powder-hazard principle does this work establish?",
          "o": [
            {
              "t": "Deposited dust is stored fuel; an initial pressure wave can lift it into a far larger secondary cloud. Combustion specialists compare the dust survey with deposits. Dust fits.",
              "v": "expert",
              "fb": "Correct: the answer connects combustion physics with dust inventory, dispersion, and engineered controls."
            },
            {
              "t": "Analyze the ignition source while treating dust concentration, enclosure, turbulence, and secondary fuel as later details. Ignition receives the most attention. Dust fits.",
              "v": "partial",
              "fb": "This names one part of the fire triangle but leaves confinement or secondary fuel unaddressed."
            },
            {
              "t": "Assume flame speed and pressure are largely independent of particle size, turbulence, oxygen, and enclosure geometry. Dust records fit this dust account. The dust practice fits.",
              "v": "wrong",
              "fb": "That explanation applies the wrong gas or flame concept to the observed powder hazard."
            },
            {
              "t": "Leave the powder in place and treat the eventual ignition source as too unpredictable to manage in advance. Dust records fit this dust account. Dust timing supports this dust claim.",
              "v": "danger",
              "fb": "That shortcut leaves accumulated fuel in place and treats the eventual ignition source as unforeseeable."
            }
          ]
        },
        {
          "q": "What prevention lesson should a combustible-dust plant retain?",
          "o": [
            {
              "t": "Cover knowledge here means reading deposits and blast patterns as a sequence. A bomb story is not needed when ordinary powder, poor housekeeping, and connected enclosures explain the pressure wave. Dust fits.",
              "v": "expert",
              "fb": "Correct: the answer connects combustion physics with dust inventory, dispersion, and engineered controls."
            },
            {
              "t": "Improve ignition control while handling housekeeping and ventilation as separate production-maintenance tasks. Dust records fit this dust account. Dust context supports the view. Dust timing supports this dust claim.",
              "v": "partial",
              "fb": "This names one part of the fire triangle but leaves confinement or secondary fuel unaddressed."
            },
            {
              "t": "Attribute the explosion mainly to a bomb or random spark rather than accumulated fuel and propagation. Dust records fit this dust account. Dust context supports the view. Dust timing supports this dust claim.",
              "v": "wrong",
              "fb": "That explanation applies the wrong gas or flame concept to the observed powder hazard."
            },
            {
              "t": "Restart production with hidden ledges still coated and measure dust after another ignition event. Production history can support it. Dust context supports the view. Dust timing supports this dust claim. Dust fits.",
              "v": "danger",
              "fb": "That shortcut leaves accumulated fuel in place and treats the eventual ignition source as unforeseeable."
            }
          ]
        }
      ]
    },
    "du_bagnold": {
      "sci": "Ralph A. Bagnold (1896-1990)",
      "topic": "The physics of blown particles",
      "lede": "Ralph A. Bagnold's work on the physics of blown particles gave powder hazards a measurable mechanism.",
      "no": 8,
      "profile": "This combustible-powder cover note uses Ralph A. Bagnold to explore the physics of blown particles. Ralph A. Bagnold studied how wind moves sand by rolling, saltation, and suspension. His physics of granular transport explains how particle size, airflow, and surface conditions determine whether material becomes airborne. The work made air, particles, heat, pressure, or charge part of a physical account that could be tested inside industrial enclosures.\n\nA settled layer can become an explosive cloud when a pressure pulse or fast air stream exceeds the threshold for entrainment. Housekeeping and ventilation are engineering controls, not cosmetic work. Dust depth, hidden ledges, extraction flow, bonding, grounding, ignition sources, isolation, and venting must be inspected as one connected system. A dust-hazard explanation should state fuel properties, concentration, dispersion, oxygen, confinement, ignition energy, and the route available for pressure relief.\n\nA dust explosion requires combustible particles, dispersion, oxygen, ignition, and enough confinement for pressure to build. Removing any one element can prevent the event, but industrial processes often recreate all five during ordinary operation. Fine particles expose enormous surface area. A small primary ignition may lift settled dust from beams, ducts, or floors, producing a secondary cloud with far more fuel than the first explosion contained. The mill record should join deposit surveys, particle data, extraction flow, grounding tests, cleaning rounds, production changes, and ignition evidence.\n\nCover knowledge here means reading deposits and blast patterns as a sequence. A bomb story is not needed when ordinary powder, poor housekeeping, and connected enclosures explain the pressure wave. The combustion lesson is that a tiny spark does not explain a catastrophe by itself. Severity comes from fuel inventory, dispersion, confinement, propagation paths, and the defenses that were present or absent. A trustworthy plant record includes dust sampling, explosibility data, cleaning rounds, fan performance, static controls, hot-work permits, near misses, and any change in production rate or particle size.",
      "frame": "Seals a dust sample at The Owner's Plant Office. \"Start with Ralph A. Bagnold; keep concentration and confinement in view.\"",
      "q": [
        {
          "q": "Which combustible-dust account best presents Ralph A. Bagnold's work on the physics of blown particles?",
          "o": [
            {
              "t": "Ralph A. The powder-hazard file stores the cleaning history. The powder-hazard file stores the raw cleaning history. Combustion specialists compare the raw cleaning history with deposits. Fits.",
              "v": "expert",
              "fb": "Correct: the answer connects combustion physics with dust inventory, dispersion, and engineered controls."
            },
            {
              "t": "Ralph A. Bagnold's dust work emphasizes the visible ignition source. Ignition receives the most attention. Production history can support it. Dust practice makes the dust view plausible. Fits.",
              "v": "partial",
              "fb": "This names one part of the fire triangle but leaves confinement or secondary fuel unaddressed."
            },
            {
              "t": "Ralph A. Bagnold's dust work is read within dust practice as support for a bomb as the most plausible source of a fast pressure wave through the processing building. Dust records fit this dust account.",
              "v": "wrong",
              "fb": "That explanation applies the wrong gas or flame concept to the observed powder hazard."
            },
            {
              "t": "Ralph A. Bagnold's authority is invoked in dust practice to justify leaving settled deposits in place because they appear harmless before becoming airborne. Dust records fit this dust account.",
              "v": "danger",
              "fb": "That shortcut leaves accumulated fuel in place and treats the eventual ignition source as unforeseeable."
            }
          ]
        },
        {
          "q": "Which powder-hazard principle does this work establish?",
          "o": [
            {
              "t": "A settled layer can become an explosive cloud when a pressure pulse or fast air stream exceeds the threshold for entrainment. The powder-hazard file stores the dust survey. Dust fits.",
              "v": "expert",
              "fb": "Correct: the answer connects combustion physics with dust inventory, dispersion, and engineered controls."
            },
            {
              "t": "Analyze the ignition source while treating dust concentration, enclosure, turbulence, and secondary fuel as later details. Ignition receives the most attention. The dust record fits.",
              "v": "partial",
              "fb": "This names one part of the fire triangle but leaves confinement or secondary fuel unaddressed."
            },
            {
              "t": "Assume flame speed and pressure are largely independent of particle size, turbulence, oxygen, and enclosure geometry. Dust records fit this dust account. Dust timing supports this dust claim.",
              "v": "wrong",
              "fb": "That explanation applies the wrong gas or flame concept to the observed powder hazard."
            },
            {
              "t": "Leave the powder in place and treat the eventual ignition source as too unpredictable to manage in advance. Settled powder appears inactive. Dust records fit this dust account. Dust fits.",
              "v": "danger",
              "fb": "That shortcut leaves accumulated fuel in place and treats the eventual ignition source as unforeseeable."
            }
          ]
        },
        {
          "q": "What prevention lesson should a combustible-dust plant retain?",
          "o": [
            {
              "t": "A trustworthy plant record includes dust sampling, explosibility data, cleaning rounds, fan performance, static controls, hot-work permits, near misses, and any change in production rate or particle size.",
              "v": "expert",
              "fb": "Correct: the answer connects combustion physics with dust inventory, dispersion, and engineered controls."
            },
            {
              "t": "Improve ignition control while handling housekeeping and ventilation as separate production-maintenance tasks. Dust records fit this dust account. Dust context supports the view. Dust timing supports this dust claim.",
              "v": "partial",
              "fb": "This names one part of the fire triangle but leaves confinement or secondary fuel unaddressed."
            },
            {
              "t": "Attribute the explosion mainly to a bomb or random spark rather than accumulated fuel and propagation. Ignition receives the most attention. Dust records fit this dust account. Dust timing supports this dust claim.",
              "v": "wrong",
              "fb": "That explanation applies the wrong gas or flame concept to the observed powder hazard."
            },
            {
              "t": "Restart production with hidden ledges still coated and measure dust after another ignition event. Settled powder appears inactive. Ignition receives the most attention. Production history can support it. Dust fits.",
              "v": "danger",
              "fb": "That shortcut leaves accumulated fuel in place and treats the eventual ignition source as unforeseeable."
            }
          ]
        }
      ]
    },
    "du_lichtenberg": {
      "sci": "Georg Christoph Lichtenberg (1742-1799)",
      "topic": "Static discharge",
      "lede": "Through static discharge, Georg Christoph Lichtenberg clarified how particles, gases, heat, or charge can escalate pressure.",
      "no": 9,
      "profile": "This combustible-powder cover note uses Georg Christoph Lichtenberg to explore static discharge. Georg Christoph Lichtenberg produced branching electrical discharge patterns in dust on insulating surfaces. Lichtenberg figures made the paths of high-voltage charge visible. The work made air, particles, heat, pressure, or charge part of a physical account that could be tested inside industrial enclosures.\n\nA static discharge is evidence of stored electrical energy, and grounding must include every conductive part that can become isolated. Fine particles expose enormous surface area. A small primary ignition may lift settled dust from beams, ducts, or floors, producing a secondary cloud with far more fuel than the first explosion contained. A dust-hazard explanation should state fuel properties, concentration, dispersion, oxygen, confinement, ignition energy, and the route available for pressure relief.\n\nHousekeeping and ventilation are engineering controls, not cosmetic work. Dust depth, hidden ledges, extraction flow, bonding, grounding, ignition sources, isolation, and venting must be inspected as one connected system. A dust explosion requires combustible particles, dispersion, oxygen, ignition, and enough confinement for pressure to build. Removing any one element can prevent the event, but industrial processes often recreate all five during ordinary operation. The mill record should join deposit surveys, particle data, extraction flow, grounding tests, cleaning rounds, production changes, and ignition evidence.\n\nA trustworthy plant record includes dust sampling, explosibility data, cleaning rounds, fan performance, static controls, hot-work permits, near misses, and any change in production rate or particle size. Cover knowledge here means reading deposits and blast patterns as a sequence. A bomb story is not needed when ordinary powder, poor housekeeping, and connected enclosures explain the pressure wave. The combustion lesson is that a tiny spark does not explain a catastrophe by itself. Severity comes from fuel inventory, dispersion, confinement, propagation paths, and the defenses that were present or absent.",
      "frame": "Points into a clogged duct at The Owner's Plant Office. \"Give me static discharge, the ignition condition, and the propagation path.\"",
      "q": [
        {
          "q": "Which combustible-dust account best presents Georg Christoph Lichtenberg's work on static discharge?",
          "o": [
            {
              "t": "Georg Christoph Lichtenberg produced branching electrical discharge patterns in dust on insulating surfaces. The housekeeping archive carries the dated deposit-measured airflow record. Dust fits.",
              "v": "expert",
              "fb": "Correct: the answer connects combustion physics with dust inventory, dispersion, and engineered controls."
            },
            {
              "t": "Georg Christoph Lichtenberg's dust work emphasizes the visible ignition source. Production history can support it. Dust practice makes the dust view plausible. Dust timing supports this dust claim.",
              "v": "partial",
              "fb": "This names one part of the fire triangle but leaves confinement or secondary fuel unaddressed."
            },
            {
              "t": "Georg Christoph Lichtenberg's dust work supports a bomb as the most plausible source of a fast pressure wave through the processing building. Ignition receives the most attention. Dust fits.",
              "v": "wrong",
              "fb": "That explanation applies the wrong gas or flame concept to the observed powder hazard."
            },
            {
              "t": "Georg Christoph Lichtenberg's dust authority supports leaving settled deposits in place because they appear harmless before becoming airborne. Ignition receives the most attention. Dust fits.",
              "v": "danger",
              "fb": "That shortcut leaves accumulated fuel in place and treats the eventual ignition source as unforeseeable."
            }
          ]
        },
        {
          "q": "Which powder-hazard principle does this work establish?",
          "o": [
            {
              "t": "A static discharge is evidence of stored electrical energy, and grounding must include every conductive part that can become isolated. The powder-hazard file stores the dust survey. Dust fits.",
              "v": "expert",
              "fb": "Correct: the answer connects combustion physics with dust inventory, dispersion, and engineered controls."
            },
            {
              "t": "Analyze the ignition source while treating dust concentration, enclosure, turbulence, and secondary fuel as later details. Dust records fit this dust account. Dust timing supports this dust claim.",
              "v": "partial",
              "fb": "This names one part of the fire triangle but leaves confinement or secondary fuel unaddressed."
            },
            {
              "t": "Assume flame speed and pressure are largely independent of particle size, turbulence, oxygen, and enclosure geometry. Ignition receives the most attention. Dust records fit this dust account.",
              "v": "wrong",
              "fb": "That explanation applies the wrong gas or flame concept to the observed powder hazard."
            },
            {
              "t": "Leave the powder in place and treat the eventual ignition source as too unpredictable to manage in advance. Ignition receives the most attention. Dust practice makes the dust view plausible.",
              "v": "danger",
              "fb": "That shortcut leaves accumulated fuel in place and treats the eventual ignition source as unforeseeable."
            }
          ]
        },
        {
          "q": "What prevention lesson should a combustible-dust plant retain?",
          "o": [
            {
              "t": "The combustion lesson is that a tiny spark does not explain a catastrophe by itself. Severity comes from fuel inventory, dispersion, confinement, propagation paths, and the defenses that were present or absent. Dust fits.",
              "v": "expert",
              "fb": "Correct: the answer connects combustion physics with dust inventory, dispersion, and engineered controls."
            },
            {
              "t": "Improve ignition control while handling housekeeping and ventilation as separate production-maintenance tasks. Dust context supports the view. Dust practice makes the dust view plausible. Dust timing supports this dust claim.",
              "v": "partial",
              "fb": "This names one part of the fire triangle but leaves confinement or secondary fuel unaddressed."
            },
            {
              "t": "Attribute the explosion mainly to a bomb or random spark rather than accumulated fuel and propagation. Settled powder appears inactive. Ignition receives the most attention. Production history can support it. Dust fits.",
              "v": "wrong",
              "fb": "That explanation applies the wrong gas or flame concept to the observed powder hazard."
            },
            {
              "t": "Restart production with hidden ledges still coated and measure dust after another ignition event. Ignition receives the most attention. Production history can support it. Dust practice makes the dust view plausible.",
              "v": "danger",
              "fb": "That shortcut leaves accumulated fuel in place and treats the eventual ignition source as unforeseeable."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "sweeper": {
      "floor": "Sweeper Ruiz waits at The Production Floor & Ducts; a map of the shattered galleries lies beneath a powder seal. \"Combustion vocabulary matters here; earn the logbook by handling the dossier precisely.\"",
      "mcc": "Sweeper Ruiz waits at The Motor Control Room; an isolated motor starter lies beneath a powder seal. \"Combustion vocabulary matters here; earn the logbook by handling the dossier precisely.\"",
      "office": "Sweeper Ruiz waits at The Owner's Plant Office; the archived shift books lies beneath a powder seal. \"Combustion vocabulary matters here; earn the logbook by handling the dossier precisely.\""
    },
    "electrician": {
      "floor": "The Electrician waits at The Production Floor & Ducts; a map of the shattered galleries lies beneath a powder seal. \"I will not trade plant records for guesses—start with the scientist you were sent.\"",
      "mcc": "The Electrician waits at The Motor Control Room; an isolated motor starter lies beneath a powder seal. \"I will not trade plant records for guesses—start with the scientist you were sent.\"",
      "office": "The Electrician waits at The Owner's Plant Office; the archived shift books lies beneath a powder seal. \"I will not trade plant records for guesses—start with the scientist you were sent.\""
    },
    "clerk": {
      "floor": "The Clerk waits at The Production Floor & Ducts; a map of the shattered galleries lies beneath a powder seal. \"Read the pioneer, answer cleanly, and then we can discuss who signed what.\"",
      "mcc": "The Clerk waits at The Motor Control Room; an isolated motor starter lies beneath a powder seal. \"Read the pioneer, answer cleanly, and then we can discuss who signed what.\"",
      "office": "The Clerk waits at The Owner's Plant Office; the archived shift books lies beneath a powder seal. \"Read the pioneer, answer cleanly, and then we can discuss who signed what.\""
    }
  },
  "story": [
    "<b>The Corriston Mill Blast</b> opens inside the Corriston mill inquiry, where the visible damage is easier to describe than the chain that produced it.",
    "<b>Sweeper Ruiz</b>, <b>The Electrician</b>, and <b>The Clerk</b> each control a different slice of the record, and each conversation turns one real pioneer into a way of reading the case.",
    "Some witnesses are drawn toward <b>A confined gas deflagration spread through the mill.</b>; others settle too quickly on <b>A high-order detonation drove one dominant blast wave.</b>. Your job is to separate those tempting stories from the harder explanation the evidence supports.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and decide what the case is really about."
  ],
  "endings": {
    "overclaimWhat": "attack",
    "dismissalWhat": "freak",
    "win": {
      "expertTitle": "The Explosion That Repeated",
      "expert": [
        "Inspector Nash Verel names Corwin Ash — plant owner, The Owner's Plant Office, and Secondary dust blasts lifted deposits floor by floor. Not A confined gas deflagration spread through the mill. Not A high-order detonation drove one dominant blast wave.",
        "The pioneer readings separate a single gas flame, a shock-coupled detonation, and the classic secondary-dust sequence in which an initial event suspends settled powder and creates new fuel clouds."
      ],
      "soundTitle": "A Sound Combustion Finding",
      "sound": [
        "Powder evidence fixes the trio: Corwin Ash — plant owner; The Owner's Plant Office; Secondary dust blasts lifted deposits floor by floor.",
        "Enough blast sequence evidence survives to support the finding; missing shift documents weaken only the attribution."
      ],
      "namedTitle": "Correct Mechanism, Sparse Chain",
      "named": [
        "Powder evidence points to Corwin Ash — plant owner, The Owner's Plant Office, and Secondary dust blasts lifted deposits floor by floor; powder support remains incomplete.",
        "The blast answer is right, yet the sparse log collection makes it look uncomfortably like inspired guessing."
      ]
    },
    "overclaim": {
      "title": "The Gas-Cloud Theory",
      "body": [
        "Inspector Nash Verel adopts A confined gas deflagration spread through the mill. The gas theory sounds plausible until the blast sequence is compared.",
        "A gas deflagration requires a sustained flammable gas or vapor mixture and would center evidence on its source and enclosure. It does not explain repeated floors marked by freshly suspended particulate fuel."
      ]
    },
    "dismissal": {
      "title": "The Detonation Theory",
      "body": [
        "Inspector Nash Verel instead adopts A high-order detonation drove one dominant blast wave. The mill lacks the singular shock signature demanded by detonation.",
        "Detonation couples reaction to a supersonic shock and leaves a more singular high-pressure signature. The staged outward deformation and successive dust lifting fit deflagrations propagating as secondary explosions instead."
      ]
    },
    "wrongNames": {
      "title": "Right Physics, Wrong Attribution",
      "body": [
        "The secondary-blast mechanism is correct, yet responsibility or location has been misnamed. Repair the mill clue trail before closing."
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A mill with ducts and a dust explosion\"><path d=\"M56 112 L56 44 L174 44 L174 112\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M84 44 L84 22 L144 22 L144 44\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M174 62 L264 62 L264 84 L346 84\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M346 84 L346 56 L406 56\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><circle cx=\"346\" cy=\"84\" r=\"10\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"2\"/><path d=\"M346 84 l18 -6 M346 84 l16 10 M346 84 l-18 -6 M346 84 l-14 10 M346 84 l0 -20\" stroke=\"#B3261E\" stroke-width=\"1.8\" stroke-linecap=\"round\"/><path d=\"M16 112 L642 112\" stroke=\"#e2e2d8\" stroke-width=\"1\"/><path d=\"M440 36 C470 30,504 38,522 58 C538 76,538 100,520 112\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2.2\"/></svg>"
}};
