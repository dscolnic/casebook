import { CURRICULUM as C } from '../themes/overwind/content/curriculum.js';
const strip = o => JSON.parse(JSON.stringify(o, (k,v)=> (k==='scene'||k==='guide'||k==='why'||k==='background'||k==='story')?undefined:v));
console.log(JSON.stringify(strip(C), null, 1));
