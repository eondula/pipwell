const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const { connectDB } = require('./utils/db');
const { getDB } = require('./utils/db');
const { askChatGPT } = require('./ai/chatgpt');
const { checkSymptoms } = require('./ai/symptomChecker'); // Assuming symptomChecker uses askChatGPT
const authRoutes = require('./login/auth', './hospitalLogin/auth','./InsuranceCom/auth');
const User = require('./models/userModel');
const PORT = process.env.PORT || 3000;
const session = require('express-session');
// Initialize blockchain
const Blockchain = require('./blockchain/records');
const healthChain = new Blockchain();
const HeartRateSimulator = require('./iot/heartRateSimulator');

const heartRateSim = new HeartRateSimulator();
heartRateSim.start();

//const authRoute1 = require('./hospitalLogin/auth');
//const authRoute2 = require('./InsuranceCom/auth');
//const authRoute3 = require('./InsuranceCom/auth');



// Connect Database
// connectDB();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
// app.use('/auth', authRoutes);
app.use(express.static('static'));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if your app is on HTTPS
}));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html');
});



app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/static/login.html');
});

app.post('/login', async (req, res) => {
    const usersCollection = getDB().collection('users');
    const { username, password } = req.body;

    // Check if the user exists
    let user = await usersCollection.findOne({ username: username });

    if (user) {
        if (user.password === password) {
            // User authenticated successfully
            res.redirect('social-platform');
        } else {
            // Authentication failed due to incorrect password
            res.redirect('/login?error=Invalid%20password');
        }
    } else {
        // User doesn't exist, so create a new one
        await usersCollection.insertOne({ username: username, password: password });
        console.log(`New user ${username} created.`);
        // Assuming user authenticated successfully
        req.session.username = username;
        res.redirect('social-platform.html');
    }
});


app.get('/hospitalLogin', (req, res) => {
    res.sendFile(__dirname + '/static/hospitalLogin.html');
});

app.get('/dashboard', (req, res) => {
    res.sendFile(__dirname + '/static/patient-dashboard.html');
});

app.post('/checkSymptoms', async (req, res) => {
    const symptoms = req.body.symptoms;
    const result = await checkSymptoms(symptoms);

    // Let's assume you have user's username in session or a token
    const username = req.session.username; // Or from wherever you store it
    await User.addSymptom(username, result);

    res.json({ feedback: result });
});

app.get('/getLoggedSymptoms', async (req, res) => {
    const username = req.session.username; // Or from wherever you store it
    const user = await User.findUserByUsername(username);
    console.log("Fetching symptoms for user:", username);
    if (user) {
        console.log("User found with symptoms:", user.symptoms);
        res.json(user.symptoms);
    } else {
        console.log("User not found or no symptoms recorded.");
        res.json([]);
    }
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

// Add data to blockchain
app.post('/addRecord', (req, res) => {
    const data = req.body.data;
    healthChain.addBlock(data);
    res.json({ message: 'Record added successfully!', block: healthChain.getLatestBlock() });
});

// Fetch entire blockchain
app.get('/fetchBlockchain', (req, res) => {
    res.json(healthChain);
});
// Adjusting the way we start the server after connecting to the DB
connectDB().then(() => {
    // Start your express server here with 'server.listen' instead of 'app.listen'
    server.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
}).catch(err => {
    console.error("Failed to connect to the database:", err);
    process.exit(1);
});

//app.get('/secret', (req, res) => { res.sendFile(__dirname + '/static/secret-page.html');});
// Establish the connection:
// connectDB().then(() => {
//     // Start your express server here
//     app.listen(PORT, () => {
//         console.log(`Server started on port ${PORT}`);
//     });
// }).catch(err => {
//     console.error("Failed to connect to the database:", err);
//     process.exit(1);
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
