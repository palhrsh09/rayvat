const db = require("../models")
const Booking = db.booking
const Event = db.event


const bookEvent = async (userId, eventId) => {
  const event = await Event.findById(eventId);
  if (!event) throw new Error("Event not found");

  if (event.availableSeats <= 0) {
    throw new Error("No seats available");
  }

  const existing = await Booking.findOne({ user: userId, event: eventId });
  if (existing) throw new Error("You have already booked this event");

  const booking = new Booking({ user: userId, event: eventId });
  await booking.save();

  event.availableSeats -= 1;
  await event.save();

  return booking;
};

const getAllBookingsWithDetails = async () => {
  return await Booking.find()
    .populate("user", "name email")
    .populate("event", "name date")
    .lean(); 
};

module.exports = {
  bookEvent,
  getAllBookingsWithDetails,
};
