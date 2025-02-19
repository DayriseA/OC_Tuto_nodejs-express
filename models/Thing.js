const mongoose = require('mongoose');

// Create a schema for the Thing model
// A schema is a blueprint for creating objects in MongoDB
const thingSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  userId: { type: String, required: true },
});

module.exports = mongoose.model('Thing', thingSchema);