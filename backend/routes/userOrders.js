const express = require('express');
const router = express.Router();
const checkAuth = require('../src/middleware/checkAuthentication');
const OrderController = require('../controllers/order');

// Place Order
router.post("",checkAuth,OrderController.createOrder);

// Fetch Order
router.get("",OrderController.getOrder);

module.exports = router;