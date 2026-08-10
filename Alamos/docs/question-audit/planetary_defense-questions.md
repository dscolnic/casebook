# Planetary Defense — every question, with its answer

**Subject:** Astronomy — discovery, astrometry, characterisation, radar, impact physics  
**Audience:** Undergraduate / advanced high school  
**Content source:** `gamekit/themes/planetary_defense/content`  
**Shape:** 15 missions × 3 authored stops = 45 questions. (In play the engine also inserts a callback stop from day 3, drawn from these same lessons.)

---

## Mission 1 — The Discovery Image

**Objective:** Validate a new-object candidate and preserve the measurements needed for follow-up.

**Stake:** If the candidate is real and close, every hour of delay expands the region where it may be lost.

### M1.1 — Object or artifact?

**Format:** DIAGNOSIS · **Area:** DISC · **Place:** Survey Telescope Control

**Scene shown to the player**

> The survey pipeline flagged a faint point that moved between three exposures on one night. In each frame the source is star-like rather than smeared, so it is not a cosmic-ray hit; the detector defect map shows no hot pixel at those positions; after astrometric alignment the background stars stay fixed while this one does not; and a second telescope on another mountain recovers something near the predicted position. A real Solar System object moves coherently in sky coordinates rather than in detector coordinates, and it exists for instruments that are not this one. The alert about to go out will task observatories on three continents.

**Question**  Which explanation fits the motion, image shape, detector map, and independent follow-up?

**Panel headline**  A survey pipeline flags a faint moving point near the ecliptic.

**Instrument panel**

| Zone | Reading | Value | Status |
| --- | --- | --- | --- |
| Three survey exposures | Three survey exposures | Source moves linearly between frames | alarm |
| Point-spread shape | Point-spread shape | Star-like in each exposure | alarm |
| Detector defect map | Detector defect map | No hot pixel at those positions | normal |
| Background stars | Background stars | Remain fixed after astrometric alignment | normal |
| Second telescope | Second telescope | Recovers source near predicted position | alarm |

**Choices offered**

- Real moving Solar System object — _A point source changes sky position coherently while stars and detector coordinates remain stable._
- Cosmic-ray hit — _A charged particle creates a transient sharp feature in one exposure._
- Hot detector pixel — _A fixed detector location appears bright whenever that pixel is read._
- Image-registration artifact — _Misalignment makes many fixed stars appear to shift together._

**Correct answer**

**Real moving Solar System object**

**Why (shown in verdict):** The source is point-like, moves across different pixels while stars remain fixed, appears repeatedly, and is recovered independently. No single detector or registration artifact explains the full panel.

**Takeaway:** A discovery becomes convincing when motion is coherent in sky coordinates but not tied to one detector, exposure, or telescope.

### M1.2 — Validate the discovery

**Format:** SEQUENCE · **Area:** DISC · **Place:** Image Processing Lab

**Scene shown to the player**

> The survey flagged a faint point that moved between three exposures, in a field holding two satellite trails, a hot pixel column and forty thousand catalogued stars. Validation is a pipeline with a fixed order: calibrate the frames and pick out what moved, reject the known — stars, satellites, defects, already-catalogued objects — then measure position, time, brightness and their uncertainties, and finally submit the candidate with a predicted region for follow-up. That last step is what makes it a discovery rather than a claim: it hands somebody else a place to point and a way to prove you wrong.

**Question**  Arrange the four cards from the earliest prerequisite or cause to the latest result. The interface should lock correctly placed cards after each check.

**Cards to order** (presented shuffled)

- Calibrate the images and identify transient or moving candidates.
- Reject known stars, satellites, detector defects, and catalogued objects.
- Measure position, time, brightness, and uncertainty for each detection.
- Submit the candidate and predicted follow-up region to the tracking network.

**Correct answer**

1. **Calibrate the images and identify transient or moving candidates.**
2. **Reject known stars, satellites, detector defects, and catalogued objects.**
3. **Measure position, time, brightness, and uncertainty for each detection.**
4. **Submit the candidate and predicted follow-up region to the tracking network.**

**Why (shown in verdict):** Calibration and rejection precede astrometry and follow-up.

**Takeaway:** A discovery is useful only when another observer can test it.

### M1.3 — How far did it move?

**Format:** BALLPARK · **Area:** ORBIT · **Place:** Minor-Planet Operations Desk

**Scene shown to the player**

> The object shifts 12 arcseconds in 20 minutes, and the desk needs a rate before it can predict where to look next. Angular rate is the whole basis of follow-up: it decides how long an exposure can be before the source trails, how large a search box the next telescope needs, and whether the motion is consistent with something in the main belt or something much closer. Two positions and a time interval turn an appearance into a measurement.

**Question**  Estimate the apparent motion in arcseconds per hour.

**Correct answer**

Equation shown: `{0} ÷ {1} × 60`
Tiles offered: `12 arcsec (measured shift)`, `20 min (between the two frames)`, `3 exposures`, `1,200 s (the same interval, in seconds)`, `24 h`
Tiles that belong: `12 arcsec (measured shift)`, `20 min (between the two frames)`
Decoy tiles: `3 exposures`, `1,200 s (the same interval, in seconds)`, `24 h`
Formula: `a/b*60`
**Target: 36 arcsec/hour** (tolerance ±3)
Explanation shown: The 60 in the template is minutes per hour, so the interval has to be in minutes. Handing it the same interval in seconds gives an answer 60 times too small — which would look like a main-belt object rather than something close.

**Why (shown in verdict):** Angular rate decides how long an exposure can be before the source trails, how large a search box the next telescope needs, and whether the motion is consistent with something distant or something near.

**Takeaway:** Repeated images turn apparent motion into a measurable rate.

---

## Mission 2 — Confirm the Motion

**Objective:** Produce a consistent astrometric track and identify observations that should be down-weighted or repeated.

**Stake:** A weak orbit can either lose the object or falsely place Earth in its path.

### M2.1 — Why do the measured positions disagree?

**Format:** DIAGNOSIS · **Area:** OPS · **Place:** Follow-Up Telescope Network

**Scene shown to the player**

> Follow-up astrometry from one wide-field camera curves away from the orbit fit while a second telescope agrees with the prediction. The asteroid's residuals grow toward the edge of that camera's field; the reference stars in the same frames show the same spatial pattern; the exposure timestamps agree with the observatory clock; and the distortion calibration on file is older than the current camera configuration. A residual that follows position on the focal plane is a property of the instrument, not of the orbit — the reference stars are the control, and they are not moving.

**Question**  Which explanation fits the residual pattern across field position, timing, catalog stars, and the independent telescope?

**Panel headline**  Follow-up astrometry from one wide-field camera curves away from the orbit fit, while a second telescope agrees.

**Instrument panel**

| Zone | Reading | Value | Status |
| --- | --- | --- | --- |
| Asteroid residuals | Asteroid residuals | Grow toward field edge | alarm |
| Reference-star residuals | Reference-star residuals | Show the same spatial pattern | alarm |
| Exposure timestamps | Exposure timestamps | Agree with observatory clock | alarm |
| Second telescope | Second telescope | Agrees with predicted orbit | normal |
| Distortion calibration | Distortion calibration | Older than current camera configuration | alarm |

**Choices offered**

- Focal-plane distortion calibration error — _A position-dependent mapping from detector coordinates to sky coordinates biases both stars and asteroid near the field edge._
- Real asteroid acceleration — _A physical force changes only the asteroid trajectory on the sky._
- Timing error — _Incorrect exposure time shifts moving-object positions while fixed reference stars remain correctly mapped._
- Catalog-wide star error — _The reference catalog is wrong in the same way for both telescopes and all field positions._

**Correct answer**

**Focal-plane distortion calibration error**

**Why (shown in verdict):** The residual follows detector position and appears in reference stars, while timestamps are sound and a second telescope agrees with the orbit. That pattern localizes the problem to the camera geometry model.

**Takeaway:** Astrometric residuals can diagnose the instrument: a bias that follows focal-plane position rather than the moving object is a calibration signature.

### M2.2 — Build the observation arc

**Format:** SEQUENCE · **Area:** ORBIT · **Place:** Astrometry Lab

**Scene shown to the player**

> Six observatories have now reported positions. Two use a different time standard, one has no plate solution recorded at all, and the arc they jointly define is four hours long. Building an arc means putting every measurement into one coordinate frame and one time system first, fitting a preliminary sky-plane motion, then reading the residuals for structure that points at a station, a clock or a part of a detector rather than at the sky. The output that matters is the next uncertainty region — an astrometric model is tested by predicting where the object will be, not by fitting where it was.

**Question**  Arrange the four cards from the earliest prerequisite or cause to the latest result. The interface should lock correctly placed cards after each check.

**Cards to order** (presented shuffled)

- Place every measurement in a common coordinate and time system.
- Fit a preliminary sky-plane motion model.
- Inspect residuals for station, time, or field-dependent structure.
- Predict the next uncertainty region and schedule follow-up.

**Correct answer**

1. **Place every measurement in a common coordinate and time system.**
2. **Fit a preliminary sky-plane motion model.**
3. **Inspect residuals for station, time, or field-dependent structure.**
4. **Predict the next uncertainty region and schedule follow-up.**

**Why (shown in verdict):** A preliminary model becomes useful when residuals are interrogated and predictions are tested.

**Takeaway:** Prediction is the operational test of an astrometric model.

### M2.3 — Buy the best next observation

**Format:** CHOICE · **Area:** OPS · **Place:** Time Standards Room

**Scene shown to the player**

> There are four hours of discretionary telescope time and four ways to spend them. The arc is short, the object is faint and setting, and a press office has been asking since lunchtime whether it can say anything. Another exposure from the same telescope adds a point that looks like the ones already held; a later observation lengthens the time baseline, which is what actually shrinks the orbit family; a geographically separated observation adds parallax, a fundamentally different constraint. Follow-up is bought for information gain, and the two options that add the most are not the two that are easiest to schedule.

**Question**  Four hours of discretionary time, and the object is faint and setting. What do you book?

**Choices offered**

- A later observation that lengthens the time baseline.
- Another exposure immediately, from the same telescope.
- A geographically separated observation, for parallax.
- A press release, before the object is confirmed.

**Correct answer**

**A later observation that lengthens the time baseline.**

**Why (shown in verdict):** The orbit family is wide because the arc is short, and arc length is the quantity that collapses it. A point taken later changes the geometry the fit is solving; a point taken now barely changes anything the fit already has.

**Why the others do not hold**

- Another exposure tonight adds a measurement almost identical to the ones already held, and identical measurements do not narrow an orbit.
- A separated observation adds parallax, which constrains distance rather than arc. It is the right second booking and answers a different question.
- A release before confirmation spends the only thing the office cannot buy back, on an object that may not survive the next night.

