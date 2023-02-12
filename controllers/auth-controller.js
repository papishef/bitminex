//jshint esversion:6
const _ = require('lodash');
const User = require('../models/user');

exports.getReg = (req, res, next) => {
    planName = req.query.plans;

    res.render('authentication/register', {
        pageDescription: "Register an Account",
        css: "/css/register.css",
        planName: planName,
        selected: "selected", //outputs html attribute selected
        path: "/register"
    });
};

exports.postReg = (req, res, next) => {
    const data = req.body;

    const user = new User({
        email: data.username,
        password: data.password,
        title: data.title,
        firstName: _.capitalize(data.fName),
        lastName: _.capitalize(data.lName),
        aptNumber: data.aptNo,
        streetStateProvince: data.street,
        zipCode: data.zip,
        phone: data.phone,
        country: data.country,
        occupation: _.capitalize(data.occupation),
        idCard: req.file.filename, 
        firstPlan: data.plans
    });

    user.save()
        .then(result => {
            User.findOne({
                    email: data.refEmail
                })
                .then(foundUser => {
                    if (foundUser) {
                        const newReferral = {
                            refName: data.fName + " " + data.lName,
                            refBonus: 0
                        };

                        foundUser.referrals.push(newReferral);
                        foundUser.save(err => {
                            if (err) return next(err);

                            res.redirect('/auth/registration-success');
                        });
                    } else {
                        res.redirect('/auth/registration-success');
                    }
                })
                .catch(err => {
                    next(err);
                });

        }).catch(err => {
            next(err);
        });

};

exports.getRegSuccess = (req, res, next) => {
    res.render('authentication/registration-success', {
        pageDescription: "Registration Successful",
        css: "/css/register.css",
        path: "/registration-success"
    });
};

exports.getLogin = (req, res, next) => {
    res.render('authentication/login', {
        pageDescription: "Log into account",
        css: "/css/register.css",
        path: "/login",
        errorMessage: ''
    });
};

exports.postLogin = (req, res, next) => {

    const sentEmail = req.body.email;
    const sentPassword = req.body.password;

    User.findOne({
            email: sentEmail
        })
        .then(foundUser => {
            if (foundUser) {
                if (foundUser.password === sentPassword) {

                    if (foundUser.active === true) {

                        if (foundUser.firstLogin === true) {
                            req.session.isAuth = true;
                            console.log(req.session.isAuth);
                            res.redirect('/admin/user/' + foundUser._id);
                        } else {

                            foundUser.firstLogin = true;

                            foundUser.save().then(result => {
                                req.session.isAuth = true;
                                
                                res.redirect('/admin/settings/' + foundUser._id);
                            }).catch(err => {
                                next(err);
                            });

                        }

                    } else {
                        res.render('authentication/registration-success', {
                            pageDescription: "Please await page moderation",
                            css: "/css/register.css",
                            path: "/registration-success"
                        });
                    }


                } else {
                    res.render('authentication/login', {
                        pageDescription: "",
                        css: "/css/register.css",
                        path: "/login",
                        errorMessage: 'Password is Incorrect'
                    });
                }
            } else {
                res.render('authentication/login', {
                    pageDescription: "",
                    css: "/css/register.css",
                    path: "/login",
                    errorMessage: 'User does not exist'
                });
            }
        })
        .catch(err => {
            next(err);
        });


};


exports.getLogOut = (req, res, next) => {
    req.session.destroy(err => {
        if (err) return next(err);
        res.redirect('/auth/login');
    });
};