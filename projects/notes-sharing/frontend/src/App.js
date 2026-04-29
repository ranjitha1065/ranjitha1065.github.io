import React, { useState, useEffect } from 'react';
import UploadForm from './components/UploadForm';
import NoteCard   from './components/NoteCard';
import './App.css';

const API = 'http://localhost:5001/api/notes';

function App() {
  const [notes,   setNotes]   = useState([]);
  const [search,  setSearch]  = useState('');
  const [subject, setSubject] = useState('');
  const [showUp,  setShowUp]  = useState(false);

  const fetchNotes = async () => {
    const params = new URLSearchParams();
    if (search)  params.append('q', search);
    if (subject) params.append('subject', subject);
    const res = await fetch(`${API}?${params}`);
    setNotes(await res.json());
  };

  useEffect(() => { fetchNotes(); }, [search, subject]);

  const handleUpload = async (formData) => {
    await fetch(`${API}/upload`, { method: 'POST', body: formData });
    setShowUp(false);
    fetchNotes();
  };

  const handleDelete = async (id) => {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    fetchNotes();
  };

  const subjects = ['Mathematics','Physics','Chemistry','Computer Science','Economics','History','Biology'];

  return (
    <div className="app">
      <div className="topbar">
        <h1>Notes<span>Share</span></h1>
        <button className="primary-btn" onClick={() => setShowUp(!showUp)}>
          {showUp ? 'Cancel' : '+ Upload Notes'}
        </button>
      </div>

      {showUp && <UploadForm subjects={subjects} onUpload={handleUpload} />}

      <div className="controls">
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select value={subject} onChange={e => setSubject(e.target.value)}>
          <option value="">All subjects</option>
          {subjects.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="notes-grid">
        {notes.length
          ? notes.map(n => <NoteCard key={n._id} note={n} onDelete={handleDelete} apiBase={API} />)
          : <p className="empty">No notes found.</p>
        }
      </div>
    </div>
  );
}

export default App;
