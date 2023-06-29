const mongoose = require("mongoose");

const TitleSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  liveurl: {
    type: String,
  },
});

const Title = mongoose.model("title_with_ids", TitleSchema);

module.exports = Title;
