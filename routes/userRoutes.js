const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getUsers,
  deleteUser,
} = require("../controllers/userController");
const { verifyToken } = require("../middlewares/authMiddleware");
const { verifyAdmin } = require("../middlewares/roleMiddleware");
const { validateRegister } = require("../utils/inputValidation");
const { addCar, getCarByUser } = require("../controllers/carController");

router.post("/register", validateRegister, register);
router.post("/login", login);
router.get("/users", verifyToken, verifyAdmin, getUsers);
router.delete("/users/:id", verifyToken, verifyAdmin, deleteUser);

// Bonus Feature
router.get("/:userId/cars", verifyToken, verifyAdmin, getCarByUser);

module.exports = router;
