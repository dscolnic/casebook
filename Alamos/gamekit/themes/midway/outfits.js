// outfits.js — what people wear at Corbin Park in the three weeks before it opens.
//
// Nobody here is in a uniform yet, because the park is shut: this is a
// maintenance crew, two contractors and an inspector, in the clothes people
// work in. The ride staff get their polo shirts back on opening day, which is
// after the last day this game covers.

export const OUTFITS = {
  // The crew: hi-vis over whatever they came in wearing.
  crewA:   { top: 0xd8c53a, bottom: 0x3b4048, kind: 'staff', sleeve: 0.46 },
  crewB:   { top: 0xd8c53a, bottom: 0x4a4036, kind: 'staff', sleeve: 0.46 },
  // Trades: the electrician, the welder, the pump fitter, inoveralls.
  tradeA:  { top: 0x3f6f8a, bottom: 0x3f6f8a, kind: 'staff', sleeve: 1 },
  tradeB:  { top: 0x6b6f4a, bottom: 0x6b6f4a, kind: 'staff', sleeve: 1 },
  // Leads and contractors: a coat over the top, because they are on and off site.
  lead:    { top: 0x4a4f58, bottom: 0x35393f, kind: 'lead', coat: 0xd8c53a },
  // The inspector, who does not work for the park and does not wear its colours.
  inspect: { top: 0x2f3a4a, bottom: 0x2f3a4a, kind: 'lead', coat: 0xe4e2dc },
  // A retired mechanic who walks up from his house when he is asked.
  retired: { top: 0x7a6a55, bottom: 0x4a4036, kind: 'visitor' },
};

const CREW = ['crewA', 'crewB'];
const TRADES = ['tradeA', 'tradeB'];

/**
 * Map a roster role to an outfit.
 *
 * The inspector is picked out deliberately: he is the one person on the midway
 * who is not the park's, and a player should be able to see that across a
 * hundred metres of asphalt.
 */
export function roleToOutfit(role, rnd){
  const r = (role || '').toLowerCase();
  if(r.includes('inspector')) return 'inspect';
  if(r.includes('retired')) return 'retired';
  if(r.includes('electric') || r.includes('weld') || r.includes('pump') || r.includes('hydraulic')) {
    return TRADES[rnd(TRADES.length)];
  }
  if(r.includes('operator') || r.includes('supervisor') || r.includes('rigging')) return CREW[rnd(CREW.length)];
  if(r) return 'lead';
  return rnd(100) < 62 ? CREW[rnd(CREW.length)] : TRADES[rnd(TRADES.length)];
}
