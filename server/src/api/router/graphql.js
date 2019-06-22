const { ApolloServer, gql } = require('apollo-server-express');
const merge = require('lodash.merge');

const { userType, userResolvers } = require('../../resources/user');
const { rpodType, rpodResorvers } = require('../../resources/rpod');
const { urlType, urlResolvers } = require('../../resources/url');
const typeDefs = gql`${userType}${rpodType}${urlType}`;

const graphQLRouter = new ApolloServer({
  typeDefs,
  resolvers: merge({}, userResolvers, rpodResorvers, urlResolvers),
  context: ({req, res}) => ({ user: req.user })
})

module.exports = graphQLRouter;