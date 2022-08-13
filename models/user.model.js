let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: [true, "email required"],
      unique: [true, "email already registered"],
    },
  
    role: {
      type: String
    },
  
    firstName: String,
    lastName: String,
    password: String,
    source: { type: String, required: [true, "source not specified"] },
    lastVisited: { type: Date, default: new Date() },
    isActive: {type: Boolean, default: false},
  
    meta: {
      profilePhoto: String,
      description: String,
      accessToken: String,
      refreshToken: String,
      phoneNumber: {type:String},
      address: String,
      city: String,
      zipcode: String,
      isPhoneVerified: {type: Boolean, required: true, default: false},
      isEmailVerified: {type: Boolean, required: true, default: false},
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref:'posts'
    }],
    
  }, {timestamps: true});
  
  var userModel = mongoose.model("users", userSchema, "users");
  
  module.exports = userModel;