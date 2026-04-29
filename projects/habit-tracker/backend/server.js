require('dotenv').config();
const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/habits', require('./routes/habits'));

app.get('/', (req, res) => res.json({ message: 'Habit Tracker API running' }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5002, () =>
      console.log(`Server running on port ${process.env.PORT || 5002}`)
    );
  })
  .catch(err => console.error('DB connection error:', err));
