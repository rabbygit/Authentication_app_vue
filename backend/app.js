var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');

var userRouter = require('./routes/api/users');


var app = express();

mongoose.connect('mongodb://rabby:rabby1234@ds141633.mlab.com:41633/songs')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//Initialize the passport
app.use(passport.initialize());

//Bring the Startegy as global
require('./config/passport')(passport);

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', userRouter);

//if any unknown request comes we will redirect it to index.html . 
//we will put whole client project into index.html
//it is call SPA feature for  vue
app.get('*' , (req,res)=>{
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

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
