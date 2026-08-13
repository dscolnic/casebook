// common-words.mjs — the ordinary English a morphology test keeps mistaking for
// jargon, and the stemming that decides the question.
//
// Two tools need the same answer to "would a general reader have to be taught
// this word?": `engine/dev/jargonSweep.mjs`, which uses it to keep its queue
// readable, and `tools/import-book.mjs`, which uses it to decide which glossary
// terms the syllabus actually claims. One list, one matcher, so they cannot
// drift apart and disagree about the same word.

// The closed class. None of these was ever in the list, because a candidacy test
// with a five-letter floor never had to ask about "the" — and the moment a tool
// looks at three-letter words to find "ion" and "pH", every one of them arrives
// dressed as jargon.
const FUNCTION_WORDS = `
a an the and or but nor for yet so if then than that this these those there here
is are was were be been being am do does did done has have had having will would
shall should can could may might must ought
i you he she it we they me him her us them my your his its our their mine yours
no not none nothing any some each every all both few many much more most other
another such own same very too also just only even still yet again once
in on at by to from with without within into onto out off over under above below
up down across through during before after until while since about against
between among around behind beside beyond near past per via upon toward towards
as of what which who whom whose when where why how whether because though although
one two three four five six seven eight nine ten first second third
`.trim().split(/\s+/);

// Irregular forms a suffix-stripper cannot reach from a word that is already in
// the list: written from write, gone from go, sat from sit.
const IRREGULAR = `
written wrote spoken spoke taken took given gave known knew shown showed seen saw
gone went done did made held kept left felt found told sold sent built lost meant
sat stood understood begun began drawn drew driven drove fallen fell flown flew
grown grew risen rose thrown threw worn wore chosen chose broken broke frozen froze
`.trim().split(/\s+/);

