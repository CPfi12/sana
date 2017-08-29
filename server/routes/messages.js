const router = require('express').Router();
const Messages = require('../../db/models/messages.js');
const ChatApp = require('../../db/models/chat.js');

router.post('/addMessage/:room', function(req, res, next){
	ChatApp.findOne({
		where:{
			thing: req.params.room
		}
	})
	.then((chat)=>{
		var mess = Object.assign({}, req.body, {chatAppId: chat.id});
		 return Messages.create(mess);
	})
	.then((message)=>{
		res.send(message)
	})	
})

router.get('/getMessages/:room', function(req,res,next){
	ChatApp.findOne({
		where:{
			thing: req.params.room
		}
	})
	.then((chat)=>{
		return Messages.findAll({
			where: {
				chatAppId: chat.id
			}
		})
	})
	.then((messages)=>{
		res.send(messages);
	})
})

module.exports = router;