const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./utils/db');
const authRoutes = require('./login/auth', './hospitalLogin/auth','./InsuranceCom/auth');
//const authRoute1 = require('./hospitalLogin/auth');
//const authRoute2 = require('./InsuranceCom/auth');
//const authRoute3 = require('./InsuranceCom/auth');

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

app.get('/hospitalLogin', (req, res) => {
    res.sendFile(__dirname + '/static/hospitalLogin.html');
});

app.get('/insuranceCom', (req, res) => {
    res.sendFile(__dirname + '/static/InsuranceCom.html');
});

app.get('/patient-record', (req, res) => {
    res.sendFile(__dirname + '/static/patient-record.html');
});

app.get('/social-platform', (req, res) => {
    res.sendFile(__dirname + '/static/social-platform.html');
});

//app.get('/secret', (req, res) => { res.sendFile(__dirname + '/static/secret-page.html');}); 




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
