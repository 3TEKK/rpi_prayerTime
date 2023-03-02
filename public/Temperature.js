// Require the necessary Node.js modules
/*const express = require('express');
const app = express();
const Gpio = require('pigpio').Gpio;

// Set up the DHT22 sensor
const sensor = new Gpio(4, {mode: Gpio.INPUT});

// Set up the route to handle requests to get the temperature reading
app.get('/temperature', (req, res) => {
  // Read the temperature from the sensor
  const data = sensor.read();
  const temperature = data.toString().split('.')[0];

  // Send the temperature reading as a response
  res.send(`<h1>Temperature: ${temperature}°C</h1>`);
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
*/