**Takeaway:** The best follow-up is chosen for information gain, not convenience or publicity.

---

## Mission 3 — An Orbit from Sparse Data

**Objective:** Construct a family of allowed orbits and choose observations that collapse the dangerous dimensions.

**Stake:** An overconfident nominal orbit can hide impact solutions that remain inside the uncertainty region.

### M3.1 — From angles to orbit family

**Format:** SEQUENCE · **Area:** ORBIT · **Place:** Orbit Determination Center

**Scene shown to the player**

> The arc is short, and every orbit that fits it projects to nearly the same track across the sky. Some of those orbits pass a million kilometres from Earth and some do not, and nothing measured so far separates them. The honest procedure is to keep the whole family: combine the timed directions with any range information, generate the state vectors consistent with the observations and their uncertainties, propagate each of those under gravity, and compare where they end up. Uncertainty here is not an error bar on one trajectory — it is an ensemble of physically allowed trajectories, and the spread is the answer.

**Question**  Arrange the four cards from the earliest prerequisite or cause to the latest result. The interface should lock correctly placed cards after each check.

**Cards to order** (presented shuffled)

- Combine timed directions and any range information.
- Generate state vectors consistent with the observations and uncertainties.
- Propagate each allowed state under gravity.
- Compare future sky positions and Earth-approach distances across the family.

**Correct answer**

1. **Combine timed directions and any range information.**
2. **Generate state vectors consistent with the observations and uncertainties.**
3. **Propagate each allowed state under gravity.**
4. **Compare future sky positions and Earth-approach distances across the family.**

**Why (shown in verdict):** Sparse angular data define a region of state space, not a unique orbit.

**Takeaway:** Uncertainty should be propagated as an ensemble of physically allowed trajectories.

### M3.2 — Which orbit feature does the data constrain?

**Format:** PROTOCOL · **Area:** OPS · **Place:** Celestial Mechanics Group

**Scene shown to the player**

> Four kinds of evidence, each strong in a different direction. A longer observation arc constrains the shape of the orbit because curvature only becomes visible over time. Radar range fixes distance directly, which optical astrometry never does. Radar range rate fixes how fast that distance is changing. Observations from widely separated points on Earth give parallax, and therefore distance, from geometry alone. Orbit determination is an information problem before it is an arithmetic one: what to buy next depends on which direction of the uncertainty is widest.

**Question**  Match each situation to the most scientifically justified interpretation, control, or response. Each choice is used once.

**Situations to match**

- Longer observation arc.
- Radar range.
- Radar range rate.
- Observations from widely separated Earth locations.

**Choices offered**

- Curvature and mean motion.
- Line-of-sight distance.
- Line-of-sight velocity.
- Parallax and distance geometry.

**Correct answer**

1. Longer observation arc.  →  **Curvature and mean motion.**
2. Radar range.  →  **Line-of-sight distance.**
3. Radar range rate.  →  **Line-of-sight velocity.**
4. Observations from widely separated Earth locations.  →  **Parallax and distance geometry.**

**Why (shown in verdict):** Different observations collapse different orbit degeneracies.

**Takeaway:** Orbit determination is an information-geometry problem.

### M3.3 — Collapse the orbit uncertainty

**Format:** CHOICE · **Area:** OPS · **Place:** Follow-Up Scheduling Desk

**Scene shown to the player**

> The allowed orbits form a family rather than a line, and the corridor they sweep across Earth's distance is wide enough to matter. Radar has a window in nine days and measures the one quantity optical astrometry cannot; extending optical tracking over more nights lengthens the arc; observing from a second hemisphere adds parallax. One proposal on the table only changes how the same data are displayed — it produces a sharper-looking orbit from no new evidence, which is the most dangerous product on the list because it looks like progress.

**Question**  Radar has a window in nine days. What do you do with the nine nights before it?

**Choices offered**

- Extend optical tracking over as many of them as the weather allows.
- Hold the telescopes and wait for the radar range.
- Observe from a second hemisphere for a parallax baseline.
- Reprocess the existing data into a sharper nominal orbit.

**Correct answer**

**Extend optical tracking over as many of them as the weather allows.**

**Why (shown in verdict):** The object is faint and setting, so every night not taken is arc that cannot be recovered later. Radar will measure a quantity optical work never can, and it will measure it against whatever arc exists by then.

**Why the others do not hold**

- Waiting for radar makes the whole campaign depend on one window and one weather forecast, and leaves the arc as short as it is tonight.
- A second hemisphere adds parallax where the schedule allows it, and it does not replace the nights of arc that are about to be lost.
- A sharper-looking orbit drawn from the same data is the most dangerous product on this list, because it looks like progress and narrows nothing.

**Takeaway:** A sharper-looking orbit is not a better orbit unless new evidence narrows the allowed family.

---

## Mission 4 — The Uncertainty Corridor

**Objective:** Report an impact probability and uncertainty corridor that remain meaningful as new data arrive.

**Stake:** Poor communication can either create panic or delay preparations for a genuine low-probability, high-consequence threat.

### M4.1 — Read the risk correctly

**Format:** PROTOCOL · **Area:** IMPACT · **Place:** Impact Monitoring Center

**Scene shown to the player**

> The nominal orbit misses Earth, and the room has to be precise about what that does and does not mean. A nominal miss with a thin set of allowed solutions passing through Earth is a real risk with a small probability, not a near-certain safety. New data that remove most impact solutions lower the probability legitimately. And probability can rise after an observation while the object becomes better understood, because shrinking the uncertainty region can concentrate what remains onto Earth. Planetary-defence risk lives in the distribution of allowed trajectories, not in the best-fit one.

**Question**  Match each situation to the most scientifically justified interpretation, control, or response. Each choice is used once.

**Situations to match**

- Nominal orbit misses Earth.
- A small fraction of allowed orbits intersect Earth.
- New data remove most impact solutions.
- Probability rises after an observation even though the nominal miss distance increases.

**Choices offered**

- A miss is not guaranteed while uncertainty remains.
- Impact probability is nonzero and should be monitored.
- Risk has decreased because the allowed region changed.
- Nonlinear geometry can redistribute probability; inspect the full solution set.

**Correct answer**

1. Nominal orbit misses Earth.  →  **A miss is not guaranteed while uncertainty remains.**
2. A small fraction of allowed orbits intersect Earth.  →  **Impact probability is nonzero and should be monitored.**
3. New data remove most impact solutions.  →  **Risk has decreased because the allowed region changed.**
4. Probability rises after an observation even though the nominal miss distance increases.  →  **Nonlinear geometry can redistribute probability; inspect the full solution set.**

**Why (shown in verdict):** Nominal values and integrated probabilities answer different questions.

**Takeaway:** Planetary-defense risk lives in the distribution, not just the best-fit trajectory.

### M4.2 — Probability from an ensemble

**Format:** BALLPARK · **Area:** ORBIT · **Place:** Statistical Orbit Lab

**Scene shown to the player**

> In a simplified Monte Carlo set, 37 of 100,000 sampled trajectories consistent with the observations strike Earth. The ratio is the impact probability, and it is only as good as the sampling behind it: too few samples and a small probability cannot be resolved at all, and a wrong uncertainty model produces a confident number about the wrong distribution. Express it as a decimal and as a percentage, and keep in view that this figure will be quoted in public long after the assumptions behind it are forgotten.

**Question**  Estimate the impact probability, as a percentage.

**Correct answer**

Equation shown: `{0} ÷ {1} × 100`
Tiles offered: `37 impacting samples`, `100,000 samples drawn`, `1,000 samples (the first quick run)`, `99,963 samples that miss`, `8 years to encounter`
Tiles that belong: `37 impacting samples`, `100,000 samples drawn`
Decoy tiles: `1,000 samples (the first quick run)`, `99,963 samples that miss`, `8 years to encounter`
Formula: `a/b*100`
**Target: 0.037 %** (tolerance ±0.004)
Explanation shown: The denominator is every sample drawn, not the ones that missed — dividing by the misses gives almost the same number here and the wrong quantity everywhere. A thousand samples could not have resolved a probability this small at all.

**Why (shown in verdict):** The figure is only as good as the sampling behind it, and it will be quoted in public long after the assumptions are forgotten.

**Takeaway:** A tiny probability can be estimated only with enough samples and a valid uncertainty model.

### M4.3 — Reduce the dangerous uncertainty

**Format:** CHOICE · **Area:** OPS · **Place:** Planetary Defense Coordination Office

**Scene shown to the player**

> The nominal orbit misses Earth comfortably. A thin set of solutions inside the uncertainty does not, and those solutions predict a sky position that differs from the rest by a few arcseconds in about a week. Everything else the board could buy would confirm what every solution already agrees on. The observation worth having is the one where the live hypotheses disagree most — measurement is only informative where the candidate explanations make different predictions, and that condition is a place and a date, not a telescope.

**Question**  A thin set of solutions still hits Earth. Where do you point next week?

**Choices offered**

- Where the impacting and non-impacting solutions predict different positions.
- Wherever the object is brightest and easiest to measure.
- At the same fields again, to improve the astrometric bias calibration.
- Nowhere new — run the arc through independent orbit software.

**Correct answer**

**Where the impacting and non-impacting solutions predict different positions.**

**Why (shown in verdict):** A measurement is informative only where the live hypotheses disagree. Everywhere else, both families predict the same thing, so the observation is guaranteed to confirm what nobody was disputing — and that condition is a place and a date rather than a telescope.

**Why the others do not hold**

- The brightest field is the easiest measurement and the least informative one; every solution already agrees about where the object will be.
- Bias calibration improves every measurement a little and separates the two families not at all.
- Independent software checks the arithmetic rather than the sky. Worth doing, and it adds no observation.

**Takeaway:** The best observation separates the live hypotheses rather than merely adding another point.

---

## Mission 5 — How Large Is It?

**Objective:** Produce a diameter range rather than a single unsupported value.

**Stake:** Impact energy depends strongly on size, so a factor-of-two diameter error becomes a much larger mass and energy error.

### M5.1 — What controls apparent brightness?

**Format:** PROTOCOL · **Area:** CHAR · **Place:** Photometry Lab

**Scene shown to the player**

> The object is bright enough to have been found by a survey telescope, and that single number is being read across the room as a size. Four things change reflected flux: a larger cross-sectional area, a higher reflectivity, a greater distance from the Sun (less illumination arriving), and a greater distance from the observer (geometric spreading of what returns). Brightness is the product of all of them, and the size everybody wants is entangled with a reflectivity nobody has measured. The same flux comes from a small bright body close in or a large dark one further out.

**Question**  Match each situation to the most scientifically justified interpretation, control, or response. Each choice is used once.

