const router = require('express').Router();
const User = require('../../db/models/users.js');


router.put('/toggle/:userId', function(req,res,next){
	console.log('USER ID',req.params.userId)
	User.findById(req.params.userId)
		.then((user)=>{
			console.log('USER', user)
			return user.update({isOnline: !user.isOnline})
		})
		.then((updatedUser)=>{
			res.send(updatedUser);
		})
		.catch(console.err);
})

module.exports = router;