const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const trashMarkRoutes = require('./routes/trashMarkRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

dotenv.config(); // Load environment variables

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); 
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Connect to the database
connectDB();

// Routes
app.use('/api/users', userRoutes); 
app.use('/api/trashMarks', trashMarkRoutes); 

// Default route (for testing)
app.get('/', (req, res) => {
  res.send('Server is running');
});

module.exports = app; 
