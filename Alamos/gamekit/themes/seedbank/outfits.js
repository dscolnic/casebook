// outfits.js — what people wear at Wellmere.
//
// A seed bank dresses in two registers and the split is legible at fifty
// metres, which is the point of it: field green and canvas out on the ground,
// white coats in the vault and the laboratory. The one visitor palette is the
// farmer, who is neither and is the most important person in the campaign.
//
// kind drives proportions and accessories:
//   'staff'   badge on a lanyard, optional cap
//   'lead'    as staff, plus an overcoat shell (lab coat, hi-vis, uniform jacket)
//   'child'   genuinely smaller rig, no badge
//   'visitor' street clothes, no badge

export const OUTFITS = {
  // Field: the trial ground, the glasshouses, the threshing floor.
  fieldA:  { top: 0x4f6a45, bottom: 0x3d4a38, kind: 'staff' },
  fieldB:  { top: 0x6b7350, bottom: 0x40453a, kind: 'staff' },
  fieldC:  { top: 0x8a7b57, bottom: 0x3c4038, kind: 'staff' },
  // Indoor: the vault, the laboratory, the crossing hall.
  labA:    { top: 0xc9cdc6, bottom: 0x4a5058, kind: 'staff' },
  labB:    { top: 0xb6bfc4, bottom: 0x434a52, kind: 'staff' },
  // The named cast, whichever end of the station they work at.
  lead:    { top: 0x515a52, bottom: 0x39413c, kind: 'lead', coat: 0xf1f1ec },
  leadOut: { top: 0x4a5a44, bottom: 0x3a4038, kind: 'lead', coat: 0xb9c07e },
  // The farmer, and anybody else who has driven in.
  farmA:   { top: 0x7d5a3c, bottom: 0x39404a, kind: 'visitor' },
  farmB:   { top: 0x9a6f4a, bottom: 0x3e3a34, kind: 'visitor' },
  farmC:   { top: 0x60707e, bottom: 0x413c36, kind: 'visitor' },
  // School parties and the odd grandchild on a Saturday.
  guestA:  { top: 0xa8c6b4, bottom: 0x5b6a5e, kind: 'child' },
  guestB:  { top: 0xd0b06a, bottom: 0x565049, kind: 'child' },
};

const FIELD = ['fieldA', 'fieldB', 'fieldC'];
const INDOOR = ['labA', 'labB'];
const FARM = ['farmA', 'farmB', 'farmC'];
const GUESTS = ['guestA', 'guestB'];

/**
 * Map a roster role to an outfit key.
 *
 * A named lead gets the overcoat, and which overcoat depends on where they
 * work: a white coat on a plant breeder standing in a wheat plot is the wrong
 * person in the right game. Unnamed extras are mixed so a crowd is not uniform.
 */
export function roleToOutfit(role, rnd){
  const r = (role || '').toLowerCase();
  if(r.includes('guest') || r.includes('visitor') || r.includes('school')) return GUESTS[rnd(GUESTS.length)];
  if(r.includes('farmer') || r.includes('grower') || r.includes('merchant')) return FARM[rnd(FARM.length)];
  const outdoor = /breeder|agronom|field|trial|technician|glasshouse|harvest/.test(r);
  if(r.includes('assistant') || r.includes('technician')) return outdoor ? FIELD[rnd(FIELD.length)] : INDOOR[rnd(INDOOR.length)];
  if(r) return outdoor ? 'leadOut' : 'lead';
  const roll = rnd(100);
  if(roll < 40) return FIELD[rnd(FIELD.length)];
  if(roll < 68) return INDOOR[rnd(INDOOR.length)];
  if(roll < 90) return FARM[rnd(FARM.length)];
  return GUESTS[rnd(GUESTS.length)];
}
