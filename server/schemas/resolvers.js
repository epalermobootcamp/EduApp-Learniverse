const { Parent, Child, Language, Science, Score } = require("../models");

const resolvers = {
  Query: {
    parent: async (parent, args, context) => {
      if (context.args.username) {
        return Parent.findOne({ _id: context.user._id }).populate("children");
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
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    addParent: async (parent, { username, email, password }) => {
      const parent = await Parent.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(user);
      return { token, user };
    },
    adChild: async (parent, { username, password }) => {
      const child = await Child.create({ username, password });
      const token = signToken(user);
      return { token, user };
    },
    createCardMatch: async (parent, args) => {
      const cardMatch = await cardMatch.create(args);
      return cardMatch;
    },
    updateChild: async (parent, args, context) => {
      if (context.user) {
        return Child.findByIdAndUpdate(context.user.id, args, {
          new: true,
        });
      } 
  },
  updateParent: async (parent, args, context) => {
    if (context.user) {
      return Parent.findByIdAndUpdate(context.user.id, args, {
        new: true,
      });
    } 
},
updateUser: async (parent, args, context) => {
  if (context.user) {
    return User.findByIdAndUpdate(context.user.id,args, {new: true});
  }
},
};

module.exports = resolvers;
