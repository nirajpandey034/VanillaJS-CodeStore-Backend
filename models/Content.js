const mongoose = require("mongoose");

const ContentSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  htmlsnippet: {
    type: String,
    required: true,
  },
  csssnippet: {
    type: String,
    required: true,
  },
  jssnippet: {
    type: String,
    required: true,
  },
});

const Content = mongoose.model("source_codes", ContentSchema);

module.exports = Content;
