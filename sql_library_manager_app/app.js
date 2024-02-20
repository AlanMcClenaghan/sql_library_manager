var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

/* import the instance of sequelize that was instantiated for you in the 
models/index.js file when you used the sequelize CLI 
https://sequelize.org/docs/v6/getting-started/ */
const { sequelize } = require('./models');
// console.log(sequelize);

/* Use the sequelize.authenticate() method to asynchronously connect to the database 
and log out a message indicating that a connection has/hasn’t been established */
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    sequelize.sync()
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // Create a new Error()
  //Set its status property to 404
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err.status === 404) {
    // Set its message property to a user-friendly message
    err.message = `Sorry! We couldn't find the page you were looking for.`;
    /* Render the page-not-found template. Be sure that you're passing the {error} 
    you're creating as the second parameter in the render method. */ 
    res.status(404).render('page-not-found', {err});
  } else {
    // Set the err.message property to a user-friendly message if message isn't already defined
    err.message = err.message || `Something went wrong with the server!`;
    // Set the err.status property to 500 if status isn't already defined
    res.status(err.status || 500).render('error', { err });
    // Log the err object's status and message properties to the console
    console.log(err.status, err.message);
  }

});

module.exports = app;
