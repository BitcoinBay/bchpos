/* eslint consistent-return:0 */

const app = require('express')();
const mongoose = require('mongoose');
const { resolve } = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const http = require('http').Server(app);
const io = require('socket.io')(http);
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const setup = require('./middlewares/frontendMiddleware');
const port = require('./util//port');
const argv = require('./util/argv');
const configDB = require('../config/keys');
// require('../services/passport')(passport);

setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';
const logger = require('./util//logger');

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

mongoose.connect(configDB.mongoURI);
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
