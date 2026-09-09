// fixtures.js — the objects the questions are about, for Carrying Capacity.
//
// GENERATED from the campaign bible by tools/build-fixtures.mjs. Every id, place,
// kind and caption is the bible's; `wall` and `along` are this file's, because
// they are about the room rather than the object. Look at them with
// `npm run shots` before believing the arrangement — see gamekit/INTERIORS.md.
//
//   build:  'vessel' | 'rack' | 'bench' | 'board'
//   wall:   'left' | 'right' | 'back'
//   along:  -1 … 1 along that wall. 0 is the middle.
export const FIXTURES = {
  HARB: [
    { id: 'landings-book', name: 'Salt-curled pages list each boat', build: 'board', wall: 'back', along: 0,
      caption: "Salt-curled pages list each boat, crew-day, catch mass, and the blank lines no one wants to explain." },
    { id: 'fee-desk', name: 'Permit stamps', build: 'bench', wall: 'left', along: 0,
      caption: "Permit stamps, fee slips, and Tomas's brass tally weight sit on a counter polished by wet sleeves." },
    { id: 'tide-board', name: 'Tide times', build: 'board', wall: 'right', along: 0,
      caption: "Tide times, berth arrivals, and a week's weather marks run beneath a strip of red pencil." },
  ],
  WATER: [
    { id: 'rain-bench', name: 'Rain cards', build: 'bench', wall: 'back', along: 0,
      caption: "Rain cards, catchment sheets, and a ruler stained at the dry-year line cover the calculation surface." },
    { id: 'store-gauges', name: 'Aquifer head', build: 'board', wall: 'left', along: 0,
      caption: "Aquifer head, tank volume, chloride, and nitrate needles share one panel under Nkemdi's dated marks." },
    { id: 'sampler', name: 'Sealed bottles', build: 'rack', wall: 'right', along: 0,
      caption: "Sealed bottles, duplicate labels, and the independent chain-of-custody case wait above the sampling tap." },
    { id: 'load-board', name: 'load board', build: 'board', wall: 'back', along: -0.45,
      caption: "Every protected circuit is listed beside its kilowatts, reserve priority, and last tested date." },
    { id: 'pipe-balance', name: 'pipe balance', build: 'bench', wall: 'left', along: -0.45,
      caption: "A brass pipe model carries movable demand tags from the spring to every island tap." },
  ],
  COMMON: [
    { id: 'common-map', name: 'Field boundaries', build: 'board', wall: 'back', along: 0,
      caption: "Field boundaries, habitat strips, homes, and water routes crowd a map repaired with old survey tape." },
    { id: 'soil-bench', name: 'Soil cores', build: 'bench', wall: 'left', along: 0,
      caption: "Soil cores, recovery cards, and a tray of roots sit under a lamp the farmers leave on late." },
    { id: 'nitrogen-bench', name: 'Fertilizer sacks', build: 'bench', wall: 'right', along: 0,
      caption: "Fertilizer sacks, runoff jars, and Iona's application ledger share a scarred worktop." },
    { id: 'delivery-board', name: 'Water', build: 'board', wall: 'back', along: -0.45,
      caption: "Water, food, power, waste, and visitor conditions converge here in columns awaiting the council seal." },
    { id: 'pack-table', name: 'The council pack', build: 'bench', wall: 'right', along: -0.45,
      caption: "Fifteen days of readings, drafts and struck-out claims lie in order on the table the pack is assembled on." },
  ],
  REEF: [
    { id: 'transect-bench', name: 'Quadrat sheets', build: 'bench', wall: 'back', along: 0,
      caption: "Quadrat sheets, survivorship plots, shell fragments, and nursery flags dry beside the field microscope." },
    { id: 'flow-tank', name: 'A clear channel with heat', build: 'vessel', wall: 'left', along: 0,
      caption: "A clear channel with heat, nutrient, and rinse controls circulates seawater past marked test tiles." },
    { id: 'water-rack', name: 'Reef bottles', build: 'rack', wall: 'right', along: 0,
      caption: "Reef bottles, calibration standards, and quarantine rinse cards stand in date order behind glass." },
  ],
  TIP: [
    { id: 'weighbridge', name: 'The deck scale faces bins painted for organics', build: 'vessel', wall: 'back', along: 0,
      caption: "The deck scale faces bins painted for organics, metals, glass, hazardous waste, and everything mis-sorted." },
    { id: 'leachate-bench', name: 'Dark sample jars', build: 'bench', wall: 'left', along: 0,
      caption: "Dark sample jars, liner sections, and arrows from rain to ditch cover the yard's wash-down table." },
    { id: 'gas-rack', name: 'Methane meters', build: 'rack', wall: 'right', along: 0,
      caption: "Methane meters, sealed collection bags, and leak tags hang beside the collector manifold." },
    { id: 'windrow-panel', name: 'Temperature', build: 'board', wall: 'back', along: -0.45,
      caption: "Temperature, moisture, turning dates, and oxygen marks trace each compost row from waste to soil." },
    // `lab-bench`, not `tip-lab-bench`: days 8 and 13 point their `at:` here by
    // that id, and a stop pointed at a fixture the area does not declare lands
    // the player back at the stand with no sign the placement was dropped.
    { id: 'tip-lab-bench', name: 'Pollutant cards', build: 'bench', wall: 'left', along: -0.45,
      caption: "Pollutant cards, alarm logs, fuel samples, and a hood-scorched notebook occupy the small yard laboratory." },
  ],
  SCHOOL: [
    { id: 'register-desk', name: 'Class rolls', build: 'bench', wall: 'back', along: 0,
      caption: "Class rolls, household counts, visitor weeks, and age bands fill a desk built for smaller hands." },
    { id: 'school-tap', name: 'school tap', build: 'vessel', wall: 'left', along: 0,
      caption: "The garden and kitchen lines meet at a labelled tap with a bottle cradle and child-height warning mark." },
    { id: 'health-board', name: 'Dose limits', build: 'board', wall: 'right', along: 0,
      caption: "Dose limits, action levels, and the nurse's latest notices face the queue outside the dining room." },
  ],
  POWER: [
    { id: 'meter-board', name: 'Live demand', build: 'board', wall: 'back', along: 0,
      caption: "Live demand, peak load, and reserve margin glow above switches tagged for every protected service." },
    { id: 'turbine-plate', name: 'Rated output', build: 'board', wall: 'left', along: 0,
      caption: "Rated output, commissioning date, and the manufacturer's wind curve are riveted to the tower base." },
    { id: 'gearbox-crate', name: 'gearbox crate', build: 'rack', wall: 'right', along: 0,
      caption: "A strapped replacement gearbox bears shipping papers, fitting notes, and one completion date written in pencil." },
    { id: 'fuel-bench', name: 'Fuel dockets', build: 'bench', wall: 'left', along: -0.45,
      caption: "Fuel dockets, engine hours, and the heat-loss survey cover the bench where the sets' fuel is signed for." },
  ],
  BERTH: [
    { id: 'berth-standpipe', name: 'A salt-streaked wash line', build: 'vessel', wall: 'back', along: 0,
      caption: "A salt-streaked wash line, flow meter, and shutoff lever stand where arriving decks are rinsed." },
    { id: 'quarantine-rack', name: 'Cargo tags', build: 'rack', wall: 'left', along: 0,
      caption: "Cargo tags, inspection trays, boot brushes, and sealed specimen bags wait before the island gate." },
    { id: 'cargo-table', name: 'cargo table', build: 'bench', wall: 'right', along: 0,
      caption: "Manifests lie beneath lamps bright enough to show seeds, soil, insects, and missing declarations." },
  ],
  CHAPEL: [
    { id: 'council-table', name: 'council table', build: 'bench', wall: 'back', along: 0,
      caption: "The island ledgers meet on one long table beneath a gavel, a tide clock, and nine empty signature lines." },
    { id: 'condition-board', name: 'Proposed caps', build: 'board', wall: 'left', along: 0,
      caption: "Proposed caps, triggers, owners, and responses remain visible until each condition can be enforced." },
    { id: 'vote-rail', name: 'vote rail', build: 'rack', wall: 'right', along: 0,
      caption: "Sealed evidence folders and the final recommendation wait behind the councillors' chairs." },
  ],
};
