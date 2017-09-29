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
	User.findById(req.params.id)
		.then(user=>{
			res.send(user.tags);
		})
		.catch(next);
})

router.post('/:strugId/:userId', function(req,res,next){
	var user = User.findById(req.params.userId);
	var strug = Struggles.findById(req.params.strugId);
	Promise.all([user,strug])
		.spread((user, strug)=>{
			return user.addStruggle(strug);
		})
		.then((_)=>{
			return Promise.all([user,strug])
		})
		.spread((use,str)=>{
			return use.update({tags:str.topic})
		})
		.then(()=>{
			return User.findById(req.params.userId)
		})
		.then((strugList)=>{
			res.send(strugList);
		})
		.catch(next)


})

module.exports = router;