**Situations to match**

- Larger cross-sectional area.
- Higher reflectivity.
- Greater distance from the Sun.
- Greater distance from the observer.

**Choices offered**

- Usually increases reflected flux.
- Increases reflected flux for the same size and geometry.
- Reduces illumination.
- Reduces received flux through geometric spreading.

**Correct answer**

1. Larger cross-sectional area.  →  **Usually increases reflected flux.**
2. Higher reflectivity.  →  **Increases reflected flux for the same size and geometry.**
3. Greater distance from the Sun.  →  **Reduces illumination.**
4. Greater distance from the observer.  →  **Reduces received flux through geometric spreading.**

**Why (shown in verdict):** Brightness entangles size, reflectivity, and geometry.

**Takeaway:** A bright asteroid is not necessarily large.

### M5.2 — Diameter-albedo degeneracy

**Format:** BALLPARK · **Area:** OPS · **Place:** Infrared Telescope Team

**Scene shown to the player**

> Two objects show the same reflected brightness and one has four times the albedo of the other. Reflected flux scales with cross-sectional area times reflectivity, so area must fall by the same factor to keep the product constant, and diameter goes as the square root of area. The comparison is the whole diameter–albedo degeneracy in one line: photometry alone cannot separate the two, and every size quoted from brightness carries an assumed reflectivity inside it whether or not the assumption is written down.

**Question**  How does the higher-albedo object's diameter compare?

**Correct answer**

Equation shown: `√( {0} ÷ {1} )`
Tiles offered: `1.0 (reflected brightness, relative)`, `4.0 (albedo, relative)`, `2.0 (the square root of the albedo ratio)`, `16.0 (the albedo ratio, squared)`, `0.25 (the reciprocal of the albedo ratio)`
Tiles that belong: `1.0 (reflected brightness, relative)`, `4.0 (albedo, relative)`
Decoy tiles: `2.0 (the square root of the albedo ratio)`, `16.0 (the albedo ratio, squared)`, `0.25 (the reciprocal of the albedo ratio)`
Formula: `Math.sqrt(a/b)`
**Target: 0.5 × the diameter of the darker object** (tolerance ±0.05)
Explanation shown: Brightness fixes the product of area and reflectivity, so four times the reflectivity requires a quarter of the area — and diameter goes as the square root of area, not as area. The tile that has already taken the square root is the trap.

**Why (shown in verdict):** Photometry alone cannot separate size from reflectivity, so every diameter quoted from brightness carries an assumed albedo inside it whether or not the assumption is written down.

**Takeaway:** Photometry alone cannot uniquely determine size without an albedo assumption.

### M5.3 — Bound the diameter

**Format:** CHOICE · **Area:** CHAR · **Place:** Physical Characterization Group

**Scene shown to the player**

> The consequence estimate scales with diameter cubed, and the diameter currently rests on a reflectivity borrowed from a different asteroid class. Thermal-infrared measurement sees emitted heat, which depends on size and temperature rather than on albedo; multi-band photometry and phase behaviour constrain the surface properties themselves; radar gives a size directly when the geometry allows. Assuming the average albedo of a familiar class is free and reproduces the problem. Characterisation improves when independent methods break the same degeneracy in different ways.

**Question**  The diameter rests on an albedo borrowed from another class. What do you measure?

**Choices offered**

- Thermal-infrared emission.
- Multi-band reflected light and phase behaviour.
- Radar, as soon as the geometry allows it.
- Nothing — adopt the average albedo of the assumed class.

**Correct answer**

**Thermal-infrared emission.**

**Why (shown in verdict):** Emitted heat depends on size and temperature rather than on how reflective the surface is, so it breaks the degeneracy from outside it. Every measurement made in reflected light still carries an albedo assumption inside the answer.

**Why the others do not hold**

- Multi-band photometry and phase behaviour constrain the surface itself, and the size stays entangled with whatever they imply about it.
- Radar gives a diameter directly and only when the geometry allows, which it will not for months. Book it; do not wait on it.
- Adopting the class average is free and reproduces exactly the problem it was meant to solve, with the assumption now buried in a number.

**Takeaway:** Physical characterization improves when methods break the same degeneracy in independent ways.

---

## Mission 6 — What Is It Made Of?

**Objective:** Assign a composition class with explicit alternatives and confidence.

**Stake:** Composition affects density, fragmentation, and deflection response, so an unsupported label can distort every later model.

### M6.1 — Real absorption or spectral artifact?

**Format:** DIAGNOSIS · **Area:** CHAR · **Place:** Spectroscopy Observatory

**Scene shown to the player**

> A spectrum appears to show a broad absorption near 1.4 microns that would change the inferred surface composition. The standard star observed the same night shows a dip at the same wavelength; the feature deepens at larger airmass; the detector flat field is stable; and a space-based spectrum of the same object does not show it at all. A ground-based spectrum contains the telescope, the detector, the Earth's atmosphere and the target all at once — and water vapour in the atmosphere absorbs near this wavelength. Composition requires separating those contributions before anything is claimed about the surface.

**Question**  Which explanation fits the target, standard star, airmass, and space-based comparison?

**Panel headline**  A spectrum seems to show a broad absorption feature that could change the inferred surface composition.

**Instrument panel**

| Zone | Reading | Value | Status |
| --- | --- | --- | --- |
| Asteroid spectrum | Asteroid spectrum | Broad dip near 1.4 microns | alarm |
| Standard-star spectrum | Standard-star spectrum | Dip at the same wavelength | alarm |
| Airmass dependence | Airmass dependence | Feature deepens at larger airmass | alarm |
| Detector flat field | Detector flat field | Stable | normal |
| Space-based spectrum | Space-based spectrum | Feature absent | alarm |

**Choices offered**

- Asteroid mineral absorption — _Surface material absorbs light at that wavelength._
- Telluric atmospheric absorption — _Molecules in Earth atmosphere imprint the same wavelength-dependent feature on ground-based spectra._
- Detector flat-field error — _Pixel sensitivity creates a fixed instrumental dip independent of atmospheric path._
- Random noise — _An uncorrelated fluctuation happens to mimic a broad repeatable feature._

**Correct answer**

**Telluric atmospheric absorption**

**Why (shown in verdict):** The feature appears in the standard star, strengthens with airmass, is absent from space, and is not tied to detector flat-field structure. It belongs to Earth atmosphere, not the asteroid.

**Takeaway:** A spectrum contains the telescope, detector, Earth atmosphere, and target all at once; composition requires separating those layers.

### M6.2 — From photons to composition class

**Format:** SEQUENCE · **Area:** OPS · **Place:** Meteorite Comparison Lab

**Scene shown to the player**

> The spectrum has two broad features and a slope, and three mineral models reproduce all of them within the noise. Space weathering reddens a surface, grain size changes band depth, and viewing geometry shifts the continuum — each in the same direction as a genuine compositional difference. The inference chain therefore has to run in order: calibrate out the Sun, the atmosphere and the instrument; measure reflectance against wavelength; identify which features are robust and compare against several physical models; and report the classes the data support along with the alternatives it cannot exclude.

**Question**  Arrange the four cards from the earliest prerequisite or cause to the latest result. The interface should lock correctly placed cards after each check.

**Cards to order** (presented shuffled)

- Calibrate solar, atmospheric, and instrument response.
- Measure reflectance as a function of wavelength.
- Identify robust features and compare multiple physical models.
- Report supported classes, alternatives, and needed follow-up.

**Correct answer**

1. **Calibrate solar, atmospheric, and instrument response.**
2. **Measure reflectance as a function of wavelength.**
3. **Identify robust features and compare multiple physical models.**
4. **Report supported classes, alternatives, and needed follow-up.**

**Why (shown in verdict):** Calibration precedes feature interpretation and model comparison.

**Takeaway:** A good composition result retains the plausible alternatives.

### M6.3 — Improve the composition claim

**Format:** CHOICE · **Area:** OPS · **Place:** Composition Review Room

**Scene shown to the player**

> The draft circular names a composition class outright. Behind it are one spectrum, at one phase angle, on one rotation — and the deflection team is about to size a spacecraft from the density that class implies. Extending wavelength coverage, observing at other phase angles or rotational phases, and adding polarimetry or radar texture each test the claim against a different physical dependency. Renaming the object after the preferred composition is on the list as a reminder of what confidence without evidence looks like from outside.

**Question**  One spectrum, one phase angle, one rotation — and a draft circular naming a class. What do you require?

**Choices offered**

- Wavelength coverage extended beyond the current range.
- Observations at other phase angles and rotational phases.
- Polarimetry or a radar texture constraint.
- Nothing further — publish the class and note the uncertainty.

**Correct answer**

**Wavelength coverage extended beyond the current range.**

**Why (shown in verdict):** Three mineral models already reproduce every feature in the spectrum within the noise. More wavelengths is what makes those models predict different things — and a claim the current data could not have contradicted is not yet a measurement.

**Why the others do not hold**

- Other phase angles and rotations test whether the surface is uniform, which matters once the candidate classes are narrowed rather than before.
- Polarimetry and radar texture constrain grain structure by different physics and are the right independent check on whichever class survives.
- Publishing the class with a note attached is the same claim in smaller type, and the deflection team will size a spacecraft from the density it implies.

**Takeaway:** Characterization should seek discriminating evidence rather than stronger labels.

---

## Mission 7 — The Spinning Target

**Objective:** Produce a rotation-state range suitable for imaging and deflection planning.

**Stake:** A mistimed encounter can image or strike the wrong face of the asteroid.

### M7.1 — Rotation or observing artifact?

**Format:** DIAGNOSIS · **Area:** CHAR · **Place:** Time-Series Photometry Network

**Scene shown to the player**

> The asteroid brightens and fades by a few tenths of a magnitude with a repetition near 4.8 hours, and the team wants to use that as the rotation period for mission planning. The comparison stars in the same frames are stable to within measurement noise, both filters show the same period, the object lands on different pixels between exposures, and the phase-angle trend is a slow monotonic drift. Periodicity becomes physical evidence only after the periodicities of the atmosphere, the instrument and the observing schedule have been ruled out — which is what the comparison stars and the two filters are for.

**Question**  Which explanation fits the repeatability, comparison stars, filters, and observing geometry?

**Panel headline**  The asteroid brightens and fades by a few tenths of a magnitude.

**Instrument panel**

| Zone | Reading | Value | Status |
| --- | --- | --- | --- |
| Asteroid brightness | Asteroid brightness | Repeats every 4.8 hours | alarm |
| Comparison stars | Comparison stars | Stable to within measurement noise | normal |
| Two filters | Two filters | Same period in both | alarm |
| Detector position | Detector position | Object lands on different pixels | alarm |
| Phase-angle trend | Phase-angle trend | Slow monotonic change only | alarm |

