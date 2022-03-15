const express = require('express');
const connectDB = require('./config/db');

const app = express();

// connect to DB
connectDB();

app.use('/', (req, res) => {
    res.send('API Running . . . ');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`app is running on port ${PORT}`));
