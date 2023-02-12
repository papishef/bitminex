//jshint esversion:6
const _ = require('lodash');
// const randomize = require('randomatic');
// const express = require('express');
const helper = require('../utils/functions');
const Message = require('../models/message');


exports.getIndex = (req, res, next) => {

    // Make a request
    Promise.all([helper.crypto(), helper.forex(), helper.stocks(), helper.commodities(), helper.news()])
        .then(function (response) {
            // handle successs
            
            if (!response.isAxiosError) {
                //console.log(response[1].data.rates);
                const crypto_data = response[0].data;
                const forex_data = response[1].data;
                const stocks_data = response[2].data;
                const metal_data = response[3].data;
                const news_data_dirty = response[4].data
                //NEWS DATA
                news_data_1 = () => {
                    if(response[4].isAxiosError === true) return 'error';
                    return news_data_dirty.slice(0, 5);
                };
                news_data_2 = () => {
                    if(response[4].isAxiosError === true) return 'error';
                    return news_data_dirty.slice(5, 10);
                };
                news_data_3 = () => {
                    if(response[4].isAxiosError === true) return 'error';
                    return news_data_dirty.slice(10, 15);
                };

                //BTC
                btc = crypto_data[0];
                btcPrice = _.round(btc.price, 2);
                btcPriceChangePct = btc['1h'].price_change_pct;
                btcLogo = btc.logo_url;
                //ETH
                eth = crypto_data[1];
                ethPrice = _.round(eth.price, 2);
                ethPriceChangePct = eth['1h'].price_change_pct;
                ethLogo = eth.logo_url;
                //XRP
                xrp = crypto_data[2];
                xrpPrice = _.round(xrp.price, 2);
                xrpPriceChangePct = xrp['1h'].price_change_pct;
                xrpLogo = xrp.logo_url;
                //USDT
                usdt = crypto_data[3];
                usdtPrice = _.round(usdt.price, 2);
                usdtPriceChangePct = usdt['1h'].price_change_pct;
                usdtLogo = usdt.logo_url;
                //LTC
                ltc = crypto_data[4];
                ltcPrice = _.round(ltc.price, 2);
                ltcPriceChangePct = ltc['1h'].price_change_pct;
                ltcLogo = ltc.logo_url;
                //BCH
                bch = crypto_data[5];
                bchPrice = _.round(bch.price, 2);
                bchPriceChangePct = bch['1h'].price_change_pct;
                bchLogo = bch.logo_url;
                //BNB
                bnb = crypto_data[6];
                bnbPrice = _.round(bnb.price, 2);
                bnbPriceChangePct = bnb['1h'].price_change_pct;
                bnbLogo = bnb.logo_url;
                //XLM
                xlm = crypto_data[7];
                xlmPrice = _.round(xlm.price, 2);
                xlmPriceChangePct = xlm['1h'].price_change_pct;
                xlmLogo = xlm.logo_url;
                //XMR
                xmr = crypto_data[8];
                xmrPrice = _.round(xmr.price, 2);
                xmrPriceChangePct = xmr['1h'].price_change_pct;
                xmrLogo = xmr.logo_url;
                //TRX
                trx = crypto_data[9];
                trxPrice = _.round(trx.price, 2);
                trxPriceChangePct = trx['1h'].price_change_pct;
                trxLogo = trx.logo_url;

                //FOREX DATA
                gbp_usd = () => {
                    if (forex_data.rates !== null) return forex_data.GBPUSD;
                    return "not currently available";
                };
                usd_jpy = () => {
                    if (forex_data.rates !== null) return forex_data.USDJPY;
                    return "not currently available";
                };
                usd_cny = () => {
                    if (forex_data.rates !== null) return forex_data.USDCNY;
                    return "not currently available";
                };
                usd_chf = () => {
                    if (forex_data.rates !== null) return forex_data.USDCHF;
                    return "not currently available";
                };
                usd_nzd = () => {
                    if (forex_data.rates !== null) return forex_data.USDNZD;
                    return "not currently available";
                };
                eur_usd = () => {
                    if (forex_data.rates !== null) return forex_data.EURUSD;
                    return "not currently available";
                };
                eur_gbp = () => {
                    if (forex_data.rates !== null) return forex_data.EURGBP;
                    return "not currently available";
                };

                //STOCKS DATA
                appl = () => {
                    if(response[2].isAxiosError === true) return 'error';
                    return stocks_data[0];
                };
                tsla =  () => {
                    if(response[2].isAxiosError === true) return 'error';
                    return stocks_data[1];
                };
                googl =  () => {
                    if(response[2].isAxiosError === true) return 'error';
                    return stocks_data[2];
                };
                amzn =  () => {
                    if(response[2].isAxiosError === true) return 'error';
                    return stocks_data[3];
                };
                msft =  () => {
                    if(response[2].isAxiosError === true) return 'error';
                    return stocks_data[4];
                };
                adbe =  () => {
                    if(response[2].isAxiosError === true) return 'error';
                    return stocks_data[5];
                };
                ebay =  () => {
                    if(response[2].isAxiosError === true) return 'error';
                    return stocks_data[6];
                };

                //METAL DATA
                gold = metal_data[0].gold;
                console.log(1);
                console.log(response[4].isAxiosError);
                silver = metal_data[2].silver;
                palladium = metal_data[3].palladium;

                // res.send(btcPriceChangePct);
                res.render('navigation/index', {
                    pageDescription: "Welcome to the World's Fastest Growing Crypto Mining and Investment Platform",
                    css: "/css/styles.css",
                    path: "/",
                });
            } else {
                res.render('navigation/index', {
                    pageDescription: "Welcome to the World's Fastest Growing Crypto Mining and Investment Platform"
                });
            }

        })
        .catch(function (error) {
            // handle error
            console.log(error);
            next(error.message);
        })
        .then(function (response) {
            // always executed
        });

};

