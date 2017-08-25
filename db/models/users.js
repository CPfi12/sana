const Sequelize = require('sequelize');

var db = require('../db.js');

const User = db.define('user', {
  name: Sequelize.STRING,
  password: Sequelize.STRING
})

module.exports = User;