//jshint esversion:6
const axios = require('axios').default;

//HELPER FUNCTIONS
exports.crypto = () => {
    return axios.get('https://api.nomics.com/v1/currencies/ticker?key=25754705a35de3e436d16b5cd36083bf&ids=BTC,ETH,XRP,BCH,LTC,USDT,BNB,XLM,XMR,TRX&interval=1h&convert=USD');
};

exports.forex = () => {
    return axios.get('https://www.freeforexapi.com/api/live?pairs=GBPUSD,USDJPY,USDCNY,USDCHF,EURUSD,EURGBP,USDNZD');
};

exports.stocks = () => {
    var options = {
        method: 'GET',
        url: 'https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/AAPL,TSLA,GOOGL,AMZN,MSFT,ADBE,EBAY',
        headers: {
            'x-rapidapi-key': 'ba83c6922amshbc9a06567df92a6p1f18eajsn0afae6a633af',
            'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com'
        }
    };
    return axios(options);
};

exports.commodities = () => {
    return axios.get('https://api.metals.live/v1/spot');
};

exports.oil = () => {
    var options = {
        method: 'GET',
        url: 'https://brent-crude-oil-price.p.rapidapi.com/latest',
        headers: {
            'x-rapidapi-key': 'ebdef29e81mshc06f10459387787p1940b1jsna2f5aa9d97c4',
            'x-rapidapi-host': 'brent-crude-oil-price.p.rapidapi.com'
        }
    };
    return axios(options);
};

exports.news = () => {
    var options = {
        method: 'GET',
        url: 'https://yahoo-finance15.p.rapidapi.com/api/yahoo/ne/news',
        headers: {
            'x-rapidapi-key': 'ba83c6922amshbc9a06567df92a6p1f18eajsn0afae6a633af',
            'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com'
        }
    };
    return axios(options);
};

exports.languages = () => {
    var options = {
        method: 'GET',
        url: 'https://website-translation1.p.rapidapi.com/translateLanguage/supported-language',
        headers: {
            'x-rapidapi-key': 'ebdef29e81mshc06f10459387787p1940b1jsna2f5aa9d97c4',
            'x-rapidapi-host': 'website-translation1.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        //console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
};

