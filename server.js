const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./utils/db');
const authRoutes = require('./login/auth');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
// app.use('/auth', authRoutes);
app.use(express.static('static'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/static/login.html');
});

app.get('/secret', (req, res) => {
    res.sendFile(__dirname + '/static/secret-page.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
