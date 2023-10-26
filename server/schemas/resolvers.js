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
      { addAdultInput } //! args.addAdultInput
    ) => {
      let { username, password, email } = addAdultInput;
      // console.log("Add adult 1.", )
      const isUnique = await isUsernameUnique(username);
      // console.log("Add adult 2.")
      if (!isUnique) {
        throw new Error("Username is not unique.");
      }
      // console.log("Add adult 3.", username, email, password)
      const adult = await Adult.create({
        username,
        email,
        password,
      });

      // console.log("Add adult 4.", adult)
      const token = signToken(adult);
      return { token, adultProfile: adult }; //!adultProfile must match Auth key.
    },
    addChild: async (parent, { addChildInput }) => {
      let { username, password } = addChildInput;
      console.log("Add child 1.");
      const isUnique = await isUsernameUnique(username);
      console.log("Add child 2.");
      if (!isUnique) {
        throw new Error("Username is not unique.");
      }
      console.log("Add child 3.", username, password);
      const child = await Child.create({ username, password });
      console.log("Add child 4.", child);
      const token = signToken(child);
      return { token, childProfile: child };
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
      if (childUser) {
        return { token, childProfile: user };
      } else {
        return { token, adultProfile: user };
      }
    },
  },
};

module.exports = resolvers;
