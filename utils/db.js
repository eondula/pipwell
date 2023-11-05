const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://leezmiriam:QqcEUlx6rfkfO2ht@cluster0.ymfwdwx.mongodb.net/?retryWrites=true&w=majority';  // Your MongoDB connection string
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connectDB = async () => {
    try {
        await client.connect();
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

// module.exports = {
//     connectDB,
//     client  // Exporting the client may be helpful for making database operations in other parts of your app
// };


module.exports = connectDB;
