const { Schema, model } = require("mongoose");
const Child = require("./Child.js");
const Adult = require("./Adult.js");

const usersSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },

  isAdult: {
    type: Boolean,
    required: true,
  },
});

const User = model("User", usersSchema);

module.exports = User;
