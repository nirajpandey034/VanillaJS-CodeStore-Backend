const express = require("express");
const router = express.Router();
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ContentModel = require("../models/Content");

router.get("/get_content", async (req, response, next) => {
  try {
    await ContentModel.find({})
      .then((contents) => {
        response.json({ data: contents });
      })
      .catch((error) => {
        response.json({ error: error });
      });
  } catch (error) {
    response.status(500).send("Error Occured: " + error.message);
  }
});

router.get("/", (req, res, next) => {
  res.send("Welcome Sir");
});

module.exports = router;