**Choices offered**

- Asteroid rotation — _An irregular shape or surface pattern presents changing projected brightness as the body spins._
- Passing clouds — _Atmospheric transparency changes all sources together._
- Detector sensitivity drift — _One detector region changes response with time._
- Phase-angle change — _The Sun-object-observer geometry changes brightness smoothly over the observing span._

**Correct answer**

**Asteroid rotation**

**Why (shown in verdict):** The cycle repeats while comparison stars remain stable, survives different filters and pixels, and is much faster than the phase-angle trend. The periodicity belongs to the asteroid.

**Takeaway:** Periodicity becomes physical evidence only after environmental and instrumental periodicities are ruled out.

### M7.2 — Rotation period from repeating peaks

**Format:** BALLPARK · **Area:** OPS · **Place:** Rotation Dynamics Lab

**Scene shown to the player**

> Similar maxima in the light curve are separated by 3.5 hours. An elongated body presents its long profile twice per rotation, producing two maxima per revolution, so the repetition time and the rotation period differ by a factor of two — and which one you have depends on whether the two maxima are actually equal. A measured repetition is not automatically the physical period, and a spacecraft arriving at the wrong rotational phase meets a different face of the target than it was designed for.

**Question**  Estimate the candidate rotation period.

**Correct answer**

Equation shown: `{0} × {1}`
Tiles offered: `3.5 h (between similar maxima)`, `2 maxima per rotation`, `1.75 h (half the spacing between maxima)`, `4 maxima per rotation`, `0.3 mag (the amplitude)`
Tiles that belong: `3.5 h (between similar maxima)`, `2 maxima per rotation`
Decoy tiles: `1.75 h (half the spacing between maxima)`, `4 maxima per rotation`, `0.3 mag (the amplitude)`
Formula: `a*b`
**Target: 7 h** (tolerance ±0.5)
Explanation shown: The repetition time is not the period. Multiplying rather than dividing is the whole point: a body that shows two maxima per rotation repeats twice as often as it turns, so the period is longer than the spacing, not shorter.

**Why (shown in verdict):** A spacecraft arriving at the wrong rotational phase meets a different face of the target than the one it was designed for, and the factor of two is where that error comes from.

**Takeaway:** A measured repetition time is not always the physical period.

### M7.3 — Resolve the spin state

**Format:** CHOICE · **Area:** OPS · **Place:** Mission Design Office

**Scene shown to the player**

> The light curve varies by a factor of three over about seven hours, which could be a single rotation, half of one, or a tumbling body seen from a changing angle. The spacecraft has to arrive at a known orientation, and it launches whichever of those is true. Continuous longitude coverage removes the gaps where a period can hide; combining light curves across changing viewing geometry tests whether one period explains all of them; high-cadence photometry in a single short interval refines a curve that may be the wrong curve. Mission timing should rest on a rotation model that has been tested from more than one direction.

**Question**  A single rotation, half of one, or a tumbler — and the spacecraft launches on whichever is true. What do you organise?

**Choices offered**

- Continuous longitude coverage across several observatories.
- Higher-cadence photometry through one long night.
- Light curves combined across changing viewing geometry.
- A provisional period, adopted now so the design can proceed.

**Correct answer**

**Continuous longitude coverage across several observatories.**

**Why (shown in verdict):** A period hides in the gaps, and the gaps are one site's daylight. Coverage around the Earth removes the aliases before anything is fitted, which is what stops a half-period being adopted as a period.

**Why the others do not hold**

- High cadence through one night refines a curve that may be the wrong curve, at higher precision.
- Combining light curves across changing geometry is what tests whether one period explains all of them, and it needs a gap-free curve to combine.
- [object Object]

**Takeaway:** Mission timing should be based on a rotation model tested across time and viewpoint.

---

## Mission 8 — Radar Contact

**Objective:** Design a radar sequence that improves both orbit and physical characterization.

**Stake:** Missing the radar window can leave years of orbit and size uncertainty unresolved.

### M8.1 — What does radar measure?

**Format:** PROTOCOL · **Area:** RADAR · **Place:** Planetary Radar Facility

**Scene shown to the player**

> The radar window opens in hours and the room needs to agree what each observable delivers. Echo delay is a direct distance — time of flight times the speed of light, halved. Doppler frequency spread across the echo reports the range of line-of-sight velocities across the body, which is rotation. Echo power against delay maps how much surface lies at each distance, which is shape and roughness. Repeated delay-Doppler images across a rotation build a three-dimensional model. Active sensing can transform orbit and shape knowledge in a few hours, in ways optical work cannot in a year.

**Question**  Match each situation to the most scientifically justified interpretation, control, or response. Each choice is used once.

**Situations to match**

- Echo delay.
- Doppler frequency spread.
- Echo power versus delay.
- Repeated delay-Doppler images.

**Choices offered**

- Range.
- Distribution of line-of-sight rotational velocities.
- Range-resolved reflecting area and scattering.
- Changing shape and rotation constraints.

**Correct answer**

1. Echo delay.  →  **Range.**
2. Doppler frequency spread.  →  **Distribution of line-of-sight rotational velocities.**
3. Echo power versus delay.  →  **Range-resolved reflecting area and scattering.**
4. Repeated delay-Doppler images.  →  **Changing shape and rotation constraints.**

**Why (shown in verdict):** Radar separates distance and radial velocity dimensions that optical images often entangle.

**Takeaway:** Active sensing can transform orbit and shape knowledge during a short window.

### M8.2 — Range from radar delay

**Format:** BALLPARK · **Area:** OPS · **Place:** Delay-Doppler Analysis Lab

**Scene shown to the player**

> The dish transmits and the echo returns four seconds later. Radio travels at the speed of light and covers the distance twice, which is the only subtlety in the arithmetic and the one most often dropped. This single measurement does more for the orbit than a month of optical astrometry: optical work constrains direction and leaves distance to be inferred from the fit, while this measures the distance itself, to metres.

**Question**  Estimate the range to the object.

**Correct answer**

Equation shown: `{0} × {1} ÷ {2}`
Tiles offered: `3.0e8 m/s (speed of light)`, `4.0 s (round-trip delay)`, `2 (out and back)`, `2.0 s (half the delay)`, `1.5e8 m/s (light speed, halved already)`
Tiles that belong: `3.0e8 m/s (speed of light)`, `4.0 s (round-trip delay)`, `2 (out and back)`
Decoy tiles: `2.0 s (half the delay)`, `1.5e8 m/s (light speed, halved already)`
Formula: `a*b/c`
**Target: 600000000 m** (tolerance ±50000000)
Explanation shown: The factor of two can be taken out of the time or out of the speed, but not out of both — the two tiles that have already halved something are there to be noticed and left alone.

**Why (shown in verdict):** Optical astrometry constrains direction and leaves distance to be inferred from the fit. This measures the distance itself, to metres, in four seconds.

**Takeaway:** The factor of two reflects the outbound and return travel.

### M8.3 — Use the radar window

**Format:** CHOICE · **Area:** ORBIT · **Place:** Orbit Center

**Scene shown to the player**

> The window is four hours wide and does not repeat for eleven years. High-precision range and range- rate collapse the orbit uncertainty in the direction optical astrometry leaves widest; delay-Doppler imaging across a rotation gives shape and spin, which the deflection design needs; calibration and background observations are what make either of them trustworthy. One proposal would spend the dish repeating a brightness measurement that any optical telescope can make tonight. Scarce time should buy the information that is unavailable by any other means.

**Question**  Four hours, and the window does not repeat for eleven years. What comes first?

**Choices offered**

- High-precision range and range-rate.
- Delay-Doppler imaging across a full rotation.
- Calibration and background observations.
- A brightness measurement, at higher signal than optical can reach.

**Correct answer**

**High-precision range and range-rate.**

**Why (shown in verdict):** Range collapses the orbit uncertainty in exactly the direction optical astrometry leaves widest, and it is the measurement that decides whether there is a deflection problem to solve at all. Everything else the window could buy is worth less if the orbit stays ambiguous.

**Why the others do not hold**

- Delay-Doppler imaging gives the shape and spin the deflection design needs, and a beautifully imaged asteroid on an unresolved orbit is not a plan.
- Calibration protects both measurements and consumes window. Take the minimum that makes the range defensible.
- Spending planetary radar on a brightness any optical telescope can measure tonight is the one indefensible use of a window eleven years wide.

**Takeaway:** Scarce observing time should target information unavailable from routine methods.

---

## Mission 9 — Impact Energy

**Objective:** Provide low, central, and high impact-energy scenarios with transparent assumptions.

**Stake:** An exaggerated point estimate can create panic; an understated one can leave emergency planning unprepared.

### M9.1 — Energy of a notional impactor

**Format:** BALLPARK · **Area:** IMPACT · **Place:** Impact Physics Group

**Scene shown to the player**

> Civil defence wants an energy figure before it will convene anybody. The best current estimates are a radius near 50 metres, a density around 3,000 kg per cubic metre from the presumed composition class, and an approach speed of about 20 kilometres a second. Mass comes from the volume of a sphere times density; kinetic energy is half that mass times speed squared. Every term in it is a measurement somebody made with its own uncertainty, which is why the resulting number should arrive with a range rather than as a single figure.

**Question**  Estimate the impact kinetic energy.

**Correct answer**

Equation shown: `0.5 × ( (4π/3) {0}³ {1} ) × {2}²`
Tiles offered: `50 m (radius)`, `3,000 kg/m³ (density)`, `20,000 m/s (approach speed)`, `100 m (diameter)`, `11,000 m/s (Earth escape velocity)`
Tiles that belong: `50 m (radius)`, `3,000 kg/m³ (density)`, `20,000 m/s (approach speed)`
Decoy tiles: `100 m (diameter)`, `11,000 m/s (Earth escape velocity)`
Formula: `0.5*((4*Math.PI/3)*a*a*a*b)*c*c`
**Target: 314160000000000000 J** (tolerance ±40000000000000000)
Explanation shown: The sphere formula takes a radius, and the diameter tile put into it gives an object eight times too massive. That factor of eight is the same one that makes the diameter measurement worth more than any other.

**Why (shown in verdict):** Every term in this is a measurement somebody made with its own uncertainty, which is why the result should arrive as a range rather than as a single figure.

**Takeaway:** Impact energy couples geometric, material, and orbital measurements.

### M9.2 — Which uncertainty dominates?

**Format:** PROTOCOL · **Area:** OPS · **Place:** Risk Analysis Center

**Scene shown to the player**

