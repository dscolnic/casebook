module.exports = { PACK: {
  "id": "m_tunnel",
  "title": "The Kingsgate Bore",
  "discipline": "Tunnelling & Ground Engineering",
  "teaser": "A metro tunnel under the city caved in and swallowed the street above. A gas explosion underground? A freak sinkhole in old ground? Or monitoring that was switched off?",
  "overclaimTag": "a gas explosion",
  "truthTag": "cut grouting and ignored settlement gauges",
  "venue": "the Kingsgate tunnel inquiry",
  "agent": {
    "name": "Inspector Mabel Crane",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Tunnelling & Ground Pioneers",
  "dossierName": "TUNNELLING & GROUND-ENGINEERING PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Kingsgate tunnel inquiry",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before the inquiry closes. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The place you test determines the dossier you receive, and the conversation costs one day.",
  "overclaimTease": "A gas explosion in the bore is persuasive at first glance; the measurements and sequence must decide whether it survives.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "tn_contractor",
      "items": [
        {
          "id": "tn_contractor",
          "label": "Emil Radek — tunnelling contractor"
        },
        {
          "id": "tn_engineer",
          "label": "The tunnel design engineer"
        },
        {
          "id": "tn_inspector",
          "label": "The transit-authority inspector"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "tn_office",
      "items": [
        {
          "id": "tn_face",
          "label": "The Tunnel Face & TBM"
        },
        {
          "id": "tn_surface",
          "label": "The Surface & Settlement Markers"
        },
        {
          "id": "tn_office",
          "label": "The Contractor's Site Office"
        }
      ]
    },
    "what": {
      "title": "What is happening",
      "truth": "tn_settlement",
      "items": [
        {
          "id": "tn_explosion",
          "label": "A gas explosion in the bore"
        },
        {
          "id": "tn_sinkhole",
          "label": "A freak natural sinkhole — an act of God"
        },
        {
          "id": "tn_settlement",
          "label": "Cut grouting and ignored ground-settlement monitoring"
        }
      ]
    }
  },
  "PLACES": {
    "tn_face": {
      "name": "The Tunnel Face & TBM",
      "xy": [
        140,
        90
      ]
    },
    "tn_surface": {
      "name": "The Surface & Settlement Markers",
      "xy": [
        330,
        240
      ]
    },
    "tn_office": {
      "name": "The Contractor's Site Office",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "tn_face",
      "tn_surface"
    ],
    [
      "tn_surface",
      "tn_office"
    ]
  ],
  "CHARACTERS": {
    "tn_miner": {
      "name": "Miner Jud Kolb",
      "role": "Tunnel-face miner",
      "face": "⛏",
      "badge": "J",
      "legend": "the tunnel face",
      "hint": "Works the shield; watched the grout runs cut short to keep the machine moving."
    },
    "tn_surveyor": {
      "name": "The Monitoring Surveyor",
      "role": "Ground-settlement surveyor",
      "face": "📐",
      "badge": "S",
      "legend": "the surface",
      "hint": "Reads the surface markers; the settlement gauges were climbing for days."
    },
    "tn_clerk": {
      "name": "The Clerk",
      "role": "Site records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the office",
      "hint": "Keeps the logs — and the memo that halved the grouting to hold the schedule."
    }
  },
  "TOPICMAP": {
    "tn_face": {
      "tn_miner": [
        "tn_marcbrunel"
      ],
      "tn_surveyor": [
        "tn_greathead"
      ],
      "tn_clerk": [
        "tn_rabcewicz"
      ]
    },
    "tn_surface": {
      "tn_miner": [
        "tn_stini"
      ],
      "tn_surveyor": [
        "tn_muirwood"
      ],
      "tn_clerk": [
        "tn_berigny"
      ]
    },
    "tn_office": {
      "tn_miner": [
        "tn_barton"
      ],
      "tn_surveyor": [
        "tn_kerisel"
      ],
      "tn_clerk": [
        "tn_hoek"
      ]
    }
  },
  "TOPICS": {
    "tn_marcbrunel": {
      "sci": "Marc Isambard Brunel (1769-1849)",
      "topic": "The tunnelling shield",
      "lede": "The émigré engineer who watched a shipworm chew through oak and copied its armored head to drive the first tunnel under a river.",
      "no": 1,
      "profile": "Marc Isambard Brunel was a French-born engineer who, after fleeing the Revolution and building a career in Britain, solved one of the oldest problems in civil engineering: how to dig through soft, waterlogged ground without the roof collapsing on the miners. His inspiration was biological. Watching the shipworm Teredo navalis bore through ship timber, its soft body shielded by hard plates at the head while it lined the hole behind it, he patented in 1818 a tunnelling shield that did the same for men.\n\nBrunel's shield was a great iron frame divided into cells, one miner to each, that held back the earth at the face while workers removed a board's width of soil at a time. As the shield inched forward on screws, bricklayers followed immediately behind, building the permanent lining before the ground could move. With it he drove the Thames Tunnel between Rotherhithe and Wapping from 1825 to 1843 — the first tunnel successfully built beneath a navigable river — through gravel, quicksand, and repeated floods that nearly killed his son Isambard Kingdom Brunel.\n\nFor this board, Brunel is the origin of one unbreakable principle: in soft ground the tunnel is a race between excavation and support, and support must never fall behind. His shield exists because unsupported soft ground does not stay up — it flows, it settles, it seeks the surface. So when a street collapses over a modern bore, Brunel's ghost asks the plainest question first: was the ground held as fast as it was opened? A gas blast is loud and a sinkhole sounds like fate, but the older, quieter answer is that the support fell behind the dig.",
      "frame": "Kolb rests a hand on the shield ram. \"This machine only earns its keep if the lining goes in as fast as we cut. Tell me you know why the shield was ever built, and I'll tell you what we skipped.\"",
      "q": [
        {
          "q": "What problem did Brunel's shield solve?",
          "o": [
            {
              "t": "Holding soft, wet ground at the face until the lining went in behind.",
              "v": "expert",
              "fb": "The shield's whole point was supporting the face while the lining was built."
            },
            {
              "t": "Sniffing out pockets of explosive gas well before miners ever reached them.",
              "v": "danger",
              "fb": "The shield handled ground collapse, not gas; that is a different hazard."
            },
            {
              "t": "Cutting through hard rock far faster than hand tools and black powder could.",
              "v": "wrong",
              "fb": "The shield was for soft, flowing ground, not for hard-rock excavation."
            },
            {
              "t": "Pumping the water out so the tunnel could be dug substantially dry throughout.",
              "v": "partial",
              "fb": "Water was a constant enemy, but the shield's job was holding the ground."
            }
          ]
        },
        {
          "q": "How did Brunel copy the shipworm?",
          "o": [
            {
              "t": "A hard front shielded the diggers while lining was placed in the bored hole.",
              "v": "expert",
              "fb": "Armored head, immediate lining behind — exactly the worm's method."
            },
            {
              "t": "A drill bit shaped like the worm's jaws chewed the clay into fine paste.",
              "v": "wrong",
              "fb": "He copied the worm's protection and lining, not a jaw-shaped bit."
            },
            {
              "t": "A chemical the worm secretes was reproduced to soften rock ahead of the face.",
              "v": "wrong",
              "fb": "There was no chemical; the idea was mechanical shielding and lining."
            },
            {
              "t": "The worm's speed was matched so the tunnel advanced many feet each day.",
              "v": "partial",
              "fb": "Progress was slow; the borrowed idea was armor and lining, not speed."
            }
          ]
        },
        {
          "q": "What does Brunel's principle tell this inquiry?",
          "o": [
            {
              "t": "In soft ground, support must keep pace with the dig or the surface pays.",
              "v": "expert",
              "fb": "Support falling behind the excavation is the classic soft-ground failure."
            },
            {
              "t": "A collapse over a bore is nearly generally a buried gas main going off.",
              "v": "danger",
              "fb": "Gas is the loud guess; unsupported ground is the older, likelier cause."
            },
            {
              "t": "Soft ground stands on its own for weeks, so support timing hardly matters.",
              "v": "wrong",
              "fb": "Soft ground does not stand alone; that is precisely why the shield exists."
            },
            {
              "t": "Once the shield passes, the ground behind it is safe and needs no more work.",
              "v": "partial",
              "fb": "The lining and its grouting behind the shield are what keep it safe."
            }
          ]
        }
      ]
    },
    "tn_greathead": {
      "sci": "James Henry Greathead (1844-1896)",
      "topic": "The shield & compressed-air tunnelling",
      "lede": "The South-African-born engineer who fused shield, compressed air, and cement grout into the recipe that dug London's deep tube — and named the void that grout must fill.",
      "no": 2,
      "profile": "James Henry Greathead was a civil engineer, born in South Africa and trained in Britain, who took the tunnelling shield from a clever prototype to a mature system. Having worked with Peter Barlow on the Tower Subway in 1869, he went on to build the City & South London Railway, opened in 1890 — the world's first deep-level electric underground railway — using a refined circular shield that became the template for the whole London 'tube.'\n\nGreathead's genius was combination. He drove his shield through wet ground and used compressed air to hold back water where the ground was worst, balancing the air pressure against the water trying to seep in. Most important for this case, he perfected grouting: as the shield advanced, cement grout was pumped under pressure into the annular gap left between the excavated bore and the iron lining behind the shield's tail. This filled the void, locked the lining against the surrounding soil, and stopped the ground from relaxing inward. The tool he used, the grout injector, is still called a Greathead grout pan.\n\nFor this board, Greathead is the direct ancestor of the very thing at issue. He understood that every metre of shield tunnelling opens a ring-shaped void, and that this void must be grouted promptly and fully or the soil above will settle into it. Grouting is not decoration; it is structural, and it is precisely where a contractor under schedule pressure can quietly economise. When settlement climbs and a street drops, Greathead's method tells the investigator to check the grout: was the annulus filled as the design required, or was the pump run short?",
      "frame": "The surveyor unrolls a section drawing. \"Greathead taught us the gap behind the ring has to be filled, every time. Prove you understand the grout, and I'll show you what my gauges have been screaming.\"",
      "q": [
        {
          "q": "What did Greathead pump into the gap behind the lining?",
          "o": [
            {
              "t": "Cement grout under pressure, filling the void so the ground could not relax in.",
              "v": "expert",
              "fb": "Grouting the annulus is the structural step that stops ground movement."
            },
            {
              "t": "Inert gas, to purge any firedamp that might collect behind the iron rings.",
              "v": "danger",
              "fb": "He pumped grout to fill a void; gas purging was never the purpose."
            },
            {
              "t": "Loose sand, shovelled in dry to let the tunnel breathe and drain freely.",
              "v": "wrong",
              "fb": "Dry sand would not lock the lining; pressurised cement grout did."
            },
            {
              "t": "Nothing — the iron ring was simply left snug against the bare soil.",
              "v": "partial",
              "fb": "Leaving the gap unfilled is exactly the failure grouting prevents."
            }
          ]
        },
        {
          "q": "Why did Greathead use compressed air?",
          "o": [
            {
              "t": "To hold back groundwater at the face by balancing the pressure trying to seep in.",
              "v": "expert",
              "fb": "Compressed air counters water pressure so the face stays workable."
            },
            {
              "t": "To blow suspected explosive gas out of the bore ahead of the advancing shield.",
              "v": "danger",
              "fb": "Its job was resisting water, not clearing gas from the tunnel."
            },
            {
              "t": "To power the shield's jacks, since no other source of force was available then.",
              "v": "wrong",
              "fb": "Jacks were driven hydraulically; the air held back water at the face."
            },
            {
              "t": "To cool the miners working in the deep, hot ground beneath the river.",
              "v": "partial",
              "fb": "Comfort was incidental; the air's real job was resisting groundwater."
            }
          ]
        },
        {
          "q": "What does Greathead's grouting mean for this collapse?",
          "o": [
            {
              "t": "An unfilled or shortchanged annulus lets the ground settle and reach the street.",
              "v": "expert",
              "fb": "Skimped grouting behind the lining is a direct route to surface collapse."
            },
            {
              "t": "Grout is a finish coat, so skipping it could rarely bring down a road above.",
              "v": "danger",
              "fb": "Grout is structural; skimping it is a leading cause of settlement."
            },
            {
              "t": "Modern rings seal themselves, so grouting is an old habit safely dropped now.",
              "v": "wrong",
              "fb": "Segmental rings still require prompt annulus grouting to control settlement."
            },
            {
              "t": "Grout mainly speeds the work; leaving it out simply makes the tunnel slower.",
              "v": "partial",
              "fb": "Grout controls ground movement, not schedule; omitting it is dangerous."
            }
          ]
        }
      ]
    },
    "tn_rabcewicz": {
      "sci": "Ladislaus von Rabcewicz (1893-1975)",
      "topic": "The New Austrian Tunnelling Method",
      "lede": "The Austrian engineer who stopped fighting the ground and let it carry its own weight — but only if you measured its every move.",
      "no": 3,
      "profile": "Ladislaus von Rabcewicz was an Austrian civil engineer who, drawing on decades of Alpine tunnelling, formalised in the 1960s what he named the New Austrian Tunnelling Method, or NATM. His central idea overturned an old assumption. Earlier practice treated the ground as a dead load to be held up by a heavy, rigid lining. Rabcewicz argued that the surrounding rock or soil is itself a structural element: if you support it just enough, and let it deform a controlled amount, the ground arches around the opening and carries most of the load itself.\n\nThe method uses a thin, flexible initial support — sprayed concrete (shotcrete) and rock bolts — applied quickly, then permits measured deformation before a final lining goes in. What makes it work, and what makes it dangerous when abused, is monitoring. NATM demands continuous measurement of how the tunnel converges: extensometers, load cells, and survey targets track every millimetre of movement, and the support is adjusted in response. The ground is allowed to move, but only within limits the instruments confirm.\n\nFor this board, Rabcewicz is the case's beating heart. NATM is safe precisely because it is instrumented; the deformation readings are not paperwork but the early-warning system. If convergence accelerates, the ground is telling you it is about to fail, and there is usually time to act. A method that relies on monitoring collapses catastrophically if the monitoring is ignored — the gauges climb, the warning is there, and no one reads it. When a bore caves in, Rabcewicz would not ask about gas or fate; he would ask what the instruments showed in the days before, and who chose not to look.",
      "frame": "The clerk slides a monitoring log across the desk. \"NATM lives or dies by the readings. Show me you understand why we watch the ground move, and I'll show you the days these numbers were left unread.\"",
      "q": [
        {
          "q": "What is the core idea of NATM?",
          "o": [
            {
              "t": "Let the ground carry its own load by supporting it just enough to arch around the bore.",
              "v": "expert",
              "fb": "Mobilising the ground's own strength is the essence of the method."
            },
            {
              "t": "Seal the bore airtight so no explosive gas can ever collect against the lining.",
              "v": "danger",
              "fb": "NATM is about mobilising ground strength, not gas sealing."
            },
            {
              "t": "Encase the tunnel in the heaviest possible rigid lining to resist all movement.",
              "v": "wrong",
              "fb": "That is the old approach NATM replaced; it allows controlled movement."
            },
            {
              "t": "Freeze the surrounding soil so it becomes solid and needs no support at all.",
              "v": "partial",
              "fb": "Ground freezing is a different technique; NATM uses shotcrete and bolts."
            }
          ]
        },
        {
          "q": "Why is monitoring essential to NATM?",
          "o": [
            {
              "t": "Convergence readings warn when the ground is failing, giving time to add support.",
              "v": "expert",
              "fb": "The instruments are the early-warning system the method depends on."
            },
            {
              "t": "Readings are logged mainly to bill the client for each metre of progress.",
              "v": "wrong",
              "fb": "Monitoring governs safety and support, not payment for progress."
            },
            {
              "t": "Gauges are used once at handover to certify the finished tunnel is sound.",
              "v": "wrong",
              "fb": "Monitoring is continuous during driving, not a single final check."
            },
            {
              "t": "They confirm the shotcrete's colour has cured to the right shade before lining.",
              "v": "partial",
              "fb": "Curing is checked otherwise; monitoring tracks ground deformation."
            }
          ]
        },
        {
          "q": "What happens if NATM monitoring is ignored?",
          "o": [
            {
              "t": "The warning of accelerating movement is missed, and the ground can fail suddenly.",
              "v": "expert",
              "fb": "Unread gauges turn a controllable method into a collapse waiting to happen."
            },
            {
              "t": "Nothing — the method is robust and works fine whether or not you read the gauges.",
              "v": "danger",
              "fb": "Ignoring the readings removes the very safeguard NATM is built on."
            },
            {
              "t": "The tunnel simply finishes a little later, with no effect on its safety at all.",
              "v": "wrong",
              "fb": "The risk is collapse, not delay; monitoring is a safety function."
            },
            {
              "t": "mainly the final lining is affected; the driving stage carries no added risk.",
              "v": "partial",
              "fb": "The driving stage is exactly when unread convergence is most deadly."
            }
          ]
        }
      ]
    },
    "tn_stini": {
      "sci": "Josef Stini (1880-1958)",
      "topic": "Engineering geology for tunnels",
      "lede": "The Vienna professor who married geology to construction and taught engineers that the ground writes its own warning long before the first shovel.",
      "no": 4,
      "profile": "Josef Stini was an Austrian geologist, a professor at the Technical University of Vienna, widely regarded as a founder of engineering geology — the discipline that brings systematic geological knowledge to bear on building. In 1929 he founded the journal 'Geologie und Bauwesen' (Geology and Construction), and he wrote extensively on landslides, springs, rockfalls, and the behaviour of ground during tunnelling, insisting that geology was not academic decoration but the first and most decisive input to any large civil project.\n\nStini's message was that ground conditions can and must be investigated before construction begins: map the strata, find the faults and water-bearing zones, understand the springs and the slopes. He studied how water moves through rock and soil and how it destabilises slopes and excavations, and he catalogued the ways ground gives warning — seepage, small movements, changes in the water table — before it fails outright. To Stini, most 'unforeseen' ground disasters were foreseeable; they had simply not been investigated or heeded.\n\nFor this board, Stini is the answer to the dismissal trap. A 'freak sinkhole,' an 'act of God' — these are the phrases used when nobody wants to admit the ground was readable. Stini would insist that a modern metro bore is preceded by boreholes and geological surveys, that the strata and the water were known quantities, and that if the ground gave way, it likely gave warning first. The sinkhole story survives only where the investigation stops early. His discipline pushes the inquiry to ask what the ground had already told anyone who cared to read it.",
      "frame": "Kolb kicks at the broken kerb. \"Folk up here call it an act of God. Stini would've called it laziness. Show me you know that ground can be read, and I'll tell you what the surveys said.\"",
      "q": [
        {
          "q": "What did Stini establish about ground conditions?",
          "o": [
            {
              "t": "They can be investigated and largely foreseen before any construction starts.",
              "v": "expert",
              "fb": "Pre-construction geology turns 'surprises' into known, mappable conditions."
            },
            {
              "t": "They are ruled by chance, so no survey can predict how the ground behaves.",
              "v": "danger",
              "fb": "That is the act-of-God view Stini spent his career refuting."
            },
            {
              "t": "They matter mainly for dams, rarely for tunnels driven through soft ground.",
              "v": "wrong",
              "fb": "Stini applied engineering geology across all civil works, tunnels included."
            },
            {
              "t": "They can be judged well enough by eye once digging is already underway.",
              "v": "partial",
              "fb": "He insisted on investigation before the work, not after it begins."
            }
          ]
        },
        {
          "q": "What role did water play in Stini's work?",
          "o": [
            {
              "t": "A prime destabiliser of slopes and excavations, and a key thing to map early.",
              "v": "expert",
              "fb": "Groundwater movement was central to how Stini read ground stability."
            },
            {
              "t": "A source of the explosive vapour that he believed caused most ground failures.",
              "v": "danger",
              "fb": "Water destabilises ground mechanically; it is not an explosive agent here."
            },
            {
              "t": "A minor concern, since dry rock and wet rock behave in the same way.",
              "v": "wrong",
              "fb": "Water dramatically changes ground behaviour; Stini stressed exactly that."
            },
            {
              "t": "Useful mainly for supplying the site, not for judging the ground's stability.",
              "v": "partial",
              "fb": "For Stini, water was foremost a stability hazard to be mapped and watched."
            }
          ]
        },
        {
          "q": "How does Stini undercut the 'freak sinkhole' story?",
          "o": [
            {
              "t": "Boreholes and surveys usually make the strata and water known in advance.",
              "v": "expert",
              "fb": "A properly investigated site rarely holds a truly unforeseeable void."
            },
            {
              "t": "He suggests sinkholes strike at random, so no one could ever be at fault.",
              "v": "danger",
              "fb": "He argued the reverse — most such failures were foreseeable."
            },
            {
              "t": "He shows geology is too complex to survey, so guessing is unavoidable.",
              "v": "wrong",
              "fb": "Stini made geology surveyable and practical, not hopeless."
            },
            {
              "t": "He says mainly the tunnel face matters, not the ground above the crown.",
              "v": "partial",
              "fb": "He read the whole ground column, surface and strata alike."
            }
          ]
        }
      ]
    },
    "tn_muirwood": {
      "sci": "Alan Muir Wood (1921-2009)",
      "topic": "Soft-ground tunnelling",
      "lede": "The Channel Tunnel's chief engineer, who insisted a soft-ground bore and the earth around it are one coupled system, and neither can be trusted without watching the other.",
      "no": 5,
      "profile": "Alan Muir Wood was a British civil engineer and one of the foremost tunnelling authorities of the twentieth century. He rose through the firm Halcrow, served as the first president of the International Tunnelling Association in 1974, and was the chief tunnel-design engineer for the Channel Tunnel between Britain and France. His career spanned soft-ground metro tunnels, undersea bores, and the theory that ties them together.\n\nMuir Wood's central teaching was that in soft ground a tunnel lining and the surrounding earth form a single interacting system. The ground is not merely a dead weight resting on the lining; it is a structural material that carries much of its own load, provided it is supported before it loosens. He developed influential methods for analysing how a flexible ring and the deforming soil share the burden. Support too late or too little, and the balance is lost: the soil relaxes, closes on the bore, and the movement travels upward to the surface.\n\nHe was also a champion of the observational method, the practice of designing on a best estimate of ground behaviour but instrumenting the works and adjusting as real measurements come in. To Muir Wood, monitoring was not an optional extra; it was the mechanism by which a soft-ground tunnel is kept safe while it is being built.\n\nFor this board, Muir Wood frames the whole failure. A soft-ground collapse is a breakdown of the ground-lining balance, usually because the annular void was not filled or the ground's movement was not watched and acted upon. Against 'a gas blast' or 'an act of God,' he sets a sober engineering picture: the earth and the tunnel were a coupled system, and someone let one half of it go unwatched.",
      "frame": "The surveyor spreads a settlement plot across the table. \"Muir Wood taught that the ground and the lining are one system: read one, you read the other. Show me you grasp that, and I'll show you which half of it nobody was watching.\"",
      "q": [
        {
          "q": "What did Muir Wood say about soft ground and the lining?",
          "o": [
            {
              "t": "They form one system in which the ground itself carries much of the load.",
              "v": "expert",
              "fb": "Ground supported in time acts as structure, sharing the load with the ring."
            },
            {
              "t": "The lining seals the bore airtight, so mainly trapped gas can ever threaten it.",
              "v": "danger",
              "fb": "The lining is not an airtight seal; the real issue is ground-load sharing."
            },
            {
              "t": "The ground is a pure dead weight that the lining alone would hold up largely.",
              "v": "wrong",
              "fb": "Muir Wood's point was the reverse: supported ground carries much of itself."
            },
            {
              "t": "The lining matters mainly once the tunnel is finished and carrying its traffic.",
              "v": "partial",
              "fb": "The ring resists ground load from the moment it is built, not just in service."
            }
          ]
        },
        {
          "q": "What was Muir Wood's observational method?",
          "o": [
            {
              "t": "Design on best estimates, then instrument the works and adjust to the readings.",
              "v": "expert",
              "fb": "Measure as you build and respond; monitoring is the safeguard, not paperwork."
            },
            {
              "t": "Assume the ground is unknowable and simply trust the lining to hold by luck.",
              "v": "danger",
              "fb": "That is the fatalism he rejected; the ground is measured and acted upon."
            },
            {
              "t": "Fix the whole design in advance and rarely revisit it once the digging starts.",
              "v": "wrong",
              "fb": "The method is adaptive by nature, revised as field readings arrive."
            },
            {
              "t": "Measure the finished tunnel mainly once at handover to certify it as complete.",
              "v": "partial",
              "fb": "Monitoring runs continuously through construction, not as a single check."
            }
          ]
        },
        {
          "q": "How does Muir Wood explain this collapse?",
          "o": [
            {
              "t": "A lost ground-lining balance: an unfilled void or unwatched movement above.",
              "v": "expert",
              "fb": "Break the coupled system and the soil closes in and the surface follows."
            },
            {
              "t": "A sudden gas ignition, the one force able to break a properly designed ring.",
              "v": "danger",
              "fb": "A designed ring fails from lost ground support, not from a blast, as a rule."
            },
            {
              "t": "A random act of God that no design or monitoring could possibly have foreseen.",
              "v": "wrong",
              "fb": "His whole method exists to foresee and manage such movement in advance."
            },
            {
              "t": "Ordinary wear of the lining, which slowly lets any tunnel settle over the years.",
              "v": "partial",
              "fb": "This was construction-stage ground movement, not slow long-term wear."
            }
          ]
        }
      ]
    },
    "tn_berigny": {
      "sci": "Charles Bérigny (grouting pioneer)",
      "topic": "Pressure grouting of ground",
      "lede": "The French engineer who, in 1802, first pumped a slurry into scoured ground beneath a harbour sluice, and in doing so invented the art of filling the earth's hidden voids.",
      "no": 6,
      "profile": "Charles Bérigny was a French engineer credited with inventing the technique of grouting — the injection of a fluid mixture, or grout, into the ground to fill voids and bind loose material. Around 1802, tasked with repairing a masonry sluice at the port of Dieppe whose foundations had been scoured and undermined by water, he devised a way to pump a clay-and-lime slurry down into the cavities beneath the structure, filling them and restoring support. From that harbour repair grew one of the most important tools in all of ground engineering.\n\nThe principle Bérigny established is deceptively simple: where the ground has voids, loose seams, or gaps that cannot be dug out and rebuilt, they can be filled in place by injecting grout under pressure until the ground refuses to take more. Over the following two centuries the method matured into permeation grouting, compaction grouting, and the annulus grouting that every shield and boring machine relies on to lock its lining against the surrounding soil.\n\nCrucially, grouting is a measured operation. The volume of grout the ground accepts — the 'grout take' — is recorded and compared with the calculated void it should fill. Too little grout pumped means the void is not full, and the ground behind the lining is left free to move. The paperwork of grouting is therefore also its proof.\n\nFor this board, Bérigny is the origin of the very act at issue. Filling the void is not optional finishing work; it is the structural step that stops the ground settling into an opening. When grouting is cut short to save time or cost, the record shows it, in litres pumped against litres required. Against a story of gas or fate, Bérigny points the inquiry straight at the grout log.",
      "frame": "The clerk lays a grout register on the desk, columns of litres. \"Bérigny's whole art was filling the voids you cannot dig out, and proving you filled them. Show me you understand grouting, and I'll show you where the litres pumped fall short of the litres owed.\"",
      "q": [
        {
          "q": "What did Bérigny invent?",
          "o": [
            {
              "t": "Grouting: pumping a slurry into the ground to fill voids and restore support.",
              "v": "expert",
              "fb": "Injecting grout to fill cavities in place is the technique he originated."
            },
            {
              "t": "A charge that collapsed hidden voids by blasting the loose ground solid again.",
              "v": "danger",
              "fb": "Grouting fills voids by injection; it has nothing to do with blasting."
            },
            {
              "t": "A pump that drained the water from foundations so the cavities could be dug out.",
              "v": "wrong",
              "fb": "His idea was to fill voids in place, not to drain and excavate them."
            },
            {
              "t": "A mortar spread across masonry faces to seal surface cracks from the outside.",
              "v": "partial",
              "fb": "Surface pointing is different; Bérigny injected grout deep into the ground."
            }
          ]
        },
        {
          "q": "How is grouting shown to have been done properly?",
          "o": [
            {
              "t": "By comparing the grout take pumped against the void it was calculated to fill.",
              "v": "expert",
              "fb": "Litres pumped versus litres required is the direct proof the void is full."
            },
            {
              "t": "By checking that no explosive gas is left trapped within the treated ground; in use.",
              "v": "danger",
              "fb": "Grouting is verified by volume, not by any test for trapped gas."
            },
            {
              "t": "By its colour once cured, which reveals whether the mix was strong enough.",
              "v": "wrong",
              "fb": "Colour tells little; the record of grout take against the void is the check."
            },
            {
              "t": "By how fast the pump ran, since quicker work means a better-filled cavity.",
              "v": "partial",
              "fb": "Speed proves nothing; only the recorded volume shows the void was filled."
            }
          ]
        },
        {
          "q": "What does Bérigny's method mean for this collapse?",
          "o": [
            {
              "t": "A void left half-filled lets the ground settle; the grout log records the gap.",
              "v": "expert",
              "fb": "Short grout take is a written trail straight to lost support and settlement."
            },
            {
              "t": "Grout is a finish coat, so skimping it could rarely bring a street down at all.",
              "v": "danger",
              "fb": "Grout is structural; a starved annulus is a leading cause of surface collapse."
            },
            {
              "t": "Grouting is obsolete now, so its records can tell an inquiry nothing of value.",
              "v": "wrong",
              "fb": "Annulus grouting is standard on every drive, and its log is prime evidence."
            },
            {
              "t": "Grout mainly speeds the drive, so cutting it merely made the tunnel run slower.",
              "v": "partial",
              "fb": "Grout controls ground movement, not schedule; cutting it invites collapse."
            }
          ]
        }
      ]
    },
    "tn_barton": {
      "sci": "Nick Barton (rock-mechanics researcher)",
      "topic": "The Q-system for rock tunnels",
      "lede": "The engineer who turned a tunnel's rock into a single number between 0.001 and 1000, and read off from it exactly how much support that ground demands.",
      "no": 7,
      "profile": "Nick Barton is a British rock-mechanics engineer who, working at the Norwegian Geotechnical Institute with Reidar Lien and Johan Lunde, published in 1974 the Q-system, or Rock Tunnelling Quality Index — one of the two great classification schemes for designing tunnel support. Its aim was practical: to take the messy variability of a rock mass and reduce it to a single index that tells an engineer how much support a given stretch of tunnel needs.\n\nThe Q-value is built from six factors, combined as a formula. It starts with the rock quality designation (RQD), divides by the number of joint sets, multiplies by joint roughness over joint alteration to capture how well the blocks interlock and how slick their surfaces are, and finally accounts for water inflow and the stress condition. The result can range across six orders of magnitude, from crushed, wet, squeezing ground to massive, dry, sound rock. Barton tied Q directly to support: the poorer the rock, the more shotcrete and the closer the rock bolts the design must provide.\n\nThe system's power is that support is not guessed; it is prescribed from measured ground conditions and updated as the face reveals what it is really made of. Ground that classifies as poor gets heavy support by rule, not by argument.\n\nFor this board, Barton stands for the principle that the ground dictates the support, in writing, before the work is done. There is a specified level of support for the conditions encountered. A collapse in classified ground is not fate; it raises the question of whether the support and treatment the classification called for were actually installed, or quietly reduced below what the numbers demanded.",
      "frame": "Kolb jabs a finger at a support drawing pinned to the office wall. \"The rock gets a number, and the number says how much steel and shotcrete it's owed. Show me you know how that's reckoned, and I'll tell you where we put in less than the number called for.\"",
      "q": [
        {
          "q": "What does the Q-system do?",
          "o": [
            {
              "t": "Rates a rock mass as one index and prescribes the support that ground needs.",
              "v": "expert",
              "fb": "Q turns measured ground conditions into a required level of support."
            },
            {
              "t": "Detects the explosive gas a rock mass holds so the bore can be ventilated; in use.",
              "v": "danger",
              "fb": "The Q-system classifies ground for support, not gas content of any kind."
            },
            {
              "t": "Measures how fast a boring machine can cut through a given kind of rock.",
              "v": "wrong",
              "fb": "It rates support needs, not the cutting rate of a machine."
            },
            {
              "t": "Estimates the price of a tunnel from the hardness of the rock being cut.",
              "v": "partial",
              "fb": "Cost follows from it, but Q's purpose is prescribing ground support."
            }
          ]
        },
        {
          "q": "What goes into the Q-value?",
          "o": [
            {
              "t": "Rock quality, joint sets, roughness, alteration, water, and the stress state.",
              "v": "expert",
              "fb": "Those six factors combine to capture how the whole rock mass will behave."
            },
            {
              "t": "The gas pressure in the rock, which alone decides how the tunnel is supported.",
              "v": "danger",
              "fb": "Gas is no part of Q; it weighs joints, water, and stress, not gas pressure."
            },
            {
              "t": "mainly the crushing strength of an intact core taken from the tunnel face.",
              "v": "wrong",
              "fb": "Intact strength is minor; Q is dominated by the joints and their condition."
            },
            {
              "t": "Mainly the colour and grain of the rock, judged by eye at the working face.",
              "v": "partial",
              "fb": "Appearance helps logging, but Q is built from measured, defined parameters."
            }
          ]
        },
        {
          "q": "What does the Q-system imply for this inquiry?",
          "o": [
            {
              "t": "Support is prescribed from the ground; ask if the numbers' support was built.",
              "v": "expert",
              "fb": "Classified ground has a required support; the question is whether it was met."
            },
            {
              "t": "A collapse in rated rock suggests gas, as classified ground does not fail on its own.",
              "v": "danger",
              "fb": "Classified ground fails when its prescribed support is skimped, not from gas."
            },
            {
              "t": "Classification is guesswork, so no specified support could be checked against it.",
              "v": "wrong",
              "fb": "Q is defined and repeatable, and the support it sets can be audited."
            },
            {
              "t": "The class fixes mainly the price, so it says nothing about how the tunnel was built.",
              "v": "partial",
              "fb": "The class fixes the required support, which is exactly what can be checked."
            }
          ]
        }
      ]
    },
    "tn_kerisel": {
      "sci": "Jean Kérisel (1908-2005)",
      "topic": "Earth pressure & deep foundations",
      "lede": "The French engineer whose tables let any designer read off the exact push of the earth against a wall, and who spent a lifetime proving the ground keeps precise accounts.",
      "no": 8,
      "profile": "Jean Kérisel was a French civil engineer, a leading figure in twentieth-century soil mechanics and, in the early 1960s, president of the International Society for Soil Mechanics and Foundation Engineering. He is best remembered by engineers for the Caquot-Kérisel tables, produced with his mentor Albert Caquot, which give the coefficients of earth pressure — the numbers that tell a designer how hard soil pushes against a retaining wall, a tunnel lining, or a deep foundation.\n\nKérisel's field was earth pressure and deep foundations. Soil at rest presses sideways on anything that retains it; let a wall yield slightly and the pressure drops to an 'active' state, push a wall into the soil and it rises to a much larger 'passive' resistance. These are not vague tendencies but calculable forces that depend on the soil's friction, its weight, and any water within it. His tables made those forces routine to compute, so that walls, piles, and linings could be designed to resist exactly what the ground would deliver.\n\nHe was also a historian of his craft, studying the foundations of ancient monuments and writing on how the earth behaves, and misbehaves, beneath human works. His lesson throughout was that the ground obeys mechanics, and that its pressures, though hidden, are knowable.\n\nFor this board, Kérisel insists that the loads on a tunnel are not mysterious. The earth presses on the lining with a force a designer can calculate, and the lining and its grouted surround must carry it. Remove the grout, leave a void, and the earth pressure has somewhere to go: it drives the soil inward and upward toward the surface. A collapse is the earth collecting a debt that was always on the books, not a bolt from the blue.",
      "frame": "The surveyor slides a table of earth-pressure figures across the desk. \"Kérisel showed the ground's push is a number you can look up, not a mystery. Show me you understand earth pressure, and I'll show you the load the lining was quietly left to face alone.\"",
      "q": [
        {
          "q": "What do the Caquot-Kérisel tables give?",
          "o": [
            {
              "t": "Coefficients for how hard soil pushes against a wall, lining, or foundation.",
              "v": "expert",
              "fb": "They turn the earth's hidden push into numbers a designer can rely on."
            },
            {
              "t": "The volume of gas a soil gives off as it is unloaded during excavation; in use.",
              "v": "danger",
              "fb": "The tables are about earth pressure, not any gas released from the ground."
            },
            {
              "t": "The depth at which a wall becomes cheaper to build than a bored tunnel.",
              "v": "wrong",
              "fb": "They give pressure coefficients, not a comparison of construction costs."
            },
            {
              "t": "The colour chart used to name a soil quickly from a small hand sample.",
              "v": "partial",
              "fb": "Soil is described separately; the tables quantify the pressure it exerts."
            }
          ]
        },
        {
          "q": "How do active and passive earth pressure differ?",
          "o": [
            {
              "t": "Active is the reduced push as a wall yields; passive the resistance it meets.",
              "v": "expert",
              "fb": "Yielding lowers pressure to active; pushing into soil raises it to passive."
            },
            {
              "t": "Active soil is inert, while passive soil is the kind that can suddenly ignite.",
              "v": "danger",
              "fb": "Neither is about ignition; both are states of the soil's mechanical pressure."
            },
            {
              "t": "They are two names for the one steady force soil generally exerts on a wall.",
              "v": "wrong",
              "fb": "They are distinct states set by which way the wall moves against the soil."
            },
            {
              "t": "Active pressure acts on tunnels and passive mainly on the buildings above.",
              "v": "partial",
              "fb": "Both states are defined by wall movement, not by tunnel versus building."
            }
          ]
        },
        {
          "q": "What does earth pressure mean for this collapse?",
          "o": [
            {
              "t": "The earth's push is calculable; strip the grout and it drives the ground inward.",
              "v": "expert",
              "fb": "An unsupported void gives the known earth pressure a path to the surface."
            },
            {
              "t": "Earth pressure is trivial, so a caved street would be the mark of an explosion; in use.",
              "v": "danger",
              "fb": "Earth pressure is large and relentless; it caves unsupported ground on its own."
            },
            {
              "t": "Earth pressure is unknowable, so the load on the lining could not be foreseen.",
              "v": "wrong",
              "fb": "Kérisel's tables make that load routine to calculate in advance."
            },
            {
              "t": "Earth pressure loads walls mainly; a tunnel lining feels no push from the soil.",
              "v": "partial",
              "fb": "A tunnel lining resists the surrounding earth pressure all around its ring."
            }
          ]
        }
      ]
    },
    "tn_hoek": {
      "sci": "Evert Hoek (1933-2024)",
      "topic": "Rock-mass strength & the Hoek-Brown criterion",
      "lede": "The rock engineer who gave the world a formula for the strength of broken ground, and taught that a jointed mass is only a fraction as strong as the stone it is made of.",
      "no": 9,
      "profile": "Evert Hoek was a rock engineer, born in what was then Southern Rhodesia and long based in Canada, whose work let engineers estimate something notoriously hard to pin down: the strength of a real, jointed rock mass. With E. T. Brown he published in 1980 the Hoek-Brown failure criterion, an empirical relationship that predicts the strength of fractured rock from the strength of the intact material and the degree to which the mass is broken up.\n\nHoek's insight was that intact rock tested in a laboratory can be enormously strong, yet the mass it forms in the ground — cut through by joints, bedding, and faults — is far weaker, sometimes by an order of magnitude. To capture this, he and his collaborators developed the Geological Strength Index, a rating of how blocky and how weathered the rock mass is, which feeds the criterion. Together they let a designer estimate the strength the ground will actually offer around an opening, and therefore the support it will need to stay stable.\n\nThe criterion became one of the most widely used tools in tunnel and slope engineering precisely because it made rock-mass strength a calculable quantity rather than a guess, and Hoek went on refining it over decades of consulting on major projects.\n\nFor this board, Hoek supplies the other half of the ledger. Kérisel measures the load the ground imposes; Hoek measures the strength available to resist it. A collapse is a failure of that balance — demand exceeding capacity — and both sides are estimable in advance. If the ground gave way, its strength was known to be limited, the support was designed to make up the difference, and the real question is whether that support and treatment were delivered. Not fate, not a blast: a shortfall between a knowable load and a knowable resistance.",
      "frame": "The clerk sets a strength calculation atop the file. \"Hoek let us reckon how strong broken ground really is, and it's weaker than the stone it's cut from. Show me you grasp rock-mass strength, and I'll show you where the support meant to make up the difference never arrived.\"",
      "q": [
        {
          "q": "What does the Hoek-Brown criterion estimate?",
          "o": [
            {
              "t": "The strength of a jointed rock mass, from intact strength and its fracturing.",
              "v": "expert",
              "fb": "It predicts how strong the real, broken ground around an opening will be."
            },
            {
              "t": "The pressure of explosive gas a fractured rock mass can build up underground.",
              "v": "danger",
              "fb": "It estimates mechanical strength, not any gas pressure within the rock."
            },
            {
              "t": "The exact speed at which a tunnel machine will bore through a rock mass.",
              "v": "wrong",
              "fb": "It concerns strength and stability, not the cutting rate of a machine."
            },
            {
              "t": "The strength of a single intact rock sample tested alone in a laboratory.",
              "v": "partial",
              "fb": "Intact strength is only an input; the criterion gives the whole mass's strength."
            }
          ]
        },
        {
          "q": "Why is a jointed rock mass weaker than intact rock?",
          "o": [
            {
              "t": "Joints, bedding, and faults let blocks move, cutting the mass's strength sharply.",
              "v": "expert",
              "fb": "Discontinuities, not the stone between them, govern how the mass fails."
            },
            {
              "t": "Because the joints fill with gas that weakens the rock until it finally detonates.",
              "v": "danger",
              "fb": "Strength is lost to the joints themselves, not to any gas within them."
            },
            {
              "t": "Because broken rock is generally a softer stone than the same rock when it is solid.",
              "v": "wrong",
              "fb": "It is the same stone; the joints, not a change of material, cut its strength."
            },
            {
              "t": "Because water alone dissolves the rock, and dry masses lose no strength at all.",
              "v": "partial",
              "fb": "Water can worsen it, but jointing reduces strength even in dry ground."
            }
          ]
        },
        {
          "q": "What balance does Hoek reveal for this collapse?",
          "o": [
            {
              "t": "Demand against capacity, both knowable; support must cover the shortfall.",
              "v": "expert",
              "fb": "Load and strength are each estimable, and support bridges the gap between them."
            },
            {
              "t": "That broken rock explodes under load, so the collapse was a blast, not settling.",
              "v": "danger",
              "fb": "Rock does not detonate; it fails when demand outruns its supported strength."
            },
            {
              "t": "That rock strength does not be estimated, so the failure was truly unforeseeable.",
              "v": "wrong",
              "fb": "Hoek's whole contribution was making rock-mass strength estimable in advance."
            },
            {
              "t": "That mainly intact strength counts, so the jointing of the mass can be ignored.",
              "v": "partial",
              "fb": "Jointing is decisive; ignoring it badly overstates the ground's real strength."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "tn_miner": {
      "tn_face": "",
      "tn_surface": "",
      "tn_office": ""
    },
    "tn_surveyor": {
      "tn_face": "",
      "tn_surface": "",
      "tn_office": ""
    },
    "tn_clerk": {
      "tn_face": "",
      "tn_surface": "",
      "tn_office": ""
    }
  },
  "story": [
    "<b>The Kingsgate Bore</b> opens inside the Kingsgate tunnel inquiry, where the visible evidence supports more than one plausible account.",
    "<b>Miner Jud Kolb</b>, <b>The Monitoring Surveyor</b>, and <b>The Clerk</b> each control a different part of the record.",
    "The inquiry is pulled between <b>A gas explosion in the bore</b> and <b>A freak natural sinkhole — an act of God</b>, while the readings test what each explanation can actually support.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and decide the <b>WHAT</b> from the evidence."
  ],
  "endings": {
    "overclaimWhat": "tn_explosion",
    "dismissalWhat": "tn_sinkhole",
    "win": {
      "expertTitle": "",
      "expert": [
        "",
        ""
      ],
      "soundTitle": "",
      "sound": [
        "",
        ""
      ],
      "namedTitle": "",
      "named": [
        "",
        ""
      ]
    },
    "overclaim": {
      "title": "",
      "body": [
        "",
        ""
      ]
    },
    "dismissal": {
      "title": "",
      "body": [
        "",
        ""
      ]
    },
    "wrongNames": {
      "title": "",
      "body": [
        ""
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A tunnel beneath a settling street\"><path d=\"M34 42 C160 34,272 48,394 40 S550 34,626 44\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.6\"/><path d=\"M200 112 A92 92 0 0 1 384 112\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.7\"/><path d=\"M220 112 A72 72 0 0 1 364 112\" fill=\"none\" stroke=\"#e2e2d8\" stroke-width=\"1\"/><path d=\"M284 24 V52\" stroke=\"#B3261E\" stroke-width=\"2\"/><path d=\"M268 38 L300 38\" stroke=\"#B3261E\" stroke-width=\"2\"/><path d=\"M430 30 L430 84 M470 30 L470 76 M510 30 L510 66\" stroke=\"#326891\" stroke-width=\"1.5\" stroke-dasharray=\"4 4\"/></svg>"
}};
