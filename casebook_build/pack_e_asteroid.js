// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"e_asteroid", title:"The Hollow Vale Impact", discipline:"Planetary Defense & Impact Science",
  teaser:"A fireball flattened a valley without a moment's warning. A weapon fallen from orbit? A once-in-an-age freak of the heavens? Or a rock that was seen coming and quietly filed away?", overclaimTag:"a weapon from orbit", truthTag:"a downplayed impact detection",
  venue:"the Hollow Vale impact inquiry", agent:{name:"Investigator Neve Ostrander", role:"Investigator's Notepad"},
  standingLabel:"Inquiry credibility", readingShort:"Pioneers", readingLabel:"Planetary-Defense Pioneers",
  dossierName:"PLANETARY-DEFENSE PIONEERS", enterLabel:"Open the inquiry", subt:"A deduction game inside the Hollow Vale impact inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (a weapon from orbit) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"director", items:[
      {id:"director", label:"Sabine Verhoeven — sky-survey programme director"},
      {id:"astronomer", label:"The duty astronomer"},
      {id:"official", label:"The civil-defence official"} ]},
    where:{ title:"Where it culminates", truth:"office", items:[
      {id:"crater", label:"The Impact Crater & Fall Field"},
      {id:"observatory", label:"The Survey Observatory"},
      {id:"office", label:"The Survey Programme Office"} ]},
    what:{ title:"What is happening", truth:"downplayed", items:[
      {id:"weapon", label:"A weapon dropped from orbit"},
      {id:"freak", label:"A freak bolt from the blue — an act of God"},
      {id:"downplayed", label:"A downplayed detection & a defunded sky survey"} ]}
  },
  PLACES:{
    crater:{name:"The Impact Crater & Fall Field", xy:[140,90]},
    observatory:{name:"The Survey Observatory", xy:[330,240]},
    office:{name:"The Survey Programme Office", xy:[520,90]}
  },
  EDGES:[["crater","observatory"],["observatory","office"]],
  CHARACTERS:{
    observer:{ name:"Night Observer Kade", role:"Survey night observer", face:"🔭", badge:"K", legend:"the observatory", hint:"Ran the sky survey; the object was on the plates before it fell." },
    orbit:{ name:"The Orbit Analyst", role:"Orbit-computation analyst", face:"🛰", badge:"O", legend:"the data room", hint:"Ran the numbers; the collision course was flagged and then walked back." },
    clerk:{ name:"The Clerk", role:"Programme-office clerk", face:"🗂", badge:"C", legend:"the office", hint:"Keeps the survey logs — and the funding cut that blinded the sky watch." }
  },
  TOPICMAP:{
    crater:{ observer:["chladni","barringer"], orbit:["opik","kuiper"], clerk:["whipple","lalvarez"] },
    observatory:{ observer:["baldwin","gehrels"], orbit:["gshoemaker","cshoemaker"], clerk:["helin","marsden"] },
    office:{ observer:["walvarez","morrison"], orbit:["chapman","levy"], clerk:["aharris","hills"] }
  },
  TOPICS:{
    // cell: Night Observer Kade @ The Impact Crater & Fall Field
    chladni:{ sci:"Ernst Chladni (1756-1827)", topic:"Meteorites & their cosmic origin", lede:"", no:1, profile:"",
      frame:"", q:[] },
    // cell: Night Observer Kade @ The Impact Crater & Fall Field
    barringer:{ sci:"Daniel Barringer (1860-1929)", topic:"Meteor Crater & impact origin", lede:"", no:2, profile:"",
      frame:"", q:[] },
    // cell: The Orbit Analyst @ The Impact Crater & Fall Field
    opik:{ sci:"Ernst Öpik (1893-1985)", topic:"Near-Earth asteroids & meteors", lede:"", no:3, profile:"",
      frame:"", q:[] },
    // cell: The Orbit Analyst @ The Impact Crater & Fall Field
    kuiper:{ sci:"Gerard Kuiper (1905-1973)", topic:"The small bodies of the solar system", lede:"", no:4, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Impact Crater & Fall Field
    whipple:{ sci:"Fred Whipple (1906-2004)", topic:"Comets & the dirty snowball", lede:"", no:5, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Impact Crater & Fall Field
    lalvarez:{ sci:"Luis Alvarez (1911-1988)", topic:"The impact & the mass extinction", lede:"", no:6, profile:"",
      frame:"", q:[] },
    // cell: Night Observer Kade @ The Survey Observatory
    baldwin:{ sci:"Ralph Baldwin (1912-2010)", topic:"Craters as impact scars", lede:"", no:7, profile:"",
      frame:"", q:[] },
    // cell: Night Observer Kade @ The Survey Observatory
    gehrels:{ sci:"Tom Gehrels (1925-2011)", topic:"The Spacewatch survey for asteroids", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: The Orbit Analyst @ The Survey Observatory
    gshoemaker:{ sci:"Eugene Shoemaker (1928-1997)", topic:"Impact cratering & astrogeology", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: The Orbit Analyst @ The Survey Observatory
    cshoemaker:{ sci:"Carolyn Shoemaker (1929-2021)", topic:"Discovering comets & asteroids", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Survey Observatory
    helin:{ sci:"Eleanor Helin (1932-2009)", topic:"Near-Earth asteroid surveys", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Survey Observatory
    marsden:{ sci:"Brian Marsden (1937-2010)", topic:"Orbits & the Minor Planet Center", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: Night Observer Kade @ The Survey Programme Office
    walvarez:{ sci:"Walter Alvarez (b. 1940)", topic:"The iridium layer & the impact hypothesis", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: Night Observer Kade @ The Survey Programme Office
    morrison:{ sci:"David Morrison (b. 1940)", topic:"The impact hazard & the Spaceguard survey", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: The Orbit Analyst @ The Survey Programme Office
    chapman:{ sci:"Clark Chapman (planetary scientist)", topic:"Assessing the asteroid hazard", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: The Orbit Analyst @ The Survey Programme Office
    levy:{ sci:"David Levy (b. 1948)", topic:"Comet discovery & Shoemaker-Levy 9", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Survey Programme Office
    aharris:{ sci:"Alan Harris (asteroid astronomer)", topic:"Asteroid sizes & impact risk", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Survey Programme Office
    hills:{ sci:"Jack Hills (astrophysicist)", topic:"Impact tsunami & the asteroid threat", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    observer:{ crater:"", observatory:"", office:"" },
    orbit:{ crater:"", observatory:"", office:"" },
    clerk:{ crater:"", observatory:"", office:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"weapon", dismissalWhat:"freak",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};