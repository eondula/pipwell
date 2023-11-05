const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    //model that includes patient records
    healthRecords: {
        type: String,
        required: true
    },
    //complete form for html
});

module.exports = mongoose.model('Hospital', hospitalSchema);
