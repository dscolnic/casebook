module.exports = { PACK: {
  "id": "m_bridge",
  "title": "The Halloway Span",
  "discipline": "Structural & Fracture Mechanics",
  "teaser": "A long river bridge dropped a span into the water at rush hour. A barge that struck a pier? A once-in-history flood? Or a crack someone signed off?",
  "overclaimTag": "a barge strike or attack",
  "truthTag": "a fatigue crack past a skipped inspection",
  "venue": "the Halloway bridge inquiry",
  "agent": {
    "name": "Inspector Nora Selby",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Engineering credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Structural & Fracture Pioneers",
  "dossierName": "STRUCTURAL & FRACTURE PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Halloway bridge inquiry",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before the inquiry closes. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The place you test determines the dossier you receive, and the conversation costs one day.",
  "overclaimTease": "And beware the answer the cameras want: no barge and no attacker felled the Halloway Span — the evidence points to something quieter, and far harder to bury.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "br_authority",
      "items": [
        {
          "id": "br_authority",
          "label": "Gideon Marsh — bridge authority director"
        },
        {
          "id": "br_engineer",
          "label": "The maintenance engineer"
        },
        {
          "id": "br_inspector",
          "label": "The state bridge inspector"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "br_office",
      "items": [
        {
          "id": "br_truss",
          "label": "The Truss & the Cracked Gusset"
        },
        {
          "id": "br_pier",
          "label": "The Piers & Bearings"
        },
        {
          "id": "br_office",
          "label": "The Bridge Authority Office"
        }
      ]
    },
    "what": {
      "title": "What is happening",
      "truth": "br_fatigue",
      "items": [
        {
          "id": "br_strike",
          "label": "A barge strike or an attack on the span"
        },
        {
          "id": "br_flood",
          "label": "A freak flood scouring the pier — an act of God"
        },
        {
          "id": "br_fatigue",
          "label": "A fatigue crack ridden past a skipped inspection"
        }
      ]
    }
  },
  "PLACES": {
    "br_truss": {
      "name": "The Truss & the Cracked Gusset",
      "xy": [
        140,
        90
      ]
    },
    "br_pier": {
      "name": "The Piers & Bearings",
      "xy": [
        330,
        240
      ]
    },
    "br_office": {
      "name": "The Bridge Authority Office",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "br_truss",
      "br_pier"
    ],
    [
      "br_pier",
      "br_office"
    ]
  ],
  "CHARACTERS": {
    "br_rigger": {
      "name": "Rigger Tom Vasa",
      "role": "Bridge steel rigger",
      "face": "🔧",
      "badge": "R",
      "legend": "the truss",
      "hint": "Climbs the steel; found the gusset crack painted over more than once."
    },
    "br_ndt": {
      "name": "The NDT Technician",
      "role": "Non-destructive-test technician",
      "face": "🧲",
      "badge": "N",
      "legend": "the underdeck",
      "hint": "Runs the crack detectors; the flaw showed on scans that were never re-run."
    },
    "br_clerk": {
      "name": "The Clerk",
      "role": "Authority records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the office",
      "hint": "Holds the inspection files — and the report that shelved the re-inspection."
    }
  },
  "TOPICMAP": {
    "br_truss": {
      "br_rigger": [
        "br_griffith"
      ],
      "br_ndt": [
        "br_paris"
      ],
      "br_clerk": [
        "br_inglis"
      ]
    },
    "br_pier": {
      "br_rigger": [
        "br_orowan"
      ],
      "br_ndt": [
        "br_ammann"
      ],
      "br_clerk": [
        "br_ellet"
      ]
    },
    "br_office": {
      "br_rigger": [
        "br_moisseiff"
      ],
      "br_ndt": [
        "br_baker"
      ],
      "br_clerk": [
        "br_influence"
      ]
    }
  },
  "TOPICS": {
    "br_griffith": {
      "whatHint": "Griffith showed cracks grow when stored energy feeds them — steadily, not in a single blow. Ask what the fracture surface's growth marks record.",
      "sci": "A. A. Griffith (1893-1963)",
      "topic": "The energy theory of fracture",
      "lede": "The engineer who pulled glass fibers until they told him the secret every broken thing shares: it started at a flaw.",
      "no": 1,
      "profile": "A. A. Griffith was a British aeronautical engineer whose 1920 paper 'The Phenomena of Rupture and Flow in Solids' founded the modern science of fracture. He was gnawed by a long-standing puzzle: real materials broke at stresses far below the enormous strength their atomic bonds predicted. Testing thin glass fibers, he found that thinner fibers were stronger, which pointed at tiny flaws as the culprit — the smaller the sample, the smaller its worst crack could be.\n\nGriffith reframed fracture as a competition of energies. A crack in a stressed body stores elastic strain energy in the material around it; extending the crack releases some of that energy but costs energy to create fresh surface. He showed a crack grows only when the strain energy released outpaces the surface energy required. This gives a critical crack size for a given stress: below it the crack sits stable, above it the crack runs and the part fails. Small flaws, not weak atoms, set real strength.\n\nGriffith later helped pioneer the jet engine at Rolls-Royce, but his fracture criterion stayed his monument, soon extended to metals by Irwin and Orowan.\n\nFor this inquiry, Griffith is the first lesson against both easy stories. A steel truss does not fail because an angry river or a passing barge 'attacked' it from nowhere, nor is its failure an unknowable act of God. Fracture obeys an energy balance around a flaw of a definite, measurable size. A crack grown to critical length under ordinary traffic loads will let go — no barge and no flood needed. Griffith tells the board to find the flaw, measure it, and ask how long it was allowed to grow past the size at which it should have been caught.",
      "frame": "Vasa wipes grease from a wrench. \"Folks think steel just snaps when something big hits it. It doesn't — it starts at a flaw, and I've painted over that flaw myself. Tell me what really makes a crack run.\"",
      "q": [
        {
          "q": "What was Griffith's central insight about why materials break?",
          "o": [
            {
              "t": "Tiny pre-existing flaws, not weak atomic bonds, set a material's real strength.",
              "v": "expert",
              "fb": "Griffith showed flaws, not bond strength, govern when real materials fracture."
            },
            {
              "t": "Sound metal has no flaws at all, so a whole part fails mainly when something strikes it.",
              "v": "danger",
              "fb": "Sound steel still carries flaws; failure needs no outside blow to begin."
            },
            {
              "t": "Atoms slowly weaken with age until the entire part simply gives out on its own one day.",
              "v": "wrong",
              "fb": "Atoms don't just tire; growth of an existing crack is what ends the part."
            },
            {
              "t": "mainly the material's chemistry matters, and small surface flaws play no part in strength.",
              "v": "partial",
              "fb": "Chemistry matters, but Griffith proved flaw size dominates real strength."
            }
          ]
        },
        {
          "q": "In Griffith's energy balance, when does a crack actually grow?",
          "o": [
            {
              "t": "When the strain energy it releases exceeds the energy needed to make new surface.",
              "v": "expert",
              "fb": "Released strain energy beating surface-energy cost is Griffith's growth criterion."
            },
            {
              "t": "mainly when a sudden impact feeds it more energy than the surrounding metal can absorb.",
              "v": "danger",
              "fb": "No impact is needed; ordinary stored energy can drive a crack past critical."
            },
            {
              "t": "Whenever any load at all is applied, since every crack grows a little under any stress.",
              "v": "wrong",
              "fb": "Below the critical size a crack is stable; not every load makes it grow."
            },
            {
              "t": "When the crack happens to reach the exact center of the part, wherever that may lie.",
              "v": "partial",
              "fb": "Location isn't the trigger; the energy balance and crack length are."
            }
          ]
        },
        {
          "q": "Why does Griffith's criterion help the board reject a 'freak' explanation?",
          "o": [
            {
              "t": "It gives a crack a measurable critical size, so failure is traceable, not mere fate.",
              "v": "expert",
              "fb": "A definite critical length makes the failure knowable rather than a matter of fate."
            },
            {
              "t": "It suggests mainly a violent strike could ever supply the energy to break sound steel.",
              "v": "danger",
              "fb": "Stored energy, not a strike, routinely drives cracks to failure."
            },
            {
              "t": "It shows fracture is random, so no cause can ever really be pinned down after the fact.",
              "v": "wrong",
              "fb": "Griffith made fracture calculable, which is the opposite of random."
            },
            {
              "t": "It lets the board set the crack aside and study mainly the river's flow on the day.",
              "v": "partial",
              "fb": "The crack is the evidence; the river can't be studied in its place."
            }
          ]
        }
      ]
    },
    "br_paris": {
      "whatHint": "Paris put a rate to a crack's cyclic growth. A fatigue surface counts its own history; ask how many cycles this one had ridden.",
      "sci": "Paul C. Paris (1930-2017)",
      "topic": "The law of fatigue-crack growth",
      "lede": "The young engineer whose equation was rejected by three journals, then became the law that predicts how a crack creeps forward one truck at a time.",
      "no": 2,
      "profile": "Paul C. Paris was an American engineer who, around 1960, wrote the equation that lets engineers predict how fast a fatigue crack grows. Fracture mechanics could already say when a crack would fail, but not how quickly an existing crack would creep toward that point under repeated loads. Paris proposed that the growth per loading cycle depends on the range of the stress-intensity factor at the crack tip. His paper was famously turned down by leading journals before it became one of the most cited results in the field.\n\nParis's law states that the crack advance per cycle, da/dN, scales with the stress-intensity range, delta-K, raised to a power: da/dN equals C times delta-K to the m. Each pass of a loaded truck opens and closes the crack a little, and each cycle nudges the crack tip forward by an amount the law predicts. Because delta-K grows as the crack lengthens, the crack accelerates — slow for years, then alarmingly fast near the end. This is the mathematical heart of 'damage-tolerant' design: assume a flaw exists, calculate how many cycles it takes to reach critical size, and inspect well before then.\n\nFor this inquiry, Paris is the truth's own clock. A fatigue crack in a bridge gusset does not appear overnight and does not need a barge to grow; it advances a hair with every rush hour, year upon year, exactly as his law predicts. Crucially, the law tells inspectors when to look: there is a window in which the crack is detectable but not yet fatal. A skipped inspection is a skipped chance to catch it inside that window. Paris lets the board show the failure was slow, predictable, and missed — not sudden, and not fate.",
      "frame": "The technician sets down a probe. \"A crack like this doesn't jump — it walks, one truck at a time, and there's a math for its pace. Show me you know that math, and I'll pull the scans out for you.\"",
      "q": [
        {
          "q": "What does Paris's law predict?",
          "o": [
            {
              "t": "How far a fatigue crack advances per cycle, from the stress-intensity range delta-K.",
              "v": "expert",
              "fb": "da/dN versus delta-K is exactly the growth rate Paris quantified."
            },
            {
              "t": "The single overload that snaps a largely flawless member on its earliest loading cycle.",
              "v": "wrong",
              "fb": "That is one-shot overload; Paris describes slow, cyclic growth."
            },
            {
              "t": "The instant a barge or storm delivers the one impact that shears a whole span off.",
              "v": "danger",
              "fb": "Paris's crack grows over many ordinary cycles, not from one blow."
            },
            {
              "t": "How fast rust spreads across a steel surface exposed to river water over the years.",
              "v": "wrong",
              "fb": "That is corrosion rate; Paris's law is about cyclic crack growth."
            }
          ]
        },
        {
          "q": "Why does a fatigue crack speed up as it lengthens?",
          "o": [
            {
              "t": "Because delta-K rises with crack length, so each cycle advances it a little farther.",
              "v": "expert",
              "fb": "Longer crack means larger delta-K, so growth accelerates toward the end."
            },
            {
              "t": "Because the steel gets lighter as it cracks, so the same load stresses it far more.",
              "v": "wrong",
              "fb": "Mass loss isn't the driver; the rising stress-intensity range is."
            },
            {
              "t": "Because mainly a late impact from the river can inject the speed the early years lacked.",
              "v": "danger",
              "fb": "No late impact is needed; delta-K itself grows with the crack."
            },
            {
              "t": "Because the crack heats up as it moves and the warmth softens the metal ahead of it.",
              "v": "wrong",
              "fb": "Heating isn't the mechanism; the growing delta-K is."
            }
          ]
        },
        {
          "q": "How does Paris's law bear on a skipped inspection?",
          "o": [
            {
              "t": "It defines a window where the crack is detectable but not yet fatal, made for catching.",
              "v": "expert",
              "fb": "The predictable growth window is exactly what an inspection is meant to catch."
            },
            {
              "t": "It suggests the crack stayed largely invisible until the moment a barge finished the job for it.",
              "v": "danger",
              "fb": "The law shows a long detectable phase; no barge finishes it."
            },
            {
              "t": "It shows growth is random, so inspecting on any schedule would change nothing at all.",
              "v": "wrong",
              "fb": "Growth is predictable, which is precisely why scheduled inspection works."
            },
            {
              "t": "It says cracks grow too slowly to matter, so the missed inspection was harmless here.",
              "v": "partial",
              "fb": "Slow is not harmless; the crack still reaches critical if never caught."
            }
          ]
        }
      ]
    },
    "br_inglis": {
      "whatHint": "Inglis showed a small flaw magnifies stress far beyond the average load. The member could fail at ordinary river levels once the crack was there; ask whether the flood was cause or coincidence.",
      "sci": "Charles Inglis (1875-1952)",
      "topic": "Stress concentration at a crack",
      "lede": "The Cambridge professor who did the sums on a hole in a plate and showed that a sharp corner multiplies stress without mercy.",
      "no": 3,
      "profile": "Charles Inglis was a British civil engineer and Cambridge professor who, in 1913, solved a problem that would underpin all of fracture mechanics: how stress distributes around an elliptical hole in a loaded plate. His analysis showed that the stress is not spread evenly but piles up sharply at the ends of the ellipse — the tighter the curve, the higher the peak. For a very slender ellipse approaching a crack, the local stress can be many times the average stress far away.\n\nInglis captured this in a clean result: the stress concentration depends on the flaw's shape, rising with the ratio of its length to the radius of its tip. A round hole roughly triples the stress at its edge; a sharp crack, with a tip radius near zero, drives the local stress toward enormous values. This is why a small notch, scratch, or crack is so dangerous — not because it removes much material, but because it concentrates stress at its tip. Griffith drew directly on Inglis's work to build his energy theory a few years later.\n\nFor this inquiry, Inglis explains why a hairline crack in a gusset plate is not a cosmetic blemish to be painted over but a stress multiplier quietly doing damage. The very sharpness that makes a crack hard to see is what makes it dangerous: a barely visible flaw at a bolt hole or a weld toe can raise the local stress far past the yield point under ordinary loads. Inglis arms the board to reject the idea that a 'little crack' is harmless, and to insist that its geometry — not a barge, not a flood — is what set the collapse in motion.",
      "frame": "The clerk slides a folder across the desk. \"There are notes in here calling it a 'minor surface crack.' I keep wondering if a small crack is really a small problem. Explain the stresses to me before we open the file.\"",
      "q": [
        {
          "q": "What did Inglis show about stress around a sharp flaw?",
          "o": [
            {
              "t": "Stress piles up sharply at the tip, rising as the tip's radius grows smaller.",
              "v": "expert",
              "fb": "Inglis proved the sharper the flaw, the higher the local stress peak."
            },
            {
              "t": "Stress spreads out evenly, so a small hole barely changes the load in the plate.",
              "v": "wrong",
              "fb": "The opposite: stress concentrates hard at a sharp tip."
            },
            {
              "t": "Stress mainly ever peaks when an outside force strikes the plate at the flaw itself.",
              "v": "danger",
              "fb": "The concentration exists under ordinary load, with no strike at all."
            },
            {
              "t": "Stress drops to zero at any hole, since removed metal does not carry any load at all.",
              "v": "wrong",
              "fb": "Metal is gone at the hole, but stress spikes at its edge, not vanishes."
            }
          ]
        },
        {
          "q": "Why is a sharp crack more dangerous than a round hole of the same length?",
          "o": [
            {
              "t": "Its tiny tip radius drives the local stress far higher than a smooth curve does.",
              "v": "expert",
              "fb": "Small tip radius means a steeper stress concentration at the crack."
            },
            {
              "t": "It removes far more steel from the section than a round hole ever could remove.",
              "v": "wrong",
              "fb": "A crack removes little material; its danger is the sharp-tip stress spike."
            },
            {
              "t": "It rusts faster, and it is the rust, not the shape, that raises the stress there.",
              "v": "wrong",
              "fb": "The hazard is geometric stress concentration, not corrosion."
            },
            {
              "t": "It rings like a bell under traffic, and that ringing is what shakes the plate apart.",
              "v": "danger",
              "fb": "The issue is a static stress peak at the tip, not any ringing."
            }
          ]
        },
        {
          "q": "What does Inglis's result say about a 'minor' crack in a gusset?",
          "o": [
            {
              "t": "It is a stress multiplier under everyday loads, not a cosmetic blemish to paint over.",
              "v": "expert",
              "fb": "A sharp crack concentrates stress badly, however small it looks."
            },
            {
              "t": "It is harmless unless a barge later strikes the exact plate where the crack sits.",
              "v": "danger",
              "fb": "Ordinary loads already overstress the tip; no barge is needed."
            },
            {
              "t": "It matters mainly for how the bridge looks, since paint fully restores the steel's strength.",
              "v": "wrong",
              "fb": "Paint hides a crack; it restores none of the lost strength."
            },
            {
              "t": "It can be ignored until the crack grows to span the entire width of the plate; in use.",
              "v": "partial",
              "fb": "The tip is overstressed long before the crack spans the plate."
            }
          ]
        }
      ]
    },
    "br_orowan": {
      "whatHint": "Orowan studied how a crack tip yields as it advances. The surface tells slow tearing from a sudden break; ask which this was.",
      "sci": "Egon Orowan (1902-1989)",
      "topic": "Plasticity at the crack tip",
      "lede": "The physicist who explained why real metal is soft enough to bend and yet cracks anyway — and why Griffith's glass math needed a correction.",
      "no": 4,
      "profile": "Egon Orowan was a Hungarian-British physicist and one of the founders, alongside G. I. Taylor and Michael Polanyi in 1934, of the dislocation theory of plasticity — the insight that metals deform not by tearing whole planes of atoms apart at once but by the motion of line defects called dislocations. This is why real metals yield at stresses far below their theoretical strength, and why they can be bent, rolled, and drawn rather than shattering like glass.\n\nOrowan then connected plasticity to fracture. Griffith's energy theory, built on brittle glass, badly underpredicted the strength of metals, because it counted only the energy needed to create new crack surface. Orowan pointed out that in a metal, a crack tip is surrounded by a zone of plastic deformation, and driving the crack forward means doing plastic work that vastly exceeds the surface energy. Adding this plastic-work term to Griffith's balance brought the theory into agreement with metals, and Irwin reached the same conclusion independently — the two are often paired as the Griffith-Orowan or Irwin-Orowan correction.\n\nFor this inquiry, Orowan explains a subtle danger. Because bridge steel is ductile, it does not snap the instant a crack forms; it yields, absorbs energy, and endures — which can make a cracked member look reassuringly intact for years. That toughness is a blessing that becomes a trap when it lulls inspectors into complacency. A ductile steel gusset can carry a growing crack quietly until the remaining section can no longer yield fast enough, and then it fails. Orowan arms the board to see that 'it held this long' is not proof of safety; it is the very reason the crack could ride, undetected and uninspected, to the edge.",
      "frame": "Vasa flexes a steel offcut in his hands. \"This stuff bends, it doesn't shatter — that's why nobody panics over a crack. Tell me why that toughness can fool you, and I'll walk you through what I saw at the pier.\"",
      "q": [
        {
          "q": "What was Orowan's key contribution to understanding metals?",
          "o": [
            {
              "t": "Dislocation motion explains why metals yield well below their theoretical strength.",
              "v": "expert",
              "fb": "Moving dislocations let metals deform far more easily than perfect crystals."
            },
            {
              "t": "Metals contain no defects, so they should fail mainly at their full theoretical strength.",
              "v": "wrong",
              "fb": "The point is that defects — dislocations — make real metals yield early."
            },
            {
              "t": "Metals fail mainly when an external blow drives whole atomic planes apart at once.",
              "v": "danger",
              "fb": "Yielding happens gradually by dislocations, not by one violent blow."
            },
            {
              "t": "Metals are simply weaker versions of glass, with the same brittle failure mode.",
              "v": "wrong",
              "fb": "Metals yield plastically; glass does not — that is the whole distinction."
            }
          ]
        },
        {
          "q": "How did Orowan correct Griffith's theory for metals?",
          "o": [
            {
              "t": "By adding the plastic work at the crack tip, which dwarfs the surface energy term.",
              "v": "expert",
              "fb": "Plastic-zone work is the dominant energy cost in a metal, as Orowan showed."
            },
            {
              "t": "By removing the surface energy term largely, since metals have no surfaces to create.",
              "v": "wrong",
              "fb": "Surface energy remains; Orowan added plastic work, not deleted the term."
            },
            {
              "t": "By assuming the metal is struck hard enough to skip the plastic zone altogether.",
              "v": "danger",
              "fb": "He accounted for the plastic zone; he did not assume a strike bypassing it."
            },
            {
              "t": "By counting mainly the heat released, treating fracture as a purely thermal event.",
              "v": "wrong",
              "fb": "Fracture energy here is mechanical plastic work, not heat."
            }
          ]
        },
        {
          "q": "Why is a ductile steel's toughness a trap for inspectors?",
          "o": [
            {
              "t": "It carries a growing crack quietly for years, so 'it held' is no proof of safety.",
              "v": "expert",
              "fb": "Ductility hides the damage until the section can no longer yield."
            },
            {
              "t": "It means the steel can rarely crack at all, so any crack would be from a barge strike.",
              "v": "danger",
              "fb": "Ductile steel does crack by fatigue; toughness only delays, not prevents."
            },
            {
              "t": "It makes the member rust invisibly, which is the real reason it eventually gives way.",
              "v": "wrong",
              "fb": "The hazard is a fatigue crack riding on ductility, not hidden rust."
            },
            {
              "t": "It indicates a loud warning noise before failure, so no inspection is really needed.",
              "v": "partial",
              "fb": "Ductile failure can be quiet; inspection is exactly what catches it."
            }
          ]
        }
      ]
    },
    "br_ammann": {
      "whatHint": "Ammann's spans are designed against known loads, not sabotage. Ask whether any vessel or blast was truly near the pier — or whether the load was the bridge's own weight on a flaw.",
      "sci": "Othmar Ammann (1879-1965)",
      "topic": "Long-span suspension bridges",
      "lede": "The Swiss-born engineer who doubled the world's longest span in one leap and then sat in judgment when a lighter bridge tore itself apart.",
      "no": 5,
      "profile": "Othmar Ammann was a Swiss-American engineer who designed some of the greatest long-span bridges of the twentieth century, including the George Washington Bridge (1931), the Bayonne Bridge, the Bronx-Whitestone Bridge, and, late in life, the Verrazzano-Narrows Bridge (1964). When the George Washington opened, its main span nearly doubled the previous world record, a stunning jump made possible by his mastery of the suspension bridge, where the deck hangs from cables draped between towers and anchored at each end.\n\nAmmann understood that a long span is a balance of forces that must be traced with care: the dead load of the structure itself, the live load of traffic, and the effects of wind and temperature, all carried by cables into the towers and anchorages. He was also, crucially, a member of the board that investigated the 1940 collapse of the Tacoma Narrows Bridge, a lighter and more slender design that oscillated in the wind and destroyed itself. That inquiry marked him as an engineer willing to examine failure honestly, even when it implicated the trend toward ever-slimmer decks he had helped advance.\n\nFor this inquiry, Ammann is a model of the investigating engineer. He built at the frontier but respected the accounting of loads, and when a bridge failed he helped dissect exactly why rather than shrugging it off as bad luck. His example tells the board that even the most spectacular structures fail for traceable reasons found in the forces and the details. A span dropping into a river is not an act of God to be mourned and closed; it is a load path that failed somewhere specific, and the honest response — Ammann's response — is to find that place and name it.",
      "frame": "The technician spreads a cable diagram flat. \"Every load in a span like this has a path you can follow. I want to know you can follow one before I show you where a scan should have been re-run.\"",
      "q": [
        {
          "q": "How does a suspension bridge carry its loads?",
          "o": [
            {
              "t": "The deck hangs from cables draped between towers and anchored at each end.",
              "v": "expert",
              "fb": "Cables into towers and anchorages are the suspension load path."
            },
            {
              "t": "The deck rests directly on tall piers with no cables involved in the span at all.",
              "v": "wrong",
              "fb": "That is a girder or pier-supported bridge, not a suspension design."
            },
            {
              "t": "The roadway floats on the river's surface and the towers merely guide it along.",
              "v": "wrong",
              "fb": "The deck hangs from cables; it does not float on the water."
            },
            {
              "t": "The cables push the deck upward against the water pressure rising from below.",
              "v": "danger",
              "fb": "Cables carry the deck in tension down to anchorages, not against water."
            }
          ]
        },
        {
          "q": "What loads must a long-span designer account for?",
          "o": [
            {
              "t": "Dead load, live traffic load, and the effects of wind and temperature together.",
              "v": "expert",
              "fb": "All of these paths must be traced through cables to the anchorages."
            },
            {
              "t": "mainly the weight of the heaviest single truck expected to ever cross the deck.",
              "v": "wrong",
              "fb": "Dead load, wind, and temperature matter as much as any one vehicle."
            },
            {
              "t": "mainly the force of a barge or ship that might one day strike a supporting tower.",
              "v": "danger",
              "fb": "Impact is a rare case; routine dead, live, and wind loads govern design."
            },
            {
              "t": "mainly the current of the river pressing sideways against the bridge's foundations.",
              "v": "partial",
              "fb": "Current matters at piers, but the deck loads dominate a suspension span."
            }
          ]
        },
        {
          "q": "What did Ammann's role at Tacoma Narrows show about failures?",
          "o": [
            {
              "t": "That even a famous span fails for traceable reasons an honest inquiry can find.",
              "v": "expert",
              "fb": "He dissected the cause rather than calling the collapse bad luck."
            },
            {
              "t": "That spectacular bridges collapse purely by chance, beyond any real explanation.",
              "v": "danger",
              "fb": "The Tacoma inquiry found a specific cause; it was not mere chance."
            },
            {
              "t": "That once a bridge falls, the wreckage can teach investigators nothing useful.",
              "v": "wrong",
              "fb": "The failure taught the profession a lasting, specific lesson."
            },
            {
              "t": "That mainly the original designer may ever judge why a bridge came down at all.",
              "v": "partial",
              "fb": "Independent boards like Ammann's exist precisely to judge failures."
            }
          ]
        }
      ]
    },
    "br_ellet": {
      "whatHint": "Ellet's bridges lived and died by inspection and maintenance. Ask whether high water or a missed inspection is the fault the record actually supports.",
      "sci": "Charles Ellet Jr. (1810-1862)",
      "topic": "Early American suspension bridges",
      "lede": "The pioneer who strung the longest span on earth across the Ohio, then watched the wind take its deck five years later.",
      "no": 6,
      "profile": "Charles Ellet Jr. was an American civil engineer, trained partly in France, who pioneered the long-span suspension bridge in the United States. In 1849 he completed the Wheeling Suspension Bridge across the Ohio River, whose main span of just over 300 meters was then the longest in the world. He had earlier strung a pedestrian suspension bridge across the Niagara gorge, and he became known as a bold, sometimes headstrong promoter of daring spans in an era before the mathematics of such structures was fully understood.\n\nIn 1854 the Wheeling bridge's deck was destroyed in a windstorm. Eyewitnesses described the roadway heaving and twisting in the wind, undulating in great waves until it tore itself apart — a vivid early instance of the wind-induced oscillation that would famously destroy the Tacoma Narrows Bridge eighty-six years later. The bridge was rebuilt with stiffening measures. Ellet went on to other ventures and died in 1862 of a wound suffered commanding a Union ram vessel in the Civil War.\n\nFor this inquiry, Ellet's Wheeling bridge is an early warning that wind and dynamic loads are real, recurring, and knowable hazards, not mysterious visitations. Even in 1854, observers could see the deck responding to the wind in a way that pointed to a physical cause, and engineers learned to stiffen decks against it. The lesson is that when a span fails, the honest engineer asks what force and what weakness combined, and studies the record. Ellet arms the board to treat any 'the weather simply destroyed it' claim with suspicion: the weather acts on a structure whose vulnerabilities can be identified, and often should have been.",
      "frame": "The clerk opens a brittle old logbook. \"Bridges have been failing in the wind since long before ours, and every time there were notes if anyone read them. Show me you'd read them, and I'll share what's in here.\"",
      "q": [
        {
          "q": "What was notable about Ellet's Wheeling Suspension Bridge?",
          "o": [
            {
              "t": "Its main span was the longest in the world when it opened in 1849.",
              "v": "expert",
              "fb": "Wheeling held the world span record at completion, a real milestone."
            },
            {
              "t": "It was the first bridge ever built largely without any cables at all.",
              "v": "wrong",
              "fb": "It was a suspension bridge; cables were central to its design."
            },
            {
              "t": "It was designed to be destroyed and rebuilt every few years on purpose.",
              "v": "wrong",
              "fb": "It was meant to last; the 1854 wind failure was not intended."
            },
            {
              "t": "It carried railroad traffic across the widest river in North America.",
              "v": "partial",
              "fb": "It was a road span over the Ohio, celebrated for its record length."
            }
          ]
        },
        {
          "q": "What destroyed the Wheeling bridge's deck in 1854?",
          "o": [
            {
              "t": "Wind-induced oscillation that made the roadway heave and twist until it tore apart.",
              "v": "expert",
              "fb": "The deck's wind-driven undulation prefigured the Tacoma Narrows failure."
            },
            {
              "t": "A deliberate attack by rivals who resented the bridge's record-setting span.",
              "v": "danger",
              "fb": "It was a wind failure, not sabotage by any rival."
            },
            {
              "t": "A single overloaded wagon that snapped the main cable at its heaviest point.",
              "v": "wrong",
              "fb": "The deck failed dynamically in the wind, not from one wagon."
            },
            {
              "t": "A flood that rose over the roadway and simply floated the whole deck away.",
              "v": "partial",
              "fb": "It was wind oscillation of the deck, not a flood, that destroyed it."
            }
          ]
        },
        {
          "q": "What lesson does Wheeling hold for reading a bridge failure?",
          "o": [
            {
              "t": "Wind and dynamic loads are knowable hazards, so 'the weather did it' invites scrutiny.",
              "v": "expert",
              "fb": "Weather acts on identifiable weaknesses; the honest question is which one."
            },
            {
              "t": "Weather destroys bridges at random, so any storm-time failure needs no further study at all.",
              "v": "danger",
              "fb": "Failures have specific causes; randomness is the trap to avoid."
            },
            {
              "t": "Old failures are irrelevant, since nothing they show applies to a modern steel span.",
              "v": "wrong",
              "fb": "The wind-oscillation lesson carried straight through to modern spans."
            },
            {
              "t": "mainly the bridge's own builder can ever say why its deck came apart in a windstorm.",
              "v": "partial",
              "fb": "Records and physics let any careful investigator judge the cause."
            }
          ]
        }
      ]
    },
    "br_moisseiff": {
      "whatHint": "Moisseiff's Tacoma taught that failure hides in what was overlooked, not what was dramatic. Ask what routine check was skipped.",
      "sci": "Leon Moisseiff (1872-1943)",
      "topic": "Deflection theory & the Tacoma Narrows lesson",
      "lede": "The theorist whose elegant math made decks slimmer and cheaper — until the slimmest of them waved itself to pieces in a moderate wind.",
      "no": 7,
      "profile": "Leon Moisseiff was a Latvian-American engineer, one of the most respected suspension-bridge theorists of his era, who consulted on landmark spans including the Manhattan Bridge and the Golden Gate. He is closely associated with 'deflection theory,' a refined method of analyzing how a suspension bridge's cables and deck share load as the structure deflects. Applied well, deflection theory showed that the main cables carried more of the load than older methods assumed, which meant the stiffening trusses could be made lighter and shallower — more graceful and far more economical.\n\nMoisseiff designed the Tacoma Narrows Bridge (1940) as the fullest expression of this slender ideal: a long span with a very shallow, solid-plate girder deck. It was beautiful and cheap. It was also aerodynamically unstable. Months after opening, in a wind of only around 40 miles per hour, the deck began to twist in a growing torsional oscillation and tore itself apart. Deflection theory had correctly handled static loads but said nothing about aerodynamic behavior, and the drive for slenderness had eliminated the stiffness that might have resisted the motion. Moisseiff, previously celebrated, was central to the inquiry that followed.\n\nFor this inquiry, Moisseiff is a cautionary tale about the pursuit of economy past the point of prudence. His mathematics was not wrong; it was incomplete, and it was pushed to shave margins in service of cost and elegance. That is a decision made by people, not by nature. The board should recognize how a respected authority can rationalize trimming a safeguard — a stiffening truss, or an inspection — because the numbers seemed to allow it. Moisseiff arms the player to see the truth's shape: a systemic choice to cut a margin, dressed in the language of sound engineering.",
      "frame": "Vasa leans in the office doorway, out of place in his work boots. \"Up top they love a design that saves money. Tacoma taught me where that ends. Tell me what went wrong there, and I'll pass on what I heard in this building.\"",
      "q": [
        {
          "q": "What did deflection theory allow suspension-bridge designers to do?",
          "o": [
            {
              "t": "Make stiffening trusses lighter and shallower by crediting the cables with more load.",
              "v": "expert",
              "fb": "Deflection theory let decks grow slender and cheaper — its great appeal."
            },
            {
              "t": "Eliminate the main cables largely, letting the deck span on its own strength.",
              "v": "wrong",
              "fb": "The cables remained essential; the theory reallocated load to them."
            },
            {
              "t": "Predict exactly how a deck would behave in high winds and gusts of any speed.",
              "v": "danger",
              "fb": "It handled static loads, not aerodynamics — the very gap that doomed Tacoma."
            },
            {
              "t": "Build bridges without any anchorages, since deflection replaced the need for them.",
              "v": "wrong",
              "fb": "Anchorages stayed vital; the theory concerned load sharing, not anchoring."
            }
          ]
        },
        {
          "q": "Why did the Tacoma Narrows Bridge collapse in 1940?",
          "o": [
            {
              "t": "A slender, solid deck grew aerodynamically unstable and tore apart in a moderate wind.",
              "v": "expert",
              "fb": "Torsional wind-driven oscillation of the shallow deck destroyed it."
            },
            {
              "t": "An unusually violent, record-breaking hurricane overwhelmed a closely sound design.",
              "v": "danger",
              "fb": "The wind was moderate; the deck's own instability was the cause."
            },
            {
              "t": "The main suspension cables corroded through within months of the bridge opening.",
              "v": "wrong",
              "fb": "The cables held; the deck failed aerodynamically, not by corrosion."
            },
            {
              "t": "Overloaded rush-hour traffic exceeded the deck's static capacity that afternoon.",
              "v": "partial",
              "fb": "Traffic wasn't the issue; it was wind-driven torsional motion."
            }
          ]
        },
        {
          "q": "What warning does Moisseiff's story carry into this case?",
          "o": [
            {
              "t": "A respected authority can rationalize trimming a margin, and that is a human choice.",
              "v": "expert",
              "fb": "Cutting a safeguard for economy is a decision, not an act of nature."
            },
            {
              "t": "Great engineers rarely err, so any modern failure would be an outside attack.",
              "v": "danger",
              "fb": "Moisseiff shows respected experts do err by shaving margins."
            },
            {
              "t": "Slender designs are generally unsafe, so the failure needs no further investigation.",
              "v": "wrong",
              "fb": "Slender can be safe if aerodynamics and margins are respected."
            },
            {
              "t": "Economical design is implausible, so cost should rarely enter an engineer's mind.",
              "v": "partial",
              "fb": "Economy is fine until it quietly eats a safety margin, as here."
            }
          ]
        }
      ]
    },
    "br_baker": {
      "whatHint": "Baker built the Forth Bridge to be inspected forever. Ask whether the scans had already found this flaw — years before any barge or flood.",
      "sci": "Benjamin Baker (1840-1907)",
      "topic": "The Forth Bridge & the cantilever",
      "lede": "The engineer who answered the Tay disaster with a bridge so robust its name became shorthand for a job that never ends.",
      "no": 8,
      "profile": "Benjamin Baker was a British civil engineer who, with John Fowler, designed the Forth Bridge in Scotland, opened in 1890. It was the first major structure in Britain built largely of steel rather than iron, and it used the cantilever principle: great balanced arms reach out from three towers, each arm counterweighted by its opposite, meeting over the deep water of the Firth of Forth. Baker famously explained the concept with a 'human cantilever' demonstration, men and props embodying how the loads balanced.\n\nThe Forth Bridge was deliberately, even defiantly, robust. It was designed in the immediate shadow of the 1879 Tay Bridge collapse, and public confidence in long spans was shattered. Baker responded with generous wind-load provisions and a massive, visibly strong structure that reassured a wary nation. It has carried rail traffic for well over a century. Its endless repainting became a proverb — 'like painting the Forth Bridge' means a task that is never finished — precisely because sustained maintenance and inspection are what keep such a structure sound against corrosion and fatigue.\n\nFor this inquiry, Baker embodies the two defenses that keep a bridge standing: conservative margins in design, and relentless upkeep in service. The Forth Bridge is the anti-Tay — it shows what it looks like to take a hazard seriously and to accept that safety is an ongoing commitment, not a one-time achievement. That proverb about painting is really a lesson about inspection: the watch never stops. Baker arms the board to measure the Halloway authority against this standard. A failure is not fate when the tools to prevent it — margin and maintenance — were well understood and simply not sustained.",
      "frame": "The technician sets a scan printout on the office desk. \"The Forth Bridge stands because somebody's always inspecting it — the work never stops. I want to know you respect that watch before I show you the scan they filed away.\"",
      "q": [
        {
          "q": "What structural principle does the Forth Bridge use?",
          "o": [
            {
              "t": "The cantilever — balanced arms reach from towers, each counterweighted by its opposite.",
              "v": "expert",
              "fb": "Balanced cantilever arms meeting mid-span define the Forth Bridge."
            },
            {
              "t": "The suspension principle, with the whole deck hung from cables between two towers.",
              "v": "wrong",
              "fb": "It is a cantilever bridge, not a suspension span."
            },
            {
              "t": "A single great arch springing from bank to bank over the firth in one leap.",
              "v": "wrong",
              "fb": "It uses cantilevers from multiple towers, not a single arch."
            },
            {
              "t": "A floating pontoon deck resting on the water and anchored against the current.",
              "v": "partial",
              "fb": "It stands on towers as a cantilever, not on floating pontoons."
            }
          ]
        },
        {
          "q": "Why was the Forth Bridge built so conservatively robust?",
          "o": [
            {
              "t": "It followed the 1879 Tay disaster, so it took wind and strength very seriously.",
              "v": "expert",
              "fb": "Public fear after the Tay drove its generous margins and heavy build."
            },
            {
              "t": "Its builders expected constant attacks and armored it against deliberate damage.",
              "v": "danger",
              "fb": "The concern was engineering safety after the Tay, not attacks."
            },
            {
              "t": "Steel was so cheap that using far too much of it simply cost the builders nothing.",
              "v": "wrong",
              "fb": "The robustness was a deliberate safety response, not idle surplus."
            },
            {
              "t": "It was meant mainly to look impressive, with no real change to its safety margins.",
              "v": "partial",
              "fb": "The strength was genuine engineering conservatism, not mere appearance."
            }
          ]
        },
        {
          "q": "What does 'painting the Forth Bridge' really teach the board?",
          "o": [
            {
              "t": "Safety is ongoing upkeep and inspection, never a one-time achievement.",
              "v": "expert",
              "fb": "The endless maintenance is the point: the watch never stops."
            },
            {
              "t": "Once a bridge is strong enough, maintenance is a waste and can be dropped.",
              "v": "danger",
              "fb": "The proverb says the opposite — upkeep is perpetual and essential."
            },
            {
              "t": "Painting is purely cosmetic, so skipping it has no effect on real safety.",
              "v": "wrong",
              "fb": "The paint fights corrosion; the routine stands for real inspection."
            },
            {
              "t": "mainly brand-new bridges need attention, and a century-old span can be left alone.",
              "v": "partial",
              "fb": "Old spans need the watch most; the Forth is inspected constantly."
            }
          ]
        }
      ]
    },
    "br_influence": {
      "whatHint": "Müller-Breslau's influence lines say which loads a member actually feels. Ask whether scour at the pier even loads the member that broke — or whether the crack did.",
      "sci": "Heinrich Müller-Breslau (1851-1925)",
      "topic": "Influence lines & structural analysis",
      "lede": "The analyst who found a way to ask a bridge exactly where a moving truck hurts it most — and get a picture for an answer.",
      "no": 9,
      "profile": "Heinrich Müller-Breslau was a German engineer and professor in Berlin who systematized the analysis of structures, especially the tools for handling statically indeterminate frames and trusses. He is best known for the influence line and the principle that bears his name. An influence line is a graph that shows how some effect at one point in a structure — a reaction, a bending moment, the force in a particular member — changes as a single unit load moves across the span. It answers the vital question: where must a load sit to stress this member the most?\n\nThe Müller-Breslau principle gives an elegant shortcut: the influence line for a given force has the same shape as the deflected form the structure takes if you release that force and impose a small displacement in its direction. This let engineers draw the critical loading pattern almost by inspection, without laborious recomputation for every load position. For a bridge, whose loads are forever moving, influence lines are indispensable: they identify which member carries the peak force under traffic and precisely where the worst-case train or convoy must be placed.\n\nFor this inquiry, Müller-Breslau's tools point straight at the vulnerable detail. A bridge's most-stressed member under live load is not a guess; it can be located analytically, which is exactly how engineers know which gusset, which joint, which connection to watch most closely. That analysis tells inspectors where fatigue will bite first. If the failed member was a known critical detail — one any influence-line analysis would flag — then the case is not that a hidden weakness lurked beyond anyone's reach, but that the very spot most in need of inspection was the spot left unwatched.",
      "frame": "The clerk unrolls a stress diagram over the ledgers. \"There's a way to know which piece of a bridge takes the worst of the traffic. The pieces we should watch hardest. Explain it to me, and I'll show you which one we stopped watching.\"",
      "q": [
        {
          "q": "What does an influence line show?",
          "o": [
            {
              "t": "How an effect at one point changes as a single unit load moves across the span.",
              "v": "expert",
              "fb": "That is exactly an influence line — effect versus load position."
            },
            {
              "t": "The total weight of every vehicle on the bridge added up at one instant.",
              "v": "wrong",
              "fb": "It tracks one moving unit load's effect, not a summed total."
            },
            {
              "t": "The path a barge would take through the river toward a supporting pier.",
              "v": "danger",
              "fb": "It concerns moving loads on the structure, not barge paths."
            },
            {
              "t": "The temperature across a steel member on a hot afternoon in full sun.",
              "v": "wrong",
              "fb": "It is a structural-load diagram, unrelated to temperature."
            }
          ]
        },
        {
          "q": "What does the Müller-Breslau principle let engineers do?",
          "o": [
            {
              "t": "Read an influence line from the deflected shape after releasing that force.",
              "v": "expert",
              "fb": "Release the force, sketch the deflection — that shape is the influence line."
            },
            {
              "t": "Skip analysis largely, since any member can carry any load without checking.",
              "v": "wrong",
              "fb": "It streamlines analysis; it does not let you skip checking members."
            },
            {
              "t": "suggests a structure is safe against any deliberate attack on its members.",
              "v": "danger",
              "fb": "It concerns live-load effects, not resistance to attack."
            },
            {
              "t": "Calculate mainly the dead weight of the bridge, ignoring the moving traffic.",
              "v": "partial",
              "fb": "Its whole purpose is moving live loads, not just dead weight."
            }
          ]
        },
        {
          "q": "How do influence lines bear on which member to inspect?",
          "o": [
            {
              "t": "They locate the most-stressed member under traffic, so inspectors know where to watch.",
              "v": "expert",
              "fb": "The critical detail is identifiable, which is exactly where fatigue bites."
            },
            {
              "t": "They suggests the critical spot is unknowable, so inspection is just a matter of luck.",
              "v": "danger",
              "fb": "The critical member is calculable, not a matter of luck."
            },
            {
              "t": "They show every member is stressed equally, so no spot deserves special attention.",
              "v": "wrong",
              "fb": "Live loads stress members very unequally; some are far more critical."
            },
            {
              "t": "They matter mainly during design and tell inspectors nothing once the bridge is open.",
              "v": "partial",
              "fb": "They flag exactly the details in-service inspection must prioritize."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "br_rigger": {
      "br_truss": "Vasa runs a thumb along a weld seam on the recovered gusset, flaking off dried paint. \"I climbed this steel for twenty years. That crack was here long before it let go — I know, because I'm the one they had paint over it. Show me you know how steel really fails, and I'll tell you the rest.\"",
      "br_pier": "Vasa stands at the bearing, boots on wet concrete, glaring at the current. \"They want you staring at the river and the barges. I keep staring up at the steel. Prove you can tell an ordinary load from a freak accident, and I'll walk you through what I found down here.\"",
      "br_office": "Vasa looks wrong in the carpeted office, hard hat turning in his hands. \"Up here they sign the papers a rigger never gets to read. Tell me you understand how a bridge actually comes down, and I'll tell you whose door I'd be knocking on.\""
    },
    "br_ndt": {
      "br_truss": "The technician holds a scan film up to the light beside the cracked gusset. \"The flaw is right here, on a plate I imaged two years back. Nobody ever asked me to run it again. Show me you know what this picture means, and I'll lay the dates out for you.\"",
      "br_pier": "At the pier the technician kneels, pressing a probe to the bearing. \"An act of God, they keep telling me. My instruments don't record acts of God — they record cracks. Convince me you'd trust the readings over the story, and I'll share them.\"",
      "br_office": "The technician spreads scan printouts across a conference table that isn't theirs. \"The evidence sat in this building the whole time, filed and forgotten. Prove you can read what a scan is really saying, and I'll tell you exactly which one got shelved.\""
    },
    "br_clerk": {
      "br_truss": "The clerk meets you under the truss, clutching a folder against the wind. \"I don't climb steel, but I file everything about it. There's a word in these notes — 'minor' — that has kept me up at night. Explain the engineering to me, and I'll open the folder.\"",
      "br_pier": "By the piers the clerk shivers, gesturing at the water. \"Everyone wants this to be the flood. But floods don't leave a paper trail, and I keep finding paper. Show me you won't settle for 'the river did it,' and I'll open the record for you.\"",
      "br_office": "In the records room the clerk sets a thick file on the desk between you. \"This is where it all lives — the inspections, the sign-offs, the one report that never became an order. Prove you understand what should have happened, and I'll let you read what did.\""
    }
  },
  "story": [
    "The <b>Halloway Span</b> had carried the river road for forty years, long enough that the town stopped noticing it. Then, at the height of the evening rush, a whole section of it folded and dropped into the water, cars and all. Before the divers were in the river, the explanations had already begun. You are <b>Inspector Nora Selby</b>, and the bridge inquiry has handed you the file that everyone has an opinion about and no one wants to sign.",
    "<b>Three witnesses will meet you across the span</b>, and no one of them holds the whole of it. <b>Rigger Tom Vasa</b>, who climbed the steel for two decades and painted over a crack more than once on orders from above. <b>The NDT Technician</b>, whose crack detectors caught a flaw on a plate that was never scanned again. And <b>the Clerk</b>, who keeps the authority's inspection files — including the report that quietly shelved a re-inspection. Earn their trust and they will talk.",
    "<b>Someone here is behind it.</b> Three names sit in your notepad: <b>Gideon Marsh</b>, the bridge authority's director, who set the budgets and the schedule; the <b>maintenance engineer</b>, who worked the steel; and the <b>state bridge inspector</b>, who was meant to check it. Every column of the case — <b>who</b> is behind it, <b>where</b> it culminates, and <b>what</b> truly happened — comes paired with a seductive wrong answer. The headlines want <b>a barge strike, or an attack on the span</b>. The easy verdict wants <b>a freak flood, an act of God no one could have foreseen</b>. The truth is narrower than the first and graver than the second — and someone has already made a page of it disappear.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and decide the <b>WHAT</b> from the evidence."
  ],
  "endings": {
    "overclaimWhat": "br_strike",
    "dismissalWhat": "br_flood",
    "win": {
      "expertTitle": "What the Steel Proves, and No More",
      "expert": [
        "Selby names it exactly: Gideon Marsh, the bridge authority's director, who set the schedule and shelved the re-inspection; the truth culminating in the Bridge Authority Office, where the filed report and the order that never issued live; and a fatigue crack ridden past a skipped inspection — a flaw that grew truck by truck until an ordinary rush hour finished it. Not a barge. Not a flood sent by God.",
        "Every card accounted for. Selby worked the truss, the piers, and the office, turned a rigger, a technician, and a clerk into witnesses, and claimed precisely what the scans and the paperwork could defend. The inquiry issues findings that close the office's excuses and force the crack into the light — which is the entire point of doing it right."
      ],
      "soundTitle": "Right — but Lightly Proven",
      "sound": [
        "Selby names the right three — Marsh, the Authority Office, and a fatigue crack ridden past a skipped inspection. The shape of the case is correct, and the refusal to cry sabotage or shrug at the weather is exactly right.",
        "But too many threads were left loose, and the authority's lawyers will pull at them. A few more days tracing the crack's growth and the shelved report would have made the finding unassailable. Close and honest, if not yet airtight."
      ],
      "namedTitle": "The Right Answer, Unearned",
      "named": [
        "Selby names the truth — Marsh, the Authority Office, the fatigue crack past a missed inspection — but gathered too little to back it. It reads like a hunch that happened to land.",
        "The inquiry cannot condemn a director on an accusation this thin, however correct. Being right is not the same as being able to prove it to the people who will fight the finding."
      ]
    },
    "overclaim": {
      "title": "The Inquiry That Cried Sabotage",
      "body": [
        "Selby reports a barge strike — or a deliberate attack on the span — the answer the cameras were already broadcasting. It is vivid, and it is not what the evidence shows.",
        "No vessel was near the pier that evening, the fracture surface records slow, cyclic growth rather than a sudden blow, and the scans caught the flaw years before the water ever did. When the overclaim collapses, it takes credibility with it, and the real, provable failure is waved off as just another conspiracy theory. The only assault on the Halloway Span was a crack no one was sent to find."
      ]
    },
    "dismissal": {
      "title": "Case Closed on the River",
      "body": [
        "Selby files it as a freak flood scouring the pier — an act of God, nobody's fault, close the file. It is half true and misses the graver half.",
        "The river did run high that season, but the steel failed at a crack that had been documented and then forgotten, on a member any real inspection would have flagged. Blaming the weather leaves the same flaw waiting in every span the authority never re-inspects. The board saw the water rise and never the fracture riding, uninspected, to the edge."
      ]
    },
    "wrongNames": {
      "title": "So Close",
      "body": [
        "Selby has the nature of it cold — a fatigue crack ridden past a skipped inspection, neither a barge strike nor an act of God. But the finger lands on the wrong name or the wrong room."
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A truss bridge with a fatigue crack at a gusset\"><path d=\"M36 104 H624 M64 104 L132 42 L200 104 L268 42 L336 104 L404 42 L472 104 L540 42 L608 104\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.6\"/><path d=\"M132 42 H540\" stroke=\"#121212\" stroke-width=\"1.5\"/><circle cx=\"336\" cy=\"104\" r=\"8\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"2\"/><path d=\"M336 96 l-10 -18 M336 96 l12 -16\" stroke=\"#B3261E\" stroke-width=\"2\"/><path d=\"M0 124 C120 114,240 132,360 122 S540 114,660 124\" fill=\"none\" stroke=\"#326891\" stroke-width=\"1.4\"/></svg>"
}};
