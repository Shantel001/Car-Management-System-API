const Review = require("../models/review");
const Car = require("../models/cars");

exports.addReview = async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  const userId = req.user.id;
  try {
    const car = await Car.findById(id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    const review = new Review({
      car: id,
      user: userId,
      rating,
      comment,
    });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getReviews = async (req, res) => {
  const { id } = req.params;
  try {
    const reviews = await Review.find({ car: id }).populate("user", "username");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
