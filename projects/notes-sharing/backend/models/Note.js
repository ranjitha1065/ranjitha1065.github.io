const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title:     { type: String, required: true },
  subject:   { type: String, required: true },
  author:    { type: String, default: 'Anonymous' },
  filename:  String,
  filepath:  String,
  filesize:  String,
  downloads: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);
