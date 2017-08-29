
const Sequelize = require('sequelize');
var db = require('../db.js');

const ChatApp = db.define('chatApp',{
	thing: Sequelize.STRING
})

console.log('ChatAPP');


module.exports = ChatApp;