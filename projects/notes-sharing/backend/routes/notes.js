const router  = require('express').Router();
const multer  = require('multer');
const path    = require('path');
const fs      = require('fs');
const Note    = require('../models/Note');

// Multer config — saves PDFs to /uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('Only PDF files are allowed'), false);
  },
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB limit
});

// GET all notes (with optional search & subject filter)
router.get('/', async (req, res) => {
  try {
    const { subject, q } = req.query;
    const filter = {};
    if (subject) filter.subject = subject;
    if (q) filter.title = { $regex: q, $options: 'i' };
    const notes = await Note.find(filter).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST upload note
router.post('/upload', upload.single('pdf'), async (req, res) => {
  try {
    const sizeMB = (req.file.size / (1024 * 1024)).toFixed(1) + ' MB';
    const note   = await Note.create({
      title:    req.body.title,
      subject:  req.body.subject,
      author:   req.body.author || 'Anonymous',
      filename: req.file.originalname,
      filepath: req.file.path,
      filesize: sizeMB,
    });
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET download note (increments counter)
router.get('/download/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { $inc: { downloads: 1 } },
      { new: true }
    );
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.download(note.filepath, note.filename);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE note
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (note && fs.existsSync(note.filepath)) fs.unlinkSync(note.filepath);
    res.json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
