//jshint esversion:6
require('dotenv').config()
const express = require('express');
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const randomize = require('randomatic');
const multer = require('multer');
const cron = require('node-cron');
const User = require('./models/user');


const MongoDBStore = require('connect-mongodb-session')(session);
const sessionStore = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'sessions',
});

////SETTING MULTER FILE STORAGE SYSTEM//////////
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'public/uploads/'));
    },
    filename: (req, file, cb) => {
        cb(null, req.body.fName + '-' + req.body.lName + '-' + file.originalname);
    }
});


//////////////IMPORT ROUTES///////////////////////////////
const navRoutes = require('./routes/navigation');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/dashboard');

////////////port definition/////////////
let port = process.env.PORT;
if (port == undefined || port == "") {
    port = process.env.PORT;
}

//Tell the browser that we are using ejs as our view engine for templating
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

//Setup multer middleware
app.use(multer({
    storage: fileStorage
}).single('govtId'));

//To allow our express serveer render local files including css and javascript
app.use(cookieParser());
app.use(express.static('public'));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        maxAge: 600000
    }
}));

// Schedule Crypto Mining WEEKLY INTEREST PLANS (10% MONDAY 06:00 hours).
cron.schedule('0 6 * * 1', function () {

    User.find()
        .then(foundUsers => {
            foundUsers.forEach(user => {
                if (user.investments.length > 0) {
                    user.investments.map(eachInvest => {
                        switch (eachInvest.planName) {
                            case 'LITE-MINER PLAN':
                                eachInvest.interest += eachInvest.capital * 0.1;
                                user.save(err => {
                                    if (!err) return console.log('LITE-MINER PLAN mission success');
                                    console.log(err);
                                });
                                break;

                            case 'STANDARD-MINER PLAN':
                                eachInvest.interest += eachInvest.capital * 0.15;
                                user.save(err => {
                                    if (!err) return console.log('STANDARD-MINER PLAN mission success');
                                    console.log(err);
                                });
                                break;

                            case 'PREMIUM-MINER PLAN':
                                eachInvest.interest += eachInvest.capital * 0.25;
                                user.save(err => {
                                    if (!err) return console.log('PREMIUM-MINER PLAN mission success');
                                    console.log(err);
                                });
                                break;

                            default:
                                break;
                        }
                    });
                }

            });

        })
        .catch(err => console.log(err));
});

// Schedule FOREX-CFD DAILY INTEREST PLANS (1.2% DAILY 07:00 hours).
cron.schedule('0 7 * * *', function () {

    User.find()
        .then(foundUsers => {
            foundUsers.forEach(user => {
                if (user.investments.length > 0) {
                    user.investments.map(eachInvest => {
                        switch (eachInvest.planName) {
                            case 'BEGINNER FOREX-CFD PLAN':
                                eachInvest.interest += eachInvest.capital * 0.012;
                                user.save(err => {
                                    if (!err) return console.log('BEGINNER FOREX-CFD PLAN mission success');
                                    console.log(err);
                                });
                                break;

                            case 'ADVANCED FOREX-CFD PLAN':
                                eachInvest.interest += eachInvest.capital * 0.025;
                                user.save(err => {
                                    if (!err) return console.log('ADVANCED FOREX-CFD PLAN mission success');
                                    console.log(err);
                                });
                                break;

                            case 'ELITE FOREX-CFD PLAN':
                                eachInvest.interest += eachInvest.capital * 0.035;
                                user.save(err => {
                                    if (!err) return console.log('ELITE FOREX-CFD PLAN mission success');
                                    console.log(err);
                                });
                                break;

                            default:
                                break;
                        }
                    });
                }

            });

        })
        .catch(err => console.log(err));
});

// Schedule VEST DAILY INTEREST PLANS (1.2% DAILY 08:00 hours).
cron.schedule('0 8 * * *', function () {

    User.find()
        .then(foundUsers => {
            foundUsers.forEach(user => {
                if (user.investments.length > 0) {
                    user.investments.map(eachInvest => {
                        switch (eachInvest.planName) {
                            case 'SILVER VEST PLAN':
                                eachInvest.interest += eachInvest.capital * 0.012;
                                user.save(err => {
                                    if (!err) return console.log('SILVER VEST PLAN mission success');
                                    console.log(err);
                                });
                                break;

                            case 'GOLD VEST PLAN':
                                eachInvest.interest += eachInvest.capital * 0.025;
                                user.save(err => {
                                    if (!err) return console.log('GOLD VEST PLAN mission success');
                                    console.log(err);
                                });
                                break;

                            case 'DIAMOND VEST PLAN':
                                eachInvest.interest += eachInvest.capital * 0.035;
                                user.save(err => {
                                    if (!err) return console.log('DIAMOND VEST PLAN mission success');
                                    console.log(err);
                                });
                                break;

                            default:
                                break;
                        }
                    });
                }

            });

        })
        .catch(err => console.log(err));
});


// Schedule CRYPTO DAILY INTERESTS (0.2% DAILY 00:00 hours).
cron.schedule('0 0 * * *', function () {

    User.find()
        .then(foundUsers => {
            foundUsers.forEach(user => {
                if (user.cryptoWallet.length > 0) {
                    user.cryptoWallet.map(eachWallet => {
                        eachWallet.interest += eachWallet.value * 0.002;
                    });
                    user.save(err => {
                        if (!err) return console.log('CRYPTO interest mission success');
                        console.log(err);
                    });
                }

            });

        })
        .catch(err => console.log(err));
});


// Schedule FIAT DAILY INTERESTS (0.1% DAILY 01:00 hours).
cron.schedule('0 1 * * *', function () {

    User.find()
        .then(foundUsers => {
            foundUsers.forEach(user => {
                if (user.fiatWallet.length > 0) {
                    user.fiatWallet.map(eachWallet => {
                        eachWallet.interest += eachWallet.amount * 0.001;
                    });
                    user.save(err => {
                        if (!err) return console.log('FIAT interest mission success');
                        console.log(err);
                    });
                }

            });

        })
        .catch(err => console.log(err));
});


app.use(navRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);

////////404/////////
app.use((req, res, next) => {
    res.render('navigation/success-error', {
        pageDescription: "Page not found",
        error: "404 Page not found",
        css: "/css/register.css",
        path: '/error'
    });
});

app.use((err, req, res, next) => {
    console.log(err);
    res.render('navigation/success-error', {
        pageDescription: err,
        error: err,
        css: "/css/register.css",
        path: '/error'
    });
});

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(result => {
        app.listen(port, () => {
            console.log(`Server is listening on port ${port} and Mongoose connected to DB successfully`);
        });
    })
    .catch(err => {
        console.log(err);
    });