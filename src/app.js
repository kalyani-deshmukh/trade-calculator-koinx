const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');

const tradeRoutes = require('./routes/tradeRoutes');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = config.mongoURI;

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/trades', tradeRoutes);


const port = process.env.PORT || 5001; // Change to a different port, e.g., 5001

app.listen(port, () => console.log(`Server running on port ${port}`));

