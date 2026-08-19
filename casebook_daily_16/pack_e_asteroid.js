module.exports = { PACK: {
  "id": "e_asteroid",
  "title": "The Hollow Vale Impact",
  "discipline": "Planetary Defense & Impact Science",
  "teaser": "A fireball flattened a valley without a moment's warning. A weapon fallen from orbit? A once-in-an-age freak of the heavens? Or a rock that was seen coming and quietly filed away?",
  "overclaimTag": "a weapon from orbit",
  "truthTag": "a downplayed impact detection",
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
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before the inquiry closes. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The WHERE you test determines the dossier you receive, and the conversation costs one day.",
  "overclaimTease": "A weapon supplies purpose to the fireball; purpose must be proved, not projected.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "director",
      "items": [
        {
          "id": "director",
          "label": "Sabine Verhoeven — sky-survey programme director"
        },
        {
          "id": "astronomer",
          "label": "The duty astronomer"
        },
        {
          "id": "official",
          "label": "The civil-defence official"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "office",
      "items": [
        {
          "id": "crater",
          "label": "The Impact Crater & Fall Field"
        },
        {
          "id": "observatory",
          "label": "The Survey Observatory"
        },
        {
          "id": "office",
          "label": "The Survey Programme Office"
        }
      ]
    },
    "what": {
      "title": "What is happening",
      "truth": "downplayed",
      "items": [
        {
          "id": "weapon",
          "label": "A weapon dropped from orbit"
        },
        {
          "id": "freak",
          "label": "A freak bolt from the blue — an act of God"
        },
        {
          "id": "downplayed",
          "label": "A downplayed detection & a defunded sky survey"
        }
      ]
    }
  },
  "PLACES": {
    "crater": {
      "name": "The Impact Crater & Fall Field",
      "xy": [
        140,
        90
      ]
    },
    "observatory": {
      "name": "The Survey Observatory",
      "xy": [
        330,
        240
      ]
    },
    "office": {
      "name": "The Survey Programme Office",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "crater",
      "observatory"
    ],
    [
      "observatory",
      "office"
    ]
  ],
  "CHARACTERS": {
    "observer": {
      "name": "Night Observer Kade",
      "role": "Survey night observer",
      "face": "🔭",
      "badge": "K",
      "legend": "the observatory",
      "hint": "Ran the sky survey; the object was on the plates before it fell."
    },
    "orbit": {
      "name": "The Orbit Analyst",
      "role": "Orbit-computation analyst",
      "face": "🛰",
      "badge": "O",
      "legend": "the data room",
      "hint": "Ran the numbers; the collision course was flagged and then walked back."
    },
    "clerk": {
      "name": "The Clerk",
      "role": "Programme-office clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the office",
      "hint": "Keeps the survey logs — and the funding cut that blinded the sky watch."
    }
  },
  "TOPICMAP": {
    "crater": {
      "observer": [
        "chladni"
      ],
      "orbit": [
        "opik"
      ],
      "clerk": [
        "whipple"
      ]
    },
    "observatory": {
      "observer": [
        "baldwin"
      ],
      "orbit": [
        "gshoemaker"
      ],
      "clerk": [
        "helin"
      ]
    },
    "office": {
      "observer": [
        "walvarez"
      ],
      "orbit": [
        "chapman"
      ],
      "clerk": [
        "aharris"
      ]
    }
  },
  "TOPICS": {
    "chladni": {
      "sci": "Ernst Chladni (1756-1827)",
      "topic": "Meteorites & their cosmic origin",
      "lede": "Ernst Chladni linked meteorites and their cosmic origin to observations that connect a moving sky with evidence on Earth.",
      "no": 1,
      "profile": "The planetary-defense dispatch today turns to Ernst Chladni and meteorites and their cosmic origin. Ernst Chladni argued in 1794 that stones and iron masses falling from the sky were extraterrestrial, challenging the prevailing dismissal of meteorite reports. Impact science joins faint moving points in the sky with shock, heat, excavation, and atmospheric effects on the ground. Chladni’s work clarifies one part of that chain. Detection, orbit determination, physical characterization, and consequence modeling are separate steps, each with uncertainties that change as evidence accumulates.\n\nThe scientific procedure is to compare witness accounts, recovered material, fall patterns, and the absence of plausible terrestrial sources. Observers must preserve astrometry, obtain follow-up across time, publish uncertainty, and distinguish a preliminary close approach from a stable impact solution. Physical size, albedo, density, velocity, and entry behavior should be estimated explicitly rather than inferred from one dramatic image.\n\nA rare hazard invites two bad habits: treating every fireball as a weapon or treating celestial chance as beyond preparation. Surveys and orbit centers exist because warning time can convert a natural event into a manageable technical problem. Missing a faint object and ignoring a reported candidate are also different failures.\n\nThe planetary lesson is unusual testimony becomes scientific evidence when independent observations converge with physical specimens. Credible warning grows from persistent observation, transparent probability, and institutions prepared to act as the orbit sharpens. Brightness alone mixes size, distance, surface reflectivity, shape, and rotation. Survey completeness is measured against the population and sky geometry, not by celebrating the most memorable discoveries.",
      "frame": "Blinks two sky images on the monitor. \"At The Impact Crater & Fall Field, this point moved before anyone knew where it would go. Explain meteorites and their cosmic origin.\"",
      "q": [
        {
          "q": "Which impact-science account best captures Ernst Chladni’s contribution to meteorites and their cosmic origin?",
          "o": [
            {
              "t": "Ernst Chladni argued in 1794 that stones and iron masses falling from the sky were extraterrestrial, challenging the prevailing dismissal of meteorite reports. The asteroid ephemeris keeps assumptions explicit.",
              "v": "expert",
              "fb": "Correct: impact assessment links repeat observations, orbit uncertainty, physical properties, and consequences."
            },
            {
              "t": "Ernst Chladni contributed to meteorites and their cosmic origin, but the account stops at discovery without securing follow-up, orbit uncertainty, or physical size. The asteroid ephemeris leaves one test open.",
              "v": "partial",
              "fb": "A discovery alert begins the analysis; follow-up determines whether the object is lost, harmless, or hazardous."
            },
            {
              "t": "Ernst Chladni is portrayed as treating a close fit to one short observation arc as an exact and permanent trajectory. The short arc allows alternatives. Within the asteroid ephemeris, no support appears.",
              "v": "wrong",
              "fb": "Closely fitting a short arc does not remove the many future trajectories compatible with limited data."
            },
            {
              "t": "Ernst Chladni is invoked to dismiss a candidate immediately because its initial impact probability is small and inconvenient to pursue. Within the asteroid ephemeris, assumption replaces verification.",
              "v": "danger",
              "fb": "A small preliminary probability should guide proportional follow-up rather than instant certainty or neglect."
            }
          ]
        },
        {
          "q": "What follow-up procedure matches the planetary-defense method?",
          "o": [
            {
              "t": "For planetary defense, execute this scientific sequence: compare witness accounts, recovered material, fall patterns, and the absence of plausible terrestrial sources.",
              "v": "expert",
              "fb": "Correct: impact assessment links repeat observations, orbit uncertainty, physical properties, and consequences."
            },
            {
              "t": "Publish the first positions, but leave the object without prompt recovery, updated uncertainty, or physical characterization. The asteroid ephemeris leaves one test open.",
              "v": "partial",
              "fb": "A discovery alert begins the analysis; follow-up determines whether the object is lost, harmless, or hazardous."
            },
            {
              "t": "Convert visible brightness directly into size and damage while ignoring distance, albedo, rotation, density, and entry behavior. The asteroid ephemeris defeats that inference.",
              "v": "wrong",
              "fb": "Closely fitting a short arc does not remove the many future trajectories compatible with limited data."
            },
            {
              "t": "Close the alert to avoid public concern, reduce follow-up effort, and wait for consequence to distinguish danger from a false alarm. Chance becomes an excuse for blindness.",
              "v": "danger",
              "fb": "A small preliminary probability should guide proportional follow-up rather than instant certainty or neglect."
            }
          ]
        },
        {
          "q": "Which conclusion about an impact hazard is most defensible?",
          "o": [
            {
              "t": "The impact-hazard lesson is that unusual testimony becomes scientific evidence when independent observations converge with physical specimens. The orbit can be updated, in use.",
              "v": "expert",
              "fb": "Correct: impact assessment links repeat observations, orbit uncertainty, physical properties, and consequences."
            },
            {
              "t": "Initial detection demonstrates adequate warning capability even when cadence and follow-up allow the object to be lost. The asteroid ephemeris leaves one test open, in use.",
              "v": "partial",
              "fb": "A discovery alert begins the analysis; follow-up determines whether the object is lost, harmless, or hazardous."
            },
            {
              "t": "A rare natural event does not be prepared for meaningfully because orbit probabilities remain uncertain until very near impact. The astrometry does not support certainty, in use.",
              "v": "wrong",
              "fb": "Closely fitting a short arc does not remove the many future trajectories compatible with limited data."
            },
            {
              "t": "The fireball is likely to be an orbital weapon or a bolt from the blue, excluding a natural object that was observed and downplayed. Under the asteroid ephemeris, warning is postponed.",
              "v": "danger",
              "fb": "A small preliminary probability should guide proportional follow-up rather than instant certainty or neglect."
            }
          ]
        }
      ]
    },
    "opik": {
      "sci": "Ernst Öpik (1893-1985)",
      "topic": "Near-Earth asteroids & meteors",
      "lede": "Ernst Öpik made Near-Earth asteroids and meteors a problem of measurement, orbit, and physical consequence.",
      "no": 2,
      "profile": "The planetary-defense dispatch today turns to Ernst Öpik and Near-Earth asteroids and meteors. Ernst Öpik developed methods for celestial encounters, meteor physics, and the collision probabilities of small bodies near planets. Impact science joins faint moving points in the sky with shock, heat, excavation, and atmospheric effects on the ground. Öpik’s work clarifies one part of that chain. Detection, orbit determination, physical characterization, and consequence modeling are separate steps, each with uncertainties that change as evidence accumulates.\n\nThe scientific procedure is to calculate orbits and encounter geometry, estimate relative velocity, and convert repeated orbital crossings into impact probabilities. Observers must preserve astrometry, obtain follow-up across time, publish uncertainty, and distinguish a preliminary close approach from a stable impact solution. Physical size, albedo, density, velocity, and entry behavior should be estimated explicitly rather than inferred from one dramatic image.\n\nA rare hazard invites two bad habits: treating every fireball as a weapon or treating celestial chance as beyond preparation. Surveys and orbit centers exist because warning time can convert a natural event into a manageable technical problem. Missing a faint object and ignoring a reported candidate are also different failures.\n\nThe planetary lesson is a hazardous orbit is a probability problem whose uncertainty should narrow as observations extend the arc. Credible warning grows from persistent observation, transparent probability, and institutions prepared to act as the orbit sharpens. A short observation arc can support many possible paths, so rapid follow-up is often more valuable than immediate certainty. Brightness alone mixes size, distance, surface reflectivity, shape, and rotation.",
      "frame": "Aligns the observation times. \"The orbit sharpens only if the object is found again. Begin with Near-Earth asteroids and meteors.\"",
      "q": [
        {
          "q": "Which impact-science account best captures Ernst Öpik’s contribution to Near-Earth asteroids and meteors?",
          "o": [
            {
              "t": "Ernst Öpik developed methods for celestial encounters, meteor physics, and the collision probabilities of small bodies near planets. The asteroid ephemeris lets later reviewers reconstruct events.",
              "v": "expert",
              "fb": "Correct: impact assessment links repeat observations, orbit uncertainty, physical properties, and consequences."
            },
            {
              "t": "Ernst Öpik contributed to Near-Earth asteroids and meteors, but the account stops at discovery without securing follow-up, orbit uncertainty, or physical size. The object may still be lost.",
              "v": "partial",
              "fb": "A discovery alert begins the analysis; follow-up determines whether the object is lost, harmless, or hazardous."
            },
            {
              "t": "Ernst Öpik is portrayed as treating a close fit to one short observation arc as an exact and permanent trajectory. The short arc allows alternatives. The astrometry does not support certainty.",
              "v": "wrong",
              "fb": "Closely fitting a short arc does not remove the many future trajectories compatible with limited data."
            },
            {
              "t": "Ernst Öpik is invoked to dismiss a candidate immediately because its initial impact probability is small and inconvenient to pursue. Inside the asteroid ephemeris, drama displaces testing.",
              "v": "danger",
              "fb": "A small preliminary probability should guide proportional follow-up rather than instant certainty or neglect."
            }
          ]
        },
        {
          "q": "What follow-up procedure matches the planetary-defense method?",
          "o": [
            {
              "t": "For planetary defense, execute this scientific sequence: calculate orbits and encounter geometry, estimate relative velocity, and convert repeated orbital crossings into impact probabilities. The orbit can be updated.",
              "v": "expert",
              "fb": "Correct: impact assessment links repeat observations, orbit uncertainty, physical properties, and consequences."
            },
            {
              "t": "Publish the first positions, but leave the object without prompt recovery, updated uncertainty, or physical characterization. The object may still be lost. The asteroid ephemeris leaves an assumption unresolved.",
              "v": "partial",
              "fb": "A discovery alert begins the analysis; follow-up determines whether the object is lost, harmless, or hazardous."
            },
            {
              "t": "Convert visible brightness directly into size and damage while ignoring distance, albedo, rotation, density, and entry behavior. The short arc allows alternatives. Under the asteroid ephemeris, direct comparison fails.",
              "v": "wrong",
              "fb": "Closely fitting a short arc does not remove the many future trajectories compatible with limited data."
            },
            {
              "t": "Close the alert to avoid public concern, reduce follow-up effort, and wait for consequence to distinguish danger from a false alarm. Low probability ends observation too soon. Chance becomes an excuse for blindness.",
              "v": "danger",
              "fb": "A small preliminary probability should guide proportional follow-up rather than instant certainty or neglect."
            }
          ]
        },
        {
          "q": "Which conclusion about an impact hazard is most defensible?",
          "o": [
            {
              "t": "The impact-hazard lesson is that a hazardous orbit is a probability problem whose uncertainty should narrow as observations extend the arc. The orbit can be updated.",
              "v": "expert",
              "fb": "Correct: impact assessment links repeat observations, orbit uncertainty, physical properties, and consequences."
            },
            {
              "t": "Initial detection demonstrates adequate warning capability even when cadence and follow-up allow the object to be lost. The asteroid ephemeris leaves one test open.",
              "v": "partial",
              "fb": "A discovery alert begins the analysis; follow-up determines whether the object is lost, harmless, or hazardous."
            },
            {
              "t": "A rare natural event does not be prepared for meaningfully because orbit probabilities remain uncertain until very near impact. The short arc allows alternatives, in use.",
              "v": "wrong",
              "fb": "Closely fitting a short arc does not remove the many future trajectories compatible with limited data."
            },
            {
              "t": "The fireball is likely to be an orbital weapon or a bolt from the blue, excluding a natural object that was observed and downplayed. Low probability ends observation too soon.",
              "v": "danger",
              "fb": "A small preliminary probability should guide proportional follow-up rather than instant certainty or neglect."
            }
          ]
        }
      ]
    },
    "whipple": {
      "sci": "Fred Whipple (1906-2004)",
      "topic": "Comets & the dirty snowball",
      "lede": "A faint point or thin rock layer became planetary evidence through Fred Whipple’s work on comets and the dirty snowball.",
      "no": 3,
      "profile": "The planetary-defense dispatch today turns to Fred Whipple and comets and the dirty snowball. Fred Whipple proposed the dirty-snowball model of comets, treating the nucleus as volatile ice mixed with dust that releases material when heated. Impact science joins faint moving points in the sky with shock, heat, excavation, and atmospheric effects on the ground. Whipple’s work clarifies one part of that chain. Detection, orbit determination, physical characterization, and consequence modeling are separate steps, each with uncertainties that change as evidence accumulates.\n\nThe scientific procedure is to connect solar heating with gas jets, dust tails, nongravitational forces, and repeated changes in comet brightness. Observers must preserve astrometry, obtain follow-up across time, publish uncertainty, and distinguish a preliminary close approach from a stable impact solution. Physical size, albedo, density, velocity, and entry behavior should be estimated explicitly rather than inferred from one dramatic image.\n\nA rare hazard invites two bad habits: treating every fireball as a weapon or treating celestial chance as beyond preparation. Surveys and orbit centers exist because warning time can convert a natural event into a manageable technical problem. Missing a faint object and ignoring a reported candidate are also different failures.\n\nThe planetary lesson is a simple physical model gains strength when it explains several different observations and predicts orbital effects. Credible warning grows from persistent observation, transparent probability, and institutions prepared to act as the orbit sharpens. Survey completeness is measured against the population and sky geometry, not by celebrating the most memorable discoveries. A short observation arc can support many possible paths, so rapid follow-up is often more valuable than immediate certainty.",
      "frame": "Circles the uncertainty ellipse. \"A probability is not a prophecy or permission to ignore it. Show me comets and the dirty snowball.\"",
      "q": [
        {
          "q": "Which impact-science account best captures Fred Whipple’s contribution to comets and the dirty snowball?",
          "o": [
            {
              "t": "Fred Whipple proposed the dirty-snowball model of comets, treating the nucleus as volatile ice mixed with dust that releases material when heated. The asteroid ephemeris keeps assumptions explicit.",
              "v": "expert",
              "fb": "Correct: impact assessment links repeat observations, orbit uncertainty, physical properties, and consequences."
            },
            {
              "t": "Fred Whipple contributed to comets and the dirty snowball, but the account stops at discovery without securing follow-up, orbit uncertainty, or physical size. The object may still be lost.",
              "v": "partial",
              "fb": "A discovery alert begins the analysis; follow-up determines whether the object is lost, harmless, or hazardous."
            },
            {
              "t": "Fred Whipple is portrayed as treating a close fit to one short observation arc as an exact and permanent trajectory. The short arc allows alternatives. The astrometry does not support certainty.",
              "v": "wrong",
              "fb": "Closely fitting a short arc does not remove the many future trajectories compatible with limited data."
            },
            {
              "t": "Fred Whipple is invoked to dismiss a candidate immediately because its initial impact probability is small and inconvenient to pursue. Under the asteroid ephemeris, warning is postponed.",
              "v": "danger",
              "fb": "A small preliminary probability should guide proportional follow-up rather than instant certainty or neglect."
            }
          ]
        },
        {
          "q": "What follow-up procedure matches the planetary-defense method?",
          "o": [
            {
              "t": "For planetary defense, execute this scientific sequence: connect solar heating with gas jets, dust tails, nongravitational forces, and repeated changes in comet brightness.",
              "v": "expert",
              "fb": "Correct: impact assessment links repeat observations, orbit uncertainty, physical properties, and consequences."
            },
            {
              "t": "Publish the first positions, but leave the object without prompt recovery, updated uncertainty, or physical characterization. The asteroid ephemeris leaves one test open.",
              "v": "partial",
              "fb": "A discovery alert begins the analysis; follow-up determines whether the object is lost, harmless, or hazardous."
            },
            {
              "t": "Convert visible brightness directly into size and damage while ignoring distance, albedo, rotation, density, and entry behavior. The asteroid ephemeris defeats that inference.",
              "v": "wrong",
              "fb": "Closely fitting a short arc does not remove the many future trajectories compatible with limited data."
            },
            {
              "t": "Close the alert to avoid public concern, reduce follow-up effort, and wait for consequence to distinguish danger from a false alarm. Chance becomes an excuse for blindness.",
              "v": "danger",
              "fb": "A small preliminary probability should guide proportional follow-up rather than instant certainty or neglect."
            }
          ]
        },
        {
          "q": "Which conclusion about an impact hazard is most defensible?",
          "o": [
            {
              "t": "The impact-hazard lesson is that a simple physical model gains strength when it explains several different observations and predicts orbital effects. The orbit can be updated.",
              "v": "expert",
              "fb": "Correct: impact assessment links repeat observations, orbit uncertainty, physical properties, and consequences."
            },
            {
              "t": "Initial detection demonstrates adequate warning capability even when cadence and follow-up allow the object to be lost. The asteroid ephemeris leaves one test open, in use.",
              "v": "partial",
              "fb": "A discovery alert begins the analysis; follow-up determines whether the object is lost, harmless, or hazardous."
            },
            {
              "t": "A rare natural event does not be prepared for meaningfully because orbit probabilities remain uncertain until very near impact. The astrometry does not support certainty, in use.",
              "v": "wrong",
              "fb": "Closely fitting a short arc does not remove the many future trajectories compatible with limited data."
            },
            {
              "t": "The fireball is likely to be an orbital weapon or a bolt from the blue, excluding a natural object that was observed and downplayed. Under the asteroid ephemeris, warning is postponed.",
              "v": "danger",
              "fb": "A small preliminary probability should guide proportional follow-up rather than instant certainty or neglect."
            }
          ]
        }
      ]
    },
    "baldwin": {
      "sci": "Ralph Baldwin (1912-2010)",
      "topic": "Craters as impact scars",
      "lede": "Ralph Baldwin linked craters as impact scars to observations that connect a moving sky with evidence on Earth.",
      "no": 4,
      "profile": "The planetary-defense dispatch today turns to Ralph Baldwin and craters as impact scars. Ralph Baldwin used the shapes, distributions, and scaling of lunar craters to argue that impacts had been a dominant geological process. Impact science joins faint moving points in the sky with shock, heat, excavation, and atmospheric effects on the ground. Baldwin’s work clarifies one part of that chain. Detection, orbit determination, physical characterization, and consequence modeling are separate steps, each with uncertainties that change as evidence accumulates.\n\nThe scientific procedure is to compare crater dimensions and morphology across sizes, relate them to explosion physics, and test whether volcanic explanations fit the population. Observers must preserve astrometry, obtain follow-up across time, publish uncertainty, and distinguish a preliminary close approach from a stable impact solution. Physical size, albedo, density, velocity, and entry behavior should be estimated explicitly rather than inferred from one dramatic image.\n\nA rare hazard invites two bad habits: treating every fireball as a weapon or treating celestial chance as beyond preparation. Surveys and orbit centers exist because warning time can convert a natural event into a manageable technical problem. Missing a faint object and ignoring a reported candidate are also different failures.\n\nThe planetary lesson is a landscape of many related features can reveal a common process more clearly than one spectacular crater. Credible warning grows from persistent observation, transparent probability, and institutions prepared to act as the orbit sharpens. Brightness alone mixes size, distance, surface reflectivity, shape, and rotation. Survey completeness is measured against the population and sky geometry, not by celebrating the most memorable discoveries.",
      "frame": "Blinks two sky images on the monitor. \"At The Survey Observatory, this point moved before anyone knew where it would go. Explain craters as impact scars.\"",
      "q": [
        {
          "q": "Which impact-science account best captures Ralph Baldwin’s contribution to craters as impact scars?",
          "o": [
            {
              "t": "Ralph Baldwin used the shapes, distributions, and scaling of lunar craters to argue that impacts had been a dominant geological process. The asteroid ephemeris lets later reviewers reconstruct events.",
              "v": "expert",
              "fb": "Correct: impact assessment links repeat observations, orbit uncertainty, physical properties, and consequences."
            },
            {
              "t": "Ralph Baldwin contributed to craters as impact scars, but the account stops at discovery without securing follow-up, orbit uncertainty, or physical size. The asteroid ephemeris leaves one test open.",
              "v": "partial",
              "fb": "A discovery alert begins the analysis; follow-up determines whether the object is lost, harmless, or hazardous."
            },
            {
              "t": "Ralph Baldwin is portrayed as treating a close fit to one short observation arc as an exact and permanent trajectory. The short arc allows alternatives. The astrometry does not support certainty.",
              "v": "wrong",
              "fb": "Closely fitting a short arc does not remove the many future trajectories compatible with limited data."
            },
            {
              "t": "Ralph Baldwin is invoked to dismiss a candidate immediately because its initial impact probability is small and inconvenient to pursue. Inside the asteroid ephemeris, the claim outruns checks.",
              "v": "danger",
              "fb": "A small preliminary probability should guide proportional follow-up rather than instant certainty or neglect."
            }
          ]
        },
        {
          "q": "What follow-up procedure matches the planetary-defense method?",
          "o": [
            {
              "t": "For planetary defense, execute this scientific sequence: compare crater dimensions and morphology across sizes, relate them to explosion physics, and test whether volcanic explanations fit the population.",
              "v": "expert",
              "fb": "Correct: impact assessment links repeat observations, orbit uncertainty, physical properties, and consequences."
            },
            {
              "t": "Publish the first positions, but leave the object without prompt recovery, updated uncertainty, or physical characterization. The object may still be lost. The asteroid ephemeris leaves one test open.",
              "v": "partial",
              "fb": "A discovery alert begins the analysis; follow-up determines whether the object is lost, harmless, or hazardous."
            },
            {
              "t": "Convert visible brightness directly into size and damage while ignoring distance, albedo, rotation, density, and entry behavior. The short arc allows alternatives. The astrometry does not support certainty.",
              "v": "wrong",
              "fb": "Closely fitting a short arc does not remove the many future trajectories compatible with limited data."
            },
            {
              "t": "Close the alert to avoid public concern, reduce follow-up effort, and wait for consequence to distinguish danger from a false alarm. Within the asteroid ephemeris, assumption replaces verification.",
              "v": "danger",
              "fb": "A small preliminary probability should guide proportional follow-up rather than instant certainty or neglect."
            }
          ]
        },
        {
          "q": "Which conclusion about an impact hazard is most defensible?",
          "o": [
            {
              "t": "The impact-hazard lesson is that a landscape of many related features can reveal a common process more clearly than one spectacular crater. The orbit can be updated.",
              "v": "expert",
              "fb": "Correct: impact assessment links repeat observations, orbit uncertainty, physical properties, and consequences."
            },
            {
              "t": "Initial detection demonstrates adequate warning capability even when cadence and follow-up allow the object to be lost. The asteroid ephemeris leaves one test open.",
              "v": "partial",
              "fb": "A discovery alert begins the analysis; follow-up determines whether the object is lost, harmless, or hazardous."
            },
            {
              "t": "A rare natural event does not be prepared for meaningfully because orbit probabilities remain uncertain until very near impact. The short arc allows alternatives, in use.",
              "v": "wrong",
              "fb": "Closely fitting a short arc does not remove the many future trajectories compatible with limited data."
            },
            {
              "t": "The fireball is likely to be an orbital weapon or a bolt from the blue, excluding a natural object that was observed and downplayed. Low probability ends observation too soon.",
              "v": "danger",
              "fb": "A small preliminary probability should guide proportional follow-up rather than instant certainty or neglect."
            }
          ]
        }
      ]
    },
    "gshoemaker": {
      "sci": "Eugene Shoemaker (1928-1997)",
      "topic": "Impact cratering & astrogeology",
      "lede": "Eugene Shoemaker made impact cratering and astrogeology a problem of measurement, orbit, and physical consequence.",
      "no": 5,
      "profile": "The planetary-defense dispatch today turns to Eugene Shoemaker and impact cratering and astrogeology. Eugene Shoemaker established impact cratering as a central part of planetary geology and co-discovered comet Shoemaker–Levy 9. Impact science joins faint moving points in the sky with shock, heat, excavation, and atmospheric effects on the ground. Shoemaker’s work clarifies one part of that chain. Detection, orbit determination, physical characterization, and consequence modeling are separate steps, each with uncertainties that change as evidence accumulates.\n\nThe scientific procedure is to study shocked minerals, crater structure, ejecta, and planetary images while linking field geology with impact experiments. Observers must preserve astrometry, obtain follow-up across time, publish uncertainty, and distinguish a preliminary close approach from a stable impact solution. Physical size, albedo, density, velocity, and entry behavior should be estimated explicitly rather than inferred from one dramatic image.\n\nA rare hazard invites two bad habits: treating every fireball as a weapon or treating celestial chance as beyond preparation. Surveys and orbit centers exist because warning time can convert a natural event into a manageable technical problem. Missing a faint object and ignoring a reported candidate are also different failures.\n\nThe planetary lesson is impact science joins astronomy and geology because the incoming orbit and the ground record describe the same event. Credible warning grows from persistent observation, transparent probability, and institutions prepared to act as the orbit sharpens. A short observation arc can support many possible paths, so rapid follow-up is often more valuable than immediate certainty. Brightness alone mixes size, distance, surface reflectivity, shape, and rotation.",
      "frame": "Aligns the observation times. \"The orbit sharpens only if the object is found again. Begin with impact cratering and astrogeology.\"",
      "q": [
        {
          "q": "Which impact-science account best captures Eugene Shoemaker’s contribution to impact cratering and astrogeology?",
          "o": [
            {
              "t": "Eugene Shoemaker established impact cratering as a central part of planetary geology and co-discovered comet Shoemaker–Levy 9. The orbit can be updated. The asteroid ephemeris keeps assumptions explicit.",
              "v": "expert",
              "fb": "Correct: impact assessment links repeat observations, orbit uncertainty, physical properties, and consequences."
            },
            {
              "t": "Eugene Shoemaker contributed to impact cratering and astrogeology, but the account stops at discovery without securing follow-up, orbit uncertainty, or physical size. The object may still be lost.",
              "v": "partial",
              "fb": "A discovery alert begins the analysis; follow-up determines whether the object is lost, harmless, or hazardous."
            },
            {
              "t": "Eugene Shoemaker is portrayed as treating a close fit to one short observation arc as an exact and permanent trajectory. The short arc allows alternatives. The astrometry does not support certainty.",
              "v": "wrong",
              "fb": "Closely fitting a short arc does not remove the many future trajectories compatible with limited data."
            },
            {
              "t": "Eugene Shoemaker is invoked to dismiss a candidate immediately because its initial impact probability is small and inconvenient to pursue. Inside the asteroid ephemeris, the claim outruns checks.",
              "v": "danger",
              "fb": "A small preliminary probability should guide proportional follow-up rather than instant certainty or neglect."
            }
          ]
        },
        {
          "q": "What follow-up procedure matches the planetary-defense method?",
          "o": [
            {
              "t": "For planetary defense, execute this scientific sequence: study shocked minerals, crater structure, ejecta, and planetary images while linking field geology with impact experiments.",
              "v": "expert",
              "fb": "Correct: impact assessment links repeat observations, orbit uncertainty, physical properties, and consequences."
            },
            {
              "t": "Publish the first positions, but leave the object without prompt recovery, updated uncertainty, or physical characterization. Support across the asteroid ephemeris stays partial.",
              "v": "partial",
              "fb": "A discovery alert begins the analysis; follow-up determines whether the object is lost, harmless, or hazardous."
            },
            {
              "t": "Convert visible brightness directly into size and damage while ignoring distance, albedo, rotation, density, and entry behavior. Under the asteroid ephemeris, direct comparison fails.",
              "v": "wrong",
              "fb": "Closely fitting a short arc does not remove the many future trajectories compatible with limited data."
            },
            {
              "t": "Close the alert to avoid public concern, reduce follow-up effort, and wait for consequence to distinguish danger from a false alarm. Low probability ends observation too soon.",
              "v": "danger",
              "fb": "A small preliminary probability should guide proportional follow-up rather than instant certainty or neglect."
            }
          ]
        },
        {
          "q": "Which conclusion about an impact hazard is most defensible?",
          "o": [
            {
              "t": "The impact-hazard lesson is that impact science joins astronomy and geology because the incoming orbit and the ground record describe the same event. The orbit can be updated.",
              "v": "expert",
              "fb": "Correct: impact assessment links repeat observations, orbit uncertainty, physical properties, and consequences."
            },
            {
              "t": "Initial detection demonstrates adequate warning capability even when cadence and follow-up allow the object to be lost. The asteroid ephemeris leaves one test open, in use.",
              "v": "partial",
              "fb": "A discovery alert begins the analysis; follow-up determines whether the object is lost, harmless, or hazardous."
            },
            {
              "t": "A rare natural event does not be prepared for meaningfully because orbit probabilities remain uncertain until very near impact. The astrometry does not support certainty, in use.",
              "v": "wrong",
              "fb": "Closely fitting a short arc does not remove the many future trajectories compatible with limited data."
            },
            {
              "t": "The fireball is likely to be an orbital weapon or a bolt from the blue, excluding a natural object that was observed and downplayed. Under the asteroid ephemeris, warning is postponed.",
              "v": "danger",
              "fb": "A small preliminary probability should guide proportional follow-up rather than instant certainty or neglect."
            }
          ]
        }
      ]
    },
    "helin": {
      "sci": "Eleanor Helin (1932-2009)",
      "topic": "Near-Earth asteroid surveys",
      "lede": "A faint point or thin rock layer became planetary evidence through Eleanor Helin’s work on Near-Earth asteroid surveys.",
      "no": 6,
      "profile": "The planetary-defense dispatch today turns to Eleanor Helin and Near-Earth asteroid surveys. Eleanor Helin led near-Earth-object searches including the Palomar Planet-Crossing Asteroid Survey and helped develop later automated survey efforts. Impact science joins faint moving points in the sky with shock, heat, excavation, and atmospheric effects on the ground. Helin’s work clarifies one part of that chain. Detection, orbit determination, physical characterization, and consequence modeling are separate steps, each with uncertainties that change as evidence accumulates.\n\nThe scientific procedure is to target sky regions where planet-crossing objects are detectable, measure motion across exposures, and maintain follow-up until the orbit is secure. Observers must preserve astrometry, obtain follow-up across time, publish uncertainty, and distinguish a preliminary close approach from a stable impact solution. Physical size, albedo, density, velocity, and entry behavior should be estimated explicitly rather than inferred from one dramatic image.\n\nA rare hazard invites two bad habits: treating every fireball as a weapon or treating celestial chance as beyond preparation. Surveys and orbit centers exist because warning time can convert a natural event into a manageable technical problem. Missing a faint object and ignoring a reported candidate are also different failures.\n\nThe planetary lesson is survey effectiveness depends on cadence, limiting magnitude, sky coverage, and follow-up rather than discovery totals alone. Credible warning grows from persistent observation, transparent probability, and institutions prepared to act as the orbit sharpens. Survey completeness is measured against the population and sky geometry, not by celebrating the most memorable discoveries. A short observation arc can support many possible paths, so rapid follow-up is often more valuable than immediate certainty.",
      "frame": "Circles the uncertainty ellipse. \"A probability is not a prophecy or permission to ignore it. Show me Near-Earth asteroid surveys.\"",
      "q": [
        {
          "q": "Which impact-science account best captures Eleanor Helin’s contribution to Near-Earth asteroid surveys?",
          "o": [
            {
              "t": "Eleanor Helin led near-Earth-object searches including the Palomar Planet-Crossing Asteroid Survey and helped develop later automated survey efforts. The asteroid ephemeris keeps assumptions explicit.",
              "v": "expert",
              "fb": "Correct: impact assessment links repeat observations, orbit uncertainty, physical properties, and consequences."
            },
            {
              "t": "Eleanor Helin contributed to Near-Earth asteroid surveys, but the account stops at discovery without securing follow-up, orbit uncertainty, or physical size. Physical size remains uncertain.",
              "v": "partial",
              "fb": "A discovery alert begins the analysis; follow-up determines whether the object is lost, harmless, or hazardous."
            },
            {
              "t": "Eleanor Helin is portrayed as treating a close fit to one short observation arc as an exact and permanent trajectory. The short arc allows alternatives. The astrometry does not support certainty.",
              "v": "wrong",
              "fb": "Closely fitting a short arc does not remove the many future trajectories compatible with limited data."
            },
            {
              "t": "Eleanor Helin is invoked to dismiss a candidate immediately because its initial impact probability is small and inconvenient to pursue. Inside the asteroid ephemeris, drama displaces testing.",
              "v": "danger",
              "fb": "A small preliminary probability should guide proportional follow-up rather than instant certainty or neglect."
            }
          ]
        },
        {
          "q": "What follow-up procedure matches the planetary-defense method?",
          "o": [
            {
              "t": "For planetary defense, execute this scientific sequence: target sky regions where planet-crossing objects are detectable, measure motion across exposures, and maintain follow-up until the orbit is secure.",
              "v": "expert",
              "fb": "Correct: impact assessment links repeat observations, orbit uncertainty, physical properties, and consequences."
            },
            {
              "t": "Publish the first positions, but leave the object without prompt recovery, updated uncertainty, or physical characterization. The object may still be lost. The asteroid ephemeris leaves one test open.",
              "v": "partial",
              "fb": "A discovery alert begins the analysis; follow-up determines whether the object is lost, harmless, or hazardous."
            },
            {
              "t": "Convert visible brightness directly into size and damage while ignoring distance, albedo, rotation, density, and entry behavior. The short arc allows alternatives. The astrometry does not support certainty.",
              "v": "wrong",
              "fb": "Closely fitting a short arc does not remove the many future trajectories compatible with limited data."
            },
            {
              "t": "Close the alert to avoid public concern, reduce follow-up effort, and wait for consequence to distinguish danger from a false alarm. Within the asteroid ephemeris, assumption replaces verification.",
              "v": "danger",
              "fb": "A small preliminary probability should guide proportional follow-up rather than instant certainty or neglect."
            }
          ]
        },
        {
          "q": "Which conclusion about an impact hazard is most defensible?",
          "o": [
            {
              "t": "The impact-hazard lesson is that survey effectiveness depends on cadence, limiting magnitude, sky coverage, and follow-up rather than discovery totals alone, in use.",
              "v": "expert",
              "fb": "Correct: impact assessment links repeat observations, orbit uncertainty, physical properties, and consequences."
            },
            {
              "t": "Initial detection demonstrates adequate warning capability even when cadence and follow-up allow the object to be lost. Physical size remains uncertain, in use.",
              "v": "partial",
              "fb": "A discovery alert begins the analysis; follow-up determines whether the object is lost, harmless, or hazardous."
            },
            {
              "t": "A rare natural event does not be prepared for meaningfully because orbit probabilities remain uncertain until very near impact. The short arc allows alternatives.",
              "v": "wrong",
              "fb": "Closely fitting a short arc does not remove the many future trajectories compatible with limited data."
            },
            {
              "t": "The fireball is likely to be an orbital weapon or a bolt from the blue, excluding a natural object that was observed and downplayed. Chance becomes an excuse for blindness.",
              "v": "danger",
              "fb": "A small preliminary probability should guide proportional follow-up rather than instant certainty or neglect."
            }
          ]
        }
      ]
    },
    "walvarez": {
      "sci": "Walter Alvarez (b. 1940)",
      "topic": "The iridium layer & the impact hypothesis",
      "lede": "Walter Alvarez turned an iridium-rich boundary into evidence linking mass extinction with a planetary impact.",
      "no": 7,
      "profile": "The planetary-defense dispatch today turns to Walter Alvarez and the iridium layer and the impact hypothesis. Walter Alvarez found the thin clay boundary at Gubbio that led to measurement of an iridium anomaly and the impact explanation for the end-Cretaceous extinction. Impact science joins faint moving points in the sky with shock, heat, excavation, and atmospheric effects on the ground. Alvarez’s work clarifies one part of that chain. Detection, orbit determination, physical characterization, and consequence modeling are separate steps, each with uncertainties that change as evidence accumulates.\n\nThe scientific procedure is to place geochemical measurements in a precise stratigraphic sequence and compare the same time boundary across distant sites. Observers must preserve astrometry, obtain follow-up across time, publish uncertainty, and distinguish a preliminary close approach from a stable impact solution. Physical size, albedo, density, velocity, and entry behavior should be estimated explicitly rather than inferred from one dramatic image.\n\nA rare hazard invites two bad habits: treating every fireball as a weapon or treating celestial chance as beyond preparation. Surveys and orbit centers exist because warning time can convert a natural event into a manageable technical problem. Missing a faint object and ignoring a reported candidate are also different failures.\n\nThe planetary lesson is a small layer can carry evidence for a planetary event when its age, chemistry, and global recurrence agree. Credible warning grows from persistent observation, transparent probability, and institutions prepared to act as the orbit sharpens. Brightness alone mixes size, distance, surface reflectivity, shape, and rotation. Survey completeness is measured against the population and sky geometry, not by celebrating the most memorable discoveries.",
      "frame": "Blinks two sky images on the monitor. \"At The Survey Programme Office, this point moved before anyone knew where it would go. Explain the iridium layer and the impact hypothesis.\"",
      "q": [
        {
          "q": "Which impact-science account best captures Walter Alvarez’s contribution to the iridium layer and the impact hypothesis?",
          "o": [
            {
              "t": "Walter Alvarez found the thin clay boundary at Gubbio that led to measurement of an iridium anomaly and the impact explanation for the end-Cretaceous extinction. The asteroid ephemeris keeps assumptions explicit.",
              "v": "expert",
              "fb": "Correct: impact assessment links repeat observations, orbit uncertainty, physical properties, and consequences."
            },
            {
              "t": "Walter Alvarez contributed to the iridium layer and the impact hypothesis, but the account stops at discovery without securing follow-up, orbit uncertainty, or physical size. The object may still be lost.",
              "v": "partial",
              "fb": "A discovery alert begins the analysis; follow-up determines whether the object is lost, harmless, or hazardous."
            },
            {
              "t": "Walter Alvarez is portrayed as treating a close fit to one short observation arc as an exact and permanent trajectory. The short arc allows alternatives. The asteroid ephemeris defeats that inference.",
              "v": "wrong",
              "fb": "Closely fitting a short arc does not remove the many future trajectories compatible with limited data."
            },
            {
              "t": "Walter Alvarez is invoked to dismiss a candidate immediately because its initial impact probability is small and inconvenient to pursue. Within the asteroid ephemeris, assumption replaces verification.",
              "v": "danger",
              "fb": "A small preliminary probability should guide proportional follow-up rather than instant certainty or neglect."
            }
          ]
        },
        {
          "q": "What follow-up procedure matches the planetary-defense method?",
          "o": [
            {
              "t": "For planetary defense, execute this scientific sequence: place geochemical measurements in a precise stratigraphic sequence and compare the same time boundary across distant sites.",
              "v": "expert",
              "fb": "Correct: impact assessment links repeat observations, orbit uncertainty, physical properties, and consequences."
            },
            {
              "t": "Publish the first positions, but leave the object without prompt recovery, updated uncertainty, or physical characterization. Support across the asteroid ephemeris stays partial.",
              "v": "partial",
              "fb": "A discovery alert begins the analysis; follow-up determines whether the object is lost, harmless, or hazardous."
            },
            {
              "t": "Convert visible brightness directly into size and damage while ignoring distance, albedo, rotation, density, and entry behavior. Under the asteroid ephemeris, direct comparison fails.",
              "v": "wrong",
              "fb": "Closely fitting a short arc does not remove the many future trajectories compatible with limited data."
            },
            {
              "t": "Close the alert to avoid public concern, reduce follow-up effort, and wait for consequence to distinguish danger from a false alarm. Low probability ends observation too soon.",
              "v": "danger",
              "fb": "A small preliminary probability should guide proportional follow-up rather than instant certainty or neglect."
            }
          ]
        },
        {
          "q": "Which conclusion about an impact hazard is most defensible?",
          "o": [
            {
              "t": "The impact-hazard lesson is that a small layer can carry evidence for a planetary event when its age, chemistry, and global recurrence agree. The orbit can be updated, in use.",
              "v": "expert",
              "fb": "Correct: impact assessment links repeat observations, orbit uncertainty, physical properties, and consequences."
            },
            {
              "t": "Initial detection demonstrates adequate warning capability even when cadence and follow-up allow the object to be lost. The asteroid ephemeris leaves one test open, in use.",
              "v": "partial",
              "fb": "A discovery alert begins the analysis; follow-up determines whether the object is lost, harmless, or hazardous."
            },
            {
              "t": "A rare natural event does not be prepared for meaningfully because orbit probabilities remain uncertain until very near impact. The astrometry does not support certainty, in use.",
              "v": "wrong",
              "fb": "Closely fitting a short arc does not remove the many future trajectories compatible with limited data."
            },
            {
              "t": "The fireball is likely to be an orbital weapon or a bolt from the blue, excluding a natural object that was observed and downplayed. Under the asteroid ephemeris, warning is postponed.",
              "v": "danger",
              "fb": "A small preliminary probability should guide proportional follow-up rather than instant certainty or neglect."
            }
          ]
        }
      ]
    },
    "chapman": {
      "sci": "Clark Chapman (planetary scientist)",
      "topic": "Assessing the asteroid hazard",
      "lede": "Clark Chapman made assessing the asteroid hazard a problem of measurement, orbit, and physical consequence.",
      "no": 8,
      "profile": "The planetary-defense dispatch today turns to Clark Chapman and assessing the asteroid hazard. Clark Chapman has analyzed asteroid impact risk, communicating how low-probability high-consequence events should be compared with ordinary hazards. Impact science joins faint moving points in the sky with shock, heat, excavation, and atmospheric effects on the ground. Chapman’s work clarifies one part of that chain. Detection, orbit determination, physical characterization, and consequence modeling are separate steps, each with uncertainties that change as evidence accumulates.\n\nThe scientific procedure is to separate object size, impact probability, timescale, consequence, and uncertainty while updating risk as observations accumulate. Observers must preserve astrometry, obtain follow-up across time, publish uncertainty, and distinguish a preliminary close approach from a stable impact solution. Physical size, albedo, density, velocity, and entry behavior should be estimated explicitly rather than inferred from one dramatic image.\n\nA rare hazard invites two bad habits: treating every fireball as a weapon or treating celestial chance as beyond preparation. Surveys and orbit centers exist because warning time can convert a natural event into a manageable technical problem. Missing a faint object and ignoring a reported candidate are also different failures.\n\nThe planetary lesson is neither sensational certainty nor casual dismissal represents a changing probabilistic hazard honestly. Credible warning grows from persistent observation, transparent probability, and institutions prepared to act as the orbit sharpens. A short observation arc can support many possible paths, so rapid follow-up is often more valuable than immediate certainty. Brightness alone mixes size, distance, surface reflectivity, shape, and rotation.",
      "frame": "Aligns the observation times. \"The orbit sharpens only if the object is found again. Begin with assessing the asteroid hazard.\"",
      "q": [
        {
          "q": "Which impact-science account best captures Clark Chapman’s contribution to assessing the asteroid hazard?",
          "o": [
            {
              "t": "Clark Chapman has analyzed asteroid impact risk, communicating how low-probability high-consequence events should be compared with ordinary hazards. The asteroid ephemeris keeps assumptions explicit.",
              "v": "expert",
              "fb": "Correct: impact assessment links repeat observations, orbit uncertainty, physical properties, and consequences."
            },
            {
              "t": "Clark Chapman contributed to assessing the asteroid hazard, but the account stops at discovery without securing follow-up, orbit uncertainty, or physical size. The object may still be lost.",
              "v": "partial",
              "fb": "A discovery alert begins the analysis; follow-up determines whether the object is lost, harmless, or hazardous."
            },
            {
              "t": "Clark Chapman is portrayed as treating a close fit to one short observation arc as an exact and permanent trajectory. The short arc allows alternatives. The astrometry does not support certainty.",
              "v": "wrong",
              "fb": "Closely fitting a short arc does not remove the many future trajectories compatible with limited data."
            },
            {
              "t": "Clark Chapman is invoked to dismiss a candidate immediately because its initial impact probability is small and inconvenient to pursue. Under the asteroid ephemeris, warning is postponed.",
              "v": "danger",
              "fb": "A small preliminary probability should guide proportional follow-up rather than instant certainty or neglect."
            }
          ]
        },
        {
          "q": "What follow-up procedure matches the planetary-defense method?",
          "o": [
            {
              "t": "For planetary defense, execute this scientific sequence: separate object size, impact probability, timescale, consequence, and uncertainty while updating risk as observations accumulate. The orbit can be updated.",
              "v": "expert",
              "fb": "Correct: impact assessment links repeat observations, orbit uncertainty, physical properties, and consequences."
            },
            {
              "t": "Publish the first positions, but leave the object without prompt recovery, updated uncertainty, or physical characterization. The object may still be lost. The asteroid ephemeris leaves an assumption unresolved.",
              "v": "partial",
              "fb": "A discovery alert begins the analysis; follow-up determines whether the object is lost, harmless, or hazardous."
            },
            {
              "t": "Convert visible brightness directly into size and damage while ignoring distance, albedo, rotation, density, and entry behavior. The short arc allows alternatives. Under the asteroid ephemeris, direct comparison fails.",
              "v": "wrong",
              "fb": "Closely fitting a short arc does not remove the many future trajectories compatible with limited data."
            },
            {
              "t": "Close the alert to avoid public concern, reduce follow-up effort, and wait for consequence to distinguish danger from a false alarm. Low probability ends observation too soon. Chance becomes an excuse for blindness.",
              "v": "danger",
              "fb": "A small preliminary probability should guide proportional follow-up rather than instant certainty or neglect."
            }
          ]
        },
        {
          "q": "Which conclusion about an impact hazard is most defensible?",
          "o": [
            {
              "t": "The impact-hazard lesson is that neither sensational certainty nor casual dismissal represents a changing probabilistic hazard honestly. The orbit can be updated.",
              "v": "expert",
              "fb": "Correct: impact assessment links repeat observations, orbit uncertainty, physical properties, and consequences."
            },
            {
              "t": "Initial detection demonstrates adequate warning capability even when cadence and follow-up allow the object to be lost. Physical size remains uncertain, in use.",
              "v": "partial",
              "fb": "A discovery alert begins the analysis; follow-up determines whether the object is lost, harmless, or hazardous."
            },
            {
              "t": "A rare natural event does not be prepared for meaningfully because orbit probabilities remain uncertain until very near impact. The short arc allows alternatives.",
              "v": "wrong",
              "fb": "Closely fitting a short arc does not remove the many future trajectories compatible with limited data."
            },
            {
              "t": "The fireball is likely to be an orbital weapon or a bolt from the blue, excluding a natural object that was observed and downplayed. Chance becomes an excuse for blindness.",
              "v": "danger",
              "fb": "A small preliminary probability should guide proportional follow-up rather than instant certainty or neglect."
            }
          ]
        }
      ]
    },
    "aharris": {
      "sci": "Alan Harris (asteroid astronomer)",
      "topic": "Asteroid sizes & impact risk",
      "lede": "A faint point or thin rock layer became planetary evidence through Alan Harris’s work on asteroid sizes and impact risk.",
      "no": 9,
      "profile": "The planetary-defense dispatch today turns to Alan Harris and asteroid sizes and impact risk. Alan Harris has contributed to asteroid physical characterization, including methods that infer size and albedo from thermal emission and reflected light. Impact science joins faint moving points in the sky with shock, heat, excavation, and atmospheric effects on the ground. Harris’s work clarifies one part of that chain. Detection, orbit determination, physical characterization, and consequence modeling are separate steps, each with uncertainties that change as evidence accumulates.\n\nThe scientific procedure is to combine infrared flux, visible brightness, distance, shape assumptions, and rotation to estimate diameter and surface reflectivity. Observers must preserve astrometry, obtain follow-up across time, publish uncertainty, and distinguish a preliminary close approach from a stable impact solution. Physical size, albedo, density, velocity, and entry behavior should be estimated explicitly rather than inferred from one dramatic image.\n\nA rare hazard invites two bad habits: treating every fireball as a weapon or treating celestial chance as beyond preparation. Surveys and orbit centers exist because warning time can convert a natural event into a manageable technical problem. Missing a faint object and ignoring a reported candidate are also different failures.\n\nThe planetary lesson is hazard depends strongly on physical size, which cannot be read reliably from visible brightness alone. Credible warning grows from persistent observation, transparent probability, and institutions prepared to act as the orbit sharpens. Survey completeness is measured against the population and sky geometry, not by celebrating the most memorable discoveries. A short observation arc can support many possible paths, so rapid follow-up is often more valuable than immediate certainty.",
      "frame": "Circles the uncertainty ellipse. \"A probability is not a prophecy or permission to ignore it. Show me asteroid sizes and impact risk.\"",
      "q": [
        {
          "q": "Which impact-science account best captures Alan Harris’s contribution to asteroid sizes and impact risk?",
          "o": [
            {
              "t": "Alan Harris has contributed to asteroid physical characterization, including methods that infer size and albedo from thermal emission and reflected light. The asteroid ephemeris keeps assumptions explicit.",
              "v": "expert",
              "fb": "Correct: impact assessment links repeat observations, orbit uncertainty, physical properties, and consequences."
            },
            {
              "t": "Alan Harris contributed to asteroid sizes and impact risk, but the account stops at discovery without securing follow-up, orbit uncertainty, or physical size. The asteroid ephemeris leaves one test open.",
              "v": "partial",
              "fb": "A discovery alert begins the analysis; follow-up determines whether the object is lost, harmless, or hazardous."
            },
            {
              "t": "Alan Harris is portrayed as treating a close fit to one short observation arc as an exact and permanent trajectory. The short arc allows alternatives. The asteroid ephemeris defeats that inference.",
              "v": "wrong",
              "fb": "Closely fitting a short arc does not remove the many future trajectories compatible with limited data."
            },
            {
              "t": "Alan Harris is invoked to dismiss a candidate immediately because its initial impact probability is small and inconvenient to pursue. Within the asteroid ephemeris, assumption replaces verification.",
              "v": "danger",
              "fb": "A small preliminary probability should guide proportional follow-up rather than instant certainty or neglect."
            }
          ]
        },
        {
          "q": "What follow-up procedure matches the planetary-defense method?",
          "o": [
            {
              "t": "For planetary defense, execute this scientific sequence: combine infrared flux, visible brightness, distance, shape assumptions, and rotation to estimate diameter and surface reflectivity. The orbit can be updated.",
              "v": "expert",
              "fb": "Correct: impact assessment links repeat observations, orbit uncertainty, physical properties, and consequences."
            },
            {
              "t": "Publish the first positions, but leave the object without prompt recovery, updated uncertainty, or physical characterization. The object may still be lost. The asteroid ephemeris leaves an assumption unresolved.",
              "v": "partial",
              "fb": "A discovery alert begins the analysis; follow-up determines whether the object is lost, harmless, or hazardous."
            },
            {
              "t": "Convert visible brightness directly into size and damage while ignoring distance, albedo, rotation, density, and entry behavior. The short arc allows alternatives. Under the asteroid ephemeris, direct comparison fails.",
              "v": "wrong",
              "fb": "Closely fitting a short arc does not remove the many future trajectories compatible with limited data."
            },
            {
              "t": "Close the alert to avoid public concern, reduce follow-up effort, and wait for consequence to distinguish danger from a false alarm. Low probability ends observation too soon. Chance becomes an excuse for blindness.",
              "v": "danger",
              "fb": "A small preliminary probability should guide proportional follow-up rather than instant certainty or neglect."
            }
          ]
        },
        {
          "q": "Which conclusion about an impact hazard is most defensible?",
          "o": [
            {
              "t": "The impact-hazard lesson is that hazard depends strongly on physical size, which cannot be read reliably from visible brightness alone. The orbit can be updated.",
              "v": "expert",
              "fb": "Correct: impact assessment links repeat observations, orbit uncertainty, physical properties, and consequences."
            },
            {
              "t": "Initial detection demonstrates adequate warning capability even when cadence and follow-up allow the object to be lost. Physical size remains uncertain, in use.",
              "v": "partial",
              "fb": "A discovery alert begins the analysis; follow-up determines whether the object is lost, harmless, or hazardous."
            },
            {
              "t": "A rare natural event does not be prepared for meaningfully because orbit probabilities remain uncertain until very near impact. The short arc allows alternatives.",
              "v": "wrong",
              "fb": "Closely fitting a short arc does not remove the many future trajectories compatible with limited data."
            },
            {
              "t": "The fireball is likely to be an orbital weapon or a bolt from the blue, excluding a natural object that was observed and downplayed. Chance becomes an excuse for blindness.",
              "v": "danger",
              "fb": "A small preliminary probability should guide proportional follow-up rather than instant certainty or neglect."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "observer": {
      "crater": "Night Observer Kade stands beside pre-impact images inside the impact crater & fall field. \"Ran the sky survey; the object was on the plates before it fell. The object was faint, not invisible, and the orbit changed as each measurement was added.\"",
      "observatory": "Night Observer Kade stands beside pre-impact images inside the survey observatory. \"Ran the sky survey; the object was on the plates before it fell. The object was faint, not invisible, and the orbit changed as each measurement was added.\"",
      "office": "Night Observer Kade stands beside pre-impact images inside the survey programme office. \"Ran the sky survey; the object was on the plates before it fell. The object was faint, not invisible, and the orbit changed as each measurement was added.\""
    },
    "orbit": {
      "crater": "The Orbit Analyst stands beside pre-impact images inside the impact crater & fall field. \"Ran the numbers; the collision course was flagged and then walked back. The object was faint, not invisible, and the orbit changed as each measurement was added.\"",
      "observatory": "The Orbit Analyst stands beside pre-impact images inside the survey observatory. \"Ran the numbers; the collision course was flagged and then walked back. The object was faint, not invisible, and the orbit changed as each measurement was added.\"",
      "office": "The Orbit Analyst stands beside pre-impact images inside the survey programme office. \"Ran the numbers; the collision course was flagged and then walked back. The object was faint, not invisible, and the orbit changed as each measurement was added.\""
    },
    "clerk": {
      "crater": "The Clerk stands beside pre-impact images inside the impact crater & fall field. \"Keeps the survey logs — and the funding cut that blinded the sky watch. The object was faint, not invisible, and the orbit changed as each measurement was added.\"",
      "observatory": "The Clerk stands beside pre-impact images inside the survey observatory. \"Keeps the survey logs — and the funding cut that blinded the sky watch. The object was faint, not invisible, and the orbit changed as each measurement was added.\"",
      "office": "The Clerk stands beside pre-impact images inside the survey programme office. \"Keeps the survey logs — and the funding cut that blinded the sky watch. The object was faint, not invisible, and the orbit changed as each measurement was added.\""
    }
  },
  "story": [
    "<b>The Hollow Vale Impact</b> begins inside the Hollow Vale impact inquiry, where the first explanation is already spreading faster than the evidence.",
    "<b>Night Observer Kade</b>, <b>The Orbit Analyst</b>, and <b>The Clerk</b> each hold a different part of the record, and each conversation opens with one real pioneer whose work changes how the evidence should be read.",
    "The inquiry keeps circling <b>A weapon dropped from orbit</b> and <b>A freak bolt from the blue — an act of God</b>. Both are tempting, and neither can be accepted just because it makes the cleanest headline.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and make the final WHAT judgment from what you learned."
  ],
  "endings": {
    "overclaimWhat": "weapon",
    "dismissalWhat": "freak",
    "win": {
      "expertTitle": "The Warning Returns to the Orbit",
      "expert": [
        "You connect <b>Sabine Verhoeven — sky-survey programme director</b> with <b>A downplayed detection & a defunded sky survey</b> through the controlling evidence preserved in <b>The Survey Programme Office</b>. Not a weapon dropped from orbit. Not a freak bolt from the blue — an act of god.",
        "The object appeared in survey data, the collision solution was softened rather than pursued, and funding cuts had already weakened follow-up. The impact was natural, but the absence of warning was shaped by a documented programme decision."
      ],
      "soundTitle": "The Lost Object Is Found in the Files",
      "sound": [
        "Your finding correctly combines <b>Sabine Verhoeven — sky-survey programme director</b>, <b>The Survey Programme Office</b>, and <b>A downplayed detection & a defunded sky survey</b>. The images, orbit runs, and programme records support the conclusion.",
        "The exact warning interval still depends on reconstructing missed observations, yet the event can no longer be described as a bolt from an entirely unwatched sky."
      ],
      "namedTitle": "The Downplayed Detection",
      "named": [
        "You select <b>Sabine Verhoeven — sky-survey programme director</b>, <b>The Survey Programme Office</b>, and <b>A downplayed detection & a defunded sky survey</b> correctly.",
        "The result is concise, but it directs the review to the observation arc, changed risk language, and budget decision required for a complete planetary-defense account."
      ]
    },
    "overclaim": {
      "title": "A Weapon Without a Launch",
      "body": [
        "You declare <b>A weapon dropped from orbit</b>, interpreting energy and trajectory as evidence of hostile orbital deployment.",
        "No launch or engineered-object evidence supports the claim. Its collapse allows officials to dismiss the entire inquiry rather than answer why a natural hazard in their own data was not followed."
      ]
    },
    "dismissal": {
      "title": "A Bolt From a Surveyed Sky",
      "body": [
        "Your report adopts <b>A freak bolt from the blue — an act of God</b> and treats rarity as proof that no detection or warning process could have mattered.",
        "That conclusion erases the pre-impact observations and legitimizes further survey cuts. The next faint candidate can again be filed away until consequence replaces uncertainty."
      ]
    },
    "wrongNames": {
      "title": "The Warning Found, the Director Missed",
      "body": [
        "You recognize <b>A downplayed detection & a defunded sky survey</b>, but assign the suppression to the duty astronomer or place the decisive decision outside the programme office. The reporting and funding authority lead instead to"
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"An asteroid trajectory ending in an impact crater\"><circle cx=\"116\" cy=\"34\" r=\"17\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.6\"/><path d=\"M136 42 C250 74,350 74,468 96\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2\" stroke-dasharray=\"5 5\"/><path d=\"M450 100 C484 78,534 78,568 100 C534 118,484 118,450 100 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M496 86 L522 114 M522 86 L496 114\" stroke=\"#B3261E\" stroke-width=\"2.2\"/></svg>"
}};
