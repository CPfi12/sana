
const Sequelize = require('sequelize');
var db = require('../db.js');

const ChatApp = db.define('chatApp',{
	thing: Sequelize.STRING
})

var User = require('./users.js');
ChatApp.belongsTo(User, {as: 'Mentor'});
ChatApp.belongsTo(User, {as: 'Mentee'});
User.belongsToMany(ChatApp, {through: 'User_Chat'});
module.exports = ChatApp;