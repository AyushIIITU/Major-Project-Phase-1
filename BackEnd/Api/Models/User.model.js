const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  GitHubProfileName:{
    type: String,
    unique:true
  },
  LeetCodeProfileName:{
    type: String,
    unique:true
  },
  HeatMap:[
    {
      date:{
        type:Date,
        default:Date.now
      },
      count:{
        type:Number,
        default:0
      }
    }
  ],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};
const User = new mongoose.model("User", userSchema);

module.exports = User;
