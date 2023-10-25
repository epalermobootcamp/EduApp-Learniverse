const { Child, Adult } = require("../models");

const isUsernameUnique = async (username) => {
    // Check if the username exists in the Child model
    const childUsername = await Child.findOne({ username });
  
    // Check if the username exists in the Adult model
    const adultUsername = await Adult.findOne({ username });
  
    // If either username exists, it's not unique
    return !childUsername && !adultUsername;
  };

  module.exports = isUsernameUnique;