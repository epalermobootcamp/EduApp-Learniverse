const { Schema, model } = require("mongoose");

const wordSchema = new Schema({
  word: {
    type: String,
    required: true,
  },
  phonetic: {
    type: Boolean,
    required: true,
  },
  letterCount: {
    type: Number,
    required: true,
  },
  clue: {
    type: String,
    required: true,
  },
  digraph: {
    type: Boolean,
    required: true,
  },
});

const Word = model("Word", wordSchema);

module.exports = Word;
