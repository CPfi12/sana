var User = require('./users');
var ChatApp = require('./chat');
let Messages = require('./messages');

console.log('running this????');
ChatApp.belongsTo(User, {as: 'Mentor'});
ChatApp.belongsTo(User, {as: 'Mentee'});
Messages.belongsTo(ChatApp);

module.exports = {
	User,
	ChatApp,
	Messages
}