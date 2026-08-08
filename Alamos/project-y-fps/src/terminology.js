import { JARGON } from './curriculum.js';
import { esc } from './utils.js';

export function applyTerminology(html){
  // Wrap known terms in chips: we will replace occurrences of aliases with <button class="termChip" data-term="index">term</button>
  // To avoid nested replacement issues, we generate a placeholder approach.
  // For simplicity, we return html with inline term buttons appended as a glossary strip rather than inline replacement,
  // but we also provide inline replacement for science story paragraphs.
  return html;
}

export function renderTermStrip(terms){
  // terms: array of indices into JARGON
  if(!terms || terms.length===0) return '';
  const chips = terms.map(i=>{
    const t=JARGON[i];
    return `<button class="termChip" data-term="${i}">${esc(t.name)}</button>`;
  }).join('');
  return `<div class="termStrip"><div class="termStripLabel">Terminology</div><div class="termButtons">${chips}</div><div class="termDefinition hidden"></div></div>`;
}

export function findTermsInText(text){
  // Return unique JARGON indices whose alias appears in text (case-insensitive word boundary)
  const found=[];
  const lower=text.toLowerCase();
  JARGON.forEach((t,idx)=>{
    for(const alias of t.aliases){
      const re=new RegExp(`\\b${alias.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}\\b`, 'i');
      if(re.test(text)){
        found.push(idx);
        break;
      }
    }
  });
  return found;
}

export function inlineTextWithTerms(text){
  // Replace alias occurrences with underlined span that opens term definition on click.
  // We will wrap with <button class="termChip inlineTerm"> but keep original casing.
  let result = esc(text);
  // Sort aliases longest first to avoid partial replacement
  const all=[]; JARGON.forEach((t,idx)=> t.aliases.forEach(a=> all.push({alias:a, idx, name:t.name})));
  all.sort((a,b)=>b.alias.length - a.alias.length);
  // Use placeholder tokens to avoid double replacement
  const placeholders=[];
  all.forEach(({alias, idx})=>{
    const re=new RegExp(`\\b(${alias.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})\\b`, 'gi');
    result = result.replace(re, (m)=>{
      const ph=`__TERM_${placeholders.length}__`;
      placeholders.push({ph, html:`<button class="termChip inlineTerm" data-term="${idx}" style="padding:0 4px;border:none;background:transparent;text-decoration:underline dotted;color:var(--blue);font-weight:700;cursor:pointer">${esc(m)}</button>`});
      return ph;
    });
  });
  placeholders.forEach(({ph, html})=> result = result.replace(ph, html));
  return result;
}

export function bindTermChips(container){
  container.querySelectorAll('.termChip').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      e.stopPropagation();
      const idx=parseInt(btn.dataset.term,10);
      const t=JARGON[idx];
      if(!t) return;
      // find nearest termDefinition panel
      const wrap=btn.closest('.termStrip') || btn.closest('.questionOverlay') || container;
      let panel=wrap.querySelector('.termDefinition');
      if(!panel){
        panel=document.createElement('div');
        panel.className='termDefinition';
        wrap.appendChild(panel);
      }
      const wasActive=btn.classList.contains('active');
      wrap.querySelectorAll('.termChip').forEach(x=>x.classList.remove('active'));
      if(wasActive){
        panel.classList.add('hidden'); panel.innerHTML=''; return;
      }
      btn.classList.add('active');
      panel.innerHTML=`<b>${esc(t.name)}</b><br>${esc(t.def)}`;
      panel.classList.remove('hidden');
    });
  });
}
