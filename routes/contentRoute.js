const express = require("express");
const router = express.Router();
require("dotenv").config();
const ContentModel = require("../models/Content");
const TitleModel = require("../models/Title");
const { ObjectId } = require("mongodb");
const auth = require("../middleware/auth");

//get all contents
router.get("/get_content", async (req, res, next) => {
  try {
    await ContentModel.find({})
      .then((contents) => {
        return res.json({ data: contents });
      })
      .catch((error) => {
        return res.json({ error: error });
      });
  } catch (error) {
    return res.status(500).send("Error Occured: " + error.message);
  }
});

// post content
router.post("/post_content", auth, async (req, res) => {
  const content = new ContentModel(req.body);
  let title = {};

  try {
    const data = await content.save();
    title = new TitleModel({
      title: content.title,
      id: data._id.valueOf(),
      liveurl: content.liveurl,
    });
    await title.save();
    return res
      .status(200)
      .json({ info: `${content.title} is added successfully` });
  } catch (error) {
    return res.status(500).json({ error: "Error Occured: " + error.message });
  }
});
// get title with ids
router.get("/get_titles", async (req, res) => {
  try {
    await TitleModel.find({})
      .then((titles) => {
        return res.json({ data: titles });
      })
      .catch((error) => {
        return res.json({ error: error });
      });
  } catch (error) {
    return res.status(500).send("Error Occured: " + error.message);
  }
});

router.post("/get_content_with_id", async (req, res) => {
  const _id = req.body.id;
  try {
    await ContentModel.find({ _id: new ObjectId(_id) })
      .then((content) => {
        return res.json({ data: content });
      })
      .catch((error) => {
        return res.json({ error: error });
      });
  } catch (error) {
    return res.status(500).send("Error Occured: " + error.message);
  }
});

router.post("/search_item", async (req, res) => {
  const searchStr = req.body.title;
  try {
    const response = await TitleModel.find({
      title: { $regex: searchStr, $options: "i" },
    });
    return res.status(200).json({ data: response });
  } catch (err) {
    return res.status(500).send("Error Occured: " + err.message);
  }
});
router.get("/", (req, res, next) => {
  res.status(200).json({
    "Route 1": "/get_content",
    "Route 2": "/post_content",
    "Route 3": "/get_titles",
    "Route 4": "/get_content_with_id",
  });
});

module.exports = router;
