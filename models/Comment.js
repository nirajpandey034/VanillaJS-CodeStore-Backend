const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
  },
});

const Comment = mongoose.model("comments", CommentSchema);

module.exports = Comment;
