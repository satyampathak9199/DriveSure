 const carBrand = require ('../models/CarBrand');
exports.getCarBrand = async (req, res) => {
  try {
    const carBrand = await carBrand.find();
    res.json(carBrand);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings', error: err.message });
  }
};