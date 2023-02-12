//jshint esversion:6
const _ = require('lodash');
const User = require('../models/user');
const Card = require('../models/card');
const helper = require('../utils/functions');


//app won't crash for new users with no investments or wallets yet
const maintenanceCapital = (user) => {
    if (user.investments.length > 0 || user.cryptoWallet.length > 0 || user.fiatWallet.length > 0) {
        if (user.timer.sentBy === 'investment') {
            return user.investments[user.investments.length - 1].capital;
        }
        if (user.timer.sentBy === 'crypto-wallet') {
            return user.cryptoWallet[user.cryptoWallet.length - 1].amount;
        }
        if (user.timer.sentBy === 'fiat-wallet') {
            return user.fiatWallet[user.fiatWallet.length - 1].amount;
        }

    } else {
        return 0;
    }
};



exports.getDash = (req, res, next) => {
    userID = req.params.userID;


    User.findById(userID)
        .then(foundUser => {

            if (foundUser.timer.active) {
                if (foundUser.timer.paymentMethod === 'BTC') {
                    return res.render('admin/pay-btc', {
                        foundUser: foundUser,
                        pageDescription: 'Complete BTC Transaction',
                        path: '/complete-investment',
                        maintenanceFee: (2 / 100) * maintenanceCapital(foundUser)
                    });
                }
                if (foundUser.timer.paymentMethod === 'Bank transfer') {
                    return res.render('admin/pay-bank-transfer', {
                        foundUser: foundUser,
                        pageDescription: 'Complete Bank Transfer',
                        path: '/complete-investment',
                        maintenanceFee: (2 / 100) * maintenanceCapital(foundUser)
                    });
                }
            }

            res.render('admin/user-dash', {
                pageDescription: "User Dashboard",
                path: '/user',
                foundUser: foundUser,
                // walletsTotal: walletsTotal(),
                maintenanceFee: (2 / 100) * maintenanceCapital(foundUser)
            });

        })
        .catch(err => {
            next(err);
        });

};

exports.getWallets = (req, res, next) => {
    userID = req.params.userID;
    User.findById(userID)
        .then(foundUser => {
            if (foundUser.timer.active) {
                if (foundUser.timer.paymentMethod === 'BTC') {
                    return res.render('admin/pay-btc', {
                        foundUser: foundUser,
                        pageDescription: 'Complete BTC Transaction',
                        path: '/complete-investment',
                        maintenanceFee: (2 / 100) * maintenanceCapital(foundUser)
                    });
                }
                if (foundUser.timer.paymentMethod === 'Bank transfer') {
                    return res.render('admin/pay-bank-transfer', {
                        foundUser: foundUser,
                        pageDescription: 'Complete Bank Transfer',
                        path: '/complete-investment',
                        maintenanceFee: (2 / 100) * maintenanceCapital(foundUser)
                    });
                }
            }
            res.render('admin/wallets', {
                pageDescription: "Multi-Wallet",
                path: '/wallets',
                foundUser: foundUser,
                maintenanceFee: (2 / 100) * maintenanceCapital(foundUser)
            });

        })
        .catch(err => {
            next(err);
        });
};

exports.getHistory = (req, res, next) => {
    userID = req.params.userID;
    User.findById(userID)
        .then(foundUser => {
            if (foundUser.timer.active) {
                if (foundUser.timer.paymentMethod === 'BTC') {
                    return res.render('admin/pay-btc', {
                        foundUser: foundUser,
                        pageDescription: 'Complete BTC Transaction',
                        path: '/complete-investment',
                        maintenanceFee: (2 / 100) * maintenanceCapital(foundUser)
                    });
                }
                if (foundUser.timer.paymentMethod === 'Bank transfer') {
                    return res.render('admin/pay-bank-transfer', {
                        foundUser: foundUser,
                        pageDescription: 'Complete Bank Transfer',
                        path: '/complete-investment',
                        maintenanceFee: (2 / 100) * maintenanceCapital(foundUser)
                    });
                }
            }
            res.render('admin/history', {
                pageDescription: "Activity Log",
                path: "/history",
                foundUser: foundUser,
                maintenanceFee: (2 / 100) * maintenanceCapital(foundUser)
            });

        })
        .catch(err => {
            next(err);
        });
};

