const { Adult, Child, User, Language, Animal, Score } = require("../models");

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
        return Child.findOne({ _id: context.user._id }).populate("score");
      }
      throw AuthenticationError;
    },
    score: async (parent, args) => {
      return Child.findOne({ username }).populate("score");
    },
    words: async (parent, { letterCount }) => {
      return Language.find(params).sort({ letterCount: 1, word: 1 });
    },
    animals: async (parent, args) => {
      return Science.find(params).sort({ animal });
    },
  },
  Mutation: {
    // addAdult: async (parent, { username, email, password }) => {
    //   const adult = await Adult.create({ username, email, password });
    //   const token = signToken(adult);
    //   return { token, adult };
    // },
    // addChild: async (parent, { username, password }) => {
    //   const child = await Child.create({ username, password });
    //   const token = signToken(user);
    //   return { token, user };
    // },
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
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
    // login: async (parent, { email, password }) => {
    //   const user = await User.findOne({ email });
    //   if (!user) {
    //     throw AuthenticationError;
    //   }
    //   const correctPw = await user.isCorrectPassword(password);
    //   if (!correctPw) {
    //     throw AuthenticationError;
    //   }
    //   const token = signToken(user);
    //   return { token, user };
    // },
    // createCardMatch: async (parent, args) => {
    //   const cardMatch = await cardMatch.create(args);
    //   return cardMatch;
    // },
  },
};

module.exports = resolvers;
