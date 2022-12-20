const mongoose = require("mongoose");

const vloggerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Vlogger name is required"],
  },
  age: {
    type: Number,
    required: [true, "Vlogger age is required"],
  },
  description: {
    type: String,
    required: [true, "Vlogger description is required"],
  },
  image: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Vlogger", vloggerSchema);
