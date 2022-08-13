require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const passport = require("passport");
const bcrypt = require("bcrypt")
const uuid = require("uuid")
const jwt = require("jsonwebtoken");

const User = require("./models/user.model")

require("./config/passport");
require("./config/local");

const mongodbUri = process.env.MONGO_URI;

mongoose.connect(
  mongodbUri,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (error) => {
    if (error) console.log(error);
  }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors({ credentials: true, origin: "*" }));
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/auth/local/signup", async (req, res) => {
    const { first_name, last_name, role, email, password } = req.body;
  
    if (password.length < 8) {
      req.json(
        "error",
        "Account not created. Password must be 7+ characters long"
      );
      return res.redirect("/local/signup");
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      let userData = await User({
        id: uuid.v4(),
        email,
        role,
        firstName: first_name,
        lastName: last_name,
        password: hashedPassword,
        source: "local"
      })
      userData.save()
      console.log(userData);
    } catch (e) {
    //   req.json(
    //     "error",
    //     "Error creating a new account. Try a different login method."
    //   );
      return res.send({success: false, error: e});
    }
  
    res.send({success: true});
  });

app.post(
  "/auth/local/signin",
  passport.authenticate("local", { session: false }),
  function (req, res) {
    console.log(req.user);
    const token = jwt.sign({ user: req.user }, process.env.JWT_KEY, {
      expiresIn: 60 * 60 * 24 * 1000,
    });
    
    res.json({ user: req.user, token: token });
  }
);

var port = process.env.PORT || 8000;

app.listen(port, function () {
  console.log(`RT-Server listening on port ${port}`);
});
