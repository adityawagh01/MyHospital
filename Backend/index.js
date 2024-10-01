// Import the express module
const express = require('express');

// Create an instance of the express application
const app = express();

// Define a port to run the server
const PORT = 3000;

// Create a basic route for the home page
app.get('/', (req, res) => {
  res.send('Welcome to My Express App!');
});

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
