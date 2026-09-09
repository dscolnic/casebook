// fixtures.js — the objects the questions are about, for Changeover.
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
  COUNTER: [
    { id: 'queue-board', name: 'Queue lengths', build: 'board', wall: 'back', along: 0,
      caption: "Queue lengths, failed payments, and the chalk marks Eli refuses to erase." },
    { id: 'allocation-slate', name: 'allocation slate', build: 'board', wall: 'left', along: 0,
      caption: "A day's scarce counter hours divided among cash, wages, and household claims." },
    { id: 'wage-notice-rail', name: 'Current wage cards', build: 'rack', wall: 'right', along: 0,
      caption: "Current wage cards, labor notices, and the definitions clerks reach for during an argument." },
    { id: 'live-economy-panel', name: 'The latest output', build: 'board', wall: 'back', along: -0.45,
      caption: "The latest output, unemployment, inflation, and payment readings under one stubborn clock." },
    { id: 'conversion-desk', name: 'conversion desk', build: 'bench', wall: 'left', along: -0.45,
      caption: "The Rate Book lies open beside the conversion seal and the last unsigned page." },
  ],
  NOTES: [
    { id: 'note-scale', name: 'A brass balance for old notes', build: 'vessel', wall: 'back', along: 0,
      caption: "A brass balance for old notes, new crowns, and sacks that never arrive at the weight claimed." },
    { id: 'conversion-trays', name: 'Numbered trays holding returned notes', build: 'rack', wall: 'left', along: 0,
      caption: "Numbered trays holding returned notes, issued crowns, and the custody slips between them." },
    { id: 'custody-desk', name: 'A scarred desk with sack tallies', build: 'bench', wall: 'right', along: 0,
      caption: "A scarred desk with sack tallies, counterfoils, and two keys held by different clerks." },
    { id: 'return-chute', name: 'return chute', build: 'vessel', wall: 'back', along: -0.45,
      caption: "The locked mouth where retired notes drop into custody one sealed bundle at a time." },
  ],
  // Keyed by the ROOM GROUP, which is what the tower builds fixtures for. The
  // generator wrote STATFLOO / OPENFLOO from the bible's place names and no room
  // has either id, so these nine fixtures were never built anywhere.
  STATS: [
    { id: 'output-ledger', name: 'Production accounts', build: 'board', wall: 'back', along: 0,
      caption: "Production accounts, exclusions, and the expenditure columns that must close to one total." },
    { id: 'calculating-desk', name: 'Pencils', build: 'bench', wall: 'left', along: 0,
      caption: "Pencils, adding machines, and worksheets crowded with multipliers and output gaps." },
    { id: 'basket-table', name: 'The fixed household basket', build: 'bench', wall: 'right', along: 0,
      caption: "The fixed household basket, its price tags, and the replacement list families keep disputing." },
    { id: 'ad-as-wall', name: 'ad as wall', build: 'board', wall: 'back', along: -0.45,
      caption: "Aggregate-demand and aggregate-supply tracks with today's shocks pinned in red." },
    { id: 'price-history-board', name: 'Index levels', build: 'board', wall: 'left', along: -0.45,
      caption: "Index levels, inflation prints, and every revision preserved beside the original release." },
  ],
  BANKS: [
    { id: 'reserve-clock', name: 'reserve clock', build: 'board', wall: 'back', along: 0,
      caption: "Required and actual reserves advance on separate hands; excess appears only when both settle." },
    { id: 'balance-sheet-desk', name: 'Deposits', build: 'bench', wall: 'left', along: 0,
      caption: "Deposits, loans, securities, and reserves arranged so no bank can hide the other side." },
    { id: 'bond-panel', name: 'bond panel', build: 'board', wall: 'right', along: 0,
      caption: "Bond prices and interest rates move on linked rails in opposite directions." },
    { id: 'money-market-console', name: 'Money supply', build: 'vessel', wall: 'back', along: -0.45,
      caption: "Money supply, money demand, and the clearing rate glow above the supervision switches." },
  ],
  OPENEC: [
    { id: 'payment-wires', name: 'payment wires', build: 'board', wall: 'back', along: 0,
      caption: "Current- and financial-account entries run along paired wires toward the same balance." },
    { id: 'forex-console', name: 'forex console', build: 'vessel', wall: 'left', along: 0,
      caption: "Demand and supply for RATE move the exchange marker while import and export tickets update." },
    { id: 'trade-ledger', name: 'Exports', build: 'bench', wall: 'right', along: 0,
      caption: "Exports, imports, income flows, and transfers wait in columns that must net correctly." },
    { id: 'shipment-board', name: 'shipment board', build: 'board', wall: 'back', along: -0.45,
      caption: "Outbound orders and landed imports share a board with the currency price each contract used." },
  ],
  RATE: [
    { id: 'policy-wall', name: 'policy wall', build: 'board', wall: 'back', along: 0,
      caption: "Fiscal and monetary levers are posted beside the channels each one is expected to move." },
    { id: 'signing-desk', name: 'The Rate Book', build: 'bench', wall: 'left', along: 0,
      caption: "The Rate Book, the Board seal, and a blank line that Mara will not sign without conditions." },
    { id: 'gap-calculator', name: 'gap calculator', build: 'vessel', wall: 'right', along: 0,
      caption: "Actual and full-employment output feed a brass dial marked recessionary and inflationary." },
    { id: 'threshold-rail', name: 'Output', build: 'rack', wall: 'back', along: -0.45,
      caption: "Output, payment, and CPI trigger cards lock into place before any policy order can fire." },
    { id: 'forecast-table', name: 'Domestic', build: 'bench', wall: 'left', along: -0.45,
      caption: "Domestic, banking, trade, and long-run forecasts overlap beneath a sheet of tracing glass." },
  ],
};
