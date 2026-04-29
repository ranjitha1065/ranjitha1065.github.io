import React, { useState } from 'react';

const ICONS = ['run', 'study', 'water', 'sleep', 'meditate'];

function HabitForm({ onAdd }) {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('run');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd(name.trim(), icon);
    setName('');
  };

  return (
    <form className="habit-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New habit (e.g. Morning run)"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <select value={icon} onChange={e => setIcon(e.target.value)}>
        {ICONS.map(i => <option key={i} value={i}>{i.charAt(0).toUpperCase() + i.slice(1)}</option>)}
      </select>
      <button type="submit">+ Add</button>
    </form>
  );
}

export default HabitForm;
