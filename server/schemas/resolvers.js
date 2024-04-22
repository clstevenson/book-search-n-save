const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    // get all users (not needed in production, include for development)
    users: async () => await User.find({}),
  },
};

module.exports = resolvers;
