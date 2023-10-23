const { Schema, model } = require("mongoose");

const scoreSchema = new Schema({
  animal: {
    type: [Number],
  },
  language: {
    type: [Number],
  },
  math: {
    type: [Number],
  },
});

function calculateLast10Average(subject) {
  return function () {
    const last10 = this[subject].slice(-10);

    const sum = last10.reduce((total, score) => total + score, 0);

    let avg;

    if (last10.length === 10) {
      avg = sum / 10;
    } else {
      avg = sum / last10.length;
    }

    return avg;
  };
}

scoreSchema
  .virtual("last10ScienceScores")
  .get(calculateLast10Average("science"));
scoreSchema.virtual("last10MathScores").get(calculateLast10Average("math"));
scoreSchema.virtual("last10LangScores").get(calculateLast10Average("language"));

const Score = model("Score", scoreSchema);

module.exports = Score;
