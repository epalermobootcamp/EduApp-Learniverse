const { Adult, Child, Language, Animal, Score } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

// Import the isUsernameUnique function from the utils folder
const isUsernameUnique = require("../utils/uniqueUsername");

const resolvers = {
  Query: {
    adult: async (parent, args, context) => {
      if (context.args.username) {
        return Adult.findOne({ _id: context.user._id }).populate("children");
      }
      throw AuthenticationError;
    },

    child: async (parent, args, context) => {
      if (context.args.username) {
        return Child.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
    score: async (parent, args) => {
      return Child.findOne({ username });
    },
    words: async (parent, { letterCount }) => {
      return Language.find(params).sort({ letterCount: 1, word: 1 });
    },
    animals: async (parent, args) => {
      return Animal.find();
    },
    findAnimal: async (parent, args) => {
      console.log(args._id);
      return Animal.findById(args._id);
    },
  },
  Mutation: {
    addAdult: async (
      parent,
      { username, email, password }
    ) => {
      const isUnique = await isUsernameUnique(username);
      if (!isUnique) {
        throw new Error('Username is not unique.');
      }
      const adult = await Adult.create({
        username,
        email,
        password,
      });
      const token = signToken(adult);
      return { token, adult };
    },
    addChild: async (parent, { username, password }) => {
      // Check if the username is unique using the imported function
      const isUnique = await isUsernameUnique(username);
      if (!isUnique) {
        throw new Error('Username is not unique.');
      }
      const child = await Child.create({ username, password });
      const token = signToken(child);
      return { token, child };
    },
    updateChild: async (parent, args, context) => {
      if (context.user) {
        return Child.findByIdAndUpdate(context.user.id, args, {
          new: true,
        });
      }
    },
    updateAdult: async (parent, args, context) => {
      if (context.user) {
        return Adult.findByIdAndUpdate(context.user.id, args, {
          new: true,
        });
      }
    },
    updateMathScore: async (parent, { newMathScore }, context) => {
      try {
        if (!context.user) {
          throw new Error("User not authenticated");
        }

        const { username } = context.user;

        // Find the child by username
        const child = await Child.findOne({ username });

        if (!child) {
          throw new Error("Child not found");
        }

        // Update the math score
        child.score.math.unshift(newMathScore);

        // Save the updated child document
        const updatedChild = await child.save();

        return updatedChild;
      } catch (error) {
        throw new Error(`Failed to update math score: ${error.message}`);
      }
    },
    login: async (parent, { username, password }) => {
      // Look up the user by the provided username.
      const childUser = await Child.findOne({ username });
      const adultUser = await Adult.findOne({ username });
      // If there is no user with that username, return an Authentication error stating so
      if (!childUser && !adultUser) {
        throw AuthenticationError;
      }
      // If there is a user found, execute the `isCorrectPassword` instance method and check if the correct password was provided
      let user;
      if (childUser) {
        user = childUser;
      } else {
        user = adultUser;
      }
    
      const correctPw = await user.isCorrectPassword(password);
      // If the password is incorrect, return an Authentication error stating so
      if (!correctPw) {
        throw AuthenticationError;
      }
      // If email and password are correct, sign user into the application with a JWT
      const token = signToken(user);
      // Return an `Auth` object that consists of the signed token and user's information
      return { token, user };
    },
  },
};

module.exports = resolvers;
