// outfits.js — what people wear at forty below.
//
// Everybody on this station is dressed for outside, all the time, because the
// walk between two modules is outside. So every outfit here carries three
// things the other games' crowds do not:
//
//   · `overcoat: true` — the parka shell, which the rig draws as a bulkier
//     torso over the base layer. It is the silhouette that says polar.
//   · `cap: true` — the hood, up. It replaces the hair, which is correct:
//     nobody on a plateau is bare-headed outdoors.
//   · `badge: false` — a lanyard over a parka is a lanyard nobody can see, and
//     it is the one fitting that reads as an office.
//
// The colours are the real ones. Field clothing is issued in high-visibility
// red and orange because a person who is fifty metres away in blowing snow has
// to be findable, and every station's kit looks like this for that reason.
//
// kind drives proportions: 'staff' and 'lead' are the same rig here, since
// nobody's job changes what they wear on a traverse.

// `overcoat` draws the shell and takes the sleeves to the wrist with a mitt on
// the end; `cap` is the hood, up; `badge` off, because a lanyard over a parka is
// the one fitting that reads as an office. `shoe` is a heavy insulated boot,
// which is the other thing a t-shirted rig gets wrong.
const PARKA = { kind: 'staff', overcoat: true, cap: true, badge: false, shoe: 0x24282d };

export const OUTFITS = {
  // Issued field kit: red parka over black windpants, which is most of the camp.
  fieldRed:    { ...PARKA, top: 0x39414a, bottom: 0x2b3037, coat: 0xc4492e },
  fieldOrange: { ...PARKA, top: 0x39414a, bottom: 0x2b3037, coat: 0xd4782c },
  // The drill crew wear their own, because they are in the trench all day and
  // the trench is out of the wind and full of fluid.
  drillBlue:   { ...PARKA, top: 0x39414a, bottom: 0x2b3037, coat: 0x3a76ad },
  drillGrey:   { ...PARKA, top: 0x39414a, bottom: 0x2b3037, coat: 0x8b959f },
  // The leads' parkas are the same issue with a different year's colour on them.
  lead:        { ...PARKA, kind: 'lead', top: 0x39414a, bottom: 0x2b3037, coat: 0xc4492e },
  leadYellow:  { ...PARKA, kind: 'lead', top: 0x39414a, bottom: 0x2b3037, coat: 0xd8b436 },
  // Inside the modules people are in a fleece and nothing else, and the two
  // laboratory technicians spend the day at minus twenty-five in the cold room,
  // where the parka goes back on.
  indoorTeal:  { kind: 'staff', top: 0x2f7f77, bottom: 0x2a3038, badge: false, sleeve: 0.95, shoe: 0x24282d },
  indoorPlum:  { kind: 'staff', top: 0x6f4f7f, bottom: 0x2a3038, badge: false, sleeve: 0.95, shoe: 0x24282d },
};

const FIELD = ['fieldRed', 'fieldOrange', 'drillBlue', 'drillGrey'];
const INDOOR = ['indoorTeal', 'indoorPlum'];

/**
 * Map a roster role to an outfit.
 *
 * Named people get a lead parka; assistants and technicians get issued field
 * kit; the unnamed extras are mostly field kit with a few in fleeces, because
 * somebody is always crossing between two modules without dressing properly and
 * a crowd where everybody is identically wrapped reads as uniform.
 */
export function roleToOutfit(role, rnd){
  const r = (role || '').toLowerCase();
  if(r.includes('drill')) return rnd(2) ? 'drillBlue' : 'drillGrey';
  if(r.includes('assistant') || r.includes('technician')) return FIELD[rnd(FIELD.length)];
  if(r) return rnd(3) ? 'lead' : 'leadYellow';
  const roll = rnd(100);
  if(roll < 78) return FIELD[rnd(FIELD.length)];
  return INDOOR[rnd(INDOOR.length)];
}