exports.getInvestments = (req, res, next) => {
    userID = req.params.userID;
    User.findById(userID)
        .then(foundUser => {
            if (foundUser.timer.active) {
                if (foundUser.timer.paymentMethod === 'BTC') {
                    return res.render('admin/pay-btc', {
                        foundUser: foundUser,
                        pageDescription: 'Complete BTC Transaction',
                        path: '/complete-investment',
                        maintenanceFee: (2 / 100) * maintenanceCapital(foundUser)
                    });
                }
                if (foundUser.timer.paymentMethod === 'Bank transfer') {
                    return res.render('admin/pay-bank-transfer', {
                        foundUser: foundUser,
                        pageDescription: 'Complete Bank Transfer',
                        path: '/complete-investment',
                        maintenanceFee: (2 / 100) * maintenanceCapital(foundUser)
                    });
                }
            }
            res.render('admin/investments', {
                pageDescription: "Ongoing Investments",
                path: '/investments',
                foundUser: foundUser,
                maintenanceFee: (2 / 100) * maintenanceCapital(foundUser)
            });

        })
        .catch(err => {
            next(err);
        });

};


exports.getAlerts = (req, res, next) => {
    userID = req.params.userID;
    User.findById(userID)
        .then(foundUser => {
            res.render('admin/alerts', {
                pageDescription: "Notifications",
                path: '/alerts',
                foundUser: foundUser
            });

        })
        .catch(err => {
            next(err);
        });
};


exports.getSettings = (req, res, next) => {
    userID = req.params.userID;
    User.findById(userID)
        .then(foundUser => {
            if (foundUser.timer.active) {
                if (foundUser.timer.paymentMethod === 'BTC') {
                    return res.render('admin/pay-btc', {
                        foundUser: foundUser,
                        pageDescription: 'Complete BTC Transaction',
                        path: '/complete-investment',
                        maintenanceFee: (2 / 100) * maintenanceCapital(foundUser)
                    });
                }
                if (foundUser.timer.paymentMethod === 'Bank transfer') {
                    return res.render('admin/pay-bank-transfer', {
                        foundUser: foundUser,
                        pageDescription: 'Complete Bank Transfer',
                        path: '/complete-investment',
                        maintenanceFee: (2 / 100) * maintenanceCapital(foundUser)
                    });
                }
            }
            res.render('admin/settings', {
                pageDescription: "Set Preferences",
                path: '/settings',
                foundUser: foundUser,
                errorMessage: '',
                successMessage: '',
                maintenanceFee: (2 / 100) * maintenanceCapital(foundUser)
            });

        })
        .catch(err => {
            next(err);
        });
};



exports.getInvestCheckout = (req, res, next) => {
    userID = req.params.userID;
    User.findById(userID)
        .then(foundUser => {
            if (foundUser.timer.active) {
                if (foundUser.timer.paymentMethod === 'BTC') {
                    return res.render('admin/pay-btc', {
                        foundUser: foundUser,
                        pageDescription: 'Complete BTC Transaction',
                        path: '/complete-investment',
                        maintenanceFee: (2 / 100) * maintenanceCapital(foundUser)
                    });
                }
                if (foundUser.timer.paymentMethod === 'Bank transfer') {
                    return res.render('admin/pay-bank-transfer', {
                        foundUser: foundUser,
                        pageDescription: 'Complete Bank Transfer',
                        path: '/complete-investment',
                        maintenanceFee: (2 / 100) * maintenanceCapital(foundUser)
                    });
                }
            }
            res.render('admin/investment-checkout', {
                pageDescription: 'Complete Investment',
                path: '/complete-investment',
                foundUser: foundUser,
                maintenanceFee: (2 / 100) * maintenanceCapital(foundUser)
            });

        })
        .catch(err => {
            next(err);
        });
};


