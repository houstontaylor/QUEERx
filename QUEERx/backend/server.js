import { doctorsData } from '../constants';

// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Enable CORS for all routes
app.use(cors());

// Parse JSON requests
app.use(bodyParser.json());

// Dummy data to simulate doctors in a database

// API endpoint to fetch doctors based on search query
app.get('/api/doctors', (req, res) => {
  const { searchQuery } = req.query;

  // Filter doctors based on the searchQuery
  const filteredDoctors = doctorsData.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.profession.toLowerCase().includes(searchQuery.toLowerCase())
  );

  res.json(filteredDoctors);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
