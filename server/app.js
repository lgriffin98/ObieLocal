var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var queriesRouter = require('./routes/queries');
var updateEventsRouter = require('./routes/updateEvents');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Enable CORS for http://localhost:3000
app.use(function(req, res, next) {
  const origin = req.get('origin');
  // TODO(ML): Add back the cors to prevent query attacks
  // if (
  //   ['http://localhost:3000', 'obielocal.com']
  //     .includes(origin)
  // ) {
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  // } else {
  //   next(createError(404));
  // }
  next();
});

app.use('/', indexRouter);
app.use('/query', queriesRouter);
app.use('/updateEvents', updateEventsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
