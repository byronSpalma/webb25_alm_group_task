/**
 * Mongoose-schema för Accommodation-modellen.
 * Representerar en boendeannons med adress, stad, land, postnummer, hyra och antal rum.
 */

const mongoose = require("mongoose");

const accommodationSchema = new mongoose.Schema({
  address:    { type: String, required: true },
  city:       { type: String, required: true },
  country:    { type: String, required: true },
  postalCode: { type: String, required: true },
  rent:       { type: Number, required: true },
  rooms:      { type: Number, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Accommodation", accommodationSchema);