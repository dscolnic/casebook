// Diagnosis data pack — Chemical plant reactor.
// Difficulty is DERIVED from the signatures (salient = the loud readings).
//   R1 runaway      = L1 naked single (rapid pressure rise is unique)
//   R2 coolloss     = L2 one clear line (normal pressure + rapid temperature rise — needs both loud readings)
//   R3 sensorfault  = L3 loud gauges tie (sensor fault vs benign feed transient share the loud pair)
module.exports = { PACK: {
  id:'chemical', title:'Reactor Watch', domain:'Chemical plant reactor operations',
  role:'You are the board operator for an exothermic batch reactor.',

  system:{
    parts:[
      ['Jacketed reactor','A stirred vessel carries out an exothermic liquid-phase reaction. Cooling water in the jacket removes the reaction heat.'],
      ['Feed system','Reactant enters under a controlled recipe. A larger feed rate can briefly raise heat release even when the process remains safe.'],
      ['Temperature instruments','Two separate thermowells measure the batch. Agreement means the temperature change is real; disagreement points to one bad channel.'],
      ['Pressure and vent system','A nitrogen blanket normally holds the vessel near 2.0 barg. Boiling or rapid gas generation drives pressure upward and loads the vent condenser.'],
      ['Cooling-water circuit','Flow, inlet temperature, and outlet temperature show whether the jacket is carrying heat away. A stopped pump or closed valve cuts flow; a real exotherm warms the return water.']
    ],
    soWrong:'So a high temperature reading can mean a runaway reaction, failed cooling, an ordinary recipe transient, or simply a lying sensor. The pressure and heat-removal readings reveal which physical story is actually happening.'
  },

  salient:['pressure','temp1'],

  readings:{
    pressure:{ name:'Reactor pressure', pin:{x:246,y:92}, zone:'vessel',
      purpose:'Vessel pressure, normally about 2.0 barg under nitrogen. A rapid rise means boiling or fast gas generation; cooling loss or a modest feed transient can initially leave pressure near normal.' },
    temp1:{ name:'Primary reactor temperature', pin:{x:198,y:190}, zone:'vessel',
      purpose:'Main batch temperature, normally 82–84°C at this recipe stage. A fast rise can come from lost cooling or accelerating reaction; a modest rise can be a normal feed response or a biased sensor.' },
    temp2:{ name:'Independent thermowell', pin:{x:286,y:190}, zone:'vessel',
      purpose:'A separately wired temperature element in another thermowell. It should track a real batch-temperature change; a large split means one channel is faulty.' },
    jacketflow:{ name:'Jacket cooling-water flow', pin:{x:102,y:255}, zone:'cooling',
      purpose:'Cooling-water flow through the reactor jacket, normally 420–460 L/min. Near-zero flow means the heat sink has been lost.' },
    jacketout:{ name:'Jacket outlet temperature', pin:{x:118,y:332}, zone:'cooling',
      purpose:'Cooling-water return temperature, normally 30–36°C. It rises when real process heat reaches the jacket; it stays near inlet temperature when the reactor is not actually hotter.' },
    ventload:{ name:'Vent-condenser load', pin:{x:390,y:100}, zone:'vent',
      purpose:'Condensate rate from vapor leaving the reactor. A sharp increase supports boiling or strong vapor generation during a runaway.' },
    feed:{ name:'Reactant feed rate', pin:{x:390,y:250}, zone:'feed',
      purpose:'Recipe feed rate, normally 75 kg/min here. A scheduled step upward can cause a small, temporary temperature rise without loss of control.' },
    conversion:{ name:'Residual reactant', pin:{x:385,y:330}, zone:'lab',
      purpose:'Fast analyzer estimate of unreacted monomer. Falling rapidly means reaction rate is accelerating; a steady value argues against a true thermal event.' }
  },

  hypotheses:{
    runaway:{ label:'Runaway reaction',
      call:{ title:'Runaway reaction — stop feed and quench.', arg:'Reaction rate is accelerating, vapor is forming, and pressure is climbing. Initiate the emergency shutdown and quench sequence.' },
      sig:{ pressure:'rapid-rise', temp1:'rapid-rise', temp2:'rapid-rise', jacketflow:'normal', jacketout:'hot', ventload:'high', feed:'normal', conversion:'falling-fast' } },
    coolloss:{ label:'Cooling-system loss',
      call:{ title:'Cooling loss — restore the heat sink.', arg:'The reaction is still generating heat, but jacket flow has collapsed. Stop feed and restore emergency cooling before the batch runs away.' },
      sig:{ pressure:'normal', temp1:'rapid-rise', temp2:'rapid-rise', jacketflow:'low', jacketout:'cool', ventload:'normal', feed:'normal', conversion:'falling' } },
    sensorfault:{ label:'Primary temperature sensor fault',
      call:{ title:'Temperature channel fault — transfer control to the healthy sensor.', arg:'The primary indication is biased high while the second thermowell and heat balance remain normal. Remove the bad channel from control.' },
      sig:{ pressure:'normal', temp1:'modest-rise', temp2:'normal', jacketflow:'normal', jacketout:'normal', ventload:'normal', feed:'normal', conversion:'steady' } },
    feedtransient:{ label:'Normal feed-step transient',
      call:{ title:'Expected feed transient — monitor.', arg:'The scheduled feed increase caused a small real temperature response. Cooling is carrying the extra heat and the batch remains controlled.' },
      sig:{ pressure:'normal', temp1:'modest-rise', temp2:'modest-rise', jacketflow:'normal', jacketout:'warm', ventload:'normal', feed:'high', conversion:'falling' } }
  },
  dismissal:'feedtransient',
  reassuring:{ lab:'Emergency shutdown system', val:'ARMED — no trip demand',
    note:'The protection system is available, but it may not trip until temperature or pressure crosses its setpoint. A developing problem can still be real.' },

  rounds:[
    { answer:'runaway', alarm:'pressure',
      poleA:{ lab:'Reactor pressure', val:'Rising 0.35 bar/min', note:'Pressure is climbing with temperature even though jacket flow is still present.' },
      hook:'Twenty minutes into the batch, the temperature turns sharply upward. Seconds later the vessel pressure begins climbing and the vent condenser comes alive.',
      riddle:'Cooling water is still flowing — <span class="q">so why are both temperature and pressure accelerating together?</span>',
      vals:{ pressure:'2.0 to 3.4 barg in 4 minutes', temp1:'84°C to 101°C, rising rapidly', temp2:'100°C, rising rapidly', jacketflow:'438 L/min', jacketout:'58°C and climbing', ventload:'1,250 kg/h condensate', feed:'74 kg/min', conversion:'residual monomer falling 9% per minute' },
      reasons:{
        coolloss:'Cooling loss can make temperature rise, but it does not fit 438 L/min of jacket flow, a hot jacket return, and the unique rapid pressure rise from boiling or gas generation.',
        sensorfault:'A bad primary sensor cannot make the independent thermowell read 100°C, heat the jacket return to 58°C, or drive pressure from 2.0 to 3.4 barg.',
        feedtransient:'A normal feed step gives only a modest, controlled temperature response. Here feed is unchanged while temperature, pressure, vapor load, and conversion rate all accelerate.' },
      resolve:{ title:'Runaway reaction — heat generation is outrunning removal.',
        paras:[
          'Both thermowells are rising rapidly, the jacket return is hot, residual reactant is disappearing faster, and vapor production is driving pressure upward. Cooling still exists, but the reaction rate has increased beyond the jacket’s capacity. Stop feed, initiate quench, and depressurize through the designed emergency path.',
          'This is a naked single. Among these four causes, only the runaway produces a rapid pressure rise on the loud panel. One glance at that gauge distinguishes accelerating reaction from cooling loss, a feed transient, or a sensor problem.' ],
        why:{ loud:'<b>Why the loud reading was enough</b>: rapid pressure rise is unique to boiling or fast gas generation during the runaway.',
              quiet:'<b>Why the armed shutdown system misleads</b>: protection can remain below its trip setpoint while the process is already accelerating dangerously.' },
        chain:['Reaction rate accelerates','Heat and vapor generation exceed removal','Temperature and pressure rise together'],
        take:'When pressure joins a temperature rise, the problem is no longer just heat removal; the reaction itself may be accelerating.' } },

    { answer:'coolloss', alarm:'temp1',
      poleA:{ lab:'Batch temperature', val:'Rising 3.5°C/min', note:'Both thermowells are climbing while vessel pressure remains near its nitrogen-blanket setpoint.' },
      hook:'A few minutes after a valve lineup change, the batch temperature begins rising quickly. Pressure remains calm, which tempts the crew to wait.',
      riddle:'The vessel is not pressurizing — <span class="q">is the reaction accelerating, or has its heat sink quietly disappeared?</span>',
      vals:{ pressure:'2.1 barg, steady', temp1:'84°C to 95°C in 3 minutes', temp2:'94.6°C, rising', jacketflow:'18 L/min', jacketout:'31°C, near inlet temperature', ventload:'normal background condensate', feed:'75 kg/min', conversion:'residual monomer falling at expected rate' },
      reasons:{
        runaway:'A runaway can raise temperature, but the loud pattern here lacks its rapid pressure rise. Conversion is not accelerating and the vent condenser remains at background load.',
        sensorfault:'A bad primary channel would not make the independent thermowell rise to 94.6°C. The temperature increase is real, and jacket flow has collapsed to 18 L/min.',
        feedtransient:'A benign feed response requires the scheduled higher feed and a warming jacket return as extra heat is removed. Feed is unchanged and almost no cooling water is moving.' },
      resolve:{ title:'Cooling-system loss — the reactor has lost its heat sink.',
        paras:[
          'Both temperature elements confirm a real, rapid rise, but pressure, conversion rate, and vapor load remain near normal. The decisive process evidence is the jacket: flow has fallen from its normal 420–460 L/min range to 18 L/min, and the return stays cool because almost no water is carrying heat away. Stop feed and restore emergency cooling.',
          'This is one clear line across the loud readings. Normal pressure is shared with the sensor fault and feed transient, while rapid temperature rise is shared with the runaway. Only the pair — pressure normal, temperature rising rapidly — isolates cooling loss.' ],
        why:{ loud:'<b>Why both loud readings are needed</b>: temperature alone cannot separate lost cooling from runaway, and normal pressure alone cannot separate it from benign or instrument explanations.',
              quiet:'<b>Why the jacket settles it</b>: near-zero cooling flow directly identifies the missing heat-removal path.' },
        chain:['Cooling valve or pump removes jacket flow','Reaction heat is no longer carried away','Batch temperature rises before pressure responds'],
        take:'A quiet pressure gauge does not make a fast temperature rise safe; verify whether the heat-removal path still exists.' } },

    { answer:'sensorfault', alarm:'temp1',
      poleA:{ lab:'Primary temperature', val:'Drifting upward', note:'The control-room channel has climbed six degrees, but the process otherwise looks uneventful.' },
      hook:'Near the end of a stable batch, the primary temperature display slowly rises above its expected plateau. No other headline alarm appears.',
      riddle:'A modest temperature rise could be routine — <span class="q">but did the batch actually warm, or did only one thermowell say it did?</span>',
      vals:{ pressure:'2.0 barg, steady', temp1:'84°C to 90°C over 8 minutes', temp2:'83.8°C, steady', jacketflow:'446 L/min', jacketout:'34°C, steady', ventload:'normal background condensate', feed:'75 kg/min, no scheduled step', conversion:'residual monomer steady within analyzer noise' },
      reasons:{
        feedtransient:'A normal feed-step transient shares the loud pattern: normal pressure and a modest temperature rise. But no feed step occurred, the second thermowell stayed at 83.8°C, and the jacket return did not warm. The process itself did not heat.',
        runaway:'A runaway would make both temperature elements climb, heat the jacket return, accelerate conversion, and eventually raise pressure. None of those independent effects appears.',
        coolloss:'Cooling loss would produce a real rise on both thermowells and low jacket flow. Flow is healthy at 446 L/min and the independent temperature remains steady.' },
      resolve:{ title:'Primary temperature sensor fault — the process is stable, but one channel is biased high.',
        paras:[
          'Only the primary channel rises. The independent thermowell remains at 83.8°C, cooling-water flow and outlet temperature are steady, pressure is unchanged, and the analyzer sees no acceleration. Transfer control to the healthy channel and remove the biased sensor from service.',
          'This is where the loud gauges tie. A sensor fault and a benign feed transient both present normal pressure with a modest temperature rise. The deeper question is real versus artifact: did heat appear anywhere else in the system? The second thermowell and jacket heat balance say no.' ],
        why:{ loud:'<b>Why the loud gauges cannot decide</b>: both a routine feed response and a biased sensor can show normal pressure with one modestly rising temperature display.',
              quiet:'<b>Why this is an artifact</b>: no independent temperature, cooling-water, pressure, or reaction-rate measurement confirms added heat.' },
        chain:['Primary temperature element drifts high','Control-room display reports warming without process heat','Independent thermowell and heat balance expose the bad channel'],
        take:'A real thermal event must leave a heat signature somewhere else; when it does not, challenge the instrument.' } }
  ],

  schematic:{ viewBox:'0 0 520 390', svg:`
  <text x="110" y="28" class="eqlbl" text-anchor="middle" style="fill:#5a7f96">COOLING</text>
  <text x="250" y="28" class="eqlbl" text-anchor="middle" style="fill:#5a7f96">REACTOR</text>
  <text x="410" y="28" class="eqlbl" text-anchor="middle" style="fill:#5a7f96">FEED / VENT</text>
  <rect x="175" y="65" width="150" height="245" rx="45" fill="#173e59" stroke="#70c9f2" stroke-width="2"/>
  <path d="M190,125 H310 M190,245 H310" stroke="#70c9f2" stroke-width="2" opacity=".65"/>
  <path d="M250,75 V275" stroke="#efca72" stroke-width="4"/><path d="M220,215 H280 M225,230 H275" stroke="#efca72" stroke-width="4"/>
  <text x="250" y="335" class="lbl" text-anchor="middle">stirred batch reactor</text>
  <path d="M82,120 H150 Q168,120 175,140 M175,255 Q160,275 135,275 H82" fill="none" stroke="#2e77a4" stroke-width="5"/>
  <path d="M82,275 V120" fill="none" stroke="#2e77a4" stroke-width="5"/>
  <text x="110" y="305" class="lbl" text-anchor="middle">cooling-water jacket</text>
  <path d="M390,70 V125 H325" fill="none" stroke="#efca72" stroke-width="4"/><path d="M376,70 H404 L390,50 Z" fill="#173e59" stroke="#efca72" stroke-width="2"/>
  <text x="410" y="150" class="lbl" text-anchor="middle">reactant feed</text>
  <path d="M275,65 V42 H395 V85" fill="none" stroke="#70c9f2" stroke-width="4"/>
  <rect x="370" y="85" width="50" height="65" rx="12" fill="#173e59" stroke="#70c9f2" stroke-width="2"/>
  <text x="395" y="170" class="lbl" text-anchor="middle">vent condenser</text>
  <rect x="355" y="250" width="105" height="65" rx="12" fill="rgba(112,201,242,.06)" stroke="#385b70" stroke-width="1.5"/>
  <text x="408" y="278" class="lbl" text-anchor="middle">fast analyzer</text>
  <text x="408" y="296" class="lbl" text-anchor="middle">residual reactant</text>
  <line x1="198" y1="190" x2="225" y2="190" stroke="#efca72" stroke-width="2"/>
  <line x1="286" y1="190" x2="275" y2="190" stroke="#efca72" stroke-width="2"/>
  <line x1="246" y1="92" x2="246" y2="70" stroke="#efca72" stroke-width="2"/>
  <line x1="102" y1="255" x2="82" y2="255" stroke="#efca72" stroke-width="2"/>
  <line x1="118" y1="332" x2="118" y2="285" stroke="#efca72" stroke-width="2"/>
  <line x1="390" y1="100" x2="370" y2="100" stroke="#efca72" stroke-width="2"/>
  <line x1="390" y1="250" x2="390" y2="230" stroke="#efca72" stroke-width="2"/>
  <line x1="385" y1="330" x2="400" y2="315" stroke="#efca72" stroke-width="2"/>` }
}};
