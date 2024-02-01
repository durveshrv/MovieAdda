const express = require("express");
const BookingModel = require("../models/Bookings");
const authenticate = require("../middleware/authenticate");

const bookingRouter = express.Router();

// Route for creating a new booking
bookingRouter.post("/book", authenticate, async (req, res) => {
  try {
    const { movieId, seatNumber, date } = req.body;

    // Check if the required data is provided
    if (!movieId || !seatNumber || !date) {
      return res.status(400).json({ error: "Please provide all necessary information for booking." });
    }

    // Create a new booking
    const newBooking = new BookingModel({
      movie: movieId,
      date,
      seatNumber,
      user: req.user, // Assuming you have a user ID available after authentication
    });

    // Save the booking to the database
    await newBooking.save();

    res.status(201).json({ message: "Booking successful." });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = bookingRouter;
