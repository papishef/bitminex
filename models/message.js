//jshint esversion:6
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    senderName: {
        type: String,
        required: [true, 'Please enter a valid name']
    },
    senderEmail: {
        type: String,
        required: [true, 'Please enter your email address']
    },
    senderPhone: String,
    subject: {
        type: String,
        required: [true, 'Please enter subject']
    },
    message: {
        type: String,
        required: [true, 'Please enter message body']
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Message', messageSchema);