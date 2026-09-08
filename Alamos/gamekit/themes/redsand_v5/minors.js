// minors.js — the places that are not areas, and what is inside them.
//
// Seven rooms with no case stand, no beacon and no delivery board. Five of them
// were facades until the placement pass: modelled, lit, walkable up to and shut,
// because in this engine an interior is keyed by an area and none of these is an
// area. Two are new — the pad office, which is the door onto the ascent vehicle
// the whole fortnight is about, and the ice cut, which the questions have named
// since sol 6 and the map never had.
//
// A minor room is somewhere to STAND and READ. Nothing is called here and no
// question is asked here, so what it owes the player is a panel that tells them
// something the plant's own numbers do not: where the feed comes from, what the
// tanks are losing tonight, how much of the vehicle is full. It is the world
// answering a question the player is already carrying.
//
// These are hand-written and merged over the generated `interiors.js` in
// theme.js. `import-book.mjs` never writes this file. See gamekit/PLACEMENT_PASS.md.
export const MINOR_INTERIORS = {
  INTAKE: {
    caption: 'Six millibars of carbon dioxide, taken to twelve bar. Everything the plant makes starts here.',
    standLine: 'The compressors run whenever the array will carry them.',
    station: { kind: 'panel', title: 'Atmosphere intake', rows: [
      { label: 'Ambient pressure', value: '6.1 mbar', status: 'normal' },
      { label: 'Delivery pressure', value: '12.0 bar', status: 'normal' },
      { label: 'Carbon dioxide in', value: '95.3 %', status: 'normal' },
      { label: 'Dust filter Δp', value: '0.34 bar', status: 'high' },
    ] },
  },
  HAB: {
    caption: 'Six people, nineteen degrees, and a margin that every hour of reactor heat is taken out of.',
    standLine: 'The habitat is the load nobody is allowed to shed.',
    station: { kind: 'panel', title: 'Life support', rows: [
      { label: 'Cabin temperature', value: '19.0 °C', status: 'normal' },
      { label: 'Oxygen partial pressure', value: '21.1 kPa', status: 'normal' },
      { label: 'Thermal margin', value: '1.4 kW', status: 'low' },
      { label: 'Crew', value: '6', status: 'normal' },
    ] },
  },
  GARAGE: {
    caption: 'Two rovers, and everything that comes back in on them. Dust is dealt with here or it is dealt with everywhere.',
    standLine: 'A rover that is not on charge is a rover that is not going out.',
    station: { kind: 'panel', title: 'Vehicle bay', rows: [
      { label: 'Rover 1 charge', value: '88 %', status: 'normal' },
      { label: 'Rover 2 charge', value: '41 %', status: 'low' },
      { label: 'Drill hours since service', value: '190 h', status: 'high' },
      { label: 'Airlock cycles today', value: '4', status: 'normal' },
    ] },
  },
  ARRAY: {
    caption: 'Eighteen hundred square metres of panel, and every load on this plain runs off it.',
    standLine: 'What the field delivers is what the plant is allowed to want.',
    station: { kind: 'panel', title: 'Array field', rows: [
      { label: 'Optical depth', value: '2.4', status: 'alarm' },
      { label: 'Delivered today', value: '430 kWh', status: 'alarm' },
      { label: 'A clear sol', value: '2000 kWh', status: 'normal' },
      { label: 'Panels swept', value: '18 of 26 rows', status: 'low' },
    ] },
  },
  TANKS: {
    caption: 'Everything the plant has made, standing still and losing a little of itself every sol.',
    standLine: 'A kilogram boiled off is a kilogram never made.',
    station: { kind: 'panel', title: 'Tank farm', rows: [
      { label: 'Methane aboard', value: '3.9 t', status: 'low' },
      { label: 'Oxygen aboard', value: '14.2 t', status: 'low' },
      { label: 'Methane boil-off', value: '4 kg/sol', status: 'normal' },
      { label: 'Oxygen boil-off', value: '26 kg/sol', status: 'alarm' },
    ] },
  },
  PAD: {
    caption: 'The vehicle stands four hundred metres past the last module. Everything you have made is in it.',
    standLine: 'It leaves when Mars and Earth line up, and it leaves full or not at all.',
    station: { kind: 'panel', title: 'Ascent vehicle', rows: [
      { label: 'Methane required', value: '6.6 t', status: 'normal' },
      { label: 'Oxygen required', value: '23.0 t', status: 'normal' },
      { label: 'Loaded to date', value: '59 %', status: 'low' },
      { label: 'Window opens', value: 'in 195 sols', status: 'high' },
    ] },
  },
  HSTORE: {
    caption: 'Every kilogram the stacks made, weighed. Amps are a claim; this is the number.',
    standLine: 'A stack reports current. A tank fills in kilograms. They are not the same statement.',
    station: { kind: 'panel', title: 'Hydrogen store', rows: [
      { label: 'Delivered today', value: '546 g', status: 'low' },
      { label: 'Predicted from charge', value: '594 g', status: 'normal' },
      { label: 'Store pressure', value: '186 bar', status: 'normal' },
      { label: 'Days of reactor feed', value: '1.4', status: 'low' },
    ] },
  },
  SHOP: {
    caption: 'A furnace, a lathe, and the last spare charge on this planet waiting beside it.',
    standLine: 'Nickel oxide on alumina is not a catalyst. It becomes one in here or not at all.',
    station: { kind: 'panel', title: 'Machine shop', rows: [
      { label: 'Furnace', value: '400 °C', status: 'normal' },
      { label: 'Hydrogen flow', value: '2.0 L/min', status: 'normal' },
      { label: 'Charges in stores', value: '1', status: 'alarm' },
      { label: 'Crew time this sol', value: '3 h', status: 'normal' },
    ] },
  },
  BATT: {
    caption: 'What the array leaves behind. After sunset the whole plain runs off this room.',
    standLine: 'A storm does not stop the sun for one sol. It stops it for as many as it likes.',
    station: { kind: 'panel', title: 'Battery bank', rows: [
      { label: 'State of charge', value: '30 %', status: 'alarm' },
      { label: 'Capacity', value: '640 kWh', status: 'normal' },
      { label: 'Overnight draw', value: '210 kWh', status: 'high' },
      { label: 'Sols of reserve', value: '0.9', status: 'alarm' },
    ] },
  },
  ASSAY: {
    caption: 'Nothing goes across into the vehicle until it has been measured in here.',
    standLine: 'A batch is what the assay says it is, and not what the tally hoped.',
    station: { kind: 'panel', title: 'Assay bench', rows: [
      { label: 'Methane purity', value: '96.4 %', status: 'normal' },
      { label: 'Carbon monoxide', value: '0.9 %', status: 'alarm' },
      { label: 'Water', value: '18 ppm', status: 'normal' },
      { label: 'Batches signed this season', value: '11', status: 'normal' },
    ] },
  },
  CUT: {
    caption: 'Where the water is dug. The ground here was eight percent ice in the spring.',
    standLine: 'The plant runs on whatever this face gives up, and it is giving up less.',
    station: { kind: 'panel', title: 'Excavation face', rows: [
      { label: 'Ice by mass', value: '4.5 %', status: 'alarm' },
      { label: 'Depth of cut', value: '2.4 m', status: 'normal' },
      { label: 'Delivered this sol', value: '1.9 t regolith', status: 'low' },
      { label: 'Distance to plant', value: '300 m', status: 'normal' },
    ] },
  },
};
