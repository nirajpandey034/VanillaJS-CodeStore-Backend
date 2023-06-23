const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const DBConnect = require("./config/database");
const port = process.env.APP_PORT || 3000;

app.use(express.json());
app.use(cors());
app.options("*", cors());

DBConnect(); //connection to db

//routes
const contentRoute = require("./routes/contentRoute");

app.use("/content", contentRoute);

app.use("/", (req, res) => {
  res.status(500).json({ info: "Hello Kammo" });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
