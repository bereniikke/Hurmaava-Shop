const mongoose = require('mongoose');

// Define the schema for orders
const orderSchema = new mongoose.Schema({
  productType: { type: String, required: true },
  fabric: { type: String, required: true },
  size: { type: String, required: true }, 
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  totalCost: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

// Create a model for orders using the schema
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
