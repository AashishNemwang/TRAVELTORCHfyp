// const express = require("express");
// const router = express.Router();
// const bookingController = require("../controllers/bookingController");
// const { verifyToken, isAdmin, isTraveler, isAgency } = require("../middleware/authMiddleware");

// // router.post("/add", verifyToken, isTraveler, bookingController.addBooking);
// router.get("/traveler", verifyToken, isTraveler, bookingController.getTravelerBookings);
// router.get("/agency", verifyToken, isAgency, bookingController.getAgencyBookings);
// router.get("/all", verifyToken, isAdmin, bookingController.getAllBookings);
// router.put("/:id/status", verifyToken, isAgency, bookingController.updateBookingStatus);

// module.exports = router;