const db = require("../models");

const Event = db.events

const createEvent = async (name, date, capacity) => {
  const event = new Event({ name, date, capacity });
  return await event.save();
};

const getAllEvents = async () => {
  return await Event.find().sort({ date: 1 });
};

const getEventById = async (id) => {
  const event = await Event.findById(id);
  if (!event) throw new Error('Event not found');
  return event;
};

const updateEvent = async (id, updateData) => {
  const updated = await Event.findByIdAndUpdate(id, updateData, { new: true });
  if (!updated) throw new Error('Event not found or update failed');
  return updated;
};

const deleteEvent = async (id) => {
  const deleted = await Event.findByIdAndDelete(id);
  if (!deleted) throw new Error('Event not found or already deleted');
  return deleted;
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
