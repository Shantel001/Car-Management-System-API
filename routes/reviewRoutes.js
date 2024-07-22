const express = require("express");
const router = express.Router();
const { addReview, getReviews } = require("../controllers/reviewController");
const { verifyToken } = require("../middlewares/authMiddleware");
const { verifyUser } = require("../middlewares/roleMiddleware");

router.post("/cars/:id/reviews", verifyToken, verifyUser, addReview);
router.get("/cars/:id/reviews", getReviews);

module.exports = router;
