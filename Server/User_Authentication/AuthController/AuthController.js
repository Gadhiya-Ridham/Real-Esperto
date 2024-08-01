const User = require("../../Models/UserModel");
const mongoose = require("mongoose");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");
const propertyDetails = require("../../Models/PropertyDetails");
const propertyImages = require("../../Models/propertyImages");
const paymentDetails = require("../../Models/paymentDetails");
const Property = require("../../Models/PropertyDetails");
const ObjectId = mongoose.Types.ObjectId;

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, firstName, lastName, createdAt } =
      req.body;
    if (!email || !password || !username) {
      return res.json({ message: "All fields are required" });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.json({ message: "Email already exists" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.json({ message: "Username already exists" });
    }
    const user = await User.create({
      email,
      password,
      username,
      firstName,
      lastName,
      createdAt,
    });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User Signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User logged in successfully", success: true });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.Update = async (req, res) => {
  try {
    const UserDetails = req.body;
    const { email } = UserDetails;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    Object.assign(user, UserDetails);
    user = await user.save();
    res
      .status(200)
      .json({ message: "User updated successfully", success: true, user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.AddProperty = async (req, res) => {
  try {
    const propertyData = req.body;

    const existingProperty = await propertyDetails.findOne({
      email: propertyData.email,
      propertyName: propertyData.propertyName,
    });

    if (existingProperty) {
      const updatedProperty = await propertyDetails.findOneAndUpdate(
        { email: propertyData.email, propertyName: propertyData.propertyName },
        { $set: propertyData },
        { new: true }
      );
      res.status(200).json({
        message: "Property Inserted successfully",
        success: true,
        property: updatedProperty,
      });
    } else {
      const existingPropertiesCount = await propertyDetails.countDocuments();

      if (existingPropertiesCount === 0) {
        propertyData.id = 1;
      } else {
        const highestProperty = await propertyDetails.findOne(
          {},
          {},
          { sort: { id: -1 } }
        );
        propertyData.id = highestProperty.id + 1;
      }

      const newProperty = await propertyDetails.create(propertyData);
      res.status(201).json({
        message: "Property added successfully",
        success: true,
        property: newProperty,
      });
    }
  } catch (error) {
    console.error("Error inserting property:", error);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

module.exports.AddImages = async (req, res) => {
  try {
    const propertyData = req.body;
    const { email, propertyName } = propertyData;

    const existingProperty = await propertyImages.findOne({
      email,
      propertyName,
    });

    if (existingProperty) {
      const updatedProperty = await propertyImages.findOneAndUpdate(
        { email, propertyName },
        propertyData,
        { new: true }
      );
      res.status(200).json({
        message: "Property updated successfully",
        success: true,
        property: updatedProperty,
      });
    } else {
      const existingPropertiesCount = await propertyImages.countDocuments();

      if (existingPropertiesCount === 0) {
        propertyData.id = 1;
      } else {
        const highestProperty = await propertyImages.findOne(
          {},
          {},
          { sort: { id: -1 } }
        );
        propertyData.id = highestProperty.id + 1;
      }

      const newProperty = await propertyImages.create(propertyData);
      res.status(201).json({
        message: "Property added successfully",
        success: true,
        property: newProperty,
      });
    }
  } catch (error) {
    console.error("Error inserting property:", error);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

module.exports.AddPayment = async (req, res) => {
  try {
    const paymentData = req.body;
    const newPayment = await paymentDetails.create(paymentData);
    res.status(201).json({
      message: "Payment successfully Done",
      success: true,
      payment: newPayment,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.GetPropertyDetails = async (req, res) => {
  propertyDetails
    .find()
    .then((details) => res.json(details))
    .catch((err) => res.json(err));
};

module.exports.GetImages = async (req, res) => {
  const { email, propertyName } = req.query;
  try {
    const imageData = await propertyImages.findOne({ email, propertyName });
    if (!imageData) {
      return res.status(404).json({ error: "Images not found" });
    }
    res.status(200).json(imageData);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.GetData = async (req, res) => {
  const { email, propertyName } = req.query;
  try {
    const imageData = await propertyImages.findOne({ email, propertyName });
    if (!imageData) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json(imageData);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.DeleteDataFromPropertyImages = async (req, res) => {
  try {
    await propertyImages.deleteMany({});
    res
      .status(200)
      .json({ message: "All Data deleted successfully", success: true });
  } catch (error) {
    console.error("Error deleting images:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.UpdatePassword = async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect current password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.GetUserData = async (req, res) => {
  User.find()
    .then((details) => res.json(details))
    .catch((err) => res.json(err));
};

module.exports.GetPaymentData = async (req, res) => {
  paymentDetails
    .find()
    .then((details) => res.json(details))
    .catch((err) => res.json(err));
};

module.exports.DeletePropertyDetailsByAdmin = async (req, res) => {
  try {
    const _id = req.params.id;

    if (!ObjectId.isValid(_id)) {
      return res.status(400).json({ message: "Invalid property ID" });
    }
    const deleteProperty = await Property.findByIdAndDelete(_id);
    if (!deleteProperty) {
      return res.status(404).json({ message: "Property not found" });
    }
    return res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("Error deleting images:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.GetPropertyDetailsByAdmin = async (req, res) => {
  try {
    const _id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: "Invalid property ID" });
    }

    const property = await Property.findById(_id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    return res
      .status(200)
      .json({ message: "Property details retrieved successfully", property });
  } catch (error) {
    console.error("Error deleting images:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
