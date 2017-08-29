const Sequelize = require('sequelize');
var db = require('../db.js');

const Messages = db.define('messages',{
	authorAlias: Sequelize.STRING,
	content: Sequelize.TEXT
})

console.log('MESSAGES');


module.exports = Messages;