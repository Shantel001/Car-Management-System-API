const Car = require("../models/cars");
const cloudinary = require("../config/cloudinaryConfig");

exports.addCar = async (req, res) => {
  const { make, model, year, price } = req.body;
  console.log(req.body, req.user, req.file);
  const userId = req.user.id;
  try {
    const result = await cloudinary.uploader.upload(req.file?.path);
    const car = new Car({
      make,
      model,
      year,
      price,
      imageUrl: result.secure_url,
      //   imageUrl: "result.secure_url",
      user: userId,
    });
    await car.save();
    res.status(201).json(car);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCarById = async (req, res) => {
  const { id } = req.params;
  try {
    const car = await Car.findById(id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCar = async (req, res) => {
  const { id } = req.params;
  const { make, model, year, price } = req.body;
  try {
    const car = await Car.findByIdAndUpdate(
      id,
      { make, model, year, price },
      { new: true }
    );
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCar = async (req, res) => {
  const { id } = req.params;
  try {
    const car = await Car.findByIdAndDelete(id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json({ message: "Car deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
