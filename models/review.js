// models/ratings.js
const mongoose = require("mongoose");

const RformSchema = new mongoose.Schema({
  doctorRegisterNo: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
    required: true,
  },
  ratingCount: {
    type: Number,
    default: 0,
    required: true,
  },
});

const Rform = mongoose.model("ratings", RformSchema);

module.exports = Rform;
