// Connect to Mongo database
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const configDB = require('../../config/keys');

mongoose
  .connect(configDB.mongoURI)
  .then(() => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    console.log('Connected to Mongo');
  }, (err) => {
    /** handle initial connection error */
    console.log('error connecting to Mongo: ');
    console.log(err);
  });

module.exports = mongoose.connection;
