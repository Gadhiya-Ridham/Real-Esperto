const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  paymentMode: String,
  paymentValue: Number,
  propertyType: String,
  propertyName: String,
  upiId: String,
  cardNumber: {
    type: String,
  },
  crnNumber: Number,
  expiryDate: Date,
  rentTiming: String,
  bookingCode: String,
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Payment = mongoose.model(
  "paymentDetails",
  paymentSchema,
  "paymentDetails"
);

module.exports = Payment;
