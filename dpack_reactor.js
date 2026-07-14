// Diagnosis data pack — Nuclear reactor. See DIAGNOSIS_SPEC.md.
// Difficulty is DERIVED from the signatures (salient = the loud readings).
//   R1 heatsink  = L1 naked single (pressure RISING is unique)
//   R2 overcool  = L2 one clear line (pressure down + level HOLDING — needs both loud readings)
//   R3 loca      = L3 loud gauges tie (leak vs shrink both drop pressure & level)
module.exports = { PACK: {
  id:'reactor', title:'Meltdown Watch', domain:'Nuclear reactor operations',
  role:'You are the operator on watch.',

  system:{
    parts:[
      ['Core → primary loop','Uranium fission heats water in a sealed, high-pressure loop that never leaves containment.'],
      ['Pressurizer',"Holds that loop's pressure; its level shows how much water is in the loop."],
      ['Steam generators','The hot primary water boils a separate supply of water into steam for the turbine — the two never mix, unless a tube leaks.'],
      ['Containment & sump','A sealed building around the primary side; a leak pools on the floor (the sump) and shows up as radiation inside.'],
      ['Trip (scram)','Rods drop and fission stops at once — but the fuel keeps pouring out decay heat for days, so heat must still leave through the steam generators.']
    ],
    soWrong:'So when an alarm sounds, only a few things can truly be wrong: the loop is losing coolant, the loop is being over-cooled, or the heat has nowhere to go. The gauges are how you tell which.'
  },

  // "loud" readings — the ones an operator notices first (the alarm gauges)
  salient:['rcs','przr'],

  readings:{
    rcs:{ name:'RCS pressure', pin:{x:205,y:270}, zone:'primary',
      purpose:"Pressure in the coolant loop (~2,235 psia). Falls if coolant leaks OR the loop is over-cooled; rises if heat can't escape." },
    przr:{ name:'Pressurizer level', pin:{x:236,y:200}, zone:'primary',
      purpose:"How much water is in the loop (~55%). Falls only when inventory is actually being lost." },
    coretemp:{ name:'Core exit temperature', pin:{x:140,y:258}, zone:'primary',
      purpose:"Rises if heat is trapped; falls if the loop is over-cooled; should ease gently after a trip." },
    crad:{ name:'Containment radiation', pin:{x:290,y:120}, zone:'containment',
      purpose:"Radiation inside the containment building — rises if coolant leaks INTO containment." },
    sump:{ name:'Containment sump', pin:{x:200,y:442}, zone:'containment',
      purpose:"Water on the containment floor — pools if coolant leaks into the building; stays dry if the loop is merely contracting." },
    sg:{ name:'Steam generator level', pin:{x:363,y:275}, zone:'secondary',
      purpose:"The boilers that carry heat away. Boil dry if cooling is lost; run high under heavy steam demand." },
    srad:{ name:'Secondary-side radiation', pin:{x:452,y:175}, zone:'secondary',
      purpose:"Radiation on the STEAM side — rises only if primary water leaks through a tube into a steam generator." },
    redun:{ name:'Redundant pressure channel', pin:{x:323,y:120}, zone:'containment',
      purpose:"A second, independent pressure gauge — confirms the main readings are honest." }
  },

  hypotheses:{
    heatsink:{ label:'Lost heat sink',
      call:{ title:'Lost heat sink — restore cooling.', arg:'No leak — the steam generators are dry and the core is heating. Restore feedwater.' },
      sig:{ rcs:'up', przr:'normal', coretemp:'up', crad:'normal', sump:'dry', sg:'dry', srad:'normal', redun:'agree' } },
    overcool:{ label:'Overcooling',
      call:{ title:'Overcooling — cut the excess steam demand.', arg:'Something is pulling too much heat out. Rebalance before the loop over-cools.' },
      sig:{ rcs:'down', przr:'normal', coretemp:'down', crad:'normal', sump:'dry', sg:'high', srad:'normal', redun:'agree' } },
    loca:{ label:'Loss-of-coolant accident',
      call:{ title:'Loss-of-coolant accident — inject and isolate.', arg:'Coolant is leaking into containment. Inject before the core uncovers.' },
      sig:{ rcs:'down', przr:'down', coretemp:'up', crad:'up', sump:'rise', sg:'normal', srad:'normal', redun:'agree' } },
    shrink:{ label:'Normal transient',
      call:{ title:'Normal post-trip transient — monitor.', arg:'Expected contraction after a trip. Hold actions and keep watching.' },
      sig:{ rcs:'down', przr:'down', coretemp:'settling', crad:'normal', sump:'dry', sg:'normal', srad:'normal', redun:'agree' } }
  },
  dismissal:'shrink',
  reassuring:{ lab:'Reactor status', val:'SCRAMMED — rods in',
    note:'Fission is stopped. But a freshly-shut core still pours out decay heat that must be removed.' },

  rounds:[
    { answer:'heatsink', alarm:'coretemp',
      poleA:{ lab:'Core temperature', val:'Rising', note:'Climbing after the trip instead of easing off, and pressure is creeping up with it.' },
      hook:'Two minutes after an automatic trip. Rods are in, but the board is trending the wrong way.',
      riddle:'The core is shut down — <span class="q">so why is it heating up, not cooling?</span>',
      vals:{ rcs:'2,410 psia, RISING', przr:'58%, steady', coretemp:'climbing steadily', crad:'normal', sump:'dry', sg:'both boiling dry', srad:'normal', redun:'channels agree' },
      reasons:{
        loca:'A leak drops pressure and fills the sump. Pressure is RISING and the sump is dry — nothing is leaving the loop.',
        overcool:'Over-cooling drives pressure and temperature DOWN. Both are rising — heat is trapped, not being over-removed.',
        shrink:'After a trip the core should cool. Rising temperature with the steam generators boiled dry is a lost heat sink, not settling.' },
      resolve:{ title:'Lost heat sink — decay heat with nowhere to go.',
        paras:[
          'Pressure is rising, not falling, and the steam generators have boiled dry — so decay heat has no way out and the temperature climbs. There is no leak: the sump is dry and nothing is radioactive. Restore feedwater.',
          'The easy one: the loud gauges gave it away. <b>Pressure rising</b> is unique to this failure — every other cause here drops the pressure. One reading names it.' ],
        why:{ loud:'<b>Why the loud reading was enough</b>: only trapped heat raises pressure; every leak lowers it.',
              quiet:'<b>Why not a leak</b>: the sump is dry and nothing is radioactive.' },
        chain:['Feedwater / heat sink lost','Decay heat trapped','Pressure and temperature climb'],
        take:'A naked single: one loud gauge (pressure rising) is unique to this cause and names it alone.' } },

    { answer:'overcool', alarm:'rcs',
      poleA:{ lab:'Coolant system', val:'Pressure falling fast', note:'RCS pressure dropping quickly — faster than an ordinary post-trip settle.' },
      hook:'A different trip. Pressure is sliding down quickly, and the crew is reaching for the leak procedures.',
      riddle:'Pressure is dropping fast. <span class="q">Is the loop leaking — or is something pulling too much heat out?</span>',
      vals:{ rcs:'1,720 psia, falling fast', przr:'55%, holding', coretemp:'dropping', crad:'normal', sump:'dry', sg:'levels high, heavy steam demand', srad:'normal', redun:'channels agree' },
      reasons:{
        loca:'A leak drains the loop — the pressurizer level would fall and the sump fill. Level is HOLDING and the sump is dry. No inventory is leaving.',
        heatsink:'A lost heat sink drives pressure and temperature UP. Both are falling — the core is being over-cooled, not starved of cooling.',
        shrink:'Ordinary shrink is gentle and settles. Pressure is dropping fast with heavy steam demand — something is actively over-cooling the primary.' },
      resolve:{ title:'Overcooling — too much heat being removed.',
        paras:[
          'Pressure and temperature are both falling fast, but the pressurizer level is holding and nothing is radioactive — no coolant is leaving the loop. Something on the steam side is removing heat too aggressively (a stuck-open steam valve or runaway feedwater). Isolate the excess steam demand.',
          'One clear line settled it: the pressurizer <b>level</b>. Falling pressure alone could be a leak — but a leak drains the loop and the level sags. The level is steady, so the inventory is intact; this is heat loss, not coolant loss.' ],
        why:{ loud:'<b>Why not a leak</b>: the level is holding — nothing is draining out of the loop.',
              quiet:'<b>Why not lost cooling</b>: pressure and temperature are falling, the opposite of heat with nowhere to go.' },
        chain:['Excess steam demand','Primary over-cooled','Pressure & temperature fall — inventory intact'],
        take:'One clear reading — the level holding — separates losing heat from losing coolant.' } },

    { answer:'loca', alarm:'rcs',
      poleA:{ lab:'Coolant system', val:'Pressure & level falling', note:'Both sliding down together — exactly the look of the loop emptying. But a cooldown does that too.' },
      hook:'A third trip. Pressure and level are falling together — the picture of a loop losing water. A normal cooldown looks the same.',
      riddle:'Pressure and level are both falling. <span class="q">A real leak — or just the loop contracting as it cools?</span>',
      vals:{ rcs:'1,650 psia, falling', przr:'22%, falling', coretemp:'rising toward saturation', crad:'elevated', sump:'rising', sg:'normal', srad:'normal', redun:'channels agree' },
      reasons:{
        shrink:'Post-trip shrink looks identical up top — pressure and level fall as the water cools and contracts. But shrink is DRY and settles. Here the sump is filling and containment radiation is up — coolant is physically leaving the loop.',
        overcool:'Over-cooling holds the level (no inventory lost). Level is falling and the sump is filling — the loop is actually losing water.',
        heatsink:'A lost heat sink drives pressure UP. Pressure is falling and water is pooling in containment — this is a leak.' },
      resolve:{ title:'Loss-of-coolant accident — a real leak into containment.',
        paras:[
          'Pressure and level are falling and water is pooling in the containment sump, with containment radiation up — coolant is escaping the loop into the building. Inject and isolate before the fuel uncovers.',
          'This is the deep one. On the loud gauges — pressure and level — a real leak and an ordinary post-trip contraction look <b>identical</b>; both fall. Matching the headline gets you nowhere. You had to look at the quiet readings and ask: is coolant actually <i>leaving</i>? The rising sump and the containment radiation answer yes. This is the reading Three Mile Island crews talked themselves out of.' ],
        why:{ loud:"<b>Why the loud gauges couldn't decide</b>: a leak and normal shrink both drop pressure and level.",
              quiet:'<b>Why a leak, not shrink</b>: the sump is filling and containment is radioactive — contraction leaves both dry and clean.' },
        chain:['Pressure & level fall — inventory dropping','Sump fills, containment radioactive','Coolant is leaving the loop — a real leak'],
        take:'When the loud gauges tie (leak vs shrink both fall), the answer lives in the quiet readings: is water actually leaving?' } }
  ],

  schematic:{ viewBox:'0 0 520 470', svg:`
 <path class="zone" d="M46,436 L46,202 Q46,78 236,78 Q426,78 426,202 L426,436" stroke="#4a6f86"/>
 <text x="120" y="98" class="eqlbl" text-anchor="middle" style="fill:#5a7f96">CONTAINMENT</text>
 <text x="452" y="205" class="eqlbl" text-anchor="middle" style="fill:#7e6b3f">STEAM SIDE</text>
 <line x1="40" y1="430" x2="430" y2="430" stroke="#385b70" stroke-width="2"/>
 <path d="M120,430 L150,452 L250,452 L280,430 Z" fill="rgba(112,201,242,.10)" stroke="#385b70" stroke-width="1.5"/><text x="200" y="465" class="lbl" text-anchor="middle">sump</text>
 <rect x="105" y="250" width="70" height="150" rx="30" fill="#173e59" stroke="#70c9f2" stroke-width="2"/>
 <rect x="120" y="300" width="40" height="70" fill="none" stroke="#efca72" stroke-width="2"/>
 <line x1="127" y1="305" x2="127" y2="365" stroke="#efca72" stroke-width="2"/><line x1="140" y1="305" x2="140" y2="365" stroke="#efca72" stroke-width="2"/><line x1="153" y1="305" x2="153" y2="365" stroke="#efca72" stroke-width="2"/>
 <text x="140" y="416" class="lbl" text-anchor="middle">reactor core</text>
 <rect x="215" y="150" width="42" height="120" rx="16" fill="#173e59" stroke="#70c9f2" stroke-width="2"/><text x="236" y="285" class="lbl" text-anchor="middle">pressurizer</text>
 <rect x="330" y="140" width="66" height="270" rx="26" fill="#173e59" stroke="#70c9f2" stroke-width="2"/><text x="363" y="426" class="lbl" text-anchor="middle">steam generator</text>
 <path d="M175,270 H236 V150 M236,175 H363 V140" fill="none" stroke="#70c9f2" stroke-width="4" opacity=".8"/>
 <path d="M363,410 H300 Q270,410 270,388 H210 Q185,388 185,400" fill="none" stroke="#2e77a4" stroke-width="4" opacity=".8"/>
 <text x="312" y="102" class="lbl" text-anchor="middle">rad monitors</text>
 <path d="M396,175 H470 V150" fill="none" stroke="#efca72" stroke-width="3" stroke-dasharray="5 4"/>
 <path d="M455,150 l35,-14 v28 z" fill="#173e59" stroke="#efca72" stroke-width="1.5"/><circle cx="500" cy="150" r="12" fill="#173e59" stroke="#efca72" stroke-width="1.5"/><text x="478" y="192" class="lbl" text-anchor="middle">turbine</text>` }
}};
