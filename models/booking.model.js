const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  },
  { timestamps: true }
);

bookingSchema.index({ user: 1, event: 1 }, { unique: true }); // prevent double booking

module.exports = mongoose.model("Booking", bookingSchema);
