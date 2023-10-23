const { Schema, model } = require("mongoose");
const Child = require("./Child.js");

const adultSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  adultFirstName: {
    type: String,
    required: true,
    trim: true,
  },
  adultLastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  subscribed: {
    type: Boolean,
    required: true,
  },
  children: [
    {
      type: Schema.Types.ObjectId,
      ref: "Child",
    },
  ],
});

const Adult = model("Adult", adultSchema);

module.exports = Adult;
