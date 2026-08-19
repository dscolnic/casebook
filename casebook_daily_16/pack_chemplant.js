module.exports = { PACK: {
  "id": "chemplant",
  "title": "The Ardsley Works",
  "discipline": "Chemical & Process Engineering",
  "teaser": "A gas cloud rolled out of a chemical plant at midnight. A saboteur, bad luck — or safety systems switched off to save money?",
  "overclaimTag": "sabotage",
  "truthTag": "disabled safety systems, to cut costs",
  "venue": "the Ardsley Works inquiry",
  "agent": {
    "name": "Inspector Grace Mbeki",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Safety credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Chemical Pioneers",
  "dossierName": "CHEMICAL PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Ardsley Works disaster inquiry",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before the inquiry closes. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The WHERE you test determines the dossier you receive, and the conversation costs one day.",
  "overclaimTease": "And beware the answer the front pages crave: the trail leads not to an intruder in the night, but to something quieter — and far harder to forgive.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "manager",
      "items": [
        {
          "id": "manager",
          "label": "Voss — plant manager"
        },
        {
          "id": "operator",
          "label": "The night-shift operator"
        },
        {
          "id": "contractor",
          "label": "The maintenance contractor"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "office",
      "items": [
        {
          "id": "tank",
          "label": "The Storage Tank & Reactor"
        },
        {
          "id": "controlroom",
          "label": "The Plant Control Room"
        },
        {
          "id": "office",
          "label": "The Plant Manager's Office"
        }
      ]
    },
    "what": {
      "title": "What is happening",
      "truth": "disabled",
      "items": [
        {
          "id": "sabotage",
          "label": "Deliberate sabotage by an intruder"
        },
        {
          "id": "freak",
          "label": "An unforeseeable freak accident"
        },
        {
          "id": "disabled",
          "label": "Safety systems disabled to cut costs"
        }
      ]
    }
  },
  "PLACES": {
    "tank": {
      "name": "The Storage Tank & Reactor",
      "xy": [
        140,
        90
      ]
    },
    "controlroom": {
      "name": "The Plant Control Room",
      "xy": [
        330,
        240
      ]
    },
    "office": {
      "name": "The Plant Manager's Office",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "tank",
      "controlroom"
    ],
    [
      "controlroom",
      "office"
    ]
  ],
  "CHARACTERS": {
    "operator": {
      "name": "Operator Sahni",
      "role": "Night-shift operator",
      "face": "🎛",
      "badge": "O",
      "legend": "the control room",
      "hint": "Watched the pressure climb with the scrubber offline and the flare cold."
    },
    "safety": {
      "name": "The Safety Officer",
      "role": "Process-safety officer",
      "face": "🧯",
      "badge": "S",
      "legend": "the plant",
      "hint": "Filed reports warning the interlocks were bypassed; they were shelved."
    },
    "driver": {
      "name": "Tanker Driver Vale",
      "role": "Chemical tanker driver",
      "face": "🛢",
      "badge": "D",
      "legend": "the yard",
      "hint": "Knows what was stored, how much, and that the refrigeration was off."
    }
  },
  "TOPICMAP": {
    "tank": {
      "operator": [
        "stoichiometry"
      ],
      "safety": [
        "kinetics"
      ],
      "driver": [
        "catalysis"
      ]
    },
    "controlroom": {
      "operator": [
        "highpressure"
      ],
      "safety": [
        "distillation"
      ],
      "driver": [
        "dispersion"
      ]
    },
    "office": {
      "operator": [
        "inherentsafety"
      ],
      "safety": [
        "nearmiss"
      ],
      "driver": [
        "ammonia"
      ]
    }
  },
  "TOPICS": {
    "stoichiometry": {
      "sci": "Antoine Lavoisier (1743-1794)",
      "topic": "Conservation of mass & stoichiometry",
      "lede": "The tax-farmer chemist who weighed the world before and after every reaction and proved that matter is never truly lost.",
      "no": 1,
      "profile": "Antoine Lavoisier is called the father of modern chemistry, and his central tool was the balance. Working in Paris in the 1770s and 1780s, often with his wife and collaborator Marie-Anne Paulze, he weighed reactants and products with obsessive care in sealed vessels, and showed that the total mass never changed. When a metal rusted and gained weight, the surrounding air lost exactly that much; nothing was created or destroyed. From this he demolished the reigning 'phlogiston' theory, identified and named oxygen and hydrogen, and explained combustion as a combination with oxygen rather than the loss of a mysterious fire-substance.\n\nHis 1789 Elementary Treatise on Chemistry laid out a new quantitative language: reactions could be written as balanced accounts in which every atom is tracked. This is the root of stoichiometry — the arithmetic of how much reacts with how much, and how much must result. A chemical engineer lives inside that arithmetic, because a plant is a giant ledger of mass in and mass out. Lavoisier's own life ended under the guillotine in 1794, a victim of the Terror, but his bookkeeping outlived the politics that killed him.\n\nFor this board, conservation of mass is the first discipline. A known mass of a reactive chemical sat in that tank, and a known contaminant reached it; the gas that rolled over the town did not appear from nowhere, and it can be weighed backward to its source. Mass balance turns a 'freak' cloud into an accountable event and denies the saboteur his mystery. If the inputs were on the inventory sheet all along, then what happened was foreseeable arithmetic, not sorcery — and the real question becomes who let those inputs meet.",
      "frame": "Sahni's hands are steady on the log. \"I recorded every gauge that night, to the minute. The mass doesn't lie, even when people do. Balance a reaction for me before I show you my sheet.\"",
      "q": [
        {
          "q": "What did Lavoisier's law of conservation of mass establish?",
          "o": [
            {
              "t": "In a closed reaction the total mass stays the same, whatever new substances form.",
              "v": "expert",
              "fb": "Mass is conserved; atoms primarily rearrange, they are rarely lost or gained."
            },
            {
              "t": "A little mass is quietly consumed each time a reaction runs to completion.",
              "v": "wrong",
              "fb": "No mass vanishes; Lavoisier proved the totals generally match exactly."
            },
            {
              "t": "Mass turns freely into heat in ordinary chemistry, so the books rarely balance.",
              "v": "wrong",
              "fb": "Ordinary reactions conserve mass; the heat carries no measurable weight."
            },
            {
              "t": "The count of molecules is fixed, though their combined mass may drift over time.",
              "v": "partial",
              "fb": "Molecule counts can change; it is the total mass that stays constant."
            }
          ]
        },
        {
          "q": "What is stoichiometry, in Lavoisier's tradition?",
          "o": [
            {
              "t": "The arithmetic of what reacts with what, and how much product results.",
              "v": "expert",
              "fb": "Stoichiometry is the quantitative bookkeeping of a balanced reaction."
            },
            {
              "t": "The study of how fast a reaction goes once its ingredients are combined.",
              "v": "wrong",
              "fb": "That is kinetics; stoichiometry is about amounts, not rates."
            },
            {
              "t": "A rule that reactions generally yield equal masses of every product formed.",
              "v": "wrong",
              "fb": "Products differ in mass; primarily the grand total is conserved."
            },
            {
              "t": "The measure of how much heat a given reaction will release when it runs.",
              "v": "partial",
              "fb": "That is thermochemistry; stoichiometry counts the matter, not the heat."
            }
          ]
        },
        {
          "q": "Why does mass balance matter to reading this disaster?",
          "o": [
            {
              "t": "A known chemical met a known contaminant, so the cloud traces back, in the record, in use.",
              "v": "expert",
              "fb": "Accountable inputs make the release traceable, not a mystery."
            },
            {
              "t": "It is presented as showing the gas was smuggled in, since clouds this large does not form on site.",
              "v": "danger",
              "fb": "The mass was already on the inventory; no intruder was needed to supply it."
            },
            {
              "t": "It shows the event was pure chance, since mass can appear without any source, on site.",
              "v": "danger",
              "fb": "Mass rarely appears from nowhere; the source was on the books."
            },
            {
              "t": "It lets the board weigh the wreckage and stop there, ignoring what was stored, in use.",
              "v": "partial",
              "fb": "Weighing helps, but the stored inventory is the point of the balance."
            }
          ]
        }
      ]
    },
    "kinetics": {
      "sci": "Svante Arrhenius (1859-1927)",
      "topic": "Reaction rate & activation energy",
      "lede": "The Swede whose thesis nearly failed him, then won a Nobel — and whose equation explains why a warm tank is a fast tank.",
      "no": 2,
      "profile": "Svante Arrhenius was a Swedish physical chemist whose doctoral thesis on the dissociation of electrolytes earned a barely-passing grade in 1884 and, twenty years later, the 1903 Nobel Prize in Chemistry. Among his lasting gifts is the Arrhenius equation of 1889, which describes how reaction rate depends on temperature. It captures a simple, ferocious idea: molecules must clear an energy barrier — the activation energy — before they can react, and the fraction with enough energy to do so climbs steeply as temperature rises. As a rule of thumb, many reactions roughly double in rate for every ten-degree rise.\n\nActivation energy is the hill reactants must climb to reach products, and temperature is what gives molecules the speed to climb it. This is why a reaction that crawls in the cold can race when warmed, and why the two feed on each other in a heated vessel: a faster reaction releases heat faster, which raises the temperature, which speeds the reaction further. Arrhenius, remarkably, also first estimated how carbon dioxide warms the planet — another case of a small change in conditions producing an outsized effect.\n\nFor this board, kinetics is the reason refrigeration is a safety system, not a convenience. A reactive chemical kept cold reacts slowly enough to be controlled; let its temperature climb, and Arrhenius's exponential takes over, driving the rate up and up until control is lost. The refrigeration that was switched off at Ardsley was the brake on that exponential. Understanding activation energy tells the board that the disaster's speed was not an unforeseeable surprise but the predictable consequence of removing the one control that kept the reaction cold and slow.",
      "frame": "Taps a temperature chart, cold and level. \"I warned them what happens when this line climbs. It is not linear. Show me you understand why heat feeds a reaction, and you will understand my reports.\"",
      "q": [
        {
          "q": "What is activation energy?",
          "o": [
            {
              "t": "The energy barrier reactants must clear before they can turn into products.",
              "v": "expert",
              "fb": "Activation energy is the hill molecules climb for a reaction to occur."
            },
            {
              "t": "The total heat a reaction gives off once it has finally gone to completion.",
              "v": "wrong",
              "fb": "That is the heat of reaction; activation energy is the barrier to start."
            },
            {
              "t": "The energy stored permanently in the products after the reaction is over.",
              "v": "wrong",
              "fb": "Activation energy is spent reaching the transition, not stored after."
            },
            {
              "t": "The minimum amount of reactant needed before any reaction can begin at all.",
              "v": "partial",
              "fb": "That is a quantity of matter, not the energy barrier Arrhenius described."
            }
          ]
        },
        {
          "q": "How does temperature affect reaction rate?",
          "o": [
            {
              "t": "Rate climbs steeply with temperature, often roughly doubling per ten degrees.",
              "v": "expert",
              "fb": "More molecules clear the barrier as it warms, so the rate soars."
            },
            {
              "t": "Rate falls as things heat up, because hot molecules collide too gently to react.",
              "v": "wrong",
              "fb": "Hotter molecules collide harder and more often, speeding the reaction."
            },
            {
              "t": "Rate is fixed by the chemicals alone and does not respond to temperature.",
              "v": "wrong",
              "fb": "The Arrhenius equation makes rate strongly temperature-dependent."
            },
            {
              "t": "Rate rises in a gentle straight line, adding a little for each degree of heat.",
              "v": "partial",
              "fb": "The rise is exponential, not linear, which makes runaway so sudden."
            }
          ]
        },
        {
          "q": "Why does kinetics make refrigeration a safety system?",
          "o": [
            {
              "t": "Cold keeps a reactive chemical slow; losing cooling lets the rate run away.",
              "v": "expert",
              "fb": "Refrigeration is the brake on the Arrhenius exponential."
            },
            {
              "t": "Cooling primarily saves money on power, so switching it off changed nothing chemical.",
              "v": "danger",
              "fb": "Cooling holds the rate down; losing it is a direct safety failure."
            },
            {
              "t": "The temperature could rarely have climbed on its own without an intruder's help.",
              "v": "danger",
              "fb": "An exothermic reaction heats itself; no saboteur is required."
            },
            {
              "t": "Refrigeration matters primarily for storage life, rarely for the speed of a reaction.",
              "v": "partial",
              "fb": "It also throttles reaction rate, which is the safety-critical role here."
            }
          ]
        }
      ]
    },
    "catalysis": {
      "sci": "Paul Sabatier (1854-1941)",
      "topic": "Catalysis",
      "lede": "The chemist who turned cheap nickel into a magic wand for hydrogen, and showed the best catalyst holds on just tightly enough.",
      "no": 3,
      "profile": "Paul Sabatier was a French chemist who shared the 1912 Nobel Prize for discovering that finely divided metals, especially nickel, could catalyze the addition of hydrogen to organic compounds. Working at Toulouse, he found that passing an unsaturated vapor over hot nickel would hydrogenate it cleanly — a method that transformed the food, fuel, and chemical industries and still underlies the hardening of oils and much of modern synthesis. A catalyst, he showed, speeds a reaction by offering an easier path, lowering the activation energy, while emerging unchanged itself.\n\nSabatier also articulated a principle that still guides catalyst design: the best catalyst binds the reacting species neither too weakly nor too strongly. Bind too weakly and nothing sticks to react; bind too strongly and the products never let go. This 'just right' optimum — later drawn as a volcano-shaped curve — captures why a particular metal, at a particular condition, can dramatically accelerate a reaction that would otherwise barely proceed. A pinch of the right material changes everything, though it never appears in the final tally of products.\n\nFor this board, catalysis is the hidden accelerant. The very metals a plant is built from — iron and its rust, traces shed by corroding pipes and walls — can catalyze the reactions of the chemicals they contain, speeding a slow decomposition into a fast one. This is not exotic sabotage; it is ordinary industrial chemistry, and it is exactly why contamination and corrosion products are treated as hazards, not curiosities. When a reaction ran far faster than the clean chemistry alone predicts, Sabatier's lesson tells the board to look for a catalyst that should never have been allowed into the tank.",
      "frame": "Vale leans on the tanker. \"A speck of the wrong metal and the whole load turns on you. I've hauled enough to know. Show me you understand a catalyst, and I'll tell you what was in that tank.\"",
      "q": [
        {
          "q": "What does a catalyst do to a reaction?",
          "o": [
            {
              "t": "It speeds the reaction by lowering activation energy, and is not used up.",
              "v": "expert",
              "fb": "A catalyst offers an easier path and emerges unchanged."
            },
            {
              "t": "It is used up steadily as it drives the reaction toward its products.",
              "v": "wrong",
              "fb": "A true catalyst is regenerated, not consumed, as it works."
            },
            {
              "t": "It raises how much product forms by shifting the final equilibrium point.",
              "v": "wrong",
              "fb": "A catalyst speeds arrival at equilibrium but does not move it."
            },
            {
              "t": "It slows a runaway reaction down by soaking up the heat that it releases.",
              "v": "partial",
              "fb": "Catalysts change rate, not heat capacity, and typically speed things up."
            }
          ]
        },
        {
          "q": "What is Sabatier's principle of 'just right' binding?",
          "o": [
            {
              "t": "The best catalyst binds the reactants neither too weakly nor too strongly.",
              "v": "expert",
              "fb": "An intermediate binding strength gives the fastest catalytic turnover."
            },
            {
              "t": "The strongest possible binding generally yields the most effective catalyst.",
              "v": "wrong",
              "fb": "Bind too strongly and the products rarely release; strength is not all."
            },
            {
              "t": "The catalyst should rarely touch the reactants, primarily warm them from nearby.",
              "v": "wrong",
              "fb": "Catalysis requires the reactants to bind to the catalyst surface."
            },
            {
              "t": "Any metal works equally, so the choice of catalyst hardly matters at all.",
              "v": "partial",
              "fb": "The right metal at the right condition matters enormously."
            }
          ]
        },
        {
          "q": "How might catalysis have driven this reaction faster?",
          "o": [
            {
              "t": "Metal shed by corroding pipes can catalyze the load, speeding a slow decay.",
              "v": "expert",
              "fb": "Corrosion products are a known, ordinary catalytic hazard."
            },
            {
              "t": "primarily a planted catalyst smuggled in could make the reaction move this fast.",
              "v": "danger",
              "fb": "The plant's own corroded metal supplies the catalyst; no smuggling needed."
            },
            {
              "t": "Such acceleration is a total fluke that no chemist could ever have foreseen.",
              "v": "danger",
              "fb": "Catalysis by contaminants is well known and largely foreseeable."
            },
            {
              "t": "The reaction sped up primarily because the tank was simply filled too full.",
              "v": "partial",
              "fb": "Overfilling matters, but a catalyst changes the rate itself."
            }
          ]
        }
      ]
    },
    "highpressure": {
      "sci": "Carl Bosch (1874-1940)",
      "topic": "High-pressure vessels & relief",
      "lede": "The engineer who tamed reactions at hundreds of atmospheres and learned, the hard way, how to keep a vessel from bursting.",
      "no": 4,
      "profile": "Carl Bosch was a German chemist and engineer who took Fritz Haber's laboratory synthesis of ammonia and turned it into an industry, work that won him the 1931 Nobel Prize in Chemistry. The challenge was pressure: the reaction demanded hundreds of atmospheres and high temperature, conditions that destroyed ordinary steel vessels through hydrogen attack, which weakened the metal from within. Bosch and his team at BASF invented reactors with a soft inner liner and a perforated outer shell that let hydrogen escape safely, and pioneered the metallurgy and mechanical design of vessels that could contain enormous pressures for years without failing.\n\nBosch's world taught the discipline of the pressure envelope. A vessel has a maximum it can safely hold, and every high-pressure system must therefore include a way to relieve pressure before it reaches that limit — a relief valve or rupture disk that opens to vent the contents to a safe place rather than let the vessel explode. The vented material is then routed to be neutralized or burned, never simply dumped. Bosch's plants ran because their designers respected that the container is only as safe as its weakest relief path.\n\nFor this board, the relief train is the safeguard that failed. A tank whose pressure climbs will reach its relief device, which is meant to open and send the escaping gas onward to a scrubber and a flare that render it harmless. If those downstream systems were offline, the relief valve did its job and simply delivered raw toxic gas straight to the atmosphere. Bosch's engineering shows the board that a relief valve lifting is not itself the disaster; the disaster is that what it vented had nowhere safe to go, because the systems meant to catch it were shut down.",
      "frame": "Sahni gestures at the panel. \"When the pressure hit the relief, it lifted, exactly as designed. The horror is what it lifted into. Show me you know how relief is supposed to work.\"",
      "q": [
        {
          "q": "Why does a high-pressure vessel need a relief device?",
          "o": [
            {
              "t": "To vent contents before pressure exceeds what the vessel can hold.",
              "v": "expert",
              "fb": "Relief opens below the limit so the vessel rarely bursts."
            },
            {
              "t": "To let the operator top the vessel up with more product during a run.",
              "v": "wrong",
              "fb": "Relief is for venting excess pressure, not for adding material."
            },
            {
              "t": "To keep the vessel warm by trapping the heat that the reaction gives off.",
              "v": "wrong",
              "fb": "Relief releases pressure; it does not manage the vessel's heat."
            },
            {
              "t": "To hold the pressure as high as possible for the best reaction yield.",
              "v": "partial",
              "fb": "Yield aside, the relief's job is safety, capping pressure, not raising it."
            }
          ]
        },
        {
          "q": "What problem did Bosch solve in high-pressure reactors?",
          "o": [
            {
              "t": "Hydrogen weakening steel, which he beat with a lined, vented shell.",
              "v": "expert",
              "fb": "His liner-and-vent design let vessels survive years at high pressure."
            },
            {
              "t": "Reactors freezing solid, which he fixed by wrapping them in heavy insulation.",
              "v": "wrong",
              "fb": "His challenge was hydrogen embrittlement, not freezing."
            },
            {
              "t": "Catalysts wearing out, which he cured by switching to a cheaper metal.",
              "v": "wrong",
              "fb": "His breakthrough was vessel metallurgy, not catalyst replacement."
            },
            {
              "t": "Reactions running too slowly, which he solved by simply raising the heat.",
              "v": "partial",
              "fb": "Heat helped the reaction, but his fame is containing the pressure safely."
            }
          ]
        },
        {
          "q": "What does it mean if a relief valve vented straight to the air?",
          "o": [
            {
              "t": "The valve worked, but its scrubber and flare weren't there to catch it, in use.",
              "v": "expert",
              "fb": "Relief lifting is normal; venting raw gas means the catch systems failed."
            },
            {
              "t": "The valve is likely to have been sabotaged to open, since relief valves rarely lift.",
              "v": "danger",
              "fb": "Relief valves are designed to lift; the failure was downstream, not sabotage."
            },
            {
              "t": "A freak overpressure no design could handle simply overwhelmed everything.",
              "v": "danger",
              "fb": "The relief path was designed for exactly this; the catch systems were absent."
            },
            {
              "t": "The vessel itself had ruptured, which is the primarily way gas ever reaches the air.",
              "v": "partial",
              "fb": "An intact vessel can vent through relief; rupture is not required."
            }
          ]
        }
      ]
    },
    "distillation": {
      "sci": "George E. Davis (1850-1907)",
      "topic": "Separation & distillation",
      "lede": "The British factory inspector who saw the same operations in every works he visited, and named a whole profession.",
      "no": 5,
      "profile": "George E. Davis was a British chemical engineer and, before that, a government inspector under the Alkali Acts, charged with policing the emissions of chemical works. Traveling from factory to factory, he noticed that the same basic operations — distilling, evaporating, absorbing, filtering — recurred everywhere, regardless of the product, and he was among the first to teach chemistry as engineering. His 1887 lectures at the Manchester Technical School and his 1901 'A Handbook of Chemical Engineering' laid out the field, and many credit him, alongside American figures, as a founder of the discipline.\n\nDavis's world centered on separation, and the archetype is distillation: exploiting differences in volatility to split a mixture, boiling off the lighter components and condensing them apart from the heavier ones. The same physics of preferential transfer between phases governs absorption, in which a gas is scrubbed by contacting it with a liquid that selectively dissolves or reacts with the unwanted component. A scrubber is, in essence, a separation unit whose product is a clean gas stream and a captured contaminant — the very safeguard meant to catch a toxic release.\n\nFor this board, Davis matters twice. As an inspector, he embodies the idea that a chemical works owes the public around it a duty, enforced by someone whose job is to check the emissions — the ancestor of the very inquiry now underway. As a separations engineer, he explains what the plant's scrubber was for: to absorb escaping gas into a reactive liquid and render it harmless before it left the site. If that scrubber was drained, cold, or bypassed, the one unit designed to separate poison from air was simply not doing the job Davis's science says it should. The board should ask why the separation never happened.",
      "frame": "The Safety Officer's tone sharpens. \"I came up watching inspectors check what a plant let out. The scrubber is a separator, nothing mystical. Tell me how it should work, and I'll tell you what it wasn't doing.\"",
      "q": [
        {
          "q": "What principle underlies distillation?",
          "o": [
            {
              "t": "Separating a mixture by volatility, boiling and condensing apart.",
              "v": "expert",
              "fb": "Distillation exploits how readily each component vaporizes."
            },
            {
              "t": "Filtering a mixture through a fine mesh that traps the heavier molecules.",
              "v": "wrong",
              "fb": "That is filtration; distillation works by volatility, not sieving."
            },
            {
              "t": "Freezing a mixture so the parts separate cleanly into distinct solid layers.",
              "v": "wrong",
              "fb": "That is crystallization; distillation relies on boiling differences."
            },
            {
              "t": "Spinning a mixture so its denser components are flung to the outer wall.",
              "v": "partial",
              "fb": "That is centrifugation; distillation separates by volatility instead."
            }
          ]
        },
        {
          "q": "How does a gas scrubber work?",
          "o": [
            {
              "t": "It contacts the gas with a liquid that selectively absorbs the unwanted part.",
              "v": "expert",
              "fb": "A scrubber dissolves or reacts away the hazard, cleaning the stream."
            },
            {
              "t": "It burns the gas substantially, leaving primarily water vapor behind to vent away.",
              "v": "wrong",
              "fb": "That describes a flare; a scrubber absorbs into a liquid instead."
            },
            {
              "t": "It cools the gas until every component condenses back into a liquid at once.",
              "v": "wrong",
              "fb": "A scrubber selectively absorbs; it does not condense the whole stream."
            },
            {
              "t": "It filters solid particles out of the gas but leaves the vapors untouched.",
              "v": "partial",
              "fb": "Scrubbers target vapors chemically, not just particulate matter."
            }
          ]
        },
        {
          "q": "What if the scrubber was drained or bypassed during the release?",
          "o": [
            {
              "t": "The one unit meant to absorb the poison was not separating it from the air.",
              "v": "expert",
              "fb": "A dead scrubber lets the hazard pass straight through untreated."
            },
            {
              "t": "It means an intruder is likely to have poisoned the scrubbing liquid on purpose.",
              "v": "danger",
              "fb": "A drained or bypassed scrubber needs no intruder; it was simply offline."
            },
            {
              "t": "Nothing changes, since scrubbers are optional polish, not real safety gear.",
              "v": "danger",
              "fb": "The scrubber is a primary safeguard; without it, poison reaches the public."
            },
            {
              "t": "The gas was cleaned anyway, because scrubbing happens naturally in the pipe.",
              "v": "partial",
              "fb": "Absorption needs the scrubber's liquid contact; it does not just happen."
            }
          ]
        }
      ]
    },
    "dispersion": {
      "sci": "Frank Pasquill (1914-1994)",
      "topic": "Gas dispersion & the plume",
      "lede": "The British meteorologist who sorted the sky into six moods and predicted how far a poison cloud would carry on each.",
      "no": 6,
      "profile": "Frank Pasquill was a British meteorologist who developed the practical framework for predicting how gases and pollutants disperse in the atmosphere. In 1961 he introduced a classification of atmospheric stability — the Pasquill stability classes, labeled A through F, running from very unstable, turbulent daytime conditions to very stable, calm nighttime ones. Combined with the Gaussian plume model, these classes let engineers estimate how a release spreads: how wide the plume grows, how much it dilutes, and what concentration reaches a given distance downwind.\n\nThe crucial insight is that the same quantity of gas can be harmless or lethal depending on the weather. On a sunny, gusty afternoon (an unstable class), turbulence stirs a release upward and dilutes it fast. On a still, clear night with a temperature inversion (a stable class), the cloud stays low, narrow, and concentrated, hugging the ground and traveling far before it thins. Wind speed, time of day, and the vertical temperature profile decide the difference between a scare and a catastrophe. Pasquill turned that into numbers a planner could use.\n\nFor this board, dispersion explains why a midnight release was so deadly, and why that is not an excuse. A cloud let loose at night, under a stable inversion and light wind, behaved exactly as Pasquill's classes predict: it clung to the ground and rolled over the sleeping town at high concentration. This is not an unforeseeable freak of weather; nighttime stable conditions are ordinary and well understood, and any plant handling toxic gas must assume a release could occur under the worst dispersion, not the best. The severity was set by physics anyone could have modeled — which is precisely why the missing safeguards, not the weather, are on trial.",
      "frame": "Vale looks toward the town. \"That cloud didn't rise and blow off. It laid down and crawled, on a still night, right where the people were. Tell me how a plume behaves, and you'll see it wasn't the weather's fault.\"",
      "q": [
        {
          "q": "What do Pasquill's stability classes describe?",
          "o": [
            {
              "t": "How turbulent or calm the air is, which sets how a release disperses.",
              "v": "expert",
              "fb": "The classes rank conditions from turbulent to stable for dispersion."
            },
            {
              "t": "How toxic a given gas is to a person exposed for a fixed length of time.",
              "v": "wrong",
              "fb": "That is toxicity; the classes describe the atmosphere, not the gas."
            },
            {
              "t": "How much gas a plant is legally permitted to release in a single day.",
              "v": "wrong",
              "fb": "They are meteorological categories, not emission permits."
            },
            {
              "t": "How quickly a chemical reacts once it has been carried into open air.",
              "v": "partial",
              "fb": "They govern physical spreading, not the gas's chemical reactivity."
            }
          ]
        },
        {
          "q": "Why is a still, clear night the worst case for a release?",
          "o": [
            {
              "t": "A stable inversion keeps the cloud low and concentrated as it drifts.",
              "v": "expert",
              "fb": "Stable air traps the plume near the ground at high concentration."
            },
            {
              "t": "Warm turbulent night air lifts the cloud and dilutes it almost immediately.",
              "v": "wrong",
              "fb": "Nights are typically stable, not turbulent; the cloud stays low."
            },
            {
              "t": "Rain at night generally scrubs the cloud from the sky before it can travel.",
              "v": "wrong",
              "fb": "A clear stable night has no rain to scrub it; the plume persists."
            },
            {
              "t": "Strong night winds tear the cloud apart faster than any daytime breeze.",
              "v": "partial",
              "fb": "Stable nights usually bring light winds, which concentrate the plume."
            }
          ]
        },
        {
          "q": "What does dispersion imply about calling this a freak of weather?",
          "o": [
            {
              "t": "Nighttime stable air is ordinary, so the severe spread was foreseeable, under load.",
              "v": "expert",
              "fb": "The worst-case dispersion is routine and should have been planned for."
            },
            {
              "t": "The weather was so freakish that no plant could have prepared for the cloud, in use.",
              "v": "danger",
              "fb": "Stable night air is common; assuming it is basic safety planning."
            },
            {
              "t": "The concentration is presented as showing the gas was released by an intruder to maximize harm.",
              "v": "danger",
              "fb": "The physics of a night plume needs no intruder to explain its severity."
            },
            {
              "t": "Dispersion is unpredictable, so the harm downwind could rarely be estimated, in use.",
              "v": "partial",
              "fb": "Pasquill's models estimate it well; the outcome was quite predictable."
            }
          ]
        }
      ]
    },
    "inherentsafety": {
      "sci": "Trevor Kletz (1922-2013)",
      "topic": "Inherently safer design",
      "lede": "The plant chemist who, after a fatal blast, spent his life arguing that what you don't have can't leak.",
      "no": 7,
      "profile": "Trevor Kletz was a British chemical engineer at ICI who, after a fatal explosion at a plant in 1974, became the conscience of process safety. He is credited with founding the philosophy of inherently safer design and with helping develop and popularize HAZOP, the systematic hazard-and-operability study that walks a design team through every way a process can deviate and go wrong. Prolific and quotable, he distilled hard lessons into memorable slogans, the most famous being 'What you don't have can't leak.'\n\nKletz drew a sharp distinction between adding safety and building it in. Bolt-on safety — alarms, scrubbers, interlocks, relief systems — reduces risk but can fail, be bypassed, or be switched off. Inherently safer design instead removes the hazard at the source: store less of a dangerous material (minimize inventory), use a less hazardous substance where possible (substitution), run at gentler conditions (moderation), and simplify to cut the ways things can fail. A plant that keeps only a small quantity of a toxic intermediate cannot release a large one, no matter how many add-on systems fail. He wrote extensively on Bhopal, arguing it exemplified everything he warned against.\n\nFor this board, Kletz is the measure of what went wrong. A plant that stored a huge inventory of a lethal chemical, and leaned entirely on a stack of add-on safeguards to contain it, was fragile by design — and those very add-ons were the systems found disabled. Kletz would note first that the enormous stored quantity should never have existed, and second that relying on switch-off-able safeguards is exactly the trap he spent decades warning against. His lens turns 'freak accident' into 'foreseeable and foreseen,' and points the board straight at the decisions that chose cost over inherent safety.",
      "frame": "Sahni lowers his voice near the office door. \"The safest tank is the one that's nearly empty. He filled ours to the brim and trusted the gadgets. Show me you understand inherent safety, and you'll see the choice that was made.\"",
      "q": [
        {
          "q": "What is the core idea of inherently safer design?",
          "o": [
            {
              "t": "Remove the hazard at its source rather than relying on add-on safeguards.",
              "v": "expert",
              "fb": "Inherent safety eliminates the danger instead of merely containing it."
            },
            {
              "t": "Add as many alarms and interlocks as possible around a dangerous process.",
              "v": "wrong",
              "fb": "That is bolt-on safety, the very thing Kletz contrasted it against."
            },
            {
              "t": "Train operators so thoroughly that no hazard can ever catch them off guard.",
              "v": "wrong",
              "fb": "Training helps, but inherent safety changes the design, not the people."
            },
            {
              "t": "Insure the plant heavily so any loss from a hazard is fully covered.",
              "v": "partial",
              "fb": "Insurance handles cost after the fact; inherent safety removes the hazard."
            }
          ]
        },
        {
          "q": "What did Kletz mean by 'what you don't have can't leak'?",
          "o": [
            {
              "t": "Storing less hazardous material means less can ever be released.",
              "v": "expert",
              "fb": "Minimizing inventory caps the worst possible release at the source."
            },
            {
              "t": "Sealing a tank perfectly ensures its full contents can rarely escape at all.",
              "v": "wrong",
              "fb": "His point was about not storing the hazard, not about better seals."
            },
            {
              "t": "Hidden materials are safe, so hazards should be kept out of public view.",
              "v": "wrong",
              "fb": "He meant reducing inventory, not concealing what is stored."
            },
            {
              "t": "A chemical is harmless as long as it stays sealed inside its own vessel.",
              "v": "partial",
              "fb": "Vessels fail; his point was to store little, so failure matters less."
            }
          ]
        },
        {
          "q": "How does Kletz's lens read this plant's design?",
          "o": [
            {
              "t": "A huge toxic inventory behind switch-off-able safeguards was fragile, in use.",
              "v": "expert",
              "fb": "Large inventory plus bolt-on safety is exactly the trap he warned of."
            },
            {
              "t": "The plant was inherently safe, so the release is likely to have been forced by sabotage.",
              "v": "danger",
              "fb": "Storing a large hazard behind add-ons is the opposite of inherently safe."
            },
            {
              "t": "The disaster was unforeseeable, since no one could predict a safeguard failing.",
              "v": "danger",
              "fb": "Kletz spent decades foreseeing exactly this; it was predictable."
            },
            {
              "t": "The add-on safeguards made large inventory perfectly acceptable to store, in use.",
              "v": "partial",
              "fb": "Add-ons can fail or be bypassed, which is why inventory should be small."
            }
          ]
        }
      ]
    },
    "nearmiss": {
      "sci": "Herbert Heinrich (1886-1962)",
      "topic": "The accident triangle & near-misses",
      "lede": "The insurance man who counted thousands of mishaps and drew the pyramid that says every death has a crowd of warnings beneath it.",
      "no": 8,
      "profile": "Herbert William Heinrich was an American safety engineer working for an insurance company when, in his 1931 book 'Industrial Accident Prevention,' he proposed a model that has shaped workplace safety ever since. Studying large numbers of incident reports, he suggested a rough ratio — often drawn as a triangle — in which for every serious injury there were many more minor injuries and a far larger base of no-injury near-misses. The famous figures, one major to twenty-nine minor to three hundred with no injury, are his; later researchers have questioned the exact numbers, but the underlying shape endures.\n\nHeinrich's real contribution was the idea that serious accidents are not isolated bolts from the blue but the visible tip of a pyramid of lesser events sharing common causes. If the broad base of near-misses and minor incidents is watched and acted upon, the rare catastrophe at the apex can often be prevented, because it springs from the same unsafe conditions. He also advanced a 'domino' model of accident causation, in which removing one contributing factor can stop the sequence. His work made near-miss reporting a cornerstone of process safety, even where his precise ratios are debated.\n\nFor this board, Heinrich's triangle asks a pointed question: what was happening at the base of the pyramid before the catastrophe at the apex? A major toxic release does not usually arrive without a history of smaller leaks, alarms, and near-misses beneath it, each a warning that shared the same root causes. If those warnings were logged and ignored, then the disaster was foreseeable in the most literal sense — it was foreseen, in the near-miss record, and not acted upon. That record is evidence, and it turns 'freak accident' into a story of ignored warnings.",
      "frame": "Slides a folder across. \"Every big one sits on top of small ones nobody wanted to see. I logged the small ones. Show me you understand the triangle, and read what's in here.\"",
      "q": [
        {
          "q": "What does Heinrich's accident triangle claim?",
          "o": [
            {
              "t": "Each serious injury sits atop many minor ones and far more near-misses.",
              "v": "expert",
              "fb": "The triangle links rare disasters to a broad base of lesser events."
            },
            {
              "t": "Serious accidents strike at random, with no smaller events beneath them.",
              "v": "wrong",
              "fb": "The triangle's whole point is a base of warnings under each disaster."
            },
            {
              "t": "Minor injuries and major ones occur in exactly equal numbers over time.",
              "v": "wrong",
              "fb": "Heinrich's ratios are steeply weighted toward minor and near-miss events."
            },
            {
              "t": "primarily injuries that require hospital care are worth counting or recording.",
              "v": "partial",
              "fb": "The near-miss base, with no injury at all, is the most important to track."
            }
          ]
        },
        {
          "q": "Why do near-misses matter for preventing disasters?",
          "o": [
            {
              "t": "They share the catastrophe's root causes, so acting on them prevents it.",
              "v": "expert",
              "fb": "Near-misses reveal the same hazards before the big event arrives."
            },
            {
              "t": "They are harmless flukes, so recording them wastes an operator's time.",
              "v": "wrong",
              "fb": "Near-misses are the early warnings that could stop the disaster."
            },
            {
              "t": "They matter primarily to the insurer's paperwork, not to actual plant safety.",
              "v": "wrong",
              "fb": "They are frontline safety intelligence, not mere paperwork."
            },
            {
              "t": "They predict primarily the timing of a disaster, rarely its underlying cause.",
              "v": "partial",
              "fb": "They expose the shared causes, which is what lets prevention work."
            }
          ]
        },
        {
          "q": "How does the triangle reframe this 'freak' disaster?",
          "o": [
            {
              "t": "A history of ignored leaks and alarms means the catastrophe was foreseen, under load.",
              "v": "expert",
              "fb": "A logged near-miss record turns a freak into a warning unheeded."
            },
            {
              "t": "The apex event came without warning, so no near-misses could have preceded it, in use.",
              "v": "danger",
              "fb": "Major releases almost generally sit on a base of ignored near-misses."
            },
            {
              "t": "Such a disaster can primarily mean an intruder bypassed a spotless safety record, in use.",
              "v": "danger",
              "fb": "A near-miss trail points to internal warnings, not an outside intruder."
            },
            {
              "t": "Near-misses does not be linked to the final event, so the record is presented as showing nothing.",
              "v": "partial",
              "fb": "Shared root causes link them directly; the record is strong evidence."
            }
          ]
        }
      ]
    },
    "ammonia": {
      "sci": "Fritz Haber (1868-1934)",
      "topic": "The Haber process & dual-use",
      "lede": "The chemist who pulled bread from the air and poison gas from the same genius, and never escaped either legacy.",
      "no": 9,
      "profile": "Fritz Haber was a German chemist whose 1918 Nobel Prize recognized his synthesis of ammonia from atmospheric nitrogen and hydrogen — the reaction, industrialized by Carl Bosch, that made synthetic fertilizer possible and now helps feed billions. It was one of the most consequential discoveries in history, breaking the natural limit on how much food the land could yield. Yet the same Haber personally led Germany's chemical-weapons program in the First World War, directing the first large-scale use of chlorine gas at Ypres in 1915. His wife Clara Immerwahr, herself a chemist, died by suicide days after that attack.\n\nHaber embodies the principle of dual use: that the same chemistry, the same knowledge, and often the same substances can nourish or kill depending on how they are handled. Ammonia feeds crops and also underlies explosives; the industrial gases that make pesticides can themselves be lethal. Chemistry is not moral or immoral in itself; the danger lies in scale, intent, and control. Haber's fertilizers saved untold lives even as his gases took them, and history has never quite settled the ledger of a man who was both benefactor and war criminal.\n\nFor this board, Haber's dual-use lesson cuts against the sensational story. A plant like Ardsley handles intrinsically dangerous chemistry for an ordinary industrial purpose, making something useful from substances that are lethal if released. The presence of a deadly gas is not evidence of a weapon or a plot; it is the everyday nature of the materials, the same duality Haber lived. The question is never whether the chemistry could kill — of course it could — but whether it was contained. When the containment was stripped away to save money, ordinary industrial poison did what such poison does, no saboteur required.",
      "frame": "Vale caps the tanker valve. \"Same stuff that grows the crops will drop a town if you let it loose. That's just the trade. Show me you get how a useful chemical is also a deadly one.\"",
      "q": [
        {
          "q": "What did the Haber process achieve?",
          "o": [
            {
              "t": "Synthesizing ammonia from air, for fertilizer that now feeds billions.",
              "v": "expert",
              "fb": "Fixing atmospheric nitrogen broke the natural limit on food production."
            },
            {
              "t": "Extracting pure oxygen from the air to enrich industrial furnaces.",
              "v": "wrong",
              "fb": "The process fixes nitrogen into ammonia, not oxygen."
            },
            {
              "t": "Turning coal directly into liquid fuel for wartime engines and vehicles.",
              "v": "wrong",
              "fb": "That is a different process; Haber's fixed nitrogen into ammonia."
            },
            {
              "t": "Distilling ammonia out of animal waste at a far larger industrial scale.",
              "v": "partial",
              "fb": "He synthesized it from air and hydrogen, not by distilling waste."
            }
          ]
        },
        {
          "q": "What does 'dual use' mean in chemistry?",
          "o": [
            {
              "t": "The same chemistry can nourish or kill, by scale, intent, and control, in use.",
              "v": "expert",
              "fb": "Dual use means one science serves both benefit and harm."
            },
            {
              "t": "A chemical can be used primarily once before it is likely to be substantially discarded.",
              "v": "wrong",
              "fb": "Dual use is about two purposes, not a single use before disposal."
            },
            {
              "t": "Two different chemicals are generally required to produce any useful product.",
              "v": "wrong",
              "fb": "Dual use refers to one substance's benign and harmful roles."
            },
            {
              "t": "A substance is safe in industry but dangerous primarily in a laboratory setting.",
              "v": "partial",
              "fb": "The duality is benefit versus harm, not lab versus industry."
            }
          ]
        },
        {
          "q": "How does dual use undercut the sabotage theory?",
          "o": [
            {
              "t": "A deadly gas on site is the ordinary nature of the work, not a plot, in use.",
              "v": "expert",
              "fb": "Lethal chemistry is routine here; its presence implies no weapon."
            },
            {
              "t": "primarily a saboteur would keep such a lethal substance at an industrial plant.",
              "v": "danger",
              "fb": "Lethal intermediates are normal industrial stock, not a saboteur's mark."
            },
            {
              "t": "The gas is presented as showing a secret weapons program was hidden inside the plant.",
              "v": "danger",
              "fb": "Dangerous chemistry is standard here; it signals no clandestine weapon."
            },
            {
              "t": "Such a gas is harmless in industry and primarily dangerous if weaponized first.",
              "v": "partial",
              "fb": "It is lethal either way; the issue is containment, not weaponization."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "operator": {
      "tank": "Sahni stands at the foot of the cold tank, arms wrapped tight. \"I watched this gauge climb for an hour and had nothing left to stop it. Everything I'd have reached for was already dead.\"",
      "controlroom": "Sahni sits at his darkened console, pointing at a muted alarm tile. \"This should have been screaming. It wasn't. I was flying the plant blind and they'd taken my instruments away.\"",
      "office": "Sahni lingers uneasily outside the manager's door. \"The orders came from in here — run lean, defer this, shut that down 'for now.' I only worked the board they handed me.\""
    },
    "safety": {
      "tank": "The Safety Officer gestures at the reactor's dead cooling jacket. \"I put the runaway risk in writing months ago. Cold storage was the whole defense, and look — the refrigeration's been off.\"",
      "controlroom": "The Safety Officer taps a shelved report on the console. \"Every warning I filed ended up in a drawer, not a work order. The scrubber and flare were on that list, both offline.\"",
      "office": "The Safety Officer stands rigid before the filing cabinet. \"My reports are in here somewhere, stamped received and ignored. Someone read them and chose the budget instead.\""
    },
    "driver": {
      "tank": "Vale thumps the tank's shell. \"I filled this to the brim and signed for it. Full of the nasty stuff, and the chiller wasn't even humming when I pulled out.\"",
      "controlroom": "Vale leans in the doorway, unimpressed. \"Your fancy panel's half dark. I don't need it to tell you what was in that tank or how much — I hauled every drop.\"",
      "office": "Vale jerks a thumb at the manager's desk. \"He signed my manifests and knew exactly what was sitting out there. Don't let him act surprised about his own inventory.\""
    }
  },
  "story": [
    "<b>The Ardsley Works</b> begins inside the Ardsley Works inquiry, where the first explanation is already spreading faster than the evidence.",
    "<b>Operator Sahni</b>, <b>The Safety Officer</b>, and <b>Tanker Driver Vale</b> each hold a different part of the record, and each conversation opens with one real pioneer whose work changes how the evidence should be read.",
    "The inquiry keeps circling <b>Deliberate sabotage by an intruder</b> and <b>An unforeseeable freak accident</b>. Both are tempting, and neither can be accepted just because it makes the cleanest headline.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and make the final WHAT judgment from what you learned."
  ],
  "endings": {
    "overclaimWhat": "sabotage",
    "dismissalWhat": "freak",
    "win": {
      "expertTitle": "What the Records Prove, and No More",
      "expert": [
        "Mbeki names it exactly: Voss, the plant manager, who ran the plant lean and ordered the safeguards left broken to cut costs; the truth culminating in the Plant Manager's Office, where the budget orders and the shelved warning reports live; and safety systems deliberately disabled — the scrubber drained, the flare cold, the refrigeration off, the interlocks bypassed — so a routine upset became a catastrophe. Not a saboteur. Not an act of fate.",
        "Every column accounted for. Mbeki worked the tank, the control room, and the office, turned a vindicated safety officer and a haunted operator into witnesses, and claimed precisely what the records and the near-miss log could defend. The inquiry issues findings that fix the design and name the decision that killed a town — which is the entire point of doing it right."
      ],
      "soundTitle": "Right — but Lightly Proven",
      "sound": [
        "Mbeki names the right three — Voss, the Plant Manager's Office, and safety systems disabled to cut costs. The shape of the case is correct, and the refusal to cry sabotage or shrug at fate is exactly right.",
        "But too many threads were left loose, and the company's lawyers will pull at them. A few more days tracing the shelved reports and the disabled-alarm records would have made the finding unassailable. Close and honest, if not yet airtight."
      ],
      "namedTitle": "The Right Answer, Unearned",
      "named": [
        "Mbeki names the truth — Voss, the office, the safeguards switched off to save money — but gathered too little to back it. It reads like a hunch that happened to land.",
        "The inquiry cannot indict a manager and fault a design on an accusation this thin, however correct. Being right is not the same as being able to prove it to the people who will fight the finding."
      ]
    },
    "overclaim": {
      "title": "The Inquiry That Cried Sabotage",
      "body": [
        "Mbeki reports deliberate sabotage — an intruder who forced the release — the answer the front pages were already printing. It is vivid, and it is not what the evidence shows.",
        "There was no intruder and no forced entry; there was a drained scrubber, a cold flare, dead refrigeration, and bypassed interlocks, every one of them switched off or left broken to save money. When the sabotage story collapses, it takes the inquiry's credibility with it, and the real, provable failure is dismissed as just another conspiracy theory. The only saboteur was a budget, and the manager who signed it."
      ]
    },
    "dismissal": {
      "title": "Case Closed on Bad Luck",
      "body": [
        "Mbeki files it as an unforeseeable freak accident — a one-in-a-million upset no one could have prevented, close the file. It is the comfortable answer and it is false.",
        "The reaction was thermodynamically downhill and its runaway textbook; the safeguards existed precisely to absorb such an upset, and they were disabled to cut costs. The near-miss log warned of it, the safety officer's shelved reports named it, and the physics made it foreseeable. Blaming fate leaves every disabled system disabled, waiting for the next town downwind. The inquiry saw an accident and never the decision cut into the plant."
      ]
    },
    "wrongNames": {
      "title": "So Close",
      "body": [
        "Mbeki has the nature of it cold — safety systems disabled to cut costs, the scrubber and flare and refrigeration and interlocks all switched off or left broken, neither a saboteur nor a freak of fate. But the finger lands on the wrong name or the wrong room."
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A chemical storage tank releasing a toxic vapor cloud\"><rect x=\"76\" y=\"36\" width=\"118\" height=\"70\" rx=\"8\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M194 70 L300 70\" stroke=\"#121212\" stroke-width=\"1.8\"/><circle cx=\"300\" cy=\"70\" r=\"7\" fill=\"#B3261E\"/><path d=\"M308 70 C356 42,404 48,444 66 C486 84,540 78,592 56\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"2.2\"/><path d=\"M60 112 L618 112\" stroke=\"#e2e2d8\" stroke-width=\"1\"/><path d=\"M392 28 L392 104\" stroke=\"#326891\" stroke-width=\"1.5\" stroke-dasharray=\"4 4\"/></svg>"
}};
