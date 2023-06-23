const express = require("express");
const router = express.Router();
require("dotenv").config();
const ContentModel = require("../models/Content");
const TitleModel = require("../models/Title");

//get all contents
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

// post content
router.post("/post_content", async (req, res) => {
  const content = new ContentModel(req.body);
  let title = {};

  try {
    const data = await content.save();
    title = new TitleModel({ title: content.title, id: data._id.valueOf() });
    await title.save();
    res.status(200).json({ info: `${content.title} is added successfully` });
  } catch (error) {
    res.status(500).json({ error: "Error Occured: " + error.message });
  }
});
router.get("/", (req, res, next) => {
  res.status(200).json({ "Route 1": "get_content", "Route 2": "post_content" });
});

// get title with ids
router.get("/get_titles", async (req, res) => {
  try {
    await TitleModel.find({})
      .then((titles) => {
        res.json({ data: titles });
      })
      .catch((error) => {
        res.json({ error: error });
      });
  } catch (error) {
    res.status(500).send("Error Occured: " + error.message);
  }
});

module.exports = router;
