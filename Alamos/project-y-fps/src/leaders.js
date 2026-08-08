const LEADERS=[
 {id:'bethe',name:'Hans Bethe',role:'Theoretical physicist and division organizer',science:5,management:4,trait:'Turns many calculations into one coordinated theory program.'},
 {id:'bacher',name:'Robert Bacher',role:'Experimental physicist and laboratory leader',science:4,management:5,trait:'Strong at organizing independent measurements and technical teams.'},
 {id:'kennedy',name:'Joseph Kennedy',role:'Chemist and division leader',science:4,management:4,trait:'Balances chemical evidence, materials work, and laboratory discipline.'},
 {id:'parsons',name:'Deke Parsons',role:'Naval ordnance officer and engineer',science:3,management:5,trait:'Excels at schedules, interfaces, qualification, and delivery constraints.'},
 {id:'kistiakowsky',name:'George Kistiakowsky',role:'Physical chemist and explosives-program leader',science:4,management:4,trait:'Connects difficult physical science to a focused engineering campaign.'},
 {id:'fermi',name:'Enrico Fermi',role:'Experimental and theoretical physicist',science:5,management:3,trait:'Rapidly identifies the simplest decisive calculation or experiment.'},
 {id:'vonneumann',name:'John von Neumann',role:'Mathematician and scientific consultant',science:5,management:3,trait:'Exceptional at mathematical structure, modeling, and hard tradeoffs.'}
];
const AVATARS={
 bethe:{skin:'#f0c8a0',hair:'#6d6d6d',glasses:true,mustache:false,brow:'#5e5e5e',coat:'#315c78',tie:'#9a741d',hairStyle:'side'},
 bacher:{skin:'#efc3a0',hair:'#533b2f',glasses:false,mustache:false,brow:'#533b2f',coat:'#4b775f',tie:'#315c78',hairStyle:'short'},
 kennedy:{skin:'#edbf9a',hair:'#5b4738',glasses:false,mustache:true,brow:'#5b4738',coat:'#8a6921',tie:'#4b775f',hairStyle:'short'},
 parsons:{skin:'#efc8a6',hair:'#3f3029',glasses:false,mustache:true,brow:'#3f3029',coat:'#865044',tie:'#9a741d',hairStyle:'cap'},
 kistiakowsky:{skin:'#e8bb96',hair:'#e7e7e7',glasses:false,mustache:true,brow:'#cfcfcf',coat:'#704f88',tie:'#315c78',hairStyle:'wild'},
 fermi:{skin:'#efc49f',hair:'#2f2b2d',glasses:false,mustache:false,brow:'#2f2b2d',coat:'#315c78',tie:'#4b775f',hairStyle:'wave'},
 vonneumann:{skin:'#f0c6a1',hair:'#1f1f1f',glasses:true,mustache:false,brow:'#1f1f1f',coat:'#704f88',tie:'#8a6921',hairStyle:'slick'}
};
const BUILDING_POS={T:'pos-t',P:'pos-l',X:'pos-r',CM:'pos-bl',E:'pos-br'};
export { LEADERS, AVATARS, BUILDING_POS };
