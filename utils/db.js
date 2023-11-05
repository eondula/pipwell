const { MongoClient } = require('mongodb');

const uri = '<mongodb-url';  // Your MongoDB connection string
let _db;

const connectDB = async () => {
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        _db = client.db();
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

const getDB = () => {
    if (!_db) {
        throw Error('Database not initialized. Call connectDB first.');
    }
    return _db;
}

module.exports = {
    connectDB,
    getDB
};

// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//
// const connectDB = async () => {
//     if (!client.isConnected()) {
//         try {
//             await client.connect();
//             console.log('MongoDB Connected...');
//         } catch (err) {
//             console.error(err.message);
//             process.exit(1);
//         }
//     }
//
//     return client.db('cluster0').collection('users');
// };

// const connectDB = async () => {
//     try {
//         await client.connect();
//         console.log('MongoDB Connected...');
//     } catch (err) {
//         console.error(err.message);
//         process.exit(1);
//     }
// }

// module.exports = {
//     connectDB,
//     client  // Exporting the client may be helpful for making database operations in other parts of your app
// };


// module.exports = connectDB;
