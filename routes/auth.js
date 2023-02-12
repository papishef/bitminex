//jshint esversion:6
const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth-controller');


router.get('/register?', authController.getReg);
router.post('/register', authController.postReg);
router.get('/registration-success', authController.getRegSuccess);
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/logout', authController.getLogOut);

module.exports = router;