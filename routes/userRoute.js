const express = require("express");
const router = express.Router();
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

// user registration
router.post("/register", async (request, response) => {
  try {
    // getting input
    const { firstName, lastName, email, password } = request.body;

    //validation
    if (!(email && password && firstName && lastName)) {
      return response.status(400).send("All input is required");
    }
    //checking existing user
    const oldUser = await UserModel.findOne({ email });
    if (oldUser) {
      return response.status(409).send("User Already Exist. Please Login");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      firstName,
      lastName,
      email: email,
      password: encryptedPassword,
    });
    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "1h",
      }
    );

    // return new user
    return response.status(201).json({ token: token, success: true });
  } catch (err) {
    console.log(err);
  }
});

// user login
router.post("/login", async (request, response) => {
  try {
    // getting input
    const { email, password } = request.body;

    //validation
    if (!(email && password)) {
      return response.status(400).send("All input is required");
    }
    // getting password from db and comparing it
    const user = await UserModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "1h",
        }
      );

      // send response
      return response
        .status(200)
        .json({
          token: token,
          success: true,
          user: `${user.firstName} ${user.lastName}`,
        });
    }
    return response.status(400).json({ success: false });
  } catch (err) {
    console.log(err);
  }
});

// // User deletion
// router.delete("/delete_user", auth, async (request, response) => {
//   const user = new UserModel(request.body);

//   try {
//     await UserModel
//       .findByIdAndDelete(user._id)
//       .then((data) => {
//         response.json({ msg: `User, ${data.firstName} is deleted` });
//       })
//       .catch((error) => {
//         response.json({ error: error });
//       });
//   } catch (error) {
//     response.status(500).send("Error Occured: " + error.message);
//   }
// });

module.exports = router;
