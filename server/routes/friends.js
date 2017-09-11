const router = require('express').Router();
const User = require('../../db/models/users.js');
const Promise = require('bluebird');

router.post('/', (req, res, next)=>{
	console.log('ID', req.session.userId);
	let x = User.findOne({where:req.body});
	let y = User.findById(req.session.userId);
	Promise.all([x,y])
		.spread((x,y)=>{
			return y.addFriend(x)
		})
		.then((x)=>{
			return User.findById(req.session.userId);
		})
		.then((x)=>{
			console.log(x);
			return x.getFriends();
		})
		.then((y)=>{
			console.log('FRIENDS???', y);
			let newY = y.map(x=>x.name);
			res.send(newY);
		})
	
})

router.get('/', (req,res,next)=>{
	User.findById(req.session.userId)
		.then((user)=>{
			return user.getFriends();
		})
		.then((friends)=>{
			let frName = friends.map((friend)=>friend.name);
			res.send(frName);
		})

})



module.exports = router; 