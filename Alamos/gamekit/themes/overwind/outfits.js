// outfits.js — what people wear. The rig is engine-level; only this changes.
//
// kind drives proportions and accessories:
//   'staff'   badge on a lanyard, optional cap
//   'lead'    as staff, plus an overcoat shell (lab coat, hi-vis, uniform jacket)
//   'child'   genuinely smaller rig, no badge
//   'visitor' street clothes, no badge

export const OUTFITS = {
  uniformA: { top: 0x3f8f8a, bottom: 0x357b77, kind: 'staff' },
  uniformB: { top: 0x374a63, bottom: 0x2f4056, kind: 'staff' },
  uniformC: { top: 0x5d6a70, bottom: 0x515c62, kind: 'staff' },
  lead:     { top: 0x59606b, bottom: 0x3c4450, kind: 'lead', coat: 0xf1f1ec },
  guestA:   { top: 0x9fb8cc, bottom: 0x9fb8cc, kind: 'child' },
  guestB:   { top: 0xa8c6b4, bottom: 0xa8c6b4, kind: 'child' },
  street1:  { top: 0xc4705f, bottom: 0x3a3f47, kind: 'visitor' },
  street2:  { top: 0x6f7f96, bottom: 0x44403c, kind: 'visitor' },
  street3:  { top: 0xd0b06a, bottom: 0x3e4a45, kind: 'visitor' },
  street4:  { top: 0x7c6f92, bottom: 0x33383f, kind: 'visitor' },
};

const STAFF = ['uniformA', 'uniformB', 'uniformC'];
const VISITORS = ['street1', 'street2', 'street3', 'street4'];
const GUESTS = ['guestA', 'guestB'];

/**
 * Map a roster role to an outfit key. Named leads get the overcoat; anyone
 * whose role mentions the guest word gets the smaller rig; unnamed extras are
 * a mix so a crowd is not uniform.
 */
export function roleToOutfit(role, rnd){
  const r = (role || '').toLowerCase();
  if(r.includes('guest') || r.includes('visitor') || r.includes('patient')) return GUESTS[rnd(GUESTS.length)];
  if(r.includes('assistant') || r.includes('technician')) return STAFF[rnd(STAFF.length)];
  if(r) return 'lead';
  const roll = rnd(100);
  if(roll < 42) return STAFF[rnd(STAFF.length)];
  if(roll < 71) return VISITORS[rnd(VISITORS.length)];
  return GUESTS[rnd(GUESTS.length)];
}
