import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

const API = 'http://localhost:5000/api/tasks';

function App() {
  const [tasks, setTasks]   = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch(API).then(r => r.json()).then(setTasks);
  }, []);

  const addTask = async (text, priority) => {
    const res  = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, priority }),
    });
    const task = await res.json();
    setTasks(prev => [task, ...prev]);
  };

  const toggle = async (id, done) => {
    const res     = await fetch(`${API}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done: !done }),
    });
    const updated = await res.json();
    setTasks(prev => prev.map(t => t._id === id ? updated : t));
  };

  const updateText = async (id, text) => {
    const res     = await fetch(`${API}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const updated = await res.json();
    setTasks(prev => prev.map(t => t._id === id ? updated : t));
  };

  const remove = async (id) => {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    setTasks(prev => prev.filter(t => t._id !== id));
  };

  const visible = tasks.filter(t => {
    if (filter === 'pending')  return !t.done;
    if (filter === 'done')     return t.done;
    if (filter === 'high')     return t.priority === 'high';
    return true;
  });

  return (
    <div className="app">
      <h1>Task Manager</h1>
      <TaskForm onAdd={addTask} />
      <div className="filters">
        {['all','pending','done','high'].map(f => (
          <button key={f} className={filter === f ? 'active' : ''} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <TaskList tasks={visible} onToggle={toggle} onDelete={remove} onEdit={updateText} />
    </div>
  );
}

export default App;
