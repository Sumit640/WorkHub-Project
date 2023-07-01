const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  orderId: {type: String, required: true},
  employeeId: {type: String, required: true},
  orderDate: {type: Date, required: true},
  orderDay: {type:  String, required: true},
  breakfastType: {type: String},
  lunchType: {type: String}
});

module.exports = mongoose.model('Order',orderSchema);