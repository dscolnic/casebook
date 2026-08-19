module.exports = { PACK: {
  "id": "tower",
  "title": "The Verrin Tower",
  "discipline": "Structural Engineering",
  "teaser": "A record-breaking tower has begun to groan in the wind. Fate, sabotage — or a number someone quietly changed?",
  "overclaimTag": "deliberate sabotage",
  "truthTag": "a concealed cut to the safety margin",
  "venue": "the Verrin Tower inquiry",
  "agent": {
    "name": "Inspector Dana Reyes",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Engineering credibility",
  "readingShort": "Engineers",
  "readingLabel": "Structural Pioneers",
  "dossierName": "STRUCTURAL PIONEERS",
  "enterLabel": "Enter the inquiry",
  "subt": "A deduction game inside the Verrin Tower inquiry",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before the inquiry closes. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The WHERE you test determines the dossier you receive, and the conversation costs one day.",
  "overclaimTease": "<i>And beware the answer that sells papers: the evidence points not to a charge in the night, but to something quieter — a decision, not a detonation — and far harder to bury for good.</i>",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "dev",
      "items": [
        {
          "id": "dev",
          "label": "Marcus Ketterly — developer & owner"
        },
        {
          "id": "arch",
          "label": "Halvard Sten — celebrity architect"
        },
        {
          "id": "eng",
          "label": "Priya Anand — engineer of record"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "office",
      "items": [
        {
          "id": "site",
          "label": "The Tower Site & its Connections"
        },
        {
          "id": "shop",
          "label": "The Steel Fabrication Shop"
        },
        {
          "id": "office",
          "label": "The Design & Project Office"
        }
      ]
    },
    "what": {
      "title": "What is happening",
      "truth": "cut",
      "items": [
        {
          "id": "sabotage",
          "label": "Deliberate sabotage or a planted charge"
        },
        {
          "id": "act",
          "label": "An unforeseeable freak wind — an act of God"
        },
        {
          "id": "cut",
          "label": "A concealed value-engineering cut to the safety factor"
        }
      ]
    }
  },
  "PLACES": {
    "site": {
      "name": "The Tower Site & its Connections",
      "xy": [
        140,
        90
      ]
    },
    "shop": {
      "name": "The Steel Fabrication Shop",
      "xy": [
        330,
        240
      ]
    },
    "office": {
      "name": "The Design & Project Office",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "site",
      "shop"
    ],
    [
      "shop",
      "office"
    ]
  ],
  "CHARACTERS": {
    "foreman": {
      "name": "Tomas Brandt",
      "role": "Site foreman & welder",
      "face": "🔩",
      "badge": "F",
      "legend": "the site",
      "hint": "Bolted and welded every connection; watched inspectors get waved through."
    },
    "clerk": {
      "name": "The Clerk",
      "role": "Project records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the office",
      "hint": "Holds the drawings, change-orders, and memos that were meant to vanish."
    },
    "driver": {
      "name": "Odette Fer",
      "role": "Steel-yard driver",
      "face": "🚚",
      "badge": "D",
      "legend": "the yard",
      "hint": "Hauls the beams and plate; knows what grade showed up versus what was ordered."
    }
  },
  "TOPICMAP": {
    "site": {
      "foreman": [
        "loads"
      ],
      "clerk": [
        "tensioncomp"
      ],
      "driver": [
        "bending"
      ]
    },
    "shop": {
      "foreman": [
        "arch"
      ],
      "clerk": [
        "flutter"
      ],
      "driver": [
        "brittle"
      ]
    },
    "office": {
      "foreman": [
        "redundancy"
      ],
      "clerk": [
        "concrete"
      ],
      "driver": [
        "ethics"
      ]
    }
  },
  "TOPICS": {
    "loads": {
      "sci": "John Smeaton (1724-1792)",
      "topic": "Dead, live & wind loads",
      "lede": "The first man to call himself a civil engineer, who built a lighthouse to stand where two before it had been swept into the sea.",
      "no": 1,
      "profile": "John Smeaton was an English engineer so central to the founding of his profession that he coined the very term 'civil engineer' to distinguish his work from the military kind. Trained as an instrument maker, he brought an experimenter's rigor to building, and in 1759 the Royal Society awarded him its Copley Medal for a careful study of how wind and water drive windmills and waterwheels — real measurements of the forces moving structures, not guesses.\n\nHis masterpiece was the third Eddystone Lighthouse, completed in 1759 on a wave-lashed reef off Plymouth where two earlier towers had failed. Smeaton modeled its profile on the flared trunk of an oak, wide and heavy at the base to resist overturning, and pioneered a hydraulic lime mortar that set under water and dovetailed granite blocks that locked together. The tower stood for over a century. Every choice answered a load: the dead weight of the stone holding it down, the pounding live load of the waves, and the lateral push of the wind.\n\nThose three load types are the grammar of this case. A dead load is the permanent self-weight of the structure; a live load is the transient weight it carries — people, furniture, snow; a wind load is the horizontal pressure a gale exerts on a tall face. All three are calculable, and building codes fix how much wind a tower must survive. So when the Verrin Tower groans in a storm, Smeaton's discipline asks the sharp question: was the wind truly beyond anything the code demands — a genuine act of God — or was it an ordinary, foreseeable wind meeting a structure whose margin against it had quietly been reduced?",
      "frame": "Brandt jabs a thumb at the swaying mast overhead. \"Every load on this thing runs through a joint I bolted. Before I tell you which ones scared me, show me you even know what's pushing on it.\"",
      "q": [
        {
          "q": "What is the difference between a dead load and a live load?",
          "o": [
            {
              "t": "Dead load is the structure's own permanent weight; live load is the transient weight it carries.",
              "v": "expert",
              "fb": "Permanent self-weight versus movable occupancy is exactly the split."
            },
            {
              "t": "Dead load is the weight of a collapsed section; live load is the weight before it fell down.",
              "v": "wrong",
              "fb": "Neither term refers to collapse; it is permanent versus transient weight."
            },
            {
              "t": "Dead load acts primarily at night when empty; live load is the daytime crowd inside the tower.",
              "v": "wrong",
              "fb": "The distinction is self-weight versus occupancy, not time of day."
            },
            {
              "t": "Dead load is the sideways push of the wind, while live load is the steady gravity pulling it down.",
              "v": "partial",
              "fb": "Wind is its own load type; dead and live are both vertical weights."
            }
          ]
        },
        {
          "q": "What made Smeaton's Eddystone Lighthouse withstand its wind and wave loads?",
          "o": [
            {
              "t": "A wide, heavy, oak-shaped base and interlocking stone that resisted overturning and waves.",
              "v": "expert",
              "fb": "The flared, dovetailed masonry base was built to answer those loads."
            },
            {
              "t": "A single tall iron spike driven deep down into the reef to pin the whole tower into the rock below.",
              "v": "wrong",
              "fb": "It was interlocking granite shaped like an oak, not an iron spike."
            },
            {
              "t": "A hollow, lightweight shell that let the storm waves pass straight through it unharmed.",
              "v": "wrong",
              "fb": "It was a solid, heavy masonry tower, not a hollow pass-through shell."
            },
            {
              "t": "A clever lightning rod and a lantern room that together steadied it in the worst gales.",
              "v": "partial",
              "fb": "Those were features, but stability came from the heavy, locked-stone base."
            }
          ]
        },
        {
          "q": "Why does knowing the wind load matter for reading this tower's groaning?",
          "o": [
            {
              "t": "Because code fixes the wind a tower must survive, so we can test if the gale truly exceeded it, in use.",
              "v": "expert",
              "fb": "A calculable design wind lets us check the act-of-God claim against numbers."
            },
            {
              "t": "Because any wind strong enough to make heavy steel groan aloud is likely to surely be a freak beyond prediction.",
              "v": "danger",
              "fb": "Groaning steel does not establish a freak wind; code winds are ordinary and expected."
            },
            {
              "t": "Because the wind load on a tower is unknowable in advance, so a swaying tower can rarely really be judged.",
              "v": "wrong",
              "fb": "Wind loads are calculated routinely; that is the whole point of the code."
            },
            {
              "t": "Because wind primarily matters near the coast, so an inland tower can safely ignore it largely, in use.",
              "v": "partial",
              "fb": "Wind governs tall structures everywhere, not primarily at the coast."
            }
          ]
        }
      ]
    },
    "tensioncomp": {
      "sci": "Robert Hooke (1635-1703)",
      "topic": "Tension, compression & elasticity",
      "lede": "The restless genius who hid his law of springs inside a scrambled Latin anagram, then dared the world to unriddle it.",
      "no": 2,
      "profile": "Robert Hooke was one of the most inventive minds of the seventeenth century — curator of experiments at the Royal Society, author of the microscopy classic 'Micrographia,' and, after the Great Fire of 1666, a surveyor who helped rebuild London alongside Christopher Wren. Among his lasting gifts to engineering is the law that still bears his name.\n\nIn 1676 Hooke published his discovery about springs as the anagram 'ceiiinosssttuv,' revealing it two years later as 'ut tensio, sic vis' — as the extension, so the force. Hooke's Law states that, up to a limit, the deformation of an elastic body is directly proportional to the load applied. Double the force, double the stretch; remove the force, and the material springs back to its original shape. That reversible, proportional behavior is elasticity, and it holds only within a material's elastic range.\n\nEvery structural member lives in tension, compression, or both. Tension pulls its fibers apart, as in a cable or a hanger; compression pushes them together, as in a column; and steel resists both. Within the elastic range it stretches and returns predictably, exactly as Hooke described. Push it past its yield point, though, and it deforms permanently, no longer springing back.\n\nFor this case, Hooke draws the line between springing back and staying bent. A tower flexing in the wind and returning to plumb is behaving elastically and safely, within its design. A tower that groans, leans, and does not recover has been driven past yield — its members are carrying more than they should. The question then is not whether the wind was supernatural, but whether an ordinary wind pushed a weakened structure past a limit that a full margin would have kept it well below.",
      "frame": "Slides a stress calculation across the desk. \"Numbers don't lie the way people do. Read me the difference between a member that springs back and one that stays bent, and I'll show you which drawings I kept.\"",
      "q": [
        {
          "q": "What does Hooke's Law state?",
          "o": [
            {
              "t": "Within a limit, a material's deformation is directly proportional to the force applied, in use.",
              "v": "expert",
              "fb": "As the extension, so the force — proportional and reversible up to a limit."
            },
            {
              "t": "A material grows steadily stronger each time it is stretched and released again, in use.",
              "v": "wrong",
              "fb": "Hooke's Law is about proportional stretch, not strengthening with use."
            },
            {
              "t": "Every solid eventually snaps on its own once it has been loaded a fixed number of times.",
              "v": "wrong",
              "fb": "That describes fatigue, not Hooke's proportional elastic law."
            },
            {
              "t": "The stretch of a spring depends primarily on how long the spring is, rarely on the force pulling it.",
              "v": "partial",
              "fb": "Stretch depends on the force applied, which is Hooke's whole point."
            }
          ]
        },
        {
          "q": "What is the difference between tension and compression?",
          "o": [
            {
              "t": "Tension pulls a member's fibers apart; compression pushes them together, in use.",
              "v": "expert",
              "fb": "Pulling apart versus squeezing together is exactly the distinction."
            },
            {
              "t": "Tension acts primarily in steel members, while compression acts primarily in stone ones.",
              "v": "wrong",
              "fb": "Both forces act in any material; they are directions of loading, not materials."
            },
            {
              "t": "Tension is a slow load over years, while compression is a sudden impact force.",
              "v": "wrong",
              "fb": "Both can be slow or sudden; the difference is pulling versus pushing."
            },
            {
              "t": "Tension bends a beam sideways, while compression twists it about its own axis.",
              "v": "partial",
              "fb": "Bending and twisting are separate effects; tension and compression are pull and push."
            }
          ]
        },
        {
          "q": "What does it mean if a tower flexes but no longer springs back?",
          "o": [
            {
              "t": "It has been pushed past its elastic limit and is now permanently overstressed, in the record, in use.",
              "v": "expert",
              "fb": "No recovery means yield — the member carried more than it safely should."
            },
            {
              "t": "It is presented as showing an explosive charge, since primarily a blast can bend steel that will not recover.",
              "v": "danger",
              "fb": "Ordinary overload past yield bends steel permanently; no blast is implied."
            },
            {
              "t": "Nothing is wrong, because all tall buildings simply lean a little more each year, in the record, in use.",
              "v": "danger",
              "fb": "Permanent lean is a warning of yielding, not normal settling."
            },
            {
              "t": "It is fully elastic behavior, so the structure will straighten on its own given time, under load.",
              "v": "partial",
              "fb": "Elastic flexing recovers at once; a lasting bend means the elastic limit was passed."
            }
          ]
        }
      ]
    },
    "bending": {
      "sci": "Claude-Louis Navier (1785-1836)",
      "topic": "Beams & bending",
      "lede": "The French engineer who turned bridge-building from an art of proportion into a science of stress — and paid publicly when a cable let him down.",
      "no": 3,
      "profile": "Claude-Louis Navier was a French engineer and professor at the École des Ponts et Chaussées who did more than almost anyone to make structural analysis a mathematical discipline. His 1826 lectures gave engineers the first systematic theory of how beams bend under load, and he championed designing within a material's elastic range with a defined margin against failure — an early, explicit form of allowable-stress design.\n\nNavier's beam theory explains what happens inside a loaded beam. When a beam bends, one face is stretched in tension and the opposite face is squeezed in compression, while a neutral axis through the middle feels neither. The further a fiber sits from that axis, the more stress it carries, which is why depth is so powerful: a deeper beam resists bending far more effectively than a shallow one of the same weight. The bending stress depends on the load, the span, and the shape of the cross-section.\n\nHe was also a working designer, and he knew failure firsthand: his suspension bridge across the Seine, the Pont des Invalides, ran into trouble with its anchorages and public disputes and was taken down before it opened — a humbling episode for a great theorist.\n\nFor this case, Navier's mathematics make bending predictable, which is exactly why anomalies matter. Every beam in the tower was sized for its load with a margin to spare. Swap in a shallower section or a lower grade of steel than the drawings called for, and the same everyday load now bends that beam closer to its limit. The behavior is not mysterious and it is not an act of God — it is arithmetic. What arrived on site versus what was specified can be the whole story.",
      "frame": "Odette leans on her flatbed. \"I haul the beams. I see the stamp on the steel and the size of what comes off my truck. Show me you know what bending does to a beam, and I'll tell you what didn't match the paperwork.\"",
      "q": [
        {
          "q": "What happens inside a beam when it bends under load?",
          "o": [
            {
              "t": "One face goes into tension and the opposite into compression, with a neutral axis between.",
              "v": "expert",
              "fb": "Tension on one side, compression on the other, neutral in the middle — exactly."
            },
            {
              "t": "The whole beam is squeezed evenly in compression from the top face to the bottom, in use.",
              "v": "wrong",
              "fb": "Bending puts one side in tension and the other in compression, not uniform squeeze."
            },
            {
              "t": "The beam heats along its length until the metal softens and it sags under its own weight.",
              "v": "wrong",
              "fb": "Bending is a mechanical stress distribution, not a thermal effect."
            },
            {
              "t": "primarily the very center carries stress, while the top and bottom faces stay substantially unloaded.",
              "v": "partial",
              "fb": "It is the reverse: the outer fibers carry the most stress, the center the least."
            }
          ]
        },
        {
          "q": "Why does a deeper beam resist bending so much better?",
          "o": [
            {
              "t": "Its outer fibers sit farther from the neutral axis, where they resist stress most effectively.",
              "v": "expert",
              "fb": "Depth puts material far from the axis, where it does the most work against bending."
            },
            {
              "t": "A deep beam simply weighs a great deal more, and that extra mass alone is what stiffens it up.",
              "v": "wrong",
              "fb": "A deep beam can weigh the same; its edge is geometry, not sheer mass."
            },
            {
              "t": "Depth spreads the load over many more rivets, which is really the primarily reason it helps at all.",
              "v": "wrong",
              "fb": "The benefit is the distance of material from the neutral axis, not rivet count."
            },
            {
              "t": "A deeper beam bends further at first but recovers faster, which is really what makes it feel stronger.",
              "v": "partial",
              "fb": "A deeper beam actually bends less; it does not simply recover faster."
            }
          ]
        },
        {
          "q": "What does it mean if the delivered beams were shallower or a lower grade than specified?",
          "o": [
            {
              "t": "Everyday loads now bend them nearer their limit, and the shortfall is arithmetic, not mischance, in use.",
              "v": "expert",
              "fb": "Under-spec steel raises the stress under ordinary loads — calculable, not an act of God."
            },
            {
              "t": "Nothing at all, because any steel beam is basically as strong as any other one of the same length, in use.",
              "v": "danger",
              "fb": "Grade and depth change capacity sharply; substitution is not harmless."
            },
            {
              "t": "It is presented as showing that someone deliberately cut those very beams on purpose to bring the whole tower down.",
              "v": "danger",
              "fb": "A quiet cost substitution, not sabotage, is the simpler and graver read."
            },
            {
              "t": "It matters primarily if those beams are also badly rusted, since fresh steel forgives almost any size change.",
              "v": "partial",
              "fb": "Undersizing weakens even pristine steel; rust is a separate issue."
            }
          ]
        }
      ]
    },
    "arch": {
      "sci": "Robert Maillart (1872-1940)",
      "topic": "The arch & thin-shell concrete",
      "lede": "The Swiss engineer who threw away the rulebook's heavy formulas and let concrete flow into arches as thin as eggshells.",
      "no": 4,
      "profile": "Robert Maillart was a Swiss engineer who transformed reinforced concrete from an imitation of stone into a material with its own honest forms. Rather than dress concrete up as masonry, he let structural logic shape it, producing bridges of startling lightness — above all the Salginatobel Bridge of 1930, a slender arch leaping across an Alpine ravine that is now considered a landmark of engineering art.\n\nAn arch is one of the oldest and most efficient structural forms because it turns the downward pull of a load into compression running along its curve, thrusting outward into supports or abutments. Stone and concrete are strong in compression, so a well-shaped arch lets these materials work at their best, with little tension to trouble them. Maillart went further, marrying the arch to the deck so they stiffened each other, and developing the deck-stiffened arch and the flat concrete slab supported directly on columns — the mushroom-headed 'flat slab' floor.\n\nHe also pioneered thin-shell concrete, in which a curved surface only centimeters thick carries load through its geometry, like an eggshell, the way a curved form can be immensely stronger than a flat one of the same material. His genius was matching form to the flow of forces so precisely that almost no material was wasted.\n\nFor this inquiry, Maillart embodies efficiency done honestly. He removed material only where the forces genuinely allowed it, proven by analysis and testing, so that thinness was safe. That is the crucial contrast with what may have happened at the Verrin Tower. Trimming material because the forces truly permit it is elegant engineering; trimming it to save money while the forces still demand it, and hiding the fact, is the reverse. The line between the two is whether the margin was honestly earned or quietly stolen.",
      "frame": "Brandt runs a hand over a curved form in the shop. \"There's cutting weight because the shape lets you, and there's cutting it because someone's cheap. Show me you know how an arch actually carries, and I'll tell you which one this felt like.\"",
      "q": [
        {
          "q": "How does an arch carry its load?",
          "o": [
            {
              "t": "It turns the load into compression running along its curve, thrusting out at the supports.",
              "v": "expert",
              "fb": "An arch works in compression and pushes outward — that is its essence."
            },
            {
              "t": "It hangs the load in pure tension from the crown down to the solid ground at either end.",
              "v": "wrong",
              "fb": "An arch works in compression; tension is the cable's job, not the arch's."
            },
            {
              "t": "It spreads the load out flat like a beam, relying on its own depth to resist the bending.",
              "v": "wrong",
              "fb": "An arch carries by compression along its curve, not by beam bending."
            },
            {
              "t": "It balances the whole load on a single central hinge that quietly pivots as the weight shifts about.",
              "v": "partial",
              "fb": "Arches may have hinges, but they carry chiefly by compression, not by pivoting."
            }
          ]
        },
        {
          "q": "What is thin-shell concrete?",
          "o": [
            {
              "t": "A very thin curved surface that carries its load through its geometry, strong like an eggshell.",
              "v": "expert",
              "fb": "Curvature, not thickness, gives a shell its strength — the eggshell principle."
            },
            {
              "t": "A flat concrete slab made extra thick and heavy so that it can span far without any support.",
              "v": "wrong",
              "fb": "A shell is thin and curved; thickness is precisely what it avoids."
            },
            {
              "t": "Concrete poured in many thin layers that are carefully glued together after each one dries.",
              "v": "wrong",
              "fb": "A shell is a single curved form, not a stack of glued layers."
            },
            {
              "t": "A hollow concrete box whose thin walls resist the load by trapping compressed air sealed tight inside.",
              "v": "partial",
              "fb": "Shells work by curved geometry, not by internal air pressure."
            }
          ]
        },
        {
          "q": "How does Maillart's thinness differ from a cost-driven cut?",
          "o": [
            {
              "t": "He removed material where the forces truly allowed, proven by analysis — not to trim a budget.",
              "v": "expert",
              "fb": "Honest efficiency is earned by the forces; a hidden cost cut is not."
            },
            {
              "t": "There is truly no difference at all, since any thin structure is just as reckless and unsafe as any other.",
              "v": "danger",
              "fb": "Maillart's thinness was analyzed and safe; a hidden cut is neither."
            },
            {
              "t": "His thinness was pure luck, so trimming steel anywhere is equally fine as long as it stays standing.",
              "v": "danger",
              "fb": "It was rigorous analysis, not luck, and standing today is no proof of margin."
            },
            {
              "t": "His primarily real trick was a better cement, so material can be cut freely anywhere with a stronger mix.",
              "v": "partial",
              "fb": "The point was matching form to forces, not simply a stronger mix."
            }
          ]
        }
      ]
    },
    "flutter": {
      "sci": "Theodore von Kármán (1881-1963)",
      "topic": "Resonance & aeroelastic flutter",
      "lede": "The Caltech master who read the neat row of whirlpools behind a lamppost and named the vibration that walked a bridge to its death.",
      "no": 5,
      "profile": "Theodore von Kármán was a Hungarian-American engineer and one of the giants of aerodynamics, a student of Ludwig Prandtl who led Caltech's aeronautics laboratory and helped found the Jet Propulsion Laboratory. His name lives on in the Kármán vortex street: the regular, alternating pattern of vortices that peels off the back of a blunt body sitting in a moving fluid. As each vortex sheds, it gives the body a small sideways push, first one way, then the other, at a steady frequency set by the wind speed and the body's width.\n\nThat rhythmic pushing is dangerous when it matches a structure's own natural frequency of vibration. Then the pushes add up cycle after cycle — resonance — and small motions grow into large, destructive ones. Von Kármán connected this vortex shedding to the swaying of chimneys, wires, and slender towers, and his ideas illuminated the collapse of the Tacoma Narrows Bridge in 1940, which twisted itself apart in a moderate wind through an aeroelastic instability where the wind fed energy into the deck's own motion.\n\nAeroelastic flutter and vortex-induced vibration are properties of shape, stiffness, mass, and damping — all designable. Engineers tune a tower's natural frequency, add stiffness or dampers, and test in wind tunnels so that dangerous resonance never occurs at expected wind speeds.\n\nFor this board, von Kármán is a hypothesis to test and probably to refine. A tower can genuinely sway from vortex shedding, but this is a foreseeable, calculable effect at ordinary wind speeds — not a freak act of God, and certainly not a bomb. And if a design's stiffness or damping was quietly reduced, the very winds it was meant to shrug off could set it groaning. The wind need not be extraordinary; the structure's reserve against it may simply have been spent.",
      "frame": "Taps a wind-tunnel report in the file. \"They tested this tower once. Then they revised it. Show me you understand why a tower sways in a steady wind, and I'll show you which report they filed and which they didn't.\"",
      "q": [
        {
          "q": "What is a Kármán vortex street?",
          "o": [
            {
              "t": "A regular pattern of alternating vortices shed behind a body, pushing it side to side.",
              "v": "expert",
              "fb": "Alternating vortices give steady sideways pushes — the vortex street."
            },
            {
              "t": "A steady sheet of smooth air that glides past a tower without ever disturbing it.",
              "v": "wrong",
              "fb": "It is an unsteady, alternating wake, not smooth undisturbed flow."
            },
            {
              "t": "A build-up of static electricity in high wind that makes a structure hum audibly.",
              "v": "wrong",
              "fb": "It is a fluid-flow pattern, not an electrical effect."
            },
            {
              "t": "A single strong gust that strikes a tower once and then passes on down the street.",
              "v": "partial",
              "fb": "It is a repeating, rhythmic shedding, not one isolated gust."
            }
          ]
        },
        {
          "q": "When does vortex shedding become dangerous to a structure?",
          "o": [
            {
              "t": "When its frequency matches the structure's natural frequency and resonance builds the motion up.",
              "v": "expert",
              "fb": "Resonance between shedding and the tower's own frequency is the peril."
            },
            {
              "t": "primarily in true hurricane-force winds, since ordinary everyday breezes can rarely move solid steel at all.",
              "v": "danger",
              "fb": "Damaging resonance can occur at moderate, ordinary wind speeds."
            },
            {
              "t": "When the wind blows steadily from one single direction for several days on end without a break, in use.",
              "v": "wrong",
              "fb": "It is frequency matching, not duration, that makes shedding dangerous."
            },
            {
              "t": "Whenever two towers stand close enough for their wakes to collide in the gap between them, in use.",
              "v": "partial",
              "fb": "Interference exists, but the core danger is resonance with the natural frequency."
            }
          ]
        },
        {
          "q": "How should the board treat swaying from vortex shedding here?",
          "o": [
            {
              "t": "As a foreseeable, calculable effect — and if damping was cut, ordinary winds could excite it.",
              "v": "expert",
              "fb": "Shedding is designed against; a reduced reserve lets normal winds set it swaying."
            },
            {
              "t": "As proof of a hidden explosion, since primarily a sudden blast could ever start a steel tower vibrating.",
              "v": "danger",
              "fb": "Vortex shedding is aerodynamic and needs no blast to start it."
            },
            {
              "t": "As a freak of nature beyond all prediction, so that no one at all could be held responsible.",
              "v": "danger",
              "fb": "It is predictable and designed for; calling it a freak excuses a real failing."
            },
            {
              "t": "As irrelevant, because towers are far too stiff for wind to ever move them noticeably, in use.",
              "v": "partial",
              "fb": "Slender towers do sway in wind; that is exactly what damping is for."
            }
          ]
        }
      ]
    },
    "brittle": {
      "sci": "Constance Tipper (1894-1995)",
      "topic": "Brittle fracture",
      "lede": "The Cambridge metallurgist who explained why welded warships were splitting in half in the cold Atlantic — and how to stop it.",
      "no": 6,
      "profile": "Constance Tipper was a British metallurgist and crystallographer, the first woman on the Cambridge engineering faculty, whose work solved one of the deadliest engineering mysteries of the Second World War. Mass-produced welded cargo ships — the American Liberty ships — were fracturing without warning, some breaking clean in two, often in cold water and sometimes while sitting quietly at anchor. Rivet-built ships had never done this so catastrophically.\n\nTipper showed that the cause was brittle fracture in the steel itself. Ordinary structural steel is ductile at warm temperatures — it bends and stretches before it breaks, giving warning. But as temperature falls, it passes through a ductile-to-brittle transition below which it snaps suddenly, with almost no deformation, a running crack tearing across it at enormous speed. The Liberty ships' steel had a transition temperature too high for the frigid North Atlantic, and because the hulls were welded into one continuous piece, a crack that started at a stress concentration — a square hatch corner — could run the whole length of the ship. Her 'Tipper test' gave engineers a way to measure that transition and specify tougher steel.\n\nBrittle fracture is frightening precisely because it is sudden and gives no warning, but it is not mysterious. It depends on the steel's composition and toughness, the temperature, the presence of notches, and the speed of loading — all knowable, all specifiable.\n\nFor this case, Tipper warns against mistaking a sudden fracture for an inexplicable one. If the Verrin Tower used a steel with poor low-temperature toughness — a cheaper grade than specified, perhaps, quietly substituted — then a cold night and an ordinary wind could set a crack running with no bang and no blast. What arrived on site versus what the drawings demanded is exactly the kind of substitution that turns foreseeable physics into a 'freak' the guilty would rather you believe in.",
      "frame": "Odette taps the mill stamp on a plate. \"There's the grade that was ordered, and there's what actually showed up cold on my truck. Show me you know how good steel turns brittle, and I'll tell you what the certificates really said.\"",
      "q": [
        {
          "q": "What is brittle fracture?",
          "o": [
            {
              "t": "A sudden break with almost no bending, a crack running fast across the steel.",
              "v": "expert",
              "fb": "Little deformation and a fast-running crack define brittle fracture."
            },
            {
              "t": "A slow sagging of the metal that stretches for hours before it finally lets go.",
              "v": "wrong",
              "fb": "That is ductile behavior; brittle fracture is sudden, with little stretch."
            },
            {
              "t": "A gradual thinning of a member from rust until it can no longer bear its load.",
              "v": "wrong",
              "fb": "That is corrosion loss; brittle fracture is a sudden crack, not thinning."
            },
            {
              "t": "A crack that grows a tiny bit with each cycle over years of repeated loading.",
              "v": "partial",
              "fb": "That is fatigue; brittle fracture is a single fast, near-instant break."
            }
          ]
        },
        {
          "q": "What did Tipper find about the Liberty ships' steel?",
          "o": [
            {
              "t": "It turned brittle below a transition temperature, and welded hulls let cracks run full length.",
              "v": "expert",
              "fb": "A high transition temperature plus continuous welds allowed hull-length cracks."
            },
            {
              "t": "It had been quietly sabotaged in the shipyards by enemy agents planting flaws in the welds.",
              "v": "danger",
              "fb": "The cause was material toughness and temperature, not sabotage."
            },
            {
              "t": "It rusted through faster than riveted steel because welds trapped seawater inside them.",
              "v": "wrong",
              "fb": "The failure was brittle fracture from low-temperature behavior, not rust."
            },
            {
              "t": "It was simply too thin, so thicker plate everywhere would have solved the problem.",
              "v": "partial",
              "fb": "Toughness and transition temperature were the issue, not mere thickness."
            }
          ]
        },
        {
          "q": "Why does brittle fracture matter for judging this tower?",
          "o": [
            {
              "t": "A cheaper steel with poor cold toughness could crack in ordinary wind on a cold night, in use.",
              "v": "expert",
              "fb": "A substituted low-toughness grade turns a cold, breezy night into a fracture."
            },
            {
              "t": "It doesn't, since a sudden break with no warning can primarily mean a planted charge, in use.",
              "v": "danger",
              "fb": "Brittle fracture is sudden by nature; that is no proof of a bomb."
            },
            {
              "t": "It is presented as showing the storm was a freak, because good steel rarely fractures under any wind.",
              "v": "danger",
              "fb": "The right steel resists it; a poor grade fractures under foreseeable conditions."
            },
            {
              "t": "It matters primarily in ships, since buildings rarely get cold enough for steel to go brittle.",
              "v": "partial",
              "fb": "Exposed steel towers can reach brittle temperatures on cold nights too."
            }
          ]
        }
      ]
    },
    "redundancy": {
      "sci": "Mario Salvadori (1907-1997)",
      "topic": "Redundancy & progressive collapse",
      "lede": "The Columbia professor who could make a child see why a building stands, and why, one weak link at a time, it falls.",
      "no": 7,
      "profile": "Mario Salvadori was an Italian-American structural engineer, architect, and beloved teacher at Columbia University and the firm Weidlinger Associates. He is best known to the wider world for two books written with Matthys Levy, 'Why Buildings Stand Up' and 'Why Buildings Fall Down,' which explain the logic of structures and the anatomy of their failures in plain language. Late in life he devoted himself to teaching structural principles to schoolchildren in Harlem, convinced anyone could grasp how the built world holds together.\n\nTwo linked ideas run through his work: redundancy and progressive collapse. A redundant structure has more than one path by which load can travel to the ground, so if a single member is lost, the load reroutes through others and the building survives. A non-redundant structure has no such backup — lose one critical element and there is nowhere for its load to go. Progressive collapse is what follows when a local failure overloads its neighbors, which fail in turn, the damage spreading far beyond the first break. The 1968 Ronan Point disaster in London, where a gas explosion knocked out one load-bearing panel and a corner of the tower peeled down floor by floor, made the danger vivid and reshaped codes to demand alternate load paths.\n\nSalvadori's lesson is that safety lives in the reserves — in the extra paths and the margins that let a structure absorb the unexpected and keep standing.\n\nFor this case, redundancy is the difference between a survivable surprise and a catastrophe. A tower with honest margins and alternate load paths can lose a member to a gust or a flaw and still stand, giving warning. Quietly spend those reserves, and a single overstressed connection has no backup: it fails, sheds its load onto neighbors already at their limit, and the failure runs. What looks from outside like an inexplicable, total collapse is really the visible end of a redundancy that was secretly removed long before.",
      "frame": "Brandt spreads a framing plan across the office table. \"Salvadori would tell you a good building has a plan B in every joint. Somebody erased the plan B on this one. Show me you know what redundancy buys before I point to where it went.\"",
      "q": [
        {
          "q": "What is structural redundancy?",
          "o": [
            {
              "t": "More than one load path, so losing one member lets the load reroute and the building stand.",
              "v": "expert",
              "fb": "Alternate load paths are the backup that redundancy provides."
            },
            {
              "t": "Spare materials kept in storage on site in case a member has to be replaced during a storm.",
              "v": "wrong",
              "fb": "Redundancy is built-in alternate load paths, not a stockpile of spare parts."
            },
            {
              "t": "Repeating the identical floor plan on every level so the building looks perfectly uniform.",
              "v": "wrong",
              "fb": "It is about load paths, not repeating an identical architectural layout."
            },
            {
              "t": "Adding decorative members that carry no load but reassure the public that it is strong.",
              "v": "partial",
              "fb": "True redundancy carries real load along backup paths, not for show."
            }
          ]
        },
        {
          "q": "What is progressive collapse?",
          "o": [
            {
              "t": "A local failure overloads neighbors that fail in turn, spreading far beyond the first break.",
              "v": "expert",
              "fb": "One failure cascading into many is progressive collapse."
            },
            {
              "t": "A slow settling of the whole structure as its foundation compresses evenly over many years.",
              "v": "wrong",
              "fb": "That is settlement; progressive collapse is a spreading chain of failures."
            },
            {
              "t": "The planned, careful demolition of a building brought down safely with sequenced charges.",
              "v": "wrong",
              "fb": "That is controlled demolition, the opposite of an accidental cascade."
            },
            {
              "t": "A single column crushing all at once under a load far beyond anything it was ever designed for.",
              "v": "partial",
              "fb": "Progressive collapse is a spreading chain, not one member failing in isolation."
            }
          ]
        },
        {
          "q": "How does spending a tower's margins invite progressive collapse?",
          "o": [
            {
              "t": "A single overstressed joint fails with no backup, shedding load onto neighbors already maxed out.",
              "v": "expert",
              "fb": "Lost reserves mean the first failure has no alternate path and the collapse runs."
            },
            {
              "t": "It does not, because a total collapse of a whole tower can primarily be the work of planted charges.",
              "v": "danger",
              "fb": "Removing redundancy lets ordinary loads trigger a cascade — no charge needed."
            },
            {
              "t": "It primarily matters in an earthquake, since ordinary wind rarely overloads a single joint at all.",
              "v": "danger",
              "fb": "Everyday wind can overload a joint whose margin was spent; no quake required."
            },
            {
              "t": "It slows collapse down, giving the reserves time to slowly transfer the load somewhere safe.",
              "v": "partial",
              "fb": "Spent reserves speed collapse; they do not buy time to redistribute load."
            }
          ]
        }
      ]
    },
    "concrete": {
      "sci": "François Hennebique (1842-1921)",
      "topic": "Reinforced concrete",
      "lede": "The self-taught French builder who married steel and stone into one material, then franchised it across a continent.",
      "no": 8,
      "profile": "François Hennebique was a French self-taught builder and entrepreneur who did more than almost anyone to turn reinforced concrete from an experiment into an industry. In 1892 he patented a complete system of construction, and rather than merely build with it, he licensed it through a network of agents and approved contractors, spreading the Hennebique system across Europe and putting his name on thousands of structures, from factories to his own concrete house at Bourg-la-Reine.\n\nHis genius lay in understanding, and systematizing, how two materials cover each other's weaknesses. Concrete is strong in compression but weak and unreliable in tension, cracking easily when pulled. Steel is superb in tension. Hennebique's system placed steel reinforcing bars precisely where a member is pulled — along the bottom of a beam, where bending puts the lower fibers in tension — and added U-shaped stirrups to resist the shearing forces near the supports. Crucially, he cast beams, columns, and floors together as a monolithic, connected whole, so load flowed continuously through the frame. Concrete and steel bond together and expand with heat at nearly the same rate, letting them act as a single composite material.\n\nThe defining feature of reinforced concrete is also its hazard: the steel is invisible. Once the concrete is poured, no one can see how many bars are inside, how thick they are, or where they sit.\n\nFor this case, Hennebique's material is where a cut can hide in plain sight. Reduce the number or size of the reinforcing bars, move them from where the tension demands them, thin the concrete cover that protects them — and the finished member looks identical to a sound one. The drawings say one thing; the buried steel says another. A member so weakened can crack and fail under ordinary load, and unless someone kept the paperwork, the evidence is sealed in concrete. The shortfall remains entombed where inspection cannot easily reach it.",
      "frame": "Fans out a set of bar-bending schedules. \"Once it's poured, you can't see the steel — you can only trust the paper. And the paper on this job was revised. Show me you understand reinforced concrete, and I'll tell you which schedule they used.\"",
      "q": [
        {
          "q": "Why does concrete need steel reinforcement?",
          "o": [
            {
              "t": "Concrete is weak in tension, so the steel bars carry the pulling forces that it cannot, in use.",
              "v": "expert",
              "fb": "Steel takes the tension; concrete keeps the compression — that is the pairing."
            },
            {
              "t": "Steel bars are added mainly to make the concrete set faster and cure more evenly throughout.",
              "v": "wrong",
              "fb": "Reinforcement carries tension; it does not speed up curing."
            },
            {
              "t": "Concrete is weak in compression, so the embedded steel is what carries all the crushing load.",
              "v": "wrong",
              "fb": "It is the reverse: concrete is strong in compression, weak in tension."
            },
            {
              "t": "The steel is primarily there to hang ceilings, pipes, and fixtures from once the building is finished.",
              "v": "partial",
              "fb": "Rebar is structural, resisting tension; it is not just for hanging fixtures."
            }
          ]
        },
        {
          "q": "Where did Hennebique's system place the reinforcing steel?",
          "o": [
            {
              "t": "Along the tension side of a beam, with stirrups near the supports to resist shear, in use.",
              "v": "expert",
              "fb": "Bars in the tension zone plus stirrups for shear — the Hennebique arrangement."
            },
            {
              "t": "Evenly all through the concrete in a dense grid, so every part carries the same load equally.",
              "v": "wrong",
              "fb": "Steel goes where tension and shear demand it, not uniformly everywhere."
            },
            {
              "t": "primarily along the very top of a beam, since that is the face that carries the most compression.",
              "v": "wrong",
              "fb": "The bottom of a simple beam is in tension; that is where the bars belong."
            },
            {
              "t": "Wrapped around the outside surface as a protective cage rather than buried within the member.",
              "v": "partial",
              "fb": "Reinforcement is embedded inside the concrete, not wrapped on the outside."
            }
          ]
        },
        {
          "q": "Why is reinforced concrete an easy place to hide a cut?",
          "o": [
            {
              "t": "The steel is invisible once poured, so fewer or thinner bars leave the member looking identical.",
              "v": "expert",
              "fb": "Buried, unseen reinforcement lets a shortfall pass as a sound member."
            },
            {
              "t": "It isn't, because inspectors can generally see the reinforcing bars right through the finished concrete.",
              "v": "danger",
              "fb": "The bars are hidden once poured; that invisibility is exactly the risk."
            },
            {
              "t": "Because any missing steel would make the concrete visibly crumble the very day it is cast, in use.",
              "v": "danger",
              "fb": "A rebar shortfall is invisible at casting and may show primarily under load later."
            },
            {
              "t": "Because concrete is so strong it rarely really needs the steel, so removing bars changes little.",
              "v": "partial",
              "fb": "Concrete needs the steel for tension; removing bars weakens it seriously."
            }
          ]
        }
      ]
    },
    "ethics": {
      "sci": "William LeMessurier (1926-2007)",
      "topic": "Engineering ethics & the whistle",
      "lede": "The engineer who learned his finished skyscraper might blow over in a storm — and chose to tell, rather than to hope.",
      "no": 9,
      "profile": "William LeMessurier was a distinguished American structural engineer, best remembered for how he handled the frightening secret of the Citicorp Center, a landmark New York tower completed in 1977. Set on stilts with an unusual chevron bracing system and a tuned mass damper to reduce sway, it was an engineering showpiece. Then, in 1978, prompted partly by a student's question, LeMessurier re-examined it and made a chilling discovery.\n\nHe found that the tower was far more vulnerable to quartering winds — winds striking a corner — than his original analysis had assumed, and, critically, that the diagonal braces had been joined with bolted connections instead of the welds he had envisioned, a change made lower down the chain to save cost. Recalculating, he concluded that a powerful storm, of a kind likely far more often than a skyscraper's lifetime should allow, could overload a joint and threaten collapse, especially if a power failure stopped the damper.\n\nFaced with a career-ending admission, LeMessurier did not stay silent or hope the storm would hold off. He alerted the owners and authorities, and through the autumn of 1978 — as a hurricane tracked up the coast — crews secretly welded steel plates over the tower's joints at night, quietly making it one of the safest buildings in the city. His willingness to expose his own error became a touchstone of engineering ethics.\n\nFor this case, LeMessurier is the moral mirror. He shows that the honorable response to a discovered danger is to raise the alarm and fix it — which is precisely what someone at the Verrin Tower did not do. The signature of the truth here is not a bomb and not a freak of nature, but a warning that existed and was buried. Where LeMessurier blew the whistle on himself, someone here made sure no whistle was ever heard.",
      "frame": "Odette leans against her cab, arms folded. \"LeMessurier found out his own tower could fall and he told the world. Somebody on this job found out and shut up. Show me you understand the difference, and I'll tell you what got left off the record.\"",
      "q": [
        {
          "q": "What did LeMessurier discover about the Citicorp Center?",
          "o": [
            {
              "t": "Quartering winds and bolted joints left it more vulnerable than his original analysis had assumed, in use.",
              "v": "expert",
              "fb": "Corner winds plus a cost-driven joint change were the hidden danger he found."
            },
            {
              "t": "That the foundation had quietly begun sinking unevenly into the soft Manhattan ground beneath one whole corner.",
              "v": "wrong",
              "fb": "The problem was wind on bolted braces, not foundation settlement."
            },
            {
              "t": "That a rival firm had deliberately sabotaged the steelwork during the tower's construction phase, in use.",
              "v": "wrong",
              "fb": "No sabotage was involved; it was an analysis gap and a joint substitution."
            },
            {
              "t": "That the elevators overloaded the frame, so the tower could fail whenever they were all in use together.",
              "v": "partial",
              "fb": "The vulnerability was wind on the bracing joints, not elevator loads."
            }
          ]
        },
        {
          "q": "How did LeMessurier respond to the danger he found?",
          "o": [
            {
              "t": "He alerted the owners and authorities and had the joints secretly welded and reinforced.",
              "v": "expert",
              "fb": "He raised the alarm and fixed it — the ethical response he is remembered for."
            },
            {
              "t": "He quietly said nothing and simply hoped that no severe storm would arrive during his lifetime.",
              "v": "wrong",
              "fb": "He did the opposite of staying silent; he disclosed and repaired it."
            },
            {
              "t": "He blamed the steel contractor publicly and walked away from any responsibility for the tower.",
              "v": "wrong",
              "fb": "He took ownership rather than shifting blame and leaving."
            },
            {
              "t": "He ordered the building evacuated for good and had it torn down before any storm could hit it.",
              "v": "partial",
              "fb": "The tower was reinforced, not demolished; occupants were largely unaware."
            }
          ]
        },
        {
          "q": "What is the ethical signature that points to the truth in a case like this?",
          "o": [
            {
              "t": "A warning that existed and was buried, rather than a bomb or an unforeseeable act of nature.",
              "v": "expert",
              "fb": "A suppressed warning is the fingerprint of a concealed, human failing."
            },
            {
              "t": "A single dramatic act of destruction, which is the primarily thing that ever brings a tower down.",
              "v": "danger",
              "fb": "A quiet buried warning, not a dramatic act, marks this kind of truth."
            },
            {
              "t": "A total absence of any records at all, proving the collapse was pure bad luck and nobody's fault.",
              "v": "danger",
              "fb": "The telling sign is a warning that was hidden, not an innocent blank."
            },
            {
              "t": "An honest public disclosure made early, which shows the engineers behaved responsibly throughout.",
              "v": "partial",
              "fb": "That is the ethical response; its absence, a buried warning, is what indicts here."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "foreman": {
      "site": "Brandt stands at the tower's base with a floodlight on the swaying mast, spanner still in his fist. \"I bolted every joint you can see and a few you can't. Show me you understand what's pulling on them, and I'll tell you which ones I lost sleep over.\"",
      "shop": "Brandt walks the fabrication bay between stacks of plate and half-built trusses. \"Out here is where the steel becomes a building. Know how these pieces really carry, and I'll tell you what came out of this shop looking lighter than the drawings promised.\"",
      "office": "Brandt looks uneasy among the drawing boards and filing cabinets. \"I'm a site man; this is where the numbers live. But I learned to read them the hard way. Prove you can too, and I'll show you where the frame lost its nerve.\""
    },
    "clerk": {
      "site": "The Clerk has come out to the site with a folder held flat against the wind. \"I don't like being seen here, but the drawings only mean something next to the real thing. Show me you grasp the forces, and I'll show you which revision they actually built.\"",
      "shop": "The Clerk moves quietly along the shop's inspection table, comparing stamps to a ledger. \"Every plate is supposed to match a line in this book. Some don't. Prove you understand the metallurgy, and I'll tell you which certificates went missing.\"",
      "office": "The Clerk is on home ground at last, surrounded by the files. \"This is where it was decided, and where the paper was meant to disappear. Show me you can read what a structure needs, and I'll hand you the pages someone wanted gone.\""
    },
    "driver": {
      "site": "Odette pulls her flatbed up to the site fence and hops down. \"I delivered most of what's standing here. I know what I loaded and what the ticket said. Show me you know how it all carries, and I'll tell you where the two didn't match.\"",
      "shop": "Odette leans on a pallet of bolts in the shop doorway. \"The steel passes through my hands before it's anyone else's problem. Know your fractures and your fatigue, and I'll tell you what grade really rolled in on my truck.\"",
      "office": "Odette stands in the office with her cap in her hands, out of place and unbowed. \"They think drivers don't read. I read plenty — including a memo that shouldn't have been in my cab. Show me you understand the stakes, and I'll tell you what it said.\""
    }
  },
  "story": [
    "<b>The Verrin Tower</b> begins inside the Verrin Tower inquiry, where the first explanation is already spreading faster than the evidence.",
    "<b>Tomas Brandt</b>, <b>The Clerk</b>, and <b>Odette Fer</b> each hold a different part of the record, and each conversation opens with one real pioneer whose work changes how the evidence should be read.",
    "The inquiry keeps circling <b>Deliberate sabotage or a planted charge</b> and <b>An unforeseeable freak wind — an act of God</b>. Both are tempting, and neither can be accepted just because it makes the cleanest headline.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and make the final WHAT judgment from what you learned."
  ],
  "endings": {
    "overclaimWhat": "sabotage",
    "dismissalWhat": "act",
    "win": {
      "expertTitle": "The Number Someone Changed",
      "expert": [
        "Reyes names it exactly: Marcus Ketterly, the developer, who quietly ordered the tower's safety factor shaved to protect his budget and then buried the memo that warned against it; the truth culminating in the Design & Project Office, where the reduced margin was decided and the warning was filed out of sight; and a concealed value-engineering cut to the structural safety factor. Not a bomb. Not a freak of the weather.",
        "Every card accounted for. Reyes worked the site, the fabrication shop, and the office, turned a wary foreman, a careful clerk, and a plain-spoken driver into witnesses, and claimed precisely what the drawings, the certificates, and the recovered memo could defend. The inquiry's findings strip Ketterly's licence to build and force the margins back into every tower like it — which is the whole point of doing it right."
      ],
      "soundTitle": "Right, but Lightly Proven",
      "sound": [
        "Reyes names the right three — Ketterly, the Design & Project Office, and the concealed cut to the safety factor. The shape of the case is correct, and the refusal to cry sabotage or shrug at an act of God is exactly right.",
        "But too many threads were left loose, and Ketterly's lawyers will pull at every one. A few more days tracing the revised drawings and the buried memo would have made the finding unassailable. Close and honest, if not yet airtight."
      ],
      "namedTitle": "The Right Answer, Unearned",
      "named": [
        "Reyes names the truth — Ketterly, the office, the hidden cut to the safety margin — but gathered too little to back it. It reads like a hunch that happened to land.",
        "An inquiry cannot revoke a developer's standing on an accusation this thin, however correct. Being right is not the same as proving it to the people who will fight the finding all the way down."
      ]
    },
    "overclaim": {
      "title": "The Inquiry That Cried Sabotage",
      "body": [
        "Reyes reports deliberate sabotage — a planted charge — the answer the loudest voices were already broadcasting. It is vivid, and it is not what the evidence shows.",
        "There was no charge, no residue, no forced access; only a frame carrying more than it should because its margin had been quietly spent, and a memo someone made disappear. When the sabotage story collapses under the first expert's questions, it takes the whole case with it, and the real, provable cut is waved away as just another conspiracy theory. The only thing that was planted was doubt about a number."
      ]
    },
    "dismissal": {
      "title": "Case Closed on the Weather",
      "body": [
        "Reyes files it as an unforeseeable freak wind — an act of God, nothing anyone could have designed against — and closes the inquiry. It is comfortable, and it is false.",
        "The storm was well within the wind the tower was required to survive; a sound structure would have shrugged it off. What failed was a margin that had been secretly reduced to save money, and a warning that was buried so no one would look. Blaming the sky leaves that cut in place in every other tower from the same office, waiting for the next ordinary storm to find it."
      ]
    },
    "wrongNames": {
      "title": "So Close",
      "body": [
        "Reyes has the nature of it cold — a concealed value-engineering cut to the safety factor, a margin quietly spent and a warning buried, neither a bomb nor an act of God. But the finger lands on the wrong name or the wrong room."
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A tall tower swaying in wind with a weakened connection\"><path d=\"M274 116 L304 22 L338 116 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.6\"/><path d=\"M286 82 L326 82\" stroke=\"#B3261E\" stroke-width=\"2.4\"/><path d=\"M54 42 C110 22,164 24,220 42\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2\"/><path d=\"M398 42 C454 22,508 24,566 42\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2\"/><path d=\"M292 34 C302 28,314 28,326 34\" fill=\"none\" stroke=\"#e2e2d8\" stroke-width=\"1\"/></svg>"
}};
