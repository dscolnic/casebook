module.exports = { PACK: {
  "id": "marine",
  "title": "The Kestrel's Roll",
  "discipline": "Marine & Naval Architecture",
  "teaser": "A packed ferry rolled over in calm water minutes from port. An attack? A freak wave? Or a number in the loading book?",
  "overclaimTag": "a torpedo or attack",
  "truthTag": "a concealed loss of stability",
  "venue": "the Kestrel ferry inquiry",
  "agent": {
    "name": "Investigator Mara Ostend",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Board credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Naval-Architecture Pioneers",
  "dossierName": "NAVAL-ARCHITECTURE PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Kestrel ferry inquiry",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before the inquiry closes. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The WHERE you test determines the dossier you receive, and the conversation costs one day.",
  "overclaimTease": "And beware the answer the front pages crave: the evidence points not to a torpedo but to something quieter — and far harder to bury.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "operator",
      "items": [
        {
          "id": "operator",
          "label": "Harmon Vell — ferry line owner"
        },
        {
          "id": "captain",
          "label": "Captain Iris Sund — ship's master"
        },
        {
          "id": "surveyor",
          "label": "The maritime surveyor"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "office",
      "items": [
        {
          "id": "cardeck",
          "label": "The Vehicle Deck & Bow Door"
        },
        {
          "id": "bridge",
          "label": "The Bridge & Ballast Controls"
        },
        {
          "id": "office",
          "label": "The Ferry Line's Office"
        }
      ]
    },
    "what": {
      "title": "What is happening",
      "truth": "stability",
      "items": [
        {
          "id": "attack",
          "label": "A torpedo, mine, or deliberate attack"
        },
        {
          "id": "rogue",
          "label": "A freak rogue wave — an act of God"
        },
        {
          "id": "stability",
          "label": "A concealed loss of stability from overloading"
        }
      ]
    }
  },
  "PLACES": {
    "cardeck": {
      "name": "The Vehicle Deck & Bow Door",
      "xy": [
        140,
        90
      ]
    },
    "bridge": {
      "name": "The Bridge & Ballast Controls",
      "xy": [
        330,
        240
      ]
    },
    "office": {
      "name": "The Ferry Line's Office",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "cardeck",
      "bridge"
    ],
    [
      "bridge",
      "office"
    ]
  ],
  "CHARACTERS": {
    "bosun": {
      "name": "Bosun Adisa",
      "role": "Deck bosun & loading hand",
      "face": "⚓",
      "badge": "B",
      "legend": "the car deck",
      "hint": "Waved the cars aboard; knows they were never tallied or lashed."
    },
    "purser": {
      "name": "The Purser",
      "role": "Ship's purser & records",
      "face": "🗂",
      "badge": "P",
      "legend": "the office",
      "hint": "Holds the manifests and the head-count the sailing was booked past."
    },
    "pilot": {
      "name": "Harbor Pilot Enns",
      "role": "Harbor pilot",
      "face": "🧭",
      "badge": "H",
      "legend": "the quay",
      "hint": "Boards every ship; saw the Kestrel riding low, her marks underwater."
    }
  },
  "TOPICMAP": {
    "cardeck": {
      "bosun": [
        "buoyancy"
      ],
      "purser": [
        "floatstab"
      ],
      "pilot": [
        "hullform"
      ]
    },
    "bridge": {
      "bosun": [
        "modelbasin"
      ],
      "purser": [
        "waves"
      ],
      "pilot": [
        "viscousdrag"
      ]
    },
    "office": {
      "bosun": [
        "scaling"
      ],
      "purser": [
        "charts"
      ],
      "pilot": [
        "gyro"
      ]
    }
  },
  "TOPICS": {
    "buoyancy": {
      "whatHint": "Archimedes ties how deep she floats to what she carries. Ask where her marks sat — and whether the load book matches the water line.",
      "sci": "Archimedes (c.287-212 BC)",
      "topic": "Buoyancy & displacement",
      "lede": "The Syracusan who leapt from his bath shouting 'Eureka' because he had just grasped exactly how much sea a hull shoves aside.",
      "no": 1,
      "profile": "Archimedes of Syracuse was the greatest mathematician and engineer of antiquity, and in his treatise 'On Floating Bodies' he set down the law that still governs every ship afloat. His principle is simple to state and impossible to escape: a body immersed in a fluid is pushed up by a force equal to the weight of the fluid it displaces. A hull sinks into the water until the weight of the water it shoves aside exactly equals the weight of the ship. That balance, and nothing else, holds thousands of tons of steel on the surface.\n\nThe famous story has him puzzling over whether a king's crown was pure gold or secretly cut with silver. Stepping into a full bath and watching it overflow, he saw that a submerged object displaces its own volume of water, giving him a way to compare densities without melting the crown down. He is said to have run through the streets crying 'Eureka' — 'I have found it.' Whatever the truth of the tale, the displacement result is exact, and Archimedes proved it with rigor centuries before calculus existed.\n\nFor a ferry, displacement is a running account. Every car, every truck, every passenger adds weight, and the hull answers by settling deeper until it displaces that much more water. The gap left between the waterline and the deck edge — the freeboard — is the reserve of buoyancy that keeps a wave from stepping aboard. Load past a point and that reserve is spent. For this inquiry, Archimedes is the first witness: a ship does not float or founder by luck or by an enemy's hand. It floats by an equation, and if the Kestrel sat too low, the reason was written in her load, not in the weather and not in a torpedo.",
      "frame": "Adisa jerks a thumb at the waterline scar on the hull. \"Every ton I waved aboard pushed her down by a fixed amount — that's not opinion, that's law. Tell me what holds a hull up, and I'll tell you how much we piled on.\"",
      "q": [
        {
          "q": "What does Archimedes' principle state?",
          "o": [
            {
              "t": "The upward force on a hull equals the weight of the water it pushes aside.",
              "v": "expert",
              "fb": "Buoyancy equals the weight of displaced water — Archimedes' exact result."
            },
            {
              "t": "The upward force on a hull equals the weight of the air trapped beneath it.",
              "v": "wrong",
              "fb": "There is no trapped-air cushion; buoyancy comes from displaced water."
            },
            {
              "t": "The upward force on a hull grows with the speed at which the ship travels.",
              "v": "wrong",
              "fb": "Buoyancy has nothing to do with speed; a moored ship floats the same."
            },
            {
              "t": "The upward force on a hull depends primarily on how deep its keel is set.",
              "v": "partial",
              "fb": "Draft reflects the load, but the force equals the displaced water's weight."
            }
          ]
        },
        {
          "q": "How does loading a ferry change how she sits?",
          "o": [
            {
              "t": "Each added ton settles her deeper until she displaces that much more water.",
              "v": "expert",
              "fb": "Displacement is a running account; more load means less freeboard."
            },
            {
              "t": "Added weight is carried by the engines' thrust and barely changes her draft.",
              "v": "wrong",
              "fb": "Thrust drives her forward; it does nothing to hold weight against gravity."
            },
            {
              "t": "Added weight lowers her a little, but her reserve buoyancy is effectively endless.",
              "v": "partial",
              "fb": "Reserve buoyancy is finite; the freeboard is all of it, and it runs out."
            },
            {
              "t": "Added weight tells primarily in a storm; in calm water a hull floats regardless.",
              "v": "danger",
              "fb": "Calm water floats an overloaded hull barely, until the first heel wins."
            }
          ]
        },
        {
          "q": "Why does Archimedes' principle help this board?",
          "o": [
            {
              "t": "Floating and sinking follow an exact law, so a low ferry points to her load.",
              "v": "expert",
              "fb": "The waterline is evidence; it is set by weight, not weather or attack."
            },
            {
              "t": "A hull this low can primarily have been forced under by a blast tearing her open.",
              "v": "danger",
              "fb": "No blast is needed to press a hull down; extra tonnage does it quietly."
            },
            {
              "t": "Displacement does not be measured, so how deep she sat tells the board nothing.",
              "v": "wrong",
              "fb": "Displacement is precisely measurable; her marks recorded the load."
            },
            {
              "t": "It fixes how she floats but says nothing about how much cargo she carried.",
              "v": "partial",
              "fb": "Read backward, her draft reveals the very tonnage that was aboard."
            }
          ]
        }
      ]
    },
    "floatstab": {
      "whatHint": "Huygens shows stability lives in the righting margin, not the calm of the day. Ask whether that margin was already spent before she sailed.",
      "sci": "Christiaan Huygens (1629-1695)",
      "topic": "The stability of floating bodies",
      "lede": "The Dutch master of clocks and light who also asked, with a mathematician's stubbornness, which way a floating block will choose to sit.",
      "no": 2,
      "profile": "Christiaan Huygens was the leading scientist of the seventeenth century between Galileo and Newton — a Dutch mathematician, physicist, and astronomer. He invented the pendulum clock, discovered Saturn's largest moon Titan and the true shape of its rings, and proposed the wave theory of light. Less famous, but central to this case, is his early work on the equilibrium of floating bodies, written around 1650 in a manuscript he left unpublished in his lifetime.\n\nBuilding on Archimedes, Huygens went further: not merely does a floating body displace its own weight in water, but among all the ways it could float, only certain orientations are stable. He worked out, for floating shapes such as blocks and segments, which resting positions a body will hold and which it will abandon, rolling to a more comfortable attitude at the smallest nudge. A tall, narrow block set upright is in equilibrium — but tip it slightly and it flops onto its side, because the upright pose sits on the wrong side of stability. Huygens turned this into geometry, finding the conditions that separate a pose a body keeps from one it flees.\n\nThat distinction is the whole of a ferry's safety. A ship, too, has poses she will keep and poses she will abandon. Loaded correctly, upright is the attitude she returns to; loaded wrongly — too much weight carried high — upright becomes the pose she flees, and the first small heel sends her rolling to lie on her side. For this inquiry, Huygens is a warning that floating is not the same as being stable. A hull can sit level at the quay and still be one nudge from a capsize she was always going to seek. The question is never whether she floated, but whether upright was a pose she would keep.",
      "frame": "Sets down a ledger. \"People think a ship that floats is a ship that's safe. They are not the same thing, and the difference lives in numbers I keep. Show me you know it, and I'll open the book.\"",
      "q": [
        {
          "q": "What did Huygens add to Archimedes on floating bodies?",
          "o": [
            {
              "t": "That only certain floating orientations are stable; others a body abandons, in use.",
              "v": "expert",
              "fb": "Huygens sorted the poses a body keeps from the ones it flees."
            },
            {
              "t": "That a body floats primarily if it is lighter than water at every point within it, in use.",
              "v": "wrong",
              "fb": "Even a dense hull floats if shaped to displace enough; not his point."
            },
            {
              "t": "That a floating body displaces its own weight, and nothing more need be said, in use.",
              "v": "partial",
              "fb": "That is Archimedes; Huygens asked which floating poses actually hold."
            },
            {
              "t": "That any floating body is safe in every pose, since floating is presented as showing it stable.",
              "v": "danger",
              "fb": "Exactly the error he refuted — floating and stable are not the same."
            }
          ]
        },
        {
          "q": "Why might a tall, narrow block flop onto its side?",
          "o": [
            {
              "t": "Upright is an equilibrium it cannot hold, so a small tilt rolls it flat.",
              "v": "expert",
              "fb": "Some equilibria are unstable; the block flees upright at the first nudge."
            },
            {
              "t": "It soaks up water at the top, growing heavy up high until it simply tips over.",
              "v": "wrong",
              "fb": "No water need enter; the geometry alone makes upright unstable."
            },
            {
              "t": "It is top-heavy, though any floating shape settles into the same flat pose.",
              "v": "partial",
              "fb": "Broad, low shapes hold upright happily; primarily the tall block flops."
            },
            {
              "t": "primarily an outside push can move it; left alone it stays upright indefinitely.",
              "v": "danger",
              "fb": "Unstable equilibrium falls to the tiniest disturbance, not a hard shove."
            }
          ]
        },
        {
          "q": "What does Huygens warn this board?",
          "o": [
            {
              "t": "That a hull can float level and still be one heel from a capsize she seeks, in the record.",
              "v": "expert",
              "fb": "Floating is not safety; the loaded pose may be one she was generally fleeing."
            },
            {
              "t": "That a ship seen floating at the quay could primarily be sunk by a deliberate act, in use.",
              "v": "danger",
              "fb": "An unstable hull needs no attacker; she rolls at the first small heel."
            },
            {
              "t": "That floating is presented as showing stability, so a capsize is likely to come from outside the ship.",
              "v": "wrong",
              "fb": "Floating does not establish stability; the capsize can be built into her load."
            },
            {
              "t": "That stability depends on the hull's shape alone, rarely on how she is loaded, under load.",
              "v": "partial",
              "fb": "Loading raises the center of gravity and changes her stability directly."
            }
          ]
        }
      ]
    },
    "hullform": {
      "whatHint": "Chapman's hull form gives a ship her reserve of stability; overload eats it silently, leaving no hole to point to.",
      "sci": "Frederik H. af Chapman (1721-1808)",
      "topic": "Naval architecture & hull form",
      "lede": "The Swedish shipwright who first treated a hull as mathematics on paper, drawing whole navies before a single plank was cut.",
      "no": 3,
      "profile": "Frederik Henric af Chapman was a Swedish shipbuilder widely regarded as the first true naval architect — the first to design ships by scientific calculation rather than by inherited rule of thumb. Born in Gothenburg to an English-born shipwright, he studied yards across Europe, learned mathematics and mechanics, and rose to become the chief designer of the Swedish navy. His great work, 'Architectura Navalis Mercatoria' (1768), was an atlas of merchant and naval vessels drawn to consistent scale — a reference so thorough that it standardized how ships were conceived and compared.\n\nChapman brought method to a craft ruled by tradition. He applied the geometry of curves to the shaping of a hull's lines, developed a systematic way to lay out a hull's form so its displacement and balance could be computed in advance, and studied how a hull's shape governs its resistance, its capacity, and its steadiness. He designed and built large fleets efficiently, introducing near-industrial organization to the shipyard, and his frigates and archipelago craft served Sweden well. He proved that a ship's behavior could be predicted from her drawn form before she ever touched the water.\n\nFor this inquiry, Chapman stands for predictability. A ferry is not an improvisation; her hull form, her intended draft, and the loading she was designed to carry are all known quantities, set down long before she sails. Deviations from that design — a deck packed beyond what the lines were drawn to bear — are therefore visible against a fixed standard. When a hull misbehaves, the naval architect asks first how she differed from the vessel on the drawings. A capsize is measured against a design, and if the Kestrel was loaded far past what Chapman's kind of calculation allowed for her, the fault lies in that departure, not in an act of God or an enemy.",
      "frame": "Enns squints out at the harbor. \"I've watched a thousand hulls come past my launch, and a good one behaves the way her lines promise. Show me you know how a hull is meant to sit, and I'll tell you how this one didn't.\"",
      "q": [
        {
          "q": "What made af Chapman the first true naval architect?",
          "o": [
            {
              "t": "He designed ships by calculation and drawn lines, not by old rule of thumb.",
              "v": "expert",
              "fb": "Chapman replaced craft habit with mathematics on paper — the field's start."
            },
            {
              "t": "He built the largest wooden warship ever to be launched from any European yard.",
              "v": "wrong",
              "fb": "Size was not his mark; method and calculation were his real innovation."
            },
            {
              "t": "He organized the shipyard efficiently, though he left the design to tradition.",
              "v": "partial",
              "fb": "He reformed the yard and the design; he did not leave design to habit."
            },
            {
              "t": "He proved a hull's behavior at sea can rarely be foreseen from its drawings.",
              "v": "danger",
              "fb": "He proved the opposite — a hull's behavior follows from its drawn form."
            }
          ]
        },
        {
          "q": "What could Chapman compute from a hull's drawn lines?",
          "o": [
            {
              "t": "Its displacement and balance, so her floating trim was known in advance.",
              "v": "expert",
              "fb": "From the lines came displacement and trim — the ship known before launch."
            },
            {
              "t": "The precise wages a crew would earn on a voyage of any given length at sea.",
              "v": "wrong",
              "fb": "That is a purser's arithmetic, not naval architecture from the lines."
            },
            {
              "t": "Its rough size, though nothing about how deep she would actually come to float.",
              "v": "partial",
              "fb": "The lines yield displacement and trim exactly, not just a rough size."
            },
            {
              "t": "Nothing useful, since a hull's real behavior is settled primarily once it is at sea.",
              "v": "danger",
              "fb": "The whole point was that behavior follows from the drawn form."
            }
          ]
        },
        {
          "q": "Why does Chapman's method help this board?",
          "o": [
            {
              "t": "A hull has a designed load, so packing her past it shows a clear departure, in tests.",
              "v": "expert",
              "fb": "Loading is measured against the design; the Kestrel's excess is visible."
            },
            {
              "t": "It is presented as showing a well-drawn ferry can capsize primarily if a weapon strikes her hull.",
              "v": "danger",
              "fb": "A hull loaded past her design capsizes with no weapon at all."
            },
            {
              "t": "It shows hull behavior is unknowable, so the capsize does not be accounted for, in use.",
              "v": "wrong",
              "fb": "Chapman made hull behavior knowable; the departure can be measured."
            },
            {
              "t": "It fixes her shape but reveals nothing about the weight she was made to bear, in use.",
              "v": "partial",
              "fb": "The design fixes her intended loading as surely as her shape."
            }
          ]
        }
      ]
    },
    "modelbasin": {
      "whatHint": "Taylor tested ships against known seas in a basin. Ask whether the sea that hour was anything the charts and the barometer hadn't already called ordinary.",
      "sci": "David W. Taylor (1864-1940)",
      "topic": "The ship model basin",
      "lede": "The U.S. naval constructor who built America its first great testing tank and filled it with the data every warship hull would be measured against.",
      "no": 4,
      "profile": "David Watson Taylor was a United States naval constructor and rear admiral who brought rigorous science to American warship design. A brilliant student who graduated at the top of his class, he studied naval architecture in Britain and returned determined to give the U.S. Navy its own experimental capability. In 1898 he oversaw the building of the Experimental Model Basin at the Washington Navy Yard — a long tank in which scale models were towed to measure their resistance and behavior, echoing Froude's work but on a national scale.\n\nTaylor used the basin to conduct systematic experiments, varying hull dimensions methodically and recording the results. This produced the 'Taylor Standard Series,' a body of resistance data from which designers could estimate the power a proposed hull would need without building it first. He summarized the field in his influential book 'The Speed and Power of Ships.' He is also associated with early study of the bulbous bow, the underwater bulb at a ship's forefoot that can reduce wave-making resistance. His method throughout was to replace guesswork with a library of measured cases.\n\nFor this inquiry, Taylor represents the institutional memory of naval architecture. The behavior of hulls is not rediscovered for each new ship; it rests on decades of tank data and standard series that tell an engineer, in advance, how a given hull will float, resist, and respond. A ferry's safe loading and stability sit squarely within that known body of knowledge. When a ship capsizes, the question is not whether her behavior could have been predicted — Taylor's basin proves it could — but whether anyone consulted what was already known, or loaded her in defiance of it. The data existed; the only question is whether it was honored or ignored.",
      "frame": "Adisa nods at the ballast panel. \"Up here they've got dials and tables for everything a hull will do. None of it's guesswork. Show me you know where that knowledge comes from, and I'll tell you what nobody bothered to check.\"",
      "q": [
        {
          "q": "What was Taylor's Experimental Model Basin for?",
          "o": [
            {
              "t": "Towing scale models to measure hull resistance and predict a ship's power.",
              "v": "expert",
              "fb": "The basin measured models to forecast full-size resistance and power."
            },
            {
              "t": "Training naval cadets to pilot small boats through a narrow indoor channel.",
              "v": "wrong",
              "fb": "It was a measuring tank, not a training channel for boat handling."
            },
            {
              "t": "Storing spare test models, though the ships' behavior was still judged by eye.",
              "v": "partial",
              "fb": "Models were towed and measured, not merely stored for later study."
            },
            {
              "t": "Proving that a hull's resistance can rarely be known until the ship is built.",
              "v": "danger",
              "fb": "The basin's whole purpose was to know resistance before building."
            }
          ]
        },
        {
          "q": "What was the Taylor Standard Series?",
          "o": [
            {
              "t": "A body of measured resistance data for estimating a new hull's power needs.",
              "v": "expert",
              "fb": "The series let designers estimate power from methodically varied cases."
            },
            {
              "t": "A ranking of the world's fastest warships by their recorded top speeds at sea.",
              "v": "wrong",
              "fb": "It was resistance data, not a league table of ship speeds."
            },
            {
              "t": "A single model's results, useful primarily for the one hull that had been tested.",
              "v": "partial",
              "fb": "It spanned many systematically varied hulls, not just one."
            },
            {
              "t": "A claim that all hulls behave identically, so no testing is ever really needed.",
              "v": "danger",
              "fb": "Hulls differ; the series exists precisely to chart those differences."
            }
          ]
        },
        {
          "q": "What does Taylor's basin tell this board?",
          "o": [
            {
              "t": "A hull's limits were already known, so a capsize means the data was ignored, in use.",
              "v": "expert",
              "fb": "The knowledge existed; the failure was to honor it, not to lack it."
            },
            {
              "t": "It is presented as showing a capsize this sudden could primarily be the work of a hidden mine.",
              "v": "danger",
              "fb": "No mine is needed; ignoring known stability limits is enough to capsize."
            },
            {
              "t": "It shows hull behavior is guesswork, so the loss could not be foreseen at all, in use.",
              "v": "wrong",
              "fb": "Taylor's basin made hull behavior data, not guesswork."
            },
            {
              "t": "It fixed her power but left her stability and loading largely unstudied, in tests.",
              "v": "partial",
              "fb": "Standard series and stability sit in the same known body of knowledge."
            }
          ]
        }
      ]
    },
    "waves": {
      "whatHint": "Russell studied how real waves form and travel. A rogue leaves a signature others feel; ask whether any nearby vessel or gauge recorded a thing.",
      "sci": "John Scott Russell (1808-1882)",
      "topic": "Waves & the wave-line hull",
      "lede": "The Scottish engineer who galloped along a canal chasing a single heaped-up wave that would not break, and named a new thing in physics.",
      "no": 5,
      "profile": "John Scott Russell was a Scottish civil engineer and naval architect whose most celebrated moment came in 1834 on the Union Canal near Edinburgh. Watching a boat stop suddenly, he saw the mass of water it had been pushing roll on ahead as a single smooth heap that neither broke nor spread — a solitary wave holding its shape. He chased it on horseback for a mile or two before losing it, and spent years afterward studying what he called the 'wave of translation,' known today as a soliton, a landmark in the physics of waves.\n\nFrom this fascination Russell developed his 'wave-line' theory of ship design, arguing that a hull's forward lines should be shaped to match the form of a wave so as to part the water with least disturbance. Whatever the theory's limits, it pushed designers to think hard about the waves a ship itself makes and moves through. Russell was a formidable builder too: with Isambard Kingdom Brunel he constructed the 'Great Eastern,' by far the largest ship of its age, and he was a founder of the Institution of Naval Architects.\n\nFor this inquiry, Russell is the authority on waves themselves. He knew, better than almost anyone of his century, what waves are and how they behave — their shapes, their speeds, the energy they carry. That expertise cuts against the lure of the 'rogue wave' explanation. A wave large enough to capsize a ferry leaves evidence: it is a storm-sea or shoal phenomenon, felt by other vessels and recorded by the weather. It does not rise from a flat, calm harbor approach to single out one overloaded ship. Russell's science lets the board weigh whether a wave was even possible — or whether the water that came aboard was already on her own deck.",
      "frame": "Taps the weather log. \"They'll want you to blame a wave — one freak sea, nobody's fault. But waves leave a record, and I keep records. Show me you understand them before you reach for that story.\"",
      "q": [
        {
          "q": "What was Russell's 'wave of translation'?",
          "o": [
            {
              "t": "A single heaped wave that held its shape and neither broke nor spread out.",
              "v": "expert",
              "fb": "The solitary wave kept its form for miles — Russell's famous sighting."
            },
            {
              "t": "A towering breaker that curls over and collapses onto a beach in the surf.",
              "v": "wrong",
              "fb": "His wave did not break; that is exactly what made it remarkable."
            },
            {
              "t": "An ordinary ripple, of interest primarily for how quickly it faded to nothing.",
              "v": "partial",
              "fb": "It was a lasting, coherent wave, not a fading ripple of no interest."
            },
            {
              "t": "A freak wave that rises without warning out of any calm, flat water at will.",
              "v": "danger",
              "fb": "It arose from a boat's own push in a canal, not from calm water at will."
            }
          ]
        },
        {
          "q": "What was Russell's 'wave-line' theory about?",
          "o": [
            {
              "t": "Shaping a hull's forward lines to part the water with the least disturbance.",
              "v": "expert",
              "fb": "Wave-line design matched the bow to a wave to disturb the water least."
            },
            {
              "t": "Timing a ship's engines to ride the crest of following seas for free speed.",
              "v": "wrong",
              "fb": "The theory concerned hull shape, not engine timing on the seas."
            },
            {
              "t": "Decorating a hull's bow, a matter of style with no effect on her motion.",
              "v": "partial",
              "fb": "It was about hydrodynamic form, not decoration of the bow."
            },
            {
              "t": "Proving a hull can outrun any wave, so no sea can ever overtake a ship.",
              "v": "danger",
              "fb": "No hull outruns every wave; the theory was about shaping, not escape."
            }
          ]
        },
        {
          "q": "How does Russell's expertise bear on the 'rogue wave' claim?",
          "o": [
            {
              "t": "A wave able to capsize a ferry leaves a record and is felt by other ships.",
              "v": "expert",
              "fb": "Big waves are storm or shoal events, recorded and widely felt, not silent."
            },
            {
              "t": "It confirms a freak wave can strike one hull alone from a calm, flat sea.",
              "v": "danger",
              "fb": "Russell's science argues against a lone freak wave in a calm approach."
            },
            {
              "t": "It shows waves are unknowable, so the rogue-wave story does not be tested.",
              "v": "wrong",
              "fb": "He made waves highly knowable; the rogue claim can indeed be tested."
            },
            {
              "t": "It fixes a wave's speed but not whether one was present that day at all.",
              "v": "partial",
              "fb": "The weather record can settle whether such a wave was even possible."
            }
          ]
        }
      ]
    },
    "viscousdrag": {
      "whatHint": "Stokes' resistance grows as a ship sits deeper and slower. A vessel dragging low through calm water is carrying more than her lines intend.",
      "sci": "George Gabriel Stokes (1819-1903)",
      "topic": "Viscosity & water resistance",
      "lede": "The Cambridge mathematician who wrote the equations of every flowing fluid and reckoned the drag on a sphere sinking through it.",
      "no": 6,
      "profile": "Sir George Gabriel Stokes was an Anglo-Irish mathematician and physicist, Lucasian Professor at Cambridge, whose work underlies the whole science of fluid motion. Building on Claude-Louis Navier before him, he framed the Navier-Stokes equations, the fundamental laws describing how a viscous fluid flows under pressure, gravity, and internal friction. These equations remain the bedrock of hydrodynamics; the difficulty of solving them in general is one of the famous open problems of mathematics.\n\nStokes gave viscosity — a fluid's internal stickiness, its resistance to being sheared — a rigorous place in physics. He derived 'Stokes's law' for the slow fall of a small sphere through a viscous fluid, showing how the drag depends on the sphere's size, its speed, and the fluid's viscosity. The result let scientists measure viscosity and understand sedimentation, and it captures the essential truth that a body moving through water is resisted by forces that can be written down and calculated. He also contributed to optics, coining the term 'fluorescence,' but his fluid mechanics is his monument.\n\nFor this inquiry, Stokes represents the calculability of the water's resistance to a hull. The forces the sea exerts on a moving ferry — the drag on her hull, the damping of her roll, the slow ooze of water finding its way across a deck — are governed by viscosity and by equations, not by whim. This matters in two ways. It confirms that a ship's motion through calm water holds no surprises for the analyst. And it reminds the board that water is a real, heavy, mobile substance: once it is free to move across a broad deck, its behavior, however destabilizing, is ordinary physics, not an act of God. The sea obeys equations; so does the water that should never have been loose aboard her.",
      "frame": "Enns dips his hand as if into the tide. \"Water pushes back on a hull in ways you can put numbers to — and it's heavy stuff once it's loose. Show me you grasp how water behaves, and I'll tell you where I saw it go.\"",
      "q": [
        {
          "q": "What are the Navier-Stokes equations?",
          "o": [
            {
              "t": "The core laws of how a viscous fluid flows under pressure and friction.",
              "v": "expert",
              "fb": "They govern viscous flow — the bedrock equations of hydrodynamics."
            },
            {
              "t": "A rule for the buoyant force on any object fully submerged in still water.",
              "v": "wrong",
              "fb": "That is Archimedes' principle; Navier-Stokes describes flow, not float."
            },
            {
              "t": "A formula for a ship's top speed, useful for nothing else about the flow.",
              "v": "partial",
              "fb": "They describe the whole flow field, not merely a single speed."
            },
            {
              "t": "A proof that fluid motion is lawless and can rarely really be described at all.",
              "v": "danger",
              "fb": "They are the very laws of fluid motion, not a proof of its lawlessness."
            }
          ]
        },
        {
          "q": "What does Stokes's law describe?",
          "o": [
            {
              "t": "The drag on a small sphere sinking slowly through a viscous fluid.",
              "v": "expert",
              "fb": "Stokes's law ties a sphere's drag to size, speed, and viscosity."
            },
            {
              "t": "The lift on a wing as it slices through fast-moving air at an angle.",
              "v": "wrong",
              "fb": "That is aerodynamic lift; Stokes's law is about viscous drag."
            },
            {
              "t": "The speed of sound as it passes through water of a given temperature.",
              "v": "partial",
              "fb": "Sound speed is a separate matter; his law concerns viscous drag."
            },
            {
              "t": "The force of a wave breaking, which no equation can ever hope to pin down.",
              "v": "danger",
              "fb": "Even breaking waves obey fluid dynamics; his law is viscous drag."
            }
          ]
        },
        {
          "q": "How does Stokes's science bear on this case?",
          "o": [
            {
              "t": "Water's forces obey equations, so loose water on deck is ordinary physics, on review.",
              "v": "expert",
              "fb": "Free water is heavy and mobile, and its effect is calculable, not divine."
            },
            {
              "t": "It is presented as showing water can move a hull primarily when a blast blows a hole in her side.",
              "v": "danger",
              "fb": "Water need not be let in by a blast; it can already be loose on the deck."
            },
            {
              "t": "It shows fluid forces are unknowable, so the water's role can't be judged, on review.",
              "v": "wrong",
              "fb": "Stokes made fluid forces calculable; the water's role can be judged."
            },
            {
              "t": "It explains her hull drag but nothing about water moving across the deck, under load.",
              "v": "partial",
              "fb": "The same viscous physics governs water sloshing across a car deck."
            }
          ]
        }
      ]
    },
    "scaling": {
      "whatHint": "Reynolds warns that model and reality differ only in scale, not in physics. The physics here is a righting arm — not a weapon and not a wall of water.",
      "sci": "Osborne Reynolds (1842-1912)",
      "topic": "Turbulence & scale models",
      "lede": "The Manchester professor who dyed a thread of water and caught the exact instant a smooth flow shatters into turbulence.",
      "no": 7,
      "profile": "Osborne Reynolds was a British engineer and physicist, the first professor of engineering at Owens College in Manchester, whose 1883 experiment is one of the most elegant in the history of fluid mechanics. Injecting a fine thread of dye into water flowing through a glass tube, he watched the thread run straight and smooth at low speeds — laminar flow — and then, as the speed rose past a threshold, break up and mix into chaotic swirls: turbulence. He showed that the transition is governed by a single dimensionless ratio, now called the Reynolds number, comparing the fluid's inertia to its viscosity.\n\nThe deeper power of this number is dynamic similarity: two flows with the same Reynolds number behave alike, whatever their actual size or speed. This is what makes a scale-model test in a tank meaningful, and it is also what complicates it, because a small model and a full-size ship cannot in general match both the Reynolds number and Froude's wave-scaling number at once. Naval architects learned to separate the frictional resistance, which scales by Reynolds's rule, from the wave-making resistance, which scales by Froude's — combining the two to predict the full ship.\n\nFor this inquiry, Reynolds stands for the rigor and the honesty of scale testing. The behavior of a ferry — her resistance, her wake, the flow of water across her decks — can be studied on models and in calculation, provided the analyst respects the scaling laws and does not fool himself. Reynolds's discipline is that the water does not lie; it obeys ratios that can be written down. A capsize is not beyond such analysis. The only way the truth escapes is if no one runs the numbers, or if someone runs them and looks away from what the model, honestly scaled, already shows.",
      "frame": "Adisa gestures at the filing cabinets. \"All the tests, all the numbers, they end up in a room like this. The water doesn't lie — but paper can be filed away. Show me you know how the numbers are made, and I'll tell you which drawer to open.\"",
      "q": [
        {
          "q": "What did Reynolds's dye experiment reveal?",
          "o": [
            {
              "t": "How a smooth, laminar flow breaks into turbulence past a threshold speed.",
              "v": "expert",
              "fb": "He caught the laminar-to-turbulent transition at a critical value."
            },
            {
              "t": "How the buoyant force on a submerged body grows with its total volume.",
              "v": "wrong",
              "fb": "That is buoyancy; his experiment was about the flow's transition."
            },
            {
              "t": "How dye spreads in still water, of interest primarily to the study of mixing.",
              "v": "partial",
              "fb": "It revealed the transition to turbulence, a far more general result."
            },
            {
              "t": "That water flow is largely random and can rarely be predicted in advance.",
              "v": "danger",
              "fb": "He showed the transition is orderly, set by the Reynolds number."
            }
          ]
        },
        {
          "q": "What does the Reynolds number compare?",
          "o": [
            {
              "t": "A fluid's inertia to its viscosity, setting whether flow is smooth or rough.",
              "v": "expert",
              "fb": "Inertia over viscosity — the ratio that predicts the flow transition."
            },
            {
              "t": "A ship's weight to its buoyancy, deciding how deep the hull will float.",
              "v": "wrong",
              "fb": "That is a flotation balance, not the inertia-to-viscosity ratio."
            },
            {
              "t": "A model's size to the real ship's, which is all that scaling ever requires.",
              "v": "partial",
              "fb": "Scale alone is not enough; the Reynolds number is likely to be matched."
            },
            {
              "t": "A wave's height to its length, which alone fixes when a hull will capsize.",
              "v": "danger",
              "fb": "That describes wave steepness, not the Reynolds number."
            }
          ]
        },
        {
          "q": "What does Reynolds's discipline imply for this board?",
          "o": [
            {
              "t": "A ferry's behavior is analyzable, so the truth escapes only if no one looks, in use.",
              "v": "expert",
              "fb": "The numbers exist to be run; looking away is the primarily way truth hides."
            },
            {
              "t": "It is presented as showing a capsize can be understood primarily after a weapon strike is found.",
              "v": "danger",
              "fb": "No weapon is needed; honest scaling already explains the capsize."
            },
            {
              "t": "It shows scale tests are meaningless, so nothing here could be foreseen, under load.",
              "v": "wrong",
              "fb": "Scale tests are valid when the scaling laws are respected."
            },
            {
              "t": "It fixes her friction drag but leaves her stability largely untested, in the record.",
              "v": "partial",
              "fb": "The same rigor applies to stability as to drag; both can be studied."
            }
          ]
        }
      ]
    },
    "charts": {
      "whatHint": "Maury's charts make the sea's moods a record, not a mystery. Ask what the wind, tide, and current said for that hour before blaming a wave from nowhere.",
      "sci": "Matthew Fontaine Maury (1806-1873)",
      "topic": "Wind & current charts",
      "lede": "The American naval officer, grounded by a lame leg, who mined a mountain of dusty ships' logs into the first great charts of the sea's own habits.",
      "no": 8,
      "profile": "Matthew Fontaine Maury was a United States Navy officer whose seagoing career was cut short by a stagecoach accident that left him lame. Assigned instead to the Navy's Depot of Charts and Instruments, he turned a desk job into a revolution. He gathered the old logbooks of countless voyages and systematically extracted from them the winds and currents each ship had met, sorting the data by place and season. From this he produced his 'Wind and Current Charts,' which let captains choose faster, safer routes and cut weeks from long passages.\n\nIn exchange for blank logbooks to fill in on a standard form, thousands of mariners fed Maury fresh observations, an early triumph of crowd-sourced science. He organized an international conference in 1853 to standardize marine data-gathering, and in 1855 he published 'The Physical Geography of the Sea,' widely regarded as the first textbook of modern oceanography. He earned the title 'Pathfinder of the Seas' for turning scattered experience into systematic, published knowledge of the ocean.\n\nFor this inquiry, Maury embodies the principle that the sea's conditions are recorded, not secret. The winds, currents, and hazards of the Kestrel's route were charted long before she sailed; a master could know, in advance, what water and weather to expect on that passage. This starves the 'freak of nature' explanation of its oxygen. If the charts show a benign, well-traveled approach — no notorious currents, no lurking shoal, ordinary conditions on an ordinary day — then the sea did not ambush her. Maury's charts turn the environment from a suspect into a witness, and a witness that points the board's attention firmly back toward the ship and her loading.",
      "frame": "Lays out a route chart. \"Everything the sea does on that crossing is written down somewhere — the winds, the sets, the shoals. Show me you understand how the sea is charted, and I'll show you how ordinary that day really was.\"",
      "q": [
        {
          "q": "How did Maury make his wind and current charts?",
          "o": [
            {
              "t": "By mining old ships' logs for the winds and currents each voyage had met.",
              "v": "expert",
              "fb": "He extracted systematic data from countless logbooks — his great method."
            },
            {
              "t": "By sailing every route himself and recording the weather as he went along.",
              "v": "wrong",
              "fb": "A lame leg kept him ashore; he mined others' logs, not his own voyages."
            },
            {
              "t": "By copying older charts, adding little beyond a neater and cleaner layout.",
              "v": "partial",
              "fb": "He built new charts from raw log data, not by recopying old ones."
            },
            {
              "t": "By guesswork, since the open ocean's conditions can rarely truly be recorded.",
              "v": "danger",
              "fb": "His whole point was that ocean conditions can be recorded and charted."
            }
          ]
        },
        {
          "q": "What was 'The Physical Geography of the Sea'?",
          "o": [
            {
              "t": "An early textbook of oceanography, systematizing the sea's winds and currents.",
              "v": "expert",
              "fb": "It is widely called the first modern oceanography text — Maury's landmark."
            },
            {
              "t": "A logbook of a single famous voyage around the stormy tip of South America.",
              "v": "wrong",
              "fb": "It was a systematic science of the sea, not one voyage's log."
            },
            {
              "t": "A collection of sailors' tales, entertaining but of no scientific value at all.",
              "v": "partial",
              "fb": "It was rigorous, data-driven oceanography, not mere sailors' stories."
            },
            {
              "t": "A claim that the sea is beyond all study, so no chart of it can be trusted.",
              "v": "danger",
              "fb": "Maury proved the sea can be studied and charted in fine detail."
            }
          ]
        },
        {
          "q": "How do Maury's charts bear on this inquiry?",
          "o": [
            {
              "t": "The route's conditions were known, so a 'freak of nature' barely stands.",
              "v": "expert",
              "fb": "A charted, benign approach starves the act-of-God story of its oxygen."
            },
            {
              "t": "They establish the approach hid a freak current able to roll almost any ship over.",
              "v": "danger",
              "fb": "Charts of a benign route argue against any lurking freak current."
            },
            {
              "t": "They show sea conditions are unknowable, so the day's weather is a mystery.",
              "v": "wrong",
              "fb": "Maury made sea conditions knowable; the day can be reconstructed."
            },
            {
              "t": "They fix the winds but say nothing about the currents on her approach.",
              "v": "partial",
              "fb": "His charts cover currents as fully as winds along a route."
            }
          ]
        }
      ]
    },
    "gyro": {
      "whatHint": "Sperry's instruments log a ship's motion continuously. Ask whether the roll built gradually as she lost stability, or arrived in the instant a blast would make.",
      "sci": "Elmer Sperry (1860-1930)",
      "topic": "The gyrocompass & ship stabilizer",
      "lede": "The American inventor who tamed the spinning gyroscope into a compass that ignores the sea and a fin that fights a ship's roll.",
      "no": 9,
      "profile": "Elmer Ambrose Sperry was one of America's most prolific inventors, holding hundreds of patents across electric machinery, navigation, and control. His genius was for feedback: building machines that sense their own error and correct it automatically. His fortunes and his fame came from harnessing the gyroscope — a rapidly spinning wheel that resists being tilted and points stubbornly in a fixed direction — to the practical problems of the sea and the air.\n\nSperry perfected the gyrocompass, which finds true north from the Earth's rotation rather than a magnetic field, freeing navigation from the errors that a ship's own iron introduces into a magnetic compass. He built gyroscopic autopilots and, of particular relevance here, the active gyro ship stabilizer and gyro-controlled fin systems designed to sense a ship's roll and counter it, steadying the vessel against the sea. His instruments measured and acted on a ship's motion continuously, turning the vague art of 'feeling' a ship into quantities read from dials.\n\nFor this inquiry, Sperry represents the instrumented ship: a vessel whose heading, rate of turn, and angle of roll can be sensed, recorded, and even controlled. A modern ferry's motion is not a matter of impression; it is data. That has two consequences for the board. It means the ship's behavior in her final minutes may be recoverable from her instruments, showing exactly how she heeled and when. And it underlines that roll is a measurable, manageable thing — a ship stabilized against it is a ship whose designers took her stability seriously. A vessel that rolled past recovery in calm water was not the victim of an immeasurable force, but of a stability that instruments like Sperry's could have quantified, had anyone been watching the numbers.",
      "frame": "Enns thumbs the edge of a logbook. \"A ship's roll isn't a feeling — it's a number, and there are instruments that read it and even fight it. Show me you understand that, and I'll tell you what her own dials would have shown.\"",
      "q": [
        {
          "q": "What does a gyrocompass do?",
          "o": [
            {
              "t": "Finds true north from the Earth's spin, free of a ship's magnetic errors.",
              "v": "expert",
              "fb": "The gyrocompass seeks true north mechanically, immune to a ship's iron."
            },
            {
              "t": "Points to magnetic north more sharply than any needle compass can manage.",
              "v": "wrong",
              "fb": "It ignores magnetism largely, finding true north from rotation."
            },
            {
              "t": "Keeps a steady heading primarily while a ship steams in a dead-straight line.",
              "v": "partial",
              "fb": "It holds true north through turns, not primarily on a straight course."
            },
            {
              "t": "Predicts a coming storm by sensing the faint tremor of a distant gale.",
              "v": "danger",
              "fb": "A gyrocompass is a direction finder, not a weather instrument."
            }
          ]
        },
        {
          "q": "What did Sperry's gyro stabilizer do?",
          "o": [
            {
              "t": "Sense a ship's roll and act to counter it, steadying her against the sea.",
              "v": "expert",
              "fb": "The active stabilizer sensed roll and fought it — Sperry's feedback genius."
            },
            {
              "t": "Lock the rudder amidships so the ship could rarely wander off her heading.",
              "v": "wrong",
              "fb": "That is a steering lock; the stabilizer worked on roll, not heading."
            },
            {
              "t": "Add ballast low down, a fixed weight that did nothing about the roll itself.",
              "v": "partial",
              "fb": "It actively countered roll rather than adding a fixed dead weight."
            },
            {
              "t": "establish a ship's roll is beyond control, so no vessel can be steadied at all.",
              "v": "danger",
              "fb": "Sperry's device proved roll can be measured and actively fought."
            }
          ]
        },
        {
          "q": "What does Sperry's instrumented ship mean for this board?",
          "o": [
            {
              "t": "Roll is a number, so her stability could have been quantified, not just felt, on review.",
              "v": "expert",
              "fb": "Instruments could have quantified the stability she was allowed to lose."
            },
            {
              "t": "It is presented as showing primarily a torpedo's shock could make a roll her instruments would read.",
              "v": "danger",
              "fb": "Instruments read the roll of an overloaded hull with no torpedo at all."
            },
            {
              "t": "It shows a ship's roll can't be measured, so her final minutes are lost to us, in tests.",
              "v": "wrong",
              "fb": "Sperry's whole legacy is that roll is measurable, even recordable."
            },
            {
              "t": "It records her heading but reveals nothing about how far she heeled over, in the record.",
              "v": "partial",
              "fb": "The same instruments that hold heading also measure the angle of heel."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "bosun": {
      "cardeck": "Bosun Adisa stands on the sloping vehicle deck, boots braced against the list. \"I waved every one of them aboard with my own arm, and not a soul counted or lashed a single vehicle. Show me you know what holds a hull up, and I'll tell you how many I lost track of.\"",
      "bridge": "Adisa lingers by the ballast panel, uneasy among the dials. \"Down on the deck it's all muscle and rope; up here it's numbers nobody read. Prove you understand the forces, and I'll tell you which gauges were shouting.\"",
      "office": "Adisa turns his cap in his hands in the paneled office. \"This is where the sailing got booked, long before I ever swung an arm. The truth's in a drawer here, not on my deck. Know your science, and I'll point you at it.\""
    },
    "purser": {
      "cardeck": "The Purser meets you at the foot of the ramp, clutching a folder. \"I keep the head-count and the manifest, and I can tell you both were wrong before we cast off. Show me you understand loading, and I'll show you the figure we sailed past.\"",
      "bridge": "The Purser stands at the chart table, tapping the weather log. \"They'll offer you a rogue wave and a clean conscience. My records say the sea was quiet. Prove you know how orderly the water is, and I'll walk you through the log.\"",
      "office": "In the office the Purser lays a hand flat on the load book. \"Everything anyone tells you at sea, I can check against paper right here. The manifests don't lie, even when people do. Earn it, and I'll open the book.\""
    },
    "pilot": {
      "cardeck": "Harbor Pilot Enns runs a palm along the cold hull plating. \"I boarded her at the sea buoy and felt her wrong under my feet — she rode low, marks under water. Show me you know how a hull should sit, and I'll tell you how this one didn't.\"",
      "bridge": "Enns stands at the wheel he last held that night. \"She answered slow and hung on every roll, like a hull with nothing left to right her. Convince me you understand that, and I'll tell you what I felt through the deck.\"",
      "office": "Enns is out of place among the ledgers, hat in hand. \"I only ever saw the last few minutes, but the reason for them was decided in a room like this. Show me you follow the physics, and I'll tell you what I reported.\""
    }
  },
  "story": [
    "<b>The Kestrel's Roll</b> begins inside the Kestrel ferry inquiry, where the first explanation is already spreading faster than the evidence.",
    "<b>Bosun Adisa</b>, <b>The Purser</b>, and <b>Harbor Pilot Enns</b> each hold a different part of the record, and each conversation opens with one real pioneer whose work changes how the evidence should be read.",
    "The inquiry keeps circling <b>A torpedo, mine, or deliberate attack</b> and <b>A freak rogue wave — an act of God</b>. Both are tempting, and neither can be accepted just because it makes the cleanest headline.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and make the final WHAT judgment from what you learned."
  ],
  "endings": {
    "overclaimWhat": "attack",
    "dismissalWhat": "rogue",
    "win": {
      "expertTitle": "What the Load Book Proves, and No More",
      "expert": [
        "Ostend names it exactly: Harmon Vell, the ferry line's owner, who booked a sailing loaded far past what the ship could safely carry; the truth culminating in the Ferry Line's Office, where the manifests and the load book record what was put aboard and what margin was left; and a concealed loss of stability from overloading — too many vehicles, none tallied or lashed, the Kestrel sailing with her marks under water and her righting margin spent, water free to surge across the vehicle deck. Not a torpedo. Not a freak wave.",
        "Every card accounted for. Ostend worked the vehicle deck, the bridge, and the office, turned a deck hand and a purser into witnesses, and claimed precisely what the load book and the marks could defend. The board issues findings that fix how ferries are loaded and tallied — which is the entire point of doing it right."
      ],
      "soundTitle": "Right — but Lightly Proven",
      "sound": [
        "Ostend names the right three — Vell, the Ferry Line's Office, and a concealed loss of stability from overloading. The shape of the case is correct, and the refusal to cry sabotage or shrug at an act of God is exactly right.",
        "But too many threads were left loose, and Vell's lawyers will pull at them. A few more days pinning the manifest to the marks and the missing tally would have made the finding unassailable. Close and honest, if not yet airtight."
      ],
      "namedTitle": "The Right Answer, Unearned",
      "named": [
        "Ostend names the truth — Vell, the office, the stability lost to overloading — but gathered too little to back it. It reads like a hunch that happened to land.",
        "The board cannot rewrite how a fleet is loaded on an accusation this thin, however correct. Being right is not the same as being able to prove it to the people who will fight the finding."
      ]
    },
    "overclaim": {
      "title": "The Board That Cried Torpedo",
      "body": [
        "Ostend reports a torpedo, a mine, a deliberate attack — the answer the cameras were already broadcasting. It is vivid, and it is not what the evidence shows.",
        "There was no blast, no breach, no scorch or shattered plating — only a hull that rode too low, a righting margin already spent, and water running free across an open vehicle deck until she rolled. When the attack story collapses, it takes credibility with it, and the real, provable failure is dismissed as just another conspiracy theory. The only weapon aboard was a loading book no one was willing to read."
      ]
    },
    "dismissal": {
      "title": "Case Closed on the Sea",
      "body": [
        "Ostend files it as a freak rogue wave, an act of God, nothing anyone could have prevented, and closes the file. It is comforting and it is wrong.",
        "The weather was calm, the barometer never moved, the tides and currents were charted and ordinary, and no other vessel felt a thing — while the Kestrel sailed with her marks under water and her stability given away in the loading. Blaming the sea leaves the real fault in place: a ferry line free to overload the next sailing exactly as it overloaded this one. The board saw a wave that was never there and never the number in the book."
      ]
    },
    "wrongNames": {
      "title": "So Close",
      "body": [
        "Ostend has the nature of it cold — a concealed loss of stability from overloading, too many vehicles and too little margin, neither a torpedo nor a freak wave. But the finger lands on the wrong name or the wrong room."
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A ferry rolling past its safe stability angle\"><path d=\"M160 76 L392 76 L356 106 L196 106 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.6\" transform=\"rotate(12 276 90)\"/><line x1=\"276\" y1=\"34\" x2=\"276\" y2=\"112\" stroke=\"#326891\" stroke-width=\"1.8\" stroke-dasharray=\"4 4\"/><path d=\"M0 112 C120 96,240 118,360 104 S560 94,660 108\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2\"/><path d=\"M276 66 L314 96\" stroke=\"#B3261E\" stroke-width=\"2.2\"/></svg>"
}};
