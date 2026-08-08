export const TOTAL_DAYS = 20;
export const HOURS_PER_DAY = 24;
export const TOTAL_HOURS = TOTAL_DAYS * HOURS_PER_DAY; // 480
export const START_HOUR = 8; // Day 1 08:00
export const VISIT_COST_HOURS = 4; // mission-based: shorter focused visit
export const WALK_BASE_HOURS = 3; // ~3h billboard to house average (mission pacing)
export const AVG_WALK_DISTANCE = 48; // avg distance units billboard->house
export const MISSION_VISIT_HOURS = 4;
export const MISSION_WALK_HOURS = 3;

// Derived week mapping: 15 curriculum weeks over 20 days => 32h per week
export const HOURS_PER_WEEK = TOTAL_HOURS / 15; // 32

export function timeToWeek(timeHours){
  return Math.min(15, Math.max(1, Math.floor(timeHours / HOURS_PER_WEEK) + 1));
}
export function timeToDay(timeHours){
  return Math.floor(timeHours / HOURS_PER_DAY) + 1;
}
export function timeHourOfDay(timeHours){
  return ((timeHours % HOURS_PER_DAY) + HOURS_PER_DAY) % HOURS_PER_DAY;
}
export function formatTime(timeHours){
  const day = timeToDay(timeHours);
  const h = Math.floor(timeHourOfDay(timeHours));
  const m = Math.floor((timeHourOfDay(timeHours) - h)*60);
  const pad = n=>String(n).padStart(2,'0');
  return `Day ${day}/${TOTAL_DAYS} — ${pad(h)}:${pad(m)}`;
}
export function formatDayHour(timeHours){
  const day=timeToDay(timeHours);
  const h=Math.floor(timeHourOfDay(timeHours));
  return {day, hour:h, timeHours};
}
export function hoursToDayNightFactor(timeHours){
  // 0 = midnight, 0.5 = noon
  const h=timeHourOfDay(timeHours);
  // day 6-18, night 18-6
  const t = (h/24);
  // cosine: 1 at noon (12), -1 at midnight
  return Math.cos((t-0.5)*Math.PI*2); // -1 night, 1 day
}
export function isNight(timeHours){
  const h=timeHourOfDay(timeHours);
  return h < 6 || h >= 18;
}
export function walkCostForDistance(dist){
  // 6h for AVG distance
  return (dist / AVG_WALK_DISTANCE) * WALK_BASE_HOURS;
}
