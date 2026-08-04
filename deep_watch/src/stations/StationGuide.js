/**
 * StationGuide — the plain-language strip that sits at the top of a console.
 *
 * A real watchstander arrives at these stations already trained. The player has
 * not been, and a wall of live numbers with no explanation teaches nothing. So
 * every station says three things, in this order and in this much space:
 *
 *   WHAT THIS IS      one sentence, no jargon that has not been earned
 *   WHAT TO DO NOW    the next physical action, tied to what is actually true
 *   WHY IT MATTERS    the one idea the station exists to teach
 *
 * The middle line is computed from the live state, so it changes as the player
 * works and never tells them to do something they have already done. That is the
 * difference between a tutorial and a manual.
 *
 * Per the spec's teaching style: name one concept, cite the player's current
 * observation, explain one consequence, and give control straight back.
 */
export function guideStrip({ what, doNow, why, steps = [], activeStep = -1 }) {
  return `
    <div class="station-guide">
      <div class="sg-row"><span class="sg-tag">What this is</span><span class="sg-text">${what}</span></div>
      <div class="sg-row sg-do"><span class="sg-tag">Do now</span><span class="sg-text">${doNow}</span></div>
      <div class="sg-row"><span class="sg-tag">Why</span><span class="sg-text">${why}</span></div>
      ${steps.length ? `<ol class="sg-steps">${steps.map((s, i) =>
        `<li class="${i === activeStep ? 'now' : i < activeStep ? 'done' : ''}">${s}</li>`).join('')}</ol>` : ''}
    </div>`;
}

/**
 * A caption under a display: what it shows, what to look for in it, and — if the
 * display has a science-codex entry — a button to the physics behind it. Adding
 * the key here rather than in each console means one change covers every caption.
 */
export function caption(shows, lookFor, scienceKey = null) {
  return `<div class="display-caption"><b>Shows:</b> ${shows}<br><b>Look for:</b> ${lookFor}`
    + (scienceKey ? ` <button class="science-btn inline" data-science="${scienceKey}">Science</button>` : '')
    + `</div>`;
}
