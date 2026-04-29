/**
 * Calculate current streak from an array of { date: 'YYYY-MM-DD', done: Boolean } logs.
 * A streak is consecutive days ending today (or yesterday) where done === true.
 */
function calcStreak(logs) {
  const doneDates = [...new Set(
    logs.filter(l => l.done).map(l => l.date)
  )].sort().reverse(); // newest first

  if (!doneDates.length) return 0;

  let streak  = 0;
  let current = new Date();
  current.setHours(0, 0, 0, 0);

  for (const dateStr of doneDates) {
    const logDate = new Date(dateStr);
    const diffDays = Math.round((current - logDate) / 86_400_000);

    if (diffDays === 0 || diffDays === 1) {
      streak++;
      current = logDate;
    } else {
      break;
    }
  }

  return streak;
}

module.exports = { calcStreak };
