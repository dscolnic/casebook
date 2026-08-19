module.exports = { PACK: {
  "id": "rail",
  "title": "The 8:14 to Ardenmoor",
  "discipline": "Railway Safety Engineering",
  "teaser": "A commuter train left the rails on a straight. A bomb on the line? A careless driver? Or maintenance quietly deferred?",
  "overclaimTag": "sabotage on the line",
  "truthTag": "concealed deferred maintenance",
  "venue": "the Ardenmoor rail inquiry",
  "agent": {
    "name": "Investigator Wren Halcott",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Railway Pioneers",
  "dossierName": "RAILWAY PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Ardenmoor rail inquiry",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before the inquiry closes. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The WHERE you test determines the dossier you receive, and the conversation costs one day.",
  "overclaimTease": "And beware the answer the front pages want: the evidence points not to a device on the line, but to something quieter, and far harder to bury.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "infra",
      "items": [
        {
          "id": "infra",
          "label": "Doran Kell — infrastructure operator"
        },
        {
          "id": "driver",
          "label": "The train driver"
        },
        {
          "id": "regulator",
          "label": "The rail safety inspector"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "office",
      "items": [
        {
          "id": "track",
          "label": "The Track & Points"
        },
        {
          "id": "signalbox",
          "label": "The Signal Centre"
        },
        {
          "id": "office",
          "label": "The Operator's Head Office"
        }
      ]
    },
    "what": {
      "title": "What is happening",
      "truth": "neglect",
      "items": [
        {
          "id": "sabotage",
          "label": "Sabotage — something left on the line"
        },
        {
          "id": "driver",
          "label": "Simple driver error — a signal passed"
        },
        {
          "id": "neglect",
          "label": "Concealed deferred maintenance & a bypassed safeguard"
        }
      ]
    }
  },
  "PLACES": {
    "track": {
      "name": "The Track & Points",
      "xy": [
        140,
        90
      ]
    },
    "signalbox": {
      "name": "The Signal Centre",
      "xy": [
        330,
        240
      ]
    },
    "office": {
      "name": "The Operator's Head Office",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "track",
      "signalbox"
    ],
    [
      "signalbox",
      "office"
    ]
  ],
  "CHARACTERS": {
    "ganger": {
      "name": "Ganger Roe",
      "role": "Permanent-way ganger",
      "face": "🔧",
      "badge": "R",
      "legend": "the track",
      "hint": "Walks the rails; flagged the cracked joint that was never renewed."
    },
    "signaller": {
      "name": "The Signaller",
      "role": "Signal-centre operator",
      "face": "🚦",
      "badge": "S",
      "legend": "the box",
      "hint": "Worked the panel; knows which safeguard was switched out to keep trains running."
    },
    "clerk": {
      "name": "The Clerk",
      "role": "Records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the office",
      "hint": "Holds the maintenance backlog and the budget memo that froze it."
    }
  },
  "TOPICMAP": {
    "track": {
      "ganger": [
        "railpioneer"
      ],
      "signaller": [
        "locomotive"
      ],
      "clerk": [
        "railprofile"
      ]
    },
    "signalbox": {
      "ganger": [
        "steelrail"
      ],
      "signaller": [
        "axlefail"
      ],
      "clerk": [
        "mucontrol"
      ]
    },
    "office": {
      "ganger": [
        "vibration"
      ],
      "signaller": [
        "brittle"
      ],
      "clerk": [
        "speed"
      ]
    }
  },
  "TOPICS": {
    "railpioneer": {
      "sci": "George Stephenson (1781-1848)",
      "topic": "The Rocket & the birth of railways",
      "lede": "The illiterate colliery boy who taught himself engines and gave the world its iron roads, its Rocket, and the gauge nearly every railway still runs on.",
      "no": 1,
      "profile": "George Stephenson rose from an illiterate colliery worker to 'the Father of Railways,' teaching himself to read at eighteen while tending pumping engines in the Northumberland coalfields. He built his reputation first on safety: in 1815 he devised a miner's safety lamp, the 'Geordie,' independently of Humphry Davy. But his lasting work was the railway. At Killingworth colliery he built a series of steam locomotives, and in 1825 he engineered the Stockton and Darlington Railway, the first public line to use steam traction.\n\nHis masterpiece was the Liverpool and Manchester Railway, opened in 1830, the first inter-city line worked wholly by locomotives. To choose them a competition was held at Rainhill in 1829, and the Rocket, built by George with his son Robert, won decisively: it combined a multi-tube boiler, a blast pipe, and directly driven cylinders into the template every steam locomotive would follow. Stephenson also fixed the gauge of 4 feet 8 and a half inches, which spread across the world as 'standard gauge.'\n\nStephenson understood a railway as a whole system: not just an engine, but a graded, drained, maintained 'permanent way' of rails, sleepers, and ballast that had to be built well and kept up. He fought for gentle gradients and solid foundations because he knew the road, not only the engine, carried the train.\n\nFor this inquiry, that is the point. Stephenson's railway was never a finished monument; it was a machine that wears, and a train leaving the rails on a straight speaks first to the state of that machine. Before anyone imagines a device left on the line, his legacy asks the plainer question: was the permanent way maintained as he insisted it must be?",
      "frame": "Roe knocks ballast from his boot. \"Everyone starts with Stephenson, because he started all of it. Show me you know where railways came from, and I'll show you where this one went wrong.\"",
      "q": [
        {
          "q": "What made Stephenson's Rocket the winning design at Rainhill?",
          "o": [
            {
              "t": "A multi-tube boiler with a blast pipe, raising steam fast for sustained speed.",
              "v": "expert",
              "fb": "The fire-tube boiler and blast pipe let Rocket make steam continuously."
            },
            {
              "t": "A single wide flue through the boiler, hoarding heat for the long steep banks.",
              "v": "wrong",
              "fb": "One big flue could not raise steam fast enough; many small tubes won."
            },
            {
              "t": "Its tall driving wheels alone, geared so high that no rival could keep its pace.",
              "v": "partial",
              "fb": "Big wheels helped, but the boiler and draught were the real advance."
            },
            {
              "t": "A gear train set between the pistons and the axle, dropped by every later engine.",
              "v": "wrong",
              "fb": "Rocket drove its wheels directly; the gearing idea belonged to older engines."
            }
          ]
        },
        {
          "q": "What system did Stephenson insist a railway needed beyond the engine?",
          "o": [
            {
              "t": "A graded, drained permanent way of rails, sleepers and ballast, kept in repair.",
              "v": "expert",
              "fb": "Stephenson built the whole road, not just the engine, and kept it maintained."
            },
            {
              "t": "A telegraph along every mile, without which no locomotive could be run safely.",
              "v": "wrong",
              "fb": "Telegraph came later; his insistence was on the permanent way itself."
            },
            {
              "t": "primarily heavier rails, since track upkeep was a matter engines made unnecessary.",
              "v": "partial",
              "fb": "Heavier rail helps, but the point was continuous upkeep of the road."
            },
            {
              "t": "Nothing but a firm level bed, which once laid would rarely need touching again.",
              "v": "danger",
              "fb": "A railway bed wears under traffic and is likely to be renewed, not laid and forgotten."
            }
          ]
        },
        {
          "q": "Why does Stephenson's view of the railway matter to this inquiry?",
          "o": [
            {
              "t": "A railway is a machine that wears and needs upkeep, not a finished monument, in use.",
              "v": "expert",
              "fb": "Treating the railway as a wearing machine points first at its maintenance."
            },
            {
              "t": "It shows primarily an object left on the line could throw a train off good track.",
              "v": "danger",
              "fb": "Sound track does not need sabotage to fail; worn track fails on its own."
            },
            {
              "t": "It is presented as showing a track built to gauge is safe for good and rarely wants renewing.",
              "v": "wrong",
              "fb": "Rails and joints wear and crack; gauge alone is no strongly support of safety."
            },
            {
              "t": "It means the locomotive, not the road beneath it, decides every derailment, in use.",
              "v": "partial",
              "fb": "The road beneath the train derails trains as surely as any engine fault."
            }
          ]
        }
      ]
    },
    "locomotive": {
      "sci": "Robert Stephenson (1803-1859)",
      "topic": "Locomotives & rail bridges",
      "lede": "George's only son, who drew the Rocket's boiler, spanned the Menai Strait with iron tubes, and learned from a bridge that fell what repeated loads can do.",
      "no": 2,
      "profile": "Robert Stephenson, the only son of George, was in his own right one of the greatest engineers of the nineteenth century. He ran the locomotive works at Newcastle that built the Rocket in 1829, much of its detailed design his own, and went on to engineer the London and Birmingham Railway, then the trunk lines that stitched Britain together. But it is his bridges that teach this inquiry the most.\n\nHe built the High Level Bridge at Newcastle and the Royal Border Bridge at Berwick, and, most daringly, the Britannia Bridge across the Menai Strait, where trains ran inside great wrought-iron tubes, a form he developed with the ironmaster William Fairbairn and the mathematician Eaton Hodgkinson after exhaustive model testing. It was pioneering structural engineering: they calculated and tested rather than guessed.\n\nThe hardest lesson came from failure. In 1847 his cast-iron girder bridge over the River Dee collapsed under a passing train, killing five. The inquiry that followed exposed the treachery of cast iron in bending and the way repeated traffic could work a flaw until it broke. It helped turn engineers away from brittle cast iron toward wrought iron and, later, steel, and toward the idea that structures must be understood under the loads they carry again and again.\n\nFor this inquiry, Robert Stephenson is the reminder that a structure under traffic can fail progressively and quietly. The Dee Bridge did not fall to a saboteur; it fell because a flawed member was loaded past what it could endure, over and over. A rail or a joint carrying train after train can do the same, a slow physical decline with a signature an investigator can read, entirely unlike an object left on the line.",
      "frame": "Lays a diagram flat. \"Robert Stephenson built the strongest bridges of his age and watched one fall anyway. Show me you understand what traffic does to iron, and I'll tell you about the box.\"",
      "q": [
        {
          "q": "What did Robert Stephenson's Britannia Bridge pioneer?",
          "o": [
            {
              "t": "Wrought-iron tubes carrying trains inside them, proven first by model testing.",
              "v": "expert",
              "fb": "Trains ran inside tubular wrought-iron beams, tested on models beforehand."
            },
            {
              "t": "A cast-iron arch, the strongest form then known for spanning wide water.",
              "v": "wrong",
              "fb": "It was tubular wrought iron, chosen over the cast iron he came to distrust."
            },
            {
              "t": "Steel plate girders, the material that would define bridges for the century.",
              "v": "partial",
              "fb": "Steel came later; Britannia was wrought iron, tested and calculated."
            },
            {
              "t": "A suspension deck so light that any heavy train would set it swaying wildly.",
              "v": "danger",
              "fb": "The tubes were rigid beams, not a swaying suspension span."
            }
          ]
        },
        {
          "q": "What did the 1847 Dee Bridge collapse teach engineers?",
          "o": [
            {
              "t": "Cast iron is treacherous in bending and can fail under repeated traffic.",
              "v": "expert",
              "fb": "The collapse exposed cast iron's weakness and the toll of repeated loads."
            },
            {
              "t": "That primarily sabotage could drop a bridge that had carried trains for years.",
              "v": "danger",
              "fb": "No saboteur was involved; a flawed cast-iron girder failed under load."
            },
            {
              "t": "That wrought iron was unsafe, sending designers back to cast-iron beams.",
              "v": "wrong",
              "fb": "It pushed engineers toward wrought iron, away from brittle cast iron."
            },
            {
              "t": "That trains had simply grown too heavy for any bridge to be built at all.",
              "v": "partial",
              "fb": "Bridges could be built for the traffic, but not from brittle cast iron."
            }
          ]
        },
        {
          "q": "How does the Dee Bridge failure guide this inquiry?",
          "o": [
            {
              "t": "A structure under repeated traffic can fail slowly, with a readable signature, in practice.",
              "v": "expert",
              "fb": "Progressive failure under traffic leaves evidence a board can trace."
            },
            {
              "t": "It shows a sound structure primarily fails when someone plants a charge on it, in practice.",
              "v": "danger",
              "fb": "Structures fail from overload and flaws, not primarily from sabotage."
            },
            {
              "t": "It is presented as showing iron rarely fails gradually, so any break is likely to be instant and total.",
              "v": "wrong",
              "fb": "Fatigue and cracking are gradual; that slow decline is the whole point."
            },
            {
              "t": "It means primarily bridges, not rails, decline under the passing of trains, in the record, in use.",
              "v": "partial",
              "fb": "Rails and joints wear under traffic exactly as loaded members do."
            }
          ]
        }
      ]
    },
    "railprofile": {
      "sci": "Charles Vignoles (1793-1875)",
      "topic": "The flat-bottom rail",
      "lede": "The surveyor whose T-shaped rail, spiked straight to the sleeper, became the shape under nearly every train that runs, and the shape that cracks at its joints.",
      "no": 3,
      "profile": "Charles Blacker Vignoles was an Irish-born engineer and surveyor who gave his name to the flat-bottomed rail used on most of the world's railways. Early lines used various rail sections, many needing cast-iron 'chairs' to hold them upright. The flat-bottom, or Vignoles, rail has a wide foot that can be spiked or fastened directly to the sleeper, a broad web rising to a rounded head on which the wheel runs. Its cross-section, foot, web, and head, distributes the wheel's load down into the sleeper and ballast. An American engineer, Robert L. Stevens, devised a similar section around the same time; Vignoles popularised it in Britain and Europe.\n\nVignoles led a wandering, ambitious career: he surveyed railways across Britain, worked on the Liverpool and Manchester line, and late in life engineered the great Kyiv Chain Bridge across the Dnieper. But it is the rail profile that endures under every journey.\n\nThe shape matters because it governs where stress concentrates. A rail is a beam supported on sleepers; it bends slightly under each wheel and is worked hardest at the running surface and at its ends, where one length of rail meets the next. Traditionally those ends were bolted together with 'fishplates,' and the bolt holes and rail ends became notorious starting points for cracks.\n\nFor this inquiry, Vignoles's rail focuses attention on the joint. The junction between two rails, and the holes drilled through them, is a classic weak point where fatigue cracks begin and grow under traffic. A cracked joint left un-renewed does not announce itself with a bang; it spreads slowly through the steel until a wheel finds it. Knowing the rail's shape and its weak points tells an investigator where to look, and what a genuine, developing failure looks like.",
      "frame": "Slides a cross-section drawing across the desk. \"Every rail on this railway is the same shape, and it fails in the same places. Tell me where a rail is weakest, and I'll find you the record of the one that was.\"",
      "q": [
        {
          "q": "What defines the flat-bottomed (Vignoles) rail?",
          "o": [
            {
              "t": "A wide foot fastened straight to the sleeper, a web, and a running head.",
              "v": "expert",
              "fb": "Foot, web and head: the foot spikes down directly, no chair needed."
            },
            {
              "t": "A rounded bar held upright in a cast-iron chair bolted to each sleeper.",
              "v": "wrong",
              "fb": "That is the older chaired 'bullhead' style; Vignoles rail needs no chair."
            },
            {
              "t": "A deep I-beam of equal top and bottom, run either way up when it wears.",
              "v": "partial",
              "fb": "Its head and foot differ; a flat-bottom rail is not symmetric top to bottom."
            },
            {
              "t": "A hollow rail whose inner channel carries the signalling current along it.",
              "v": "danger",
              "fb": "The rail is solid steel; it is not a hollow conductor by design."
            }
          ]
        },
        {
          "q": "Where on a jointed rail do cracks most often begin?",
          "o": [
            {
              "t": "At the rail ends and the fishplate bolt holes, where stress concentrates.",
              "v": "expert",
              "fb": "Joints and bolt holes are classic crack starters under repeated load."
            },
            {
              "t": "primarily where a saboteur has cut it, since sound rail rarely cracks on its own.",
              "v": "danger",
              "fb": "Rails crack from fatigue at stress raisers with no cutting involved."
            },
            {
              "t": "At the very centre of each rail, the point furthest from any support.",
              "v": "wrong",
              "fb": "The ends and bolt holes, not the mid-span, are the usual origins."
            },
            {
              "t": "Evenly along the whole rail, so no one spot is worth inspecting first.",
              "v": "partial",
              "fb": "Cracks cluster at joints and holes; inspection targets those first."
            }
          ]
        },
        {
          "q": "How does knowing the rail's weak points help this inquiry?",
          "o": [
            {
              "t": "It tells the board where a real, slow-growing crack would start and hide, in use.",
              "v": "expert",
              "fb": "The joint is where a developing failure hides; that is where to look."
            },
            {
              "t": "It is presented as showing a clean break on a straight can primarily be the work of a device.",
              "v": "danger",
              "fb": "A fatigue crack at a joint is metallurgy, not a planted device."
            },
            {
              "t": "It shows rails rarely crack, so a broken rail is likely to have been placed there.",
              "v": "wrong",
              "fb": "Rails do crack, at known spots, if worn rail is left un-renewed."
            },
            {
              "t": "It means primarily the locomotive's wheels, rarely the rail, cause a derailment, in use.",
              "v": "partial",
              "fb": "A failing rail derails trains as readily as any fault in the wheels."
            }
          ]
        }
      ]
    },
    "steelrail": {
      "sci": "Henry Bessemer (1813-1898)",
      "topic": "Steel & the durable rail",
      "lede": "The metal-maker whose roaring converter turned iron into cheap steel by the ton, and gave the railways a rail that lasted, but never a rail that lasts forever.",
      "no": 4,
      "profile": "Henry Bessemer was an English inventor and engineer whose converter, announced in 1856, made steel a cheap, mass-produced material for the first time. His process blew air up through a vessel of molten pig iron; the oxygen burned out the excess carbon and impurities in a spectacular shower of sparks, and in minutes turned brittle iron into tough, workable steel. Before Bessemer, steel was costly and made in small batches; after him it could be poured by the ton.\n\nFor the railways this was transformative. Early rails were wrought iron, and under the pounding of traffic they wore, laminated, and had to be replaced often, sometimes within a few years on busy lines. Bessemer steel rails were far harder and tougher; they carried heavier axle loads and lasted many times longer, making the dense, fast railway network of the later nineteenth century possible. Bessemer grew wealthy and was knighted, though he battled patent disputes and quality problems as ironmasters learned to control his volatile process.\n\nSteel made the durable rail. It did not make an immortal one.\n\nFor this inquiry, that distinction is the trap and the truth. A steel rail is tough and long-lived, which tempts an operator to treat it as permanent and to defer its renewal. But steel still wears at the running surface, still accumulates rolling-contact fatigue, and still cracks once it is worked beyond its life. A rail kept in service past the point where it should have been renewed is not sabotaged and is not simply unlucky; it has reached the end of a knowable service life that someone chose to ignore. Knowing what steel can and cannot endure separates a rail failed by neglect from a fantasy of tampering.",
      "frame": "Roe turns a scarred lump of rail steel in his hand. \"Bessemer's steel outlasts anything the old ironmasters rolled. That's exactly why folk forget it wears out at all. Tell me what steel can take, and I'll tell you what this rail had already taken.\"",
      "q": [
        {
          "q": "What did Bessemer's converter do to molten iron?",
          "o": [
            {
              "t": "Blew air through it to burn out carbon, making cheap steel in minutes.",
              "v": "expert",
              "fb": "Air blown through the melt oxidised the carbon, mass-producing steel."
            },
            {
              "t": "Slowly baked it in a furnace for days to draw the impurities to the top.",
              "v": "wrong",
              "fb": "It was fast, minutes not days, and driven by an air blast, not slow baking."
            },
            {
              "t": "Added carbon to soft iron to harden it, a small step done batch by batch.",
              "v": "partial",
              "fb": "The process removed carbon and impurities; it did not add carbon in."
            },
            {
              "t": "Purified it so substantially that the resulting rail could rarely wear or crack.",
              "v": "danger",
              "fb": "Bessemer steel is durable, not eternal; rails still wear and fatigue."
            }
          ]
        },
        {
          "q": "Why did steel rails replace wrought-iron ones?",
          "o": [
            {
              "t": "They were far harder and tougher, carrying heavier loads far longer.",
              "v": "expert",
              "fb": "Steel's hardness let rails last many times longer under heavy traffic."
            },
            {
              "t": "They were lighter, so trains needed much less power to haul the same load.",
              "v": "wrong",
              "fb": "Steel rails are heavier, not lighter; durability was their advantage."
            },
            {
              "t": "They were merely cheaper to buy, though they wore out just as fast.",
              "v": "partial",
              "fb": "They lasted far longer, not merely cost less; the gain was in wear life."
            },
            {
              "t": "They rarely wore at all, so a steel line could be laid and left for good.",
              "v": "danger",
              "fb": "Steel rails wear and fatigue; they still need inspection and renewal."
            }
          ]
        },
        {
          "q": "What does steel's durability tempt an operator to forget?",
          "o": [
            {
              "t": "That a rail has a service life which, once past, ends in cracks.",
              "v": "expert",
              "fb": "Durability invites deferral, but steel still reaches the end of its life."
            },
            {
              "t": "That primarily a saboteur, rarely fair wear, could ever break a steel rail.",
              "v": "danger",
              "fb": "Worn steel breaks on its own; no tampering is needed to crack it."
            },
            {
              "t": "That steel rails is likely to be replaced every year like the old iron ones.",
              "v": "wrong",
              "fb": "Steel rails last for years, not months; the risk is over-deferring them."
            },
            {
              "t": "That rails wear primarily at the joints and nowhere along their length.",
              "v": "partial",
              "fb": "Rails fatigue at the surface and joints alike; the whole rail ages."
            }
          ]
        }
      ]
    },
    "axlefail": {
      "sci": "William J. M. Rankine (1820-1872)",
      "topic": "Fatigue & the failure of axles",
      "lede": "The Scottish polymath who, decades before anyone listened, showed that railway axles snap not from 'crystallizing' iron but from cracks creeping in from the surface.",
      "no": 5,
      "profile": "William John Macquorn Rankine was a Scottish civil engineer and physicist, one of the founders of modern thermodynamics and a prolific writer of engineering textbooks. Among his many contributions, one speaks directly to this inquiry: in 1843, as a young engineer, he published a study of the fractures of railway axles. Axles were breaking in service and killing people, and the popular explanation was that the constant vibration of running had somehow 'crystallized' the wrought iron, turning it brittle over time.\n\nRankine examined broken axles and rejected that theory. He saw that the fractures began at the surface, usually at a shoulder or a sharp change of section near the wheel seat, and grew gradually inward, a process we now recognise as fatigue-crack growth from a stress concentration. He argued for rounding those abrupt changes of section to relieve the stress, advice that anticipated fatigue engineering by decades. His broader career was vast: the Rankine cycle underlies steam-engine thermodynamics, he worked on soil mechanics and earth pressures, and his manuals trained generations of engineers.\n\nThe 'crystallization' myth mattered because it framed axle failure as a mysterious, unavoidable decay. Rankine replaced the myth with a mechanism: a crack, starting at a knowable place, driven by repeated stress, that could be designed against and inspected for.\n\nFor this inquiry, Rankine guards against both traps at once. Against the sensational, he shows that a broken axle or rail has an ordinary, traceable cause you can find in the metal, not a saboteur's hand. Against the dismissive, he shows it is not blameless bad luck or a mystery of vibration either; it is a crack that started at a predictable spot and grew in plain sight, which attention and renewal would have caught. The failure has an address, and someone was responsible for watching it.",
      "frame": "Pushes a yellowed report toward you. \"For years men blamed 'crystallized' iron and shrugged. Rankine wouldn't. Show me you know why an axle really breaks, and I'll tell you which alarms went quiet.\"",
      "q": [
        {
          "q": "What did Rankine reject about railway axle failures?",
          "o": [
            {
              "t": "The idea that vibration 'crystallized' iron and made it brittle over time.",
              "v": "expert",
              "fb": "He replaced the crystallization myth with cracks growing from the surface."
            },
            {
              "t": "The idea that axles fail from a single overload on their first heavy run.",
              "v": "wrong",
              "fb": "He identified gradual cracking, not a first-run overload, as the cause."
            },
            {
              "t": "The idea that surface flaws matter, insisting the core fails first instead.",
              "v": "partial",
              "fb": "Rankine stressed the surface origin, not a hidden failure of the core."
            },
            {
              "t": "The idea that axles fail at all, holding that sound iron rarely breaks.",
              "v": "danger",
              "fb": "Axles plainly did fail; Rankine explained how, he did not deny it."
            }
          ]
        },
        {
          "q": "Where did Rankine find axle cracks actually started?",
          "o": [
            {
              "t": "At the surface, at shoulders and sharp changes of section near the wheel.",
              "v": "expert",
              "fb": "Stress concentrated at abrupt shoulders, and cracks grew inward from there."
            },
            {
              "t": "primarily at points a saboteur had filed, since clean shafts rarely crack.",
              "v": "danger",
              "fb": "Cracks began at stress raisers from ordinary running, not from filing."
            },
            {
              "t": "Deep in the very centre of the axle, far from any surface feature at all.",
              "v": "wrong",
              "fb": "The origin was the surface shoulder, not the axle's deep interior."
            },
            {
              "t": "Uniformly all over the axle, so no one region was worth rounding off.",
              "v": "partial",
              "fb": "The shoulders were the hot spots; rounding them relieved the stress."
            }
          ]
        },
        {
          "q": "How does Rankine's finding cut against both easy answers?",
          "o": [
            {
              "t": "The break has a traceable cause, neither a device nor blameless bad luck, in use.",
              "v": "expert",
              "fb": "A crack with a known origin can be inspected for; someone owned that watch."
            },
            {
              "t": "It shows a snapped axle is proof that someone tampered with the train, in use.",
              "v": "danger",
              "fb": "The cause is metallurgical and ordinary, not the mark of a saboteur."
            },
            {
              "t": "It is presented as showing such failures are pure chance that no inspection could foresee.",
              "v": "wrong",
              "fb": "The crack grows visibly from a known spot; inspection can catch it."
            },
            {
              "t": "It means primarily the driver's handling could ever crack a running axle, in use.",
              "v": "partial",
              "fb": "Handling matters little; the crack is set by cyclic stress and geometry."
            }
          ]
        }
      ]
    },
    "mucontrol": {
      "sci": "Frank J. Sprague (1857-1934)",
      "topic": "Electric railways & multiple-unit control",
      "lede": "The 'Father of Electric Traction,' who wired a whole city's streetcars, then let one driver command a train of powered cars, and built the tight-timetabled railway we still ride.",
      "no": 6,
      "profile": "Frank Julian Sprague was an American electrical engineer, a former US Navy officer who briefly worked for Thomas Edison before setting out on his own. In 1888 he equipped the Richmond Union Passenger Railway in Virginia, the first large-scale, commercially successful electric streetcar system, solving the practical problems of motors, overhead wires, and current collection that had defeated others. It made electric street railways viable across the world almost overnight.\n\nHis second great invention, in 1897, was multiple-unit (MU) control. Instead of one locomotive hauling dead carriages, Sprague put traction motors under many cars and let a single driver in the leading cab control them all through electrical control lines running the length of the train. This is the basis of the electric multiple unit and of every subway and metro train: rapid acceleration, distributed power, and the ability to run frequent, punctual services. Sprague also developed electric elevators, which made the skyscraper practical.\n\nMultiple-unit control let railways run intense, closely spaced timetables, exactly the kind of busy commuter service where trains must keep to the minute.\n\nFor this inquiry, Sprague names the pressure, not the villain. His technology delivers frequency and punctuality; a railway built on it lives and dies by keeping trains moving to time. That is a virtue until punctuality becomes the master value, and the slower, invisible work of maintaining the track falls behind the timetable. A modern commuter railway that runs beautifully to schedule can be quietly deferring the renewals that keep it safe. The failure, when it comes, is not in Sprague's elegant control system but in the plain rail beneath it, sacrificed to the clock his invention made king.",
      "frame": "Gestures at the running-time board on the wall. \"Sprague gave us trains every few minutes, and a timetable nobody dares miss. Show me you understand how that railway runs, and I'll show you what the running keeps burying.\"",
      "q": [
        {
          "q": "What did Sprague's multiple-unit control allow?",
          "o": [
            {
              "t": "One driver to control powered motors spread along many cars of a train.",
              "v": "expert",
              "fb": "MU control drives motors under many cars from a single leading cab."
            },
            {
              "t": "One locomotive to haul far more dead carriages than before behind it.",
              "v": "wrong",
              "fb": "The point was distributed power, not a stronger single locomotive."
            },
            {
              "t": "Two drivers to share a cab, easing the workload on long fast runs.",
              "v": "partial",
              "fb": "It needed no second driver; one cab commanded the whole train."
            },
            {
              "t": "A train to run with no driver aboard, controlled largely from a tower.",
              "v": "danger",
              "fb": "A human driver still commanded the train from the leading cab."
            }
          ]
        },
        {
          "q": "What kind of service did MU control make possible?",
          "o": [
            {
              "t": "Frequent, punctual trains with rapid acceleration, as on a metro line.",
              "v": "expert",
              "fb": "Distributed power gives the quick, close-headway service metros rely on."
            },
            {
              "t": "Trains so automatic that timetables and maintenance no longer mattered.",
              "v": "danger",
              "fb": "Frequency raises the stakes on maintenance; it does not retire it."
            },
            {
              "t": "Slow, infrequent trains that needed far fewer staff to run each day.",
              "v": "wrong",
              "fb": "It enabled frequent, fast service, the opposite of infrequent running."
            },
            {
              "t": "Long-distance expresses primarily, of little use for busy commuter lines.",
              "v": "partial",
              "fb": "It suits dense commuter and metro work above all, not just expresses."
            }
          ]
        },
        {
          "q": "What pressure does a punctual, frequent railway create?",
          "o": [
            {
              "t": "To keep trains moving to time, even as track upkeep falls behind.",
              "v": "expert",
              "fb": "When the clock rules, the slow work of renewal is what quietly slips."
            },
            {
              "t": "To search every train for sabotage before it is allowed to depart.",
              "v": "danger",
              "fb": "The pressure is the timetable, not a hunt for imagined saboteurs."
            },
            {
              "t": "To slow every service down, since speed alone endangers a busy line.",
              "v": "wrong",
              "fb": "The pressure is to keep to time, which can crowd out safe maintenance."
            },
            {
              "t": "To hire more drivers, the single fix a crowded timetable ever needs.",
              "v": "partial",
              "fb": "More crew won't fix deferred track; the hazard is under the trains."
            }
          ]
        }
      ]
    },
    "vibration": {
      "sci": "Stephen Timoshenko (1878-1972)",
      "topic": "Strength of materials & vibration",
      "lede": "The engineer who wrote the textbooks the world learned from, and treated the rail as a beam floating on ballast, trembling a little under every wheel that passed.",
      "no": 7,
      "profile": "Stephen Timoshenko was a Russian-born engineer, often called the father of modern engineering mechanics, whose textbooks on strength of materials, theory of elasticity, and vibration taught much of the twentieth-century engineering world. After leaving revolutionary Russia he settled in the United States, teaching at Michigan and Stanford and writing works still consulted today. He refined beam theory, and the 'Timoshenko beam' that bears his name accounts for shear deformation and rotary inertia that the older, simpler theory ignored, matters that grow important when a beam vibrates or is loaded quickly.\n\nCrucially for the railways, Timoshenko analysed the stresses in the track itself. He modelled the rail as a beam resting on an elastic foundation, the springy support of sleepers and ballast, and calculated how it bends and how the stresses distribute as a wheel rolls over it. He extended this to the dynamic case: a wheel is not a static weight but a moving, sometimes hammering load, and imperfections like a rail joint, a worn low spot, or a flat on a wheel throw sudden impacts into the rail that amplify the stress well above the static value.\n\nThat dynamic amplification is Timoshenko's warning to this inquiry.\n\nA rail joint that has loosened or dipped, a corrugated or worn railhead, makes every passing wheel strike harder, and each blow works any existing crack a little further. The vibration is measurable and its effect calculable: a defect that raises impact loads accelerates its own destruction. So a rail that failed was not struck once by something on the line; it was hammered thousands of times by ordinary traffic across a defect that maintenance should have smoothed or renewed. The rail's trembling under each wheel is the slow arithmetic of neglect, not the signature of a bomb.",
      "frame": "Roe presses his palm flat on the desk to still an imagined shudder. \"Timoshenko showed the rail rides on ballast like a plank on springs, and a bad joint makes every wheel hit it harder. Show me you understand that, and I'll tell you how that joint had been drumming for months.\"",
      "q": [
        {
          "q": "How did Timoshenko model the rail under a wheel?",
          "o": [
            {
              "t": "As a beam on an elastic foundation of springy sleepers and ballast.",
              "v": "expert",
              "fb": "The rail bends on the elastic support of ballast as a wheel rolls over it."
            },
            {
              "t": "As a rigid bar clamped solidly at both ends and unable to deflect at all.",
              "v": "wrong",
              "fb": "The rail is supported continuously and does deflect, not clamped rigid."
            },
            {
              "t": "As a free weight resting on the bare ground, with no support beneath it.",
              "v": "partial",
              "fb": "It rests on an elastic foundation of sleepers, not on bare ground."
            },
            {
              "t": "As an unbreakable member that no passing wheel could ever overstress.",
              "v": "danger",
              "fb": "The rail is stressed by every wheel and can indeed be overworked."
            }
          ]
        },
        {
          "q": "Why does a bad rail joint raise the stress on the rail?",
          "o": [
            {
              "t": "A dip or gap makes each wheel strike harder, amplifying the load.",
              "v": "expert",
              "fb": "Impacts at a defect push dynamic stress well above the static value."
            },
            {
              "t": "It doesn't; primarily a charge on the line can ever raise a rail's stress.",
              "v": "danger",
              "fb": "Ordinary wheels at a bad joint raise the stress; no device is needed."
            },
            {
              "t": "It lowers the stress, since a loose joint lets the rail flex it away.",
              "v": "wrong",
              "fb": "A loose or dipped joint concentrates impact, it does not relieve it."
            },
            {
              "t": "It matters primarily at high speed, and rarely on a slow commuter run.",
              "v": "partial",
              "fb": "Even at modest speed a defect hammers the rail every time a wheel passes."
            }
          ]
        },
        {
          "q": "What does dynamic amplification tell this inquiry?",
          "o": [
            {
              "t": "A defect hammered by ordinary traffic drives its own slow failure.",
              "v": "expert",
              "fb": "Thousands of ordinary impacts across a defect, not one strike, break the rail."
            },
            {
              "t": "A rail can fail primarily from a single violent blow struck from outside.",
              "v": "danger",
              "fb": "The rail was hammered many times by traffic, not struck once by a device."
            },
            {
              "t": "Vibration is harmless, so a rail's condition does not matter to a break.",
              "v": "wrong",
              "fb": "Dynamic loads are real and measurable; a defect worsens them each pass."
            },
            {
              "t": "primarily wheels, rarely the rail's own defects, decide when a rail fails.",
              "v": "partial",
              "fb": "The rail's worn joint is what turns each wheel into a hammer blow."
            }
          ]
        }
      ]
    },
    "brittle": {
      "sci": "Constance Tipper (1894-1995)",
      "topic": "Brittle fracture & cold rails",
      "lede": "The Cambridge metallurgist who explained why whole ships cracked in half in cold seas, and gave the world the test for the temperature at which tough steel turns treacherous.",
      "no": 8,
      "profile": "Constance Tipper was a British metallurgist and crystallographer at Cambridge, one of the few women in engineering science of her era, whose work explained one of the great material mysteries of the Second World War. Welded 'Liberty ships,' mass-produced to carry cargo across the Atlantic, were suffering sudden, catastrophic fractures; some split entirely in two, often in cold northern waters and sometimes while lying still in harbour. The failures were baffling, and sabotage was among the suspicions.\n\nTipper showed that the cause lay in the steel itself. Ordinary structural steel undergoes a 'ductile-to-brittle transition' as it cools: above a certain temperature it is tough and bends before it breaks, but below that transition temperature it can fracture suddenly and brittlely, a crack racing across it with little warning and little energy. The cold seas had pushed the ships' steel below its transition, and welded hulls, being continuous, let a crack run unchecked once started. She developed a means, the 'Tipper test,' of measuring a steel's transition temperature, so that steels could be chosen to stay tough in service.\n\nBrittle fracture, cold, and a pre-existing flaw are the elements her work joins together, and they belong at the centre of this inquiry.\n\nA rail already carrying a fatigue crack is far more dangerous on a cold night, when the steel is below its transition and a crack that might have held can suddenly run through the rail. That is not sabotage; it is metallurgy, foreseeable and preventable by renewing cracked rail before winter finds it. But it is not blameless bad luck either. Tipper's lesson cuts both ways: a rail that snaps in the cold was neither a bomb nor an act of God, but a known flaw meeting a known condition, which vigilance should have removed.",
      "frame": "Glances at the frost still on the window. \"Tipper worked out why good steel shatters in the cold. That morning was a cold one. Show me you understand brittle fracture, and I'll tell you what the rail had waiting in it.\"",
      "q": [
        {
          "q": "What is the ductile-to-brittle transition Tipper studied?",
          "o": [
            {
              "t": "Below a certain temperature, tough steel can fracture suddenly and brittlely.",
              "v": "expert",
              "fb": "Below its transition temperature, ductile steel turns brittle and snaps."
            },
            {
              "t": "Above a certain temperature, steel melts and flows before it can crack.",
              "v": "wrong",
              "fb": "The transition is brittleness, not melting; it is far below any melting."
            },
            {
              "t": "Steel slowly rusts thinner in the cold until it can no longer bear a load.",
              "v": "partial",
              "fb": "That is corrosion; the transition is a sudden change in fracture behaviour."
            },
            {
              "t": "Cold steel grows tougher, so a rail is safest on the coldest of nights.",
              "v": "danger",
              "fb": "Cold makes steel more brittle, not tougher; that is the danger."
            }
          ]
        },
        {
          "q": "Why did the welded Liberty ships fracture so catastrophically?",
          "o": [
            {
              "t": "Cold pushed the steel brittle, and welded hulls let a crack run unchecked.",
              "v": "expert",
              "fb": "Below-transition steel plus continuous welds let cracks race the hull."
            },
            {
              "t": "Enemy saboteurs had planted charges, splitting the hulls from within.",
              "v": "danger",
              "fb": "The cause was brittle fracture in cold steel, found by science, not sabotage."
            },
            {
              "t": "Their engines overheated the hull steel until it softened and tore apart.",
              "v": "wrong",
              "fb": "The steel was too cold and brittle, not overheated and soft."
            },
            {
              "t": "They were simply overloaded with cargo far beyond any safe limit.",
              "v": "partial",
              "fb": "Some failed at rest or lightly loaded; brittleness, not overload, was key."
            }
          ]
        },
        {
          "q": "How does brittle fracture cut against both easy answers here?",
          "o": [
            {
              "t": "A cold-night break is a known flaw meeting cold, not a bomb or bad luck, in use.",
              "v": "expert",
              "fb": "Foreseeable and preventable: renew cracked rail before winter finds it."
            },
            {
              "t": "It shows a rail can shatter primarily when an explosive shocks the cold steel.",
              "v": "danger",
              "fb": "Brittle fracture needs no explosive; a fatigue crack and cold suffice."
            },
            {
              "t": "It is presented as showing cold rails are perfectly safe, so weather can be set aside.",
              "v": "wrong",
              "fb": "Cold makes a cracked rail more dangerous, not safe; weather matters."
            },
            {
              "t": "It means primarily ships, rarely rails, are at risk from brittle fracture.",
              "v": "partial",
              "fb": "Rails suffer brittle fracture too; the Liberty ships are the warning."
            }
          ]
        }
      ]
    },
    "speed": {
      "sci": "Sir Nigel Gresley (1876-1941)",
      "topic": "Speed, streamlining & the locomotive",
      "lede": "The locomotive engineer who clothed his engines in blue streamlining and sent Mallard down a bank at 126 miles an hour, still the fastest steam has ever run.",
      "no": 9,
      "profile": "Sir Nigel Gresley was the chief mechanical engineer of Britain's London and North Eastern Railway, and the finest steam-locomotive designer of his generation. He built the great Pacific locomotives that hauled expresses up the East Coast Main Line, among them the celebrated Flying Scotsman, and in 1938 his streamlined A4 Pacific 'Mallard' reached 126 miles per hour on a descent near Grantham, a world speed record for steam that has never been broken.\n\nGresley's engineering was about extracting speed reliably. He refined boiler and cylinder design and adopted his conjugated valve gear to drive three cylinders efficiently. He understood streamlining, wind-tunnel-testing shapes to cut air resistance at speed, and he understood that running fast demanded everything else be right: powerful, controllable braking, and, above all, a track maintained to a standard that matched the pace. Mallard's record run, in fact, pushed the machine to its limits, a middle big-end bearing overheated near the peak, a reminder that at the edge of performance the margins are thin.\n\nThat relationship between speed and the state of the track is Gresley's lesson for this inquiry.\n\nThe faster a train runs, the less forgiving a track defect becomes: a dipped joint or a cracked rail that a slow train might survive can derail a fast one, and the energy of the wreck is far greater. Running to fast, tight timetables therefore raises the stakes on maintenance, precisely when the pressure to keep to time can tempt an operator to defer it. A derailment on a straight at line speed is not, on its own, evidence of a saboteur or a single careless driver; it can be the predictable meeting of high speed with a track allowed to fall behind the standard that speed requires. Gresley ran fast because the whole railway was kept fit to. When it is not, speed finds the flaw.",
      "frame": "Taps a timetable column. \"Gresley ran the fastest steam in the world, but only because the whole railway was kept fit for it. Show me you understand speed, and I'll show you what this railway demanded of a track it wasn't keeping up.\"",
      "q": [
        {
          "q": "What was Gresley's Mallard famous for?",
          "o": [
            {
              "t": "Reaching 126 mph on a descent, the world steam speed record.",
              "v": "expert",
              "fb": "Mallard's 126 mph in 1938 remains the record for steam traction."
            },
            {
              "t": "Hauling the heaviest coal trains ever run over a British main line.",
              "v": "wrong",
              "fb": "Mallard was a fast express engine, not a heavy freight hauler."
            },
            {
              "t": "Being the first locomotive ever fitted with a streamlined shape.",
              "v": "partial",
              "fb": "Others were streamlined before; Mallard's fame is its record speed."
            },
            {
              "t": "Running so fast that no track defect could ever affect it at all.",
              "v": "danger",
              "fb": "High speed makes defects more dangerous, not less; margins shrink."
            }
          ]
        },
        {
          "q": "What did running fast demand of the rest of the railway?",
          "o": [
            {
              "t": "Strong braking and a track maintained to the standard the speed needed.",
              "v": "expert",
              "fb": "Speed requires everything else, brakes and track, to be kept up to it."
            },
            {
              "t": "Nothing extra, since a fast enough engine floats clear of the rails.",
              "v": "danger",
              "fb": "A train rarely leaves the rails by design; it depends utterly on the track."
            },
            {
              "t": "primarily a bigger boiler, with track and brakes left exactly as before.",
              "v": "wrong",
              "fb": "Power alone is not enough; brakes and track is likely to match the speed."
            },
            {
              "t": "Merely a smoother shape, the sole thing that ever limits a train's speed.",
              "v": "partial",
              "fb": "Streamlining helps, but track and braking limit safe speed far more."
            }
          ]
        },
        {
          "q": "How does speed relate to deferred track maintenance here?",
          "o": [
            {
              "t": "The faster the train, the less a track defect can be survived, in use.",
              "v": "expert",
              "fb": "High speed meeting a neglected track is a predictable, provable cause."
            },
            {
              "t": "Fast trains establish any derailment is likely to be the work of a saboteur.",
              "v": "danger",
              "fb": "Speed finds a real flaw; it does not imply a planted device."
            },
            {
              "t": "Speed and track upkeep are unrelated, so pace tells the board nothing.",
              "v": "wrong",
              "fb": "Speed sets how forgiving the track is likely to be; the two are tightly linked."
            },
            {
              "t": "primarily the driver's speed choice, rarely the track, decides a derailment.",
              "v": "partial",
              "fb": "A defect at line speed derails a train whatever the driver intends."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "ganger": {
      "track": "Roe walks the four-foot with you, boots crunching ballast, and stops dead at a joint. \"I flagged this one months back. Cracked, I wrote. Renew it, I wrote. Look what got done about it.\"",
      "signalbox": "Roe stands stiff among the panels, cap in his hands. \"I don't belong in here with the lights and levers. But I'll tell you this: the steel my rails are made of doesn't lie, whatever the timetable says.\"",
      "office": "Roe eyes the carpet like it might bite. \"They keep us out in the cold and the paperwork in here in the warm. Somewhere in these cabinets is the note I wrote about that joint.\""
    },
    "signaller": {
      "track": "The Signaller has come trackside, uneasy in the open air. \"Up in the box I see it all as lights on a diagram. Out here it's real steel, and real steel that no light was watching.\"",
      "signalbox": "The Signaller stands at the panel and lowers their voice. \"There's a function on this frame that used to hold the trains for a fault like this. Ask me what became of it, once you've earned it.\"",
      "office": "The Signaller keeps their coat on in the office. \"They set the rules I work to from in here. When a safeguard gets switched out to keep trains moving, this is the room that signs for it.\""
    },
    "clerk": {
      "track": "The Clerk has been sent trackside and hates it, ledger clutched to their chest. \"I know this rail by its record, not its rust. And its record, I promise you, is not a clean one.\"",
      "signalbox": "The Clerk hovers by the log books in the box. \"Every fault raised, every job put off, it all comes back to my files in the end. The signallers report it; someone decides to file it away.\"",
      "office": "The Clerk is finally on home ground, surrounded by cabinets. \"The backlog lives here. So does the memo that froze it. Show me you understand this railway, and I'll show you which drawer.\""
    }
  },
  "story": [
    "<b>The 8:14 to Ardenmoor</b> begins inside the Ardenmoor rail inquiry, where the first explanation is already spreading faster than the evidence.",
    "<b>Ganger Roe</b>, <b>The Signaller</b>, and <b>The Clerk</b> each hold a different part of the record, and each conversation opens with one real pioneer whose work changes how the evidence should be read.",
    "The inquiry keeps circling <b>Sabotage — something left on the line</b> and <b>Simple driver error — a signal passed</b>. Both are tempting, and neither can be accepted just because it makes the cleanest headline.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and make the final WHAT judgment from what you learned."
  ],
  "endings": {
    "overclaimWhat": "sabotage",
    "dismissalWhat": "driver",
    "win": {
      "expertTitle": "What the Records Prove, and No More",
      "expert": [
        "Halcott names it exactly: Doran Kell, the infrastructure operator, who ran the track and the budgets and let the backlog freeze; the truth culminating in the Operator's Head Office, where the deferred-maintenance list and the budget memo live; and concealed deferred maintenance, a cracked rail left un-renewed, with the safeguard that should have caught it quietly bypassed to keep the trains to time. Not a saboteur. Not a careless driver alone.",
        "Every card accounted for. Halcott walked the track, the Signal Centre, and the Head Office, turned a wary ganger, signaller, and clerk into witnesses, and claimed precisely what the records and the memo could defend. The inquiry issues findings that renew the rail, restore the safeguard, and unfreeze the backlog, which is the entire point of doing it right."
      ],
      "soundTitle": "Right, but Lightly Proven",
      "sound": [
        "Halcott names the right three, Doran Kell, the Head Office, and a concealed deferred-maintenance failure with a safeguard bypassed to keep time. The shape of the case is correct, and the refusal to cry sabotage or pin it all on the driver is exactly right.",
        "But too many threads were left loose, and the operator's lawyers will pull at them. A few more days tracing the cracked joint and the frozen backlog would have made the finding unassailable. Close and honest, if not yet airtight."
      ],
      "namedTitle": "The Right Answer, Unearned",
      "named": [
        "Halcott names the truth, Doran Kell, the Head Office, the deferred maintenance and the bypassed safeguard, but gathered too little to back it. It reads like a hunch that happened to land.",
        "The inquiry cannot rest its findings on an accusation this thin, however correct. Being right is not the same as being able to prove it to the people who will fight the finding."
      ]
    },
    "overclaim": {
      "title": "The Inquiry That Cried Sabotage",
      "body": [
        "Halcott reports sabotage, something left on the line, the answer the front pages were already running. It is vivid, and it is not what the evidence shows.",
        "The rail bore a fatigue crack with a long, slow signature, its beach marks recording months of growth, and the detection that should have caught it had been switched out to keep the trains moving. There was no device and no intruder. When the sensational charge collapses, it takes the inquiry's credibility with it, and the real, provable failure in the Operator's Head Office is dismissed as just another conspiracy theory."
      ]
    },
    "dismissal": {
      "title": "Case Closed on the Driver",
      "body": [
        "Halcott files it as simple driver error, a signal passed at danger, nothing systemic, close the file. It is half a truth and misses the graver half.",
        "The whole point of a railway's fail-safes is that one slip should not be fatal, and here one had been quietly bypassed to keep to time, over a rail the operator had left cracked and un-renewed. Blaming the driver leaves that neglected track and that frozen backlog exactly as they were, waiting for the next train. The inquiry saw the last hand on the controls and never the decision, taken in an office, to let the line decay."
      ]
    },
    "wrongNames": {
      "title": "So Close",
      "body": [
        "Halcott has the nature of it cold, concealed deferred maintenance and a safeguard bypassed to keep the timetable, neither sabotage nor a lone driver's blunder. But the finger lands on the wrong name or the wrong room, and the real culprit and the office where it was decided go unnamed."
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A train wheel crossing a cracked rail\"><path d=\"M40 92 L620 92\" stroke=\"#121212\" stroke-width=\"5\"/><path d=\"M294 92 L314 78 L330 104 L350 88\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"2.4\"/><circle cx=\"210\" cy=\"68\" r=\"28\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.8\"/><circle cx=\"420\" cy=\"68\" r=\"28\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.8\"/><path d=\"M174 40 L456 40\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M82 116 L146 116 M500 116 L566 116\" stroke=\"#e2e2d8\" stroke-width=\"2\"/></svg>"
}};
