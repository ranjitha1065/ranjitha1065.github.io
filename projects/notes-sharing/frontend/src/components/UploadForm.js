import React, { useState } from 'react';

function UploadForm({ subjects, onUpload }) {
  const [title,   setTitle]   = useState('');
  const [subject, setSubject] = useState('');
  const [author,  setAuthor]  = useState('');
  const [file,    setFile]    = useState(null);
  const [error,   setError]   = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !subject || !file) { setError('Please fill all fields and select a PDF.'); return; }
    const fd = new FormData();
    fd.append('title',   title);
    fd.append('subject', subject);
    fd.append('author',  author || 'Anonymous');
    fd.append('pdf',     file);
    onUpload(fd);
  };

  return (
    <form className="upload-form" onSubmit={handleSubmit}>
      <h2>Upload notes</h2>
      {error && <p className="error">{error}</p>}
      <div className="form-row">
        <input placeholder="Note title *" value={title} onChange={e => setTitle(e.target.value)} />
        <select value={subject} onChange={e => setSubject(e.target.value)}>
          <option value="">Select subject *</option>
          {subjects.map(s => <option key={s}>{s}</option>)}
        </select>
        <input placeholder="Your name" value={author} onChange={e => setAuthor(e.target.value)} />
      </div>
      <label className="file-label">
        <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files[0])} style={{ display: 'none' }} />
        {file ? file.name : 'Click to select PDF (max 20 MB)'}
      </label>
      <button type="submit" className="primary-btn">Submit note</button>
    </form>
  );
}

export default UploadForm;