exports.postInvestCheckout = (req, res, next) => {
    const userID = req.params.userID;
    const {
        plan,
        currency,
        capital,
        paymentMethod
    } = req.body;

    const maintenanceFee = (2 / 100) * capital;

    const newInvestment = {
        planName: plan,
        capital: capital,
        interest: 0,
        currency: currency
    };

    const newActivity = {
        name: plan,
        amount: capital,
        action: 'deposit',
        currency: currency
    };

    User.findById(userID)
        .then(foundUser => {
            if (foundUser.timer.active) {
                return res.send('This request is duplicated or plan already exists ' + `<a href=/admin/user/${foundUser._id}>Go Back</a>`);
            }

            switch (paymentMethod) {
                case "BTC":
                    // code block
                    foundUser.investments.push(newInvestment);
                    foundUser.activities.unshift(newActivity);
                    foundUser.firstPlan = '';
                    foundUser.timer.active = true;
                    foundUser.timer.paymentMethod = 'BTC';
                    foundUser.timer.sentBy = 'investment';
                    foundUser.timer.time = Date.now();
                    foundUser.save(err => {
                        if (err) return next(err);
                        res.render('admin/pay-btc', {
                            foundUser: foundUser,
                            pageDescription: 'Complete BTC Transaction',
                            path: '/complete-investment',
                            maintenanceFee: maintenanceFee
                        });

                    });
                    break;

                case "Bank transfer":
                    // code block
                    foundUser.investments.push(newInvestment);
                    foundUser.activities.unshift(newActivity);
                    foundUser.firstPlan = '';
                    foundUser.timer.active = true;
                    foundUser.timer.paymentMethod = 'Bank transfer';
                    foundUser.timer.sentBy = 'investment';
                    foundUser.timer.time = Date.now();
                    foundUser.save(err => {
                        if (err) return next(err);

                        res.render('admin/pay-bank-transfer', {
                            foundUser: foundUser,
                            pageDescription: 'Complete Bank Transfer',
                            path: '/complete-investment',
                            maintenanceFee: maintenanceFee
                        });
                    });
                    break;

                case "Card payment":
                    // code block
                    res.render('navigation/success-error', {
                        pageDescription: 'Card Payment is currently inactive in your location, please try another means of payment ' + `<a href=/admin/user/${foundUser._id}>Return</a>`,
                        error: 'Card Payment is currently inactive in you location, please try another means of payment ' + `<a href=/admin/user/${foundUser._id}>Return</a>`,
                        css: "/css/register.css",
                        path: '/error'
                    });
                    break;

                default:
                    // code block
                    res.render('admin/pay-btc', {
                        foundUser: foundUser,
                        pageDescription: 'Complete BTC Transaction',
                        path: '/complete-investment',
                        maintenanceFee: maintenanceFee
                    });
            }

        })
        .catch(err => {
            next(err);
        });

};


exports.getCryptoCheckout = (req, res, next) => {
    userID = req.params.userID;
    User.findById(userID)
        .then(foundUser => {
            if (foundUser.timer.active) {
                if (foundUser.timer.paymentMethod === 'BTC') {
                    res.render('admin/pay-btc', {
                        foundUser: foundUser,
                        pageDescription: 'Complete BTC Transaction',
                        path: '/complete-investment',
                        maintenanceFee: (2 / 100) * maintenanceCapital(foundUser)
                    });
                }
                if (foundUser.timer.paymentMethod === 'Bank transfer') {
                    res.render('admin/pay-bank-transfer', {
                        foundUser: foundUser,
                        pageDescription: 'Complete Bank Transfer',
                        path: '/complete-investment',
                        maintenanceFee: (2 / 100) * maintenanceCapital(foundUser)
                    });
                }
            }
            res.render('admin/crypto-checkout', {
                pageDescription: 'Complete CRYPTO Checkout',
                path: '/complete-wallet',
                foundUser: foundUser,
                maintenanceFee: (2 / 100) * maintenanceCapital(foundUser)
            });

        })
        .catch(err => {
            next(err);
        });
};


