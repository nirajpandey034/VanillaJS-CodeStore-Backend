const mongoose = require("mongoose");

const ContentSchema = new mongoose.Schema({
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
  liveurl: {
    type: String,
  },
});

const Content = mongoose.model("source_codes", ContentSchema);

module.exports = Content;
