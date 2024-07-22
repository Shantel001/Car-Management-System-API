const express = require("express");
const router = express.Router();

const { register, login, getUsers } = require("../controllers/authController");
const { verifyToken } = require("../middlewares/authMiddleware");
const { verifyAdmin } = require("../middlewares/roleMiddleware");
const { validateRegister } = require("../utils/inputValidation");

router.post("/register", validateRegister, register);
router.post("/login", login);
router.get("/users", verifyToken, verifyAdmin, getUsers);

module.exports = router;