exports.postCryptoCheckout = (req, res, next) => {
    const userID = req.params.userID;
    const currency = req.body.currency;
    const capital = req.body.capital;
    const coin = req.body.coin;
    const paymentMethod = req.body.paymentMethod;

    const maintenanceFee = (2 / 100) * capital;

    Promise.all([helper.crypto()])
        .then(response => {

            const value = () => {

                if (coin === 'BTC') {
                    return capital / (response[0].data[0].price);
                }
                if (coin === 'ETH') {
                    return capital / (response[0].data[1].price);
                }
                if (coin === 'XRP') {
                    return capital / (response[0].data[2].price);
                }
                if (coin === 'LTC') {
                    return capital / (response[0].data[4].price);
                }
                if (coin === 'BCH') {
                    return capital / (response[0].data[5].price);
                }
                if (coin === 'BNB') {
                    return capital / (response[0].data[6].price);
                }

            };

            const newWallet = {
                coin: coin,
                walletCurrency: currency,
                amount: capital,
                interest: 0,
                value: value()
            };


            const newActivity = {
                name: coin + ' Credit',
                amount: capital,
                action: 'deposit',
                currency: currency
            };


            User.findById(userID)
                .then(foundUser => {
                    if (foundUser.timer.active) {
                        return res.send('This request is duplicated or plan already exists ' + `<a href=/admin/user/${foundUser._id}>Go Back</a>`);
                    }
                    switch (paymentMethod) {
                        case "BTC":
                            // code block
                            foundUser.cryptoWallet.push(newWallet);
                            foundUser.activities.unshift(newActivity);
                            foundUser.timer.active = true;
                            foundUser.timer.paymentMethod = 'BTC';
                            foundUser.timer.sentBy = 'crypto-wallet';
                            foundUser.timer.time = Date.now();
                            foundUser.save(err => {
                                if (err) return next(err);
                                res.render('admin/pay-btc', {
                                    foundUser: foundUser,
                                    pageDescription: 'Complete BTC Transaction',
                                    path: '/complete-investment',
                                    maintenanceFee: maintenanceFee
                                });

                            });
                            break;

                        case "Bank transfer":
                            // code block
                            foundUser.cryptoWallet.push(newWallet);
                            foundUser.activities.push(newActivity);
                            foundUser.timer.active = true;
                            foundUser.timer.paymentMethod = 'Bank transfer';
                            foundUser.timer.sentBy = 'crypto-wallet';
                            foundUser.timer.time = Date.now();
                            foundUser.save(err => {
                                if (err) return next(err);

                                res.render('admin/pay-bank-transfer', {
                                    foundUser: foundUser,
                                    pageDescription: 'Complete Bank Transfer',
                                    path: '/complete-investment',
                                    maintenanceFee: maintenanceFee
                                });
                            });
                            break;

                        case "Card payment":
                            // code block
                            res.render('navigation/success-error', {
                                pageDescription: 'Card Payment is currently inactive in your location, please try another means of payment ' + `<a href=/admin/user/${foundUser._id}>Return</a>`,
                                error: 'Card Payment is currently inactive in you location, please try another means of payment ' + `<a href=/admin/user/${foundUser._id}>Return</a>`,
                                css: "/css/register.css",
                                path: '/error'
                            });
                            break;

                        default:
                            // code block
                            res.render('admin/pay-btc', {
                                foundUser: foundUser,
                                pageDescription: 'Complete BTC Transaction',
                                path: '/complete-investment',
                                maintenanceFee: maintenanceFee
                            });
                    }

                })
                .catch(err => {
                    next(err);
                });

        })
        .catch(err => {
            next(err);
        });




};


exports.getFiatCheckout = (req, res, next) => {
    userID = req.params.userID;
    User.findById(userID)
        .then(foundUser => {
            if (foundUser.timer.active) {
                if (foundUser.timer.paymentMethod === 'BTC') {
                    res.render('admin/pay-btc', {
                        foundUser: foundUser,
                        pageDescription: 'Complete BTC Transaction',
                        path: '/complete-investment',
                        maintenanceFee: (2 / 100) * maintenanceCapital(foundUser)
                    });
                }
                if (foundUser.timer.paymentMethod === 'Bank transfer') {
                    res.render('admin/pay-bank-transfer', {
                        foundUser: foundUser,
                        pageDescription: 'Complete Bank Transfer',
                        path: '/complete-investment',
                        maintenanceFee: (2 / 100) * maintenanceCapital(foundUser)
                    });
                }
            }
            res.render('admin/fiat-checkout', {
                pageDescription: 'Complete FIAT Transaction',
                path: '/complete-fiat',
                foundUser: foundUser,
                maintenanceFee: (2 / 100) * maintenanceCapital(foundUser)
            });

        })
        .catch(err => {
            next(err);
        });
};


