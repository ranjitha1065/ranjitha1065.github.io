import React from 'react';

function NoteCard({ note, onDelete, apiBase }) {
  return (
    <div className="note-card">
      <div className="note-icon">📄</div>
      <div className="note-info">
        <p className="note-title">{note.title}</p>
        <p className="note-meta">
          <span className="badge">{note.subject}</span>
          {note.author} · {note.filesize} · {note.downloads} downloads
        </p>
      </div>
      <a href={`${apiBase}/download/${note._id}`} className="dl-btn" target="_blank" rel="noreferrer">
        Download
      </a>
      <button className="del-btn" onClick={() => onDelete(note._id)}>✕</button>
    </div>
  );
}

export default NoteCard;
