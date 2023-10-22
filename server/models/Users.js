const { Schema, model } = require("mongoose");
const Child = require("./Child.js");
const Parent = require("./Parent.js");

const usersSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },

  isParent: {
    type: Boolean,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});

const Users = model("Users", usersSchemaSchema);

module.exports = Users;