exports.postFiatCheckout = (req, res, next) => {
    const userID = req.params.userID;
    const currency = req.body.currency;
    const capital = req.body.capital;
    const paymentMethod = req.body.paymentMethod;
    const maintenanceFee = (2 / 100) * capital;

    const newFiat = {
        walletCurrency: currency,
        amount: capital,
        interest: 0
    };

    const newActivity = {
        name: 'Fiat Credit',
        amount: capital,
        action: 'deposit',
        currency: currency
    };

    User.findById(userID)
        .then(foundUser => {
            if (foundUser.timer.active) {
                return res.send('This request is duplicated or plan already exists ' + `<a href=/admin/user/${foundUser._id}>Go Back</a>`);
            }
            switch (paymentMethod) {
                case "BTC":
                    // code block
                    foundUser.fiatWallet.push(newFiat);
                    foundUser.activities.unshift(newActivity);
                    foundUser.timer.active = true;
                    foundUser.timer.paymentMethod = 'BTC';
                    foundUser.timer.sentBy = 'fiat-wallet';
                    foundUser.timer.time = Date.now();
                    foundUser.save(err => {
                        if (err) return next(err);
                        res.render('admin/pay-btc', {
                            foundUser: foundUser,
                            pageDescription: 'Complete BTC Transaction',
                            path: '/complete-investment',
                            maintenanceFee: maintenanceFee
                        });

                    });
                    break;

                case "Bank transfer":
                    // code block
                    foundUser.fiatWallet.push(newFiat);
                    foundUser.activities.push(newActivity);
                    foundUser.timer.active = true;
                    foundUser.timer.paymentMethod = 'Bank transfer';
                    foundUser.timer.sentBy = 'fiat-wallet';
                    foundUser.timer.time = Date.now();
                    foundUser.save(err => {
                        if (err) return next(err);

                        res.render('admin/pay-bank-transfer', {
                            foundUser: foundUser,
                            pageDescription: 'Complete Bank Transfer',
                            path: '/complete-investment',
                            maintenanceFee: maintenanceFee
                        });
                    });
                    break;

                case "Card payment":
                    // code block
                    res.render('navigation/success-error', {
                        pageDescription: 'Card Payment is currently inactive in your location, please try another means of payment ' + `<a href=/admin/user/${foundUser._id}>Return</a>`,
                        error: 'Card Payment is currently inactive in you location, please try another means of payment ' + `<a href=/admin/user/${foundUser._id}>Return</a>`,
                        css: "/css/register.css",
                        path: '/error'
                    });
                    break;

                default:
                    // code block
                    res.render('admin/pay-btc', {
                        foundUser: foundUser,
                        pageDescription: 'Complete BTC Transaction',
                        path: '/complete-investment',
                        maintenanceFee: maintenanceFee
                    });
            }

        })
        .catch(err => {
            next(err);
        });

};


exports.getWithdrawInvestment = (req, res, next) => {
    userID = req.params.userID;

    User.findById(userID)
        .then(foundUser => {
            if (foundUser.investments.length <= 0) {
                res.render('navigation/success-error', {
                    pageDescription: 'You have no active investments ' + `<a href=/admin/user/${foundUser._id}>Go Back</a>`,
                    error: 'You have no active investments ' + `<a href=/admin/user/${foundUser._id}>Go Back</a>`,
                    css: "/css/register.css",
                    path: '/error'
                });
            } else {
                res.render('admin/complete-withdrawal', {
                    foundUser: foundUser,
                    pageDescription: 'Complete Investment withdrawal',
                    path: '/withdraw-invest',
                });
            }

        })
        .catch(err => {
            next(err);
        });
};


exports.getWithdrawCrypto = (req, res, next) => {
    userID = req.params.userID;

    User.findById(userID)
        .then(foundUser => {
            if (foundUser.cryptoWallet.length <= 0) {
                res.render('navigation/success-error', {
                    pageDescription: 'You have no active wallet balance ' + `<a href=/admin/user/${foundUser._id}>Return to Dashboard</a>`,
                    error: 'You have no active wallet balance ' + `<a href=/admin/user/${foundUser._id}>Return to Dashboard</a>`,
                    css: "/css/register.css",
                    path: '/error'
                });
            } else {
                res.render('admin/complete-withdrawal', {
                    foundUser: foundUser,
                    pageDescription: 'Complete Crypto withdrawal',
                    path: '/withdraw-crypto',
                });
            }

        })
        .catch(err => {
            next(err);
        });
};


