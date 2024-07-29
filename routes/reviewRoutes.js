const express = require("express");
const router = express.Router();
const { addReview, getReviews } = require("../controllers/reviewController");
const { verifyToken } = require("../middlewares/authMiddleware");
const { verifyUser } = require("../middlewares/roleMiddleware");

// router.post("/cars/:id/reviews", verifyToken, verifyUser, addReview);
router.route("/").get(getReviews);

module.exports = router;
