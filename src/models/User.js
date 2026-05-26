/**
 * Mongoose-schema för User-modellen.
 * Hanterar användardata med validering för e-post och profilbild-URL.
 */

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
  },
  profileImage: {
    type: String,
    match: [/^https?:\/\/.+/, "profileImage must be a valid URL"],
  },
});

const Accommodation = require("./Accommodation");

userSchema.pre("findOneAndDelete", async function (next) {
  const userId = this.getQuery()._id;
  await Accommodation.deleteMany({ userId });
  next();
});

module.exports = mongoose.model("User", userSchema);