const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
  },
  { collection: "adminUsers" }
); // Use a new collection name

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hashSync(this.password, 12);
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
