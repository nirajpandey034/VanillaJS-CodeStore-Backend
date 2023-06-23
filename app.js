const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const DBConnect = require("./config/database");
const port = process.env.APP_PORT || 3000;

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

app.use(express.json());
app.use(cors());
app.options("*", cors());

DBConnect(); //connection to db

//routes
const contentRoute = require("./routes/contentRoute");
const userRoute = require("./routes/userRoute");

app.use("/content", contentRoute);
app.use("/user", userRoute);
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/", (req, res) => {
  res.status(500).json({
    info: "Get Full API Documentation: https://dull-puce-badger-tux.cyclic.app/doc/",
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
