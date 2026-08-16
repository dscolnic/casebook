// outfits.js — what people wear on a campus in its third week of an outbreak.
// The rig is engine-level; only this changes.
//
// kind drives proportions and accessories:
//   'staff'   badge on a lanyard, optional cap
//   'lead'    as staff, plus an overcoat shell (lab coat, hi-vis, uniform jacket)
//   'child'   genuinely smaller rig, no badge
//   'visitor' street clothes, no badge
//
// PPE fields are read by engine/people/rig.js `ppeParts` and are worn by both
// the articulated rig and the merged extras:
//   hood    suit hood over the whole head; suppresses hair and cap
//   visor   face shield across the front of it
//   mask / filter   over nose and mouth; the canister makes it a respirator
//   sleeve: 1       full sleeve with a glove on the end, which is what a suit is
//
// Almost nobody inside this fence has a bare face. That is the point of the
// game and it has to be the first thing the player sees, so the extras are
// weighted hard toward protection and the street clothes only appear at the
// press pen and the queue outside the gate.

const BOOT = 0x2b3238;
const SHIELD = 0x37474f;

export const OUTFITS = {
  // ---- clinical staff, masked
  uniformA: { top: 0x3f8f8a, bottom: 0x357b77, kind: 'staff', mask: 0xeef1f2, cap: true },
  uniformB: { top: 0x374a63, bottom: 0x2f4056, kind: 'staff', mask: 0xeef1f2 },
  uniformC: { top: 0x5d6a70, bottom: 0x515c62, kind: 'staff', mask: 0xdfe6e8, cap: true },
  // `kind: 'lead'` alone promises a coat and delivers nothing — the rig reads
  // `overcoat`, and every theme in the repo has quietly shipped its leads in
  // shirtsleeves for want of this one field.
  lead:     { top: 0x59606b, bottom: 0x3c4450, kind: 'lead', overcoat: true, coat: 0xf1f1ec, mask: 0xeef1f2 },

  // ---- full suits. Tyvek white is the ward and the labs; yellow is the decon
  // crew on the spine; orange is waste and the reefer line; blue is the
  // sampling tents in the north court.
  suitWhite: { top: 0xe6e3da, bottom: 0xe6e3da, kind: 'staff', badge: false,
    hood: 0xe6e3da, visor: SHIELD, mask: 0xf2f4f4, filter: 0x9aa3a8,
    sleeve: 1, shoe: BOOT },
  suitYellow: { top: 0xd6b524, bottom: 0xd6b524, kind: 'staff', badge: false,
    hood: 0xd6b524, visor: SHIELD, mask: 0xf2f4f4, filter: 0x8f979b,
    sleeve: 1, shoe: BOOT },
  suitOrange: { top: 0xcf6a2a, bottom: 0xcf6a2a, kind: 'staff', badge: false,
    hood: 0xcf6a2a, visor: SHIELD, mask: 0xf2f4f4, filter: 0x8f979b,
    sleeve: 1, shoe: BOOT },
  suitBlue: { top: 0x6f9ec6, bottom: 0x6f9ec6, kind: 'staff', badge: false,
    hood: 0x6f9ec6, visor: SHIELD, mask: 0xf2f4f4, sleeve: 1, shoe: BOOT },

  // ---- gown, gloves and a face shield: what a ward round wears when the suit
  // is not warranted. No hood, so the shield is over an ordinary head.
  gownBlue: { top: 0x4c7fa4, bottom: 0x30465a, kind: 'lead', overcoat: true, coat: 0x9dc3d6,
    visor: SHIELD, mask: 0xf2f4f4, sleeve: 1, shoe: BOOT },
  gownGreen: { top: 0x3f7a63, bottom: 0x2f4c42, kind: 'lead', overcoat: true, coat: 0xa9cdb9,
    visor: SHIELD, mask: 0xf2f4f4, sleeve: 1, shoe: BOOT },

  // ---- ambulance crew, in hi-vis over greens
  medic: { top: 0x2f5a3a, bottom: 0x24402d, kind: 'lead', overcoat: true, coat: 0xd7e04a,
    mask: 0xf2f4f4, shoe: BOOT },

  // ---- outside the fence
  street1:  { top: 0xc4705f, bottom: 0x3a3f47, kind: 'visitor', mask: 0xeef1f2 },
  street2:  { top: 0x6f7f96, bottom: 0x44403c, kind: 'visitor', mask: 0xdfe6e8 },
  street3:  { top: 0xd0b06a, bottom: 0x3e4a45, kind: 'visitor' },
  street4:  { top: 0x7c6f92, bottom: 0x33383f, kind: 'visitor', mask: 0xeef1f2 },
  guestA:   { top: 0x9fb8cc, bottom: 0x9fb8cc, kind: 'child', mask: 0xeef1f2 },
  guestB:   { top: 0xa8c6b4, bottom: 0xa8c6b4, kind: 'child' },
};

const SUITS = ['suitWhite', 'suitWhite', 'suitBlue', 'suitYellow', 'suitOrange'];
const GOWNS = ['gownBlue', 'gownGreen'];
const STAFF = ['uniformA', 'uniformB', 'uniformC'];
const VISITORS = ['street1', 'street2', 'street3', 'street4'];
const GUESTS = ['guestA', 'guestB'];

/**
 * Map a roster role to an outfit key. Named leads get the overcoat; anyone
 * whose role mentions the guest word gets the smaller rig; unnamed extras are
 * mostly in protection, because a campus where two thirds of the crowd is in
 * a suit is the whole situation stated without a word of text.
 */
export function roleToOutfit(role, rnd){
  const r = (role || '').toLowerCase();
  if(r.includes('guest') || r.includes('visitor') || r.includes('patient')) return GUESTS[rnd(GUESTS.length)];
  // The people who work inside the isolation ward and the diagnostic labs are
  // suited whatever their seniority; everybody else leads in a gown.
  if(r.includes('critical care') || r.includes('molecular') || r.includes('immunolog')) return 'suitWhite';
  if(r.includes('veterinarian') || r.includes('field epidem')) return 'suitBlue';
  if(r.includes('assistant') || r.includes('technician')) return STAFF[rnd(STAFF.length)];
  if(r) return GOWNS[rnd(GOWNS.length)];
  const roll = rnd(100);
  if(roll < 46) return SUITS[rnd(SUITS.length)];
  if(roll < 64) return GOWNS[rnd(GOWNS.length)];
  if(roll < 76) return 'medic';
  if(roll < 90) return STAFF[rnd(STAFF.length)];
  if(roll < 97) return VISITORS[rnd(VISITORS.length)];
  return GUESTS[rnd(GUESTS.length)];
}
