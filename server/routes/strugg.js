const router = require('express').Router();
const Struggles = require('../../db/models/struggle.js');
const User = require('../../db/models/users.js');
const Promise = require('bluebird');


router.get('/all', function(req,res,next){
	Struggles.findAll({})
		.then((strugList)=>{
			res.send(strugList);
		})
})

router.get('/all/:id', function(req,res,next){
	console.log('second!', req.params.id);
	/*User.findById(req.params.id)
		.then(user=>{
			return user.getStruggles()
		})
		.then(persStrug=>{
			res.send(persStrug);
		})*/
	User.findById(req.params.id)
		.then(user=>{
			res.send(user.tags);
		})
})

router.post('/:strugId/:userId', function(req,res,next){
	var user = User.findById(req.params.userId);
	var strug = Struggles.findById(req.params.strugId);
	Promise.all([user,strug])
		.spread((user, strug)=>{
			return user.addStruggle(strug);
		})
		.then((th)=>{
			console.log(th);
			return Promise.all([user,strug])
		})
		.spread((use,str)=>{
			console.log(use.id,str.topic)
			return use.update({tags:str.topic})
		})
		.then(()=>{
			console.log('DONE??')
			return User.findById(req.params.userId)
		})
		.then((stuff)=>{
			console.log('stuff??', stuff)
			res.send(stuff);
		})
		.catch(next)


})

module.exports = router;