exports.getWithdrawFiat = (req, res, next) => {
    userID = req.params.userID;

    User.findById(userID)
        .then(foundUser => {
            if (foundUser.fiatWallet.length <= 0) {
                res.render('navigation/success-error', {
                    pageDescription: 'Card Payment is currently inactive in you location, please try another means of payment ' + `<a href=/admin/user/${foundUser._id}>Return</a>`,
                    error: 'Card Payment is currently inactive in you location, please try another means of payment ' + `<a href=/admin/user/${foundUser._id}>Return</a>`,
                    css: "/css/register.css",
                    path: '/error'
                });
            } else {
                res.render('admin/complete-withdrawal', {
                    foundUser: foundUser,
                    pageDescription: 'Complete Fiat withdrawal',
                    path: '/withdraw-fiat',
                });
            }

        })
        .catch(err => {
            next(err);
        });
};


exports.postWithdrawInvestment = (req, res, next) => {
    const {
        plan
    } = req.body;
    const userID = req.params.userID;

    console.log(plan);

    //Check if plan is array
    if (Array.isArray(plan)) {

        User.findById(userID)
            .then(foundUser => {
                newWithdrawalRequest = {
                    category: 'Investment',
                    name: '',
                    arrayName: plan
                };

                foundUser.withdrawalRequest.push(newWithdrawalRequest);
                foundUser.save(err => {
                    if (err) {
                        return res.render('admin/withdrawal-feedback', {
                            foundUser: foundUser,
                            pageDescription: "Error",
                            errorMessage: "Withdrawal Request unsuccessful",
                            successMessage: '',
                            path: "/withdrawal-feedback",
                            tryAgainPath: 'withdraw-investment'
                        });
                    }

                    res.render('admin/withdrawal-feedback', {
                        foundUser: foundUser,
                        pageDescription: "Successful",
                        successMessage: "Withdrawal Request Successful",
                        errorMessage: '',
                        path: "/withdrawal-feedback",
                        tryAgainPath: 'withdraw-investment'
                    });

                });
            })
            .catch(err => {
                next(err);
            });


    } else {

        console.log('not array');

        User.findById(userID)
            .then(foundUser => {
                newWithdrawalRequest = {
                    category: 'Investment',
                    name: plan,
                    arrayName: []
                };

                foundUser.withdrawalRequest.push(newWithdrawalRequest);
                foundUser.save(err => {
                    if (err) {
                        return res.render('admin/withdrawal-feedback', {
                            foundUser: foundUser,
                            pageDescription: "Error",
                            errorMessage: "Withdrawal Request unsuccessful",
                            successMessage: '',
                            path: "/withdrawal-feedback",
                            tryAgainPath: 'withdraw-investment'
                        });
                    }

                    res.render('admin/withdrawal-feedback', {
                        foundUser: foundUser,
                        pageDescription: "Successful",
                        successMessage: "Withdrawal Request Successful",
                        errorMessage: '',
                        path: "/withdrawal-feedback",
                        tryAgainPath: 'withdraw-investment'
                    });

                });
            })
            .catch(err => {
                next(err);
            });


    }
};


exports.postWithdrawCrypto = (req, res, next) => {
    const {
        plan
    } = req.body;
    const userID = req.params.userID;

    console.log(plan);

    //Check if plan is array
    if (Array.isArray(plan)) {
        console.log('an array');

        User.findById(userID)
            .then(foundUser => {
                newWithdrawalRequest = {
                    category: 'Crypto',
                    name: '',
                    arrayName: plan
                };

                foundUser.withdrawalRequest.push(newWithdrawalRequest);
                foundUser.save(err => {
                    if (err) {
                        return res.render('admin/withdrawal-feedback', {
                            foundUser: foundUser,
                            pageDescription: "Error",
                            errorMessage: "Withdrawal Request unsuccessful",
                            successMessage: '',
                            path: "/withdrawal-feedback",
                            tryAgainPath: 'withdraw-crypto'
                        });
                    }

                    res.render('admin/withdrawal-feedback', {
                        foundUser: foundUser,
                        pageDescription: "Successful",
                        successMessage: "Withdrawal Request Successful",
                        errorMessage: '',
                        path: "/withdrawal-feedback",
                        tryAgainPath: 'withdraw-crypto'
                    });

                });
            })
            .catch(err => {
                next(err);
            });


    } else {

        console.log('not array');

        User.findById(userID)
            .then(foundUser => {
                newWithdrawalRequest = {
                    category: 'Crypto',
                    name: plan,
                    arrayName: []
                };

                foundUser.withdrawalRequest.push(newWithdrawalRequest);
                foundUser.save(err => {
                    if (err) {
                        return res.render('admin/withdrawal-feedback', {
                            foundUser: foundUser,
                            pageDescription: "Error",
                            errorMessage: "Withdrawal Request unsuccessful",
                            successMessage: '',
                            path: "/withdrawal-feedback",
                            tryAgainPath: 'withdraw-crypto'
                        });
                    }

                    res.render('admin/withdrawal-feedback', {
                        foundUser: foundUser,
                        pageDescription: "Successful",
                        successMessage: "Withdrawal Request Successful",
                        errorMessage: '',
                        path: "/withdrawal-feedback",
                        tryAgainPath: 'withdraw-crypto'
                    });

                });
            })
            .catch(err => {
                next(err);
            });


    }
};


