const { Schema, model } = require("mongoose");

const animalSchema = new Schema({
  animal: {
    type: indexedDB,String,
    required: true,

  }
  trophicLvl: {
    type: String,
    required: true,
  },
  habitat: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  locomotion: {
    type: String,
    required: true,
  },
  covering: {
    type: String,
    required: true,
  },
});

const Animal = model("Animal", animalSchema);

module.exports = Animal;
