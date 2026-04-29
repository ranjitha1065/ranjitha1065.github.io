import React from 'react';

const ICON_MAP  = { run: '🏃', study: '📚', water: '💧', sleep: '😴', meditate: '🧘' };
const ICON_BG   = { run: '#EAF3DE', study: '#E6F1FB', water: '#E1F5EE', sleep: '#EEEDFE', meditate: '#FAEEDA' };

function HabitCard({ habit, today, onToggle, onDelete }) {
  const doneToday = habit.logs.some(l => l.date === today && l.done);

  // Build last 7 days
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const done    = habit.logs.some(l => l.date === dateStr && l.done);
    days.push({ dateStr, done, label: d.toLocaleDateString('en-GB', { weekday: 'short' }).slice(0, 1) });
  }

  const progress = Math.round(days.filter(d => d.done).length / 7 * 100);

  return (
    <div className="habit-card">
      <div className="habit-top">
        <div className="habit-icon" style={{ background: ICON_BG[habit.icon] || '#f5f5f5' }}>
          {ICON_MAP[habit.icon] || '⭐'}
        </div>
        <span className="habit-name">{habit.name}</span>
        <span className={`streak-pill ${habit.streak === 0 ? 'cold' : ''}`}>
          {habit.streak === 0 ? 'No streak' : `${habit.streak}d streak`}
        </span>
        <button className={`check-btn ${doneToday ? 'done' : ''}`} onClick={() => onToggle(habit._id)}>
          {doneToday ? '✓' : ''}
        </button>
        <button className="del-btn" onClick={() => onDelete(habit._id)}>✕</button>
      </div>

      <div className="week-dots">
        {days.map((d, i) => (
          <div key={i} className={`dot ${d.done ? 'filled' : ''} ${d.dateStr === today ? 'is-today' : ''}`}>
            <span className="dot-lbl">{d.label}</span>
            {d.done && <span>✓</span>}
          </div>
        ))}
      </div>

      <div className="prog-bar"><div className="prog-fill" style={{ width: `${progress}%` }} /></div>
    </div>
  );
}

export default HabitCard;