> The consequence estimate is dominated by whichever input has the steepest scaling, and the four candidates behave very differently. Diameter enters as a cube through the mass, so 20 per cent larger is nearly 75 per cent more energy. Doubling the density doubles the mass and the energy with it. Speed enters squared, so 10 per cent faster is about 21 per cent more energy. And an albedo assumption that changes the inferred diameter by a factor propagates through that same cube. The most valuable measurement is usually the one attached to the steepest exponent.

**Question**  Match each situation to the most scientifically justified interpretation, control, or response. Each choice is used once.

**Situations to match**

- Diameter is 20% larger.
- Density doubles.
- Speed is 10% larger.
- Albedo assumption changes inferred diameter by a factor of two.

**Choices offered**

- Mass and energy rise by about 1.2³ ≈ 1.73.
- Mass and energy double.
- Energy rises by about 1.1² ≈ 1.21.
- Energy can change by about a factor of eight through size alone.

**Correct answer**

1. Diameter is 20% larger.  →  **Mass and energy rise by about 1.2³ ≈ 1.73.**
2. Density doubles.  →  **Mass and energy double.**
3. Speed is 10% larger.  →  **Energy rises by about 1.1² ≈ 1.21.**
4. Albedo assumption changes inferred diameter by a factor of two.  →  **Energy can change by about a factor of eight through size alone.**

**Why (shown in verdict):** Energy scales linearly with density, cubically with diameter, and quadratically with speed.

**Takeaway:** The most important measurement is often the one attached to the steepest scaling.

### M9.3 — Reduce consequence uncertainty

**Format:** CHOICE · **Area:** OPS · **Place:** Emergency Planning Office

**Scene shown to the player**

> The consequence range spans two orders of magnitude, and every part of it traces back to a physical measurement: diameter, density, entry speed and angle. Improving diameter with thermal or radar data attacks the cubed term; improving density needs composition and dynamical analogues; refining speed and angle attacks the squared term and the entry geometry together. One proposal would resolve none of them and simply report the worst case as the number. Risk communication has to show how physical uncertainty becomes consequence uncertainty, not hide it behind a single figure.

**Question**  The consequence range spans two orders of magnitude. Which measurement narrows it most?

**Choices offered**

- The diameter, from thermal infrared or radar.
- The density, from composition and dynamical analogues.
- The entry speed and angle.
- None — report the worst case and plan against that.

**Correct answer**

**The diameter, from thermal infrared or radar.**

**Why (shown in verdict):** Energy goes as the cube of the diameter and only linearly with density, so a factor of two in size is a factor of eight in consequence. The measurement worth most is always the one attached to the steepest exponent.

**Why the others do not hold**

- Density enters linearly and is genuinely uncertain. Worth improving, and worth a third as much per factor of error.
- Speed enters squared and is already the best determined of the three, so there is least left to win there.
- Reporting only the worst case resolves nothing and spends public attention on a number that cannot be defended when it is questioned.

**Takeaway:** Risk communication should show how physical uncertainty maps into consequence uncertainty.

---

## Mission 10 — Through the Atmosphere

**Objective:** Build multiple entry scenarios and identify observations that discriminate monolithic from weak aggregate behavior.

**Stake:** Evacuation distance and shelter guidance can change dramatically between airburst and ground-impact scenarios.

### M10.1 — Build an atmospheric entry model

**Format:** SEQUENCE · **Area:** IMPACT · **Place:** Atmospheric Entry Lab

**Scene shown to the player**

> Three groups modelled the same object: one has it reaching the ground, one has it fragmenting at 30 kilometres, and one has an airburst low enough to break windows across a city. They differ mainly in an assumed strength nobody has measured. The chain that produces any of those answers is the same — specify mass, shape, speed, angle, strength and the atmospheric profile; compute drag, heating and dynamic pressure along the path; compare those loads with fragmentation and ablation criteria; and propagate the fragments and the energy they deposit into a consequence estimate. Trajectory and materials are coupled the whole way down.

**Question**  Arrange the four cards from the earliest prerequisite or cause to the latest result. The interface should lock correctly placed cards after each check.

**Cards to order** (presented shuffled)

- Specify mass, shape, speed, angle, strength, and atmospheric profile.
- Compute drag, heating, and dynamic pressure along the path.
- Compare loads with fragmentation and ablation criteria.
- Propagate fragments and energy deposition to consequence estimates.

**Correct answer**

1. **Specify mass, shape, speed, angle, strength, and atmospheric profile.**
2. **Compute drag, heating, and dynamic pressure along the path.**
3. **Compare loads with fragmentation and ablation criteria.**
4. **Propagate fragments and energy deposition to consequence estimates.**

**Why (shown in verdict):** Initial physical properties drive loads, which drive breakup and energy deposition.

**Takeaway:** Atmospheric outcome is a coupled trajectory and materials problem.

### M10.2 — Why did the object break up high in the atmosphere?

**Format:** DIAGNOSIS · **Area:** OPS · **Place:** High-Altitude Observation Network

**Scene shown to the player**

> A notional entry is observed: the optical light curve brightens rapidly at high altitude, the measured speed falls quickly during the bright phase, infrasound records a broad atmospheric pulse, multiple fading fragment tracks are seen, and the seismometers and crater surveys detect nothing at all. Where an object deposits its energy is inferred from several signatures at once — light, deceleration, sound, and what does or does not arrive at the ground. The silent channel is doing as much work here as the loud ones.

**Question**  Which atmospheric-entry outcome best fits the optical, deceleration, infrasound, and ground evidence?

**Panel headline**  Models disagree about whether a notional object would remain intact to low altitude or fragment earlier.

**Instrument panel**

| Zone | Reading | Value | Status |
| --- | --- | --- | --- |
| Optical light curve | Optical light curve | Rapid brightening at high altitude | alarm |
| Measured speed | Measured speed | Falls quickly during bright phase | alarm |
| Infrasound | Infrasound | Broad atmospheric pulse | alarm |
| Seismic/crater signal | Seismic/crater signal | None detected | normal |
| Fragment tracks | Fragment tracks | Multiple fading paths | alarm |

**Choices offered**

- Atmospheric fragmentation / airburst — _Aerodynamic loading breaks the object and deposits much of its energy in the atmosphere._
- Intact ground impact — _The body remains coherent and transfers most energy at the surface._
- Pure observational artifact — _The apparent breakup exists only because optical instruments saturate._
- No significant atmospheric interaction — _The object keeps nearly constant speed and structure through the atmosphere._

**Correct answer**

**Atmospheric fragmentation / airburst**

**Why (shown in verdict):** High-altitude brightening, rapid deceleration, an atmospheric pressure-wave signal, multiple fragments, and no corresponding crater form one coherent fragmentation picture.

**Takeaway:** Entry outcome is inferred from several energy-transfer signatures; brightness alone cannot tell where or how the energy was deposited.

### M10.3 — Bound the atmospheric outcome

**Format:** CHOICE · **Area:** OPS · **Place:** Consequence Modeling Center

**Scene shown to the player**

> The models disagree because the object's strength and internal structure are unknown, not because anybody made an arithmetic error. Running strength and density ensembles propagates that ignorance honestly; analogue fireball observations calibrate the models against events that actually happened; refining entry angle and speed removes uncertainty that is genuinely measurable. Assuming every object of a given diameter behaves identically buries the structural uncertainty inside a single asteroid 'type' — the planning office gets one clean answer and no way of knowing how wrong it might be.

**Question**  Three groups model the same object and get ground impact, high fragmentation, and a city-wide airburst. What do you commission?

**Choices offered**

- Strength and density ensembles rather than one model run.
- Comparison against observed analogue fireballs.
- A better measurement of the entry angle and speed.
- A single agreed model, so the planning office has one answer.

**Correct answer**

**Strength and density ensembles rather than one model run.**

**Why (shown in verdict):** The three groups disagree because the object's strength is unknown, not because anybody made an arithmetic error. An ensemble carries that ignorance into the answer, where the planning office can see it, instead of hiding it inside whichever strength each modeller happened to assume.

**Why the others do not hold**

- Analogue fireballs calibrate the models against events that actually happened, and they are the right check on the ensemble once it exists.
- Entry angle and speed are genuinely measurable and are not what the three models disagree about.
- [object Object]

**Takeaway:** Consequence models should expose structural uncertainty rather than bury it in one asteroid “type.”

---

## Mission 11 — What Have We Failed to See?

**Objective:** Design a survey strategy that improves detection and accurately reports what remains unseen.

**Stake:** The next dangerous object may occupy exactly the region the current survey systematically neglects.

### M11.1 — Why was it missed?

**Format:** DIAGNOSIS · **Area:** OPS · **Place:** Survey Strategy Center

**Scene shown to the player**

> The object was discovered later than its brightness alone would predict. Its solar elongation before discovery was under about 30 degrees, its predicted apparent brightness was within survey depth whenever it was in dark sky, the weather archive is mostly clear, detector health is normal, and the survey cadence covers that region only after the elongation increases. Completeness is geometric as well as instrumental: an object approaching from the direction of the Sun sits in twilight where no ground survey can work, and it can be bright and effectively invisible at the same time.

**Question**  Which explanation fits the pre-discovery geometry and the survey operating record?

**Panel headline**  The object is discovered later than expected even though its brightness would normally be within survey reach.

**Instrument panel**

| Zone | Reading | Value | Status |
| --- | --- | --- | --- |
| Solar elongation before discovery | Solar elongation before discovery | Less than about 30 degrees | alarm |
| Predicted apparent brightness | Predicted apparent brightness | Within survey depth when in dark sky | normal |
| Weather archive | Weather archive | Mostly clear | alarm |
| Detector health | Detector health | Normal | normal |
| Survey cadence | Survey cadence | Covers the region after elongation increases | alarm |

**Choices offered**

- Solar-elongation blind spot — _The object is geometrically too close to the Sun for normal night-sky survey coverage._
- Survey not deep enough — _The object is always fainter than the system detection limit._
- Bad weather — _Cloud cover repeatedly blocks the relevant fields._
- Pipeline/detector outage — _The camera or processing system fails during otherwise observable opportunities._

**Correct answer**

**Solar-elongation blind spot**

**Why (shown in verdict):** The object is bright enough and the system is healthy, but it remains close to the Sun until shortly before discovery. The timing of detection follows the changing observing geometry.

**Takeaway:** Survey completeness is geometric as well as instrumental; an object can be bright enough yet effectively hidden by the Sun.

### M11.2 — Volume gain from deeper sensitivity

**Format:** BALLPARK · **Area:** OPS · **Place:** Telescope Network

**Scene shown to the player**

> A survey upgrade lets it detect a standard object twice as far away, and the board wants to know what that buys. The searchable volume is roughly a sphere, so it scales as the cube of the distance limit — doubling the range multiplies the volume by eight. The population found scales with that volume, which is why relatively modest gains in sensitivity produce disproportionate gains in discovery, and why depth and coverage trade against each other rather than being separate arguments.

