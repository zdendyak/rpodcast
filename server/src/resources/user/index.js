const userResolvers = require('./user.resolvers');
const userType = require('./user.graphql');

module.exports = {
  userResolvers,
  userType: userType.default
}