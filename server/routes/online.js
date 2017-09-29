const router = require('express').Router();
const User = require('../../db/models/users.js');


router.put('/toggle/:userId', function(req,res,next){
	User.findById(req.params.userId)
		.then((user)=>{
			return user.update({isOnline: !user.isOnline})
		})
		.then((updatedUser)=>{
			res.send(updatedUser);
		})
		.catch(next);
})

module.exports = router;