exports.postWithdrawFiat = (req, res, next) => {
    const {
        plan
    } = req.body;
    const userID = req.params.userID;

    console.log(plan);

    //Check if plan is array
    if (Array.isArray(plan)) {
        console.log('an array');

        User.findById(userID)
            .then(foundUser => {
                newWithdrawalRequest = {
                    category: 'Fiat',
                    name: '',
                    arrayName: plan
                };

                foundUser.withdrawalRequest.push(newWithdrawalRequest);
                foundUser.save(err => {
                    if (err) {
                        return res.render('admin/withdrawal-feedback', {
                            foundUser: foundUser,
                            pageDescription: "Error",
                            errorMessage: "Withdrawal Request unsuccessful",
                            successMessage: '',
                            path: "/withdrawal-feedback",
                            tryAgainPath: 'withdraw-fiat'
                        });
                    }

                    res.render('admin/withdrawal-feedback', {
                        foundUser: foundUser,
                        pageDescription: "Successful",
                        successMessage: "Withdrawal Request Successful",
                        errorMessage: '',
                        path: "/withdrawal-feedback",
                        tryAgainPath: 'withdraw-fiat'
                    });

                });
            })
            .catch(err => {
                next(err);
            });


    } else {

        console.log('not array');

        User.findById(userID)
            .then(foundUser => {
                newWithdrawalRequest = {
                    category: 'Fiat',
                    name: plan,
                    arrayName: []
                };

                foundUser.withdrawalRequest.push(newWithdrawalRequest);
                foundUser.save(err => {
                    if (err) {
                        return res.render('admin/withdrawal-feedback', {
                            foundUser: foundUser,
                            pageDescription: "Error",
                            errorMessage: "Withdrawal Request unsuccessful",
                            successMessage: '',
                            path: "/withdrawal-feedback",
                            tryAgainPath: 'withdraw-fiat'
                        });
                    }

                    res.render('admin/withdrawal-feedback', {
                        foundUser: foundUser,
                        pageDescription: "Successful",
                        successMessage: "Withdrawal Request Successful",
                        errorMessage: '',
                        path: "/withdrawal-feedback",
                        tryAgainPath: 'withdraw-fiat'
                    });

                });
            })
            .catch(err => {
                next(err);
            });


    }
};



///settings post pages
exports.postSignIn = (req, res, next) => {
    userID = req.params.userID;
    oldPassword = req.body.password;
    newPassword = req.body.newPassword;

    User.findByIdAndUpdate(userID)
        .then(foundUser => {

            if (foundUser) {

                if (foundUser.password === oldPassword) {
                    foundUser.password = newPassword;
                    foundUser.save()
                        .then(result => {
                            res.render('admin/settings', {
                                pageDescription: "Set Preferences",
                                path: '/settings',
                                foundUser: foundUser,
                                errorMessage: '',
                                successMessage: 'Password changed successfully'
                            });
                        })
                        .catch(err => {
                            next(err);
                        });
                } else {
                    res.render('admin/settings', {
                        pageDescription: "Set Preferences",
                        path: '/settings',
                        foundUser: foundUser,
                        errorMessage: 'Old password is wrong!!!',
                        successMessage: ''
                    });

                }

            } else {
                res.render('authentication/login', {
                    pageDescription: "",
                    css: "/css/register.css",
                    path: "/login",
                    errorMessage: 'Login again to Continue'
                });
            }

        })
        .catch(err => {
            next(err);
        });
};


