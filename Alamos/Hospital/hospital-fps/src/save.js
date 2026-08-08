import { KEY } from './constants.js';
const LEGACY_KEYS = [];
const LEGACY_KEY = 'hospitalHeroes_juniorDoctor_v1';

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
