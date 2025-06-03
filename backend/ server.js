const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://yaswanth:<db_password>@cluster0.yjuup4a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Schema
const DataSchema = new mongoose.Schema({
  name: String,
  attendance: String,
  task: String,
  date: String,
});

const Entry = mongoose.model('Entry', DataSchema);

// Routes
app.post('/api/submit', async (req, res) => {
  try {
    const entry = new Entry(req.body);
    await entry.save();
    res.status(200).json({ message: 'Saved successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save data' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
