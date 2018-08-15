/* eslint consistent-return:0 */

const app = require('express')();
const mongoose = require('mongoose');
const port = require('./util//port');
const setup = require('./middlewares/frontendMiddleware');
const {resolve} = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const http = require('http').Server(app);
const io = require('socket.io')(http);
const argv = require('./util/argv');

// If you need a backend, e.g. an API, add your custom backend-specific
// middleware here app.use('/api', myApi); In production we need to pass these
// values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not
// provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';
const logger = require('./util//logger');

passport.use(new LocalStrategy(((username, password, done) => {
  User.findOne({
    username,
  }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (!user.validPassword(password)) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  });
})));

// Start your app.
http.listen(port, host, (err) => {
  if (err) {
    return logger.error(err.message);
  }
  logger.appStarted(port, prettyHost);
});
app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
}));

io.on('connection', (socket) => {
  console.log('hello');
});
