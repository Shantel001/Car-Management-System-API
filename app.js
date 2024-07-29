const express = require("express");
const connectDB = require("./config/db");
const passport = require("passport");
const session = require("express-session");
const rateLimit = require("./utils/ratelimit");
require("dotenv").config();
require("./config/passport");
const authRoutes = require("./routes/userRoutes");
const carRoutes = require("./routes/carRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(rateLimit);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/cars", carRoutes);
app.use("/api/v1/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Car Lot Management System");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
