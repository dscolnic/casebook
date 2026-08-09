// outfits.js — what the crew wear.
//
// A submarine crew is in coveralls. What separates them is the department they
// belong to, so the colour is the area's colour and the cut does not change —
// which is also true of the real thing.
export const OUTFITS = {
  sonar:    { top: 0x2f8f8f, bottom: 0x2b3238, kind: 'coverall' },
  nav:      { top: 0x3f7fb6, bottom: 0x2b3238, kind: 'coverall' },
  damage:   { top: 0x6a8a4a, bottom: 0x2b3238, kind: 'coverall' },
  electric: { top: 0xb0a03a, bottom: 0x2b3238, kind: 'coverall' },
  air:      { top: 0x6a5fb0, bottom: 0x2b3238, kind: 'coverall' },
  engine:   { top: 0xb0533a, bottom: 0x2b3238, kind: 'coverall' },
  officer:  { top: 0x1e2a33, bottom: 0x1e2a33, kind: 'officer' },
  crew:     { top: 0x4a5b63, bottom: 0x2b3238, kind: 'coverall' },
};

/** Role text -> outfit. Officers are the only ones who dress differently. */
export function roleToOutfit(role = ''){
  const r = role.toLowerCase();
  if(/captain|executive|officer of the deck|navigator|engineer officer/.test(r)) return 'officer';
  if(/sonar/.test(r)) return 'sonar';
  if(/quartermaster|navigation/.test(r)) return 'nav';
  if(/damage|hull|auxiliary/.test(r)) return 'damage';
  if(/electric|power/.test(r)) return 'electric';
  if(/atmosphere|air|corpsman|medical/.test(r)) return 'air';
  if(/machinist|propulsion|engine/.test(r)) return 'engine';
  return 'crew';
}
