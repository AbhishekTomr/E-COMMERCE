import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a username"],
  },
  email: {
    type: String,
    required: [true, "Please enter a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  verified: Boolean,
  verifyToken: String,
  varifyTokenExpiry: Date,
  selectedCategories: {
    type: Array,
    default: [],
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
