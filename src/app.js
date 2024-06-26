// app.js
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const tradeRoutes = require('./routes/tradeRoutes'); // Import the tradeRoutes module

const app = express();

// Connect to MongoDB
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Middleware
app.use(express.json());

// Routes
app.use('/api/trades', tradeRoutes); // Use the tradeRoutes

// Start the server
const PORT = process.env.PORT || 5001; // Changed the port to 5001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
