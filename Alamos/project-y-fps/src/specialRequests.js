// specialRequests.js — the between-mission funding meetings.
//
// These five vignettes lived inside simulation.js, which made them engine code
// in a file every game shares. They are content: one game's characters asking
// one game's director for one game's money. Extracted so simulation.js can be
// the shared engine copy.
export const SPECIAL_REQUESTS={
  3: { personId:'hinton', cost:2, title:'Criticality safety interlocks for the chemistry wing', division:'CM',
    paragraphs:[
      'Joan Hinton, who works on critical assembly diagnostics, has flagged that the chemistry wing where plutonium solutions are handled still relies on a single administrative limit for mass and geometry. One mislabeled beaker or an extra transfer could bring fissile material close to a critical configuration. A $2 interlock — a second independent mass accounting check plus a neutron counter at the doorway — would give a layered safety case instead of trusting one person’s arithmetic.',
      'This is not just a science question. The technicians are mostly young women on 12-hour shifts, sharing thin-walled hutments, and a criticality accident would be a health and community catastrophe before it ever affected the weapon program. Hinton argues that spending now preserves both accurate chemistry yields and the lives of the people who live two blocks from the lab. As director you can approve the $2 from the $20 reserve, or defer and accept 12–24h of added risk while the lab operates on a single barrier.'
    ]},
  6: { personId:'hornig', cost:3, title:'Ventilation upgrade for plutonium metallurgy', division:'CM',
    paragraphs:[
      'Donald Hornig’s metallurgy group is pressing plutonium ingots in a lab where the ventilation hoods were sized for uranium. Plutonium dust is alpha-active: a few micrograms lodged in a lung delivers a lifetime dose, and the hoods now run at only 60% of the face velocity needed. Hornig needs $3 for a filtered exhaust upgrade and daily nose-count swipes. The science is clear — without it, solubility measurements will drift as surface oxide builds, and the yield verification you need for Mission 5 will be unreliable.',
      'The human cost is visible around town: families share laundry where dust can travel home, the school is 400 meters downwind, and the infirmary has only 12 beds for a mesa that will soon hold 6,000 people. Hornig frames the request as both measurement fidelity and public health. Funding it keeps the phase-diagram work honest; deferring it saves $3 now but adds 12–24h while the group reworks contaminated samples and the town absorbs avoidable exposure.'
    ]},
  9: { personId:'mckibbin', cost:2, title:'Housing Office support for arriving families', division:'E',
    paragraphs:[
      'Dorothy McKibbin, who runs the gate at 109 East Palace in Santa Fe and assigns every hutment on the Hill, reports that 40 families arriving for the implosion push are bunked in unheated Pacific huts with a single pot-belly stove. Children are studying by coal light, and the community school — staffed by scientists’ wives — has doubled to 150 pupils without extra benches or paper. A $2 allocation would finish Sundt duplex partitions, add a coal delivery, and buy school supplies.',
      'From a program view this looks like “town” rather than “physics,” but McKibbin notes the link: engineers who spent the night shoveling ash or nursing a sick child make timing errors on lens molds the next day. Fuller Lodge evening lectures and Saturday dances at the theater are not luxuries; they are the retention system for a town that cannot be resupplied quickly at 7,300 feet. Approving keeps the technical workforce functional; deferring risks 12–24h of absenteeism and rework.'
    ]},
  12: { personId:'bradbury', cost:3, title:'Theater and PX film for morale and timing calibration', division:'X',
    paragraphs:[
      'Norris Bradbury, who will soon oversee assembly, requests $3 to keep Theater No. 2 running three nights a week and to buy high-speed film for the P-Division imaging group that shares the same projection budget. The cultural argument and the science argument coincide. The theater is the only building where the entire mesa can hear the same colloquium — Bethe on implosion was given there in February — and where mixed crews discuss misalignments without rank. Without it, X-Division lens crews and E-Division ordnance drift into separate vocabularies.',
      'For health, the same film stock is also used to radiograph inert lens assemblies; without a steady supply, crews will test with fewer views and miss asymmetry that later shows up as jetting. At 2,200 m, with censored mail and no road out without a pass, morale directly governs precision. Funding both uses of the film sustains the shared language you built in Mission 1; deferring saves $3 but adds 12–24h as teams re-establish common timing baselines.'
    ]},
  15: { personId:'kitty', cost:2, title:'Post-Trinity health follow-up and community support', division:'CM',
    paragraphs:[
      'Kitty Oppenheimer, in her role coordinating housing and infirmary liaison, asks for $2 to expand the infirmary’s post-shot capacity: iodine tablets, additional nose counts, and a visiting nurse for the canyon trailers where dust settled after the test. The immediate fission yield may be known, but the delayed health picture is not. Fallout is not yet understood by the community, and families are already asking whether the pond water is safe.',
      'Even if the technical chain is complete, the town’s trust is part of the evidence chain. A complete dossier must include what was promised about return to the mesa, how samples will be tracked, and what families are told about life downwind. This is the cultural and ethical counterpart to the technical freeze you will impose in Mission 15. Approving acknowledges that responsibility persists after a device is complete; deferring saves $2 now but incurs 12–24h while rumors and incomplete records compound.'
    ]},
};
