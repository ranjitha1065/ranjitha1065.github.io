import React, { useState } from 'react';

const PRIORITY_COLORS = { high: '#FAECE7', med: '#FAEEDA', low: '#EAF3DE' };

function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  const [editId, setEditId]     = useState(null);
  const [editText, setEditText] = useState('');

  const startEdit = (task) => {
    setEditId(task._id);
    setEditText(task.text);
  };

  const saveEdit = (id) => {
    if (editText.trim()) onEdit(id, editText.trim());
    setEditId(null);
  };

  if (!tasks.length) return <p className="empty">No tasks here.</p>;

  return (
    <ul className="task-list">
      {tasks.map(task => (
        <li key={task._id} className={`task-item ${task.done ? 'done' : ''}`}>
          <button className={`check ${task.done ? 'checked' : ''}`} onClick={() => onToggle(task._id, task.done)}>
            {task.done ? '✓' : ''}
          </button>

          {editId === task._id ? (
            <input
              className="edit-input"
              value={editText}
              autoFocus
              onChange={e => setEditText(e.target.value)}
              onBlur={() => saveEdit(task._id)}
              onKeyDown={e => e.key === 'Enter' && saveEdit(task._id)}
            />
          ) : (
            <span className={`task-text ${task.done ? 'crossed' : ''}`}>{task.text}</span>
          )}

          <span className="priority-badge" style={{ background: PRIORITY_COLORS[task.priority] }}>
            {task.priority}
          </span>

          <button className="icon-btn" onClick={() => startEdit(task)}>✏️</button>
          <button className="icon-btn danger" onClick={() => onDelete(task._id)}>🗑</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
