const router = require('express').Router();
const Struggles = require('../../db/models/struggle.js');
const User = require('../../db/models/users.js');
const Promise = require('bluebird');



router.get('/', function(req,res,next){
	User.findById(req.session.userId)
		.then(user=>{
			res.send(user.description);
		})
		.catch(next);
})

router.post('/', function(req,res,next){
	User.findById(req.session.userId)
		.then((user)=>{
			return user.update(req.body)
		})
		.then((user)=>{
			res.send(user.description);
		})
		.catch(next);


})

module.exports = router;