const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  capacity: {
    type: Number,
    required: true,
    min: 1
  }
}, {
  timestamps: true 
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
