const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const acquirerRouter = require('./routers/acquirerRoutes'); // Corrected import to match the actual file name
const userRoutes = require('./routes/userRoutes'); // Import user routes

require('dotenv').config();

const app = express();

// Middleware
app.use(express.json()); // For parsing application/json
app.use(cors()); // Enable Cross-Origin Requests

// Routes
app.use('/api/users', userRoutes); // Use user routes for user-related requests
// app.use('/api/acquirers', acquirerRouter); // Use acquirerRouter for acquirer-related requests

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Sample Route
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
