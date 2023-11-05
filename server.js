const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./utils/db');
const { askChatGPT } = require('./ai/chatgpt');
const { checkSymptoms } = require('./ai/symptomChecker'); // Assuming symptomChecker uses askChatGPT
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

app.post('/checkSymptoms', async (req, res) => {
    const symptoms = req.body.symptoms;
    const result = await checkSymptoms(symptoms);
    res.json({ feedback: result });
});


app.get('/notifications', (req, res) => {
    // Simulating fetching new notifications for the user
    const notifications = getNotificationsForUser(req.user); // Assuming 'req.user' contains logged-in user information
    res.json({ notifications: notifications });
});

// This is a simulated function for the sake of this example.
// In a real-world scenario, you'd query a database or another data source.
function getNotificationsForUser(user) {
    // Here, I'm returning static data. In practice, fetch notifications for the specific user.
    return ["Reminder: Check your heart rate!", "Dr. Smith sent a message."];
}
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
