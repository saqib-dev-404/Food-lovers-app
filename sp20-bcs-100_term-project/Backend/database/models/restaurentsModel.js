const mongoose = require("mongoose");

const restaurentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Restaurent name is required"],
  },
  description: {
    type: String,
    required: [true, "Restaurent description is required"],
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
  location: {
    type: String,
    required: [true, "Restaurent location is required"],
  },
  phone: {
    type: String,
    required: [true, "Restaurent phone is required"],
  },
  category: {
    type: String,
    required: [true, "Restaurent category is required"],
  },
  menu: [
    {
      name: {
        type: String,
        required: [true, "Menu name is required"],
      },
      price: {
        type: Number,
        required: [true, "Menu price is required"],
      },
      description: {
        type: String,
        required: [true, "Menu description is required"],
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
      category: {
        type: String,
        required: [true, "Menu category is required"],
      },
      discount: {
        type: Number,
        default: 0,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      isAvailable: {
        type: Boolean,
        default: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  timings: {
    type: String,
    required: [true, "Restaurent timings is required"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
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
  ratings: {
    type: Number,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Restaurent", restaurentSchema);