**Question**  Estimate the factor by which the searchable volume grows.

**Correct answer**

Equation shown: `{0}³`
Tiles offered: `2 (the gain in detection distance)`, `3 (dimensions of space)`, `4 (twice the distance, squared)`, `1.5 mag (the depth gain)`
Tiles that belong: `2 (the gain in detection distance)`
Decoy tiles: `3 (dimensions of space)`, `4 (twice the distance, squared)`, `1.5 mag (the depth gain)`
Formula: `a*a*a`
**Target: 8 × the searchable volume** (tolerance ±0.5)
Explanation shown: The exponent is in the template because it comes from the geometry rather than from a measurement; what the player supplies is the distance gain. Doubling the range and squaring it is the area answer, and the survey searches a volume.

**Why (shown in verdict):** Modest gains in sensitivity produce disproportionate gains in discovery, which is why depth and sky coverage trade against each other rather than being separate arguments.

**Takeaway:** Small gains in distance can produce large gains in searchable volume.

### M11.3 — Improve discovery completeness

**Format:** CHOICE · **Area:** OPS · **Place:** Population Statistics Lab

**Scene shown to the player**

> This object was found eleven days before its closest approach, from the direction of the Sun, at a brightness the survey reaches only in good conditions. Greater depth finds fainter and darker bodies; a cadence optimised for linking motion turns detections into tracked objects rather than one-night stands; wider sky and hemisphere coverage removes the geometric blind spots that hid this one. The fourth proposal reports completeness as 100 per cent because no uncatalogued objects appear in the catalogue — which is exactly the reasoning this campaign exists to disprove.

**Question**  This object was found eleven days out, from the direction of the Sun. What does the survey change?

**Choices offered**

- Wider sky and hemisphere coverage, including low solar elongations.
- Greater depth, to reach fainter and darker bodies.
- A cadence optimised for linking detections into tracked objects.
- Nothing — report completeness from the fraction already catalogued.

**Correct answer**

**Wider sky and hemisphere coverage, including low solar elongations.**

**Why (shown in verdict):** This object was bright enough for the survey and geometrically impossible to see. What hid it was where the telescope pointed, not how faint it could go — and depth added to the same sky would have found it on exactly the same night.

**Why the others do not hold**

- Greater depth finds fainter and darker bodies across the sky already covered, and would not have moved this discovery by a day.
- A linking cadence turns detections into tracked objects, which requires the detection first.
- Reporting completeness from the catalogue counts the objects that were found using the objects that were found. It is the reasoning this discovery disproved.

**Takeaway:** Completeness is measured by simulated recovery and known biases, not by absence of discoveries.

---

## Mission 12 — Can We Move It?

**Objective:** Choose a deflection demonstration and define how success will be measured.

**Stake:** A poorly characterized intervention could fragment the object, miss the target, or fail to produce enough orbital change.

### M12.1 — Velocity change from momentum transfer

**Format:** BALLPARK · **Area:** IMPACT · **Place:** Deflection Physics Lab

**Scene shown to the player**

> A 1,000 kg impactor strikes a 1.0×10⁹ kg asteroid at 10,000 metres per second in a perfectly inelastic collision, transferring about 10⁷ kg·m/s of momentum. Conservation of momentum gives the resulting velocity change of the asteroid, and it is tiny — millimetres per second. Deflection works not by moving the asteroid much but by moving it early: a small velocity change applied years before encounter accumulates into a displacement measured in Earth radii by the time it matters.

**Question**  Estimate the asteroid's change in speed.

**Correct answer**

Equation shown: `{0} × {1} ÷ {2}`
Tiles offered: `1,000 kg (impactor mass)`, `10,000 m/s (impact speed)`, `1.0e9 kg (asteroid mass)`, `20,000 m/s (the encounter speed with Earth)`, `3.0 (momentum enhancement from ejecta)`
Tiles that belong: `1,000 kg (impactor mass)`, `10,000 m/s (impact speed)`, `1.0e9 kg (asteroid mass)`
Decoy tiles: `20,000 m/s (the encounter speed with Earth)`, `3.0 (momentum enhancement from ejecta)`
Formula: `a*b/c`
**Target: 0.01 m/s** (tolerance ±0.001)
Explanation shown: Conservation of momentum needs the impactor's mass and speed, not the asteroid's encounter speed with Earth. The ejecta enhancement is real and would raise this figure — it is left out because nobody can predict it, which is exactly why the mission has to measure it.

**Why (shown in verdict):** A centimetre per second sounds like nothing. Applied years before encounter it accumulates into a displacement measured in Earth radii, which is the whole basis of deflection.

**Takeaway:** Deflection relies on small velocity change plus long lead time.

### M12.2 — What determines deflection success?

**Format:** PROTOCOL · **Area:** IMPACT · **Place:** Mission Engineering Center

**Scene shown to the player**

> A kinetic impactor could reach the object four years before encounter, and how far that moves it depends on quantities nobody has measured. A longer lead time turns the same velocity change into more accumulated displacement. An unknown asteroid mass makes the predicted velocity change uncertain in direct proportion. Ejecta thrown off the surface carry away momentum of their own, enhancing the transfer by a factor that is itself uncertain. And post-impact tracking is what measures the orbit change that actually occurred rather than the one that was predicted.

**Question**  Match each situation to the most scientifically justified interpretation, control, or response. Each choice is used once.

**Situations to match**

- Longer lead time.
- Unknown asteroid mass.
- Uncertain momentum enhancement from ejecta.
- Post-impact tracking.

**Choices offered**

- More displacement accumulates from the same Δv.
- Makes predicted Δv uncertain.
- Changes effective transferred momentum.
- Measures actual orbit change rather than assumed performance.

**Correct answer**

1. Longer lead time.  →  **More displacement accumulates from the same Δv.**
2. Unknown asteroid mass.  →  **Makes predicted Δv uncertain.**
3. Uncertain momentum enhancement from ejecta.  →  **Changes effective transferred momentum.**
4. Post-impact tracking.  →  **Measures actual orbit change rather than assumed performance.**

**Why (shown in verdict):** Mission outcome depends on both applied impulse and verified orbital response.

**Takeaway:** Deflection is an experiment whose dependent variable is the asteroid orbit.

### M12.3 — Build the deflection campaign

**Format:** CHOICE · **Area:** ORBIT · **Place:** Orbit Monitoring Room

**Scene shown to the player**

> There is budget for one campaign. Reconnaissance would measure the mass the deflection depends on and delay the impactor by a year; launching sooner buys lead time and aims a spacecraft at a body whose mass is uncertain by a factor of three; long-term tracking before and after is what turns the impact into a measurement rather than a hope. Skipping characterisation to launch earlier is defensible only if the resulting velocity change does not need to be predicted — and it does, because the corridor is decided by it.

**Question**  The impactor is funded. What must the campaign add that the impactor alone does not?

**Choices offered**

- Long-term tracking, before and after the impact.
- Reconnaissance to measure the mass, delaying the impactor by a year.
- Additional navigational margin on the impactor itself.
- Nothing — the impact is the experiment.

**Correct answer**

**Long-term tracking, before and after the impact.**

**Why (shown in verdict):** The dependent variable of a deflection is the asteroid's orbit. Without a measured before and after there is no way to know whether the momentum transfer matched the prediction — and the ejecta enhancement, which nobody can calculate, is exactly what the next mission would have to assume all over again.

**Why the others do not hold**

- Reconnaissance measures the mass the predicted velocity change depends on, and it costs a year of the lead time that makes any velocity change effective.
- Navigational margin decides whether the spacecraft hits. It says nothing about what happened to the orbit when it did.
- An impact with no measurement is a demonstration rather than an experiment, and it leaves the next campaign exactly as uncertain as this one.

**Takeaway:** A deflection mission should be designed to learn its actual momentum transfer.

---

## Mission 13 — Design the Intercept

**Objective:** Select an intercept architecture with enough margin to reach and accurately target the asteroid.

**Stake:** Missing the launch window or target can consume the only remaining lead time.

### M13.1 — Which subsystem owns the constraint?

**Format:** PROTOCOL · **Area:** OPS · **Place:** Trajectory Design Center

**Scene shown to the player**

> Four mission challenges, each owned by a different part of the design. A launch opportunity that exists only during a short geometric window is answered by launch-vehicle performance and trajectory flexibility. Target ephemeris uncertainty that grows toward encounter is answered by onboard optical navigation. A round-trip communication delay that rules out real-time piloting is answered by autonomous terminal guidance. And a target face that changes with rotation is answered by knowing the spin state before arrival. An intercept is a coordinated prediction-and-control problem, and the responses are not interchangeable.

**Question**  Match each situation to the most scientifically justified interpretation, control, or response. Each choice is used once.

**Situations to match**

- Launch opportunity occurs only during a short geometry window.
- Target ephemeris uncertainty grows near encounter.
- Round-trip communication delay prevents real-time piloting.
- The target face changes with rotation.

**Choices offered**

- Protect schedule and launch readiness.
- Use optical navigation and late orbit updates.
- Provide autonomous guidance and fault response.
- Model rotation and target a robust impact region.

**Correct answer**

1. Launch opportunity occurs only during a short geometry window.  →  **Protect schedule and launch readiness.**
2. Target ephemeris uncertainty grows near encounter.  →  **Use optical navigation and late orbit updates.**
3. Round-trip communication delay prevents real-time piloting.  →  **Provide autonomous guidance and fault response.**
4. The target face changes with rotation.  →  **Model rotation and target a robust impact region.**

**Why (shown in verdict):** Mission design maps physical constraints into subsystem requirements.

**Takeaway:** An intercept is a coordinated prediction-and-control problem.

### M13.2 — Build the intercept architecture

**Format:** SEQUENCE · **Area:** OPS · **Place:** Spacecraft Systems Lab

**Scene shown to the player**

> The launch window is nineteen days wide, the target is irregular and rotating, and the light-time at encounter means the ground can watch but cannot steer. The architecture has to be traced backwards from the outcome: define the encounter geometry and the effect required, choose launch, cruise and navigation to deliver it, design the autonomous terminal guidance and the measurements that will verify what happened, and test the integrated design against off-nominal target states rather than the one in the brochure.

**Question**  Order the design backwards from the effect it has to produce.

**Cards to order** (presented shuffled)

- Fix the encounter geometry and the velocity change it has to deliver.
- Choose launch energy and cruise to reach that geometry inside the window.
- Design terminal guidance to close the ephemeris error that is left at arrival.
- Test the whole chain against target states nobody has ruled out.

**Correct answer**

