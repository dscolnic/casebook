module.exports = { PACK: {
  "id": "m_stadium",
  "title": "The Coronet Arena Roof",
  "discipline": "Structures & Crowd Dynamics",
  "teaser": "An arena roof folded onto a packed stand during a sell-out. A bomb in the rafters? A freak snow load from a storm? Or a joint that was quietly cheapened?",
  "overclaimTag": "a bomb or explosion",
  "truthTag": "a cheapened connection under an ignored load",
  "venue": "the Coronet Arena inquiry",
  "agent": {
    "name": "Investigator Priya Lund",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Structures & Crowd Pioneers",
  "dossierName": "STRUCTURES & CROWD-DYNAMICS PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Coronet Arena inquiry",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before the inquiry closes. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The place you test determines the dossier you receive, and the conversation costs one day.",
  "overclaimTease": "And beware the answer the cameras crave: there is no bomb in the rafters. What folded that roof is smaller than any headline and worse than an accident — and someone who has read the drawings would sooner you never traced it.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "st_developer",
      "items": [
        {
          "id": "st_developer",
          "label": "Vaughn Kroll — arena developer"
        },
        {
          "id": "st_engineer",
          "label": "The structural engineer of record"
        },
        {
          "id": "st_inspector",
          "label": "The building-control inspector"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "st_office",
      "items": [
        {
          "id": "st_roof",
          "label": "The Roof Trusses & Node Connections"
        },
        {
          "id": "st_stand",
          "label": "The Stand & Concourse"
        },
        {
          "id": "st_office",
          "label": "The Developer's Project Office"
        }
      ]
    },
    "what": {
      "title": "What is happening",
      "truth": "st_connection",
      "items": [
        {
          "id": "st_bomb",
          "label": "A bomb or explosion in the structure"
        },
        {
          "id": "st_snow",
          "label": "A freak snow load from a storm — an act of God"
        },
        {
          "id": "st_connection",
          "label": "A value-engineered connection under an ignored crowd-and-snow load"
        }
      ]
    }
  },
  "PLACES": {
    "st_roof": {
      "name": "The Roof Trusses & Node Connections",
      "xy": [
        140,
        90
      ]
    },
    "st_stand": {
      "name": "The Stand & Concourse",
      "xy": [
        330,
        240
      ]
    },
    "st_office": {
      "name": "The Developer's Project Office",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "st_roof",
      "st_stand"
    ],
    [
      "st_stand",
      "st_office"
    ]
  ],
  "CHARACTERS": {
    "st_erector": {
      "name": "Steelworker Bo Renn",
      "role": "Roof steel erector",
      "face": "🔧",
      "badge": "B",
      "legend": "the roof",
      "hint": "Bolted the trusses; watched the engineered node swapped for a cheaper splice."
    },
    "st_steward": {
      "name": "The Head Steward",
      "role": "Crowd-safety steward",
      "face": "📣",
      "badge": "S",
      "legend": "the stand",
      "hint": "Packs the stands; knows the section was loaded far past its posted count."
    },
    "st_clerk": {
      "name": "The Clerk",
      "role": "Project records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the office",
      "hint": "Keeps the drawings — and the value-engineering change that thinned the joint."
    }
  },
  "TOPICMAP": {
    "st_roof": {
      "st_erector": [
        "st_shukhov"
      ],
      "st_steward": [
        "st_fuller"
      ],
      "st_clerk": [
        "st_candela"
      ]
    },
    "st_stand": {
      "st_erector": [
        "st_leonhardt"
      ],
      "st_steward": [
        "st_geiger"
      ],
      "st_clerk": [
        "st_wachsmann"
      ]
    },
    "st_office": {
      "st_erector": [
        "st_prager"
      ],
      "st_steward": [
        "st_foppl"
      ],
      "st_clerk": [
        "st_helbing"
      ]
    }
  },
  "TOPICS": {
    "st_shukhov": {
      "sci": "Vladimir Shukhov (1853-1939)",
      "topic": "Steel lattice shells & tension roofs",
      "lede": "The Moscow engineer who roofed vast halls with a net of steel decades before anyone had a name for what he was doing.",
      "no": 1,
      "profile": "Vladimir Shukhov was a Russian engineer of extraordinary range — oil pipelines, refineries, bridges, and, above all, some of the lightest long-span roofs ever built. Working in Moscow from the 1880s, he invented the steel lattice gridshell and the hanging steel roof decades before either had a name. For the 1896 All-Russian exhibition at Nizhny Novgorod he roofed enormous halls with thin steel membranes and curved lattices that weighed a fraction of anything comparable, hanging some roofs from a mesh of steel like an upturned tent.\n\nShukhov's insight was that form does the work. A curved lattice of slender bars, or a surface held in pure tension, can span an enormous distance on very little metal — if every member and every joint carries exactly the force the geometry demands. He calculated those forces meticulously and raised the famous hyperboloid Shukhov Tower from straight steel members arranged on a curved surface, proving that honest geometry could replace sheer mass.\n\nBut such structures are only as strong as their nodes. In a lattice shell or a tension roof the loads funnel through connections where many members meet, and each joint must be built to the design or the surface loses the path its force was meant to follow. Shukhov detailed his connections as carefully as his curves.\n\nSo Shukhov stands here as the warning against two easy stories. A light, efficient roof that folds did not necessarily 'explode,' and it was not simply overwhelmed by an unforeseeable act of nature. More often someone changed a member or a joint — swapped a cheaper connection for the one the geometry required — and the force found no honest path. Before you reach for a bomb or a freak storm, ask what was built where Shukhov would have demanded a designed node.",
      "frame": "Renn runs a gloved hand along a truss chord. \"Everyone gawks at the span. I watch the joints — that's where a roof lives or dies. Prove you know that, and I'll point you to the joint I bolted up there.\"",
      "q": [
        {
          "q": "What was Shukhov's central insight about long-span roofs?",
          "o": [
            {
              "t": "Curved form and tension let slender steel span far on very little metal.",
              "v": "expert",
              "fb": "Shukhov made geometry, not mass, carry the load."
            },
            {
              "t": "mainly heavy, deep steel trusses can roof a very long span without sagging.",
              "v": "wrong",
              "fb": "His light lattices spanned far precisely by shedding that mass."
            },
            {
              "t": "A roof this thin would have been blown apart, since slender steel does not hold.",
              "v": "danger",
              "fb": "Light does not mean fragile; a well-formed lattice is very strong."
            },
            {
              "t": "Thick masonry walls, not the roof geometry, carried the real weight above.",
              "v": "partial",
              "fb": "The lattice carried the span; the walls only received its thrust."
            }
          ]
        },
        {
          "q": "In a lattice shell or tension roof, where do the loads concentrate?",
          "o": [
            {
              "t": "At the nodes where many members meet, so each joint must match the design.",
              "v": "expert",
              "fb": "A cheapened joint breaks the path the funneled force needs."
            },
            {
              "t": "Evenly across the sheeting, so the joints barely matter to the structure.",
              "v": "wrong",
              "fb": "The opposite: joints are where a lattice roof lives or dies."
            },
            {
              "t": "mainly in a storm, when snow alone decides whether the connections will hold.",
              "v": "danger",
              "fb": "Snow adds load, but the joints carry ordinary loads every single day."
            },
            {
              "t": "In the foundations, since a roof sends its whole weight straight to ground.",
              "v": "partial",
              "fb": "Load reaches the ground, but it funnels through the roof nodes first."
            }
          ]
        },
        {
          "q": "Why does Shukhov's work caution against a bomb or a freak storm?",
          "o": [
            {
              "t": "Because such a roof usually fails where a joint was changed from its design.",
              "v": "expert",
              "fb": "Trace the altered connection before reaching for blast or blizzard."
            },
            {
              "t": "Because a roof this thin can mainly come down from a shaped charge set beneath it.",
              "v": "danger",
              "fb": "Thin, well-built roofs stand for decades; the joints deserve first look."
            },
            {
              "t": "Because a once-a-century snowfall is the one force that can fell good steel.",
              "v": "partial",
              "fb": "Snow is a real load, but a designed roof carries it; a thinned joint may not."
            },
            {
              "t": "Because the members rarely matter, mainly the paint and the rust beneath it.",
              "v": "wrong",
              "fb": "Members and joints matter most; corrosion is a separate, slower story."
            }
          ]
        }
      ]
    },
    "st_fuller": {
      "sci": "Buckminster Fuller (1895-1983)",
      "topic": "The geodesic dome",
      "lede": "The American visionary who preached doing more with less, and covered the world in triangles that carry their load by sharing it.",
      "no": 2,
      "profile": "Buckminster Fuller — American inventor, designer, and self-appointed philosopher — worried at a single idea his whole life long: doing more with less, which he insisted on dignifying with the name 'ephemeralization.' His most famous product was the geodesic dome — a roughly spherical shell built from a network of triangles that distributes stress across the whole surface, so that a very light structure can enclose a very large space. He patented the dome in 1954, and thousands were built, from radar shelters to the great transparent Biosphère he designed for Expo 67 in Montreal.\n\nThe genius of the geodesic dome is triangulation. A triangle cannot deform without changing the length of a side, so a surface made of triangles is inherently rigid; load applied anywhere is shared out along many members as tension and compression, rather than bending any single one. This lets a dome grow stronger, pound for pound, as it grows larger — the opposite of a heavy masonry vault. Fuller also explored 'tensegrity,' structures of isolated compression members floating in a net of continuous tension.\n\nBut that efficiency depends utterly on the hubs where struts meet. The load is only shared if every joint actually transmits force between its members. A dome is a conversation among its connections; silence one, substitute a weaker fitting, and the graceful sharing of stress breaks down.\n\nFuller, then, cautions against both traps at once. A triangulated roof is remarkably tough, so its collapse is not lightly explained by weather it was built to bear, nor does its lightness make a bomb the obvious answer. The failure of such a structure usually begins at a node — the very place where an efficient design is most vulnerable to a cheaper substitution. Look where the members meet.",
      "frame": "The steward flips through the turnstile counts. \"A dome shares its load like a crowd shares an exit — only if every path stays open. Follow that logic, and I'll give you the number under that roof.\"",
      "q": [
        {
          "q": "Why is a geodesic dome so strong for its weight?",
          "o": [
            {
              "t": "Its triangles share applied load across many members as tension and compression.",
              "v": "expert",
              "fb": "Triangulation spreads stress, so no single member is overworked."
            },
            {
              "t": "Its curved outer skin is thick enough to carry every load without any framing at all.",
              "v": "wrong",
              "fb": "The triangulated frame carries the load; the skin is comparatively light."
            },
            {
              "t": "Its great mass anchors it down, the way a stone dome resists by sheer weight.",
              "v": "wrong",
              "fb": "A geodesic dome is light; strength comes from geometry, not mass."
            },
            {
              "t": "A single central column holds it up, so the triangles are mostly decorative.",
              "v": "partial",
              "fb": "There is no central column; the triangulated shell itself does the work."
            }
          ]
        },
        {
          "q": "What makes a geodesic dome's load-sharing actually work?",
          "o": [
            {
              "t": "Every hub must transmit force between its struts for the stress to spread.",
              "v": "expert",
              "fb": "Silence one joint and the sharing that gives the dome its strength fails."
            },
            {
              "t": "The joints are irrelevant, since the struts pass load straight through the air.",
              "v": "wrong",
              "fb": "Force can only travel member to member through the hubs that join them."
            },
            {
              "t": "mainly the base ring carries load, so the upper connections are just for show.",
              "v": "partial",
              "fb": "All the hubs share load; the base ring is one part of a whole network."
            },
            {
              "t": "A storm's snow load is what welds the joints tight enough to work at all.",
              "v": "danger",
              "fb": "Joints must work under every load; snow is a demand, not a fix."
            }
          ]
        },
        {
          "q": "How does Fuller's dome guide this inquiry?",
          "o": [
            {
              "t": "A tough triangulated roof usually fails at a node, where a cheaper joint slips in.",
              "v": "expert",
              "fb": "The efficient design is most vulnerable exactly where members meet."
            },
            {
              "t": "Such a light shell can mainly fall if a hidden charge shatters it from within.",
              "v": "danger",
              "fb": "Triangulated roofs are strong; look to the connections before any blast."
            },
            {
              "t": "A dome is so robust that mainly a record storm could ever bring one down.",
              "v": "partial",
              "fb": "Robust roofs still fail at weak joints, well short of any record storm."
            },
            {
              "t": "The shape alone indicates safety, so the fittings rarely need to be checked at all.",
              "v": "wrong",
              "fb": "The shape only helps if every fitting is built as the design requires."
            }
          ]
        }
      ]
    },
    "st_candela": {
      "sci": "Félix Candela (1910-1997)",
      "topic": "Thin-shell concrete roofs",
      "lede": "The Spanish exile in Mexico who roofed whole halls with concrete no thicker than an eggshell, held up by nothing but its curve.",
      "no": 3,
      "profile": "Félix Candela was a Spanish architect and engineer who, exiled after the Spanish Civil War, built his career in Mexico and became the world's great master of thin concrete shells. His signature was the hyperbolic paraboloid — the 'hypar,' a saddle-shaped surface that is doubly curved yet made entirely of straight lines, which made it possible to form in timber and pour cheaply. His shells were astonishingly thin, sometimes only four centimetres, yet spanned huge, column-free rooms.\n\nCandela's most beloved work, the Los Manantiales restaurant at Xochimilco (1958), is a flower of eight intersecting hypars meeting in a rippling edge, a shell as graceful as it is efficient. He also built the Palacio de los Deportes for the 1968 Mexico City Olympics. His principle was 'membrane action': a properly curved shell carries load almost entirely as in-plane tension and compression, with almost no bending, which is why so little material can do so much.\n\nThat efficiency comes with a strict condition. Membrane action only holds if the shell keeps its exact geometry, its designed thickness, and its edge supports and ties — the stiffened beams and buttresses that catch the thrust at the boundaries. Thin the shell, weaken an edge tie, or let a support settle, and bending stresses the concrete was never meant to resist come rushing in.\n\nCandela leaves this case a lesson in fragile efficiency. A thin shell that comes down was not necessarily blown apart, and it was not simply crushed by a storm it should have shrugged off. Far more often a value was quietly trimmed — a thickness, a reinforcement, an edge connection — until the elegant membrane could no longer follow its own curve. The failure is in the numbers on the drawing, not in the sky.",
      "frame": "The clerk straightens a thick stack of shell drawings. \"Every one of these lives or dies on a number — a thickness, a tie. Show me you read them the way I do, and I'll find the sheet where a number got changed.\"",
      "q": [
        {
          "q": "What is 'membrane action' in a thin shell?",
          "o": [
            {
              "t": "The shell carries load as in-plane tension and compression, with almost no bending.",
              "v": "expert",
              "fb": "Curvature lets a thin shell avoid bending, so little material suffices."
            },
            {
              "t": "The concrete flexes freely like a drumhead, absorbing loads by bending deeply.",
              "v": "danger",
              "fb": "Bending is what a shell must avoid; its curve carries load in-plane instead."
            },
            {
              "t": "A waterproof rubber membrane on top does the structural work, not the concrete itself.",
              "v": "wrong",
              "fb": "Membrane action is a stress state in the concrete, not a coating."
            },
            {
              "t": "Hidden steel beams inside carry everything, so the shell shape is cosmetic.",
              "v": "partial",
              "fb": "The shell's geometry carries the load; edge beams only catch its thrust."
            }
          ]
        },
        {
          "q": "What must hold true for a hypar shell to work?",
          "o": [
            {
              "t": "Its exact geometry, designed thickness, and edge ties must all be as drawn.",
              "v": "expert",
              "fb": "Change any of those and bending stresses the shell can't resist appear."
            },
            {
              "t": "mainly its total weight matters, so thickness can be trimmed freely anywhere.",
              "v": "danger",
              "fb": "Thinning a shell invites the very bending it was shaped to avoid."
            },
            {
              "t": "The edges are free to move, since a shell needs no support at its boundary.",
              "v": "wrong",
              "fb": "Edge beams and ties catch the thrust; free edges would let it fail."
            },
            {
              "t": "The curve can be any shape at all, as long as the concrete is well reinforced.",
              "v": "partial",
              "fb": "The specific double curvature is what creates membrane action, not just steel."
            }
          ]
        },
        {
          "q": "How does Candela's work point this inquiry?",
          "o": [
            {
              "t": "A thin shell usually fails where a value — thickness or a tie — was quietly trimmed.",
              "v": "expert",
              "fb": "The failure lives in the changed number on the drawing, not in the weather."
            },
            {
              "t": "So little concrete can mainly fall if a bomb shatters the shell from beneath.",
              "v": "danger",
              "fb": "Thin shells fail at trimmed values long before any blast is needed."
            },
            {
              "t": "A shell this delicate suggests the fierce winter storm alone was too much for it.",
              "v": "partial",
              "fb": "A shell built to design sheds its design storm; suspect the trimmed value first."
            },
            {
              "t": "The drawings rarely really matter at all, since a shell's strength is in the pour crew.",
              "v": "wrong",
              "fb": "The drawings set thickness and ties; workmanship carries them out, not replaces them."
            }
          ]
        }
      ]
    },
    "st_leonhardt": {
      "sci": "Fritz Leonhardt (1909-1999)",
      "topic": "The cable-net stadium roof",
      "lede": "The German bridge master who turned Frei Otto's soap-film dreams into a real cable net over an Olympic crowd, one calculated clamp at a time.",
      "no": 4,
      "profile": "Fritz Leonhardt was one of the great German structural engineers of the twentieth century, renowned for elegant bridges, the slender Stuttgart television tower, and the advancement of prestressed concrete and cable-stayed design. With his firm Leonhardt und Andrä he brought hard analysis to structures that had lived mostly as intuition and physical models.\n\nHis firm engineered the sweeping cable-net roof of the 1972 Munich Olympic stadium, translating Frei Otto's soap-film forms into a buildable reality. A cable-net roof is a doubly curved surface woven from steel cables — one family sagging, one arching — pretensioned against each other so the whole net is stiff, then clad in panels. Making it real required some of the earliest large computer analyses of such structures, solving for the exact length and force in thousands of cables and, crucially, the clamps and cast nodes where they cross and anchor.\n\nLeonhardt's lesson is that the beauty of a cable net rests entirely on its details. The cables themselves rarely fail; the fittings do — the clamps, sockets, and cast connection nodes that hold the pretension and gather the forces at the edges and masts. Every one is a designed, calculated component, and every one is a place where a substitution can hide.\n\nLeonhardt would insist, in this case, on discipline. A cable roof over a stadium is a precisely balanced machine of tension; when it fails, the honest investigator does not jump to sabotage or wave it off as bad weather. He asks which fitting let go, and whether it was the fitting the calculations called for. The drama of the span distracts from the truth, which is usually a small, buildable connection that was never as strong as the numbers required.",
      "frame": "Renn crouches by a cast node, testing the bolts. \"A cable never lets you down — the fitting that grips it does. Prove you understand a cable net, and I'll flag which of these nodes I didn't recognise.\"",
      "q": [
        {
          "q": "What makes a cable-net roof stiff enough to hold its shape?",
          "o": [
            {
              "t": "Two families of cables, one sagging and one arching, pretensioned against each other.",
              "v": "expert",
              "fb": "Opposing prestress locks the net so it resists wind and load."
            },
            {
              "t": "The cladding panels are rigid and stiffly brace the cables, which are otherwise slack.",
              "v": "wrong",
              "fb": "The panels are carried by the net; the pretension gives the stiffness."
            },
            {
              "t": "The cables are so heavy that their own dead weight pulls the roof taut and firm.",
              "v": "wrong",
              "fb": "Cable nets are light; stiffness comes from pretension, not weight."
            },
            {
              "t": "A single main cable does the work, so the crossing cables are just infill.",
              "v": "partial",
              "fb": "It is the whole opposed net, not one cable, that provides the stiffness."
            }
          ]
        },
        {
          "q": "Where do cable-net roofs actually tend to fail?",
          "o": [
            {
              "t": "At the fittings — clamps, sockets, and cast nodes — not in the cables themselves.",
              "v": "expert",
              "fb": "The connections hold the pretension and are where substitutions hide."
            },
            {
              "t": "In the middle of the longest cable, which simply snaps under its own tension.",
              "v": "wrong",
              "fb": "Cables rarely fail mid-span; the fittings are the weak point."
            },
            {
              "t": "mainly when a blast severs the net, since nothing else can defeat steel cable.",
              "v": "danger",
              "fb": "A failed clamp or node needs no blast; ordinary load can expose it."
            },
            {
              "t": "Nowhere, because a pretensioned net is effectively immune to any failure.",
              "v": "partial",
              "fb": "The net is strong, but its fittings can and do fail if under-built."
            }
          ]
        },
        {
          "q": "What discipline does Leonhardt bring to reading a roof collapse?",
          "o": [
            {
              "t": "Ask which fitting let go, and whether it was the one the calculations required.",
              "v": "expert",
              "fb": "A substituted connection, not the sky, is the usual culprit."
            },
            {
              "t": "Assume sabotage first, since a cable roof is too strong to fail on its own.",
              "v": "danger",
              "fb": "Cable roofs fail at under-built fittings without any sabotage at all."
            },
            {
              "t": "Blame the storm, because a net this exposed does not survive real weather.",
              "v": "partial",
              "fb": "A net designed for its climate sheds that weather; suspect the fitting first."
            },
            {
              "t": "Ignore the connections and re-check mainly the masts holding the net up.",
              "v": "wrong",
              "fb": "The crossing and edge fittings matter as much as the masts here."
            }
          ]
        }
      ]
    },
    "st_geiger": {
      "sci": "David Geiger (1935-1989)",
      "topic": "The cable-dome & air-supported roof",
      "lede": "The American engineer who floated stadium roofs on nothing but air pressure, then learned the hard way what a snowfall can do to them.",
      "no": 5,
      "profile": "David Geiger was an American structural engineer who pioneered two of the lightest roof types ever built. First came the air-supported roof: a fabric membrane held up over a stadium by a slight internal air pressure, just a fraction above the outside, so the whole covering floats like a gentle balloon. His cable-restrained air roof over the U.S. Pavilion at Expo 70 in Osaka led to a family of stadium domes, including the Pontiac Silverdome.\n\nThose air roofs taught the industry a hard, specific lesson: snow. Because the membrane is so light, snow load is the dominant threat, and several air-supported roofs deflated or tore when snow accumulated faster than heat and pressure could clear it. Snow, in other words, is no act of God to these structures — it is the central design case, quantified in the codes and managed with melting systems, pressure control, and slope. Geiger's later invention, the tensegrity 'cable dome' — a rigid, self-anchoring net of cables and struts drawn from Fuller's ideas — was in part an answer to that vulnerability, roofing the Seoul Olympic arenas in 1988.\n\nGeiger's career is therefore a direct rebuke to the 'freak snow' excuse. Engineers know how much snow falls on a site in a fifty- or hundred-year event; they design the roof to carry it with margin. When snow brings a roof down, the real question is why the structure could not carry a load that was entirely foreseeable — a missing melt system, an under-strength member, or a connection quietly cheapened below the snow case it was meant to survive.\n\nAgainst the dismissal trap, Geiger arms you directly. Snow did not conspire; it arrived as expected. If a roof could not hold it, someone built less roof than the snow required.",
      "frame": "The steward stamps snow off her boots. \"Every winter they act shocked that it snows. We plan for snow — it's on the drawings. Talk snow load to me, and I'll spell out what that roof was really carrying.\"",
      "q": [
        {
          "q": "What holds up an air-supported stadium roof?",
          "o": [
            {
              "t": "A slight internal air pressure, just above outside, floating the light membrane.",
              "v": "expert",
              "fb": "The roof is inflated like a gentle balloon over the crowd."
            },
            {
              "t": "A dense, heavy grid of steel trusses, with the fabric merely a weather skin on top.",
              "v": "wrong",
              "fb": "There is no truss grid; air pressure alone supports the membrane."
            },
            {
              "t": "Tall perimeter columns that carry the fabric like a tent over the seats.",
              "v": "wrong",
              "fb": "Air roofs need no columns; pressure does the lifting."
            },
            {
              "t": "The fabric's own stiffness, which keeps it arched without any air at all.",
              "v": "partial",
              "fb": "The fabric is limp without the internal pressure that inflates it."
            }
          ]
        },
        {
          "q": "Why did air-supported roofs repeatedly fail under snow?",
          "o": [
            {
              "t": "Snow piled up faster than melting and pressure could clear such a light roof.",
              "v": "expert",
              "fb": "Snow load is the dominant, designed-for threat to these roofs."
            },
            {
              "t": "Because snow is an unforeseeable act of God that no design could anticipate.",
              "v": "danger",
              "fb": "Snow is quantified in the codes; it is the opposite of unforeseeable."
            },
            {
              "t": "Because hidden charges were set in the fabric during every heavy winter storm.",
              "v": "danger",
              "fb": "Snow failures are structural, not sabotage; the load was simply real."
            },
            {
              "t": "Because the membrane rots in cold, which snow merely happens to accompany.",
              "v": "partial",
              "fb": "The problem is snow's weight, not decay of the fabric in the cold."
            }
          ]
        },
        {
          "q": "What does Geiger's experience say about a 'freak snow' verdict?",
          "o": [
            {
              "t": "Snow is foreseeable and designed for, so a snow failure means too little roof.",
              "v": "expert",
              "fb": "If snow felled the roof, someone built below the snow case it needed."
            },
            {
              "t": "Snow is pure bad luck, so a buried roof needs no further explanation from anyone.",
              "v": "danger",
              "fb": "That is the dismissal trap; snow loads are planned, not luck."
            },
            {
              "t": "mainly a bomb, rarely snow, can bring a modern stadium roof down at all.",
              "v": "danger",
              "fb": "Snow genuinely can fell a roof — one that was under-built for it."
            },
            {
              "t": "Snow matters mainly to fabric roofs, so a steel roof can ignore it largely.",
              "v": "partial",
              "fb": "Every roof, steel or fabric, is designed to a real snow load."
            }
          ]
        }
      ]
    },
    "st_wachsmann": {
      "sci": "Konrad Wachsmann (1901-1980)",
      "topic": "Space-frame joints & prefabrication",
      "lede": "The architect who believed the whole future of building lived inside a single universal joint, and designed hangars that hung from it.",
      "no": 6,
      "profile": "Konrad Wachsmann was a German-American architect and one of the last century's great apostles of industrialized building. He believed architecture should be manufactured like machinery — precise, repeatable, assembled from standardized parts — and that the decisive element of any such system was not the beam or the panel but the joint. With Walter Gropius he developed the General Panel System, a prefabricated house built around a single wedge connector.\n\nHis most spectacular work was a series of enormous aircraft hangars designed for the U.S. Air Force in the 1950s: space frames spanning hundreds of feet and cantilevering dramatically, assembled from tubular members and a universal connecting joint of his own design. The 'Wachsmann joint' could gather many struts at any angle and clamp them together, letting the same components build structures of almost any size. He wrote 'The Turning Point of Building,' arguing that mastery of the joint was mastery of modern construction itself.\n\nWachsmann's obsession makes him a crucial witness here. He understood that in an industrialized, repetitive structure, the connection is where the design's intelligence — and its vulnerability — is concentrated. Thousands of identical joints mean that a single flawed detail, or a single unauthorized substitution in the connector's specification, is replicated everywhere or hidden anywhere. The tolerances, the grade, the fit: these are the design, and they live on the shop drawings.\n\nWachsmann points this case straight at the paperwork. A prefabricated roof is a promise written in connectors, and its failure is usually a broken promise at a joint — a fitting swapped for a cheaper one, a tolerance relaxed, a specification quietly amended. Not the thunderclap of a bomb, not the caprice of a storm, but a change order. The truth is in the difference between the joint that was drawn and the joint that was built.",
      "frame": "The clerk lays two connector specs side by side. \"Wachsmann said the joint is the whole building. So when a joint spec gets amended, that's not paperwork — that's the crime. Understand that, and the amendment is yours.\"",
      "q": [
        {
          "q": "What did Wachsmann see as the essence of modern building?",
          "o": [
            {
              "t": "The joint — the connector where standardized parts meet and forces gather.",
              "v": "expert",
              "fb": "For Wachsmann, mastering the joint was mastering construction itself."
            },
            {
              "t": "The facade, since a building is judged first by how its exterior looks.",
              "v": "wrong",
              "fb": "Wachsmann's focus was structural connection, not appearance."
            },
            {
              "t": "The foundation, because everything above it is merely repeated infill.",
              "v": "wrong",
              "fb": "He centered the joint, not the foundation, as the key element."
            },
            {
              "t": "The choice of material, with the connections following automatically from it.",
              "v": "partial",
              "fb": "Material matters, but he held the joint itself as the decisive detail."
            }
          ]
        },
        {
          "q": "Why does prefabrication make the connector detail so critical?",
          "o": [
            {
              "t": "Thousands of identical joints replicate one flaw — or one substitution — everywhere.",
              "v": "expert",
              "fb": "A single amended spec can hide in every joint of the roof."
            },
            {
              "t": "Prefabrication removes joints largely, so the connectors no longer matter; in use.",
              "v": "wrong",
              "fb": "Prefabrication multiplies joints; it does not remove them."
            },
            {
              "t": "mainly the very first joint installed matters, since the rest merely copy its behaviour.",
              "v": "partial",
              "fb": "Every repeated joint carries load; each must meet the spec."
            },
            {
              "t": "The joints matter mainly if a storm loads them all at once during a blizzard.",
              "v": "danger",
              "fb": "Repeated joints carry daily loads; snow is one case among many."
            }
          ]
        },
        {
          "q": "Where does Wachsmann tell this inquiry to look?",
          "o": [
            {
              "t": "At the shop drawings, for a connector spec quietly amended from what was drawn.",
              "v": "expert",
              "fb": "The gap between joint-as-drawn and joint-as-built is the truth here."
            },
            {
              "t": "At the blast pattern, since mainly an explosion could fail so many joints at once.",
              "v": "danger",
              "fb": "One amended spec fails many joints without any explosion."
            },
            {
              "t": "At the weather logs, because the storm alone would have overloaded every joint.",
              "v": "partial",
              "fb": "Joints built to spec survive their design storm; check the amendment first."
            },
            {
              "t": "At nothing on paper, since prefabricated joints are all identical and safe.",
              "v": "wrong",
              "fb": "Identical joints share any flaw; the paperwork is exactly where to look."
            }
          ]
        }
      ]
    },
    "st_prager": {
      "sci": "William Prager (1903-1980)",
      "topic": "Limit analysis & plastic collapse",
      "lede": "The mechanician who calculated the exact load at which a structure stops bending and starts falling — the number a cut corner quietly lowers.",
      "no": 7,
      "profile": "A German-American applied mathematician and engineer, William Prager helped build the modern theory of plasticity — how metals and structures behave once they are pushed past the point of springing back. Forced from Germany in the 1930s, he made his home in the United States and, at Brown University, became a founder of American applied mechanics, developing the tools engineers still use to predict how and when structures collapse.\n\nHis great contribution was limit analysis. A ductile steel structure does not fail the instant any single point is overstressed; the metal yields locally, forming what engineers call a plastic hinge, and the load redistributes to other parts. Only when enough hinges form to turn the structure into a moving mechanism does it actually collapse. Prager's limit theorems — the upper-bound and lower-bound methods — let an engineer calculate that true collapse load directly, bracketing the exact margin of safety between the working load and ruin.\n\nThe power of this idea is that a structure's real strength is a computable number, not a mystery. Every connection contributes to that collapse load; weaken a joint, and you lower the load at which the mechanism forms — often by more than intuition suggests, because a lattice or frame may have little to spare once one link goes plastic and cannot pass its share along.\n\nPrager answers both traps with cold arithmetic. A roof did not need a bomb to invent a failure, and it did not meet a storm beyond all reckoning. It met a load, and its true collapse capacity — lowered by a cheapened connection — was less than that load. The investigator's job is to reconstruct the real collapse load of the roof as built, compare it to the crowd-and-snow load it actually carried, and show the gap that a substitution opened.",
      "frame": "Renn spreads a load calc across the desk. \"There's an exact load where a roof quits pretending and just goes. Prager's math finds it. Follow it with me, and I'll name how thin they cut before it did.\"",
      "q": [
        {
          "q": "What is a plastic hinge in a steel structure?",
          "o": [
            {
              "t": "A point that has yielded and rotates, letting load redistribute to other members.",
              "v": "expert",
              "fb": "Hinges form as steel yields; enough of them make a collapse mechanism."
            },
            {
              "t": "A bolted joint deliberately left quite loose so that the structure can flex in the wind.",
              "v": "wrong",
              "fb": "A plastic hinge is yielded metal, not a designed loose joint."
            },
            {
              "t": "A crack from a single sudden overload that snaps the member on its first loading.",
              "v": "wrong",
              "fb": "A hinge is ductile yielding, not a brittle one-time fracture."
            },
            {
              "t": "The exact centre point of a beam, where all the bending is generally concentrated.",
              "v": "partial",
              "fb": "Hinges form where the moment is highest, not always mid-span."
            }
          ]
        },
        {
          "q": "What does Prager's limit analysis calculate?",
          "o": [
            {
              "t": "The true collapse load, bracketed between upper- and lower-bound methods.",
              "v": "expert",
              "fb": "It gives the real margin between working load and collapse."
            },
            {
              "t": "The exact price of the steel needed to build the cheapest possible structure.",
              "v": "wrong",
              "fb": "Limit analysis is about collapse load, not material cost."
            },
            {
              "t": "The weather the roof will face over a typical fifty-year design life.",
              "v": "wrong",
              "fb": "That is load estimation; limit analysis finds the strength side."
            },
            {
              "t": "mainly the stress at one point, which is all that decides when steel fails.",
              "v": "partial",
              "fb": "Limit analysis looks past first yield to the whole collapse mechanism."
            }
          ]
        },
        {
          "q": "How does limit analysis expose the truth of this collapse?",
          "o": [
            {
              "t": "Reconstruct the roof's real collapse load and show a cut joint made it too low.",
              "v": "expert",
              "fb": "Compare true capacity to the crowd-and-snow load actually carried."
            },
            {
              "t": "It suggests mainly a blast could exceed a certified roof's collapse load.",
              "v": "danger",
              "fb": "A cheapened joint lowers the collapse load without any blast."
            },
            {
              "t": "It shows the storm's load was simply beyond anything computable in advance.",
              "v": "partial",
              "fb": "Loads are computed in advance; the lowered capacity is the real story."
            },
            {
              "t": "It does not account for connections, so the joints play no part in collapse.",
              "v": "wrong",
              "fb": "Every connection contributes to the collapse load Prager's method finds."
            }
          ]
        }
      ]
    },
    "st_foppl": {
      "sci": "August Föppl (1854-1924)",
      "topic": "Space trusses & framework analysis",
      "lede": "The Munich professor who taught the world to read a truss as a web of pure pushes and pulls — and to trust every joint to play its part.",
      "no": 8,
      "profile": "August Föppl held the chair of technical mechanics at the Technical University of Munich; his textbooks trained a generation of engineers, and his work laid the groundwork for both structural analysis and, through his students, aerodynamics — Ludwig Prandtl among them. He advanced the theory of frameworks, including the analysis of three-dimensional space trusses, and gave engineers clear methods for finding the force in every member of a lattice.\n\nFöppl's framework theory rests on an elegant idealization. In a truss, if the members are connected at frictionless pin joints and loads are applied only at those joints, then every member carries pure axial force — nothing but tension or compression along its length, no bending. This simplification makes an intricate lattice solvable by hand and reveals exactly how load threads through the structure, member by member, to the supports. It is the mental model behind every roof truss and space frame.\n\nBut the idealization comes with obligations. The analysis is only valid if the real joints actually deliver what the model assumes — if each connection can carry the axial force computed for it. Föppl also studied statically determinate frameworks, which have no redundancy: remove or fail a single member or joint, and the whole framework can become a mechanism and collapse. There is no alternative path for the force to take.\n\nFöppl supplies the analytical backbone of this case. The forces in the failed roof's members can be calculated, and each traced to the joint that had to carry it. A truss does not fail from mystery or malice; it fails when one connection cannot deliver the axial force the framework assigned it. Solve the truss as Föppl taught, find the overloaded joint, and ask why it was built weaker than the force it was always going to see.",
      "frame": "The steward unrolls a truss diagram over the desk. \"Föppl's math tells you the force in every single bar. So I can tell you which joint was carrying too much. Follow the pushes and pulls with me, and I'll point to it.\"",
      "q": [
        {
          "q": "In Föppl's idealized truss, how do the members carry load?",
          "o": [
            {
              "t": "As pure axial force — tension or compression only — with no bending along them.",
              "v": "expert",
              "fb": "Pin joints and joint loads leave members in pure push or pull."
            },
            {
              "t": "Mostly by bending, like beams, with axial force a minor secondary effect.",
              "v": "wrong",
              "fb": "The truss idealization is the reverse: axial force, not bending."
            },
            {
              "t": "By twisting, since a space truss resists load chiefly through torsion.",
              "v": "wrong",
              "fb": "Truss members act in tension and compression, not torsion."
            },
            {
              "t": "By friction at the joints, which is what actually transmits the loads.",
              "v": "partial",
              "fb": "The joints transfer axial force; the idealization assumes them frictionless pins."
            }
          ]
        },
        {
          "q": "What does statical determinacy mean for a space truss?",
          "o": [
            {
              "t": "No redundancy — losing one member or joint can collapse the whole framework.",
              "v": "expert",
              "fb": "With no alternate path, one failed connection turns the truss to a mechanism."
            },
            {
              "t": "Extra spare members everywhere, so several can fail with no consequence.",
              "v": "wrong",
              "fb": "That is a redundant frame; a determinate one has no such spares."
            },
            {
              "t": "That the truss can mainly be solved by computer, rarely by hand at all.",
              "v": "wrong",
              "fb": "Determinate trusses are exactly the ones solvable by hand, as Föppl showed."
            },
            {
              "t": "That the joints are irrelevant once the members are correctly sized.",
              "v": "partial",
              "fb": "Determinacy makes each joint critical, since none can be spared."
            }
          ]
        },
        {
          "q": "How does Föppl's method find the truth of this failure?",
          "o": [
            {
              "t": "Solve the truss, find the overloaded joint, and ask why it was built too weak.",
              "v": "expert",
              "fb": "The force each joint had to carry is calculable and points to the cut one."
            },
            {
              "t": "It shows the forces are unknowable, so a bomb is the simplest explanation.",
              "v": "danger",
              "fb": "Truss forces are precisely calculable; no bomb is needed to explain failure."
            },
            {
              "t": "It suggests the storm overloaded every bar at once, beyond any design.",
              "v": "partial",
              "fb": "The members were sized for the load; one weak joint is the likelier cause."
            },
            {
              "t": "It confirms trusses are self-balancing, so no single joint can matter.",
              "v": "wrong",
              "fb": "In a determinate truss, every joint matters absolutely."
            }
          ]
        }
      ]
    },
    "st_helbing": {
      "sci": "Dirk Helbing (b. 1965)",
      "topic": "The social-force model of crowd flow",
      "lede": "The physicist who wrote crowds as equations, and proved that a deadly crush is not chaos but physics no one bothered to compute.",
      "no": 9,
      "profile": "Dirk Helbing is a German physicist and computational social scientist who brought the tools of physics to human crowds. In 1995, with Péter Molnár, he introduced the 'social force model,' which treats each pedestrian as a particle driven by measurable 'forces': a drive toward their goal, a repulsion from other people and walls, and attractions that pull them along. From these simple rules, realistic crowd behaviour emerges — lanes forming in opposing flows, clogging at doorways, the stop-and-go waves that ripple through a dense throng.\n\nHelbing's most sobering work analysed real crowd disasters. Studying video from the 2006 pilgrimage crush at Mina, he and colleagues identified 'crowd turbulence' — a state that appears above a critical density where the smooth flow breaks down and people are thrown about by pressure waves they cannot control or escape. Crucially, he showed these transitions are predictable: the density at which a crowd becomes dangerous can be computed, monitored, and designed against, and warning signs appear before disaster.\n\nHis message is that a crowd catastrophe is not an inexplicable act of collective madness or fate. It is a physical system obeying knowable laws, which competent planning models in advance. When it goes wrong, someone failed to compute or manage what was computable.\n\nHelbing sharpens the argument against the 'act of God' story. Just as a crush is foreseeable physics rather than random chaos, so is the load a dense crowd places on a structure. The people who packed that stand behaved exactly as a social-force model would predict — flowing in, concentrating, pressing down. Their density, and its weight, could have been foreseen and planned for. If it wasn't, that is a decision, not destiny — the same kind of decision that thins a joint to save money.",
      "frame": "The clerk opens a simulation printout beside the seating log. \"Helbing says a crowd is physics — you can predict where it piles up. Nothing about that night was fate. Grasp that, and I'll match the model to what was logged.\"",
      "q": [
        {
          "q": "What is the 'social force model' of crowds?",
          "o": [
            {
              "t": "It treats each person as a particle driven by goal, repulsion, and attraction forces.",
              "v": "expert",
              "fb": "Simple 'forces' per pedestrian reproduce real crowd behaviour."
            },
            {
              "t": "It assumes each crowd moves at random, so no clear pattern can ever be predicted.",
              "v": "danger",
              "fb": "The model shows crowds are patterned and predictable, not random."
            },
            {
              "t": "It counts mainly the total gate ticket sales to estimate how full a venue is.",
              "v": "wrong",
              "fb": "It models individual movement and interaction, not just ticket totals."
            },
            {
              "t": "It models crowds purely as a flowing fluid, ignoring the individuals largely.",
              "v": "partial",
              "fb": "Fluid-like behaviour emerges, but from modelled individuals, not by fiat."
            }
          ]
        },
        {
          "q": "What did Helbing find about deadly 'crowd turbulence'?",
          "o": [
            {
              "t": "Above a critical density, flow breaks down into uncontrollable pressure waves.",
              "v": "expert",
              "fb": "Turbulence emerges predictably past a computable density threshold."
            },
            {
              "t": "It strikes without warning, an act of pure fate no analysis could ever foresee.",
              "v": "danger",
              "fb": "Helbing showed warning signs and thresholds can be computed in advance."
            },
            {
              "t": "It happens mainly when a bomb or blast panics an otherwise calm crowd.",
              "v": "danger",
              "fb": "Turbulence arises from density itself, not from any explosion."
            },
            {
              "t": "It occurs mainly in open squares, rarely inside a seated stadium stand.",
              "v": "partial",
              "fb": "Dangerous density can arise wherever people concentrate, stands included."
            }
          ]
        },
        {
          "q": "How does Helbing undercut the 'act of God' verdict?",
          "o": [
            {
              "t": "A dense crowd's behaviour and weight are predictable physics, not fate.",
              "v": "expert",
              "fb": "What could be foreseen and managed was a decision, not destiny."
            },
            {
              "t": "He suggests crowd disasters are pure chance, so no one can be held responsible.",
              "v": "wrong",
              "fb": "His work assigns responsibility by showing the danger was foreseeable."
            },
            {
              "t": "He shows mainly weather is predictable, leaving the crowd load a mystery.",
              "v": "partial",
              "fb": "He made the crowd itself predictable; its load could be planned for too."
            },
            {
              "t": "He argues crowds are unknowable, so the storm would take the whole blame.",
              "v": "danger",
              "fb": "Helbing made crowds knowable; the load was foreseeable, like the snow."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "st_erector": {
      "st_roof": "Steelworker Bo Renn stands under the sagging trusses, running a gloved hand along a chord. \"I bolted every joint up here. One of them wasn't the joint on the drawing — show me you know a roof from a headline, and I'll name it.\"",
      "st_stand": "Renn paces the buckled edge of the stand, boot on a cracked bracket. \"The force from that roof had to land somewhere, and it landed here. Prove you can follow a load, and I'll walk you to where it went.\"",
      "st_office": "Renn looks uneasy among the developer's tidy models. \"Out there I bolt what these desks decide. Follow the math of how a roof really quits, and I'll name how thin they cut before it did.\""
    },
    "st_steward": {
      "st_roof": "The Head Steward tilts her head back at the failed cantilever, clipboard clutched tight. \"That roof hung right over my people, held by something behind it. Show me you follow how it balanced, and I'll say how full that stand really was.\"",
      "st_stand": "The steward stands amid the twisted seating, stamping snow from her boots. \"I packed this section, and it was packed past every posted count. Prove you can read a crowd as weight, and I'll give you the number.\"",
      "st_office": "The steward drops a stack of turnstile counts on the developer's desk. \"They'll blame the sky. I counted the bodies, and the sky isn't the whole of it. Show me you grasp the load, and I'll point at who ignored it.\""
    },
    "st_clerk": {
      "st_roof": "The Clerk picks his way through the wreckage with a roll of drawings under one arm. \"Every joint up here started as a number on my sheets. One of those numbers got changed. Show me you read drawings the way I do, and I'll find it.\"",
      "st_stand": "The Clerk perches on a bench in the ruined stand, a connector spec in each hand. \"The joint that held all this was drawn one way and built another. Prove you understand a connection, and I'll hand over the amendment.\"",
      "st_office": "The Clerk stands at the filing cabinets in the project office, one drawer half open. \"It's all in here — the drawing, the change, the signature. This is the room where it was decided. Trace for me the mechanics of what got cheapened, and I'll open the file.\""
    }
  },
  "story": [
    "The <b>Coronet Arena</b> was the proudest new building in the city — a sweeping roof over a sell-out crowd, unveiled to fireworks and photographers only months before. Then, in the middle of a packed winter fixture, a span of that roof folded down onto a full stand, and the cheering became something else. You are <b>Investigator Priya Lund</b>, and the inquiry has dropped on your desk the one file the whole city is watching and the developer would rather you never finished.",
    "<b>Three people inside can help you</b> — the steel, the crowd, and the paperwork, one witness apiece, and no two of them have compared notes. <b>Steelworker Bo Renn</b> bolted the roof steel and watched an engineered joint swapped for something cheaper. <b>The Head Steward</b> packed the stands and knows a section was loaded far past its posted count. And <b>the Clerk</b> guards the drawings — and the change that thinned a joint. Each will open up, but only to an investigator who can show they grasp what he or she witnessed.",
    "<b>One of them is responsible.</b> Three names wait on your list: <b>Vaughn Kroll</b>, the arena developer who held the budget; the <b>structural engineer of record</b>, whose seal sits on the design; and the <b>building-control inspector</b>, who signed the work off. Each column you have to fill — <b>who</b> caused it, <b>where</b> the decision was made, and <b>what</b> actually brought the roof down — carries a wrong answer built to tempt you. The cameras crave a <b>bomb in the rafters</b>. The lazy verdict reaches for a <b>freak snow load, an act of God</b>. What really happened is smaller than the headline and worse than the shrug — and someone has already tried to make the page that proves it disappear.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and decide the <b>WHAT</b> from the evidence."
  ],
  "endings": {
    "overclaimWhat": "st_bomb",
    "dismissalWhat": "st_snow",
    "win": {
      "expertTitle": "What the Drawings Prove, and No More",
      "expert": [
        "Lund names it exactly: Vaughn Kroll, the arena developer, who owned the budget and drove the value-engineering; the truth culminating in the Developer's Project Office, where the change order that thinned the joint was signed; and a value-engineered connection that could not carry the crowd-and-snow load it was always going to see. No bomb, no act of God.",
        "Every card on the table. Lund walked the roof, the stand, and the office, made witnesses of a steelworker, a steward, and a records clerk, and asserted only what the calculations and the paper trail could stand behind. Its findings strip the cheapened detail out of every arena built like it — the whole reason for getting the work right."
      ],
      "soundTitle": "Right — but Lightly Proven",
      "sound": [
        "Lund names the right three — Kroll, the Project Office, and the cheapened connection under a load that was always foreseeable. The outline of the case holds up, and declining to shout sabotage or blame the storm is precisely the right instinct.",
        "But she left a good many loose ends, and the developer's lawyers live for those. Another few days spent chasing the change order and rebuilding the actual collapse load would have put the finding beyond challenge. Honest and largely sound — just short of watertight."
      ],
      "namedTitle": "The Right Answer, Unearned",
      "named": [
        "Lund names the truth — Kroll, the Project Office, the value-engineered joint — but collected too little to stand it up. It looks like a guess that got lucky.",
        "The inquiry will not condemn a developer or reopen a building code on evidence this slight, correct or not. Knowing the answer counts for nothing if you cannot demonstrate it to those determined to overturn the finding."
      ]
    },
    "overclaim": {
      "title": "The Inquiry That Cried Bomb",
      "body": [
        "Lund reports a bomb in the rafters — precisely the story the cameras had been running since the first hour. It makes for gripping television, and it is flatly contradicted by the wreckage.",
        "There was no blast residue, no scorching, no trace of any explosion in the debris — only a connection quietly downgraded below the crowd-and-snow load it bore on an ordinary packed winter night. Once the bomb claim falls apart, it drags the inquiry's standing down with it, and the genuine, documented failure gets brushed aside as a crank's conspiracy theory. The lone saboteur here was a change order that banked savings by spending the roof's safety margin."
      ]
    },
    "dismissal": {
      "title": "Case Closed on the Weather",
      "body": [
        "Lund files it as a freak snow load — an act of God, nobody could have seen it coming, case closed. That is half the story, and it skips the worse half.",
        "The snow was real, but it was the load the codes exist to cover, and the stand was packed far past its posted count on top of it — both entirely foreseeable. The roof came down because a connection had been thinned below the margin meant to carry exactly that combined load. Blaming the sky leaves the cheapened detail in every other structure built the same way, waiting for the next full house and the next storm."
      ]
    },
    "wrongNames": {
      "title": "So Close",
      "body": [
        "Lund has the essence of it dead right — a value-engineered connection that could never carry a foreseeable crowd-and-snow load: no hidden bomb, no freak storm. Yet the accusation settles on the wrong person, or points at the wrong place."
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A stadium roof truss with a failed connection\"><path d=\"M42 96 C166 34,302 30,430 66 C500 84,564 94,626 96\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.8\"/><path d=\"M82 92 L142 54 L202 88 L264 42 L326 76 L388 54 L448 78\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.4\"/><circle cx=\"326\" cy=\"76\" r=\"9\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"2\"/><path d=\"M318 68 L334 84 M334 68 L318 84\" stroke=\"#B3261E\" stroke-width=\"2\"/><path d=\"M64 110 H602\" stroke=\"#e2e2d8\" stroke-width=\"1\"/></svg>"
}};
