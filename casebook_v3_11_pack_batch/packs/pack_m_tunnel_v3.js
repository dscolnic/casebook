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
  "teaser": "A metro tunnel collapses and pulls the street above into the excavation. Was the crown shattered by a gas ignition, did a natural void fail independently of the works, or did ground support and monitoring fall behind the advancing bore?",
  "overclaimTag": "a gas ignition inside the tunnel",
  "truthTag": "ground loss after shortened grouting and ignored movement",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A soft-ground tunnel beneath a settling street with a void above the lining\"><path d=\"M20 46 H640\" stroke=\"#121212\" stroke-width=\"3\"/><path d=\"M60 46 q80 40 160 0 t160 0 t160 0\" fill=\"none\" stroke=\"#e2e2d8\" stroke-width=\"2\"/><path d=\"M180 110 a70 70 0 0 1 140 0\" fill=\"none\" stroke=\"#121212\" stroke-width=\"5\"/><path d=\"M205 110 a45 45 0 0 1 90 0\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2\"/><path d=\"M250 44 l-15 24 16 6 -10 30 34-40 -16-7 12-23z\" fill=\"#B3261E\"/></svg>",
  "overclaimTease": "The surface collapse is dramatic, but its geometry can reveal whether energy burst outward or ground quietly migrated into an unsupported void over time.",
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
          "label": "The Tunnel Face & Shield"
        },
        {
          "id": "tn_surface",
          "label": "The Surface Settlement Network"
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
          "id": "tn_sinkhole",
          "label": "A natural void collapsed independently of construction"
        },
        {
          "id": "tn_settlement",
          "label": "Ground loss grew as grouting and monitoring fell behind"
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
      "hint": "Tail-void grout runs were shortened to keep the machine advancing.",
      "reading": "tn_marcbrunel"
    },
    "tn_surveyor": {
      "name": "The Monitoring Surveyor",
      "role": "Ground-settlement surveyor",
      "face": "📐",
      "badge": "S",
      "legend": "the street network",
      "hint": "Surface markers formed a widening settlement trough for days before the collapse.",
      "reading": "tn_greathead"
    },
    "tn_clerk": {
      "name": "The Site Records Clerk",
      "role": "Construction records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the contractor office",
      "hint": "The contractor halved grout quantities and raised alarm thresholds under one schedule directive.",
      "reading": "tn_rabcewicz"
    }
  },
  "TOPICS": {
    "tn_marcbrunel": {
      "sci": "Marc Isambard Brunel (1769-1849)",
      "topic": "The tunnelling shield",
      "lede": "The émigré engineer who watched a shipworm chew through oak and copied its armored head to drive the first tunnel under a river.",
      "no": 1,
      "profile": "Marc Isambard Brunel was a French-born engineer who, after fleeing the Revolution and building a career in Britain, solved one of the oldest problems in civil engineering: how to dig through soft, waterlogged ground without the roof collapsing on the miners. His inspiration was biological. Watching the shipworm Teredo navalis bore through ship timber, its soft body shielded by hard plates at the head while it lined the hole behind it, he patented in 1818 a tunnelling shield that did the same for men.\n\nBrunel's shield was a great iron frame divided into cells, one miner to each, that held back the earth at the face while workers removed a board's width of soil at a time. As the shield inched forward on screws, bricklayers followed immediately behind, building the permanent lining before the ground could move. With it he drove the Thames Tunnel between Rotherhithe and Wapping from 1825 to 1843 — the first tunnel successfully built beneath a navigable river — through gravel, quicksand, and repeated floods that nearly killed his son Isambard Kingdom Brunel.\n\nFor this board, Brunel is the origin of one unbreakable principle: in soft ground the tunnel is a race between excavation and support, and support must never fall behind. His shield exists because unsupported soft ground does not stay up — it flows, it settles, it seeks the surface. So when a street collapses over a modern bore, Brunel's ghost asks the plainest question first: was the ground held as fast as it was opened? A gas blast is loud and a sinkhole sounds like fate, but the older, quieter answer is that the support fell behind the dig.",
      "frame": "Points from the shield tail to the fresh lining and the annular gap between them. “Soft ground takes every space you leave. Tell me why support must follow the excavation.”",
      "q": [
        {
          "q": "What problem did Brunel’s tunnelling shield solve?",
          "o": [
            {
              "t": "It supported soft wet ground at the face while permanent lining followed.",
              "v": "expert",
              "fb": "The shield protected miners and controlled the ground until masonry could hold the opening."
            },
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
              "t": "It allowed the ground to collapse freely and then filled the crater afterward.",
              "v": "danger",
              "fb": "Controlled support prevents ground loss; accepting collapse would endanger the tunnel and surface."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "The machine advanced while tail support and grout placement lagged, leaving a path for soft ground to move into the new annular space."
          }
        },
        {
          "q": "What did Brunel borrow from the shipworm?",
          "o": [
            {
              "t": "An armored head that advances while the opening is lined immediately behind.",
              "v": "expert",
              "fb": "The biological model combined protected excavation with prompt support of the new hole."
            },
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
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "Face crews recorded shortened grout runs, but the reduced quantity was imposed by the contractor authority controlling production targets."
          }
        },
        {
          "q": "Where is the decision to let support lag most directly established?",
          "o": [
            {
              "t": "The site file joining advance rates, grout quantities, deviations, and instructions.",
              "v": "expert",
              "fb": "The tunnel shows the void; the office record shows why the planned support was reduced."
            },
            {
              "t": "The shield controls showing its position, rate, and operating state at collapse.",
              "v": "partial",
              "fb": "Position matters but cannot establish the earlier policy on grout and support."
            },
            {
              "t": "The gas monitor because every tunnel collapse is assumed to begin with ignition.",
              "v": "danger",
              "fb": "Gas data tests one hypothesis; it does not document the support decision."
            },
            {
              "t": "The street crater because its size is claimed to identify responsibility by itself.",
              "v": "wrong",
              "fb": "Surface geometry reveals mechanism but not administrative authority."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The face reveals support falling behind, while the contractor’s site office preserves the production instruction that caused it."
          }
        }
      ]
    },
    "tn_greathead": {
      "sci": "James Henry Greathead (1844-1896)",
      "topic": "The shield & compressed-air tunnelling",
      "lede": "The South-African-born engineer who fused shield, compressed air, and cement grout into the recipe that dug London's deep tube — and named the void that grout must fill.",
      "no": 2,
      "profile": "James Henry Greathead was a civil engineer, born in South Africa and trained in Britain, who took the tunnelling shield from a clever prototype to a mature system. Having worked with Peter Barlow on the Tower Subway in 1869, he went on to build the City & South London Railway, opened in 1890 — the world's first deep-level electric underground railway — using a refined circular shield that became the template for the whole London 'tube.'\n\nGreathead's genius was combination. He drove his shield through wet ground and used compressed air to hold back water where the ground was worst, balancing the air pressure against the water trying to seep in. Most important for this case, he perfected grouting: as the shield advanced, cement grout was pumped under pressure into the annular gap left between the excavated bore and the iron lining behind the shield's tail. This filled the void, locked the lining against the surrounding soil, and stopped the ground from relaxing inward. The tool he used, the grout injector, is still called a Greathead grout pan.\n\nFor this board, Greathead is the direct ancestor of the very thing at issue. He understood that every metre of shield tunnelling opens a ring-shaped void, and that this void must be grouted promptly and fully or the soil above will settle into it. Grouting is not decoration; it is structural, and it is precisely where a contractor under schedule pressure can quietly economise. When settlement climbs and a street drops, Greathead's method tells the investigator to check the grout: was the annulus filled as the design required, or was the pump run short?",
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
            "label": "WHAT clue",
            "text": "Survey contours form a construction-aligned settlement trough behind the shield, not the localized ejecta or pressure damage expected from an explosion."
          }
        },
        {
          "q": "Why is grout injected behind segmental tunnel lining?",
          "o": [
            {
              "t": "To fill the tail void and limit movement of surrounding ground.",
              "v": "expert",
              "fb": "Unfilled annular space permits soil to migrate and settlement to reach the surface."
            },
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
              "t": "To lubricate the finished tunnel permanently for train operation.",
              "v": "partial",
              "fb": "Lubrication is not the purpose; filling and support are."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The surface network shows the growing trough, but its relation to reduced grout volumes becomes decisive only in the contractor office records."
          }
        },
        {
          "q": "Which pattern best distinguishes tunnelling settlement from a natural sinkhole?",
          "o": [
            {
              "t": "A progressive trough centered on the tunnel alignment and following shield advance.",
              "v": "expert",
              "fb": "Construction-induced ground loss commonly produces a spatial and temporal pattern tied to the bore."
            },
            {
              "t": "A single circular collapse with no earlier marker movement or alignment relation.",
              "v": "partial",
              "fb": "That shape could support a natural void hypothesis, though geology would still need investigation."
            },
            {
              "t": "Any surface crack that appears after rain near an underground project.",
              "v": "wrong",
              "fb": "Rain and proximity alone cannot establish mechanism."
            },
            {
              "t": "A crater accompanied by rumors that workers heard a bang underground.",
              "v": "danger",
              "fb": "Sound reports cannot outweigh measured deformation and absence of blast evidence."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The surveyor issued escalating trough alerts to the contractor, and the same production manager kept advance moving without restoring grout or stopping work."
          }
        }
      ]
    },
    "tn_rabcewicz": {
      "sci": "Ladislaus von Rabcewicz (1893-1975)",
      "topic": "The New Austrian Tunnelling Method",
      "lede": "The Austrian engineer who stopped fighting the ground and let it carry its own weight — but only if you measured its every move.",
      "no": 3,
      "profile": "Ladislaus von Rabcewicz was an Austrian civil engineer who, drawing on decades of Alpine tunnelling, formalised in the 1960s what he named the New Austrian Tunnelling Method, or NATM. His central idea overturned an old assumption. Earlier practice treated the ground as a dead load to be held up by a heavy, rigid lining. Rabcewicz argued that the surrounding rock or soil is itself a structural element: if you support it just enough, and let it deform a controlled amount, the ground arches around the opening and carries most of the load itself.\n\nThe method uses a thin, flexible initial support — sprayed concrete (shotcrete) and rock bolts — applied quickly, then permits measured deformation before a final lining goes in. What makes it work, and what makes it dangerous when abused, is monitoring. NATM demands continuous measurement of how the tunnel converges: extensometers, load cells, and survey targets track every millimetre of movement, and the support is adjusted in response. The ground is allowed to move, but only within limits the instruments confirm.\n\nFor this board, Rabcewicz is the case's beating heart. NATM is safe precisely because it is instrumented; the deformation readings are not paperwork but the early-warning system. If convergence accelerates, the ground is telling you it is about to fail, and there is usually time to act. A method that relies on monitoring collapses catastrophically if the monitoring is ignored — the gauges climb, the warning is there, and no one reads it. When a bore caves in, Rabcewicz would not ask about gas or fate; he would ask what the instruments showed in the days before, and who chose not to look.",
      "frame": "Lays convergence readings and surface alarms beside the directive that raised stop-work thresholds. “Observation only protects you if the measured movement is allowed to change the work.”",
      "q": [
        {
          "q": "What is central to the observational approach associated with Rabcewicz and modern tunnelling?",
          "o": [
            {
              "t": "Install support, measure ground response, and adjust construction as behavior develops.",
              "v": "expert",
              "fb": "The method treats monitoring as feedback that informs support and sequence."
            },
            {
              "t": "Fix every support decision permanently before excavation begins and ignore later movement.",
              "v": "wrong",
              "fb": "Observational tunnelling depends on adapting to measured conditions."
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
            "label": "WHAT clue",
            "text": "Settlement and convergence crossed the original intervention thresholds while work continued under raised limits, converting a detectable trend into uncontrolled ground loss."
          }
        },
        {
          "q": "Why can changing an alarm threshold be dangerous?",
          "o": [
            {
              "t": "It can hide worsening behavior without changing the ground or the structure.",
              "v": "expert",
              "fb": "Relabeling a reading does not reduce the physical movement that prompted the original limit."
            },
            {
              "t": "Higher thresholds automatically increase the strength of installed support.",
              "v": "wrong",
              "fb": "A software or policy change cannot add structural capacity."
            },
            {
              "t": "Any alarm indicates collapse is unavoidable and work should remain stopped.",
              "v": "partial",
              "fb": "Alarms require investigation and response, not necessarily permanent abandonment."
            },
            {
              "t": "Thresholds are administrative values unrelated to engineering action.",
              "v": "danger",
              "fb": "They are intended to trigger review, support changes, or stoppage before conditions become unsafe."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The monitoring instruments recorded movement, but the altered thresholds, reduced grout plan, and continue-work instruction converge in the contractor’s site office."
          }
        },
        {
          "q": "Which record most directly identifies the accountable authority?",
          "o": [
            {
              "t": "The signed directive reducing grout and raising intervention limits for schedule.",
              "v": "expert",
              "fb": "One decision links the weakened support and muted monitoring response to the contractor in control."
            },
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
              "t": "An unsupported theory that a gas pocket vanished after producing the collapse.",
              "v": "danger",
              "fb": "A disappearing-cause theory cannot outweigh progressive movement and construction records."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The contractor who signed the combined directive cutting grout, raising alarm limits, and ordering uninterrupted advance controlled the decisive choices."
          }
        }
      ]
    }
  },
  "story": [
    "<b>The Kingsgate street did not vanish without warning.</b> Survey marks had been moving in a widening trough behind the tunnel shield for days.",
    "Miner Jud Kolb has the shortened grout runs. The Monitoring Surveyor has the surface and convergence trends. The Site Records Clerk holds the directive that changed quantities and intervention thresholds.",
    "A gas ignition should leave blast evidence and outward damage. A natural sinkhole should follow geology rather than the shield’s progress. The support and monitoring record tests both.",
    "Nine clues can trace ground from the tail void to the surface and then to the office decision that kept excavation moving."
  ],
  "endings": {
    "overclaimWhat": "tn_explosion",
    "dismissalWhat": "tn_sinkhole",
    "win": {
      "expertTitle": "The Ground Followed the Missing Support",
      "expert": [
        "You join shortened tail grouting, a shield-aligned settlement trough, raised intervention thresholds, and the continue-work directive to Emil Radek and the Contractor’s Site Office.",
        "The collapse shows no blast origin and no independent natural void. Ground migrated into an inadequately supported space while measured warnings were administratively muted."
      ],
      "soundTitle": "The Settlement Chain",
      "sound": [
        "Your accusation identifies the contractor, the site office, and the ground-loss process caused by reduced grouting and ignored movement.",
        "Some geometry or monitoring details remain incomplete, but the progressive alignment-linked pattern rejects both traps."
      ],
      "namedTitle": "Correct Bore, Thin Record",
      "named": [
        "You choose the right person, place, and mechanism.",
        "The verdict holds, though missed clues leave the support sequence or threshold changes less fully demonstrated."
      ]
    },
    "overclaim": {
      "title": "No Blast Pattern in the Bore",
      "body": [
        "The lining and ground show progressive inward loss and settlement rather than outward explosive damage, and gas records do not support ignition.",
        "The explosion theory begins with a rumored bang and ignores the measured deformation that preceded collapse."
      ]
    },
    "dismissal": {
      "title": "The Trough Followed the Works",
      "body": [
        "The surface movement developed along the tunnel alignment and advanced with the shield, not as an isolated natural void.",
        "Calling it a freak sinkhole erases the reduced grout and ignored monitoring that supplied a testable construction mechanism."
      ]
    },
    "wrongNames": {
      "title": "The Ground Loss, Assigned Elsewhere",
      "body": [
        "You identify the settlement mechanism but place responsibility or culmination away from the site directive that reduced support and disabled the monitoring response."
      ]
    }
  }
}
};
