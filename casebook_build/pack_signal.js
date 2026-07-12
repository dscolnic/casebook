// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"signal", title:"The Vasca Signal", discipline:"Astronomy & Astrophysics",
  teaser:"A repeating radio burst has an observatory in an uproar. First contact? A glitch? Or something else entirely?", overclaimTag:"an alien technosignature", truthTag:"a natural transient, oversold",
  venue:"the Vasca Ridge Observatory", agent:{name:"Dr. Halley Renn", role:"Investigator's Notepad"},
  standingLabel:"Scientific standing", readingShort:"Pioneers", readingLabel:"Astronomy Pioneers",
  dossierName:"ASTRONOMY PIONEERS", enterLabel:"Enter the observatory", subt:"A deduction game inside the Vasca Ridge signal review", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"And beware the headline the director is already writing: the evidence points not to visitors from another world, but to something realer — and harder to sell.",
  CATS:{
    who:{ title:"Who is behind it", truth:"director", items:[
      {id:"director", label:"Director Okonkwo — observatory head"},
      {id:"grad", label:"Sela Voss — the grad student who found it"},
      {id:"instr", label:"Dr. Reyes — instrument scientist"} ]},
    where:{ title:"Where it culminates", truth:"control", items:[
      {id:"dish", label:"The Radio Dish & Feed"},
      {id:"control", label:"The Control Room & Data Pipeline"},
      {id:"archive", label:"The Archive & Calibration Lab"} ]},
    what:{ title:"What is happening", truth:"transient", items:[
      {id:"aliens", label:"An alien technosignature — first contact"},
      {id:"glitch", label:"A mere instrument glitch or interference"},
      {id:"transient", label:"A new natural transient (a magnetar), oversold"} ]}
  },
  PLACES:{
    dish:{name:"The Radio Dish & Feed", xy:[140,90]},
    control:{name:"The Control Room & Data Pipeline", xy:[330,240]},
    archive:{name:"The Archive & Calibration Lab", xy:[520,90]}
  },
  EDGES:[["dish","control"],["control","archive"]],
  CHARACTERS:{
    op:{ name:"Bo the Night Op", role:"Telescope operator", face:"📡", badge:"O", legend:"the dish", hint:"Runs the dish overnight; knows which 'signals' are just planes and phones." },
    eng:{ name:"The Pipeline Engineer", role:"Data-pipeline engineer", face:"💾", badge:"E", legend:"the pipeline", hint:"Reduces the raw data; can show where a calibration step went wrong." },
    theo:{ name:"Dr. Amara", role:"Theoretical astrophysicist", face:"✶", badge:"H", legend:"the whiteboard", hint:"Knows what nature can and can't do; skeptical of extraordinary claims." }
  },
  TOPICMAP:{
    dish:{ op:["radio","rfi"], eng:["dispersion","pulsars"], theo:["magnetars","frbs"] },
    control:{ op:["doppler","standardcandle"], eng:["expansion","blackbody"], theo:["composition","seti"] },
    archive:{ op:["extraordinary","interferometry"], eng:["darkmatter","cmb"], theo:["parallax","supernovae"] }
  },
  TOPICS:{
    // cell: Bo the Night Op @ The Radio Dish & Feed
    radio:{ sci:"Karl Jansky (1905-1950)", topic:"The birth of radio astronomy", lede:"The radio engineer who heard the galaxy hissing and gave astronomy a second window on the sky.",
      no:1,
      profile:"Karl Jansky was a young physicist hired by Bell Telephone Laboratories in 1928 to hunt down the sources of static that plagued transatlantic radio-telephone calls. He built a rotating antenna array on a New Jersey field — colleagues called it 'Jansky's merry-go-round' — tuned to about 20 megahertz, and spent months cataloguing hiss.\n\nHe sorted the interference into three groups: nearby thunderstorms, distant thunderstorms, and a faint, steady hiss he could not place. That third signal rose and fell once a day, so at first he suspected the Sun. But over months the peak drifted, completing a cycle not in 24 hours but in 23 hours and 56 minutes — the sidereal day, the rhythm of the stars rather than the Sun. The source was fixed to the celestial sphere, and it pointed toward Sagittarius, the direction of the Milky Way's center.\n\nIn 1933 Jansky announced that the hiss came from the Galaxy itself. It was the first detection of cosmic radio waves and the founding moment of radio astronomy. Bell Labs, satisfied the static was unavoidable, reassigned him; he never worked in the field again, and died at 44. The unit of radio flux density, the jansky, carries his name.\n\nHis method is the whole lesson of this case. Jansky did not leap to a sensational cause; he isolated an unknown signal only after ruling out storms and the Sun, and he clinched its origin with a boring, decisive clue — the timing. A signal locked to sidereal time is celestial; one locked to human schedules is not. Before anyone at Vasca Ridge shouts 'aliens' or 'glitch,' the first question is Jansky's: what does the signal's clock say?",
      frame:"Bo leans back against the pedestal of the dish. \"Kid who started all this worked for the phone company, chasing static. Before I let you near my logs, show me you know how he told sky from noise.\"",
      q:[
        { q:"How did Jansky finally prove his mystery hiss came from beyond the Solar System?", o:[
          { t:"He pointed the antenna straight up and measured how the hiss faded with altitude above him.", v:"wrong", fb:"Altitude tests wouldn't localize a source; the daily timing did." },
          { t:"He matched the hiss to a known list of powerful commercial transmitters operating overseas.", v:"wrong", fb:"That would prove a terrestrial source, the opposite of what he found." },
          { t:"Its peak recurred every 23h56m — a sidereal day — fixed to the stars, not the Sun.", v:"expert", fb:"The sidereal period is the fingerprint of a celestial, not terrestrial, source." },
          { t:"He waited for a solar eclipse and watched the hiss vanish while the Moon blocked it.", v:"danger", fb:"The signal wasn't solar; its peak drifted away from the Sun over months." } ] },
        { q:"What was the direction of Jansky's strongest cosmic signal?", o:[
          { t:"The center of the Milky Way, toward the constellation Sagittarius.", v:"expert", fb:"The galactic center was the brightest low-frequency radio source he found." },
          { t:"The exact position of the Sun, tracked continuously across the daytime sky.", v:"wrong", fb:"He first suspected the Sun but the drift ruled it out." },
          { t:"The north celestial pole, the one fixed point the antenna could always see.", v:"wrong", fb:"The pole was not the source; the galactic plane was." },
          { t:"A single bright nearby star that happened to be a powerful radio emitter.", v:"wrong", fb:"It was the diffuse Galaxy, not one star, that dominated." } ] },
        { q:"Why does Jansky's story matter to the review at Vasca Ridge?", o:[
          { t:"Because it proves any unexplained radio hiss is ultimately galactic in origin.", v:"wrong", fb:"Plenty of hiss is terrestrial; the point is to test, not assume." },
          { t:"Because he shows a new signal is confirmed by ruling out mundane causes first.", v:"expert", fb:"Eliminating storms and Sun before claiming the Galaxy is the model to copy." },
          { t:"Because it shows the biggest radio dish always beats a careful analysis of timing.", v:"danger", fb:"Jansky's small antenna won by reasoning, not by raw size." },
          { t:"Because it demonstrates that Bell Labs engineers understood astronomy better than astronomers.", v:"wrong", fb:"The lesson is method, not institutional rivalry." } ] }
      ] },
    // cell: Bo the Night Op @ The Radio Dish & Feed
    rfi:{ sci:"Grote Reber (1911-2002)", topic:"Interference: cosmic vs terrestrial", lede:"The lone amateur who built a dish in his backyard and mapped the radio sky by hand.",
      no:2,
      profile:"Grote Reber was a radio engineer and amateur operator in Wheaton, Illinois, who read of Jansky's discovery and decided to follow it up alone. In 1937, in his own backyard, he built a 9-metre parabolic dish — the first purpose-built radio telescope — pointing at a fixed elevation while the sky drifted past. For nearly a decade he was effectively the only radio astronomer in the world.\n\nReber worked at night and on weekends, because the electric motors, ignition systems, and appliances of daytime Wheaton flooded his receiver with man-made interference. This is the enduring problem of radio astronomy: cosmic signals are staggeringly faint, and human technology is deafeningly loud in the same bands. He learned to recognize terrestrial interference by its habits — it switched on and off with human activity, clustered near populated hours, and did not track the sky.\n\nBy 1944 he published the first radio maps of the Milky Way, confirming and extending Jansky's detection and revealing bright regions in Cygnus and Cassiopeia. He built much of his own equipment and analyzed the data himself, and for years the professional community barely engaged. Eventually observatories the world over adopted his approach, and remote, radio-quiet sites became the standard.\n\nReber's discipline is exactly what the Vasca review demands. A genuine cosmic source keeps sidereal time and reappears wherever the same patch of sky is, regardless of local hour. Radio-frequency interference — a phone, a microwave oven, a passing aircraft transponder, a faulty generator — betrays itself by tracking human schedules and local geography. Distinguishing the two is not glamorous, but it is the difference between a discovery and an embarrassment, and it is precisely the test a repeating burst must survive before anyone frames it as a message.",
      frame:"\"Reber did the whole radio sky with a dish he poured in his own yard,\" Bo says, almost proud. \"And he still knew a spark plug from a star. Convince me you can tell interference from the real thing.\"",
      q:[
        { q:"What is the surest sign a radio signal is terrestrial interference, not cosmic?", o:[
          { t:"It appears only at very high frequencies that cosmic sources can never reach.", v:"wrong", fb:"Cosmic sources emit across many frequencies; frequency alone doesn't decide." },
          { t:"It tracks local time and human activity rather than keeping sidereal time.", v:"expert", fb:"Sky sources follow the stars; interference follows people." },
          { t:"It is always far fainter than any true astronomical signal in the same band.", v:"wrong", fb:"Interference is usually far louder, not fainter, than cosmic signals." },
          { t:"It carries an obviously coded message that no natural process could produce.", v:"danger", fb:"That reasoning is the alien trap; interference is mundane, not a message." } ] },
        { q:"Why did Reber do most of his observing at night?", o:[
          { t:"The dish could only be aimed accurately after sunset when the metal had cooled.", v:"wrong", fb:"Thermal effects weren't the issue; daytime human noise was." },
          { t:"Cosmic radio sources only emit their signals during local nighttime hours.", v:"danger", fb:"Sources emit around the clock; the sky is just quieter of humans at night." },
          { t:"His receiver could see the galactic center only when it rose after dark.", v:"partial", fb:"Visibility mattered, but the driving reason was daytime interference." },
          { t:"Daytime motors, ignitions, and appliances flooded his receiver with man-made static.", v:"expert", fb:"Reber worked nights to escape the din of human electronics." } ] },
        { q:"How does Reber's practice guide the Vasca inquiry?", o:[
          { t:"Confirm a source by re-observing the same sky and checking it keeps sidereal time.", v:"expert", fb:"Repeatability tied to the sky, not the clock, is the test of a real source." },
          { t:"Trust the very first detection, since interference never repeats twice in a row.", v:"danger", fb:"Interference repeats constantly; one detection proves little." },
          { t:"Assume any signal from a radio-quiet mountaintop site must be genuinely cosmic.", v:"wrong", fb:"Even quiet sites have local interference; you still must test." },
          { t:"Rely on the largest available dish and disregard where the signal points.", v:"wrong", fb:"Pointing and timing matter more than aperture for this test." } ] }
      ] },
    // cell: The Pipeline Engineer @ The Radio Dish & Feed
    dispersion:{ sci:"Duncan Lorimer (radio astronomer)", topic:"Dispersion measure & distance", lede:"The astronomer whose 'burst' first hinted that split-second radio flashes cross the whole universe.",
      no:3,
      profile:"Duncan Lorimer is a British-American radio astronomer who, with student David Narkevic, reported in 2007 a single, blindingly bright radio burst lasting under five milliseconds, found while combing archival data from the Parkes telescope in Australia. Now called the Lorimer Burst, it became the founding example of the fast radio burst, and the clue that unlocked its nature was dispersion.\n\nWhen a radio pulse travels through space, it crosses a thin sea of free electrons — the ionized gas between stars and between galaxies. Those electrons slow lower-frequency waves more than higher-frequency ones, so a pulse emitted in an instant arrives smeared out in time, high frequencies first, low frequencies trailing. The total delay measures how many electrons lay along the path, a quantity called the dispersion measure. A larger dispersion measure means a longer column of plasma, which usually means a greater distance.\n\nThe Lorimer Burst's dispersion was far too large to be explained by our own Galaxy. That single number implied the burst had crossed hundreds of millions or billions of light-years of intergalactic space — placing its source far outside the Milky Way and demanding an enormous energy for something so brief. Dispersion turned a millisecond flicker into a cosmic yardstick.\n\nFor the Vasca review, dispersion is the decisive diagnostic. A terrestrial signal or an instrument artifact has no reason to show the exact frequency-versus-time sweep that a real plasma path imprints; a genuine astrophysical burst does, and its dispersion measure encodes its distance. If the Vasca signal shows a clean, physically consistent dispersion sweep pointing far beyond the Galaxy, that is powerful evidence for a natural cosmic transient — and strong grounds to reject both the glitch story and the fantasy of a nearby beacon.",
      frame:"The engineer pulls up a waterfall plot. \"See that curve, the way the pulse slides down in frequency? That's the universe's own signature. Before I trust you with my reductions, tell me what it means.\"",
      q:[
        { q:"What physically causes the dispersion of a radio burst?", o:[
          { t:"Free electrons in space delay lower frequencies more than higher ones.", v:"expert", fb:"The plasma along the path smears the pulse, low frequencies arriving last." },
          { t:"Gravity from intervening galaxies bends and stretches the pulse as it passes.", v:"wrong", fb:"That's lensing; dispersion is a plasma effect, not gravity." },
          { t:"The source itself slowly changes frequency during the moment it is emitting.", v:"wrong", fb:"Dispersion is imprinted in transit, not by the source's own drift." },
          { t:"Earth's atmosphere refracts the radio waves the instant before they reach the dish.", v:"danger", fb:"The atmosphere is negligible here; the effect builds over cosmic distances." } ] },
        { q:"What does a large dispersion measure tell you about a burst?", o:[
          { t:"That its signal was artificially encoded by whoever chose to transmit it.", v:"danger", fb:"Dispersion is natural plasma physics, not a mark of intelligent design." },
          { t:"That the source is unusually cold and therefore emits only at low frequencies.", v:"wrong", fb:"Temperature isn't the point; column density of electrons is." },
          { t:"That the pulse likely crossed a long path, implying a great distance.", v:"expert", fb:"More intervening electrons generally means a farther, extragalactic source." },
          { t:"That the receiver was mistuned and stretched the pulse during recording.", v:"wrong", fb:"A real dispersion sweep is astrophysical, not a tuning error." } ] },
        { q:"Why is dispersion the key test for the Vasca signal?", o:[
          { t:"A clean, physical sweep argues for a real cosmic source, not an artifact.", v:"expert", fb:"Instrument glitches don't reproduce a genuine plasma dispersion law." },
          { t:"A large dispersion proves the transmitter must be a nearby engineered beacon.", v:"danger", fb:"Large dispersion implies distance and nature, undercutting the beacon idea." },
          { t:"Dispersion reveals the chemical composition of the source's atmosphere directly.", v:"wrong", fb:"Dispersion measures electrons on the path, not the source's chemistry." },
          { t:"It lets you read the exact frequency the aliens intended to broadcast on.", v:"wrong", fb:"There is no intended frequency; dispersion is a propagation effect." } ] }
      ] },
    // cell: The Pipeline Engineer @ The Radio Dish & Feed
    pulsars:{ sci:"Jocelyn Bell Burnell (b. 1943)", topic:"Pulsars & 'LGM-1'", lede:"The graduate student who found a ticking star and had the discipline not to call it aliens.",
      no:4,
      profile:"Jocelyn Bell Burnell was a doctoral student at Cambridge in 1967 when, monitoring a radio telescope she had helped build to study quasars, she noticed a faint smudge of 'scruff' on her chart-recorder paper. It recurred, and when she examined it at high time resolution it resolved into a train of pulses spaced an astonishing 1.337 seconds apart, steady as a metronome.\n\nNothing known could pulse that fast and that regularly. The precision was so uncanny that she and her supervisor Antony Hewish half-jokingly labelled the source LGM-1, for 'Little Green Men,' entertaining the possibility of an artificial beacon. Bell Burnell was unconvinced. She reasoned that a genuine civilization would not sit at one fixed spot on the sky with a signal so featureless, and — crucially — within weeks she found a second pulsing source in a completely different part of the sky. Two independent 'beacons' pointing nowhere in particular was absurd for aliens but natural for a new class of star.\n\nThe sources were pulsars: rapidly spinning neutron stars sweeping lighthouse beams of radio emission across Earth. The 1974 Nobel Prize went to Hewish; the omission of Bell Burnell became one of the most debated decisions in the prize's history, and she has since become a revered advocate for the field and for equity in science.\n\nHer instinct is the spine of the Vasca case. Faced with a signal too regular to seem natural, she did not reach for the sensational explanation; she looked for a mundane one, tested it, and let a second detection settle it. A repeating burst is not a message merely because it repeats. The professional move — and the one the review must reward — is to seek the natural transient before ever whispering the word 'aliens.'",
      frame:"\"She had 'Little Green Men' on her chart and still kept her head,\" the engineer says. \"That's the standard here. Show me you'd reason the way she did before you touch a single scan.\"",
      q:[
        { q:"What made Bell Burnell doubt her signal was an alien beacon?", o:[
          { t:"The pulses arrived far too slowly to have any artificial origin at all.", v:"wrong", fb:"It was the extreme regularity, not slowness, that first raised the question." },
          { t:"She soon found a second, unrelated pulsing source elsewhere on the sky.", v:"expert", fb:"Two independent 'beacons' pointing nowhere argued for a natural class." },
          { t:"The signal turned out to be a decoded human broadcast bouncing off the Moon.", v:"wrong", fb:"It was neither human nor lunar; it was a spinning neutron star." },
          { t:"She detected a clear repeating message encoded inside the individual pulses.", v:"danger", fb:"There was no message; the pulses were featureless and natural." } ] },
        { q:"What is a pulsar, physically?", o:[
          { t:"A rapidly spinning neutron star sweeping a radio beam past Earth.", v:"expert", fb:"The lighthouse of a magnetized, fast-rotating neutron star." },
          { t:"A binary system whose two stars eclipse each other with clockwork timing.", v:"wrong", fb:"Eclipses can be periodic, but pulsars are single spinning neutron stars." },
          { t:"A cloud of gas that pulses in brightness as it heats and cools repeatedly.", v:"wrong", fb:"Pulsar timing comes from rotation, not thermal cycling of gas." },
          { t:"An artificial transmitter left in orbit by an ancient spacefaring culture.", v:"danger", fb:"That's the LGM trap Bell Burnell rejected; pulsars are natural." } ] },
        { q:"What lesson does 'LGM-1' hold for the Vasca review?", o:[
          { t:"Extreme regularity in a signal is by itself proof of intelligent design.", v:"danger", fb:"Nature makes exquisitely regular clocks; regularity alone proves nothing." },
          { t:"A repeating signal demands a search for a natural cause before any claim of aliens.", v:"expert", fb:"Exhaust the mundane explanation first, exactly as she did." },
          { t:"Any second detection elsewhere on the sky confirms the first was a hoax.", v:"wrong", fb:"A second source suggested a natural population, not a hoax." },
          { t:"Graduate students should defer to directors when a signal looks strange.", v:"wrong", fb:"The lesson is independent scrutiny, not deference to authority." } ] }
      ] },
    // cell: Dr. Amara @ The Radio Dish & Feed
    magnetars:{ sci:"Chryssa Kouveliotou (b. 1953)", topic:"Magnetars", lede:"The astrophysicist who proved a class of stars carries the strongest magnetic fields in the universe.",
      no:5,
      profile:"Chryssa Kouveliotou is a Greek-American astrophysicist who, in the late 1990s, provided the decisive observational proof for magnetars — neutron stars with magnetic fields a thousand trillion times stronger than Earth's, the most intense known in the cosmos. The idea had been proposed by Robert Duncan and Christopher Thompson; Kouveliotou's measurements turned theory into established fact.\n\nHer key work focused on soft gamma repeaters, objects that emit sudden bursts of low-energy gamma rays. Studying the source SGR 1806-20, she measured its spin period and, crucially, how fast that spin was slowing down. The rate of slowdown implied a braking force so enormous it could only come from a magnetic field of the strength Duncan and Thompson had predicted. She showed that soft gamma repeaters and certain anomalous X-ray pulsars were the same underlying beast: young, isolated neutron stars whose decaying super-strong fields power their outbursts.\n\nMagnetars are rare and short-lived, and their fields are so extreme they can crack the star's crust, releasing flares. In 2004 a giant flare from SGR 1806-20 briefly outshone everything in the sky at gamma-ray energies and even disturbed Earth's ionosphere from across the Galaxy. Magnetars are now leading suspects for powering at least some fast radio bursts, especially after a burst was traced to the Galactic magnetar SGR 1935+2154 in 2020.\n\nFor the Vasca inquiry, the magnetar is the crux. It is exactly the kind of genuinely new, energetic, natural transient that a repeating radio burst can represent — real, important, publishable, and utterly non-artificial. Recognizing the signature of a magnetar is how the review distinguishes a true discovery from the director's alien fantasy on one side and the dismissive 'just a glitch' on the other.",
      frame:"Dr. Amara taps the whiteboard, covered in field equations. \"A magnetar bends spacetime with magnetism you cannot imagine. If you want my read on this signal, first prove you understand what these stars actually are.\"",
      q:[
        { q:"What defines a magnetar among neutron stars?", o:[
          { t:"An extraordinarily strong magnetic field, the most intense known in nature.", v:"expert", fb:"Magnetars are set apart by their colossal magnetic fields." },
          { t:"An unusually low density that lets it spin far faster than other stars.", v:"wrong", fb:"Neutron stars are all ultradense; magnetars are defined by field, not low density." },
          { t:"A companion black hole whose gravity powers all of its radio emission.", v:"wrong", fb:"Magnetars are typically isolated; their own field powers the flares." },
          { t:"An artificial power source engineered to broadcast across the Galaxy.", v:"danger", fb:"Magnetars are natural stars, not engineered transmitters." } ] },
        { q:"How did Kouveliotou infer a magnetar's field strength?", o:[
          { t:"By measuring the rapid rate at which its spin was slowing down.", v:"expert", fb:"The braking rate revealed a field matching the magnetar prediction." },
          { t:"By detecting a coded pattern buried within its gamma-ray bursts.", v:"danger", fb:"There was no code; she used the physics of spin-down." },
          { t:"By weighing the star directly from the orbit of a bright companion.", v:"partial", fb:"Mass matters, but it was spin-down, not a companion orbit, that clinched it." },
          { t:"By counting the total number of flares it produced over one year.", v:"wrong", fb:"Flare counts don't give field strength; the spin-down rate does." } ] },
        { q:"Why does the magnetar matter to the Vasca case?", o:[
          { t:"It is a genuinely new, energetic natural transient — real but non-artificial.", v:"expert", fb:"Exactly the true middle: an important discovery, not aliens, not nothing." },
          { t:"It proves that any repeating radio burst must be an alien technosignature.", v:"danger", fb:"Magnetars show the opposite: nature can make repeating bursts." },
          { t:"It shows the signal is surely just an instrument glitch after all.", v:"wrong", fb:"A magnetar is a real source, the reverse of a glitch." },
          { t:"It means the source cannot possibly lie outside our own Galaxy.", v:"wrong", fb:"Magnetars power bursts seen well beyond the Milky Way." } ] }
      ] },
    // cell: Dr. Amara @ The Radio Dish & Feed
    frbs:{ sci:"Victoria Kaspi (b. 1967)", topic:"Fast radio bursts", lede:"The astrophysicist who turned fast radio bursts from a curiosity into an industry of discovery.",
      no:6,
      profile:"Victoria Kaspi is an American-Canadian astrophysicist at McGill University and a leader in the study of neutron stars, pulsars, and fast radio bursts. She heads the FRB program of CHIME, a Canadian radio telescope with no moving parts and an enormous field of view, which transformed the field by detecting fast radio bursts by the hundreds where earlier searches had found a handful.\n\nFast radio bursts are millisecond flashes of radio energy, most originating in distant galaxies, releasing in a thousandth of a second as much energy as the Sun emits in days. Some repeat; many, so far, have been seen only once. Kaspi's teams showed that repeating and apparently non-repeating bursts have subtly different properties, mapped their positions to host galaxies, and — pivotally — helped tie at least one class to magnetars when CHIME and other instruments caught a bright burst from the Galactic magnetar SGR 1935+2154 in 2020, the first FRB-like event traced to a known object in our own Galaxy.\n\nThat detection was a turning point. It gave a concrete, natural progenitor for at least some fast radio bursts and anchored a field that had been fertile ground for speculation, including the recurring popular suggestion that repeating bursts might be alien. Kaspi's work exemplifies the sober alternative: statistics, localization, multi-telescope confirmation, and physical modeling.\n\nFor the Vasca review, Kaspi's playbook is the standard the director's press release fails to meet. A repeating fast radio burst is thrilling and genuinely new, but the responsible response is to localize it, characterize its dispersion and polarization, look for a plausible magnetar or neutron-star engine, and confirm it across instruments — not to leap to first contact. The Vasca signal, if real, most plausibly belongs to exactly this natural population.",
      frame:"\"CHIME finds these things by the hundred now,\" Amara says. \"We don't get to be amazed anymore — we localize, we characterize, we confirm. Show me you know what a fast radio burst actually is.\"",
      q:[
        { q:"What is a fast radio burst?", o:[
          { t:"A millisecond radio flash, usually from a distant galaxy, of immense energy.", v:"expert", fb:"Brief, luminous, and mostly extragalactic — that's an FRB." },
          { t:"A steady radio hum emitted continuously by clouds of interstellar dust.", v:"wrong", fb:"FRBs are brief flashes, not steady hums, and dust doesn't emit this way." },
          { t:"A slow radio pulse that repeats reliably once every few days on schedule.", v:"wrong", fb:"FRBs last milliseconds; some repeat, but not as slow scheduled pulses." },
          { t:"An intentional broadcast beamed toward Earth by a distant civilization.", v:"danger", fb:"That's the technosignature trap; FRBs have natural progenitors." } ] },
        { q:"What did the 2020 SGR 1935+2154 event establish?", o:[
          { t:"That at least some FRB-like bursts come from magnetars.", v:"expert", fb:"A Galactic magnetar produced an FRB-like burst, tying the two together." },
          { t:"That all fast radio bursts originate inside our own Milky Way.", v:"wrong", fb:"Most FRBs are extragalactic; this was a notable local exception." },
          { t:"That fast radio bursts are actually reflections of terrestrial radar.", v:"wrong", fb:"The source was a real astrophysical magnetar, not radar." },
          { t:"That repeating bursts are messages while single bursts are natural.", v:"danger", fb:"Repetition doesn't imply a message; both classes are natural." } ] },
        { q:"What does Kaspi's approach recommend for the Vasca signal?", o:[
          { t:"Localize it, characterize it, and confirm it across instruments before claiming anything.", v:"expert", fb:"Sober multi-telescope work, not a leap to first contact." },
          { t:"Announce first contact quickly to secure priority before rivals detect it.", v:"danger", fb:"Racing to announce aliens is exactly the failure to avoid." },
          { t:"Dismiss it, since a single facility can never confirm a real burst.", v:"wrong", fb:"Facilities coordinate; dismissal isn't the lesson either." },
          { t:"Assume it repeats forever, since every fast radio burst is a repeater.", v:"wrong", fb:"Many FRBs are seen only once; repetition can't be assumed." } ] }
      ] },
    // cell: Bo the Night Op @ The Control Room & Data Pipeline
    doppler:{ sci:"Christian Doppler (1803-1853)", topic:"The Doppler effect & redshift", lede:"The physicist who realized motion itself can shift the color of light and the pitch of sound.",
      no:7,
      profile:"Christian Doppler was an Austrian physicist who, in an 1842 paper, proposed that the observed frequency of a wave depends on the relative motion between its source and the observer. A source approaching you crowds its waves into a higher frequency; a source receding stretches them to a lower one. He argued this applied to light as well as sound, and famously — if partly mistakenly in detail — tried to explain the colors of double stars this way.\n\nThe everyday demonstration is sound: the pitch of a siren rises as it nears and drops as it passes. The astronomical payoff is light. When an object moves away from us, its spectral lines shift toward longer, redder wavelengths — redshift; when it approaches, they shift toward the blue. Because the pattern of spectral lines from known elements is fixed, measuring how far those lines have moved gives the object's velocity along the line of sight with great precision.\n\nDoppler's principle became one of astronomy's sharpest tools. It reveals the orbital wobble of stars tugged by unseen planets, the rotation of galaxies, the expansion of the cosmos, and the motion of gas around black holes. Crucially, the shift is set by physics — the relative velocity — and cannot be faked by a source simply 'choosing' a frequency.\n\nFor the Vasca review, the Doppler effect is a reality check on any claimed signal. A genuine cosmic source shows shifts and drifts consistent with real motion and with the dispersion its light suffers crossing space. A frequency that drifts in step with the observatory's own hardware — a local oscillator warming up, a clock slewing — is the fingerprint of an instrument artifact, not a star. Knowing which is which separates a true velocity signal from a buried calibration error in the pipeline.",
      frame:"Bo mimics a passing siren, grinning. \"Same trick moves the color of a star. I want to know you can tell a real Doppler shift from my gear drifting before I hand you the night logs.\"",
      q:[
        { q:"What produces a redshift in a receding object's spectrum?", o:[
          { t:"Its light waves are stretched to longer wavelengths by the recession.", v:"expert", fb:"Receding motion lengthens the waves, shifting lines toward the red." },
          { t:"Its atoms physically change into heavier, redder elements as it moves.", v:"wrong", fb:"The elements don't change; the observed wavelengths shift." },
          { t:"Interstellar dust selectively absorbs all of the object's blue light.", v:"partial", fb:"Dust reddens light, but that's extinction, not a Doppler redshift." },
          { t:"The source deliberately tunes its emission toward a lower frequency.", v:"danger", fb:"Redshift is set by motion, not by any source's choice." } ] },
        { q:"Why can't a source fake a Doppler shift by choosing its frequency?", o:[
          { t:"The shift is fixed by relative velocity, an unavoidable physical relation.", v:"expert", fb:"Velocity determines the shift; it isn't a dial the source sets." },
          { t:"Because every cosmic source is required by law to broadcast one fixed frequency.", v:"wrong", fb:"There's no fixed broadcast frequency; the physics is about motion." },
          { t:"Because only Earth-based transmitters are capable of changing their frequency.", v:"wrong", fb:"The point is physical velocity, not who can tune a transmitter." },
          { t:"Because the receiver automatically corrects any frequency the source picks.", v:"wrong", fb:"Receivers don't erase real shifts; velocity sets the shift itself." } ] },
        { q:"How does the Doppler effect help unmask a pipeline artifact?", o:[
          { t:"A drift locked to the observatory's own hardware signals an artifact, not motion.", v:"expert", fb:"Real shifts track the sky; hardware-locked drift is a calibration tell." },
          { t:"Any frequency drift at all proves the signal must be an alien transmission.", v:"danger", fb:"Drift alone means little; artifacts and real motion both cause it." },
          { t:"A redshift always guarantees the data pipeline is functioning perfectly.", v:"wrong", fb:"Redshift doesn't certify the pipeline; artifacts can mimic shifts." },
          { t:"The Doppler effect only applies to sound, so it cannot test radio data.", v:"wrong", fb:"It applies to all waves, including the radio signal in question." } ] }
      ] },
    // cell: Bo the Night Op @ The Control Room & Data Pipeline
    standardcandle:{ sci:"Henrietta Swan Leavitt (1868-1921)", topic:"Cepheids & the distance ladder", lede:"The astronomer whose overlooked stars became the ruler for measuring the universe.",
      no:8,
      profile:"Henrietta Swan Leavitt was an astronomer at Harvard College Observatory, one of the skilled 'computers' hired to measure and catalogue stars on photographic plates. Studying thousands of variable stars in the Magellanic Clouds, she noticed a pattern that would rescale the cosmos: among Cepheid variables, the brighter stars pulsed more slowly. In 1908 and definitively in 1912 she established the period-luminosity relation — a Cepheid's intrinsic brightness is set by the period of its pulsation.\n\nThe power of this lay in the setup. Because the stars she studied were all in the same cloud, they were all at essentially the same distance, so differences in their apparent brightness reflected true differences in luminosity. Once the relation was calibrated, a Cepheid became a 'standard candle': measure its pulsation period, read off its true brightness, compare with how bright it appears, and the difference yields its distance. Suddenly the depths of space were measurable.\n\nEdwin Hubble used Leavitt's relation to find Cepheids in the Andromeda 'nebula,' proving it lay far outside the Milky Way and that the universe brimmed with other galaxies. Her work is the crucial lower rung of the cosmic distance ladder that underpins measurements of expansion to this day. She died of cancer at 53, her contribution recognized fully only later.\n\nFor the Vasca inquiry, Leavitt's method models rigorous distance-finding — and rigorous control of variables. Her result held because she isolated one variable by fixing the others. The review must do the same: a claimed signal is only as trustworthy as the confounders ruled out around it. A buried calibration step in the pipeline is precisely an uncontrolled variable, one that can inflate or distort a real source into something it is not — the very flaw sitting under the Vasca director's grand announcement.",
      frame:"\"Leavitt built the ruler the whole universe is measured with, off plates other folks ignored,\" Bo says. \"She controlled her variables. Show me you'd control yours before trusting a number.\"",
      q:[
        { q:"What is the period-luminosity relation Leavitt discovered?", o:[
          { t:"A Cepheid's true brightness is set by how slowly it pulsates.", v:"expert", fb:"Longer pulsation period means greater intrinsic luminosity." },
          { t:"A Cepheid's color is set by how far away from Earth it happens to lie.", v:"wrong", fb:"The relation links period to luminosity, not color to distance." },
          { t:"A star's apparent brightness alone directly reveals its physical distance.", v:"wrong", fb:"Apparent brightness needs the period to yield true luminosity first." },
          { t:"A star's mass can be read straight from the color of its surface.", v:"wrong", fb:"That's unrelated; her relation is about pulsation period and luminosity." } ] },
        { q:"Why was it vital that her stars sat in the Magellanic Clouds?", o:[
          { t:"They were all at nearly the same distance, isolating true brightness differences.", v:"expert", fb:"Fixing distance let apparent brightness reveal real luminosity." },
          { t:"The Clouds shielded the stars from all interstellar dust and reddening.", v:"wrong", fb:"The Clouds don't shield dust; the shared distance is what mattered." },
          { t:"They were the only Cepheids bright enough to be seen from Harvard.", v:"wrong", fb:"Visibility wasn't the point; a common distance was." },
          { t:"Being nearby, their distances were already known with perfect precision.", v:"partial", fb:"Distances weren't known yet; the key was that they were equal." } ] },
        { q:"What does Leavitt's rigor teach the Vasca review?", o:[
          { t:"A result is only as good as the confounding variables you rule out.", v:"expert", fb:"Control the variables, or a hidden one distorts the answer." },
          { t:"A single measurement is enough if the star is bright enough to see.", v:"danger", fb:"Brightness doesn't excuse ignoring confounders like calibration." },
          { t:"Distance ladders prove any signal must originate outside the Galaxy.", v:"wrong", fb:"The ladder measures distance; it doesn't classify every signal." },
          { t:"Photographic plates are more reliable than modern digital pipelines.", v:"wrong", fb:"The lesson is method, not old media versus new." } ] }
      ] },
    // cell: The Pipeline Engineer @ The Control Room & Data Pipeline
    expansion:{ sci:"Edwin Hubble (1889-1953)", topic:"Cosmic expansion", lede:"The astronomer who showed the universe is not still, but flying apart in every direction.",
      no:9,
      profile:"Edwin Hubble was an American astronomer working at Mount Wilson Observatory, home to the largest telescope of its day. In the 1920s he resolved individual Cepheid variables in what were then called 'spiral nebulae' and, using Leavitt's period-luminosity relation, measured their distances. The nebulae proved to be entire galaxies far beyond the Milky Way, ending a long debate about the scale of the universe.\n\nHis more famous result came in 1929. Combining his distances with the redshifts that Vesto Slipher and others had measured, Hubble found a striking relation: the farther a galaxy, the faster it recedes, and the relationship is roughly linear. This is Hubble's law, and its proportionality constant — the Hubble constant — sets the expansion rate. The natural interpretation, developed with the theoretical work of Lemaître and others, is that space itself is expanding, carrying galaxies apart; the cosmic redshift is stretching of light by that expansion rather than motion through space alone.\n\nHubble's discovery reframed cosmology and led directly to the Big Bang picture. It depended entirely on chaining reliable rungs: standard candles for distance, spectra for redshift, and careful calibration linking them. An error anywhere in that chain propagates into a wrong expansion rate — which is exactly why the Hubble constant is still fiercely debated today.\n\nFor the Vasca review, Hubble embodies both the power and the fragility of an inference built on a pipeline. His conclusion was revolutionary and correct, but only because each step was checked. A repeating burst placed at a cosmological distance by its dispersion is a Hubble-style inference: real if the chain is sound, misleading if a calibration step is quietly broken. The director's headline rests on that chain — and the review's job is to test every link before endorsing the claim.",
      frame:"The engineer scrolls through a reduction script. \"Hubble's whole universe hangs off one chain of calibrations. So does this signal. Show me you understand what he actually measured.\"",
      q:[
        { q:"What relationship did Hubble establish in 1929?", o:[
          { t:"More distant galaxies recede faster, in a roughly linear relation.", v:"expert", fb:"Recession velocity rises with distance — Hubble's law." },
          { t:"All galaxies are moving directly toward the Milky Way over time.", v:"wrong", fb:"They recede, not approach; the universe is expanding." },
          { t:"Galaxies at every distance recede at exactly the same fixed speed.", v:"wrong", fb:"Speed rises with distance; it isn't a single fixed value." },
          { t:"Nearby galaxies recede fastest while distant ones stay perfectly still.", v:"wrong", fb:"It's the reverse: farther galaxies recede faster." } ] },
        { q:"What did Hubble's result depend on most critically?", o:[
          { t:"A reliable chain of distance calibrations plus measured redshifts.", v:"expert", fb:"Standard candles and spectra, only trustworthy if well calibrated." },
          { t:"A single unusually bright galaxy that set the scale for all others.", v:"wrong", fb:"He used many galaxies and a calibrated distance ladder." },
          { t:"Detecting an artificial signal embedded in the light of the galaxies.", v:"danger", fb:"No signal was involved; it was distances and redshifts." },
          { t:"The largest telescope alone, regardless of how the data was reduced.", v:"partial", fb:"Aperture helped, but calibration of the chain was decisive." } ] },
        { q:"How is the Vasca burst's distance like a Hubble inference?", o:[
          { t:"It's real only if every calibration link in the chain holds up.", v:"expert", fb:"A broken link, like a buried artifact, corrupts the conclusion." },
          { t:"It is automatically correct because dispersion never lies about distance.", v:"danger", fb:"Dispersion helps, but only with a sound, well-calibrated pipeline." },
          { t:"It proves the source is intelligent, since only Hubble measured expansion.", v:"wrong", fb:"Distance inference says nothing about intelligence." },
          { t:"It cannot be trusted at all, because all distance ladders are unreliable.", v:"wrong", fb:"Ladders are reliable when calibrated; blanket distrust is wrong." } ] }
      ] },
    // cell: The Pipeline Engineer @ The Control Room & Data Pipeline
    blackbody:{ sci:"Gustav Kirchhoff (1824-1887)", topic:"Thermal radiation & Kirchhoff's laws", lede:"The physicist who wrote the rules that let us read a star's chemistry in its light.",
      no:10,
      profile:"Gustav Kirchhoff was a German physicist who, working with the chemist Robert Bunsen in the late 1850s, founded the science of spectral analysis and coined the term 'black body.' Together they showed that each chemical element, when heated, emits light at a fixed set of wavelengths — a spectral fingerprint — and that the same element absorbs those very wavelengths when cooler gas lies in front of a hotter source.\n\nHe distilled this into three empirical rules, Kirchhoff's laws of spectroscopy. A hot dense object glows with a continuous spectrum. A hot thin gas emits only at its characteristic bright lines. And a cool gas in front of a continuous source removes exactly those lines, producing dark absorption features. From the pattern of lines, one can read which elements are present, and from their strengths and shifts, the temperature, pressure, and motion of the gas.\n\nKirchhoff also framed the concept of thermal, or black-body, radiation: the smooth glow whose shape depends only on temperature, later explained by Planck's quantum theory. These ideas turned starlight into data. Applied to the Sun, Kirchhoff's laws identified the elements in its atmosphere; applied across astronomy, they let us classify stars, measure temperatures, and detect motion.\n\nFor the Vasca review, Kirchhoff's laws are the tool for asking what a signal's spectrum means. A natural astrophysical source has a spectrum shaped by physics — thermal continua, or the broadband, dispersion-swept emission of a burst — with no reason to concentrate into a single suspiciously narrow, artificial-looking line. A signal parked at one pure frequency is the classic hallmark that seduces alien-hunters, yet it is just as easily the signature of terrestrial interference or a hardware resonance. Reading the spectrum correctly is how the review tells thermal nature from narrowband artifact from fantasy beacon.",
      frame:"\"Kirchhoff taught us to read a spectrum like a fingerprint,\" the engineer says. \"Every claim about this burst lives or dies on its spectrum. Prove you can read one.\"",
      q:[
        { q:"By Kirchhoff's laws, what does a hot thin gas produce?", o:[
          { t:"Bright emission lines at the gas's characteristic wavelengths.", v:"expert", fb:"A hot rarefied gas emits its own bright-line fingerprint." },
          { t:"A smooth continuous rainbow with no lines of any kind at all.", v:"wrong", fb:"That's a hot dense body; thin gas gives discrete emission lines." },
          { t:"Dark absorption gaps carved out of a brighter background source.", v:"partial", fb:"Absorption arises from cool gas in front of a hot source, not this case." },
          { t:"A single artificial tone chosen to carry an encoded message.", v:"danger", fb:"Kirchhoff's lines are natural physics, not designed tones." } ] },
        { q:"What shapes a black-body (thermal) spectrum?", o:[
          { t:"Only the object's temperature sets its smooth, continuous glow.", v:"expert", fb:"Thermal radiation's shape depends solely on temperature." },
          { t:"The object's rotation speed alone fixes the shape of its glow.", v:"wrong", fb:"Rotation isn't it; temperature governs the thermal curve." },
          { t:"A hidden transmitter modulates the object's total light output.", v:"danger", fb:"Thermal spectra are natural; no transmitter is involved." },
          { t:"The precise chemical mix determines the whole continuous shape.", v:"partial", fb:"Composition sets lines; the continuum's shape is set by temperature." } ] },
        { q:"How do Kirchhoff's laws help judge the Vasca signal?", o:[
          { t:"A single suspiciously narrow line is as likely interference as anything.", v:"expert", fb:"Narrowband tones seduce alien-hunters but often mean local RFI." },
          { t:"A pure narrow line at one frequency proves an intelligent transmitter.", v:"danger", fb:"Narrowband alone is the alien trap; nature and RFI make lines too." },
          { t:"Any broadband spectrum automatically confirms the signal is a hoax.", v:"wrong", fb:"Broadband emission is typical of natural bursts, not a hoax." },
          { t:"Spectra reveal only temperature and never help classify a signal.", v:"wrong", fb:"Spectra reveal composition, motion, and nature of the source." } ] }
      ] },
    // cell: Dr. Amara @ The Control Room & Data Pipeline
    composition:{ sci:"Cecilia Payne-Gaposchkin (1900-1979)", topic:"What the stars are made of", lede:"The astronomer who discovered that the stars, and the universe, are mostly hydrogen.",
      no:11,
      profile:"Cecilia Payne-Gaposchkin was a British-American astronomer whose 1925 Harvard doctoral thesis is often called the most brilliant in the history of astronomy. Applying the new quantum physics of ionization — Meghnad Saha's theory — to stellar spectra, she showed that the strengths of a star's spectral lines depend overwhelmingly on its temperature, not simply on how much of each element it contains. Correctly interpreting the lines, she concluded that stars are composed almost entirely of hydrogen and helium, with heavier elements a mere trace.\n\nThis contradicted the prevailing belief that stars had roughly the same composition as Earth. Under pressure from senior astronomers, she softened the claim in her thesis, calling the hydrogen and helium values 'almost certainly not real.' Within a few years the field confirmed she had been right all along: hydrogen is by far the most abundant element in stars and in the cosmos. Her insight underpins all of stellar astrophysics — how stars form, shine, and evolve.\n\nPayne-Gaposchkin went on to a distinguished career at Harvard, eventually its first woman promoted to full professor and department chair, studying variable stars and mentoring generations of astronomers.\n\nFor the Vasca review, her story carries two lessons braided together. First, the scientific one: correctly reading a spectrum requires accounting for the physics — temperature, ionization — before drawing conclusions about what is really there, or a real signal can be misread. Second, the human one: she was pressured to walk back a correct, extraordinary result by an authority who doubted it. The Vasca case has the inverse pathology — a director pressuring a correct-but-modest result into an extraordinary, unsupported claim. Both distortions come from letting authority or ambition, rather than the data, set the conclusion. Payne-Gaposchkin's vindication is the reminder that the spectrum, honestly read, is the arbiter.",
      frame:"Amara sets down her chalk. \"She found the universe was made of hydrogen and was pressured to unsay it. Ambition bends results both ways. Tell me you understand what she actually proved.\"",
      q:[
        { q:"What did Payne-Gaposchkin conclude about stellar composition?", o:[
          { t:"Stars are made almost entirely of hydrogen and helium.", v:"expert", fb:"Hydrogen and helium dominate; heavier elements are traces." },
          { t:"Stars share essentially the same composition as planet Earth.", v:"wrong", fb:"That was the old view she overturned." },
          { t:"Stars are built mostly of iron and other heavy metals throughout.", v:"wrong", fb:"Heavy metals are trace; hydrogen dominates." },
          { t:"Each star has a totally unique composition unrelated to any other.", v:"wrong", fb:"Stars broadly share a hydrogen-helium makeup." } ] },
        { q:"What key physics did she apply to read the spectra correctly?", o:[
          { t:"That line strengths depend strongly on temperature and ionization.", v:"expert", fb:"Saha's ionization theory tied line strength to temperature." },
          { t:"That line strengths depend only on the raw abundance of each element.", v:"wrong", fb:"That naive assumption was exactly her predecessors' error." },
          { t:"That an artificial modulation was imposed on each star's light.", v:"danger", fb:"No modulation; it was ionization physics she applied." },
          { t:"That gravity alone determined which spectral lines could appear.", v:"partial", fb:"Pressure matters, but temperature and ionization were decisive." } ] },
        { q:"What double lesson does her story hold for Vasca?", o:[
          { t:"Let the honest spectrum decide, not authority or ambition.", v:"expert", fb:"Data, not a boss's pressure, must set the conclusion." },
          { t:"Junior scientists should always defer to a senior director's reading.", v:"danger", fb:"Deference is what nearly buried her correct result." },
          { t:"An extraordinary result should always be softened to avoid conflict.", v:"wrong", fb:"She was wrongly pressured to soften a correct result." },
          { t:"Composition can never be inferred from a spectrum with any confidence.", v:"wrong", fb:"Composition absolutely can be read, with the right physics." } ] }
      ] },
    // cell: Dr. Amara @ The Control Room & Data Pipeline
    seti:{ sci:"Frank Drake (1930-2022)", topic:"SETI & technosignatures", lede:"The astronomer who first pointed a telescope at the stars asking whether anyone was broadcasting.",
      no:12,
      profile:"Frank Drake was an American astronomer who launched the modern search for extraterrestrial intelligence. In 1960, in Project Ozma, he pointed an 26-metre dish at two nearby Sun-like stars, listening near the 1420 MHz hydrogen line for narrowband radio transmissions that might betray a civilization. He detected no aliens — but he detected, memorably, terrestrial interference that at first looked tantalizing, an early lesson in how easily the search fools itself.\n\nThe next year Drake wrote down the Drake equation, a framework multiplying the factors that set how many communicating civilizations might exist in our Galaxy: star formation rate, fraction with planets, habitable worlds per system, fractions where life, intelligence, and technology arise, and how long such civilizations broadcast. The equation does not give an answer — most terms are unknown — but it organizes the question and makes the uncertainties explicit. Drake also helped design the Arecibo message and the Pioneer plaque.\n\nCrucially, SETI practitioners developed rigorous criteria for a candidate technosignature: it should be narrowband in a way nature avoids, persist and repeat from a fixed celestial position, survive checks against known satellites and interference, and be independently confirmed by another observatory before any announcement. The famous 1977 'Wow! signal' failed the last test — it never returned.\n\nFor the Vasca review, Drake defines what a real alien claim would require, and thereby exposes what the director's does not have. A genuine technosignature must pass a gauntlet: not merely 'a signal we can't explain,' but one that beats every terrestrial and natural alternative and is verified elsewhere. The Vasca burst, with a dispersion sweep and a plausible magnetar engine, looks like nature, not engineering. Drake's own discipline argues for the natural transient and against premature first-contact fervor.",
      frame:"\"I spent a lifetime listening for a signal like the one your director is shouting about,\" Amara says. \"So I know exactly how high the bar is. Show me you know what SETI actually requires.\"",
      q:[
        { q:"What is the Drake equation meant to do?", o:[
          { t:"Organize the factors setting how many broadcasting civilizations may exist.", v:"expert", fb:"It structures the question; it doesn't deliver a firm number." },
          { t:"Prove mathematically that extraterrestrial civilizations definitely exist.", v:"danger", fb:"It proves nothing; most of its terms are unknown." },
          { t:"Calculate the exact distance to the nearest inhabited planet directly.", v:"wrong", fb:"It doesn't compute distances; it frames the abundance question." },
          { t:"Decode the content of any message received from another civilization.", v:"wrong", fb:"It's about how many civilizations, not decoding messages." } ] },
        { q:"What must a credible technosignature candidate do?", o:[
          { t:"Beat every natural and terrestrial alternative and be confirmed elsewhere.", v:"expert", fb:"Independent confirmation after ruling out mundane causes is essential." },
          { t:"Simply be a signal that the discovering team cannot yet explain.", v:"danger", fb:"'Unexplained' is not 'alien'; the bar is far higher." },
          { t:"Appear once, briefly, and never be seen again from that direction.", v:"wrong", fb:"A one-off like the Wow! signal fails; persistence matters." },
          { t:"Match the frequency of a known human communications satellite.", v:"wrong", fb:"Matching a satellite marks it as interference, not a signature." } ] },
        { q:"How does SETI's rigor bear on the Vasca claim?", o:[
          { t:"It sets a bar the director's evidence clearly fails to clear.", v:"expert", fb:"A dispersion sweep and magnetar engine point to nature, not a beacon." },
          { t:"It shows any unexplained repeating burst qualifies as first contact.", v:"danger", fb:"SETI demands far more than mere repetition or mystery." },
          { t:"It proves the Vasca signal cannot be a natural source at all.", v:"wrong", fb:"The evidence in fact favors a natural transient." },
          { t:"It means only Arecibo-class dishes may ever claim a detection.", v:"wrong", fb:"The criteria are about rigor, not one specific dish." } ] }
      ] },
    // cell: Bo the Night Op @ The Archive & Calibration Lab
    extraordinary:{ sci:"Carl Sagan (1934-1996)", topic:"Extraordinary claims & evidence", lede:"The astronomer who taught a generation that wonder and skepticism are the same discipline.",
      no:13,
      profile:"Carl Sagan was an American astronomer, planetary scientist, and science communicator who did serious research — on the greenhouse atmosphere of Venus, on Mars, on the chemistry of life's origins — and who, through the series and book Cosmos, brought that science to hundreds of millions. He was also a leading voice for the search for extraterrestrial life and helped craft the Pioneer plaque and Voyager Golden Record.\n\nSagan is best remembered for a maxim he popularized: 'Extraordinary claims require extraordinary evidence.' It captures a principle at the heart of scientific reasoning — the more a claim departs from established knowledge, the stronger the evidence must be to support it, and the more rigorously alternative explanations must be excluded. In The Demon-Haunted World he framed a 'baloney detection kit': independent confirmation, quantifiable claims, honest consideration of alternatives, and refusal to let the appeal of a conclusion substitute for its proof.\n\nCrucially, Sagan paired this skepticism with genuine openness. He took the possibility of extraterrestrial intelligence seriously enough to devote real effort to it — while insisting that taking it seriously meant holding it to the highest evidentiary standard, not the lowest. Skepticism, for him, was not cynicism; it was how you protect a real discovery from being drowned by wishful ones.\n\nFor the Vasca review, Sagan's rule is the spine of the entire case. 'Aliens' is the most extraordinary claim available, and it therefore demands the most extraordinary evidence — evidence the director does not have. But the rule cuts the other way too: dismissing a genuinely anomalous, repeating signal as 'just a glitch' also fails, because it ignores real data. The disciplined path threads between them to the natural transient: extraordinary enough to matter, ordinary enough that the evidence actually supports it.",
      frame:"\"'Extraordinary claims require extraordinary evidence' — Bo says it like a prayer. \"Everybody quotes it; nobody applies it. Show me you can, and I'll open the calibration archive.\"",
      q:[
        { q:"What does Sagan's maxim actually demand?", o:[
          { t:"The more a claim departs from known science, the stronger its evidence must be.", v:"expert", fb:"Extraordinary claims must clear a proportionally higher bar." },
          { t:"Extraordinary claims should be embraced quickly because they are exciting.", v:"danger", fb:"Excitement is not evidence; that's the trap the rule guards against." },
          { t:"Any claim at all should be rejected unless it is completely ordinary.", v:"wrong", fb:"It doesn't forbid bold claims; it raises the evidence required." },
          { t:"Only claims made by credentialed astronomers deserve to be taken seriously.", v:"wrong", fb:"It's about evidence, not the claimant's credentials." } ] },
        { q:"How did Sagan pair skepticism with openness?", o:[
          { t:"He took alien life seriously while holding it to the highest evidence bar.", v:"expert", fb:"Serious about the question, uncompromising about the proof." },
          { t:"He dismissed the search for alien life as unscientific fantasy entirely.", v:"wrong", fb:"He championed the search; he just demanded rigor." },
          { t:"He accepted alien reports readily to keep public wonder alive.", v:"danger", fb:"He refused to let appeal substitute for proof." },
          { t:"He argued wonder and evidence are opposed and must be kept apart.", v:"wrong", fb:"For him they were the same discipline, not opposed." } ] },
        { q:"How does the maxim resolve the Vasca dilemma?", o:[
          { t:"Reject aliens for lack of proof, but don't dismiss real data as a glitch.", v:"expert", fb:"It threads between both traps to the supported natural transient." },
          { t:"Since the signal is extraordinary, first contact is the safest conclusion.", v:"danger", fb:"Extraordinary claims need extraordinary proof, which is absent." },
          { t:"Since aliens are unproven, the signal must be nothing but a glitch.", v:"wrong", fb:"Dismissal ignores the real anomalous data; that fails too." },
          { t:"The rule applies only to the public, never to working scientists.", v:"wrong", fb:"It's a core principle for scientists above all." } ] }
      ] },
    // cell: Bo the Night Op @ The Archive & Calibration Lab
    interferometry:{ sci:"Martin Ryle (1918-1984)", topic:"Interferometry & resolution", lede:"The astronomer who combined many small dishes to see the radio sky in sharp detail.",
      no:14,
      profile:"Martin Ryle was a British radio astronomer at Cambridge who developed the technique of aperture synthesis, for which he shared the 1974 Nobel Prize in Physics — the first Nobel awarded for astronomical research. The problem he solved is fundamental: the sharpness with which any telescope can resolve detail depends on the ratio of the wavelength observed to the diameter of the instrument. Radio wavelengths are enormous compared with light, so a single radio dish, however large, produces blurry images.\n\nRyle's insight was that an array of smaller antennas, spread apart and their signals combined with precise timing, can act like one gigantic telescope as wide as the separation between them. As the Earth rotates, the array samples different orientations, synthesizing an aperture kilometres across. This yields both high resolution and precise positions on the sky. His group produced influential surveys of radio sources whose counts became early evidence against the steady-state universe and for an evolving cosmos.\n\nInterferometry also delivers something the Vasca case needs directly: pinpoint localization. By combining widely separated stations, astronomers can fix a burst's position tightly enough to identify its host galaxy — the single most powerful step in proving a fast radio burst is a real, distant, natural event rather than local interference.\n\nFor the Vasca review, Ryle's technique is the antidote to hand-waving. A single dish can register a signal but cannot say precisely where on the sky it came from; interference from the ground, a satellite, or a fault in the feed can masquerade as a source. An interferometric localization that lands the Vasca burst squarely on a distant galaxy would nearly settle the matter — natural, extragalactic, and no beacon next door. Failure to localize, conversely, is exactly the gap a premature announcement papers over.",
      frame:"\"One dish gives you a blur; Ryle taught us to build a telescope out of the whole sky's rotation,\" Bo says. \"Localization ends most arguments. Show me you know why.\"",
      q:[
        { q:"What does aperture synthesis achieve?", o:[
          { t:"Combining separated antennas to act as one far larger telescope.", v:"expert", fb:"Spread-out dishes synthesize a giant effective aperture." },
          { t:"Making a single dish physically expand to a larger diameter.", v:"wrong", fb:"No dish grows; the array mimics a larger one." },
          { t:"Boosting a signal's raw strength so faint sources look brighter.", v:"partial", fb:"Sensitivity can improve, but the key gain is resolution and position." },
          { t:"Filtering a signal until only the intended message remains visible.", v:"danger", fb:"There's no message; synthesis is about resolution, not decoding." } ] },
        { q:"Why does a single radio dish give blurry images?", o:[
          { t:"Radio wavelengths are huge relative to any single dish's diameter.", v:"expert", fb:"Resolution scales with wavelength over aperture; radio waves are long." },
          { t:"Radio dishes are always built from lower-quality reflecting material.", v:"wrong", fb:"Material isn't the issue; the wavelength-to-size ratio is." },
          { t:"The atmosphere scatters all radio waves before they reach the ground.", v:"wrong", fb:"Radio passes the atmosphere well; the limit is diffraction." },
          { t:"Radio sources are intrinsically too faint to ever be imaged sharply.", v:"wrong", fb:"Brightness isn't the point; resolution is set by aperture." } ] },
        { q:"How would interferometry help settle the Vasca case?", o:[
          { t:"Pinpointing the burst onto a distant host galaxy nearly settles it.", v:"expert", fb:"A firm extragalactic localization argues natural, not a local beacon." },
          { t:"A single dish's detection alone already proves the source's exact position.", v:"danger", fb:"One dish can't localize tightly; that gap is the problem." },
          { t:"Localization can reveal the specific alien species that sent the signal.", v:"wrong", fb:"It reveals a host galaxy, not senders; nature is the finding." },
          { t:"Interferometry only improves brightness and says nothing about position.", v:"wrong", fb:"Its great strength is precise position, not just sensitivity." } ] }
      ] },
    // cell: The Pipeline Engineer @ The Archive & Calibration Lab
    darkmatter:{ sci:"Vera Rubin (1928-2016)", topic:"Rotation curves & dark matter", lede:"The astronomer whose careful measurements revealed most of the universe is unseen.",
      no:15,
      profile:"Vera Rubin was an American astronomer whose meticulous observations of how galaxies rotate provided the most compelling evidence that most of the universe's matter is invisible. Working in the 1970s with instrument-builder Kent Ford, she measured the orbital speeds of stars and gas at different distances from the centers of spiral galaxies, beginning with Andromeda.\n\nBy Newtonian expectation, if a galaxy's mass followed its visible light — concentrated toward the bright center — then stars in the sparse outskirts should orbit more slowly, just as outer planets orbit the Sun more slowly than inner ones. Rubin found instead that rotation curves stayed flat: stars far out moved just as fast as those closer in. The only way to hold those fast-moving outer stars in orbit was for the galaxies to contain far more mass than their light revealed, distributed in an extended, invisible halo. This was strong, reproducible evidence for dark matter, an idea Fritz Zwicky had raised decades earlier from galaxy clusters.\n\nRubin's work was patient, quantitative, and repeated across dozens of galaxies until the pattern was undeniable. She became a champion for women in science, and the Vera C. Rubin Observatory now bears her name.\n\nFor the Vasca review, Rubin models how a real anomaly is established: not with one dramatic result trumpeted to the press, but with a discrepancy between prediction and measurement, confirmed again and again, whose simplest explanation is something genuinely new. She did not overclaim — she did not announce exotic beings or dismiss the data — she reported precisely what the rotation curves required. That is the temper the Vasca case rewards: follow the measured discrepancy to the least sensational explanation that actually fits, and hold it only as firmly as the repeated data allow.",
      frame:"The engineer pulls a plot of orbital speeds. \"Rubin didn't shout; she measured the same thing over and over until it was undeniable. Show me you grasp what her curves actually showed.\"",
      q:[
        { q:"What did Rubin find about galaxy rotation curves?", o:[
          { t:"Outer stars orbit as fast as inner ones — the curves stay flat.", v:"expert", fb:"Flat rotation curves imply unseen mass in an extended halo." },
          { t:"Outer stars orbit much slower, exactly as the visible light predicts.", v:"wrong", fb:"That was the expectation she overturned; the curves stayed flat." },
          { t:"Only the very central stars move, while the outskirts are motionless.", v:"wrong", fb:"Outer stars move fast, not not at all." },
          { t:"Stars orbit in the direction opposite to the galaxy's own spin.", v:"wrong", fb:"Direction wasn't the issue; the flat speed profile was." } ] },
        { q:"What did flat rotation curves imply?", o:[
          { t:"Galaxies hold far more mass than their light reveals — dark matter.", v:"expert", fb:"Invisible mass in a halo keeps outer stars moving fast." },
          { t:"Galaxies are actually much smaller than their visible light suggests.", v:"wrong", fb:"They're more massive, not smaller; extra unseen mass is required." },
          { t:"An intelligent force is deliberately steering the outer stars along.", v:"danger", fb:"No agency needed; unseen mass explains it naturally." },
          { t:"Newton's laws simply fail completely and must be discarded entirely.", v:"partial", fb:"A minority pursues modified gravity, but dark matter is the leading fit." } ] },
        { q:"What is the temper of Rubin's method for Vasca?", o:[
          { t:"Follow a repeated discrepancy to the least sensational explanation that fits.", v:"expert", fb:"Confirmed data, not press releases, and the simplest sufficient cause." },
          { t:"Announce the most exotic explanation as soon as one anomaly appears.", v:"danger", fb:"That's the overclaim habit Rubin avoided." },
          { t:"Ignore any discrepancy that cannot be explained on the first night.", v:"wrong", fb:"She pursued the anomaly patiently, not dismissed it." },
          { t:"Trust a single dramatic result over many repeated measurements.", v:"wrong", fb:"Her strength was repetition until the pattern was undeniable." } ] }
      ] },
    // cell: The Pipeline Engineer @ The Archive & Calibration Lab
    cmb:{ sci:"Arno Penzias (1933-2024)", topic:"A cosmic signal mistaken for noise", lede:"The physicist who found the echo of the Big Bang while trying to get rid of it.",
      no:16,
      profile:"Arno Penzias was a German-born American physicist who, with Robert Wilson at Bell Labs in 1964, made one of the most important accidental discoveries in science. Using a sensitive horn antenna in Holmdel, New Jersey, built for satellite communications, they found a persistent excess of microwave noise coming from every direction in the sky, unchanging with time of day or season, that they could not eliminate.\n\nThey were rigorous about excluding mundane causes. They checked their electronics, ruled out urban interference, and famously cleared out pigeons nesting in the antenna and scrubbed away their droppings — the 'white dielectric material' — suspecting it might be the source. The signal remained, corresponding to a temperature of about 2.7 kelvin, uniform across the sky. Only after exhausting local explanations did they learn, through Robert Dicke's group at Princeton, that theory predicted exactly such a relic glow: the cosmic microwave background, the cooled radiation left over from the hot early universe. The discovery earned Penzias and Wilson the 1978 Nobel Prize and became a pillar of Big Bang cosmology.\n\nThe episode is astronomy's parable about the boundary between signal and artifact. What looked like instrument noise was the most profound cosmic signal ever detected — but it was only recognized as such after every terrestrial and instrumental cause had been methodically eliminated and a physical explanation was in hand.\n\nFor the Vasca review, Penzias and Wilson are the exact template. They neither dismissed a strange persistent signal as 'just noise' nor leapt to a sensational cause; they cleaned the pigeons out first, then followed the surviving signal to its real, natural, extraordinary source. The Vasca burst deserves the same treatment: rule out the buried calibration artifact and the interference, and if a real signal survives, name it for what the physics says it is — a natural transient, not a message.",
      frame:"\"They found the birth-cry of the universe and spent months thinking it was pigeon mess,\" the engineer says. \"That's the discipline. Show me you know the difference between noise and a signal.\"",
      q:[
        { q:"What was the persistent signal Penzias and Wilson detected?", o:[
          { t:"A uniform 2.7 K microwave glow from every direction — the CMB.", v:"expert", fb:"The relic radiation of the hot early universe." },
          { t:"A bright radio flash coming from one fixed point on the sky.", v:"wrong", fb:"It was uniform in all directions, not a single point source." },
          { t:"A coded microwave transmission originating from a nearby star.", v:"danger", fb:"It was natural relic radiation, not a transmission." },
          { t:"A seasonal hum that appeared only during the coldest winter nights.", v:"wrong", fb:"It was constant with season and time of day." } ] },
        { q:"How did they handle the mysterious noise responsibly?", o:[
          { t:"They eliminated every local cause — even pigeons — before accepting it as real.", v:"expert", fb:"Exhaust mundane explanations first, then follow what survives." },
          { t:"They announced a cosmic discovery the moment the noise appeared.", v:"danger", fb:"They did the opposite: they suspected their own equipment first." },
          { t:"They discarded the data as hopeless instrument noise and moved on.", v:"wrong", fb:"They didn't dismiss it; they chased down its cause." },
          { t:"They assumed a distant civilization and searched for a message in it.", v:"danger", fb:"No leap to aliens; they cleaned pigeons and checked electronics." } ] },
        { q:"What template does this set for the Vasca signal?", o:[
          { t:"Rule out the artifact and interference, then name what survives.", v:"expert", fb:"Clean the pigeons first; if a real signal remains, identify it." },
          { t:"Treat any persistent unexplained signal as proof of first contact.", v:"danger", fb:"Persistence isn't proof of aliens; it's a cue to investigate." },
          { t:"Assume a strange constant signal is always harmless instrument noise.", v:"wrong", fb:"That dismissal would have missed the CMB entirely." },
          { t:"Trust that a big enough antenna removes the need to check for artifacts.", v:"wrong", fb:"Even the best antenna needed its artifacts ruled out." } ] }
      ] },
    // cell: Dr. Amara @ The Archive & Calibration Lab
    parallax:{ sci:"Friedrich Bessel (1784-1846)", topic:"Parallax & stellar distance", lede:"The astronomer who first measured the distance to a star and gave the cosmos a scale.",
      no:17,
      profile:"Friedrich Bessel was a German astronomer and mathematician who in 1838 achieved what had eluded observers since antiquity: the first reliable measurement of the distance to a star by trigonometric parallax. As the Earth orbits the Sun, a nearby star appears to shift slightly against the far more distant background stars; the size of that annual back-and-forth shift, viewed from opposite ends of Earth's orbit, gives the distance directly by geometry.\n\nThe effect is minute — even the nearest stars shift by less than an arcsecond — and detecting it demanded extraordinary instrumental precision and painstaking control of errors. Bessel chose 61 Cygni, a star with a large proper motion suggesting it was nearby, and using a superb heliometer measured its parallax at about a third of an arcsecond, placing it some 10 light-years away. For the first time humanity had a true, calibrated distance to another sun, confirming the stars were vastly far and validating the Copernican picture with direct evidence.\n\nBessel was a master of error analysis; the Bessel functions and other tools bear his name. His achievement rested not on a bigger telescope alone but on relentless calibration — accounting for refraction, instrument flexure, and systematic effects that could easily have produced a spurious shift.\n\nFor the Vasca review, parallax is the archetype of a measurement that is meaningless without impeccable calibration. A tiny systematic error can manufacture an apparent 'signal' — a shift, a periodicity, a distance — out of nothing, or hide a real one. This is precisely the danger lurking in the Vasca pipeline: a buried calibration artifact can masquerade as astrophysics. Bessel's lesson is that before trusting any extracted quantity, you must prove your instrument is not inventing it. Calibration is not bookkeeping; it is the difference between a discovery and a mirage.",
      frame:"Amara draws a thin triangle to a star. \"Bessel measured a third of an arcsecond and had to prove his instrument wasn't lying. Your pipeline has the same burden. Show me you understand parallax.\"",
      q:[
        { q:"How does trigonometric parallax measure a star's distance?", o:[
          { t:"From the star's tiny apparent shift as Earth orbits the Sun.", v:"expert", fb:"The annual angular shift gives distance by pure geometry." },
          { t:"From how quickly the star's brightness fades over many years.", v:"wrong", fb:"That's not parallax; parallax uses angular shift, not fading." },
          { t:"From the color of the star, which reddens steadily with distance.", v:"wrong", fb:"Color isn't a direct distance measure here; the shift is." },
          { t:"From a signal the star emits encoding its own true distance.", v:"danger", fb:"No emitted signal; distance comes from geometry alone." } ] },
        { q:"What made Bessel's measurement so difficult?", o:[
          { t:"The shift is under an arcsecond, demanding rigorous error control.", v:"expert", fb:"Tiny angles required impeccable calibration against systematics." },
          { t:"The star kept moving so fast it left the field of view each night.", v:"wrong", fb:"Proper motion helped him pick it; the challenge was the tiny angle." },
          { t:"He lacked any telescope capable of seeing the star at all.", v:"wrong", fb:"He could see it; measuring its minute shift precisely was the task." },
          { t:"The star's parallax changed unpredictably from one year to the next.", v:"wrong", fb:"Parallax is steady; the difficulty was its small size." } ] },
        { q:"What does parallax warn about the Vasca pipeline?", o:[
          { t:"A small systematic error can manufacture or hide a real signal.", v:"expert", fb:"Uncalibrated instruments invent mirages; calibration is decisive." },
          { t:"With a big enough dish, calibration errors no longer matter.", v:"danger", fb:"Aperture never excuses calibration; Bessel won by rigor." },
          { t:"Any measured periodicity is automatically a genuine astrophysical effect.", v:"wrong", fb:"An artifact can fake periodicity; that's the very risk." },
          { t:"Calibration is mere bookkeeping and never affects the conclusion.", v:"wrong", fb:"Calibration is the difference between discovery and mirage." } ] }
      ] },
    // cell: Dr. Amara @ The Archive & Calibration Lab
    supernovae:{ sci:"Fritz Zwicky (1898-1974)", topic:"Supernovae & neutron stars", lede:"The astronomer who named the exploding stars and predicted the collapsed cores they leave behind.",
      no:18,
      profile:"Fritz Zwicky was a Swiss-American astrophysicist at Caltech, famous for bold, prescient ideas and an abrasive style. In 1934, with Walter Baade, he coined the term 'supernova' for the rare, cataclysmic stellar explosions that briefly outshine an entire galaxy, distinguishing them from the far weaker ordinary novae. In the same remarkable work they proposed that a supernova marks the collapse of a massive star's core into an incredibly dense object made of neutrons — a neutron star — and even suggested supernovae as a source of cosmic rays.\n\nThis was decades ahead of its time. The neutron itself had only just been discovered, and neutron stars would not be observationally confirmed until Bell Burnell's pulsars in 1967. Zwicky organized systematic supernova searches and discovered a great many himself. He also, in 1933, inferred from the motions of galaxies in the Coma Cluster that they must contain far more mass than their light accounted for — an early argument for dark matter, later vindicated by Rubin's rotation curves.\n\nNeutron stars are the compact engines behind pulsars, magnetars, and many fast radio bursts. Zwicky's prediction thus reaches directly into the Vasca case: the natural transient most likely responsible for a repeating radio burst is a neutron star, probably a magnetar, exactly the collapsed remnant he foresaw.\n\nFor the Vasca review, Zwicky embodies bold hypothesis disciplined by physics. He proposed extraordinary things — but grounded in energetics and stellar structure, and framed so they could later be tested and confirmed. That is the model for the true middle path: a repeating burst is genuinely new and important, and its most physically grounded explanation is a natural, energetic remnant of stellar death, not a beacon. Zwicky's neutron star is, in effect, the answer the director should have reached before writing the press release.",
      frame:"\"Zwicky named the supernova and predicted the neutron star thirty years before anyone saw one,\" Amara says. \"Bold, but grounded in physics. Show me you know what he foresaw.\"",
      q:[
        { q:"What did Zwicky and Baade propose in 1934?", o:[
          { t:"Supernovae mark a massive core collapsing into a neutron star.", v:"expert", fb:"They coined 'supernova' and predicted the neutron-star remnant." },
          { t:"Supernovae are simply the brightest ordinary novae, nothing more.", v:"wrong", fb:"They explicitly distinguished supernovae from ordinary novae." },
          { t:"Supernovae are artificial detonations set off by an ancient culture.", v:"danger", fb:"They proposed a natural stellar collapse, not any artifice." },
          { t:"Supernovae leave behind nothing but an expanding cloud of cold gas.", v:"partial", fb:"They eject gas, but the key prediction was a dense neutron core." } ] },
        { q:"Why was the neutron-star prediction remarkable for its time?", o:[
          { t:"The neutron was newly found and such stars weren't confirmed until 1967.", v:"expert", fb:"It anticipated pulsars by decades, before evidence existed." },
          { t:"Neutron stars had already been photographed years earlier by others.", v:"wrong", fb:"They hadn't; confirmation waited for Bell Burnell's pulsars." },
          { t:"Everyone already accepted that dense collapsed stars must exist.", v:"wrong", fb:"It was a radical idea, far ahead of consensus." },
          { t:"It was based on a decoded signal received from a distant star.", v:"danger", fb:"It rested on physics of collapse, not any received signal." } ] },
        { q:"How does Zwicky's neutron star bear on the Vasca signal?", o:[
          { t:"A neutron star or magnetar is the grounded engine for such a burst.", v:"expert", fb:"The physically likeliest natural source — exactly the true answer." },
          { t:"It shows a repeating burst can only be an artificial beacon.", v:"danger", fb:"The opposite: a natural remnant readily powers such bursts." },
          { t:"It proves the Vasca signal must be a supernova now exploding nearby.", v:"wrong", fb:"The remnant, not a fresh explosion, is the likely engine." },
          { t:"It means the signal has to originate within our own Solar System.", v:"wrong", fb:"Neutron-star bursts are seen across the Galaxy and beyond." } ] }
      ] }
  },
  STORIES:{
    op:{
      dish:"Bo meets you on the dish platform at dusk, thermos in hand. \"This is my patch — I hear every plane, phone, and sparkplug for fifty miles. If your burst is up here in the feed, I'll know whether it's the sky or somebody's dashcam.\"",
      control:"Bo lingers uneasily at the back of the control room. \"They keep the screens down here, and the story they tell about them. I run the dish, not the software — but I've watched the director rehearse that 'first contact' line more than once.\"",
      archive:"Bo finds you among the calibration racks. \"I don't come to the archive much, but the old logs don't lie the way a press release does. Ask me what the night sheets actually said, before anyone tidied them.\""
    },
    eng:{
      dish:"The Pipeline Engineer climbs up to the feed with a laptop. \"The raw voltages start here, but nothing's 'data' until my code touches it. Whatever you think you saw at the dish, I can show you what happened to it after.\"",
      control:"The engineer swivels toward you at the reduction console, voice low. \"This is where it all runs — and where a calibration step got quietly changed. The burst is real. What the pipeline did to it afterward is the part nobody wants audited.\"",
      archive:"In the calibration lab the engineer pulls two versions of the same file. \"Here's the reduction before the tweak, and after. Learn to read the difference and you'll see exactly where the artifact crept in.\""
    },
    theo:{
      dish:"Dr. Amara joins you under the open dish, arms folded against the wind. \"I don't trust anything until the physics allows it. Up here it's just a receiver and the sky — tell me honestly what nature could put into that feed.\"",
      control:"Amara studies the control-room screens with visible distaste. \"A real burst, dressed up as a miracle. The signal deserves better than the director's story, and worse than being called a glitch. The truth is on these screens if you read them coldly.\"",
      archive:"Amara is at home among the archive's plots and old spectra. \"This is where claims go to be checked against everything we already know. Bring me the data and I'll tell you what nature can and cannot have done.\""
    }
  },
  story:[
    "High on <b>Vasca Ridge</b>, above the weather and the city lights, a radio dish has caught something that will not stop coming back: a burst of radio energy, repeating, from one fixed point on the sky. The graduate student who found it called it an anomaly. By the time it reached the director's desk it had a name in a press release — <b>an alien technosignature, first contact</b> — and the whole observatory is holding its breath. You are <b>Dr. Halley Renn</b>, sent quietly to review the claim before the world hears it.",
    "<b>Three people here will help you, each for their own reasons.</b> <b>Bo the Night Op</b> runs the dish overnight and can tell a star from a passing plane in his sleep. <b>The Pipeline Engineer</b> turns raw voltages into data and knows every step where a number can be bent. And <b>Dr. Amara</b>, a theoretical astrophysicist, knows exactly what nature can and cannot do — and is allergic to a story that outruns its evidence.",
    "<b>Someone here is behind the spin.</b> Three names sit in your notepad: <b>Director Okonkwo</b>, who wrote the headline; <b>Sela Voss</b>, the grad student who first saw the burst; and <b>Dr. Reyes</b>, the instrument scientist. Each column — <b>who</b> is driving it, <b>where</b> it culminates, <b>what</b> is truly happening — hides a tempting wrong answer. The director insists it is aliens. The cautious insist it is nothing but a glitch or stray interference. The truth is quieter than the first and realer than the second — and it is sitting in the data, waiting for someone to read it honestly.",
    "You have <b>8 days</b> and a single accusation. Get it right and a real discovery survives the hype intact; get it wrong and either a fantasy or a shrug buries a signal that mattered."
  ],
  endings:{ overclaimWhat:"aliens", dismissalWhat:"glitch",
    win:{
      expertTitle:"What the Signal Actually Says",
      expert:["Renn names it exactly: Director Okonkwo drove the spin; it culminates in the Control Room & Data Pipeline, where a buried calibration artifact was left to muddy the record; and the signal itself is a genuine new natural transient — a magnetar producing a repeating fast radio burst — real and important, but oversold as first contact. Not aliens. Not a glitch.",
        "Every card accounted for. Renn worked the dish, the pipeline, and the physics; she rejected the technosignature the director was selling and refused to wave the burst away as noise. She reports precisely what the dispersion sweep, the localization, and the magnetar engine support — a discovery worth having, told honestly."],
      soundTitle:"Right, and Fairly Supported",
      sound:["Renn names the right three — Okonkwo, the Control Room & Data Pipeline, and a natural transient oversold as aliens. The shape is correct: a real magnetar-class burst, spun into a headline, with an artifact in the reduction muddying the case.",
        "She left a few threads loose, and the calibration record will need firming before the paper is airtight. But she refused both the alien fantasy and the lazy glitch, and pointed the finger where the spin actually lives. A little more legwork and it would be unassailable."],
      namedTitle:"The Right Answer, Thinly Held",
      named:["Renn names the truth — Okonkwo, the Control Room & Data Pipeline, a natural transient sold as first contact — but gathered too few clues to back it. It reads like a hunch that happened to land.",
        "The review cannot rest on an accusation this thin, however correct. Being right about the magnetar is not the same as proving the artifact and the spin. Another few days at the pipeline would have turned the hunch into a case."]
    },
    overclaim:{ title:"The Director Who Cried First Contact",
      body:["Renn endorses the technosignature — first contact, the most extraordinary claim available — and the world runs with it.",
        "But nothing she gathered clears Sagan's bar: no localization to a sender, no signature that beats every natural and terrestrial alternative, and a dispersion sweep that screams distant plasma, not a beacon next door. When the magnetar explanation surfaces, the alien headline collapses and drags the real, provable discovery down with it. Director Okonkwo's overclaim doesn't just fail — it discredits a genuine new transient by burying it under a fantasy."] },
    dismissal:{ title:"The Shrug That Missed a Star",
      body:["Renn signs off that it was only a glitch — stray interference, a hardware hiccup, nothing real — and closes the file.",
        "She is half right that something in the pipeline was wrong: a buried calibration artifact really is muddying the data. But underneath it survives a repeating burst with a clean dispersion sweep and a plausible magnetar engine — a genuine natural transient. She cleaned the pigeons and threw out the cosmic background with them. The artifact was real; so was the star beneath it, and she missed it."] },
    wrongNames:{ title:"So Close",
      body:["Renn has the science cold — a genuine new natural transient, a magnetar-class repeating burst, real and important but oversold as an alien technosignature, with a calibration artifact muddying the pipeline. What she has misplaced is who drove the spin and where it truly culminates."] }
  },
}};
