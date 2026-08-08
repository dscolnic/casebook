// outfits.js — what the Riverton response wears.
//
// A contamination response has a visible uniform grammar and it is worth
// keeping: hi-vis for anyone working outdoors, lab coats indoors, plain command
// jackets at City Command, and ordinary clothes on the residents whose river
// this is. Reading a crowd by colour is how the player learns who to ask.

export const OUTFITS = {
  hiVisOrange: { top: 0xe06a2a, bottom: 0x39404a, kind: 'staff' },
  hiVisLime:   { top: 0xc9d94b, bottom: 0x39404a, kind: 'staff' },
  fieldTan:    { top: 0xa79070, bottom: 0x4a4a42, kind: 'staff' },
  labCoat:     { top: 0xf1f1ec, bottom: 0x3c4450, kind: 'lead', coat: 0xf4f3ee },
  command:     { top: 0x2c3e50, bottom: 0x232c36, kind: 'lead', coat: 0x35485c },
  utility:     { top: 0x2f7a6b, bottom: 0x37424a, kind: 'staff' },
  street1:     { top: 0xc4705f, bottom: 0x3a3f47, kind: 'visitor' },
  street2:     { top: 0x6f7f96, bottom: 0x44403c, kind: 'visitor' },
  street3:     { top: 0xd0b06a, bottom: 0x3e4a45, kind: 'visitor' },
  street4:     { top: 0x7c6f92, bottom: 0x33383f, kind: 'visitor' },
};

const FIELD = ['hiVisOrange', 'hiVisLime', 'fieldTan'];
const RESIDENTS = ['street1', 'street2', 'street3', 'street4'];

/**
 * Roster role -> outfit. The roles come from content/roster.js, and the four
 * character functions the design book defines map cleanly onto four looks.
 *
 * Unnamed extras get a mix, weighted toward field crews: this is an active
 * incident, so the street should not look like an ordinary Tuesday.
 */
export function roleToOutfit(role, rnd){
  const r = (role || '').toLowerCase();
  if(/resident|association|public|briefing|health desk/.test(r)) return RESIDENTS[rnd(RESIDENTS.length)];
  if(/command|coordinator|director|chief|officer/.test(r)) return 'command';
  if(/lead|chemist|analyst|metrologist|technician|reviewer|librar|standards|clerk/.test(r)) return 'labCoat';
  if(/engineer|maintenance|utility|monitoring/.test(r)) return 'utility';
  if(r) return FIELD[rnd(FIELD.length)];

  const roll = rnd(100);
  if(roll < 46) return FIELD[rnd(FIELD.length)];
  if(roll < 66) return 'labCoat';
  if(roll < 78) return 'utility';
  return RESIDENTS[rnd(RESIDENTS.length)];
}
