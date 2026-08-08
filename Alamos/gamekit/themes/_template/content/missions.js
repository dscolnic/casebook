// missions.js — 15 sessions, 3 stops each. Generated from the design document;
// run engine/dev/validateContent.mjs after regenerating.
const stop = (group, lesson, task) => ({ group, lesson, task });

export const MISSIONS = Array.from({ length: 15 }, (_, i) => {
  const g = `G${(i % 6) + 1}`;
  return {
    title: `Session ${i + 1}`,
    objective: 'Replace with this session’s learning objective.',
    briefing: 'Replace with the one-line briefing.',
    takeaway: 'Session complete',
    stops: [
      stop(g, 0, 'First activity'),
      stop(g, 1, 'Second activity'),
      stop(g, 2, 'Third activity'),
    ],
  };
});
