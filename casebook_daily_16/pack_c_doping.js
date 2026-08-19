module.exports = { PACK: {
  "id": "c_doping",
  "title": "The Verano Ascent",
  "discipline": "Sports Science & Anti-Doping",
  "teaser": "A champion rewrote the record books and passed every test. A once-in-a-century talent? A meaningless mark in a dirty sport? Or something built to beat the lab?",
  "overclaimTag": "a once-in-a-century clean champion",
  "truthTag": "a systematic doping program",
  "venue": "the Verano doping inquiry",
  "agent": {
    "name": "Investigator Marek Dane",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Physiologists",
  "readingLabel": "Sport Science & Anti-Doping",
  "dossierName": "SPORT SCIENCE & ANTI-DOPING",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Verano doping inquiry",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before the inquiry closes. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The place you test determines the dossier you receive, and the conversation costs one day.",
  "overclaimTease": "A flawless legend can be engineered as carefully as a test schedule, so follow the biology and custody rather than the applause.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "dp_doctor",
      "items": [
        {
          "id": "dp_doctor",
          "label": "Dr. Halden Reuss — the team physician"
        },
        {
          "id": "dp_athlete",
          "label": "The champion athlete"
        },
        {
          "id": "dp_official",
          "label": "The federation official"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "dp_lab",
      "items": [
        {
          "id": "dp_camp",
          "label": "The Training Camp & Velodrome"
        },
        {
          "id": "dp_federation",
          "label": "The Federation Office"
        },
        {
          "id": "dp_lab",
          "label": "The Anti-Doping Laboratory"
        }
      ]
    },
    "what": {
      "title": "What is happening",
      "truth": "dp_program",
      "items": [
        {
          "id": "dp_phenom",
          "label": "A clean, once-in-a-century champion"
        },
        {
          "id": "dp_everyone",
          "label": "A meaningless record — everyone dopes anyway"
        },
        {
          "id": "dp_program",
          "label": "A systematic doping program built to beat the tests"
        }
      ]
    }
  },
  "PLACES": {
    "dp_camp": {
      "name": "The Training Camp & Velodrome",
      "xy": [
        140,
        90
      ]
    },
    "dp_federation": {
      "name": "The Federation Office",
      "xy": [
        330,
        240
      ]
    },
    "dp_lab": {
      "name": "The Anti-Doping Laboratory",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "dp_camp",
      "dp_federation"
    ],
    [
      "dp_federation",
      "dp_lab"
    ]
  ],
  "CHARACTERS": {
    "dp_scientist": {
      "name": "Lab Scientist Aro",
      "role": "Anti-doping scientist",
      "face": "🧪",
      "badge": "A",
      "legend": "the laboratory",
      "hint": "Retests the frozen samples; the blood passport shows values no clean rider can hold."
    },
    "dp_soigneur": {
      "name": "Soigneur Vela",
      "role": "Former team soigneur",
      "face": "🚴",
      "badge": "V",
      "legend": "the training camp",
      "hint": "Worked inside the team; knows the fridge, the schedule, and the microdosing."
    },
    "dp_officer": {
      "name": "Control Officer Renn",
      "role": "Doping-control officer",
      "face": "📋",
      "badge": "R",
      "legend": "the federation office",
      "hint": "Handles the test chain; can show which controls were dodged, delayed, or warned in advance."
    }
  },
  "TOPICMAP": {
    "dp_camp": {
      "dp_scientist": [
        "dp_hill"
      ],
      "dp_soigneur": [
        "dp_astrand"
      ],
      "dp_officer": [
        "dp_donike"
      ]
    },
    "dp_federation": {
      "dp_scientist": [
        "dp_catlin"
      ],
      "dp_soigneur": [
        "dp_ekblom"
      ],
      "dp_officer": [
        "dp_lasne"
      ]
    },
    "dp_lab": {
      "dp_scientist": [
        "dp_franke"
      ],
      "dp_soigneur": [
        "dp_yesalis"
      ],
      "dp_officer": [
        "dp_bergstrom"
      ]
    }
  },
  "TOPICS": {
    "dp_hill": {
      "sci": "A. V. Hill (1886–1977)",
      "topic": "VO2 max & muscle physiology",
      "lede": "He followed heat and oxygen through working muscle, giving endurance sport a measurable ceiling instead of a heroic myth.",
      "no": 1,
      "profile": "Archibald Vivian Hill was a British physiologist, mathematician, and athlete whose experiments made muscle performance quantitatively tractable. He built sensitive instruments to measure the tiny heat released by contracting muscle and shared the 1922 Nobel Prize in Physiology or Medicine with Otto Meyerhof for work on muscular energy. Hill’s laboratory joined mechanics, chemistry, respiration, and time-resolved measurement.\n\nWith Hartley Lupton in the 1920s, Hill studied oxygen consumption during running. As speed rose, oxygen uptake increased until it approached a maximum; beyond that point, additional work relied more heavily on energy pathways that did not immediately use oxygen. This helped establish the concept now called VO2 max: the highest rate at which the body can take in, transport, and use oxygen during intense exercise. Hill also discussed oxygen debt, an older framework for elevated recovery metabolism.\n\nVO2 max is not a single magic number. It depends on cardiac output, hemoglobin, blood volume, muscle extraction, training, protocol, and measurement quality. Exceptional athletes can be physiologically rare without violating biology. Conversely, a striking performance cannot prove doping by itself, because tactics, aerodynamics, weather, equipment, and efficiency all shape speed.\n\nAro needs Hill’s restraint in the Verano inquiry. The champion’s power profile can be compared with measured oxygen delivery and recovery, but no record alone identifies a drug. The useful clue is whether performance, blood values, and longitudinal physiology form a plausible human trajectory. Hill helps reject worship of a once-in-a-century body and the cynical claim that physiology means nothing in a dirty sport.",
      "frame": "Aro clips a metabolic cart printout beside the champion’s power file. “Hill made effort answer to oxygen. Records can be astonishing, but the body still has linked systems. Tell me which link we actually measured.”",
      "q": [
        {
          "q": "What does VO2 max describe?",
          "o": [
            {
              "t": "The highest rate of oxygen uptake and use during intense exercise.",
              "v": "expert",
              "fb": "VO2 max integrates pulmonary, cardiovascular, blood, and muscular oxygen delivery."
            },
            {
              "t": "The greatest speed an athlete can hold for exactly one minute.",
              "v": "partial",
              "fb": "Speed depends on efficiency and mechanics as well as oxygen uptake."
            },
            {
              "t": "The total amount of oxygen stored inside the lungs before exercise.",
              "v": "wrong",
              "fb": "VO2 max is a rate of uptake and utilization, not a stored volume."
            },
            {
              "t": "A number that suggests doping whenever it exceeds the population average.",
              "v": "danger",
              "fb": "Rare physiology is not by itself evidence of a prohibited method."
            }
          ]
        },
        {
          "q": "Why can speed rise after oxygen uptake plateaus?",
          "o": [
            {
              "t": "Additional energy can come from anaerobic pathways for a limited time.",
              "v": "expert",
              "fb": "Work above maximal oxygen supply draws more heavily on finite non-oxidative energy."
            },
            {
              "t": "The muscles stop consuming energy once maximum oxygen is reached.",
              "v": "wrong",
              "fb": "Higher speed requires more energy, not less."
            },
            {
              "t": "The athlete begins storing oxygen in bone and connective tissue. under review",
              "v": "wrong",
              "fb": "Those tissues do not provide a hidden oxygen reservoir for sprinting."
            },
            {
              "t": "A plateau means the measuring equipment would generally be malfunctioning.",
              "v": "danger",
              "fb": "Instrument checks matter, but a physiological plateau can be genuine."
            }
          ]
        },
        {
          "q": "What can Hill’s physiology establish in this case?",
          "o": [
            {
              "t": "Whether linked performance and oxygen measures are physiologically coherent.",
              "v": "expert",
              "fb": "Physiology tests plausibility, while doping responsibility requires additional evidence."
            },
            {
              "t": "Which team employee supplied a prohibited substance to the athlete.",
              "v": "wrong",
              "fb": "A metabolic test cannot identify the organizer of a program."
            },
            {
              "t": "That every extraordinary performance would have a pharmacological cause.",
              "v": "danger",
              "fb": "Training, genetics, technique, and equipment can also produce exceptional results."
            },
            {
              "t": "That passing one urine test suggests the athlete was generally clean.",
              "v": "wrong",
              "fb": "A single test covers limited substances and detection windows."
            }
          ]
        }
      ]
    },
    "dp_astrand": {
      "sci": "Per-Olof Åstrand (1922–2015)",
      "topic": "The textbook of work physiology",
      "lede": "He put exercise on the cycle ergometer and built practical tests that connected laboratory oxygen measurements to ordinary athletes.",
      "no": 2,
      "profile": "Per-Olof Åstrand was a Swedish physiologist whose research and teaching helped define modern work physiology. At the Karolinska Institute, he studied aerobic capacity, age, sex, training, and the body’s responses to sustained exercise. His Textbook of Work Physiology, written with Kaare Rodahl and later colleagues, became a standard reference for generations of students in sport, medicine, and occupational health.\n\nÅstrand helped popularize a submaximal cycle-ergometer test that estimates aerobic capacity from workload and heart rate. The logic is practical: below maximal effort, heart rate usually rises with oxygen demand, so a controlled test can infer a likely maximum. The estimate is imperfect and depends on age correction, medication, temperature, fatigue, and individual heart-rate behavior, but it made physiology accessible beyond specialized maximal-testing laboratories.\n\nHis broader work stressed variation across the lifespan and the specificity of training. Endurance performance reflects maximal oxygen uptake, economy, sustainable fraction of maximum, fuel supply, and recovery. A champion can improve without a huge change in VO2 max by becoming more economical or better able to sustain a high fraction. That is why one physiological number cannot explain a record.\n\nSoigneur Vela has seen the team turn ordinary measurements into a mythology of limitless adaptation. Åstrand offers a better baseline: repeated tests under standardized loads, interpreted as trends rather than talismans. If heart rate, workload, hemoglobin, and recovery change abruptly in coordinated ways, investigators should ask why. They should not call the athlete superhuman, and they should not assume every rider shares the same hidden practice.",
      "frame": "Vela spins the old ergometer wheel with one finger. “A team can make a chart look like destiny. Åstrand used controlled workloads so the chart had to answer back.”",
      "q": [
        {
          "q": "How does the Åstrand submaximal test estimate aerobic capacity?",
          "o": [
            {
              "t": "It relates heart rate at controlled workloads to an expected maximum.",
              "v": "expert",
              "fb": "Submaximal responses can provide a practical estimate of VO2 max."
            },
            {
              "t": "It measures every muscle fiber directly while the athlete rests.",
              "v": "wrong",
              "fb": "The test uses exercise heart rate and workload, not direct fiber sampling."
            },
            {
              "t": "It assumes all athletes share one identical resting and maximal pulse.",
              "v": "danger",
              "fb": "Age and individual variation must be considered."
            },
            {
              "t": "It records the fastest lap and converts speed directly into lung volume.",
              "v": "wrong",
              "fb": "Speed includes mechanics and resistance beyond aerobic capacity."
            }
          ]
        },
        {
          "q": "Why is the result an estimate rather than an exact measurement?",
          "o": [
            {
              "t": "Heart-rate responses vary with age, fatigue, heat, drugs, and individuals.",
              "v": "expert",
              "fb": "The inference depends on assumptions that are not identical across athletes."
            },
            {
              "t": "Cycle ergometers does not measure workload in physical units. in this case",
              "v": "wrong",
              "fb": "Properly calibrated ergometers quantify external work."
            },
            {
              "t": "Oxygen uptake has no relationship to cardiovascular response. in this case",
              "v": "wrong",
              "fb": "The relationship is real but variable."
            },
            {
              "t": "Any estimate is scientifically meaningless compared with competition results.",
              "v": "danger",
              "fb": "Practical estimates can be useful when their uncertainty is respected."
            }
          ]
        },
        {
          "q": "How might endurance improve without a large VO2-max rise?",
          "o": [
            {
              "t": "Better economy and sustainable fraction can increase speed at the same uptake.",
              "v": "expert",
              "fb": "Performance depends on how efficiently and durably aerobic capacity is used."
            },
            {
              "t": "The body can eliminate its need for oxygen through technical training.",
              "v": "wrong",
              "fb": "Aerobic metabolism remains necessary for endurance exercise."
            },
            {
              "t": "A rider can store unlimited anaerobic energy for an entire mountain stage.",
              "v": "danger",
              "fb": "Anaerobic stores are limited and cannot sustain prolonged climbing."
            },
            {
              "t": "mainly the federation’s timing system can create such an improvement. in this case",
              "v": "wrong",
              "fb": "Timing errors are possible, but real physiological pathways also exist."
            }
          ]
        }
      ]
    },
    "dp_donike": {
      "sci": "Manfred Donike (1933–1995)",
      "topic": "GC/MS steroid testing & the T/E ratio",
      "lede": "He brought chromatograms and mass spectra into sport, forcing steroids to leave chemical identities rather than rumors.",
      "no": 3,
      "profile": "Manfred Donike was a German chemist, former competitive cyclist, and a central architect of modern anti-doping analysis. He led the Cologne laboratory and worked with international sport organizations to improve testing. His experience in cycling gave him practical knowledge of the substances and evasions circulating through elite competition.\n\nDonike advanced the use of gas chromatography and mass spectrometry for steroid detection. Gas chromatography separates compounds in a sample; mass spectrometry helps identify them by the masses and fragmentation patterns of their ions. Together, GC/MS can distinguish closely related steroids and metabolites far more specifically than broad color reactions or rumor-based policing.\n\nHe also helped establish use of the testosterone-to-epitestosterone ratio, usually called the T/E ratio. Because administered testosterone can elevate testosterone relative to epitestosterone, an unusual ratio can trigger further investigation. The ratio varies naturally and can be manipulated, so later isotope-ratio methods and longitudinal profiling improved interpretation. A screening threshold is not identical to proof.\n\nControl Officer Renn needs that distinction. A program designed to beat tests may microdose, time administration, substitute samples, or exploit warning. Donike’s legacy is not faith in one cutoff; it is analytical escalation. A normal-looking result can coexist with doping outside the detection window, while an unusual ratio can have innocent explanations. Chain of custody, confirmatory spectra, and patterns across time turn suspicion into evidence. The strongest laboratory conclusion therefore states the compound, method, uncertainty, and custody separately, leaving organizers and intent to documentary evidence rather than stretching chemistry beyond its reach.",
      "frame": "Renn sets a chromatogram on the control form. “Donike replaced whispers with peaks, but he never made one threshold omniscient. Tell me what screening can and cannot prove.”",
      "q": [
        {
          "q": "What does GC/MS contribute to steroid testing?",
          "o": [
            {
              "t": "It separates compounds and identifies them through characteristic spectra.",
              "v": "expert",
              "fb": "Chromatography plus mass spectrometry provides chemically specific evidence."
            },
            {
              "t": "It measures cycling speed and converts it into a drug concentration.",
              "v": "wrong",
              "fb": "Performance data are not chemical identification."
            },
            {
              "t": "It detects mainly substances visible as colored particles in urine. in this case",
              "v": "wrong",
              "fb": "The method analyzes molecular separation and ion fragments."
            },
            {
              "t": "It identifies the team organizer from the athlete’s sample alone. under review",
              "v": "wrong",
              "fb": "Chemistry can show exposure, not the full chain of responsibility."
            }
          ]
        },
        {
          "q": "What is the purpose of the T/E ratio?",
          "o": [
            {
              "t": "It screens for testosterone administration through hormonal imbalance.",
              "v": "expert",
              "fb": "An elevated relationship can prompt confirmatory investigation."
            },
            {
              "t": "It compares training effort with expected finishing time. in this case",
              "v": "wrong",
              "fb": "The ratio concerns testosterone and epitestosterone in a sample."
            },
            {
              "t": "It suggests innocence whenever the value lies below one fixed cutoff.",
              "v": "danger",
              "fb": "Doping may occur without crossing a screening threshold."
            },
            {
              "t": "It distinguishes blood transfusion from recombinant EPO directly. in this case",
              "v": "wrong",
              "fb": "Those are different methods requiring hematological or EPO-focused analysis."
            }
          ]
        },
        {
          "q": "Why is a screening threshold not final proof?",
          "o": [
            {
              "t": "Biological variation and manipulation require confirmation and context.",
              "v": "expert",
              "fb": "Thresholds identify samples needing deeper analytical work."
            },
            {
              "t": "Laboratory instruments rarely produce quantitative measurements.",
              "v": "wrong",
              "fb": "Analytical instruments can measure precisely when validated."
            },
            {
              "t": "Any athlete may choose a personal cutoff after the result arrives.",
              "v": "danger",
              "fb": "Rules must be established and applied consistently."
            },
            {
              "t": "A value beyond threshold generally comes from contaminated food.",
              "v": "wrong",
              "fb": "Contamination is one possibility, not an automatic explanation."
            }
          ]
        }
      ]
    },
    "dp_catlin": {
      "sci": "Don Catlin (b. 1938)",
      "topic": "The lab that caught the designer steroid THG",
      "lede": "A used syringe carried an unnamed steroid to his laboratory, where its molecular fingerprint exposed the BALCO design.",
      "no": 4,
      "profile": "Don Catlin founded and led the UCLA Olympic Analytical Laboratory, one of the major anti-doping laboratories in the United States. Over decades he developed tests for performance-enhancing drugs and worked on methods that had to keep pace with substances designed specifically to escape existing screens.\n\nThe BALCO scandal showed the challenge. In 2003, a syringe containing residue of a previously unknown designer steroid reached anti-doping authorities through coach Trevor Graham. Catlin’s laboratory analyzed the material and identified tetrahydrogestrinone, or THG. Because routine tests did not yet target it, athletes could use the substance while appearing negative. Once the structure and metabolites were understood, laboratories created a specific method and reexamined samples.\n\nDesigner drugs exploit a basic asymmetry. Chemists may alter a known steroid enough to avoid a library match while preserving anabolic activity. A laboratory cannot reliably target a molecule it has never characterized. Investigations therefore combine intelligence, seized material, reference standards, metabolism studies, and retrospective testing. A passed test means no targeted prohibited evidence was found under that method; it does not certify every possible substance absent.\n\nAro sees the same false comfort in Verano’s immaculate test history. The right inference is neither that the champion is uniquely clean nor that all testing is theater. Catlin’s case shows that a specific hidden program can outrun a method temporarily and then become visible when new chemical information arrives. Frozen samples matter because knowledge changes while molecules remain. Retrospective analysis is fair only when storage integrity, validated methods, and applicable rules are documented as carefully as the new molecular match.",
      "frame": "Aro places a sealed archive vial beneath a photograph of the BALCO syringe. “Yesterday’s negative can become tomorrow’s evidence when the target finally has a name.”",
      "q": [
        {
          "q": "Why did THG initially evade routine testing?",
          "o": [
            {
              "t": "Laboratories lacked a targeted method for the previously unknown steroid.",
              "v": "expert",
              "fb": "A designer compound can escape screens until its structure and metabolites are characterized."
            },
            {
              "t": "THG vanished from all samples the instant exercise began. under review",
              "v": "wrong",
              "fb": "Its evasion came from analytical novelty, not magical disappearance."
            },
            {
              "t": "The substance was permitted whenever supplied by a private laboratory.",
              "v": "wrong",
              "fb": "Source does not determine whether a steroid is prohibited."
            },
            {
              "t": "Every anti-doping laboratory agreed not to test BALCO athletes. under review",
              "v": "danger",
              "fb": "The key gap was technical knowledge, not universal collusion."
            }
          ]
        },
        {
          "q": "What allowed Catlin’s team to develop a THG test?",
          "o": [
            {
              "t": "Physical residue supplied the molecule for structural analysis.",
              "v": "expert",
              "fb": "A real sample provided the reference needed to identify the designer drug."
            },
            {
              "t": "A race video revealed the steroid’s chemical formula from riding style.",
              "v": "wrong",
              "fb": "Performance footage cannot determine molecular structure."
            },
            {
              "t": "Athletes voted on which unknown steroid they thought was present.",
              "v": "wrong",
              "fb": "Analytical chemistry, not preference, established identity."
            },
            {
              "t": "The old screening method was declared perfect without modification.",
              "v": "danger",
              "fb": "Detection required a newly tailored assay."
            }
          ]
        },
        {
          "q": "Why preserve frozen samples?",
          "o": [
            {
              "t": "New methods can detect substances that earlier tests could not target.",
              "v": "expert",
              "fb": "Retesting extends accountability as analytical knowledge improves."
            },
            {
              "t": "Freezing indicates every drug concentration rises over time; in use.",
              "v": "wrong",
              "fb": "Storage preserves material; it does not universally concentrate drugs."
            },
            {
              "t": "Archived samples reveal who organized the program without other evidence.",
              "v": "wrong",
              "fb": "They may show exposure but not the entire conspiracy."
            },
            {
              "t": "A past negative becomes proof of guilt whenever science advances.",
              "v": "danger",
              "fb": "Retesting still requires validated detection of a prohibited substance."
            }
          ]
        }
      ]
    },
    "dp_ekblom": {
      "sci": "Björn Ekblom (b. 1938)",
      "topic": "Blood doping & the physiology of EPO",
      "lede": "By removing and reinfusing blood, he showed exactly why more red cells can turn oxygen transport into speed.",
      "no": 5,
      "profile": "Björn Ekblom is a Swedish exercise physiologist whose research helped establish the performance effects of blood doping. Blood doping increases oxygen-carrying capacity by raising red-cell mass, historically through transfusion and later through drugs such as recombinant erythropoietin, or EPO. Ekblom’s controlled studies examined how changing hemoglobin mass affected maximal oxygen uptake and endurance.\n\nIn transfusion experiments, blood was withdrawn, stored, and later reinfused after the body had begun replacing the removed cells. Reinfusion could raise hemoglobin and VO2 max, improving endurance performance. The mechanism follows the Fick principle: oxygen consumption depends on blood flow multiplied by the arterial-venous oxygen difference. More hemoglobin can increase oxygen delivered per unit of blood.\n\nThe manipulation carries risks. Excess red-cell concentration can increase blood viscosity, while transfusion adds risks of reaction, infection, and identification errors. EPO stimulates the athlete’s own red-cell production but can also push hematology dangerously. Hydration, altitude, illness, and training affect measured concentrations, so anti-doping assessment must distinguish concentration from total red-cell mass and inspect trends.\n\nVela’s fridge schedule and Aro’s passport data fit Ekblom’s physiology better than a vague story about extraordinary will. Still, a high hemoglobin reading alone is not proof. The case grows when rises, reticulocyte responses, training dates, and control avoidance align. Blood doping is a specific mechanism with measurable consequences—not evidence that every rider cheats, and not a miracle talent beyond analysis. That mechanistic sequence lets experts test the team’s altitude explanation against dates and marrow behavior instead of treating either performance or suspicion as self-validating.",
      "frame": "Vela opens a training chart where power rises after an unexplained “recovery” day. “Ekblom showed what extra red cells buy. The schedule tells us when somebody may have paid for it.”",
      "q": [
        {
          "q": "How can blood doping improve endurance?",
          "o": [
            {
              "t": "More red-cell mass increases oxygen-carrying capacity to working muscle.",
              "v": "expert",
              "fb": "Extra hemoglobin can raise maximal oxygen delivery and aerobic performance."
            },
            {
              "t": "Stored blood supplies an unlimited reserve of muscle glycogen.",
              "v": "wrong",
              "fb": "Transfusion changes blood cells, not carbohydrate storage directly."
            },
            {
              "t": "It reduces the body’s need for a heart or capillary circulation.",
              "v": "wrong",
              "fb": "The cardiovascular chain remains necessary to deliver oxygen."
            },
            {
              "t": "It works mainly by convincing athletes that they feel stronger.",
              "v": "danger",
              "fb": "Controlled studies show a real physiological mechanism beyond placebo."
            }
          ]
        },
        {
          "q": "What is the key distinction between concentration and red-cell mass?",
          "o": [
            {
              "t": "Plasma-volume shifts can change concentration without adding total cells.",
              "v": "expert",
              "fb": "Dehydration may raise hematocrit even when total red-cell mass is unchanged."
            },
            {
              "t": "They are generally identical under every hydration and altitude condition.",
              "v": "wrong",
              "fb": "Fluid balance can separate the two measurements."
            },
            {
              "t": "mainly concentration influences oxygen transport during exercise. in this case",
              "v": "partial",
              "fb": "Concentration matters, but total hemoglobin mass is a deeper capacity measure."
            },
            {
              "t": "Red-cell mass can be read directly from one ordinary urine sample.",
              "v": "wrong",
              "fb": "It requires blood-based or specialized measurement approaches."
            }
          ]
        },
        {
          "q": "Which evidence would strengthen a transfusion hypothesis?",
          "o": [
            {
              "t": "Blood shifts, low reticulocytes, timing records, and control avoidance align.",
              "v": "expert",
              "fb": "Multiple physiological and logistical clues can converge on reinfusion."
            },
            {
              "t": "The athlete wins one mountain stage after years of steady training. in this case",
              "v": "danger",
              "fb": "A performance result alone does not identify a blood manipulation."
            },
            {
              "t": "A single hematocrit value is high during documented dehydration. under review",
              "v": "partial",
              "fb": "Dehydration is an alternative explanation that must be resolved."
            },
            {
              "t": "The team physician praises altitude training in an interview. in this case",
              "v": "wrong",
              "fb": "Public explanation is not independent biological evidence."
            }
          ]
        }
      ]
    },
    "dp_lasne": {
      "sci": "Françoise Lasne (anti-doping scientist)",
      "topic": "The urine test for EPO",
      "lede": "She separated natural and recombinant EPO patterns in urine, giving laboratories a direct view of a hormone made to mimic the body.",
      "no": 6,
      "profile": "Françoise Lasne is a French anti-doping scientist whose work helped create a direct urine test for recombinant erythropoietin. EPO is a glycoprotein hormone produced mainly by the kidneys that stimulates red-cell production. Pharmaceutical EPO was developed to treat anemia, but its endurance benefit made it attractive in sport.\n\nNatural and recombinant EPO share their protein backbone yet differ in patterns of attached sugar chains and electrical charge. Lasne and colleagues used isoelectric focusing to separate EPO isoforms according to charge, followed by immunological detection. The resulting band patterns could distinguish typical endogenous hormone from pharmaceutical preparations. The method was introduced into elite anti-doping around the 2000 Olympic era and evolved as new EPO products appeared.\n\nDirect testing has limits. Urinary concentrations can be low, the detection window is short, samples degrade, and manufacturers can produce molecules with new patterns. Laboratories need validated controls and careful interpretation to avoid mistaking technical artifacts or unusual natural profiles for doping. Direct EPO analysis therefore complements, rather than eliminates, longitudinal blood evidence.\n\nRenn’s control records show that Verano athletes were repeatedly tested after delays. Lasne’s work explains why hours and days matter. A negative sample collected outside the window cannot certify the preceding training block. Conversely, a valid recombinant pattern is powerful chemical evidence. The inquiry must distinguish absence of detection from evidence of absence, then connect any finding to the physician, schedule, and sample chain. Her contribution also illustrates an arms race: each new pharmaceutical form forces laboratories to update reference patterns while preserving specificity for naturally produced hormone.",
      "frame": "Renn points to two band patterns: one broad, one shifted. “Lasne made a near-copy of a human hormone betray its manufacturing history. But only if we collect while the trail remains.”",
      "q": [
        {
          "q": "How can recombinant EPO differ from natural EPO analytically?",
          "o": [
            {
              "t": "Its sugar chains create a distinguishable pattern of electrical charges.",
              "v": "expert",
              "fb": "Isoelectric focusing can separate isoforms with different charge distributions."
            },
            {
              "t": "It contains iron filings that settle visibly at the bottom of urine.",
              "v": "wrong",
              "fb": "The distinction is molecular, not a visible sediment."
            },
            {
              "t": "It changes every red blood cell into a white blood cell. in this case",
              "v": "wrong",
              "fb": "EPO stimulates erythropoiesis rather than changing cell lineage."
            },
            {
              "t": "It generally remains unchanged in urine for an entire season. in this case",
              "v": "danger",
              "fb": "The direct detection window can be limited."
            }
          ]
        },
        {
          "q": "What does isoelectric focusing do?",
          "o": [
            {
              "t": "It separates protein forms according to their isoelectric charge behavior.",
              "v": "expert",
              "fb": "Different EPO isoforms migrate to characteristic positions in a pH gradient."
            },
            {
              "t": "It counts race photographs to estimate the athlete’s effort. in this case.",
              "v": "wrong",
              "fb": "The method is laboratory protein separation."
            },
            {
              "t": "It amplifies DNA sequences from the athlete’s muscle cells. in this case.",
              "v": "wrong",
              "fb": "That describes a different family of molecular techniques."
            },
            {
              "t": "It suggests who administered a hormone from the band pattern alone.",
              "v": "wrong",
              "fb": "The pattern identifies the substance, not the organizer."
            }
          ]
        },
        {
          "q": "Why do delayed controls matter for EPO?",
          "o": [
            {
              "t": "The drug may clear before collection while blood effects persist.",
              "v": "expert",
              "fb": "A missed direct window can leave only indirect hematological evidence."
            },
            {
              "t": "Delay makes recombinant EPO become legally permitted retroactively.",
              "v": "wrong",
              "fb": "Rule status does not change with collection timing."
            },
            {
              "t": "Every hour of delay creates a false positive in clean urine.",
              "v": "wrong",
              "fb": "Delay may reduce detectability rather than automatically create positives."
            },
            {
              "t": "A late negative suggests the earlier training period was clean.",
              "v": "danger",
              "fb": "A negative outside the window cannot support that conclusion."
            }
          ]
        }
      ]
    },
    "dp_franke": {
      "sci": "Werner Franke (1940–2022)",
      "topic": "Exposing the East German state doping program",
      "lede": "He read secret pharmaceutical records as evidence, exposing how a state converted young athletes into planned experiments.",
      "no": 7,
      "profile": "Werner Franke was a German molecular and cell biologist known both for cancer and cytoskeleton research and for exposing the former East German doping system. Together with his wife, former elite athlete Brigitte Berendonk, he examined documents recovered after German reunification that described a centrally organized program of performance-enhancing drugs.\n\nThe records included research plans, dosing schedules, reports, and coded references associated with State Plan 14.25. Anabolic steroids such as Oral-Turinabol were administered to athletes, including minors, often without meaningful informed consent. Coaches, physicians, scientists, and security structures helped convert doping from scattered rule-breaking into policy. Medal production was linked to biomedical monitoring and secrecy.\n\nFranke’s scientific background helped him interpret the pharmacology and documentary language. A list of substances alone would not prove who received what; schedules, names or codes, medical observations, and institutional chains supplied the architecture. The human cost included lasting reproductive, cardiovascular, psychiatric, and other health harms reported by former athletes.\n\nAro should look for the same distinction at Verano. A suspicious sample can implicate an exposure; a systematic program appears when prescriptions, storage, timing, testing intelligence, and authority connect. The East German case does not prove every successful team runs a state machine, and it does not make anti-doping hopeless. It shows why documents and logistics are essential when clean test sheets were themselves part of the planned appearance. The documents made it possible to distinguish athletes used by the machinery from professionals who designed, monitored, and concealed that machinery over many competitive seasons.",
      "frame": "Aro opens a coded medication ledger beside the team’s “recovery protocol.” “Franke did not expose a system with one positive urine. He exposed the paperwork that made negatives possible.”",
      "q": [
        {
          "q": "What made the East German doping program systematic?",
          "o": [
            {
              "t": "State plans connected drugs, doctors, coaches, monitoring, and secrecy.",
              "v": "expert",
              "fb": "The evidence showed an organized institutional structure rather than isolated use."
            },
            {
              "t": "Every athlete independently chose the same supplement by coincidence.",
              "v": "danger",
              "fb": "Central documents and coordinated administration contradict that account."
            },
            {
              "t": "One laboratory instrument produced false positives for an entire decade.",
              "v": "wrong",
              "fb": "The program was documented through records and testimony beyond testing artifacts."
            },
            {
              "t": "Foreign rivals invented all records after German reunification.",
              "v": "wrong",
              "fb": "Recovered internal documents and corroborating accounts supported the findings."
            }
          ]
        },
        {
          "q": "Why were the documents especially powerful?",
          "o": [
            {
              "t": "They linked substances and schedules to institutional roles and decisions.",
              "v": "expert",
              "fb": "Program responsibility requires more than detecting a molecule in one athlete."
            },
            {
              "t": "A document automatically suggests every handwritten claim is accurate.",
              "v": "danger",
              "fb": "Authenticity, context, and corroboration still need evaluation."
            },
            {
              "t": "The papers contained no codes, technical terms, or missing information.",
              "v": "wrong",
              "fb": "Interpreting records required scientific and historical reconstruction."
            },
            {
              "t": "They showed performance drugs have no medical risks for young athletes.",
              "v": "wrong",
              "fb": "Former athletes reported serious long-term harms."
            }
          ]
        },
        {
          "q": "What pattern would indicate a Verano program rather than solo use?",
          "o": [
            {
              "t": "Medical orders, stored products, synchronized dosing, and test warnings align.",
              "v": "expert",
              "fb": "Converging logistics can establish coordinated control."
            },
            {
              "t": "The champion gives an unusually confident interview after a victory.",
              "v": "wrong",
              "fb": "Confidence is not evidence of organization."
            },
            {
              "t": "One teammate has a naturally high hematocrit at altitude. in this case.",
              "v": "partial",
              "fb": "A single explainable value does not show a system."
            },
            {
              "t": "The sport has a historical reputation for widespread doping. in this case.",
              "v": "danger",
              "fb": "Field reputation cannot assign conduct in this case."
            }
          ]
        }
      ]
    },
    "dp_yesalis": {
      "sci": "Charles Yesalis (epidemiologist, anabolic steroids)",
      "topic": "The spread of steroid use",
      "lede": "He studied steroids as a population problem, showing that use spreads through gyms, schools, medicine, and sporting cultures.",
      "no": 8,
      "profile": "Charles Yesalis was an epidemiologist and public-health scholar who studied anabolic-androgenic steroids and other performance-enhancing drugs. Rather than focusing only on elite positive tests, he examined prevalence, motives, health consequences, and the social environments that make use possible among athletes and non-athletes.\n\nAnabolic steroids are synthetic relatives of testosterone that can increase muscle protein synthesis and support gains in strength and lean mass when combined with training. Effects vary with compound, dose, duration, nutrition, and individual biology. Risks can include endocrine suppression, infertility, cardiovascular changes, liver injury with some oral agents, psychiatric effects, and harms from unregulated products or injection practices.\n\nEstimating use is difficult. Surveys depend on honesty and definitions; test positives miss users outside detection windows; clinic populations are not representative; and stigma can suppress reporting. Yesalis emphasized that a low official positive rate is not the same as a low prevalence. He also rejected the idea that one stereotype captures all users or motives.\n\nVela’s camp testimony fits a network model: access, norms, medical language, and fear of losing selection can shape decisions. Yet prevalence cannot convict Dr. Reuss. The inquiry needs specific schedules, products, markers, and control interference. Yesalis helps defeat the dismissal that a dirty sport makes one record meaningless. Widespread risk increases the need for precise case evidence; it does not make accountability impossible. Public-health analysis therefore studies supply, normalization, body image, competitive pressure, and medical access alongside the pharmacology itself, without converting prevalence into individual accusation or assuming one pathway explains every user.",
      "frame": "Vela closes a locker full of ordinary supplements. “Yesalis studied the culture around the vial. Not every powder is a drug, and not every user arrives through the same door.”",
      "q": [
        {
          "q": "Why are official positive rates poor estimates of total steroid use?",
          "o": [
            {
              "t": "Testing misses some users, windows, populations, and undisclosed behavior.",
              "v": "expert",
              "fb": "Detected cases are a selected subset of actual exposure."
            },
            {
              "t": "Every steroid user tests positive during every collection. in this case",
              "v": "wrong",
              "fb": "Timing, substances, and methods can produce negative tests."
            },
            {
              "t": "Surveys generally produce exact answers with no reporting bias. in this case",
              "v": "wrong",
              "fb": "Stigma and question wording affect self-report."
            },
            {
              "t": "Positive rates are meaningless because laboratories invent all results.",
              "v": "danger",
              "fb": "Testing provides evidence despite incomplete coverage."
            }
          ]
        },
        {
          "q": "What is a primary anabolic effect of these steroids?",
          "o": [
            {
              "t": "They can support muscle protein synthesis and strength gains with training.",
              "v": "expert",
              "fb": "Anabolic-androgenic compounds can increase lean mass and performance capacity."
            },
            {
              "t": "They replace the need for resistance training and dietary energy.",
              "v": "danger",
              "fb": "Drugs do not eliminate training, nutrition, or individual response."
            },
            {
              "t": "They directly create red blood cells without affecting other tissues.",
              "v": "partial",
              "fb": "Some androgens affect erythropoiesis, but their actions are much broader."
            },
            {
              "t": "They improve mainly coordination while leaving muscle unchanged. under review",
              "v": "wrong",
              "fb": "Muscle and strength effects are central reasons for misuse."
            }
          ]
        },
        {
          "q": "How should prevalence evidence be used here?",
          "o": [
            {
              "t": "It frames risk but cannot identify the physician behind this program.",
              "v": "expert",
              "fb": "Population patterns do not substitute for person-specific evidence."
            },
            {
              "t": "It suggests every elite athlete in the sport uses the same regimen.",
              "v": "danger",
              "fb": "No prevalence estimate supports universal individual guilt."
            },
            {
              "t": "It makes medical records and sample evidence unnecessary; in use.",
              "v": "wrong",
              "fb": "Direct case evidence remains essential."
            },
            {
              "t": "It suggests the champion is clean because official positives are rare.",
              "v": "danger",
              "fb": "Low detection rates do not certify an individual."
            }
          ]
        }
      ]
    },
    "dp_bergstrom": {
      "sci": "Jonas Bergström (1929–2001)",
      "topic": "The muscle-biopsy needle & glycogen",
      "lede": "His needle made living muscle chemically readable, revealing how glycogen stores fall, refill, and shape endurance.",
      "no": 9,
      "profile": "Jonas Bergström was a Swedish physician and researcher associated with development and use of the percutaneous muscle-biopsy needle. Earlier biopsies often required surgical exposure. The improved needle approach allowed small samples of skeletal muscle to be taken repeatedly with local anesthesia, making controlled studies of human exercise and metabolism far more practical.\n\nWorking with Eric Hultman and others, Bergström helped show how muscle glycogen changes with diet and exercise. Prolonged activity can deplete glycogen, while a high-carbohydrate diet after depletion can produce unusually large stores. Endurance time was strongly related to starting glycogen in classic studies. The work provided a physiological basis for carbohydrate loading.\n\nRepeated biopsy transformed claims about fatigue into measurements of substrate, enzymes, and fiber response. It also taught humility: one small sample represents a limited region of one muscle, and the procedure itself, timing, handling, and laboratory analysis affect results. Invasive measurement is powerful because it reaches mechanism, not because it is automatically complete.\n\nRenn can use that lesson when comparing Verano’s legal nutrition program with its secret medical schedule. Glycogen loading can explain improved endurance and is not doping. It cannot explain coordinated hemoglobin and reticulocyte anomalies. Bergström helps keep mechanisms separate. Investigators should credit lawful physiology where it fits, then refuse to let a true carbohydrate story cover a different blood story. The narrow tissue core also reminds investigators to avoid asking one measurement to answer questions about another compartment, especially when legal fueling and prohibited blood manipulation coexist within the same performance record.",
      "frame": "Renn taps a biopsy diagram beside the team meal plan. “Bergström proved carbohydrates can change endurance honestly. That makes them a control explanation, not an all-purpose alibi.”",
      "q": [
        {
          "q": "What did the biopsy needle make possible?",
          "o": [
            {
              "t": "Repeated small samples of living human skeletal muscle.",
              "v": "expert",
              "fb": "Researchers could follow biochemical changes across controlled conditions."
            },
            {
              "t": "Removal of an athlete’s entire muscle without surgery.",
              "v": "wrong",
              "fb": "The method collects a small tissue core."
            },
            {
              "t": "Direct measurement of every red cell circulating in the body.",
              "v": "wrong",
              "fb": "A muscle sample does not measure total blood-cell mass."
            },
            {
              "t": "A permanent record of every substance ever taken by the athlete.",
              "v": "danger",
              "fb": "Biopsy chemistry reflects limited tissue and time."
            }
          ]
        },
        {
          "q": "What did classic glycogen studies show?",
          "o": [
            {
              "t": "Higher starting muscle glycogen can prolong endurance performance.",
              "v": "expert",
              "fb": "Carbohydrate availability helps sustain prolonged work."
            },
            {
              "t": "Glycogen loading directly creates recombinant EPO in muscle.",
              "v": "wrong",
              "fb": "Carbohydrate storage and EPO administration are distinct mechanisms."
            },
            {
              "t": "Once glycogen is high, fatigue becomes biologically implausible.",
              "v": "danger",
              "fb": "Many other limits remain, and stores are finite."
            },
            {
              "t": "A low-carbohydrate diet generally maximizes endurance in every event.",
              "v": "wrong",
              "fb": "Classic loading work found benefit from increased carbohydrate stores."
            }
          ]
        },
        {
          "q": "Why is a true nutrition explanation not a complete alibi?",
          "o": [
            {
              "t": "It may explain fuel gains but not independent blood-marker anomalies.",
              "v": "expert",
              "fb": "Different mechanisms should account for their own predicted evidence."
            },
            {
              "t": "Legal nutrition does not improve elite performance under any circumstances.",
              "v": "wrong",
              "fb": "Dietary strategies can produce real gains."
            },
            {
              "t": "Every athlete who loads carbohydrate also uses prohibited hormones.",
              "v": "danger",
              "fb": "One practice does not imply the other."
            },
            {
              "t": "Muscle and blood measurements are generally identical quantities.",
              "v": "wrong",
              "fb": "They describe different compartments and processes."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "dp_scientist": {
      "dp_camp": "Aro clips a portable analyzer to the warm-up bike. “The power curve is real,” she says. “The question is whether the blood history that supports it is humanly continuous.”",
      "dp_federation": "Aro opens a passport report that was closed without expert review. “No single value crossed the public line,” she says. “The sequence crossed the athlete’s own.”",
      "dp_lab": "Aro unlocks the freezer rack and lifts a vial from the championship week. “The old method called this negative,” she says. “The new assay finally knows what to ask.”"
    },
    "dp_soigneur": {
      "dp_camp": "Vela stands beside a locked medical refrigerator behind the mechanics’ bay. “The labels said recovery,” she says. “The timing said before altitude, after controls, and never when outsiders visited.”",
      "dp_federation": "Vela points to travel changes approved only for three riders. “We called them equipment delays,” she says. “They always moved the athletes away from an unannounced tester.”",
      "dp_lab": "Vela recognizes color-coded tubes in an evidence tray. “Reuss kept the dosing chart in symbols,” she says. “I filled the cooler; he decided whose symbol appeared.”"
    },
    "dp_officer": {
      "dp_camp": "Renn compares a surprise-control order with a team message sent four hours earlier. “Someone turned no-notice testing into an appointment,” he says. “That changes what a negative can mean.”",
      "dp_federation": "Renn pulls server logs from the federation terminal. “The official viewed sealed control locations,” he says. “Minutes later, Reuss changed the team’s training route.”",
      "dp_lab": "Renn follows barcodes from collection to freezer. “These seals are intact,” he says. “The weakness was earlier—who was available, who was warned, and when the bottle existed.”"
    }
  },
  "story": [
    "The <b>Verano Ascent</b> rewrote the climbing record while its champion passed every announced test. The victory photographs show effortless speed; the frozen samples and blood history show a more complicated calendar.",
    "Your inquiry can call <b>Lab Scientist Aro</b>, who reads metabolites and passport shifts; <b>Soigneur Vela</b>, who worked beside the team refrigerator; and <b>Control Officer Renn</b>, who can trace warnings, missed visits, and every sample seal.",
    "Dr. Halden Reuss, the champion athlete, and a federation official each touched a different part of the system. The easy stories are <b>a clean, once-in-a-century champion</b> and <b>a meaningless record—everyone dopes anyway</b>. Both let the actual chain of decisions disappear.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and decide the <b>WHAT</b> from the evidence."
  ],
  "endings": {
    "overclaimWhat": "dp_phenom",
    "dismissalWhat": "dp_everyone",
    "win": {
      "expertTitle": "The Program Behind the Peak",
      "expert": [
        "You identify <b>Dr. Halden Reuss—the team physician</b>, <b>the Anti-Doping Laboratory</b>, and <b>a systematic doping program built to beat the tests</b>. Retesting identifies the hidden agent, the passport sequence shows timed blood manipulation, and control logs match Reuss’s dosing and travel changes. Not a clean once-in-a-century champion. Not a meaningless record where everyone dopes.",
        "Your finding separates the athlete’s exposure from the program’s authorship. The federation official leaked control information, but Reuss designed the medical schedule, controlled the products, and used those warnings to create negative windows. The record is suspended, samples are preserved, and athlete responsibility is adjudicated separately from the physician’s organization."
      ],
      "soundTitle": "A Chain That Holds",
      "sound": [
        "You correctly name Dr. Halden Reuss, the Anti-Doping Laboratory, and a systematic program designed to beat testing. The retest, biological passport, refrigerator schedule, and leaked controls converge on coordinated medical manipulation.",
        "The inquiry accepts the accusation. Some details of the athlete’s knowledge remain unresolved, but the program and its architect are established strongly enough for sanctions and a broader federation review."
      ],
      "namedTitle": "The Correct Program",
      "named": [
        "You name Dr. Halden Reuss, the Anti-Doping Laboratory, and a systematic doping program built to beat the tests. The conclusion is right, though your account does not fully connect the direct assay, longitudinal blood markers, and warning logs.",
        "The record is frozen pending action. A complete decision will need the evidential chain you only outlined, especially the difference between benefiting from the program and directing it."
      ]
    },
    "overclaim": {
      "title": "The Legend the Tests Were Built to Sell",
      "body": [
        "You declare the champion a clean, once-in-a-century phenomenon. That verdict treats scheduled negatives as universal proof and ignores a passport sequence synchronized with the physician’s camp calendar.",
        "The heroic story discredits later correction as jealousy. Reuss gains time to dismantle the logistics, the federation certifies the record, and the specific, provable program is hidden behind admiration for an athlete who appeared chemically untouchable."
      ]
    },
    "dismissal": {
      "title": "Cynicism as an Acquittal",
      "body": [
        "You call the record meaningless because everyone dopes anyway. Prevalence cannot erase the retested sample, the blood sequence, the leaked controls, or the physician’s coded schedule.",
        "The shrug protects the organizer more effectively than any failed assay. Clean competitors lose the possibility of a specific finding, coerced athletes become indistinguishable from architects, and the federation avoids repairing the exact control failures the evidence exposed."
      ]
    },
    "wrongNames": {
      "title": "The Method, Without Its Architect",
      "body": [
        "You recognize a systematic program designed to beat testing, but place it with the wrong person or at the wrong site. The unresolved task is locating where products, passport timing, and advance control information became medical orders—"
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A cyclist and a blood-passport trend\"><circle cx=\"122\" cy=\"92\" r=\"28\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><circle cx=\"222\" cy=\"92\" r=\"28\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M122 92 L168 54 L196 92 L150 92 Z M168 54 L190 34 M168 54 L222 92\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.7\"/><path d=\"M322 106 V30 M322 106 H604\" stroke=\"#121212\" stroke-width=\"1.4\"/><path d=\"M344 90 L388 76 L430 84 L474 48 L518 58 L570 34\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"2.3\"/><path d=\"M344 70 H570\" stroke=\"#326891\" stroke-width=\"1.3\" stroke-dasharray=\"4 4\"/></svg>"
}};
