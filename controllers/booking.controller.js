const bookingService = require("../services/booking.service");
const { Parser } = require("json2csv");

const bookEvent = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { eventId } = req.body;

    const booking = await bookingService.bookEvent(userId, eventId);
    res.status(201).json({ message: "Event booked", booking });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const exportBookings = async (_req, res) => {
  try {
    const bookings = await bookingService.getAllBookingsWithDetails();

    const fields = ["_id", "user.name", "user.email", "event.name", "event.date"];
    const parser = new Parser({ fields });
    const csv = parser.parse(bookings);

    res.header("Content-Type", "text/csv");
    res.attachment("bookings.csv");
    res.send(csv);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  bookEvent,
  exportBookings,
};
