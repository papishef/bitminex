//jshint esversion:6
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: [true, 'User already exists, Log in instead']
    },
    password: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    aptNumber: {
        type: String,
        required: true
    },
    streetStateProvince: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    idCard: {
        type: String,
        required: true
    },
    firstPlan: String,
    firstLogin: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: false
    },
    investments: [{
        planName: String,
        capital: Number,
        interest: Number,
        currency: String,
        since: {
            type: Date,
            default: Date.now
        }
    }],
    cryptoWallet: [{
        walletCurrency: String,
        amount: Number,
        value: Number,
        interest: Number,
        coin: String,
        since: {
            type: Date,
            default: Date.now
        }
    }], 
    fiatWallet: [{
        walletCurrency: String,
        amount: Number,
        interest: Number,
        since: {
            type: Date,
            default: Date.now
        }
    }],
    alerts: [{
        sender: {
            type: String,
            enum: ['user', 'admin'],
        },
        message: String,
        date: {
            type: Date,
            default: Date.now
        }
    }],
    activities: [{
        name: String,
        amount: Number,
        action: {
            type: String,
            enum: ['deposit', 'withdrawal']
        },
        currency: String,
        date: {
            type: Date,
            default: Date.now
        }
    }],
    withdrawalRequest: [{
        category: String,
        name: String,
        arrayName: Array,
        date: {
            type: Date,
            default: Date.now
        }
    }],
    withdrawalData: {
        bankName: String,
        accountName: String,
        accountNumber: Number,
        swiftIban: String,
        bankAddress: String,
    },
    cardData: {
        cardName: String,
        cardNumber: Number,
        cvv: Number,
        expiry: Date,
        phone: String,
        zipCode: String,
        address: String
    },
    paymentBank: {
        bankName: String,
        accountName: String,
        accountNumber: Number,
        swift: String,
        bankAddress: String,
    },
    btcWallet: {
        type: String,
        default: '1GJE7nAsC8atA9ysELmzEVhEoP7hZuHcj8'
    },
    timer: {
        active: {
            type: Boolean,
            default: false
        },
        paymentMethod: {
            type: String,
            default: 'BTC'
        },
        sentBy: {
            type: String,
            enum: ['investment', 'crypto-wallet', 'fiat-wallet']
        },
        time: Date
    },
    referrals: [{
        refName: String,
        refBonus: Number
        
    }]

});

module.exports = mongoose.model("User", userSchema);