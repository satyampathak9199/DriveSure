
// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,   // change to String for consistency
  carBrand: String,
  carModel: String,
  city: String,
  type: String,
  registrationNo: String,
  serviceType: String,
  pickUpDate: Date,

   status: { type: String, enum: ['Complete', 'Incomplete'], default: 'Incomplete' },
  // carDropDate:Date,
});

module.exports = mongoose.model('Booking', bookingSchema);
