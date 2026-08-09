import { KEY } from './constants.js';
// The slot this name refers to predates per-theme keys. It is read once so an
// in-progress campaign survives the change, then written forward under the
// theme's own key.
//
// It belongs to Hospital Heroes and is only ever read *by* Hospital Heroes.
// Reading it for every theme meant that playing the hospital and then opening
// either other game on the same origin loaded a hospital campaign into it:
// every group id in the save (TRI, RESP, …) is absent from that theme, so the
// first question panel died on `gs.issue` of undefined.
const LEGACY_KEY = 'hospitalHeroes_juniorDoctor_v1';
const LEGACY_KEYS = KEY === 'gamekit_hospital_v1' ? [LEGACY_KEY] : [];

export function saveState(state){
  try{ localStorage.setItem(KEY, JSON.stringify(state)); }catch(e){}
}

export function loadState(){
  try{
    let raw = localStorage.getItem(KEY);
    if(raw){
      const parsed=JSON.parse(raw);
      // migrate mission fields if missing
      if(parsed && parsed.missionIdx==null){ parsed.missionIdx=0; parsed.missionStopIdx=0; parsed.missionProgress={}; parsed.version=21; try{localStorage.setItem(KEY, JSON.stringify(parsed));}catch(e){} }
      return parsed;
    }
    for(const k of LEGACY_KEYS){
      raw = localStorage.getItem(k);
      if(raw){
        const parsed = JSON.parse(raw);
        if(parsed && parsed.missionIdx==null){ parsed.missionIdx=0; parsed.missionStopIdx=0; parsed.missionProgress={}; }
        parsed.version=21;
        try{ localStorage.setItem(KEY, JSON.stringify(parsed)); }catch(e){}
        return parsed;
      }
    }
    return null;
  }catch(e){ return null; }
}

export function clearState(){
  try{ localStorage.removeItem(KEY); localStorage.removeItem(LEGACY_KEY); }catch(e){}
}