1. **Fix the encounter geometry and the velocity change it has to deliver.**
2. **Choose launch energy and cruise to reach that geometry inside the window.**
3. **Design terminal guidance to close the ephemeris error that is left at arrival.**
4. **Test the whole chain against target states nobody has ruled out.**

**Why (shown in verdict):** Each stage is sized by the one above it: the required velocity change sets the impactor mass and therefore the launch energy, and what the launch and cruise cannot deliver in accuracy is exactly what terminal guidance has to close. Designing the guidance first means designing it to a miss distance nobody has computed.

**Takeaway:** An intercept is designed backwards from the effect it has to produce.

### M13.3 — Spend mission margin

**Format:** CHOICE · **Area:** OPS · **Place:** Autonomy Test Range

**Scene shown to the player**

> The design closes on paper with nothing left over. Whatever margin is bought now comes out of the headline performance number the programme has been promising, and the target's ephemeris will still be uncertain at arrival. Extra launch energy buys trajectory flexibility; better ephemeris and onboard optical navigation buy accuracy where it is actually lost; redundancy in critical functions buys survival of a single failure at an encounter that cannot be repeated. A planetary-defence mission is judged by whether it works under the conditions that turn up, not by its nominal figures.

**Question**  The design closes on paper with nothing left over. Where does the first margin go?

**Choices offered**

- Better target ephemeris and onboard optical navigation.
- Additional launch energy and trajectory flexibility.
- Redundancy in the critical spacecraft functions.
- Into the headline performance number the programme has promised.

**Correct answer**

**Better target ephemeris and onboard optical navigation.**

**Why (shown in verdict):** The accuracy is lost at the encounter, not at launch. The target's position is still uncertain when the spacecraft has to steer itself, and this is the only margin that converts directly into hitting the thing it was sent to hit.

**Why the others do not hold**

- Launch energy buys trajectory flexibility, which does not help a spacecraft aimed accurately at where the asteroid is not.
- Redundancy buys survival of one failure at an encounter that cannot be repeated. It is the right second call.
- Maximising the headline number at the expense of every reserve is how a design closes on paper and fails in flight.

**Takeaway:** A successful planetary-defense mission is robust, not merely impressive at nominal conditions.

---

## Mission 14 — Evacuate or Wait?

**Objective:** Create trigger-based preparations proportional to probability, consequence, lead time, and reversibility.

**Stake:** Bad communication can create casualties during an unnecessary evacuation or leave people unprepared for a real impact.

### M14.1 — Match action to evidence state

**Format:** PROTOCOL · **Area:** OPS · **Place:** Risk Communication Center

**Scene shown to the player**

> The corridor crosses populated regions and the probability is still moving. Four evidence states are on the board and each supports a different level of action: a very low probability with years of lead time supports tracking and planning; a rising probability with a stable regional corridor supports reversible preparation; a high probability with days remaining supports protective action; and a probability that falls after decisive tracking supports standing down publicly and explaining why. Preparedness can escalate in stages without anybody claiming certainty — and it is the stages, agreed in advance, that keep the public with you.

**Question**  Match each situation to the most scientifically justified interpretation, control, or response. Each choice is used once.

**Situations to match**

- Very low probability with years of lead time.
- Rising probability with a stable regional corridor.
- High probability with days remaining.
- Probability falls after decisive tracking.

**Choices offered**

- Continue tracking and low-cost preparedness.
- Pre-position resources and plan corridor-specific evacuations.
- Execute protective actions under emergency authority.
- Scale back actions transparently while preserving lessons.

**Correct answer**

1. Very low probability with years of lead time.  →  **Continue tracking and low-cost preparedness.**
2. Rising probability with a stable regional corridor.  →  **Pre-position resources and plan corridor-specific evacuations.**
3. High probability with days remaining.  →  **Execute protective actions under emergency authority.**
4. Probability falls after decisive tracking.  →  **Scale back actions transparently while preserving lessons.**

**Why (shown in verdict):** Action thresholds depend on consequence, lead time, and reversibility, not probability alone.

**Takeaway:** Preparedness can escalate in stages without claiming certainty.

### M14.2 — Expected displaced population

**Format:** BALLPARK · **Area:** OPS · **Place:** Emergency Management Office

**Scene shown to the player**

> The emergency management office needs an expected displaced population to plan against, and the number is a product of a probability and a consequence. An expectation summarises a distribution: the same figure arises from a small chance of a very large displacement and a near-certainty of a small one, and those two situations call for entirely different preparations. Compute it, and then say out loud which of the two it came from — the summary is only usable alongside the distribution it summarises.

**Question**  Estimate the expected displaced population.

**Correct answer**

Equation shown: `{0} × {1}`
Tiles offered: `2.0e6 people (in the corridor)`, `0.005 (impact probability)`, `2.0e5 people (in the largest corridor town)`, `0.05 (an earlier probability estimate)`, `0.037 % (the ensemble figure)`
Tiles that belong: `2.0e6 people (in the corridor)`, `0.005 (impact probability)`
Decoy tiles: `2.0e5 people (in the largest corridor town)`, `0.05 (an earlier probability estimate)`, `0.037 % (the ensemble figure)`
Formula: `a*b`
**Target: 10000 people (expectation)** (tolerance ±800)
Explanation shown: A probability written as a percentage has to be converted before it is multiplied, which is what makes the 0.037 tile dangerous: it is the right quantity in the wrong units, and it would put the answer out by a factor of a hundred.

**Why (shown in verdict):** The same expectation arises from a small chance of a very large displacement and a near-certainty of a small one, and those call for entirely different preparations. The summary is only usable alongside the distribution it summarises.

**Takeaway:** Decision metrics must be interpreted according to the distribution they summarize.

### M14.3 — Prepare without panic

**Format:** CHOICE · **Area:** OPS · **Place:** Scientific Advisory Board

**Scene shown to the player**

> The corridor crosses two coastal regions, the probability has moved twice this month and both times downward, and regional authorities want a decision they can act on. Improving tracking narrows the corridor itself; reversible evacuation and shelter plans can be started and stood down without cost to credibility; publishing the uncertainty with the triggers and protective steps is what makes a later change of advice look like the system working. Announcing an inevitable impact before the orbit is resolved spends the credibility that every subsequent message depends on.

**Question**  The probability has moved twice this month, both times downward. What does the board issue?

**Choices offered**

- The uncertainty, published together with the triggers and protective steps.
- A statement that tracking continues and there is no cause for concern.
- An instruction to begin corridor evacuation planning immediately.
- A warning that an impact should now be treated as likely.

**Correct answer**

**The uncertainty, published together with the triggers and protective steps.**

**Why (shown in verdict):** An advisory that says in advance what would change it can change without looking like a reversal. That is the only form that survives a probability which moves twice a month, and it is what keeps the next message believed.

**Why the others do not hold**

- Reassurance with no trigger attached has to be withdrawn from scratch if the probability moves back up, and it will be read as the board having been wrong.
- Corridor evacuation planning is exactly what the triggers should start. Starting it without them makes it impossible to stop.
- Calling an impact likely before the orbit is resolved spends the credibility that every later message, including the reassuring ones, depends on.

**Takeaway:** Public trust is protected when uncertainty is paired with concrete decision rules.

---

## Mission 15 — The Final Defense Review

**Objective:** Produce a claim-by-claim planetary-defense decision package and preserve monitoring after the immediate threat passes.

**Stake:** Success against one object can create dangerous complacency about the larger unseen population.

### M15.1 — Disposition the final claims

**Format:** PROTOCOL · **Area:** OPS · **Place:** International Review Hall

**Scene shown to the player**

> The board has to publish one account of an eight-year campaign, and each claim in it carries a different weight of evidence. Stating what was found and how, separating what is established from what remains uncertain, documenting the intervention and the orbit change actually measured, and naming who remains responsible for monitoring — these are different jobs, and the failure mode is a document that gives all of them the same confidence. Public accountability has to preserve the technical reasoning and the decision authority together, because the next campaign will be run by people reading this one.

**Question**  Match each situation to the most scientifically justified interpretation, control, or response. Each choice is used once.

**Situations to match**

- Post-impact tracking shows the required orbit shift with independent confirmation.
- The nominal miss is safe, but a poorly constrained tail remains.
- Civil plans are ready but based on an outdated corridor.
- The object is no longer threatening, but survey gaps remain.

**Choices offered**

- Accept the deflection claim and continue verification.
- Continue targeted observations; do not collapse the distribution to the nominal.
- Update plans before operational use.
- Fund long-term survey and preparedness improvements.

**Correct answer**

1. Post-impact tracking shows the required orbit shift with independent confirmation.  →  **Accept the deflection claim and continue verification.**
2. The nominal miss is safe, but a poorly constrained tail remains.  →  **Continue targeted observations; do not collapse the distribution to the nominal.**
3. Civil plans are ready but based on an outdated corridor.  →  **Update plans before operational use.**
4. The object is no longer threatening, but survey gaps remain.  →  **Fund long-term survey and preparedness improvements.**

**Why (shown in verdict):** Final review separates mission success, residual orbital uncertainty, civil readiness, and future capability.

**Takeaway:** Planetary defense is a continuing evidence system, not a one-time heroic act.

### M15.2 — Build the final public record

**Format:** SEQUENCE · **Area:** ORBIT · **Place:** Orbit Monitoring Center

**Scene shown to the player**

> The board has to publish one account of a campaign in which the object was found late, characterised in stages, deflected by a measured but imprecise amount, and left with residual risk that is small rather than zero. The order that survives scrutiny is discovery history and how the uncertainty evolved, then the physical characterisation and the range of consequences it implied, then the intervention with the orbit change actually measured against the one predicted, and finally the monitoring, survey and governance responsibilities that continue after everyone stops paying attention.

**Question**  Order the record so each claim can be checked against the one before it.

**Cards to order** (presented shuffled)

- The discovery, and how wide the uncertainty was at each stage of narrowing it.
- The physical characterisation, and the consequence range it implied.
- The intervention, and the orbit change measured against the one predicted.
- The residual risk, and who is funded to keep watching it.

**Correct answer**

1. **The discovery, and how wide the uncertainty was at each stage of narrowing it.**
2. **The physical characterisation, and the consequence range it implied.**
3. **The intervention, and the orbit change measured against the one predicted.**
4. **The residual risk, and who is funded to keep watching it.**

**Why (shown in verdict):** The record is ordered so that each claim can be checked against the one before it: the consequence range only means something beside the diameter it came from, and the measured deflection only means something beside the prediction it was tested against. Ending on residual risk and its owner is what stops the document reading as a conclusion.

**Takeaway:** A record is ordered so each claim can be checked against the one before it.

### M15.3 — Fund the planetary-defense legacy

**Format:** CHOICE · **Area:** OPS · **Place:** Mission Operations

