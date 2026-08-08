export const $ = id => document.getElementById(id);
export const esc = s => String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const clamp = (v,a,b) => Math.max(a, Math.min(b,v));
export const stars = n => '★'.repeat(n)+'☆'.repeat(5-n);
export const fmt = n => (Math.round(n*10)/10).toString();
export const seeded = n => { const x=Math.sin(n*12.9898+78.233)*43758.5453; return x-Math.floor(x); };
export const shuffleSeeded = (arr,seed)=>arr.map((v,i)=>({v,k:seeded(seed+i*17)})).sort((a,b)=>a.k-b.k).map(x=>x.v);
