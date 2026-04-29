const router          = require('express').Router();
const Habit           = require('../models/Habit');
const { calcStreak }  = require('../utils/streak');

// GET all habits
router.get('/', async (req, res) => {
  try {
    res.json(await Habit.find().sort({ createdAt: 1 }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create habit
router.post('/', async (req, res) => {
  try {
    const habit = await Habit.create(req.body);
    res.status(201).json(habit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH /habits/:id/log — toggle today's completion
router.patch('/:id/log', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const habit = await Habit.findById(req.params.id);
    if (!habit) return res.status(404).json({ error: 'Habit not found' });

    const existing = habit.logs.find(l => l.date === today);
    if (existing) {
      existing.done = !existing.done;
    } else {
      habit.logs.push({ date: today, done: true });
    }

    habit.streak     = calcStreak(habit.logs);
    habit.bestStreak = Math.max(habit.bestStreak, habit.streak);
    await habit.save();
    res.json(habit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE habit
router.delete('/:id', async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);
    res.json({ message: 'Habit deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
