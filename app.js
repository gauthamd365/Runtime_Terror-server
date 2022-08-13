require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const passport = require("passport");

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
