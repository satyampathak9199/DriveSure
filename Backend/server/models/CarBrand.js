
const mongoose = require('mongoose');

const carModelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }
});

const carBrandSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  models: [carModelSchema]
});

module.exports = mongoose.model('CarBrand', carBrandSchema);
