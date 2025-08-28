



const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking'); 

// ✅ CREATE booking
router.post('/', async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ error: 'Failed to save booking' });
  }
});

// ✅ READ all bookings
router.get('/', async (req, res) => {
  try {
    const all = await Booking.find();
    res.json(all);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Failed to fetch' });
  }
});

// ✅ READ booking by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const one = await Booking.findById(req.params.id);
//     if (!one) return res.status(404).json({ error: 'Not found' });
//     res.json(one);
//   } catch (error) {
//     console.error('Error fetching booking:', error);
//     res.status(500).json({ error: 'Failed to fetch booking' });
//   }
// });

// // ✅ UPDATE booking by ID
// router.put('/:id', async (req, res) => {
//   try {
//     const updated = await Booking.findByIdAndUpdate(
//       req.params.id,   // 🔥 was res.params
//       req.body,
//       { new: true }
//     );
//     if (!updated) return res.status(404).json({ error: 'Not Found' });
//     res.json(updated);
//   } catch (error) {
//     console.error('Error updating booking:', error);
//     res.status(500).json({ error: 'Failed to update Booking' });
//   }
// });

router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update booking
router.put('/:id', async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBooking) return res.status(404).json({ message: 'Booking not found' });
    res.json(updatedBooking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ DELETE booking by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Booking.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not Found' });
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ error: 'Failed to delete booking' });
  }
});

module.exports = router;
