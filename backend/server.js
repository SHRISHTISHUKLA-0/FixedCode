import express from 'express';
const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json()); // Middleware to parse JSON requests

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Example endpoint to get all timers
app.get('/api/timers', (req, res) => {
    // Logic to retrieve timers from the database
    res.json([{ id: 1, name: 'Meditation Timer 1' }]); // Example response
  });
  
  // Example endpoint to create a new timer
  app.post('/api/timers', (req, res) => {
    const newTimer = req.body; // Get the new timer data from the request body
    // Logic to save the new timer to the database
    res.status(201).json(newTimer); // Respond with the created timer
  });