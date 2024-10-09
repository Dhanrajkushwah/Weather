const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/:city', async (req, res) => {
  const city = req.params.city;
  
  // The correct URL with environment variable for API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.RAPIDAPI_KEY}&units=metric`;

  try {
    const response = await axios.get(url); // Use axios.get for a simple GET request
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching weather data', error });
  }
});

module.exports = router;
