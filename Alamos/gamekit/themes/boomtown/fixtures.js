// fixtures.js — the objects the questions are about, for Project Y.
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
  T: [
    { id: 'budget-desk', name: 'Budget Desk', build: 'board', wall: 'back', along: 0,
      caption: "The desk holds public budgets and the competing offers." },
    { id: 'town-map', name: 'Town Map', build: 'board', wall: 'left', along: 0,
      caption: "The map tracks town services and access constraints." },
    { id: 'hearing-table', name: 'Hearing Table', build: 'board', wall: 'right', along: 0,
      caption: "The table holds signed hearing records." },
    { id: 'public-notice-board', name: 'Public Notice Board', build: 'board', wall: 'back', along: -0.45,
      caption: "The board displays decisions and their named owners." },
  ],
  CM: [
    { id: 'cost-ledger-desk', name: 'Cost Ledger Desk', build: 'board', wall: 'back', along: 0,
      caption: "The desk holds invoices and production costs." },
    { id: 'kitchen-planning-table', name: 'Kitchen Planning Table', build: 'board', wall: 'left', along: 0,
      caption: "The table carries staffing and equipment plans." },
    { id: 'order-terminal', name: 'Order Terminal', build: 'board', wall: 'right', along: 0,
      caption: "The terminal tests order and staffing records." },
    { id: 'supplier-shelves', name: 'Supplier Shelves', build: 'board', wall: 'back', along: -0.45,
      caption: "The shelves hold supplier samples and current quotes." },
  ],
  E: [
    { id: 'dispatch-desk', name: 'Dispatch Desk', build: 'board', wall: 'back', along: 0,
      caption: "The desk carries original dispatch and capacity records." },
    { id: 'booking-terminal', name: 'Booking Terminal', build: 'board', wall: 'left', along: 0,
      caption: "The terminal runs archived booking trials." },
    { id: 'contract-table', name: 'Contract Table', build: 'board', wall: 'right', along: 0,
      caption: "The table holds access contracts and cost commitments." },
    { id: 'freight-wall-map', name: 'Freight Wall Map', build: 'board', wall: 'back', along: -0.45,
      caption: "The map displays the off-map freight network." },
  ],
  P: [
    { id: 'lease-desk', name: 'Lease Desk', build: 'board', wall: 'back', along: 0,
      caption: "The desk holds leases and unmatched applications." },
    { id: 'job-board', name: 'Job Board', build: 'board', wall: 'left', along: 0,
      caption: "The board lists wages and open jobs." },
    { id: 'survey-terminal', name: 'Survey Terminal', build: 'board', wall: 'right', along: 0,
      caption: "The terminal compares housing and labor records." },
    { id: 'meeting-table', name: 'Meeting Table', build: 'board', wall: 'back', along: -0.45,
      caption: "The table holds cooperative commitments." },
  ],
  X: [
    { id: 'water-record-desk', name: 'Water Record Desk', build: 'board', wall: 'back', along: 0,
      caption: "The desk holds measured water damage records." },
    { id: 'catchment-map', name: 'Catchment Map', build: 'board', wall: 'left', along: 0,
      caption: "The map links withdrawals and downstream effects." },
    { id: 'planning-terminal', name: 'Planning Terminal', build: 'board', wall: 'right', along: 0,
      caption: "The terminal tests water and freight plans." },
    { id: 'permit-counter', name: 'Permit Counter', build: 'board', wall: 'back', along: -0.45,
      caption: "The counter holds permits and reporting duties." },
  ],
};
