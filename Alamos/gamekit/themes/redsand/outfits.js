// outfits.js — what people wear. The rig is engine-level; only this changes.
//
// Everybody outside on this station is in a suit, and a suit is white for the
// same reason everything else here is not: it is the only surface anybody gets
// to choose the temperature of. The trim colour is the trade — power, process,
// water, flight — because on a plain where every figure is the same shape at
// fifty metres, the stripe is how the crew tell each other apart.
//
// kind drives proportions and accessories:
//   'staff'   badge on a lanyard, optional cap
//   'lead'    as staff, plus an overcoat shell — here, the hard upper torso
//   'child'   genuinely smaller rig, no badge
//   'visitor' street clothes, no badge

export const OUTFITS = {
  // A suit, four ways. `hood`, `visor` and `pack` are the engine rig's own
  // protective equipment and they are what answers the obvious question about
  // this game: there is no dome over Arcadia Rise, because nobody builds one on
  // a planet at six millibars with no magnetic field. The modules are buried
  // pressure vessels, the tunnels between them are pressurised, the rovers are
  // pressurised, and everybody standing on the open ground is in a suit with
  // forty kilograms of air on their back.
  //
  // `sleeve: 1` takes the garment down the whole arm and puts a mitt on the end,
  // which is the difference between a suit and a boiler suit.
  suitPower:   { top: 0xdedad0, bottom: 0xd2cec4, kind: 'staff', sleeve: 1, badge: false,
                 hood: 0xe6e2d8, visor: 0x2a2f38, pack: 0x9aa1a8, shoe: 0x3f4650 },
  suitProcess: { top: 0xdedad0, bottom: 0xd2cec4, kind: 'staff', sleeve: 1, badge: false,
                 hood: 0xe6e2d8, visor: 0x2a2f38, pack: 0xa8968a, shoe: 0x3f4650 },
  suitWater:   { top: 0xd8d2c6, bottom: 0xccc6ba, kind: 'staff', sleeve: 1, badge: false,
                 hood: 0xe0dacc, visor: 0x2a2f38, pack: 0x9a8352, shoe: 0x3f4650 },
  suitCold:    { top: 0xdedad0, bottom: 0xd2cec4, kind: 'staff', sleeve: 1, badge: false,
                 hood: 0xe6e2d8, visor: 0x2a2f38, pack: 0x7f96b0, shoe: 0x3f4650 },
  // A lead outdoors: the same suit with the hard upper torso over it.
  lead:        { top: 0xd6d1c6, bottom: 0xcac4b8, kind: 'lead', sleeve: 1, badge: false,
                 coat: 0xefebe0, hood: 0xe6e2d8, visor: 0x23282f, pack: 0x8f9aa4, shoe: 0x3f4650 },
};

// No unsuited outfit exists in this theme on purpose. Every person the crowd
// places stands on the open ground outside a module, and one figure out there in
// a shirt is the whole illusion gone — the same failure as an extra in
// shirtsleeves beside a named person in a parka, which is why the merged rig
// learned to wear PPE in the first place.

const SUITS = ['suitPower', 'suitProcess', 'suitWater', 'suitCold'];

/**
 * Map a roster role to an outfit key.
 *
 * Named leads get the hard torso; technicians and operators get a suit in their
 * trade colour; anybody with no role at all is an unnamed extra, and those are
 * mostly suited because most of the work on this station is outside.
 */
export function roleToOutfit(role, rnd){
  const r = (role || '').toLowerCase();
  if(r.includes('power') || r.includes('electro')) return 'suitPower';
  if(r.includes('cryo') || r.includes('vehicle') || r.includes('fluid')) return 'suitCold';
  if(r.includes('regolith') || r.includes('water') || r.includes('drill') || r.includes('excav')) return 'suitWater';
  if(r.includes('technician') || r.includes('operator') || r.includes('assistant')) return SUITS[rnd(SUITS.length)];
  if(r) return 'lead';
  return SUITS[rnd(SUITS.length)];
}
