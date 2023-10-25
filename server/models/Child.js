const { Schema, model } = require("mongoose");
const Score = require("./Score.js");
const bcrypt = require('bcrypt');

const childSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  firstName: {
    type: String,
    // required: true,
    trim: true,
  },
  lastName: {
    type: String,
    // required: true,
    trim: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  grade: {
    type: Number,
  },
  age: {
    type: Number,
  },
  score: Score.schema,
});

// set up pre-save middleware to create password
childSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
childSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Child = model("Child", childSchema);

module.exports = Child;
