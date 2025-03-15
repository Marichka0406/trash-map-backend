const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

dotenv.config(); // Load environment variables

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse incoming JSON requests

// Connect to the database
connectDB();

// Routes
app.use('/api/users', userRoutes); 

// Default route (for testing)
app.get('/', (req, res) => {
  res.send('Server is running');
});

module.exports = app; 
