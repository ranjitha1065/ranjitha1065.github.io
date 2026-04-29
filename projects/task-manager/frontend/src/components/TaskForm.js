import React, { useState } from 'react';

function TaskForm({ onAdd }) {
  const [text, setPriority] = useState('');
  const [priority, setP]    = useState('med');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text.trim(), priority);
    setPriority('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={e => setPriority(e.target.value)}
        placeholder="Add a new task..."
      />
      <select value={priority} onChange={e => setP(e.target.value)}>
        <option value="low">Low</option>
        <option value="med">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit">+ Add</button>
    </form>
  );
}

export default TaskForm;
