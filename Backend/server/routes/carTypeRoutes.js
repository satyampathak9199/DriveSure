


const express = require('express');
const router = express.Router();
const carTypeController = require('../controllers/carTypeController');

// GET all types
router.get('/', carTypeController.getCarType);

// maybe later: router.post('/', carTypeController.createCarType);

module.exports = router;
