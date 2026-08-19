// Authored judgement, one entry per high-school campaign.
// Everything numeric is computed from intel.json by render.mjs — this file holds
// only the calls that need a person: which fun formats the subject and the place
// can actually carry, and which stops a slate should touch.
//
// v: s = strong, m = medium, d = defer, r = reject
// Slate items are [stopNumber, targetFormat, note].

export const PROTECT_DERIVE = ['headwater', 'midway', 'groundtruth'];

export const PLANS = {

  // ─────────────────────────────────────────────────────────── contamcity
  contamcity: {
    reading: `Curriculum is in reasonable shape — 7 of 12 equations computed and only three
      select-only concepts — and the mix is already the fourth-best in the set. Three of the five
      gaps sit on stops that look like they compute the thing (a BALLPARK that predicts a freezing
      point, a BALLPARK that audits charge passed), so Phase 0 is likely to clear them. The one
      that will survive is the solubility product, which lives on a CHOICE and nowhere else.`,
    fun: [
      { f: 'PROBE', v: 's', at: 'a new WATER or GASES stop',
        arg: `The place is a river city with an intake laboratory at one end and a plume station at
          the other. PROBE hands over no readings: you sample station by station down the river and
          name where the pattern changes — which is not the station with the worst number on it.`,
        serves: 'transport and dilution; the plume as a gradient rather than a value',
        needs: 'a chain of stations with authored readings and one honest break' },
      { f: 'SWEEP', v: 's', at: 'stop 22 or 24 · ENERGY',
        arg: `A rate law is a slope, and it is the one thing on this syllabus that nothing computes.
          Drag concentration across its range and the response is plotted only where you look; the
          order is the shape you built.`,
        serves: 'rate = k[A]ⁿ — the gap with the most mentions in the game',
        needs: 'a plateau that beats a spike, and showControls() so the sticky row does not eat the slider' },
      { f: 'HOLD', v: 's', at: 'TREAT · the pilot plant',
        arg: `Hold pH inside a closing band while a load of acid arrives. A buffer is exactly a
          quantity that resists being pushed until it does not, and the band closing as capacity is
          consumed is the lesson.`,
        serves: 'buffers and titration, currently taught only as prose',
        needs: 'the band’s closing rate authored from buffer capacity, not chosen for difficulty' },
      { f: 'SPOT', v: 'm', at: 'QUANT · sample intake',
        arg: `A QA acceptance criterion replaced mid-run with nothing announcing it. Real, and it is
          what a quality office does. Weaker here than elsewhere only because the syllabus item it
          carries is method rather than chemistry.`,
        serves: 'chain of custody and acceptance criteria',
        risk: 'score only the discriminating items, or a run that ignores the change passes' },
      { f: 'BELT', v: 'm', at: 'RECORDS or QUANT',
        arg: `A receiving bench sorting arrivals into destructive and non-destructive workflows. The
          game already has an ordering stop about exactly that axis, so the one bit of subject
          matter is available and pre-argued.`,
        serves: 'analytical workflow order',
        risk: 'must be decidable at a glance or it becomes dexterity' },
      { f: 'TRIAL', v: 'm', at: 'the city',
        arg: `Sampling order across a city — upstream before downstream, air before water — driven
          rather than sequenced. It works, but Riverton is wide and the drive is long for one stop.`,
        serves: 'sampling design',
        risk: 'the most expensive item here; gates must stand off each door or they render under the floor' },
      { f: 'LOB', v: 'r', at: '—',
        arg: `Nothing in analytical chemistry is aimed. Rejected on subject, not on taste.` },
    ],
    slates: {
      min: [[14, 'CLOUD', 'the solubility product against a limit, where the common ion narrows nothing', 'Use the common-ion effect to clear the limit'],
            [34, 'SWEEP', 'the rate law as a slope you build by looking', 'What changes the rate?'],
            [10, 'TRIGGER', 'periodic trends as a rule written before the element arrives', 'What the position in the table tells you']],
      bal: [[14, 'CLOUD', '', 'Use the common-ion effect to clear the limit'], [34, 'SWEEP', '', 'What changes the rate?'], [10, 'TRIGGER', '', 'What the position in the table tells you'],
            [40, 'PROBE', 'a mass spectrum read peak by peak rather than picked from four', 'Reading a mass spectrum'],
            [31, 'CHAIN', 'the electrode path, and the step that governs the deposit', 'Find the anode and cathode'],
            [36, 'HOLD', 'the safe envelope held rather than defined', 'Define the safe operating envelope']],
      amb: [[14, 'CLOUD', '', 'Use the common-ion effect to clear the limit'], [34, 'SWEEP', '', 'What changes the rate?'], [10, 'TRIGGER', '', 'What the position in the table tells you'], [40, 'PROBE', '', 'Reading a mass spectrum'],
            [31, 'CHAIN', '', 'Find the anode and cathode'], [36, 'HOLD', '', 'Define the safe operating envelope'],
            [35, 'SPOT', 'a runaway whose acceptance criterion changes under you', 'Build a runaway feedback loop'],
            [17, 'TALLY', 'calibration points accumulated until the curve is defensible', 'Protect the calibration'],
            [9, 'BELT', 'exotherm or not, sorted at the speed a receiving bench works at', 'Heat release is not the spontaneity test']],
    },
  },

  // ───────────────────────────────────────────────────────────── redsand
  redsand: {
    reading: `One equation gap and it is the important one: <em>Q compared with K</em> is mentioned
      at eight stops and computed at none. That is the whole of the equilibrium half of AP Chemistry
      delivered as recognition. Nineteen CHOICE stops out of 45, and the three select-only concepts
      are all physical chemistry a student should be able to produce.`,
    fun: [
      { f: 'SWEEP', v: 's', at: 'stop 8 or 21 · EQUIL',
        arg: `Temperature against conversion, and the curve turns over: hotter is faster and worse.
          "Why the hotter pass gave less" is currently a CHOICE, and it is the single best SWEEP
          available in the catalogue — the trade-off <em>is</em> the shape.`,
        serves: 'Q against K, Le Chatelier, and concept 22 — where a spontaneous reaction stops being one',
        needs: 'a broad plateau that beats a tall spike' },
      { f: 'HOLD', v: 's', at: 'EQUIL · Reactor Hall',
        arg: `Hold reactor temperature inside a closing band while the feed composition drifts. On
          Mars the disturbance is free and authentic — a dust storm cuts the array and the band
          closes with it.`,
        serves: 'kinetics against equilibrium, felt rather than compared',
        needs: 'disturbances integrated with the control untouched, so a do-nothing run fails' },
      { f: 'TRIAL', v: 's', at: 'the track',
        arg: `The place is nine modules buried in regolith <em>along one track</em>, with an ascent
          vehicle on a pad and a gauge that fills as the campaign does. A driven start-up order —
          power, then electrolysis, then the reactor — is the plant’s real dependency graph.`,
        serves: 'process order and the plant as one system',
        risk: 'world work; and the vehicle bay already exists, which is half the cost gone' },
      { f: 'PROBE', v: 's', at: 'a new PHASE or ELEC stop',
        arg: `Take readings module by module along the track and find where conversion falls off.
          The linear site makes the chain physical instead of diagrammatic.`,
        serves: 'concept 27, vapour pressure, and reading a cryogenic tank by it',
        needs: 'one honest break that is not the worst number' },
      { f: 'SPOT', v: 'm', at: 'GIBBS · Plant Control',
        arg: `A load-shed instruction replaced mid-sol. Genuine — but the game already carries an
          ALLOCATE on exactly the dust-storm power budget, so this risks teaching the same thing
          twice.`,
        serves: 'operating discipline',
        risk: 'overlaps the sol-12 ALLOCATE' },
      { f: 'BELT', v: 'd', at: '—',
        arg: `A propellant plant has no sorting line, and inventing one to host a format is how a
          place stops being a place. Defer unless a real sort turns up in the process.` },
      { f: 'LOB', v: 'r', at: '—',
        arg: `The ascent vehicle is the obvious hook and it is the wrong one: a launch is computed
          here, in a course about computing things.` },
    ],
    slates: {
      min: [[8, 'SWEEP', 'the hotter pass, as a curve you build', 'Why the hotter pass gave less'],
            [2, 'CLOUD', 'rate against yield, as two distributions that do not move together', 'Rate is not yield'],
            [36, 'HOLD', 'tank pressure held while the cold end warms', 'The tank pressure that is not a leak']],
      bal: [[8, 'SWEEP', '', 'Why the hotter pass gave less'], [2, 'CLOUD', '', 'Rate is not yield'], [36, 'HOLD', '', 'The tank pressure that is not a leak'],
            [23, 'TRIGGER', 'the temperature at which it stops being spontaneous, written as a rule', 'The reaction that likes being hot'],
            [30, 'PROBE', 'sintering found by reading the line module by module', 'One line off the spent charge'],
            [39, 'BALANCE', 'the space at the top of the tank, closed as a ledger', 'The space left at the top']],
      amb: [[8, 'SWEEP', '', 'Why the hotter pass gave less'], [2, 'CLOUD', '', 'Rate is not yield'], [36, 'HOLD', '', 'The tank pressure that is not a leak'], [23, 'TRIGGER', '', 'The reaction that likes being hot'],
            [30, 'PROBE', '', 'One line off the spent charge'], [39, 'BALANCE', '', 'The space left at the top'],
            [1, 'TRIAL', 'the start-up order, driven along the track', 'What the loop settles at'],
            [16, 'CONTROL', 'what a catalyst cannot do — change one thing and put it back', 'What a catalyst cannot do'],
            [50, 'SPOT', 'the current limit, under an instruction that changes', 'What limits the current']],
    },
  },

  // ──────────────────────────────────────────────────── outbreak_riverton
  outbreak_riverton: {
    reading: `Two of the four gaps are not gaps but absences: <em>Rₑ = R₀ × S</em> and
      <em>CFR = deaths / cases</em> are mentioned at no stop at all. An AP Biology public-health
      course that never reaches the effective reproduction number is missing its spine. The mix is
      healthy — SEQUENCE-led, twelve of them — so this campaign’s work is almost entirely
      curriculum.`,
    fun: [
      { f: 'TALLY', v: 's', at: 'a POP stop',
        arg: `Cases accumulate into bins and the statistic moves because there is not enough behind
          it yet, not because the epidemic changed. That confusion is the single most consequential
          error in outbreak reporting, and it is what TALLY grades.`,
        serves: 'Rₑ and CFR — the two equations the game does not have',
        needs: 'a run where an early batch flatters the number, and a pass mark that stays unprinted' },
      { f: 'TRIAL', v: 's', at: 'the decon tunnel',
        arg: `The place already has the lesson built into it: courtyards, triage marquees, container
          labs, a decon tunnel on the main route and a fence with one gate. Driving that route in
          the wrong order is how a campus infects itself.`,
        serves: 'transmission and barrier practice; the place stops being scenery',
        risk: 'gates stood off each door by d/2 + 10, or every ring renders under the floor' },
      { f: 'SPOT', v: 's', at: 'CLIN or the marquees',
        arg: `A triage criterion replaced mid-shift with nothing announcing it. This is not a game
          conceit — it is week three of an outbreak, and the case definition changes.`,
        serves: 'case definition, and concept 11 — homeostasis and feedback, currently select-only',
        risk: 'score only the discriminating items' },
      { f: 'BELT', v: 's', at: 'the one gate',
        arg: `A fence with one gate is a sorting line whether anybody designed it as one. Sort
          arrivals against the case definition at the speed people actually arrive.`,
        serves: 'case definition as one bit, held at speed',
        risk: 'must be decidable at a glance; a definition needing two clauses is not a BELT' },
      { f: 'PROBE', v: 'm', at: 'FIELD · One Health',
        arg: `Sample ward by ward or village by village and find where the chain breaks. Strong on
          subject; medium only because the campus is compact and the chain would be diagrammatic
          rather than walked.`,
        serves: 'reservoir and transmission chain' },
      { f: 'HOLD', v: 'd', at: '—',
        arg: `Isolation-room pressure held against a closing band is real hospital engineering and
          thin biology. Defer.` },
      { f: 'LOB', v: 'r', at: '—', arg: `Nothing here is aimed.` },
    ],
    slates: {
      min: [[15, 'TALLY', 'accumulate tests until a positive means something — and PPV with it', 'What does a positive mean?'],
            [24, 'CHAIN', 'the same genome, different cells: name the step that governs expression', 'The same genome, different cells'],
            [6, 'HOLD', 'the enzyme assay held in its band while the heat rises', 'When heat changes an enzyme assay']],
      bal: [[15, 'TALLY', '', 'What does a positive mean?'], [24, 'CHAIN', '', 'The same genome, different cells'], [6, 'HOLD', '', 'When heat changes an enzyme assay'],
            [22, 'SPOT', 'a surveillance signal under a case definition that changes', 'Match the surveillance signal'],
            [26, 'PROBE', 'the reservoir found station by station rather than hypothesised', 'Test the reservoir hypothesis'],
            [18, 'BALLPARK', 'the acid–base signal computed, not described', 'Read the downstream acid–base signal']],
      amb: [[15, 'TALLY', '', 'What does a positive mean?'], [24, 'CHAIN', '', 'The same genome, different cells'], [6, 'HOLD', '', 'When heat changes an enzyme assay'], [22, 'SPOT', '', 'Match the surveillance signal'],
            [26, 'PROBE', '', 'Test the reservoir hypothesis'], [18, 'BALLPARK', '', 'Read the downstream acid–base signal'],
            [4, 'TRIAL', 'the decon route, driven', 'What kind of agent fits the whole panel?'],
            [9, 'BELT', 'the gate, sorting against the definition in force', 'Separate binding from entry'],
            [30, 'CLOUD', 'a case-fatality estimate as a band, not a number', 'Track a rising variant']],
    },
  },

  // ───────────────────────────────────────────────────── bring_them_home
  bring_them_home: {
    reading: `Strong already: 8 of 10 equations computed, only two select-only concepts, and the
      best OPERATE count outside Headwater. The two gaps are impulse and centripetal acceleration,
      and impulse is mentioned across three stops that look arithmetic, so Phase 0 may clear it.
      The constraint here is the place: Mission Control is one room with no world to drive, so half
      the fun formats are unavailable on geometry alone — and the two that fit fit exactly.`,
    fun: [
      { f: 'SPOT', v: 's', at: 'a FLIGHT or STRUCT stop',
        arg: `A flight rule <em>is</em> a standing instruction, written on the board, and it is
          replaced mid-shift when the vehicle changes state. No other game in the set has a
          literal, historically accurate home for this format.`,
        serves: 'flight rules and the cost of not noticing a change',
        needs: 'two instructions, at least two changes, and items only one of them wants' },
      { f: 'HOLD', v: 's', at: 'NAV or STRUCT',
        arg: `Hold attitude rate inside a closing band while a leaking thruster pushes. The game
          already carries one FLY, and the argument that made FLY work — bounded commands on
          undamped dynamics, the brake has to lead — is the same argument one step harder.`,
        serves: 'concept 6, circular motion and centripetal force, off the select-only list',
        needs: 'a do-nothing run must fail; integrate the disturbances with the control untouched' },
      { f: 'SWEEP', v: 's', at: 'stop 8 · NAV',
        arg: `"Small burn, large consequence" is a BALLPARK. Burn duration against arrival error is
          a curve with a minimum, and the point of the stop is that the curve is steep.`,
        serves: 'impulse as the change in momentum, made visible',
        needs: 'the response plotted only where the player looks' },
      { f: 'TALLY', v: 'm', at: 'a THERM or STRUCT stop',
        arg: `Telemetry samples accumulate and the trend firms up. Right subject, and the room is
          full of plot boards to put it on. Medium because the game’s CLOUD stop already argues
          about width.`,
        serves: 'measurement noise against a real trend' },
      { f: 'TRIAL', v: 'r', at: '—',
        arg: `One room, four tiers, no vehicle and nowhere to drive. Rejected on geometry.` },
      { f: 'BELT', v: 'r', at: '—',
        arg: `No sorting line exists in Mission Control and inventing one would be set dressing for
          a format.` },
      { f: 'LOB', v: 'r', at: '—',
        arg: `A spacecraft game is the last place to teach that a trajectory has to be felt rather
          than computed. This is the clearest reject in the set.` },
    ],
    slates: {
      min: [[6, 'HOLD', 'what holds it in the curve, held rather than named', 'What holds it in the curve'],
            [9, 'CHAIN', 'the pressure difference, and the link that governs the flow', 'What the pressure difference is for'],
            [8, 'SWEEP', 'small burn, large consequence — as a curve', 'Small burn, large consequence']],
      bal: [[6, 'HOLD', '', 'What holds it in the curve'], [9, 'CHAIN', '', 'What the pressure difference is for'], [8, 'SWEEP', '', 'Small burn, large consequence'],
            [10, 'SPOT', 'reading rotational motion under a flight rule that is replaced', 'Read rotational motion'],
            [7, 'TALLY', 'force to trajectory change, accumulated', 'From force to trajectory change'],
            [30, 'PROBE', 'a fault traced hand over hand along the bus', 'How far it drifts while nobody is steering']],
      amb: [[6, 'HOLD', '', 'What holds it in the curve'], [9, 'CHAIN', '', 'What the pressure difference is for'], [8, 'SWEEP', '', 'Small burn, large consequence'], [10, 'SPOT', '', 'Read rotational motion'],
            [7, 'TALLY', '', 'From force to trajectory change'], [30, 'PROBE', '', 'How far it drifts while nobody is steering'],
            [20, 'RESIDUAL', 'what the trajectory fit leaves over', 'Choose the heat-transfer mechanism'],
            [35, 'TRIGGER', 'a go/no-go threshold written before the number moves', 'Spring-mass period'],
            [40, 'DEGENERACY', 'two controls, one telemetry reading', 'Real trajectory error or common clock drift?']],
    },
  },

  // ──────────────────────────────────────────────────────────── deepwatch
  deepwatch: {
    reading: `The weakest curriculum delivery in the set after Aftershock and Wellmere: 4 of 10
      equations computed, and none of the six gaps sits on an instrument, so Phase 0 will not
      rescue them. Snell’s law is mentioned at five stops and computed at none — and concept 25,
      ray paths and shadow zones, is select-only. Two related facts, one fix. The place is the best
      in the set for this: a submarine is a single line of compartments, which is a chain you walk.`,
    fun: [
      { f: 'PROBE', v: 's', at: 'stop 9 · SONAR',
        arg: `"Where the sound will not go" is a CHOICE. PROBE hands over no readings: take the
          sound-speed profile depth by depth and find where the ray bends away. The shadow zone is
          not the depth with the worst number on it, which is the format’s own sentence.`,
        serves: 'Snell’s law and concept 25 — the largest single gap in the game',
        needs: 'a profile with one honest break and a plausible decoy' },
      { f: 'SWEEP', v: 's', at: 'stop 12 · ENG',
        arg: `"The one shaft speed that rings" is a CHOICE, and resonance is select-only. A
          resonance is the canonical SWEEP: drag shaft speed, watch vibration, and the peak is
          somewhere in a curve nobody drew for you.`,
        serves: 'concept 5, resonance and harmonics',
        needs: 'a narrow peak that is genuinely findable and not marked' },
      { f: 'HOLD', v: 's', at: 'ENG or CTRL',
        arg: `Hold trim or depth inside a closing band while flooding pushes. This is the one thing
          the port from <code>deep_watch/</code> deliberately dropped — a rate that rises while you
          read a gauge had nowhere to live in walk-answer-hand-off. HOLD is where it lives.`,
        serves: 'buoyancy and control; recovers a simulation the port lost',
        needs: 'rate × time authored so a do-nothing run fails' },
      { f: 'TRIAL', v: 's', at: 'the compartment line',
        arg: `Ten compartments, hatches between them, no sky. A casualty route driven in the order
          that does not spread the fire, graded on order and not the clock. The game already carries
          a ROUTE, which is the seated version of this.`,
        serves: 'casualty procedure and compartment dependency',
        risk: 'the boat is its own world module; gates need the theme’s own geometry' },
      { f: 'SPOT', v: 's', at: 'a SONAR watch stop',
        arg: `A standing order changed mid-watch, with nothing announcing it. Submarine watchkeeping
          runs on standing orders; the cost of missing a change is the format’s whole subject.`,
        serves: 'watch discipline and contact classification' },
      { f: 'TALLY', v: 'm', at: 'stop 25 or 36',
        arg: `Pings accumulate into a bearing rate, and early on it moves because there is not
          enough behind it. Good, and it competes with the two SONAR BALLPARKs already there.`,
        serves: 'detection statistics' },
      { f: 'BELT', v: 'r', at: '—', arg: `No line, no bench, no room for one.` },
      { f: 'LOB', v: 'r', at: '—', arg: `Rejected on subject.` },
    ],
    slates: {
      min: [[9, 'PROBE', 'the shadow zone, taken reading by reading', 'Where the sound will not go'],
            [12, 'SWEEP', 'the shaft speed that rings, found by looking', 'The one shaft speed that rings'],
            [8, 'BALLPARK', 'echo ranging computed on a two-way time', 'Two displays, one source']],
      bal: [[9, 'PROBE', '', 'Where the sound will not go'], [12, 'SWEEP', '', 'The one shaft speed that rings'], [8, 'BALLPARK', '', 'Two displays, one source'],
            [32, 'HOLD', 'the link that is not handing the heat on, held in band', 'One link is not handing the heat on'],
            [25, 'TALLY', 'the rise on every bearing, accumulated before it is called', 'The rise on every bearing'],
            [18, 'SPOT', 'smoke, under an instruction that is replaced', 'Smoke is not only a breathing problem']],
      amb: [[9, 'PROBE', '', 'Where the sound will not go'], [12, 'SWEEP', '', 'The one shaft speed that rings'], [8, 'BALLPARK', '', 'Two displays, one source'], [32, 'HOLD', '', 'One link is not handing the heat on'],
            [25, 'TALLY', '', 'The rise on every bearing'], [18, 'SPOT', '', 'Smoke is not only a breathing problem'],
            [10, 'TRIAL', 'what has to be true before the boat commits — driven', 'What has to be true before the boat commits'],
            [5, 'CLOUD', 'the trace that will not resolve, as a width against a limit', 'The trace that will not resolve'],
            [45, 'SWEEP', 'beats, as two frequencies you slide together', 'Why the level pulses three times a second']],
    },
  },

  // ───────────────────────────────────────────────────────────── projecty
  projecty: {
    reading: `Healthy: 8 of 10 computed, and the one true absence is <em>A = λN</em> — activity from
      a decay constant and a population, mentioned nowhere. The other gap sits on a TRACE and is
      probably a Phase 0 phantom. The constraint that shapes everything here is the setting:
      1943, chalkboards and typed sheets, <em>no screens anywhere</em>. That rules out any panel
      that looks like a monitor and it rules in the instruments of the period, which happen to be
      the most tactile ones in the registry.`,
    fun: [
      { f: 'TALLY', v: 's', at: 'a T or P stop',
        arg: `A scaler counting clicks is the defining instrument of 1943 physics, and TALLY is that
          instrument: take counts in batches, watch the rate firm up, and decide when there is
          enough to report. It also computes the one equation the game genuinely does not have.`,
        serves: 'A = λN — the only true absence on the syllabus',
        needs: 'an early batch that flatters the number, and Poisson scatter authored honestly' },
      { f: 'HOLD', v: 's', at: 'P · Experimental Physics',
        arg: `Hold pile power inside a closing band on control rods. This is not an analogy — it is
          what the period’s reactor operators did, with a needle and no computer, and a do-nothing
          run kills the experiment.`,
        serves: 'criticality and multiplication as a controlled rate',
        needs: 'the band closing from the physics, not from a difficulty curve' },
      { f: 'PROBE', v: 's', at: 'a P stop',
        arg: `Walk a counter out from a source and take readings station by station. Inverse square
          is the one law you can discover with a trolley and a chalk mark, and the game has an
          existing TRACE about whether the neutrons or the counts went missing.`,
        serves: 'I ∝ 1/r², and it needs no screen at all',
        needs: 'a break that is not the worst number' },
      { f: 'SWEEP', v: 's', at: 'a T or X stop',
        arg: `Reflector thickness against critical mass, on a plot you build by looking. Period-true:
          a galvanometer and graph paper, one control at a time.`,
        serves: 'concept 15 and the tamper argument' },
      { f: 'BELT', v: 'm', at: 'CM · Chemistry & Metallurgy',
        arg: `A sorting bench in metallurgy, one bit of subject matter at speed. Honest, but a
          calutron is not a conveyor, and concept 21 — isotope separation — deserves a format that
          teaches the separation rather than a sort.`,
        serves: 'concept 21, weakly' },
      { f: 'TRIAL', v: 'm', at: 'the mesa',
        arg: `A real outdoor site with roads and a vehicle, and a driven order between divisions.
          Works; competes with the game’s existing strength, which is 16 BALLPARKs of real
          arithmetic.` },
      { f: 'SPOT', v: 'd', at: '—',
        arg: `Compartmentalised security is a genuine standing-instruction subject and it is the one
          part of this setting where a game should tread carefully. Defer on tone, not on fit.` },
      { f: 'LOB', v: 'r', at: '—',
        arg: `An ordnance division makes this technically available and it should still be refused:
          nothing in this setting should be aimed at anything for fun.` },
    ],
    slates: {
      min: [[32, 'TALLY', 'where the fragments go — counted, so A = λN is computed', 'Where the fragments go'],
            [41, 'BALANCE', 'where the energy comes from, closed as a ledger', 'Where the energy in fission comes from'],
            [43, 'SWEEP', 'separation as a curve rather than an explanation', 'Why separation is a physical problem']],
      bal: [[32, 'TALLY', '', 'Where the fragments go'], [41, 'BALANCE', '', 'Where the energy in fission comes from'], [43, 'SWEEP', '', 'Why separation is a physical problem'],
            [46, 'CHAIN', 'light nuclei, and the step that governs the release', 'Why light nuclei release energy too'],
            [14, 'PROBE', 'inverse square, walked out from the source', 'Are the neutrons missing, or the counts?'],
            [36, 'HOLD', 'pile power held on the rods', 'Critical path to an integrated trial']],
      amb: [[32, 'TALLY', '', 'Where the fragments go'], [41, 'BALANCE', '', 'Where the energy in fission comes from'], [43, 'SWEEP', '', 'Why separation is a physical problem'], [46, 'CHAIN', '', 'Why light nuclei release energy too'],
            [14, 'PROBE', '', 'Are the neutrons missing, or the counts?'], [36, 'HOLD', '', 'Critical path to an integrated trial'],
            [20, 'TRIGGER', 'a shutdown rule written before the number moves', 'Phase diagrams'],
            [27, 'CLOUD', 'a yield estimate as a band the measurements permit', 'High-speed imaging and radiography'],
            [39, 'TRIAL', 'the divisions, in the order the work actually goes', 'Trinity field engineering']],
    },
  },

  // ─────────────────────────────────────────────────────────────── midway
  midway: {
    protect: `All ten DERIVE stops stay. They are the course: an inspector who will not take a
      number nobody can derive is the premise of the game, and the format is the premise rendered.
      Nothing in any slate below touches one.`,
    reading: `All three equation gaps are mentioned on DERIVE stops, which means all three are
      almost certainly Phase 0 phantoms — a derivation of ΣF = ma <em>is</em> the arithmetic, and
      the check cannot currently see a DERIVE’s own lines for these keywords. Expect the real gap
      count to be zero or one. What is real is three <em>absent</em> concepts — free-body thinking,
      what supplies the centripetal force in each case, and work as force times distance — and
      three select-only ones. So this campaign’s plan is almost entirely about the fun side, which
      is fortunate, because its place is the best arcade fit in the catalogue.`,
    fun: [
      { f: 'SWEEP', v: 's', at: 'stop 27 or 35 · SHIP',
        arg: `Concept 29 — resonance and damping, driving an oscillator in step or out of it — is
          select-only across two stops, and the pirate ship is a driven pendulum. Drag the drive
          frequency and the amplitude curve appears only where you looked.`,
        serves: 'concept 29, off the select-only list, on the ride that is literally the apparatus',
        needs: 'a peak that is findable and not marked' },
      { f: 'TRIAL', v: 's', at: 'the park',
        arg: `Seven rides, a front gate, a workshop, and an inspection round whose order is the
          answer — cold checks before the ride runs, brakes before the lift hill. This is the format
          using the whole site as the question.`,
        serves: 'inspection order and ride dependency',
        risk: 'world work, and gates must stand off each door by d/2 + 10' },
      { f: 'PROBE', v: 's', at: 'stop 21 · TOWER',
        arg: `Carry an accelerometer round the coaster and take readings station by station: the
          place where the pattern changes is not the place with the biggest number. "Measuring
          gravity with a boat" is a CHOICE and concept 30 is select-only.`,
        serves: 'concept 30 — measuring g from a period, and why it belongs to the place',
        needs: 'a break in the pattern that is not the peak' },
      { f: 'HOLD', v: 's', at: 'FLUME or TOWER',
        arg: `Hold the flume level, or the drop-tower brake pressure, inside a closing band while
          load steps arrive. A ride operator’s whole job, and the disturbances are the riders.`,
        serves: 'work and energy against a real load' },
      { f: 'SPOT', v: 's', at: 'a WHEEL or BUMPER stop',
        arg: `An inspection criterion replaced mid-round with nothing announcing it — which is what
          happens when a bulletin arrives at nine in the morning. The park is full of items that
          only one criterion wants.`,
        serves: 'acceptance criteria and the cost of not noticing' },
      { f: 'BELT', v: 'm', at: 'BUMPER pavilion',
        arg: `Sorting riders against one restraint criterion at the speed a queue moves. Physically
          exact and thin on physics — one bit, and the bit is a threshold rather than a mechanism.`,
        risk: 'must be decidable at a glance, or it is dexterity' },
      { f: 'LOB', v: 'd', at: 'the ARCADE building',
        arg: `There is a literal arcade on this site, and a ball-toss booth is the one place where a
          withheld launch speed is diegetic rather than dishonest — a midway game is <em>designed</em>
          so you cannot compute it. But AP Physics 1 asks the student to compute projectiles, so the
          stop would teach the opposite of its unit. Defer, and argue it again if the withheld
          quantity can be the booth’s rigging rather than the physics.` },
    ],
    slates: {
      min: [[35, 'SWEEP', 'three tenths of a second — the ship as a driven pendulum', 'Three tenths of a second'],
            [18, 'BALLPARK', 'where the mass is — computed, since rotational inertia is select-only', 'Where the mass is'],
            [21, 'PROBE', 'g measured round the site rather than picked', 'Measuring gravity with a boat']],
      bal: [[35, 'SWEEP', '', 'Three tenths of a second'], [18, 'BALLPARK', '', 'Where the mass is'], [21, 'PROBE', '', 'Measuring gravity with a boat'],
            [3, 'HOLD', '60 people and the same 5 seconds, held rather than described', '60 people and the same 5 seconds'],
            [29, 'SPOT', 'a margin that moves, under a criterion that also moves', 'A margin that moves'],
            [23, 'TRIGGER', 'the tenth of a second, written as a rule before it matters', 'The tenth of a second that matters']],
      amb: [[35, 'SWEEP', '', 'Three tenths of a second'], [18, 'BALLPARK', '', 'Where the mass is'], [21, 'PROBE', '', 'Measuring gravity with a boat'], [3, 'HOLD', '', '60 people and the same 5 seconds'],
            [29, 'SPOT', '', 'A margin that moves'], [23, 'TRIGGER', '', 'The tenth of a second that matters'],
            [26, 'TRIAL', 'the inspection round, driven, in the order that is the answer', 'What a safety factor says'],
            [9, 'BELT', 'the restraint criterion at queue speed', '100 collisions an hour'],
            [42, 'CLOUD', 'four adults and why not five — a distribution against a limit', 'Four adults, and why not five']],
    },
  },

  // ────────────────────────────────────────────────────────── groundtruth
  groundtruth: {
    protect: `All ten DERIVE stops stay. Ground Truth is AP Physics C E&M taught in ten
      derivations, and that is the game. No slate below touches one.`,
    reading: `The cleanest curriculum in the set outside Headwater: <strong>all eleven equations
      computed</strong>, no debt at all. It is also the second-worst format mix in the catalogue at
      23 CHOICE out of 45 — which is exactly the pair of facts that killed the diversity gate.
      Nothing here is broken. The finding is six select-only mechanism concepts: fields of sheets
      and spheres, shielding, equipotentials, force on a current, the LR transient, and energy in
      the magnetic field — all currently reached by picking from four.`,
    fun: [
      { f: 'LOB', v: 's', at: 'SHOT · Launch Control',
        arg: `<strong>This is the one game where LOB is not a compromise.</strong> The site has a
          launch rail and the science is rocket-triggered lightning: you fire a wire-trailing rocket
          into a charged cloud base. Angle and charge against a mark is the actual operation, and
          the withheld quantity is honest — nobody knows the payout well enough to compute the
          strike, which is <em>why</em> the technique is empirical. Everywhere else in the catalogue
          LOB teaches "it cannot be computed" as a lie. Here it is the finding.`,
        serves: 'triggered-lightning technique, and the empirical half of a derived course',
        needs: 'marks ordered outward by distance, and a rigging quantity that is genuinely unknowable' },
      { f: 'SWEEP', v: 's', at: 'stop 8 or 14 · COUPLE / EARTH',
        arg: `Walk a probe out across the earthing compound and plot potential against distance:
          equipotentials are a shape, and concept 9 is select-only. "One foot and the other" is a
          CHOICE about step potential, which is the same curve read at two points.`,
        serves: 'concepts 9 and 25 — equipotentials, step-and-touch',
        needs: 'the response plotted only where the player looks' },
      { f: 'HOLD', v: 's', at: 'BANK · Impulse Hall',
        arg: `Charge a capacitor bank to a target and hold it while leakage drains it and the storm
          window closes. The LR transient — concept 28, select-only — is a rate you feel rather than
          a formula you recognise.`,
        serves: 'concept 28, inductive volts against resistive volts',
        needs: 'a do-nothing run must fail' },
      { f: 'SPOT', v: 's', at: 'a MAST or FIELD stop',
        arg: `A storm-safety instruction replaced mid-run: sixty metres of instrumented mast on a
          salt flat with a cell coming in is the most legitimate reason in the set for an
          instruction to change without ceremony.`,
        serves: 'operating discipline under a moving hazard' },
      { f: 'TRIAL', v: 's', at: 'the salt flat',
        arg: `The flattest site in the catalogue, with a mast, an earthing compound, an outstation
          and a launch rail — and a storm arriving. Driven order: earth before you touch, screen
          before you connect.`,
        serves: 'concept 5, shielding, and concept 25',
        risk: 'world work' },
      { f: 'TALLY', v: 's', at: 'a SEIS-equivalent SHOT stop',
        arg: `Strikes accumulate and the statistic firms up. A storm season is exactly a case where
          the early number moves for the wrong reason.`,
        serves: 'measurement statistics on a rare event' },
      { f: 'BELT', v: 'r', at: '—', arg: `Nothing here is sorted. Rejected on subject.` },
    ],
    slates: {
      min: [[6, 'PROBE', 'inside the sheet — read station by station instead of picked', 'Inside the sheet'],
            [8, 'SWEEP', 'step potential as a curve across the compound', 'One foot and the other'],
            [24, 'CHAIN', 'the cabinet as a loop, and the link that governs the current', 'The cabinet is a loop']],
      bal: [[6, 'PROBE', '', 'Inside the sheet'], [8, 'SWEEP', '', 'One foot and the other'], [24, 'CHAIN', '', 'The cabinet is a loop'],
            [30, 'HOLD', 'making a microsecond on purpose, held against leakage', 'Making a microsecond on purpose'],
            [39, 'SPOT', 'what to put on a microsecond, under an instruction that changes', 'What to put on a microsecond'],
            [2, 'BALLPARK', 'the spinning shutter, computed', 'A spinning shutter and a sign']],
      amb: [[6, 'PROBE', '', 'Inside the sheet'], [8, 'SWEEP', '', 'One foot and the other'], [24, 'CHAIN', '', 'The cabinet is a loop'], [30, 'HOLD', '', 'Making a microsecond on purpose'],
            [39, 'SPOT', '', 'What to put on a microsecond'], [2, 'BALLPARK', '', 'A spinning shutter and a sign'],
            [12, 'LOB', 'the launch rail — the one honest LOB in the catalogue', 'The afternoon Vero is right about'],
            [14, 'TALLY', 'two conductors, two hundred metres, and enough strikes to say so', 'Two conductors, two hundred metres'],
            [3, 'TRIAL', 'the flat, driven — earthing before touching', 'Twenty-five ohms, at what']],
    },
  },

  // ───────────────────────────────────────────────────────────── blackout
  blackout: {
    reading: `In good shape: 9 of 11 computed, the third-best mix in the set, and only two
      select-only concepts. One gap sits on a CONTROL and may be a Phase 0 phantom; the voltage-drop
      equation on stops 7 and 8 probably is not. The two select-only concepts are the two that
      matter most for a switching station — earthing and step-and-touch potential, and cascading
      failure — and both are currently one stop of multiple choice.
      <strong>Read <code>plans/blackout-sequence.html</code> first.</strong> Format mix and equations
      owed are this document's question; <em>when</em> the course teaches each concept against where
      the story is standing is a different one, and it is the worse of the two here — day 1 asks about
      droop control and the concept droop is built out of is claimed by no stop until day 12. Twelve of
      those inversions rest on material this campaign itself teaches later, and the fix is not a
      re-order.`,
    fun: [
      { f: 'HOLD', v: 's', at: 'OPS · System Operations',
        arg: `Hold frequency inside a closing band while load steps arrive. The game <em>opens</em>
          on the swing equation; HOLD is that equation with the player’s hand on it, and grid
          control is the canonical instance of the format anywhere in the catalogue.`,
        serves: 'the swing equation as a rate rather than a formula',
        needs: 'disturbances integrated with the control untouched; a do-nothing run must fail' },
      { f: 'TRIAL', v: 's', at: 'the switchyard',
        arg: `A switching order driven through the yard, graded on order and not the clock: isolate,
          prove dead, earth, then work. Getting that order wrong is the accident the industry is
          built around, and concept 25 is select-only.`,
        serves: 'concept 25 — earthing, step-and-touch potential and safety',
        risk: 'world work; the yard and gatehouse already exist' },
      { f: 'PROBE', v: 's', at: 'stop 6 or 7 · OPS / DIST',
        arg: `Take readings feeder by feeder along a line and find where the voltage collapses —
          which is not the point with the lowest number. Concept 28, cascading failure, is
          select-only, and a cascade is a chain you walk.`,
        serves: 'concept 28 and the voltage-drop equation',
        needs: 'one honest break and a decoy' },
      { f: 'SPOT', v: 's', at: 'a TRANS or DIST stop',
        arg: `A switching instruction replaced mid-shift. Control-room work runs on standing
          instructions and the cost of missing a revision is measured in seconds, which is what the
          format weights.`,
        serves: 'operating discipline' },
      { f: 'TALLY', v: 'm', at: 'LOAD · Forecasting',
        arg: `Demand samples accumulate into a forecast that firms up. Right subject; competes with
          the game’s existing SWEEP and its ten BALLPARKs.` },
      { f: 'BELT', v: 'd', at: '—',
        arg: `A spares-and-cable store is a sort, and it teaches inventory rather than electricity.
          Defer.` },
      { f: 'LOB', v: 'r', at: '—', arg: `Nothing is aimed. Reject.` },
    ],
    slates: {
      min: [[37, 'SWEEP', 'the ground is not at one voltage — plot it and see', 'The ground is not at one voltage'],
            [34, 'PROBE', 'the contingency found by walking the feeders rather than read off a screen', 'The failure that has not happened'],
            [2, 'CONTROL', 'why the wires are not at wall voltage — change one thing, reverse it', 'The reason the wires are not at wall voltage']],
      bal: [[37, 'SWEEP', '', 'The ground is not at one voltage'], [34, 'PROBE', '', 'The failure that has not happened'], [2, 'CONTROL', '', 'The reason the wires are not at wall voltage'],
            [21, 'HOLD', 'the far end held up while load steps arrive', 'Why the far end sits low'],
            [26, 'ATTEST', 'what is stored and for how long — the record is not the condition', 'What is stored, and for how long'],
            [14, 'CHAIN', 'what actually limits a conductor', 'What actually limits a conductor']],
      amb: [[37, 'SWEEP', '', 'The ground is not at one voltage'], [34, 'PROBE', '', 'The failure that has not happened'], [2, 'CONTROL', '', 'The reason the wires are not at wall voltage'], [21, 'HOLD', '', 'Why the far end sits low'],
            [26, 'ATTEST', '', 'What is stored, and for how long'], [14, 'CHAIN', '', 'What actually limits a conductor'],
            [23, 'TRIAL', 'the switching order, driven — isolate, prove dead, earth', 'A reading taken without a connection'],
            [30, 'SPOT', 'an instruction revised mid-shift', 'Why it cannot go faster'],
            [40, 'TALLY', 'demand accumulated until the forecast can be signed', 'Hours over limit, added up']],
    },
  },

  // ──────────────────────────────────────────────────────────── aftershock
  aftershock: {
    reading: `<strong>The worst curriculum delivery in the set: 2 of 10 equations computed.</strong>
      Four of the eight gaps sit on instruments and may be Phase 0 phantoms, but four do not, and
      two equations — a building’s natural period and base shear — are mentioned <em>nowhere</em>,
      with base shear also listed as an absent concept. Twenty-two CHOICE stops, seven select-only
      concepts, and <em>zero OPERATE stops</em> — the only game in the set with none. The place, by
      contrast, is one of the strongest: granite bench above, liquefied fill below, and a 1.8 m
      fault scarp you walk between them.`,
    fun: [
      { f: 'TALLY', v: 's', at: 'stop 19 or 20 · HAZ / SEIS',
        arg: `Aftershocks accumulate and the rate falls as a power law. Omori’s law is mentioned at
          <em>fifteen</em> stops and computed at none, and "a rate is not a schedule" is currently a
          CHOICE. TALLY is the format whose subject is precisely that an early number moves because
          there is not enough behind it.`,
        serves: 'n(t) = K/(c+t)^p — the most-mentioned uncomputed equation in the repo',
        needs: 'an early batch that flatters the rate, and a pass mark that stays unprinted' },
      { f: 'PROBE', v: 's', at: 'stop 26 or 40 · GEO',
        arg: `Walk from the granite bench across the scarp onto the fill, taking a reading at each
          station, and name where the ground changes. Site amplification is mentioned at thirteen
          stops and computed at none, and the place was built to be walked exactly this way.`,
        serves: 'A_soft / A_rock — and the scarp stops being scenery',
        needs: 'stations along the real traverse; one honest break that is not the worst number' },
      { f: 'SWEEP', v: 's', at: 'stop 1 or 11 · SEIS / STRUCT',
        arg: `Building period against ground period, and the peak is where they meet. Concept 8 —
          natural period, and resonance between building and ground — is select-only on one stop,
          and it is the single most consequential idea in earthquake engineering.`,
        serves: 'concept 8, and T ≈ 0.1 N, which is mentioned nowhere at all',
        needs: 'a findable peak, unmarked' },
      { f: 'SPOT', v: 's', at: 'stop 8 or 9 · SAFE / HAZ',
        arg: `A placarding criterion replaced mid-round with nothing announcing it. "Green does not
          mean safe" is already the game’s own sentence; a rapid-assessment crew whose criterion is
          revised on day three is what actually happened in every event this game is drawn from.`,
        serves: 'concept 22 — rapid assessment against detailed evaluation, currently select-only',
        risk: 'score only the discriminating items' },
      { f: 'TRIAL', v: 's', at: 'the bay',
        arg: `An assessment round driven across the scarp: which buildings first, and the walk
          between them is the geology. Order is the answer — the school before the parade building,
          because four hundred children arrive on Monday.`,
        serves: 'concept 22 and triage order',
        risk: 'world work, and the most expensive item in this plan' },
      { f: 'HOLD', v: 'm', at: 'STRUCT · shoring',
        arg: `Hold a shoring jack’s load inside a band while the structure settles and aftershocks
          arrive. Real, and the physics is statics rather than the dynamics the syllabus is short
          of.` },
      { f: 'BELT', v: 'd', at: '—',
        arg: `Sorting placards at speed would teach the criterion and reward speed on a subject
          where speed killed people. Defer on tone.` },
      { f: 'LOB', v: 'r', at: '—', arg: `Reject, and not only on subject.` },
    ],
    slates: {
      min: [[19, 'TALLY', 'the rate, falling — accumulated so Omori is computed', 'The rate, falling'],
            [26, 'PROBE', 'soft ground three days on, walked station by station', 'Soft ground, three days on'],
            [11, 'SWEEP', 'what eight degrees does — as a resonance curve', 'What eight degrees does']],
      bal: [[19, 'TALLY', '', 'The rate, falling'], [26, 'PROBE', '', 'Soft ground, three days on'], [11, 'SWEEP', '', 'What eight degrees does'],
            [22, 'BALLPARK', 'a number with a method attached — stress and strain, computed', 'A number, with a method attached'],
            [8, 'SPOT', 'green does not mean safe, under a criterion that changes', 'Green does not mean safe'],
            [31, 'CHAIN', 'walls that fall outward — name the link that governs', 'Walls that fall outward']],
      amb: [[19, 'TALLY', '', 'The rate, falling'], [26, 'PROBE', '', 'Soft ground, three days on'], [11, 'SWEEP', '', 'What eight degrees does'], [22, 'BALLPARK', '', 'A number, with a method attached'],
            [8, 'SPOT', '', 'Green does not mean safe'], [31, 'CHAIN', '', 'Walls that fall outward'],
            [39, 'CLOUD', 'a smaller shake against a weaker building, as a band against a limit', 'A smaller shake against a weaker building'],
            [23, 'HOLD', 'shoring held while the aftershocks arrive', 'Which way the cracks run'],
            [9, 'TRIAL', 'the assessment round, driven across the scarp', 'The ones worth a second visit']],
    },
  },

  // ───────────────────────────────────────────────────────────── icecore
  icecore: {
    reading: `Strong: 9 of 10 computed and the remaining gap sits on a BALLPARK that looks like it
      already does the arithmetic, so Phase 0 will probably clear it to zero. Two select-only
      concepts and two absent ones. Fourteen CHOICE stops is the only real weakness, and the place
      is unusually good for the formats that would replace them: a core line, a cold laboratory, a
      drill trench under a tower, and flag lines across a plateau.`,
    fun: [
      { f: 'PROBE', v: 's', at: 'stop 5 or 8 · CORE / COLD',
        arg: `"The metre with no label" is a CHOICE. Take readings down the core, depth by depth,
          and find where layer counting stops working — which is not the depth with the worst number
          on it. The core line is a chain in the most literal sense in the catalogue.`,
        serves: 'concept 23 — core logging and chain of custody — and depth-age dating',
        needs: 'a profile with one honest break' },
      { f: 'TALLY', v: 's', at: 'stop 8 or 32 · COLD / CORE',
        arg: `Counting annual layers until the date is defensible <em>is</em> ice-core dating, and it
          is the same decision TALLY grades: when is there enough behind the number to report it.`,
        serves: 'layer counting against radiometric dating, N(t) = N₀e^(−t/τ)',
        needs: 'an early count that flatters the date' },
      { f: 'BELT', v: 's', at: 'CORE · the processing line',
        arg: `A core-processing line is a conveyor with a sort on it, and the one bit of subject
          matter is real: this section is for gas, that one for isotopes, and a mis-sorted section
          cannot be recovered. Concept 23 is select-only.`,
        serves: 'concept 23, chain of custody, at the speed a line moves',
        risk: 'must be decidable at a glance' },
      { f: 'HOLD', v: 's', at: 'DRILL · the trench',
        arg: `Hold borehole fluid pressure inside a closing band as the hole deepens. Get it wrong
          and the hole closes — a consequence that is physical, expensive and true.`,
        serves: 'pressure with depth, and drilling as a controlled rate' },
      { f: 'TRIAL', v: 's', at: 'the flag lines',
        arg: `Flag lines exist on this site because in a whiteout they are the only way to know where
          you are. A driven route between modules, graded on order — and the format’s own sentence
          is "learn it as places, not as a count of paces."`,
        serves: 'field discipline; the flattest, emptiest horizon in the set made load-bearing',
        risk: 'world work' },
      { f: 'SWEEP', v: 'm', at: 'a GAS or DATA stop',
        arg: `A proxy against a driver, plotted only where you look. The game already carries one
          SWEEP, so a second competes with itself.` },
      { f: 'SPOT', v: 'm', at: 'FIELD · Snow Study',
        arg: `A sampling instruction revised mid-traverse. Fits; medium because the game’s ATTEST
          already argues about records.` },
      { f: 'LOB', v: 'r', at: '—', arg: `Reject on subject.` },
    ],
    slates: {
      min: [[5, 'PROBE', 'the metre with no label, read down the core', 'The metre with no label'],
            [8, 'TALLY', 'layers counted until the marker is defensible', 'Which year marker survives the depth'],
            [20, 'SWEEP', 'four times the dust — as a curve against its driver', 'Four times the dust']],
      bal: [[5, 'PROBE', '', 'The metre with no label'], [8, 'TALLY', '', 'Which year marker survives the depth'], [20, 'SWEEP', '', 'Four times the dust'],
            [6, 'BELT', 'the processing line, sorted before it warms', 'The sample that was clean until it was handled'],
            [32, 'HOLD', 'the clock that does not need layers — held against decay', 'The clock that does not need layers'],
            [43, 'SPOT', 'a sampling instruction revised mid-traverse', 'The sentence the record will carry']],
      amb: [[5, 'PROBE', '', 'The metre with no label'], [8, 'TALLY', '', 'Which year marker survives the depth'], [20, 'SWEEP', '', 'Four times the dust'], [6, 'BELT', '', 'The sample that was clean until it was handled'],
            [32, 'HOLD', '', 'The clock that does not need layers'], [43, 'SPOT', '', 'The sentence the record will carry'],
            [12, 'TRIAL', 'the flag lines, driven, in a whiteout', 'Which differences a shared instrument removes'],
            [27, 'RESIDUAL', 'what the proxy fit leaves over', 'The last hundred metres'],
            [38, 'INJECT', 'a known signal pushed through the game’s own pipeline', 'What comes back first']],
    },
  },

  // ─────────────────────────────────────────────────── planetary_defense
  planetary_defense: {
    reading: `Five gaps, three of them on instruments and likely Phase 0 phantoms. Only one
      select-only concept, which is the best figure in the set. Fourteen CHOICE stops is the
      weakness. The place is nocturnal and linear — one dark road along a ridge, domes with open
      shutters, a thirty-metre dish and red service lamps — which suits the formats that run on
      their own clock, because an observing night is already a closing window.`,
    fun: [
      { f: 'TALLY', v: 's', at: 'stop 5 or 9 · ORBIT / OPS',
        arg: `Astrometric observations accumulate and the orbit tightens; early on the arc moves
          because there is not enough of it, not because the object did anything. "Build the
          observation arc" is currently a SEQUENCE, and this is the same idea with the player
          deciding when to stop.`,
        serves: 'the parallax and orbit-determination gaps',
        needs: 'an early arc that flatters the solution' },
      { f: 'SWEEP', v: 's', at: 'stop 15 · CHAR',
        arg: `A thermal spectrum has a peak, and Wien’s law is where it sits. The game already has a
          DEGENERACY here about bounding the diameter; a SWEEP over wavelength is the measurement
          that breaks the degeneracy, and it is plotted only where you look.`,
        serves: 'λ_max T = b',
        needs: 'the peak unmarked' },
      { f: 'TRIAL', v: 's', at: 'the ridge road',
        arg: `One road, played entirely at night, 1.6 km of it with base camp in the first 200 m.
          A driven order between domes set by what is above the horizon when — the sky is the
          constraint and it moves.`,
        serves: 'observing planning; the nocturnal ridge made load-bearing',
        risk: 'world work, and the site already has mapRadius set for exactly this scale' },
      { f: 'HOLD', v: 's', at: 'RADAR · the dish',
        arg: `Hold a thirty-metre dish on target while wind and tracking error push it, inside a band
          that closes as the object gets faster. Physical, real, and the failure is losing the pass.`,
        serves: 'tracking, and angular rates' },
      { f: 'BELT', v: 's', at: 'DISC · Survey Telescope',
        arg: `A survey pipeline sorts detections into real and artefact, at speed, all night. That is
          exactly one bit of subject matter held under pressure, and the game already carries an
          INJECT about pushing a known population through the pipeline — so the BELT is the pipeline
          the INJECT measures.`,
        serves: 'detection and false positives; pairs with the existing INJECT',
        risk: 'decidable at a glance, or it is dexterity' },
      { f: 'SPOT', v: 's', at: 'an OPS stop',
        arg: `An observing priority replaced mid-night. A ridge full of red lamps and a target
          setting in forty minutes is the most natural home for an instruction that changes without
          ceremony.`,
        serves: 'triage of observing time' },
      { f: 'PROBE', v: 'm', at: '—',
        arg: `The ridge is long enough to walk a chain along, but there is no physical quantity that
          varies down it. Medium at best.` },
      { f: 'LOB', v: 'r', at: '—',
        arg: `A kinetic impactor is the obvious hook and the wrong one: the whole point of deflection
          is that a centimetre a second is <em>computed</em> years ahead. The game says so at stop 39.` },
    ],
    slates: {
      min: [[9, 'TALLY', 'the orbit collapsed by accumulating arc, not by picking', 'Collapse the orbit uncertainty'],
            [15, 'SWEEP', 'the diameter bound broken by a spectrum you scan', 'Bound the diameter'],
            [29, 'CHAIN', 'why it broke up high — name the governing transfer', 'Why did the object break up high in the atmosphere?']],
      bal: [[9, 'TALLY', '', 'Collapse the orbit uncertainty'], [15, 'SWEEP', '', 'Bound the diameter'], [29, 'CHAIN', '', 'Why did the object break up high in the atmosphere?'],
            [39, 'BALLPARK', 'why a centimetre a second is enough — computed', 'Why a centimetre a second is enough'],
            [22, 'HOLD', 'the dish held on target through the pass', 'What does radar measure?'],
            [26, 'CLOUD', 'the arrival speed as a band the measurements permit', 'The speed it actually arrives at']],
      amb: [[9, 'TALLY', '', 'Collapse the orbit uncertainty'], [15, 'SWEEP', '', 'Bound the diameter'], [29, 'CHAIN', '', 'Why did the object break up high in the atmosphere?'], [39, 'BALLPARK', '', 'Why a centimetre a second is enough'],
            [22, 'HOLD', '', 'What does radar measure?'], [26, 'CLOUD', '', 'The speed it actually arrives at'],
            [8, 'BELT', 'the survey pipeline, sorted at the speed detections arrive', 'Which orbit feature does the data constrain?'],
            [38, 'SPOT', 'an observing priority replaced mid-night', 'When does it come back?'],
            [5, 'TRIAL', 'the ridge road, driven, against a sky that moves', 'Build the observation arc']],
    },
  },

  // ──────────────────────────────────────────────────────────── the_trial
  the_trial: {
    reading: `Twenty-four CHOICE stops out of 45 and 5 of 11 equations computed. Three gaps sit on
      instruments and may clear in Phase 0; three do not, and they are the three that decide whether
      a trial can answer its question — alpha spending, the events formula, and conditional power.
      The place is the hardest constraint in the set: one long floor, no vehicles, and the walk down
      it is distance from the patient. That rules out the driven formats and leaves the ones that
      run on data, which is fortunate, because this is AP Statistics.`,
    fun: [
      { f: 'SWEEP', v: 's', at: 'stop 29 or 34 · STAT',
        arg: `Drag the sample size and watch the interval narrow — and it narrows as the square root,
          which is the one thing about precision every student gets wrong. "How big, and how wide" is
          currently a BALLPARK; the curve is the answer and it is plotted only where you look.`,
        serves: 'SE = √(p(1−p)/n) and CI ≈ estimate ± 1.96 × SE — two gaps in one panel',
        needs: 'the diminishing return visible in the shape, not stated in the hint' },
      { f: 'TALLY', v: 's', at: 'stop 16 · STAT',
        arg: `Events accumulate and the analysis becomes possible. "How much of the trial has
          happened" is a BALLPARK about exactly this, and TALLY’s own subject — when is there enough
          to report — <em>is</em> interim analysis.`,
        serves: 'the events formula and alpha spending',
        needs: 'an early look that flatters the result' },
      { f: 'SPOT', v: 's', at: 'stop 10 or 40 · STAT / SAFE',
        arg: `A stopping rule replaced mid-trial with nothing announcing it. This is the sharpest
          statistical version of the format anywhere: an unannounced change to a stopping rule is
          how alpha gets spent without anybody deciding to spend it.`,
        serves: 'Σ α_spent ≤ α — a budget for error that does not refill',
        risk: 'score only the discriminating items' },
      { f: 'HOLDOUT', v: 's', at: 'stop 34 · STAT',
        arg: `"The subgroup that crossed" is a CHOICE, and subgroup analysis is the canonical
          overfitting story in clinical research. Fit the subgroup rule on one half, freeze it, score
          it on the half it never saw, and the flattering answer costs the stop.`,
        serves: 'multiplicity and subgroup discipline',
        needs: 'a spike in the fitting curve that beats the honest answer' },
      { f: 'BELT', v: 'm', at: 'SITE · monitoring',
        arg: `Case report forms sorted against one criterion — protocol deviation or not — at the
          speed a monitoring visit runs. Real trial work, and one honest bit. Medium because the
          criterion in practice needs more than one clause.`,
        risk: 'a definition needing two clauses is not a BELT' },
      { f: 'TRIAL', v: 'd', at: 'the long floor',
        arg: `The corridor is walkable and its length is the theme, so a driven order is not absurd.
          Deferred because a coordinating centre has nothing to drive and the gates would be doors.` },
      { f: 'HOLD', v: 'r', at: '—', arg: `No physical quantity to hold. Reject on geometry.` },
      { f: 'LOB', v: 'r', at: '—', arg: `Reject.` },
    ],
    slates: {
      min: [[29, 'SWEEP', 'how big and how wide — the square root, as a shape', 'How big, and how wide'],
            [16, 'TALLY', 'events accumulated until the interim can be read', 'How much of the trial has happened'],
            [34, 'HOLDOUT', 'the subgroup that crossed, scored on data it never saw', 'The subgroup that crossed']],
      bal: [[29, 'SWEEP', '', 'How big, and how wide'], [16, 'TALLY', '', 'How much of the trial has happened'], [34, 'HOLDOUT', '', 'The subgroup that crossed'],
            [10, 'SPOT', 'what an extra look spends, under a rule that changes', 'What an extra look spends'],
            [20, 'ATTEST', 'everyone as assigned — the record is not the condition', 'Everyone as assigned'],
            [2, 'TRIGGER', 'one outcome named in advance, written as a rule before the data moves', 'One outcome, named in advance']],
      amb: [[29, 'SWEEP', '', 'How big, and how wide'], [16, 'TALLY', '', 'How much of the trial has happened'], [34, 'HOLDOUT', '', 'The subgroup that crossed'], [10, 'SPOT', '', 'What an extra look spends'],
            [20, 'ATTEST', '', 'Everyone as assigned'], [2, 'TRIGGER', '', 'One outcome, named in advance'],
            [41, 'CLOUD', 'what the rest of the trial would probably do, as a band', 'What the rest of the trial would probably do'],
            [44, 'BALANCE', 'what can be claimed — closed as a ledger', 'What can be claimed'],
            [12, 'BELT', 'deviation or not, at monitoring-visit speed', 'When the blind is opened for one person']],
    },
  },

  // ──────────────────────────────────────────────────────────── headwater
  headwater: {
    protect: `All thirteen DERIVE stops stay. Headwater is AP Calculus AB and the derivation rail is
      the course. Nothing below touches one.`,
    reading: `<strong>Nothing is wrong with this campaign.</strong> All fifteen equations computed,
      no debt, <em>no select-only concepts at all</em>, no absent concepts, and four OPERATE stops —
      the most in the set. It already carries SWEEP, PROBE, HOLDOUT, RESIDUAL and PROPAGATE. It is
      the worked example of what every other plan in this set is aiming at, and it is included here
      only because the question was asked of every high-school campaign.<br><br>
      Everything below is therefore a <em>fun</em> argument and nothing else. There is no curriculum
      case for any of it, and if the schedule is short this is the campaign to skip.`,
    fun: [
      { f: 'HOLD', v: 's', at: 'a gate-chamber stop',
        arg: `<strong>The best HOLD available in the catalogue.</strong> Hold the reservoir inside a
          closing band while an inflow surge arrives and you work the gates — rate in against rate
          out, which is the fundamental theorem with a hundred metres of air off the crest if you get
          it wrong. The game is a dam; the format is a dam.`,
        serves: 'accumulation and rate of change, felt rather than differentiated',
        needs: 'the band closing from the hydrology; a do-nothing run must fail' },
      { f: 'TRIAL', v: 's', at: 'the galleries',
        arg: `A five-storey tower in a gorge with galleries, a gate chamber and no ceiling over the
          hallways. An inspection route driven in the order the water goes, graded on order.`,
        serves: 'the interior as a system rather than a set of rooms',
        risk: 'world work; the theme brings its own world module' },
      { f: 'SPOT', v: 'm', at: 'a gate stop',
        arg: `A gate-operating instruction replaced mid-flood. Legitimate, and it teaches operating
          discipline rather than calculus — which is fine as one stop and would be wrong as three.` },
      { f: 'TALLY', v: 'm', at: 'an inflow stop',
        arg: `Inflow readings accumulate into a defensible estimate. The game already carries
          RESIDUAL and PROPAGATE, so this competes with itself.` },
      { f: 'BELT', v: 'r', at: '—', arg: `Nothing is sorted in a dam. Reject.` },
      { f: 'LOB', v: 'r', at: '—',
        arg: `A spillway trajectory is the hook and it is computed in this course, on purpose, by
          the student. Reject.` },
    ],
    slates: {
      min: [[42, 'HOLD', 'the only trace on the screen — held, while the surge arrives', 'The only trace on the screen']],
      bal: [[42, 'HOLD', '', 'The only trace on the screen'], [18, 'SPOT', 'two peaks, under a gate instruction replaced mid-flood', 'The two peaks are not the same hour'],
            [22, 'TALLY', 'one number for six hours — accumulated until it is defensible', 'One number for six hours']],
      amb: [[42, 'HOLD', '', 'The only trace on the screen'], [18, 'SPOT', '', 'The two peaks are not the same hour'], [22, 'TALLY', '', 'One number for six hours'],
            [30, 'TRIAL', 'the galleries, driven, in the order the water goes', 'What the correction does not touch']],
    },
  },

  // ──────────────────────────────────────────────────────────── sightline
  sightline: {
    reading: `Seven of seven equations computed and no debt — and <strong>eight select-only
      mechanism concepts, the most in the set</strong>, plus three absent ones and 27 CHOICE stops.
      This is the cleanest illustration of why the gate is delivery and not variety: on equations
      Sightline is perfect, and on <em>how</em> it teaches it is the weakest campaign here.<br><br>
      Some of that is legitimate — AP Psychology asks a student to discriminate, and "identify the
      bias" is honestly a CHOICE. But selective attention, inattentional blindness, encoding and
      co-witness contamination are things a player should be made to <em>experience</em>, and this
      is the one subject in the catalogue where a format can do that directly.`,
    fun: [
      { f: 'SPOT', v: 's', at: 'stop 5, 11 or 34 · MEMORY / BRAIN',
        arg: `<strong>SPOT was designed with this syllabus in mind and Sightline does not author
          one.</strong> An instruction withdrawn without announcement, measured in the seconds either
          side of the change, is inattentional blindness and selective attention rendered rather than
          described — and the repo already argues that for Sightline this is the syllabus and not
          flavour.`,
        serves: 'concepts 5, 6 and 8 — selective attention, inattentional blindness, encoding',
        needs: 'at least two changes, items only one instruction wants, and only discriminating items scored' },
      { f: 'BELT', v: 's', at: 'a MEMORY or PERCEPT stop',
        arg: `A binary sort against a line that speeds up <em>is</em> a divided-attention task. The
          format’s own argument — this is the sorting you should be able to do without stopping to
          think — is the definition of automaticity, which is on the syllabus.`,
        serves: 'attention, automaticity and encoding under load',
        risk: 'decidable at a glance; and the pressure must grade accuracy, never reaction speed' },
      { f: 'SWEEP', v: 's', at: 'stop 8, 23 or 30 · BRAIN / IDENT',
        arg: `The identification distance is <em>painted on the floor of the hall</em>. Drag distance
          or illumination and watch identification accuracy fall away: the curve is the answer, and
          concept 4 — dark adaptation, and how long the eye takes to arrive — is select-only across
          three stops.`,
        serves: 'concepts 4 and 27; the place’s one painted line made load-bearing',
        needs: 'the fall-off unmarked' },
      { f: 'TALLY', v: 's', at: 'stop 39 or 40 · SOCIAL / MEMORY',
        arg: `Identifications accumulate into a hit and false-alarm rate, and d′ falls out. The game
          already computes d′ — this makes the player build the counts it comes from, and the honest
          decision is when there are enough.`,
        serves: 'signal detection, and concept 27 — reliability',
        needs: 'an early tally that flatters the witness' },
      { f: 'TRIAL', v: 'm', at: 'the Ferrier Street corner',
        arg: `The hall has a street corner rebuilt across the end of it. Walking the reconstruction in
          a set order — view before you are told what to look for, never the reverse — is real
          procedure. Medium because one corner is a small route.` },
      { f: 'HOLD', v: 'r', at: '—',
        arg: `No physical quantity to hold; arousal is not a needle. Reject on subject rather than
          geometry.` },
      { f: 'LOB', v: 'r', at: '—', arg: `Reject.` },
      { f: 'STACK', v: 'r', at: '—',
        arg: `Would have been the best fit in the catalogue — a question rail answered under a
          filling well is a dual-task paradigm. Suspended repo-wide, so unavailable. Revisit when it
          is fixed.` },
    ],
    slates: {
      min: [[11, 'SPOT', 'the middle of the event and its edges — with the instruction withdrawn', 'The middle of the event and its edges'],
            [8, 'SWEEP', 'what the dark takes, as a curve against time', 'What the dark takes'],
            [5, 'BELT', 'six seconds, and what they hold, under divided attention', 'Six seconds, and what they hold']],
      bal: [[11, 'SPOT', '', 'The middle of the event and its edges'], [8, 'SWEEP', '', 'What the dark takes'], [5, 'BELT', '', 'Six seconds, and what they hold'],
            [22, 'TRACE', 'twenty minutes on the kerb — two accounts that have met are one account', 'Twenty minutes on the kerb'],
            [40, 'TALLY', 'what Aktaş remembers now, accumulated into a rate', 'What Aktaş remembers now'],
            [33, 'CONTROL', 'nobody said anything — change one thing and put it back', 'Nobody said anything']],
      amb: [[11, 'SPOT', '', 'The middle of the event and its edges'], [8, 'SWEEP', '', 'What the dark takes'], [5, 'BELT', '', 'Six seconds, and what they hold'], [22, 'TRACE', '', 'Twenty minutes on the kerb'],
            [40, 'TALLY', '', 'What Aktaş remembers now'], [33, 'CONTROL', '', 'Nobody said anything'],
            [19, 'CLOUD', 'what the hormones cannot explain — a band, not a value', 'What the hormones cannot explain'],
            [47, 'ATTEST', 'being frightened as evidence — the record is not the condition', 'What being frightened is evidence of'],
            [30, 'TRIAL', 'the corner, walked in the order procedure requires', 'What this does and does not settle']],
    },
  },

  // ────────────────────────────────────────────────────────────── seedbank
  seedbank: {
    reading: `The worst mix in the catalogue — 29 of 45 stops are CHOICE — on a syllabus whose
      centrepiece nothing computes. Phase 0 will clear two of the four gaps (the recombination
      fraction is computed on a DEGENERACY board; Nₑ is computed on a BALLPARK whose relationship
      the keyword list cannot see), leaving <strong>two real gaps, both ratios, both on one
      stop</strong>. Seven select-only concepts, five of them mechanisms.`,
    fun: [
      { f: 'TALLY', v: 's', at: 'stop 4 · CROSS · day 2',
        arg: `Score plants in batches and watch the ratio settle. The format’s own subject — when is
          there enough data to report — is exactly the syllabus item, "reading a count as evidence
          for a mechanism". A first tray that wobbles past 3 : 1 and then holds is the lesson; a
          second that lands near 15 : 1 refuses to fit one gene.`,
        serves: '3 : 1 and 15 : 1 computed · concepts 3, 4, 5',
        needs: 'authored bins, an unprinted pass mark, and the honest-number rule' },
      { f: 'SPOT', v: 's', at: 'stop 39 · POP · day 13',
        arg: `The stop already exists: "leave part of it unsprayed and mark the plants that stay
          clean." A rogueing crew whose criterion changes from <em>pull anything flowering early</em>
          to <em>pull anything with rust</em> is what happens when the season turns.`,
        serves: 'concept 21 (G×E) off the select-only list · concept 13',
        risk: 'score only the discriminating items' },
      { f: 'CHAIN', v: 's', at: 'stop 12 · DRY · day 4',
        arg: `The opening a leaf takes carbon in through is the opening it loses water through — a
          transfer path with one governing link, which is what CHAIN is. The best CHAIN available in
          this game, and it lands on a select-only concept.`,
        serves: 'concepts 15, 16, 17',
        needs: 'a per-link reading on every link — the field the importer refuses under any other name' },
      { f: 'TRIAL', v: 's', at: 'stop 27 · VAULT · day 9',
        arg: `The rings exist because of isolation distance and contamination direction, and stop 27’s
          takeaway is already "the loss happened in the field, on the way back in." Drive the
          inspection route: clean nursery before infected plots, vault before field, never the
          reverse.`,
        serves: 'concepts 1, 12, 26 — and the place stops being scenery',
        risk: 'gates stood off each door by d/2 + 10, or they render under the floor' },
      { f: 'SWEEP', v: 's', at: 'stop 22 or 24 · TRIAL',
        arg: `Drag selection intensity against realised gain and the curve bends over: select harder
          on a noisy trial and you buy scatter, not response. R = h²·S is already computed here —
          this makes the h² visible instead of given.`,
        serves: 'concept 20, regression to the mean, onto OPERATE' },
      { f: 'BELT', v: 'm', at: 'the threshing floor',
        arg: `A literal threshing floor and a processing hall. The honest bit of subject matter is
          bagged versus open-pollinated heads — a real sort, done at speed, carrying concept 24.`,
        serves: 'concept 24 · and the most grade-6-friendly item here',
        risk: 'decidable at a glance, or it is dexterity' },
      { f: 'HOLD', v: 'm', at: 'stop 1 or a DRY stop',
        arg: `Concept 2 — cold and dry both work, and they multiply — is a product, and HOLD is the
          only format that makes a player feel one: hold seed moisture in a band while wet lots keep
          arriving.`,
        risk: 'HOLD’s own subject is control engineering. It teaches the biology only if the band closes from the moisture–temperature product. On stop 1 it is also the first thing a player ever does.' },
      { f: 'PROBE', v: 'd', at: 'VAULT',
        arg: `Germination shelf by shelf, finding where the pattern breaks. Fun, and concept 1 is
          already the best-served in the game at CONSTRUCT across seven stops. Buys engagement and
          no curriculum.` },
      { f: 'LOB', v: 'r', at: 'the rings',
        arg: `The rings are painted isolation distances, so this is the best physical fit in the
          catalogue — and LOB withholds the launch speed <em>so it cannot be computed</em>, which
          would teach that isolation distance is a feel. Isolation distances are set from measured
          data. The fun is real and the lesson is backwards.` },
    ],
    slates: {
      min: [[4, 'TALLY', 'the generation counted, so both ratios are computed', 'Counting a generation'],
            [12, 'CHAIN', 'one opening, two flows, and the link that governs', 'What the crop cannot do without water'],
            [39, 'SPOT', 'a rogueing criterion that changes when the season turns', 'An outbreak in the right place']],
      bal: [[4, 'TALLY', '', 'Counting a generation'], [12, 'CHAIN', '', 'What the crop cannot do without water'], [39, 'SPOT', '', 'An outbreak in the right place'],
            [6, 'BALLPARK', 'where a tonne of grain comes from — closed as a ledger', 'Where a tonne of grain comes from'],
            [15, 'ALLOCATE', 'harvest index as one finite budget', 'Short is not simply worse'],
            [22, 'SWEEP', 'selection intensity against realised gain', 'What one round returns'],
            [1, 'HOLD', 'cold and dry, as a product you hold — only if the band closes from it', 'Why the vault is cold']],
      amb: [[4, 'TALLY', '', 'Counting a generation'], [12, 'CHAIN', '', 'What the crop cannot do without water'], [39, 'SPOT', '', 'An outbreak in the right place'], [6, 'BALLPARK', '', 'Where a tonne of grain comes from'],
            [15, 'ALLOCATE', '', 'Short is not simply worse'], [22, 'SWEEP', '', 'What one round returns'], [1, 'HOLD', '', 'Why the vault is cold'],
            [27, 'TRIAL', 'the inspection route, driven', 'What the store did right'],
            [33, 'BELT', 'bagged versus open heads, at threshing-floor speed', 'The fortnight when it is possible'],
            [43, 'ATTEST', 'what the catalogue says and what is there — the format’s own sentence', 'What the catalogue says and what is there']],
    },
  },
};
