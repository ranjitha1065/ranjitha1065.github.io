const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  date: { type: String, required: true }, // YYYY-MM-DD
  done: { type: Boolean, default: true },
});

const habitSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  icon:       { type: String, default: 'run' },
  streak:     { type: Number, default: 0 },
  bestStreak: { type: Number, default: 0 },
  logs:       [logSchema],
}, { timestamps: true });

module.exports = mongoose.model('Habit', habitSchema);
