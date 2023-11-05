const { ObjectID } = require('mongodb');
const { getDB } = require('../utils/db');
console.log(getDB);

class User {
    constructor(username, password, symptoms = []) {
        this.username = username;
        this.password = password;
        this.symptoms = symptoms;
    }

    save() {
        const db = getDB();
        return db.collection('users').insertOne(this);
    }

    static findUserByUsername(username) {
        const db = getDB();
        return db.collection('users').findOne({ username: username });
    }

    // Add a new static method to update symptoms for a user
    static addSymptom(username, symptomResponse) {
        const db = getDB();
        return db.collection('users').updateOne(
            { username: username },
            {
                $push: {
                    symptoms: {
                        date: new Date(),
                        response: symptomResponse
                    }
                }
            }
        );
    }
}

module.exports = User;
