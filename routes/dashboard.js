//jshint esversion:6
const express = require('express');
const router = express.Router();
const authChecker = require('../utils/validator');

const dashController = require('../controllers/dash-controller');

router.get('/user/:userID', authChecker.isAuth, dashController.getDash)
.get('/wallets/:userID', authChecker.isAuth, dashController.getWallets)
.get('/history/:userID', authChecker.isAuth, dashController.getHistory)
.get('/investments/:userID', authChecker.isAuth, dashController.getInvestments)
.get('/alerts/:userID', authChecker.isAuth, dashController.getAlerts)
.get('/settings/:userID', authChecker.isAuth, dashController.getSettings)
.get('/complete-investment/:userID', authChecker.isAuth, dashController.getInvestCheckout)
.post('/complete-investment/:userID', authChecker.isAuth, dashController.postInvestCheckout)
.get('/complete-wallet/:userID', authChecker.isAuth, dashController.getCryptoCheckout)
.post('/complete-wallet/:userID', authChecker.isAuth, dashController.postCryptoCheckout)
.get('/complete-fiat/:userID', authChecker.isAuth, dashController.getFiatCheckout)
.post('/complete-fiat/:userID', authChecker.isAuth, dashController.postFiatCheckout)
.get('/withdraw-investment/:userID', authChecker.isAuth, dashController.getWithdrawInvestment)
.get('/withdraw-crypto/:userID', authChecker.isAuth, dashController.getWithdrawCrypto)
.get('/withdraw-fiat/:userID', authChecker.isAuth, dashController.getWithdrawFiat)
.post('/withdraw-invest/:userID', authChecker.isAuth, dashController.postWithdrawInvestment)
.post('/withdraw-crypto/:userID', authChecker.isAuth, dashController.postWithdrawCrypto)
.post('/withdraw-fiat/:userID', authChecker.isAuth, dashController.postWithdrawFiat)


///settings Update route
.post('/sign-in/:userID', authChecker.isAuth, dashController.postSignIn)
.post('/kyc/:userID', authChecker.isAuth, dashController.postKyc)
.post('/withdrawal/:userID', authChecker.isAuth, dashController.postWithdrawal)
.post('/card/:userID', authChecker.isAuth, dashController.postCard)
.post('/alerts/:userID', authChecker.isAuth, dashController.postAlerts);


module.exports = router;