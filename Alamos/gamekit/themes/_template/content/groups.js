// groups.js — the six areas of study. One per mission destination room.
// `milestones` drive the progress meters; keep four unless the loop changes.
const milestones = () => ([
  { name: 'Build the notebook',   cost: 12, work: 9,  brief: 'Set up the vocabulary.' },
  { name: 'Connect the evidence', cost: 16, work: 12, brief: 'Link clues to causes.' },
  { name: 'Check it holds',       cost: 20, work: 15, brief: 'Show the pattern repeats.' },
  { name: 'Ready to hand over',   cost: 24, work: 18, brief: 'Summarise for the team.' },
]);

export const GROUPS = [
  { id: 'G1', code: 'G1', name: 'Area One',   color: '#c0392b', desc: 'Replace with the first topic.',  milestones: milestones() },
  { id: 'G2', code: 'G2', name: 'Area Two',   color: '#2980b9', desc: 'Replace with the second topic.', milestones: milestones() },
  { id: 'G3', code: 'G3', name: 'Area Three', color: '#27ae60', desc: 'Replace with the third topic.',  milestones: milestones() },
  { id: 'G4', code: 'G4', name: 'Area Four',  color: '#d35400', desc: 'Replace with the fourth topic.', milestones: milestones() },
  { id: 'G5', code: 'G5', name: 'Area Five',  color: '#16a085', desc: 'Replace with the fifth topic.',  milestones: milestones() },
  { id: 'G6', code: 'G6', name: 'Area Six',   color: '#2c3e50', desc: 'Replace with the sixth topic.',  milestones: milestones() },
];
