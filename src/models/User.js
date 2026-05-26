const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,           // ← För duplicate-testet
  },
  email: {
    type: String,
    required: true,
    unique: true,           // ← För duplicate-testet
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"], // ← För format-testet
  },
  profileImage: {
    type: String,
    match: [/^https?:\/\/.+/, "profileImage must be a valid URL"], // ← För URL-testet
  },
});

module.exports = mongoose.model("User", userSchema);