const express = require("express");
const router = express.Router();
const {
  addCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
} = require("../controllers/carController");
const { verifyToken } = require("../middlewares/authMiddleware");
const { verifyAdmin, verifyUser } = require("../middlewares/roleMiddleware");
const uploadMiddleware = require("../middlewares/uploadMiddleware");
const { addReview } = require("../controllers/reviewController");

router.use(verifyToken, verifyAdmin);

router.route("/").get(getCars).post(uploadMiddleware, addCar);

router.route("/:id").get(getCarById).patch(updateCar).delete(deleteCar);

router.get("/user/:id/cars");

router.post("/:id/reviews", verifyToken, verifyUser, addReview);

module.exports = router;
