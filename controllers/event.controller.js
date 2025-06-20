const eventService = require('../services/event.service');

const create = async (req, res) => {
  try {
    const { name, date, capacity } = req.body;
    const event = await eventService.createEvent(name, date, capacity);
    res.status(201).json({ message: 'Event created', event });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAll = async (_req, res) => {
  try {
    const events = await eventService.getAllEvents();
    res.status(200).json({ events });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const event = await eventService.getEventById(req.params.id);
    res.status(200).json({ event });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const event = await eventService.updateEvent(req.params.id, req.body);
    res.status(200).json({ message: 'Event updated', event });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const event = await eventService.deleteEvent(req.params.id);
    res.status(200).json({ message: 'Event deleted', event });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports = { create, getAll, getById, update, remove };
