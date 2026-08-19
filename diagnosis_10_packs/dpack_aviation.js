// Diagnosis data pack — Commercial aviation.
// Difficulty is DERIVED from the signatures (salient = the loud readings).
//   R1 stall      = L1 naked single (high angle of attack is unique)
//   R2 windshear  = L2 one clear line (airspeed down + angle of attack normal — needs both loud readings)
//   R3 badspeed   = L3 loud gauges tie (bad airspeed vs normal fast flight both look fast on the loud readings)
module.exports = { PACK: {
  id:'aviation', title:'Flight Deck Cross-Check', domain:'Commercial aircraft flight operations',
  role:'You are the pilot monitoring on approach.',

  system:{
    parts:[
      ['Pitot-static air data','Pitot tubes and static ports turn air pressure into indicated airspeed, altitude, and vertical speed. A blocked or contaminated source can make a convincing but false speed display.'],
      ['Angle-of-attack vanes','Independent vanes sense how steeply the wing meets the airflow. A wing stalls because angle of attack is too high, not because one particular airspeed appears.'],
      ['Inertial and GPS navigation','The aircraft computes motion over the ground without using the pitot tubes. Groundspeed is not the same as airspeed, but with known winds it is a powerful cross-check.'],
      ['Flight controls and warning system','Pitch, flap position, stick shaker, and windshear alerts describe what the aircraft is doing and what the wing is experiencing.'],
      ['Engines','N1 shows commanded thrust. High thrust with falling energy points toward disturbed air; ordinary thrust with impossible air-data disagreement points toward an instrument problem.']
    ],
    soWrong:'So a dramatic speed indication is only the beginning. The real diagnosis comes from asking whether the wing, the aircraft trajectory, and the independent navigation sources tell the same story.'
  },

  // The headline flight-path readings pilots notice first.
  salient:['ias','aoa'],

  readings:{
    ias:{ name:'Indicated airspeed', pin:{x:108,y:122}, zone:'air-data',
      purpose:'Speed inferred from pitot and static pressure. On this approach the target is about 145 kt; it can fall in a stall or windshear, rise in a real acceleration, or lie if the air-data source is bad.' },
    aoa:{ name:'Angle of attack', pin:{x:170,y:205}, zone:'wing',
      purpose:'How steeply the wing meets the airflow. Near 5–7° is ordinary here; a value near the stall threshold means the wing is running out of lift even if another speed source looks calm.' },
    gps:{ name:'GPS groundspeed', pin:{x:420,y:102}, zone:'navigation',
      purpose:'Speed over the ground from satellites. It differs from airspeed by wind, but with the reported wind near 10 kt it should broadly track a genuine large acceleration or deceleration.' },
    vsi:{ name:'Vertical speed', pin:{x:412,y:190}, zone:'navigation',
      purpose:'Rate of climb or descent from inertial and pressure sources. A sharp downdraft drives it strongly downward; a false airspeed indication may leave the actual flight path nearly unchanged.' },
    pitch:{ name:'Pitch attitude', pin:{x:265,y:116}, zone:'flight-controls',
      purpose:'Nose attitude from the inertial reference. A stall often follows excessive nose-up attitude; a normal fast descent is usually nose-low; bad air data can appear while pitch remains ordinary.' },
    shaker:{ name:'Stick shaker', pin:{x:238,y:205}, zone:'wing',
      purpose:'A physical stall warning driven by the wing approaching critical angle of attack. It should activate for a real aerodynamic stall, not merely because an airspeed display is strange.' },
    thrust:{ name:'Engine N1', pin:{x:300,y:322}, zone:'propulsion',
      purpose:'Fan speed as a percentage of maximum. High N1 means the engines are producing strong thrust; falling speed despite high thrust suggests the surrounding air mass is taking energy away.' },
    compare:{ name:'Independent air-data channel', pin:{x:92,y:284}, zone:'air-data',
      purpose:'A separately sourced airspeed channel. Close agreement supports a real speed change; a large split means at least one pitot-static source is unreliable.' }
  },

  hypotheses:{
    stall:{ label:'Aerodynamic stall',
      call:{ title:'Stall — reduce angle of attack.', arg:'The wing is beyond its safe angle. Lower the nose, add appropriate thrust, and recover the flight path.' },
      sig:{ ias:'down', aoa:'high', gps:'down', vsi:'down', pitch:'up', shaker:'on', thrust:'high', compare:'agree' } },
    windshear:{ label:'Windshear / downdraft',
      call:{ title:'Windshear — execute the escape maneuver.', arg:'The aircraft is losing airspeed and flight path in disturbed air despite high thrust. Follow the windshear escape guidance.' },
      sig:{ ias:'down', aoa:'normal', gps:'down', vsi:'down', pitch:'up', shaker:'off', thrust:'high', compare:'agree' } },
    badspeed:{ label:'Unreliable airspeed',
      call:{ title:'Unreliable airspeed — fly pitch and power.', arg:'The fast indication is not supported by the aircraft motion or the other air-data source. Use the unreliable-airspeed procedure.' },
      sig:{ ias:'up', aoa:'normal', gps:'normal', vsi:'normal', pitch:'normal', shaker:'off', thrust:'normal', compare:'disagree' } },
    normalfast:{ label:'Normal high-speed descent',
      call:{ title:'Normal high-speed descent — monitor.', arg:'The aircraft is genuinely moving fast but remains controlled and within the planned descent. No fault response is required.' },
      sig:{ ias:'up', aoa:'normal', gps:'up', vsi:'down', pitch:'down', shaker:'off', thrust:'normal', compare:'agree' } }
  },
  dismissal:'normalfast',
  reassuring:{ lab:'Autopilot status', val:'ENGAGED — tracking approach',
    note:'The autopilot is following commands, but it can still fly into disturbed air or respond to a bad sensor.' },

  rounds:[
    { answer:'stall', alarm:'aoa',
      poleA:{ lab:'Wing condition', val:'Angle of attack at stall threshold', note:'The wing is pitched too steeply into the airflow and the stick shaker has started.' },
      hook:'On short final, the nose rises and the speed begins to wash away. The autopilot remains engaged, but the control column starts to shake.',
      riddle:'The airplane is still following the approach — <span class="q">so why is the wing warning that lift is about to break?</span>',
      vals:{ ias:'112 kt, falling', aoa:'15.2°, rising', gps:'121 kt, falling', vsi:'-1,450 ft/min', pitch:'12° nose up', shaker:'active, continuous', thrust:'92% N1', compare:'111 kt, agrees within 1 kt' },
      reasons:{
        windshear:'Windshear can drive airspeed and vertical speed down even at high thrust, but the angle of attack would not have to be 15.2° and the stick shaker would not be continuously confirming an aerodynamic stall.',
        badspeed:'A bad airspeed source can display a false loss of speed, but the independent channel agrees at 111 kt and the wing itself is at 15.2° with the shaker active.',
        normalfast:'A normal high-speed descent would show high airspeed, a nose-low attitude, and no shaker. Here speed is 112 kt, pitch is 12° nose up, and the wing is at the stall threshold.' },
      resolve:{ title:'Aerodynamic stall — the wing has exceeded its safe angle.',
        paras:[
          'The decisive reading is the 15.2° angle of attack, reinforced by the continuous stick shaker. Both airspeed channels agree that speed is falling, the nose is high, and the descent rate is worsening. Reduce angle of attack first; the autopilot being engaged does not preserve lift.',
          'This is a naked single. Among the four causes, only a real stall produces the high angle-of-attack signature. One loud reading names the failure before the quieter instruments confirm it.' ],
        why:{ loud:'<b>Why the loud reading was enough</b>: only the stall puts angle of attack at 15.2°; the other causes keep the wing below the stall threshold.',
              quiet:'<b>Why the calm autopilot status misleads</b>: an engaged autopilot can still command or maintain an attitude that leaves too little airspeed margin.' },
        chain:['Nose held too high as energy decays','Angle of attack reaches the critical region','Lift breaks down and the aircraft descends'],
        take:'A stall is an angle-of-attack problem: trust what the wing is experiencing, not the reassuring mode annunciation.' } },

    { answer:'windshear', alarm:'vsi',
      poleA:{ lab:'Flight path', val:'Descent rate collapsing', note:'Airspeed and groundspeed are falling while the aircraft sinks despite near-maximum thrust.' },
      hook:'A rain shaft crosses the final approach. The engines spool high, yet the aircraft loses speed and drops below the glide path.',
      riddle:'The engines are already producing strong thrust — <span class="q">what is stealing both speed and climb performance?</span>',
      vals:{ ias:'123 kt, falling', aoa:'7.0°, steady', gps:'132 kt, falling', vsi:'-2,300 ft/min', pitch:'9° nose up', shaker:'inactive', thrust:'96% N1', compare:'124 kt, agrees within 1 kt' },
      reasons:{
        stall:'A stall also loses speed and altitude, but it requires excessive angle of attack. The vane is steady at 7.0° and the stick shaker is inactive.',
        badspeed:'Unreliable airspeed should produce disagreement or a mismatch with actual motion. Both air-data channels agree, GPS groundspeed is also falling, and the descent rate has reached -2,300 ft/min.',
        normalfast:'A normal high-speed descent would have rising or high speed and a nose-low attitude. Here both airspeed and groundspeed are falling despite 96% N1.' },
      resolve:{ title:'Windshear — the air mass is taking away energy and flight path.',
        paras:[
          'The aircraft is losing indicated airspeed, groundspeed, and vertical path together while the engines are near maximum thrust. Yet angle of attack remains below the stall region and the shaker is quiet. That pattern fits a severe windshear or downdraft encounter, not an aerodynamic stall or a lying speed sensor.',
          'This takes one clear line across the loud readings. Falling airspeed alone is shared with a stall, and normal angle of attack alone is shared with the two fast-looking alternatives. Only the combination — speed down while angle of attack stays normal — leaves windshear.' ],
        why:{ loud:'<b>Why the loud readings work together</b>: speed is falling, but the wing is not at a stall angle. That eliminates the stall without pretending the speed loss is harmless.',
              quiet:'<b>Why the flight path matters</b>: GPS speed and vertical speed fall with the airspeed, proving that the aircraft itself is losing energy rather than one display merely lying.' },
        chain:['Aircraft enters a downdraft and changing wind','Available energy and flight path collapse despite high thrust','Airspeed and groundspeed fall while descent rate surges'],
        take:'When thrust is high but both speed and trajectory deteriorate, diagnose the moving air mass, not just the wing.' } },

    { answer:'badspeed', alarm:'ias',
      poleA:{ lab:'Airspeed', val:'Overspeed-looking indication', note:'The captain display races upward toward 235 kt even though the approach attitude and engine setting barely change.' },
      hook:'In cloud, one airspeed tape suddenly accelerates through the red trend band. The aircraft feels stable and the autopilot continues tracking.',
      riddle:'The loud gauges look like a fast airplane — <span class="q">but is the aircraft truly accelerating, or is only one pressure source moving?</span>',
      vals:{ ias:'235 kt, rising rapidly', aoa:'5.8°, steady', gps:'151 kt, steady', vsi:'-720 ft/min, steady', pitch:'2° nose down, steady', shaker:'inactive', thrust:'54% N1, steady', compare:'147 kt, differs by 88 kt' },
      reasons:{
        normalfast:'A genuine high-speed descent shares the loud pattern: high indicated speed with ordinary angle of attack. But it would also produce high GPS groundspeed and agreement between air-data channels. GPS is only 151 kt and the second channel reads 147 kt.',
        stall:'A stall would show low airspeed, excessive angle of attack, nose-up attitude, and a shaker. This case shows a fast indication, 5.8° angle of attack, and no stall warning.',
        windshear:'Windshear would make the aircraft trajectory change: groundspeed and vertical speed would deteriorate together, often with high thrust. Here GPS speed, descent rate, attitude, and N1 all remain steady.' },
      resolve:{ title:'Unreliable airspeed — the overspeed exists on one pressure channel, not in the aircraft motion.',
        paras:[
          'The captain-side indication has jumped to 235 kt, but the independent air-data channel remains at 147 kt, GPS groundspeed is steady at 151 kt, and neither pitch, thrust, nor vertical speed has changed. A blocked, contaminated, or otherwise faulty pitot-static source is creating the fast-looking display. Fly the published pitch-and-power targets and apply the unreliable-airspeed procedure.',
          'This is where the loud gauges tie. Unreliable airspeed and a genuinely fast descent both predict a high indicated speed with a normal angle of attack, so the headline instruments cannot decide. The deeper question is real versus artifact: did the aircraft motion accelerate too? GPS and the second air-data source say no.' ],
        why:{ loud:'<b>Why the loud gauges cannot decide</b>: both a bad speed source and a truly fast airplane can present high indicated speed with a normal angle of attack.',
              quiet:'<b>Why this is an artifact</b>: groundspeed, vertical speed, pitch, and thrust remain steady while the independent air-data channel disagrees by 88 kt.' },
        chain:['One pitot-static source becomes unreliable','Its computed airspeed races upward alone','Independent motion and air-data sources expose the false overspeed'],
        take:'When a dramatic instrument changes without the vehicle changing, cross-check an independent physical pathway before acting on the alarm.' } }
  ],

  schematic:{ viewBox:'0 0 520 390', svg:`
  <text x="92" y="32" class="eqlbl" text-anchor="middle" style="fill:#5a7f96">AIR DATA</text>
  <text x="260" y="32" class="eqlbl" text-anchor="middle" style="fill:#5a7f96">AIRCRAFT</text>
  <text x="426" y="32" class="eqlbl" text-anchor="middle" style="fill:#5a7f96">NAVIGATION</text>
  <rect x="42" y="55" width="110" height="265" rx="18" fill="rgba(112,201,242,.06)" stroke="#385b70" stroke-width="1.5"/>
  <rect x="372" y="55" width="108" height="190" rx="18" fill="rgba(112,201,242,.06)" stroke="#385b70" stroke-width="1.5"/>
  <path d="M178,185 L244,168 L350,185 L294,201 L278,285 L252,285 L236,201 Z" fill="#173e59" stroke="#70c9f2" stroke-width="2"/>
  <path d="M244,168 L252,82 L270,82 L278,168" fill="#173e59" stroke="#70c9f2" stroke-width="2"/>
  <path d="M250,285 L225,330 L247,330 L260,303 L273,330 L295,330 L270,285" fill="#173e59" stroke="#70c9f2" stroke-width="2"/>
  <circle cx="207" cy="210" r="13" fill="#173e59" stroke="#efca72" stroke-width="2"/><circle cx="313" cy="210" r="13" fill="#173e59" stroke="#efca72" stroke-width="2"/>
  <path d="M82,112 H140 L174,146" fill="none" stroke="#70c9f2" stroke-width="3" stroke-dasharray="5 4"/>
  <path d="M82,280 H143 L178,242" fill="none" stroke="#70c9f2" stroke-width="3" stroke-dasharray="5 4"/>
  <path d="M372,100 H340 L306,128" fill="none" stroke="#70c9f2" stroke-width="3" stroke-dasharray="5 4"/>
  <path d="M372,190 H340 L310,190" fill="none" stroke="#70c9f2" stroke-width="3" stroke-dasharray="5 4"/>
  <text x="97" y="342" class="lbl" text-anchor="middle">pitot / static computers</text>
  <text x="260" y="365" class="lbl" text-anchor="middle">airframe, wings & engines</text>
  <text x="426" y="268" class="lbl" text-anchor="middle">GPS / inertial reference</text>
  <line x1="170" y1="205" x2="215" y2="188" stroke="#efca72" stroke-width="2"/>
  <line x1="238" y1="205" x2="248" y2="184" stroke="#efca72" stroke-width="2"/>
  <line x1="265" y1="116" x2="260" y2="150" stroke="#efca72" stroke-width="2"/>
  <line x1="300" y1="322" x2="286" y2="218" stroke="#efca72" stroke-width="2"/>` }
}};