**Scene shown to the player**

> The campaign budget ends with this review, and what survives it decides whether the next object is found eleven days out or eleven years out. Survey completeness and rapid follow-up networks are what produce warning time; characterisation and deflection demonstration missions are what convert warning time into options; international decision protocols and civil preparedness are what turn options into action. The fourth proposal is to assume discovery now happens automatically — which is the assumption this object spent eight years disproving.

**Question**  The campaign budget ends with this review. What survives it?

**Choices offered**

- Survey completeness and the rapid follow-up network.
- Characterisation and deflection demonstration missions.
- International decision protocols and civil preparedness.
- Nothing new — discovery is now routine and happens automatically.

**Correct answer**

**Survey completeness and the rapid follow-up network.**

**Why (shown in verdict):** Everything else in planetary defence is a function of warning time, and warning time is produced by finding the object and by nothing else. This one was found eleven days out, and that number is what set every constraint in the campaign that followed.

**Why the others do not hold**

- Characterisation and deflection demonstrations convert warning time into options, and they need the warning time to exist first.
- Protocols and civil preparedness turn options into action, and they inherit the same dependency one step further down.
- Assuming discovery is automatic is the assumption this object spent eight years disproving, from a blind spot the survey still has.

**Takeaway:** The durable defense is an institution that can repeatedly detect, learn, decide, and act.

---

## Grading

Three axes, 1–5 each; the rubric is in `README.md`. Rows marked **Fixed**, **Rebuilt**, **Rewritten** or **Correction** changed after the first audit.

- **Solv** — can a prepared student reach the keyed answer from the scene and panel alone?
- **Edu** — does getting it right require and build transferable subject knowledge?
- **Fit** — does it map onto a named topic in a standard course for the stated audience?

| ID | Format | Topic | Solv | Edu | Fit | Note |
| --- | --- | --- | :-: | :-: | :-: | --- |
| M1.1 | DIAGNOSIS | Real moving object vs detector artefact | 5 | 5 | 5 | Coherent motion in *sky* coordinates while stars stay fixed, plus independent recovery. Exactly how a survey pipeline is validated. |
| M1.2 | SEQUENCE | Discovery validation pipeline | 4 | 4 | 4 | The last card (submit a predicted region so somebody else can falsify you) carries the teaching. |
| M1.3 | BALLPARK | Angular rate | 4 | 4 | 4 | Decoys added, including the same interval in seconds — the 60 in the template is minutes per hour. |
| M2.1 | DIAGNOSIS | Astrometric residuals as an instrument signature | 5 | 5 | 5 | The reference stars are the control and they show the same spatial pattern. A genuinely professional piece of reasoning, cleanly presented. |
| M2.2 | SEQUENCE | Building an observation arc | 4 | 4 | 4 | Common frame and time system first is forced; residual inspection before prediction is real practice. |
| M2.3 | CHOICE | Buying information, not convenience | 4 | 4 | 4 | A later observation, because arc length is what collapses the family. The parallax rebuttal concedes it answers a different question. |
| M3.1 | SEQUENCE | Orbit families from sparse arcs | 4 | 5 | 4 | "Uncertainty is an ensemble of allowed trajectories, not an error bar" is the game's best single idea and it is introduced here. |
| M3.2 | PROTOCOL | What each observation type constrains | 5 | 5 | 5 | Arc length → curvature, radar range → distance, range rate → velocity, baseline → parallax. Four distinct information-geometry facts. |
| M3.3 | CHOICE | Collapsing the orbit family | 4 | 4 | 4 | Take the nights before the radar window, because a faint setting object does not give them back. |
| M4.1 | PROTOCOL | Impact probability vs nominal miss | 4 | 5 | 4 | Item 4 — probability rising while the nominal miss distance increases — is the subtlest correct item in the repository. |
| M4.2 | BALLPARK | Probability from a Monte Carlo ensemble | 4 | 4 | 4 | Decoys added: a smaller sample run and the count of misses, so the denominator has to be chosen. |
| M4.3 | CHOICE | Observe where the hypotheses disagree | 4 | 5 | 4 | Point where the impacting and non-impacting solutions disagree. Information gain stated as a place and a date. |
| M5.1 | PROTOCOL | What controls reflected flux | 5 | 5 | 5 | Area, albedo, heliocentric distance, observer distance — the four terms, discriminated. Standard photometry. |
| M5.2 | BALLPARK | Diameter–albedo degeneracy | 5 | 5 | 5 | **Rebuilt.** The tiles were abstractions the student could not map onto the physics; they now name reflected brightness and albedo, with the already-square-rooted value as the trap. |
| M5.3 | CHOICE | Breaking the degeneracy independently | 4 | 5 | 5 | Thermal infrared, because it breaks the degeneracy from outside reflected light entirely. |
| M6.1 | DIAGNOSIS | Telluric absorption | 5 | 5 | 5 | Standard star shows the same dip, feature deepens with airmass, absent from space. Four independent confirmations, all in the panel. |
| M6.2 | SEQUENCE | Photons → composition class | 4 | 4 | 4 | Calibration before feature interpretation is forced; retaining alternatives is the lesson. |
| M6.3 | CHOICE | Testing a composition claim | 4 | 4 | 4 | Extend the wavelength coverage, because three mineral models already fit everything measured. A claim that could not have been wrong is not a measurement. |
| M7.1 | DIAGNOSIS | Rotation vs observing artefact | 5 | 5 | 5 | Comparison stars stable, both filters agree, different pixels, phase-angle trend far slower. The controls are complete. |
| M7.2 | BALLPARK | Double-peaked light curve | 4 | 5 | 5 | Half the peak spacing offered as a decoy, which is the wrong direction and the mistake the item exists to catch. |
| M7.3 | CHOICE | Resolving a spin state | 4 | 4 | 4 | Continuous longitude coverage, because a period hides in one site's daylight. |
| M8.1 | PROTOCOL | What radar measures | 5 | 5 | 5 | Delay → range, Doppler spread → rotational velocities, power vs delay → range-resolved scattering, repeated images → shape. Clean. |
| M8.2 | BALLPARK | Range from radar delay | 4 | 4 | 4 | Decoys added: half the delay, and light speed already halved. The factor of two can be taken out once. |
| M8.3 | CHOICE | Spending a non-repeating window | 4 | 4 | 4 | Range and range-rate first, because the orbit decides whether there is a deflection problem at all. |
| M9.1 | BALLPARK | Impact kinetic energy | 5 | 5 | 5 | A diameter tile offered against a radius formula. The factor of eight it produces is the same one that makes the size measurement worth most. |
| M9.2 | PROTOCOL | Which uncertainty dominates | 4 | 5 | 5 | Cubic in diameter, linear in density, quadratic in speed — the sensitivity-analysis lesson done properly. The choice labels contain the arithmetic, which softens it. |
| M9.3 | CHOICE | Attack the steepest exponent | 4 | 5 | 4 | Improve the diameter, because energy goes as its cube. Follows the sensitivity analysis one stop earlier and only makes sense with it. |
| M10.1 | SEQUENCE | Atmospheric entry model | 4 | 4 | 4 | Properties → loads → breakup criteria → energy deposition. Forced. |
| M10.2 | DIAGNOSIS | Airburst vs ground impact | 5 | 5 | 4 | The *absent* seismic and crater signal is doing as much work as the present ones. Well built. |
| M10.3 | CHOICE | Propagating structural ignorance | 4 | 4 | 3 | Ensembles rather than one model, because the disagreement is the finding. |
| M11.1 | DIAGNOSIS | Solar-elongation blind spot | 5 | 5 | 5 | Bright enough, clear weather, healthy detector, and still invisible. Completeness as geometry rather than sensitivity — an excellent and non-obvious item. |
| M11.2 | BALLPARK | Searchable volume scales as r³ | 4 | 4 | 4 | Decoys added, including the squared answer — an area where the survey searches a volume. |
| M11.3 | CHOICE | Survey completeness | 4 | 4 | 4 | Wider sky and low solar elongations, because what hid this object was geometry rather than depth. |
| M12.1 | BALLPARK | Δv from transferred momentum | 5 | 5 | 5 | **Rebuilt.** The transferred momentum was pre-computed into a tile; the impactor's mass and speed are now the inputs, with the encounter speed as a decoy. |
| M12.2 | PROTOCOL | What determines deflection success | 5 | 5 | 4 | Lead time, unknown mass, ejecta enhancement, post-impact tracking. Correctly frames deflection as an experiment with a measured dependent variable. |
| M12.3 | CHOICE | Reconnaissance vs lead time | 4 | 5 | 4 | Long-term tracking, because the dependent variable of a deflection is the orbit. Matches the takeaway the funding round never reached. |
| M13.1 | PROTOCOL | Mapping constraints to subsystems | 4 | 3 | 2 | Mission engineering, not astronomy. |
| M13.2 | SEQUENCE | Intercept architecture | 4 | 4 | 3 | **Rewritten.** The architecture is now sized backwards from the velocity change it must deliver, so terminal guidance closes exactly the error launch and cruise leave behind. |
| M13.3 | CHOICE | Where margin buys most | 4 | 4 | 3 | Ephemeris and optical navigation, because the accuracy is lost at the encounter rather than at launch. |
| M14.1 | PROTOCOL | Action proportional to evidence state | 4 | 4 | 3 | Escalation tied to probability, lead time and reversibility. Sound, mostly policy. |
| M14.2 | BALLPARK | Expectation vs distribution | 4 | 5 | 4 | A probability offered as a percentage as well as a fraction, which is a factor of a hundred in the answer. |
| M14.3 | CHOICE | Preparing without spending credibility | 4 | 4 | 3 | Publish the uncertainty with the triggers, so a later change reads as the system working rather than as a reversal. |
| M15.1 | PROTOCOL | Final claim disposition | 4 | 3 | 2 | Good habit; no astronomy decided. |
| M15.2 | SEQUENCE | Public record | 4 | 3 | 3 | **Rewritten.** Ordered so each claim can be checked against the one before it — the consequence range beside the diameter it came from, the measured deflection beside the prediction. |
| M15.3 | CHOICE | Programme legacy | 4 | 4 | 2 | Survey completeness, because everything else in planetary defence is a function of warning time. |

### Summary

**Averages: Solvability 4.3 · Educational value 4.4 · Curriculum fit 4.0**

Highest educational value of the seven at **4.4**. All nine estimates gained distractors, three of them excellent — a diameter offered to a formula that takes a radius, a probability offered as a percentage as well as a fraction, an albedo ratio beside its own square root.

The intercept architecture is now sized backwards from the velocity change it has to deliver, so terminal guidance closes exactly the error that launch and cruise leave behind; and the final record is ordered so each claim can be checked against the one before it.
