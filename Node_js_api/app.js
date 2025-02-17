const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const weatherRoute = require('./routes/weather');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Define the route for fetching weather data
app.use('/api/user', weatherRoute);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
