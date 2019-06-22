const http = require('http');
const app = require('./server');

const server = http.createServer(app);

const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log('Listening on port ', port);
});

if (module.hot) {
  module.hot.accept(['./server'], () => {
    server.removeListener('request', app);
    server.on('request', app);
  });
}