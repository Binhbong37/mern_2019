const express = require('express');
const connectDB = require('./config/db');

const app = express();

// connect to DB
connectDB();

// Initial Middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('API Running . . . ');
});

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/pots', require('./routes/api/pots'));
app.use('/api/profile', require('./routes/api/profile'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`app is running on port ${PORT}`));
