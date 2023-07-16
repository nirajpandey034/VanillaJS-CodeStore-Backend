const express = require("express");
const router = express.Router();
require("dotenv").config();
const CommentModal = require("../models/Comment");

// Add comment
router.post("/add_comment", async (request, response) => {
  try {
    // getting input
    const { id, title, comment } = request.body;
    const data = await CommentModal.create({
      id,
      title,
      comment,
    });

    // return new user
    return response.status(200).json({ success: true });
  } catch (err) {
    return response.status(500).json({ success: false });
  }
});
router.get("/get_comments", async (request, response) => {
  try {
    const data = await CommentModal.find({});
    console.log(data);
    return response.status(200).json({ success: true, comments: data });
  } catch (err) {
    return response.status(500).json({ success: false });
  }
});

module.exports = router;
