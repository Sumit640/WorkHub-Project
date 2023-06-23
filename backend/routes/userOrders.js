const express = require('express');
const router = express.Router();
const Order = require("../src/models/order");
const checkAuth = require('../src/middleware/checkAuthentication');

router.post("",
  checkAuth,(req,res) => {
  const orders = new Order({
    employeeId: req.body.employeeId,
    orderDate: req.body.orderDate,
    orderDay: req.body.orderDay,
    lunchType: req.body.lunchType,
    breakfastType: req.body.breakfastType
  });

  orders.save();
  res.status(201).json({
    message: 'Order added succesfully'
  });
});

router.get("",(req,res) => {
  Order.find()
  .then((orders) => {
    res.status(200).json({
      message: 'Order submitted succesfully',
      orders: orders
    });
  });
});

module.exports = router;