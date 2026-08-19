module.exports = { PACK: {
  "id": "c_art",
  "title": "The Halberstadt Panel",
  "discipline": "Art History & Authentication",
  "teaser": "A newly surfaced panel resembles a lost Old Master and arrives with an impressive ownership history. Is it workshop work, a period imitation, or a modern construction assembled to survive both eye and archive?",
  "overclaimTag": "a recovered Old Master workshop painting",
  "truthTag": "a modern forgery built to imitate age",
  "venue": "the Halberstadt Panel inquiry",
  "agent": {
    "name": "Investigator Rhea Voss",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Commission credibility",
  "readingShort": "Connoisseurs",
  "readingLabel": "Connoisseurs & Conservators",
  "dossierName": "CONNOISSEURS & CONSERVATORS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Halberstadt Panel inquiry",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before the inquiry closes. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The place you test determines the dossier you receive, and the conversation costs one day.",
  "overclaimTease": "Style can place a painting near a master; materials and documents must still show when the object itself was made.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "ar_restorer",
      "items": [
        {
          "id": "ar_restorer",
          "label": "Anselm Roterman — the panel's restorer"
        },
        {
          "id": "ar_dealer",
          "label": "Emile Vasse — the gallery dealer"
        },
        {
          "id": "ar_curator",
          "label": "Dr. Halvard — the museum's connoisseur"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "ar_lab",
      "items": [
        {
          "id": "ar_gallery",
          "label": "The Auction House & Gallery"
        },
        {
          "id": "ar_provenance",
          "label": "The Provenance Archive"
        },
        {
          "id": "ar_lab",
          "label": "The Conservation Laboratory"
        }
      ]
    },
    "what": {
      "title": "What is the Halberstadt Panel?",
      "truth": "ar_forgery",
      "items": [
        {
          "id": "ar_masterpiece",
          "label": "A newly recovered workshop painting completed under the named Old Master."
        },
        {
          "id": "ar_obvious",
          "label": "A period imitation later misattributed and promoted under the master's name."
        },
        {
          "id": "ar_forgery",
          "label": "A modern forgery using old wood, false records, and new pigment."
        }
      ]
    }
  },
  "PLACES": {
    "ar_gallery": {
      "name": "The Auction House & Gallery",
      "xy": [
        140,
        90
      ]
    },
    "ar_provenance": {
      "name": "The Provenance Archive",
      "xy": [
        330,
        240
      ]
    },
    "ar_lab": {
      "name": "The Conservation Laboratory",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "ar_gallery",
      "ar_provenance"
    ],
    [
      "ar_provenance",
      "ar_lab"
    ]
  ],
  "CHARACTERS": {
    "ar_conservator": {
      "name": "Conservator Nel",
      "role": "Paintings conservator",
      "face": "🔬",
      "badge": "N",
      "legend": "the laboratory",
      "hint": "Takes the paint cross-sections; found a pigment that did not exist when the panel was supposedly made."
    },
    "ar_archivist": {
      "name": "Archivist Boll",
      "role": "Provenance archivist",
      "face": "🗂",
      "badge": "B",
      "legend": "the archive",
      "hint": "Traces old sale records; the panel's 'centuries-old' history dead-ends in a forged bill of sale."
    },
    "ar_framer": {
      "name": "Framer Ruys",
      "role": "Frame-maker & studio hand",
      "face": "🖼",
      "badge": "R",
      "legend": "the gallery",
      "hint": "Built frames for the restorer's studio; saw a 'new' old panel aged in the back room."
    }
  },
  "TOPICMAP": {
    "ar_gallery": {
      "ar_conservator": [
        "ar_morelli"
      ],
      "ar_archivist": [
        "ar_friedlander"
      ],
      "ar_framer": [
        "ar_bredius"
      ]
    },
    "ar_provenance": {
      "ar_conservator": [
        "ar_coremans"
      ],
      "ar_archivist": [
        "ar_zeri"
      ],
      "ar_framer": [
        "ar_gettens"
      ]
    },
    "ar_lab": {
      "ar_conservator": [
        "ar_forbes"
      ],
      "ar_archivist": [
        "ar_vandantzig"
      ],
      "ar_framer": [
        "ar_keating"
      ]
    }
  },
  "TOPICS": {
    // cell: Conservator Nel @ The Auction House & Gallery
    "ar_morelli": {
      "sci": "Giovanni Morelli (1816–1891)",
      "topic": "The Morellian method: the telltale detail",
      "lede": "Giovanni Morelli trained as a physician before becoming a politician, collector, and connoisseur.",
      "no": 1,
      "profile": "Giovanni Morelli trained as a physician before becoming a politician, collector, and connoisseur. He argued that attribution should not rest mainly on expressive faces or dramatic compositions, because those are the features a copyist studies most carefully. Instead, he compared small habits—ears, fingernails, hands, folds, and other details an artist might execute almost automatically.\n\nThe Morellian method treats style as a pattern of repeated choices. It works best with a large body of secure reference paintings and with details that are preserved rather than heavily restored. It is not a fingerprint in the modern forensic sense. Pupils imitate masters, artists change over time, and a skilled forger can study published diagnostic features. Morelli’s observations therefore generate and test attributions; they do not make physical examination unnecessary.\n\nThe Halberstadt Panel can be compared with accepted workshop pictures at the level of underdrawing, hand forms, ears, brush turns, and repeated motifs. A close stylistic fit could support either a genuine workshop product or a sophisticated imitation. A mismatch in minor habits would weaken the celebrated name, but even a strong match would not date the paint.\n\nMorelli’s lesson is especially useful because the three hypotheses overlap visually. Workshop participation, period imitation, and modern forgery can all borrow the master’s composition. Investigators should ask which features look unconsciously consistent and which seem copied from famous reproductions. The trained eye narrows the field; material chronology and provenance must decide whether the resemblance belongs to the original period. Infrared examination can extend the comparison below the visible surface, where copied outlines and spontaneous revisions may preserve different kinds of authorship evidence.",
      "frame": "Magnifies ears and fingertips from the panel beside secure workshop pictures. “Copied grandeur often falters in the habits no one thinks to advertise.”",
      "q": [
        {
          "q": "Why did Morelli favor ears, hands, and fingernails over dramatic expressions?",
          "o": [
            {
              "t": "Copyists study prominent effects more consciously than small habitual forms.",
              "v": "expert",
              "fb": "Less advertised habits may preserve unconscious consistency across secure works."
            },
            {
              "t": "Minor details are easier to date chemically than pigments or wooden supports.",
              "v": "partial",
              "fb": "Morelli’s details are visual comparisons, not chemical dating tools."
            },
            {
              "t": "Every artist repeats one ear shape unchanged throughout an entire career.",
              "v": "wrong",
              "fb": "Artists vary and workshops overlap, so no feature functions as an invariant stamp."
            },
            {
              "t": "A single unusual fingertip can identify authorship without comparison material.",
              "v": "danger",
              "fb": "One detail gains meaning only inside a broader comparative pattern."
            }
          ]
        },
        {
          "q": "The Halberstadt composition matches the master, but its minor anatomy does not. What follows?",
          "o": [
            {
              "t": "The famous design may have been copied while the executing hand remains doubtful.",
              "v": "expert",
              "fb": "Copied composition and inconsistent habits weaken authorship without yet dating the object."
            },
            {
              "t": "The painting may still be workshop work, although the executing hand remains uncertain.",
              "v": "partial",
              "fb": "Workshop variation is possible, so material and documentary tests remain necessary."
            },
            {
              "t": "The shared composition proves direct supervision by the master despite minor differences.",
              "v": "wrong",
              "fb": "A shared design is compatible with workshop reuse, imitation, or forgery."
            },
            {
              "t": "The mismatched anatomy should be restored until it resembles the accepted examples.",
              "v": "danger",
              "fb": "Conservation cannot ethically manufacture stylistic evidence for an attribution."
            }
          ]
        },
        {
          "q": "Which comparison would give Morelli’s observation the most weight?",
          "o": [
            {
              "t": "The same minor forms recur across several secure works from the relevant phase.",
              "v": "expert",
              "fb": "Repeated agreement in secure references makes the habit diagnostically useful."
            },
            {
              "t": "One published photograph resembles the panel after both images are heavily sharpened.",
              "v": "partial",
              "fb": "Image processing can create apparent similarity and conceals surface condition."
            },
            {
              "t": "A dealer recalls seeing similar hands in a painting whose location is unknown.",
              "v": "wrong",
              "fb": "An untraceable memory cannot be independently compared or reviewed."
            },
            {
              "t": "The panel’s auction price exceeds those of most accepted workshop pictures.",
              "v": "danger",
              "fb": "Market value measures demand, not the identity of the executing hand."
            }
          ]
        }
      ],
      "whatHint": "Morelli’s telltale details test whether the painter shares workshop habits or merely copies famous features. Compare ears, hands, and underdrawing before accepting the celebrated name."
    },
    // cell: Archivist Boll @ The Auction House & Gallery
    "ar_friedlander": {
      "sci": "Max J. Friedländer (1867–1958)",
      "topic": "The trained connoisseur's eye",
      "lede": "Max J.",
      "no": 2,
      "profile": "Max J. Friedländer spent decades studying Early Netherlandish painting and organizing works by artist, workshop, and region. He valued the connoisseur’s first impression—the rapid recognition built from long familiarity—but he also revised judgments as photographs, documents, restorations, and new comparisons became available. His catalogues show attribution as an evolving argument rather than a permanent declaration.\n\nFriedländer knew that style exists in families. A master, assistants, followers, and later imitators may share compositions, figure types, and workshop patterns. Quality can vary within an authentic workshop, while a talented imitation may look more polished than routine original production. The useful question is not simply “beautiful or bad?” but where the object sits within a comparative corpus and which differences require explanation.\n\nFor the Halberstadt Panel, broad resemblance to the named master should be tested against secure works from the same phase, workshop, and region. Panel preparation, underdrawing conventions, repeated cartoons, and handling of secondary passages may reveal collaboration or distance. That analysis can make a genuine workshop picture more plausible than an autograph masterpiece, or place an imitation near the historical tradition.\n\nFriedländer’s approach cannot rescue a material impossibility. If a pigment or binder entered use centuries later, the painting is not a period workshop product regardless of stylistic sympathy. Conversely, a later attribution error does not automatically mean modern forgery. His method maps visual relationship; technical and documentary evidence establish when the related object was made. The strongest catalogue entry would state those alternatives openly instead of converting a graded visual relationship into one prestigious name.",
      "frame": "Slides the panel among photographs arranged by master, assistant, follower, and imitator. “First place it within the family; then ask whether the object belongs to the century.”",
      "q": [
        {
          "q": "What does Friedländer’s corpus-based connoisseurship allow that “good or bad” does not?",
          "o": [
            {
              "t": "It places a work among master, workshop, follower, region, and later imitation.",
              "v": "expert",
              "fb": "Comparative families explain authentic variation and degrees of artistic relationship."
            },
            {
              "t": "It converts aesthetic quality directly into a calendar date and named author.",
              "v": "partial",
              "fb": "Quality is not a precise chronological or authorship measurement."
            },
            {
              "t": "It removes the need to examine supports once a visual family is recognized.",
              "v": "wrong",
              "fb": "Visual kinship cannot establish when the physical object was manufactured."
            },
            {
              "t": "It treats the first expert impression as final because revision weakens authority.",
              "v": "danger",
              "fb": "Friedländer revised judgments as new comparisons and evidence appeared."
            }
          ]
        },
        {
          "q": "Which result would favor a genuine workshop painting over a period imitation?",
          "o": [
            {
              "t": "Underdrawing and secondary passages match documented workshop practice of the same phase.",
              "v": "expert",
              "fb": "Shared production habits tie the object to the workshop more closely than subject alone."
            },
            {
              "t": "The subject resembles a famous composition copied widely for two centuries; in context.",
              "v": "partial",
              "fb": "Popular compositions can be reused by followers and imitators long afterward."
            },
            {
              "t": "The panel is less accomplished than the master’s autograph works; in context.",
              "v": "wrong",
              "fb": "Uneven quality occurs in workshops and cannot settle the historical relationship."
            },
            {
              "t": "The recent owner supplies a certificate repeating the workshop attribution; in context.",
              "v": "danger",
              "fb": "A modern certificate restates a conclusion rather than supplying period evidence."
            }
          ]
        },
        {
          "q": "A later pigment appears in the first paint layer. How should Friedländer’s stylistic fit be used?",
          "o": [
            {
              "t": "As evidence for what the maker imitated, not proof that the object is historical.",
              "v": "expert",
              "fb": "Style can explain the chosen model while material chronology dates the construction."
            },
            {
              "t": "As a reason to dismiss the pigment result because trained recognition is broader.",
              "v": "partial",
              "fb": "Visual judgment does not overrule an original-layer chronological contradiction."
            },
            {
              "t": "As proof of a period imitation, since modern forgers cannot learn workshop style.",
              "v": "wrong",
              "fb": "Modern makers can study and reproduce workshop conventions with varying success."
            },
            {
              "t": "The late pigment should be renamed as an undocumented material from the master’s period.",
              "v": "danger",
              "fb": "Evidence should not be redefined merely to preserve a desired attribution."
            }
          ]
        }
      ],
      "whatHint": "Friedländer places a picture within master, workshop, follower, and imitation. Stylistic kinship can support a period relationship, but it cannot date the materials."
    },
    // cell: Framer Ruys @ The Auction House & Gallery
    "ar_bredius": {
      "sci": "Abraham Bredius (1855–1946)",
      "topic": "The Vermeer authority who was deceived",
      "lede": "Abraham Bredius was a respected Dutch art historian and museum director whose expertise in seventeenth-century painting carried enormous authority.",
      "no": 3,
      "profile": "Abraham Bredius was a respected Dutch art historian and museum director whose expertise in seventeenth-century painting carried enormous authority. In the 1930s he accepted Han van Meegeren’s Supper at Emmaus as a major Vermeer discovery. The painting appeared to fill a gap scholars had imagined in Vermeer’s development, and Bredius’s enthusiastic endorsement helped transform it into a sensation.\n\nVan Meegeren did not merely copy a familiar Vermeer. He created a style that answered expectations about a missing religious phase, used old canvases, and developed methods to make new paint appear hardened. The episode shows how a forgery can exploit scholarship itself. A respected expert may be most vulnerable when an object arrives that confirms a desired theory and offers the emotional reward of discovery.\n\nThe Halberstadt Panel also arrives as a solution to an art-historical absence. Investigators should therefore separate evidence that was predicted before the object appeared from features reinterpreted afterward to accommodate it. Has the panel independently matched workshop practice, or has the definition of the master’s “lost phase” expanded around the new picture?\n\nBredius’s mistake does not prove that connoisseurship is worthless. It shows why authority and excitement require adversarial checks. A genuine workshop work, a period imitation, and a modern forgery may each satisfy a visual expectation. The decisive tests must be allowed to disappoint the attractive story: documented provenance, layer structure, pigment dates, and comparison with secure objects. A review panel should record which observations genuinely preceded the attribution, because hindsight can make every feature appear to have predicted the desired discovery.",
      "frame": "Opens the glowing rediscovery review beside the scholar’s earlier predictions. “Sometimes the picture arrives already shaped like the answer an expert hoped to find.”",
      "q": [
        {
          "q": "Why was Van Meegeren’s Supper at Emmaus especially persuasive to Bredius?",
          "o": [
            {
              "t": "It appeared to fill a scholarly expectation about a missing phase of Vermeer.",
              "v": "expert",
              "fb": "The object rewarded an existing hypothesis and the desire for a major discovery."
            },
            {
              "t": "It copied Vermeer’s most familiar domestic interior without any stylistic changes.",
              "v": "partial",
              "fb": "Van Meegeren created a less familiar religious style rather than a simple known copy."
            },
            {
              "t": "It arrived with an uninterrupted seventeenth-century ownership record.",
              "v": "wrong",
              "fb": "The provenance was not an independently secure chain reaching Vermeer’s lifetime."
            },
            {
              "t": "It had already passed modern pigment testing before Bredius saw it; in context.",
              "v": "danger",
              "fb": "The acceptance preceded the later technical exposure of modern construction."
            }
          ]
        },
        {
          "q": "Which Halberstadt claim most needs a Bredius-style confirmation-bias audit?",
          "o": [
            {
              "t": "The panel supplies exactly the lost transitional work scholars had predicted.",
              "v": "expert",
              "fb": "A discovery tailored to a desired gap may reshape interpretation around itself."
            },
            {
              "t": "The oak support was cut from a tree old enough to predate the proposed painting.",
              "v": "partial",
              "fb": "Old wood is relevant but does not date the paint applied to it."
            },
            {
              "t": "The dimensions match a frame listed in a later estate inventory; in context.",
              "v": "wrong",
              "fb": "A dimension match is suggestive only if the document and object identity are secure."
            },
            {
              "t": "One corner contains restoration documented during the twentieth century.",
              "v": "danger",
              "fb": "Documented restoration is ordinary and can be separated from original layers."
            }
          ]
        },
        {
          "q": "What is the best safeguard when an authority publicly endorses a sensational attribution?",
          "o": [
            {
              "t": "Commission independent visual, material, and provenance reviews before sale or publication.",
              "v": "expert",
              "fb": "Independent methods reduce the pressure to make later evidence fit a famous judgment."
            },
            {
              "t": "Ask the same authority to choose every specialist so the inquiry remains coherent.",
              "v": "partial",
              "fb": "Control by the original endorser weakens independence even when the specialists are capable."
            },
            {
              "t": "Treat dissent as reputational rivalry unless it offers a complete replacement attribution.",
              "v": "wrong",
              "fb": "A critic may identify a decisive flaw without solving every remaining attribution question."
            },
            {
              "t": "Delay technical tests because sampling could embarrass the scholar who endorsed it.",
              "v": "danger",
              "fb": "Reputation is not a reason to postpone proportionate examination of a valuable object."
            }
          ]
        }
      ],
      "whatHint": "Bredius was persuaded by a picture that filled a scholarly wish. Ask whether the Halberstadt attribution was predicted by evidence or built around the excitement of discovery."
    },
    // cell: Conservator Nel @ The Provenance Archive
    "ar_coremans": {
      "sci": "Paul Coremans (1908–1965)",
      "topic": "The laboratory that unmasked the forgery",
      "lede": "Paul Coremans directed the Belgian laboratory that investigated paintings sold by Han van Meegeren as newly discovered Vermeers.",
      "no": 4,
      "profile": "Paul Coremans directed the Belgian laboratory that investigated paintings sold by Han van Meegeren as newly discovered Vermeers. The inquiry combined microscopy, chemical analysis, examination of supports, and historical knowledge of artists’ materials. It helped demonstrate that the pictures were modern constructions despite their old canvases and convincing cracked surfaces.\n\nTechnical examination asks how a painting was built. Cross-sections can show the order of ground, paint, glaze, varnish, and restoration. Ultraviolet, infrared, and radiographic imaging reveal alterations and underdrawing, while chemical or instrumental analysis identifies pigments and binders. A single modern particle on the surface may come from restoration or contamination; a later material embedded throughout an original-looking layer carries a different meaning.\n\nAt Halberstadt, the crucial sample should be taken from a secure paint passage rather than a retouched edge. If a pigment introduced long after the named master appears mixed through the first paint layer, workshop authorship and period imitation both become difficult to defend. A modern resin used to harden or age the surface would add an independent construction clue.\n\nCoremans also teaches restraint. Old wood does not date the paint applied to it, and artificial cracking can imitate age. Laboratories must document sampling locations, controls, and uncertainty so technical evidence does not become another certificate accepted on authority. The object’s sequence of layers should tell a coherent manufacturing history. Replicate particles from separate passages can show whether the late material is systematic, while an unused control mount helps identify contamination introduced during preparation. That distinction must remain visible in the final laboratory report.",
      "frame": "Rotates a paint cross-section under the microscope. “The date depends on whether this particle lies in restoration—or inside the first image.”",
      "q": [
        {
          "q": "What does a paint cross-section reveal that surface viewing cannot?",
          "o": [
            {
              "t": "The order and composition of ground, original paint, varnish, and later restoration.",
              "v": "expert",
              "fb": "Layer order distinguishes original manufacture from additions and surface effects."
            },
            {
              "t": "The exact artist’s name from the thickness of each visible colored band.",
              "v": "partial",
              "fb": "Thickness and color are not unique signatures of a named artist."
            },
            {
              "t": "The complete ownership history preserved chemically inside the wooden support.",
              "v": "wrong",
              "fb": "Provenance remains documentary evidence rather than a chemical layer."
            },
            {
              "t": "Whether every crack formed naturally without considering materials or treatment.",
              "v": "danger",
              "fb": "Craquelure must be interpreted with binder, ground, aging, and intervention history."
            }
          ]
        },
        {
          "q": "Which pigment finding would be strongest against both historical alternatives?",
          "o": [
            {
              "t": "A post-industrial pigment is dispersed through an untouched first paint layer.",
              "v": "expert",
              "fb": "Original-layer distribution places the late material in the construction of the image."
            },
            {
              "t": "A modern white occurs only in a documented fill over an old loss; in context.",
              "v": "partial",
              "fb": "Restoration materials above a loss do not date the surviving original paint."
            },
            {
              "t": "One loose particle rests on the varnish near a recently repaired frame.",
              "v": "wrong",
              "fb": "A surface contaminant may arrive through handling and needs contextual placement."
            },
            {
              "t": "The laboratory detects an element also present in several traditional pigments.",
              "v": "danger",
              "fb": "Elemental overlap requires compound identification and layer interpretation."
            }
          ]
        },
        {
          "q": "Old oak supports the image, but a modern resin hardens the paint throughout. What follows?",
          "o": [
            {
              "t": "The support was reused; the age of the wood cannot date the current painted layer.",
              "v": "expert",
              "fb": "A reused historical support can carry a much younger image and artificial aging system."
            },
            {
              "t": "The resin is harmless restoration because every old painting contains modern materials.",
              "v": "partial",
              "fb": "Location matters; resin throughout original-looking paint differs from local conservation."
            },
            {
              "t": "The panel must be a period imitation since old wood cannot be obtained today.",
              "v": "wrong",
              "fb": "Old panels can be salvaged, purchased, or stripped for modern construction."
            },
            {
              "t": "The oak date should be averaged with the resin date to estimate manufacture.",
              "v": "danger",
              "fb": "Averaging dates from different components creates no meaningful production date."
            }
          ]
        }
      ],
      "whatHint": "Coremans’s cross-sections ask where a late material sits. A modern pigment mixed through the first paint layer differs from a harmless restoration on top."
    },
    // cell: Archivist Boll @ The Provenance Archive
    "ar_zeri": {
      "sci": "Federico Zeri (1921–1998)",
      "topic": "The connoisseur & the fake",
      "lede": "Federico Zeri developed a formidable memory for paintings, workshops, collections, and archival records.",
      "no": 5,
      "profile": "Federico Zeri developed a formidable memory for paintings, workshops, collections, and archival records. He attributed neglected works, separated masters from followers, and drew attention to later alterations that changed how pictures were understood. His connoisseurship moved constantly between visual comparison and documentary history rather than treating either as self-sufficient.\n\nZeri’s method was especially alert to workshop production. A painting may contain an old core, later repainting, a changed format, or passages executed by different hands. Such mixed histories resist the simple categories of masterpiece and fake. Provenance can also change an attribution’s plausibility, but only when documents are authentic and the ownership chain contains no impossible gaps or recycled descriptions.\n\nFor the Halberstadt Panel, archive research should begin before the recent sale. Does the supposed early inventory describe the same dimensions, subject, support, and condition? Do stamps, paper, ink, and institutional names belong to the dates claimed? A period imitation could genuinely enter an old collection under another name and be misattributed later. A modern forgery needs the documentary past to be manufactured along with the object.\n\nZeri’s contribution is the ability to distinguish those histories. A false recent attribution is not equivalent to modern manufacture. When forged bills of sale, copied catalogue language, and anachronistic materials converge, however, the archive and the painting point to the same construction project. Visual resemblance then explains the forgery’s success rather than its age. Comparing seals, typefaces, tax marks, and institutional addresses can expose a document that borrows old language while using a later administrative world.",
      "frame": "Matches inventory wording against dimensions, stamps, and paper fibers. “A provenance can be copied from an old catalogue without ever describing this panel.”",
      "q": [
        {
          "q": "What distinction does Zeri’s combination of connoisseurship and archives preserve?",
          "o": [
            {
              "t": "An old misattribution is not the same historical event as a modern forgery.",
              "v": "expert",
              "fb": "The object may be historical while its name changes through later scholarship and commerce."
            },
            {
              "t": "Any false attribution proves that the physical painting was newly manufactured.",
              "v": "partial",
              "fb": "Attribution error can occur centuries after an authentic or imitative work was painted."
            },
            {
              "t": "A secure visual comparison makes provenance research unnecessary; in context.",
              "v": "wrong",
              "fb": "Visual evidence and documents answer different questions and should converge."
            },
            {
              "t": "A long ownership chain guarantees every attribution attached to the object.",
              "v": "danger",
              "fb": "Even genuine documents may record mistaken names rather than true authorship."
            }
          ]
        },
        {
          "q": "Which archival flaw most strongly suggests that Halberstadt’s past was manufactured recently?",
          "o": [
            {
              "t": "Early bills use copied catalogue wording and paper, ink, or institutions from later dates.",
              "v": "expert",
              "fb": "Anachronistic documents reproduce a ready-made history rather than recording contemporary ownership."
            },
            {
              "t": "One owner omitted the painting from a household list that records only major furniture.",
              "v": "partial",
              "fb": "Silence in a selective inventory is weaker than a positive chronological contradiction."
            },
            {
              "t": "The panel changed title between two genuine nineteenth-century catalogues; in context.",
              "v": "wrong",
              "fb": "Historical titles commonly shift as subjects and attributions are reinterpreted."
            },
            {
              "t": "A sale price appears low compared with the panel’s present valuation; in context.",
              "v": "danger",
              "fb": "Past price reflects attribution and market conditions, not physical authenticity."
            }
          ]
        },
        {
          "q": "What would make a period imitation more plausible than modern manufacture?",
          "o": [
            {
              "t": "Materials fit the imitation’s period and genuine records place the object there under another name.",
              "v": "expert",
              "fb": "Historical coherence in both object and archive supports an old work later misnamed."
            },
            {
              "t": "The picture resembles the master and the present dealer calls it an old copy; in context.",
              "v": "partial",
              "fb": "Resemblance and a dealer’s label do not establish the date of manufacture."
            },
            {
              "t": "The support is ancient, although all documents begin with the current seller; in context.",
              "v": "wrong",
              "fb": "Old support alone is compatible with reuse in a modern construction."
            },
            {
              "t": "A modern pigment appears beneath the first varnish but is described as restoration; in context.",
              "v": "danger",
              "fb": "A material inside original paint cannot be reassigned to surface treatment by description."
            }
          ]
        }
      ],
      "whatHint": "Zeri’s archive work separates an old misattribution from a newly invented past. Test whether the early records describe this object and whether the documents themselves belong to their claimed dates."
    },
    // cell: Framer Ruys @ The Provenance Archive
    "ar_gettens": {
      "sci": "Rutherford J. Gettens (1900–1974)",
      "topic": "The technical analysis of pigments",
      "lede": "Rutherford J.",
      "no": 6,
      "profile": "Rutherford J. Gettens helped establish the technical study of artists’ materials in American museums. Working at the Fogg Art Museum and elsewhere, he examined pigments, grounds, metals, and deterioration, and co-authored reference works that connected material identification with conservation and art history. His research made pigment particles into chronological evidence.\n\nA pigment name is not enough. The same color can be produced by different compounds, and manufacturing methods change particle form and impurities. Analysts use microscopy, elemental analysis, spectroscopy, and comparison with reference samples. Interpretation depends on location: a modern white in a restoration fill is expected, while the same material dispersed through an untouched original layer may be impossible for the proposed date.\n\nThe Halberstadt sample should therefore be mapped within the paint structure. Investigators must show that the late pigment belongs to the composition as first painted, not to a repaired loss or later varnish. If it appears beneath old-looking craquelure and mixed with the principal colors, the chronological contradiction reaches the manufacture of the image itself.\n\nGettens’s work also prevents an easy dismissal. A modern forgery can use old pigments salvaged from historical materials, and a period imitation can be technically consistent with its own century. The full palette, binder, ground, and support must be considered together. Material analysis is strongest when it identifies a combination that could not have existed at the claimed time. When sampling is limited, noninvasive mapping can locate promising regions before a minute cross-section is removed from a passage that appears structurally original.",
      "frame": "Compares a bright grain with authenticated pigment standards. “Color names travel across centuries; compounds do not.”",
      "q": [
        {
          "q": "Why must pigment identification include layer location?",
          "o": [
            {
              "t": "A modern compound in restoration has a different meaning from one in original paint.",
              "v": "expert",
              "fb": "Chronological interpretation depends on whether the material belongs to manufacture or repair."
            },
            {
              "t": "Every particle of modern material proves the entire object was painted recently.",
              "v": "partial",
              "fb": "Conservation can introduce later materials without changing the age of surviving passages."
            },
            {
              "t": "Layer location determines the artist’s identity even when the pigment is traditional.",
              "v": "wrong",
              "fb": "Position helps date construction but does not by itself name the painter."
            },
            {
              "t": "A pigment date becomes irrelevant once the color visually matches the master’s palette.",
              "v": "danger",
              "fb": "Visual color can be reproduced by compounds from very different periods."
            }
          ]
        },
        {
          "q": "Which laboratory comparison best follows Gettens’s material method?",
          "o": [
            {
              "t": "Combine microscopy and spectroscopy with authenticated reference pigments and manufacturing history.",
              "v": "expert",
              "fb": "Independent identification and documented references make the material conclusion reviewable."
            },
            {
              "t": "Match the sample to the closest color chip under gallery lighting; with reference pigment.",
              "v": "partial",
              "fb": "Apparent color cannot distinguish compounds, mixtures, or particle structures reliably."
            },
            {
              "t": "Accept the pigment name written in the restorer’s recent treatment report; on this record.",
              "v": "wrong",
              "fb": "A treatment report is evidence to test, not a substitute for identifying the sample."
            },
            {
              "t": "Choose the historical material that best preserves the proposed attribution; in context.",
              "v": "danger",
              "fb": "Material identity must constrain the attribution rather than be selected to support it."
            }
          ]
        },
        {
          "q": "The panel uses old earth colors plus one later industrial white throughout. How should this be read?",
          "o": [
            {
              "t": "The mixed palette may be designed to look old while the later white dates the image.",
              "v": "expert",
              "fb": "Many compatible ingredients do not neutralize a material unavailable at the claimed date."
            },
            {
              "t": "The abundance of traditional pigments outweighs one chronological contradiction.",
              "v": "partial",
              "fb": "Authentication is not a majority vote among pigments when one belongs to original paint."
            },
            {
              "t": "The later white proves the work is a careless fake with no historical materials.",
              "v": "wrong",
              "fb": "A sophisticated construction may combine salvaged or traditional materials with modern ones."
            },
            {
              "t": "The white should be ignored because forgers would never use an identifiable modern pigment.",
              "v": "danger",
              "fb": "Makers can err, rely on obscured particles, or expect testing never to occur."
            }
          ]
        }
      ],
      "whatHint": "Gettens treats pigment as a manufacturing clock. Identify the compound and its position in the layer before deciding whether the contradiction reaches the original image."
    },
    // cell: Conservator Nel @ The Conservation Laboratory
    "ar_forbes": {
      "sci": "Edward W. Forbes (1873–1969)",
      "topic": "The pigment archive & conservation",
      "lede": "Edward W.",
      "no": 7,
      "profile": "Edward W. Forbes transformed the Fogg Art Museum into an important center for conservation and technical art history. He assembled thousands of pigment samples, now known as the Forbes Pigment Collection, so analysts could compare particles from artworks with documented reference materials. The collection linked studio practice, chemistry, and historical chronology.\n\nReference collections matter because instruments return measurements, not self-explaining dates. A spectrum or elemental signature must be compared with known materials, manufacturing histories, and possible mixtures. Samples also need reliable labels and storage records; a reference of uncertain origin can mislead as easily as a forged provenance document.\n\nFor Halberstadt, a cross-section containing an unfamiliar blue or white can be compared with historical and modern references. Particle shape, composition, and associated fillers may distinguish a traditional pigment from an industrial substitute introduced later. The analyst should also compare the ground and varnish, since a forger may place new paint on an old support and then add a surface intended to look aged.\n\nForbes’s lesson spreads beyond one anachronism. A genuine workshop panel should show a material system compatible with that workshop and period. A period imitation should remain compatible with its later historical date. A modern construction may combine deliberately old wood with newer paint and artificial aging. The reference archive turns those possibilities into testable manufacturing histories rather than judgments based on reputation. Reference particles should be documented with source and preparation history, since a mislabeled standard can create a confident but chronologically false match. The comparison is only as sound as the reference archive behind it.",
      "frame": "Sets the old oak support beside a chart of grounds, fillers, and industrial pigments. “The tree may be old while the painting on it is young.”",
      "q": [
        {
          "q": "What is the principal value of the Forbes Pigment Collection?",
          "o": [
            {
              "t": "It supplies documented reference materials for interpreting analytical measurements from artworks.",
              "v": "expert",
              "fb": "Reference history turns an instrument signal into a material and chronological comparison."
            },
            {
              "t": "It provides a complete palette list that identifies the painter of any sampled work; in context.",
              "v": "partial",
              "fb": "Artists share pigments, so a palette does not uniquely identify authorship."
            },
            {
              "t": "It proves that museum pigments remain chemically unchanged through all storage conditions.",
              "v": "wrong",
              "fb": "Reference samples require curation and documentation like other evidence."
            },
            {
              "t": "It replaces the need to record where a sample was taken from a painting; on this record.",
              "v": "danger",
              "fb": "Sample location remains essential for distinguishing original paint from restoration."
            }
          ]
        },
        {
          "q": "What does old oak plus a modern material system most directly indicate?",
          "o": [
            {
              "t": "The support may have been salvaged and repainted long after the tree was cut.",
              "v": "expert",
              "fb": "Different components can have different histories; support age is only a terminus."
            },
            {
              "t": "The painting must be old because the support sets the date of every later layer.",
              "v": "partial",
              "fb": "Wood cannot force later paint to share its date."
            },
            {
              "t": "The oak and paint dates should be combined into a midpoint for the catalogue.",
              "v": "wrong",
              "fb": "A midpoint has no manufacturing meaning for reused components."
            },
            {
              "t": "The modern materials are automatically acceptable because restorers often use them.",
              "v": "danger",
              "fb": "Modern conservation is local and documented; a complete modern paint system is another matter."
            }
          ]
        },
        {
          "q": "Which material pattern would favor a period imitation rather than a modern forgery?",
          "o": [
            {
              "t": "The palette and ground fit a later historical workshop, with no compounds introduced afterward.",
              "v": "expert",
              "fb": "Historical materials consistent with the imitation’s own date support an old construction."
            },
            {
              "t": "The picture uses the master’s subject but lacks any ownership record before this year.",
              "v": "partial",
              "fb": "Subject choice alone cannot establish when the object was made."
            },
            {
              "t": "A new synthetic pigment is mixed through the main passages over old wood; in context.",
              "v": "wrong",
              "fb": "Original-layer synthetic material points beyond the proposed historical period."
            },
            {
              "t": "Artificial dirt covers edges where recent adhesives join the panel to its frame; in context.",
              "v": "danger",
              "fb": "Recent assembly evidence is inconsistent with a centuries-old imitation."
            }
          ]
        }
      ],
      "whatHint": "Forbes’s reference collection compares the whole material system, not one color name. Old wood paired with a modern palette can reveal reuse rather than age."
    },
    // cell: Archivist Boll @ The Conservation Laboratory
    "ar_vandantzig": {
      "sci": "Maurits M. van Dantzig (1903–1960)",
      "topic": "'Pictology': the science of authenticity",
      "lede": "Maurits M.",
      "no": 8,
      "profile": "Maurits M. van Dantzig promoted “pictology,” an attempt to make judgments of authenticity more systematic. He sought structured visual indicators that could be recorded and compared rather than leaving connoisseurship as an unexplained flash of intuition. The project reflected a wider twentieth-century desire to join close looking with reproducible examination.\n\nNo checklist can turn attribution into arithmetic. Features differ in diagnostic value, restoration may obscure them, and related artists share workshop habits. A systematic method is useful when it exposes the steps behind a judgment and invites disagreement about evidence. It becomes dangerous when a numerical score disguises uncertain assumptions or treats correlated signs as independent proof.\n\nThe Halberstadt inquiry can use that discipline by building an evidence matrix. Style, underdrawing, support, pigment chronology, craquelure, provenance, and workshop records should each be assessed with their uncertainty. The panel might score well on copied composition and old wood while failing on original-layer pigment and document authenticity. Those failures should not be averaged away by many weak similarities.\n\nVan Dantzig’s approach helps compare the three live hypotheses. A workshop picture should align stylistically and materially with the named period. A period imitation may diverge from the master but remain historically coherent. A modern forgery can manufacture numerous positive-looking signs while one high-value contradiction exposes the chronology. Transparency about weighting keeps the conclusion open to review. The matrix should also mark when two indicators depend on the same photograph or attribution history, preventing duplicated assumptions from masquerading as independent support. Reviewers can then challenge the weighting rather than merely accepting its result.",
      "frame": "Builds a matrix with separate columns for style, material, document, and uncertainty. “Do not let ten soft agreements erase one hard impossibility.”",
      "q": [
        {
          "q": "What is the best use of van Dantzig’s systematic “pictology” idea?",
          "o": [
            {
              "t": "Make each attribution criterion and its uncertainty explicit for independent review.",
              "v": "expert",
              "fb": "Transparent criteria expose assumptions and show which observations actually drive the conclusion."
            },
            {
              "t": "Add enough favorable indicators until any material contradiction becomes statistically minor.",
              "v": "partial",
              "fb": "Weak similarities cannot simply outvote a decisive chronological impossibility."
            },
            {
              "t": "Convert connoisseurship into one score that identifies the artist without judgment.",
              "v": "wrong",
              "fb": "Weighting and interpretation remain necessary even in a structured system."
            },
            {
              "t": "Treat all stylistic and technical signs as equally independent pieces of evidence.",
              "v": "danger",
              "fb": "Correlated signs may repeat the same underlying resemblance rather than add new support."
            }
          ]
        },
        {
          "q": "How should the Halberstadt matrix handle ten stylistic agreements and one late original-layer pigment?",
          "o": [
            {
              "t": "Record the stylistic relationship, but let the material contradiction control the historical date.",
              "v": "expert",
              "fb": "Style may identify the model copied, while the late material limits when copying occurred."
            },
            {
              "t": "Average all eleven indicators so the larger stylistic total determines authenticity; in context.",
              "v": "partial",
              "fb": "Equal voting ignores the different diagnostic value of the observations."
            },
            {
              "t": "Delete the pigment criterion because it conflicts with the more numerous observations.",
              "v": "wrong",
              "fb": "Contradictory evidence is precisely what a transparent matrix must retain."
            },
            {
              "t": "Declare the panel obvious and worthless without investigating why the style is persuasive.",
              "v": "danger",
              "fb": "Understanding sophistication matters even when the object is not historically authentic."
            }
          ]
        },
        {
          "q": "Which evidence categories should remain separate until the final judgment?",
          "o": [
            {
              "t": "Visual relationship, material chronology, provenance authenticity, and restoration history.",
              "v": "expert",
              "fb": "Separate categories reveal convergence, conflict, and dependence among the evidence."
            },
            {
              "t": "Beauty, price, publicity, and the number of experts who attended the unveiling.",
              "v": "partial",
              "fb": "Social enthusiasm does not answer object-based authentication questions."
            },
            {
              "t": "Dealer confidence, owner preference, and the catalogue’s typographic quality; in context.",
              "v": "wrong",
              "fb": "Commercial presentation is not independent evidence for authorship or date."
            },
            {
              "t": "All observations should be merged immediately into one label to avoid ambiguity.",
              "v": "danger",
              "fb": "Premature merging hides which inference fails when one category is contradicted."
            }
          ]
        }
      ],
      "whatHint": "Van Dantzig’s evidence matrix prevents many weak similarities from outweighing one decisive chronological conflict. Keep style, materials, and provenance separately reviewable."
    },
    // cell: Framer Ruys @ The Conservation Laboratory
    "ar_keating": {
      "sci": "Tom Keating (1917–1984)",
      "topic": "The forger & the deliberate 'time bomb'",
      "lede": "Tom Keating worked as a restorer and produced paintings in the manners of many artists.",
      "no": 9,
      "profile": "Tom Keating worked as a restorer and produced paintings in the manners of many artists. He later admitted to extensive forgery and claimed that some works contained deliberate “time bombs”—materials, inscriptions, or technical features that could reveal their modern origin. His story mixed resentment of the art market, self-justification, craftsmanship, and deception.\n\nA restorer understands how age is read. Old supports can be reused, cracked surfaces can be imitated, dirt can be applied, and familiar compositions can be recombined. That knowledge makes a sophisticated forgery different from a clumsy copy. It also means conservation traces must be interpreted carefully: an old repair is normal, while a new image built across a reused panel is a manufacturing strategy.\n\nAt Halberstadt, the back, frame, and edge may preserve workshop evidence hidden from the front. Tool marks can show when the panel was thinned or joined; modern adhesives may sit beneath apparently old framing; a preparatory layer may seal earlier damage before the current image was painted. A deliberate diagnostic inclusion would be especially telling if it lies below later artificial aging.\n\nKeating’s example rules out the assumption that a skilled image must be historical. It also distinguishes modern forgery from period imitation. Both may borrow style, but a modern maker has access to old objects, published catalogues, synthetic materials, and a market history that can be reverse-engineered. The investigator should reconstruct the sequence of construction rather than asking only whether the picture looks convincing. Ultraviolet fluorescence and radiography can help select those hidden construction zones before any sample is taken from the painted front.",
      "frame": "Examines the panel edge, frame rebates, and adhesive beneath artificial dirt. “A maker who knows restoration can construct age in reverse order.”",
      "q": [
        {
          "q": "Why can a restorer’s knowledge make a forgery especially difficult to detect?",
          "o": [
            {
              "t": "It enables reuse of old supports and construction of plausible wear, repairs, and surfaces.",
              "v": "expert",
              "fb": "Understanding how age is read helps a maker imitate the object’s physical history."
            },
            {
              "t": "Restorers can chemically transform every modern pigment into an ancient compound.",
              "v": "partial",
              "fb": "Aging effects can be imitated, but material chemistry still constrains the construction."
            },
            {
              "t": "A restorer’s signature automatically enters museum records as the original artist.",
              "v": "wrong",
              "fb": "Records can be forged, yet institutional provenance requires more than a signature."
            },
            {
              "t": "Conservation experience guarantees the work will match a master’s unconscious drawing habits.",
              "v": "danger",
              "fb": "Technical skill does not ensure complete stylistic consistency with the model."
            }
          ]
        },
        {
          "q": "Which Halberstadt feature would function most like a Keating “time bomb”?",
          "o": [
            {
              "t": "A concealed modern material lies beneath artificial aging where testing can expose it.",
              "v": "expert",
              "fb": "A deliberately buried anachronism reveals modern construction despite the aged surface."
            },
            {
              "t": "The painting contains a common symbol also used by several historical artists.",
              "v": "partial",
              "fb": "Shared iconography is not a chronological contradiction."
            },
            {
              "t": "The frame has one repaired corner documented by a recent conservator; in context.",
              "v": "wrong",
              "fb": "Documented frame repair does not date the image on the panel."
            },
            {
              "t": "The subject differs slightly from the master’s best-known composition; in context.",
              "v": "danger",
              "fb": "Compositional variation can occur in workshops, copies, and later inventions."
            }
          ]
        },
        {
          "q": "How can edge and reverse evidence distinguish modern construction from a period imitation?",
          "o": [
            {
              "t": "Recent adhesives and tool marks precede the present paint and artificial surface dirt.",
              "v": "expert",
              "fb": "Construction order can show that modern assembly occurred before the image was aged."
            },
            {
              "t": "The back looks old, so every operation on the front must belong to the same period.",
              "v": "partial",
              "fb": "Old-looking reverse surfaces can be retained or manufactured during reuse."
            },
            {
              "t": "A period imitation is impossible if the panel has ever been trimmed or reframed.",
              "v": "wrong",
              "fb": "Historical objects often undergo later trimming, so that fact alone does not settle origin."
            },
            {
              "t": "Only the front composition matters because buyers never display the reverse.",
              "v": "danger",
              "fb": "Hidden surfaces preserve evidence precisely because presentation focuses on the front."
            }
          ]
        }
      ],
      "whatHint": "Keating’s forgeries show how old supports and artificial aging can shelter new paint. Reconstruct the order of tool marks, adhesives, layers, and surface effects."
    }
  },
  "STORIES": {
    "ar_conservator": {
      "ar_gallery": "Under raking light in the gallery, Nel photographs ears, fingertips, and small folds rather than the grand central figure. “Morelli distrusted the features a copyist advertises.”",
      "ar_provenance": "At an archive table, Nel places a microscopic cross-section beside the restoration history. “Coremans asks where the late particle sits, not merely whether it exists.”",
      "ar_lab": "In the conservation laboratory, Nel matches grains from the panel to trays of documented standards. “Forbes made comparison material part of the argument; use it properly.”"
    },
    "ar_archivist": {
      "ar_gallery": "Boll slides the panel among secure workshop photographs without showing their labels. “Friedländer placed pictures within families before attaching prestigious names.”",
      "ar_provenance": "Boll aligns bills of sale, inventory dimensions, and paper watermarks along one timeline. “Zeri would distinguish an old naming error from a newly invented past.”",
      "ar_lab": "Boll builds four columns—style, material, document, intervention—and refuses to total them. “Van Dantzig wanted the reasoning visible, not hidden inside authority.”"
    },
    "ar_framer": {
      "ar_gallery": "Ruys reads the ecstatic rediscovery review beside sketches of the scholar’s predicted lost phase. “Bredius saw the answer he hoped history would provide.”",
      "ar_provenance": "Ruys peers through the microscope at a bright particle taken below the first varnish. “Gettens would date the compound only after locating it in the layer.”",
      "ar_lab": "Ruys removes the frame backing and exposes fresh adhesive beneath manufactured grime. “Keating knew how to build age backward. Reconstruct the order of work.”"
    }
  },
  "story": [
    "<b>The Halberstadt Panel</b> opens after a dramatic attribution sends a newly surfaced painting toward a record sale.",
    "<b>Conservator Nel</b>, <b>Archivist Boll</b>, and <b>Framer Ruys</b> can each test a different layer of the claim: the painted object, its documentary history, and the workshop practices behind its construction.",
    "The panel may be <b>a newly recovered workshop painting completed under the named Old Master</b>, or <b>a period imitation later misattributed and promoted under the master’s name</b>. Both explanations can survive a convincing style at first glance.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and use the case notes to judge when and how the panel was made."
  ],
  "endings": {
    "overclaimWhat": "ar_masterpiece",
    "dismissalWhat": "ar_obvious",
    "win": {
      "expertTitle": "Old Wood, New Paint, Manufactured History",
      "expert": [
        "Investigator Rhea Voss identifies Anselm Roterman, the Conservation Laboratory, and a modern forgery using old wood, false records, and a pigment unavailable to the named workshop. The style is studied rather than clumsy, which is why the object survived the first look.",
        "Microscopic layer structure, material chronology, forged provenance, and workshop traces converge. The finding distinguishes a genuine workshop product from a later period imitation and then distinguishes both from modern manufacture."
      ],
      "soundTitle": "A Sound Authentication Finding",
      "sound": [
        "The object-based evidence establishes modern manufacture despite old support and convincing style.",
        "Some transaction records remain incomplete, but the material and documentary contradictions reject both historical alternatives."
      ],
      "namedTitle": "Correct Object, Thin Attribution",
      "named": [
        "The modern forgery is identified correctly, but too few WHO and WHERE clues connect the construction to the named actor and laboratory.",
        "Authentication is sound; attribution still needs a complete custody chain."
      ]
    },
    "overclaim": {
      "title": "The Workshop Rediscovery",
      "body": [
        "Voss accepts the panel as work completed under the named Old Master.",
        "A workshop attribution can explain stylistic variation, but it cannot place a later pigment and modern binding material inside original paint layers."
      ]
    },
    "dismissal": {
      "title": "The Period Imitation",
      "body": [
        "Voss treats the panel as an old imitation misattributed much later.",
        "A historical imitation could acquire a false name, but it would still use materials available in its own period. The object and the forged records were made to age together in modern time."
      ]
    },
    "wrongNames": {
      "title": "Right Authentication, Wrong Chain",
      "body": [
        "The modern forgery is recognized, but the responsible person or culminating location is wrong. Rejoin the studio, archive, and laboratory evidence."
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A painted panel, false provenance papers, and a highlighted pigment grain\"><rect x=\"112\" y=\"24\" width=\"176\" height=\"92\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.7\"/><path d=\"M128 94 C154 58,190 48,214 72 C236 92,252 64,274 44\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.3\"/><path d=\"M350 34 L482 34 L500 104 L368 104 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M368 52 L474 52 M372 68 L482 68 M376 84 L486 84\" stroke=\"#e2e2d8\" stroke-width=\"1.2\"/><circle cx=\"254\" cy=\"82\" r=\"11\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"2\"/><circle cx=\"254\" cy=\"82\" r=\"3\" fill=\"#B3261E\"/><path d=\"M265 76 L328 48\" stroke=\"#326891\" stroke-width=\"1.4\" stroke-dasharray=\"4 4\"/></svg>"
}
};
