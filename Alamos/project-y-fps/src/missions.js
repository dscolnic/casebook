const MISSION_DEFS=[
  {
    "title": "Read the atomic world",
    "objective": "Build a shared language for nuclei, isotopes, and detector signals before any team begins advanced work.",
    "briefing": "Project Y cannot coordinate five divisions until everyone describes matter in the same way. Begin with the nucleus, connect isotope notation to chemical identity, and finish by seeing how radiation becomes a measurable electrical signal.",
    "takeaway": "A nucleus is defined by its proton and neutron counts; experiments turn nuclear events into signals that can be counted.",
    "stops": [
      {
        "group": "T",
        "lesson": 0,
        "task": "Decode the nucleus"
      },
      {
        "group": "CM",
        "lesson": 0,
        "task": "Connect isotopes to chemistry"
      },
      {
        "group": "P",
        "lesson": 0,
        "task": "Turn ionization into a signal"
      }
    ],
    "stake": "Five divisions, one mesa, and three notations for the same nucleus on three blackboards. None of this can be coordinated until the site shares one language. What does a nuclide symbol actually specify? Why do isotopes of an element act alike in a beaker and differently in a counter? And how does ionisation become a number an instrument can report?"
  },
  {
    "title": "Account for nuclear energy",
    "objective": "Connect mass, binding energy, calibration, and the program’s competing early architectures.",
    "briefing": "The next step is to understand why nuclear changes involve such large energy scales, how a measurement system assigns an energy value, and why Los Alamos initially pursued more than one technical path.",
    "takeaway": "Mass defect sets the nuclear energy scale, but that scale becomes useful only after instruments and engineering goals are calibrated.",
    "stops": [
      {
        "group": "T",
        "lesson": 1,
        "task": "Estimate binding energy"
      },
      {
        "group": "P",
        "lesson": 9,
        "task": "Calibrate measured energy"
      },
      {
        "group": "E",
        "lesson": 0,
        "task": "Compare the early architectures"
      }
    ],
    "stake": "Two architectures are on the table and the site can properly staff one of them. The energy released in a nuclear change comes from mass that is no longer there — binding energy, made visible by the mass defect — and every measured energy on this mesa depends on a calibration somebody has to defend. Choose on preference rather than evidence and a year goes into the wrong programme."
  },
  {
    "title": "Follow radioactivity through the laboratory",
    "objective": "Treat decay as a quantitative process that must survive chemistry and background measurement.",
    "briefing": "A radioactive sample changes while it is being prepared and measured. Follow the same evidence chain from the decay law, through tracer chemistry, to a defensible background measurement.",
    "takeaway": "A count rate is not automatically a decay rate; time dependence, chemical recovery, and background all matter.",
    "stops": [
      {
        "group": "T",
        "lesson": 3,
        "task": "Model radioactive decay"
      },
      {
        "group": "CM",
        "lesson": 1,
        "task": "Use a radiochemical tracer"
      },
      {
        "group": "P",
        "lesson": 5,
        "task": "Measure the background"
      }
    ],
    "stake": "The sample is decaying while the chemistry is still running, which means the number at the end is not the number at the start. Decay is a rate law with a half-life, tracer chemistry follows an element through steps where nothing else can, and a count means nothing until the background under it is measured. Three groups have already reported yields that cannot all be right."
  },
  {
    "title": "Measure interactions, not impressions",
    "objective": "Learn how cross sections, counting statistics, and analytical yield turn observations into quantitative evidence.",
    "briefing": "The laboratory now needs probabilities rather than anecdotes. Estimate how often an interaction occurs, determine whether a count difference is statistically meaningful, and verify that the chemistry did not lose an unknown fraction of the sample.",
    "takeaway": "Reliable nuclear evidence combines interaction probability, statistical uncertainty, and a measured recovery or efficiency.",
    "stops": [
      {
        "group": "T",
        "lesson": 5,
        "task": "Interpret a cross section"
      },
      {
        "group": "P",
        "lesson": 6,
        "task": "Use Poisson statistics"
      },
      {
        "group": "CM",
        "lesson": 7,
        "task": "Verify yield and purity"
      }
    ],
    "stake": "Two groups have a count difference everybody believes in, and Poisson statistics say it is nothing. A cross section is a probability with an area for units; counting is a random process whose scatter is predictable; a yield is worthless without a purity figure beside it. The programme is about to allocate material on the strength of a difference that may not exist."
  },
  {
    "title": "Track neutrons through matter",
    "objective": "Connect moderation, neutron detection, and the historical reason plutonium forced a different design path.",
    "briefing": "Neutrons change energy, direction, and detectability as they move through matter. Use that foundation to understand why the plutonium program could not simply copy the first architecture.",
    "takeaway": "Neutron behavior links microscopic interactions to system-level design choices.",
    "stops": [
      {
        "group": "T",
        "lesson": 7,
        "task": "Follow neutron moderation"
      },
      {
        "group": "P",
        "lesson": 14,
        "task": "Detect neutrons reliably"
      },
      {
        "group": "X",
        "lesson": 0,
        "task": "Explain why plutonium required implosion"
      }
    ],
    "stake": "The first reactor plutonium has arrived on the mesa and it is not the material the gun design was built around. Neutrons change energy as they scatter, and what they can do and whether they can be detected both depend on that energy — which is why moderation is not a detail. The consequence for the second design path arrives with the sample."
  },
  {
    "title": "Recognize the design pivot",
    "objective": "Use neutron-background evidence to understand why one path was abandoned and inward compression became central.",
    "briefing": "A new material property changes the program. First identify the background process, then see why the earlier approach became unacceptable, and finally translate the problem into the idea of inward compression.",
    "takeaway": "Programs must change architecture when new evidence invalidates an original assumption.",
    "stops": [
      {
        "group": "T",
        "lesson": 16,
        "task": "Understand spontaneous-fission backgrounds"
      },
      {
        "group": "E",
        "lesson": 1,
        "task": "Explain why Thin Man was abandoned"
      },
      {
        "group": "X",
        "lesson": 1,
        "task": "Move from outward detonation to inward compression"
      }
    ],
    "stake": "A background process nobody had to care about last spring is about to end a year of work in a fortnight. Spontaneous fission produces neutrons on its own timetable, and a timetable is exactly what an assembly method has to beat. The evidence is a counting rate; the consequence is that the laboratory reorganises around inward compression instead."
  },
  {
    "title": "Understand matter under compression",
    "objective": "Connect equations of state, material phases, and wave shaping without jumping directly to a full system.",
    "briefing": "Compression depends on how materials respond under pressure and how waves cross boundaries. Build the physical picture from bulk matter, to material phase behavior, to the purpose of wave shaping.",
    "takeaway": "A compression concept is only credible when material response and wave propagation support it.",
    "stops": [
      {
        "group": "T",
        "lesson": 23,
        "task": "Use an equation of state"
      },
      {
        "group": "CM",
        "lesson": 11,
        "task": "Read a phase diagram"
      },
      {
        "group": "X",
        "lesson": 3,
        "task": "Explain what an explosive lens does"
      }
    ],
    "stake": "Compression is now the whole programme, and the material at the centre of it has phases that change its density under conditions the design will actually meet. An equation of state relates pressure, volume and temperature; a phase diagram says which form exists where; a shaped wave arrives where and when it is meant to. None of the three can be assumed from the others."
  },
  {
    "title": "Make symmetry measurable",
    "objective": "Turn a qualitative demand for symmetry into calibrated timing evidence and an engineering requirement.",
    "briefing": "“Nearly simultaneous” is not a measurement. Define a symmetry metric, calibrate the timing channels that observe it, and see why simultaneity became a system requirement.",
    "takeaway": "A system requirement becomes testable only when it has a metric and a calibrated measurement chain.",
    "stops": [
      {
        "group": "X",
        "lesson": 4,
        "task": "Define an arrival-time symmetry metric"
      },
      {
        "group": "P",
        "lesson": 11,
        "task": "Calibrate timing channels"
      },
      {
        "group": "E",
        "lesson": 8,
        "task": "Translate simultaneity into engineering"
      }
    ],
    "stake": "“Nearly simultaneous” has been in every memo for two months. Nobody has written down what it means in microseconds. A requirement is not a requirement until it is a number with a tolerance and an instrument that can see it. So the symmetry metric comes first. Then the timing channels are calibrated. Only then can ordnance be told what to build to."
  },
  {
    "title": "Build evidence with real materials",
    "objective": "Use mechanical properties, inert mockups, and high-speed imaging to test a difficult system safely.",
    "briefing": "The project needs evidence before a full integrated event. Characterize the materials, build representative non-nuclear hardware, and choose diagnostics that reveal fast internal behavior.",
    "takeaway": "Mockups are useful only when their materials, geometry, and diagnostics preserve the question being tested.",
    "stops": [
      {
        "group": "CM",
        "lesson": 16,
        "task": "Characterize mechanical properties"
      },
      {
        "group": "E",
        "lesson": 14,
        "task": "Use mockups and inert assemblies"
      },
      {
        "group": "P",
        "lesson": 24,
        "task": "Apply high-speed imaging and radiography"
      }
    ],
    "stake": "The thing itself cannot be tested, so everything the programme believes has to come from mockups and inert assemblies. Mechanical properties decide how hardware behaves under load, representative parts decide whether a result transfers, and high-speed imaging and radiography are the only witnesses to events too fast for anything else. Choose the wrong diagnostic and the event happens unobserved."
  },
  {
    "title": "Synchronize many channels",
    "objective": "Compare physical timescales, qualify initiation hardware, and coordinate many channels as one system.",
    "briefing": "A multi-channel system can fail even when every part works separately. Compare the relevant timescales, establish lot-acceptance evidence, and then confront synchronization across the full set of channels.",
    "takeaway": "Synchronization is a systems problem involving component variability, signal timing, and shared failure modes.",
    "stops": [
      {
        "group": "T",
        "lesson": 26,
        "task": "Compare competing timescales"
      },
      {
        "group": "E",
        "lesson": 9,
        "task": "Qualify detonator lots"
      },
      {
        "group": "X",
        "lesson": 16,
        "task": "Synchronize many channels"
      }
    ],
    "stake": "Every channel checks out alone and the assembly fails on the bench, twice. Timescales that look comparable on paper differ by orders of magnitude in practice; components come in lots, and a lot is a population with a spread rather than a part number. A system of many channels fails in ways that no single-channel test can show."
  },
  {
    "title": "Build an uncertainty budget",
    "objective": "Combine theoretical uncertainty, measurement covariance, and system-level evidence into one decision tool.",
    "briefing": "More data do not automatically produce more confidence. Propagate uncertain inputs, identify correlated measurements, and assign the uncertainty that belongs to the integrated compression claim.",
    "takeaway": "Uncertainties must be traced through the full evidence chain, especially when measurements share hardware or assumptions.",
    "stops": [
      {
        "group": "T",
        "lesson": 19,
        "task": "Propagate independent uncertainties"
      },
      {
        "group": "P",
        "lesson": 22,
        "task": "Recognize measurement covariance"
      },
      {
        "group": "X",
        "lesson": 17,
        "task": "Build the implosion uncertainty budget"
      }
    ],
    "stake": "More data arrived this month and confidence went down. Independent uncertainties combine one way and correlated ones another, and measurements sharing an instrument, a calibration or an assumption are not independent however many of them there are. The budget the programme decides on has to say which term dominates, and to be honest about the ones that cannot be reduced."
  },
  {
    "title": "Design the integrated non-nuclear campaign",
    "objective": "Set acceptance criteria, instrument the trial, identify the critical path, and choose tests that discriminate among explanations.",
    "briefing": "The project is ready to combine subsystems without nuclear material. Define what counts as acceptable, preserve interpretable measurements, schedule the dependencies, and make the campaign answer the most important unresolved question.",
    "takeaway": "An integrated trial succeeds when criteria, diagnostics, schedule, and scientific discrimination are designed together.",
    "stops": [
      {
        "group": "CM",
        "lesson": 26,
        "task": "Set acceptance criteria"
      },
      {
        "group": "P",
        "lesson": 25,
        "task": "Instrument the non-nuclear test"
      },
      {
        "group": "E",
        "lesson": 23,
        "task": "Identify the critical path"
      },
      {
        "group": "X",
        "lesson": 21,
        "task": "Plan the integrated campaign"
      }
    ],
    "stake": "The whole schedule now runs through one machine shop, and nobody had drawn that until this week. Acceptance criteria have to exist before a test, or the result is argued about afterwards. Instrumentation has to survive the event it is measuring. And a test earns its place by telling two explanations apart, not by being impressive."
  },
  {
    "title": "Treat Trinity as an experiment",
    "objective": "Define what the integrated test must answer, align field engineering with diagnostics, and validate predictions against independent evidence.",
    "briefing": "A dramatic event is not automatically a useful experiment. Specify the questions in advance, build the field system around the evidence needs, cover the failure modes with diagnostics, and establish how predictions will be judged.",
    "takeaway": "A decisive test requires predeclared questions, independent diagnostics, and a comparison between predicted and observed outcomes.",
    "stops": [
      {
        "group": "X",
        "lesson": 22,
        "task": "State what Trinity had to answer"
      },
      {
        "group": "E",
        "lesson": 25,
        "task": "Coordinate Trinity field engineering"
      },
      {
        "group": "P",
        "lesson": 28,
        "task": "Cover the diagnostic failure modes"
      },
      {
        "group": "T",
        "lesson": 27,
        "task": "Validate the model"
      }
    ],
    "stake": "One shot, weather closing in, and every question it is meant to answer has to be written down before it happens. A dramatic event is not automatically an informative one: the diagnostics have to cover the ways they themselves can fail, and predictions have to be recorded in advance so the comparison means something. There is no second attempt to design around."
  },
  {
    "title": "Reconcile evidence and freeze the design",
    "objective": "Compare prediction bands with observations, release materials, reconcile theory and experiment, and control post-test changes.",
    "briefing": "The test has produced data, but the program still must decide what those data mean. Compare observations with uncertainty bands, verify the material record, resolve disagreements between model and measurement, and freeze only the changes supported by evidence.",
    "takeaway": "Design freeze is an evidence decision, not merely a calendar date.",
    "stops": [
      {
        "group": "X",
        "lesson": 25,
        "task": "Compare prediction with observation"
      },
      {
        "group": "CM",
        "lesson": 28,
        "task": "Complete the materials release review"
      },
      {
        "group": "T",
        "lesson": 28,
        "task": "Reconcile theory and experiment"
      },
      {
        "group": "E",
        "lesson": 27,
        "task": "Control the post-Trinity design freeze"
      }
    ],
    "stake": "The observation has landed outside the prediction band, and either the model or the measurement is wrong. Reconciling them means treating both as claims with uncertainties rather than as a winner and a loser — and the material record has to close as carefully as the physics. A design freeze is an evidence decision that happens to have a date on it."
  },
  {
    "title": "Complete the evidence chain—and confront responsibility",
    "objective": "Close the technical reviews while recognizing that scientific completion does not settle the human and political consequences.",
    "briefing": "The final mission asks each scientific line to state what it knows, what remains uncertain, and what follows from the work. Complete the theory, diagnostic, and materials dossiers, then address the responsibilities scientists debated after Trinity.",
    "takeaway": "Technical readiness and historical responsibility are different judgments; a complete curriculum must examine both.",
    "stops": [
      {
        "group": "T",
        "lesson": 29,
        "task": "Hold the final theory review"
      },
      {
        "group": "P",
        "lesson": 29,
        "task": "Hold the diagnostic readiness review"
      },
      {
        "group": "CM",
        "lesson": 29,
        "task": "Complete the materials dossier"
      },
      {
        "group": "X",
        "lesson": 28,
        "task": "Examine scientific responsibility after Trinity"
      }
    ],
    "stake": "The technical questions are closing and the other ones are not. Each line of work states what it knows, what remains uncertain, and how strongly each claim is held — and then the same people have to say what follows from having done the work at all. The scientists who were on this mesa disagreed about that in public for the rest of their lives."
  }
];
export { MISSION_DEFS };
