const { Schema, model } = require("mongoose");
const Child = require("./Child.js");
const bcrypt = require('bcrypt');

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

// set up pre-save middleware to create password
adultSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
adultSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};


const Adult = model("Adult", adultSchema);

module.exports = Adult;
