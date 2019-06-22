const router = require('./router');
const path = '/graphql';

module.exports = app => {
  router.graphQLRouter.applyMiddleware({ app, path })
  app.use(router.staticRouter)
}