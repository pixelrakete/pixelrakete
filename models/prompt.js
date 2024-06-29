 const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
  name: String,
  text: String,
  folder: String,
  color: String,
  variables: [String],
  final: Boolean,
  version: Number,
  shareId: String
});

module.exports = mongoose.model('Prompt', promptSchema);
