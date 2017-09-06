const Sequelize = require('sequelize');
var db = require('../db.js');

const Struggle = db.define('struggle',{
	topic: Sequelize.STRING
})




module.exports = Struggle;