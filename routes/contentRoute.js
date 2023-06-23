const express = require("express");
const router = express.Router();
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ContentModel = require("../models/Content");

router.get("/get_content", async (req, res, next) => {
  try {
    await ContentModel.find({})
      .then((contents) => {
        res.json({ data: contents });
      })
      .catch((error) => {
        res.json({ error: error });
      });
  } catch (error) {
    res.status(500).send("Error Occured: " + error.message);
  }
});

router.post("/post_content", async (req, res) => {
  const content = new ContentModel(req.body);
  console.log(content);
  try {
    await content.save();
    res.status(200).json({ info: `${content.title} is added successfully` });
  } catch (error) {
    res.status(500).json({ error: "Error Occured: " + error.message });
  }
});
router.get("/", (req, res, next) => {
  res.send("Welcome Sir");
});

module.exports = router;
