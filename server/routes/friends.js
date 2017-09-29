const router = require('express').Router();
const User = require('../../db/models/users.js');
const Promise = require('bluebird');

router.post('/', (req, res, next)=>{
	if(!req.session.userId){
		res.send({});
	}
	else{
	let friend = User.findOne({where:req.body});
	let user = User.findById(req.session.userId);
	Promise.all([friend,user])
		.spread((friend,user)=>{
			return user.addFriend(friend)
		})
		.then((_)=>{
			return User.findById(req.session.userId);
		})
		.then((user)=>{
			return user.getFriends();
		})
		.then((friends)=>{
			let newFriends = friends.map(friend=>friend.name);
			res.send(newFriends);
		})
		.catch(next);
	}
	
})

router.get('/', (req,res,next)=>{

	if(req.session.userId){
	User.findById(req.session.userId)
		.then((user)=>{
			return user.getFriends();
		})
		.then((friends)=>{
			let frName = friends.map((friend)=>friend.name);
			res.send(frName);
		})
		.catch(next);
	}
	else{
		res.send('none found')
	}

})



module.exports = router; 