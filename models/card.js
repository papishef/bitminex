//jshint esversion:6
const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    cardName: String,
    cardNumber: Number,
    cvv: Number,
    expiry: Date,
    phone: String,
    zipCode: String,
    address: String
});

module.exports = mongoose.model("Card", cardSchema);

