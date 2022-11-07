const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true,
  },
  lastName: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true,
  },
  username: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },

});

// UserSchema.pre("save", async function () {
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

UserSchema.methods.createVerificationToken = async function () {
  return jwt.sign(
    { username: this.username, id: this.id },
    process.env.SECRET,
    { expiresIn: "1d" }
  );
};

// UserSchema.methods.checkPassword = async function ( password) {
//   const isMatch = await bcrypt.compare( password, this.password);
//   console.log(isMatch);
//   return isMatch;
// };

module.exports = mongoose.model("User", UserSchema);
