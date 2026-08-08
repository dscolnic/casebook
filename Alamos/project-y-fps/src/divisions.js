const GROUP_DEFS=[
 {id:'T',code:'T',name:'Theory & Calculations',color:'#315c78',difficulty:5,type:'ballpark',desc:'Neutron physics, decay, reaction rates, and uncertainty propagation.',defaultLeader:'bethe',budget:72,
  milestones:[
   {name:'Build the chain-reaction notebook',cost:14,work:11,brief:'Set up the basic neutron-balance, decay, and reaction-rate language that the rest of the program will use.'},
   {name:'Bound the multiplication and timing estimates',cost:20,work:15,brief:'Compare competing assumptions and identify which parameters actually control the answer.'},
   {name:'Propagate uncertainty through the theory stack',cost:24,work:18,brief:'Carry measurement and model uncertainty all the way to a program-level prediction.'},
   {name:'Issue final predictive tables to the laboratory',cost:28,work:22,brief:'Translate theory into lookup tables, threshold estimates, and testable predictions.'}
  ],issuePool:['Two calculations agree numerically but rely on the same hidden approximation.','A predicted trend changes sign when one neglected uncertainty is included.','The group has three plausible estimates of neutron multiplication and no clean comparison.']},
 {id:'P',code:'P',name:'Experimental Physics & Diagnostics',color:'#4b775f',difficulty:4,type:'diagnosis',desc:'Counting statistics, detector behavior, timing, and diagnostic reliability.',defaultLeader:'bacher',budget:72,
  milestones:[
   {name:'Calibrate counters and timing channels',cost:13,work:10,brief:'Establish baselines, dead-time corrections, and timing references for core diagnostics.'},
   {name:'Resolve time-dependent signals',cost:19,work:14,brief:'Separate true physical transients from trigger, gain, or bandwidth artifacts.'},
   {name:'Cross-check independent diagnostic lines',cost:24,work:18,brief:'Use instruments with different failure modes to test the same physical conclusion.'},
   {name:'Qualify the field instrumentation package',cost:30,work:22,brief:'Prove that the measurement system remains interpretable outside ideal laboratory conditions.'}
  ],issuePool:['A detector channel disagrees with two independent counters after background subtraction.','All traces flatten at the same maximum value despite different source strengths.','A timing shift appears only after the shared clock chain was serviced.']},
 {id:'CM',code:'CM',name:'Chemistry & Metallurgy',color:'#8a6921',difficulty:4,type:'protocol',desc:'Isotopes, materials properties, contamination control, and repeatable handling.',defaultLeader:'kennedy',budget:80,
  milestones:[
   {name:'Characterize the incoming material stream',cost:15,work:11,brief:'Document isotopic content, purity, and physical state before processing begins.'},
   {name:'Stabilize fabrication and handling procedures',cost:22,work:15,brief:'Turn laboratory experience into a safe, reproducible materials workflow.'},
   {name:'Verify properties across multiple batches',cost:27,work:19,brief:'Demonstrate that independent samples satisfy the same evidence-based acceptance criteria.'},
   {name:'Release certified components to integration',cost:32,work:23,brief:'Complete documentation, property checks, and handoff controls before assembly.'}
  ],issuePool:['Two chemically similar batches give different count rates after the same preparation.','A successful small trial was copied before the yield-measurement procedure was fully documented.','A release package is waiting on an independent contamination survey.']},
 {id:'E',code:'E',name:'Ordnance & Engineering',color:'#865044',difficulty:3,type:'sequence',desc:'Interfaces, timing logic, qualification tests, and instrumented engineering trials.',defaultLeader:'parsons',budget:88,
  milestones:[
   {name:'Freeze the system interfaces',cost:16,work:12,brief:'Make every subsystem state what it supplies, requires, and cannot tolerate.'},
   {name:'Prototype the non-nuclear hardware',cost:24,work:16,brief:'Expose fit, timing, and manufacturability problems before full integration.'},
   {name:'Run an instrumented engineering trial',cost:30,work:20,brief:'Test the assembled hardware while preserving evidence about what happened.'},
   {name:'Qualify assembly and delivery operations',cost:36,work:24,brief:'Demonstrate that the full non-nuclear system can be handled and deployed reliably.'}
  ],issuePool:['Two teams are building to different revisions of the same interface sheet.','A test is scheduled before its instrumentation has pass/fail criteria.','A prototype succeeded, but the team cannot reconstruct which exact configuration was tested.']},
 {id:'X',code:'X',name:'Implosion & Systems Integration',color:'#704f88',difficulty:5,type:'sciencetank',desc:'Integrate theory, diagnostics, materials, and engineering into one evidence chain.',defaultLeader:'kistiakowsky',budget:96,
  milestones:[
   {name:'Reconcile subsystem requirements',cost:18,work:13,brief:'Turn conflicting local goals into one set of system-level constraints.'},
   {name:'Choose the decisive integration tests',cost:27,work:17,brief:'Spend scarce tests on evidence that can truly separate competing explanations.'},
   {name:'Run the full instrumented non-nuclear trial',cost:33,work:22,brief:'Combine the system under controlled conditions and preserve multiple diagnostics.'},
   {name:'Hold the final readiness review',cost:40,work:26,brief:'Judge the complete evidence chain, unresolved risks, and contingency plans.'}
  ],issuePool:['Every division has data, but the data do not answer the same system-level question.','The next proposed test is dramatic but cannot distinguish the two leading explanations.','A readiness claim depends on one measurement with no independent failure mode.']}
];
export { GROUP_DEFS };
