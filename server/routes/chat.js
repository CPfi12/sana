const router = require('express').Router();
const User = require('../../db/models/users.js');
const ChatApp = require('../../db/models/chat.js');
let Promise = require('bluebird');

router.get('/loadBuds', function(req, res, next){
	console.log(req.session.userId);
	User.findAll({
		where:{
			id: {
				$ne: req.session.userId
			},
			role: {
				$ne: 'Student'
			}
		}
	})
	.then((buds)=>{
		res.send(buds);
	})
})

router.get('/loadChat', function(req, res, next){
	console.log('USER ID IN LOAD CHAT', req.session.userId)
	ChatApp.findAll({
		where:{
			$or: [{MentorId: req.session.userId}, {MenteeId: req.session.userId}] 
		}
	})
	.then((chats)=>{
		console.log('CHATSSSSS', chats);
		res.send(chats)
	})
})

router.post('/addChat/:mentorId', function(req, res, next){
	console.log('WHAT')
	console.log(req.params.mentorId);
	console.log(req.session.userId);

	var mentor = User.findById(req.params.mentorId);
	var mentee = User.findById(req.session.userId);
	Promise.all([mentor,mentee])
	.spread((mentor, mentee)=>{
		console.log('MENTOR',mentor.alias)
		console.log('MENTEE',mentee.alias)
		var info = {
				MenteeId: req.session.userId,
				MentorId: req.params.mentorId,
				thing: mentor.alias+'_'+mentee.alias
		}
		console.log(info);
		return ChatApp.create(info) 
	})
	.then((chat)=>{
		res.send(chat);
	})
	.catch(console.err);
})
module.exports =  router;