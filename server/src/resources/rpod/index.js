const rpodResorvers = require('./rpod.resolvers');
const rpodType = require('./rpod.graphql');

module.exports = {
  rpodResorvers,
  rpodType: rpodType.default
}