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
  "boardNarr": "You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  "placeNarr": "You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
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
        "du_boyle",
        "du_priestley"
      ],
      "electrician": [
        "du_scheele",
        "du_lomonosov"
      ],
      "clerk": [
        "du_gaylussac",
        "du_avogadro"
      ]
    },
    "mcc": {
      "sweeper": [
        "du_mallard",
        "du_vieille"
      ],
      "electrician": [
        "du_mach",
        "du_hinshelwood"
      ],
      "clerk": [
        "du_bartknecht",
        "du_eckhoff"
      ]
    },
    "office": {
      "sweeper": [
        "du_galloway",
        "du_haldane"
      ],
      "electrician": [
        "du_bagnold",
        "du_gray"
      ],
      "clerk": [
        "du_lichtenberg",
        "du_fourier"
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
      "frame": "Sweeper Ruiz brushes powder from a beam at The Production Floor & Ducts. \"Use Robert Boyle to explain how settled fuel becomes moving flame and pressure.\"",
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
    "du_priestley": {
      "sci": "Joseph Priestley (1733-1804)",
      "topic": "Oxygen & combustion",
      "lede": "Through oxygen & combustion, Joseph Priestley clarified how particles, gases, heat, or charge can escalate pressure.",
      "no": 2,
      "profile": "This combustible-powder cover note uses Joseph Priestley to explore oxygen & combustion. Joseph Priestley isolated a gas that made candles burn vigorously and supported respiration, later identified as oxygen. Although he interpreted it within phlogiston theory, his experiments revealed the oxidizer's decisive effect on flame. The work made air, particles, heat, pressure, or charge part of a physical account that could be tested inside industrial enclosures.\n\nA combustible dust cloud becomes dangerous only within a suitable concentration range and with enough oxygen to sustain propagation. Fine particles expose enormous surface area. A small primary ignition may lift settled dust from beams, ducts, or floors, producing a secondary cloud with far more fuel than the first explosion contained. A dust-hazard explanation should state fuel properties, concentration, dispersion, oxygen, confinement, ignition energy, and the route available for pressure relief.\n\nHousekeeping and ventilation are engineering controls, not cosmetic work. Dust depth, hidden ledges, extraction flow, bonding, grounding, ignition sources, isolation, and venting must be inspected as one connected system. A dust explosion requires combustible particles, dispersion, oxygen, ignition, and enough confinement for pressure to build. Removing any one element can prevent the event, but industrial processes often recreate all five during ordinary operation. The mill record should join deposit surveys, particle data, extraction flow, grounding tests, cleaning rounds, production changes, and ignition evidence.\n\nA trustworthy plant record includes dust sampling, explosibility data, cleaning rounds, fan performance, static controls, hot-work permits, near misses, and any change in production rate or particle size. Cover knowledge here means reading deposits and blast patterns as a sequence. A bomb story is not needed when ordinary powder, poor housekeeping, and connected enclosures explain the pressure wave. The combustion lesson is that a tiny spark does not explain a catastrophe by itself. Severity comes from fuel inventory, dispersion, confinement, propagation paths, and the defenses that were present or absent.",
      "frame": "Sweeper Ruiz points into a clogged duct at The Production Floor & Ducts. \"Give me oxygen & combustion, the ignition condition, and the propagation path.\"",
      "q": [
        {
          "q": "Which combustible-dust account best presents Joseph Priestley's work on oxygen & combustion?",
          "o": [
            {
              "t": "Joseph Priestley isolated a gas that made candles burn vigorously and supported respiration, later identified as oxygen. The powder-hazard file stores the raw cleaning history. Dust fits.",
              "v": "expert",
              "fb": "Correct: the answer connects combustion physics with dust inventory, dispersion, and engineered controls."
            },
            {
              "t": "Joseph Priestley's dust work emphasizes the visible ignition source. Ignition receives the most attention. Dust practice makes the dust view plausible. Dust timing supports this dust claim.",
              "v": "partial",
              "fb": "This names one part of the fire triangle but leaves confinement or secondary fuel unaddressed."
            },
            {
              "t": "Joseph Priestley's dust work supports a bomb as the most plausible source of a fast pressure wave through the processing building. Ignition receives the most attention. Dust fits.",
              "v": "wrong",
              "fb": "That explanation applies the wrong gas or flame concept to the observed powder hazard."
            },
            {
              "t": "Joseph Priestley's dust authority supports leaving settled deposits in place because they appear harmless before becoming airborne. Ignition receives the most attention. Dust fits.",
              "v": "danger",
              "fb": "That shortcut leaves accumulated fuel in place and treats the eventual ignition source as unforeseeable."
            }
          ]
        },
        {
          "q": "Which powder-hazard principle does this work establish?",
          "o": [
            {
              "t": "A combustible dust cloud becomes dangerous only within a suitable concentration range and with enough oxygen to sustain propagation. The powder-hazard file stores the dust survey. Dust fits.",
              "v": "expert",
              "fb": "Correct: the answer connects combustion physics with dust inventory, dispersion, and engineered controls."
            },
            {
              "t": "Analyze the ignition source while treating dust concentration, enclosure, turbulence, and secondary fuel as later details. Dust records fit this dust account. Dust timing supports this dust claim.",
              "v": "partial",
              "fb": "This names one part of the fire triangle but leaves confinement or secondary fuel unaddressed."
            },
            {
              "t": "Assume flame speed and pressure are largely independent of particle size, turbulence, oxygen, and enclosure geometry. Dust practice makes the dust view plausible. Dust timing supports this dust claim.",
              "v": "wrong",
              "fb": "That explanation applies the wrong gas or flame concept to the observed powder hazard."
            },
            {
              "t": "Leave the powder in place and treat the eventual ignition source as too unpredictable to manage in advance. Ignition receives the most attention. Dust timing supports this dust claim. Dust fits.",
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
    "du_scheele": {
      "sci": "Carl Wilhelm Scheele (1742-1786)",
      "topic": "The discovery of oxygen",
      "lede": "Carl Wilhelm Scheele's work on the discovery of oxygen gave powder hazards a measurable mechanism.",
      "no": 3,
      "profile": "This combustible-powder cover note uses Carl Wilhelm Scheele to explore the discovery of oxygen. Carl Wilhelm Scheele independently prepared oxygen before Priestley's publication and called it fire air. He obtained it by heating several oxygen-rich compounds and recognized that it supported combustion. The work made air, particles, heat, pressure, or charge part of a physical account that could be tested inside industrial enclosures.\n\nOxidizer availability controls whether ignition remains local or develops into a self-sustaining flame front. Housekeeping and ventilation are engineering controls, not cosmetic work. Dust depth, hidden ledges, extraction flow, bonding, grounding, ignition sources, isolation, and venting must be inspected as one connected system. A dust-hazard explanation should state fuel properties, concentration, dispersion, oxygen, confinement, ignition energy, and the route available for pressure relief.\n\nA dust explosion requires combustible particles, dispersion, oxygen, ignition, and enough confinement for pressure to build. Removing any one element can prevent the event, but industrial processes often recreate all five during ordinary operation. Fine particles expose enormous surface area. A small primary ignition may lift settled dust from beams, ducts, or floors, producing a secondary cloud with far more fuel than the first explosion contained. The mill record should join deposit surveys, particle data, extraction flow, grounding tests, cleaning rounds, production changes, and ignition evidence.\n\nCover knowledge here means reading deposits and blast patterns as a sequence. A bomb story is not needed when ordinary powder, poor housekeeping, and connected enclosures explain the pressure wave. The combustion lesson is that a tiny spark does not explain a catastrophe by itself. Severity comes from fuel inventory, dispersion, confinement, propagation paths, and the defenses that were present or absent. A trustworthy plant record includes dust sampling, explosibility data, cleaning rounds, fan performance, static controls, hot-work permits, near misses, and any change in production rate or particle size.",
      "frame": "The Electrician seals a dust sample at The Production Floor & Ducts. \"Start with Carl Wilhelm Scheele; keep concentration and confinement in view.\"",
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
    "du_lomonosov": {
      "sci": "Mikhail Lomonosov (1711-1765)",
      "topic": "Combustion & conservation of mass",
      "lede": "Mikhail Lomonosov made combustion & conservation of mass part of the physical explanation for fast industrial combustion.",
      "no": 4,
      "profile": "This combustible-powder cover note uses Mikhail Lomonosov to explore combustion & conservation of mass. Mikhail Lomonosov performed sealed-vessel experiments and argued that matter is conserved during chemical change. His work anticipated the mass-balance reasoning later central to combustion chemistry. The work made air, particles, heat, pressure, or charge part of a physical account that could be tested inside industrial enclosures.\n\nAn explosion converts dispersed fuel and oxygen into hot products; the mass remains, but rapid expansion creates destructive pressure. A dust explosion requires combustible particles, dispersion, oxygen, ignition, and enough confinement for pressure to build. Removing any one element can prevent the event, but industrial processes often recreate all five during ordinary operation. A dust-hazard explanation should state fuel properties, concentration, dispersion, oxygen, confinement, ignition energy, and the route available for pressure relief.\n\nFine particles expose enormous surface area. A small primary ignition may lift settled dust from beams, ducts, or floors, producing a secondary cloud with far more fuel than the first explosion contained. Housekeeping and ventilation are engineering controls, not cosmetic work. Dust depth, hidden ledges, extraction flow, bonding, grounding, ignition sources, isolation, and venting must be inspected as one connected system. The mill record should join deposit surveys, particle data, extraction flow, grounding tests, cleaning rounds, production changes, and ignition evidence.\n\nThe combustion lesson is that a tiny spark does not explain a catastrophe by itself. Severity comes from fuel inventory, dispersion, confinement, propagation paths, and the defenses that were present or absent. A trustworthy plant record includes dust sampling, explosibility data, cleaning rounds, fan performance, static controls, hot-work permits, near misses, and any change in production rate or particle size. Cover knowledge here means reading deposits and blast patterns as a sequence. A bomb story is not needed when ordinary powder, poor housekeeping, and connected enclosures explain the pressure wave.",
      "frame": "The Electrician brushes powder from a beam at The Production Floor & Ducts. \"Use Mikhail Lomonosov to explain how settled fuel becomes moving flame and pressure.\"",
      "q": [
        {
          "q": "Which combustible-dust account best presents Mikhail Lomonosov's work on combustion & conservation of mass?",
          "o": [
            {
              "t": "Mikhail Lomonosov performed sealed-vessel experiments and argued that matter is conserved during chemical change. Combustion specialists compare the area-specific powder-tested dust survey with deposits.",
              "v": "expert",
              "fb": "Correct: the answer connects combustion physics with dust inventory, dispersion, and engineered controls."
            },
            {
              "t": "Mikhail Lomonosov's dust work emphasizes the visible ignition source. Settled powder appears inactive. Production history can support it. Dust records fit this dust account. Dust timing supports this dust claim.",
              "v": "partial",
              "fb": "This names one part of the fire triangle but leaves confinement or secondary fuel unaddressed."
            },
            {
              "t": "Mikhail Lomonosov's dust work supports a bomb as the most plausible source of a fast pressure wave through the processing building. Ignition receives the most attention. Dust records fit this dust account.",
              "v": "wrong",
              "fb": "That explanation applies the wrong gas or flame concept to the observed powder hazard."
            },
            {
              "t": "Mikhail Lomonosov's dust authority supports leaving settled deposits in place because they appear harmless before becoming airborne. Production history can support it. Dust timing supports this dust claim.",
              "v": "danger",
              "fb": "That shortcut leaves accumulated fuel in place and treats the eventual ignition source as unforeseeable."
            }
          ]
        },
        {
          "q": "Which powder-hazard principle does this work establish?",
          "o": [
            {
              "t": "An explosion converts dispersed fuel and oxygen into hot products; the mass remains, but rapid expansion creates destructive pressure. The powder-hazard file stores the dust survey. Dust fits.",
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
    "du_gaylussac": {
      "sci": "Joseph Louis Gay-Lussac (1778-1850)",
      "topic": "Gas pressure, temperature & explosion",
      "lede": "Through gas pressure, temperature & explosion, Joseph Louis Gay-Lussac clarified how particles, gases, heat, or charge can escalate pressure.",
      "no": 5,
      "profile": "This combustible-powder cover note uses Joseph Louis Gay-Lussac to explore gas pressure, temperature & explosion. Joseph Louis Gay-Lussac established relations among gas volume, temperature, and pressure and studied reacting gas volumes. Heating a confined gas raises pressure, while combustion adds both heat and product gases. The work made air, particles, heat, pressure, or charge part of a physical account that could be tested inside industrial enclosures.\n\nConfinement turns fast burning into pressure loading, so vent area and structural strength must match the expected rate of combustion. Fine particles expose enormous surface area. A small primary ignition may lift settled dust from beams, ducts, or floors, producing a secondary cloud with far more fuel than the first explosion contained. A dust-hazard explanation should state fuel properties, concentration, dispersion, oxygen, confinement, ignition energy, and the route available for pressure relief.\n\nHousekeeping and ventilation are engineering controls, not cosmetic work. Dust depth, hidden ledges, extraction flow, bonding, grounding, ignition sources, isolation, and venting must be inspected as one connected system. A dust explosion requires combustible particles, dispersion, oxygen, ignition, and enough confinement for pressure to build. Removing any one element can prevent the event, but industrial processes often recreate all five during ordinary operation. The mill record should join deposit surveys, particle data, extraction flow, grounding tests, cleaning rounds, production changes, and ignition evidence.\n\nA trustworthy plant record includes dust sampling, explosibility data, cleaning rounds, fan performance, static controls, hot-work permits, near misses, and any change in production rate or particle size. Cover knowledge here means reading deposits and blast patterns as a sequence. A bomb story is not needed when ordinary powder, poor housekeeping, and connected enclosures explain the pressure wave. The combustion lesson is that a tiny spark does not explain a catastrophe by itself. Severity comes from fuel inventory, dispersion, confinement, propagation paths, and the defenses that were present or absent.",
      "frame": "The Clerk points into a clogged duct at The Production Floor & Ducts. \"Give me gas pressure, temperature & explosion, the ignition condition, and the propagation path.\"",
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
    "du_avogadro": {
      "sci": "Amedeo Avogadro (1776-1856)",
      "topic": "Gases, the mole & fuel-air ratio",
      "lede": "Amedeo Avogadro's work on gases, the mole & fuel-air ratio gave powder hazards a measurable mechanism.",
      "no": 6,
      "profile": "This combustible-powder cover note uses Amedeo Avogadro to explore gases, the mole & fuel-air ratio. Amedeo Avogadro proposed that equal volumes of gases at the same temperature and pressure contain equal numbers of molecules. That idea makes stoichiometric fuel-air calculations possible. The work made air, particles, heat, pressure, or charge part of a physical account that could be tested inside industrial enclosures.\n\nMixture concentration matters: clouds that are too lean or too rich may not propagate, but settling and turbulence continually change local conditions. Housekeeping and ventilation are engineering controls, not cosmetic work. Dust depth, hidden ledges, extraction flow, bonding, grounding, ignition sources, isolation, and venting must be inspected as one connected system. A dust-hazard explanation should state fuel properties, concentration, dispersion, oxygen, confinement, ignition energy, and the route available for pressure relief.\n\nA dust explosion requires combustible particles, dispersion, oxygen, ignition, and enough confinement for pressure to build. Removing any one element can prevent the event, but industrial processes often recreate all five during ordinary operation. Fine particles expose enormous surface area. A small primary ignition may lift settled dust from beams, ducts, or floors, producing a secondary cloud with far more fuel than the first explosion contained. The mill record should join deposit surveys, particle data, extraction flow, grounding tests, cleaning rounds, production changes, and ignition evidence.\n\nCover knowledge here means reading deposits and blast patterns as a sequence. A bomb story is not needed when ordinary powder, poor housekeeping, and connected enclosures explain the pressure wave. The combustion lesson is that a tiny spark does not explain a catastrophe by itself. Severity comes from fuel inventory, dispersion, confinement, propagation paths, and the defenses that were present or absent. A trustworthy plant record includes dust sampling, explosibility data, cleaning rounds, fan performance, static controls, hot-work permits, near misses, and any change in production rate or particle size.",
      "frame": "The Clerk seals a dust sample at The Production Floor & Ducts. \"Start with Amedeo Avogadro; keep concentration and confinement in view.\"",
      "q": [
        {
          "q": "Which combustible-dust account best presents Amedeo Avogadro's work on gases, the mole & fuel-air ratio?",
          "o": [
            {
              "t": "Amedeo Avogadro proposed that equal volumes of gases at the same temperature and pressure contain equal numbers of molecules. Combustion specialists compare the ignition log with deposits.",
              "v": "expert",
              "fb": "Correct: the answer connects combustion physics with dust inventory, dispersion, and engineered controls."
            },
            {
              "t": "Amedeo Avogadro's dust work relies on the visible ignition source. The first blast looks external. Dust records fit this dust account. Dust context supports the view. The first blast looks external.",
              "v": "partial",
              "fb": "This names one part of the fire triangle but leaves confinement or secondary fuel unaddressed."
            },
            {
              "t": "Amedeo Avogadro's dust work is read within dust practice as support for a bomb as the most plausible source of a fast pressure wave through the processing building. Dust records fit this dust account.",
              "v": "wrong",
              "fb": "That explanation applies the wrong gas or flame concept to the observed powder hazard."
            },
            {
              "t": "Amedeo Avogadro's authority is invoked in dust practice to justify leaving settled deposits in place because they appear harmless before becoming airborne. Dust records fit this dust account.",
              "v": "danger",
              "fb": "That shortcut leaves accumulated fuel in place and treats the eventual ignition source as unforeseeable."
            }
          ]
        },
        {
          "q": "Which powder-hazard principle does this work establish?",
          "o": [
            {
              "t": "Mixture concentration matters: clouds that are too lean or too rich may not propagate, but settling and turbulence continually change local conditions. The powder-hazard file stores the dust survey. Dust context matters.",
              "v": "expert",
              "fb": "Correct: the answer connects combustion physics with dust inventory, dispersion, and engineered controls."
            },
            {
              "t": "Analyze the ignition source while treating dust concentration, enclosure, turbulence, and secondary fuel as later details. Ignition receives the most attention. Production history can support it. Dust context matters.",
              "v": "partial",
              "fb": "This names one part of the fire triangle but leaves confinement or secondary fuel unaddressed."
            },
            {
              "t": "Assume flame speed and pressure are largely independent of particle size, turbulence, oxygen, and enclosure geometry. Dust records fit this dust account. Dust context supports the view. Dust timing supports this dust claim.",
              "v": "wrong",
              "fb": "That explanation applies the wrong gas or flame concept to the observed powder hazard."
            },
            {
              "t": "Leave the powder in place and treat the eventual ignition source as too unpredictable to manage in advance. Dust records fit this dust account. Dust context supports the view. Dust timing supports this dust claim.",
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
    "du_mallard": {
      "sci": "Ernest-Francois Mallard (1833-1894)",
      "topic": "Flame propagation in gases",
      "lede": "Ernest-Francois Mallard made flame propagation in gases part of the physical explanation for fast industrial combustion.",
      "no": 7,
      "profile": "This combustible-powder cover note uses Ernest-Francois Mallard to explore flame propagation in gases. Ernest-François Mallard and Henry Le Chatelier studied flame propagation, ignition, and firedamp explosions. Their work linked flame speed with gas composition, temperature, and confinement. The work made air, particles, heat, pressure, or charge part of a physical account that could be tested inside industrial enclosures.\n\nA primary flame can accelerate as turbulence mixes unburned fuel, making ductwork and connected rooms part of the hazard. A dust explosion requires combustible particles, dispersion, oxygen, ignition, and enough confinement for pressure to build. Removing any one element can prevent the event, but industrial processes often recreate all five during ordinary operation. A dust-hazard explanation should state fuel properties, concentration, dispersion, oxygen, confinement, ignition energy, and the route available for pressure relief.\n\nFine particles expose enormous surface area. A small primary ignition may lift settled dust from beams, ducts, or floors, producing a secondary cloud with far more fuel than the first explosion contained. Housekeeping and ventilation are engineering controls, not cosmetic work. Dust depth, hidden ledges, extraction flow, bonding, grounding, ignition sources, isolation, and venting must be inspected as one connected system. The mill record should join deposit surveys, particle data, extraction flow, grounding tests, cleaning rounds, production changes, and ignition evidence.\n\nMallard's flame studies help distinguish a gas deflagration from other blast mechanisms. A deflagration travels subsonically through a premixed fuel-air cloud, with pressure rising as confinement and congestion accelerate the flame. Investigators should expect evidence of a gas or vapor source, a connected flammable mixture, and damage organized around that cloud. Without such a source, ordinary gas-flame theory cannot by itself explain repeated explosions on separated dusty floors.",
      "frame": "Sweeper Ruiz brushes powder from a beam at The Motor Control Room. \"Use Ernest-Francois Mallard to explain how settled fuel becomes moving flame and pressure.\"",
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
    "du_vieille": {
      "sci": "Paul Vieille (1854-1934)",
      "topic": "Detonation & the blast wave",
      "lede": "Through detonation & the blast wave, Paul Vieille clarified how particles, gases, heat, or charge can escalate pressure.",
      "no": 8,
      "profile": "This combustible-powder cover note uses Paul Vieille to explore detonation & the blast wave. Paul Vieille developed smokeless powder and studied the rapid burning of propellants and pressure generation. His work helped distinguish controlled deflagration from faster shock-supported detonation. The work made air, particles, heat, pressure, or charge part of a physical account that could be tested inside industrial enclosures.\n\nMost dust explosions begin as deflagrations, yet pressure waves can disperse more dust and produce devastating secondary explosions. Fine particles expose enormous surface area. A small primary ignition may lift settled dust from beams, ducts, or floors, producing a secondary cloud with far more fuel than the first explosion contained. A dust-hazard explanation should state fuel properties, concentration, dispersion, oxygen, confinement, ignition energy, and the route available for pressure relief.\n\nHousekeeping and ventilation are engineering controls, not cosmetic work. Dust depth, hidden ledges, extraction flow, bonding, grounding, ignition sources, isolation, and venting must be inspected as one connected system. A dust explosion requires combustible particles, dispersion, oxygen, ignition, and enough confinement for pressure to build. Removing any one element can prevent the event, but industrial processes often recreate all five during ordinary operation. The mill record should join deposit surveys, particle data, extraction flow, grounding tests, cleaning rounds, production changes, and ignition evidence.\n\nVieille's work clarifies what the word detonation commits an investigator to. In a detonation, chemical reaction is coupled to a supersonic shock, producing abrupt, unusually high pressures and a dominant wave front. It is not simply a dramatic synonym for explosion. Multiple pressure centers, staged damage, and evidence that later fuel clouds formed after the first blast argue against one high-order detonation, even when witnesses describe a single rolling roar.",
      "frame": "Sweeper Ruiz points into a clogged duct at The Motor Control Room. \"Give me detonation & the blast wave, the ignition condition, and the propagation path.\"",
      "q": [
        {
          "q": "Which combustible-dust account best presents Paul Vieille's work on detonation & the blast wave?",
          "o": [
            {
              "t": "Paul Vieille developed smokeless powder and studied the rapid burning of propellants and pressure generation. The housekeeping archive carries the explosibility-linked dust survey. Dust fits. Dust fits.",
              "v": "expert",
              "fb": "Correct: the answer connects combustion physics with dust inventory, dispersion, and engineered controls."
            },
            {
              "t": "Paul Vieille's dust work emphasizes the visible ignition source. Ignition receives the most attention. Production history can support it. Dust practice makes the dust view plausible. The dust record fits.",
              "v": "partial",
              "fb": "This names one part of the fire triangle but leaves confinement or secondary fuel unaddressed."
            },
            {
              "t": "Paul Vieille's dust work is read within dust practice as support for a bomb as the most plausible source of a fast pressure wave through the processing building. The first blast looks external. Dust fits.",
              "v": "wrong",
              "fb": "That explanation applies the wrong gas or flame concept to the observed powder hazard."
            },
            {
              "t": "Paul Vieille's authority is invoked in dust practice to justify leaving settled deposits in place because they appear harmless before becoming airborne. The first blast looks external. Dust fits.",
              "v": "danger",
              "fb": "That shortcut leaves accumulated fuel in place and treats the eventual ignition source as unforeseeable."
            }
          ]
        },
        {
          "q": "Which powder-hazard principle does this work establish?",
          "o": [
            {
              "t": "Most dust explosions begin as deflagrations, yet pressure waves can disperse more dust and produce devastating secondary explosions. The powder-hazard file stores the dust survey. Dust fits.",
              "v": "expert",
              "fb": "Correct: the answer connects combustion physics with dust inventory, dispersion, and engineered controls."
            },
            {
              "t": "Analyze the ignition source while treating dust concentration, enclosure, turbulence, and secondary fuel as later details. Dust records fit this dust account. Dust timing supports this dust claim.",
              "v": "partial",
              "fb": "This names one part of the fire triangle but leaves confinement or secondary fuel unaddressed."
            },
            {
              "t": "Assume flame speed and pressure are largely independent of particle size, turbulence, oxygen, and enclosure geometry. Dust practice makes the dust view plausible. Dust timing supports this dust claim.",
              "v": "wrong",
              "fb": "That explanation applies the wrong gas or flame concept to the observed powder hazard."
            },
            {
              "t": "Leave the powder in place and treat the eventual ignition source as too unpredictable to manage in advance. Ignition receives the most attention. Dust timing supports this dust claim. Dust fits.",
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
    "du_mach": {
      "sci": "Ernst Mach (1838-1916)",
      "topic": "Shock waves",
      "lede": "Ernst Mach's work on shock waves gave powder hazards a measurable mechanism.",
      "no": 9,
      "profile": "This combustible-powder cover note uses Ernst Mach to explore shock waves. Ernst Mach photographed and analyzed shock waves, showing how disturbances steepen when objects or flows move faster than sound. The Mach number became the basic ratio comparing speed with sound speed. The work made air, particles, heat, pressure, or charge part of a physical account that could be tested inside industrial enclosures.\n\nA blast wave carries a sudden pressure jump; its effect depends on peak overpressure, impulse, distance, and reflections. Housekeeping and ventilation are engineering controls, not cosmetic work. Dust depth, hidden ledges, extraction flow, bonding, grounding, ignition sources, isolation, and venting must be inspected as one connected system. A dust-hazard explanation should state fuel properties, concentration, dispersion, oxygen, confinement, ignition energy, and the route available for pressure relief.\n\nA dust explosion requires combustible particles, dispersion, oxygen, ignition, and enough confinement for pressure to build. Removing any one element can prevent the event, but industrial processes often recreate all five during ordinary operation. Fine particles expose enormous surface area. A small primary ignition may lift settled dust from beams, ducts, or floors, producing a secondary cloud with far more fuel than the first explosion contained. The mill record should join deposit surveys, particle data, extraction flow, grounding tests, cleaning rounds, production changes, and ignition evidence.\n\nCover knowledge here means reading deposits and blast patterns as a sequence. A bomb story is not needed when ordinary powder, poor housekeeping, and connected enclosures explain the pressure wave. The combustion lesson is that a tiny spark does not explain a catastrophe by itself. Severity comes from fuel inventory, dispersion, confinement, propagation paths, and the defenses that were present or absent. A trustworthy plant record includes dust sampling, explosibility data, cleaning rounds, fan performance, static controls, hot-work permits, near misses, and any change in production rate or particle size.",
      "frame": "The Electrician seals a dust sample at The Motor Control Room. \"Start with Ernst Mach; keep concentration and confinement in view.\"",
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
    "du_hinshelwood": {
      "sci": "Cyril Norman Hinshelwood (1897-1967)",
      "topic": "Chain reactions & combustion kinetics",
      "lede": "Cyril Norman Hinshelwood made chain reactions & combustion kinetics part of the physical explanation for fast industrial combustion.",
      "no": 10,
      "profile": "This combustible-powder cover note uses Cyril Norman Hinshelwood to explore chain reactions & combustion kinetics. Cyril Hinshelwood studied chemical chain reactions and the kinetics of gas-phase combustion. He showed how reactive intermediates can multiply, terminate, or branch, producing sharp changes in ignition behavior. The work made air, particles, heat, pressure, or charge part of a physical account that could be tested inside industrial enclosures.\n\nIgnition is not just a spark event; reaction rates depend strongly on temperature, composition, pressure, and radical chemistry. A dust explosion requires combustible particles, dispersion, oxygen, ignition, and enough confinement for pressure to build. Removing any one element can prevent the event, but industrial processes often recreate all five during ordinary operation. A dust-hazard explanation should state fuel properties, concentration, dispersion, oxygen, confinement, ignition energy, and the route available for pressure relief.\n\nFine particles expose enormous surface area. A small primary ignition may lift settled dust from beams, ducts, or floors, producing a secondary cloud with far more fuel than the first explosion contained. Housekeeping and ventilation are engineering controls, not cosmetic work. Dust depth, hidden ledges, extraction flow, bonding, grounding, ignition sources, isolation, and venting must be inspected as one connected system. The mill record should join deposit surveys, particle data, extraction flow, grounding tests, cleaning rounds, production changes, and ignition evidence.\n\nThe combustion lesson is that a tiny spark does not explain a catastrophe by itself. Severity comes from fuel inventory, dispersion, confinement, propagation paths, and the defenses that were present or absent. A trustworthy plant record includes dust sampling, explosibility data, cleaning rounds, fan performance, static controls, hot-work permits, near misses, and any change in production rate or particle size. Cover knowledge here means reading deposits and blast patterns as a sequence. A bomb story is not needed when ordinary powder, poor housekeeping, and connected enclosures explain the pressure wave.",
      "frame": "The Electrician brushes powder from a beam at The Motor Control Room. \"Use Cyril Norman Hinshelwood to explain how settled fuel becomes moving flame and pressure.\"",
      "q": [
        {
          "q": "Which combustible-dust account best presents Cyril Norman Hinshelwood's work on chain reactions & combustion kinetics?",
          "o": [
            {
              "t": "Cyril Hinshelwood studied chemical chain reactions and the kinetics of gas-phase combustion. Combustion specialists compare the ignition log with deposits. Dust review keeps the ignition log available for analysis. Dust fits.",
              "v": "expert",
              "fb": "Correct: the answer connects combustion physics with dust inventory, dispersion, and engineered controls."
            },
            {
              "t": "Cyril Norman Hinshelwood's dust work emphasizes the visible ignition source. Ignition receives the most attention. Dust records fit this dust account. Dust practice makes the dust view plausible. Dust timing supports this dust claim.",
              "v": "partial",
              "fb": "This names one part of the fire triangle but leaves confinement or secondary fuel unaddressed."
            },
            {
              "t": "Cyril Norman Hinshelwood's dust work supports a bomb as the most plausible source of a fast pressure wave through the processing building. Ignition receives the most attention. Dust practice makes the dust view plausible.",
              "v": "wrong",
              "fb": "That explanation applies the wrong gas or flame concept to the observed powder hazard."
            },
            {
              "t": "Cyril Norman Hinshelwood's dust authority supports leaving settled deposits in place because they appear harmless before becoming airborne. Settled powder appears inactive. Ignition receives the most attention. Dust fits.",
              "v": "danger",
              "fb": "That shortcut leaves accumulated fuel in place and treats the eventual ignition source as unforeseeable."
            }
          ]
        },
        {
          "q": "Which powder-hazard principle does this work establish?",
          "o": [
            {
              "t": "Ignition is not just a spark event; reaction rates depend strongly on temperature, composition, pressure, and radical chemistry. The powder-hazard file stores the dust survey. Dust fits.",
              "v": "expert",
              "fb": "Correct: the answer connects combustion physics with dust inventory, dispersion, and engineered controls."
            },
            {
              "t": "Analyze the ignition source while treating dust concentration, enclosure, turbulence, and secondary fuel as later details. Dust records fit this dust account. Dust timing supports this dust claim.",
              "v": "partial",
              "fb": "This names one part of the fire triangle but leaves confinement or secondary fuel unaddressed."
            },
            {
              "t": "Assume flame speed and pressure are largely independent of particle size, turbulence, oxygen, and enclosure geometry. Dust records fit this dust account. Dust timing supports this dust claim.",
              "v": "wrong",
              "fb": "That explanation applies the wrong gas or flame concept to the observed powder hazard."
            },
            {
              "t": "Leave the powder in place and treat the eventual ignition source as too unpredictable to manage in advance. Dust practice makes the dust view plausible. Dust timing supports this dust claim.",
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
    "du_bartknecht": {
      "sci": "Wolfgang Bartknecht (dust-explosion researcher)",
      "topic": "Dust-explosion severity & venting",
      "lede": "Through dust-explosion severity & venting, Wolfgang Bartknecht clarified how particles, gases, heat, or charge can escalate pressure.",
      "no": 11,
      "profile": "This combustible-powder cover note uses Wolfgang Bartknecht to explore dust-explosion severity & venting. Wolfgang Bartknecht conducted influential experiments on dust-explosion pressure, venting, suppression, and industrial prevention. His data helped engineers size relief systems for combustible powders. The work made air, particles, heat, pressure, or charge part of a physical account that could be tested inside industrial enclosures.\n\nVenting must be designed for the dust's measured explosibility and the enclosure geometry, not copied from an unrelated process. Fine particles expose enormous surface area. A small primary ignition may lift settled dust from beams, ducts, or floors, producing a secondary cloud with far more fuel than the first explosion contained. A dust-hazard explanation should state fuel properties, concentration, dispersion, oxygen, confinement, ignition energy, and the route available for pressure relief.\n\nHousekeeping and ventilation are engineering controls, not cosmetic work. Dust depth, hidden ledges, extraction flow, bonding, grounding, ignition sources, isolation, and venting must be inspected as one connected system. A dust explosion requires combustible particles, dispersion, oxygen, ignition, and enough confinement for pressure to build. Removing any one element can prevent the event, but industrial processes often recreate all five during ordinary operation. The mill record should join deposit surveys, particle data, extraction flow, grounding tests, cleaning rounds, production changes, and ignition evidence.\n\nA trustworthy plant record includes dust sampling, explosibility data, cleaning rounds, fan performance, static controls, hot-work permits, near misses, and any change in production rate or particle size. Cover knowledge here means reading deposits and blast patterns as a sequence. A bomb story is not needed when ordinary powder, poor housekeeping, and connected enclosures explain the pressure wave. The combustion lesson is that a tiny spark does not explain a catastrophe by itself. Severity comes from fuel inventory, dispersion, confinement, propagation paths, and the defenses that were present or absent.",
      "frame": "The Clerk points into a clogged duct at The Motor Control Room. \"Give me dust-explosion severity & venting, the ignition condition, and the propagation path.\"",
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
    "du_eckhoff": {
      "sci": "Rolf K. Eckhoff (dust-explosion researcher)",
      "topic": "Dust explosions & prevention",
      "lede": "Rolf K. Eckhoff's work on dust explosions & prevention gave powder hazards a measurable mechanism.",
      "no": 12,
      "profile": "This combustible-powder cover note uses Rolf K. Eckhoff to explore dust explosions & prevention. Rolf K. Eckhoff synthesized decades of research on how dust clouds ignite, propagate, and produce secondary explosions. He emphasized housekeeping, ignition control, containment, venting, and the variability of real powders. The work made air, particles, heat, pressure, or charge part of a physical account that could be tested inside industrial enclosures.\n\nThe safest dust is dust that never accumulates, becomes airborne, and meets an ignition source in a confined space. Housekeeping and ventilation are engineering controls, not cosmetic work. Dust depth, hidden ledges, extraction flow, bonding, grounding, ignition sources, isolation, and venting must be inspected as one connected system. A dust-hazard explanation should state fuel properties, concentration, dispersion, oxygen, confinement, ignition energy, and the route available for pressure relief.\n\nA dust explosion requires combustible particles, dispersion, oxygen, ignition, and enough confinement for pressure to build. Removing any one element can prevent the event, but industrial processes often recreate all five during ordinary operation. Fine particles expose enormous surface area. A small primary ignition may lift settled dust from beams, ducts, or floors, producing a secondary cloud with far more fuel than the first explosion contained. The mill record should join deposit surveys, particle data, extraction flow, grounding tests, cleaning rounds, production changes, and ignition evidence.\n\nEckhoff's dust-explosion research supplies the decisive alternative. A modest primary event can shake loose settled powder, suspend it at combustible concentration, and ignite a much larger secondary cloud; the process can repeat through ducts, galleries, and floors. Investigators look for clean patches beside heavy deposits, several pressure origins, and increasing damage away from the first ignition. That pattern identifies secondary dust explosions rather than one gas cloud or one detonation.",
      "frame": "The Clerk seals a dust sample at The Motor Control Room. \"Start with Rolf K. Eckhoff; keep concentration and confinement in view.\"",
      "q": [
        {
          "q": "Which combustible-dust account best presents Rolf K. Eckhoff's work on dust explosions & prevention?",
          "o": [
            {
              "t": "Rolf K. The powder-hazard file stores the dust survey. Combustion specialists compare the dust survey with deposits. Explosion evidence ties the raw dust survey to prevention controls. Dust fits.",
              "v": "expert",
              "fb": "Correct: the answer connects combustion physics with dust inventory, dispersion, and engineered controls."
            },
            {
              "t": "Rolf K. Eckhoff's dust work emphasizes the visible ignition source. Ignition receives the most attention. Production history can support it. Dust practice makes the dust view plausible. The dust record fits.",
              "v": "partial",
              "fb": "This names one part of the fire triangle but leaves confinement or secondary fuel unaddressed."
            },
            {
              "t": "Rolf K. Eckhoff's dust work is read within dust practice as support for a bomb as the most plausible source of a fast pressure wave through the processing building. The first blast looks external. Dust fits.",
              "v": "wrong",
              "fb": "That explanation applies the wrong gas or flame concept to the observed powder hazard."
            },
            {
              "t": "Rolf K. Eckhoff's authority is invoked in dust practice to justify leaving settled deposits in place because they appear harmless before becoming airborne. The first blast looks external. Dust fits.",
              "v": "danger",
              "fb": "That shortcut leaves accumulated fuel in place and treats the eventual ignition source as unforeseeable."
            }
          ]
        },
        {
          "q": "Which powder-hazard principle does this work establish?",
          "o": [
            {
              "t": "The safest dust is dust that never accumulates, becomes airborne, and meets an ignition source in a confined space. The housekeeping archive carries the dust survey. Dust fits.",
              "v": "expert",
              "fb": "Correct: the answer connects combustion physics with dust inventory, dispersion, and engineered controls."
            },
            {
              "t": "Analyze the ignition source while treating dust concentration, enclosure, turbulence, and secondary fuel as later details. Ignition receives the most attention. The dust record fits.",
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
    "du_galloway": {
      "sci": "William Galloway (coal-dust explosion researcher)",
      "topic": "Coal-dust explosions",
      "lede": "William Galloway made coal-dust explosions part of the physical explanation for fast industrial combustion.",
      "no": 13,
      "profile": "This combustible-powder cover note uses William Galloway to explore coal-dust explosions. William Galloway argued from mine disasters and experiments that fine coal dust could propagate explosions even when methane was not the sole fuel. His work challenged explanations that treated firedamp as the only cause. The work made air, particles, heat, pressure, or charge part of a physical account that could be tested inside industrial enclosures.\n\nDeposited dust is stored fuel; an initial pressure wave can lift it into a far larger secondary cloud. A dust explosion requires combustible particles, dispersion, oxygen, ignition, and enough confinement for pressure to build. Removing any one element can prevent the event, but industrial processes often recreate all five during ordinary operation. A dust-hazard explanation should state fuel properties, concentration, dispersion, oxygen, confinement, ignition energy, and the route available for pressure relief.\n\nFine particles expose enormous surface area. A small primary ignition may lift settled dust from beams, ducts, or floors, producing a secondary cloud with far more fuel than the first explosion contained. Housekeeping and ventilation are engineering controls, not cosmetic work. Dust depth, hidden ledges, extraction flow, bonding, grounding, ignition sources, isolation, and venting must be inspected as one connected system. The mill record should join deposit surveys, particle data, extraction flow, grounding tests, cleaning rounds, production changes, and ignition evidence.\n\nThe combustion lesson is that a tiny spark does not explain a catastrophe by itself. Severity comes from fuel inventory, dispersion, confinement, propagation paths, and the defenses that were present or absent. A trustworthy plant record includes dust sampling, explosibility data, cleaning rounds, fan performance, static controls, hot-work permits, near misses, and any change in production rate or particle size. Cover knowledge here means reading deposits and blast patterns as a sequence. A bomb story is not needed when ordinary powder, poor housekeeping, and connected enclosures explain the pressure wave.",
      "frame": "Sweeper Ruiz brushes powder from a beam at The Owner's Plant Office. \"Use William Galloway to explain how settled fuel becomes moving flame and pressure.\"",
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
    "du_haldane": {
      "sci": "John Scott Haldane (1860-1936)",
      "topic": "Mine gases & ventilation",
      "lede": "Through mine gases & ventilation, John Scott Haldane clarified how particles, gases, heat, or charge can escalate pressure.",
      "no": 14,
      "profile": "This combustible-powder cover note uses John Scott Haldane to explore mine gases & ventilation. John Scott Haldane studied mine atmospheres, toxic gases, respiration, and ventilation. His investigations improved the measurement of oxygen, carbon dioxide, and dangerous mine gases. The work made air, particles, heat, pressure, or charge part of a physical account that could be tested inside industrial enclosures.\n\nVentilation must be verified by airflow and contaminant measurements, not inferred from a running fan or an open duct. Fine particles expose enormous surface area. A small primary ignition may lift settled dust from beams, ducts, or floors, producing a secondary cloud with far more fuel than the first explosion contained. A dust-hazard explanation should state fuel properties, concentration, dispersion, oxygen, confinement, ignition energy, and the route available for pressure relief.\n\nHousekeeping and ventilation are engineering controls, not cosmetic work. Dust depth, hidden ledges, extraction flow, bonding, grounding, ignition sources, isolation, and venting must be inspected as one connected system. A dust explosion requires combustible particles, dispersion, oxygen, ignition, and enough confinement for pressure to build. Removing any one element can prevent the event, but industrial processes often recreate all five during ordinary operation. The mill record should join deposit surveys, particle data, extraction flow, grounding tests, cleaning rounds, production changes, and ignition evidence.\n\nA trustworthy plant record includes dust sampling, explosibility data, cleaning rounds, fan performance, static controls, hot-work permits, near misses, and any change in production rate or particle size. Cover knowledge here means reading deposits and blast patterns as a sequence. A bomb story is not needed when ordinary powder, poor housekeeping, and connected enclosures explain the pressure wave. The combustion lesson is that a tiny spark does not explain a catastrophe by itself. Severity comes from fuel inventory, dispersion, confinement, propagation paths, and the defenses that were present or absent.",
      "frame": "Sweeper Ruiz points into a clogged duct at The Owner's Plant Office. \"Give me mine gases & ventilation, the ignition condition, and the propagation path.\"",
      "q": [
        {
          "q": "Which combustible-dust account best presents John Scott Haldane's work on mine gases & ventilation?",
          "o": [
            {
              "t": "John Scott Haldane studied mine atmospheres, toxic gases, respiration, and ventilation. Explosion evidence ties the area-specific deposit-measured ignition log to prevention controls. Dust fits. Dust fits.",
              "v": "expert",
              "fb": "Correct: the answer connects combustion physics with dust inventory, dispersion, and engineered controls."
            },
            {
              "t": "John Scott Haldane's dust work emphasizes the visible ignition source. Ignition receives the most attention. Production history can support it. Dust practice makes the dust view plausible. The dust record fits.",
              "v": "partial",
              "fb": "This names one part of the fire triangle but leaves confinement or secondary fuel unaddressed."
            },
            {
              "t": "John Scott Haldane's dust work is read within dust practice as support for a bomb as the most plausible source of a fast pressure wave through the processing building. The first blast looks external. Dust fits.",
              "v": "wrong",
              "fb": "That explanation applies the wrong gas or flame concept to the observed powder hazard."
            },
            {
              "t": "John Scott Haldane's dust authority supports leaving settled deposits in place because they appear harmless before becoming airborne. Ignition receives the most attention. The dust record fits. Dust fits.",
              "v": "danger",
              "fb": "That shortcut leaves accumulated fuel in place and treats the eventual ignition source as unforeseeable."
            }
          ]
        },
        {
          "q": "Which powder-hazard principle does this work establish?",
          "o": [
            {
              "t": "Ventilation must be verified by airflow and contaminant measurements, not inferred from a running fan or an open duct. The powder-hazard file stores the raw dated ignition log. Dust fits.",
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
    "du_bagnold": {
      "sci": "Ralph A. Bagnold (1896-1990)",
      "topic": "The physics of blown particles",
      "lede": "Ralph A. Bagnold's work on the physics of blown particles gave powder hazards a measurable mechanism.",
      "no": 15,
      "profile": "This combustible-powder cover note uses Ralph A. Bagnold to explore the physics of blown particles. Ralph A. Bagnold studied how wind moves sand by rolling, saltation, and suspension. His physics of granular transport explains how particle size, airflow, and surface conditions determine whether material becomes airborne. The work made air, particles, heat, pressure, or charge part of a physical account that could be tested inside industrial enclosures.\n\nA settled layer can become an explosive cloud when a pressure pulse or fast air stream exceeds the threshold for entrainment. Housekeeping and ventilation are engineering controls, not cosmetic work. Dust depth, hidden ledges, extraction flow, bonding, grounding, ignition sources, isolation, and venting must be inspected as one connected system. A dust-hazard explanation should state fuel properties, concentration, dispersion, oxygen, confinement, ignition energy, and the route available for pressure relief.\n\nA dust explosion requires combustible particles, dispersion, oxygen, ignition, and enough confinement for pressure to build. Removing any one element can prevent the event, but industrial processes often recreate all five during ordinary operation. Fine particles expose enormous surface area. A small primary ignition may lift settled dust from beams, ducts, or floors, producing a secondary cloud with far more fuel than the first explosion contained. The mill record should join deposit surveys, particle data, extraction flow, grounding tests, cleaning rounds, production changes, and ignition evidence.\n\nCover knowledge here means reading deposits and blast patterns as a sequence. A bomb story is not needed when ordinary powder, poor housekeeping, and connected enclosures explain the pressure wave. The combustion lesson is that a tiny spark does not explain a catastrophe by itself. Severity comes from fuel inventory, dispersion, confinement, propagation paths, and the defenses that were present or absent. A trustworthy plant record includes dust sampling, explosibility data, cleaning rounds, fan performance, static controls, hot-work permits, near misses, and any change in production rate or particle size.",
      "frame": "The Electrician seals a dust sample at The Owner's Plant Office. \"Start with Ralph A. Bagnold; keep concentration and confinement in view.\"",
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
    "du_gray": {
      "sci": "Stephen Gray (1666-1736)",
      "topic": "Electrostatic charge & conduction",
      "lede": "Stephen Gray made electrostatic charge & conduction part of the physical explanation for fast industrial combustion.",
      "no": 16,
      "profile": "This combustible-powder cover note uses Stephen Gray to explore electrostatic charge & conduction. Stephen Gray demonstrated that electrical charge could be conducted over distance and distinguished conductors from insulators. His experiments helped establish electrostatics as an experimental science. The work made air, particles, heat, pressure, or charge part of a physical account that could be tested inside industrial enclosures.\n\nInsulating powders, belts, and ducts can accumulate charge until a small discharge supplies enough energy for ignition. A dust explosion requires combustible particles, dispersion, oxygen, ignition, and enough confinement for pressure to build. Removing any one element can prevent the event, but industrial processes often recreate all five during ordinary operation. A dust-hazard explanation should state fuel properties, concentration, dispersion, oxygen, confinement, ignition energy, and the route available for pressure relief.\n\nFine particles expose enormous surface area. A small primary ignition may lift settled dust from beams, ducts, or floors, producing a secondary cloud with far more fuel than the first explosion contained. Housekeeping and ventilation are engineering controls, not cosmetic work. Dust depth, hidden ledges, extraction flow, bonding, grounding, ignition sources, isolation, and venting must be inspected as one connected system. The mill record should join deposit surveys, particle data, extraction flow, grounding tests, cleaning rounds, production changes, and ignition evidence.\n\nThe combustion lesson is that a tiny spark does not explain a catastrophe by itself. Severity comes from fuel inventory, dispersion, confinement, propagation paths, and the defenses that were present or absent. A trustworthy plant record includes dust sampling, explosibility data, cleaning rounds, fan performance, static controls, hot-work permits, near misses, and any change in production rate or particle size. Cover knowledge here means reading deposits and blast patterns as a sequence. A bomb story is not needed when ordinary powder, poor housekeeping, and connected enclosures explain the pressure wave.",
      "frame": "The Electrician brushes powder from a beam at The Owner's Plant Office. \"Use Stephen Gray to explain how settled fuel becomes moving flame and pressure.\"",
      "q": [
        {
          "q": "Which combustible-dust account best presents Stephen Gray's work on electrostatic charge & conduction?",
          "o": [
            {
              "t": "Stephen Gray demonstrated that electrical charge could be conducted over distance and distinguished conductors from insulators. The housekeeping archive carries the explosibility-linked dust survey.",
              "v": "expert",
              "fb": "Correct: the answer connects combustion physics with dust inventory, dispersion, and engineered controls."
            },
            {
              "t": "Stephen Gray's dust work emphasizes the visible ignition source. Settled powder appears inactive. Production history can support it. Dust records fit this dust account. Dust timing supports this dust claim.",
              "v": "partial",
              "fb": "This names one part of the fire triangle but leaves confinement or secondary fuel unaddressed."
            },
            {
              "t": "Stephen Gray's dust work supports a bomb as the most plausible source of a fast pressure wave through the processing building. Ignition receives the most attention. Dust records fit this dust account.",
              "v": "wrong",
              "fb": "That explanation applies the wrong gas or flame concept to the observed powder hazard."
            },
            {
              "t": "Stephen Gray's dust authority supports leaving settled deposits in place because they appear harmless before becoming airborne. Production history can support it. Dust timing supports this dust claim.",
              "v": "danger",
              "fb": "That shortcut leaves accumulated fuel in place and treats the eventual ignition source as unforeseeable."
            }
          ]
        },
        {
          "q": "Which powder-hazard principle does this work establish?",
          "o": [
            {
              "t": "Insulating powders, belts, and ducts can accumulate charge until a small discharge supplies enough energy for ignition. The powder-hazard file stores the dust survey. Dust fits.",
              "v": "expert",
              "fb": "Correct: the answer connects combustion physics with dust inventory, dispersion, and engineered controls."
            },
            {
              "t": "Analyze the ignition source while treating dust concentration, enclosure, turbulence, and secondary fuel as later details. Ignition receives the most attention. The dust record fits.",
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
    "du_lichtenberg": {
      "sci": "Georg Christoph Lichtenberg (1742-1799)",
      "topic": "Static discharge",
      "lede": "Through static discharge, Georg Christoph Lichtenberg clarified how particles, gases, heat, or charge can escalate pressure.",
      "no": 17,
      "profile": "This combustible-powder cover note uses Georg Christoph Lichtenberg to explore static discharge. Georg Christoph Lichtenberg produced branching electrical discharge patterns in dust on insulating surfaces. Lichtenberg figures made the paths of high-voltage charge visible. The work made air, particles, heat, pressure, or charge part of a physical account that could be tested inside industrial enclosures.\n\nA static discharge is evidence of stored electrical energy, and grounding must include every conductive part that can become isolated. Fine particles expose enormous surface area. A small primary ignition may lift settled dust from beams, ducts, or floors, producing a secondary cloud with far more fuel than the first explosion contained. A dust-hazard explanation should state fuel properties, concentration, dispersion, oxygen, confinement, ignition energy, and the route available for pressure relief.\n\nHousekeeping and ventilation are engineering controls, not cosmetic work. Dust depth, hidden ledges, extraction flow, bonding, grounding, ignition sources, isolation, and venting must be inspected as one connected system. A dust explosion requires combustible particles, dispersion, oxygen, ignition, and enough confinement for pressure to build. Removing any one element can prevent the event, but industrial processes often recreate all five during ordinary operation. The mill record should join deposit surveys, particle data, extraction flow, grounding tests, cleaning rounds, production changes, and ignition evidence.\n\nA trustworthy plant record includes dust sampling, explosibility data, cleaning rounds, fan performance, static controls, hot-work permits, near misses, and any change in production rate or particle size. Cover knowledge here means reading deposits and blast patterns as a sequence. A bomb story is not needed when ordinary powder, poor housekeeping, and connected enclosures explain the pressure wave. The combustion lesson is that a tiny spark does not explain a catastrophe by itself. Severity comes from fuel inventory, dispersion, confinement, propagation paths, and the defenses that were present or absent.",
      "frame": "The Clerk points into a clogged duct at The Owner's Plant Office. \"Give me static discharge, the ignition condition, and the propagation path.\"",
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
    },
    "du_fourier": {
      "sci": "Joseph Fourier (1768-1830)",
      "topic": "Heat conduction & thermal build-up",
      "lede": "Joseph Fourier's work on heat conduction & thermal build-up gave powder hazards a measurable mechanism.",
      "no": 18,
      "profile": "This combustible-powder cover note uses Joseph Fourier to explore heat conduction & thermal build-up. Joseph Fourier developed the mathematical theory of heat conduction, showing how temperature changes spread through materials over time. Fourier's equation remains fundamental to predicting hot spots and cooling. The work made air, particles, heat, pressure, or charge part of a physical account that could be tested inside industrial enclosures.\n\nA bearing, motor, or dust layer can accumulate heat when generation exceeds conduction, convection, and radiation away from the source. Housekeeping and ventilation are engineering controls, not cosmetic work. Dust depth, hidden ledges, extraction flow, bonding, grounding, ignition sources, isolation, and venting must be inspected as one connected system. A dust-hazard explanation should state fuel properties, concentration, dispersion, oxygen, confinement, ignition energy, and the route available for pressure relief.\n\nA dust explosion requires combustible particles, dispersion, oxygen, ignition, and enough confinement for pressure to build. Removing any one element can prevent the event, but industrial processes often recreate all five during ordinary operation. Fine particles expose enormous surface area. A small primary ignition may lift settled dust from beams, ducts, or floors, producing a secondary cloud with far more fuel than the first explosion contained. The mill record should join deposit surveys, particle data, extraction flow, grounding tests, cleaning rounds, production changes, and ignition evidence.\n\nCover knowledge here means reading deposits and blast patterns as a sequence. A bomb story is not needed when ordinary powder, poor housekeeping, and connected enclosures explain the pressure wave. The combustion lesson is that a tiny spark does not explain a catastrophe by itself. Severity comes from fuel inventory, dispersion, confinement, propagation paths, and the defenses that were present or absent. A trustworthy plant record includes dust sampling, explosibility data, cleaning rounds, fan performance, static controls, hot-work permits, near misses, and any change in production rate or particle size.",
      "frame": "The Clerk seals a dust sample at The Owner's Plant Office. \"Start with Joseph Fourier; keep concentration and confinement in view.\"",
      "q": [
        {
          "q": "Which combustible-dust account best presents Joseph Fourier's work on heat conduction & thermal build-up?",
          "o": [
            {
              "t": "Joseph Fourier developed the mathematical theory of heat conduction, showing how temperature changes spread through materials over time. The powder-hazard file stores the dated dust survey.",
              "v": "expert",
              "fb": "Correct: the answer connects combustion physics with dust inventory, dispersion, and engineered controls."
            },
            {
              "t": "Joseph Fourier's dust work relies on the visible ignition source. The first blast looks external. Dust records fit this dust account. Dust context supports the view. The first blast looks external.",
              "v": "partial",
              "fb": "This names one part of the fire triangle but leaves confinement or secondary fuel unaddressed."
            },
            {
              "t": "Joseph Fourier's dust work is read within dust practice as support for a bomb as the most plausible source of a fast pressure wave through the processing building. Dust timing supports this dust claim.",
              "v": "wrong",
              "fb": "That explanation applies the wrong gas or flame concept to the observed powder hazard."
            },
            {
              "t": "Joseph Fourier's authority is invoked in dust practice to justify leaving settled deposits in place because they appear harmless before becoming airborne. Dust timing supports this dust claim.",
              "v": "danger",
              "fb": "That shortcut leaves accumulated fuel in place and treats the eventual ignition source as unforeseeable."
            }
          ]
        },
        {
          "q": "Which powder-hazard principle does this work establish?",
          "o": [
            {
              "t": "A bearing, motor, or dust layer can accumulate heat when generation exceeds conduction, convection, and radiation away from the source. The powder-hazard file stores the dust survey. Dust fits.",
              "v": "expert",
              "fb": "Correct: the answer connects combustion physics with dust inventory, dispersion, and engineered controls."
            },
            {
              "t": "Analyze the ignition source while treating dust concentration, enclosure, turbulence, and secondary fuel as later details. Dust records fit this dust account. Dust timing supports this dust claim.",
              "v": "partial",
              "fb": "This names one part of the fire triangle but leaves confinement or secondary fuel unaddressed."
            },
            {
              "t": "Assume flame speed and pressure are largely independent of particle size, turbulence, oxygen, and enclosure geometry. Production history can support it. Dust practice makes the dust view plausible.",
              "v": "wrong",
              "fb": "That explanation applies the wrong gas or flame concept to the observed powder hazard."
            },
            {
              "t": "Leave the powder in place and treat the eventual ignition source as too unpredictable to manage in advance. Ignition receives the most attention. Production history can support it. Dust fits.",
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
    "<b>Fine powder coats broken beams while investigators number each pressure-bent duct panel.</b>",
    "The blast sequence record is divided among <b>Sweeper Ruiz</b> in the field, <b>The Electrician</b> at operations, and <b>The Clerk</b> in the archive.",
    "Responsibility may lie with Corwin Ash — plant owner, The production manager, or The safety inspector. Two attractive blast sequence accounts compete: <b>A confined gas deflagration spread through the mill</b> versus <b>A high-order detonation drove one dominant blast wave</b>.",
    "<b>Demolition begins in eight days, and the order of deposits and blast damage will not survive the dismantling.</b>"
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
  }
}
};