exports.getContact = (req, res, next) => {
    res.render('navigation/contact', {
        pageDescription: 'Quick Contact',
        css: "/css/register.css",
        path: "/contact",
        messageSent: ''
    });
};


exports.postContact = (req, res, next) => {
    const message = new Message({
        senderName: req.body.contactName,
        senderEmail: req.body.contactEmail,
        senderPhone: req.body.contactPhone,
        subject: req.body.subject,
        message: req.body.message
    });

    message.save()
        .then(result => {
            res.render('navigation/contact', {
                pageDescription: 'Quick Contact',
                css: "/css/register.css",
                path: "/contact",
                messageSent: 'Your message has been received and we typically reply back within 30 minutes'
            });
        }).catch(err => {
            next(err);
        });
};


exports.getProducts = (req, res, next) => {
    res.render('navigation/products', {
        pageDescription: 'Our Products and Opportunities',
        css: "/css/register.css",
        path: "/products"
    });
};


exports.getFAQs = (req, res, next) => {
    res.render('navigation/faqs', {
        pageDescription: 'Frequently Asked Questions',
        css: "/css/register.css",
        path: "/faqs"
    });
};


exports.getTerms = (req, res, next) => {
    res.render('navigation/t-and-c', {
        pageDescription: 'Website Terms and Conditions',
        css: "/css/register.css",
        path: "/terms-and-conditions"
    });
};


exports.getComplaints = (req, res, next) => {
    res.render('navigation/complaints-procedure', {
        pageDescription: 'Complaints Procedure',
        css: "/css/register.css",
        path: "/complaints-procedure"
    });
};


exports.getCookies = (req, res, next) => {
    res.render('navigation/cookies', {
        pageDescription: 'Cookies',
        css: "/css/register.css",
        path: "/complaints-procedure"
    });
};


exports.getForgetPassword = (req, res, next) => {
    res.render('navigation/success-error', {
        pageDescription: "Reset Password",
        error: "Due to security reasons, you can not automatically reset your password, please write to us via helpdesk@bit-minex.com to receive help within 30 minutes",
        css: "/css/register.css",
        path: '/error'
    });
};