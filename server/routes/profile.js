const router = require('express').Router();
const User = require('../../db/models/users.js');
const Promise = require('bluebird');



router.get('/:id', (req,res,next)=>{
	User.findById(req.params.id)
		.then((user)=>{
			res.send(user);
		})

})



module.exports = router; 