// outfits.js — what people wear. The rig is engine-level; only this changes.
//
// Everybody past the gown room is in the same white coverall, hood and
// overshoes, which is the point of the place: on this floor you are told apart
// by the colour of your badge tab and by where you are standing. The leads
// carry the overcoat shell so a player can pick a lead out of a bay at ten
// metres, and the visitors — contractors, the customer's engineer — are the
// only people on the floor wearing anything of their own.
//
// kind drives proportions and accessories:
//   'staff'   badge on a lanyard, optional cap
//   'lead'    as staff, plus an overcoat shell
//   'child'   genuinely smaller rig, no badge
//   'visitor' street clothes, no badge

export const OUTFITS = {
  // Three coveralls that are almost the same white. Almost, because a crowd of
  // one exact colour reads as a rendering fault rather than as a uniform.
  gownA:   { top: 0xe8e6dd, bottom: 0xe2e0d6, kind: 'staff' },
  gownB:   { top: 0xe4e3dc, bottom: 0xdcdbd2, kind: 'staff' },
  gownC:   { top: 0xdedcd2, bottom: 0xd6d4ca, kind: 'staff' },
  // A lead is the same suit with the bay coat over it.
  lead:    { top: 0xe6e4db, bottom: 0xdedcd2, kind: 'lead', coat: 0xf3f1e8 },
  // Contractors in the grey side and at the gas farm: their own clothes, and a
  // hi-vis over them.
  street1: { top: 0xc98a2f, bottom: 0x3c4149, kind: 'visitor' },
  street2: { top: 0x6f7f96, bottom: 0x3a3a36, kind: 'visitor' },
  street3: { top: 0x8d6a4a, bottom: 0x40474d, kind: 'visitor' },
  street4: { top: 0x5f7a6a, bottom: 0x333840, kind: 'visitor' },
};

const GOWNED = ['gownA', 'gownB', 'gownC'];
const VISITORS = ['street1', 'street2', 'street3', 'street4'];

/**
 * Map a roster role to an outfit key. Named leads get the coat; contractors and
 * anyone visiting keep their own clothes; everybody else is gowned, because
 * everybody else works here.
 */
export function roleToOutfit(role, rnd){
  const r = (role || '').toLowerCase();
  if(r.includes('contractor') || r.includes('visitor') || r.includes('customer')) {
    return VISITORS[rnd(VISITORS.length)];
  }
  if(r.includes('technician') || r.includes('operator') || r.includes('supervisor')) {
    return GOWNED[rnd(GOWNED.length)];
  }
  if(r) return 'lead';
  // Unnamed extras: mostly gowned staff, with the occasional contractor.
  return rnd(100) < 84 ? GOWNED[rnd(GOWNED.length)] : VISITORS[rnd(VISITORS.length)];
}
