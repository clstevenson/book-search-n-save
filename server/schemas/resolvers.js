const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    // get all users (not needed in production, include for development)
    users: async () => await User.find({}),
    // get single user by either ID or username (obtained from context)
    me: async (_, __, { user }) => {
      const foundUser = await User.findOne({ $or: [{ _id: user._id }, { username: user.username }], });
      if (!foundUser) return 'Error: Cannot find this user';
      return foundUser;
    },
  },
  Mutation: {
    // log in and issue a signed token
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      // no user with that email
      if (!user) throw AuthenticationError;
      // check password
      const correctPW = await user.isCorrectPassword(password);
      if (!correctPW) throw AuthenticationError;
      // sign the token and return it with the user
      const token = signToken(user);
      return { token, user };
    },
    addUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      // return with error message if no user created
      if (!user) {
        return 'Error: Something is wrong!';
      }
      // sign the JWT and return with the user
      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
