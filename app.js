const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const User = require('./db/models/users.js');
const Chat = require('./db/models/chat.js');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');


// handle sockets

console.log(User);
console.log(Chat);
//middleware
//app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
//bundle gets served just like any other file in the script tag -> before would serve index.html instead of bundle!
app.use(express.static(path.join(__dirname, 'bundlefold')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//middleware for authentication
app.use(session({
  secret: 'a wildly insecure secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//routes & server
app.use('/api', require('./server/routes'));
app.use('/chat', require('./server/routes/chat'));
app.use('/auth', require('./server/routes/auth'));
app.use('/messages', require('./server/routes/messages'));
app.use('/online', require('./server/routes/online'));
app.use('/strugg', require('./server/routes/strugg'));
app.use('/friend', require('./server/routes/friends'));
app.use('/description', require('./server/routes/description'));

const port = process.env.PORT || 3000;
var server;
db.sync()
  .then(function(){
    server = app.listen(port, function(){
    	console.log('Listening on 3000???')
    }) 
  })
  .then(()=>{
     const io = require('socket.io')(server);
     require('./server/serverSockets')(io); 
  })
 

//error handling
app.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});