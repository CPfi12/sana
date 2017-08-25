const router = require('express').Router();
const User = require('../../db/models/users.js');

router.get('/', function(req,res,next){
	res.send('getting a user');
})

router.post('/login', function(req, res, next){
	User.findOne({
		where:{
			name: req.body.name,
			password: req.body.password
		}
	})
	.then((user)=>{
		console.log(user)
		req.session.userId = user.id;
		res.send(user);
	})
})

router.get('/onLoad', function(req, res, next){
	console.log(req.session.userId);
	User.findOne({
		where:{
			id: req.session.userId
		}
	})
	.then((user)=>{
		res.send(user);
	})
})

module.exports = router;