/** Lower-case, possessive dropped, hyphens closed up — the form both lists use. */
export const norm = (w) => String(w).toLowerCase().replace(/[’']s$/, '').replace(/-/g, '');

// Everyday English that trips a morphology test. Over-reporting is still the
// policy — a missed word ships and a culled one costs a glance — but there is a
// limit past which it stops being a policy: a queue holding "explosion",
// "permission" and "photographs" beside "surfactant" gets skimmed, and skimming
// is how the real words survive a sweep. Everything below is a word a general
// reader knows, collected from the queues of all seven games.
const COMMON = new Set(`
about above after again against almost already also always another answer anybody anything around arrive
because become before begin behind believe better between both bring building carefully certain change
chemical children choose close collect come complete condition confirm consider contain continue could
decide decision different direction doctor during each early eight either enough evening every everybody
everything evidence example expect explain family finally first follow forward from further give group
happen have here however important inside instead into keep know later leave letter little longer look
machine make many matter maybe measure meeting might minute moment money morning most mother move much
must name near need never nobody nothing notice number often once only order other outside people perhaps
person picture place point possible present pressure probably problem question quickly quiet rather reach
read ready really reason record remember report result right room same sample science second sentence
several should since small some something sometimes soon sound start still stone stop story student such
suddenly sure surface system take talk tell temperature than that their them then there these thing think
this those though three through time today together tomorrow tonight took town train travel trouble true
turn under until upon used usually very walk want watch water week well were what when where which while
white whole will with within without word work world would write year young your
account accurate action active actual addition additional adequate adjust adjustment advance advice affect
agree amount analysis analyse analyze appear apply approach approve approximate area arrange assume attempt
available average avoid balance become begin benefit better beyond brief broad build calculate care carry
cause central certain chance charge check choice claim clear collapse collect colour combine common compare
complete concern conclude confirm connect consider consist constant contact content context control convert
correct count cover create current decide decline decrease define degree deliver depend describe design
detail detect determine develop differ difficult direct discuss display distance divide double effect
effort element energy engine ensure enter entire equal escape establish estimate event exact exceed exchange
exist expand expect expense experience explain extend extra factor failure feature figure final finish
follow force forward frequent function future gather general generate handle happen height hold identify
image immediate impact improve include increase indicate individual industry inform initial inspect install
instance intend interest internal introduce involve issue judge justify labour large layer level likely
limit local locate machine maintain major manage manner mark material maximum mean measure medium mention
method minimum modern modify monitor multiple narrow nature nearby normal notice object observe obtain
occupy occur offer operate opinion option organise organize original outcome output overall parallel
particular pattern percent perform period permit physical plan position positive practical prepare present
prevent previous primary print priority process produce product programme progress project propose protect
prove provide public purchase purpose quantity range rapid reaction receive recognise recognize recommend
reduce refer reflect regard region regular reject relate release remain remove repair repeat replace
represent request require reserve resolve respond restore retain return reveal reverse review revise
routine safety satisfy scale schedule secure select sensible separate series serious service settle shape
share shift signal significant similar simple single site situation solid solution source special specific
spend stage standard state statement status steady storage store strong structure submit substance succeed
suggest supply support suppose surround survive suspect sustain switch target technical technique
temporary theory therefore threat total track transfer transport treat trend typical understand uniform
unique unit update urgent useful valid value variable various version visible volume warning weight widely
achieve achievable available candidate collision completion circulation aggressive beside brief
accident agent alongside ambient appreciable arithmetic arrival attention barrel building bulk cabinet
canopy capable ceiling channel chart circle city cleaning colourless column comparison compound
concentrate conclusion conditional confidence container continuous corner corridor council criteria
critical daily decorative delay department depth device discoloration document downstream drinking
detergent duration emergency employee entrance envelope equipment evening event exact excess exit expensive
experiment explanation explosion extent fence fire firefighter flooding fraction freight fresh gate
guidance handling hazard header health hospital household identification identity incident independent
industrial information injury inspection instrument insufficient intense interchangeable interpretation
interval isolate journey kitchen laboratory leadership library lighting limited loading meaningful
meeting neighbour neighbourhood network notice occupy office online operator opposite outdoor overnight
overshoot ownership package parking partner passage pathway patient pavement payment permanent permission
personnel photograph physical pipeline plan plant plate platform pollution population portion position
practice prediction prerequisite pressure prevention priority procedure programme property proportion
protection provisional public reading recharge reference regular relationship relevant reliable
requirement rescue residence resident residential resilience response responder restricted roadway
roughly routine safe safely schedule scientific season section sensible sensitive session settlement
severe shelter shift shipment shortage shutdown signature simple site situation specialist speed staff
station storage street structural summary supervisor supply suppression surrounding suspicion tank team
technician telephone thousand traffic transfer transport truck tunnel unusual utility vehicle village
violent visitor volunteer warehouse warning waste weather worker workplace yard
accumulate assign contaminate contaminant contamination destroy destruction distribute distribution
destructive electric electrical electricity encounter freshwater intensify label necessary negative reoccupy
reservoir sediment sufficient turbulent turbulence verify verification vulnerable
ability anyone assumption automatic baseline boundary classmate community compartment conduct confusion
deadline deliberate disagreement electronic environment evaluation everyone everywhere examine executive
imbalance instant instruction interruption invitation line maintenance mean merchant navigation
observation parent rate relative revolution sequence side simplify someone spine stencil struggle
surprise themselves underneath understood unattended ventilate ventilation visibility vision
activity certainty constrain handwashing lightheaded meant multiply playground rebuild
accelerate acceleration alternative archive authority autonomous calibrate calibration catalogue
challenge characterise coastline commission composition consequence consistent continent contribution
decelerate deceleration decisive defence defense demonstration density dependent dimension discover
displacement distortion enhancement evacuate evacuation fragment fragmentation geographic guarantee
gravity hemisphere international intervention mission motion observatory opportunity percentage
precision preliminary prepared preserve redistribute satellite spacecraft statistical successive
telescope threaten trajectory transparent wavelength
absorb absorption align alignment communicate communication preparedness repeatable repeatability
add adding bind binds cannot drop drops easy form forms gain gains light minus otherwise particle
raise raising rest side solid spread stick sticks thick thin tiny air beam dissolve edge
added behave behaviour behavior bound boat data desired deposit deposited else emitted fast fewer
gas gradual grow grows high incoming inputs inward listening making meets model moving new opposed
ordinary part probability root rule short size slow specified submarine sun test tightly using weapon
wrong body cell code cannot dose doing like nitrate sulfate salt salts insoluble mass dead
hydrogen helium carbon nitrogen oxygen sodium magnesium aluminium aluminum silicon phosphorus sulfur
sulphur chlorine chlorine potassium calcium iron copper zinc silver lead mercury uranium plutonium
absent abundant abundance accessible activate admission adherence agriculture appropriate argument
bedside bottleneck capacity catchment characterise citywide classification compatible compensate
compensation confirm contribute deteriorate deterioration diagnosis discharge disease disproportionate
diversity drive effective effectiveness efficiency enrol enrolment escalate expansion frequency
hospitalise hospitalisation impossible impression integrate interview investigate investigation
mechanical modification outlive parameter persistent potential prescribe prescription publicity
quantify redirect reduction representative resolution sedate standardise substitute successful
template unfamiliar wastewater whiteboard
acidity associate association case commit confirmatory degrade degradation demonstrate dioxide
inhibit inhibition medical biomedical microscope suppress
assemble assembly capability certificate circulate comparative component configuration contingency
converge coordinate correspond deployment difficulty disagree disappear disappoint distinguish division
efficient facility formality genuine government humanitarian hypothesis identical initiate initiation
intention interface interrupt intuition life manufacture measurable obligation petition possibility
purity recover reorganise repulsion scientist segment segregate silence stable stability symmetry
symmetrical temptation theoretical tolerance vary variation blackboard bookkeeping
accept acceptable background diagnostic hypotheses impurity instability lives measurably prompt
radiological saturate stabilise throughput unstable
affordable atmosphere atmospheric compress condensation consumable contradictory corruption descent
dissipate distant endurance geometry gradient improvise intermittent moderate orientation perpendicular
quality reconstruct refine reliability simulation subtract timeline timestamp transition transmit
accelerometer propel propulsion switchboard thermometer transmitter unambiguous vibration voltmeter
`.trim().split(/\s+/).concat(FUNCTION_WORDS, IRREGULAR).map(norm));

// A unit is notation, not vocabulary. "millimetres" is not a word the player has
// to be taught, and neither is the number in front of it.
const UNITS = new Set(`
metre meter centimetre centimeter millimetre millimeter kilometre kilometer micrometre micrometer
litre liter millilitre milliliter microlitre microliter gram kilogram milligram microgram tonne
joule kilojoule megajoule watt kilowatt kelvin celsius fahrenheit
pascal kilopascal hectare acre gallon
nanosecond microsecond millisecond
`.trim().split(/\s+/).map(norm));

const TECHY = /(?:tion|sion|ment|ance|ence|ity|ology|ography|ometry|meter|metre|ate|ide|ine|ase|osis|emia|itis|ivity|graph|scopy|lysis|genic|phile|phobic|valent|meric|ant|ent|ive|oid|yl)s?$/i;

/** Would a general reader have to be taught this word? Deliberately generous. */
// "calculated", "collisions", "constantly" and "controller" are the common word
// with an ending on it, and testing the surface form leaves all four in the queue.
const FORMS = [/e?d$/, /s$/, /es$/, /ing$/, /ly$/, /e?r$/, /ion$/, /ment$/, /ance$/, /ence$/, /able$/, /ive$/, /al$/];
// A prefix hides a common word the same way a suffix does: "uncontrolled" and
// "unmeasured" are "control" and "measure" wearing two affixes at once.
// "re" is not on the list: a chemistry queue is full of re- words that are real
// terms, and stripping it turns "reagent" into "agent" and "reactive" into
// "active" — two of the words this tool exists to find.
const PREFIXES = /^(?:un|non|over|under|mis|pre|post|sub|inter|multi|semi|self)/;
const known = (b) => b.length >= 4 && (COMMON.has(b) || UNITS.has(b) || COMMON.has(b + 'e') || UNITS.has(b + 'e'));
// One pass strips one ending, and English stacks them: "scientifically" is
// "scientific" under two, "controller" is "control" under an ending and the
// doubled consonant that carrying it needed.
const strip1 = (w) => [w.replace(/ies$/, 'y'), w.replace(/ied$/, 'y'), w.replace(/ily$/, 'y'), w.replace(/ation$/, ''),
  // Latin plurals, because a nuclear glossary is written in them: nuclei is
  // nucleus, spectra is spectrum, and a stemmer that only knows -s misses both.
  w.replace(/i$/, 'us'), w.replace(/a$/, 'um'), ...FORMS.map(f => w.replace(f, ''))]
  .flatMap(b => [b, b.replace(/([a-z])\1$/, '$1')]);
const stems = (w) => [w, ...strip1(w), ...strip1(w).flatMap(strip1)];
// -ize and -ise are the same word, and a list that carries only one spelling
// reports the other as jargon: "hospitalization", "characterize", "standardize".
const spellings = (w) => (/iz/.test(w) ? [w, w.replace(/iz/g, 'is')] : [w]);
const plain = (w) => spellings(w).some(v => COMMON.has(v) || UNITS.has(v) || stems(v).some(b => b !== v && known(b)));
const ordinary = (w) => plain(w)
  || (PREFIXES.test(w) && (() => { const b = w.replace(PREFIXES, ''); return b.length >= 4 && plain(b); })());

export { COMMON, UNITS, TECHY, FORMS, PREFIXES, stems, ordinary };
