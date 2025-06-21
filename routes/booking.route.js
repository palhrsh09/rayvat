const express = require('express');
const router = express.Router();
const bookingController = require("../controllers/booking.controller");

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Booking operations
 */

/**
 * @swagger
 * /api/v1/bookings:
 *   post:
 *     summary: Book an event
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventId
 *             properties:
 *               eventId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Event booked
 *       400:
 *         description: Error occurred
 */
router.post("/", bookingController.bookEvent);

/**
 * @swagger
 * /api/v1/bookings/export:
 *   get:
 *     summary: Export all bookings as CSV
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: CSV file of bookings
 *       500:
 *         description: Error occurred
 */
router.get("/export", bookingController.exportBookings);

module.exports = router;
