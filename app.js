const express = require('express');
const app = express();
const path = require('path');

const morgan = require('morgan');
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));
//bundle gets served just like any other file in the script tag -> before would serve index.html instead of bundle!
app.use(express.static(path.join(__dirname, 'bundlefold')));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./server/routes'));



const port = process.env.PORT || 3000; // this can be very useful if you deploy to Heroku!
app.listen(port, function () {
  console.log("Knock, knock");
  console.log("Who's there?");
  console.log(`Your server, listening on port ${port}`);
});

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