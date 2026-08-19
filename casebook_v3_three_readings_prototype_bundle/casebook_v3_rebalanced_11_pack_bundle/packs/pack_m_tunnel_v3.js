// Casebook V3 — three informants, three readings, one clue per correct answer.
module.exports = { PACK: {
  "schemaVersion": 3,
  "mode": "three_informants_three_readings",
  "id": "m_tunnel",
  "title": "The Kingsgate Bore",
  "discipline": "Tunnelling & Ground Engineering",
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
  "DAYS_TOTAL": 3,
  "teaser": "A metro tunnel collapses and pulls the street into the excavation. Did gas burst through the crown, did a natural void fail on its own, or did construction-linked ground movement grow visibly while support and intervention lagged?",
  "overclaimTag": "a gas ignition inside the tunnel",
  "truthTag": "a construction-aligned settlement trough allowed to grow",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A soft-ground tunnel beneath a settling street with a void above the lining\"><path d=\"M20 46 H640\" stroke=\"#121212\" stroke-width=\"3\"/><path d=\"M60 46 q80 40 160 0 t160 0 t160 0\" fill=\"none\" stroke=\"#e2e2d8\" stroke-width=\"2\"/><path d=\"M180 110 a70 70 0 0 1 140 0\" fill=\"none\" stroke=\"#121212\" stroke-width=\"5\"/><path d=\"M205 110 a45 45 0 0 1 90 0\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2\"/><path d=\"M250 44 l-15 24 16 6 -10 30 34-40 -16-7 12-23z\" fill=\"#B3261E\"/></svg>",
  "overclaimTease": "Compare the shape and timing recorded at the face, the street, and the project files. An explosion, a natural void, and construction-linked ground loss do not move the same way.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "tn_contractor",
      "items": [
        {
          "id": "tn_engineer",
          "label": "The tunnel design engineer"
        },
        {
          "id": "tn_inspector",
          "label": "The transit-authority inspector"
        },
        {
          "id": "tn_contractor",
          "label": "Emil Radek — tunnelling contractor"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "tn_surface",
      "items": [
        {
          "id": "tn_surface",
          "label": "The Surface Settlement Network"
        },
        {
          "id": "tn_face",
          "label": "The Tunnel Face & Shield"
        },
        {
          "id": "tn_office",
          "label": "The Contractor’s Site Office"
        }
      ]
    },
    "what": {
      "title": "What happened",
      "truth": "tn_settlement",
      "items": [
        {
          "id": "tn_explosion",
          "label": "A gas ignition and pressure burst shattered the tunnel crown"
        },
        {
          "id": "tn_settlement",
          "label": "Ground loss grew as grouting and monitoring fell behind"
        },
        {
          "id": "tn_sinkhole",
          "label": "A natural void collapsed independently of construction"
        }
      ]
    }
  },
  "READING_ORDER": [
    "tn_miner",
    "tn_surveyor",
    "tn_clerk"
  ],
  "CHARACTERS": {
    "tn_miner": {
      "name": "Miner Jud Kolb",
      "role": "Tunnel-face miner",
      "face": "⛏️",
      "badge": "J",
      "legend": "the shield",
      "hint": "Short grout runs left annular void behind the shield as production targets tightened.",
      "reading": "tn_marcbrunel"
    },
    "tn_surveyor": {
      "name": "The Monitoring Surveyor",
      "role": "Ground-settlement surveyor",
      "face": "📐",
      "badge": "S",
      "legend": "the street network",
      "hint": "Street markers formed a widening trough that tracked the tunnel advance for days.",
      "reading": "tn_greathead"
    },
    "tn_clerk": {
      "name": "The Site Records Clerk",
      "role": "Construction records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the contractor office",
      "hint": "One contractor directive cut grout, raised intervention limits, and ordered work to continue through the measured movement.",
      "reading": "tn_rabcewicz"
    }
  },
  "TOPICS": {
    "tn_marcbrunel": {
      "sci": "Marc Isambard Brunel (1769-1849)",
      "topic": "The tunnelling shield",
      "lede": "The émigré engineer who watched a shipworm chew through oak and copied its armored head to drive the first tunnel under a river.",
      "no": 1,
      "profile": "Marc Isambard Brunel was a French-born engineer who, after fleeing the Revolution and building a career in Britain, solved one of the oldest problems in civil engineering: how to dig through soft, waterlogged ground without the roof collapsing on the miners. His inspiration was biological. Watching the shipworm Teredo navalis bore through ship timber, its soft body shielded by hard plates at the head while it lined the hole behind it, he patented in 1818 a tunnelling shield that did the same for men.\n\nBrunel's shield was a great iron frame divided into cells, one miner to each, that held back the earth at the face while workers removed a board's width of soil at a time. As the shield inched forward on screws, bricklayers followed immediately behind, building the permanent lining before the ground could move. With it he drove the Thames Tunnel between Rotherhithe and Wapping from 1825 to 1843 — the first tunnel successfully built beneath a navigable river — through gravel, quicksand, and repeated floods that nearly killed his son Isambard Kingdom Brunel.\n\nAt Kingsgate, Brunel’s principle appears in the gap behind a modern shield. The machine advanced, but tail-void grouting repeatedly stopped short of the specified quantity. Soft ground then had space to migrate toward the lining and surface. The contractor’s production directive explains why support lagged, yet the event culminates in the settlement network: the surface profile records the consequence metre by metre and ties it to the shield’s passage. The geometry preserves that sequence clearly.",
      "frame": "Points from the shield tail to the fresh lining and the annular gap between them. “Soft ground takes every space you leave. Tell me why support must follow the excavation.”",
      "q": [
        {
          "q": "What problem did Brunel’s tunnelling shield solve?",
          "o": [
            {
              "t": "It detected explosive gas before workers entered a new section.",
              "v": "partial",
              "fb": "Gas safety matters, but the shield was invented to support unstable ground during excavation."
            },
            {
              "t": "It drilled hard rock faster by concentrating impact at one cutter.",
              "v": "wrong",
              "fb": "Brunel’s shield addressed soft, waterlogged ground rather than hard-rock boring."
            },
            {
              "t": "It supported soft wet ground at the face while permanent lining followed.",
              "v": "expert",
              "fb": "The shield protected miners and controlled the ground until masonry could hold the opening."
            },
            {
              "t": "It allowed the ground to collapse freely and then filled the crater afterward.",
              "v": "danger",
              "fb": "Controlled support prevents ground loss; accepting collapse would endanger the tunnel and surface."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — lead",
            "text": "Shortened tail-void grouting left room for soft ground to migrate toward the lining and surface."
          }
        },
        {
          "q": "What did Brunel borrow from the shipworm?",
          "o": [
            {
              "t": "A chemical secretion that dissolves soil ahead of the cutting face.",
              "v": "wrong",
              "fb": "The inspiration concerned physical shielding and lining, not chemical excavation."
            },
            {
              "t": "The ability to sense methane pockets before the cutting head reached them.",
              "v": "partial",
              "fb": "Shipworms did not provide the gas-detection principle."
            },
            {
              "t": "A method for moving fast enough that clay could not settle behind the shield.",
              "v": "danger",
              "fb": "Speed without support can increase ground loss rather than prevent it."
            },
            {
              "t": "An armored head that advances while the opening is lined immediately behind.",
              "v": "expert",
              "fb": "The biological model combined protected excavation with prompt support of the new hole."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — lead",
            "text": "Face crews recorded shortened grout runs, but the quantity reduction came from the contractor controlling production targets."
          }
        },
        {
          "q": "Where is the effect of support lag most clearly reconstructed over time?",
          "o": [
            {
              "t": "At the shield controls showing the machine’s daily production rate.",
              "v": "partial",
              "fb": "Production rate supplies context but does not measure surface movement."
            },
            {
              "t": "Across the surface markers that deepen behind the advancing shield.",
              "v": "expert",
              "fb": "The settlement network records the moving ground response before failure."
            },
            {
              "t": "Inside the site office where the reduced grout instruction was signed.",
              "v": "wrong",
              "fb": "The office identifies decisions rather than the physical culmination."
            },
            {
              "t": "In one photograph of the street after the final collapse occurred.",
              "v": "danger",
              "fb": "A final image cannot recover the earlier time-dependent trough."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — lead",
            "text": "The first coherent signal is a shallow settlement trough centered over the tunnel alignment behind the shield."
          }
        }
      ]
    },
    "tn_greathead": {
      "sci": "James Henry Greathead (1844-1896)",
      "topic": "The shield & compressed-air tunnelling",
      "lede": "The South-African-born engineer who fused shield, compressed air, and cement grout into the recipe that dug London's deep tube — and named the void that grout must fill.",
      "no": 2,
      "profile": "James Henry Greathead was a civil engineer, born in South Africa and trained in Britain, who took the tunnelling shield from a clever prototype to a mature system. Having worked with Peter Barlow on the Tower Subway in 1869, he went on to build the City & South London Railway, opened in 1890 — the world's first deep-level electric underground railway — using a refined circular shield that became the template for the whole London 'tube.'\n\nGreathead's genius was combination. He drove his shield through wet ground and used compressed air to hold back water where the ground was worst, balancing the air pressure against the water trying to seep in. Most important for this case, he perfected grouting: as the shield advanced, cement grout was pumped under pressure into the annular gap left between the excavated bore and the iron lining behind the shield's tail. This filled the void, locked the lining against the surrounding soil, and stopped the ground from relaxing inward. The tool he used, the grout injector, is still called a Greathead grout pan.\n\nGreathead’s immediate lining and grouting were designed to prevent exactly the volume loss measured at Kingsgate. Survey points formed a broad, construction-aligned trough behind the shield rather than ejecta from an explosion or a localized collapse over an unrelated cavity. Because the trough deepened before the final cave-in, the surface network is not merely aftermath. It is the primary time series showing that the ground-loss mechanism was active, detectable, and still accelerating. It is a moving construction signature.",
      "frame": "Overlays settlement contours on the tunnel alignment and circles the widening trough behind the shield. “Ground loss draws a shape at the surface. Read it before calling the hole natural.”",
      "q": [
        {
          "q": "What combination made Greathead’s shield tunnelling effective in soft ground?",
          "o": [
            {
              "t": "A cylindrical shield, compressed air, segmental lining, and grout behind it.",
              "v": "expert",
              "fb": "The system controlled the face, built support, and filled the gap around the completed lining."
            },
            {
              "t": "Open excavation from the surface followed by rebuilding the street.",
              "v": "wrong",
              "fb": "Greathead’s method enabled deep tunnelling without a continuous open trench."
            },
            {
              "t": "Explosive charges fired ahead of the shield to loosen wet clay.",
              "v": "danger",
              "fb": "Blasting is not the defining soft-ground method and would increase disturbance."
            },
            {
              "t": "A shield alone, with the surrounding ground left to close around the lining.",
              "v": "partial",
              "fb": "The annular void must be managed; grout is essential to limiting movement."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — corroboration",
            "text": "The movement geometry follows construction and lacks the radial damage expected from a pressure burst."
          }
        },
        {
          "q": "Why is grout injected behind segmental tunnel lining?",
          "o": [
            {
              "t": "To increase gas pressure so the face remains easier to excavate.",
              "v": "wrong",
              "fb": "Grout supports the ground; it is not a gas-pressure control medium."
            },
            {
              "t": "To conceal cracks in lining segments from later inspectors.",
              "v": "danger",
              "fb": "Proper grouting is a structural and ground-control operation, not a cosmetic cover."
            },
            {
              "t": "To fill the tail void and limit movement of surrounding ground.",
              "v": "expert",
              "fb": "Unfilled annular space permits soil to migrate and settlement to reach the surface."
            },
            {
              "t": "To lubricate the finished tunnel permanently for train operation.",
              "v": "partial",
              "fb": "Lubrication is not the purpose; filling and support are."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — corroboration",
            "text": "Successive surveys show the trough widening and deepening in step with construction rather than remaining a fixed natural depression."
          }
        },
        {
          "q": "Which surface pattern most strongly links the collapse to shield tunnelling?",
          "o": [
            {
              "t": "One circular depression fixed above an old natural cavity far from the face.",
              "v": "partial",
              "fb": "A fixed isolated depression would better support a natural cavity."
            },
            {
              "t": "Radial debris and pressure damage extending outward from the tunnel crown.",
              "v": "wrong",
              "fb": "Radial pressure damage would support an energetic burst instead of settlement."
            },
            {
              "t": "Random marker changes without spatial or temporal relation to construction.",
              "v": "danger",
              "fb": "Unstructured noise cannot establish a construction-linked mechanism."
            },
            {
              "t": "A widening trough centered on the alignment and following the shield advance.",
              "v": "expert",
              "fb": "A moving alignment-centered trough is the expected signature of construction volume loss."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — corroboration",
            "text": "Survey alerts reached the contractor while advance continued without restoring grout or pausing the shield."
          }
        }
      ]
    },
    "tn_rabcewicz": {
      "sci": "Ladislaus von Rabcewicz (1893-1975)",
      "topic": "The New Austrian Tunnelling Method",
      "lede": "The Austrian engineer who stopped fighting the ground and let it carry its own weight — but only if you measured its every move.",
      "no": 3,
      "profile": "Ladislaus von Rabcewicz was an Austrian civil engineer who, drawing on decades of Alpine tunnelling, formalised in the 1960s what he named the New Austrian Tunnelling Method, or NATM. His central idea overturned an old assumption. Earlier practice treated the ground as a dead load to be held up by a heavy, rigid lining. Rabcewicz argued that the surrounding rock or soil is itself a structural element: if you support it just enough, and let it deform a controlled amount, the ground arches around the opening and carries most of the load itself.\n\nThe method uses a thin, flexible initial support — sprayed concrete (shotcrete) and rock bolts — applied quickly, then permits measured deformation before a final lining goes in. What makes it work, and what makes it dangerous when abused, is monitoring. NATM demands continuous measurement of how the tunnel converges: extensometers, load cells, and survey targets track every millimetre of movement, and the support is adjusted in response. The ground is allowed to move, but only within limits the instruments confirm.\n\nRabcewicz’s observational method turns measurements into decisions. Kingsgate’s convergence and settlement crossed the original action levels, but the contractor raised those levels while cutting grout and maintaining advance. The directive identifies authority; the surface network establishes the failure’s culmination and timing. Together they show a monitored construction process drifting outside its control envelope, not a hidden gas burst or an independent geological surprise. The instruments therefore document both warning and consequence before the pavement finally gives way. Clearly.",
      "frame": "Lays convergence readings and surface alarms beside the directive that raised stop-work thresholds. “Observation only protects you if the measured movement is allowed to change the work.”",
      "q": [
        {
          "q": "What is central to the observational approach associated with Rabcewicz and modern tunnelling?",
          "o": [
            {
              "t": "Fix every support decision permanently before excavation begins and ignore later movement.",
              "v": "wrong",
              "fb": "Observational tunnelling depends on adapting to measured conditions."
            },
            {
              "t": "Install support, measure ground response, and adjust construction as behavior develops.",
              "v": "expert",
              "fb": "The method treats monitoring as feedback that informs support and sequence."
            },
            {
              "t": "Allow large deformation because ground movement tends to strengthen a tunnel.",
              "v": "danger",
              "fb": "Controlled deformation can mobilize strength, but excessive movement is a warning requiring action."
            },
            {
              "t": "Rely on experienced workers’ impressions instead of instruments and surveys.",
              "v": "partial",
              "fb": "Experience matters, yet quantified monitoring is essential to the feedback loop."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — decisive",
            "text": "Ground loss crossed the original intervention limits while work continued under raised thresholds, turning a detected trend into collapse."
          }
        },
        {
          "q": "Why is changing a settlement trigger after movement begins dangerous?",
          "o": [
            {
              "t": "It relabels an escalating response without reducing the underlying deformation.",
              "v": "expert",
              "fb": "A higher threshold changes the rule, not the ground or its trend."
            },
            {
              "t": "It improves safety because fewer alarms allow the team to focus on production.",
              "v": "partial",
              "fb": "Suppressing warnings cannot make the physical response safer."
            },
            {
              "t": "It proves the original trigger was scientifically incorrect from the start.",
              "v": "wrong",
              "fb": "A revision needs new evidence; timing alone does not invalidate the first limit."
            },
            {
              "t": "It prevents surface markers from recording further movement above the tunnel.",
              "v": "danger",
              "fb": "Instrumentation continues to measure movement regardless of the chosen trigger."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — decisive",
            "text": "The full movement history—from early drift to street collapse—is preserved in the Surface Settlement Network."
          }
        },
        {
          "q": "Which record most directly identifies the accountable authority?",
          "o": [
            {
              "t": "The design engineer’s original support plan and monitoring intervention limits.",
              "v": "partial",
              "fb": "The original plan defines the safe baseline but not who authorized departure."
            },
            {
              "t": "The transit inspector’s emergency report and closure order written after collapse.",
              "v": "wrong",
              "fb": "Later findings do not replace the contemporaneous change directive."
            },
            {
              "t": "The signed directive reducing grout and raising intervention limits for schedule.",
              "v": "expert",
              "fb": "One decision links the weakened support and muted monitoring response to the contractor in control."
            },
            {
              "t": "An unsupported theory that a gas pocket vanished after producing the collapse.",
              "v": "danger",
              "fb": "A disappearing-cause theory cannot outweigh progressive movement and construction records."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — decisive",
            "text": "One contractor signed the combined directive cutting support, raising action levels, and ordering uninterrupted advance."
          }
        }
      ]
    }
  },
  "story": [
    "<b>Kingsgate’s street did not disappear without warning; its survey points had been moving before the pavement opened.</b>",
    "Miner Jud Kolb knows what was left behind the shield. The Monitoring Surveyor holds the surface time series. The Site Records Clerk has the production and trigger changes.",
    "A gas burst, a natural void, and construction-linked ground loss produce different shapes in space and time.",
    "The case turns on who let support lag, where the movement became undeniable, and whether the warnings were changed instead of answered."
  ],
  "endings": {
    "overclaimWhat": "tn_explosion",
    "dismissalWhat": "tn_sinkhole",
    "win": {
      "expertTitle": "The Trough Behind the Shield",
      "expert": [
        "You connect Emil Radek, the Surface Settlement Network, and ground loss caused by shortened grouting and raised intervention thresholds.",
        "The alignment-centered moving trough rejects a gas burst and an independent sinkhole. The contractor’s combined directive explains why the detectable movement was allowed to deepen."
      ],
      "soundTitle": "The Settlement Record",
      "sound": [
        "Your accusation identifies the contractor, the surface network, and construction-linked ground loss.",
        "Some grout or threshold details remain incomplete, but the spatial and temporal pattern supports the conclusion."
      ],
      "namedTitle": "Right Mechanism, Thin Survey",
      "named": [
        "You select the correct person, place, and mechanism.",
        "The verdict holds, though missed clues leave parts of the settlement progression or directive chain less complete."
      ]
    },
    "overclaim": {
      "title": "No Pressure-Burst Pattern",
      "body": [
        "The ground moved as a widening trough behind the shield, without radial crown damage or ejecta.",
        "The dramatic final collapse should not be mistaken for evidence of an explosion."
      ]
    },
    "dismissal": {
      "title": "The Void Followed the Work",
      "body": [
        "A natural cavity would not normally track the shield alignment and advance over successive surveys.",
        "The monitored geometry ties the ground loss to construction rather than fate."
      ]
    },
    "wrongNames": {
      "title": "The Settlement, Misassigned",
      "body": [
        "You recognize construction-linked ground loss but place authority or culmination away from the contractor and surface network that establish the chain."
      ]
    }
  }
}
};
