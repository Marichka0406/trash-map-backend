const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const trashMarkRoutes = require('./routes/trashMarkRoutes');
const postRoutes = require('./routes/postRoutes');
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
app.use('/api/trashMarks', trashMarkRoutes); 
app.use('/api/posts', postRoutes);

// Default route (for testing)
app.get('/', (req, res) => {
  res.send('Server is running');
});

module.exports = app; 
