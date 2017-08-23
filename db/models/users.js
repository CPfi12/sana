const Sequelize = require('sequelize');

var db = require('../db.js');

const User = db.define('user', {
  title: Sequelize.STRING
})

module.exports = User;