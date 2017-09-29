const router = require('express').Router();
const User = require('../../db/models/users.js');
const ChatApp = require('../../db/models/chat.js');
let Promise = require('bluebird');

router.get('/loadBuds', function(req, res, next){
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
	.catch(next);
})

router.get('/loadChat', function(req, res, next){
	ChatApp.findAll({
		where:{
			$or: [{MentorId: req.session.userId}, {MenteeId: req.session.userId}] 
		},
		include: [
    		{ model: User, as: 'Mentor' },
    		{ model: User, as: 'Mentee' }
  		]
	})
	.then((chats)=>{
		res.send(chats)
	})
	.catch(next);
})

router.post('/addChat/:mentorId', function(req, res, next){

	var mentor = User.findById(req.params.mentorId);
	var mentee = User.findById(req.session.userId);
	Promise.all([mentor,mentee])
	.spread((mentor, mentee)=>{
		var info = {
				MenteeId: req.session.userId,
				MentorId: req.params.mentorId,
				thing: mentor.alias+'_'+mentee.alias
		}
		return ChatApp.create(info) 
	})
	.then((chat)=>{
		return ChatApp.findOne({
			where:{
				id: chat.id 
			},
		include: [
    			{ model: User, as: 'Mentor' },
    			{ model: User, as: 'Mentee' }
  			]
		})
	})
	.then((chat)=>{
		res.send(chat);
	})
	.catch(next);
})
module.exports =  router;