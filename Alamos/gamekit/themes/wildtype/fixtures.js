// fixtures.js — the objects the questions are about, for Wildtype.
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
  CLINIC: [
    { id: 'sample-bench', name: 'Sample Bench', build: 'bench', wall: 'back', along: 0,
      caption: "Sealed samples wait beside a microscope." },
    { id: 'care-board', name: 'Care Board', build: 'board', wall: 'left', along: 0,
      caption: "A wipe-clean board records each animal or plant under care." },
    { id: 'culture-rack', name: 'Culture Rack', build: 'rack', wall: 'right', along: 0,
      caption: "Closed cultures sit in labeled trays." },
  ],
  GROW: [
    { id: 'growth-bench', name: 'Growth Bench', build: 'bench', wall: 'back', along: 0,
      caption: "Potted dune plants sit beneath timed lamps." },
    { id: 'light-panel', name: 'Light Panel', build: 'rack', wall: 'left', along: 0,
      caption: "The lamp controls stand beside a printed flowering calendar." },
    { id: 'pond-tanks', name: 'Pond Tanks', build: 'vessel', wall: 'right', along: 0,
      caption: "Clear tanks hold small aquatic communities." },
  ],
  SEED: [
    { id: 'seed-table', name: 'Seed Table', build: 'bench', wall: 'back', along: 0,
      caption: "Seed packets lie beside their family records." },
    { id: 'family-board', name: 'Family Board', build: 'board', wall: 'left', along: 0,
      caption: "Parent and offspring records hang on a cork board." },
    { id: 'storage-rack', name: 'Storage Rack', build: 'rack', wall: 'right', along: 0,
      caption: "Sealed jars preserve separate seed families." },
  ],
  PLAN: [
    { id: 'release-board', name: 'Release Board', build: 'board', wall: 'back', along: 0,
      caption: "A map holds the proposed mainland planting sites." },
    { id: 'survey-table', name: 'Survey Table', build: 'bench', wall: 'right', along: 0,
      caption: "Field notebooks lie open beside a scale map." },
    { id: 'sample-cart', name: 'Sample Cart', build: 'rack', wall: 'left', along: 0,
      caption: "A wheeled rack carries sealed samples between rooms." },
  ],
  GENE: [
    { id: 'dna-bench', name: 'DNA Bench', build: 'bench', wall: 'left', along: 0,
      caption: "Sample tubes stand beside a printed sequence reader." },
    { id: 'gel-rig', name: 'Gel Rig', build: 'vessel', wall: 'right', along: 0,
      caption: "A covered gel tray separates labeled DNA fragments." },
    { id: 'records-board', name: 'Records Board', build: 'board', wall: 'back', along: 0,
      caption: "Sample histories link each test to its original organism." },
  ],
  MARSH: [
    { id: 'water-rack', name: 'Water Rack', build: 'rack', wall: 'left', along: 0,
      caption: "Water bottles hold samples from the shore pools." },
    { id: 'field-bench', name: 'Field Bench', build: 'bench', wall: 'back', along: 0,
      caption: "Plant trays and insect counts fill a weathered workbench." },
    { id: 'habitat-board', name: 'Habitat Board', build: 'board', wall: 'right', along: 0,
      caption: "A habitat map records flowers and feeding links." },
  ],
};
