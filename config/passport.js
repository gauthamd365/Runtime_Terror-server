const passport = require("passport");
const User = require("../models/user/user.model");

passport.serializeUser((user, done) => {
  // console.log("serializeUser", user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  // console.log("deserializeUser", id);
  const currentUser = await User.findOne({ id }).exec();
  done(null, currentUser);
});
