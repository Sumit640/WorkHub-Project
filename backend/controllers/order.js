const Order = require("../src/models/order");

exports.createOrder = (req,res) => {
  const orders = new Order({
    orderId: req.body.orderId,
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
  const empId = req.query.eId;
  const pageSize = +req.query.pagesize;
  const currentpage = +req.query.page;
  const OrderQuery = Order.find();

  if(pageSize && currentpage) {
    OrderQuery.skip(pageSize*(currentpage - 1)).limit(pageSize);
  }

  OrderQuery.then((orders) => {
    res.status(200).json({
      message: 'Order submitted succesfully',
      orders: orders
    });
  });
};
