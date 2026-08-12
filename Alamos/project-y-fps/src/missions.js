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
    "stake": "April 1943, and the site is three weeks old. Five divisions, one mesa, and three different ways of writing the same nucleus on three different blackboards. Oppenheimer has scheduled a colloquium every week for exactly this reason: nothing here can be coordinated until everybody describes matter the same way. Today you settle three things. What a nuclide symbol actually specifies. Why two isotopes of an element act alike in a beaker and differently in a counter. And how radiation becomes a number an instrument can report. The second follows from the first: chemistry is decided by the electrons, and the electrons are set by the protons. The third is how you know any of it — radiation knocks electrons off atoms in a detector, and that tiny charge becomes a pulse. Every measurement made here for the next two years rests on these three."
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
    "stake": "May 1943. Two architectures are on the table, the site can properly staff one of them, and Groves wants to know which by the end of the month. Today you work out where nuclear energy comes from, check that the instruments reporting it are calibrated, and compare the two paths. The energy comes from mass that is no longer there. Weigh a nucleus and it comes out lighter than its parts added up. That missing mass is the energy holding it together, and it is why nuclear changes release so much more than chemical ones. But every energy figure quoted on this mesa is really a pulse height on an instrument, converted by a calibration somebody had to establish with a known source. An uncalibrated number is a voltage with ambitions. Choose on preference instead of evidence and a year of work goes into the wrong programme."
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
    "stake": "July 1943, and three groups have reported yields that cannot all be right. Seaborg's chemistry says one thing, and Woods's counters another. The sample decays while the chemistry is still running, so the amount at the end is not the amount you started with. Today you handle decay as arithmetic, follow an element through a separation, and measure what a counter reads with nothing in front of it. Decay is a rate: a fixed fraction goes per unit time, which is what a half-life describes, so the answer depends on how long the chemistry took. A tracer is a tiny amount of a radioactive form mixed in, which lets you follow where the bulk of an element goes through steps you cannot see into. And every counter reads something with no sample in front of it — cosmic rays, contamination, the building. Woods will not report a number until she has measured that, which is why hers is the count the others are being checked against. A count with no background under it is not a measurement."
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
    "stake": "October 1943. Two groups have a difference in their counts that everybody believes in. Wu has run the numbers and the statistics say it is nothing, and Bethe has asked for both to be recalculated by somebody who did not do them the first time. The programme is about to allocate material on the strength of it. Today you work with the number that says how likely an interaction is. You decide when a difference in counts is real. And you check that a chemical yield is what it claims. A cross section is a probability expressed as an area: the bigger it is, the more often a particle interacts. Counting is a random process. Repeat the same measurement and you get different numbers, and the spread is predictable — so a difference smaller than the spread is not evidence of anything. And a yield figure means nothing without a purity figure beside it — which is the question Wu asks first and the one the reporting group did not answer."
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
    "stake": "April 1944, and the first reactor plutonium has arrived on the mesa. It is not the material the gun design was built around, and Bethe has spent a week with the counting data saying so quietly. Today you follow what happens to neutrons as they move through matter. You work out how to detect something with no charge. And you face what this material means for the second design path. A neutron loses energy by bouncing off nuclei, and it loses most when it hits something of a similar mass — which is why light elements slow neutrons down and heavy ones barely do. Energy matters because a slow neutron and a fast one behave completely differently. Detection is indirect: a neutron has no charge, so you catch it by the charged particle it produces."
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
    "stake": "July 1944. A process nobody had to care about last spring is about to end a year of work in a fortnight, and Oppenheimer has to reorganise the laboratory around the consequence. Today you measure the neutron background the new material produces, follow the argument that killed the earlier design, and take the programme to a different one. Some heavy nuclei split on their own, without being hit by anything, on their own schedule. That produces a steady trickle of neutrons. Any assembly method has to finish before one of those arrives at the wrong moment, so a background rate is really a deadline in disguise. That is the entire argument, and it is made of a counting rate on a bench. Half the site has to be told why the work they have done for a year is over."
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
    "stake": "September 1944, and compression is now the whole programme. Hornig, casting the metal at the centre of it, has found that it changes density under conditions the design will actually meet. Nobody wanted that, and von Neumann wants the shock tables redone with it in. Today you work with the relationship between pressure, volume and temperature, read what a phase diagram is telling you, and understand what shaping a detonation wave achieves. An equation of state is that relationship written down. Squeeze something, and how much it gives depends on how hot it is and what it is made of. A phase diagram says which arrangement of atoms exists under which conditions. Different arrangements have different densities, so a material can rearrange itself part way through and behave like something else. None of the three can be assumed from the other two. And shaping a wave that spreads outward into one that converges inward is von Neumann's problem before it is Kistiakowsky's: it is done in numbers first, and only then does X Division cut anything."
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
    "stake": "October 1944. “Nearly simultaneous” has been in every memo for two months. Nobody has written down what it means in microseconds. That is why Kistiakowsky's division and Bethe's have been arguing past each other since August. Today you turn it into a number, calibrate the channels that measure it, and give ordnance a requirement they can build to. A requirement is not a requirement until it has a number, a tolerance and an instrument that can see it. So the first job is defining what is being measured: here, a spread of arrival times across many points, summarised as one figure. The second is proving the timing channels agree with each other. Measure simultaneity with instruments that disagree and you have measured the instruments."
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
    "stake": "December 1944. The thing itself cannot be tested, so everything the programme believes has to come from stand-ins, and Bacher's committees exist to force the interfaces between them. Today you characterise how the real materials behave under load, decide what a mockup can and cannot tell you, and choose diagnostics for events too fast to watch. Mechanical properties decide how hardware behaves when it is pushed, and they belong to a specific material in a specific state, not to a name on a drawing. A mockup transfers only where it matches what matters. And an event lasting microseconds leaves no witness at all unless the instrument was chosen and placed beforehand. That means high-speed imaging, and radiography, which sees through what light cannot."
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
    "stake": "February 1945, and Kistiakowsky's assembly has failed on the bench twice while every channel checks out alone. Bradbury wants the procedure rewritten before a third attempt; Kistiakowsky wants to know which lot the failures came from. Today you compare the timescales involved, work out what a batch of components actually guarantees, and coordinate many channels as one system. Timescales that look similar on paper differ by factors of a thousand in practice, and only the shortest sets what has to be controlled. Components come in lots, and a lot is a population with a spread, not a part number. Accepting one means testing enough of it to know that spread — and when the test destroys the part, every test costs a unit. A system of many channels also fails in ways no single channel can show, which is why Bradbury's answer — one written procedure, checked the same way every time — catches things no bench test does. What matters is not whether each one works. It is whether they work together, on time, on the same signal."
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
    "stake": "March 1945, and this is where Bethe is right and Groves does not want to hear it. More data arrived this month and confidence went down. Today you work out how uncertainties combine, recognise when measurements are not telling you separate things, and assign a number to the whole system. Independent errors partly cancel when combined, so several rough measurements can beat one careful one. But measurements sharing an instrument, a calibration or an assumption are not independent. Combine them as if they were and you get a small number that is a lie. The honest budget names which term dominates and which cannot be reduced by working harder. This is the figure that will be quoted, years later, in a room where nobody remembers what went into it."
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
    "stake": "April 1945. The whole schedule now runs through one machine shop and nobody had drawn that until Bacher's committee sat down to force the interfaces. Groves wants a date; Bacher will not schedule a test he cannot instrument. Today you set what counts as a passing test, instrument it so the result can be interpreted, and find what the schedule really depends on. Acceptance criteria have to exist before the test, or the result gets argued about afterwards by whoever most wants a particular answer. Instrumentation has to survive the event it is measuring, which is a design problem of its own. And a critical path is the chain of things that cannot happen side by side. Everything else has slack, and effort spent there changes nothing at all. A test earns its place by telling two explanations apart, not by being impressive to watch. Bacher's rule for this laboratory is the shortest one on the mesa: no test without diagnostics."
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
    "stake": "July 1945, and there is one shot with weather closing in. Groves wants the date held; Bethe wants the questions written down before anybody drives to the tower — and this time it is Groves who has to give way, because a test whose questions are decided afterwards answers none of them. Today you state those questions in advance. You build the field arrangements around the measurements, rather than the other way round. And you cover the ways the instruments themselves can fail. A dramatic event is not automatically an informative one. What makes it an experiment is that predictions were written down beforehand, so the comparison afterwards means something, and that every instrument was placed to answer a specific question. There is no second attempt to design around."
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
    "stake": "Late July 1945. Fermi dropped shredded paper from the bunker and got about ten kilotons from how far the blast wave carried it. That sits outside the band the theory division predicted, and either the model is wrong or the measurement is — with Bethe, who has already corrected several overestimates on paper, on one side of it. Today you compare prediction against observation properly, close the materials record, and decide what may still change. Reconciliation means treating both sides as claims with uncertainties, rather than as a winner and a loser. A disagreement is only real if it is bigger than the error bars on both. Often it is not, and the argument was about noise. The materials record has to close as carefully as the physics, because a number is only about a thing if you know which thing it was measured on. A design freeze is an evidence decision that happens to have a date on it, and Oppenheimer is the one who has to hold the room to that distinction."
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
    "stake": "August 1945. The technical questions are closing and the other ones are not. Today each line of work states what it knows, what is still uncertain, and how strongly each claim is held. Then the same people have to say what follows from having done the work at all. The first part is ordinary discipline: a conclusion carries the strength of the evidence under it, and a dossier that presents everything at the same confidence is useless to whoever inherits it. The second part has no method. Szilard circulated a petition in July with a hundred and fifty-five signatures on it. Oppenheimer spent the rest of his life being asked. The scientists who were here disagreed about this in public for decades, and never about the physics, which they all agreed on."
  }
];
export { MISSION_DEFS };
