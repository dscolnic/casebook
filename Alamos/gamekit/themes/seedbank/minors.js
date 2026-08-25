// minors.js — the places that are not areas, and what is inside them.
//
// Five rooms with no case stand, no beacon and no delivery board. All five were
// facades: modelled, glazed, lit, walkable up to and shut, because in this engine
// an interior is keyed by an area and none of these is an area. Two of them —
// the records office and the threshing floor — were also standing eight metres
// out over the cliff, which is in site.js.
//
// A minor room is somewhere to STAND and READ. Nothing is *called* here: no group
// owns it, no milestone advances in it. What four of them do carry is a question
// SITED there — a lesson whose `at:` points at a fixture declared under this
// key — so the room is somewhere the day actually sends you rather than a door
// with a panel behind it.
//
// What a panel here owes the player is something the station's own numbers do
// not say: what the glass is for, what the passport records disagree with the
// markers about, how much of this year's harvest is still open to the wind.
//
// These are hand-written and merged over the generated `interiors.js` in
// theme.js. `import-book.mjs` never writes this file. See gamekit/PLACEMENT_PASS.md.
export const MINOR_INTERIORS = {
  GH1: {
    caption: 'The warm bay. Two generations a year in here against one outside, which is the only way a cross made this spring is a line before 2029.',
    standLine: 'Everything on these benches is a cross somebody could not wait a season for.',
    station: { kind: 'panel', title: 'Warm bay', rows: [
      { label: 'Day temperature', value: '22 °C', status: 'normal' },
      { label: 'Night temperature', value: '16 °C', status: 'normal' },
      { label: 'Generations a year', value: 2, status: 'high' },
      { label: 'F2 plants on the benches', value: 400, status: 'normal' },
    ] },
  },
  GH2: {
    caption: 'The cool bay. Winter wheat will not flower until it has had a winter, so the ones that missed it get one in here.',
    standLine: 'Eight weeks at four degrees, and then they behave as though it is March.',
    station: { kind: 'panel', title: 'Cool bay', rows: [
      { label: 'Vernalisation temperature', value: '4 °C', status: 'normal' },
      { label: 'Weeks required', value: '6 to 8', status: 'normal' },
      { label: 'Trays in cold treatment', value: 34, status: 'normal' },
      { label: 'Out on schedule', value: '31 of 34', status: 'low' },
    ] },
  },
  GH3: {
    caption: 'The screening bay, and the reason it is at the end of the arc: there is live rust in here on purpose.',
    standLine: 'Nothing walks from this house to the crossing block without changing its boots.',
    station: { kind: 'panel', title: 'Screening bay', rows: [
      { label: 'Rust race in the nursery', value: 'the new one', status: 'alarm' },
      { label: 'Accessions inoculated', value: 50, status: 'normal' },
      { label: 'Scored clean so far', value: 2, status: 'high' },
      { label: 'Spore filter on the vents', value: 'in service', status: 'normal' },
    ] },
  },
  RECORDS: {
    caption: 'Where every accession says it came from: a village, a field, a year, and the name of whoever was handed it.',
    standLine: 'A gene bank sells one thing, which is knowing what is in the packet.',
    station: { kind: 'panel', title: 'Passport records', rows: [
      { label: 'Accessions on file', value: '41,000', status: 'normal' },
      { label: 'Genotyped against the file', value: 90, status: 'normal' },
      { label: 'File and plant disagree', value: '30 of 90', status: 'alarm' },
      { label: 'Labelling errors found', value: 0, status: 'normal' },
    ] },
  },
  THRESH: {
    caption: 'Harvest in, chaff out, and the one place on the Point where a bagged head and an open head look identical.',
    standLine: 'The cover is the whole of the record. Once it is off, nothing says who the father was.',
    station: { kind: 'panel', title: 'Threshing floor', rows: [
      { label: 'Bags waiting', value: '2 hours of them', status: 'high' },
      { label: 'Store closes', value: '17:00', status: 'high' },
      { label: 'Bagged heads', value: 'selfed, father known', status: 'normal' },
      { label: 'Open heads', value: 'whatever the wind brought', status: 'alarm' },
    ] },
  },
};

export default MINOR_INTERIORS;
