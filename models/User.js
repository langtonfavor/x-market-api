const { model, Schema } = require("mongoose");

const userSchema = new Schema({

  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },

  createdAt: String,

  accountBal: {
    type: String, default: '0.0'
  },
  contact: {
    type: String,
    required: true,
  },
  password: String,
});

module.exports = model("User", userSchema);
