// Casebook V3 — three informants, three readings, one clue per correct answer.
module.exports = { PACK: {
  "schemaVersion": 3,
  "mode": "three_informants_three_readings",
  "id": "c_art",
  "title": "The Halberstadt Panel",
  "discipline": "Art History & Authentication",
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
  "DAYS_TOTAL": 3,
  "teaser": "A crude-looking panel revealed a remarkable image beneath its dark surface. Is it a sophisticated forgery assembled from old materials, a genuine period work hidden by later overpaint, or an obvious decorative copy inflated by the market?",
  "overclaimTag": "a manufactured Old Master",
  "truthTag": "a genuine panel beneath later paint",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"An old painted panel examined under microscopy and archival light\"><rect x=\"70\" y=\"20\" width=\"190\" height=\"100\" fill=\"none\" stroke=\"#121212\" stroke-width=\"3\"/><path d=\"M90 95 q45-62 88 0 q25-42 62 0\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2\"/><circle cx=\"380\" cy=\"58\" r=\"32\" fill=\"none\" stroke=\"#121212\" stroke-width=\"3\"/><path d=\"M402 82 l38 35\" stroke=\"#121212\" stroke-width=\"6\"/><g fill=\"#B3261E\"><circle cx=\"365\" cy=\"52\" r=\"4\"/><circle cx=\"381\" cy=\"65\" r=\"3\"/><circle cx=\"394\" cy=\"47\" r=\"4\"/></g><rect x=\"500\" y=\"28\" width=\"105\" height=\"82\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><path d=\"M520 48 h65 M520 66 h65 M520 84 h45\" stroke=\"#e2e2d8\" stroke-width=\"2\"/></svg>",
  "overclaimTease": "The visible image may not be the original campaign. Separate layers before dating pigments, and require visual, material, structural, and documentary evidence to agree.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "ar_restorer",
      "items": [
        {
          "id": "ar_restorer",
          "label": "Anselm Roterman — the panel restorer"
        },
        {
          "id": "ar_dealer",
          "label": "Emile Vasse — the gallery dealer"
        },
        {
          "id": "ar_curator",
          "label": "Dr. Halvard — the museum connoisseur"
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
      "title": "What happened",
      "truth": "ar_masterpiece",
      "items": [
        {
          "id": "ar_forgery",
          "label": "A sophisticated modern forgery was built from old materials"
        },
        {
          "id": "ar_masterpiece",
          "label": "A genuine period panel survived beneath a later overpaint"
        },
        {
          "id": "ar_obvious",
          "label": "A clumsy decorative copy was mistaken for serious art"
        }
      ]
    }
  },
  "READING_ORDER": [
    "ar_conservator",
    "ar_archivist",
    "ar_framer"
  ],
  "CHARACTERS": {
    "ar_conservator": {
      "name": "Conservator Nel",
      "role": "Paintings conservator",
      "face": "🔬",
      "badge": "N",
      "legend": "the revealed underlayer",
      "hint": "The awkward visible surface belongs to later overpaint; original details continue beneath it.",
      "reading": "ar_morelli"
    },
    "ar_archivist": {
      "name": "Archivist Boll",
      "role": "Technical-provenance archivist",
      "face": "🗂",
      "badge": "B",
      "legend": "the sample register",
      "hint": "Modern pigments occur only in later restoration, while original materials fit the claimed period.",
      "reading": "ar_mccrone"
    },
    "ar_framer": {
      "name": "Framer Ruys",
      "role": "Frame and support specialist",
      "face": "🖼",
      "badge": "R",
      "legend": "the panel structure",
      "hint": "Old frame coverage, oak dating, and ground layers agree with the earlier paint campaign.",
      "reading": "ar_stout"
    }
  },
  "TOPICS": {
    "ar_morelli": {
      "sci": "Giovanni Morelli (1816-1891)",
      "topic": "The Morellian method and involuntary detail",
      "lede": "Giovanni Morelli looked past dramatic faces and poses to the small anatomical habits an imitator was least likely to copy consciously.",
      "no": 1,
      "profile": "Giovanni Morelli was an Italian physician, politician, and art connoisseur who developed an influential method for attributing Renaissance paintings. He argued that obvious features—subject, composition, expression, and grand gestures—are precisely what pupils, copyists, and forgers study most carefully. More revealing are minor forms an artist repeats almost unconsciously: the shape of ears, fingernails, fingers, or folds.\n\nMorelli published many of his judgments under a pseudonym and used comparative drawings to show recurring details across works. His method helped shift connoisseurship from general impression toward explicit visual comparison, although later scholars have criticized overconfidence and the tendency to treat workshop practice as one individual’s fixed signature. A small form is evidence only when it appears consistently and agrees with materials, provenance, and broader style.\n\nThe Halberstadt Panel presents exactly that challenge. Its surface seems awkward because a nineteenth-century overpaint flattened faces, darkened architecture, and redrew hands to suit later taste. During cleaning, Conservator Nel uncovered an earlier paint layer whose ear contours, knuckle rhythms, and underdrawn drapery align with securely attributed works from the Halberstadt master’s workshop. Those details continue beneath losses and old repairs, making them difficult to add as a modern performance.\n\nMorelli’s lesson therefore cuts against both easy dismissals. The panel is not an obvious daub merely because its visible surface was clumsy, and close stylistic resemblance does not alone prove a sophisticated forgery. The decisive pattern lies in involuntary forms distributed through the original layer, then tested against material evidence. The person who recognized and exposed that layer was Anselm Roterman, the restorer who stopped cleaning when the older hand emerged and transferred the panel to the conservation laboratory.",
      "frame": "Places infrared images beside details revealed under the overpaint. “The obvious surface belongs to a later decorator. The older hand repeats itself where nobody was meant to notice.”",
      "q": [
        {
          "q": "What kind of feature did Morelli consider especially useful for attribution?",
          "o": [
            {
              "t": "The painting’s famous subject and the emotional force of its main figure.",
              "v": "partial",
              "fb": "Subject and expression are conspicuous features that copyists often study carefully."
            },
            {
              "t": "Any single unusual brushstroke found near the edge of the wooden support.",
              "v": "wrong",
              "fb": "One isolated mark has little attributive force without repetition and context."
            },
            {
              "t": "A resemblance noticed by one respected connoisseur, without material testing.",
              "v": "danger",
              "fb": "Connoisseurship becomes stronger when visual judgment is tested against independent evidence."
            },
            {
              "t": "Small habitual forms an imitator is less likely to reproduce consciously.",
              "v": "expert",
              "fb": "Morelli emphasized repeated minor details that may escape conscious imitation."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — lead",
            "text": "Minor anatomical habits recur across the original underlayer and authenticated works, contradicting the visible overpaint’s clumsy appearance."
          }
        },
        {
          "q": "Why does later overpaint complicate attribution?",
          "o": [
            {
              "t": "It can conceal original forms and introduce stylistic features from another period.",
              "v": "expert",
              "fb": "Restoration history can mask the hand and appearance of the original painter."
            },
            {
              "t": "It converts every original pigment chemically into a modern synthetic material today.",
              "v": "wrong",
              "fb": "Overpaint covers or interacts with pigments without replacing every original material."
            },
            {
              "t": "It establishes the underlying work as fraudulent because authentic paintings remain unaltered.",
              "v": "danger",
              "fb": "Old paintings are often altered; the task is to separate campaigns rather than assume fraud."
            },
            {
              "t": "It changes the panel’s dimensions so historical measurements and frame records become unusable.",
              "v": "partial",
              "fb": "Physical alterations may affect size, but the main issue is the obscured image layer."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — lead",
            "text": "Cross-sections and infrared imaging at the treatment bench separate the clumsy surface from the coherent original layer beneath."
          }
        },
        {
          "q": "Who first created the evidence needed to distinguish the two paint campaigns?",
          "o": [
            {
              "t": "The museum connoisseur who had seen the darkened surface through photographs.",
              "v": "wrong",
              "fb": "A photographic opinion preceded access to the revealing underlayer."
            },
            {
              "t": "The restorer who exposed and documented the underlying layer during treatment.",
              "v": "expert",
              "fb": "The treatment record identifies the person who recognized and preserved the material distinction."
            },
            {
              "t": "The unknown original painter, because authorship makes later investigation unnecessary.",
              "v": "danger",
              "fb": "Authorship remains the question; it cannot replace the evidence used to establish it."
            },
            {
              "t": "The gallery dealer who advertised the panel before technical examination.",
              "v": "partial",
              "fb": "Marketing introduced the object but did not create the technical evidence."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — lead",
            "text": "Anselm Roterman halted cleaning, documented the boundary, and requested cross-sections when the earlier hand appeared."
          }
        }
      ]
    },
    "ar_mccrone": {
      "sci": "Walter McCrone (1916-2002)",
      "topic": "Polarized-light microscopy of pigments",
      "lede": "Walter McCrone used tiny pigment particles to test grand claims about the age and origin of artworks and artifacts.",
      "no": 2,
      "profile": "Walter McCrone was an American microscopist who championed polarized-light microscopy as a powerful tool for identifying particles. At the McCrone Research Institute in Chicago, he trained scientists to examine crystal form, refractive behavior, color, and optical properties in samples far smaller than a pinhead. His work reached art, archaeology, forensics, and industrial materials.\n\nPigments have histories. Natural ultramarine from lapis lazuli, lead white, vermilion, azurite, earth colors, and later synthetic pigments entered artists’ palettes at different times and places. Finding titanium white in an untouched original layer of a supposed medieval painting would be strongly anachronistic. But interpretation depends on stratigraphy. A modern pigment in varnish, restoration, or surface contamination does not date the underlying image.\n\nMcCrone became publicly associated with contentious investigations, including the Vinland Map and the Shroud of Turin. Whether every conclusion persuaded every scholar, his methodological lesson remained clear: identify what particle was sampled, where it sat in the layer sequence, and whether the result can be independently repeated.\n\nThe Halberstadt samples show modern zinc and titanium pigments only in the later overpaint. Beneath it, the original passages contain historically appropriate lead white, azurite, vermilion, and copper green, with alteration products expected from age. No modern binder appears in the lower layer. A forger could choose old-looking colors, but reproducing aged reaction products beneath a documented nineteenth-century campaign would require a far more elaborate history than the object’s material sequence supports. McCrone’s microscope does not name the master by itself; it rules out the supposed anachronistic tell and confirms that the layer Roterman uncovered could genuinely belong to the claimed period.",
      "frame": "Rotates pigment grains under crossed polarizers and points to the layer chart. “Modern color is present—above the old painting. Sampling without stratigraphy would accuse the wrong century.”",
      "q": [
        {
          "q": "Why must pigment identification be tied to its layer position?",
          "o": [
            {
              "t": "One modern particle anywhere on the object establishes the entire work as forged.",
              "v": "danger",
              "fb": "A modern particle is meaningful only after its origin and layer are established."
            },
            {
              "t": "Pigment names vary between laboratories even when the particles are identical.",
              "v": "partial",
              "fb": "Terminology matters, but physical position is the key chronological evidence here."
            },
            {
              "t": "Restoration pigments can be modern while the underlying painting remains old.",
              "v": "expert",
              "fb": "Stratigraphy distinguishes original material from later repair, varnish, or contamination."
            },
            {
              "t": "Every layer in a painting is normally applied during the same working session.",
              "v": "wrong",
              "fb": "Paintings accumulate varnish, retouching, and restoration across many campaigns."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — corroboration",
            "text": "Modern pigments belong only to the later overpaint; the original layer contains period materials and age-consistent alteration."
          }
        },
        {
          "q": "Which result would be strongest evidence of a modern forgery?",
          "o": [
            {
              "t": "A dealer refusing to describe the painting’s style in the laboratory report.",
              "v": "danger",
              "fb": "Dealer behavior may raise questions but cannot substitute for material chronology."
            },
            {
              "t": "A synthetic pigment confined to documented twentieth-century retouching layers.",
              "v": "partial",
              "fb": "Later retouching can legitimately contain modern materials and does not date the original."
            },
            {
              "t": "Natural ultramarine appearing in a blue passage from the original layer.",
              "v": "wrong",
              "fb": "Natural ultramarine is compatible with historical painting and is not an anachronism."
            },
            {
              "t": "A modern pigment consistently embedded in intact original layers across samples.",
              "v": "expert",
              "fb": "Repeated anachronistic material within the original campaign would directly conflict with the claimed date."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — corroboration",
            "text": "Laboratory cross-sections place no anachronistic pigment or binder in the untouched original paint sequence."
          }
        },
        {
          "q": "Which person’s action preserved the layer sequence needed for reliable sampling?",
          "o": [
            {
              "t": "The restorer who halted treatment and documented the cross-section locations.",
              "v": "expert",
              "fb": "Careful treatment and sampling records protect the provenance of the technical evidence."
            },
            {
              "t": "The dealer who arranged rapid surface cleaning before the approaching auction deadline.",
              "v": "partial",
              "fb": "Rapid cleaning risks blending or destroying the very sequence under investigation."
            },
            {
              "t": "The connoisseur who requested high-resolution visible-light photographs without sampling.",
              "v": "wrong",
              "fb": "Visible photographs cannot preserve microscopic layer relationships by themselves."
            },
            {
              "t": "The buyer who preferred a dramatic authenticity claim before testing was complete.",
              "v": "danger",
              "fb": "Market enthusiasm creates pressure rather than reliable evidence handling."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — corroboration",
            "text": "Roterman stopped solvent work before the boundary was erased and recorded each sample location."
          }
        }
      ]
    },
    "ar_stout": {
      "sci": "George L. Stout (1897-1978)",
      "topic": "Conservation science and the material biography of paintings",
      "lede": "George Stout treated a painting as a layered physical history whose repairs, supports, and surfaces must be understood before aesthetic judgment.",
      "no": 3,
      "profile": "George Leslie Stout was an American paintings conservator and one of the founders of modern conservation practice in the United States. At Harvard’s Fogg Art Museum, he worked with art historian Edward W. Forbes to study pigments, binders, supports, and deterioration. Stout helped establish technical conservation as a profession joining craft skill, documentation, chemistry, and art history.\n\nDuring the Second World War he served with the Monuments, Fine Arts, and Archives programme—the “Monuments Men”—helping recover and protect European cultural property. His later leadership at museums emphasized careful examination and records. Cleaning is not simply making a picture brighter. Solvents can remove original glazes as well as discolored varnish; structural treatment can alter evidence on the reverse; and every intervention should be documented and, where possible, reversible.\n\nA painting’s material biography includes its wooden support, ground, underdrawing, paint, varnish, repairs, labels, tool marks, and environmental damage. These elements can corroborate age and provenance. Dendrochronology can establish the earliest possible date of a panel, while old insect channels, ground preparation, and craquelure may show whether layers aged together.\n\nThe Halberstadt Panel’s support comes from oak felled in a range consistent with the proposed workshop, and the original ground extends beneath edges covered by a frame fitted centuries ago. Infrared imaging reveals an underdrawing with revisions rather than a mechanical copy. The later overpaint explains the crude visible style and contains the modern materials that first aroused suspicion. Stout’s whole-object method therefore supports the surprising conclusion: the spectacular answer is correct. Roterman did not manufacture a masterpiece; he found one beneath an old intervention, preserved the evidence, and moved the object into the laboratory where visual, material, and archival histories finally agreed.",
      "frame": "Turns the panel edge, reverse, X-radiograph, and treatment diary into one sequence. “Authenticity is not one pigment or one eye. It is a biography whose layers agree.”",
      "q": [
        {
          "q": "What does conservation science add to stylistic attribution?",
          "o": [
            {
              "t": "A method for making every old painting look close to its original appearance.",
              "v": "partial",
              "fb": "Appearance may improve, but conservation prioritizes evidence and stability over cosmetic restoration."
            },
            {
              "t": "A material and treatment history that can corroborate or contradict visual judgment.",
              "v": "expert",
              "fb": "Technical evidence tests chronology and construction while remaining linked to art-historical comparison."
            },
            {
              "t": "A guarantee that scientific tests can identify the individual artist without context.",
              "v": "wrong",
              "fb": "Materials can narrow date and process without always naming one painter."
            },
            {
              "t": "Permission to remove all later layers whenever they seem aesthetically inferior.",
              "v": "danger",
              "fb": "Later layers may have historical value and should not be removed without careful justification."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — decisive",
            "text": "Support, ground, underdrawing, cross-sections, and treatment history converge in the imaging-and-treatment record."
          }
        },
        {
          "q": "Which combined evidence best supports a genuine old panel beneath later overpaint?",
          "o": [
            {
              "t": "The seller’s price estimate assumes the panel will receive a prestigious attribution.",
              "v": "wrong",
              "fb": "Market valuation depends on attribution and cannot establish it."
            },
            {
              "t": "One dramatic laboratory result is accepted even when the rest of the object conflicts.",
              "v": "danger",
              "fb": "A single test can be contaminated, mislocated, or misunderstood without whole-object agreement."
            },
            {
              "t": "Independent material, structural, visual, and provenance indicators share one chronology.",
              "v": "expert",
              "fb": "Authenticity becomes strongest when independent evidence produced by different processes converges."
            },
            {
              "t": "The cleaned image resembles a famous masterpiece more strongly than before treatment.",
              "v": "partial",
              "fb": "Resemblance can prompt inquiry but remains vulnerable to imitation and expectation."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — decisive",
            "text": "Period pigments, age-consistent support, revised underdrawing, old frame coverage, and coherent Morellian details all agree."
          }
        },
        {
          "q": "Who is most directly associated with the responsible discovery rather than manufacture of the panel?",
          "o": [
            {
              "t": "The museum connoisseur who initially dismissed the darkened surface as provincial.",
              "v": "wrong",
              "fb": "An early mistaken visual judgment was revised only after technical access improved."
            },
            {
              "t": "A deceased painter, because a genuine Old Master should not have a modern discoverer.",
              "v": "danger",
              "fb": "Rediscovery is a modern act even when the artwork itself is centuries old."
            },
            {
              "t": "The dealer who promoted the object as important after the first cleaning photograph.",
              "v": "partial",
              "fb": "Promotion followed discovery and did not establish the material sequence."
            },
            {
              "t": "The restorer who exposed the layer cautiously and preserved it for examination.",
              "v": "expert",
              "fb": "The records identify the person whose intervention revealed rather than created the evidence."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — decisive",
            "text": "Roterman’s treatment diary documents the stopping point, discovery of the original layer, and immediate transfer for independent testing."
          }
        }
      ]
    }
  },
  "story": [
    "<b>A dark, awkward panel sold cheaply, then revealed a far more accomplished image during conservation.</b>",
    "Conservator Nel can compare telltale forms. Archivist Boll holds the pigment and layer record. Framer Ruys can read the support, frame, and underdrawing history.",
    "The panel may be a sophisticated forgery, a genuine old work hidden beneath later overpaint, or merely a clumsy copy receiving too much attention.",
    "Nine clues test whether visual, material, and structural histories belong to one authentic painting—and who revealed rather than manufactured it."
  ],
  "endings": {
    "overclaimWhat": "ar_forgery",
    "dismissalWhat": "ar_obvious",
    "win": {
      "expertTitle": "The Masterpiece Beneath the Overpaint",
      "expert": [
        "You connect Anselm Roterman, the Conservation Laboratory, and a genuine period panel surviving beneath later overpaint. Telltale details, layer-specific pigments, support history, underdrawing, and treatment records agree.",
        "The work was not a sophisticated modern forgery, and the clumsy visible surface was not the original painting. Roterman’s careful intervention revealed and preserved an authentic earlier campaign."
      ],
      "soundTitle": "The Genuine Underlayer",
      "sound": [
        "Your accusation identifies the restorer, the laboratory, and the authentic panel beneath overpaint.",
        "Some material or attribution details remain incomplete, but the independent chronology supports the finding."
      ],
      "namedTitle": "Right Work, Limited Attribution",
      "named": [
        "You select the correct WHO, WHERE, and WHAT.",
        "The conclusion is right, although missed clues leave the precise workshop attribution or treatment history less fully established."
      ]
    },
    "overclaim": {
      "title": "The Modern Pigments Belong to Restoration",
      "body": [
        "Cross-sections place zinc and titanium pigments above the original layer, while the lower campaign contains period materials and age-consistent alteration.",
        "Calling the whole object a forgery mistakes a later intervention for the work it covered."
      ]
    },
    "dismissal": {
      "title": "The Clumsy Surface Was Not the Original Hand",
      "body": [
        "Infrared imaging and cleaning reveal coherent underdrawing and repeated workshop details beneath the overpaint.",
        "Dismissing the panel as an obvious daub ignores the older material sequence now exposed."
      ]
    },
    "wrongNames": {
      "title": "The Authentic Panel, Misassigned",
      "body": [
        "You recognize the genuine underlayer but place discovery or culmination away from Roterman and the conservation laboratory that preserved the evidence."
      ]
    }
  }
}
};