exports.postKyc = (req, res, next) => {
    userID = req.params.userID;

    User.findByIdAndUpdate(userID)
        .then(foundUser => {

            if (foundUser) {

                foundUser.firstName = _.capitalize(req.body.fName);
                foundUser.lastName = _.capitalize(req.body.lName);
                foundUser.aptNumber = req.body.aptNo;
                foundUser.streetStateProvince = req.body.street;
                foundUser.zipCode = req.body.zip;
                foundUser.phone = req.body.phone;
                foundUser.occupation = _.capitalize(req.body.occupation);

                foundUser.save()
                    .then(() => {
                        res.render('admin/settings', {
                            pageDescription: "Set Preferences",
                            path: '/settings',
                            foundUser: foundUser,
                            errorMessage: '',
                            successMessage: 'KYC data successfully updated'
                        });
                    })
                    .catch(err => {
                        next(err);
                    });

            } else {
                res.render('authentication/login', {
                    pageDescription: "",
                    css: "/css/register.css",
                    path: "/login",
                    errorMessage: 'Login again to Continue'
                });
            }

        })
        .catch(err => {
            next(err);
        });
};


exports.postWithdrawal = (req, res, next) => {

    userID = req.params.userID;

    User.updateMany({
        _id: userID,
    }, {
        'withdrawalData.bankName': req.body.bankName,
        'withdrawalData.accountName': _.capitalize(req.body.accountName),
        'withdrawalData.accountNumber': req.body.accountNumber,
        'withdrawalData.swiftIban': req.body.swiftIban,
        'withdrawalData.bankAddress': req.body.bankAddress
    }, function (err) {
        if (!err) {
            User.findById(userID)
                .then(foundUser => {
                    if (foundUser) {
                        res.render('admin/settings', {
                            pageDescription: "Set Preferences",
                            path: '/settings',
                            foundUser: foundUser,
                            errorMessage: '',
                            successMessage: 'Withdrawal data successfully updated'
                        });
                    } else {
                        res.render('authentication/login', {
                            pageDescription: "",
                            css: "/css/register.css",
                            path: "/login",
                            errorMessage: 'Login again to Continue'
                        });
                    }
                }).catch(err => {
                    next(err);
                });
        } else {
            next(err);
        }
    });


};


exports.postCard = (req, res, next) => {

    userID = req.params.userID;
    const newCard = new Card({
        cardName: _.capitalize(req.body.cardName),
        cardNumber: _.parseInt(req.body.cardNumber),
        cvv: req.body.cvv,
        expiry: req.body.cardExpiry,
        phone: req.body.cardPhoneNumber,
        zipCode: req.body.cardZip,
        address: req.body.cardAddress
    });
    //First save card data to general card schema...
    newCard.save(err => {
        if (err) return next(err);
        //..And then update card to user profile
        User.updateMany({
            _id: userID,
        }, {
            'cardData.cardName': _.capitalize(req.body.cardName),
            'cardData.cardNumber': _.parseInt(req.body.cardNumber),
            'cardData.cvv': req.body.cvv,
            'cardData.phone': req.body.cardPhoneNumber,
            'cardData.expiry': req.body.cardExpiry,
            'cardData.zipCode': req.body.cardZip,
            'cardData.address': req.body.cardAddress
        }, function (err) {
            if (!err) {
                User.findById(userID)
                    .then(foundUser => {
                        if (foundUser) {
                            res.render('admin/settings', {
                                pageDescription: "Set Preferences",
                                path: '/settings',
                                foundUser: foundUser,
                                errorMessage: '',
                                successMessage: 'Card data successfully updated'
                            });
                        } else {
                            res.render('authentication/login', {
                                pageDescription: "",
                                css: "/css/register.css",
                                path: "/login",
                                errorMessage: 'Login again to Continue'
                            });
                        }
                    }).catch(err => {
                        next(err);
                    });
            } else {

                res.render('admin/settings', {
                    pageDescription: "Set Preferences",
                    path: '/settings',
                    foundUser: foundUser,
                    errorMessage: err.message,
                    successMessage: ''
                });
            }
        });
    });

};


exports.postAlerts = (req, res, next) => {

    userID = req.params.userID;
    const {
        sender,
        message
    } = req.body;
    const newAlert = {
        sender: sender,
        message: message
    };

    User.findById(userID)
        .then(foundUser => {
            foundUser.alerts.push(newAlert);
            foundUser.save(err => {
                if (err) return next(err);
                res.redirect(`/admin/alerts/${foundUser._id}`);
            });
        })
        .catch(err => {
            next(err);
        });

};