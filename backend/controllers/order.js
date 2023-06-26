const Order = require("../src/models/order");

exports.createOrder = (req,res) => {
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
};

exports.getOrder = (req,res) => {
  Order.find()
  .then((orders) => {
    res.status(200).json({
      message: 'Order submitted succesfully',
      orders: orders
    });
  });
};
