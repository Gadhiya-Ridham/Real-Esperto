const mongoose = require("mongoose");

const propertyImagesSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
  },
  propertyName: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  propertyInformation: String,
  hostInfromation: String,
  mainImage: String,
  images: {
    type: [String],
  },
});

const PropertyImage = mongoose.model(
  "propertyImages",
  propertyImagesSchema,
  "propertyImages"
);

module.exports = PropertyImage;
