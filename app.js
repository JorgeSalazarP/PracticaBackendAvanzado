var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const loginController = require('./controllers/loginController');
const sessionAuth= require('./lib/sessionAuthMiddleware');
const MongoStore = require('connect-mongo');

var app = express();

require('./models/connectMongoose');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);


app.locals.title = 'NodePop';
app.locals.age = new Date().getFullYear(),


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/**
 * Ruta de la API
 */
app.post('/api/authenticate',   loginController.postJWT);
app.use('/api/anuncios',  require('./routes/api/anuncios'));


/**
 * Internacionalización i18n
 */
const i18n = require('./lib/i18nConfigure');
app.use(i18n.init);

app.use(session({

  name:'nodepop-session',
  secret: 'dsa987dad9/)j(/f()/9fgsfgsda7d98',
  saveUninitialized: true,
  resave: false,
  cookie: {
    secure: process.env.NODE_ENV !== 'development', // solo se envian al servidor cuando la petición es HTTPS
    maxAge: 1000 * 60 * 60 * 24 * 2 // 2 días de inactividad
  },
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_CONNECTION_STR})

}));

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
})

/**
 * Ruta de la Website
 */

app.use('/',              require('./routes/index'));
app.get('/login',         loginController.index);
app.post('/login',        loginController.post);
app.get('/logout',        loginController.logout);
app.use('/change-locale', require('./routes/change-locale'));




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  //comprobramos que sea un error de validación

 // es un error de validación?
  if (err.array) {
  const errorInfo = err.array({ onlyFirstError: true })[0];
  err.message = `Not valid - ${errorInfo.param} ${errorInfo.msg}`;
  err.status = 422;
  }
  
  // render the error page
  res.status(err.status || 500);

  if (isAPIRequest(req)) {
    res.json({ error: err.message });
    return;
  }

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.render('error');
});

function isAPIRequest(req) {
  return req.originalUrl.indexOf('/api/') === 0;
}

module.exports = app;
