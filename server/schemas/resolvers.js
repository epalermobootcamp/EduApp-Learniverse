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
      return Child.findOne({username}).populate('score')
    },
    words: async (parent,{letterCount}) => {
      return Language.find(params).sort({letterCount:1, word: 1});
    },
    animals: async (parent, {})
  },
};

module.exports = resolvers;
