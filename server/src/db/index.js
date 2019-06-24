const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// const mongoUri = process.env.MONGO_URI;

// use mongo image
const mongoUri = "mongodb://mongo:27017/rpod-dev-test";
module.exports.connect = () => mongoose.connect(mongoUri, {useNewUrlParser: true}, () => console.log('Connected to the database using ' + mongoUri))