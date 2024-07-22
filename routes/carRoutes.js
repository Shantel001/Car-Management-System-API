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
const { verifyAdmin } = require("../middlewares/roleMiddleware");
const uploadMiddleware = require("../middlewares/uploadMiddleware");

router.post("/cars", verifyToken, verifyAdmin, uploadMiddleware, addCar);
router.get("/cars", getCars);
router.get("/cars/:id", getCarById);
router.patch("/cars/:id", verifyToken, verifyAdmin, updateCar);
router.delete("/cars/:id", verifyToken, verifyAdmin, deleteCar);

module.exports = router;
