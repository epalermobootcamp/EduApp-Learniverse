const { Adult, Child, User, Language, Animal, Score } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

// Import the isUsernameUnique function from the utils folder
const isUsernameUnique = require("../utils/isUsernameUnique");

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
      { username, adultFirstName, adultLastName, email, password }
    ) => {
      const adult = await Adult.create({
        username,
        adultFirstName,
        adultLastName,
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
    addUser: async (parent, { username }) => {
      const user = await User.create({ username });
      const token = signToken(user);
      return { token, user };
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
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(context.user.id, args, { new: true });
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
      // Look up the user by the provided email address. Since the `email` field is unique, we know that only one person will exist with that email
      const user = await User.findOne({ username });
      // If there is no user with that username, return an Authentication error stating so
      if (!user) {
        throw AuthenticationError;
      }
      // If there is a user found, execute the `isCorrectPassword` instance method and check if the correct password was provided
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
