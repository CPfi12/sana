const Sequelize = require('sequelize');

var db = require('../db.js');

const User = db.define('user', {
  name: Sequelize.STRING,
  password: Sequelize.STRING,
  role: Sequelize.STRING,
  alias: Sequelize.STRING
  //role: Sequelize.ENUM('Student', 'Peer Counselor', 'Healthcare Professional', 'Admin')
})

module.exports = User;