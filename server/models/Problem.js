const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  grade: Number,
  sent: Boolean,
  filePath: String,
  description: String,
  created: Date,
});

module.exports = mongoose.model("Problem", schema);
