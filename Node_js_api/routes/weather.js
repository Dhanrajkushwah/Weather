const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/weather/:city', async (req, res) => {
  const city = req.params.city;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.RAPIDAPI_KEY}&units=metric`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching weather data', error });
  }
});

router.get('/forecast/:city', async (req, res) => {
  const city = req.params.city; // Change this to get the city from the route parameter
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.RAPIDAPI_KEY}&units=metric`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching forecast data', error });
  }
});


module.exports = router;
