const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  text:     { type: String, required: true },
  done:     { type: Boolean, default: false },
  priority: { type: String, enum: ['low', 'med', 'high'], default: 'med' },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
