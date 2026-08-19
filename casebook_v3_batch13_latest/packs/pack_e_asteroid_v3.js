// Casebook V3 — three informants, three readings, one clue per correct answer.
module.exports = { PACK: {
  "schemaVersion": 3,
  "mode": "three_informants_three_readings",
  "id": "e_asteroid",
  "title": "The Hollow Vale Impact",
  "discipline": "Planetary Defense & Impact Science",
  "venue": "the Hollow Vale impact inquiry",
  "agent": {
    "name": "Investigator Neve Ostrander",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Planetary-Defense Pioneers",
  "dossierName": "PLANETARY-DEFENSE PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Hollow Vale impact inquiry",
  "DAYS_TOTAL": 3,
  "teaser": "A fireball flattened a valley without a moment of warning. Was it a controlled weapon, was a confirmed detection deliberately downplayed, or did a small dark asteroid approach from the Sun through a documented blind spot in the survey?",
  "overclaimTag": "a weapon dropped from orbit",
  "truthTag": "a natural sunward impact outside survey capability",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A small asteroid approaching from the Sun direction and striking a valley\"><circle cx=\"95\" cy=\"42\" r=\"25\" fill=\"none\" stroke=\"#326891\" stroke-width=\"3\"/><path d=\"M95 7 v18 M95 59 v18 M60 42 h18 M112 42 h18 M70 17 l13 13 M107 54 l13 13 M120 17 l-13 13 M83 54 l-13 13\" stroke=\"#326891\" stroke-width=\"2\"/><path d=\"M145 44 C250 48 350 66 455 92\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"3\" stroke-dasharray=\"8 5\"/><circle cx=\"250\" cy=\"56\" r=\"7\" fill=\"#B3261E\"/><path d=\"M360 112 q70-45 140 0 t140 0\" fill=\"none\" stroke=\"#121212\" stroke-width=\"3\"/><path d=\"M470 92 l-18 20 h36z\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"3\"/></svg>",
  "overclaimTease": "An impact proves that an object arrived, not that it was observable in advance. Reconstruct the orbit, inspect the raw sky record, and test the survey against the object it actually faced.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "nofault",
      "items": [
        {
          "id": "director",
          "label": "Sabine Verhoeven — the sky-survey programme director"
        },
        {
          "id": "astronomer",
          "label": "The duty survey astronomer"
        },
        {
          "id": "nofault",
          "label": "An act of nature — an unobservable sunward approach, not a person"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "observatory",
      "items": [
        {
          "id": "crater",
          "label": "The Impact Crater & Fall Field"
        },
        {
          "id": "observatory",
          "label": "The Survey Observatory Archive"
        },
        {
          "id": "office",
          "label": "The Civil-Defence Coordination Office"
        }
      ]
    },
    "what": {
      "title": "What happened",
      "truth": "freak",
      "items": [
        {
          "id": "freak",
          "label": "A small sunward asteroid struck outside the survey’s capability"
        },
        {
          "id": "weapon",
          "label": "A controlled weapon was deliberately dropped from orbit"
        },
        {
          "id": "downplayed",
          "label": "A confirmed impact detection was downplayed and filed away"
        }
      ]
    }
  },
  "READING_ORDER": [
    "observer",
    "orbit",
    "clerk"
  ],
  "CHARACTERS": {
    "observer": {
      "name": "Night Observer Kade",
      "role": "Survey night observer",
      "face": "🔭",
      "badge": "K",
      "legend": "the pointing log",
      "hint": "The telescope covered its approved fields, while the object remained inside daytime solar avoidance.",
      "reading": "opik"
    },
    "orbit": {
      "name": "The Orbit Analyst",
      "role": "Orbit-computation analyst",
      "face": "🛰",
      "badge": "O",
      "legend": "the astrometry archive",
      "hint": "No linked pre-impact positions exist; the supposed early streak is an unrelated satellite.",
      "reading": "marsden"
    },
    "clerk": {
      "name": "The Programme Records Clerk",
      "role": "Survey-capability records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the completeness file",
      "hint": "Injection tests confirm an object of this size and geometry would not have entered the discovery stream.",
      "reading": "morrison"
    }
  },
  "TOPICS": {
    "opik": {
      "sci": "Ernst Öpik (1893-1985)",
      "topic": "Near-Earth asteroid encounters and impact probability",
      "lede": "Ernst Öpik developed a mathematical way to estimate how small bodies encounter planets long before computers could integrate millions of trial orbits.",
      "no": 1,
      "profile": "Ernst Julius Öpik was an Estonian astronomer whose career ranged from stellar structure to meteors, comets, and planetary dynamics. He worked at Tartu Observatory and later at Armagh Observatory in Northern Ireland. In the early twentieth century he recognized that some meteors arrive on orbits capable of crossing Earth’s path and developed methods for calculating the frequency and geometry of close encounters between small bodies and planets.\n\nÖpik’s encounter theory turns orbital elements into probabilities. An asteroid may cross Earth’s orbital distance yet miss the planet because it arrives at a different time, inclination, or node. Repeated planetary encounters can alter its orbit. The method helped establish near-Earth objects as a population whose risks could be treated statistically rather than as supernatural bolts.\n\nProbability does not guarantee advance discovery. Optical surveys observe reflected sunlight and usually avoid pointing close to the Sun. A small dark object approaching from the sunward side can remain at low solar elongation, hidden in daylight glare, until shortly before atmospheric entry. An orbit cannot be calculated from observations that never occur.\n\nThe Hollow Vale object followed precisely that geometry. Atmospheric and infrasound data reconstruct an ordinary natural asteroid trajectory, not a controlled orbital weapon. Backward calculations place it inside the daytime search avoidance zone during every close approach detectable from the local survey. The programme’s logged fields covered its approved night-sky region, and no unused image contains the object. Öpik’s lesson therefore permits a rare but important conclusion: the impact was physically predictable in principle but not observationally available to this ground-based network before entry. A hazard can be real without a negligent person behind it.",
      "frame": "Draws the reconstructed orbit through the bright sector around the Sun. “Crossing Earth’s path is not the same as appearing in a telescope’s night sky.”",
      "q": [
        {
          "q": "What determines whether an Earth-crossing asteroid actually encounters the planet?",
          "o": [
            {
              "t": "Its orbit needs to reach Earth’s distance at some point during a century.",
              "v": "partial",
              "fb": "Crossing distance creates possibility, while timing and geometry determine the actual meeting."
            },
            {
              "t": "Its timing, node, inclination, and planetary position must coincide in space and time.",
              "v": "expert",
              "fb": "An encounter requires geometric and temporal alignment, not merely overlapping orbital distances."
            },
            {
              "t": "Its diameter alone determines whether the paths intersect during one passage.",
              "v": "wrong",
              "fb": "Size affects brightness and consequences but does not by itself set encounter geometry."
            },
            {
              "t": "Any object that crosses Earth’s orbital radius should have been visible for months.",
              "v": "danger",
              "fb": "Sunward approach and faintness can prevent long-warning optical discovery."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — lead",
            "text": "The reconstructed orbit approaches from low solar elongation, keeping the object in daylight glare until atmospheric entry."
          }
        },
        {
          "q": "Which evidence distinguishes a natural asteroid from an orbital weapon?",
          "o": [
            {
              "t": "No government publicly claimed responsibility during the first day after impact.",
              "v": "wrong",
              "fb": "Silence by governments is weak compared with physical trajectory and material evidence."
            },
            {
              "t": "Any object arriving from space should be classified as a weapon until disproved.",
              "v": "danger",
              "fb": "Origin should follow measurable dynamics rather than a presumption based on fear."
            },
            {
              "t": "A natural heliocentric orbit fits without propulsion or manufactured debris.",
              "v": "expert",
              "fb": "Orbital dynamics and recovered composition directly test natural versus engineered origin."
            },
            {
              "t": "The explosion was larger than any conventional weapon used in the region.",
              "v": "partial",
              "fb": "Energy scale alone cannot distinguish a natural impact from a hypothetical weapon."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — lead",
            "text": "Trajectory, entry velocity, fragmentation, and composition match a natural small body without controlled maneuvers or artificial material."
          }
        },
        {
          "q": "Where should the network’s opportunity to detect the object be evaluated?",
          "o": [
            {
              "t": "Inside the civil-defence office, where evacuation plans were stored after the event.",
              "v": "wrong",
              "fb": "Response planning does not determine whether photons reached a survey camera."
            },
            {
              "t": "By assuming one ground telescope can observe every part of the sky continuously in all seasons.",
              "v": "danger",
              "fb": "Daylight, weather, horizon, and solar avoidance create real observational limits."
            },
            {
              "t": "At the impact crater, because damage size reveals when telescopes should have seen it.",
              "v": "partial",
              "fb": "Crater energy constrains size but not the earlier visibility geometry by itself."
            },
            {
              "t": "Against the observatory’s actual fields, limiting brightness, cadence, and Sun constraints.",
              "v": "expert",
              "fb": "Detection opportunity depends on where and how deeply the survey actually observed."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — lead",
            "text": "Survey pointing logs and limiting depths at the observatory show complete approved coverage outside the Sun-avoidance region."
          }
        }
      ]
    },
    "marsden": {
      "sci": "Brian Marsden (1937-2010)",
      "topic": "Orbit determination and the Minor Planet Center",
      "lede": "Brian Marsden turned scattered asteroid observations into orbits, warnings, and a durable international record of what the sky had actually shown.",
      "no": 2,
      "profile": "Brian G. Marsden was a British-born astronomer who spent most of his career at the Harvard-Smithsonian Center for Astrophysics and directed the Minor Planet Center. The MPC receives positional measurements of asteroids and comets from observatories around the world, links observations belonging to the same object, calculates preliminary orbits, and publishes information that allows follow-up.\n\nOrbit determination begins with angular positions at known times. A short observational arc can fit many possible distances and velocities, so early predictions may have large uncertainty regions. Additional measurements extend the arc and sharply improve the orbit. If an object is detected only once or near the survey limit, it may be lost before enough follow-up is obtained. Conversely, no orbit can be “buried” if the claimed original detections are absent from images and submission logs.\n\nMarsden was known for taking possible hazards seriously while also revising claims as data improved. His work illustrates the difference between an uncertain warning and evidence that no usable observation existed. Investigators should search raw images, source catalogs, rejected detections, correspondence, and MPC submissions, not merely final public notices.\n\nAt Hollow Vale, the alleged pre-impact detection dissolves under that audit. A streak in one archived frame is a satellite trail at a different time and direction. The object’s reconstructed brightness would have remained below the frame limit and too close to the Sun. No linked positions exist from which an orbit or warning could have been calculated. Marsden’s method therefore weighs against the story that a programme director downplayed a known collision course. The programme possessed no observational arc to downplay. The decisive records at the survey observatory document absence in the only scientifically meaningful sense: the object never entered a usable night-sky data stream.",
      "frame": "Aligns raw frames, rejected detections, and MPC submissions. “A warning needs positions through time. One suspicious streak is not an orbit.”",
      "q": [
        {
          "q": "Why is a short observational arc often insufficient for a reliable asteroid orbit?",
          "o": [
            {
              "t": "Many combinations of distance and velocity can fit a few angular measurements.",
              "v": "expert",
              "fb": "Additional timed positions constrain the range of trajectories compatible with the observations."
            },
            {
              "t": "One isolated image is enough to prove a collision course if the streak looks unusual.",
              "v": "danger",
              "fb": "An unusual image feature needs identification and follow-up before it becomes an orbit."
            },
            {
              "t": "Asteroids change their physical diameter rapidly during each close approach.",
              "v": "partial",
              "fb": "Apparent size changes with distance, but that is not why short arcs are dynamically ambiguous."
            },
            {
              "t": "Orbit calculations require a recovered meteorite before any prediction is possible.",
              "v": "wrong",
              "fb": "Orbit determination relies on astrometry and does not require a post-impact sample."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — corroboration",
            "text": "No sequence of positions exists; the supposed early detection is an unrelated satellite streak that cannot define the impactor’s orbit."
          }
        },
        {
          "q": "What record would reveal that a known hazard was deliberately downplayed?",
          "o": [
            {
              "t": "Any rejected image detection, regardless of object identity or measurement quality.",
              "v": "danger",
              "fb": "Rejected artifacts are not hidden hazards unless they contain valid observations of the object."
            },
            {
              "t": "Usable astrometry and an internal orbit assessment absent from the public warning chain.",
              "v": "expert",
              "fb": "Suppression requires evidence that a real assessment existed and was withheld."
            },
            {
              "t": "A general budget memo noting that more sky coverage would improve future surveys.",
              "v": "partial",
              "fb": "A funding concern establishes capability limits, not concealment of this specific object."
            },
            {
              "t": "A public interview where the director calls asteroid impacts statistically rare but possible.",
              "v": "wrong",
              "fb": "General risk communication cannot substitute for a missing pre-impact orbit record."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — corroboration",
            "text": "The observatory archive contains no linked astrometry, orbit solution, or hazard correspondence for the impactor before entry."
          }
        },
        {
          "q": "Who is responsible when no usable observations entered the network despite compliant coverage?",
          "o": [
            {
              "t": "The duty astronomer, because every missed natural object occurs during someone’s shift.",
              "v": "partial",
              "fb": "Shift presence does not create an opportunity when the target is below limits and in daylight glare."
            },
            {
              "t": "The civil-defence official, because the impact caused damage within that jurisdiction.",
              "v": "wrong",
              "fb": "Jurisdiction over consequences does not create responsibility for impossible advance observation."
            },
            {
              "t": "No listed person, if the object never entered the scientifically available data stream.",
              "v": "expert",
              "fb": "Responsibility requires a missed duty or usable opportunity, neither of which the records show."
            },
            {
              "t": "The programme director, because a survey should detect every hazardous body in the sky.",
              "v": "danger",
              "fb": "No survey can guarantee full-time coverage of every size, direction, and solar elongation."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — corroboration",
            "text": "The evidence supports no culpable candidate: the object remained outside the survey’s observable geometry until impact."
          }
        }
      ]
    },
    "morrison": {
      "sci": "David Morrison (b. 1940)",
      "topic": "Planetary defense, survey completeness, and residual risk",
      "lede": "David Morrison helped frame asteroid defense as a survey problem with measurable completeness rather than a promise that every impactor will be found.",
      "no": 3,
      "profile": "David Morrison is an American planetary scientist who has worked on the Solar System, impact hazards, and the public communication of scientific risk. He chaired the 1992 NASA study that helped define the “Spaceguard” goal of discovering large near-Earth objects whose impacts could cause global catastrophe. That programme encouraged systematic surveys, orbit cataloging, and international attention to planetary defense.\n\nSurvey completeness is always conditional. It depends on object size and albedo, sky coverage, cadence, weather, limiting magnitude, and approach direction. Large objects are generally easier to discover long before impact; small bodies can remain undetected, especially when approaching from the Sun. A percentage-complete catalog is therefore not a guarantee against every local airburst.\n\nMorrison also emphasized communicating risk without sensationalism. A low-probability hazard can matter, but uncertain observations should not be presented as certain impacts. Likewise, an actual impact does not retroactively prove that somebody possessed actionable warning. A fair review asks whether the survey met its defined objective and whether the specific object was discoverable within it.\n\nHollow Vale was caused by a small, dark body below the programme’s completeness target. Its sunward geometry eliminated night-time discovery opportunities during the final approach. Audit simulations insert artificial objects of the same brightness into the logged images: none would have been recovered before entry. The survey was not complete for this class, but it did not claim to be, and no official removed an existing warning. Morrison’s framework supports an uncomfortable but scientifically honest verdict. Planetary defense reduces risk through better coverage; it cannot make residual risk vanish. This impact was the residual case—natural, rare, and outside the documented capability of the network available that night.",
      "frame": "Places the survey’s published completeness curve beside the reconstructed object size and approach. “A target defines what a programme promises. It is not a charm against everything smaller.”",
      "q": [
        {
          "q": "What does survey completeness mean in planetary defense?",
          "o": [
            {
              "t": "The percentage of the entire sky photographed at least once by any telescope.",
              "v": "partial",
              "fb": "One-time imaging omits depth, motion linking, cadence, and the defined object population."
            },
            {
              "t": "A guarantee that no undiscovered asteroid can strike within the covered region.",
              "v": "wrong",
              "fb": "Incomplete residual populations remain even in successful survey programmes."
            },
            {
              "t": "A public-relations number that should be ignored after any impact occurs.",
              "v": "danger",
              "fb": "An impact tests the limits of the metric but does not make documented capability meaningless."
            },
            {
              "t": "The fraction of a defined object population detectable under stated survey conditions.",
              "v": "expert",
              "fb": "Completeness belongs to a specified size, brightness, cadence, geometry, and detection system."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — decisive",
            "text": "The survey observatory’s published completeness target, injection tests, and pointing history define the actual capability available before impact."
          }
        },
        {
          "q": "Why does an actual impact not prove that officials ignored a warning?",
          "o": [
            {
              "t": "Actionable responsibility requires evidence that a usable detection and assessment existed.",
              "v": "expert",
              "fb": "The causal question is whether actionable information existed and whether duties were breached."
            },
            {
              "t": "Natural events do not create duties for surveys, analysts, or civil-defence agencies.",
              "v": "wrong",
              "fb": "Natural hazards still require reasonable planning and response where information is available."
            },
            {
              "t": "Severe consequences are enough to infer that somebody concealed advance knowledge.",
              "v": "danger",
              "fb": "Harm cannot substitute for evidence of prior knowledge or opportunity."
            },
            {
              "t": "Officials are responsible chiefly for impacts larger than the programme’s formal target.",
              "v": "partial",
              "fb": "Targets define capability, but officials may still have duties for detected smaller objects."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — decisive",
            "text": "No valid pre-impact observation, orbit, or warning existed for any official to suppress or mishandle."
          }
        },
        {
          "q": "What complete explanation best fits Hollow Vale?",
          "o": [
            {
              "t": "A controlled orbital weapon imitated a natural trajectory and meteorite composition.",
              "v": "wrong",
              "fb": "The recovered dynamics and materials do not require an engineered object."
            },
            {
              "t": "Residual survey risk produced a natural impact with no usable advance detection.",
              "v": "expert",
              "fb": "Geometry, brightness, archive tests, and absence of astrometry support the residual-risk event."
            },
            {
              "t": "A defunded survey filed away a confirmed collision course to avoid public alarm.",
              "v": "danger",
              "fb": "The archive contains no confirmed course or internal warning that could have been buried."
            },
            {
              "t": "A known object was judged low risk because its early orbit carried large uncertainty.",
              "v": "partial",
              "fb": "No early orbit existed in this case, so uncertainty was not the reason warning failed."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — decisive",
            "text": "A small dark asteroid approached from the Sun, remained below documented survey capability, and struck without an actionable observing arc."
          }
        }
      ]
    }
  },
  "story": [
    "<b>A fireball flattened Hollow Vale without any public warning or known pre-impact orbit.</b>",
    "Night Observer Kade holds the pointing and limiting-depth record. The Orbit Analyst can test every claimed detection. The programme clerk has completeness targets and injection simulations.",
    "The object may have been a weapon, a known hazard that officials downplayed, or a small natural body that approached from a geometry the ground survey could not observe.",
    "Nine clues ask whether actionable information ever existed before the impact and what the network was actually capable of seeing."
  ],
  "endings": {
    "overclaimWhat": "weapon",
    "dismissalWhat": "downplayed",
    "win": {
      "expertTitle": "The Residual Risk From the Sun",
      "expert": [
        "You connect no culpable actor, the Survey Observatory Archive, and a small sunward asteroid that remained outside the network’s documented capability. Orbit reconstruction, image audit, and injection tests agree.",
        "The object was not an engineered weapon, but neither was a confirmed warning suppressed. No usable astrometric arc existed before entry; the impact occupied a known residual blind spot in ground-based surveys."
      ],
      "soundTitle": "The Unobservable Approach",
      "sound": [
        "Your accusation identifies the observatory record, the no-fault geometry, and the residual-risk impact.",
        "Some orbit or completeness details remain incomplete, but the absence of usable observations supports the finding."
      ],
      "namedTitle": "Right Event, Limited Orbit",
      "named": [
        "You select the correct WHO, WHERE, and WHAT.",
        "The conclusion is right, although missed clues leave the solar-geometry or detection-limit case less fully quantified."
      ]
    },
    "overclaim": {
      "title": "The Trajectory and Material Are Natural",
      "body": [
        "Reconstructed motion follows a heliocentric small-body orbit, and recovered fragments show ordinary meteoritic composition without controlled maneuvers.",
        "A weapon theory adds machinery unsupported by the physical evidence."
      ]
    },
    "dismissal": {
      "title": "There Was No Warning to Bury",
      "body": [
        "Raw images, rejected detections, MPC submissions, and correspondence contain no valid pre-impact observations of the object.",
        "Capability limits are real, but they are not evidence that a known collision course was suppressed."
      ]
    },
    "wrongNames": {
      "title": "The Blind Spot, Mislocated",
      "body": [
        "You recognize the unobservable approach but place it away from the observatory archive and capability tests that establish the no-fault result."
      ]
    }
  }
}
};
