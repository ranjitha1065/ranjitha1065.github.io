import React, { useState, useEffect } from 'react';
import HabitForm from './components/HabitForm';
import HabitCard from './components/HabitCard';
import WeekChart from './components/WeekChart';
import './App.css';

const API = 'http://localhost:5002/api/habits';

function App() {
  const [habits, setHabits] = useState([]);

  const fetchHabits = async () => {
    const res = await fetch(API);
    setHabits(await res.json());
  };

  useEffect(() => { fetchHabits(); }, []);

  const addHabit = async (name, icon) => {
    await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, icon }),
    });
    fetchHabits();
  };

  const toggleLog = async (id) => {
    await fetch(`${API}/${id}/log`, { method: 'PATCH' });
    fetchHabits();
  };

  const deleteHabit = async (id) => {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    fetchHabits();
  };

  const today      = new Date().toISOString().split('T')[0];
  const totalDone  = habits.filter(h => h.logs.some(l => l.date === today && l.done)).length;
  const bestStreak = habits.reduce((a, h) => Math.max(a, h.bestStreak), 0);

  return (
    <div className="app">
      <h1>Habit Tracker</h1>
      <div className="stats">
        <div className="stat"><span className="num">{habits.length}</span><span className="lbl">habits</span></div>
        <div className="stat"><span className="num">{totalDone}</span><span className="lbl">done today</span></div>
        <div className="stat"><span className="num">{bestStreak}d</span><span className="lbl">best streak</span></div>
        <div className="stat">
          <span className="num">{habits.length ? Math.round(totalDone / habits.length * 100) : 0}%</span>
          <span className="lbl">completion</span>
        </div>
      </div>
      <HabitForm onAdd={addHabit} />
      <div className="habit-list">
        {habits.length
          ? habits.map(h => (
              <HabitCard key={h._id} habit={h} today={today} onToggle={toggleLog} onDelete={deleteHabit} />
            ))
          : <p className="empty">No habits yet. Add one above.</p>
        }
      </div>
      {habits.length > 0 && <WeekChart habits={habits} />}
    </div>
  );
}

export default App;
