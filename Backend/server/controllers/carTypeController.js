const CarType = require('../models/CarType');

exports.getCarType = async (req, res) => {
  try {
    const type = await CarType.find();
    res.json(type);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching Type', error: err.message });
  }
};
