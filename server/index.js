/* eslint consistent-return:0 */

const app = require('express')();
const mongoose = require('mongoose');
const { resolve } = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const http = require('http').Server(app);
const io = require('socket.io')(http);
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const setup = require('./middlewares/frontendMiddleware');
const port = require('./util//port');
const argv = require('./util/argv');
const dbConnection = require('./database');
const MongoStore = require('connect-mongo')(session);
const user = require('./routes/user');
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

io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('event', (msg) => {
    console.log(msg);
    io.emit('event', msg);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Sessions
app.use(session({
  secret: 'fraggle-rock', // pick a random string to make the hash that is generated secure
  store: new MongoStore({ mongooseConnection: dbConnection }),
  resave: false, // required
  saveUninitialized: false, // required
}));

// Passport
app.use(passport.initialize());
app.use(passport.session()); // calls the deserializeUser

// Routes
app.use('/user', user);
