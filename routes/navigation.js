//jshint esversion:6
const express = require('express');
const router = express.Router();

const navController = require('../controllers/nav-controller');

router.get('/', navController.getIndex)
.get('/contact', navController.getContact)
.post('/contact', navController.postContact)
.get('/products', navController.getProducts)
.get('/faqs', navController.getFAQs)
.get('/terms-and-conditions', navController.getTerms)
.get('/complaints-procedure', navController.getComplaints)
.get('/cookies', navController.getCookies)
.get('/forget-password', navController.getForgetPassword)

module.exports = router;